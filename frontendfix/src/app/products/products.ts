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
  description?: string;
  category?: string;
  price?: number;
  quantity?: number;
  sku?: string;
  image?: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, Sidebar, Navbar],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api';

  products: Product[] = [];
  isLoading = true;
  error = '';
  showModal = false;
  editingProduct: Product | null = null;

  productForm = {
    name: '',
    description: '',
    category: '',
    price: 0,
    quantity: 0,
    sku: ''
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
          this.products = response.data;
        } else if (Array.isArray(response)) {
          this.products = response;
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.error = 'Gagal memuat data produk. Pastikan backend berjalan.';
        console.error('Error loading products:', err);
      }
    });
  }

  openAddModal() {
    this.editingProduct = null;
    this.productForm = {
      name: '',
      description: '',
      category: '',
      price: 0,
      quantity: 0,
      sku: ''
    };
    this.showModal = true;
  }

  openEditModal(product: Product) {
    this.editingProduct = product;
    this.productForm = {
      name: product.name || '',
      description: product.description || '',
      category: product.category || '',
      price: product.price || 0,
      quantity: product.quantity || 0,
      sku: product.sku || ''
    };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.editingProduct = null;
  }

  saveProduct() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.error = 'Anda harus login terlebih dahulu';
      return;
    }

    const url = this.editingProduct
      ? `${this.apiUrl}/products/${this.editingProduct._id}`
      : `${this.apiUrl}/products`;

    const method = this.editingProduct ? 'put' : 'post';

    this.http[method](url, this.productForm, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => {
        this.closeModal();
        this.loadProducts();
      },
      error: (err) => {
        this.error = err.error?.message || 'Gagal menyimpan produk';
        console.error('Error saving product:', err);
      }
    });
  }

  deleteProduct(id: string) {
    if (!confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      this.error = 'Anda harus login terlebih dahulu';
      return;
    }

    this.http.delete(`${this.apiUrl}/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => {
        this.loadProducts();
      },
      error: (err) => {
        this.error = err.error?.message || 'Gagal menghapus produk';
        console.error('Error deleting product:', err);
      }
    });
  }
}
