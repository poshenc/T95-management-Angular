import { Component, OnInit } from '@angular/core';
import { MarketStackApiService } from 'src/app/core/service/market-stack-api/market-stack-api.service';
import { portfolioCard, priceCard } from 'src/app/feature/home/models/price-card.models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  stockData: priceCard[];
  stockList: string[];
  portfolioData: portfolioCard[];

  constructor(private marketStackApiService: MarketStackApiService) {

    //mock data for 4 index
    this.stockData = [
      {
        name: 'Dow Jones',
        price: 33753.60,
        movementPrice: 416.90,
        movementPercentage: 1.25
      },
      {
        name: 'Nasdaq',
        price: 13560.20,
        movementPrice: 268.20,
        movementPercentage: 2.02
      },
      {
        name: 'S&P 500',
        price: 4278.50,
        movementPrice: 71.20,
        movementPercentage: 1.69
      },
      {
        name: 'TSLA',
        price: 900.29,
        movementPrice: -40.20,
        movementPercentage: -4.58
      },
    ];

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
  }

  getIntradayPriceData(stockList: string[]) {
    stockList.map(async stock => {
      let data = await this.marketStackApiService.getIntradayPriceData(stock).toPromise();
      console.log('stock name:', stock)
      console.log('regularMarketPrice', data.quoteResponse.result[0].regularMarketPrice);
      console.log('regularMarketChange', data.quoteResponse.result[0].regularMarketChange)
      console.log('regularMarketChangePercent', data.quoteResponse.result[0].regularMarketChangePercent);
    })
  }


}
