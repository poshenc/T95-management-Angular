import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WatchlistRoutingModule } from './watchlist-routing.module';
import { WatchlistComponent } from './pages/watchlist/watchlist.component';
import { WatchlistHeaderComponent } from './components/watchlist-header/watchlist-header.component';
import { AgGridModule } from 'ag-grid-angular';
import { WatchlistGridComponent } from './components/watchlist-grid/watchlist-grid.component';
import { EditWatchlistComponent } from './pages/edit-watchlist/edit-watchlist.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NewWatchlistComponent } from './pages/new-watchlist/new-watchlist.component';


@NgModule({
  declarations: [
    WatchlistComponent,
    WatchlistHeaderComponent,
    WatchlistGridComponent,
    EditWatchlistComponent,
    NewWatchlistComponent
  ],
  imports: [
    CommonModule,
    WatchlistRoutingModule,
    AgGridModule,
    MatDialogModule,
    FormsModule,
    SharedModule
  ]
})
export class WatchlistModule { }
