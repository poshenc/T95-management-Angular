import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { StocksService } from 'src/app/core/service/stocks/stocks.service';
import { PositionElement } from '../../models/position.model';
import { PortfolioService } from '../../services/portfolio/portfolio.service';

@Component({
  selector: 'app-new-position',
  templateUrl: './new-position.component.html',
  styleUrls: ['./new-position.component.scss']
})
export class NewPositionComponent implements OnInit {

  //sample
  stocklist: any;

  public position: {
    stockId: number | null;
    quantity: number | null;
    costBasis: number | null;
    openDate: string;
  } = {
      stockId: null,
      quantity: null,
      costBasis: null,
      openDate: '',
    }

  constructor(private portfolioService: PortfolioService, private stocksService: StocksService, private dialogRef: MatDialogRef<NewPositionComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.fetchStocksList();
  }

  async fetchStocksList() {
    const allStocksList = await lastValueFrom(this.stocksService.getStocksList());
    this.stocklist = allStocksList
  }

  closeDialog(action: string) {
    this.dialogRef.close(action);
  }

  async onConfirm() {
    if (!this.checkFields()) {
      const data = {} as PositionElement;
      data.openDate = new Date(this.position.openDate);
      data.stockId = this.position.stockId!;
      data.costBasis = this.position.costBasis!;
      data.quantity = this.position.quantity!;
      const portfolioId = this.data;
      await lastValueFrom(this.portfolioService.addPosition(data, portfolioId));
      this.closeDialog('onConfirm');
    }
  }

  checkFields(): boolean {
    const valid: boolean = this.position.stockId !== null && this.position.quantity !== null && this.position.costBasis !== null && this.position.openDate !== ''
    return !valid
  }

}
