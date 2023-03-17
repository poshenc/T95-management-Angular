import { Component, OnInit } from '@angular/core';
import { curveBasis } from 'd3-shape';
import { lastValueFrom } from 'rxjs';
import { SessionsService } from 'src/app/core/service/sessions/sessions.service';
import { priceCard } from 'src/app/feature/home/models/price-card.models';
import { environment } from 'src/environments/environment.prod';
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

  //for historical line chart
  historyData!: any;
  public view: any = [700, 400];
  public curve: any = curveBasis;
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = true;
  public showXAxisLabel = true;
  public xAxisLabel!: "Years";
  public showYAxisLabel = true;
  public yAxisLabel!: "Dollars";
  public graphDataChart!: any[];
  public colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private sessionsService: SessionsService, private rxStompService: RxStompService, private homeService: HomeService) {
  }

  ngOnInit(): void {
    //websocket
    this.connectWebsocket();
    this.subscribeWebsocket();
    //fetch portfolios current and historical
    this.fetchAllPortfolioData();
    //fetch historical data
    this.fetchHistoricalData();
  }

  ngOnDestroy() {
    this.downloadStatusSubscription?.unsubscribe();
  }

  //websocket market data status
  connectWebsocket() {
    stompWebSocketConfig.brokerURL = environment.socketEndpoint + 't95-websocket';
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
        console.log('websocket incoming,', this.stockData);
      });
  }

  //fetch portfolios
  public async fetchAllPortfolioData() {
    let calculation = [] as any;
    let totalSum = 0;
    //1. allPortfolios
    calculation = await lastValueFrom(this.homeService.getPortfoliosByUser());

    //2. getPortfolioPositions
    for (const [i, port] of calculation.entries()) {
      let sum = 0;
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
      if (yesterdayPortfolioValue !== null) {
        //calc daily movements
        calculation[i].movementAmount = (calculation[i].total - yesterdayPortfolioValue.value).toFixed(2);
        calculation[i].movementPercentage = (((calculation[i].total - yesterdayPortfolioValue.value) / yesterdayPortfolioValue.value) * 100).toFixed(2) + "%";
      }
    }
    this.portfolioData = calculation
    this.currentTotal = totalSum
  }

  async fetchHistoricalData() {
    const values = await lastValueFrom(this.homeService.getAllPortfoliosValueByDateRange("2023-01-10", "2023-01-18"));
    this.historyData = this.sortPortfolios(values);
  }

  sortPortfolios(values: PortfolioValueElement[]) {
    const portfolioDates = values.map((portfolio) => portfolio.date);
    const uniqueDates = [...new Set(portfolioDates)];
    const portfoliosHistory = uniqueDates.map((date) => {
      const allValues = values.filter(portfolio => portfolio.date === date);
      let sum = 0;
      allValues.forEach((portfolio) => { sum += portfolio.value });
      return {
        name: date,
        value: sum
      }
    })
    const result = [{
      name: 'Historical Wealth',
      series: portfoliosHistory
    }];
    return result;
  }

}

