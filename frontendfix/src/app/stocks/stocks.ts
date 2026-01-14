import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../sidebar/sidebar';
import { Navbar } from '../navbar/navbar';

interface Stock {
  _id: string;
  product?: {
    _id: string;
    name: string;
    sku?: string;
  };
  type: 'in' | 'out';
  quantity: number;
  description?: string;
  recordedBy?: {
    name: string;
  };
  createdAt?: string;
}

interface Product {
  _id: string;
  name: string;
  sku?: string;
}

@Component({
  selector: 'app-stocks',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, Sidebar, Navbar],
  templateUrl: './stocks.html',
  styleUrl: './stocks.css',
})
export class Stocks implements OnInit {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api';

  stocks: Stock[] = [];
  products: Product[] = [];
  isLoading = true;
  error = '';
  showModal = false;

  stockForm = {
    product: '',
    type: 'in' as 'in' | 'out',
    quantity: 0,
    description: ''
  };

  ngOnInit() {
    this.loadStocks();
    this.loadProducts();
  }

  loadStocks() {
    this.isLoading = true;
    this.error = '';
    this.http.get(`${this.apiUrl}/stocks`).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        if (response.success && response.data) {
          this.stocks = response.data;
        } else if (Array.isArray(response)) {
          this.stocks = response;
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.error = 'Gagal memuat data stok. Pastikan backend berjalan.';
        console.error('Error loading stocks:', err);
      }
    });
  }

  loadProducts() {
    this.http.get(`${this.apiUrl}/products`).subscribe({
      next: (response: any) => {
        if (response.success && response.data) {
          this.products = response.data;
        } else if (Array.isArray(response)) {
          this.products = response;
        }
      },
      error: (err) => {
        console.error('Error loading products:', err);
      }
    });
  }

  openAddModal() {
    this.stockForm = {
      product: '',
      type: 'in',
      quantity: 0,
      description: ''
    };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveStock() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.error = 'Anda harus login terlebih dahulu';
      return;
    }

    this.http.post(`${this.apiUrl}/stocks`, this.stockForm, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => {
        this.closeModal();
        this.loadStocks();
      },
      error: (err) => {
        this.error = err.error?.message || 'Gagal menyimpan stok';
        console.error('Error saving stock:', err);
      }
    });
  }

  getTypeLabel(type: string): string {
    return type === 'in' ? 'Masuk' : 'Keluar';
  }

  getTypeClass(type: string): string {
    return type === 'in' ? 'type-in' : 'type-out';
  }
}
