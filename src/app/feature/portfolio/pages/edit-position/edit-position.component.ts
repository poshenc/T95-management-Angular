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
    this.position = { ...data };
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

  async onClosePosition() {
    console.log("this.position", this.position);

    // await lastValueFrom(this.portfolioService.closePosition(Number(this.data.positionId), Number(this.data.portfolioId)));
    this.closeDialog('close');


    //other
    // const dialogRef = this.dialog.open(EditPositionComponent, {
    //   data: this.position,
    //   width: '300px',
    //   height: '390px'
    // })

    // dialogRef.afterClosed().subscribe(action => {
    //   if (action === 'onConfirm') {
    //     this.fetchPortfolioPositions(this.portfolioId);
    //   }
    // })

  }

  checkFields(): boolean {
    const valid: boolean = this.position.quantity !== null && this.position.costBasis !== null && this.position.openDate !== ''
    return !valid
  }


}
