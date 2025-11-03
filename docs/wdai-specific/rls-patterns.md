# Row-Level Security (RLS) Policy Patterns

**Purpose:** Database security patterns using Supabase RLS with Clerk authentication.

---

## ✅ Policy Design Checklist

Before deploying ANY table:
- [ ] Default deny (no public write without service role)
- [ ] Explicit allow per role (visitor, member, leader)
- [ ] Test with Clerk JWT claims in Supabase dashboard
- [ ] Document policy in SQL comments

---

## 📝 Example: Resources Table RLS

```sql
-- Enable RLS
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- Policy: Members can read member-visible resources
CREATE POLICY "members_read_resources"
ON resources FOR SELECT
TO authenticated
USING (
  visibility = 'member'
  AND (auth.jwt() ->> 'role')::text IN ('member', 'leader')
);

-- Policy: Leaders can read all resources
CREATE POLICY "leaders_read_all_resources"
ON resources FOR SELECT
TO authenticated
USING (
  (auth.jwt() ->> 'role')::text = 'leader'
);

-- Policy: Leaders can create resources
CREATE POLICY "leaders_create_resources"
ON resources FOR INSERT
TO authenticated
WITH CHECK (
  (auth.jwt() ->> 'role')::text = 'leader'
);

-- Policy: Leaders can update their own resources
CREATE POLICY "leaders_update_own_resources"
ON resources FOR UPDATE
TO authenticated
USING (
  created_by = (auth.jwt() ->> 'sub')::text
  AND (auth.jwt() ->> 'role')::text = 'leader'
);
```

---

## 🧪 Testing RLS Policies

```bash
# Test in Supabase SQL Editor with impersonation
SET request.jwt.claim.sub = 'user-id-here';
SET request.jwt.claim.role = 'member';

-- Should see member-visible resources only
SELECT * FROM resources;

-- Should fail (members can't insert)
INSERT INTO resources (title, type, url, visibility)
VALUES ('Test', 'link', 'https://example.com', 'member');
```

---

**Last Updated:** November 2, 2025
**See Also:** `docs/architecture/DATABASE_SCHEMA.md` for all RLS policies
