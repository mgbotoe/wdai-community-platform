# Typography System - Women Defining AI

**Extracted from Homepage Screenshots**
**Date:** November 2, 2025

---

## 📝 Font Families

### Primary Font Stack
Based on visual analysis of the existing site:

```css
--font-primary: 'Inter', 'Helvetica Neue', 'Arial', sans-serif;
--font-display: 'Inter', 'Helvetica Neue', 'Arial', sans-serif;
```

**Recommendation for New Site:**
- **Headings & Display:** `Inter` (already used in Next.js, excellent readability)
- **Body Text:** `Inter` (consistent, modern, professional)
- **Fallback:** System fonts for performance

---

## 🔤 Type Scale

### Desktop Typography

#### Display/Hero Text
```css
.heading-display {
  font-size: 56px;      /* ~3.5rem */
  font-weight: 700;     /* Bold */
  line-height: 1.1;
  letter-spacing: -0.02em;
  /* Example: "Ready to Demystify AI?" */
}
```

#### H1 - Page Titles
```css
.heading-h1 {
  font-size: 48px;      /* ~3rem */
  font-weight: 700;     /* Bold */
  line-height: 1.2;
  letter-spacing: -0.01em;
  /* Example: "WOMEN DEFINING AI" branding */
}
```

#### H2 - Section Headers
```css
.heading-h2 {
  font-size: 40px;      /* ~2.5rem */
  font-weight: 600;     /* Semibold */
  line-height: 1.25;
  letter-spacing: 0;
  /* Examples: "Mission", "Your Co-Founders", "Program Leads", "Regional Leads" */
}
```

#### H3 - Subsection Headers
```css
.heading-h3 {
  font-size: 24px;      /* ~1.5rem */
  font-weight: 600;     /* Semibold */
  line-height: 1.4;
  letter-spacing: 0;
}
```

#### Body Text - Large
```css
.body-large {
  font-size: 18px;      /* ~1.125rem */
  font-weight: 400;     /* Regular */
  line-height: 1.7;
  letter-spacing: 0;
  /* Example: Mission statement paragraph, section descriptions */
}
```

#### Body Text - Regular
```css
.body-regular {
  font-size: 16px;      /* ~1rem */
  font-weight: 400;     /* Regular */
  line-height: 1.6;
  letter-spacing: 0;
  /* Example: Team member titles, role descriptions */
}
```

#### Body Text - Small
```css
.body-small {
  font-size: 14px;      /* ~0.875rem */
  font-weight: 400;     /* Regular */
  line-height: 1.5;
  letter-spacing: 0;
  /* Example: Footer text, secondary info */
}
```

#### Statistics Display
```css
.stat-number {
  font-size: 48px;      /* ~3rem */
  font-weight: 700;     /* Bold */
  line-height: 1;
  letter-spacing: -0.01em;
  /* Example: "+40%", "Only 35%", "Only 1/3" */
}

.stat-label {
  font-size: 16px;      /* ~1rem */
  font-weight: 400;     /* Regular */
  line-height: 1.5;
  letter-spacing: 0;
  /* Example: "higher quality results when AI was used" */
}
```

#### Navigation
```css
.nav-link {
  font-size: 16px;      /* ~1rem */
  font-weight: 500;     /* Medium */
  line-height: 1;
  letter-spacing: 0.02em;
  /* Example: "Home", "What we do", "Become a Member" */
}
```

#### Buttons
```css
.button-primary {
  font-size: 16px;      /* ~1rem */
  font-weight: 600;     /* Semibold */
  line-height: 1;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  /* Example: "JOIN" button */
}

.button-secondary {
  font-size: 14px;      /* ~0.875rem */
  font-weight: 600;     /* Semibold */
  line-height: 1;
  letter-spacing: 0.02em;
  /* Example: "Invite a Co-Founder to Speak" */
}
```

#### Name Labels (Team Cards)
```css
.name-label {
  font-size: 16px;      /* ~1rem */
  font-weight: 600;     /* Semibold */
  line-height: 1.3;
  letter-spacing: 0;
  color: white;
  /* Example: Team member names on pink labels */
}

.role-label {
  font-size: 13px;      /* ~0.8125rem */
  font-weight: 400;     /* Regular */
  line-height: 1.2;
  letter-spacing: 0;
  color: white;
  /* Example: "Head of GTM Ops", "Newsletter Editor-in-chief" */
}
```

---

### Mobile Typography (Responsive Adjustments)

```css
@media (max-width: 768px) {
  .heading-display {
    font-size: 36px;    /* ~2.25rem */
  }

  .heading-h1 {
    font-size: 32px;    /* ~2rem */
  }

  .heading-h2 {
    font-size: 28px;    /* ~1.75rem */
  }

  .heading-h3 {
    font-size: 20px;    /* ~1.25rem */
  }

  .body-large {
    font-size: 16px;    /* ~1rem */
  }

  .stat-number {
    font-size: 32px;    /* ~2rem */
  }
}
```

---

## 🎨 Typography Color Combinations

### On Dark Backgrounds (Navy #1A1F2E)
```css
.text-on-dark {
  color: #FFFFFF;           /* Primary headings */
}

.text-on-dark-secondary {
  color: #E5E7EB;           /* Body text, descriptions */
}

.text-on-dark-accent {
  color: #BE336A;           /* Links, emphasis, CTAs */
}
```

### On Light/Bright Backgrounds (Turquoise #6ACCC9)
```css
.text-on-turquoise {
  color: #1A1F2E;           /* Headings */
}

.text-on-turquoise-body {
  color: #2C5F5D;           /* Body text (darker for contrast) */
}

.text-on-turquoise-accent {
  color: #BE336A;           /* Links, emphasis */
}
```

### On Coral Background (#E8956B)
```css
.text-on-coral {
  color: #1A1F2E;           /* Headings */
}

.text-on-coral-body {
  color: #2C1810;           /* Body text */
}
```

### On Pink Background (#BE336A)
```css
.text-on-pink {
  color: #FFFFFF;           /* All text (white for maximum contrast) */
}
```

---

## 📐 Spacing & Hierarchy

### Vertical Rhythm
```css
/* Consistent vertical spacing between elements */
--spacing-section: 80px;       /* Between major sections */
--spacing-subsection: 48px;    /* Between subsections */
--spacing-paragraph: 24px;     /* Between paragraphs */
--spacing-element: 16px;       /* Between related elements */
```

### Line Length
```css
/* Optimal reading width */
.content-text {
  max-width: 65ch;             /* ~780px at 16px font size */
  /* Centered for readability */
}
```

---

## 🔧 Tailwind Config Typography

```javascript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'display': ['56px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h1': ['48px', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'h2': ['40px', { lineHeight: '1.25' }],
        'h3': ['24px', { lineHeight: '1.4' }],
        'body-lg': ['18px', { lineHeight: '1.7' }],
        'body': ['16px', { lineHeight: '1.6' }],
        'body-sm': ['14px', { lineHeight: '1.5' }],
        'stat': ['48px', { lineHeight: '1', letterSpacing: '-0.01em' }],
        'nav': ['16px', { lineHeight: '1', letterSpacing: '0.02em' }],
        'button': ['16px', { lineHeight: '1', letterSpacing: '0.03em' }],
        'label': ['16px', { lineHeight: '1.3' }],
        'role': ['13px', { lineHeight: '1.2' }],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      }
    }
  }
}
```

---

## 💡 Typography Best Practices

### Do's ✅
- Use bold (700) for major headings and statistics
- Use semibold (600) for section headers and button text
- Use regular (400) for body text and descriptions
- Maintain consistent line-height (1.6-1.7) for readability
- Use white text on dark backgrounds, dark text on light backgrounds
- Keep line length under 65-75 characters for optimal reading

### Don'ts ❌
- Don't use font weights below 400 (text may be too thin)
- Don't use all caps for long paragraphs (reduces readability)
- Don't use pink text on coral or turquoise (poor contrast)
- Don't mix more than 2-3 font weights in a single section
- Don't go below 14px for any user-facing text (accessibility)

---

## ♿ Accessibility Considerations

### Font Size Minimums
- **Minimum body text:** 16px (1rem)
- **Minimum UI text:** 14px (0.875rem)
- **Never below 12px** for any text

### Line Height for Readability
- **Body text:** 1.5-1.7 (WCAG recommends 1.5 minimum)
- **Headings:** 1.1-1.25 (tighter for impact)

### Color Contrast
- **Body text on dark:** Use #FFFFFF or #E5E7EB
- **Body text on light:** Use #1A1F2E or #2C5F5D
- All combinations tested for WCAG AA compliance (4.5:1 for body, 3:1 for large text)

---

**Status:** Extracted from existing site
**Next Steps:**
1. Integrate into Tailwind config
2. Create typography component variants
3. Test responsive scaling on all devices
