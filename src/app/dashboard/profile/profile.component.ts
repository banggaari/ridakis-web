import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Profile } from './profile.model';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  data: Profile[] = [];

  constructor(private apiService: ApiService, private http: HttpClient) { }

  ngOnInit() {
    this.getData();
  }

    getData() {
      this.apiService.getDataEselon1()
        .pipe()
        .subscribe((response : any)  => {
          this.data = response.data;
          // Lakukan sesuatu dengan data yang didapatkan
        });
    }
  }
