import { Component, OnInit } from '@angular/core';
import { curveBasis } from 'd3-shape';
import { lastValueFrom } from 'rxjs';
import { PortfolioPositionElement } from '../../models/portfolio-position.model';
import { PieChartElement } from '../../models/position-pie-chart.model';
import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { historyData } from '../portfolios/sampleHistoryData';


@Component({
  selector: 'app-portfolios',
  templateUrl: './portfolios.component.html',
  styleUrls: ['./portfolios.component.scss']
})
export class PortfoliosComponent implements OnInit {

  //for pie chart
  public portfoliosLoaded = false;
  public positionsLoaded = false;
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
  public yAxisLabel!: "Salary";
  public graphDataChart!: any[];
  public colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private portfolioService: PortfolioService) {
    Object.assign(this, { historyData })
  }

  ngOnInit(): void {
    this.fetchAllPortfolioPositions();
  }

  async fetchAllPortfolioPositions() {
    const allPortfolios = await lastValueFrom(this.portfolioService.getPortfolios());
    const portfolioPositions = await this.runAsync(allPortfolios);
    this.portfoliosLoaded = true;
    this.allPositions = this.portfolioService.calculateAllocations(portfolioPositions);
    this.positionsLoaded = true;
  }

  async runAsync(allPortfolios: any): Promise<PortfolioPositionElement[]> {
    let portfolioPositions = [] as PortfolioPositionElement[];
    for (let portfolio of allPortfolios) {
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

}
