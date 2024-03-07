import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private baseUrl = 'http://localhost:8080/api/dashboard/users';
  private addUserUrl = 'http://localhost:8080/api/user/add'

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  addUser(user: any): Observable<any> {
    return this.http.post(this.addUserUrl, user);
  }
}
