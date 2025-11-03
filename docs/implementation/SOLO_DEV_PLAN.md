# SOLO DEVELOPER IMPLEMENTATION PLAN

**Developer:** Solo + AI Assistant (Claude Code)
**Duration:** 10 days (2 weeks at ~5 hours/day)
**Last Updated:** November 2, 2025
**Status:** 🟡 Planning Phase

---

## 🎯 Sprint Goal

**"MVP Foundation Sprint"** - Launch a working authentication + payment flow with deployment pipeline.

**Success Criteria:**
- ✅ User can sign up via Clerk
- ✅ User can purchase subscription via Stripe
- ✅ Purchase creates user + membership in database
- ✅ Application deployed to Vercel
- ✅ Basic public pages live (homepage, pricing)

---

## 📋 Current Sprint Status

**Sprint:** Sprint 1 (Days 1-10)
**Current Day:** Day 2 Code Complete → Awaiting Clerk Setup
**Completed Tasks:** 10/25 (40%)
**Blocked Tasks:** 1 (Clerk account creation - user action required)
**At Risk:** None

---

## 🗓️ 10-Day Implementation Plan

### Day 1: Project Setup & Design System
**Status:** ✅ Completed
**Actual Time:** 2 hours

**Tasks:**
- [x] Initialize Next.js 16 project with TypeScript
  - Manually installed Next.js 16.0.1 (latest)
  - Configured: App Router, ESLint, Tailwind CSS

- [x] Copy Tailwind config from design docs
  - Source: `docs/design/tailwind.config.example.ts`
  - Added WDAI brand colors, typography, spacing

- [x] Create basic folder structure
  ```
  app/                 # Next.js App Router
  components/
  ├── layout/          # Header, Footer
  ├── ui/              # Reusable UI components
  └── sections/        # Page sections
  data/                # Content files (NO hardcoded content!)
  lib/
  ├── clients/         # API clients (Clerk, Supabase, Stripe)
  ├── services/        # Business logic services
  └── utils/           # Helper utilities
  types/               # TypeScript types
  public/              # Static assets
  ```

- [x] Install core dependencies
  - @clerk/nextjs@6.34.1
  - @supabase/supabase-js@2.78.0
  - stripe@19.2.0
  - zod@4.1.12

- [x] Create `.env.local.example`
  - All required environment variables documented
  - Instructions for obtaining keys included

**Deliverable:** ✅ Next.js app running at http://localhost:3005 with WDAI design system

**Blockers:** None

**Notes:**
- Next.js 16.0.1 installed (newer than planned Next.js 15)
- Used Turbopack for faster development
- 0 security vulnerabilities found
- All core dependencies installed successfully
- WDAI brand colors and typography fully configured

---

### Day 2: Clerk Authentication Integration
**Status:** 🔄 Code Complete - Awaiting Clerk Setup
**Actual Time:** 1.5 hours (code implementation)

**Tasks:**
- [⏳] Set up Clerk account and application
  - Create account at clerk.com
  - Create new application: "WDAI Community Platform"
  - Copy publishable key and secret key

- [x] Configure Clerk in Next.js
  - Added ClerkProvider to app/layout.tsx
  - Wrapped entire app with authentication context

- [x] Create auth middleware
  - Created middleware.ts with route protection
  - Public routes: /, /sign-in, /sign-up, /pricing, webhooks
  - Protected routes: /dashboard and all member routes

- [x] Create sign-in and sign-up pages
  - app/(auth)/sign-in/[[...sign-in]]/page.tsx (WDAI-themed)
  - app/(auth)/sign-up/[[...sign-up]]/page.tsx (WDAI-themed)
  - Custom appearance with WDAI colors

- [x] Create protected dashboard page
  - app/(member)/dashboard/page.tsx
  - Displays user info, welcome message, quick actions

- [x] Add auth UI to homepage
  - Conditional rendering (SignedIn/SignedOut)
  - Sign-in button, Join Now button
  - UserButton component when authenticated

- [⏳] Test authentication flow (requires Clerk keys)
  - Sign up new user
  - Sign in existing user
  - Verify protected routes redirect
  - Check user metadata in Clerk dashboard

**Deliverable:** ✅ Code complete - Ready for testing with Clerk keys

**Dependencies:** Day 1 complete ✅

**Blockers:** Waiting for Clerk account setup and API keys

**Notes:**
- Used Clerk's pre-built components with WDAI theming
- Auth middleware properly configured
- Homepage has clean auth UI
- Dashboard ready to test protected routes

---

### Day 3: Supabase Setup & Database Schema
**Status:** ⏳ Pending
**Estimated Time:** 4-5 hours

**Tasks:**
- [ ] Create Supabase project
  - Sign up at supabase.com
  - Create new project: "wdai-community-platform"
  - Note project URL and anon key

- [ ] Install Supabase CLI
  ```bash
  npm install -g supabase
  supabase init
  supabase start
  ```

- [ ] Create database schema
  - Source: `docs/architecture/DATABASE_SCHEMA.md`
  - Create migration: `supabase migration new initial_schema`
  - Add tables: users, memberships, resources, events, audit_log, agent_keys, integrations

- [ ] Enable Row-Level Security (RLS)
  ```sql
  ALTER TABLE users ENABLE ROW LEVEL SECURITY;
  ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;
  ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
  -- etc.
  ```

- [ ] Create RLS policies
  - Source: `docs/wdai-specific/rls-patterns.md`
  - Policies for each role: visitor, member, leader
  - Test with Supabase SQL Editor

- [ ] Run migrations
  ```bash
  supabase db push
  ```

- [ ] Create Supabase client
  ```typescript
  // lib/supabase/client.ts
  import { createClient } from '@supabase/supabase-js'

  export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  ```

**Deliverable:** Database schema deployed with RLS policies

**Dependencies:** Day 2 complete

**Blockers:** None

**Notes:**
- Start with minimal schema, expand later
- Test RLS policies thoroughly
- Document any schema changes

---

### Day 4: Stripe Checkout Integration
**Status:** ⏳ Pending
**Estimated Time:** 4-5 hours

**Tasks:**
- [ ] Set up Stripe account
  - Create account at stripe.com
  - Get test mode keys (publishable + secret)
  - Create products and prices for membership tiers

- [ ] Install Stripe SDK
  ```bash
  npm install stripe @stripe/stripe-js
  ```

- [ ] Create Stripe client
  ```typescript
  // lib/stripe/client.ts
  import Stripe from 'stripe'

  export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-11-20.acacia'
  })
  ```

- [ ] Create Checkout API route
  ```typescript
  // app/api/stripe/checkout/route.ts
  export async function POST(req: Request) {
    const { priceId } = await req.json()
    const { userId } = auth()

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/welcome`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`,
      client_reference_id: userId,
    })

    return Response.json({ sessionId: session.id })
  }
  ```

- [ ] Create pricing page
  - Display membership tiers (monthly, annual, donor_annual)
  - "Purchase" button → Stripe Checkout
  - Use data file for pricing content (NO hardcoding!)

- [ ] Test checkout flow
  - Use Stripe test cards
  - Verify redirect to success page
  - Check Stripe dashboard for session

**Deliverable:** Working Stripe Checkout integration

**Dependencies:** Day 3 complete (need user_id)

**Blockers:** None

**Notes:**
- Use test mode ONLY for now
- Document test card numbers
- Checkout creates session, webhook handles fulfillment

---

### Day 5: Stripe Webhook Handler (P0 - Critical!)
**Status:** ⏳ Pending
**Estimated Time:** 5-6 hours

**Tasks:**
- [ ] Create webhook endpoint
  ```typescript
  // app/api/stripe/webhook/route.ts
  import { headers } from 'next/headers'
  import { stripe } from '@/lib/stripe/client'

  export async function POST(req: Request) {
    const body = await req.text()
    const signature = headers().get('stripe-signature')!

    // 1. Verify signature
    let event
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      )
    } catch (err) {
      return new Response('Invalid signature', { status: 400 })
    }

    // 2. Handle events
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutComplete(event.data.object)
        break
      case 'customer.subscription.updated':
        await handleSubscriptionUpdate(event.data.object)
        break
      case 'customer.subscription.deleted':
        await handleSubscriptionCancel(event.data.object)
        break
    }

    return new Response('Success', { status: 200 })
  }
  ```

- [ ] Implement event handlers
  ```typescript
  // lib/stripe/handlers.ts
  async function handleCheckoutComplete(session) {
    // Create user in Supabase
    // Create membership record
    // Set membership status = 'active'
  }

  async function handleSubscriptionUpdate(subscription) {
    // Update membership status
    // Update current_period_end
  }

  async function handleSubscriptionCancel(subscription) {
    // Set membership status = 'canceled'
  }
  ```

- [ ] Add webhook to Stripe dashboard
  - Endpoint: `https://your-vercel-url.vercel.app/api/stripe/webhook`
  - Events: checkout.session.completed, customer.subscription.*
  - Copy webhook secret to .env.local

- [ ] Test webhook locally
  ```bash
  stripe listen --forward-to localhost:3000/api/stripe/webhook
  stripe trigger checkout.session.completed
  ```

- [ ] Verify database records created
  - Check users table
  - Check memberships table
  - Verify membership status = 'active'

**Deliverable:** Webhook creates user + membership in database

**Dependencies:** Day 4 complete

**Blockers:** None

**Notes:**
- CRITICAL: Signature verification MUST work
- Test all 3 event types thoroughly
- Check `docs/wdai-specific/webhook-patterns.md` for security checklist

---

### Day 6: Public Pages (Homepage & Pricing)
**Status:** ⏳ Pending
**Estimated Time:** 4-5 hours

**Tasks:**
- [ ] Create homepage data file
  ```typescript
  // data/homepage.ts
  export const homePageContent = {
    hero: {
      title: "Ready to Demystify AI?",
      ctaText: "Join",
      ctaUrl: "/pricing",
    },
    stats: [
      { number: "+40%", label: "higher quality results when AI was used" },
      // ... from docs/design/screenshots/public/Homepage/Homepage Text.txt
    ],
    mission: {
      title: "Mission",
      description: "We aim to level the playing field..."
    }
  }
  ```

- [ ] Build reusable components
  - `components/sections/Hero.tsx`
  - `components/sections/StatsBar.tsx`
  - `components/sections/Mission.tsx`
  - `components/cards/TeamCard.tsx` (for later use)

- [ ] Create homepage
  ```typescript
  // app/(public)/page.tsx
  import { homePageContent } from '@/data/homepage'
  import Hero from '@/components/sections/Hero'
  import StatsBar from '@/components/sections/StatsBar'

  export default function HomePage() {
    return (
      <>
        <Hero {...homePageContent.hero} />
        <StatsBar stats={homePageContent.stats} />
        <Mission {...homePageContent.mission} />
      </>
    )
  }
  ```

- [ ] Create pricing page
  ```typescript
  // app/(public)/pricing/page.tsx
  import { pricingPlans } from '@/data/pricing'
  ```

- [ ] Add Header and Footer
  - Source navigation from `data/navigation.ts`
  - NO hardcoded links!

**Deliverable:** Homepage and Pricing page live

**Dependencies:** Day 1 (design system), Day 4 (checkout button)

**Blockers:** None

**Notes:**
- Use extracted design from `docs/design/`
- All content in data files
- Focus on structure, polish later

---

### Day 7: Member Dashboard Skeleton
**Status:** ⏳ Pending
**Estimated Time:** 3-4 hours

**Tasks:**
- [ ] Create protected route group
  ```typescript
  // app/(member)/layout.tsx
  import { auth } from '@clerk/nextjs'
  import { redirect } from 'next/navigation'

  export default function MemberLayout({ children }) {
    const { userId } = auth()
    if (!userId) redirect('/sign-in')

    return (
      <div className="member-layout">
        <Sidebar />
        <main>{children}</main>
      </div>
    )
  }
  ```

- [ ] Create member dashboard
  ```typescript
  // app/(member)/dashboard/page.tsx
  export default async function DashboardPage() {
    const { userId } = auth()
    const membership = await getMembership(userId)

    return (
      <div>
        <h1>Welcome back!</h1>
        <MembershipCard membership={membership} />
        <QuickLinks />
      </div>
    )
  }
  ```

- [ ] Create helper to fetch membership
  ```typescript
  // lib/membership.ts
  export async function getMembership(userId: string) {
    const { data } = await supabase
      .from('memberships')
      .select('*')
      .eq('user_id', userId)
      .single()

    return data
  }
  ```

- [ ] Add navigation sidebar
  - Dashboard
  - Profile
  - Resources (coming soon)
  - Events (coming soon)
  - Directory (coming soon)

**Deliverable:** Protected member dashboard showing membership status

**Dependencies:** Day 2 (auth), Day 5 (membership data)

**Blockers:** None

**Notes:**
- Keep it simple - just show membership info
- Full features come in Phase 2
- Verify RLS policies work

---

### Day 8: Deployment to Vercel
**Status:** ⏳ Pending
**Estimated Time:** 3-4 hours

**Tasks:**
- [ ] Connect GitHub repo to Vercel
  - Sign up at vercel.com
  - Import Git repository
  - Select Next.js framework preset

- [ ] Configure environment variables in Vercel
  - Add all .env.local variables
  - Verify keys are correct (production mode)
  - Add Stripe production webhook secret

- [ ] Deploy to production
  - Trigger deployment
  - Check build logs
  - Verify deployment URL

- [ ] Update Stripe webhook endpoint
  - Change endpoint to production URL
  - Use production webhook secret
  - Test with real webhook events

- [ ] Update Clerk redirect URLs
  - Add production URL to allowed domains
  - Test sign-in/sign-up flow

- [ ] Test end-to-end flow in production
  - Visit homepage
  - Sign up new account
  - Purchase subscription (use test mode)
  - Verify webhook creates records
  - Check member dashboard

**Deliverable:** Application live on Vercel with working auth + payment

**Dependencies:** Day 1-7 all complete

**Blockers:** None

**Notes:**
- Keep Stripe in test mode initially
- Verify all environment variables set
- Check Vercel logs for errors

---

### Day 9: CI/CD Pipeline & Testing
**Status:** ⏳ Pending
**Estimated Time:** 3-4 hours

**Tasks:**
- [ ] Create GitHub Actions workflow
  ```yaml
  # .github/workflows/ci.yml
  name: CI
  on: [push, pull_request]

  jobs:
    lint:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v3
        - run: npm install
        - run: npm run lint

    type-check:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v3
        - run: npm install
        - run: npm run type-check

    build:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v3
        - run: npm install
        - run: npm run build
  ```

- [ ] Add npm scripts to package.json
  ```json
  {
    "scripts": {
      "type-check": "tsc --noEmit",
      "lint": "next lint",
      "test": "echo 'Tests coming soon'"
    }
  }
  ```

- [ ] Set up error tracking (Sentry)
  - Create Sentry account
  - Install SDK: `npm install @sentry/nextjs`
  - Configure: `npx @sentry/wizard -i nextjs`

- [ ] Create basic tests
  - Test webhook signature verification
  - Test RLS policies
  - Test auth redirect logic

- [ ] Document deployment process
  - Create `docs/deployment/vercel-setup.md`
  - Document environment variables
  - Add troubleshooting section

**Deliverable:** CI/CD running on every push + error tracking

**Dependencies:** Day 8 complete

**Blockers:** None

**Notes:**
- Start simple, expand tests later
- Sentry catches production errors
- Document everything for future devs

---

### Day 10: Polish, Documentation & Handoff
**Status:** ⏳ Pending
**Estimated Time:** 3-4 hours

**Tasks:**
- [ ] Code cleanup
  - Remove console.log statements
  - Fix linting errors
  - Resolve TypeScript warnings
  - Remove unused imports

- [ ] Update documentation
  - Update README.md with deployment URL
  - Document all environment variables in .env.local.example
  - Create runbook: `docs/runbooks/stripe-webhook-troubleshooting.md`
  - Update PROJECT_ANALYSIS.md with completion status

- [ ] Create handoff document
  ```markdown
  # Phase 1 Completion Report

  ## What Was Delivered
  - ✅ Authentication with Clerk
  - ✅ Stripe Checkout + Webhook
  - ✅ Database schema with RLS
  - ✅ Public pages (homepage, pricing)
  - ✅ Member dashboard skeleton
  - ✅ Deployed to Vercel
  - ✅ CI/CD pipeline active

  ## What's Working
  - User sign-up/sign-in
  - Subscription purchase
  - Webhook creates user + membership
  - Member dashboard shows status

  ## Known Issues
  - [List any known bugs]

  ## Next Steps (Phase 2)
  - Member directory
  - Resource library
  - Event management with Luma
  - Mailchimp integration
  ```

- [ ] Test entire flow one more time
  - Fresh browser, sign up
  - Purchase subscription
  - Verify webhook
  - Check member dashboard
  - Check database records

- [ ] Mark SOLO_DEV_PLAN.md as complete
  - Update status to ✅ Complete
  - Add completion date
  - Note any blockers encountered

**Deliverable:** Production-ready MVP with complete documentation

**Dependencies:** Day 1-9 all complete

**Blockers:** None

**Notes:**
- This is MVP - expect rough edges
- Document everything for Phase 2
- Celebrate completion! 🎉

---

## 📊 Progress Tracking

**Tasks Completed:** 0 / 25 (0%)
**Days Completed:** 0 / 10
**Estimated Time Spent:** 0 hours
**Estimated Time Remaining:** 40-50 hours

---

## 🚧 Blockers & Issues

**Current Blockers:**
- None

**Resolved Blockers:**
- None

---

## 📝 Daily Notes

### Day 1 Notes:
*(Will be filled as work progresses)*

### Day 2 Notes:
*(Will be filled as work progresses)*

---

## 🎯 Success Metrics

**At end of Day 10, we MUST have:**
- [ ] Application deployed and accessible via URL
- [ ] User can sign up and log in
- [ ] User can purchase subscription with test card
- [ ] Webhook creates user + membership in database
- [ ] Member dashboard shows membership status
- [ ] CI/CD pipeline passing
- [ ] Documentation complete for Phase 2 handoff

---

## 🔄 Continuous Updates

**This document MUST be updated:**
- ✅ **Before starting work each day** - Review today's tasks
- ✅ **When starting a task** - Mark as `in_progress`
- ✅ **When completing a task** - Mark as `completed`
- ✅ **When discovering new tasks** - Add to appropriate day
- ✅ **When blocked** - Add to blockers section
- ✅ **End of each day** - Add notes on progress, issues, learnings

**Claude Code will automatically:**
- Read this file at start of every session
- Update task statuses as work progresses
- Add new tasks discovered during implementation
- Note blockers and issues encountered
- Keep this document as source of truth for sprint status

---

**Last Manual Update:** November 2, 2025
**Next Review:** Start of Day 1
