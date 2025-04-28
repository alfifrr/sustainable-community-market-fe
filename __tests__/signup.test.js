import React from 'react';
import { render, screen } from '@testing-library/react';
import Signup from '../src/app/signup/page';

// Mock the useRouter hook
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

describe('Signup', () => {
  it('renders signup form', () => {
    render(<Signup />);
    // Test just the main components that should always be present
    expect(screen.getByRole('heading', { name: /sign up/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
    expect(screen.getByText(/already have an account/i)).toBeInTheDocument();
  });
});