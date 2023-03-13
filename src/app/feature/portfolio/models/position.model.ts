export interface PositionElement {
  quantity: number;
  costBasis: number;
  openDate: Date;
  closeDate?: Date;
  positionId?: number;
  stockId?: number;
}
