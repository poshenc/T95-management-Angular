import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { PortfolioPositionElement } from '../../models/portfolio-position.model';
import { PieChartElement } from '../../models/position-pie-chart.model';
import { PortfolioService } from '../../services/portfolio/portfolio.service';

@Component({
  selector: 'app-portfolios',
  templateUrl: './portfolios.component.html',
  styleUrls: ['./portfolios.component.scss']
})
export class PortfoliosComponent implements OnInit {

  //for pie chart
  public dataLoaded = false;
  public allPositions = [] as PieChartElement[];

  constructor(private portfolioService: PortfolioService) { }

  ngOnInit(): void {
    this.fetchAllPortfolioPositions();
  }

  async fetchAllPortfolioPositions() {
    const allPortfolios = await lastValueFrom(this.portfolioService.getPortfolios());
    const portfolioPositions = await this.runAsync(allPortfolios);
    this.allPositions = this.portfolioService.calculateAllocations(portfolioPositions);
    this.dataLoaded = true;
  }

  async runAsync(allPortfolios: any): Promise<PortfolioPositionElement[]> {
    let portfolioPositions = [] as PortfolioPositionElement[];
    for (let portfolio of allPortfolios) {
      const position: PortfolioPositionElement[] = await lastValueFrom(this.portfolioService.getPortfolioPositions(portfolio.id));
      portfolioPositions = [...portfolioPositions, ...position]
    }
    return portfolioPositions
  }

}
