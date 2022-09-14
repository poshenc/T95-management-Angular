import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { SessionsService } from '../service/sessions/sessions.service';
import { UserAccountService } from '../service/user-account/user-account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: any = {};

  constructor(private router: Router, private userAccountService: UserAccountService, private sessionsService: SessionsService) { }

  ngOnInit(): void {
  }

  async login() {
    try {
      this.user = {
        name: this.user.name,
        password: this.user.password,
      }

      const res: any = await lastValueFrom(this.userAccountService.login(this.user));

      if (res.status === 200) {
        this.sessionsService.setSession('currentUser', res.body);
        this.router.navigateByUrl('/');
      }

    } catch (err) {
      console.log(err);
    }
  }

  onKeydown(event: { key: string; }) {
    if (event.key === 'Enter') {
      this.login();
    }
  }

}
