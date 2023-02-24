import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { SettingsService } from '../../service/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public data = {
    password: '',
    confirmPassword: ''
  };

  constructor(private settingsService: SettingsService, private router: Router) { }

  ngOnInit(): void {
  }

  async onConfirm() {
    const data = {
      password: this.data.password
    }
    await lastValueFrom(this.settingsService.changePassword(data));
    this.router.navigateByUrl('/');
  }

  checkFields() {
    const valid: boolean = this.data.password.length > 0 && this.data.confirmPassword.length > 0 && this.data.password === this.data.confirmPassword;
    return !valid
  }

}
