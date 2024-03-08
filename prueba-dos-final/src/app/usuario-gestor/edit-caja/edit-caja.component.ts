import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CajaService } from '../../shared/caja.service';
import { UserServiceService } from '../../shared/user-service.service';
declare var $: any;

@Component({
  selector: 'app-edit-caja',
  templateUrl: './edit-caja.component.html',
  styleUrl: './edit-caja.component.css'
})
export class EditCajaComponent implements OnInit {
  cajaData: any;
  cajaId: number;
  allUsers: any[] = [];
  selectedAssignedUsers: any[] = [];
  selectedWorkingUsers: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cajaService: CajaService,
    private userService: UserServiceService,


  ) { }


  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    this.cajaData = navigation?.extras.state?.cajaData;
    this.cajaId = +this.route.snapshot.params['cajaId'];

    this.fetchAllUsers();
    if (this.cajaId) {
      this.fetchCajaState();
    }
  }

  fetchAllUsers() {

    this.userService.getUsers().subscribe(users => {
      this.allUsers = users;
    });
  }

  fetchCajaState() {
    this.cajaService.getAssignedUsersForCaja(this.cajaId).subscribe((assignedUsers) => {
      this.selectedAssignedUsers = assignedUsers.map(uc => uc.user.userId);
    });

    this.cajaService.getWorkingUsersForCaja(this.cajaId).subscribe((workingUsers) => {
      this.selectedWorkingUsers = workingUsers.map(uc => uc.user.userId);
    });
  }
  onAssignedUsersChange(event) {
    console.log('Assigned Users Changed: ', this.selectedAssignedUsers);
  }

  onWorkingUsersChange(event) {
    console.log('Working Users Changed: ', this.selectedWorkingUsers);
  }


  submitForm() {
    const updateCajaDTO = {
      cajaId: this.cajaId,
      assignedUserIds: this.selectedAssignedUsers,
      workingUserIds: this.selectedWorkingUsers
    };

    this.cajaService.updateCaja(updateCajaDTO).subscribe({
      next: (response) => {
        this.router.navigate(['/caja']);
        console.log('Caja updated successfully', response);

      },
      error: (error) => {
        this.router.navigate(['/caja']);
        console.error('Failed to update caja', error);

      }
    });

  }

}
