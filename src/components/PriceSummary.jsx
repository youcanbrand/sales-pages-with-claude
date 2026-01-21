import React from 'react';

// Price summary component - focused on displaying pricing information

const PriceSummary = ({ basePrice, discountAmount, finalPrice }) => {
  if (discountAmount === 0) {
    return null;
  }

  return (
    <div className="price-summary">
      <div>Original Price: ${basePrice.toFixed(2)}</div>
      <div>Discount: -${discountAmount.toFixed(2)}</div>
      <div className="final-price">Final Price: ${finalPrice.toFixed(2)}</div>
    </div>
  );
};

export default PriceSummary;
