import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { PortfolioService } from '../../services/portfolio/portfolio.service';

@Component({
  selector: 'app-confirm-close',
  templateUrl: './confirm-close.component.html',
  styleUrls: ['./confirm-close.component.scss']
})
export class ConfirmCloseComponent implements OnInit {

  constructor(private portfolioService: PortfolioService, private dialogRef: MatDialogRef<ConfirmCloseComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.data.addCashAmount = Math.round(this.data.quantity * this.data.price);
  }

  closeDialog(action: string) {
    this.dialogRef.close(action);
  }

  async onConfirm() {
    const data = {
      cash: this.data.addCashAmount
    }
    await lastValueFrom(this.portfolioService.closePosition(Number(this.data.positionId), Number(this.data.portfolioId)));
    await lastValueFrom(this.portfolioService.addCashToPortfolio(this.data.portfolioId, data));
    this.closeDialog('onConfirmAddCash');
  }

}
