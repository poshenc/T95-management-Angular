import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WatchlistRoutingModule } from './watchlist-routing.module';
import { WatchlistComponent } from './pages/watchlist/watchlist.component';
import { WatchlistHeaderComponent } from './components/watchlist-header/watchlist-header.component';
import { AgGridModule } from 'ag-grid-angular';
import { WatchlistGridComponent } from './components/watchlist-grid/watchlist-grid.component';


@NgModule({
  declarations: [
    WatchlistComponent,
    WatchlistHeaderComponent,
    WatchlistGridComponent
  ],
  imports: [
    CommonModule,
    WatchlistRoutingModule,
    AgGridModule
  ]
})
export class WatchlistModule { }
