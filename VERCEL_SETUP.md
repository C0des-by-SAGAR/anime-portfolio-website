# Vercel Deployment Setup

## Environment Variables

To deploy this application to Vercel, you need to add the following environment variables in your Vercel project settings:

### Required Environment Variables

1. **NEXT_PUBLIC_SUPABASE_URL**
   - Your Supabase project URL
   - Format: `https://[project-id].supabase.co`
   - Get it from: https://supabase.com/dashboard/project/_/settings/api

2. **NEXT_PUBLIC_SUPABASE_ANON_KEY**
   - Your Supabase anonymous/public key
   - Get it from: https://supabase.com/dashboard/project/_/settings/api
   - Look for "anon public" key in the API settings

### How to Add Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable:
   - **Key**: `NEXT_PUBLIC_SUPABASE_URL`
   - **Value**: Your Supabase project URL
   - **Environment**: Select all (Production, Preview, Development)
4. Repeat for `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click **Save**
6. Redeploy your application (or push a new commit to trigger a new deployment)

### Finding Your Supabase Credentials

1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** → Use for `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → Use for `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Important Notes

- Environment variables starting with `NEXT_PUBLIC_` are exposed to the browser
- These are safe to expose as they're your public/anonymous keys
- Never commit your `.env.local` file to git (it's already in `.gitignore`)
- After adding environment variables, you need to redeploy for them to take effect

