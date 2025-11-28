# AnimeVerse - The Ultimate Anime Portfolio Platform

![Vercel Deploy Status](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)
![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=for-the-badge&logo=typescript)

## 📚 Project Overview

**AnimeVerse** is a comprehensive anime tracking and discovery platform built for anime enthusiasts. It combines modern web technologies with a legendary anime-inspired design aesthetic to create an immersive experience for tracking your anime journey, discovering new titles, and receiving personalized recommendations.

### Key Features

- **Authentication**: Secure email-based authentication with Supabase
- **Anime Tracking**: Organize anime into watching, completed, and plan-to-watch lists
- **Anime Discovery**: Browse and search 20,000+ anime titles via Jikan API
- **Personalized Recommendations**: AI-powered recommendation engine based on watch history
- **Watch History**: Track episodes watched and viewing progress
- **Advanced Animations**: Smooth scroll-triggered animations and interactive effects
- **SEO Optimized**: Built-in SEO with structured data and Open Graph support
- **Glassmorphism UI**: Modern anime-inspired design with neon effects
- **Real-time Sync**: All data synced in real-time with Supabase

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.2.4 (App Router)
- **Language**: TypeScript 5.0+
- **Styling**: Tailwind CSS 4 with custom anime-inspired theme
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Animations**: GSAP (advanced scroll effects), Framer Motion (parallax)
- **Form Management**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Charts**: Recharts for data visualization
- **Notifications**: Sonner toast notifications
- **HTTP Client**: Fetch API with custom wrappers

### Backend
- **Runtime**: Node.js (via Next.js API Routes)
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth
- **ORM/Query**: Direct SQL with Supabase client
- **Email**: Supabase Auth emails
- **External APIs**: Jikan API (anime database)

### Infrastructure & DevOps
- **Deployment**: Vercel
- **Version Control**: Git/GitHub
- **Database Hosting**: Supabase
- **Environment Management**: Vercel Environment Variables
- **Code Sync**: v0.app automatic sync

---

## 📁 Project Structure

\`\`\`
anime-portfolio-website/
├── app/                           # Next.js App Router
│   ├── layout.tsx                # Root layout with SEO metadata
│   ├── page.tsx                  # Landing page
│   ├── globals.css               # Global styles & theme tokens
│   ├── api/
│   │   └── recommendations/
│   │       └── generate/         # Recommendation generation API
│   ├── auth/
│   │   ├── login/                # Login page
│   │   ├── sign-up/              # Sign-up page
│   │   └── check-email/          # Email verification page
│   ├── dashboard/                # User dashboard
│   ├── browse/                   # Anime browser
│   ├── recommendations/          # Recommendations page
│   ├── robots.ts                 # SEO robots.txt
│   └── sitemap.ts                # SEO sitemap
├── components/
│   ├── animated-hero.tsx         # Hero section with animations
│   ├── animated-features.tsx     # Features with scroll animation
│   ├── animated-stats.tsx        # Stats with counter animation
│   ├── domain-expansion-button.tsx # Custom Domain Expansion effect
│   ├── navigation.tsx            # Navigation bar
│   ├── anime-card.tsx            # Anime card component
│   ├── anime-list-tabs.tsx       # Tabs for anime lists
│   ├── anime-search.tsx          # Search component
│   ├── browse-anime-card.tsx     # Card for browsing anime
│   ├── dashboard-stats.tsx       # Dashboard statistics
│   ├── recommendation-card.tsx   # Recommendation card
│   ├── recommendations-list.tsx  # Recommendations list
│   └── ui/                       # shadcn/ui components
├── lib/
│   ├── jikan.ts                  # Jikan API client
│   ├── recommendations.ts        # Recommendation algorithm
│   ├── utils.ts                  # Utility functions
│   └── supabase/
│       ├── client.ts             # Client-side Supabase
│       ├── server.ts             # Server-side Supabase
│       └── middleware.ts         # Supabase middleware
├── scripts/                      # SQL migration scripts
│   ├── 001_create_profiles.sql
│   ├── 002_create_anime_lists.sql
│   ├── 003_create_anime_genres.sql
│   ├── 004_create_watch_history.sql
│   └── 005_create_recommendations.sql
├── public/                       # Static assets
│   ├── anime-hero-bg.jpg
│   ├── anime-cosmic-stars.jpg
│   ├── anime-energy-particles.jpg
│   ├── anime-magic-circle.jpg
│   └── og-image.jpg
├── middleware.ts                 # Next.js middleware for auth
├── package.json
├── tsconfig.json
├── next.config.mjs
└── tailwindcss.config.ts        # Tailwind configuration
\`\`\`

---

## 🗄️ Database Schema

### Tables Overview

#### `profiles`
Stores user profile information and preferences.
\`\`\`sql
- id (UUID, PK) - User ID from auth
- username (TEXT) - User's display name
- bio (TEXT) - User biography
- avatar_url (TEXT) - Profile picture URL
- favorite_genres (TEXT[]) - Array of favorite genres
- created_at (TIMESTAMP) - Account creation date
- updated_at (TIMESTAMP) - Last profile update
\`\`\`

#### `anime_lists`
User's anime collection with tracking status.
\`\`\`sql
- id (UUID, PK) - Primary key
- user_id (UUID, FK) - Reference to profiles
- anime_id (INT) - Jikan anime ID
- anime_title (TEXT) - Anime name
- status (ENUM) - 'watching', 'completed', 'plan_to_watch', 'dropped'
- episodes_watched (INT) - Current episode count
- rating (INT) - User's rating (1-10)
- notes (TEXT) - User notes/thoughts
- added_at (TIMESTAMP) - When added to list
- updated_at (TIMESTAMP) - Last status update
\`\`\`

#### `anime_genres`
Many-to-many relationship between anime and genres.
\`\`\`sql
- id (UUID, PK)
- anime_id (INT) - Jikan anime ID
- genre (TEXT) - Genre name (Action, Romance, Slice of Life, etc.)
- created_at (TIMESTAMP)
\`\`\`

#### `watch_history`
Tracks user's episode viewing history.
\`\`\`sql
- id (UUID, PK)
- user_id (UUID, FK) - Reference to profiles
- anime_id (INT) - Jikan anime ID
- episode_number (INT) - Episode watched
- watched_at (TIMESTAMP) - When episode was watched
\`\`\`

#### `recommendations`
AI-generated anime recommendations.
\`\`\`sql
- id (UUID, PK)
- user_id (UUID, FK) - Reference to profiles
- recommended_anime_id (INT) - Jikan anime ID
- anime_title (TEXT) - Title of recommended anime
- reason (TEXT) - Why it was recommended
- score (FLOAT) - Recommendation score (0-100)
- created_at (TIMESTAMP) - When recommendation was generated
\`\`\`

### Row Level Security (RLS)
All tables have RLS enabled so users can only access their own data:
- Users can only read/write their own profile
- Users can only manage their own anime lists and watch history
- Users can only view their own recommendations

---

## 🔐 Authentication Flow

1. **Sign Up**
   - User enters email and password
   - Supabase sends verification email
   - User clicks verification link
   - Profile is auto-created via database trigger
   - User is redirected to dashboard

2. **Login**
   - User enters email and password
   - Supabase authenticates and returns session
   - Middleware refreshes tokens and sets cookies
   - User is redirected to dashboard

3. **Protected Routes**
   - Middleware checks session validity
   - Invalid sessions redirect to login
   - Authenticated users get access

---

## 🎨 Design System

### Color Palette (Anime-Inspired)
- **Primary (Cosmic Purple)**: `#a855f7` - Domain Expansion energy
- **Secondary (Electric Cyan)**: `#06b6d4` - Gojo's Blue
- **Accent (Fiery Pink)**: `#ec4899` - Energy burst
- **Background**: `#0f0f1e` - Deep space
- **Card**: `rgba(15, 15, 30, 0.4)` - Glassmorphism

### Typography
- **Headings**: Geist Sans (bold, 700)
- **Body**: Geist Sans (regular, 400)
- **Mono**: Geist Mono (code snippets)

### Effects
- **Glassmorphism**: Blur + transparent backgrounds
- **Neon Glow**: Box shadows with glow effect
- **Animations**: GSAP scroll triggers, Framer Motion parallax

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/pnpm
- Supabase account
- Git

### Local Development

1. **Clone the Repository**
\`\`\`bash
git clone https://github.com/C0des-by-SAGAR/anime-portfolio-website.git
cd anime-portfolio-website
\`\`\`

2. **Install Dependencies**
\`\`\`bash
npm install
# or
pnpm install
\`\`\`

3. **Setup Environment Variables**
Create `.env.local`:
\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
\`\`\`

4. **Run Database Migrations**
\`\`\`bash
# Execute SQL scripts in order in Supabase SQL editor or via Supabase CLI
psql postgresql://... < scripts/001_create_profiles.sql
psql postgresql://... < scripts/002_create_anime_lists.sql
psql postgresql://... < scripts/003_create_anime_genres.sql
psql postgresql://... < scripts/004_create_watch_history.sql
psql postgresql://... < scripts/005_create_recommendations.sql
\`\`\`

5. **Start Development Server**
\`\`\`bash
npm run dev
\`\`\`

6. **Open Browser**
Navigate to `http://localhost:3000`

---

## 📡 API Routes

### Authentication
- `GET /api/auth/callback` - OAuth callback (if implemented)
- POST handled by Supabase client

### Recommendations
- `POST /api/recommendations/generate` - Generate personalized recommendations
  - **Body**: `{ userId: string }`
  - **Response**: Array of recommendations with scores

### Future API Routes (To Be Implemented)
- `POST /api/anime/add` - Add anime to list
- `PUT /api/anime/[id]` - Update anime status
- `DELETE /api/anime/[id]` - Remove anime from list
- `GET /api/anime` - Get user's anime list
- `POST /api/watch-history` - Log watched episode
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update profile

---

## 📦 External APIs & Services

### Jikan API
Free anime database API with 20,000+ titles
- **Endpoint**: `https://api.jikan.moe/v4`
- **Rate Limit**: 60 requests/minute per IP
- **Usage**: Anime search, browsing, details

### Supabase
PostgreSQL database and authentication
- **Auth**: Email/password authentication
- **Database**: PostgreSQL with real-time capabilities
- **Storage**: File storage for images

---

## 🎯 Key Features Explained

### Anime Tracking
Users can organize anime by status:
- **Watching**: Currently watching (ongoing or paused)
- **Completed**: Finished watching all episodes
- **Plan to Watch**: Want to watch in the future
- **Dropped**: Stopped watching

Each entry supports:
- Episode tracking
- Personal ratings (1-10)
- Custom notes and thoughts

### Recommendation Engine
Algorithm based on:
1. **Genre Matching**: Analyzes user's favorite genres
2. **Rating Correlation**: Finds anime with similar ratings to user's
3. **Popularity Weighting**: Considers MAL ratings and popularity
4. **Personalization**: Adjusts based on watch history

### Advanced Animations
- **GSAP Scroll Triggers**: Features fade in/slide on scroll
- **Framer Motion Parallax**: Hero section background parallax
- **Domain Expansion Effect**: Custom button animation with expanding circles
- **Floating Elements**: Continuous float animation
- **Counter Animations**: Stats count up on view

---

## 🔧 Development Guide

### Adding New Pages
1. Create folder in `app/` (e.g., `app/new-page/`)
2. Add `page.tsx` with default export
3. Add SEO metadata if public page
4. Middleware automatically protects with auth

### Adding Components
1. Create in `components/` folder
2. Use shadcn/ui for UI primitives
3. Import Tailwind classes for styling
4. Export as React component

### Database Queries
\`\`\`typescript
// Server-side queries
import { createServerClient } from '@supabase/ssr'

const supabase = createServerClient(...)
const { data, error } = await supabase
  .from('anime_lists')
  .select('*')
  .eq('user_id', userId)
\`\`\`

### Adding Animations
\`\`\`typescript
import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
// Create animations with GSAP
\`\`\`

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Connect GitHub Repository**
   - Visit [vercel.com/new](https://vercel.com/new)
   - Select repository
   - Vercel auto-detects Next.js

2. **Configure Environment Variables**
   - Add all `.env.local` variables in Vercel dashboard
   - Set for Production and Preview environments

3. **Deploy**
   - Vercel auto-deploys on push to `main`
   - Preview deployments for pull requests
   - Automatic rollback on build failure

### Custom Domain
1. Domain Settings → Add Domain
2. Configure DNS with Vercel nameservers
3. SSL automatically provisioned

### Monitoring & Logs
- Vercel Dashboard shows real-time logs
- Integrates with Supabase for database monitoring
- Error tracking with Vercel Analytics

---

## 📊 Performance Optimizations

- **Code Splitting**: Next.js automatic route-based splitting
- **Image Optimization**: Next.js Image component
- **CSS-in-JS**: Tailwind CSS with PurgeCSS
- **Database Indexes**: Indexes on frequently queried fields
- **Rate Limiting**: Jikan API rate limit handling
- **Caching**: Browser caching + Next.js ISR (if needed)

---

## 🔒 Security Features

- **RLS Policies**: All database tables protected
- **Environment Variables**: Sensitive keys never exposed
- **HTTPS**: All traffic encrypted (Vercel auto SSL)
- **Session Management**: Supabase JWT tokens with refresh
- **SQL Injection Prevention**: Parameterized queries via Supabase
- **CSRF Protection**: Next.js built-in

---

## 🤝 Contributing

1. Clone the repository
2. Create feature branch: `git checkout -b feature/your-feature`
3. Make changes and commit: `git commit -m "Add feature"`
4. Push to branch: `git push origin feature/your-feature`
5. Submit pull request

---

## 📝 SEO Configuration

The site is fully SEO optimized:

- **Meta Tags**: Title, description, keywords on all pages
- **Open Graph**: Social media preview cards
- **Twitter Card**: X/Twitter specific meta tags
- **Structured Data**: JSON-LD schema markup
- **Sitemap**: Auto-generated `sitemap.ts`
- **Robots.txt**: Search engine crawling rules
- **Canonical URLs**: Prevent duplicate content

---

## 🐛 Troubleshooting

### Database Connection Issues
- Check Supabase project is running
- Verify environment variables are correct
- Check RLS policies aren't blocking queries

### Authentication Problems
- Verify email verification link in inbox
- Check redirect URL matches `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL`
- Clear browser cookies and try again

### Jikan API Rate Limiting
- Check if rate limit (60/min) exceeded
- Implement caching to reduce calls
- Add delay between requests if needed

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run build`

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Jikan API](https://jikan.moe)
- [shadcn/ui](https://ui.shadcn.com)
- [GSAP Documentation](https://gsap.com)

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Author

Built by [C0des by SAGAR](https://github.com/C0des-by-SAGAR)

Deployed and synced with [v0.app](https://v0.app)

---

## 🎯 Future Enhancements

- [ ] Social features (followers, share lists)
- [ ] Advanced search with multiple filters
- [ ] User profiles/public portfolios
- [ ] Anime discussion forums
- [ ] Manga tracking integration
- [ ] Mobile app
- [ ] Advanced analytics dashboard
- [ ] Social sharing integrations

---

**Last Updated**: November 2025
**Live Site**: [animeverse.vercel.app](https://animeverse.vercel.app)
**GitHub**: [anime-portfolio-website](https://github.com/C0des-by-SAGAR/anime-portfolio-website)
