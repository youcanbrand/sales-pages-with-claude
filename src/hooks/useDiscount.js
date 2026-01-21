import { useMemo } from 'react';
import { calculateDiscount } from '../utils/discountCalculator';

// Discount hook - handles discount code logic

export const useDiscount = (discountCode, basePrice) => {
  return useMemo(() => {
    return calculateDiscount(discountCode, basePrice);
  }, [discountCode, basePrice]);
};
