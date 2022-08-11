import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideNavToggleService {
  public sideNavState$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  toggleSideNav() {
    this.sideNavState$.next(!this.sideNavState$.getValue());
  }
}
