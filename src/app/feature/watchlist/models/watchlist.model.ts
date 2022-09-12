export interface Watchlist {
  id?: number;
  symbol: string;
  name: string;
  price: number;
  movementPoints: number;
  movementPercentage: number;
  stock_code?: string;
}