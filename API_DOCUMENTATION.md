# Startacus API Documentation

## Overview

Startacus is a modern Next.js starter template built with TypeScript, featuring authentication, database integration, email functionality, and a comprehensive UI component library. This documentation covers all public APIs, functions, and components available in the project.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Configuration](#configuration)
3. [Utility Functions](#utility-functions)
4. [Custom Hooks](#custom-hooks)
5. [UI Components](#ui-components)
6. [Global Components](#global-components)
7. [Page Components](#page-components)
8. [Providers](#providers)
9. [Server Actions](#server-actions)
10. [Database](#database)
11. [Animation Utilities](#animation-utilities)
12. [Constants](#constants)
13. [Email Templates](#email-templates)
14. [API Routes](#api-routes)

---

## Project Structure

```
startacus/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── admin/             # Admin panel routes
│   ├── api/               # API routes
│   └── styles/            # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── global/           # Global layout components
│   ├── home/             # Home page components
│   └── profile/          # Profile page components
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
├── actions/              # Server actions
├── providers/            # React context providers
├── database/             # Database schema and config
├── emails/               # Email templates
└── constants/            # Configuration constants
```

---

## Configuration

### Site Configuration

Located in `constants/site.config.ts`:

```typescript
export const siteConfig = {
  supportEmail: "info@startacus.app",
};

export const features = [
  {
    name: "Instant Ignition",
    description: "Startacus clears the path with smart defaults and best practices, letting you code, not configure.",
    icon: Computer,
  },
  // ... more features
];

export const faqItems = [
  {
    question: "How do I get started?",
    answer: "Clone the repository, run npm install, and then npm run dev...",
  },
  // ... more FAQ items
];
```

**Usage:**
```typescript
import { siteConfig, features, faqItems } from "@/constants/site.config";

// Access support email
const email = siteConfig.supportEmail;

// Use features in components
const FeaturesList = () => (
  <div>
    {features.map((feature) => (
      <div key={feature.name}>
        <feature.icon />
        <h3>{feature.name}</h3>
        <p>{feature.description}</p>
      </div>
    ))}
  </div>
);
```

---

## Utility Functions

### `lib/utils.ts`

#### `cn(...inputs: ClassValue[])`
Combines and merges Tailwind CSS classes.

**Parameters:**
- `inputs`: Array of class values (strings, objects, arrays)

**Returns:** `string` - Merged class names

**Example:**
```typescript
import { cn } from "@/lib/utils";

// Basic usage
const classes = cn("text-red-500", "font-bold");
// Result: "text-red-500 font-bold"

// Conditional classes
const classes = cn(
  "base-class",
  isActive && "active-class",
  disabled && "disabled-class"
);

// With objects
const classes = cn({
  "text-red-500": isError,
  "text-green-500": isSuccess,
});
```

#### `getInitials(name: string | null | undefined): string`
Extracts initials from a name string.

**Parameters:**
- `name`: The full name string

**Returns:** `string` - The initials (e.g., "JD" for "John Doe")

**Example:**
```typescript
import { getInitials } from "@/lib/utils";

const initials = getInitials("John Doe"); // "JD"
const initials = getInitials("John"); // "J"
const initials = getInitials(null); // "?"
```

#### `getCroppedImg(imageSrc: string, pixelCrop: CropArea): Promise<string>`
Creates a cropped image based on the provided source image and crop area.

**Parameters:**
- `imageSrc`: The source image as a data URL or URL string
- `pixelCrop`: Object with `x`, `y`, `width`, and `height` properties

**Returns:** `Promise<string>` - Promise resolving to a data URL of the cropped image

**Example:**
```typescript
import { getCroppedImg } from "@/lib/utils";

const cropArea = { x: 10, y: 10, width: 100, height: 100 };
const croppedImage = await getCroppedImg("/path/to/image.jpg", cropArea);
```

---

## Custom Hooks

### `hooks/useIsMobile.ts`

#### `useIsMobile(MOBILE_BREAKPOINT?: number): boolean`
Hook for detecting mobile screen sizes.

**Parameters:**
- `MOBILE_BREAKPOINT`: Screen width threshold in pixels (default: 768)

**Returns:** `boolean` - True if screen is mobile-sized

**Example:**
```typescript
import { useIsMobile } from "@/hooks/useIsMobile";

const MyComponent = () => {
  const isMobile = useIsMobile(); // Uses default 768px
  const isTablet = useIsMobile(1024); // Custom breakpoint
  
  return (
    <div>
      {isMobile ? (
        <MobileLayout />
      ) : (
        <DesktopLayout />
      )}
    </div>
  );
};
```

### `hooks/useTheme.ts`

#### `useEnhancedTheme()`
Enhanced theme hook with animated transitions.

**Returns:** Object with:
- `theme`: Current resolved theme
- `toggleTheme`: Function to toggle theme with optional coordinates
- `setTheme`: Function to set specific theme

**Example:**
```typescript
import { useEnhancedTheme } from "@/hooks/useTheme";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useEnhancedTheme();
  
  const handleToggle = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const coords = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
    toggleTheme(coords);
  };
  
  return (
    <button onClick={handleToggle}>
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
};
```

---

## UI Components

### Button Component

Located in `components/ui/button.tsx`:

#### `Button`
A versatile button component with multiple variants and effects.

**Props:**
- `variant`: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "dropdownItem"
- `effect`: "expandIcon" | "ringHover" | "shine" | "shineHover" | "gooeyRight" | "gooeyLeft" | "underline" | "hoverUnderline" | "gradientSlideShow"
- `size`: "default" | "xs" | "sm" | "lg" | "icon"
- `icon`: React component for icon
- `iconPlacement`: "left" | "right"
- `asChild`: boolean - Renders as child component

**Examples:**
```typescript
import { Button } from "@/components/ui/button";
import { ChevronRight, Download } from "lucide-react";

// Basic button
<Button>Click me</Button>

// Button with variant and size
<Button variant="outline" size="lg">
  Large Outline Button
</Button>

// Button with icon
<Button icon={Download} iconPlacement="left">
  Download
</Button>

// Button with effects
<Button effect="shine" variant="default">
  Shiny Button
</Button>

// Expandable icon button
<Button effect="expandIcon" icon={ChevronRight} iconPlacement="right">
  Hover to expand
</Button>

// As child component
<Button asChild>
  <a href="/download">Download Link</a>
</Button>
```

### Other UI Components

#### `Card`
Container component for content sections.

```typescript
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
</Card>
```

#### `Input`
Styled input component.

```typescript
import { Input } from "@/components/ui/input";

<Input placeholder="Enter text..." />
```

#### `Label`
Form label component.

```typescript
import { Label } from "@/components/ui/label";

<Label htmlFor="email">Email</Label>
```

#### `Checkbox`
Checkbox input component.

```typescript
import { Checkbox } from "@/components/ui/checkbox";

<Checkbox id="terms" />
<Label htmlFor="terms">Accept terms</Label>
```

#### `Switch`
Toggle switch component.

```typescript
import { Switch } from "@/components/ui/switch";

<Switch id="notifications" />
<Label htmlFor="notifications">Enable notifications</Label>
```

#### `Avatar`
User avatar component.

```typescript
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

<Avatar>
  <AvatarImage src="/avatar.jpg" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

#### `Dialog`
Modal dialog component.

```typescript
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
    </DialogHeader>
    <p>Dialog content</p>
  </DialogContent>
</Dialog>
```

#### `Dropdown Menu`
Dropdown menu component.

```typescript
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Item 1</DropdownMenuItem>
    <DropdownMenuItem>Item 2</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

---

## Global Components

### `Header`
Main navigation header component.

```typescript
import { Header } from "@/components/global/Header";

<Header />
```

### `Footer`
Site footer component.

```typescript
import { Footer } from "@/components/global/Footer";

<Footer />
```

### `ThemeToggle`
Theme switching component.

```typescript
import { ThemeToggle } from "@/components/global/ThemeToggle";

<ThemeToggle />
```

### `UserProfileAvatar`
User profile avatar with dropdown.

```typescript
import { UserProfileAvatar } from "@/components/global/UserProfileAvatar";

<UserProfileAvatar />
```

### `LoaderButton`
Button with loading state.

```typescript
import { LoaderButton } from "@/components/global/LoaderButton";

<LoaderButton loading={isLoading} onClick={handleSubmit}>
  Submit
</LoaderButton>
```

### `Logo`
Site logo component.

```typescript
import { Logo } from "@/components/global/Logo";

<Logo />
```

### `Toaster`
Toast notification container.

```typescript
import { Toaster } from "@/components/global/Toaster";

// Place in layout
<Toaster />
```

---

## Page Components

### Home Page Components

#### `Hero`
Landing page hero section.

```typescript
import { Hero } from "@/components/home/Hero";

<Hero />
```

#### `Features`
Features showcase section.

```typescript
import { Features } from "@/components/home/Features";

<Features />
```

#### `About`
About section component.

```typescript
import { About } from "@/components/home/About";

<About />
```

#### `TechCards`
Technology stack showcase.

```typescript
import { TechCards } from "@/components/home/TechCards";

<TechCards />
```

#### `Faq`
Frequently asked questions section.

```typescript
import { Faq } from "@/components/home/Faq";

<Faq />
```

#### `Cta`
Call-to-action section.

```typescript
import { Cta } from "@/components/home/Cta";

<Cta />
```

### Profile Page Components

#### `AvatarUpload`
Avatar upload and cropping component.

```typescript
import { AvatarUpload } from "@/components/profile/avatar-upload";

<AvatarUpload />
```

#### `ChangeEmail`
Email change form component.

```typescript
import { ChangeEmail } from "@/components/profile/change-email";

<ChangeEmail />
```

#### `NameEditor`
Name editing component.

```typescript
import { NameEditor } from "@/components/profile/name-editor";

<NameEditor />
```

#### `UserAccounts`
Connected accounts management.

```typescript
import { UserAccounts } from "@/components/profile/user-accounts";

<UserAccounts />
```

#### `UserSessions`
Active sessions management.

```typescript
import { UserSessions } from "@/components/profile/user-sessions";

<UserSessions />
```

---

## Providers

### `QueryProvider`
React Query provider for data fetching.

```typescript
import { QueryProviders } from "@/providers/QueryProvider";

// Wrap your app
<QueryProviders>
  <App />
</QueryProviders>
```

### `ThemeProvider`
Theme management provider.

```typescript
import { ThemeProvider } from "@/providers/ThemeProvider";

<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange
>
  <App />
</ThemeProvider>
```

---

## Server Actions

### Admin Actions

Located in `actions/admin.ts`:

#### `createNewUser(name, email, password, role)`
Creates a new user with specified role.

**Parameters:**
- `name`: User's full name
- `email`: User's email address
- `password`: User's password
- `role`: "admin" | "user" | array of roles

**Returns:** `Promise<{newUser} | {error}>`

**Example:**
```typescript
import { createNewUser } from "@/actions/admin";

const result = await createNewUser(
  "John Doe",
  "john@example.com",
  "password123",
  "user"
);

if (result.error) {
  console.error(result.error);
} else {
  console.log("User created:", result.newUser);
}
```

#### `updateUserRole(userId, role)`
Updates a user's role.

**Parameters:**
- `userId`: User ID string
- `role`: New role(s) to assign

**Returns:** `Promise<{updatedUser} | {error}>`

#### `deleteUser(userId)`
Deletes a user account.

**Parameters:**
- `userId`: User ID string

**Returns:** `Promise<{deletedUser} | {error}>`

#### `banUser(userId, banReason?)`
Bans a user account.

**Parameters:**
- `userId`: User ID string
- `banReason`: Optional reason for ban

**Returns:** `Promise<{bannedUser} | {error}>`

#### `unbanUser(userId)`
Unbans a user account.

**Parameters:**
- `userId`: User ID string

**Returns:** `Promise<{unbannedUser} | {error}>`

#### `listUsers(pageSize, currentPage)`
Lists users with pagination.

**Parameters:**
- `pageSize`: Number of users per page
- `currentPage`: Current page number

**Returns:** `Promise<{users, total} | {error}>`

**Example:**
```typescript
import { listUsers } from "@/actions/admin";

const result = await listUsers(10, 1);
if (result.error) {
  console.error(result.error);
} else {
  console.log(`Found ${result.total} users:`, result.users);
}
```

---

## Database

### Database Connection

Located in `database/index.ts`:

```typescript
import { db } from "@/database";

// The database instance is configured with:
// - PostgreSQL connection
// - Drizzle ORM
// - Snake case naming convention
// - Query logging enabled
// - Full schema import
```

**Usage:**
```typescript
import { db } from "@/database";
import { users } from "@/database/drizzle/schema";

// Query users
const allUsers = await db.select().from(users);

// Insert user
const newUser = await db.insert(users).values({
  name: "John Doe",
  email: "john@example.com",
});
```

---

## Animation Utilities

### `lib/animations.ts`

#### `fadeUpAnimation`
Fade up animation configuration for Framer Motion.

```typescript
import { fadeUpAnimation } from "@/lib/animations";

<motion.div {...fadeUpAnimation}>
  Content that fades up
</motion.div>
```

#### `containerVariants`
Container animation with staggered children.

```typescript
import { containerVariants, itemVariants } from "@/lib/animations";

<motion.div variants={containerVariants} initial="hidden" animate="visible">
  <motion.div variants={itemVariants}>Item 1</motion.div>
  <motion.div variants={itemVariants}>Item 2</motion.div>
</motion.div>
```

#### `itemVariants`
Item animation for staggered reveals.

---

## Constants

### Environment Variables

Located in `constants/envs.ts`:

```typescript
// Access validated environment variables
import { envs } from "@/constants/envs";

const databaseUrl = envs.DATABASE_URL;
const nextAuthSecret = envs.NEXTAUTH_SECRET;
```

### Feature Information

Located in `constants/features-info.tsx`:

```typescript
import { featuresInfo } from "@/constants/features-info";

// Array of detailed feature information with icons and descriptions
```

### Tech Stack Information

Located in `constants/tech-stack-info.tsx`:

```typescript
import { techStackInfo } from "@/constants/tech-stack-info";

// Array of technology stack information with links and descriptions
```

---

## Email Templates

### Email Verification

Located in `emails/email-verification.tsx`:

```typescript
import { EmailVerification } from "@/emails/email-verification";

// React Email component for email verification
```

### Magic Link

Located in `emails/magic-link.tsx`:

```typescript
import { MagicLink } from "@/emails/magic-link";

// React Email component for magic link authentication
```

### Email Change Confirmation

Located in `emails/email-change-confirmation.tsx`:

```typescript
import { EmailChangeConfirmation } from "@/emails/email-change-confirmation";

// React Email component for email change confirmation
```

---

## API Routes

### Authentication Routes

Located in `app/api/auth/`:

- `[...better-auth]/route.ts` - Better Auth API routes
- Various OAuth and authentication endpoints

### Upload Routes

Located in `app/api/uploadthing/`:

- File upload endpoints using UploadThing

---

## Best Practices

### Component Usage

1. **Always use TypeScript** for type safety
2. **Import components from their specific paths** for better tree-shaking
3. **Use the `cn` utility** for conditional class names
4. **Leverage custom hooks** for shared logic
5. **Use server actions** for server-side operations

### Styling

1. **Use Tailwind CSS classes** for styling
2. **Leverage CSS variables** for theming
3. **Use the button variants** for consistent button styles
4. **Apply proper spacing** using Tailwind spacing utilities

### State Management

1. **Use React Query** for server state
2. **Use React Context** for global client state
3. **Leverage custom hooks** for component logic
4. **Use form libraries** like React Hook Form for form state

### Performance

1. **Use React.memo** for expensive components
2. **Implement proper loading states** with skeleton components
3. **Use React Suspense** for code splitting
4. **Optimize images** with Next.js Image component

---

## Getting Started

1. **Clone the repository**
2. **Install dependencies**: `npm install`
3. **Set up environment variables** (see `.env.example`)
4. **Run the development server**: `npm run dev`
5. **Set up the database**: `npm run db:push`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm run db:push` - Push database schema
- `npm run db:studio` - Open Drizzle Studio

---

For more detailed implementation examples, refer to the individual component files in the codebase.