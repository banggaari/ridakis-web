import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from './dashboard/profile/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://api.sikadirklhk.id';

  private headers = new HttpHeaders({
    'accept': 'application/json',
    'authorization': 'Basic YWRtaW46c3VwZXJzZWNyZXQ=',
    'X-Requested-With' : 'XMLHttpRequest'
  });

  constructor(private http: HttpClient) { }

  getDataEselon1(): Observable<Profile[]> {
    const url = `${this.baseUrl}/getData/eselon1`;
    return this.http.get<Profile[]>(url, { headers: this.headers });
  }
}
