import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionsService } from 'src/app/core/service/sessions/sessions.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {

  public username!: string;

  constructor(private router: Router, private sessionsService: SessionsService) { }

  ngOnInit(): void {
    this.username = this.sessionsService.getUserName();
  }

  logout() {
    sessionStorage.clear();
    this.router.navigateByUrl('login');
  }
}
