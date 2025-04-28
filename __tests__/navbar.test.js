import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from '../src/components/Navbar';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href, className }) => {
    return <a href={href} className={className}>{children}</a>;
  };
});

// Mock useDebounce hook
jest.mock('../src/hooks/useDebounce', () => ({
  useDebounce: jest.fn((value) => value)
}));

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(() => null),
    setItem: jest.fn(),
    removeItem: jest.fn(),
  },
  writable: true
});

describe('Navbar', () => {
  it('renders website name', () => {
    render(<Navbar />);
    expect(screen.getByText('SC Market')).toBeInTheDocument();
  });

  it('renders search input', () => {
    render(<Navbar />);
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });

  it('should show login button when not logged in', () => {
    render(<Navbar />);
    expect(screen.getByText(/Login \/ Sign Up/i)).toBeInTheDocument();
  });
});