import { BreakpointObserver } from '@angular/cdk/layout';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SideNavToggleService } from '../service/sidenav-toggle/side-nav-toggle.service';

import { LayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  let SideNavToggleServiceSpy: jasmine.SpyObj<SideNavToggleService>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutComponent]
    })
      .compileComponents();
    TestBed.inject(BreakpointObserver);

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
