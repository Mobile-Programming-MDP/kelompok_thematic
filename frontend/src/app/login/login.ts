import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, MatCardModule, MatInputModule, MatButtonModule, MatIconModule, MatFormFieldModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  user={
    username: '',
    password: ''
  };
  storedUser={
    username: 'test',
    password: 'test123'
  };

  loginValid:boolean=true;

  router=inject(Router);

  validateLogin(username: string, password: string): boolean {
    if (username === this.storedUser.username && password === this.storedUser.password) {
      alert('Login successful!');
      return true;
    } else {
      alert('Invalid username or password.');
      return false;
    }
  }
  
  login() {
    if(this.validateLogin(this.user.username, this.user.password)) {
      localStorage.setItem('loggedInUser', JSON.stringify(this.user.username));
      this.loginValid=true;
      this.router.navigate(['/dashboard']);
    }else{
      // alert('Login failed. Please check your credentials.');
      this.loginValid=false;
    }
  }
}
