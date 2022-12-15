import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionsService } from '../service/sessions/sessions.service';
import { UserAccountService } from '../service/user-account/user-account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: any = {};
  public error = false;

  constructor(private router: Router, private userAccountService: UserAccountService, private sessionsService: SessionsService) { }

  ngOnInit(): void {
  }

  async login() {
    this.error = false;
    this.user = {
      name: this.user.name,
      password: this.user.password,
    }

    this.userAccountService.login(this.user).subscribe({
      next: (res) => {
        if (res.status === 200) {
          this.sessionsService.setSession('currentUser', res.body);
          this.router.navigateByUrl('/');
        }
      },
      error: (msg) => {
        this.error = msg.error === "Wrong credentials" ?? true;
      }
    })
  }

  onKeydown(event: { key: string; }) {
    if (event.key === 'Enter') {
      this.login();
    }
  }

}
