import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { YahooFinanceApiService } from './yahoo-finance-api.service';

describe('YahooFinanceApiService', () => {
  let service: YahooFinanceApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ]
    });
    service = TestBed.inject(YahooFinanceApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
