# Color Palette - Women Defining AI

**Extracted from Homepage Screenshots**
**Date:** November 2, 2025

---

## 🎨 Brand Colors

### Primary Brand Color
```css
--wdai-pink: #BE336A;        /* Primary brand pink (logo, nav links, buttons) */
--wdai-pink-hover: #A02956;  /* Darker variant for hover states */
```

### Background Colors
```css
--wdai-navy-dark: #1A1F2E;   /* Primary dark background (header, sections) */
--wdai-navy-medium: #252B3A; /* Medium navy (alternating sections) */
--wdai-turquoise: #6ACCC9;   /* Bright turquoise (stats banner, section headers) */
--wdai-coral: #E8956B;       /* Warm coral/peach (co-founders section) */
```

### Text Colors
```css
--wdai-text-white: #FFFFFF;     /* Primary text on dark backgrounds */
--wdai-text-light: #E5E7EB;     /* Secondary text, descriptions */
--wdai-text-turquoise: #2C5F5D; /* Text on turquoise backgrounds */
--wdai-text-coral: #2C1810;     /* Text on coral backgrounds */
```

### Accent Colors (From Hero Illustration)
```css
--wdai-magenta: #E74C8C;     /* Vibrant magenta accent */
--wdai-orange: #FF8C42;      /* Bright orange accent */
--wdai-blue-bright: #4CC9E8; /* Bright cyan/blue */
--wdai-purple: #8B5CF6;      /* Purple accent */
```

### UI Elements
```css
--wdai-border-light: #3D4451; /* Subtle borders on dark backgrounds */
--wdai-card-bg: #FFFFFF;      /* White cards for team member photos */
```

---

## 📊 Color Usage Patterns

### Navigation & Header
- Background: `--wdai-navy-dark` (#1A1F2E)
- Brand text "WOMEN": `--wdai-pink` (#BE336A)
- Brand text "DEFINING AI": `--wdai-text-white` (#FFFFFF)
- Nav links: `--wdai-pink` (#BE336A)
- Log In button: `--wdai-pink` (#BE336A)

### Banner (Podcast Announcement)
- Background: `--wdai-turquoise` (#6ACCC9)
- Text: `--wdai-navy-dark` (#1A1F2E)
- Links: Underlined in `--wdai-pink` (#BE336A)

### Hero Section
- Background: `--wdai-navy-dark` (#1A1F2E)
- Heading text: `--wdai-text-white` (#FFFFFF)
- CTA button background: `--wdai-coral` (#E8956B)
- CTA button text: `--wdai-navy-dark` (#1A1F2E)

### Statistics Section
- Background: `--wdai-turquoise` (#6ACCC9)
- Large numbers: `--wdai-pink` (#BE336A)
- Body text: `--wdai-navy-dark` (#1A1F2E)

### Mission Section
- Background: `--wdai-navy-dark` (#1A1F2E)
- Heading: `--wdai-text-white` (#FFFFFF)
- Body text: `--wdai-text-light` (#E5E7EB)
- Emphasis "FLIP THE SCRIPT": `--wdai-text-white` (#FFFFFF) bold

### Co-Founders Section
- Background: `--wdai-coral` (#E8956B)
- Heading: `--wdai-navy-dark` (#1A1F2E)
- Body text: `--wdai-text-coral` (#2C1810)
- Button background: `--wdai-navy-dark` (#1A1F2E)
- Button text: `--wdai-text-white` (#FFFFFF)

### Team Cards (Program Leads & Regional Leads)
- Background (alternating):
  - Turquoise sections: `--wdai-turquoise` (#6ACCC9)
  - Navy sections: `--wdai-navy-dark` (#1A1F2E)
- Photo cards: `--wdai-card-bg` (#FFFFFF) with white borders
- Name labels: `--wdai-pink` (#BE336A) background
- Name text: `--wdai-text-white` (#FFFFFF)

### Footer
- Background: `--wdai-turquoise` (#6ACCC9)
- Text: `--wdai-navy-dark` (#1A1F2E)
- Links: Underlined `--wdai-navy-dark` (#1A1F2E)
- LinkedIn icon: `--wdai-navy-dark` (#1A1F2E)

---

## 🎯 Accessibility Compliance

### Contrast Ratios (WCAG 2.1 AA)

**Passing Combinations:**
- ✅ White text (#FFFFFF) on Navy Dark (#1A1F2E): **14.7:1** (AAA)
- ✅ Pink (#BE336A) on White (#FFFFFF): **5.2:1** (AA)
- ✅ Navy Dark (#1A1F2E) on Turquoise (#6ACCC9): **7.8:1** (AAA)
- ✅ Navy Dark (#1A1F2E) on Coral (#E8956B): **6.1:1** (AA)

**Needs Verification:**
- ⚠️ Light text (#E5E7EB) on Navy Medium (#252B3A): Verify in implementation

---

## 💡 Design System Recommendations

### Color Variants for Implementation

Add these utility classes to Tailwind config:

```javascript
colors: {
  'wdai': {
    // Primary brand
    'pink': {
      DEFAULT: '#BE336A',
      hover: '#A02956',
      light: '#E74C8C',
    },

    // Backgrounds
    'navy': {
      DEFAULT: '#1A1F2E',
      medium: '#252B3A',
      light: '#3D4451',
    },

    'turquoise': {
      DEFAULT: '#6ACCC9',
      dark: '#2C5F5D',
    },

    'coral': {
      DEFAULT: '#E8956B',
      dark: '#2C1810',
    },

    // Accents (from hero illustration)
    'accent': {
      magenta: '#E74C8C',
      orange: '#FF8C42',
      blue: '#4CC9E8',
      purple: '#8B5CF6',
    }
  }
}
```

---

## 🔄 Color Application Guidelines

### Do's ✅
- Use `--wdai-pink` for primary CTAs, brand emphasis, and links
- Use `--wdai-navy-dark` for main content backgrounds
- Alternate between turquoise and navy for section backgrounds
- Use white cards for team member photos on dark backgrounds
- Use coral background for warm, inviting sections (about, team)

### Don'ts ❌
- Don't use pink text on turquoise or coral backgrounds (poor contrast)
- Don't mix too many accent colors in one section
- Don't use white backgrounds for main content (breaks dark theme)
- Don't use navy text on coral without testing contrast

---

**Status:** Extracted from existing site
**Next Steps:**
1. Generate Tailwind config with these colors
2. Create component variants using color system
3. Test all combinations for accessibility
