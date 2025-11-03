# Documentation Index - WDAI Community Platform

**Last Updated:** November 2, 2025

---

## 📋 Primary Documents (Start Here)

| Document | Purpose | Location |
|----------|---------|----------|
| **CLAUDE.md** | AI assistant quick reference | `/CLAUDE.md` |
| **REQUIREMENTS.md** | Complete project requirements | `/REQUIREMENTS.md` |
| **PROJECT_ANALYSIS.md** | Implementation status & analysis | `/PROJECT_ANALYSIS.md` |

---

## 📂 Documentation Structure

```
docs/
├── README.md                      # This file
├── DOCUMENTATION_AUDIT.md         # Documentation completeness audit
│
├── design/                        # Design system extraction
│   ├── COLOR_PALETTE.md          # Brand colors (12+ colors)
│   ├── TYPOGRAPHY.md             # Font system
│   ├── COMPONENTS.md             # UI component patterns
│   ├── tailwind.config.example.ts # Tailwind configuration
│   ├── DESIGN_EXTRACTION_SUMMARY.md # Complete summary
│   └── screenshots/              # Visual references
│
├── standards/                     # Universal best practices
│   ├── content-management.md     # **CRITICAL:** Avoid hardcoded data
│   ├── repository-standards.md   # Repository cleanliness & .gitignore
│   └── skills-agents-strategy.md # When to use skills/agents proactively
│
├── wdai-specific/                 # Project-specific rules
│   ├── business-rules.md         # Membership tiers, roles, visibility
│   ├── webhook-patterns.md       # Webhook security & idempotency
│   ├── rls-patterns.md           # Database security policies
│   └── agent-api-patterns.md     # MCP agent endpoints
│
├── architecture/                  # System architecture
│   ├── README.md                 # Architecture overview
│   ├── DATABASE_SCHEMA.md        # Supabase tables + RLS
│   ├── API_ARCHITECTURE.md       # API routes & agent endpoints
│   ├── FOLDER_STRUCTURE.md       # Next.js project organization
│   ├── INTEGRATION_FLOWS.md      # Mermaid sequence diagrams
│   ├── JOB_ORCHESTRATION.md      # Inngest recommendation
│   └── PHASE_1_PLAN.md           # Week 1-2 daily tasks
│
└── requirements/                  # Source requirements
    └── (PDF and extractions)
```

---

## 🎯 Quick Navigation

### For AI Assistants (Every Session)
1. Read **CLAUDE.md** (auto-loaded, ~430 lines)
2. Check **docs/standards/content-management.md** before writing components
3. Reference **docs/wdai-specific/** for project-specific patterns

### For Developers (Onboarding)
1. **README.md** - Project overview
2. **REQUIREMENTS.md** - What we're building
3. **PROJECT_ANALYSIS.md** - Current status
4. **docs/architecture/** - How it's structured
5. **docs/design/** - Design system

### For Content Management
Read **docs/standards/content-management.md** to understand:
- What should/shouldn't be hardcoded
- Three-tier content strategy
- Data file structure (`src/data/`)
- Migration path to database

### For Security & Compliance
1. **docs/wdai-specific/business-rules.md** - WDAI rules
2. **docs/wdai-specific/webhook-patterns.md** - Webhook security
3. **docs/wdai-specific/rls-patterns.md** - Database security
4. **docs/architecture/DATABASE_SCHEMA.md** - RLS policies

### For Design Implementation
1. **docs/design/COLOR_PALETTE.md** - All brand colors
2. **docs/design/TYPOGRAPHY.md** - Typography system
3. **docs/design/COMPONENTS.md** - Component patterns
4. **docs/design/tailwind.config.example.ts** - Ready-to-use config

---

## 📊 Documentation Stats

**Total Documentation:**
- **CLAUDE.md:** 337 lines (down from 1,505) - **77% reduction**
- **Modular docs:** 5 new files in `docs/standards/` and `docs/wdai-specific/`
- **Design docs:** 5 files with complete design system
- **Architecture docs:** 7 files with technical specifications

**Token Savings:**
- **Before:** ~12,000 tokens per session (CLAUDE.md loaded automatically)
- **After:** ~2,500 tokens per session
- **Savings:** ~10,000 tokens per session (80% reduction)

---

## 🔄 Documentation Maintenance

### When to Update Docs

**CLAUDE.md** - Update when:
- Adding new critical rules that ALL code must follow
- Changing project tech stack
- Adding new mandatory pre-work steps

**docs/standards/** - Update when:
- Establishing new universal best practices
- Changing code quality standards
- Adding new development workflows

**docs/wdai-specific/** - Update when:
- Changing business rules (membership tiers, roles)
- Updating webhook patterns
- Modifying RLS policies
- Changing agent API design

**docs/architecture/** - Update when:
- Adding new database tables
- Creating new API endpoints
- Changing folder structure
- Updating integration flows

**docs/design/** - Update when:
- Brand colors change
- Typography system updates
- New component patterns added
- Design system evolves

---

## ✅ Documentation Quality Checklist

Before considering documentation "complete":

- [ ] CLAUDE.md is under 500 lines
- [ ] All detailed guides moved to `docs/`
- [ ] Each doc has clear purpose and last updated date
- [ ] Cross-references between docs are accurate
- [ ] Code examples are tested and working
- [ ] Anti-patterns clearly marked with ❌
- [ ] Best practices clearly marked with ✅
- [ ] Migration paths documented (data files → database)

---

## 📞 Documentation Help

**Can't find what you need?**
1. Check this README for navigation
2. Search across docs: `grep -r "keyword" docs/`
3. Check git history: `git log --all --full-history -- docs/`

**Found outdated docs?**
1. Update the specific file
2. Update "Last Updated" date
3. Update cross-references if needed
4. Commit with message: `docs: update [filename] - [what changed]`

---

**Maintained by:** Development Team
**Questions?** Check `/CLAUDE.md` or `/PROJECT_ANALYSIS.md`
