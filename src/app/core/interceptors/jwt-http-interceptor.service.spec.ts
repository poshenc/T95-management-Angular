import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SessionsService } from '../service/sessions/sessions.service';

import { JwtHttpInterceptorService } from './jwt-http-interceptor.service';

describe('JwtHttpInterceptorService', () => {
  let service: JwtHttpInterceptorService;

  let sessionsServiceSpy: jasmine.SpyObj<SessionsService>;

  beforeEach(() => {
    sessionsServiceSpy = jasmine.createSpyObj(['getJWT']);
    sessionsServiceSpy.getJWT.and.returnValue(of('jwt'));

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: SessionsService, useValue: sessionsServiceSpy }
      ]
    });
    service = TestBed.inject(JwtHttpInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
