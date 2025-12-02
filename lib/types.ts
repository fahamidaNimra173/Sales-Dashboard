// Auth Types
export interface AuthResponse {
  token: string;
  expire: number;
}

// Sales Types
export interface Sale {
  _id: string;
  date: string;
  price: number;
  customerEmail: string;
  customerPhone: string;
  __v: number;
}

export interface TotalSale {
  day: string;
  totalSale: number;
}

export interface SalesResponse {
  results: {
    TotalSales: TotalSale[];
    Sales: Sale[];
  };
  pagination: {
    before: string;
    after: string;
  };
}