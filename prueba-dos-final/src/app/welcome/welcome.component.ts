import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit {
  username: string | null = '';
  lastLogin: any = {};

  constructor(
    private authService: AuthService,

  ) { }

  ngOnInit() {
    this.username = this.authService.getLoggedInUser();
  }



  logout() {
    this.authService.logout();
  }
}
