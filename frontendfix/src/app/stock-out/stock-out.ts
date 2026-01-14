import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../sidebar/sidebar';
import { Navbar } from '../navbar/navbar';

interface Product {
  _id: string;
  name: string;
  sku?: string;
  quantity?: number;
}

@Component({
  selector: 'app-stock-out',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, Sidebar, Navbar],
  templateUrl: './stock-out.html',
  styleUrl: './stock-out.css',
})
export class StockOut implements OnInit {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api';

  products: Product[] = [];
  isLoading = true;
  error = '';
  success = '';
  showModal = false;
  selectedProduct: Product | null = null;

  stockOutForm = {
    product: '',
    quantity: 0,
    description: ''
  };

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading = true;
    this.error = '';
    this.http.get(`${this.apiUrl}/products`).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        if (response.success && response.data) {
          this.products = response.data.filter((p: Product) => (p.quantity || 0) > 0);
        } else if (Array.isArray(response)) {
          this.products = response.filter((p: Product) => (p.quantity || 0) > 0);
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.error = 'Gagal memuat data produk. Pastikan backend berjalan.';
        console.error('Error loading products:', err);
      }
    });
  }

  openModal(product: Product) {
    this.selectedProduct = product;
    this.stockOutForm = {
      product: product._id,
      quantity: 0,
      description: ''
    };
    this.error = '';
    this.success = '';
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedProduct = null;
    this.stockOutForm = {
      product: '',
      quantity: 0,
      description: ''
    };
  }

  submitStockOut() {
    if (!this.stockOutForm.product || !this.stockOutForm.quantity || this.stockOutForm.quantity <= 0) {
      this.error = 'Produk dan jumlah harus diisi';
      return;
    }

    const selectedProduct = this.products.find(p => p._id === this.stockOutForm.product);
    if (selectedProduct && (selectedProduct.quantity || 0) < this.stockOutForm.quantity) {
      this.error = `Stok tidak mencukupi. Stok tersedia: ${selectedProduct.quantity}`;
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      this.error = 'Anda harus login terlebih dahulu';
      return;
    }

    this.error = '';
    this.success = '';

    // Kirim ke endpoint khusus keluarkan stok
    this.http.post(`${this.apiUrl}/stocks/out`, this.stockOutForm, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (response: any) => {
        this.success = response.message || 'Stok berhasil dikeluarkan';
        this.closeModal();
        this.loadProducts();
        setTimeout(() => {
          this.success = '';
        }, 3000);
      },
      error: (err) => {
        this.error = err.error?.message || 'Gagal mengeluarkan stok';
        console.error('Error stock out:', err);
      }
    });
  }

  getAvailableStock(productId: string): number {
    const product = this.products.find(p => p._id === productId);
    return product?.quantity || 0;
  }
}
