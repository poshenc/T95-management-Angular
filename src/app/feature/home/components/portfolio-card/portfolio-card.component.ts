import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PortfolioPositionElement } from '../../models/portfolio-position.model';

@Component({
  selector: 'app-portfolio-card',
  templateUrl: './portfolio-card.component.html',
  styleUrls: ['./portfolio-card.component.scss']
})
export class PortfolioCardComponent implements OnInit {

  //from parent
  @Input() showMoney!: boolean;
  @Input() portfolioData!: any;

  //for table
  public displayedColumns: string[] = ['name', 'movement_points', 'price'];

  constructor() { }

  ngOnInit(): void { }

  public getTableData(position: any) {
    return new MatTableDataSource<PortfolioPositionElement>(position);
  }

}
