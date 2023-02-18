import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AppConfigService } from 'src/app/core/service/app-config/app-config.service';
import { SessionsService } from 'src/app/core/service/sessions/sessions.service';
import { StocksService } from 'src/app/core/service/stocks/stocks.service';
import { priceCard } from 'src/app/feature/home/models/price-card.models';
import { PortfolioValueElement } from '../../portfolio/models/portfolio-value.model';
import { RxStompService } from '../../portfolio/services/webSocket/rx-stomp.service';
import { stompWebSocketConfig } from '../../portfolio/services/webSocket/stompWebSocket.config';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  stockData = [] as priceCard[];

  //props to children
  public showMoney = true;
  public portfolioData = [] as any;
  public currentTotal = 0;

  //For Download Status Websocket
  config = stompWebSocketConfig;
  marketData = [] as priceCard[];
  // @ts-ignore, to suppress warning related to being undefined
  private downloadStatusSubscription: Subscription;

  constructor(private stocksService: StocksService, private sessionsService: SessionsService, private rxStompService: RxStompService, private appConfig: AppConfigService, private homeService: HomeService) {
  }

  ngOnInit(): void {
    this.fetchStocks();
    //websocket
    this.connectWebsocket();
    this.subscribeWebsocket();
    //fetch portfolios
    this.fetchAllPortfolioData();
  }

  ngOnDestroy() {
    this.downloadStatusSubscription?.unsubscribe();
  }

  async fetchStocks() {
    const mainSymbols = ['DOW J', 'IXIC', 'GSPC', 'USDTWD', 'TSLA', 'APPL', '2330', 'BTC', 'ETH']
    for (let symbol of mainSymbols) {
      const res = await lastValueFrom(this.stocksService.getStockBySymbol(symbol));
      this.stockData.push(res);
    }
  }

  //websocket market data status
  connectWebsocket() {
    stompWebSocketConfig.brokerURL = this.appConfig.socketEndpoint + 't95-websocket';
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
        this.stockData = JSON.parse(data.body);
        // console.log('Scheduled update stock data,', this.stockData);
      });
  }

  //fetch portfolios
  public async fetchAllPortfolioData() {
    let calculation = [] as any;
    let totalSum = 0;
    //1. allPortfolios
    calculation = await lastValueFrom(this.homeService.getPortfoliosByUser());

    //2. getPortfolioPositions
    let sum = 0;
    for (const [i, port] of calculation.entries()) {
      //getPortfolioPositions
      const data = await lastValueFrom(this.homeService.getPortfolioPositions(port.id));
      calculation[i].positions = data;
      calculation[i].isCollapsed = true;
      //calc portfolio total
      for (let i = 0; i < data.length; i++) {
        sum += Number(data[i].price) * data[i].quantity
      }
      calculation[i].total = port.cash + sum; //cash + (price * quantity)
      totalSum += port.cash + sum;
      //get portfolio value for yesterday
      const yesterdayPortfolioValue: PortfolioValueElement = await lastValueFrom(this.homeService.getPortfolioValueByPortfolioId(port.id, "2023-01-18"));
      //calc daily movements
      calculation[i].movementAmount = (calculation[i].total - yesterdayPortfolioValue.value).toFixed(2);
      calculation[i].movementPercentage = (((calculation[i].total - yesterdayPortfolioValue.value) / yesterdayPortfolioValue.value) * 100).toFixed(2) + "%";
    }
    this.portfolioData = calculation
    this.currentTotal = totalSum
  }

}
