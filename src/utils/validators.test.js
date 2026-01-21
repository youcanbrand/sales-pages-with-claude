// Unit tests for validators - verifying behavior is maintained

import {
  validateName,
  validateEmail,
  validatePhone,
  validateCompany,
  validateForm
} from './validators';

describe('validateName', () => {
  test('returns error for empty name', () => {
    expect(validateName('')).toBe('Name is required');
    expect(validateName('   ')).toBe('Name is required');
  });

  test('returns error for name too short', () => {
    expect(validateName('A')).toBe('Name must be at least 2 characters');
  });

  test('returns error for name too long', () => {
    const longName = 'A'.repeat(101);
    expect(validateName(longName)).toBe('Name must be less than 100 characters');
  });

  test('returns error for invalid characters', () => {
    expect(validateName('John123')).toBe('Name contains invalid characters');
    expect(validateName('John@Doe')).toBe('Name contains invalid characters');
  });

  test('returns null for valid names', () => {
    expect(validateName('John Doe')).toBeNull();
    expect(validateName("O'Brien")).toBeNull();
    expect(validateName("Mary-Jane")).toBeNull();
  });
});

describe('validateEmail', () => {
  test('returns error for empty email', () => {
    expect(validateEmail('')).toBe('Email is required');
  });

  test('returns error for invalid email format', () => {
    expect(validateEmail('invalid')).toBe('Email is invalid');
    expect(validateEmail('invalid@')).toBe('Email is invalid');
    expect(validateEmail('@example.com')).toBe('Email is invalid');
  });

  test('returns null for valid emails', () => {
    expect(validateEmail('test@example.com')).toBeNull();
    expect(validateEmail('user.name@company.co.uk')).toBeNull();
  });
});

describe('validatePhone', () => {
  test('returns null for empty phone (optional field)', () => {
    expect(validatePhone('')).toBeNull();
  });

  test('returns error for phone too short', () => {
    expect(validatePhone('123456789')).toBe('Phone number must be at least 10 digits');
  });

  test('returns error for phone too long', () => {
    expect(validatePhone('1234567890123456')).toBe('Phone number is too long');
  });

  test('returns null for valid phone numbers', () => {
    expect(validatePhone('1234567890')).toBeNull();
    expect(validatePhone('(123) 456-7890')).toBeNull();
    expect(validatePhone('+1-234-567-8900')).toBeNull();
  });
});

describe('validateCompany', () => {
  test('returns null for empty company (optional field)', () => {
    expect(validateCompany('')).toBeNull();
  });

  test('returns error for company name too long', () => {
    const longCompany = 'A'.repeat(201);
    expect(validateCompany(longCompany)).toBe('Company name is too long');
  });

  test('returns null for valid company names', () => {
    expect(validateCompany('Acme Corp')).toBeNull();
    expect(validateCompany('A'.repeat(200))).toBeNull();
  });
});

describe('validateForm', () => {
  test('returns errors for invalid form data', () => {
    const formData = {
      name: '',
      email: 'invalid',
      phone: '123',
      company: 'Valid Company'
    };

    const errors = validateForm(formData);
    expect(errors.name).toBe('Name is required');
    expect(errors.email).toBe('Email is invalid');
    expect(errors.phone).toBe('Phone number must be at least 10 digits');
  });

  test('returns empty object for valid form data', () => {
    const formData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      company: 'Acme Corp'
    };

    const errors = validateForm(formData);
    expect(Object.keys(errors).length).toBe(0);
  });
});
