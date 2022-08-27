import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { MarketStackApiService } from './market-stack-api.service';

describe('MarketStackApiService', () => {
  let service: MarketStackApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ]
    });
    service = TestBed.inject(MarketStackApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
