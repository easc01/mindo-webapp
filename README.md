# Mindo 2.0

**Mindo** is a cross-platform web and mobile application designed to streamline and supercharge access to educational content from YouTube. With a focus on smart learning, Mindo transforms how students and self-learners engage with video-based education through powerful tools like playlist search, course creation, progress tracking, and collaborative group chats.

## Tech Stack

- **[Vite](https://vitejs.dev/)**: Next-generation frontend tooling with lightning-fast HMR and build performance
- **[TypeScript](https://www.typescriptlang.org/)**: Strong typing for enhanced code quality and developer experience
- **[SWC](https://swc.rs/)**: Super-fast JavaScript/TypeScript compiler and bundler
- **[Redux Toolkit](https://redux-toolkit.js.org/)**: The official, opinionated toolkit for efficient Redux development
- **[React Query](https://tanstack.com/query/latest)**: Data fetching and state management for asynchronous operations
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework for rapid UI development
- **[shadcn/ui](https://ui.shadcn.com/)**: High-quality, accessible UI components built with Radix UI and Tailwind CSS
- **[Framer Motion](https://www.framer.com/motion/)**: Production-ready animation library for React

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/easc01/mindo-webapp.git

# Navigate to the project directory
cd your-repository

# Install dependencies
npm install
# or
yarn
# or
pnpm install
```

### Development

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The application will be available at `http://localhost:5173` by default.

### Build

Build the application for production:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

### Preview

Preview the production build locally:

```bash
npm run preview
# or
yarn preview
# or
pnpm preview
```

## Project Structure

```
/src
  /assets        # Static assets like images, fonts, etc.
  /components    # Reusable UI components
    /ui          # shadcn/ui components
  /hooks         # Custom React hooks
  /lib           # Utility functions and shared code
  /pages         # Page components
  /services      # API services and data fetching logic
  /store         # Redux store configuration and slices
  /types         # TypeScript type definitions
  App.tsx        # Main App component
  index.css      # Global styles and Tailwind configurations
  main.tsx       # Entry point
```

## Features

- **Dynamic Content Curation**: Auto generate roadmaps of a subject using AI and get relevant Youtube lectures
- **Communities**: Fully fledged support for realtime communication using Chats and Video/Voice Calls
- **Quizzes & Tests**: Interactive multiple choice questions games

## Tailwind CSS

This project uses Tailwind CSS for styling. The configuration can be found in `tailwind.config.js`. To learn more about using Tailwind, check out the [official documentation](https://tailwindcss.com/docs).

## Adding New Components

### shadcn/ui Components

To add new shadcn/ui components:

```bash
npx shadcn-ui@latest add [component-name]
```

Replace `[component-name]` with components like `button`, `dialog`, `card`, etc.

## Acknowledgments

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
