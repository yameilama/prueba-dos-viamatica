import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CajaService } from '../../shared/caja.service';

@Component({
  selector: 'app-asignar-turno',
  templateUrl: './asignar-turno.component.html',
  styleUrl: './asignar-turno.component.css'
})
export class AsignarTurnoComponent implements OnInit {
  cajas: any[] = [];
  cajaId: number;
  turnId: number;


  constructor(
    private cajaService: CajaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit() {
    this.turnId = +this.route.snapshot.params['turnId'];
    console.log('Retrieved Turn ID:', this.turnId);
    this.fetchCajas();
  }

  fetchCajas(): void {
    this.cajaService.getAllCajas().subscribe(
      data => {
        this.cajas = data;
        console.log("cajas: ", this.cajas);
      },
      error => console.error('Error buscando las cajas:', error)
    );
  }

  submitAssignment() {
    console.log('Selected Caja ID:', this.cajaId);
    console.log('Turn ID:', this.turnId);
    if (!this.cajaId) {
      alert('Selecciona una caja.');
      return;
    }

    this.cajaService.assignTurnoToCaja(this.turnId, this.cajaId).subscribe({
      next: (response) => {
        console.log('Turno asignado', response);
        this.router.navigate(['/usuario-gestor']);
      },
      error: (error) => {
        console.error('Error asignando turno a caja', error);
        this.router.navigate(['/usuario-gestor']);

      }
    });
  }

}
