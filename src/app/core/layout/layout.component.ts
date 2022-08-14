import { Component, OnInit } from '@angular/core';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { SideNavToggleService } from '../service/sidenav-toggle/side-nav-toggle.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  public toggle$: Observable<boolean> | undefined;
  public isSmallScreen: boolean | undefined;

  readonly breakpoint$ = this.breakpointObserver.observe(['(min-width: 1024px)', '(min-width: 1365px)', '(max-width: 1023px)']).pipe(distinctUntilChanged());

  constructor(private breakpointObserver: BreakpointObserver, public toggle: SideNavToggleService) { }

  ngOnInit(): void {
    this.breakpoint$.subscribe(() =>
      this.breakpointChanged()
    );
    this.toggle$ = this.toggle.sideNavState$;
  }

  private breakpointChanged() {
    if (this.breakpointObserver.isMatched('(min-width: 1365px)')) {
      this.toggle.toggleSideNavExpand();
      this.isSmallScreen = false;
    } else if (this.breakpointObserver.isMatched('(min-width: 1024px)')) {
      this.toggle.toggleSideNavCollapse();
      this.isSmallScreen = false;
    } else if (this.breakpointObserver.isMatched('(max-width: 1023px)')) {
      this.isSmallScreen = true;
    }
  }

}
