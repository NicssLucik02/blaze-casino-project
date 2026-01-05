# Blaze Casino

A modern casino web application built with Next.js 16, React 19, TypeScript, and SCSS.

## Features

- Modern UI with custom component library
- Authentication system with modal-based login/signup
- Responsive dashboard layout
- Custom Satoshi font family
- State management with Zustand
- Data fetching with TanStack Query (React Query)
- Type-safe development with TypeScript
- SCSS modules

## Tech Stack

### Core

- **Next.js 16.1.1** - React framework with App Router
- **React 19.2.3** - UI library
- **TypeScript** - Type safety
- **SCSS/Sass** - CSS preprocessor for custom styling

### State & Data

- **Zustand** - Lightweight state management
- **TanStack Query (React Query)** - Data fetching and caching

### Code Quality

- **ESLint** - Linting with Next.js and Prettier configurations
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Run linters on staged files

## Project Structure

```
blaze-casino-project/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (dashboard)/        # Dashboard route group
│   │   │   ├── layout.tsx      # Dashboard layout
│   │   │   └── page.tsx        # Dashboard home page
│   │   ├── auth/               # Auth pages
│   │   │   └── page.tsx        # Auth page
│   │   └── layout.tsx          # Root layout
│   ├── components/             # React components
│   │   ├── Auth/               # Authentication components
│   │   ├── Dashboard/          # Dashboard components
│   │   ├── Header/             # Header component
│   │   └── uikit/              # UI component library
│   │       ├── Buttons/        # Button components
│   │       └── Inputs/         # Input components
│   ├── fonts/                  # Font files
│   │   └── satoshi/            # Satoshi font family
│   └── styles/                 # Global styles and mixins
│       ├── globals.scss        # Global styles
│       └── mixins/             # SCSS mixins
├── public/                     # Static assets
└── [config files]              # Configuration files
```

## Prerequisites

- Node.js 20+ or Bun
- npm, yarn, pnpm, or bun package manager

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd blaze-casino-project
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Set up environment variables

Copy the example environment file and configure it:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# App Configuration
NEXT_PUBLIC_APP_NAME=Blaze Casino
NEXT_PUBLIC_APP_URL=http://localhost:3000

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Add other environment variables as needed
```

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint and auto-fix issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking

## Development Workflow

### Code Quality

This project uses pre-commit hooks to ensure code quality:

- **ESLint** checks for code quality issues
- **Prettier** ensures consistent formatting
- **TypeScript** validates types
- **lint-staged** runs checks only on staged files

All checks run automatically when you commit changes.

### Component Development

UI components are located in `src/components/uikit/` and follow these conventions:

- Each component has its own directory
- Components use SCSS modules for styling
- TypeScript interfaces for props
- Consistent naming: `PrimaryButton.tsx`, `primaryButton.module.scss`

### Styling

The project uses a hybrid approach:

- **SCSS modules** for component-specific styles
- **Global styles** in `src/styles/globals.scss`
- **Mixins** in `src/styles/mixins/` for reusable style patterns

## Building for Production

### Create an optimized build

```bash
npm run build
```

### Start the production server

```bash
npm run start
```

The production build includes:

- Optimized JavaScript bundles
- Minimized CSS
- Image optimization
- Server-side rendering and static generation
