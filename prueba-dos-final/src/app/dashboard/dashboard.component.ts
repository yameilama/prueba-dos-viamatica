import { Component } from '@angular/core';
import { UserServiceService } from '../shared/user-service.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  users: any = [];
  message: string | null = null;

  constructor(private userService: UserServiceService, private notificationService: NotificationService,) { }

  ngOnInit() {
    this.fetchUsers();
    this.notificationService.currentMessage.subscribe(message => this.message = message);

  }

  fetchUsers(): void {
    this.userService.getUsers().subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.log('Error:', error);
      }
    );
  }

  ngOnDestroy() {
    this.notificationService.clearMessage();

  }

}
