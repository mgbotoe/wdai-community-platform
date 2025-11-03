# INTEGRATION FLOWS - Women Defining AI Community Platform

**Version:** 1.0
**Last Updated:** November 2, 2025

## Table of Contents

1. [Integration Overview](#integration-overview)
2. [Member Lifecycle Flow](#member-lifecycle-flow)
3. [Payment Processing Flow](#payment-processing-flow)
4. [Email Automation Flow](#email-automation-flow)
5. [Event Management Flow](#event-management-flow)
6. [Slack Synchronization Flow](#slack-synchronization-flow)
7. [Agent API Flow](#agent-api-flow)
8. [Error Recovery Flows](#error-recovery-flows)

---

## Integration Overview

### System Integration Map

```mermaid
graph TB
    subgraph "External Services"
        STRIPE[Stripe<br/>Payments]
        CLERK[Clerk<br/>Authentication]
        MAILCHIMP[Mailchimp<br/>Email Marketing]
        LUMA[Luma<br/>Events]
        SLACK[Slack<br/>Community]
    end

    subgraph "WDAI Platform"
        APP[Next.js App]
        API[API Layer]
        JOBS[Job Queue<br/>Inngest]
        DB[(Supabase<br/>Database)]
    end

    subgraph "Agents"
        FINANCE[Finance Agent]
        SUPPORT[Support Agent]
        ENGAGEMENT[Engagement Agent]
    end

    STRIPE <--> API
    CLERK <--> APP
    API <--> DB
    API <--> JOBS
    JOBS <--> MAILCHIMP
    JOBS <--> LUMA
    JOBS <--> SLACK
    API <--> FINANCE
    API <--> SUPPORT
    API <--> ENGAGEMENT
```

---

## Member Lifecycle Flow

### New Member Signup Flow

```mermaid
sequenceDiagram
    participant U as User
    participant W as Web App
    participant C as Clerk
    participant S as Stripe
    participant DB as Supabase
    participant I as Inngest
    participant M as Mailchimp

    U->>W: Visit pricing page
    W->>U: Display membership tiers
    U->>W: Select plan & click join
    W->>C: Redirect to Clerk signup
    C->>U: Show signup form
    U->>C: Complete signup
    C->>C: Create user account
    C->>W: Return with JWT
    W->>S: Create Checkout Session
    S->>U: Show payment form
    U->>S: Enter payment details
    S->>S: Process payment
    S-->>W: webhook: checkout.session.completed
    W->>DB: Create user record
    W->>DB: Create membership record
    W->>I: Enqueue mailchimp_sync job
    I->>M: Upsert subscriber
    I->>M: Add tags [member, active, tier]
    I->>M: Trigger welcome series
    M-->>U: Send welcome email
    W->>U: Redirect to member dashboard
```

### Member Cancellation Flow

```mermaid
sequenceDiagram
    participant U as User
    participant W as Web App
    participant S as Stripe
    participant DB as Supabase
    participant I as Inngest
    participant M as Mailchimp

    U->>W: Access billing page
    W->>S: Open Customer Portal
    U->>S: Cancel subscription
    S->>S: Schedule cancellation
    S-->>W: webhook: subscription.updated
    W->>DB: Update membership
    W->>DB: Set cancel_at_period_end=true
    W->>I: Schedule deactivation job

    Note over I: Wait until period_end

    I->>DB: Set status=canceled
    I->>DB: Set visibility=false
    I->>M: Remove "active" tag
    I->>M: Add "alumni" tag
    I->>DB: Audit log entry
```

---

## Payment Processing Flow

### Stripe Webhook Processing

```mermaid
flowchart TB
    START([Stripe Event]) --> VERIFY{Verify<br/>Signature?}
    VERIFY -->|Invalid| REJECT[Return 400]
    VERIFY -->|Valid| IDEM{Check<br/>Idempotency?}

    IDEM -->|Exists| SKIP[Return 200<br/>Already Processed]
    IDEM -->|New| TYPE{Event Type?}

    TYPE -->|checkout.session.completed| CHECKOUT[Process Checkout]
    TYPE -->|customer.subscription.created| CREATE[Create Subscription]
    TYPE -->|customer.subscription.updated| UPDATE[Update Subscription]
    TYPE -->|customer.subscription.deleted| DELETE[Cancel Subscription]
    TYPE -->|invoice.payment_failed| FAILED[Handle Failure]

    CHECKOUT --> UPSERT[Upsert User/Membership]
    CREATE --> UPSERT
    UPDATE --> UPSERT
    DELETE --> CANCEL[Cancel Membership]
    FAILED --> NOTIFY[Notify User]

    UPSERT --> QUEUE[Queue Mailchimp Sync]
    CANCEL --> QUEUE

    QUEUE --> STORE[Store Idempotency Key]
    NOTIFY --> STORE

    STORE --> SUCCESS[Return 200]
```

### Payment Retry Logic

```mermaid
stateDiagram-v2
    [*] --> Active: Subscription Created
    Active --> PastDue: Payment Failed
    PastDue --> Active: Payment Succeeded
    PastDue --> Canceled: Max Retries Exceeded
    Active --> Canceled: User Cancels
    Canceled --> [*]

    note right of PastDue
        Stripe retries:
        Day 1, 3, 5, 7
        Then cancels
    end note
```

---

## Email Automation Flow

### Mailchimp Integration

```mermaid
flowchart LR
    subgraph "Trigger Events"
        E1[New Member]
        E2[Status Change]
        E3[Tag Update]
        E4[Cancellation]
    end

    subgraph "Mailchimp Actions"
        A1[Upsert Subscriber]
        A2[Update Tags]
        A3[Trigger Automation]
        A4[Update Status]
    end

    subgraph "Email Campaigns"
        C1[Welcome Series]
        C2[Engagement Series]
        C3[Win-Back Series]
        C4[Alumni Newsletter]
    end

    E1 --> A1 --> A2 --> A3 --> C1
    E2 --> A2 --> A3 --> C2
    E4 --> A4 --> A2 --> A3 --> C3
    E4 --> A2 --> C4
```

### Welcome Series Timeline

```mermaid
gantt
    title New Member Welcome Series
    dateFormat HH:mm
    axisFormat %H:%M

    section Day 0
    Welcome Email          :done, welcome, 00:00, 1h

    section Day 1
    Getting Started        :done, start, 24:00, 1h

    section Day 3
    Member Benefits        :done, benefits, 72:00, 1h

    section Day 7
    Community Introduction :done, community, 168:00, 1h

    section Day 14
    First Event Invite     :done, event, 336:00, 1h

    section Day 30
    Check-in Survey        :done, survey, 720:00, 1h
```

---

## Event Management Flow

### Luma Event Creation (Leader)

```mermaid
sequenceDiagram
    participant L as Leader
    participant W as Web App
    participant API as API
    participant DB as Supabase
    participant LUMA as Luma API
    participant A as Audit Log

    L->>W: Access event creation form
    W->>L: Show form
    L->>W: Fill event details
    W->>API: POST /api/events
    API->>API: Validate leader role
    API->>LUMA: Create event via API
    LUMA->>LUMA: Generate event
    LUMA-->>API: Return event_id
    API->>DB: Store event record
    API->>A: Log event creation
    API-->>W: Return success
    W->>L: Show confirmation
```

### Luma Auto-Approval Flow (2× Daily)

```mermaid
flowchart TB
    START([Cron Trigger<br/>9am/9pm UTC]) --> AUTH{Verify<br/>Cron Secret?}
    AUTH -->|Invalid| REJECT[Return 401]
    AUTH -->|Valid| FETCH[Fetch Pending RSVPs<br/>from Luma]

    FETCH --> LOOP{For Each<br/>RSVP}
    LOOP -->|Next| EMAIL[Extract Email]
    EMAIL --> CHECK{Active<br/>Member?}

    CHECK -->|Yes| APPROVE[Approve RSVP]
    CHECK -->|No| SKIP[Skip/Deny]

    APPROVE --> LOG1[Audit Log:<br/>Approved]
    SKIP --> LOG2[Audit Log:<br/>Denied]

    LOG1 --> MORE{More<br/>RSVPs?}
    LOG2 --> MORE

    MORE -->|Yes| LOOP
    MORE -->|No| SUMMARY[Generate Summary]
    SUMMARY --> COMPLETE[Job Complete]
```

---

## Slack Synchronization Flow

### Status Sync Flow (2× Daily)

```mermaid
sequenceDiagram
    participant CRON as Vercel Cron
    participant API as API
    participant DB as Supabase
    participant SLACK as Slack API
    participant INT as Integrations Table

    CRON->>API: GET /api/jobs/slack-sync
    API->>API: Verify cron secret
    API->>DB: Get visible members

    loop For Each Member
        API->>SLACK: users.lookupByEmail
        SLACK-->>API: User data/not found

        alt User Found
            API->>INT: Upsert integration record
            Note over INT: Update slack_user_id,<br/>slack_status,<br/>slack_synced_at
        else User Not Found
            API->>INT: Mark as not_found
        end
    end

    API->>DB: Audit log summary
    API-->>CRON: Return results
```

### Slack Status States

```mermaid
stateDiagram-v2
    [*] --> NotFound: No Slack Account
    [*] --> Active: Has Slack Account

    Active --> Inactive: Account Restricted
    Active --> Deactivated: Account Deleted

    Inactive --> Active: Restriction Removed
    Deactivated --> [*]: Permanent

    NotFound --> Active: Account Created
```

---

## Agent API Flow

### Agent Authentication & Request Flow

```mermaid
sequenceDiagram
    participant AGENT as Agent (MCP)
    participant API as API Gateway
    participant AUTH as Auth Service
    participant RL as Rate Limiter
    participant DB as Supabase
    participant AUDIT as Audit Log

    AGENT->>API: Request + API Key
    API->>AUTH: Verify API key
    AUTH->>DB: Check agent_keys table

    alt Invalid Key
        AUTH-->>API: Unauthorized
        API-->>AGENT: 401 Unauthorized
    else Valid Key
        AUTH-->>API: Key valid + scopes
        API->>RL: Check rate limit

        alt Rate Limited
            RL-->>API: Limit exceeded
            API-->>AGENT: 429 Too Many Requests
        else Within Limit
            RL-->>API: OK
            API->>DB: Execute request
            DB-->>API: Data
            API->>AUDIT: Log operation
            API->>DB: Update last_used_at
            API-->>AGENT: 200 + Data
        end
    end
```

### Agent Scope Verification

```mermaid
flowchart TB
    START([API Request]) --> KEY{Valid<br/>API Key?}
    KEY -->|No| DENY1[401 Unauthorized]
    KEY -->|Yes| SCOPE{Has Required<br/>Scope?}

    SCOPE -->|No| DENY2[403 Forbidden]
    SCOPE -->|Yes| RATE{Rate Limit<br/>Check}

    RATE -->|Exceeded| DENY3[429 Rate Limited]
    RATE -->|OK| OPERATION{Operation<br/>Type?}

    OPERATION -->|Read| READ[Execute Query]
    OPERATION -->|Write| WRITE[Execute Mutation]

    READ --> FILTER[Apply Scope Filters]
    WRITE --> VALIDATE[Validate Data]

    FILTER --> RETURN[Return Data]
    VALIDATE --> AUDIT[Audit Log]
    AUDIT --> RETURN
```

---

## Error Recovery Flows

### Webhook Failure Recovery

```mermaid
flowchart TB
    START([Webhook Received]) --> PROCESS{Processing<br/>Success?}

    PROCESS -->|Success| COMPLETE[Mark Complete]
    PROCESS -->|Failure| DLQ[Dead Letter Queue]

    DLQ --> RETRY{Retry<br/>Attempt?}
    RETRY -->|< 3| WAIT[Exponential Backoff]
    WAIT --> PROCESS

    RETRY -->|>= 3| ALERT[Alert Team]
    ALERT --> MANUAL[Manual Review]

    MANUAL --> FIX{Can<br/>Fix?}
    FIX -->|Yes| REPLAY[Replay Event]
    FIX -->|No| COMPENSATE[Compensating Action]

    COMPLETE --> LOG[Audit Log]
    REPLAY --> LOG
    COMPENSATE --> LOG
```

### Job Failure Recovery

```mermaid
stateDiagram-v2
    [*] --> Pending: Job Enqueued
    Pending --> Processing: Job Started

    Processing --> Completed: Success
    Processing --> Failed: Error

    Failed --> Retrying: Retry < Max
    Retrying --> Processing: After Backoff

    Failed --> DeadLetter: Max Retries
    DeadLetter --> Manual: Alert Sent

    Manual --> Completed: Fixed
    Manual --> Abandoned: Cannot Fix

    Completed --> [*]
    Abandoned --> [*]
```

### Compensation Strategies

| Service | Failure Type | Compensation Action |
|---------|-------------|-------------------|
| Stripe | Webhook missed | Replay from Stripe dashboard |
| Mailchimp | Sync failed | Manual batch sync |
| Luma | API timeout | Retry with backoff |
| Slack | Rate limited | Defer to next sync |
| Database | Connection lost | Circuit breaker + retry |

---

## Monitoring & Alerting

### Integration Health Dashboard

```mermaid
graph TB
    subgraph "Service Health"
        S1[Stripe: ✅]
        S2[Clerk: ✅]
        S3[Mailchimp: ⚠️]
        S4[Luma: ✅]
        S5[Slack: ❌]
    end

    subgraph "Job Status"
        J1[mailchimp_sync: 142 succeeded]
        J2[luma_approval: 28 approved]
        J3[slack_sync: 3 failed]
    end

    subgraph "Webhook Metrics"
        W1[Stripe: 99.8% success]
        W2[Processing time: p95 < 2s]
        W3[DLQ: 2 items]
    end

    subgraph "Alerts"
        A1[🔴 Slack API down]
        A2[🟡 Mailchimp rate limit warning]
        A3[🟢 All systems operational]
    end
```

### Alert Thresholds

| Metric | Warning | Critical | Action |
|--------|---------|----------|--------|
| Webhook success rate | < 99% | < 95% | Check DLQ, review logs |
| Job failure rate | > 5% | > 10% | Investigate root cause |
| API response time | > 500ms | > 2000ms | Scale resources |
| DLQ items | > 10 | > 50 | Manual intervention |
| Rate limit hits | > 10/hour | > 100/hour | Adjust limits |

---

## Security Considerations

### Integration Security Matrix

| Integration | Auth Method | Security Measures |
|------------|-------------|------------------|
| Stripe | Webhook signature | HMAC verification, idempotency |
| Clerk | JWT + webhook sig | Token validation, RBAC |
| Mailchimp | API key | Rate limiting, IP whitelist |
| Luma | API key | Scope limitation |
| Slack | OAuth token | Minimal scopes, read-only |
| Agents | API key | Scoped access, rate limits |

### Data Flow Security

```mermaid
flowchart LR
    subgraph "Encrypted in Transit"
        A[Client] -->|TLS 1.3| B[API]
        B -->|TLS 1.3| C[Database]
        B -->|TLS 1.3| D[External APIs]
    end

    subgraph "Encrypted at Rest"
        C -->|AES-256| E[(Storage)]
    end

    subgraph "Access Control"
        F[RLS Policies]
        G[API Scopes]
        H[JWT Claims]
    end
```

---

**Next Steps:**
1. Implement webhook handlers with proper error recovery
2. Set up Inngest for job orchestration
3. Configure rate limiting for all integrations
4. Create monitoring dashboards
5. Document runbooks for failure scenarios