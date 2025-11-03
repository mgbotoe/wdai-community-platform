# JOB ORCHESTRATION - Women Defining AI Community Platform

**Version:** 1.0
**Last Updated:** November 2, 2025

## Table of Contents

1. [Executive Summary & Recommendation](#executive-summary--recommendation)
2. [Job Requirements Analysis](#job-requirements-analysis)
3. [Inngest vs Supabase Edge Functions Comparison](#inngest-vs-supabase-edge-functions-comparison)
4. [Recommended Architecture](#recommended-architecture)
5. [Job Implementation Patterns](#job-implementation-patterns)
6. [Job Scheduling Strategy](#job-scheduling-strategy)
7. [Error Handling & Recovery](#error-handling--recovery)
8. [Monitoring & Observability](#monitoring--observability)

---

## Executive Summary & Recommendation

### 🎯 RECOMMENDATION: Use Inngest for Complex Jobs + Vercel Cron for Simple Jobs

**Rationale:**
1. **Inngest** handles complex workflows (Stripe → DB → Mailchimp) with built-in retries, observability, and replay capabilities
2. **Vercel Cron** handles simple, idempotent jobs (Luma approval, Slack sync) that don't need complex orchestration
3. This hybrid approach minimizes complexity while ensuring reliability

**Decision Matrix:**

| Criteria | Inngest | Supabase Edge + pgcron | Winner |
|----------|---------|------------------------|--------|
| Developer Experience | Excellent UI, easy debugging | Manual setup required | Inngest ✅ |
| Retry Logic | Built-in with exponential backoff | Manual implementation | Inngest ✅ |
| Job Replay | One-click replay from UI | Manual database operations | Inngest ✅ |
| Observability | Built-in dashboard | Custom logging needed | Inngest ✅ |
| Complex Workflows | Step functions, fan-out | Basic scheduling only | Inngest ✅ |
| Cost | $0-29/mo for MVP scale | Included with Supabase | Supabase ✅ |
| Vendor Lock-in | Moderate (can migrate) | Low (standard Postgres) | Supabase ✅ |
| Time to Market | Fast (hours) | Slower (days) | Inngest ✅ |

**Winner: Inngest (6-2)** for MVP, with migration path to Supabase Edge if needed at scale.

---

## Job Requirements Analysis

### Required Jobs

| Job Name | Type | Frequency | Complexity | Retry Needed | Recommendation |
|----------|------|-----------|------------|--------------|----------------|
| Mailchimp Member Sync | Event-driven | On webhook | High | Yes | Inngest |
| Member Deactivation | Scheduled | At specific time | Medium | Yes | Inngest |
| Luma Auto-Approval | Cron | 2× daily | Low | No | Vercel Cron |
| Slack Status Sync | Cron | 2× daily | Low | No | Vercel Cron |
| Database Cleanup | Cron | Nightly | Low | No | Vercel Cron |
| Webhook Retry | Event-driven | On failure | High | Yes | Inngest |

### Job Complexity Analysis

```mermaid
graph TD
    subgraph "Complex Jobs (Inngest)"
        J1[Mailchimp Sync]
        J2[Member Deactivation]
        J3[Webhook Retry]

        J1 --> S1[Fetch User Data]
        S1 --> S2[Validate Membership]
        S2 --> S3[Update Mailchimp]
        S3 --> S4[Trigger Automation]
        S4 --> S5[Audit Log]

        J2 --> D1[Check Period End]
        D1 --> D2[Update Status]
        D2 --> D3[Remove Tags]
        D3 --> D4[Hide Profile]
        D4 --> D5[Audit Log]
    end

    subgraph "Simple Jobs (Vercel Cron)"
        C1[Luma Approval]
        C2[Slack Sync]
        C3[DB Cleanup]

        C1 --> L1[Fetch & Approve]
        C2 --> L2[Sync Statuses]
        C3 --> L3[Delete Old Records]
    end
```

---

## Inngest vs Supabase Edge Functions Comparison

### Architecture Comparison

#### Option 1: Inngest Architecture

```mermaid
graph TB
    subgraph "Trigger Layer"
        W[Webhook]
        C[Cron]
        E[Event]
    end

    subgraph "Inngest Cloud"
        Q[Event Queue]
        O[Orchestrator]
        R[Retry Logic]
        D[Dashboard]
    end

    subgraph "Your Infrastructure"
        H[/api/inngest]
        F[Job Functions]
        DB[(Database)]
    end

    W --> H
    C --> H
    E --> H
    H --> Q
    Q --> O
    O --> F
    F --> DB
    O --> R
    R --> F
    O --> D
```

#### Option 2: Supabase Edge Functions Architecture

```mermaid
graph TB
    subgraph "Trigger Layer"
        W2[Webhook]
        PC[pgcron]
        PG[pg_notify]
    end

    subgraph "Supabase"
        EF[Edge Functions]
        PQ[pg_queue]
        DB2[(Database)]
        CRON[Cron Tables]
    end

    subgraph "Custom Built"
        RL[Retry Logic]
        MON[Monitoring]
        LOG[Logging]
    end

    W2 --> EF
    PC --> EF
    PG --> EF
    EF --> DB2
    EF --> PQ
    PQ --> RL
    RL --> EF
    EF --> LOG
    LOG --> MON
```

### Feature Comparison

| Feature | Inngest | Supabase Edge Functions |
|---------|---------|------------------------|
| **Setup Time** | 30 minutes | 2-3 days |
| **Retry Logic** | Automatic with backoff | Manual implementation |
| **Dead Letter Queue** | Built-in | Manual setup |
| **Job Replay** | One-click from UI | Manual SQL commands |
| **Step Functions** | Yes, with branching | No, linear only |
| **Fan-out/Fan-in** | Built-in | Manual orchestration |
| **Rate Limiting** | Built-in | Manual implementation |
| **Observability** | Real-time dashboard | CloudFlare Analytics |
| **Local Development** | Inngest Dev Server | Supabase CLI |
| **Debugging** | Step-by-step replay | Console logs |
| **Cost at 10K jobs/mo** | $0 (free tier) | $0 (included) |
| **Cost at 100K jobs/mo** | $29/mo | $0 (included) |
| **Cost at 1M jobs/mo** | $299/mo | $0 (included) |

---

## Recommended Architecture

### Hybrid Approach: Inngest + Vercel Cron

```mermaid
graph TB
    subgraph "Triggers"
        ST[Stripe Webhook]
        CT[Clerk Webhook]
        CR1[Vercel Cron 9am]
        CR2[Vercel Cron 9pm]
    end

    subgraph "Routing"
        API[API Routes]
        INN[Inngest Handler]
    end

    subgraph "Inngest Jobs"
        MS[Mailchimp Sync]
        MD[Member Deactivation]
        WR[Webhook Retry]
    end

    subgraph "Direct Cron Jobs"
        LA[Luma Approval]
        SS[Slack Sync]
        CL[Cleanup]
    end

    subgraph "External Services"
        MC[Mailchimp]
        LM[Luma]
        SL[Slack]
        DB[(Database)]
    end

    ST --> API --> INN --> MS --> MC
    CT --> API --> INN --> MD --> DB
    ST --> API --> INN --> WR

    CR1 --> API --> LA --> LM
    CR2 --> API --> SS --> SL
    CR1 --> API --> CL --> DB
```

### Implementation Timeline

```mermaid
gantt
    title Job System Implementation
    dateFormat DD
    axisFormat %d

    section Week 1
    Setup Inngest                :done, inn, 01, 1d
    Webhook handlers             :done, wh, 02, 2d
    Mailchimp sync job          :done, ms, 04, 2d

    section Week 2
    Member deactivation job      :active, md, 07, 2d
    Webhook retry job           :active, wr, 09, 1d
    Vercel Cron setup           :cron, 10, 1d
    Luma approval job           :la, 11, 1d
    Slack sync job              :ss, 12, 1d

    section Week 3
    Testing & debugging          :test, 14, 3d
    Monitoring setup            :mon, 17, 2d
    Documentation               :doc, 19, 1d
```

---

## Job Implementation Patterns

### Inngest Job Pattern

```typescript
// src/lib/jobs/mailchimp-sync.ts
import { inngest } from './client'
import { z } from 'zod'

const EventSchema = z.object({
  userId: z.string().uuid(),
  stripeEventId: z.string(),
  action: z.enum(['create', 'update', 'cancel'])
})

export const mailchimpSync = inngest.createFunction(
  {
    id: 'mailchimp-sync',
    name: 'Sync Member to Mailchimp',
    throttle: {
      limit: 100,
      period: '1m',
      key: 'event.data.userId'
    },
    retries: 3
  },
  { event: 'member.updated' },
  async ({ event, step }) => {
    // Step 1: Validate event
    const data = EventSchema.parse(event.data)

    // Step 2: Check idempotency
    const processed = await step.run('check-idempotency', async () => {
      return await checkIdempotency(data.stripeEventId)
    })

    if (processed) {
      return { status: 'already_processed' }
    }

    // Step 3: Fetch user data
    const user = await step.run('fetch-user', async () => {
      return await getUserWithMembership(data.userId)
    })

    // Step 4: Sync to Mailchimp
    const result = await step.run('sync-mailchimp', async () => {
      return await mailchimp.lists.setListMember(
        process.env.MAILCHIMP_LIST_ID,
        user.email,
        {
          email_address: user.email,
          status: user.membership?.status === 'active' ? 'subscribed' : 'unsubscribed',
          merge_fields: { FNAME: user.name },
          tags: generateTags(user.membership)
        }
      )
    })

    // Step 5: Trigger automation (if new)
    if (data.action === 'create') {
      await step.run('trigger-welcome', async () => {
        return await mailchimp.automations.trigger(
          process.env.MAILCHIMP_WELCOME_ID,
          user.email
        )
      })
    }

    // Step 6: Audit log
    await step.run('audit-log', async () => {
      return await createAuditLog({
        actor: 'system:mailchimp_sync',
        action: `mailchimp:${data.action}`,
        target_type: 'user',
        target_id: data.userId,
        metadata: { mailchimp_id: result.id }
      })
    })

    // Step 7: Mark as processed
    await step.run('mark-processed', async () => {
      return await storeIdempotency(data.stripeEventId)
    })

    return { status: 'success', mailchimpId: result.id }
  }
)
```

### Scheduled Job Pattern (Inngest)

```typescript
// src/lib/jobs/member-deactivation.ts
export const memberDeactivation = inngest.createFunction(
  {
    id: 'member-deactivation',
    name: 'Deactivate Member at Period End'
  },
  { event: 'member.schedule_deactivation' },
  async ({ event, step }) => {
    const { userId, deactivateAt } = event.data

    // Wait until deactivation time
    await step.sleep('wait-until-deactivation', deactivateAt)

    // Check if still should deactivate
    const shouldDeactivate = await step.run('check-status', async () => {
      const membership = await getMembership(userId)
      return membership?.status !== 'active'
    })

    if (!shouldDeactivate) {
      return { status: 'reactivated' }
    }

    // Perform deactivation steps
    await step.run('update-database', async () => {
      await updateMembershipStatus(userId, 'canceled')
      await updateUserVisibility(userId, false)
    })

    await step.run('update-mailchimp', async () => {
      await updateMailchimpTags(userId, {
        remove: ['active'],
        add: ['alumni']
      })
    })

    await step.run('audit-log', async () => {
      await createAuditLog({
        actor: 'system:deactivation',
        action: 'member:deactivated',
        target_type: 'user',
        target_id: userId
      })
    })

    return { status: 'deactivated' }
  }
)
```

### Simple Cron Job Pattern (Vercel)

```typescript
// src/app/api/jobs/luma-auto-approve/route.ts
export async function GET(req: Request) {
  // Verify cron secret
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const results = {
    processed: 0,
    approved: 0,
    denied: 0,
    errors: []
  }

  try {
    // Simple, single-step operation
    const pendingRSVPs = await luma.getRSVPs({ status: 'pending' })

    for (const rsvp of pendingRSVPs) {
      try {
        const isActive = await checkMembership(rsvp.email)

        if (isActive) {
          await luma.approveRSVP(rsvp.id)
          results.approved++
        } else {
          results.denied++
        }

        results.processed++
      } catch (error) {
        results.errors.push({ rsvp: rsvp.id, error: error.message })
      }
    }

    await createAuditLog({
      actor: 'system:luma_approval',
      action: 'job:completed',
      metadata: results
    })

    return Response.json({ success: true, ...results })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}
```

---

## Job Scheduling Strategy

### Scheduling Decision Tree

```mermaid
flowchart TD
    START([New Job Requirement]) --> TRIGGER{Trigger Type?}

    TRIGGER -->|Webhook| COMPLEX1{Complex<br/>Multi-Step?}
    TRIGGER -->|Scheduled| TIME{Specific Time<br/>or Interval?}
    TRIGGER -->|Event| COMPLEX2{Complex<br/>Multi-Step?}

    COMPLEX1 -->|Yes| INNGEST1[Use Inngest<br/>Event Function]
    COMPLEX1 -->|No| DIRECT[Direct Handler]

    TIME -->|Specific Time| INNGEST2[Use Inngest<br/>Sleep Until]
    TIME -->|Interval| SIMPLE{Simple<br/>Idempotent?}

    SIMPLE -->|Yes| VERCEL[Use Vercel Cron]
    SIMPLE -->|No| INNGEST3[Use Inngest<br/>Cron Function]

    COMPLEX2 -->|Yes| INNGEST4[Use Inngest<br/>Step Function]
    COMPLEX2 -->|No| QUEUE[Simple Queue]
```

### Job Configuration

```typescript
// inngest.config.ts
export const jobConfig = {
  // Complex jobs with Inngest
  inngest: {
    mailchimpSync: {
      trigger: 'event',
      event: 'member.updated',
      retries: 3,
      timeout: '5m',
      rateLimit: '100/1m'
    },
    memberDeactivation: {
      trigger: 'scheduled',
      retries: 3,
      timeout: '2m'
    },
    webhookRetry: {
      trigger: 'event',
      event: 'webhook.failed',
      retries: 5,
      backoff: 'exponential'
    }
  },

  // Simple jobs with Vercel Cron
  cron: {
    lumaApproval: {
      schedule: '0 9,21 * * *',  // 9am and 9pm UTC
      timeout: 60,                // seconds
      retries: 0                   // Idempotent, no retry needed
    },
    slackSync: {
      schedule: '0 10,22 * * *',  // 10am and 10pm UTC
      timeout: 120,
      retries: 0
    },
    cleanup: {
      schedule: '0 3 * * *',      // 3am UTC daily
      timeout: 300,
      retries: 0
    }
  }
}
```

---

## Error Handling & Recovery

### Error Handling Strategy

```mermaid
stateDiagram-v2
    [*] --> Running: Job Started
    Running --> Success: No Errors
    Running --> Error: Exception Thrown

    Error --> Retry: Retries < Max
    Retry --> Running: After Backoff

    Error --> Failed: Max Retries
    Failed --> DLQ: Move to DLQ
    DLQ --> Alert: Send Alert

    Alert --> Manual: Human Review
    Manual --> Replay: Can Fix
    Manual --> Abandon: Cannot Fix

    Success --> [*]
    Replay --> Running
    Abandon --> [*]
```

### Inngest Error Recovery

```typescript
// Built-in retry with exponential backoff
export const robustJob = inngest.createFunction(
  {
    id: 'robust-job',
    retries: {
      attempts: 5,
      backoff: 'exponential' // 1s, 2s, 4s, 8s, 16s
    },
    onFailure: async ({ error, event, attempt }) => {
      // Send to DLQ after max retries
      if (attempt === 5) {
        await sendToDeadLetterQueue({
          job: 'robust-job',
          event,
          error: error.message
        })

        await notifyOps({
          severity: 'high',
          message: `Job failed after 5 attempts: ${error.message}`
        })
      }
    }
  },
  { event: 'data.process' },
  async ({ event, step }) => {
    // Job logic with automatic retry
  }
)
```

### Manual Intervention Workflow

```typescript
// DLQ processor for manual review
export async function processDeadLetterQueue() {
  const items = await getDeadLetterItems()

  for (const item of items) {
    const action = await determineAction(item)

    switch (action) {
      case 'replay':
        await inngest.send({
          name: item.event,
          data: item.data
        })
        break

      case 'compensate':
        await executeCompensation(item)
        break

      case 'abandon':
        await markAsAbandoned(item)
        break
    }
  }
}
```

---

## Monitoring & Observability

### Inngest Dashboard Metrics

```mermaid
graph LR
    subgraph "Function Metrics"
        M1[Total Runs: 10,432]
        M2[Success Rate: 99.2%]
        M3[Avg Duration: 1.2s]
        M4[P95 Duration: 3.5s]
    end

    subgraph "Current Status"
        S1[Running: 3]
        S2[Queued: 12]
        S3[Failed: 2]
        S4[Completed: 10,415]
    end

    subgraph "Error Tracking"
        E1[Last Error: 2min ago]
        E2[Error Rate: 0.8%]
        E3[DLQ Items: 5]
    end

    subgraph "Alerts"
        A1[High Error Rate ⚠️]
        A2[Long Queue ✓]
        A3[Performance ✓]
    end
```

### Custom Monitoring Implementation

```typescript
// src/lib/monitoring/job-metrics.ts
export class JobMetrics {
  private static metrics = new Map<string, JobMetric>()

  static recordStart(jobName: string, jobId: string) {
    this.metrics.set(jobId, {
      name: jobName,
      startTime: Date.now(),
      status: 'running'
    })
  }

  static recordSuccess(jobId: string, metadata?: any) {
    const metric = this.metrics.get(jobId)
    if (metric) {
      metric.endTime = Date.now()
      metric.duration = metric.endTime - metric.startTime
      metric.status = 'success'
      metric.metadata = metadata

      // Send to monitoring service
      await sendToDatadog({
        metric: 'job.duration',
        value: metric.duration,
        tags: [`job:${metric.name}`, 'status:success']
      })
    }
  }

  static recordFailure(jobId: string, error: Error) {
    const metric = this.metrics.get(jobId)
    if (metric) {
      metric.status = 'failed'
      metric.error = error.message

      // Alert on failure
      await sendToSentry(error, {
        tags: {
          job: metric.name,
          duration: Date.now() - metric.startTime
        }
      })
    }
  }

  static async getHealthStatus(): Promise<HealthStatus> {
    const recentMetrics = Array.from(this.metrics.values())
      .filter(m => m.startTime > Date.now() - 3600000) // Last hour

    const successRate = recentMetrics.filter(m => m.status === 'success').length /
                       recentMetrics.length

    return {
      healthy: successRate > 0.95,
      successRate,
      totalJobs: recentMetrics.length,
      avgDuration: avg(recentMetrics.map(m => m.duration))
    }
  }
}
```

### Alert Configuration

```yaml
# monitoring/alerts.yaml
alerts:
  - name: job_failure_rate_high
    condition: failure_rate > 0.1
    window: 5m
    severity: warning
    notify:
      - slack: "#eng-alerts"
      - email: "oncall@wdai.org"

  - name: job_queue_backup
    condition: queued_jobs > 100
    window: 10m
    severity: critical
    notify:
      - pagerduty: "job-queue-critical"

  - name: mailchimp_sync_failing
    condition: job_name = "mailchimp-sync" AND failure_count > 5
    window: 15m
    severity: high
    notify:
      - slack: "#eng-alerts"
      - sms: "+1234567890"

  - name: dlq_items_accumulating
    condition: dlq_count > 20
    window: 30m
    severity: medium
    notify:
      - email: "engineering@wdai.org"
```

---

## Migration Strategy (Future)

### Phase 1: Start with Inngest (Weeks 1-11)
- Quick setup, focus on business logic
- Built-in observability
- Rapid iteration

### Phase 2: Evaluate at Scale (Month 3)
- Monitor costs
- Assess vendor lock-in concerns
- Measure actual job volumes

### Phase 3: Potential Migration (Month 6+)
If needed, migrate to Supabase Edge Functions:

```mermaid
graph LR
    I1[Inngest Jobs] --> A[Assess Volume/Cost]
    A --> D{Migrate?}
    D -->|Yes| M[Migration Plan]
    D -->|No| K[Keep Inngest]

    M --> S1[Setup pgcron]
    S1 --> S2[Build retry logic]
    S2 --> S3[Create monitoring]
    S3 --> S4[Migrate one job]
    S4 --> S5[Test thoroughly]
    S5 --> S6[Migrate remaining]

    S6 --> C[Complete]
```

---

**Next Steps:**
1. Set up Inngest account and SDK
2. Implement first job (mailchimp-sync)
3. Configure Vercel cron jobs
4. Set up monitoring dashboards
5. Create runbooks for job failures
6. Test error recovery scenarios