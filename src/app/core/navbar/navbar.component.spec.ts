import { BehaviorSubject } from 'rxjs';
import { SideNavToggleService } from '../service/sidenav-toggle/side-nav-toggle.service';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;

  let sideNavToggleServiceSpy: jasmine.SpyObj<SideNavToggleService>;


  beforeAll(() => {
    sideNavToggleServiceSpy = jasmine.createSpyObj(['sideNavState$']);
    sideNavToggleServiceSpy.sideNavState$ = new BehaviorSubject<boolean>(true);

    component = new NavbarComponent(sideNavToggleServiceSpy);
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
