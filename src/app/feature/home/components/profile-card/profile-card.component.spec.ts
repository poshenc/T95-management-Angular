import { Router } from '@angular/router';

import { ProfileCardComponent } from './profile-card.component';

describe('ProfileCardComponent', () => {
  let component: ProfileCardComponent;

  let routerSpy: jasmine.SpyObj<Router>;

  beforeAll(() => {
    component = new ProfileCardComponent(routerSpy);
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
