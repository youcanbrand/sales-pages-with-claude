// Discount calculation utilities - separated business logic

const DISCOUNT_CODES = {
  'SAVE10': 0.1,
  'SAVE20': 0.2,
  'SAVE30': 0.3,
};

export const calculateDiscount = (discountCode, basePrice) => {
  if (!discountCode) {
    return { discountAmount: 0, finalPrice: basePrice, isValid: false };
  }

  const code = discountCode.toUpperCase();

  // Check predefined discount codes
  if (DISCOUNT_CODES[code]) {
    const discountAmount = basePrice * DISCOUNT_CODES[code];
    return {
      discountAmount,
      finalPrice: basePrice - discountAmount,
      isValid: true,
    };
  }

  // Check VIP codes (VIP + 5 characters)
  if (code.startsWith('VIP') && code.length === 8) {
    const discountAmount = basePrice * 0.25;
    return {
      discountAmount,
      finalPrice: basePrice - discountAmount,
      isValid: true,
    };
  }

  // Invalid code
  return { discountAmount: 0, finalPrice: basePrice, isValid: false };
};
