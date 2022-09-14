import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  constructor() { }

  setSession(key: string, currentUser: any) {
    if (sessionStorage.getItem('currentUser') !== null) {
      sessionStorage.removeItem('currentUser');
    }
    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
  }

  getCurrentUser() {
    console.log(sessionStorage.getItem('currentUser'));

    return sessionStorage.getItem('currentUser');
  }

  getUserId() {
    return JSON.parse(this.getCurrentUser() as string).id;
  }

  getUserName() {
    return JSON.parse(this.getCurrentUser() as string).name;
  }

  getJWT() {
    return JSON.parse(this.getCurrentUser() as string).jwt;
  }

}
