import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { PortfolioService } from '../../services/portfolio/portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  public portfolioId!: number;
  public portfolioData = {} as any;

  constructor(private portfolioService: PortfolioService, private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    // subsrice to path by url query params
    this.activatedroute.params
      .subscribe(params => {
        this.portfolioId = params['portfolioId'];
        this.fetchPortfolioPositions(this.portfolioId);
      });
  }

  public async fetchPortfolioPositions(portfolioId: number) {
    const portfolioInfo = await lastValueFrom(this.portfolioService.getPortfolioInfo(portfolioId));
    const positionData = await lastValueFrom(this.portfolioService.getPortfolioPositions(portfolioId));

    this.portfolioData.name = portfolioInfo.name;
    this.portfolioData.positions = positionData;
    //calc position total
    this.portfolioData.movementAmount = 188.8;
    this.portfolioData.movementPercentage = 88.88; //todo: compare with previous day (stock price)
    this.portfolioData.total = 288.8;

    console.log('Final Result: single Portfolios', this.portfolioData);
  }
}
