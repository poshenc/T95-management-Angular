import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AppConfigService } from 'src/app/core/service/app-config/app-config.service';
import { SessionsService } from 'src/app/core/service/sessions/sessions.service';
import { StocksService } from 'src/app/core/service/stocks/stocks.service';
import { priceCard } from 'src/app/feature/home/models/price-card.models';
import { RxStompService } from '../../portfolio/services/webSocket/rx-stomp.service';
import { stompWebSocketConfig } from '../../portfolio/services/webSocket/stompWebSocket.config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  stockData = [] as priceCard[];
  //props to children
  public showMoney = true;

  //For Download Status Websocket
  config = stompWebSocketConfig;
  marketData = [] as priceCard[];
  // @ts-ignore, to suppress warning related to being undefined
  private downloadStatusSubscription: Subscription;

  constructor(private stocksService: StocksService, private sessionsService: SessionsService, private rxStompService: RxStompService, private appConfig: AppConfigService) {
  }

  ngOnInit(): void {
    this.fetchStocks();
    //websocket
    this.connectWebsocket();
    this.subscribeWebsocket();
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
}
