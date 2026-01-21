import React, { useState } from 'react';
import { useForm } from '../hooks/useForm';
import { useDiscount } from '../hooks/useDiscount';
import { useAnalytics } from '../hooks/useAnalytics';
import { saveLead, sendConfirmationEmail } from '../services/api';
import FormField from './FormField';
import PriceSummary from './PriceSummary';
import StatusMessage from './StatusMessage';

// REFACTORED: Clean, focused component with single responsibility
// Each concern is separated into its own module

const SalesFormRefactored = ({ productId, productName, basePrice }) => {
  // Custom hooks handle specific concerns
  const { formData, errors, handleChange, validate, reset } = useForm({
    name: '',
    email: '',
    phone: '',
    company: '',
    discountCode: '',
  });

  const { discountAmount, finalPrice } = useDiscount(formData.discountCode, basePrice);
  const { trackEvent } = useAnalytics(productId, productName);

  // Simple component state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Clean, focused submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    trackEvent('Form submission attempted', { productId, formData });

    if (!validate()) {
      trackEvent('Validation failed', { errors });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Save lead
      const leadData = await saveLead({
        ...formData,
        productId,
        productName,
        finalPrice,
        discountAmount,
      });

      trackEvent('Lead captured', { leadId: leadData.id, productId });

      // Send confirmation email
      await sendConfirmationEmail(formData.email, formData.name, productName, finalPrice);
      trackEvent('Confirmation email sent', { email: formData.email });

      // Track conversion
      trackEvent('Conversion tracked', { leadId: leadData.id, value: finalPrice });

      // Update UI
      setSubmitStatus('success');
      reset();

    } catch (error) {
      console.error('Error submitting form:', error);
      trackEvent('Form submission error', { error: error.message });
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Clean, readable render
  return (
    <div className="sales-form-container">
      <h2>{productName} - ${basePrice}</h2>

      <StatusMessage status={submitStatus} />

      <form onSubmit={handleSubmit}>
        <FormField
          label="Full Name"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          disabled={isSubmitting}
          required
        />

        <FormField
          label="Email Address"
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          disabled={isSubmitting}
          required
        />

        <FormField
          label="Phone Number"
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          disabled={isSubmitting}
        />

        <FormField
          label="Company"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          error={errors.company}
          disabled={isSubmitting}
        />

        <div className="form-group">
          <FormField
            label="Discount Code"
            id="discountCode"
            name="discountCode"
            value={formData.discountCode}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          {discountAmount > 0 && (
            <span className="discount-applied">
              Discount applied: -${discountAmount.toFixed(2)}
            </span>
          )}
        </div>

        <PriceSummary
          basePrice={basePrice}
          discountAmount={discountAmount}
          finalPrice={finalPrice}
        />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Get Started Now'}
        </button>
      </form>
    </div>
  );
};

export default SalesFormRefactored;
