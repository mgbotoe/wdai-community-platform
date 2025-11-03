# Agent API Development Standards (MCP)

**Purpose:** Patterns for building agent-accessible APIs with proper scoping and security.

---

## 🎯 API Design Principles

Every agent endpoint MUST:
1. **Scoped access**: Each agent key has narrow scopes array
2. **Auditable**: Log every write with actor = 'agent:{name}'
3. **Rate limited**: Per-scope limits (read: 100/min, write: 10/min)
4. **Idempotent**: POST/PATCH operations use idempotency keys
5. **OpenAPI first**: Generate from Zod schemas

---

## 📝 Example: Agent Endpoint Structure

```typescript
// /api/agents/members/route.ts
import { verifyAgentKey, logAudit, rateLimitCheck } from '@/lib/agents'
import { supabase } from '@/lib/supabase'

export async function GET(req: Request) {
  // 1. Verify agent key + scopes
  const { agentId, scopes, key } = await verifyAgentKey(req)
  if (!scopes.includes('members:read')) {
    return Response.json({ error: 'Insufficient permissions' }, { status: 403 })
  }

  // 2. Rate limit check
  const limited = await rateLimitCheck(key.id, 'members:read', 100) // 100/min
  if (limited) {
    return Response.json({ error: 'Rate limit exceeded' }, { status: 429 })
  }

  // 3. Fetch data with service role (bypasses RLS)
  const { data: members, error } = await supabase.auth.admin().listUsers()

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  // 4. Audit log
  await logAudit({
    actor: `agent:${agentId}`,
    action: 'members:list',
    target_type: 'user',
    target_id: null,
    metadata: { count: members.length }
  })

  // 5. Update last_used_at
  await supabase.from('agent_keys')
    .update({ last_used_at: new Date().toISOString() })
    .eq('id', key.id)

  return Response.json(members)
}
```

---

## 🔧 OpenAPI Generation from Zod

```typescript
// lib/schemas/member.schema.ts
import { z } from 'zod'
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'

extendZodWithOpenApi(z)

export const MemberSchema = z.object({
  id: z.string().uuid().openapi({ description: 'User ID from Clerk' }),
  email: z.string().email().openapi({ description: 'User email address' }),
  name: z.string().openapi({ description: 'User full name' }),
  role: z.enum(['visitor', 'member', 'leader']).openapi({
    description: 'User role in the platform'
  }),
}).openapi('Member')

// Generate OpenAPI spec
import { OpenAPIRegistry, OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi'

const registry = new OpenAPIRegistry()
registry.register('Member', MemberSchema)

registry.registerPath({
  method: 'get',
  path: '/api/agents/members',
  summary: 'List all members',
  responses: {
    200: {
      description: 'List of members',
      content: {
        'application/json': {
          schema: z.array(MemberSchema)
        }
      }
    }
  }
})

const generator = new OpenApiGeneratorV3(registry.definitions)
export const openApiDocument = generator.generateDocument({
  openapi: '3.0.0',
  info: {
    title: 'WDAI Agent API',
    version: '1.0.0',
    description: 'Unified API for WDAI agents via MCP'
  }
})
```

---

**Last Updated:** November 2, 2025
**See Also:** `docs/architecture/API_ARCHITECTURE.md` for all agent endpoints
