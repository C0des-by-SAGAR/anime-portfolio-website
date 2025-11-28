# 🔧 Troubleshooting: Environment Variables Not Working

## Common Issues & Solutions

### ❌ Problem: "Configuration error: Supabase environment variables are not set"

This error means the environment variables are not available in your deployed app.

### ✅ Solution Checklist

#### 1. Verify Variables Are Added in Vercel
- [ ] Go to Vercel Dashboard → Your Project → Settings → Environment Variables
- [ ] Confirm both variables exist:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Check that they're set for **ALL environments** (Production, Preview, Development)

#### 2. **CRITICAL: Redeploy After Adding Variables**
⚠️ **This is the most common issue!**

Environment variables starting with `NEXT_PUBLIC_` are embedded into your JavaScript bundle **at build time**. This means:

- ❌ Adding variables to Vercel alone is NOT enough
- ✅ You MUST redeploy after adding variables
- ✅ The variables must exist BEFORE the build happens

**How to Redeploy:**
1. Go to Vercel → Your Project → **Deployments** tab
2. Find the latest deployment
3. Click the **three dots (⋯)** menu
4. Select **"Redeploy"**
5. Wait for deployment to complete (1-2 minutes)

#### 3. Check Variable Names (No Typos!)
Make sure the variable names are EXACTLY:
- `NEXT_PUBLIC_SUPABASE_URL` (not `NEXT_PUBLIC_SUPABASE_URLS` or similar)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (not `NEXT_PUBLIC_SUPABASE_KEY` or similar)

#### 4. Verify Values Are Correct
- **URL**: Should be `https://mfgzaxdcsmdtsteoqrpa.supabase.co`
- **Key**: Should start with `eyJ...` (it's a JWT token, very long)

#### 5. Check Deployment Logs
1. Go to Vercel → Deployments → Latest Deployment
2. Click on the deployment to see logs
3. Look for any errors related to environment variables
4. Check if the build completed successfully

#### 6. Clear Browser Cache
Sometimes old JavaScript bundles are cached:
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Or open in incognito/private mode

#### 7. Verify Using Status Page
Visit: `https://anime-portfolio-website-vsaq.vercel.app/status`

This page will show:
- ✅ Green checkmarks if variables are set
- ❌ Red X if variables are missing
- The actual values (partially masked for security)

### 🎯 Step-by-Step Fix

1. **Add Variables to Vercel** (if not already done)
   ```
   NEXT_PUBLIC_SUPABASE_URL = https://mfgzaxdcsmdtsteoqrpa.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = (your anon key from Supabase)
   ```

2. **Verify They're Saved**
   - Refresh the Environment Variables page
   - Make sure both show up in the list

3. **Redeploy** (MOST IMPORTANT STEP!)
   - Deployments → Latest → ⋯ → Redeploy
   - Wait for "Ready" status

4. **Test**
   - Visit `/status` page to verify
   - Try logging in

### 🚨 Still Not Working?

1. **Check the status page**: `/status` will tell you exactly what's missing
2. **Verify in Vercel**: Make absolutely sure variables are saved (sometimes they don't save if you navigate away too quickly)
3. **Check build logs**: Look for any errors during the build process
4. **Try a new deployment**: Push a small change (like adding a comment) to trigger a fresh build

### 💡 Why This Happens

Next.js embeds `NEXT_PUBLIC_` variables into the client-side JavaScript bundle during the build process. This means:

- Variables must exist **before** the build
- Adding variables after build = they won't be in the bundle
- You must rebuild/redeploy to include new variables

### 📞 Quick Test

After redeploying, check the browser console:
- Open DevTools (F12)
- Go to Console tab
- Type: `process.env.NEXT_PUBLIC_SUPABASE_URL`
- Should show your URL (not `undefined`)

If it shows `undefined`, the variables weren't included in the build, which means you need to redeploy.

