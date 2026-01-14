import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  department = '';
  error = '';
  success = '';
  isLoading = false;

  private http = inject(HttpClient);
  constructor(private router: Router) {}

  onSubmit(event: Event) {
    event.preventDefault();
    this.error = '';
    this.success = '';

    // Validasi password match
    if (this.password !== this.confirmPassword) {
      this.error = 'Password tidak cocok';
      return;
    }

    // Validasi password length
    if (this.password.length < 6) {
      this.error = 'Password minimal 6 karakter';
      return;
    }

    this.isLoading = true;

    // Kirim data ke backend
    const url = 'http://localhost:3000/api/auth/register';
    const registerData: any = {
      name: this.name,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
      role: 'user' // Default role untuk user baru
    };

    // Tambahkan department jika diisi
    if (this.department.trim()) {
      registerData.department = this.department.trim();
    }

    this.http.post(url, registerData).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        if (response.success) {
          this.success = response.message || 'Registrasi berhasil! Silakan login.';
          // Redirect ke login setelah 2 detik
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        } else {
          this.error = response.message || 'Registrasi gagal';
        }
      },
      error: (err) => {
        this.isLoading = false;
        // Handle error response dari backend
        if (err.error && err.error.message) {
          this.error = err.error.message;
        } else if (err.error && err.error.error) {
          this.error = err.error.error;
        } else {
          this.error = 'Terjadi kesalahan saat registrasi. Pastikan backend berjalan.';
        }
        console.error('Registration error:', err);
      }
    });
  }
}
