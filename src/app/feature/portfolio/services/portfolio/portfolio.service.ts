import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PortfolioDetail } from '../../models/portfolio-detail.model';
import { PortfolioPositionElement } from '../../models/portfolio-position.model';
import { PortfolioValueElement } from '../../models/portfolio-value.model';
import { PieChartElement } from '../../models/position-pie-chart.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  public url: string = 'http://localhost:8086/api/';

  constructor(private http: HttpClient) { }

  //get portfolios
  getPortfolios(): Observable<PortfolioDetail[]> {
    return this.http.get<PortfolioDetail[]>(this.url + 'portfolios');
  }

  //get single Portfolio Info
  getPortfolioInfo(portfolioId: number): Observable<PortfolioDetail> {
    return this.http.get<PortfolioDetail>(`${this.url}portfolios/${portfolioId}`);
  }

  //get Portfolio Positions in a single portfolio
  getPortfolioPositions(portfolioId: number): Observable<PortfolioPositionElement[]> {
    return this.http.get<PortfolioPositionElement[]>(`${this.url}portfolios/${portfolioId}/positions`);
  }

  //get single portfolio value by date and by user
  getPortfolioValueByPortfolioId(portfolioId: any, date: string): Observable<PortfolioValueElement> {
    const params = new HttpParams().set('portfolioId', portfolioId).set('date', date);
    return this.http.get<PortfolioValueElement>(`${this.url}portfolioHistory/portfolioByDate`, { params });
  }

  //get single portfolio value by date range and by user
  getPortfolioValueByDateRangeAndPortfolioId(portfolioId: any, dateStart: string, dateEnd: string): Observable<PortfolioValueElement[]> {
    const params = new HttpParams().set('portfolioId', portfolioId).set('dateStart', dateStart).set('dateEnd', dateEnd);
    return this.http.get<PortfolioValueElement[]>(`${this.url}portfolioHistory/portfolioByDateBetween`, { params });
  }

  //get all portfolios values by date range and by user
  getAllPortfoliosValueByDateRange(dateStart: string, dateEnd: string): Observable<PortfolioValueElement[]> {
    const params = new HttpParams().set('dateStart', dateStart).set('dateEnd', dateEnd);
    return this.http.get<PortfolioValueElement[]>(`${this.url}portfolioHistory/allPortfoliosByDateBetween`, { params });
  }

  //add new portfolio by user
  addPortfolio(data: any): Observable<any> {
    return this.http.post<any>(this.url + 'portfolios', data);
  }

  //edit portfolio by user
  editPortfolio(data: any, originalName: string): Observable<unknown> {
    return this.http.put<any>(this.url + `portfolios/${originalName}`, data);
  }

  //delete portfolio by user
  deletePortfolio(name: any): Observable<unknown> {
    const params = new HttpParams().set('name', name);
    return this.http.delete<any>(this.url + 'portfolios', { params });
  }

  //add positon to portfolio
  addPosition(data: any, portfolioId: number): Observable<any> {
    return this.http.post<any>(this.url + `portfolios/${portfolioId}/positions`, data);
  }

  //edit position of portfolio
  editPosition(data: any, portfolioId: number): Observable<any> {
    return this.http.put<any>(this.url + `portfolios/${portfolioId}/positions`, data);
  }

  //close position of portfolio
  closePosition(positionId: number, portfolioId: number): Observable<any> {
    return this.http.delete<any>(this.url + `portfolios/${portfolioId}/positions/${positionId}`);
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
