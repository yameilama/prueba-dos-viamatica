import { Component } from '@angular/core';
import { RoleService } from '../../shared/role.service';
import { UserServiceService } from '../../shared/user-service.service';
import { NotificationService } from '../../shared/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent {
  user = {
    username: '',
    email: '',
    password: '',
    rolId: ''
  };

  roles: any = [];

  constructor(private roleService: RoleService, private userService: UserServiceService,
    private notificationService: NotificationService, private router: Router,) { }

  ngOnInit() {
    this.fetchRoles();
  }
  fetchRoles(): void {
    this.roleService.getRoles().subscribe(
      data => {
        this.roles = data;
        console.log("roles: ", this.roles);
      },
      error => console.error('Error buscando los roles:', error)
    );
  }

  onSubmit() {
    this.userService.addUser(this.user).subscribe(
      response => {
        console.log("Usuario agregado:", response);
        this.notificationService.setMessage('Usuario agregado con éxito.');
        this.router.navigate(['/dashboard']);
      },
      error => {
        console.error("Error agregando usuario:", error);
        this.notificationService.setMessage('Usuario agregado con éxito.');
        this.router.navigate(['/dashboard']);
      }
    );
  }
}
