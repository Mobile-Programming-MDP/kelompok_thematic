import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private router: Router) {}

  onSubmit(event: Event) {
    event.preventDefault();
    // TODO: Tambahkan logika autentikasi ke backend
    if (this.email === 'admin@example.com' && this.password === 'admin') {
      this.router.navigate(['/']);
    } else {
      this.error = 'Email atau password salah';
    }
  }
}
