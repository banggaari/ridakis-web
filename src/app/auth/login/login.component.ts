import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  loginValid = true;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  async onLogin() {
    const { email, password } = this.loginForm.value;
    if (email && password) {
      this.authService.login(email, password)
        .subscribe({
          next: () => {
            // Jika login berhasil, lakukan tindakan yang diinginkan, misalnya navigasi ke halaman lain
            this.router.navigate(['presensi']);
          },
          error: (error: any) => {
            // Tangani error saat login gagal
            console.log(error)
          }
        });
    } else {
      // Jika email atau password kosong, tampilkan pesan atau lakukan tindakan yang sesuai
      console.log('Email dan password harus diisi.');
    }
  }


}
