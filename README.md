# RailQuick

India's first on-seat essentials delivery platform for train passengers.

## Tech Stack
- Next.js (React)
- Tailwind CSS
- Supabase (Database)
- Resend (Email Automation)

## Local Development Setup

To run this project locally, you need to set up your environment variables. 
The API routes require Secret Keys which are intentionally excluded from GitHub for security reasons.

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the example environment file and rename it to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
4. Open `.env.local` and add your exact secret keys for Supabase and Resend.
5. Start the development server:
   ```bash
   npm run dev
   ```

## Why was "Failed to Submit" happening on GitHub code?
The forms (Waitlist, Contact, Hiring) rely on `SUPABASE_SERVICE_ROLE_KEY` to securely insert data into the database bypassing RLS, and `RESEND_API_KEY` to send automated emails. Because pushing secrets to GitHub is blocked, anyone who clones this code **must** create their own `.env.local` file with the secret keys to allow the forms to work. Without these keys, the API routes will return an error and the frontend will show "Failed to submit".

## Deployment
When deploying this code to Vercel or Netlify, make sure to add the keys from `.env.example` directly into your platform's Environment Variables settings!
