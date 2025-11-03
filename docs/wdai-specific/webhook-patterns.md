# Webhook Development Standards

**Purpose:** Security and reliability patterns for webhook implementations.

---

## 🔒 Webhook Security Checklist

Before deploying ANY webhook endpoint:
- [ ] Signature verification BEFORE processing
- [ ] Idempotency key storage (prevent duplicate processing)
- [ ] Replay attack protection (timestamp validation)
- [ ] Rate limiting per webhook source
- [ ] Dead letter queue for failures

---

## 🎯 Stripe Webhook Pattern (MANDATORY)

```typescript
// /api/stripe/webhook/route.ts
export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature')
  const body = await req.text()

  // 1. VERIFY SIGNATURE
  let event
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err) {
    return new Response('Invalid signature', { status: 400 })
  }

  // 2. CHECK IDEMPOTENCY
  const exists = await checkIdempotency(event.id)
  if (exists) {
    return new Response('Already processed', { status: 200 })
  }

  // 3. PROCESS EVENT (in try-catch)
  try {
    await processStripeEvent(event)
  } catch (error) {
    // Log to Sentry, enqueue to DLQ
    await enqueueToDeadLetterQueue(event, error)
  }

  // 4. STORE IDEMPOTENCY KEY
  await storeIdempotency(event.id, new Date())

  // ALWAYS RETURN 200 (prevents Stripe retries)
  return new Response('Success', { status: 200 })
}
```

---

## ⚠️ Error Handling for Webhooks

- **ALWAYS return 200** even for processing errors (prevents retries)
- **Enqueue failed jobs** to DLQ for manual review
- **Log all webhook receipts** with Sentry breadcrumbs
- **Alert on >5 failures/hour** per webhook type

---

## ⚙️ Job Orchestration Patterns

### When to Use Cron vs Durable Jobs

**Vercel Cron (Simple Scheduled Jobs):**
- ✅ Luma auto-approval (2× daily, idempotent)
- ✅ Slack status sync (2× daily, read-only)
- ✅ Health checks (every 15 minutes)
- ❌ Don't use for: Long-running jobs (>30s), jobs that need retries

**Inngest/Durable Jobs (Complex Workflows):**
- ✅ Mailchimp sync (needs retries, rate limiting)
- ✅ Member deactivation (scheduled at specific timestamp)
- ✅ Multi-step workflows (Stripe → DB → Mailchimp chain)
- ✅ Jobs that need observability/debugging

### Job Design Principles

Every job MUST be:
1. **Idempotent**: Running twice = same result
2. **Atomic**: All-or-nothing operations
3. **Auditable**: Log every action with actor to audit_log
4. **Recoverable**: Can resume from failure point

---

## 📝 Example: Mailchimp Sync Job

```typescript
// jobs/mailchimp-sync-member.ts
export async function mailchimpSyncMember({ userId, eventId }) {
  // 1. Check if already processed
  const processed = await checkJobIdempotency(eventId, 'mailchimp_sync')
  if (processed) return { status: 'already_processed' }

  // 2. Fetch user + membership data
  const user = await supabase.from('users').select('*').eq('id', userId).single()
  const membership = await supabase.from('memberships')
    .select('*').eq('user_id', userId).single()

  // 3. Upsert to Mailchimp
  await mailchimp.lists.setListMember(listId, user.email, {
    email_address: user.email,
    status: 'subscribed',
    merge_fields: { FNAME: user.name },
    tags: ['member', membership.status, membership.tier]
  })

  // 4. Trigger welcome series (if new member)
  if (membership.created_at > Date.now() - 60000) {
    await mailchimp.automations.start(welcomeAutomationId, user.email)
  }

  // 5. Audit log
  await logAudit({
    actor: `system:mailchimp_sync`,
    action: 'mailchimp_member_synced',
    target_type: 'user',
    target_id: userId,
    metadata: { tier: membership.tier, status: membership.status }
  })

  // 6. Mark as processed
  await storeJobIdempotency(eventId, 'mailchimp_sync')

  return { status: 'success' }
}
```

---

**Last Updated:** November 2, 2025
**See Also:** `docs/architecture/JOB_ORCHESTRATION.md` for detailed workflows
