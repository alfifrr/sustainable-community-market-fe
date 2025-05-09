# Sustainable Community Market - Frontend

A modern web application built with Next.js and TypeScript, creating a marketplace platform that connects sustainable local producers with environmentally conscious consumers. The platform aims to build a sustainable economic ecosystem, support local small businesses, and reduce the environmental impact of everyday consumption.

---

## Features

### Marketplace Features

- **Product Browsing**: Browse sustainable products from local producers.
- **Community Connection**: Connect with local farmers and producers.
- **Sustainability Focus**: Support eco-friendly products and practices.
- **Impact Tracking**: Measure the environmental and social impact of purchases.

### Authentication System

- **Login Form**: User authentication with email and password.
- **Signup Form**: User registration with comprehensive profile information.
- **Password Visibility**: Eye icon to temporarily reveal password input.
- **Password Strength Indicator**: Visual feedback on password security with a criteria checklist.
- **Remember Me Functionality**: Option to save login email for returning users.

### User Experience

- **Form Validation**: Real-time and submission-time validation with clear error messages.
- **Loading States**: Visual feedback during form submission with disabled inputs.
- **Server Error Handling**: Clean display of backend error messages.
- **Mobile-Responsive Design**: Optimized layout for all screen sizes using Tailwind CSS and DaisyUI.
- **Responsive Pages**: Fully responsive pages across devices.

### Technical Features

- **TypeScript**: Full type safety throughout the application.
- **Next.js App Router**: Modern routing system with file-based routes.
- **Client Components**: Interactive UI elements with React hooks.
- **Tailwind CSS & DaisyUI**: Utility-first styling framework for consistent design.
- **Custom Hooks**: Includes hooks like `useDebounce` for improved UX.

---

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
├── tailwind.config.js            # Tailwind CSS configuration
└── tsconfig.json                 # TypeScript configuration
```

---

## Deployed Apps

- **Frontend**: [Sustainable Community Market Frontend](https://sustainable-community-market-fe.vercel.app/)
- **Backend Swagger Docs**: [API Documentation](https://sustainable-community-market.onrender.com/api/docs)

---

## Getting Started

### Prerequisites

- Node.js 16.8 or later
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/alfifrr/sustainable-community-market-fe.git
   cd sustainable-community-market-fe
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

5. Run tests:

   ```bash
   npm test
   # or
   yarn test
   ```

---

## Future Enhancements

- Integration with backend authentication API.
- Social login options (Google, Facebook, etc.).
- Two-factor authentication.
- Password reset functionality.
- User profile management.
- Protected routes for authenticated users.
- Session management and persistence.
- Product search with filters.
- Shopping cart functionality.
- Checkout process.
- Order tracking.
- Seller dashboard.
- Admin panel.

---

## Technologies Used

- **Next.js 14+**
- **React 18+**
- **TypeScript**
- **Tailwind CSS**
- **Jest & React Testing Library**
- **Flask**
- **Supabase**
- **Mailtrap**

---

## Swagger API Documentation

For complete API documentation, visit [Swagger Documentation](https://sustainable-community-market.onrender.com/api/docs).

---

## Endpoint Notes

- Purchasing a product (`/api/buy`) costs an additional fixed delivery and service fee of `Rp. 15,000`.
- Delivery and service fees will be fully refunded upon order cancellation (`/api/cancel`).

---

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

**Example:**

- Original price: Rp 100,000
- 3 days until expiration: Rp 60,000 (40% discount)
- 1 day until expiration: Rp 20,000 (80% discount)

---

## Bulk Discount System

Purchasing 5 or more items will get a discount of 5%, stackable with the dynamic pricing system.

---

## Main Features

- Discount system for nearly-expired products.
- Bulk item discount: 5+ items apply a 5% discount, cumulative with the nearly-expired products.
- Geolocation, pickup, and delivery address system to find local products within 1km.
- Remember username functionality.
- Product certification system: administrators can approve or reject products.
- Product sold, rating, and review system.
- Expedition system to ensure safe transaction flow.
- Four roles: admin, seller, buyer, expedition.
- Expedition remuneration: 14,000 IDR for every successful delivery confirmation.
- Buyer can cancel pending transactions.
- Five transaction statuses: Pending, Processed, Cancelled, Delivered, Rated.
- Transaction and statement tracking.
- Product filter and pagination for various products.
- Market stock system.
- Newsletter and account verification system using Mailtrap service.
