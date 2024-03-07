import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private baseUrl = 'http://localhost:8080/api/rol/all';

  constructor(private http: HttpClient) { }

  getRoles(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
}
