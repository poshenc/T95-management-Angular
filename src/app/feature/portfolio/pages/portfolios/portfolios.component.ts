import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { curveBasis } from 'd3-shape';
import { lastValueFrom } from 'rxjs';
import { PortfolioDetail } from '../../models/portfolio-detail.model';
import { PortfolioPositionElement } from '../../models/portfolio-position.model';
import { PortfolioValueElement } from '../../models/portfolio-value.model';
import { PieChartElement } from '../../models/position-pie-chart.model';
import { PortfolioService } from '../../services/portfolio/portfolio.service';


@Component({
  selector: 'app-portfolios',
  templateUrl: './portfolios.component.html',
  styleUrls: ['./portfolios.component.scss']
})
export class PortfoliosComponent implements OnInit {

  //for pie chart
  public portfoliosLoaded = false;
  public positionsLoaded = false;
  public portfoliosData = [] as PortfolioDetail[];
  public allPortfolios = [] as PieChartElement[];
  public allPositions = [] as PieChartElement[];

  //for line chart
  historyData!: any;
  public view: any = [700, 400];
  public curve: any = curveBasis;
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = true;
  public showXAxisLabel = true;
  public xAxisLabel!: "Years";
  public showYAxisLabel = true;
  public yAxisLabel!: "Dollars";
  public graphDataChart!: any[];
  public colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private portfolioService: PortfolioService, private router: Router) {
  }

  ngOnInit(): void {
    this.fetchAllPortfolioPositions();
  }

  async fetchAllPortfolioPositions() {
    this.portfoliosData = await lastValueFrom(this.portfolioService.getPortfolios());
    this.fetchHistoricalData(this.portfoliosData);
    const portfolioPositions = await this.runAsync(this.portfoliosData);
    this.portfoliosLoaded = true;
    this.allPositions = this.portfolioService.calculateAllocations(portfolioPositions);
    this.positionsLoaded = true;
  }

  async runAsync(portfoliosData: any): Promise<PortfolioPositionElement[]> {
    let portfolioPositions = [] as PortfolioPositionElement[];
    for (let portfolio of portfoliosData) {
      //fetch portfolio positions
      const position: PortfolioPositionElement[] = await lastValueFrom(this.portfolioService.getPortfolioPositions(portfolio.id));

      //for all portfolios data
      const numbers = position.map(val => Number(val.price) * val.quantity);
      const sum = numbers.reduce((a, b) => a + b, 0);
      const result = {
        name: portfolio.name,
        value: sum
      }
      this.allPortfolios.push(result)

      //for all positions data
      portfolioPositions = [...portfolioPositions, ...position]
    }
    return portfolioPositions
  }

  async fetchHistoricalData(portfoliosData: any) {
    const values: PortfolioValueElement[] = await lastValueFrom(this.portfolioService.getAllPortfoliosValueByDateRange("2023-01-10", "2023-01-18"));
    this.historyData = this.sortPortfolios(portfoliosData, values);
  }

  sortPortfolios(portfolios: PortfolioDetail[], values: PortfolioValueElement[]) {
    const portfolioIds = values.map((portfolio) => portfolio.portfolio_id);
    const uniqueIds = [...new Set(portfolioIds)];
    const portfoliosHistory = uniqueIds.map((id) => {
      const history = values.filter(portfolio => portfolio.portfolio_id === id);
      const portfolioValues = history.map((portfolio) => {
        return {
          name: portfolio.date,
          value: portfolio.value
        }
      });
      return {
        name: portfolios.find((p) => p.id === id)!.name,
        series: portfolioValues
      }
    })
    return portfoliosHistory;
  }

  onPieSelect(event: any) {
    const portfolio = this.portfoliosData.find(portfolio => portfolio.name === event.name);
    if (portfolio !== undefined) {
      this.router.navigate([`/portfolio/${portfolio.id}`]);
    }
  }

}
