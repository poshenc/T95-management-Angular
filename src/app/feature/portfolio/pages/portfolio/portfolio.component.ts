import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColDef } from 'ag-grid-community';
import { curveBasis } from 'd3-shape';
import { lastValueFrom } from 'rxjs';
import { PortfolioDetail } from '../../models/portfolio-detail.model';
import { PortfolioValueElement } from '../../models/portfolio-value.model';
import { PieChartElement } from '../../models/position-pie-chart.model';
import { PortfolioService } from '../../services/portfolio/portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  public portfolioId!: number;
  public portfolioData = {} as any;

  //ag-grid
  public gridApi: any;
  public gridColumnApi: any;

  public rowData: any[] = [];

  columnDefs: ColDef[] = [
    { headerName: 'Name', field: 'name', resizable: true, sortable: true, width: 120, pinned: 'left', lockPinned: true, cellClass: 'lock-pinned' },
    { headerName: 'Symbol', field: 'symbol', resizable: true, sortable: true, width: 85 },
    { headerName: 'Price', field: 'price', resizable: true, sortable: true, width: 95 },
    { headerName: 'Quantity', field: 'quantity', resizable: true, sortable: true, width: 95 },
    { headerName: 'Cost Basis', field: 'costBasis', resizable: true, sortable: true, width: 100 },
    { headerName: 'Open Date', field: 'openDate', resizable: true, sortable: true, width: 110 },
    // { headerName: 'Change', field: 'movement_points', resizable: true, sortable: true, maxWidth: 165 },
    // { headerName: 'Change%', field: 'movement_percentage', resizable: true, sortable: true, maxWidth: 165 },
  ];

  //for pie chart
  public dataLoaded = false;
  public allPositions = [] as PieChartElement[];

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

  constructor(private portfolioService: PortfolioService, private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    // subsrice to path by url query params
    this.activatedroute.params
      .subscribe(params => {
        this.portfolioId = params['portfolioId'];
        this.fetchPortfolioPositions(this.portfolioId);
      });
  }

  public async fetchPortfolioPositions(portfolioId: number) {
    const portfolioInfo: PortfolioDetail = await lastValueFrom(this.portfolioService.getPortfolioInfo(portfolioId));
    //fetch historical data for line chart
    this.fetchHistoricalData(portfolioInfo);
    const positionData = await lastValueFrom(this.portfolioService.getPortfolioPositions(portfolioId));
    //todo: fetch yesterday data from API

    this.portfolioData.name = portfolioInfo.name;
    this.rowData = positionData;
    this.portfolioData.positions = positionData;
    //calc position total
    this.portfolioData.movementAmount = 188.8;
    this.portfolioData.movementPercentage = 88.88; //todo: compare with previous day (stock price)
    this.portfolioData.total = 288.8;

    console.log('Final Result: single Portfolios', this.portfolioData.positions);
    //for pie chart data
    this.allPositions = this.portfolioService.calculateAllocations(positionData);
    this.dataLoaded = true;
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }


  async fetchHistoricalData(portfolioInfo: PortfolioDetail) {
    const values = await lastValueFrom(this.portfolioService.getPortfolioValueByDateRangeAndPortfolioId(portfolioInfo.id, "2023-01-10", "2023-01-18"));
    this.historyData = this.sortPortfolios(values, portfolioInfo.name);
  }

  sortPortfolios(values: PortfolioValueElement[], portfolioName: string) {
    const portfolioValues = values.map((portfolio) => {
      return {
        name: portfolio.date,
        value: portfolio.value
      }
    });
    return [{
      name: portfolioName,
      series: portfolioValues
    }]
  }
}
