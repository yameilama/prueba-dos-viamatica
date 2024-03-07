import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-usuario-gestor',
  templateUrl: './usuario-gestor.component.html',
  styleUrl: './usuario-gestor.component.css'
})
export class UsuarioGestorComponent implements OnInit {
  username: string | null = '';

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
