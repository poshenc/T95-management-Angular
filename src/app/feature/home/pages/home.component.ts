import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SessionsService } from 'src/app/core/service/sessions/sessions.service';
import { StocksService } from 'src/app/core/service/stocks/stocks.service';
import { portfolioCard, priceCard } from 'src/app/feature/home/models/price-card.models';
import { RxStompService } from '../../portfolio/services/webSocket/rx-stomp.service';
import { stompWebSocketConfig } from '../../portfolio/services/webSocket/stompWebSocket.config';

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

  //For Download Status Websocket
  config = stompWebSocketConfig;
  marketData = [] as priceCard[];
  // @ts-ignore, to suppress warning related to being undefined
  private downloadStatusSubscription: Subscription;

  constructor(private stocksService: StocksService, private sessionsService: SessionsService, private rxStompService: RxStompService) {

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
    // this.getIntradayPriceData(this.stockList);
    // this.fetchStocks();
    //websocket
    this.connectWebsocket();
    this.subscribeWebsocket();
  }

  ngOnDestroy() {
    this.downloadStatusSubscription?.unsubscribe();
  }

  //websocket maert data status
  connectWebsocket() {
    // const currentUrl = this.appConfigService.settings.apiServer.url;
    // downloadStatusConfig.brokerURL = 'ws' + currentUrl.slice(currentUrl.indexOf(':')) + 'websocket';
    stompWebSocketConfig.brokerURL = 'ws://127.0.0.1:8086/t95-websocket';
    stompWebSocketConfig.connectHeaders = {
      Authorization: this.sessionsService.getJWT()
    };
    this.rxStompService.configure(stompWebSocketConfig);
    this.rxStompService.activate();
  }

  subscribeWebsocket() {
    this.downloadStatusSubscription = this.rxStompService
      .watch('/topic/globalIndex', stompWebSocketConfig.connectHeaders)
      .subscribe((data: any) => {
        console.log('incoming message', data);

        // const message = JSON.parse(data.body);
        // console.log('incoming message', message);
        // this.marketData.push(message);

      });
  }

  // getIntradayPriceData(stockList: string[]) {
  //   stockList.map(async stock => {
  //     let data = await this.yahooFinanceApiService.getIntradayPriceData(stock).toPromise();
  //     console.log('stock name:', stock)
  //     console.log('regularMarketPrice', data.quoteResponse.result[0].regularMarketPrice);
  //     console.log('regularMarketChange', data.quoteResponse.result[0].regularMarketChange)
  //     console.log('regularMarketChangePercent', data.quoteResponse.result[0].regularMarketChangePercent);
  //   })
  // }

  async fetchStocks() {
    const mainSymbols = ['DOW J', 'IXIC', 'GSPC', 'USDTWD', 'TSLA', 'APPL', '2330', 'BTC', 'ETH']
    for (let symbol of mainSymbols) {
      const res = await lastValueFrom(this.stocksService.getStockBySymbol(symbol));
      this.stockData.push(res);
    }
  }


}
