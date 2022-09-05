import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-watchlist-header',
  templateUrl: './watchlist-header.component.html',
  styleUrls: ['./watchlist-header.component.scss']
})
export class WatchlistHeaderComponent implements OnInit {

  //from parent
  @Input() watchlists: any | undefined;
  @Input() currentWatchlist: string | undefined;

  //to parent
  @Output() changeWatchlist = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onChange(watchlist: any) {
    this.currentWatchlist = watchlist.name;
    this.changeWatchlist.emit(watchlist);
  }

}
