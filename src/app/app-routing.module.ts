import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { PresensiComponent } from './dashboard/presensi/presensi.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { AppGuard } from './app.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    component: PresensiComponent,
    canActivate : [AppGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate : [AppGuard]
  },
  {
    path: 'presensi',
    component: PresensiComponent,
    canActivate : [AppGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
