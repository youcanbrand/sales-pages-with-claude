// Unit tests for discount calculator - verifying behavior is maintained

import { calculateDiscount } from './discountCalculator';

describe('calculateDiscount', () => {
  const basePrice = 100;

  test('returns no discount for empty code', () => {
    const result = calculateDiscount('', basePrice);
    expect(result.discountAmount).toBe(0);
    expect(result.finalPrice).toBe(100);
    expect(result.isValid).toBe(false);
  });

  test('returns no discount for null code', () => {
    const result = calculateDiscount(null, basePrice);
    expect(result.discountAmount).toBe(0);
    expect(result.finalPrice).toBe(100);
    expect(result.isValid).toBe(false);
  });

  test('applies 10% discount for SAVE10', () => {
    const result = calculateDiscount('SAVE10', basePrice);
    expect(result.discountAmount).toBe(10);
    expect(result.finalPrice).toBe(90);
    expect(result.isValid).toBe(true);
  });

  test('applies 10% discount for save10 (case insensitive)', () => {
    const result = calculateDiscount('save10', basePrice);
    expect(result.discountAmount).toBe(10);
    expect(result.finalPrice).toBe(90);
    expect(result.isValid).toBe(true);
  });

  test('applies 20% discount for SAVE20', () => {
    const result = calculateDiscount('SAVE20', basePrice);
    expect(result.discountAmount).toBe(20);
    expect(result.finalPrice).toBe(80);
    expect(result.isValid).toBe(true);
  });

  test('applies 30% discount for SAVE30', () => {
    const result = calculateDiscount('SAVE30', basePrice);
    expect(result.discountAmount).toBe(30);
    expect(result.finalPrice).toBe(70);
    expect(result.isValid).toBe(true);
  });

  test('applies 25% discount for VIP codes', () => {
    const result = calculateDiscount('VIP12345', basePrice);
    expect(result.discountAmount).toBe(25);
    expect(result.finalPrice).toBe(75);
    expect(result.isValid).toBe(true);
  });

  test('does not apply discount for invalid VIP code (wrong length)', () => {
    const result = calculateDiscount('VIP123', basePrice);
    expect(result.discountAmount).toBe(0);
    expect(result.finalPrice).toBe(100);
    expect(result.isValid).toBe(false);
  });

  test('does not apply discount for invalid code', () => {
    const result = calculateDiscount('INVALID', basePrice);
    expect(result.discountAmount).toBe(0);
    expect(result.finalPrice).toBe(100);
    expect(result.isValid).toBe(false);
  });

  test('calculates correctly with different base prices', () => {
    const result = calculateDiscount('SAVE20', 250);
    expect(result.discountAmount).toBe(50);
    expect(result.finalPrice).toBe(200);
    expect(result.isValid).toBe(true);
  });
});
