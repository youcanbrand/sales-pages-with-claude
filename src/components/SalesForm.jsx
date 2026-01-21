import React, { useState, useEffect } from 'react';

// This component is OVERLY COMPLEX and does too many things!
// It handles: form state, validation, API calls, analytics, email, discount codes, and rendering
const SalesForm = ({ productId, productName, basePrice }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', discountCode: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(basePrice);
  const [analyticsTracked, setAnalyticsTracked] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  // Too much logic in useEffect - recalculates price whenever discount changes
  useEffect(() => {
    if (formData.discountCode) {
      // Complex discount validation logic embedded in useEffect
      const code = formData.discountCode.toUpperCase();
      if (code === 'SAVE10') {
        setDiscountAmount(basePrice * 0.1);
        setFinalPrice(basePrice * 0.9);
      } else if (code === 'SAVE20') {
        setDiscountAmount(basePrice * 0.2);
        setFinalPrice(basePrice * 0.8);
      } else if (code === 'SAVE30') {
        setDiscountAmount(basePrice * 0.3);
        setFinalPrice(basePrice * 0.7);
      } else if (code.startsWith('VIP') && code.length === 8) {
        setDiscountAmount(basePrice * 0.25);
        setFinalPrice(basePrice * 0.75);
      } else {
        setDiscountAmount(0);
        setFinalPrice(basePrice);
      }
    } else {
      setDiscountAmount(0);
      setFinalPrice(basePrice);
    }
  }, [formData.discountCode, basePrice]);

  // Another useEffect for analytics - too many side effects
  useEffect(() => {
    if (!analyticsTracked) {
      // Simulate analytics tracking
      console.log('Analytics: Page view tracked', { productId, productName });
      setAnalyticsTracked(true);
    }
  }, [analyticsTracked, productId, productName]);

  // Complex validation logic all in one function
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name || formData.name.trim().length === 0) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (formData.name.trim().length > 100) {
      newErrors.name = 'Name must be less than 100 characters';
    } else if (!/^[a-zA-Z\s'-]+$/.test(formData.name)) {
      newErrors.name = 'Name contains invalid characters';
    }

    // Email validation - overly complex regex
    if (!formData.email || formData.email.trim().length === 0) {
      newErrors.email = 'Email is required';
    } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Phone validation - complex logic
    if (formData.phone && formData.phone.trim().length > 0) {
      const phoneDigits = formData.phone.replace(/\D/g, '');
      if (phoneDigits.length < 10) {
        newErrors.phone = 'Phone number must be at least 10 digits';
      } else if (phoneDigits.length > 15) {
        newErrors.phone = 'Phone number is too long';
      }
    }

    // Company validation
    if (formData.company && formData.company.trim().length > 200) {
      newErrors.company = 'Company name is too long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Massive submit handler that does everything
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Track analytics event
    console.log('Analytics: Form submission attempted', { productId, formData });

    if (!validateForm()) {
      console.log('Analytics: Validation failed', { errors });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call to save lead
      const leadResponse = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          productId,
          productName,
          finalPrice,
          discountAmount,
          timestamp: new Date().toISOString()
        })
      });

      if (!leadResponse.ok) {
        throw new Error('Failed to save lead');
      }

      const leadData = await leadResponse.json();

      // Track successful lead capture
      console.log('Analytics: Lead captured', { leadId: leadData.id, productId });

      // Send confirmation email
      if (!emailSent) {
        const emailResponse = await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: formData.email,
            subject: `Thanks for your interest in ${productName}!`,
            body: `Hi ${formData.name},\n\nThank you for your interest. Your final price is $${finalPrice.toFixed(2)}.\n\nWe'll be in touch soon!`
          })
        });

        if (emailResponse.ok) {
          setEmailSent(true);
          console.log('Analytics: Confirmation email sent', { email: formData.email });
        }
      }

      // Track conversion
      console.log('Analytics: Conversion tracked', { leadId: leadData.id, value: finalPrice });

      // Update form state
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', company: '', discountCode: '' });

    } catch (error) {
      console.error('Error submitting form:', error);
      console.log('Analytics: Form submission error', { error: error.message });
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Complex rendering logic with many conditionals
  return (
    <div className="sales-form-container">
      <h2>{productName} - ${basePrice}</h2>

      {submitStatus === 'success' && (
        <div className="alert alert-success">
          <strong>Success!</strong> Thank you for your interest. Check your email for confirmation.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="alert alert-error">
          <strong>Error!</strong> Something went wrong. Please try again.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
            disabled={isSubmitting}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
            disabled={isSubmitting}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? 'error' : ''}
            disabled={isSubmitting}
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className={errors.company ? 'error' : ''}
            disabled={isSubmitting}
          />
          {errors.company && <span className="error-message">{errors.company}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="discountCode">Discount Code</label>
          <input
            type="text"
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

        {discountAmount > 0 && (
          <div className="price-summary">
            <div>Original Price: ${basePrice.toFixed(2)}</div>
            <div>Discount: -${discountAmount.toFixed(2)}</div>
            <div className="final-price">Final Price: ${finalPrice.toFixed(2)}</div>
          </div>
        )}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Get Started Now'}
        </button>
      </form>
    </div>
  );
};

export default SalesForm;
