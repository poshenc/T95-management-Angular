import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Watchlist } from '../../models/watchlist.model';

@Component({
  selector: 'app-edit-watchlist',
  templateUrl: './edit-watchlist.component.html',
  styleUrls: ['./edit-watchlist.component.scss']
})
export class EditWatchlistComponent implements OnInit {

  public allStocks: string[] = ['TSM', 'AAPL', 'DIA', 'BTC'];

  public watchListId: string | undefined;
  public watchListName: string | undefined;
  public watchlistData: Watchlist[] | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.watchListId = data.watchListId;
    this.watchListName = data.watchListName;
    this.watchlistData = data.watchlistData;
  }

  ngOnInit(): void {
    console.log(this.watchListId);
    console.log(this.watchListName);
    console.log(this.watchlistData);
  }

}
