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
    symbol: string | null;
    quantity: number | null;
    cost: number | null;
    date: string;
  } = {
      symbol: null,
      quantity: null,
      cost: null,
      date: '',
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
      data.openDate = new Date(this.position.date);
      data.stockId = Number(this.position.symbol);
      data.costBasis = this.position.cost!;
      data.quantity = this.position.quantity!;
      const portfolioId = this.data;
      await lastValueFrom(this.portfolioService.addPosition(data, portfolioId));
      this.closeDialog('onConfirm');
    }
  }

  checkFields(): boolean {
    const valid: boolean = this.position.symbol !== '' && this.position.quantity !== null && this.position.cost !== null && this.position.date !== ''
    return !valid
  }

}
