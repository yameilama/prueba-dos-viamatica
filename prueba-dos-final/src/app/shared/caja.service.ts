import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CajaService {

  private baseUrl = 'http://localhost:8080/api';
  private getCajas = 'http://localhost:8080/api/caja/all';
  private urlGetUserCajas = 'http://localhost:8080/api/user/caja/all';
  private urlGetUserWorkingCajas = 'http://localhost:8080/api/caja/users-working/all';
  private urlUpdateCaja = 'http://localhost:8080/api/caja/update';

  private urlAssignTurnoToCaja = 'http://localhost:8080/api/turno/assign-caja';
  private urlGetAllTurnos = 'http://localhost:8080/api/turno/all';

  constructor(private http: HttpClient) { }

  getAllCajas(): Observable<any> {
    return this.http.get(this.getCajas);
  }

  getAllUserCajas(): Observable<any> {
    return this.http.get(this.urlGetUserCajas);
  }

  getAllUsersWorking(): Observable<any> {
    return this.http.get(this.urlGetUserWorkingCajas);
  }

  getAssignedUsersForCaja(cajaId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/caja/${cajaId}`);

  }

  getWorkingUsersForCaja(cajaId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/caja/users-working/${cajaId}`);

  }

  updateCaja(updateCajaDTO: any): Observable<any> {
    return this.http.put(this.urlUpdateCaja, updateCajaDTO);
  }

  assignTurnoToCaja(turnId: number, cajaId: number): Observable<any> {
    const body = { turnId, cajaId };
    return this.http.put(this.urlAssignTurnoToCaja, body);
  }


  getAllTurnos(): Observable<any> {
    return this.http.get(this.urlGetAllTurnos);

  }
}
