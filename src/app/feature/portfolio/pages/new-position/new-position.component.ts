import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PositionElement } from '../../models/position.model';
import { PortfolioService } from '../../services/portfolio/portfolio.service';

@Component({
  selector: 'app-new-position',
  templateUrl: './new-position.component.html',
  styleUrls: ['./new-position.component.scss']
})
export class NewPositionComponent implements OnInit {

  //sample
  symbols = [
    { id: 1, name: 'Vilnius' },
    { id: 2, name: 'Kaunas' },
    { id: 3, name: 'Pavilnys' },
    { id: 4, name: 'Pabradė' },
    { id: 5, name: 'Klaipėda' }
  ];

  public data: {
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

  constructor(private portfolioService: PortfolioService, private dialogRef: MatDialogRef<NewPositionComponent>) { }

  ngOnInit(): void {
  }


  closeDialog(action: string) {
    this.dialogRef.close(action);
  }

  async onConfirm() {
    if (!this.checkFields()) {
      console.log(this.data);
      const data = {} as PositionElement;
      data.openDate = new Date(this.data.date);
      data.stockId = 5; //todo: change to actual
      data.costBasis = this.data.quantity!;
      data.quantity = this.data.quantity!;

      console.log('result data:', data);

      // await lastValueFrom(this.portfolioService.addPosition(this.data));
      // this.closeDialog('onConfirm');
    }
  }

  checkFields(): boolean {
    const valid: boolean = this.data.symbol !== '' && this.data.quantity !== null && this.data.cost !== null && this.data.date !== ''
    return !valid
  }

}
