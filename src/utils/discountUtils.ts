export const calculateBulkDiscount = (qty: number): number => {
  return qty >= 5 ? 0.05 : 0;
};

export const calculateExpiryDiscount = (daysRemaining: number): number => {
  if (daysRemaining <= 0) return 0.9; // 90% discount on expired items
  const discounts: { [key: number]: number } = {
    1: 0.8, // 80% discount
    2: 0.6, // 60% discount
    3: 0.4, // 40% discount
    4: 0.2, // 20% discount
  };
  return discounts[daysRemaining] || 0;
};

export const calculateFinalPrice = (
  basePrice: number,
  qty: number,
  daysUntilExp: number
): number => {
  const expiryDiscount = calculateExpiryDiscount(daysUntilExp);
  const bulkDiscount = calculateBulkDiscount(qty);
  const totalDiscountPercentage = expiryDiscount + bulkDiscount;
  return basePrice * (1 - totalDiscountPercentage);
};
