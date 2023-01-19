import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { lastValueFrom } from 'rxjs';
import { PortfolioValueElement } from 'src/app/feature/portfolio/models/portfolio-value.model';
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
      //calc portfolio total
      let sum = 0;
      for (let i = 0; i < data.length; i++) {
        sum += Number(data[i].price) * data[i].quantity
      }
      this.portfolioData[i].total = port.cash + sum; //cash + (price * quantity)
      //get portfolio value for yesterday
      const yesterdayPortfolioValue: PortfolioValueElement = await lastValueFrom(this.homeService.getPortfolioValue(port.id, "2023-01-18"));
      //calc daily movements
      this.portfolioData[i].movementAmount = (this.portfolioData[i].total - yesterdayPortfolioValue.value).toFixed(2);
      this.portfolioData[i].movementPercentage = (((this.portfolioData[i].total - yesterdayPortfolioValue.value) / yesterdayPortfolioValue.value) * 100).toFixed(2) + "%";
    }
  }

  public getTableData(position: any) {
    return new MatTableDataSource<PortfolioPositionElement>(position);
  }

}
