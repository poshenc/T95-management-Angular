import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { Watchlist } from '../../models/watchlist.model';
import { StocksService } from '../../services/stocks/stocks.service';

@Component({
  selector: 'app-edit-watchlist',
  templateUrl: './edit-watchlist.component.html',
  styleUrls: ['./edit-watchlist.component.scss']
})
export class EditWatchlistComponent implements OnInit {

  public watchedStocks = [] as Watchlist[];
  public remainedStocks = [] as Watchlist[];

  public watchListId: string | undefined;
  public watchListName: string | undefined;
  public watchlistData: Watchlist[] | undefined;

  //for column search function
  public searchText = '';

  constructor(private stocksService: StocksService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.watchListId = data.watchListId;
    this.watchListName = data.watchListName;
    this.watchlistData = data.watchlistData;
  }

  ngOnInit(): void {
    this.fetchStocksList();
    console.log(this.watchListId);
    console.log(this.watchListName);
    console.log(this.watchlistData);
  }

  async fetchStocksList() {
    //fetch all stocks
    const allStocksList = await lastValueFrom(this.stocksService.getStocksList());
    //turn watched stock into a string array
    const watched = this.watchlistData?.map(watched => { return watched.name });
    //Separate into watched or remained stocks
    allStocksList.forEach((stock: Watchlist) => {
      if (watched?.includes(stock.name)) {
        this.watchedStocks?.push(stock);
      } else {
        this.remainedStocks?.push(stock);
      }
    });
  }
}
