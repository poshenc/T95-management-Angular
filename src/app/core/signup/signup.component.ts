import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { SessionsService } from '../service/sessions/sessions.service';
import { UserAccountService } from '../service/user-account/user-account.service';
import { ValidationService } from '../service/validation/validation.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public user: any = {};

  //validation check
  public errorName = false;
  public errorNameDuplicate = false;
  public errorEmail = false;
  public errorPassword = false;
  public errorConfirmPassword = false;
  public errorPasswordSyntax = false;

  constructor(private router: Router, private userAccountService: UserAccountService, private sessionsService: SessionsService, private validationService: ValidationService) { }

  ngOnInit(): void {
  }

  async signup() {
    const isValid = this.validationCheck();
    if (await isValid) {
      //sign up
      const res = await lastValueFrom(this.userAccountService.signup(this.user));

      //sign in immediately
      if (res.status === 200) {
        this.sessionsService.setSession('currentUser', res.body);
        this.router.navigateByUrl('/');
      }
    }
  }

  onKeydown(event: { key: string; }) {
    if (event.key === 'Enter') {
      this.signup();
    }
  }

  async validationCheck(): Promise<boolean> {
    this.errorName = (this.user.name && this.validationService.isValidUserName(this.user.name)) ? false : true;
    this.errorEmail = this.user.email ? false : true;
    this.errorPassword = (this.user.password && this.validationService.isValidPassword(this.user.password)) ? false : true;
    this.errorConfirmPassword = this.user.password === this.user.confirmPassword ? false : true;

    if (!this.errorName) {
      this.errorNameDuplicate = await this.duplicateNameCheck(this.user.name);
    }

    return !this.errorPassword && !this.errorConfirmPassword && !this.errorName && !this.errorNameDuplicate && !this.errorEmail
  }

  async duplicateNameCheck(name: string): Promise<boolean> {
    const res = await lastValueFrom(this.userAccountService.findDuplicate(name));
    const isDuplicated = res.body.result;
    return isDuplicated
  }

  async demo() {
    const demo = {
      name: 'demo001',
      password: 'demo123'
    }
    this.userAccountService.login(demo).subscribe({
      next: (res) => {
        if (res.status === 200) {
          this.sessionsService.setSession('currentUser', res.body);
          this.router.navigateByUrl('/');
        }
      }
    })
  }

}
