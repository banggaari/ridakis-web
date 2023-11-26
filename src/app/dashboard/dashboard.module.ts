import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresensiComponent } from './presensi/presensi.component';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    PresensiComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class DashboardModule { }
