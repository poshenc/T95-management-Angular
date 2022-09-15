import { TestBed } from '@angular/core/testing';

import { JwtHttpInterceptorService } from './jwt-http-interceptor.service';

describe('JwtHttpInterceptorService', () => {
  let service: JwtHttpInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtHttpInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
