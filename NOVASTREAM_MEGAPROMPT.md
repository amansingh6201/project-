# 🎬 NOVASTREAM — CLAUDE CODE AGENT MEGAPROMPT
### Full-Stack OTT Streaming Platform (Netflix-Grade)

---

## ⚡ AGENT SYSTEM PROMPT (paste this into Claude Code)

```
You are an elite full-stack developer agent building NOVASTREAM — a production-grade OTT streaming platform similar to Netflix, Crunchyroll, and Hotstar combined. Your job is to build every feature end-to-end: frontend, backend, database, authentication, video streaming, and admin panel. You never leave a feature half-built. You always write working, tested code. You use modern best practices and never use placeholder data unless explicitly told to.

Tech Stack:
- Frontend: React + Vite + TailwindCSS
- Backend: Node.js + Express
- Database: Supabase (PostgreSQL + Auth + Storage)
- Video Storage: Supabase Storage (free tier) + Cloudflare Stream (optional upgrade)
- Authentication: Supabase Auth (email/password + Google OAuth)
- Deployment: Vercel (frontend) + Railway or Render (backend)

Always ask for clarification only when REQUIRED. Otherwise, make smart default decisions and build.
```

---

## 🎯 PHASE 1 — PROJECT SETUP PROMPT

```
Initialize the NOVASTREAM project with this exact structure:

/novastream
  /client          ← React + Vite frontend
  /server          ← Node.js + Express backend
  /supabase        ← Supabase migrations and config
  .env.example     ← All required env variables listed
  README.md        ← Setup instructions

Run these commands:
  npm create vite@latest client -- --template react
  cd client && npm install tailwindcss @tailwindcss/vite react-router-dom @supabase/supabase-js framer-motion react-player hls.js axios zustand

  mkdir server && cd server && npm init -y
  npm install express cors dotenv @supabase/supabase-js multer express-fileupload jsonwebtoken bcryptjs

Create .env.example with:
  VITE_SUPABASE_URL=
  VITE_SUPABASE_ANON_KEY=
  SUPABASE_SERVICE_ROLE_KEY=
  JWT_SECRET=
  PORT=5000

Confirm structure is created and all dependencies installed.
```

---

## 🎬 PHASE 2 — NOVASTREAM OPENING ANIMATION PROMPT

```
Build the NOVASTREAM intro animation that plays on first load — exactly like the Netflix "N" animation but for "NS".

Requirements:
- File: client/src/components/IntroAnimation.jsx
- Full screen black background
- Large glowing "NS" monogram appears in the center (like Netflix N)
- "NS" should be red (#E50914 Netflix red mapped to our brand #ff4d38)
- Animation sequence:
  1. Screen is black (0.5s)
  2. "NS" scales up from 0.3 to 1.0 with a red glow pulse (0.8s)
  3. "NS" holds for 0.6s
  4. Red glow ripple spreads outward like a shockwave
  5. Screen flashes white briefly
  6. Fades into the main homepage
- Use framer-motion for all animations
- After animation completes, set localStorage key "ns_intro_seen" = true
- Only show intro on first visit per session (check sessionStorage)
- Also show intro when user manually clicks the NOVASTREAM logo

Then integrate IntroAnimation.jsx into App.jsx so it wraps the entire router.

The "NS" letters should use:
  font-family: 'Bebas Neue'
  font-size: clamp(120px, 20vw, 200px)
  color: #ff4d38
  text-shadow: 0 0 80px rgba(255,77,56,0.8), 0 0 160px rgba(255,77,56,0.4)
```

---

## 🏠 PHASE 3 — HOMEPAGE (Customer View) PROMPT

```
Build the NOVASTREAM homepage for logged-in customers at client/src/pages/Home.jsx

Sections to build (all pulling real data from Supabase):

1. HERO BANNER
   - Full-width autoplay muted video trailer (background)
   - Overlay gradient dark to transparent
   - Featured title: large title text, genre tags, rating badge, description (max 2 lines)
   - Two CTA buttons: "▶ Play Now" (red) and "ℹ More Info" (grey semi-transparent)
   - Auto-rotates through 5 featured titles every 8 seconds with fade transition

2. CONTENT ROWS (Netflix-style horizontal scroll):
   - "Continue Watching" (based on user watch history)
   - "Trending Now" (ordered by view_count DESC)
   - "New Releases" (ordered by created_at DESC)
   - "Anime" (category filter)
   - "Movies" (category filter)  
   - "Web Series" (category filter)
   - "Top Rated" (ordered by rating DESC)
   - "Because You Watched [last_watched_title]" (recommendation row)

3. THUMBNAIL CARDS in each row:
   - Hover: scale up 1.08x, show play button overlay, show title + metadata
   - Show: title, year, rating badge (U/UA/A), duration, genres
   - "Continue watching" cards show a progress bar at bottom

4. NAVBAR:
   - Left: NOVASTREAM logo (clicking triggers NS intro animation)
   - Center: Browse | Movies | Series | Anime | My List
   - Right: Search icon (expands to input), Notifications bell with count, Profile avatar dropdown
   - Navbar becomes solid dark on scroll (transparent at top)
   - Mobile: hamburger menu

5. SEARCH:
   - Instant search as user types (debounced 300ms)
   - Results show thumbnails + title + year + category
   - Search across title, description, genre, cast fields

Use Supabase client to fetch all data. Use Zustand for global state (user, watchlist, continue-watching).
```

---

## 🎥 PHASE 4 — VIDEO PLAYER PAGE PROMPT

```
Build the NOVASTREAM video player at client/src/pages/Watch.jsx

URL pattern: /watch/:videoId

Player Features:
1. FULL SCREEN PLAYER using React Player + HLS.js
   - Supports .m3u8 (HLS streaming) and .mp4 direct
   - Custom controls overlay (hide after 3s of no mouse movement):
     * Play/Pause (spacebar shortcut)
     * Rewind 10s / Forward 10s (arrow key shortcuts)
     * Volume slider + mute toggle (M key)
     * Progress bar with hover preview thumbnail
     * Current time / Total duration
     * Quality selector (Auto / 1080p / 720p / 480p / 360p)
     * Subtitle toggle (if .vtt file exists)
     * Picture-in-Picture button
     * Theater mode button (wider layout)
     * Fullscreen button (F key)
     * Next Episode button (for series)

2. AUTOPLAY NEXT:
   - 20s before episode ends, show "Next Episode" countdown card (bottom right)
   - Auto plays next episode after current ends

3. WATCH HISTORY:
   - Every 10 seconds, save current timestamp to Supabase:
     Table: watch_history (user_id, video_id, progress_seconds, total_seconds, updated_at)
   - Resume from last position when re-opening same video

4. BELOW PLAYER:
   - Title, year, rating, duration, genres
   - Description (expandable)
   - Cast list with avatars
   - Like / Add to Watchlist / Share buttons
   - Comments section (user comments with avatar + timestamp)
   - "More Like This" row (6 thumbnails, same category/genre)

5. EPISODE SELECTOR (for series/anime):
   - Season tabs
   - Episode list with thumbnails, episode title, duration, description
   - Highlight current episode

All video URLs come from Supabase Storage (videos bucket) or external CDN URL stored in DB.
Track view_count: increment videos.view_count by 1 when user watches > 30 seconds.
```

---

## 👤 PHASE 5 — THREE-TIER AUTHENTICATION PROMPT

```
Build a complete 3-role authentication system for NOVASTREAM.

ROLES: 'admin' | 'staff' | 'customer'

=== SUPABASE SETUP ===
Run these SQL migrations in Supabase SQL editor:

-- User profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'customer' CHECK (role IN ('admin','staff','customer')),
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free','basic','premium')),
  subscription_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, role)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name', 'customer');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- RLS Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admins can read all profiles" ON profiles FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

=== THREE LOGIN PAGES ===

1. /login → Customer Login (client/src/pages/auth/CustomerLogin.jsx)
   - Dark cinematic theme (matching NOVASTREAM brand)
   - Email + Password fields
   - "Continue with Google" OAuth button
   - "New to NOVASTREAM? Start free trial" link
   - Forgot password flow (Supabase magic link)
   - After login: redirect to /home
   - Show plan badge after login (Free / Basic / Premium)

2. /staff/login → Staff Login (client/src/pages/auth/StaffLogin.jsx)
   - Different visual: dark blue/teal theme
   - Staff ID field + Password (staff accounts are pre-created by admin)
   - "Staff Portal" header with upload icon
   - NO self-registration (admin creates staff accounts)
   - After login: redirect to /staff/dashboard
   - 2FA support via email OTP (use Supabase OTP)

3. /admin/login → Admin Login (client/src/pages/auth/AdminLogin.jsx)
   - Strictest design: dark red/amber theme, "ADMIN ACCESS" warning banner
   - Email + Password + Secret Admin Key field (env variable ADMIN_SECRET_KEY)
   - Triple verification: password + secret key + email OTP
   - Rate limited: lock account for 30 minutes after 5 failed attempts
   - After login: redirect to /admin/dashboard
   - Log every admin login attempt to audit_logs table

=== ROUTE PROTECTION ===
Build ProtectedRoute.jsx that:
- Checks Supabase session
- Reads role from profiles table
- Redirects unauthorized users to correct login page
- Shows loading spinner while checking auth

Wrap routes:
  /home, /watch/* → requires any auth (customer/staff/admin)
  /staff/* → requires role = 'staff' or 'admin'
  /admin/* → requires role = 'admin' only
```

---

## 📤 PHASE 6 — STAFF VIDEO UPLOAD DASHBOARD PROMPT

```
Build the Staff Upload Dashboard at client/src/pages/staff/StaffDashboard.jsx

=== UPLOAD PANEL ===
Multi-step upload wizard:

STEP 1 — BASIC INFO:
  - Title (required)
  - Description (rich text editor)
  - Type: Movie | Web Series | Anime | Short Film | Documentary
  - Category/Genre (multi-select): Action, Drama, Comedy, Horror, Sci-Fi, Romance, Thriller, Fantasy, Animation, etc.
  - Language (multi-select): Hindi, English, Japanese, Korean, Tamil, Telugu, etc.
  - Release Year
  - Duration (auto-detected from video)
  - Rating: U | U/A 7+ | U/A 13+ | U/A 16+ | A
  - Cast (add cast members with name + role + photo URL)
  - Director, Producer fields

STEP 2 — MEDIA UPLOAD:
  - Thumbnail image upload (16:9 ratio, max 2MB, show preview)
  - Backdrop/Banner image upload (wide format for hero section)
  - Video file upload with CHUNKED UPLOAD to Supabase Storage:
    * Show real upload progress bar (0-100%)
    * Show upload speed (MB/s)
    * Show estimated time remaining
    * Support pause/resume upload
    * Max file size: 5GB
    * Accepted formats: .mp4, .mkv, .mov, .avi (convert to mp4 server-side)
  - Subtitle file upload (.vtt or .srt — convert .srt to .vtt automatically)
  - Trailer video upload (separate from main video)

STEP 3 — SERIES CONFIG (show only if type = Web Series or Anime):
  - Season number
  - Episode number
  - Episode title
  - Link to parent series (search existing or create new)

STEP 4 — PUBLISH SETTINGS:
  - Visibility: Draft | Published | Scheduled
  - Scheduled publish date/time picker
  - Available to: Free | Basic | Premium (plan gating)
  - Featured: toggle (only admin can set this)
  - Tags (comma separated for SEO)

=== STAFF CONTENT MANAGER ===
Below the upload form, show a table of all content uploaded by this staff member:
  Columns: Thumbnail | Title | Type | Status | Views | Upload Date | Actions (Edit/Delete)
  - Edit opens same multi-step form pre-filled
  - Soft delete (sets status = 'deleted', not hard delete)
  - Filter by status, type, date range
  - Sort by views, upload date, title

=== SUPABASE VIDEOS TABLE ===
CREATE TABLE videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT CHECK (type IN ('movie','series','anime','short','documentary')),
  category TEXT[],
  language TEXT[],
  release_year INTEGER,
  duration_seconds INTEGER,
  rating TEXT,
  cast JSONB,
  director TEXT,
  thumbnail_url TEXT,
  backdrop_url TEXT,
  video_url TEXT,
  trailer_url TEXT,
  subtitle_url TEXT,
  plan_required TEXT DEFAULT 'free',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft','published','scheduled','deleted')),
  scheduled_at TIMESTAMPTZ,
  featured BOOLEAN DEFAULT false,
  view_count BIGINT DEFAULT 0,
  tags TEXT[],
  uploaded_by UUID REFERENCES profiles(id),
  series_id UUID REFERENCES series(id),
  season_number INTEGER,
  episode_number INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 🛡️ PHASE 7 — ADMIN PANEL PROMPT

```
Build the complete Admin Panel at client/src/pages/admin/

=== LAYOUT ===
Sidebar navigation with sections:
  📊 Dashboard (overview stats)
  🎬 Content Manager
  👥 User Manager  
  💰 Revenue & Earnings
  📤 Staff Manager
  🔔 Notifications
  ⚙️  Settings
  📋 Audit Logs

=== DASHBOARD PAGE (admin/Dashboard.jsx) ===
Real-time stats cards (refresh every 30 seconds via Supabase realtime):

Row 1 — Key Metrics:
  - Total Users (with % growth vs last month)
  - Active Subscriptions (paying users count)
  - Total Revenue This Month (₹)
  - Total Videos in Library

Row 2 — Engagement:
  - Total Watch Hours Today
  - Currently Watching (live count via realtime)
  - New Signups Today
  - Churn Rate This Month

Row 3 — Content:
  - Most Watched Video (thumbnail + view count)
  - Top 5 Videos by views (mini bar chart)
  - Category breakdown pie chart (% anime vs movies vs series)
  - Upload activity heatmap (like GitHub contribution chart)

Row 4 — Revenue Chart:
  - Line chart: Daily/Weekly/Monthly revenue toggle
  - Subscription breakdown: Free vs Basic vs Premium users (donut chart)
  - Revenue forecast (simple projection based on trend)

All charts use Recharts library.
All data comes from Supabase queries aggregated server-side.

=== REVENUE & EARNINGS PAGE (admin/Revenue.jsx) ===
- Total Lifetime Revenue card
- MRR (Monthly Recurring Revenue) card  
- ARR (Annual Run Rate) card
- Subscription table: plan | price | subscribers | monthly_revenue
- Transactions table: user | plan | amount | date | payment_method | status
- Export to CSV button
- Revenue by month bar chart (last 12 months)
- Top 10 highest-paying users list

=== USER MANAGER PAGE (admin/Users.jsx) ===
Table with:
  Avatar | Name | Email | Role | Plan | Status | Joined | Last Active | Actions

Actions:
  - View profile → modal with full user details + watch history
  - Change role (promote to staff, demote from staff)
  - Change plan (override subscription)
  - Suspend / Unsuspend account
  - Reset password (send email)
  - Delete account (with confirmation modal)

Filters: role, plan, status, join date range
Search: by name or email
Pagination: 50 per page

=== STAFF MANAGER PAGE (admin/Staff.jsx) ===
- Create new staff account (name, email, temporary password)
- View all staff members + their upload counts + last active
- Revoke staff access
- View content uploaded by specific staff member
- Set upload permissions (which categories staff can upload)

=== CONTENT MANAGER PAGE (admin/Content.jsx) ===
- View ALL videos (all statuses)
- Quick approve/reject pending uploads
- Set featured flag on any video
- Override visibility/plan-gating
- Hard delete (permanent, with confirmation)
- Bulk actions (bulk publish, bulk delete, bulk change plan)
- Video preview in modal without leaving page

=== AUDIT LOGS PAGE (admin/AuditLogs.jsx) ===
Table: timestamp | user | role | action | details | ip_address
Actions logged: login, logout, video_upload, video_delete, user_role_change, plan_change, admin_login_attempt

CREATE TABLE audit_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  action TEXT NOT NULL,
  details JSONB,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

=== SETTINGS PAGE (admin/Settings.jsx) ===
- Site name, logo URL, tagline
- Subscription plan prices (editable)
- Enable/disable new user registration
- Maintenance mode toggle
- Featured hero videos selector (pick up to 5)
- Email templates editor (welcome email, subscription email)
- API keys display (masked)
```

---

## 🗄️ PHASE 8 — FREE DATABASE & STORAGE SETUP GUIDE

```
Give the user exact step-by-step instructions to set up Supabase FREE TIER for NOVASTREAM:

=== SUPABASE SETUP (FREE — NO CREDIT CARD) ===

STEP 1 — CREATE ACCOUNT:
  → Go to https://supabase.com
  → Click "Start your project" 
  → Sign up with GitHub (recommended) or email
  → Free tier includes: 500MB database, 1GB file storage, 50,000 monthly active users

STEP 2 — CREATE PROJECT:
  → Click "New Project"
  → Organization: Personal
  → Project name: novastream
  → Database password: generate strong password and SAVE IT
  → Region: Southeast Asia (Singapore) ← best for India
  → Click "Create new project" (takes ~2 minutes)

STEP 3 — GET API KEYS:
  → Go to Project Settings → API
  → Copy: Project URL → paste as VITE_SUPABASE_URL
  → Copy: anon/public key → paste as VITE_SUPABASE_ANON_KEY
  → Copy: service_role key → paste as SUPABASE_SERVICE_ROLE_KEY (NEVER expose this client-side)

STEP 4 — CREATE STORAGE BUCKETS:
  → Go to Storage in sidebar
  → Click "New Bucket"
  → Bucket 1: "videos" — Public: NO (private, requires auth)
  → Bucket 2: "thumbnails" — Public: YES (public CDN)
  → Bucket 3: "backdrops" — Public: YES
  → Bucket 4: "subtitles" — Public: YES
  → Bucket 5: "avatars" — Public: YES

  → Set storage policies for "videos" bucket:
    Allow authenticated users to upload
    Allow authenticated users to read if they have active subscription

STEP 5 — RUN DATABASE MIGRATIONS:
  → Go to SQL Editor in Supabase
  → Paste and run each CREATE TABLE statement from this prompt (Phases 5, 6, 7)
  → Enable Realtime on tables: videos, profiles, watch_history
    (Table Editor → select table → Enable Realtime toggle)

STEP 6 — ENABLE AUTHENTICATION:
  → Go to Authentication → Providers
  → Email: already enabled by default
  → Google OAuth:
    * Go to console.cloud.google.com
    * Create project → Enable Google OAuth API
    * Create OAuth credentials → Web application
    * Authorized redirect URI: https://[YOUR_PROJECT_REF].supabase.co/auth/v1/callback
    * Copy Client ID + Client Secret → paste in Supabase Auth → Google provider

STEP 7 — STORAGE LIMITS & VIDEO TIPS (FREE TIER):
  → Free tier: 1GB total storage
  → Compress videos before upload:
    Use HandBrake (free app) → H.264 codec → CRF 23 → reduces 1GB video to ~200MB
  → For larger storage FREE options:
    * Cloudflare R2: 10GB free storage + 1M free operations/month
      → Sign up at dash.cloudflare.com → R2 → Create bucket
      → Use S3-compatible SDK (aws-sdk) to upload
    * Backblaze B2: 10GB free → backblaze.com
  → For video streaming (HLS) FREE:
    * Cloudflare Stream: $5/1000 min stored (not free but very cheap)
    * Bunny.net: $10 free credit on signup → use for HLS transcoding
    * Self-host: Use ffmpeg on Railway free tier to transcode to HLS

STEP 8 — DEPLOY FRONTEND FREE:
  → Go to vercel.com → Import GitHub repo
  → Set environment variables (all VITE_ prefixed)
  → Deploy → get free .vercel.app domain
  → Custom domain: add your domain in Vercel settings

STEP 9 — DEPLOY BACKEND FREE:
  → Go to render.com → New Web Service → connect GitHub
  → Or: railway.app → Deploy from GitHub
  → Set environment variables
  → Both have free tiers (Render: 750 hrs/month, Railway: $5 free credit)

=== TOTAL MONTHLY COST ON FREE TIER: ₹0 ===
  ✅ Supabase: Free (500MB DB + 1GB storage)
  ✅ Vercel: Free (frontend hosting)
  ✅ Render/Railway: Free (backend hosting)
  ✅ Cloudflare R2: Free (10GB video storage)
```

---

## 💳 PHASE 9 — SUBSCRIPTION & PAYMENT PROMPT

```
Build subscription/payment system for NOVASTREAM:

PLANS:
  Free: ₹0/month — limited content, ads shown, 480p max
  Basic: ₹99/month — all content, no ads, 720p max, 1 screen
  Premium: ₹199/month — all content, no ads, 1080p, 4 screens, downloads

PAYMENT INTEGRATION (Razorpay — free to sign up, Indian payments):
  → Sign up at razorpay.com (no monthly fee, only 2% per transaction)
  → npm install razorpay
  → Build /subscribe page with plan cards
  → On plan select: create Razorpay order server-side
  → Open Razorpay checkout modal client-side
  → On payment success: webhook updates profiles.plan + subscription_end in Supabase
  → Send confirmation email via Supabase Edge Functions

BUILD:
  client/src/pages/Subscribe.jsx — Plan selection UI
  server/routes/payment.js — Razorpay order creation + webhook handler
  
Webhook endpoint: POST /api/payment/webhook
  → Verify Razorpay signature
  → Update user plan in Supabase
  → Log transaction to transactions table
  → Trigger welcome email

CREATE TABLE transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  plan TEXT,
  amount INTEGER, -- in paise (₹199 = 19900)
  currency TEXT DEFAULT 'INR',
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 🔍 PHASE 10 — FINAL POLISH PROMPT

```
Apply these final production-quality features to NOVASTREAM:

1. SEO & META TAGS:
   - Dynamic page titles: "Watch {title} | NOVASTREAM"
   - Open Graph tags for social sharing
   - Structured data (JSON-LD) for movies/series
   - Sitemap generation

2. PERFORMANCE:
   - Lazy load all thumbnail images (IntersectionObserver)
   - Virtualized lists for long content rows (react-window)
   - Service worker for offline support (PWA)
   - Bundle splitting by route

3. MOBILE APP FEEL:
   - Full PWA setup (manifest.json, service worker)
   - Install prompt for Android/iOS
   - Touch-friendly video controls
   - Swipe to navigate between episodes

4. CONTENT DISCOVERY:
   - Advanced filter page: /browse?genre=anime&year=2024&rating=U/A&language=Japanese
   - Sort by: newest, most watched, highest rated, trending
   - "Random" button that picks a surprise title

5. SOCIAL FEATURES:
   - Watchlist (My List) — save content
   - Share button generates shareable link with preview card
   - User ratings (1-5 stars) stored in Supabase
   - Comments with nested replies (2 levels deep)

6. NOTIFICATIONS:
   - In-app notifications (new episode released, subscription expiring)
   - Email notifications via Supabase Edge Functions + Resend.com (free tier)

7. ACCESSIBILITY:
   - ARIA labels on all controls
   - Keyboard navigation for entire player
   - Focus trap in modals
   - Screen reader announcements for dynamic content

Deliver a production-ready application that can be deployed TODAY and handle real users.
```

---

## 🚀 HOW TO USE THIS MEGAPROMPT

### Step 1 — Install Claude Code
```bash
npm install -g @anthropic/claude-code
claude
```

### Step 2 — Start a New Project Folder
```bash
mkdir novastream && cd novastream
claude
```

### Step 3 — Paste Phases in Order
Copy each **PHASE prompt** (the code blocks) one at a time into Claude Code.
Wait for each phase to complete before starting the next.

### Step 4 — Recommended Phase Order
```
Phase 1  → Project Setup        (5 min)
Phase 8  → Supabase Setup       (15 min, do this manually in browser)
Phase 5  → Authentication       (20 min)
Phase 2  → Intro Animation      (10 min)
Phase 3  → Homepage             (30 min)
Phase 4  → Video Player         (25 min)
Phase 6  → Staff Dashboard      (20 min)
Phase 7  → Admin Panel          (30 min)
Phase 9  → Payments             (15 min)
Phase 10 → Final Polish         (20 min)
```

### Step 5 — Environment Variables
After Supabase setup (Phase 8), create `.env` file:
```env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
JWT_SECRET=your_random_64_char_string
VITE_RAZORPAY_KEY_ID=rzp_test_xxx
RAZORPAY_KEY_SECRET=xxx
ADMIN_SECRET_KEY=your_admin_secret_phrase
PORT=5000
```

---

## 📋 QUICK REFERENCE — ALL ROUTES

| Route | Page | Access |
|-------|------|--------|
| / | Landing page | Public |
| /login | Customer login | Public |
| /staff/login | Staff login | Public |
| /admin/login | Admin login | Public |
| /home | Main feed | Customer+ |
| /browse | Filter/search | Customer+ |
| /watch/:id | Video player | Customer+ |
| /subscribe | Plans & payment | Customer+ |
| /profile | User profile | Customer+ |
| /watchlist | My List | Customer+ |
| /staff/dashboard | Upload videos | Staff+ |
| /admin/dashboard | Admin overview | Admin only |
| /admin/users | User manager | Admin only |
| /admin/content | Content manager | Admin only |
| /admin/revenue | Earnings | Admin only |
| /admin/staff | Staff manager | Admin only |
| /admin/logs | Audit logs | Admin only |
| /admin/settings | Site settings | Admin only |

---

*Generated for NOVASTREAM OTT Platform — Built with Claude Code Agent*
*Free deployment stack: Supabase + Vercel + Render + Cloudflare R2*
