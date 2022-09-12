import { Component, OnInit } from '@angular/core';
import { StocksService } from 'src/app/core/service/stocks/stocks.service';
import { YahooFinanceApiService } from 'src/app/core/service/yahoo-finance-api/yahoo-finance-api.service';
import { portfolioCard, priceCard } from 'src/app/feature/home/models/price-card.models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  stockData = [] as priceCard[];
  stockList: string[];
  portfolioData: portfolioCard[];

  //props to children
  public showMoney = true;

  constructor(private yahooFinanceApiService: YahooFinanceApiService, private stocksService: StocksService) {

    //for fetch API use
    this.stockList = ['AAPL', 'TSLA']

    //for portfolio
    this.portfolioData = [
      {
        portfolioName: 'US Stock',
        total: 120621.92,
        movementAmount: 39.66,
        movementPercentage: 0.04
      },
      {
        portfolioName: 'TW Stock',
        total: 27288.08,
        movementAmount: 118.84,
        movementPercentage: 0.44
      },
      {
        portfolioName: 'Crypto',
        total: 24240.16,
        movementAmount: -95.11,
        movementPercentage: -0.39
      },
    ]

  }



  ngOnInit(): void {
    //yahoo finance API
    // this.getIntradayPriceData(this.stockList);ß
    this.fetchStocks();
  }

  getIntradayPriceData(stockList: string[]) {
    stockList.map(async stock => {
      let data = await this.yahooFinanceApiService.getIntradayPriceData(stock).toPromise();
      console.log('stock name:', stock)
      console.log('regularMarketPrice', data.quoteResponse.result[0].regularMarketPrice);
      console.log('regularMarketChange', data.quoteResponse.result[0].regularMarketChange)
      console.log('regularMarketChangePercent', data.quoteResponse.result[0].regularMarketChangePercent);
    })
  }

  fetchStocks() {
    for (let i = 1; i < 5; i++) {
      this.stocksService.getStockById(i).subscribe(res => {
        this.stockData.push(res);
      })
    }
  }


}
