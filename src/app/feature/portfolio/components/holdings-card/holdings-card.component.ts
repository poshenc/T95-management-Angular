import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditPortfolioComponent } from '../../pages/edit-portfolio/edit-portfolio.component';
import { PortfolioService } from '../../services/portfolio/portfolio.service';

@Component({
  selector: 'app-holdings-card',
  templateUrl: './holdings-card.component.html',
  styleUrls: ['./holdings-card.component.scss']
})
export class HoldingsCardComponent implements OnInit {

  //from parent
  @Input() portfolioData!: any;
  @Output() onUpdatePortfolio = new EventEmitter();
  currentTime: Date = new Date();

  constructor(private portfolioService: PortfolioService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onEditPortfolio() {
    let cloneData = { ...this.portfolioData }
    const dialogRef = this.dialog.open(EditPortfolioComponent, {
      data: cloneData,
      width: '300px',
      height: '270px'
    })

    dialogRef.afterClosed().subscribe(action => {
      if (action === 'onConfirm') {
        this.onUpdatePortfolio.emit();
      } else if (action === 'onDelete') {
        this.router.navigate(['/portfolio']);
      }
    })
  }
}
