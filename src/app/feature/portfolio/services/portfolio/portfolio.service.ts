import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PortfolioPositionElement } from '../../models/portfolio-position.model';
import { PieChartElement } from '../../models/position-pie-chart.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  public url: string = 'http://localhost:8086/api/';

  constructor(private http: HttpClient) { }

  //get portfolios
  getPortfolios(): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'portfolios');
  }

  //get single Portfolio Info
  getPortfolioInfo(portfolioId: number): Observable<any> {
    return this.http.get<any>(`${this.url}portfolios/${portfolioId}`);
  }

  //get Portfolio Positions in a single portfolio
  getPortfolioPositions(portfolioId: number): Observable<PortfolioPositionElement[]> {
    return this.http.get<PortfolioPositionElement[]>(`${this.url}portfolios/${portfolioId}/positions`);
  }

  //for pie chart
  calculateAllocations(portfolioPositions: PortfolioPositionElement[]): PieChartElement[] {
    const allocations = portfolioPositions.map(portfolio => {
      return {
        name: portfolio.symbol,
        value: Math.floor(Number(portfolio.price) * portfolio.quantity)
      }
    })
    //sorting position
    let sortedPostions = {} as any;
    for (const { name, value } of allocations) {
      sortedPostions[name] ??= 0;
      sortedPostions[name] += value
    }
    //filtering position
    let result = [] as PieChartElement[];
    for (const property in sortedPostions) {
      const obj = {
        name: property,
        value: sortedPostions[property]
      }
      result.push(obj)
    }
    return result
  }
}
