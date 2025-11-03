# Screenshots - Existing womendefiningai.com Site

**Purpose:** Visual reference for design system extraction and layout analysis

**Date Added:** November 2, 2025
**Source Site:** womendefiningai.com (Wix)

---

## 📂 Folder Organization

```
screenshots/
├── public/              # Public-facing pages (not logged in)
│   ├── homepage.png
│   ├── about.png
│   ├── pricing.png
│   └── [other public pages]
│
├── member-portal/       # Member-only pages (logged in as member)
│   ├── dashboard.png
│   ├── directory.png
│   ├── resources.png
│   ├── events.png
│   └── profile.png
│
└── leader-portal/       # Leader-only pages (if exists)
    ├── leader-dashboard.png
    ├── create-event.png
    └── manage-resources.png
```

---

## 📸 Screenshot Guidelines

### Recommended Format
- **File Format:** PNG (for clarity)
- **Resolution:** Full page (full vertical scroll if needed)
- **Browser Width:** Desktop view (1920px wide recommended)
- **File Naming:** Descriptive kebab-case (e.g., `member-dashboard.png`)

### What to Capture

**Public Pages:**
- [ ] Homepage (full scroll)
- [ ] About/Mission page
- [ ] Pricing/Membership tiers
- [ ] Any other public pages

**Member Portal:**
- [ ] Member dashboard/welcome
- [ ] Member directory (if exists)
- [ ] Resources library
- [ ] Events page (if exists)
- [ ] Profile/settings

**Leader Portal (if exists):**
- [ ] Leader dashboard
- [ ] Event creation form
- [ ] Resource management

### Mobile Screenshots (Optional)
If you want to capture mobile views:
- Create `screenshots/mobile/` folder
- Use 375px width (iPhone SE) or 390px (iPhone 14)

---

## 🎨 What We'll Extract

Once screenshots are added, we'll document:

1. **Color Palette**
   - Primary colors
   - Secondary colors
   - Accent colors
   - Text colors
   - Background colors
   - Border colors

2. **Typography**
   - Font families
   - Font sizes
   - Font weights
   - Line heights
   - Letter spacing

3. **Spacing System**
   - Margins
   - Padding
   - Gaps
   - Component spacing

4. **Component Patterns**
   - Buttons (primary, secondary, tertiary)
   - Cards
   - Forms
   - Navigation
   - Modals/overlays

5. **Layout Patterns**
   - Grid systems
   - Flex patterns
   - Responsive breakpoints
   - Content widths

---

## 📋 Next Steps

After screenshots are added:
1. ✅ Extract color palette → Create `COLOR_PALETTE.md`
2. ✅ Document typography → Create `TYPOGRAPHY.md`
3. ✅ Define spacing system → Create `SPACING.md`
4. ✅ Catalog components → Create `COMPONENTS.md`
5. ✅ Generate Tailwind config → Create `tailwind.config.ts`

---

**Status:** Awaiting screenshots
**Last Updated:** November 2, 2025
