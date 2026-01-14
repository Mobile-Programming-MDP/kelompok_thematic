import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  isLoading = false;

  private http = inject(HttpClient);
  constructor(private router: Router) {}

  onSubmit(event: Event) {
    event.preventDefault();
    this.error = '';
    this.isLoading = true;

    // Kirim data ke backend
    const url = 'http://localhost:3000/api/auth/login';
    this.http.post(url, {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        if (response.success) {
          // Simpan token dan user data ke localStorage
          if (response.data.token) {
            localStorage.setItem('token', response.data.token);
          }
          if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
          }
          // Redirect ke dashboard
          this.router.navigate(['/dashboard']);
        } else {
          this.error = response.message || 'Login gagal';
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
          this.error = 'Email atau password salah. Pastikan backend berjalan.';
        }
        console.error('Login error:', err);
      }
    });
  }
}
