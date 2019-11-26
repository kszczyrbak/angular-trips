export enum Currency {
  USD,
  EUR,
  PLN
}


export interface Trip {
  id: number;
  name: string;
  country: string;
  startDate: string;
  endDate: string;
  cost: number;
  seatsLeft: number;
  maxSeats: number;
  currency: Currency;
  description?: string;
  photo?: string;
  rating?: number;
  cartCount?: number;
}

