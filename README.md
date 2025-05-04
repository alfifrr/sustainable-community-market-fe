# Sustainable Community Market - Frontend

A modern web application built with Next.js and TypeScript, creating a marketplace platform that connects sustainable local producers with environmentally conscious consumers. The platform aims to build a sustainable economic ecosystem, support local small businesses, and reduce the environmental impact of everyday consumption.

## Features

### Marketplace Features

- **Product Browsing**: Browse sustainable products from local producers
- **Community Connection**: Connect with local farmers and producers
- **Sustainability Focus**: Support for eco-friendly products and practices
- **Impact Tracking**: Measure environmental and social impact of purchases

### Authentication System

- **Login Form**: Complete user authentication with email and password
- **Signup Form**: User registration with comprehensive profile information
- **Password Visibility**: Eye icon to temporarily reveal password input
- **Password Strength Indicator**: Visual feedback on password security with criteria checklist
- **Remember Me Functionality**: Option to save login email for returning users

### User Experience

- **Form Validation**: Real-time and submission-time validation with clear error messages
- **Loading States**: Visual feedback during form submission with disabled inputs
- **Server Error Handling**: Clean display of backend error messages
- **Mobile-Responsive Design**: Optimized layout for all screen sizes using Tailwind CSS and DaisyUI
- **Responsive Pages**: All pages are fully responsive across devices

### Technical Features

- **TypeScript**: Full type safety throughout the application
- **Next.js App Router**: Modern routing system with file-based routes
- **Client Components**: Interactive UI elements with React hooks
- **Tailwind CSS & DaisyUI**: Utility-first styling framework for consistent design
- **Unit Tests**: Basic test coverage for components
- **Hooks**: Custom hooks like useDebounce for improved UX

## Project Structure

```bash
sustainable-community-market-fe/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── about/                # About page
│   │   ├── careers/              # Careers page
│   │   ├── contact/              # Contact page
│   │   ├── cookies/              # Cookie policy page
│   │   ├── faq/                  # FAQ page
│   │   ├── impact/               # Impact report page
│   │   ├── login/                # Login page
│   │   ├── privacy/              # Privacy policy page
│   │   ├── products/             # Products browsing
│   │   ├── returns/              # Returns policy page
│   │   ├── shipping/             # Shipping information page
│   │   ├── signup/               # Signup page
│   │   ├── team/                 # Team page
│   │   ├── terms/                # Terms of service page
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Home page
│   ├── components/               # Reusable components
│   │   ├── CommunitySection.tsx  # Community section component
│   │   ├── Footer.tsx            # Footer component
│   │   ├── HeroSection.tsx       # Hero section component
│   │   ├── ImpactStatsSection.tsx# Impact stats component
│   │   ├── Navbar.tsx            # Navigation bar component
│   │   ├── SectionContainer.tsx  # Section container component
│   │   ├── SustainabilitySection.tsx # Sustainability section
│   │   └── ... other components
│   ├── context/                  # React Context providers
│   │   └── ThemeContext.tsx      # Theme context provider
│   ├── hooks/                    # Custom React hooks
│   │   ├── useAuth.tsx           # Authentication hook
│   │   ├── useDebounce.tsx       # Debounce hook
│   │   └── ... other hooks
│   ├── lib/                      # Utility libraries
│   │   ├── endpoints.ts          # API endpoints
│   │   ├── types.ts              # TypeScript type definitions
│   │   └── ... other utilities
│   └── store/                    # State management
│       ├── authStore.ts          # Authentication state
│       └── cartStore.ts          # Shopping cart state
├── public/                       # Static assets
│   ├── images/                   # Image assets
│   └── logo/                     # Logo assets
├── __tests__/                    # Test files
├── next.config.ts                # Next.js configuration
├── package.json                  # Project dependencies
├── tailwind.config.js           # Tailwind CSS configuration
└── tsconfig.json                # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js 16.8 or later
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/nextjs-auth-system.git
cd nextjs-auth-system
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Run the development server

```bash
npm run dev
# or
yarn dev
```

4. Open http://localhost:3000 in your browser to view the application
   Running Tests

```bash
npm test
# or
yarn test
```

## Future Enhancements

- Integration with backend authentication API
- Social login options (Google, Facebook, etc.)
- Two-factor authentication
- Password reset functionality
- User profile management
- Protected routes for authenticated users
- Session management and persistence
- Product search with filters
- Shopping cart functionality
- Checkout process
- Order tracking
- Seller dashboard
- Admin panel

## Technologies Used

Next.js 14+
React 18+
TypeScript
Tailwind CSS
Jest & React Testing Library
