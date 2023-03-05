import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-position',
  templateUrl: './new-position.component.html',
  styleUrls: ['./new-position.component.scss']
})
export class NewPositionComponent implements OnInit {

  public data: {
    symbol: string;
    quantity: number | null;
    cost: number | null;
    date: number | null;
  } = {
      symbol: '',
      quantity: null,
      cost: null,
      date: null,
    }

  constructor(private dialogRef: MatDialogRef<NewPositionComponent>) { }

  ngOnInit(): void {
  }


  closeDialog(action: string) {
    this.dialogRef.close(action);
  }

  async onConfirm() {
    if (!this.checkFields()) {
      // await lastValueFrom(this.portfolioService.addPortfolio(this.data));
      this.closeDialog('onConfirm');
    }
  }

  checkFields(): boolean {
    const valid: boolean = this.data.symbol !== '' && this.data.quantity !== null && this.data.cost !== null && this.data.date !== null
    return !valid
  }

}
