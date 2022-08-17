import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {

  public watchlists: string[];
  public currentWatchlist: string;
  public watchlistData: any;

  //mocked data
  public watchlistUS = [
    {
      symbol: 'TSLA',
      name: 'Tesla',
      price: 782,
      movementPrice: 16.90,
      movementPercentage: 0.25
    },
    {
      symbol: 'AAPL',
      name: 'Apple',
      price: 432,
      movementPrice: 4.81,
      movementPercentage: 1.25
    },
  ]

  public watchlistTW = [
    {
      symbol: 'TSM',
      name: '台積電',
      price: 782,
      movementPrice: 16.90,
      movementPercentage: 0.25
    },
    {
      symbol: 'WM',
      name: '聯電',
      price: 432,
      movementPrice: 4.81,
      movementPercentage: 1.25
    },
  ]

  public watchlistCrypto = [
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      price: 782,
      movementPrice: 16.90,
      movementPercentage: 0.25
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      price: 432,
      movementPrice: 4.81,
      movementPercentage: 1.25
    },
  ]

  constructor() {
    this.watchlists = ['US stocks', 'TW stocks', 'Cryptos'];

    this.currentWatchlist = this.watchlists[0];

    this.watchlistData = this.watchlistUS
  }

  ngOnInit(): void {
  }

  changeWatchlist(watchlistName: any) {
    this.currentWatchlist = watchlistName;

    //fetch real API
    if (watchlistName === 'US stocks') {
      this.watchlistData = this.watchlistUS
    } else if (watchlistName === 'TW stocks') {
      this.watchlistData = this.watchlistTW
    } else {
      this.watchlistData = this.watchlistCrypto
    }
  }

}
