import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { Navbar } from '../navbar/navbar';

interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  totalStocks: number;
  totalSuppliers: number;
}

interface Product {
  _id: string;
  name: string;
  description?: string;
  category?: string;
  price?: number;
}

interface Category {
  _id: string;
  name: string;
  description?: string;
}

interface Stock {
  _id: string;
  productId?: string;
  quantity?: number;
  product?: Product;
}

interface Supplier {
  _id: string;
  name: string;
  contact?: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, Sidebar, Navbar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private http = inject(HttpClient);
  private router = inject(Router);

  stats: DashboardStats = {
    totalProducts: 0,
    totalCategories: 0,
    totalStocks: 0,
    totalSuppliers: 0,
  };

  recentProducts: Product[] = [];
  recentStocks: Stock[] = [];
  isLoading = true;
  error = '';

  private apiUrl = 'http://localhost:3000/api';

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.isLoading = true;
    this.error = '';

    // Load all data in parallel
    Promise.all([
      this.loadProducts(),
      this.loadCategories(),
      this.loadStocks(),
      this.loadSuppliers(),
    ])
      .then(() => {
        this.isLoading = false;
      })
      .catch((err) => {
        this.isLoading = false;
        this.error = 'Gagal memuat data dashboard. Pastikan backend berjalan.';
        console.error('Dashboard error:', err);
      });
  }

  async loadProducts() {
    try {
      const response: any = await this.http
        .get(`${this.apiUrl}/products`)
        .toPromise();
      if (response.success && response.data) {
        this.stats.totalProducts = response.data.length;
        this.recentProducts = response.data.slice(0, 5);
      } else if (Array.isArray(response)) {
        this.stats.totalProducts = response.length;
        this.recentProducts = response.slice(0, 5);
      }
    } catch (error) {
      console.error('Error loading products:', error);
    }
  }

  async loadCategories() {
    try {
      const response: any = await this.http
        .get(`${this.apiUrl}/categories`)
        .toPromise();
      if (response.success && response.data) {
        this.stats.totalCategories = response.data.length;
      } else if (Array.isArray(response)) {
        this.stats.totalCategories = response.length;
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  }

  async loadStocks() {
    try {
      const response: any = await this.http
        .get(`${this.apiUrl}/stocks`)
        .toPromise();
      if (response.success && response.data) {
        this.stats.totalStocks = response.data.length;
        this.recentStocks = response.data.slice(0, 5);
      } else if (Array.isArray(response)) {
        this.stats.totalStocks = response.length;
        this.recentStocks = response.slice(0, 5);
      }
    } catch (error) {
      console.error('Error loading stocks:', error);
    }
  }

  async loadSuppliers() {
    try {
      const response: any = await this.http
        .get(`${this.apiUrl}/suppliers`)
        .toPromise();
      if (response.success && response.data) {
        this.stats.totalSuppliers = response.data.length;
      } else if (Array.isArray(response)) {
        this.stats.totalSuppliers = response.length;
      }
    } catch (error) {
      console.error('Error loading suppliers:', error);
    }
  }

}
