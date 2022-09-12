import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Watchlist } from '../../models/watchlist.model';
import { WatchlistService } from '../../services/watchlist/watchlist.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {

  public userId = 1;

  public watchlists: Watchlist[] | undefined;
  public currentWatchlist: string | undefined;
  public currentWatchlistId: number | undefined;

  public watchlistData: any;

  constructor(private watchlistService: WatchlistService) {
    this.fetchData();
  }

  ngOnInit(): void {
  }

  async fetchData() {
    this.watchlists = await lastValueFrom(this.watchlistService.getWatchlists(this.userId));
    this.currentWatchlist = this.watchlists[0].name;
    this.currentWatchlistId = this.watchlists[0].id;
    this.watchlistData = await lastValueFrom(this.watchlistService.getWatchedStocks(this.userId));

  }

  async changeWatchlist(watchlist: any) {
    this.currentWatchlist = watchlist.name;
    this.currentWatchlistId = watchlist.id;
    this.watchlistData = await lastValueFrom(this.watchlistService.getWatchedStocks(watchlist.id));
  }

  async refreshAgGrid() {
    if (this.currentWatchlistId) {
      this.watchlistData = await lastValueFrom(this.watchlistService.getWatchedStocks(this.currentWatchlistId));
    }
  }

  async refreshWatchlist() {
    this.watchlists = await lastValueFrom(this.watchlistService.getWatchlists(this.userId));
  }

}