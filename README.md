# Startacus

A modern, production-ready Next.js starter template with authentication, database, and beautiful UI components.

## ✨ Features

- **Instant Ignition** - Smart defaults and best practices to get you coding, not configuring
- **Code What Counts** - Skip the boilerplate and focus on your unique business logic
- **Scale Without Sweat** - Architected for growth and optimized for performance

## 🚀 Tech Stack

- **[Next.js](https://nextjs.org)** - Full-stack React framework with SSR and API routes
- **[TypeScript](https://www.typescriptlang.org)** - Type-safe JavaScript for maintainable code
- **[BetterAuth](https://www.better-auth.com)** - Simple, secure authentication with social logins and 2FA
- **[Drizzle ORM](https://orm.drizzle.team)** - Type-safe SQL with automatic migrations
- **[Supabase](https://supabase.com)** - PostgreSQL database with instant APIs
- **[TanStack Query](https://tanstack.com/query)** - Powerful data-fetching and state management
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com)** - Beautiful, accessible UI components
- **[Resend](https://resend.com)** - Reliable email API for transactional emails

## 📦 Getting Started

### Prerequisites

- Bun 1.0+ installed
- PostgreSQL database (or Supabase account)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/startacus.git
cd startacus
```

2. Install dependencies:

```bash
bun install
```

3. Set up your environment variables:

```bash
cp .env.example .env
```

4. Configure your `.env` file with your database and API keys

5. Run database migrations:

```bash
bun run db:sync
```

6. Start the development server:

```bash
bun run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Available Scripts

- `bun run dev` - Start development server with Turbopack
- `bun run build` - Build for production
- `bun start` - Start production server
- `bun run lint` - Run ESLint
- `bun run typecheck` - Run TypeScript type checking
- `bun run db:push` - Push database schema changes
- `bun run db:studio` - Open Drizzle Studio
- `bun run db:sync` - Sync database (generate, migrate, push, pull)
- `bun run email` - Start email development server

## 🔒 Git Commit Flow (Husky)

Startacus uses Husky and lint-staged to ensure code quality. When you commit:

1. **Pre-commit Hook** - Automatically runs on staged files:
   - Stashes unstaged changes (keeps workspace clean)
   - Runs TypeScript type checking
   - Runs ESLint with auto-fix
   - Runs Prettier formatting
   - Restores unstaged changes after checks

2. **Commitlint** - Enforces conventional commit messages (e.g., `feat:`, `fix:`, `docs:`)

3. **Post-commit** - Reminds you to push changes

This ensures every commit is type-safe, linted, and formatted consistently.

## 📁 Project Structure

```
startacus/
├── app/                    # Next.js app directory
│   ├── (dashboard)/       # Dashboard routes
│   ├── (main)/            # Main app routes
│   └── api/               # API routes
├── components/            # React components
│   ├── global/           # Global components
│   ├── home/             # Home page components
│   └── ui/               # UI components (shadcn/ui)
├── database/             # Database schema and migrations
├── lib/                  # Utility functions and configs
├── hooks/                # Custom React hooks
├── constants/            # App constants and configs
└── public/               # Static assets
```

## 🔐 Authentication

Startacus comes with built-in authentication including:

- Email/password authentication
- Magic link authentication
- Social logins (Google, etc.)
- Email verification
- Session management
- User profile management

## 📧 Email Templates

Pre-built email templates using React Email:

- Email verification
- Magic link login
- Email change confirmation

## 🎨 UI Components

Built with shadcn/ui and Tailwind CSS, featuring:

- Responsive design
- Dark mode support
- Accessible components
- Customizable themes
