import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  private router = inject(Router);
  
  user: any = null;
  isMenuOpen = false;
  pageTitle = 'Dashboard';

  ngOnInit() {
    // Load user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        this.user = JSON.parse(userData);
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }

    // Update page title based on route
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const url = event.urlAfterRedirects;
      if (url.includes('/dashboard')) {
        this.pageTitle = 'Dashboard';
      } else if (url.includes('/products')) {
        this.pageTitle = 'Manajemen Produk';
      } else if (url.includes('/categories')) {
        this.pageTitle = 'Manajemen Kategori';
      } else if (url.includes('/stocks')) {
        this.pageTitle = 'Manajemen Stok';
      } else if (url.includes('/suppliers')) {
        this.pageTitle = 'Manajemen Supplier';
      } else if (url.includes('/stock-out')) {
        this.pageTitle = 'Keluarkan Stok';
      }
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  getUserName(): string {
    return this.user?.name || this.user?.email || 'User';
  }

  getUserInitials(): string {
    const name = this.getUserName();
    return name.charAt(0).toUpperCase();
  }
}
