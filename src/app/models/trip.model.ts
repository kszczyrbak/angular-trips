export enum Currency {
  USD,
  EUR,
  PLN
}


export interface Trip {
  _id: string;
  name: string;
  country: string;
  startDate: string;
  endDate: string;
  price: number;
  seatsLeft: number;
  maxSeats: number;
  description?: string;
  photos?: string[];
  rating?: number;
  cartCount?: number;
}

