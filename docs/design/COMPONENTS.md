# Component Patterns - Women Defining AI

**Extracted from Homepage Screenshots**
**Date:** November 2, 2025

---

## 🧩 Component Inventory

### 1. Navigation Header

**Appearance:**
- Fixed/sticky header
- Dark navy background (#1A1F2E)
- Full-width layout
- Contains logo, nav links, auth buttons

**Structure:**
```tsx
<header className="bg-wdai-navy px-6 py-4">
  <nav className="flex items-center justify-between max-w-7xl mx-auto">
    {/* Logo */}
    <div className="text-2xl font-bold">
      <span className="text-wdai-pink">WOMEN</span>
      <span className="text-white"> DEFINING AI</span>
    </div>

    {/* Nav Links */}
    <ul className="flex gap-8 text-wdai-pink font-medium">
      <li>Home</li>
      <li>What we do</li>
      <li>Become a Member</li>
      <li>Member Events</li>
      <li>More</li>
    </ul>

    {/* Auth Buttons */}
    <div className="flex gap-4">
      <button className="text-wdai-pink">Log In</button>
      <button className="text-wdai-pink">
        <ShoppingCartIcon />
      </button>
    </div>
  </nav>
</header>
```

**Responsive Behavior:**
- Mobile: Hamburger menu, collapse nav links
- Desktop: Full horizontal navigation

---

### 2. Announcement Banner

**Appearance:**
- Bright turquoise background (#6ACCC9)
- Full-width
- Centered text with underlined links
- Appears directly below header

**Structure:**
```tsx
<div className="bg-wdai-turquoise py-3 px-6 text-center">
  <p className="text-wdai-navy font-medium">
    CHECK OUT THE LATEST EPISODE OF 'NOT ANOTHER AI PODCAST' BY WDAI ON{' '}
    <a href="#" className="underline">SPOTIFY</a> &{' '}
    <a href="#" className="underline">YOUTUBE</a>
  </p>
</div>
```

**Usage:**
- Podcast announcements
- Time-sensitive promotions
- Event reminders
- Dismissible (optional)

---

### 3. Hero Section

**Appearance:**
- Dark navy background (#1A1F2E)
- Split layout: text left, illustration right
- Large vibrant AI-themed illustration
- Prominent CTA button

**Structure:**
```tsx
<section className="bg-wdai-navy py-20 px-6">
  <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
    {/* Text Content */}
    <div>
      <h1 className="text-display text-white font-bold mb-6">
        Ready to<br />Demystify AI?
      </h1>
      <button className="bg-wdai-coral text-wdai-navy font-semibold px-8 py-3 rounded uppercase">
        Join
      </button>
    </div>

    {/* Hero Illustration */}
    <div>
      <img
        src="/hero-illustration.jpg"
        alt="AI-themed illustration"
        className="w-full h-auto"
      />
    </div>
  </div>
</section>
```

**Key Features:**
- Gradient backgrounds possible
- Large, impactful imagery
- Single primary CTA
- Responsive: stack vertically on mobile

---

### 4. Statistics Bar

**Appearance:**
- Turquoise background (#6ACCC9)
- 3-column grid
- Large numbers in pink
- Supporting text in navy

**Structure:**
```tsx
<section className="bg-wdai-turquoise py-16 px-6">
  <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-center">
    {/* Stat 1 */}
    <div>
      <p className="text-stat text-wdai-pink font-bold mb-2">+40%</p>
      <p className="text-body text-wdai-navy">
        higher quality results when AI was used compared to not
      </p>
    </div>

    {/* Stat 2 */}
    <div>
      <p className="text-stat text-wdai-pink font-bold mb-2">Only 35%</p>
      <p className="text-body text-wdai-navy">
        of women compared to 52% of men are using AI, widening the digital divide
      </p>
    </div>

    {/* Stat 3 */}
    <div>
      <p className="text-stat text-wdai-pink font-bold mb-2">Only 1/3</p>
      <p className="text-body text-wdai-navy">
        of STEM jobs held by women, who also experience higher attrition rates
      </p>
    </div>
  </div>
</section>
```

**Usage:**
- Impact statistics
- Key metrics
- Social proof
- Data visualization (simple)

---

### 5. Content Section (Mission)

**Appearance:**
- Dark navy background (#1A1F2E)
- Split layout: text left, illustration right
- White/light gray text
- Emphasis text in bold

**Structure:**
```tsx
<section className="bg-wdai-navy py-20 px-6">
  <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
    {/* Text Content */}
    <div>
      <h2 className="text-h2 text-white font-semibold mb-6">Mission</h2>
      <p className="text-body-lg text-wdai-text-light leading-relaxed">
        We aim to level the playing field for women and non-binary individuals
        by closing the technology-gap at work, and changing who defines & leads
        the conversation around innovative technology, starting with generative AI.
        Let's <strong className="text-white">FLIP THE SCRIPT</strong>.
      </p>
    </div>

    {/* Illustration */}
    <div>
      <img
        src="/mission-illustration.png"
        alt="AI illustration"
        className="w-full h-auto"
      />
    </div>
  </div>
</section>
```

**Variants:**
- Reverse layout (image left, text right)
- Full-width text (no image)
- Video embed instead of image

---

### 6. Team Section (Co-Founders)

**Appearance:**
- Warm coral background (#E8956B)
- Centered heading and description
- CTA button
- 2-column grid of team members
- White photo cards with LinkedIn icons
- Dark navy text on coral

**Structure:**
```tsx
<section className="bg-wdai-coral py-20 px-6">
  <div className="max-w-7xl mx-auto">
    {/* Section Header */}
    <h2 className="text-h2 text-wdai-navy font-semibold text-center mb-6">
      Your Co-Founders
    </h2>
    <p className="text-body-lg text-wdai-text-coral text-center max-w-4xl mx-auto mb-8">
      Our organization was born out of a shared vision to empower women,
      especially those in mid-careers and from non-technical backgrounds...
    </p>

    {/* CTA Button */}
    <div className="text-center mb-12">
      <button className="bg-wdai-navy text-white font-semibold px-6 py-3 rounded">
        Invite a Co-Founder to Speak
      </button>
    </div>

    {/* Team Grid */}
    <div className="grid md:grid-cols-2 gap-8">
      {coFounders.map(person => (
        <TeamCard key={person.id} person={person} />
      ))}
    </div>
  </div>
</section>
```

---

### 7. Team Card Component

**Appearance:**
- White photo background
- Photo takes full card width
- Pink label overlay at bottom with name
- LinkedIn icon on label
- Role/title below name

**Structure:**
```tsx
<div className="relative bg-white rounded-lg overflow-hidden shadow-lg">
  {/* Photo */}
  <img
    src={person.imageUrl}
    alt={person.name}
    className="w-full h-auto aspect-square object-cover"
  />

  {/* Name Label Overlay */}
  <div className="absolute bottom-0 left-0 right-0 bg-wdai-pink px-4 py-3 flex items-center justify-between">
    <div>
      <h3 className="text-label text-white font-semibold">{person.name}</h3>
      {person.role && (
        <p className="text-role text-white opacity-90">{person.role}</p>
      )}
    </div>
    <a href={person.linkedinUrl} className="text-white">
      <LinkedInIcon />
    </a>
  </div>

  {/* Description (below photo, optional) */}
  {person.description && (
    <div className="bg-wdai-navy px-4 py-3">
      <p className="text-body-sm text-wdai-text-light">{person.description}</p>
    </div>
  )}
</div>
```

**Variants:**
- With description (Co-founders)
- Without description (Program Leads, Regional Leads)
- Wider label for multiple names (e.g., "Vaishali Mittal, & Maninder Paul")

---

### 8. Team Grid Sections (Program Leads & Regional Leads)

**Appearance:**
- Alternating background colors (turquoise, navy)
- Centered section heading with description
- Multi-column grid (3-4 columns)
- Team cards with photos and pink labels

**Structure:**
```tsx
<section className="bg-wdai-turquoise py-20 px-6">
  <div className="max-w-7xl mx-auto">
    {/* Section Header */}
    <h2 className="text-h2 text-white text-center font-semibold mb-6">
      Program Leads
    </h2>
    <p className="text-body-lg text-white text-center max-w-4xl mx-auto mb-12">
      Our Program Leads are the heart and soul of Women Defining AI,
      embodying our core values and culture in everything they do...
    </p>

    {/* Team Grid */}
    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
      {programLeads.map(person => (
        <TeamCard key={person.id} person={person} variant="compact" />
      ))}
    </div>
  </div>
</section>
```

**Grid Patterns:**
- **Program Leads:** 3-4 columns (10+ people)
- **Regional Leads:** 3 columns (7 people)
- Responsive: 1 column mobile, 2 columns tablet, 3-4 columns desktop

---

### 9. Footer

**Appearance:**
- Turquoise background (#6ACCC9)
- 3-column layout
- Email, social links, copyright
- Simple, clean design

**Structure:**
```tsx
<footer className="bg-wdai-turquoise py-12 px-6">
  <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-center">
    {/* Email */}
    <div>
      <div className="mb-2">
        <EmailIcon className="text-wdai-navy" />
      </div>
      <p className="text-wdai-navy font-medium mb-1">Email</p>
      <a href="mailto:info@womendefiningai.com" className="text-wdai-navy underline">
        info@womendefiningai.com
      </a>
    </div>

    {/* Social */}
    <div>
      <div className="mb-2">
        <ThumbsUpIcon className="text-wdai-navy" />
      </div>
      <p className="text-wdai-navy font-medium mb-2">Connect</p>
      <a href="#" className="text-wdai-navy">
        <LinkedInIcon />
      </a>
    </div>

    {/* Copyright */}
    <div>
      <p className="text-wdai-navy text-body-sm">2025 Copyright.</p>
      <p className="text-wdai-navy text-body-sm mb-2">All rights reserved.</p>
      <a href="/terms" className="text-wdai-navy underline text-body-sm">
        Terms of Service
      </a>
    </div>
  </div>
</footer>
```

---

## 🎨 Component Design Patterns

### Color Background Pattern
The site uses alternating background colors to create visual rhythm:

```
1. Navy (Header)
2. Turquoise (Banner)
3. Navy (Hero)
4. Turquoise (Statistics)
5. Navy (Mission)
6. Coral (Co-Founders)
7. Turquoise (Program Leads - Section 1)
8. Navy (Program Leads - Subsection)
9. Turquoise (Regional Leads)
10. Turquoise (Footer)
```

**Pattern:** Navy → Turquoise → Navy → Turquoise (with coral for special sections)

---

### Card Hover States (Recommendations)

**Team Cards:**
```css
.team-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.team-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.team-card:hover .name-label {
  background-color: #A02956; /* Darker pink */
}
```

**Button Hover:**
```css
.button-primary:hover {
  background-color: #D9A074; /* Lighter coral */
  transform: scale(1.02);
}

.button-secondary:hover {
  background-color: #252B3A; /* Lighter navy */
}
```

---

### Spacing System

**Section Spacing:**
```css
--section-padding-y: 80px;  /* Between major sections */
--section-padding-x: 24px;  /* Horizontal padding */
```

**Content Spacing:**
```css
--heading-margin-bottom: 24px;  /* Below headings */
--paragraph-margin-bottom: 16px; /* Between paragraphs */
--grid-gap: 24px;                /* Grid spacing (desktop) */
--grid-gap-mobile: 16px;         /* Grid spacing (mobile) */
```

**Card Spacing:**
```css
--card-padding: 16px;            /* Inside cards */
--card-radius: 8px;              /* Border radius */
```

---

## 💡 Component Usage Guidelines

### Do's ✅
- Use alternating background colors for visual rhythm
- Keep team cards consistent across all sections
- Use pink labels for names (high contrast, brand color)
- Include LinkedIn links for all team members
- Use white borders on team cards for photo framing
- Center-align section headings and descriptions
- Use grid layouts for scalability (3-4 columns)

### Don'ts ❌
- Don't mix card styles within the same section
- Don't use photos without proper aspect ratio (prefer square)
- Don't overuse coral background (reserve for special sections)
- Don't forget hover states on interactive elements
- Don't use more than 3 background colors in sequence

---

## 📱 Responsive Patterns

### Breakpoints
```css
/* Mobile First */
--breakpoint-sm: 640px;   /* Small tablets */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Desktops */
--breakpoint-xl: 1280px;  /* Large desktops */
```

### Grid Responsive Behavior
```tsx
{/* Statistics: 3 columns → 1 column */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">

{/* Co-founders: 2 columns → 1 column */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">

{/* Program Leads: 4 columns → 2 columns → 1 column */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

{/* Regional Leads: 3 columns → 2 columns → 1 column */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
```

---

## 🔄 Reusable Component Library

**Priority Components to Build:**

1. **`<Header />`** - Navigation with logo, links, auth buttons
2. **`<Banner message />`** - Dismissible announcement banner
3. **`<Hero title cta />`** - Hero section with image
4. **`<StatsBar stats[] />`** - 3-column statistics display
5. **`<ContentSection content image />`** - Text + image layout
6. **`<TeamSection members[] title description />`** - Team grid
7. **`<TeamCard person />`** - Individual team member card
8. **`<Footer />`** - Site footer

---

## 🎯 Next Steps

1. Build component library in Next.js with TypeScript
2. Create Storybook for component documentation
3. Implement hover states and animations
4. Add accessibility features (keyboard nav, ARIA labels)
5. Test responsive behavior on all breakpoints
6. Create variant props for flexibility

---

**Status:** Extracted from existing site
**Recommendation:** Start with Header, TeamCard, and Footer components first
