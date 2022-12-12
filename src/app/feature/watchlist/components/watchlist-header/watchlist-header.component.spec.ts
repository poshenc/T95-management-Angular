import { of } from 'rxjs';

import { WatchlistHeaderComponent } from './watchlist-header.component';

describe('WatchlistHeaderComponent', () => {
  let component: WatchlistHeaderComponent;

  let matDialogSpy: jasmine.SpyObj<any>;

  beforeAll(() => {
    matDialogSpy = jasmine.createSpyObj(['open', 'close']);
    matDialogSpy.open.and.returnValue({
      afterClosed: () => of(true)
    });

    component = new WatchlistHeaderComponent(matDialogSpy);
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
