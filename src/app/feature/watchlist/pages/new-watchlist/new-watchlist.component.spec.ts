import { WatchlistService } from '../../services/watchlist/watchlist.service';
import { NewWatchlistComponent } from './new-watchlist.component';

describe('NewWatchlistComponent', () => {
  let component: NewWatchlistComponent;

  let matDialogRefSpy: jasmine.SpyObj<any>;
  let watchlistServiceSpy: jasmine.SpyObj<WatchlistService>;

  beforeAll(() => {
    component = new NewWatchlistComponent(matDialogRefSpy, watchlistServiceSpy);
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
