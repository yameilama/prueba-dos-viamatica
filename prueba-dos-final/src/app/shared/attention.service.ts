import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Attention } from '../models/attention.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttentionService {

  private apiUrlGenerate = 'http://localhost:8080/api/attention-type/generate';
  private apiUrlMyAttention = 'http://localhost:8080/api/attention-type/my-attention';
  private apiUrlGetAll = 'http://localhost:8080/api/attention-type/all';

  constructor(private http: HttpClient) { }

  createAttention(attention: Attention) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Attention>(this.apiUrlGenerate, attention, { headers });
  }

  getMyAttentions(): Observable<Attention[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Attention[]>(this.apiUrlMyAttention, { headers });
  }


  getAll(): Observable<Attention[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Attention[]>(this.apiUrlGetAll, { headers });
  }

}
