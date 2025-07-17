# TechFlow - Modern Tech Solutions

## Overview

This is a full-stack web application built with React on the frontend and Express.js on the backend. The application appears to be a marketing website for a technology company called "TechFlow" that showcases their services, products, team, and provides contact functionality. The architecture follows a modern monorepo structure with clear separation between client and server code.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (January 17, 2025)

✓ Updated About section with 3 tabs (About Us, Our Vision, Our Mission)
✓ Changed Contact from button to regular navigation link
✓ Created carousel hero section with 3 slides:
  - Slide 1: Building the Future of Technology
  - Slide 2: AI-Powered Solutions for Tomorrow  
  - Slide 3: Scalable Cloud Infrastructure
✓ Added auto-advance carousel with navigation controls and indicators
✓ Implemented smooth transitions and animations between slides
✓ Rebranded website from "TechFlow" to "iZyane"
✓ Added custom logo (IISP logo provided by user)
✓ Added SVG support for future logo usage
✓ Moved Careers to separate page (/careers) with enhanced content
✓ Updated footer with Careers link in "Opportunities" section
✓ Removed Careers from main navigation menu
✓ Added customer/partners section with animated horizontal logo carousel
✓ Implemented dark/light mode functionality with theme toggle
✓ Added comprehensive animations and transitions throughout website
✓ Converted Contact to separate page (/contact) with enhanced form
✓ Created JSON-based job management system for easy updates
✓ Added detailed job management guide (JOB_MANAGEMENT.md)
✓ Created interactive project portfolio section with filtering and project showcase
✓ Added team member profiles section with social links and expertise tags
✓ Implemented newsletter signup with email integration and form validation
✓ Fixed navbar sizing issues and enhanced dark mode theming across entire website
✓ Created separate Team and Portfolio pages with dedicated routes
✓ Moved Team and Portfolio links to footer under "Opportunities" section
✓ Increased navbar height for better prominence and visual presence
✓ Fixed dark mode text colors in Products and Services sections for better readability

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state
- **Build Tool**: Vite for development and bundling
- **UI Components**: Radix UI primitives with custom styling

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Session Storage**: PostgreSQL sessions with connect-pg-simple
- **API Design**: RESTful API with /api prefix

### Development Setup
- **Monorepo**: Single repository with client, server, and shared directories
- **TypeScript**: Configured for the entire codebase
- **Module Resolution**: Path aliases for clean imports
- **Hot Reload**: Vite HMR for frontend, tsx for backend development

## Key Components

### Frontend Components
- **Navigation**: Fixed header with smooth scrolling to sections
- **Hero Section**: Landing area with call-to-action buttons
- **About Section**: Company information and team showcase
- **Services Section**: Grid of technology services offered
- **Products Section**: Featured products with detailed descriptions
- **Careers Section**: Job listings and company benefits
- **Contact Section**: Contact form with validation
- **Footer**: Newsletter signup and company links

### Backend Components
- **Storage Interface**: Abstracted storage layer with in-memory implementation
- **Route Registration**: Centralized route management
- **Error Handling**: Global error middleware
- **Request Logging**: Custom logging for API requests
- **Static File Serving**: Integration with Vite for development

### Shared Components
- **Database Schema**: Drizzle schema definitions
- **Type Definitions**: Shared TypeScript interfaces
- **Validation**: Zod schemas for data validation

## Data Flow

### Frontend Data Flow
1. React components use TanStack Query for data fetching
2. API requests go through centralized query client
3. Forms use controlled components with validation
4. Toast notifications provide user feedback
5. Smooth scrolling navigation between sections

### Backend Data Flow
1. Express middleware processes requests
2. Routes delegate to storage interface
3. Storage layer abstracts database operations
4. Currently using in-memory storage for users
5. Database schema ready for PostgreSQL integration

### Database Schema
- **Users Table**: Basic user authentication structure
- **Drizzle ORM**: Type-safe database operations
- **Migration Support**: Database migration management

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React with extensive Radix UI components
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Font Awesome and Lucide React icons
- **Date Handling**: date-fns for date manipulation
- **Form Handling**: React Hook Form with Zod validation

### Backend Dependencies
- **Database**: @neondatabase/serverless for PostgreSQL
- **ORM**: Drizzle with PostgreSQL dialect
- **Session Management**: express-session with PostgreSQL store
- **Development**: tsx for TypeScript execution

### Development Tools
- **Build**: Vite with React plugin
- **TypeScript**: Strict configuration across the stack
- **Linting**: ESLint integration
- **Runtime Errors**: Replit error overlay for development

## Deployment Strategy

### Build Process
1. Frontend: Vite builds React app to dist/public
2. Backend: esbuild bundles server code to dist/
3. Static assets served from build output
4. Environment-specific configuration

### Production Configuration
- **Server**: Node.js production server
- **Database**: PostgreSQL with connection pooling
- **Static Files**: Served through Express in production
- **Environment Variables**: DATABASE_URL required for operation

### Development Environment
- **Hot Reload**: Vite HMR for frontend changes
- **Server Restart**: tsx watches for backend changes
- **Database**: Local PostgreSQL or cloud provider
- **Replit Integration**: Banner and cartographer support

### Database Setup
- **Migrations**: Drizzle Kit for schema management
- **Connection**: Environment-based DATABASE_URL
- **Development**: Local PostgreSQL recommended
- **Production**: Neon or similar PostgreSQL provider

The application is designed to be easily deployable to various platforms while maintaining a clean separation of concerns between frontend presentation, backend API, and data persistence layers.