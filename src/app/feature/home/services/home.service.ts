import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { PortfolioDetail } from '../../portfolio/models/portfolio-detail.model';
import { PortfolioValueElement } from '../../portfolio/models/portfolio-value.model';
import { PortfolioPositionElement } from '../models/portfolio-position.model';
import { priceCard } from '../models/price-card.models';
import { environment } from './../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  public domain: string;

  constructor(private http: HttpClient) {
    this.domain = environment.domain;
  }

  //get Portfolio Positions
  getPortfolioPositions(portfolioId: number): Observable<PortfolioPositionElement[]> {
    return this.http.get<PortfolioPositionElement[]>(`${this.domain}portfolios/${portfolioId}/positions`);
  }

  //get all portfolios by user
  getPortfoliosByUser(): Observable<any[]> {
    return this.http.get<any[]>(`${this.domain}portfolios/`);
  }

  //get single portfolio value by date and by user
  getPortfolioValueByPortfolioId(portfolioId: any, date: string): Observable<PortfolioValueElement> {
    const params = new HttpParams().set('portfolioId', portfolioId).set('date', date);
    return this.http.get<PortfolioValueElement>(`${this.domain}portfolioHistory/portfolioByDate`, { params });
  }

  //get all portfolios value by date and by user
  getAllPortfoliosValueByDate(date: string): Observable<PortfolioValueElement[]> {
    const params = new HttpParams().set('date', date);
    return this.http.get<PortfolioValueElement[]>(`${this.domain}portfolioHistory/allPortfoliosByDate`, { params });
  }

  //get all portfolios values by date range and by user
  getAllPortfoliosValueByDateRange(dateStart: string, dateEnd: string): Observable<PortfolioValueElement[]> {
    const params = new HttpParams().set('dateStart', dateStart).set('dateEnd', dateEnd);
    return this.http.get<PortfolioValueElement[]>(`${this.domain}portfolioHistory/allPortfoliosByDateBetween`, { params });
  }

  //get key indices at ngOnInit
  getKeyIndices() {
    return this.http.get<priceCard[]>(`${this.domain}stocks/keyIndices`);
  }

  //get portfolios
  getPortfolios(): Observable<PortfolioDetail[]> {
    return this.http.get<PortfolioDetail[]>(this.domain + 'portfolios')
  }

  //get earliest date of a portfolio
  getEarliestDateOfPortfolio(portfolioId: number): Observable<any> {
    const params = new HttpParams().set('portfolioId', portfolioId)
    return this.http.get<any>(`${this.domain}portfolioHistory/portfolioBeginDate`, { params })
  }


  //get min date of all portfolios
  async getMinDateOfAllPortfolios(): Promise<string> {
    let portfoliosData: any;
    portfoliosData = await lastValueFrom(this.getPortfolios());
    let minDate: string = "";
    for (const portfolio of portfoliosData) {
      const res = await lastValueFrom(this.getEarliestDateOfPortfolio(portfolio.id))
      if (minDate === "") {
        minDate = res.date
      } else {
        minDate = Date.parse(res.date) < Date.parse(minDate) ? res.date : minDate
      }
    }
    return minDate
  }
}
