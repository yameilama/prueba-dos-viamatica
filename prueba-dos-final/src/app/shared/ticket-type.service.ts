import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AttentionType } from '../models/attention-type.model';

@Injectable({
  providedIn: 'root'
})
export class AttentionTypeService {

  private apiUrl = 'http://localhost:8080/api/attention-type';

  constructor(private http: HttpClient) { }

  getAllTicketTypes(): Observable<AttentionType[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<AttentionType[]>(this.apiUrl, { headers });
  }
}
