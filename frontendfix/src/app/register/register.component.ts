import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  error = '';

  constructor(private router: Router) {}

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.password !== this.confirmPassword) {
      this.error = 'Password tidak cocok';
      return;
    }
    // TODO: Tambahkan logika register ke backend
    this.router.navigate(['/login']);
  }
}
