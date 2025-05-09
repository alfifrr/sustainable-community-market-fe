# Sustainable Community Market

A modern marketplace platform connecting local producers with consumers, promoting sustainable practices and reducing food waste through dynamic pricing and bulk purchasing incentives.

## Features

### Smart Pricing System
- **Dynamic Pricing**: Automatic price adjustments based on product expiration dates
  - 4 days until expiration: 20% discount
  - 3 days until expiration: 40% discount
  - 2 days until expiration: 60% discount
  - 1 day until expiration: 80% discount
  - Expired items: Not available for sale

- **Bulk Purchasing Benefits**
  - 5% additional discount on purchases of 5 or more items
  - Stackable with dynamic pricing discounts
  - Example: 40% base discount + 5% bulk discount = 45% total savings

### User Roles
- **Buyers**: Browse products, make purchases, track orders
- **Sellers**: List products, manage inventory, track sales
- **Expedition**: Handle order processing and delivery
- **Admin**: Manage certifications and platform oversight

### Key Features
- Real-time product search and filtering
- Interactive map for locating nearby sellers
- Shopping cart with dynamic pricing calculations
- Order tracking and management
- Product certification system
- Impact points and rewards program

## Technical Stack

### Frontend
- Next.js 14 (React Framework)
- TypeScript
- Tailwind CSS
- DaisyUI Components
- Leaflet for Maps
- Jest & React Testing Library

### Backend
- Flask
- Supabase
- Mailtrap for Email Testing

## API Documentation

For complete API documentation, visit [Swagger Documentation](https://sustainable-community-market.onrender.com/api/docs)

## Pricing and Fees

### Product Pricing
- Base price set by sellers
- Dynamic discounts based on expiration dates
- Bulk purchase discounts (5% for 5+ items)

### Service Fees
- Fixed delivery and service fee: Rp 15,000 per order
- Fee is fully refundable upon order cancellation

## Development

### Prerequisites
- Node.js 18+
- Python 3.8+
- Supabase account
- Mailtrap account

### Installation
1. Clone the repository
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Set up environment variables
5. Run development servers:
   ```bash
   # Frontend
   npm run dev
   
   # Backend
   python app.py
   ```

### Testing
```bash
# Frontend tests
npm test

# Backend tests
pytest
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For support or inquiries, please contact the development team through the platform's contact form.

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