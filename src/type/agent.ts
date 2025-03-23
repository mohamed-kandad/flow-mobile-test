export interface IAgent {
  id: number;
  name: string;
  phone: string;
  rating: number;
  latitude: number;
  longitude: number;
  reviews: IReview[];
}

export interface IReview {
  review: string;
  rating: number;
  name: string;
}
