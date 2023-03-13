import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { PositionElement } from '../../models/position.model';
import { PortfolioService } from '../../services/portfolio/portfolio.service';

@Component({
  selector: 'app-edit-position',
  templateUrl: './edit-position.component.html',
  styleUrls: ['./edit-position.component.scss']
})
export class EditPositionComponent implements OnInit {

  position: any;

  constructor(private portfolioService: PortfolioService, private dialogRef: MatDialogRef<EditPositionComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.position = data;
  }

  ngOnInit(): void {
  }

  closeDialog(action: string) {
    this.dialogRef.close(action);
  }

  async onConfirm() {
    if (!this.checkFields()) {
      const data = {} as PositionElement;
      data.positionId = this.position.positionId;
      data.openDate = new Date(this.position.openDate);
      data.costBasis = this.position.costBasis!;
      data.quantity = this.position.quantity!;
      await lastValueFrom(this.portfolioService.editPosition(data, Number(this.data.portfolioId)));
      this.closeDialog('onConfirm');
    }
  }

  checkFields(): boolean {
    const valid: boolean = this.position.quantity !== null && this.position.costBasis !== null && this.position.openDate !== ''
    return !valid
  }


}
