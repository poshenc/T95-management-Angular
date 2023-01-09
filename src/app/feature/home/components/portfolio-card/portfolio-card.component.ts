import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { lastValueFrom } from 'rxjs';
import { PortfolioPositionElement } from '../../models/portfolio-position.model';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-portfolio-card',
  templateUrl: './portfolio-card.component.html',
  styleUrls: ['./portfolio-card.component.scss']
})
export class PortfolioCardComponent implements OnInit {

  //from parent
  @Input() showMoney!: boolean;

  //local props
  public portfolioData = [] as any;

  //for table
  public displayedColumns: string[] = ['name', 'movement_points', 'price'];

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.fetchAllPortfolioData();
  }

  public async fetchAllPortfolioData() {
    //1. allPortfolios
    this.portfolioData = await lastValueFrom(this.homeService.getPortfoliosByUser());

    //2. getPortfolioPositions
    for (const [i, port] of this.portfolioData.entries()) {
      //getPortfolioPositions
      const data = await lastValueFrom(this.homeService.getPortfolioPositions(port.id));
      this.portfolioData[i].positions = data;
      this.portfolioData[i].isCollapsed = true;
      //calc daily movements
      this.portfolioData[i].movementAmount = 188.8;
      this.portfolioData[i].movementPercentage = 88.88; //todo: compare with previous day (total value of portfolio last day)
      //calc portfolio total
      let sum = 0;
      for (let i = 0; i < data.length; i++) {
        sum += Number(data[i].price) * data[i].quantity
      }
      this.portfolioData[i].total = port.cash + sum; //cash + (price * quantity)
    }

    console.log('Final Result: allPortfolios', this.portfolioData);

  }

  public getTableData(position: any) {
    return new MatTableDataSource<PortfolioPositionElement>(position);
  }

}
