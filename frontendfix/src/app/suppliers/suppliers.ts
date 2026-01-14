import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../sidebar/sidebar';
import { Navbar } from '../navbar/navbar';

interface Supplier {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
}

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, Sidebar, Navbar],
  templateUrl: './suppliers.html',
  styleUrl: './suppliers.css',
})
export class Suppliers implements OnInit {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api';

  suppliers: Supplier[] = [];
  isLoading = true;
  error = '';
  showModal = false;
  editingSupplier: Supplier | null = null;

  supplierForm = {
    name: '',
    email: '',
    phone: '',
    address: '',
    city: ''
  };

  ngOnInit() {
    this.loadSuppliers();
  }

  loadSuppliers() {
    this.isLoading = true;
    this.error = '';
    this.http.get(`${this.apiUrl}/suppliers`).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        if (response.success && response.data) {
          this.suppliers = response.data;
        } else if (Array.isArray(response)) {
          this.suppliers = response;
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.error = 'Gagal memuat data supplier. Pastikan backend berjalan.';
        console.error('Error loading suppliers:', err);
      }
    });
  }

  openAddModal() {
    this.editingSupplier = null;
    this.supplierForm = {
      name: '',
      email: '',
      phone: '',
      address: '',
      city: ''
    };
    this.showModal = true;
  }

  openEditModal(supplier: Supplier) {
    this.editingSupplier = supplier;
    this.supplierForm = {
      name: supplier.name || '',
      email: supplier.email || '',
      phone: supplier.phone || '',
      address: supplier.address || '',
      city: supplier.city || ''
    };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.editingSupplier = null;
  }

  saveSupplier() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.error = 'Anda harus login terlebih dahulu';
      return;
    }

    const url = this.editingSupplier
      ? `${this.apiUrl}/suppliers/${this.editingSupplier._id}`
      : `${this.apiUrl}/suppliers`;

    const method = this.editingSupplier ? 'put' : 'post';

    this.http[method](url, this.supplierForm, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => {
        this.closeModal();
        this.loadSuppliers();
      },
      error: (err) => {
        this.error = err.error?.message || 'Gagal menyimpan supplier';
        console.error('Error saving supplier:', err);
      }
    });
  }

  deleteSupplier(id: string) {
    if (!confirm('Apakah Anda yakin ingin menghapus supplier ini?')) {
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      this.error = 'Anda harus login terlebih dahulu';
      return;
    }

    this.http.delete(`${this.apiUrl}/suppliers/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => {
        this.loadSuppliers();
      },
      error: (err) => {
        this.error = err.error?.message || 'Gagal menghapus supplier';
        console.error('Error deleting supplier:', err);
      }
    });
  }
}
