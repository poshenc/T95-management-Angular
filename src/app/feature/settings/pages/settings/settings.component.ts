import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { SessionsService } from 'src/app/core/service/sessions/sessions.service';
import { SettingsService } from '../../service/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public data: any;

  constructor(private settingsService: SettingsService, private sessionsService: SessionsService, private router: Router) { }

  ngOnInit(): void {
    this.fetchUserInfo();
  }

  async fetchUserInfo() {
    this.data = await lastValueFrom(this.settingsService.fetchUserInfo());
    this.data.password = '';
    this.data.confirmPassword = '';
  }

  async onConfirm() {
    const data = {
      name: this.data.name,
      email: this.data.email,
      password: this.data.password
    }
    await lastValueFrom(this.settingsService.updateUserInfo(data));
    this.sessionsService.setUserName(data.name);
    this.router.navigateByUrl('/');
  }

  checkFields() {
    const valid: boolean = this.data.name !== '' && this.data.email !== '' && this.data.password === this.data.confirmPassword;
    return !valid
  }
}
