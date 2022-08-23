import { Component, Input, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { Watchlist } from '../../models/watchlist.model';

@Component({
  selector: 'app-watchlist-grid',
  templateUrl: './watchlist-grid.component.html',
  styleUrls: ['./watchlist-grid.component.scss']
})
export class WatchlistGridComponent implements OnInit {

  //from parent component
  @Input() watchlistData: Watchlist[] | undefined;

  columnDefs: ColDef[] = [
    { headerName: 'Name', field: 'name', resizable: true },
    { headerName: 'Symbol', field: 'symbol', resizable: true, width: 100 },
    { headerName: 'Price', field: 'price', resizable: true, width: 100 },
    { headerName: 'Movement', field: 'movementPrice', resizable: true, width: 100 },
    { headerName: 'Movement %', field: 'movementPercentage', resizable: true, width: 100 },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
