# RailQuick Website - GitHub Deployment Files

## Project Overview
RailQuick is India's First Train On-Seat Essential Delivery Service. This is a Next.js 15 website with TypeScript, Tailwind CSS, and shadcn/ui components.

## Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Package Manager**: Bun

## File Structure

```
railquick/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Home page
│   │   ├── layout.tsx            # Root layout
│   │   ├── globals.css           # Global styles
│   │   ├── about/page.tsx        # About page
│   │   ├── test-phase/page.tsx   # Test Phase page
│   │   ├── contact/page.tsx      # Contact page
│   │   ├── hiring/page.tsx       # Careers page
│   │   └── api/
│   │       ├── waitlist/route.ts # Waitlist API
│   │       ├── contact/route.ts  # Contact form API
│   │       └── hiring/route.ts   # Job application API
│   ├── components/ui/            # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── toast.tsx
│   │   └── toaster.tsx
│   ├── hooks/
│   │   ├── use-toast.ts          # Toast hook
│   │   └── use-mobile.ts         # Mobile detection
│   └── lib/
│       └── utils.ts              # Utility functions
├── public/
│   └── robots.txt
├── tailwind.config.ts            # Tailwind configuration
├── next.config.ts                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies
├── postcss.config.mjs            # PostCSS configuration
└── components.json               # shadcn/ui configuration
```

## Quick Start

1. Clone the repository
2. Install dependencies: `bun install`
3. Set up environment variables (Supabase URL and Key)
4. Run development server: `bun run dev`
5. Open http://localhost:3000

## Supabase Configuration

The project uses Supabase for backend. Tables needed:
- `notifications` - for waitlist emails
- `contacts` - for contact form submissions  
- `applications` - for job applications

## Pages

1. **Home (/)** - Hero, How It Works, Products, Stats, Testimonials, FAQ, CTA
2. **About (/about)** - Story, Values, Team, Timeline
3. **Test Phase (/test-phase)** - Testing journey, Learnings, Phases
4. **Contact (/contact)** - Contact form, Founder contacts
5. **Hiring (/hiring)** - Open positions, Application form

## Features

- Responsive design (mobile-first)
- Toast notifications for form submissions
- Email collection modal for "Try Now" button
- Smooth animations and transitions
- SEO optimized with meta tags

## Deployment

Can be deployed to:
- Vercel (recommended)
- Netlify
- Any Node.js hosting

Build command: `bun run build`
Start command: `bun run start`
