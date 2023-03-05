import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { PortfolioService } from '../../services/portfolio/portfolio.service';

@Component({
  selector: 'app-new-portfolio',
  templateUrl: './new-portfolio.component.html',
  styleUrls: ['./new-portfolio.component.scss']
})
export class NewPortfolioComponent implements OnInit {

  public data: {
    name: string;
    cash: number | null
  } = {
      name: '',
      cash: null
    }

  constructor(private portfolioService: PortfolioService, private dialogRef: MatDialogRef<NewPortfolioComponent>) { }

  ngOnInit(): void {
  }

  closeDialog(action: string) {
    this.dialogRef.close(action);
  }

  async onConfirm() {
    if (!this.checkFields()) {
      this.data.cash = this.data.cash === null ? 0 : this.data.cash;
      await lastValueFrom(this.portfolioService.addPortfolio(this.data));
      this.closeDialog('onConfirm');
    }
  }

  checkFields(): boolean {
    const valid: boolean = this.data.name !== '';
    return !valid
  }

}
