import { IReview } from "../type/agent";

export const calculateAverageRating = (reviews: IReview[]): number => {
  if (reviews.length === 0) return 0; // Avoid division by zero
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return parseFloat((total / reviews.length).toFixed(2)); // Round to 2 decimal places
};
