import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../sidebar/sidebar';
import { Navbar } from '../navbar/navbar';

interface Category {
  _id: string;
  name: string;
  description?: string;
}

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, Sidebar, Navbar],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories implements OnInit {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api';

  categories: Category[] = [];
  isLoading = true;
  error = '';
  showModal = false;
  editingCategory: Category | null = null;

  categoryForm = {
    name: '',
    description: ''
  };

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.isLoading = true;
    this.error = '';
    this.http.get(`${this.apiUrl}/categories`).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        if (response.success && response.data) {
          this.categories = response.data;
        } else if (Array.isArray(response)) {
          this.categories = response;
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.error = 'Gagal memuat data kategori. Pastikan backend berjalan.';
        console.error('Error loading categories:', err);
      }
    });
  }

  openAddModal() {
    this.editingCategory = null;
    this.categoryForm = { name: '', description: '' };
    this.showModal = true;
  }

  openEditModal(category: Category) {
    this.editingCategory = category;
    this.categoryForm = {
      name: category.name || '',
      description: category.description || ''
    };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.editingCategory = null;
  }

  saveCategory() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.error = 'Anda harus login terlebih dahulu';
      return;
    }

    const url = this.editingCategory
      ? `${this.apiUrl}/categories/${this.editingCategory._id}`
      : `${this.apiUrl}/categories`;

    const method = this.editingCategory ? 'put' : 'post';

    this.http[method](url, this.categoryForm, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => {
        this.closeModal();
        this.loadCategories();
      },
      error: (err) => {
        this.error = err.error?.message || 'Gagal menyimpan kategori';
        console.error('Error saving category:', err);
      }
    });
  }

  deleteCategory(id: string) {
    if (!confirm('Apakah Anda yakin ingin menghapus kategori ini?')) {
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      this.error = 'Anda harus login terlebih dahulu';
      return;
    }

    this.http.delete(`${this.apiUrl}/categories/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => {
        this.loadCategories();
      },
      error: (err) => {
        this.error = err.error?.message || 'Gagal menghapus kategori';
        console.error('Error deleting category:', err);
      }
    });
  }
}
