import { of } from 'rxjs';
import { Watchlist } from '../../models/watchlist.model';
import { WatchlistService } from '../../services/watchlist/watchlist.service';

import { WatchlistComponent } from './watchlist.component';

describe('WatchlistComponent', () => {
  let component: WatchlistComponent;

  let watchlistServiceSpy: jasmine.SpyObj<WatchlistService>;

  const watchlist: Watchlist[] = [{
    id: 1,
    symbol: 'symbol',
    name: 'name',
    price: 100,
    movementPoints: 10,
    movementPercentage: 1,
    stock_code: 'stock_code',
  }]

  const watchedStocks = [{
    "id": 1,
    "name": "name",
    "symbol": "symbol",
    "price": "price",
    "movementPoints": "movementPoints",
    "movementPercentage": "movementPercentage"
  }]

  beforeAll(() => {
    watchlistServiceSpy = jasmine.createSpyObj(['getWatchlists', 'getWatchedStocks']);
    watchlistServiceSpy.getWatchlists.and.returnValue(of(watchlist));
    watchlistServiceSpy.getWatchedStocks.and.returnValue(of(watchedStocks));

    component = new WatchlistComponent(watchlistServiceSpy);
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
