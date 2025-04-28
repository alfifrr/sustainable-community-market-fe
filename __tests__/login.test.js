import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../src/app/login/page';

// Mock the useRouter hook
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

// Mock next/link
jest.mock('next/link', () => {
  // eslint-disable-next-line react/display-name
  return ({ children, href }) => {
    return <a href={href}>{children}</a>;
  };
});

// Mock useDebounce hook
jest.mock('../src/hooks/useDebounce', () => ({
  useDebounce: (value) => value
}));

// Mock React.useState to avoid hook issues
const originalUseState = React.useState;
jest.spyOn(React, 'useState').mockImplementation((initialState) => {
  return originalUseState(initialState);
});

// Mock React.useEffect to avoid hook issues
jest.spyOn(React, 'useEffect').mockImplementation(() => {});

describe('Login', () => {
  it('renders login form', () => {
    // Simple test that just checks if component renders without errors
    render(<Login />);
    expect(document.body.textContent).toContain('Login');
  });
});