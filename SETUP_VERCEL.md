# 🚀 Quick Fix: Add Environment Variables to Vercel

## The Problem
Your app is showing "Configuration error: Supabase environment variables are not set" because the environment variables haven't been added to Vercel yet.

## ✅ Solution (5 minutes)

### Step 1: Open Vercel Dashboard
1. Go to: https://vercel.com/dashboard
2. Find and click on your project: **anime-portfolio-website**

### Step 2: Add Environment Variables
1. Click **Settings** (top menu)
2. Click **Environment Variables** (left sidebar)

### Step 3: Add First Variable
Click **Add New** and enter:
- **Key**: `NEXT_PUBLIC_SUPABASE_URL`
- **Value**: `https://mfgzaxdcsmdtsteoqrpa.supabase.co`
- **Environment**: ✅ Production ✅ Preview ✅ Development (select all)
- Click **Save**

### Step 4: Add Second Variable
Click **Add New** again and enter:
- **Key**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value**: (Get this from Supabase - see Step 5)
- **Environment**: ✅ Production ✅ Preview ✅ Development (select all)
- Click **Save**

### Step 5: Get Your Supabase Anon Key
1. Go to: https://supabase.com/dashboard/project/mfgzaxdcsmdtsteoqrpa/settings/api
2. Find the **"anon public"** key (it's a long string starting with `eyJ...`)
3. Click the **Copy** button next to it
4. Paste it as the value for `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel

### Step 6: Redeploy
1. Go to the **Deployments** tab in Vercel
2. Click the **three dots (⋯)** on the latest deployment
3. Select **"Redeploy"**
4. Wait 1-2 minutes for deployment to complete

### Step 7: Verify
1. Visit: https://anime-portfolio-website-vsaq.vercel.app/status
2. You should see both variables marked as "✓ Set"
3. Try logging in again - it should work now!

## 📋 Quick Checklist
- [ ] `NEXT_PUBLIC_SUPABASE_URL` added to Vercel
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` added to Vercel
- [ ] Both variables set for all environments
- [ ] Application redeployed
- [ ] Status page shows all green checkmarks

## 🆘 Still Having Issues?

1. **Check the status page**: Visit `/status` to see which variables are missing
2. **Verify in Vercel**: Make sure the variables are actually saved (refresh the page)
3. **Check deployment logs**: In Vercel, go to Deployments → Latest → Logs to see if there are any errors
4. **Wait a moment**: Sometimes it takes a minute for new deployments to propagate

## 💡 Why This Happens

Environment variables need to be set in Vercel because:
- `.env.local` files are not deployed to production
- Each deployment platform (Vercel, Netlify, etc.) has its own way of managing environment variables
- Variables starting with `NEXT_PUBLIC_` are exposed to the browser and are required for client-side Supabase operations

---

**Need help?** Check the status page at `/status` to see exactly what's missing!

