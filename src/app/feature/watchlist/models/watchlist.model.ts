export interface Watchlist {
  id?: number;
  symbol: string;
  name: string;
  price: number;
  movementPrice: number;
  movementPercentage: number;
  stock_code?: string;
}