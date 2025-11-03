# FOLDER STRUCTURE - Women Defining AI Community Platform

**Version:** 1.0
**Last Updated:** November 2, 2025
**Framework:** Next.js 15 App Router + TypeScript

## Table of Contents

1. [Project Structure Overview](#project-structure-overview)
2. [Root Directory](#root-directory)
3. [Source Code (/src)](#source-code-src)
4. [Documentation (/docs)](#documentation-docs)
5. [Configuration Files](#configuration-files)
6. [File Naming Conventions](#file-naming-conventions)
7. [Import Aliases](#import-aliases)

---

## Project Structure Overview

```
wdai-community-platform/
├── .github/                      # GitHub Actions workflows
├── .husky/                       # Git hooks
├── docs/                         # Documentation
├── public/                       # Static assets
├── scripts/                      # Build and deployment scripts
├── src/                          # Source code
├── supabase/                     # Database migrations and config
├── tests/                        # Test files
├── .env.local.example            # Environment variables template
├── .eslintrc.json                # ESLint configuration
├── .gitignore                    # Git ignore rules
├── .prettierrc                   # Prettier configuration
├── CLAUDE.md                     # AI assistant instructions
├── LICENSE                       # License file
├── next.config.js                # Next.js configuration
├── package.json                  # Dependencies and scripts
├── PROJECT_ANALYSIS.md           # Project analysis document
├── README.md                     # Project overview
├── REQUIREMENTS.md               # Project requirements
├── tsconfig.json                 # TypeScript configuration
└── vercel.json                   # Vercel deployment config
```

---

## Root Directory

**Maximum 15 files in root - keep it clean!**

### Essential Configuration Files Only

```
wdai-community-platform/
├── .env.local.example            # Environment variables template
├── .eslintrc.json                # ESLint rules
├── .gitignore                    # Git ignore patterns
├── .prettierrc                   # Code formatting rules
├── CLAUDE.md                     # AI assistant guidelines
├── LICENSE                       # MIT License
├── next-env.d.ts                 # Next.js TypeScript definitions
├── next.config.js                # Next.js configuration
├── package-lock.json             # Locked dependencies
├── package.json                  # Project dependencies
├── PROJECT_ANALYSIS.md           # Detailed project analysis
├── README.md                     # Project documentation
├── REQUIREMENTS.md               # Business requirements
├── tsconfig.json                 # TypeScript config
└── vercel.json                   # Vercel deployment settings
```

---

## Source Code (/src)

### /src Structure

```
src/
├── app/                          # Next.js App Router
├── components/                   # React components
├── hooks/                        # Custom React hooks
├── lib/                          # Utility libraries and services
├── schemas/                      # Zod validation schemas
├── services/                     # Business logic services
├── stores/                       # State management (Zustand)
├── styles/                       # Global styles
├── types/                        # TypeScript type definitions
├── utils/                        # Helper functions
└── middleware.ts                 # Next.js middleware
```

### /src/app - Next.js App Router

```
src/app/
├── (public)/                     # Public routes (no auth required)
│   ├── layout.tsx                # Public layout wrapper
│   ├── page.tsx                  # Landing page
│   ├── pricing/
│   │   └── page.tsx              # Pricing page
│   ├── about/
│   │   └── page.tsx              # About page
│   └── contact/
│       └── page.tsx              # Contact page
│
├── (auth)/                       # Authentication routes
│   ├── layout.tsx                # Auth layout
│   ├── sign-in/
│   │   └── [[...sign-in]]/
│   │       └── page.tsx          # Clerk sign-in
│   ├── sign-up/
│   │   └── [[...sign-up]]/
│   │       └── page.tsx          # Clerk sign-up
│   └── sso-callback/
│       └── page.tsx              # SSO callback handler
│
├── (member)/                     # Member portal (auth required)
│   ├── layout.tsx                # Member layout
│   ├── member/
│   │   ├── dashboard/
│   │   │   └── page.tsx          # Member dashboard
│   │   ├── profile/
│   │   │   ├── page.tsx          # Profile view
│   │   │   └── edit/
│   │   │       └── page.tsx      # Profile edit
│   │   ├── directory/
│   │   │   ├── page.tsx          # Member directory
│   │   │   └── [id]/
│   │   │       └── page.tsx      # Member profile view
│   │   ├── resources/
│   │   │   ├── page.tsx          # Resource library
│   │   │   └── [id]/
│   │   │       └── page.tsx      # Resource detail
│   │   ├── events/
│   │   │   ├── page.tsx          # Event listing
│   │   │   └── [id]/
│   │   │       └── page.tsx      # Event detail
│   │   └── billing/
│   │       └── page.tsx          # Subscription management
│
├── (leader)/                     # Leader dashboard (leader role)
│   ├── layout.tsx                # Leader layout
│   └── leader/
│       ├── dashboard/
│       │   └── page.tsx          # Leader dashboard
│       ├── events/
│       │   ├── page.tsx          # Event management
│       │   ├── new/
│       │   │   └── page.tsx      # Create event
│       │   └── [id]/
│       │       └── edit/
│       │           └── page.tsx  # Edit event
│       ├── resources/
│       │   ├── page.tsx          # Resource management
│       │   ├── new/
│       │   │   └── page.tsx      # Upload resource
│       │   └── [id]/
│       │       └── edit/
│       │           └── page.tsx  # Edit resource
│       └── analytics/
│           └── page.tsx          # Leader analytics
│
├── api/                          # API routes
│   ├── stripe/
│   │   └── webhook/
│   │       └── route.ts          # Stripe webhooks
│   ├── clerk/
│   │   └── webhook/
│   │       └── route.ts          # Clerk webhooks
│   ├── jobs/
│   │   ├── luma-auto-approve/
│   │   │   └── route.ts          # Luma auto-approval
│   │   ├── slack-sync/
│   │   │   └── route.ts          # Slack sync
│   │   └── cleanup/
│   │       └── route.ts          # Data cleanup
│   ├── agents/
│   │   ├── openapi.json/
│   │   │   └── route.ts          # OpenAPI spec
│   │   ├── members/
│   │   │   ├── route.ts          # Member CRUD
│   │   │   └── [id]/
│   │   │       └── route.ts      # Individual member
│   │   ├── payments/
│   │   │   └── route.ts          # Payment operations
│   │   ├── events/
│   │   │   ├── route.ts          # Event CRUD
│   │   │   └── [id]/
│   │   │       └── route.ts      # Individual event
│   │   ├── content/
│   │   │   ├── route.ts          # Content CRUD
│   │   │   └── [id]/
│   │   │       └── route.ts      # Individual content
│   │   └── analytics/
│   │       └── route.ts          # Analytics queries
│   ├── app/
│   │   ├── health/
│   │   │   └── route.ts          # Health check
│   │   ├── members/
│   │   │   └── route.ts          # Internal member API
│   │   ├── resources/
│   │   │   └── route.ts          # Internal resource API
│   │   └── events/
│   │       └── route.ts          # Internal event API
│   └── inngest/
│       └── route.ts              # Inngest webhook handler
│
├── layout.tsx                    # Root layout
├── loading.tsx                   # Global loading state
├── error.tsx                     # Global error boundary
├── not-found.tsx                 # 404 page
└── global.css                    # Global styles
```

### /src/components

```
src/components/
├── ui/                           # shadcn/ui components
│   ├── button.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   ├── dropdown-menu.tsx
│   ├── form.tsx
│   ├── input.tsx
│   ├── label.tsx
│   ├── select.tsx
│   ├── separator.tsx
│   ├── skeleton.tsx
│   ├── table.tsx
│   ├── tabs.tsx
│   ├── textarea.tsx
│   ├── toast.tsx
│   ├── toaster.tsx
│   └── tooltip.tsx
│
├── shared/                       # Shared components
│   ├── layouts/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   └── MobileNav.tsx
│   ├── auth/
│   │   ├── AuthGuard.tsx
│   │   ├── RoleGuard.tsx
│   │   └── UserButton.tsx
│   ├── loading/
│   │   ├── LoadingSpinner.tsx
│   │   ├── LoadingSkeleton.tsx
│   │   └── PageLoader.tsx
│   └── error/
│       ├── ErrorBoundary.tsx
│       ├── ErrorFallback.tsx
│       └── NotFound.tsx
│
├── member/                       # Member-specific components
│   ├── MemberCard.tsx
│   ├── MemberDirectory.tsx
│   ├── MemberProfile.tsx
│   ├── ProfileEditForm.tsx
│   └── VisibilityToggle.tsx
│
├── leader/                       # Leader-specific components
│   ├── EventForm.tsx
│   ├── ResourceUpload.tsx
│   ├── AnalyticsDashboard.tsx
│   └── MemberManagement.tsx
│
├── billing/                      # Billing components
│   ├── PricingCard.tsx
│   ├── CheckoutForm.tsx
│   ├── SubscriptionStatus.tsx
│   └── PaymentHistory.tsx
│
├── events/                       # Event components
│   ├── EventCard.tsx
│   ├── EventList.tsx
│   ├── EventDetail.tsx
│   ├── RSVPButton.tsx
│   └── EventCalendar.tsx
│
└── resources/                    # Resource components
    ├── ResourceCard.tsx
    ├── ResourceGrid.tsx
    ├── ResourceViewer.tsx
    ├── VideoPlayer.tsx
    └── PDFViewer.tsx
```

### /src/lib

```
src/lib/
├── supabase/                     # Supabase client and helpers
│   ├── client.ts                 # Browser client
│   ├── server.ts                 # Server client
│   ├── service.ts                # Service role client
│   ├── middleware.ts             # Supabase middleware
│   └── types.ts                  # Database types
│
├── stripe/                       # Stripe integration
│   ├── client.ts                 # Stripe client
│   ├── webhooks.ts               # Webhook handlers
│   ├── checkout.ts               # Checkout helpers
│   └── customer-portal.ts        # Portal helpers
│
├── clerk/                        # Clerk authentication
│   ├── client.ts                 # Clerk client
│   ├── server.ts                 # Server helpers
│   └── webhooks.ts               # Webhook handlers
│
├── mailchimp/                    # Mailchimp integration
│   ├── client.ts                 # API client
│   ├── sync.ts                   # Member sync
│   └── tags.ts                   # Tag management
│
├── luma/                         # Luma event integration
│   ├── client.ts                 # API client
│   ├── events.ts                 # Event management
│   └── rsvp.ts                   # RSVP handling
│
├── slack/                        # Slack integration
│   ├── client.ts                 # API client
│   └── sync.ts                   # Status sync
│
├── agents/                       # Agent API utilities
│   ├── auth.ts                   # Key verification
│   ├── rate-limit.ts             # Rate limiting
│   └── scopes.ts                 # Scope validation
│
├── jobs/                         # Background jobs (Inngest)
│   ├── client.ts                 # Inngest client
│   ├── mailchimp-sync.ts         # Mailchimp sync job
│   ├── member-deactivation.ts    # Deactivation job
│   └── cleanup.ts                # Cleanup jobs
│
├── redis/                        # Redis/Upstash utilities
│   ├── client.ts                 # Redis client
│   ├── cache.ts                  # Caching helpers
│   └── rate-limit.ts             # Rate limiter
│
├── analytics/                    # Analytics utilities
│   ├── client.ts                 # Analytics client
│   ├── events.ts                 # Event tracking
│   └── metrics.ts                # Metric queries
│
├── audit/                        # Audit logging
│   ├── logger.ts                 # Audit logger
│   └── types.ts                  # Audit types
│
├── utils.ts                      # General utilities
├── constants.ts                  # App constants
└── errors.ts                     # Error classes
```

### /src/services

```
src/services/
├── base.service.ts               # Base service class
├── user.service.ts               # User operations
├── membership.service.ts         # Membership management
├── resource.service.ts           # Resource management
├── event.service.ts              # Event management
├── payment.service.ts            # Payment operations
├── integration.service.ts        # Third-party integrations
└── audit.service.ts              # Audit logging
```

### /src/schemas

```
src/schemas/
├── user.schema.ts                # User validation
├── membership.schema.ts          # Membership validation
├── resource.schema.ts            # Resource validation
├── event.schema.ts               # Event validation
├── payment.schema.ts             # Payment validation
├── webhook.schema.ts             # Webhook payload validation
└── api.schema.ts                 # API request/response schemas
```

### /src/types

```
src/types/
├── database.types.ts             # Supabase generated types
├── api.types.ts                  # API types
├── clerk.types.ts                # Clerk type extensions
├── stripe.types.ts               # Stripe type extensions
├── global.d.ts                   # Global type declarations
└── index.ts                      # Type exports
```

---

## Documentation (/docs)

```
docs/
├── README.md                     # Documentation index
├── architecture/                 # System architecture
│   ├── README.md                 # Architecture overview
│   ├── DATABASE_SCHEMA.md        # Database design
│   ├── API_ARCHITECTURE.md       # API design
│   ├── FOLDER_STRUCTURE.md       # This file
│   ├── INTEGRATION_FLOWS.md      # Integration diagrams
│   ├── JOB_ORCHESTRATION.md      # Job system design
│   └── PHASE_1_PLAN.md           # Implementation plan
│
├── runbooks/                     # Operations guides
│   ├── README.md                 # Runbook index
│   ├── stripe-webhook-failure.md # Stripe troubleshooting
│   ├── mailchimp-sync-issues.md  # Mailchimp troubleshooting
│   ├── luma-api-errors.md        # Luma troubleshooting
│   ├── slack-sync.md             # Slack sync guide
│   ├── database-recovery.md      # DB recovery procedures
│   └── incident-response.md      # Incident playbook
│
├── integrations/                 # Third-party integration docs
│   ├── README.md                 # Integration index
│   ├── stripe.md                 # Stripe setup guide
│   ├── clerk.md                  # Clerk configuration
│   ├── supabase.md               # Supabase setup
│   ├── mailchimp.md              # Mailchimp automation
│   ├── luma.md                   # Luma API usage
│   ├── slack.md                  # Slack integration
│   └── inngest.md                # Inngest job setup
│
├── deployment/                   # Deployment documentation
│   ├── README.md                 # Deployment overview
│   ├── vercel.md                 # Vercel deployment
│   ├── environment-variables.md  # Env var reference
│   ├── ci-cd.md                  # CI/CD pipeline
│   ├── monitoring.md             # Monitoring setup
│   └── security.md               # Security guidelines
│
├── development/                  # Development guides
│   ├── README.md                 # Dev guide index
│   ├── local-setup.md            # Local development
│   ├── testing.md                # Testing strategy
│   ├── code-style.md             # Code standards
│   ├── git-workflow.md           # Git conventions
│   └── troubleshooting.md        # Common issues
│
├── api/                          # API documentation
│   ├── README.md                 # API overview
│   ├── webhooks.md               # Webhook reference
│   ├── agent-api.md              # Agent API guide
│   ├── internal-api.md           # Internal API docs
│   └── openapi.yaml              # OpenAPI specification
│
└── sprints/                      # Sprint planning
    ├── README.md                 # Sprint overview
    ├── sprint-1/                 # Week 1-2
    │   ├── plan.md               # Sprint plan
    │   ├── tasks.md              # Task breakdown
    │   └── retrospective.md      # Sprint retro
    ├── sprint-2/                 # Week 3-4
    ├── sprint-3/                 # Week 5-6
    ├── sprint-4/                 # Week 7-8
    ├── sprint-5/                 # Week 9-10
    ├── sprint-6/                 # Week 11
    ├── backlog/                  # Product backlog
    │   └── features.md           # Feature requests
    └── risks/                    # Risk assessment
        └── technical-risks.md    # Technical debt
```

---

## Configuration Files

### Package Management

```json
// package.json
{
  "name": "wdai-community-platform",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "format": "prettier --write .",
    "test": "vitest",
    "test:e2e": "playwright test",
    "db:generate": "supabase gen types typescript",
    "db:migrate": "supabase migration up",
    "analyze": "ANALYZE=true next build"
  },
  "dependencies": {
    "next": "15.0.0",
    "react": "19.0.0",
    "@clerk/nextjs": "^5.0.0",
    "@supabase/supabase-js": "^2.39.0",
    "stripe": "^14.0.0",
    "inngest": "^3.0.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "typescript": "^5.0.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0",
    "vitest": "^1.0.0",
    "playwright": "^1.40.0"
  }
}
```

### TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/services/*": ["./src/services/*"],
      "@/schemas/*": ["./src/schemas/*"],
      "@/types/*": ["./src/types/*"],
      "@/utils/*": ["./src/utils/*"],
      "@/styles/*": ["./src/styles/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### ESLint Configuration

```json
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "react/display-name": "off",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

### Prettier Configuration

```json
// .prettierrc
{
  "semi": false,
  "trailingComma": "es5",
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false,
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

---

## File Naming Conventions

### General Rules

1. **Folders:** kebab-case (`member-portal`, `api-routes`)
2. **React Components:** PascalCase (`MemberProfile.tsx`)
3. **Utilities/Hooks:** camelCase (`useAuth.ts`, `formatDate.ts`)
4. **Constants:** UPPER_SNAKE_CASE in files (`MAX_RETRIES`)
5. **Types/Interfaces:** PascalCase with prefix (`IUser`, `TApiResponse`)
6. **Schema files:** kebab-case with `.schema.ts` (`user.schema.ts`)
7. **Service files:** kebab-case with `.service.ts` (`user.service.ts`)
8. **Test files:** Same name with `.test.ts` or `.spec.ts`

### Examples

```
✅ Good:
src/components/member/MemberCard.tsx
src/hooks/useAuth.ts
src/lib/utils/format-date.ts
src/schemas/user.schema.ts
src/services/user.service.ts

❌ Bad:
src/components/member/memberCard.tsx
src/hooks/UseAuth.ts
src/lib/utils/FormatDate.ts
src/schemas/UserSchema.ts
src/services/UserService.ts
```

---

## Import Aliases

### Available Aliases

```typescript
// Use these import aliases for cleaner imports:
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase/client'
import { UserService } from '@/services/user.service'
import { UserSchema } from '@/schemas/user.schema'
import type { User } from '@/types'
import { formatDate } from '@/utils/format'
import '@/styles/globals.css'
```

### Import Order Convention

```typescript
// 1. React/Next.js
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// 2. Third-party libraries
import { z } from 'zod'
import { format } from 'date-fns'

// 3. Internal aliases
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'

// 4. Relative imports
import { localHelper } from './helper'

// 5. Style imports
import styles from './Component.module.css'

// 6. Type imports (always last)
import type { User, Membership } from '@/types'
```

---

## README Files

Each major directory should have a README.md explaining its purpose:

### Example: /src/components/README.md

```markdown
# Components Directory

This directory contains all React components organized by feature area.

## Structure

- `/ui` - Base UI components (shadcn/ui)
- `/shared` - Components used across features
- `/member` - Member-specific components
- `/leader` - Leader-specific components
- `/billing` - Payment and subscription components
- `/events` - Event-related components
- `/resources` - Resource management components

## Component Guidelines

1. Each component should be in its own file
2. Use TypeScript for all components
3. Include prop types via interfaces
4. Memoize expensive components with React.memo()
5. Co-locate styles and tests with components

## Example Component

\`\`\`tsx
interface MemberCardProps {
  member: User
  onClick?: (id: string) => void
}

export const MemberCard = memo(({ member, onClick }: MemberCardProps) => {
  // Component logic
})
\`\`\`
```

---

**Next Steps:**
1. Create the folder structure using scripts
2. Set up path aliases in tsconfig.json
3. Create README files for each directory
4. Implement ESLint and Prettier configs
5. Set up Git hooks with Husky