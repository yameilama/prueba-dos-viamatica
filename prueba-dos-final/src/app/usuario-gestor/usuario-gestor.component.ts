import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AttentionService } from '../shared/attention.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-gestor',
  templateUrl: './usuario-gestor.component.html',
  styleUrl: './usuario-gestor.component.css'
})
export class UsuarioGestorComponent implements OnInit {
  username: string | null = '';
  allAttention: any[] = [];

  constructor(
    private authService: AuthService,
    private attentionService: AttentionService,
    private router: Router
  ) { }

  ngOnInit() {
    this.username = this.authService.getLoggedInUser();
    this.fetchAll();
  }

  fetchAll() {

    this.attentionService.getAll().subscribe(attention => {
      console.log(attention);
      this.allAttention = attention;
    });
  }

  onClick(attentionId: number, attentionData?: any) {
    console.log(attentionId, attentionData);

    this.router.navigate(['/asignar-turno', attentionId], { state: { attentionData } });

  }


  logout() {
    this.authService.logout();
  }
}
