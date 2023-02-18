import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PortfolioValueElement } from '../../portfolio/models/portfolio-value.model';
import { PortfolioPositionElement } from '../models/portfolio-position.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  public url: string = 'http://localhost:8086/api/';

  constructor(private http: HttpClient) { }

  //get Portfolio Positions
  getPortfolioPositions(portfolioId: number): Observable<PortfolioPositionElement[]> {
    return this.http.get<PortfolioPositionElement[]>(`${this.url}portfolios/${portfolioId}/positions`);
  }

  //get all portfolios by user
  getPortfoliosByUser(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}portfolios/`);
  }

  //get single portfolio value by date and by user
  getPortfolioValueByPortfolioId(portfolioId: any, date: string): Observable<PortfolioValueElement> {
    const params = new HttpParams().set('portfolioId', portfolioId).set('date', date);
    return this.http.get<PortfolioValueElement>(`${this.url}portfolioHistory/portfolioByDate`, { params });
  }


  //move to portfolio feature???? todo, not implmented yet
  //get single portfolio value by date range and by user
  getPortfolioValueByDateRangeAndPortfolioId(portfolioId: any, dateStart: string, dateEnd: string): Observable<PortfolioValueElement[]> {
    const params = new HttpParams().set('portfolioId', portfolioId).set('dateStart', dateStart).set('dateEnd', dateEnd);
    return this.http.get<PortfolioValueElement[]>(`${this.url}portfolioHistory/portfolioByDateBetween`, { params });
  }

  //needed in portfolio card component, todo, not implmented yet
  //get all portfolios value by date and by user
  getAllPortfoliosValueByDate(date: string): Observable<PortfolioValueElement[]> {
    const params = new HttpParams().set('date', date);
    return this.http.get<PortfolioValueElement[]>(`${this.url}portfolioHistory/allPortfoliosByDate`, { params });
  }


  //need for total wealth historical chart, todo, not implmented yet
  //get all portfolios values by date range and by user
  getAllPortfoliosValueByDateRange(dateStart: string, dateEnd: string): Observable<PortfolioValueElement[]> {
    const params = new HttpParams().set('dateStart', dateStart).set('dateEnd', dateEnd);
    return this.http.get<PortfolioValueElement[]>(`${this.url}portfolioHistory/allPortfoliosByDateBetween`, { params });
  }
}
