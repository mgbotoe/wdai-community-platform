# Content Management: Avoid Hardcoded Data

**Purpose:** Guidelines for separating content from code to ensure maintainability and flexibility.

---

## 🚨 GOLDEN RULE: Data vs. Code Separation

**NEVER hardcode content that:**
- Changes frequently (team members, events, statistics)
- Is managed by non-developers (blog posts, resources, announcements)
- Differs between environments (URLs, API keys, feature flags)
- Needs translation/localization
- Requires A/B testing

**ALWAYS separate content from code using:**
- Database tables (Supabase)
- Data files (TypeScript/JSON)
- CMS (future: Sanity, Contentful)
- Environment variables (.env files)

---

## ✅ What SHOULD Be Hardcoded

**UI Structure & Layout:**
```tsx
// ✅ GOOD: Component structure is hardcoded
<section className="bg-wdai-navy py-20">
  <TeamGrid members={members} /> {/* Data is dynamic */}
</section>
```

**Design System:**
```tsx
// ✅ GOOD: Colors, spacing, typography in tailwind.config.ts
colors: {
  wdai: {
    pink: '#BE336A',
    navy: '#1A1F2E',
  }
}
```

**Navigation Structure (mostly):**
```tsx
// ✅ GOOD: Main navigation can be hardcoded (rarely changes)
const mainNav = [
  { label: 'Home', href: '/' },
  { label: 'What we do', href: '/what-we-do' },
  { label: 'Become a Member', href: '/membership' },
]
```

**Static Copy (rarely changes):**
```tsx
// ✅ ACCEPTABLE: Mission statement (review quarterly)
const MISSION = "We aim to level the playing field..."
```

---

## ❌ What MUST NOT Be Hardcoded

**Team Members (NEVER hardcode):**
```tsx
// ❌ BAD: Hardcoded in component
const TeamSection = () => (
  <div>
    <TeamCard name="Helen Lee Kupp" role="Co-Founder" />
    <TeamCard name="Nichole Sterling" role="Co-Founder" />
  </div>
)

// ✅ GOOD: Load from data file or database
import { teamMembers } from '@/data/team-members'

const TeamSection = () => {
  const members = teamMembers.filter(m => m.type === 'co-founder')
  return <TeamGrid members={members} />
}
```

**Statistics (NEVER hardcode):**
```tsx
// ❌ BAD: Hardcoded stats
<StatsBar>
  <Stat number="+40%" label="higher quality results" />
</StatsBar>

// ✅ GOOD: Load from data file
import { homePageStats } from '@/data/homepage'

<StatsBar stats={homePageStats} />
```

**Events (NEVER hardcode):**
```tsx
// ❌ BAD: Hardcoded event list
const upcomingEvents = [/* hardcoded events */]

// ✅ GOOD: Fetch from database
const { data: events } = await supabase
  .from('events')
  .select('*')
  .gte('starts_at', new Date().toISOString())
```

**Resources (NEVER hardcode):**
```tsx
// ❌ BAD: Hardcoded resource list
const resources = [/* hardcoded resources */]

// ✅ GOOD: Fetch from database
const { data: resources } = await supabase
  .from('resources')
  .select('*')
  .eq('visibility', 'public')
```

**Pricing Plans (NEVER hardcode):**
```tsx
// ❌ BAD: Hardcoded pricing
<PricingCard price={29} interval="month" />

// ✅ GOOD: Load from Stripe API or database
const prices = await stripe.prices.list()
```

**Announcements/Banners (NEVER hardcode):**
```tsx
// ❌ BAD: Hardcoded banner message
<Banner>CHECK OUT THE LATEST EPISODE...</Banner>

// ✅ GOOD: Load from database or data file
const { data: activeBanner } = await supabase
  .from('announcements')
  .select('*')
  .eq('active', true)
  .single()
```

---

## 📂 Content Management Strategy

### Tier 1: Supabase Database (Dynamic, User-Managed Content)

**Store in database tables:**
```sql
-- Content that members/leaders can manage through UI
✅ Team members (users table)
✅ Events (events table)
✅ Resources (resources table)
✅ Announcements (announcements table)
✅ Blog posts (blog_posts table - future)
✅ FAQs (faqs table - future)
```

**Example: Team Members in Database**
```typescript
// lib/data/team.ts
export async function getTeamMembers(type?: 'co-founder' | 'program-lead' | 'regional-lead') {
  const query = supabase
    .from('users')
    .select('*')
    .eq('visibility', true)
    .order('name')

  if (type) {
    query.eq('team_type', type)
  }

  const { data } = await query
  return data
}

// app/page.tsx
const coFounders = await getTeamMembers('co-founder')
```

### Tier 2: Data Files (Semi-Static, Developer-Managed Content)

**Store in TypeScript/JSON files:**
```
src/data/
├── homepage.ts          # Homepage content (mission, stats)
├── team-members.ts      # Team data (if not using DB yet)
├── navigation.ts        # Navigation structure
├── footer-links.ts      # Footer content
└── seo-metadata.ts      # SEO meta tags
```

**Example: Homepage Data File**
```typescript
// src/data/homepage.ts
export const homePageContent = {
  hero: {
    title: "Ready to Demystify AI?",
    ctaText: "Join",
    ctaUrl: "/membership",
  },

  stats: [
    {
      number: "+40%",
      label: "higher quality results when AI was used compared to not",
    },
    {
      number: "Only 35%",
      label: "of women compared to 52% of men are using AI, widening the digital divide",
    },
    {
      number: "Only 1/3",
      label: "of STEM jobs held by women, who also experience higher attrition rates",
    },
  ],

  mission: {
    title: "Mission",
    description: "We aim to level the playing field for women and non-binary individuals by closing the technology-gap at work, and changing who defines & leads the conversation around innovative technology, starting with generative AI. Let's FLIP THE SCRIPT.",
  },
}

// app/page.tsx
import { homePageContent } from '@/data/homepage'

<Hero {...homePageContent.hero} />
<StatsBar stats={homePageContent.stats} />
```

**Example: Team Members Data File (if not using DB yet)**
```typescript
// src/data/team-members.ts
export interface TeamMember {
  id: string
  name: string
  role: string
  type: 'co-founder' | 'program-lead' | 'regional-lead'
  imageUrl: string
  linkedinUrl: string
  description?: string
  region?: string
  visibility: boolean
}

export const teamMembers: TeamMember[] = [
  {
    id: 'helen-lee-kupp',
    name: 'Helen Lee Kupp',
    role: 'Future of Work, Product, Strategy & Analytics',
    type: 'co-founder',
    imageUrl: '/images/team/helen-lee-kupp.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/helenleekupp',
    description: 'The Future Forum by Slack/Salesforce, Thumbtack, Bain & Company',
    visibility: true,
  },
  // ... more members
]

// app/page.tsx
import { teamMembers } from '@/data/team-members'

const coFounders = teamMembers.filter(m => m.type === 'co-founder')
```

### Tier 3: Environment Variables (Configuration)

**Store in .env files:**
```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://womendefiningai.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Feature flags
NEXT_PUBLIC_FEATURE_MEMBER_DIRECTORY=true
NEXT_PUBLIC_FEATURE_AI_CHAT=false

# API URLs
LUMA_API_URL=https://api.lu.ma/v1
MAILCHIMP_API_URL=https://api.mailchimp.com/3.0
```

---

## 🔄 Migration Path: Hardcoded → Database

**Phase 1: MVP (Week 1-3) - Data Files Acceptable**
```typescript
// Acceptable for MVP: Team members in data file
import { teamMembers } from '@/data/team-members'
```

**Phase 2: Growth (Week 4-8) - Migrate to Database**
```typescript
// Better: Team members in database, editable via admin UI
const members = await getTeamMembers()
```

**Phase 3: Scale (Week 8+) - Add CMS**
```typescript
// Best: Headless CMS for all content
const content = await sanity.fetch('*[_type == "teamMember"]')
```

---

## 🛠️ Implementation Checklist

**Before writing ANY component with content, ask:**

- [ ] Will this content change more than once per quarter?
  - YES → Use database or data file
  - NO → Can hardcode

- [ ] Will non-developers need to edit this?
  - YES → Use database with admin UI
  - NO → Data file acceptable

- [ ] Does this differ between environments?
  - YES → Use environment variables
  - NO → Can hardcode or use data file

- [ ] Does this need translation/localization?
  - YES → Use i18n library with data files
  - NO → Can hardcode

- [ ] Will we A/B test this?
  - YES → Use database or feature flags
  - NO → Can hardcode

---

## 📋 Content Audit Template

**For each page/component, document:**

```markdown
## Component: TeamSection

### Hardcoded (OK):
- Section layout structure
- Grid column configuration
- Card design/styling
- Hover animations

### Data-Driven (Required):
- ✅ Team member names → `data/team-members.ts`
- ✅ Team member roles → `data/team-members.ts`
- ✅ Team member photos → `/public/images/team/`
- ✅ LinkedIn URLs → `data/team-members.ts`
- ✅ Visibility flags → `data/team-members.ts`

### Future Database Migration:
- Week 4: Migrate to `users` table
- Add admin UI for editing team members
- Add image upload to Supabase Storage
```

---

## 🚫 Anti-Patterns to AVOID

**1. Hardcoded Lists in Components:**
```tsx
// ❌ NEVER DO THIS
const TeamSection = () => (
  <>
    <TeamCard name="Person 1" role="Role 1" />
    <TeamCard name="Person 2" role="Role 2" />
    <TeamCard name="Person 3" role="Role 3" />
  </>
)
```

**2. Inline Content Strings:**
```tsx
// ❌ BAD: Content mixed with code
<h2>Program Leads</h2>
<p>Our Program Leads are the heart and soul...</p>

// ✅ GOOD: Content separated
import { sections } from '@/data/homepage'
<h2>{sections.programLeads.title}</h2>
<p>{sections.programLeads.description}</p>
```

**3. Hardcoded URLs:**
```tsx
// ❌ BAD
const siteUrl = 'https://womendefiningai.com'

// ✅ GOOD
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
```

**4. Hardcoded Feature Flags:**
```tsx
// ❌ BAD
const showAIChat = true

// ✅ GOOD
const showAIChat = process.env.NEXT_PUBLIC_FEATURE_AI_CHAT === 'true'
```

---

## 📚 Documentation Requirements

**Every component with content MUST have:**

1. **Data Source Documentation:**
   ```typescript
   /**
    * TeamSection Component
    *
    * @data {TeamMember[]} - src/data/team-members.ts
    * @future - Migrate to Supabase `users` table (Week 4)
    */
   ```

2. **Content Update Instructions:**
   ```markdown
   ## Updating Team Members

   1. Edit `src/data/team-members.ts`
   2. Add new team member object to array
   3. Add photo to `public/images/team/`
   4. Run `npm run dev` to see changes
   ```

3. **Migration Plan:**
   ```markdown
   ## Migration to Database (Week 4)

   - [ ] Create `users` table with team fields
   - [ ] Build admin UI for managing team
   - [ ] Migrate data from TS file to database
   - [ ] Update component to fetch from DB
   - [ ] Remove data file
   ```

---

## ✅ Content Management Best Practices

**Do's:**
- ✅ Separate content from code from day one
- ✅ Use TypeScript for type-safe data files
- ✅ Document data sources in component comments
- ✅ Plan database migration path upfront
- ✅ Use environment variables for configuration
- ✅ Keep data files co-located (`src/data/`)
- ✅ Version control data files (they're still code)

**Don'ts:**
- ❌ Never hardcode user-facing content in components
- ❌ Never mix content strings with JSX structure
- ❌ Never skip data source documentation
- ❌ Never hardcode URLs, API keys, or feature flags
- ❌ Never assume content won't change
- ❌ Never make non-developers edit components to change content

---

**Last Updated:** November 2, 2025
