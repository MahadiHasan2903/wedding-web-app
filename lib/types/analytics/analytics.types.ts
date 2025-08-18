export interface MonthlyRegistration {
  month: string;
  year: number;
  newRegistration: number;
}

export interface MonthlyRevenue {
  month: string;
  year: number;
  totalAmount: number;
}

export interface GenderCounts {
  male: number;
  female: number;
  other: number;
}
