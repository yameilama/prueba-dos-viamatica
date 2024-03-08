import { Component } from '@angular/core';
import { CajaService } from '../../shared/caja.service';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrl: './caja.component.css'
})
export class CajaComponent {

  constructor(private cajaService: CajaService, private router: Router) { }


  userCajasWithWorkingGroupedByCaja: any = [];
  turnosByCaja: any = {};



  ngOnInit() {

    this.fetchUserCajasAndWorking();
    this.fetchTurnos();

  }

  fetchTurnos(): void {
    this.cajaService.getAllTurnos().subscribe({
      next: (turnos) => {
        this.turnosByCaja = this.groupTurnosByCaja(turnos);
        console.log("Turnos grouped by Caja: ", this.turnosByCaja);
      },
      error: error => console.error('Error fetching turnos:', error)
    });
  }

  groupTurnosByCaja(turnos) {
    const grouped = {};
    turnos.forEach(turno => {
      const cajaId = turno.caja ? turno.caja.cajaId : 'NoCaja';
      if (!grouped[cajaId]) {
        grouped[cajaId] = [];
      }
      grouped[cajaId].push(turno);
    });
    return grouped;
  }

  editCaja(cajaId: number, cajaData?: any) {
    console.log(cajaId, cajaData);

    this.router.navigate(['/caja-edit', cajaId], { state: { cajaData } });

  }

  fetchUserCajasAndWorking(): void {
    forkJoin({
      userCajas: this.cajaService.getAllUserCajas(),
      usersWorking: this.cajaService.getAllUsersWorking(),
      turnos: this.cajaService.getAllTurnos()
    }).subscribe({
      next: ({ userCajas, usersWorking, turnos }) => {
        console.log("userCajas:", userCajas, "usersWorking:", usersWorking, "Turnos:", turnos);

        this.userCajasWithWorkingGroupedByCaja = this.processData(userCajas, usersWorking);
        this.turnosByCaja = this.groupTurnosByCaja(turnos);

        this.mergeTurnosWithUserCajas();
        console.log("Data con Turnos: ", this.userCajasWithWorkingGroupedByCaja);
      },
      error: error => console.error('Error buscando data:', error)
    });
  }


  processData(userCajas, usersWorking) {
    const grouped = {};

    userCajas.forEach(userCaja => {
      const cajaId = userCaja.caja.cajaId;
      if (!grouped[cajaId]) {
        grouped[cajaId] = {
          caja: userCaja.caja,
          assignedUsers: [],
          workingUsers: []
        };
      }
      grouped[cajaId].assignedUsers.push(userCaja.user.username);
    });

    usersWorking.forEach(userWorking => {
      const cajaId = userWorking.caja.cajaId;
      if (grouped[cajaId]) {
        grouped[cajaId].workingUsers.push(userWorking.user.username);
      } else {
        grouped[cajaId] = {
          caja: userWorking.caja,
          assignedUsers: [],
          workingUsers: [userWorking.user.username]
        };
      }
    });

    return Object.values(grouped);
  }

  mergeTurnosWithUserCajas() {
    this.userCajasWithWorkingGroupedByCaja.forEach(group => {
      const cajaId = group.caja.cajaId;
      group.turnos = this.turnosByCaja[cajaId] || [];
    });
  }

}
