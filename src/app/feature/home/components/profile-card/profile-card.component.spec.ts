import { Router } from '@angular/router';
import { of } from 'rxjs';
import { SessionsService } from 'src/app/core/service/sessions/sessions.service';

import { ProfileCardComponent } from './profile-card.component';

describe('ProfileCardComponent', () => {
  let component: ProfileCardComponent;

  let routerSpy: jasmine.SpyObj<Router>;
  let sessionsServiceSpy: jasmine.SpyObj<SessionsService>;

  beforeAll(() => {
    sessionsServiceSpy = jasmine.createSpyObj(['getUserName']);
    sessionsServiceSpy.getUserName.and.returnValue(of(['username']));

    component = new ProfileCardComponent(routerSpy, sessionsServiceSpy);
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
