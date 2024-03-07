import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse } from '../models/login-response.model';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: string = '';
  message: string | null = null;
  constructor(private http: HttpClient, private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.notificationService.currentMessage.subscribe(message => this.message = message);
  }

  onLogin() {
    const loginPayload = {
      usernameOrEmail: this.username,
      password: this.password
    };
    console.log("login payload:", loginPayload);
    this.http.post<LoginResponse>('http://localhost:8080/api/login', loginPayload)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.loginError = 'Usuario o contraseña incorrectos.';
          } else {
            this.loginError = 'Error en el servidor. Inténtelo de nuevo más tarde.';
          }
          return throwError(error);
        })
      )
      .subscribe(
        response => {
          console.log('Response from server:', response);
          localStorage.setItem('token', response.accessToken);
          console.log('User logged in', response);
          this.authService.setLoggedInUser(response.username);
          if (response.roles.includes('ADMINISTRADOR')) {
            this.router.navigate(['/welcome']);
          } else if (response.roles.includes('CLIENTE')) {
            this.router.navigate(['/clients']);
          } else if (response.roles.includes('GESTOR')) {
            this.router.navigate(['/usuario-gestor']);
          }
          else if (response.roles.includes('CAJERO')) {
            this.router.navigate(['/usuario-caja']);
          }
        },
        error => {
          console.error('Login failed', error);
        }
      );
  }

  ngOnDestroy() {
    this.notificationService.clearMessage();

  }
}
