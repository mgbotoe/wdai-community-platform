# Repository Standards - WDAI Community Platform

**Last Updated:** November 3, 2025

---

## 📂 Repository Cleanliness

### Root Directory Rules

**Maximum ~15 files in root:**
- Only essential configs (package.json, tsconfig.json, next.config.ts, etc.)
- NO source code, test files, or temporary files
- Documentation in `docs/` except README.md

### Proper Project Structure

```
wdai-community-platform/          # Root (~15 files max)
├── app/                          # Next.js App Router
│   ├── (auth)/                  # Auth pages group (sign-in, sign-up)
│   ├── (public)/                # Public pages group (homepage, pricing)
│   ├── (member)/                # Member portal group (dashboard, directory)
│   └── api/                     # API routes (webhooks, agent endpoints)
├── components/
│   ├── layout/                  # Header, Footer, Navigation
│   ├── ui/                      # Reusable UI components (Button, Card, etc.)
│   └── sections/                # Page sections (Hero, Stats, Team, etc.)
├── data/                        # ✅ Content files (NO hardcoded content!)
│   ├── homepage.ts
│   ├── team-members.ts
│   ├── navigation.ts
│   └── membership-tiers.ts
├── lib/
│   ├── clients/                 # API clients (Clerk, Supabase, Stripe, etc.)
│   ├── services/                # Business logic services
│   └── utils/                   # Helper utilities
├── types/                       # TypeScript type definitions
├── public/                      # Static assets (images, fonts, etc.)
├── docs/                        # Comprehensive documentation
│   ├── architecture/
│   ├── design/
│   ├── implementation/
│   ├── standards/
│   └── wdai-specific/
└── supabase/                    # Database migrations & functions

**Essential configs in root:**
- package.json, package-lock.json
- tsconfig.json
- next.config.ts
- tailwind.config.ts, postcss.config.mjs
- .eslintrc.json
- .gitignore, .gitattributes
- .env.local.example
- CLAUDE.md, README.md, REQUIREMENTS.md, PROJECT_ANALYSIS.md
```

---

## ❌ Files That Should NEVER Be in Root

### Test Files
- `test-*.html`, `test-*.js`, `test-*.ts`
- `*.test.ts`, `*.test.tsx`, `*.spec.ts`
- Test files belong in `__tests__/` or `e2e/` folders

### Database Files
- `*.sql` (except in `supabase/migrations/`)
- `*.db`, `*.sqlite`, `*.sqlite3`

### Temporary/Analysis Files
- `*_ANALYSIS.md`, `*_ASSESSMENT.md`, `*_TODO.md`
- `*.tmp`, `*.temp`, `*.bak`
- `nul`

### Build Artifacts
- `dist/`, `build/`, `out/`
- `*.tsbuildinfo`

### Generated Types
- `*-types.ts` (except essential ones)
- Auto-generated `*.d.ts` files

---

## 📋 Essential .gitignore Configuration

### Complete .gitignore Template

```gitignore
# Dependencies
node_modules/
.pnp
.pnp.js
.yarn/install-state.gz

# Testing
coverage/
.nyc_output/
playwright-report/
test-results/
*.lcov

# Next.js
.next/
out/
build/
dist/

# Production
*.tsbuildinfo
next-env.d.ts

# Environment Variables
.env
.env*.local
.env.production
!.env.example
!.env*.example

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*
lerna-debug.log*

# IDE
.vscode/
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json
.idea/
*.swp
*.swo
*~
.DS_Store

# Vercel
.vercel

# Turbo
.turbo/

# Misc
*.pem
*.log
.cache/
tmp/
temp/
*.tmp
*.temp
*.bak

# OS
Thumbs.db
.DS_Store

# Test files (should be in __tests__ or e2e/ folders)
test-*.html
test-*.js
test-*.ts

# SQL files (except migrations)
*.sql
!supabase/migrations/*.sql
!supabase/seed.sql

# Database
*.db
*.sqlite
*.sqlite3

# Temporary analysis files
*_ANALYSIS.md
*_ASSESSMENT.md
*_TODO.md

# Supabase
supabase/.branches
supabase/.temp
```

---

## 🚫 NEVER Commit These

### Security-Sensitive Files
- ❌ API keys or secrets
- ❌ `.env`, `.env.local`, `.env.production`
- ❌ Service account credentials
- ❌ SSL certificates (`*.pem`, `*.key`)
- ❌ Database connection strings with passwords

### Generated/Build Files
- ❌ `node_modules/` folder
- ❌ Build outputs (`dist/`, `build/`, `.next/`)
- ❌ Compiled files (`*.tsbuildinfo`)
- ❌ Test coverage reports
- ❌ Bundle analysis reports

### Development Files
- ❌ IDE-specific settings (`.vscode/`, `.idea/`)
- ❌ OS files (`.DS_Store`, `Thumbs.db`)
- ❌ Temporary files (`*.tmp`, `*.temp`, `*.bak`)
- ❌ Debug logs (`*.log`)

### Test/Analysis Files
- ❌ Test artifacts in root (`test-*.html`)
- ❌ Analysis documents (`*_ANALYSIS.md`, `*_TODO.md`)
- ❌ Database files in root (`*.db`, `*.sqlite`)

---

## ✅ Maintenance Checklist

### Before Every Commit

- [ ] Check git status for unexpected files
- [ ] Verify no `.env` files are staged
- [ ] Confirm no `node_modules/` or build artifacts
- [ ] Check root directory has ~15 files max
- [ ] Verify test files are in proper folders
- [ ] Confirm no temporary files staged

### Weekly Repository Audit

- [ ] Review root directory file count
- [ ] Check for stale temporary files
- [ ] Verify `.gitignore` is comprehensive
- [ ] Clean up any orphaned files
- [ ] Update documentation if structure changed

### Commands for Cleanup

```bash
# Check root directory file count
ls -1 | wc -l

# Find temporary files
find . -name "*.tmp" -o -name "*.temp" -o -name "*.bak"

# Find test files in root
find . -maxdepth 1 -name "test-*"

# Find analysis documents
find . -name "*_ANALYSIS.md" -o -name "*_TODO.md"
```

---

## 📖 Related Documentation

**For content management:** See `docs/standards/content-management.md`
**For development workflow:** See `CLAUDE.md`
**For WDAI business rules:** See `docs/wdai-specific/business-rules.md`

---

**Maintained by:** Development Team
**Questions?** Check `/CLAUDE.md` for quick reference
