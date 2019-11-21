export enum Currency {
  USD,
  EUR,
  PLN
}


export interface Trip {
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
}

