import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { StocksService } from '../../../../core/service/stocks/stocks.service';
import { Watchlist } from '../../models/watchlist.model';
import { WatchlistService } from '../../services/watchlist/watchlist.service';

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

  constructor(private stocksService: StocksService, private watchlistService: WatchlistService, private dialogRef: MatDialogRef<EditWatchlistComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.watchListId = data.watchListId;
    this.watchListName = data.watchListName;
    this.watchlistData = data.watchlistData;
  }

  ngOnInit(): void {
    this.fetchStocksList();
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

  onClickRemove(stockId: number) {
    if (this.watchListId) {
      this.watchlistService.removeWatchedStock(this.watchListId, stockId).subscribe(res => {
        //add to removed
        const removedStock = this.watchedStocks.filter(stock => { return stock.id === stockId });
        this.remainedStocks.push(removedStock[0]);

        //remove from existing
        this.watchedStocks = this.watchedStocks.filter((stock) => {
          return stock.id !== stockId;
        })
      })
    }


  }

  onClickAdd(stockId: number) {
    if (this.watchListId) {
      this.watchlistService.addWatchedStock(this.watchListId, stockId).subscribe(res => {
        //add to exiting
        const addedStock = this.remainedStocks.filter(stock => { return stock.id === stockId });
        this.watchedStocks.push(addedStock[0]);

        //remove
        this.remainedStocks = this.remainedStocks.filter((stock) => {
          return stock.id !== stockId;
        })
      })
    }
  }

  deleteWatchlist() {
    if (this.watchListName) {
      this.watchlistService.deleteWatchlist(this.watchListName).subscribe(() => {
        this.dialogRef.close('delete');
      });
    }
  }
}
