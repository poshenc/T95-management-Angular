import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { WatchlistService } from '../../services/watchlist/watchlist.service';

@Component({
  selector: 'app-new-watchlist',
  templateUrl: './new-watchlist.component.html',
  styleUrls: ['./new-watchlist.component.scss']
})
export class NewWatchlistComponent implements OnInit {

  //todo
  public userId = 1;

  public watchlistName: string | undefined;

  //validation 
  public errorName = false;

  constructor(private dialogRef: MatDialogRef<NewWatchlistComponent>, private watchlistService: WatchlistService) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.watchlistName) {
      this.watchlistService.addWatchlist(this.userId, this.watchlistName).subscribe((res) => {
        this.dialogRef.close(this.watchlistName);
      });
    } else {
      this.errorName = true;
    }
  }

}
