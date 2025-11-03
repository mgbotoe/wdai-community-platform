# WDAI Business Rules (NEVER VIOLATE)

**Purpose:** Core business logic and data rules specific to Women Defining AI platform.

---

## 🎯 Membership System

### Membership Tiers
- `monthly` - Monthly recurring subscription
- `annual` - Annual recurring subscription
- `donor_annual` - Annual donor tier

### Role Hierarchy
- `visitor` - Public pages only, can purchase/join/donate
- `member` - Authenticated, access to member content and directory
- `leader` - Authenticated, create/manage events and resources
- `admin` - Future role (currently via GitHub/Supabase portal)

### Visibility Levels
- `public` - Visible to all visitors
- `member` - Visible to authenticated members only
- `leader` - Visible to leaders only

### Membership Status
- `active` - Current paid member
- `trialing` - In trial period
- `past_due` - Payment failed, grace period
- `canceled` - Subscription canceled

---

## 🔗 Integration Consistency Rules

### Stripe Webhooks
- MUST verify signature BEFORE processing
- MUST use `event.id` as idempotency key
- MUST return 200 even for processing errors
- MUST log all webhook receipts to audit_log

### Mailchimp Tags
- MUST match membership status exactly: `member`, `active`, `<tier>`
- MUST update on status changes: `active` → `alumni` on cancel
- MUST trigger welcome series on tag application

### Luma Integration
- Auto-approval runs EXACTLY 2× daily (no more, no less)
- MUST verify active membership before approving RSVPs
- MUST write audit_log entries for approvals/denials

### Slack Sync
- Status sync ONLY in MVP (no invites yet)
- Runs 2× daily via Cron
- Stores status in `integrations.slack_status`

---

## 🔐 Security & Data Protection Rules

### Row-Level Security (RLS)
- MUST enable RLS from day one on ALL tables
- NO public write access without service role
- Clerk JWT claims → Postgres policies
- Service role ONLY on server-side

### API Access Control
- Agent endpoints: `/api/agents/*` with scoped keys
- Each key has narrow `scopes` array in `agent_keys.scopes`
- Log EVERY write with actor = `agent:{name}` to audit_log
- Rate limit per scope: read (100/min), write (10/min)

---

**Last Updated:** November 2, 2025
**Reference:** See `docs/architecture/` for detailed implementation patterns
