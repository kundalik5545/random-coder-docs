<!-- 76f6ebd7-95dc-408d-8a6e-59dadb66cfe1 126bcf1a-c3f6-4487-b675-268fbdaeef14 -->
# CRUD Pages for User Data Models Plan

## Overview

Create four dynamic pages under `/updates` route for managing user-specific data: Daily Notes, Daily Updates, Todo Items, and Copy Paste Materials. Each page will display data in table format with edit, delete, and add new functionality.

## Prisma Models Reference

Based on the schema, we have:

- **TodoItem**: id, userId, title, description, completed, createdAt, updatedAt
- **DailyUpdate**: id, userId, title, description, createdAt, updatedAt
- **DailyNote**: id, userId, title, description, createdAt, updatedAt
- **CopyPasteMaterial**: id, userId, title, description, createdAt, updatedAt

All models are user-scoped (userId relation to User).

## Implementation Steps

### 1. Create Prisma Client Singleton

- Create or update `lib/db.ts` with Prisma client singleton pattern
- Ensure proper connection handling for Next.js App Router
- Reuse existing PrismaClient instance if available

### 2. Create API Routes for CRUD Operations

For each model, create API routes at:

- `app/api/todo-items/route.ts` - GET (list), POST (create)
- `app/api/todo-items/[id]/route.ts` - GET (single), PATCH (update), DELETE (delete)
- `app/api/daily-updates/route.ts` - GET (list), POST (create)
- `app/api/daily-updates/[id]/route.ts` - GET (single), PATCH (update), DELETE (delete)
- `app/api/daily-notes/route.ts` - GET (list), POST (create)
- `app/api/daily-notes/[id]/route.ts` - GET (single), PATCH (update), DELETE (delete)
- `app/api/copy-paste-materials/route.ts` - GET (list), POST (create)
- `app/api/copy-paste-materials/[id]/route.ts` - GET (single), PATCH (update), DELETE (delete)

Each API route should:

- Validate user session using `auth.api.getSession()`
- Filter data by userId for security
- Handle errors appropriately
- Return proper HTTP status codes

### 3. Create Reusable Table Component

- Create `components/data-table.tsx` - Reusable table component with:
- Table display with columns (Title, Description, Created At, Updated At, Actions)
- Edit button (opens modal/form)
- Delete button (with confirmation)
- Responsive design matching Fumadocs theme
- Loading states
- Empty state when no data

### 4. Create Form Modal Component

- Create `components/data-form-modal.tsx` - Reusable form modal for create/edit:
- Title input field
- Description textarea field
- Submit and cancel buttons
- Form validation
- Loading states during submission
- Error handling

### 5. Create Page Components and Route Structure

Create new `/updates` route structure:

- Create `app/updates/layout.tsx` - Layout for updates section with authentication protection
- Create `app/updates/page.tsx` - Index/landing page for updates section (optional, or redirect to one of the pages)

Create pages under `/updates` route:

- `app/updates/daily-notes/page.tsx` - Daily Notes page
- `app/updates/daily-updates/page.tsx` - Daily Updates page
- `app/updates/todo-items/page.tsx` - Todo Items page (with completed checkbox)
- `app/updates/copy-paste-materials/page.tsx` - Copy Paste Materials page

Each page should:

- Be a client component (for interactivity) - use TypeScript
- Fetch data using API routes
- Display data in table format using reusable table component
- Include "Add New" button
- Handle edit/delete operations
- Show loading and error states
- Be protected by authentication (handled by updates layout)

### 6. Todo Items Special Handling

- Add completed checkbox in table
- Add toggle functionality for completed status
- Update API to handle completed status changes
- Show visual distinction for completed items

### 7. Data Formatting and Display

- Format dates (createdAt, updatedAt) in readable format
- Truncate long descriptions in table view
- Show full description in edit modal
- Handle null/empty descriptions gracefully

## Files to Create/Modify

### New Files:

- `lib/db.ts` - Prisma client singleton
- `components/data-table.tsx` - Reusable table component
- `components/data-form-modal.tsx` - Reusable form modal
- `app/api/todo-items/route.ts` - Todo items list/create API
- `app/api/todo-items/[id]/route.ts` - Todo items update/delete API
- `app/api/daily-updates/route.ts` - Daily updates list/create API
- `app/api/daily-updates/[id]/route.ts` - Daily updates update/delete API
- `app/api/daily-notes/route.ts` - Daily notes list/create API
- `app/api/daily-notes/[id]/route.ts` - Daily notes update/delete API
- `app/api/copy-paste-materials/route.ts` - Copy paste materials list/create API
- `app/api/copy-paste-materials/[id]/route.ts` - Copy paste materials update/delete API
- `app/docs/daily-notes/page.tsx` - Daily Notes page
- `app/docs/daily-updates/page.tsx` - Daily Updates page
- `app/docs/todo-items/page.tsx` - Todo Items page
- `app/docs/copy-paste-materials/page.tsx` - Copy Paste Materials page

### Modified Files:

- Potentially update `app/ds/[[...slug]]/page.tsx` to handle dynamic routes (if needed)

## Security Considerations

- All API routes must validate user session
- Filter all queries by userId to ensure users only see their own data
- Validate input data (title, description)
- Prevent SQL injection via Prisma parameterized queries
- Handle unauthorized access attempts

## User Experience

- Smooth loading states during data fetch
- Optimistic updates for better UX
- Confirmation dialogs for delete operations
- Clear error messages
- Success feedback after operations
- Responsive table design for mobile devices

## Technical Notes

- Use Next.js App Router patterns
- Leverage existing Fumadocs theme styling
- Use React Server Components where possible, Client Components for interactivity
- Implement proper error boundaries
- Consider pagination for large datasets (future enhancement)

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