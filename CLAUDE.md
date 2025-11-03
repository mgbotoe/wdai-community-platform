# AI Assistant Instructions - Women Defining AI Community Platform

## 🤖 AI ASSISTANT: READ THIS FIRST!

**This file (CLAUDE.md) is your PRIMARY instruction set. It is automatically loaded into your context at the start of EVERY session.**

### 🎯 Project Overview

**Women Defining AI (WDAI) Community Platform** - A nonprofit community platform with:
- Direct Stripe integration for subscriptions/donations
- Gated member portal with directory, resources, events
- Agent-ready unified API (MCP)
- Automated workflows for member management

**Current Status:** MVP Development (Weeks 1-11)
**Tech Stack:** Next.js 15, TypeScript, Clerk, Supabase, Stripe, Vercel

---

## 📋 DOCUMENTATION STRUCTURE

**Primary Documents (READ FIRST):**
- **REQUIREMENTS.md** - Complete requirements from stakeholder PDF
- **PROJECT_ANALYSIS.md** - Detailed project analysis and implementation status
- **This File (CLAUDE.md)** - Quick reference and critical rules

**Detailed Standards (Reference When Needed):**
- `docs/standards/content-management.md` - **CRITICAL:** Avoid hardcoded content
- `docs/wdai-specific/business-rules.md` - Membership tiers, roles, visibility
- `docs/wdai-specific/webhook-patterns.md` - Webhook security, idempotency
- `docs/wdai-specific/rls-patterns.md` - Database security policies
- `docs/wdai-specific/agent-api-patterns.md` - MCP agent endpoints

**Architecture Docs:**
- `docs/architecture/` - Database schema, API routes, folder structure

**Design System:**
- `docs/design/` - Color palette, typography, components, Tailwind config

---

## 📂 MANDATORY PRE-WORK: CHECK DOCUMENTATION STRUCTURE

**BEFORE starting ANY task, you MUST:**

1. **Check current implementation plan:**
   ```bash
   cat docs/implementation/SOLO_DEV_PLAN.md
   ```
   - Read current sprint and today's tasks
   - Check task status (pending/in_progress/completed)
   - Identify dependencies and blockers

2. **Update implementation plan as you work:**
   - Mark tasks as `in_progress` when you start
   - Mark tasks as `completed` when done
   - Add new tasks discovered during implementation
   - Update blockers and notes sections

3. **Verify documentation organization:**
   ```
   docs/
   ├── implementation/       # ⭐ CURRENT WORK PLAN (check first!)
   │   └── SOLO_DEV_PLAN.md # Active sprint plan
   ├── design/               # Design system extraction
   ├── standards/            # Universal best practices
   ├── wdai-specific/        # Project-specific rules
   └── architecture/         # System architecture
   ```

4. **Reference existing docs BEFORE creating new ones:**
   - **docs/implementation/SOLO_DEV_PLAN.md** → **CURRENT SPRINT TASKS**
   - REQUIREMENTS.md → Single source of truth for features
   - PROJECT_ANALYSIS.md → Current implementation status
   - docs/standards/* → Development best practices
   - docs/wdai-specific/* → WDAI-specific patterns
   - docs/architecture/* → Technical specifications

5. **NEVER create documents in root unless they are:**
   - CLAUDE.md (this file)
   - PROJECT_ANALYSIS.md
   - REQUIREMENTS.md
   - README.md
   - Package files (package.json, tsconfig.json, etc.)

---

## 🚨 CRITICAL RULES (NEVER VIOLATE)

### 1. Content Management (MANDATORY)

**READ:** `docs/standards/content-management.md` for complete guidelines

**Quick Rule:** NEVER hardcode content that changes (team members, events, stats, pricing).

**✅ Use data files or database:**
```typescript
// ✅ GOOD: Data separated
import { teamMembers } from '@/data/team-members'
<TeamGrid members={teamMembers} />
```

**❌ Never hardcode:**
```typescript
// ❌ BAD: Hardcoded content
<TeamCard name="Helen Lee Kupp" role="Co-Founder" />
```

**Three-Tier Strategy:**
1. **Database** (Supabase) - Dynamic, user-managed content
2. **Data files** (`src/data/*.ts`) - Semi-static, developer-managed content
3. **Environment variables** (`.env.local`) - Configuration

---

### 2. WDAI Business Rules

**READ:** `docs/wdai-specific/business-rules.md` for complete rules

**Membership Tiers:**
- `monthly`, `annual`, `donor_annual`

**Roles:**
- `visitor`, `member`, `leader`, `admin`

**Visibility:**
- `public`, `member`, `leader`

**Status:**
- `active`, `trialing`, `past_due`, `canceled`

---

### 3. Security Requirements

**READ:** `docs/wdai-specific/rls-patterns.md` for RLS policies

**Critical:**
- ✅ Enable RLS on ALL tables from day one
- ✅ Verify webhook signatures BEFORE processing
- ✅ Use idempotency keys (Stripe: `event.id`)
- ✅ Log all writes to `audit_log` table
- ❌ Never use service role client-side
- ❌ Never skip signature verification

---

### 4. Webhook & Job Patterns

**READ:** `docs/wdai-specific/webhook-patterns.md` for complete patterns

**Webhook Checklist:**
- [ ] Signature verification BEFORE processing
- [ ] Idempotency key check
- [ ] Try-catch with DLQ for failures
- [ ] ALWAYS return 200 (even on error)
- [ ] Audit log entry

**Job Design:**
1. **Idempotent** - Running twice = same result
2. **Atomic** - All-or-nothing
3. **Auditable** - Log with actor
4. **Recoverable** - Can resume from failure

---

## 📂 Repository Structure Rules

**READ:** `docs/standards/repository-standards.md` for complete guidelines

**Quick Rule:** Keep root directory ~15 files max. Only essential configs.

**Root Directory (~15 files max):**
- Only essential configs
- NO source code, test files, or temporary files
- Documentation in `docs/` except README.md

**❌ FORBIDDEN in root:**
- Test files (test-*.*, *.test.*, *.spec.*)
- SQL files (*.sql) except in migrations/
- Analysis documents (*_ANALYSIS.md, *_ASSESSMENT.md)
- Temporary files (*.tmp, *.temp, *.bak)

**✅ Proper structure:**
```
app/                      # Next.js App Router
components/               # React components (NO hardcoded content)
data/                     # ✅ Content goes here!
lib/                      # Clients, services, utilities
types/                    # TypeScript types
public/                   # Static assets
docs/                     # Documentation
```

**For complete .gitignore configuration:** See `docs/standards/repository-standards.md`

---

## 🎯 Development Workflow

### Before Writing ANY Code:

1. **Check for existing implementations:**
   ```bash
   # Search for similar code
   grep -r "keyword" src/
   ```

2. **Verify content separation:**
   - Will this content change? → Data file/database
   - Will non-developers edit this? → Database with UI
   - Does this differ between environments? → Environment variables

3. **Plan incrementally:**
   - Break into small, testable steps
   - Each step keeps app functional
   - Commit after each working increment

---

## 📚 Quick Reference Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Run linting
npm run type-check   # TypeScript validation

# Code Quality
npm audit           # Security audit
npm run test        # Run tests

# Git
git status          # Check changes
git add .           # Stage changes
git commit -m "..." # Commit
```

---

## 🔧 TypeScript & Code Quality

**Naming Conventions:**
- Files: `kebab-case` (user-service.ts)
- Components: `PascalCase` (UserProfile.tsx)
- Functions/Variables: `camelCase` (getUserData)
- Constants: `UPPER_SNAKE_CASE` (MAX_RETRIES)

**Import Order:**
1. React/Next.js
2. Third-party libraries
3. Internal aliases (@/...)
4. Relative imports
5. Style imports

**Never include .ts/.tsx extensions in imports:**
```typescript
// ✅ CORRECT
import { data } from '@/lib/data'

// ❌ WRONG
import { data } from '@/lib/data.ts'
```

---

## 🚫 Common Anti-Patterns to AVOID

1. **Hardcoding content in components:**
   ```tsx
   // ❌ NEVER DO THIS
   <TeamCard name="Person 1" role="Role 1" />
   ```

2. **Duplicate functionality:**
   - Search for existing code FIRST
   - Extend existing services/components
   - Don't duplicate error handling, validation, etc.

3. **Mixing content with JSX:**
   ```tsx
   // ❌ BAD
   <h2>Program Leads</h2>

   // ✅ GOOD
   import { sections } from '@/data/homepage'
   <h2>{sections.programLeads.title}</h2>
   ```

4. **Hardcoding URLs, API keys, feature flags:**
   ```tsx
   // ❌ BAD
   const siteUrl = 'https://womendefiningai.com'

   // ✅ GOOD
   const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
   ```

---

## ⚠️ FINAL REMINDERS

1. **ALWAYS** search for existing code before creating new files
2. **NEVER** hardcode user-facing content in components
3. **ALWAYS** separate content from code (data files or database)
4. **NEVER** duplicate functionality - extend existing code
5. **ALWAYS** run lint and type-check before marking tasks complete
6. **NEVER** skip webhook signature verification
7. **ALWAYS** use idempotency keys for webhooks
8. **NEVER** log sensitive information (API keys, tokens)
9. **ALWAYS** enable RLS on database tables from day one
10. **NEVER** make assumptions - check docs first

---

## 📖 When You Need More Details

**Content Management:** Read `docs/standards/content-management.md`
**Repository Standards:** Read `docs/standards/repository-standards.md`
**Skills & Agents Strategy:** Read `docs/standards/skills-agents-strategy.md`
**Business Rules:** Read `docs/wdai-specific/business-rules.md`
**Webhooks:** Read `docs/wdai-specific/webhook-patterns.md`
**Database Security:** Read `docs/wdai-specific/rls-patterns.md`
**Agent APIs:** Read `docs/wdai-specific/agent-api-patterns.md`
**Architecture:** Check `docs/architecture/` folder
**Design System:** Check `docs/design/` folder
**Implementation Plan:** Check `docs/implementation/SOLO_DEV_PLAN.md`

---

**This document is your contract with the codebase. Follow it strictly.**

**Version:** 2.1 (Modular)
**Last Updated:** November 3, 2025
**Lines:** ~340 (down from 1,505)
**Token Savings:** ~10,000 tokens per session

---

## 🎯 Skills & Agents Strategy

### Auto-Invoking Skills
1. **`product-owner-workflow`** - Requirements gathering
2. **`feature-orchestrator`** - Feature implementation
3. **`qa-testing`** - Contract tests, webhook tests
4. **`devops-deployment`** - Vercel, Supabase setup
5. **`ui-ux-audit`** - Member portal, forms review

### Manual Agent Launch
1. **`project-architect`** - Database schema, API architecture
2. **`backend-developer`** - Webhooks, jobs, Agent API
3. **`security-specialist`** - RLS policies, auth flows
4. **`frontend-developer`** - Member portal, forms
5. **`critic-agent`** - Review webhooks, RLS before deployment
6. **`ui-ux-designer`** - Member directory, leader dashboard
