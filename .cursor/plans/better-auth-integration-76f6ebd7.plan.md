<!-- 76f6ebd7-95dc-408d-8a6e-59dadb66cfe1 4e52e465-dae1-42c3-8f64-ad13e33a4117 -->
# Better Auth Integration Plan

## Overview

Integrate Better Auth authentication system with Prisma ORM and PostgreSQL database to protect all documentation routes while keeping the home page public. Create sign-in and sign-up pages for user authentication.

**Important**: Better Auth MCP is available for accurate implementation guidance. Use Better Auth MCP tools to verify configuration patterns, check setup requirements, and get the latest implementation details during development.

## Implementation Steps

### 1. Install Dependencies

- Install `better-auth` package ✅
- Install Prisma as dev dependency and  Prisma client  ✅
- Install `pg` (PostgreSQL driver) and `@types/pg` for TypeScript support ✅
- Install `dotenv` if not already present for environment variable management ✅

### 2. Database Setup

- Create `.env` file (if not exists) with `DATABASE_URL` for PostgreSQL connection ✅
- Create `.env.example` with placeholder values
- Set up PostgreSQL database schema (Better Auth will auto-generate tables on first run) ✅

### 3. Better Auth Configuration

- Create `lib/auth.ts` - Main Better Auth instance with: ✅
- PostgreSQL Pool configuration ✅
- Email/password authentication enabled ✅
- Base URL configuration ✅
- Cookie settings
- Create `lib/auth-client.ts` - Client-side auth instance for React components ✅

### 4. API Routes

- Create `app/api/auth/[...all]/route.ts` - Main auth API handler using `toNextJsHandler`
- This handles all auth endpoints (sign-in, sign-up, sign-out, session, etc.)

### 6. Middleware for Route Protection

- Create `middleware.ts` at root level to protect routes:
- Use `getSessionCookie` for optimistic redirect (faster)
- Protect routes: `/docs`, `/ai-ml`, `/automation`, `/frontend`, `/backend`, `/blog`, `/fumadocs`, `/performance`, `/sql`
- Keep `/` (home) and `/sign-in`, `/sign-up` public
- Redirect unauthenticated users to `/sign-in`

### 6. Authentication Pages

- Create `app/sign-in/page.tsx` - Sign-in page with:
- Email and password form
- Client-side form handling using `authClient.signIn.email`
- Error handling and success redirect
- Styling consistent with Fumadocs theme

- Create `app/sign-up/page.tsx` - Sign-up page with:
- Name, email, and password form
- Client-side form handling using `authClient.signUp.email`
- Error handling and success redirect
- Link to sign-in page
- Styling consistent with Fumadocs theme

### 7. Server-Side Session Validation

- Update protected route pages to validate sessions server-side:
- `app/docs/[[...slug]]/page.tsx`
- `app/ai-ml/[[...slug]]/page.tsx`
- `app/automation/[[...slug]]/page.tsx`
- `app/frontend/[[...slug]]/page.tsx`
- `app/backend/[[...slug]]/page.tsx`
- `app/blog/[[...slug]]/page.tsx`
- `app/fumadocs/[[...slug]]/page.tsx`
- `app/performance/[[...slug]]/page.tsx`
- `app/sql/[[...slug]]/page.tsx`

- Add session check using `auth.api.getSession` with `headers()` from Next.js
- Redirect to `/sign-in` if no session exists

### 8. Layout Updates

- Optionally add user menu/sign-out button to navigation in `lib/layout.shared.tsx`
- Update navigation to show auth state (authenticated vs unauthenticated)

### 9. Type Safety

- Ensure TypeScript types are properly configured for Better Auth
- Export auth types for use across the application

## Files to Create/Modify

### New Files:

- `lib/auth.ts` - Better Auth server configuration
- `lib/auth-client.ts` - Better Auth client configuration
- `app/api/auth/[...all]/route.ts` - Auth API handler
- `middleware.ts` - Route protection middleware
- `app/sign-in/page.tsx` - Sign-in page
- `app/sign-up/page.tsx` - Sign-up page
- `.env.example` - Environment variable template

### Modified Files:

- `package.json` - Add dependencies
- `app/docs/[[...slug]]/page.tsx` - Add session validation
- `app/ai-ml/[[...slug]]/page.tsx` - Add session validation
- `app/automation/[[...slug]]/page.tsx` - Add session validation
- `app/frontend/[[...slug]]/page.tsx` - Add session validation
- `app/backend/[[...slug]]/page.tsx` - Add session validation
- `app/blog/[[...slug]]/page.tsx` - Add session validation
- `app/fumadocs/[[...slug]]/page.tsx` - Add session validation
- `app/performance/[[...slug]]/page.tsx` - Add session validation
- `app/sql/[[...slug]]/page.tsx` - Add session validation
- `lib/layout.shared.tsx` - Optionally add auth UI elements

## Security Considerations

- Middleware provides optimistic redirect (cookie check only)
- Each protected route validates session server-side for actual security
- Environment variables for sensitive data (database URL, secrets)
- Better Auth handles password hashing automatically

## Notes

- Better Auth will auto-generate database tables on first run
- PostgreSQL connection pool will be managed by Better Auth
- Email/password is the default auth method; can be extended later with social providers
- Sign-in and sign-up pages will use client-side auth client for reactive state management

### To-dos

- [ ] Install better-auth, pg, @types/pg, and dotenv packages
- [ ] Create .env file with DATABASE_URL and .env.example template
- [ ] Create lib/auth.ts with Better Auth instance configured for PostgreSQL
- [ ] Create lib/auth-client.ts with client-side auth instance
- [ ] Create app/api/auth/[...all]/route.ts with auth API handler
- [ ] Create middleware.ts to protect routes except home and auth pages
- [ ] Create app/sign-in/page.tsx with email/password form
- [ ] Create app/sign-up/page.tsx with registration form
- [ ] Add session validation to all protected route pages (docs, ai-ml, automation, frontend, backend, blog, fumadocs, performance, sql)