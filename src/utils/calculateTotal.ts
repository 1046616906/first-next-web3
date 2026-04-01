export const calculateTotal = (amount: string) => {
  const amountArray = amount
    .trim()
    .split(/[\s\n,]+/)
    .filter((amt) => amt !== "")
    .map((amt) => parseFloat(amt));

  return amountArray
    .filter((amt) => !isNaN(amt))
    .reduce((acc, cur) => acc + cur, 0);
};
