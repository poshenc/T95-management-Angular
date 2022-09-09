import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Watchlist } from '../../models/watchlist.model';
import { EditWatchlistComponent } from '../../pages/edit-watchlist/edit-watchlist.component';

@Component({
  selector: 'app-watchlist-header',
  templateUrl: './watchlist-header.component.html',
  styleUrls: ['./watchlist-header.component.scss']
})
export class WatchlistHeaderComponent implements OnInit {

  //from parent
  @Input() watchlists: any | undefined;
  @Input() currentWatchlist: string | undefined;
  @Input() currentWatchlistId: number | undefined;
  @Input() watchlistData: Watchlist[] | undefined;

  //to parent
  @Output() changeWatchlist = new EventEmitter<any>();
  @Output() refreshAgGrid = new EventEmitter();

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  onChange(watchlist: any) {
    this.currentWatchlist = watchlist.name;
    this.currentWatchlistId = watchlist.id;
    this.changeWatchlist.emit(watchlist);
  }

  editWatchlist() {
    const dialogRef = this.dialog.open(EditWatchlistComponent, {
      data: {
        watchListId: this.currentWatchlistId,
        watchListName: this.currentWatchlist,
        watchlistData: this.watchlistData,
      },
      width: '100vw',
      maxWidth: '600px',
      height: '80%'
    })

    dialogRef.afterClosed().subscribe(() => {
      this.refreshAgGrid.emit();
    })

  }

}
