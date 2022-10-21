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
  @Input() showMoney: boolean | undefined;

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
      //calc position total
      this.portfolioData[i].movementAmount = 188.8;
      this.portfolioData[i].movementPercentage = 88.88; //todo: compare with previous day
      this.portfolioData[i].total = 288.8;
    }

    // console.log('Final Result: allPortfolios', this.portfolioData);

  }

  public getTableData(position: any) {
    return new MatTableDataSource<PortfolioPositionElement>(position);
  }

}
