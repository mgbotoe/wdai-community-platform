# Skills & Agents Strategy - WDAI Community Platform

**Last Updated:** November 3, 2025

---

## 🤖 When to Use Skills & Agents

This document defines when Claude Code should proactively launch skills or agents for the WDAI Community Platform project.

### Understanding the Difference

**Skills:** Auto-invoked based on keyword triggers, load additional context
**Agents:** Manually launched via Task tool for specialized, autonomous work

---

## 🎯 Auto-Invoking Skills

### Skills That Auto-Invoke (Already Configured)

1. **`product-owner-workflow`**
   - **Triggers:** new feature, user story, acceptance criteria, requirements, feature spec
   - **Use:** Requirements gathering, feature definition
   - **When:** User mentions new features or unclear requirements

2. **`feature-orchestrator`**
   - **Triggers:** feature implementation, build feature, add feature
   - **Use:** Comprehensive feature implementation workflow
   - **When:** Implementing any new feature

3. **`qa-testing`**
   - **Triggers:** test, testing, QA, test coverage, test automation
   - **Use:** Writing tests, test coverage, QA workflows
   - **When:** User asks about testing or test implementation

4. **`ui-ux-audit`**
   - **Triggers:** UI, UX, design, layout, homepage, page improvements
   - **Use:** UI/UX audits, redundancy checks, design consistency
   - **When:** Making UI changes or user mentions design

5. **`design-system-migration`**
   - **Triggers:** redesign, theme change, complete UI transformation
   - **Use:** Large-scale design system changes
   - **When:** Major UI overhauls

6. **`code-refactoring`**
   - **Triggers:** File size checks, complexity detection
   - **Use:** Proactive refactoring suggestions before editing
   - **When:** Files exceed size thresholds (150/200/300 lines)

7. **`devops-deployment`**
   - **Triggers:** deploy, deployment, CI/CD, infrastructure, production
   - **Use:** Deployment, containerization, monitoring
   - **When:** User asks about deployment or going live

8. **`rag-knowledge-maintenance`**
   - **Triggers:** Editing portfolio data files (work-data, projects-data, etc.)
   - **Use:** Maintaining RAG knowledge base consistency
   - **When:** Content updates require knowledge base sync

---

## 🚀 Manual Agent Launch (Proactive Strategy)

### When Claude Should Launch Agents

#### 1. **backend-developer** Agent

**Launch When:**
- Implementing Stripe webhooks (Day 3-4)
- Building Clerk webhook handlers (Day 4)
- Creating Supabase database services (Day 4-5)
- Implementing membership automation jobs (Day 5-6)
- Building Agent API endpoints (Day 8-9)

**Examples:**
- "Let's implement Stripe subscription webhooks"
- "Build the member sync automation"
- "Create the agent API for member directory"

**Why:** Backend agent specializes in:
- API routes and webhooks
- Database service layers
- Job orchestration patterns
- Security best practices

#### 2. **frontend-developer** Agent

**Launch When:**
- Building member portal UI (Day 5-7)
- Creating public homepage (Day 6-7)
- Implementing member directory (Day 7)
- Building event RSVP forms (Day 8)
- Creating leader dashboard (Day 9)

**Examples:**
- "Build the member portal dashboard"
- "Create the homepage with WDAI design system"
- "Implement the member directory with search/filter"

**Why:** Frontend agent specializes in:
- React component architecture
- State management
- API integration from UI
- Responsive design patterns

#### 3. **security-specialist** Agent

**Launch When:**
- Implementing Row-Level Security policies (Day 4)
- Reviewing webhook security (Day 3-4)
- Setting up Clerk auth flows (Day 2)
- Implementing API rate limiting (Day 8)
- Pre-deployment security audit (Day 10)

**Examples:**
- "Implement RLS policies for all database tables"
- "Review security of our Stripe webhook implementation"
- "Audit the member API for security vulnerabilities"

**Why:** Security agent specializes in:
- RLS policy design
- Authentication/authorization flows
- Webhook signature verification
- Security vulnerability detection

#### 4. **critic-agent** Agent

**Launch When:**
- After implementing critical webhooks (Day 3-4)
- After completing auth flows (Day 2)
- After RLS policy implementation (Day 4)
- Before deployment (Day 10)
- After major feature completion

**Examples:**
- "Review the Stripe webhook implementation for correctness"
- "Audit the RLS policies before deployment"
- "Check the member sync automation for edge cases"

**Why:** Critic agent provides:
- Independent validation
- Quality assurance
- Code review
- Architectural assessment

#### 5. **project-architect** Agent

**Launch When:**
- Major architectural decisions needed
- Database schema changes required (rare - already done)
- New system integration planning
- Performance optimization planning

**Examples:**
- "Should we add caching layer for member directory?"
- "How should we architect the event RSVP workflow?"
- "Plan the leader dashboard data architecture"

**Why:** Architect agent specializes in:
- System design decisions
- Database architecture
- Performance optimization
- Integration patterns

#### 6. **ui-ux-designer** Agent

**Launch When:**
- Major UI decisions (member portal layout)
- Accessibility concerns
- User flow design (onboarding, checkout)
- Design system consistency check

**Examples:**
- "Design the member onboarding user flow"
- "Review member directory UX for accessibility"
- "Suggest layout improvements for leader dashboard"

**Why:** UX designer agent provides:
- Research-backed feedback
- Accessibility guidance
- User flow optimization
- Evidence-based recommendations

---

## 📅 WDAI Project-Specific Agent Schedule

### Day 1: Project Setup ✅ Completed
**No agents needed** - Basic setup, straightforward

### Day 2: Clerk Authentication
**Agents to Launch:**
- [ ] `security-specialist` - Review auth flow design

### Day 3-4: Stripe Webhooks & Database
**Agents to Launch:**
- [ ] `backend-developer` - Implement webhooks
- [ ] `security-specialist` - Review webhook security
- [ ] `critic-agent` - Audit webhook implementation

### Day 4-5: Database Services & RLS
**Agents to Launch:**
- [ ] `backend-developer` - Create database services
- [ ] `security-specialist` - Implement RLS policies
- [ ] `critic-agent` - Review RLS before moving forward

### Day 5-7: Member Portal & Public Pages
**Agents to Launch:**
- [ ] `frontend-developer` - Build member portal
- [ ] `ui-ux-designer` - Review member portal UX
- [ ] `frontend-developer` - Build homepage

### Day 8-9: Agent API & Advanced Features
**Agents to Launch:**
- [ ] `backend-developer` - Implement Agent API
- [ ] `security-specialist` - Review API security

### Day 10: Deployment
**Agents to Launch:**
- [ ] `devops-deployment` - Handle deployment setup (auto-invokes)
- [ ] `security-specialist` - Pre-deployment security audit
- [ ] `critic-agent` - Final quality review

---

## 🎯 Decision Matrix: Skill vs Agent vs Direct Implementation

### Use Auto-Invoking Skills When:
- ✅ User mentions trigger keywords
- ✅ Task fits skill's specialized workflow
- ✅ Want guided, step-by-step process

### Use Manual Agent Launch When:
- ✅ Complex, multi-file implementation
- ✅ Need specialized domain expertise
- ✅ Want autonomous, end-to-end completion
- ✅ Critical code that needs expert review

### Direct Implementation (No Skill/Agent) When:
- ✅ Simple, single-file changes
- ✅ Bug fixes < 10 lines
- ✅ Basic configuration updates
- ✅ Documentation updates

---

## 📊 Example Scenarios

### Scenario 1: User says "Let's implement Stripe webhooks"

**Decision:**
```markdown
1. Feature involves: Webhooks, security, idempotency
2. Complexity: High (multiple files, security-critical)
3. Expertise needed: Backend patterns, webhook security

→ Launch `backend-developer` agent
→ After implementation: Launch `critic-agent` for review
```

### Scenario 2: User says "Fix the button color on homepage"

**Decision:**
```markdown
1. Scope: Single file, single line
2. Complexity: Low
3. Expertise needed: None (straightforward CSS)

→ Direct implementation (no agent needed)
```

### Scenario 3: User says "Build the member directory page"

**Decision:**
```markdown
1. Scope: Multiple components, API integration, state management
2. Complexity: Medium-high
3. Expertise needed: Frontend patterns, component architecture

→ Launch `frontend-developer` agent
→ After implementation: Launch `ui-ux-designer` for review
```

### Scenario 4: User says "Add new feature for X"

**Decision:**
```markdown
1. Requirements: Unclear
2. Scope: Unknown

→ Auto-invokes `product-owner-workflow` skill
→ After requirements gathered: Launch appropriate agent
```

---

## ⚠️ Important Notes

### Trade-offs of Agent Usage

**Pros:**
- ✅ Specialized expertise
- ✅ Autonomous completion
- ✅ Best practices built-in
- ✅ Independent validation (critic-agent)

**Cons:**
- ⚠️ Adds latency (agent startup time)
- ⚠️ Higher token usage
- ⚠️ May be overkill for simple tasks

### When NOT to Use Agents

**Don't launch agents for:**
- ❌ Trivial changes (< 10 lines)
- ❌ Documentation updates
- ❌ Simple configuration changes
- ❌ Bug fixes in single function
- ❌ Styling adjustments

---

## 📖 Related Documentation

**For agent descriptions:** See available agents in Claude Code
**For development workflow:** See `CLAUDE.md`
**For implementation plan:** See `docs/implementation/SOLO_DEV_PLAN.md`

---

**Maintained by:** Development Team
**Questions?** Check `/CLAUDE.md` for quick reference
