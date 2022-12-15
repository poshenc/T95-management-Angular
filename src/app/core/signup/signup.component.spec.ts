import { Router } from '@angular/router';
import { SessionsService } from '../service/sessions/sessions.service';
import { UserAccountService } from '../service/user-account/user-account.service';
import { ValidationService } from '../service/validation/validation.service';
import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;

  let routerSpy: jasmine.SpyObj<Router>;
  let userAccountServiceSpy: jasmine.SpyObj<UserAccountService>;
  let sessionsServiceSpy: jasmine.SpyObj<SessionsService>;
  let validationServiceSpy: jasmine.SpyObj<ValidationService>;

  beforeAll(() => {
    component = new SignupComponent(routerSpy, userAccountServiceSpy, sessionsServiceSpy, validationServiceSpy);
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
