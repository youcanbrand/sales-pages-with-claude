import { useState } from 'react';
import { validateForm } from '../utils/validators';

// Form hook - manages form state and validation

export const useForm = (initialValues) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const reset = () => {
    setFormData(initialValues);
    setErrors({});
  };

  return {
    formData,
    errors,
    handleChange,
    validate,
    reset,
  };
};
