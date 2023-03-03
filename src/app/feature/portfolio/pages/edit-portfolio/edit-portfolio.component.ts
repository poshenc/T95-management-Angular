import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { PortfolioService } from '../../services/portfolio/portfolio.service';

@Component({
  selector: 'app-edit-portfolio',
  templateUrl: './edit-portfolio.component.html',
  styleUrls: ['./edit-portfolio.component.scss']
})
export class EditPortfolioComponent implements OnInit {

  public originalName!: string;

  constructor(private portfolioService: PortfolioService, private dialogRef: MatDialogRef<EditPortfolioComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.originalName = this.data.name;
  }

  closeDialog(action: string) {
    this.dialogRef.close(action);
  }

  async onConfirm() {
    if (this.data.name !== '') {
      const data = {
        name: this.data.name,
        cash: this.data.cash === null ? 0 : this.data.cash
      }
      await lastValueFrom(this.portfolioService.editPortfolio(data, this.originalName));
      this.closeDialog('onConfirm');
    }
  }

  async onDelete() {
    await lastValueFrom(this.portfolioService.deletePortfolio(this.data.name));
    this.closeDialog('onDelete');
  }

  checkFields() {
    const valid: boolean = this.data.name !== '';
    return !valid
  }

}
