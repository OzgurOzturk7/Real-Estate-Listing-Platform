# Bestate - Real Estate Platform

A modern real estate platform built with React, TypeScript, and Supabase. Bestate provides a comprehensive solution for property listings, user management, and real estate transactions.


## Features

### Authentication System
- **User Registration & Login** - Secure authentication with Supabase Auth
- **Profile Management** - Complete user profile with avatar and preferences
- **Password Reset** - Email-based password recovery
- **Protected Routes** - Secure access to user-specific features

### Property Management
- **Property Listings** - Browse comprehensive property database
- **Advanced Filtering** - Filter by price, location, type, and features
- **Detailed Property Pages** - High-quality images, specifications, and descriptions
- **Property Search** - Quick search functionality

### Modern UI/UX
- **Dark Mode Support** - Toggle between light and dark themes
- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **Modern Components** - Built with shadcn/ui component library
- **Smooth Animations** - Enhanced user experience with Tailwind CSS
- **Professional Design** - Clean, modern interface inspired by top real estate platforms

### Progressive Web App (PWA)
- **Mobile Optimized** - Native app-like experience
- **Custom Favicon** - Professional branding across all devices
- **Web Manifest** - Add to home screen functionality

## Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **React Router** - Client-side routing
- **Tanstack Query** - Server state management

### Backend & Database
- **Supabase** - Backend-as-a-Service platform
- **PostgreSQL** - Robust relational database
- **Row Level Security (RLS)** - Database-level security
- **Real-time subscriptions** - Live data updates
- **File Storage** - Image and document management

### Development Tools
- **ESLint** - Code linting and quality
- **PostCSS** - CSS processing
- **TypeScript Compiler** - Type checking
- **Git** - Version control

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm, pnpm, or yarn package manager
- Git

### Quick Start

1. **Clone the repository**
```bash
git clone <your-repository-url>
cd bestate
```

2. **Install dependencies**
```bash
# Using npm
npm install

# Using pnpm (recommended)
npm install -g pnpm
pnpm install

# Using yarn
npm install -g yarn
yarn install
```

3. **Environment Setup**
Create a `.env.local` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Start Development Server**
```bash
# Using npm
npm run dev

# Using pnpm
pnpm run dev

# Using yarn
yarn dev
```

5. **Open in Browser**
Navigate to `http://localhost:5173`


## Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Type Checking
npm run type-check   # TypeScript type checking
```

## Configuration

### Supabase Setup
1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key
3. Add them to your `.env.local` file
4. Run the database migrations (if provided)

### Customization
- **Colors**: Modify `tailwind.config.ts` for custom color schemes
- **Components**: Extend or customize components in `src/components/`
- **Styling**: Global styles in `src/index.css`

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure environment variables


## Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page for existing solutions
2. Create a new issue with detailed description
3. Contact the development team

## Acknowledgments

- **shadcn/ui** - For the beautiful component library
- **Supabase** - For the powerful backend platform
- **Tailwind CSS** - For the utility-first CSS framework
- **React Team** - For the amazing React framework