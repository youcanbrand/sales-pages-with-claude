// Validation utilities - each validator has a single responsibility

export const validateName = (name) => {
  if (!name || name.trim().length === 0) {
    return 'Name is required';
  }
  if (name.trim().length < 2) {
    return 'Name must be at least 2 characters';
  }
  if (name.trim().length > 100) {
    return 'Name must be less than 100 characters';
  }
  if (!/^[a-zA-Z\s'-]+$/.test(name)) {
    return 'Name contains invalid characters';
  }
  return null;
};

export const validateEmail = (email) => {
  if (!email || email.trim().length === 0) {
    return 'Email is required';
  }
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!emailRegex.test(email)) {
    return 'Email is invalid';
  }
  return null;
};

export const validatePhone = (phone) => {
  if (!phone || phone.trim().length === 0) {
    return null; // Phone is optional
  }
  const phoneDigits = phone.replace(/\D/g, '');
  if (phoneDigits.length < 10) {
    return 'Phone number must be at least 10 digits';
  }
  if (phoneDigits.length > 15) {
    return 'Phone number is too long';
  }
  return null;
};

export const validateCompany = (company) => {
  if (company && company.trim().length > 200) {
    return 'Company name is too long';
  }
  return null;
};

export const validateForm = (formData) => {
  const errors = {};

  const nameError = validateName(formData.name);
  if (nameError) errors.name = nameError;

  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;

  const phoneError = validatePhone(formData.phone);
  if (phoneError) errors.phone = phoneError;

  const companyError = validateCompany(formData.company);
  if (companyError) errors.company = companyError;

  return errors;
};
