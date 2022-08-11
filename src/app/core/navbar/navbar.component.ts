import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SideNavToggleService } from '../service/sidenav-toggle/side-nav-toggle.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public toggle$: Observable<boolean> | undefined;

  constructor(public toggle: SideNavToggleService) { }

  ngOnInit(): void {
    this.toggle$ = this.toggle.sideNavState$;
  }

}
