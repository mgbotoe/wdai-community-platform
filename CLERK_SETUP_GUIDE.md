# Clerk Authentication Setup Guide

**Status:** Day 2 Code Complete - Ready for Clerk Account Setup

---

## ✅ What's Already Done

All Clerk integration code is complete and committed:

- ✅ ClerkProvider configured in root layout
- ✅ Auth middleware with route protection
- ✅ Sign-in page with WDAI theming
- ✅ Sign-up page with WDAI theming
- ✅ Protected dashboard page
- ✅ Homepage auth UI (SignedIn/SignedOut components)
- ✅ UserButton component

---

## 🚀 Quick Setup (5 minutes)

### Step 1: Create Clerk Account

1. Go to https://clerk.com
2. Click "Start Building"
3. Sign up with your email or GitHub

### Step 2: Create Application

1. In Clerk Dashboard, click "Add application"
2. **Application name:** `WDAI Community Platform`
3. **Sign-in options:** Enable:
   - ✅ Email
   - ✅ Google (optional but recommended)
   - ✅ GitHub (optional but recommended)
4. Click "Create application"

### Step 3: Copy API Keys

1. After creation, you'll see the "Quickstart" page
2. Select "Next.js" as your framework
3. Copy both keys:
   - **Publishable key** (starts with `pk_test_...`)
   - **Secret key** (starts with `sk_test_...`)

### Step 4: Create `.env.local` File

In your project root (`C:\Workspace\Women Defining AI\wdai-community-platform`), create `.env.local`:

```bash
# Copy .env.local.example to .env.local
# Then add your Clerk keys:

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Clerk Routes (already configured in .env.local.example)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

### Step 5: Restart Dev Server

```bash
# Stop the current dev server (Ctrl+C if running)
npm run dev

# App will now be available at http://localhost:3000 (or 3005)
```

---

## 🧪 Testing Authentication

### Test 1: Sign Up Flow

1. Open http://localhost:3000 (or :3005)
2. Click "Join Now" button
3. Fill in email and password
4. Complete sign-up
5. You should be redirected to `/dashboard`
6. Verify you see your email and user info

### Test 2: Protected Routes

1. While signed in, visit http://localhost:3000/dashboard
2. You should see the dashboard with your profile
3. **Sign out** using the UserButton (top right avatar)
4. Try visiting http://localhost:3000/dashboard again
5. You should be **redirected to /sign-in**

### Test 3: Sign In Flow

1. While signed out, click "Sign In" button
2. Enter your credentials
3. You should be redirected to `/dashboard`

### Test 4: Homepage Conditional UI

1. **Signed Out:** Should see "Sign In" and "Join Now" buttons
2. **Signed In:** Should see "Dashboard" link and UserButton avatar

---

## 🎨 WDAI Theming Applied

The Clerk components are styled with WDAI brand colors:

- **Background:** `#252B3A` (navy-medium)
- **Primary Button:** `#BE336A` (pink)
- **Text:** White and light gray
- **Borders:** `#3D4451` (border-light)

---

## 🔧 Configuration Details

### Public Routes (No Auth Required)

- `/` (Homepage)
- `/sign-in` (Sign-in page)
- `/sign-up` (Sign-up page)
- `/pricing` (Pricing page)
- `/what-we-do` (About page)
- `/reports` (Reports page)
- `/terms` (Terms page)
- `/api/stripe/webhook` (Stripe webhooks)
- `/api/clerk/webhook` (Clerk webhooks)

### Protected Routes (Auth Required)

- `/dashboard` (Member dashboard)
- All routes under `(member)` group
- Future routes: `/directory`, `/resources`, `/events`

---

## ✅ Success Criteria

After setup, you should be able to:

1. ✅ Create a new account
2. ✅ Sign in with email/password
3. ✅ Access protected `/dashboard` when signed in
4. ✅ Get redirected to `/sign-in` when trying to access `/dashboard` while signed out
5. ✅ See your user info on the dashboard
6. ✅ Sign out using UserButton
7. ✅ Homepage shows correct UI based on auth state

---

## 🐛 Troubleshooting

### Issue: "Missing Clerk API keys" error

**Solution:** Make sure `.env.local` exists in project root with both keys set.

### Issue: Page keeps redirecting in a loop

**Solution:**
1. Clear browser cookies
2. Restart dev server
3. Try in incognito mode

### Issue: Sign-in page looks unstyled

**Solution:**
1. Check if Tailwind is working (homepage should have colors)
2. Restart dev server
3. Clear browser cache

### Issue: Can't access dashboard after sign-in

**Solution:**
1. Check middleware.ts has `/dashboard` NOT in publicRoutes
2. Verify ClerkProvider is in layout.tsx
3. Check browser console for errors

---

## 📊 What Happens Next

Once authentication is working:

- ✅ **Day 2 Complete!**
- 🎯 **Day 3:** Supabase setup & database schema
- 🎯 **Day 4:** Clerk-Supabase sync automation

---

## 📝 Notes

- Clerk Test mode is free (50 monthly active users)
- Production deployment requires Clerk Pro plan
- User data stays in Clerk, membership data in Supabase
- Webhook setup comes in Day 4 (Clerk → Supabase sync)

---

**Ready to test?** Follow the steps above and authentication should work immediately!

**Questions?** Check:
- Clerk docs: https://clerk.com/docs/quickstarts/nextjs
- WDAI docs: `docs/implementation/SOLO_DEV_PLAN.md`
