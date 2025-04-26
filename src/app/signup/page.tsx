'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDebounce } from '@/hooks/useDebounce';

interface FormErrors {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  confirmPassword: string;
}

interface PasswordStrength {
  score: number; 
  message: string;
  color: string;
}

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: ''
  });
  
  // Password strength checker
  const checkPasswordStrength = (password: string): PasswordStrength => {
    if (!password) {
      return { score: 0, message: '', color: 'bg-gray-200' };
    }
    
    let score = 0;
    
    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    
    // Complexity checks
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    // Adjust the final score (max 4)
    score = Math.min(4, score);
    
    const messages = [
      'Very weak',
      'Weak',
      'Fair',
      'Good',
      'Strong'
    ];
    
    const colors = [
      'bg-red-500',
      'bg-orange-500',
      'bg-yellow-500',
      'bg-blue-500',
      'bg-green-500'
    ];
    
    return {
      score,
      message: messages[score],
      color: colors[score]
    };
  };
  
  const passwordStrength = checkPasswordStrength(password);

  const validateForm = () => {
    let valid = true;
    const newErrors: FormErrors = {
      name: '',
      email: '',
      phone: '',
      address: '',
      password: '',
      confirmPassword: ''
    };

    // Name validation (required)
    if (!name.trim()) {
      newErrors.name = 'Full name is required';
      valid = false;
    }

    // Email validation (required)
    if (!email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    // Phone validation (optional but validate format if provided)
    if (phone.trim() && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(phone)) {
      newErrors.phone = 'Please enter a valid phone number';
      valid = false;
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    } else if (passwordStrength.score < 2) {
      newErrors.password = 'Password is too weak. Include uppercase, numbers, and special characters.';
      valid = false;
    }

    // Confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      valid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError('');
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Here you would integrate with your API endpoints
        // Example: const response = await fetch(API_ENDPOINTS.SIGNUP, {...})
        
        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Success! Redirect to login page
        router.push('/login');
      } catch (error) {
        // Handle errors from the API
        setServerError('There was a problem creating your account. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Function to render password criteria
  const renderPasswordCriteria = () => {
    const criteria = [
      { label: 'At least 8 characters', met: password.length >= 8 },
      { label: 'At least one uppercase letter', met: /[A-Z]/.test(password) },
      { label: 'At least one number', met: /[0-9]/.test(password) },
      { label: 'At least one special character', met: /[^A-Za-z0-9]/.test(password) }
    ];
    
    return (
      <div className="mt-2 text-xs space-y-1">
        {criteria.map((item, index) => (
          <div key={index} className="flex items-center">
            <span className={`mr-2 ${item.met ? 'text-green-500' : 'text-gray-500'}`}>
              {item.met ? '✓' : '○'}
            </span>
            <span className={item.met ? 'text-green-600' : 'text-gray-600'}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
        
        {/* Server error message */}
        {serverError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {serverError}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              className="input input-bordered w-full"
              required
              disabled={isSubmitting}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              className="input input-bordered w-full"
              required
              disabled={isSubmitting}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="phone">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
              className="input input-bordered w-full"
              placeholder="e.g., 123-456-7890"
              disabled={isSubmitting}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="address">
              Address
            </label>
            <textarea
              id="address"
              value={address}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAddress(e.target.value)}
              className="textarea textarea-bordered w-full"
              rows={3}
              placeholder="Street address, city, state, zip code"
              disabled={isSubmitting}
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="password">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                className="input input-bordered w-full"
                required
                disabled={isSubmitting}
              />
              <button 
                type="button"
                onMouseDown={() => setShowPassword(true)}
                onMouseUp={() => setShowPassword(false)}
                onMouseLeave={() => setShowPassword(false)}
                onTouchStart={() => setShowPassword(true)}
                onTouchEnd={() => setShowPassword(false)}
                onTouchCancel={() => setShowPassword(false)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 select-none"
                aria-label="Show password"
                disabled={isSubmitting}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth={1.5} 
                  stroke="currentColor" 
                  className="w-5 h-5"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" 
                  />
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                  />
                </svg>
              </button>
            </div>
            
            {/* Password strength indicator */}
            {password && (
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${passwordStrength.color}`} 
                    style={{ width: `${(passwordStrength.score + 1) * 20}%` }}
                  ></div>
                </div>
                <p className="text-sm mt-1 flex justify-between">
                  <span>Password strength:</span>
                  <span className={
                    passwordStrength.score <= 1 ? 'text-red-600' : 
                    passwordStrength.score === 2 ? 'text-yellow-600' : 
                    passwordStrength.score === 3 ? 'text-blue-600' : 'text-green-600'
                  }>
                    {passwordStrength.message}
                  </span>
                </p>
                {renderPasswordCriteria()}
              </div>
            )}
            
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1" htmlFor="confirmPassword">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                className="input input-bordered w-full"
                required
                disabled={isSubmitting}
              />
              <button 
                type="button"
                onMouseDown={() => setShowConfirmPassword(true)}
                onMouseUp={() => setShowConfirmPassword(false)}
                onMouseLeave={() => setShowConfirmPassword(false)}
                onTouchStart={() => setShowConfirmPassword(true)}
                onTouchEnd={() => setShowConfirmPassword(false)}
                onTouchCancel={() => setShowConfirmPassword(false)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 select-none"
                aria-label="Show password"
                disabled={isSubmitting}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth={1.5} 
                  stroke="currentColor" 
                  className="w-5 h-5"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" 
                  />
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                  />
                </svg>
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>
          
          <div className="mb-4 text-sm text-gray-500">
            <p>Fields marked with <span className="text-red-500">*</span> are required</p>
          </div>
          
          <div className="flex flex-col gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn ${isSubmitting ? 'btn-disabled' : 'btn-primary'} w-full`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <span className="loading loading-spinner loading-sm mr-2"></span>
                  Creating account...
                </span>
              ) : (
                'Sign Up'
              )}
            </button>
            
            <p className="text-center">
              Already have an account?{' '}
              <Link href="/login" className="text-primary hover:underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}