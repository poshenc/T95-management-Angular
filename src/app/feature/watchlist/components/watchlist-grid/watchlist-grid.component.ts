import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { distinctUntilChanged } from 'rxjs';
import { Watchlist } from '../../models/watchlist.model';

@Component({
  selector: 'app-watchlist-grid',
  templateUrl: './watchlist-grid.component.html',
  styleUrls: ['./watchlist-grid.component.scss']
})
export class WatchlistGridComponent implements OnInit {

  //from parent component
  @Input() watchlistData: Watchlist[] | undefined;

  //ag-grid
  public gridApi: any;
  public gridColumnApi: any;

  //breakpoint observer
  public screenSize: string | undefined;

  //breakpoint observer variable
  readonly breakpoint$ = this.breakpointObserver.observe(['(min-width: 650px)', '(min-width: 520px)', '(max-width: 519px)']).pipe(distinctUntilChanged());


  columnDefs: ColDef[] = [
    { headerName: 'Name', field: 'name', resizable: true, sortable: true, maxWidth: 350 },
    { headerName: 'Symbol', field: 'symbol', resizable: true, sortable: true, maxWidth: 165 },
    { headerName: 'Price', field: 'price', resizable: true, sortable: true, maxWidth: 165 },
    { headerName: 'Change', field: 'movementPoints', resizable: true, sortable: true, maxWidth: 165 },
    { headerName: 'Change%', field: 'movementPercentage', resizable: true, sortable: true, maxWidth: 165 },
  ];

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
  }

  private breakpointChanged() {
    if (this.breakpointObserver.isMatched('(min-width: 650px)')) {
      this.gridColumnApi.setColumnsVisible(['symbol', 'movementPoints'], true)
    } else if (this.breakpointObserver.isMatched('(min-width: 520px)')) {
      this.gridColumnApi.setColumnVisible('movementPoints', true)
      this.gridColumnApi.setColumnVisible('symbol', false)
    } else if (this.breakpointObserver.isMatched('(max-width: 519px)')) {
      this.gridColumnApi.setColumnsVisible(['symbol', 'movementPoints'], false)
    }
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();

    if (this.gridColumnApi) {
      this.breakpoint$.subscribe(() => {
        this.breakpointChanged();
        this.gridApi.sizeColumnsToFit();
      });
    }

    window.onresize = () => {
      this.gridApi.sizeColumnsToFit();

      //todo
      //https://www.ag-grid.com/javascript-data-grid/grid-size/
      //Dynamic Resizing without Horizontal Scroll
      //Dynamic Resizing without Horizontal Scroll
    }
  }



}
