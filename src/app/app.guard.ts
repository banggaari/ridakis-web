import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { Observable, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated$.pipe(
      take(1), // Ambil satu nilai kemudian berhenti langganan
      map(isAuthenticated => {
        if (!isAuthenticated) {
          // Jika pengguna tidak terotentikasi, arahkan ke halaman login
          this.router.navigate(['login']);
        }
        return isAuthenticated; // Kembalikan nilai boolean yang sesuai untuk canActivate
      })
    );
  }
}
