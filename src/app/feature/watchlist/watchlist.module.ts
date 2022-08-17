import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WatchlistRoutingModule } from './watchlist-routing.module';
import { WatchlistComponent } from './pages/watchlist/watchlist.component';
import { WatchlistHeaderComponent } from './components/watchlist-header/watchlist-header.component';


@NgModule({
  declarations: [
    WatchlistComponent,
    WatchlistHeaderComponent
  ],
  imports: [
    CommonModule,
    WatchlistRoutingModule
  ]
})
export class WatchlistModule { }
