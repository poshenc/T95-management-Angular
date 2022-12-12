import { of } from 'rxjs';
import { StocksService } from 'src/app/core/service/stocks/stocks.service';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;

  let stocksServiceSpy: jasmine.SpyObj<StocksService>;

  beforeAll(() => {
    stocksServiceSpy = jasmine.createSpyObj(['getStockBySymbol']);
    stocksServiceSpy.getStockBySymbol.and.returnValue(of([]));

    component = new HomeComponent(stocksServiceSpy);
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
