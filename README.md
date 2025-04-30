# Sustainable Community Market - Frontend

A modern web application built with Next.js and TypeScript, featuring user authentication, product search, and community marketplace features.

## Features

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
│   ├── app/
│   │   ├── login/
│   │   │   └── page.tsx            # Login page component
│   │   ├── signup/
│   │   │   └── page.tsx            # Signup page component
│   │   ├── search/                 # Search functionality
│   │   ├── users/                  # User management
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx              # Root layout
│   │   └── page.tsx                # Home page
│   ├── components/
│   │   ├── HeroSection.tsx
│   │   ├── Navbar.tsx              # Navigation bar
│   │   ├── SearchResult.tsx
│   │   ├── SectionContainer.tsx
│   │   └── UserLayout.tsx
│   ├── hooks/
│   │   └── useDebounce.tsx         # Custom debounce hook
│   └── lib/
│       ├── endpoints.ts            # API endpoints
│       ├── types.ts                # TypeScript type definitions
│       └── utils.ts                # Utility functions
├── tests/                          # Unit tests
├── public/                         # Static assets
├── next.config.ts
├── package.json
├── README.md
└── tsconfig.json
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

Integration with backend authentication API
Social login options (Google, Facebook, etc.)
Two-factor authentication
Password reset functionality
User profile management
Protected routes for authenticated users
Session management and persistence

## Technologies Used

Next.js 14+
React 18+
TypeScript
Tailwind CSS
Jest & React Testing Library
Flask
Supabase
Mailtrap

## Swagger API Documentation

For complete API documentation, visit [Swagger Documentation](https://sustainable-community-market.onrender.com/api/docs).

## Endpoint Note

- Purchasing a product (`/api/buy`) costs additional fixed delivery and service fee of `Rp. 15,000`
- Delivery and service fee will be fully returned upon order cancellation (`/api/cancel`)

## Dynamic Pricing System

Products are automatically discounted based on their remaining days until expiration:

| Days Until Expiration | Discount | Final Price            |
| --------------------- | -------- | ---------------------- |
| > 4 days              | 0%       | 100% of original price |
| 4 days                | 20%      | 80% of original price  |
| 3 days                | 40%      | 60% of original price  |
| 2 days                | 60%      | 40% of original price  |
| 1 day                 | 80%      | 20% of original price  |
| 0 days (today)        | 90%      | 10% of original price  |
| Expired               | -        | Not available for sale |

Example:

- Original price: Rp 100,000
- 3 days until expiration: Rp 60,000 (40% discount)
- 1 day until expiration: Rp 20,000 (80% discount)

## Bulk Discount System

Purchasing 5 or more items will get a discount of 5%, stackable with the dynamic pricing system.
