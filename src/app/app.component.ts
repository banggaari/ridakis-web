import { Component } from '@angular/core';
import { AuthService } from '../app/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private authService: AuthService
  ) {}
  title = 'Ridakis';
  public isAuthenticated = false;


  public ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((isAuth: boolean) => {
      this.isAuthenticated = isAuth;
    });
  }

  public logout(): void {
    this.auth.signOut().then(() => this.router.navigate(['login']));
    this.isAuthenticated = false;
  }
}
