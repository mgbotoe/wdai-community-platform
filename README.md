# Women Defining AI Community Platform

A modern, scalable community platform designed to empower women and non-binary individuals in AI through membership management, gated content, event coordination, and automated workflows.

## 🌟 Overview

Women Defining AI (WDAI) is a nonprofit organization dedicated to closing the technology gap and changing who defines AI. This platform replaces the existing Wix-based site with a robust, automated solution built for scale.

## ✨ Key Features

- **Membership Management** - Direct Stripe integration for subscriptions (monthly, annual, donor tiers)
- **Gated Member Portal** - Member directory, resources library, and exclusive content
- **Event Coordination** - Luma API integration with automated RSVP approval
- **Automated Workflows** - Member lifecycle automation (Stripe → Database → Mailchimp)
- **Agent-Ready API** - MCP-compatible unified API for AI agents
- **Role-Based Access** - Visitor, Member, Leader, Admin roles with Row-Level Security

## 🛠️ Tech Stack

**Frontend:**
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS with custom WDAI design system
- React Server Components

**Backend:**
- Clerk (Authentication & Authorization)
- Supabase (PostgreSQL + Row-Level Security + Storage)
- Stripe (Payments & Subscriptions)
- Inngest (Job Orchestration)

**Integrations:**
- Mailchimp (Email automation with tag-based segmentation)
- Luma (Event management)
- Vimeo (Gated video embeds)
- Slack (Status sync)

**Deployment:**
- Vercel (Hosting + Serverless Functions + Cron)
- GitHub Actions (CI/CD)

## 📋 Project Status

**Current Phase:** MVP Development (Weeks 1-11)
**Completion:** ~40-45% (Planning & Design Complete)

### Completed:
- ✅ Requirements documentation (1,226 lines from stakeholder PDF)
- ✅ Complete design system extraction (colors, typography, components)
- ✅ Database schema design with RLS policies
- ✅ API architecture specification
- ✅ Webhook & job orchestration patterns
- ✅ Modular documentation structure (17 comprehensive docs)

### In Progress:
- 🔄 Next.js project initialization
- 🔄 Tailwind configuration with WDAI brand colors
- 🔄 Core component library

### Upcoming:
- ⏳ Supabase database setup
- ⏳ Clerk authentication integration
- ⏳ Stripe webhook implementation
- ⏳ Member portal development

## 📚 Documentation

Comprehensive documentation organized for developers and AI assistants:

- **`CLAUDE.md`** - AI assistant instructions (337 lines, optimized for context)
- **`REQUIREMENTS.md`** - Complete requirements specification
- **`PROJECT_ANALYSIS.md`** - Detailed implementation analysis
- **`docs/design/`** - Design system (colors, typography, components)
- **`docs/architecture/`** - System architecture & technical specs
- **`docs/wdai-specific/`** - Business rules & integration patterns
- **`docs/standards/`** - Development best practices

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm/yarn/pnpm
- Supabase account
- Clerk account
- Stripe account

### Installation
```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/wdai-community-platform.git
cd wdai-community-platform

# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local
# Edit .env.local with your keys

# Run development server
npm run dev
```

Visit `http://localhost:3000`

## 🏗️ Project Structure

```
wdai-community-platform/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components (UI only, no hardcoded content)
│   ├── data/             # Content separated from code
│   ├── lib/              # Utilities, services, API clients
│   └── types/            # TypeScript type definitions
├── docs/                 # Comprehensive documentation
├── public/               # Static assets
└── supabase/             # Database migrations & functions
```

## 🔐 Security

- **Row-Level Security (RLS)** on all Supabase tables
- **Webhook signature verification** for all third-party integrations
- **Idempotency keys** to prevent duplicate processing
- **Audit logging** for all data mutations
- **Scoped agent API keys** with rate limiting

## 🤝 Contributing

This project follows strict development standards:

1. **Content Separation** - Never hardcode content (team members, events, stats)
2. **Data Files** - Use `src/data/*.ts` for semi-static content
3. **Database** - Use Supabase for dynamic, user-managed content
4. **Incremental Commits** - Small, testable changes that keep app functional
5. **TypeScript Strict Mode** - No implicit any, proper type safety

See `CLAUDE.md` and `docs/standards/` for complete guidelines.

## 📄 License

[To be determined by WDAI organization]

## 🙏 Acknowledgments

Built with guidance from Women Defining AI leadership and community members.

Design system extracted from existing womendefiningai.com site.

Development assisted by Claude Code (Anthropic).

---

**Maintained by:** WDAI Development Team
**Questions?** Contact: info@womendefiningai.com