import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private http: HttpClient, private router: Router, private notificationService: NotificationService) { }

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    identification: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern(/^\d{10,13}$/),
    ])),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      Validators.pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/
      )
    ]),
    password: new FormControl('', [Validators.required,
    Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*\W)[^\s]{8,}$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^09\d{8}$/)
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(20),
      Validators.maxLength(100)
    ]),
    addressReference: new FormControl('', [
      Validators.minLength(20),
      Validators.maxLength(100)
    ]),


  });

  numericInputOnly(event: any): void {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }

    let input = event.target;
    input.value = input.value.replace(/[^0-9]+/g, '');
  }


  get username() {
    return this.registerForm.get('username');
  }
  onRegister() {
    if (this.registerForm.valid) {

      const url = 'http://localhost:8080/api/register';

      const payload = {
        ...this.registerForm.value,
        email: this.registerForm.get('email').value
      };


      console.log('Sending registration data:', payload);


      this.http.post(url, this.registerForm.value).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          this.notificationService.setMessage('Inicia sesión con tus credenciales.');
          this.router.navigate(['/login']);

        },
        error: (error) => {
          console.error('Registration failed', error);
          this.notificationService.setMessage('Inicia sesión con tus credenciales.');
          this.router.navigate(['/login']);
        }
      });
    }
  }

}
