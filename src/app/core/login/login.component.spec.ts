import { Router } from '@angular/router';
import { SessionsService } from '../service/sessions/sessions.service';
import { UserAccountService } from '../service/user-account/user-account.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;

  let routerSpy: jasmine.SpyObj<Router>;
  let userAccountServiceSpy: jasmine.SpyObj<UserAccountService>;
  let sessionsServiceSpy: jasmine.SpyObj<SessionsService>;

  beforeAll(() => {
    component = new LoginComponent(routerSpy, userAccountServiceSpy, sessionsServiceSpy);
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
