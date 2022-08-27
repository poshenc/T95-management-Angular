import { TestBed } from '@angular/core/testing';

import { SideNavToggleService } from './side-nav-toggle.service';

describe('SideNavToggleService', () => {
  let service: SideNavToggleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SideNavToggleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
