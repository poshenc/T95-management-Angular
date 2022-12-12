import { of } from 'rxjs';
import { StocksService } from 'src/app/core/service/stocks/stocks.service';
import { WatchlistService } from '../../services/watchlist/watchlist.service';

import { EditWatchlistComponent } from './edit-watchlist.component';

describe('EditWatchlistComponent', () => {
  let component: EditWatchlistComponent;

  let stocksServiceSpy: jasmine.SpyObj<StocksService>;
  let watchlistServiceSpy: jasmine.SpyObj<WatchlistService>;
  let matDialogRefSpy: jasmine.SpyObj<any>;
  const data = {
    watchListId: 1,
    watchListName: 'watchListName',
    watchlistData: [{
      id: 1,
      symbol: 'symbol',
      name: 'name',
      price: 100,
      movementPoints: 10,
      movementPercentage: 1,
      stock_code: 'stock_code',
    }],
  }

  beforeAll(() => {
    stocksServiceSpy = jasmine.createSpyObj(['getStocksList']);
    stocksServiceSpy.getStocksList.and.returnValue(of([]));

    watchlistServiceSpy = jasmine.createSpyObj(['getWatchlists']);
    watchlistServiceSpy.getWatchlists.and.returnValue(of([]));

    component = new EditWatchlistComponent(stocksServiceSpy, watchlistServiceSpy, matDialogRefSpy, data);
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
