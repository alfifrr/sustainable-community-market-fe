import React, { useState } from 'react';
import { usePermissions } from '@/hooks/usePermissions';

interface VerificationFormData {
  businessName: string;
  businessAddress: string;
  businessPhone: string;
  businessEmail: string;
  businessLicense: string;
  taxId: string;
  documents: File[];
}

export const SellerVerification: React.FC = () => {
  const { isSeller } = usePermissions();
  const [formData, setFormData] = useState<VerificationFormData>({
    businessName: '',
    businessAddress: '',
    businessPhone: '',
    businessEmail: '',
    businessLicense: '',
    taxId: '',
    documents: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isSeller()) {
    return (
      <div className="alert alert-error">
        You must be a seller to access this page.
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        documents: Array.from(e.target.files || [])
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Here you would typically make an API call to submit the verification request
      console.log('Submitting verification:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
    } catch (err) {
      setError('Failed to submit verification. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="alert alert-success">
        <div>
          <h3 className="font-bold">Verification Submitted!</h3>
          <div className="text-sm">
            Your verification request has been submitted successfully. We will review your application and get back to you soon.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Seller Verification</h2>
        <p className="text-base-content/70">
          Please provide the following information to verify your seller account.
        </p>

        {error && (
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Business Name</span>
            </label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleInputChange}
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Business Address</span>
            </label>
            <textarea
              name="businessAddress"
              value={formData.businessAddress}
              onChange={handleInputChange}
              className="textarea textarea-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Business Phone</span>
            </label>
            <input
              type="tel"
              name="businessPhone"
              value={formData.businessPhone}
              onChange={handleInputChange}
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Business Email</span>
            </label>
            <input
              type="email"
              name="businessEmail"
              value={formData.businessEmail}
              onChange={handleInputChange}
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Business License Number</span>
            </label>
            <input
              type="text"
              name="businessLicense"
              value={formData.businessLicense}
              onChange={handleInputChange}
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Tax ID</span>
            </label>
            <input
              type="text"
              name="taxId"
              value={formData.taxId}
              onChange={handleInputChange}
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Supporting Documents</span>
            </label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="file-input file-input-bordered w-full"
              accept=".pdf,.jpg,.jpeg,.png"
              required
            />
            <label className="label">
              <span className="label-text-alt">
                Upload business license, tax documents, and other relevant files (PDF, JPG, PNG)
              </span>
            </label>
          </div>

          <div className="card-actions justify-end">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Verification'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 