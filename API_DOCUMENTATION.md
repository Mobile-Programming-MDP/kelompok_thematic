# 📦 SISTEM INVENTARIS BARANG - API Documentation

## 🚀 Setup

```bash
cd backend
npm install
npm run dev
```

Server berjalan di `http://localhost:3000`

---

## 🔐 AUTHENTICATION ENDPOINTS

### 1. Register User
```
POST http://localhost:3000/api/auth/register
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Admin",
  "email": "admin@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "role": "admin",
  "department": "IT"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Admin",
    "email": "admin@example.com",
    "role": "admin",
    "department": "IT"
  }
}
```

---

### 2. Login
```
POST http://localhost:3000/api/auth/login
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Admin",
    "email": "admin@example.com",
    "role": "admin",
    "department": "IT",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### 3. Get Profile
```
GET http://localhost:3000/api/auth/profile
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Admin",
    "email": "admin@example.com",
    "role": "admin",
    "department": "IT",
    "isActive": true
  }
}
```

---

### 4. Logout
```
POST http://localhost:3000/api/auth/logout
```

**Response (200):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

## 👥 USER MANAGEMENT ENDPOINTS

### 1. Get All Users
```
GET http://localhost:3000/api/users
```

**Response (200):**
```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Admin",
      "email": "admin@example.com",
      "role": "admin",
      "department": "IT",
      "isActive": true
    }
  ]
}
```

---

### 2. Get User by ID
```
GET http://localhost:3000/api/users/:id
```

Contoh:
```
GET http://localhost:3000/api/users/507f1f77bcf86cd799439011
```

---

### 3. Create User
```
POST http://localhost:3000/api/users
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "role": "user",
  "department": "Warehouse"
}
```

---

### 4. Update User
```
PUT http://localhost:3000/api/users/:id
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Updated",
  "email": "john@example.com",
  "role": "admin"
}
```

---

### 5. Delete User
```
DELETE http://localhost:3000/api/users/6936b717797455d4f034cdf3
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

## 📦 PRODUCT ENDPOINTS

### 1. Get All Products
```
GET http://localhost:3000/api/products
```

**Response (200):**
```json
{
  "success": true,
  "message": "Products retrieved successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Laptop Dell",
      "description": "Laptop gaming",
      "category": "Electronics",
      "price": 8000000,
      "quantity": 10,
      "sku": "DELL-12345",
      "image": "laptop.jpg",
      "createdBy": {
        "_id": "507f...",
        "name": "Admin"
      },
      "createdAt": "2025-12-08T11:30:00Z"
    }
  ]
}
```

---

### 2. Get Product by ID
```
GET http://localhost:3000/api/products/:id
```

---

### 3. Create Product
```
POST http://localhost:3000/api/products
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Laptop Dell",
  "description": "Laptop gaming dengan spesifikasi tinggi",
  "category": "Electronics",
  "price": 8000000,
  "quantity": 10,
  "sku": "DELL-12345",
  "image": "laptop.jpg"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Laptop Dell",
    "category": "Electronics",
    "price": 8000000,
    "quantity": 10,
    "sku": "DELL-12345",
    "createdBy": "507f..."
  }
}
```

---

### 4. Update Product
```
PUT http://localhost:3000/api/products/:id
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Laptop Dell XPS",
  "price": 9000000,
  "quantity": 15
}
```

---

### 5. Delete Product
```
DELETE http://localhost:3000/api/products/:id
Authorization: Bearer {token}
```

---

## 🏷️ CATEGORY ENDPOINTS

### 1. Get All Categories
```
GET http://localhost:3000/api/categories
```

**Response (200):**
```json
{
  "success": true,
  "message": "Categories retrieved",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Electronics",
      "description": "Elektronik dan gadget",
      "createdAt": "2025-12-08T11:30:00Z"
    }
  ]
}
```

---

### 2. Get Category by ID
```
GET http://localhost:3000/api/categories/:id
```

---

### 3. Create Category
```
POST http://localhost:3000/api/categories
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Electronics",
  "description": "Elektronik dan gadget"
}
```

---

### 4. Update Category
```
PUT http://localhost:3000/api/categories/:id
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Electronics Updated",
  "description": "Elektronik dan gadget terbaru"
}
```

---

### 5. Delete Category
```
DELETE http://localhost:3000/api/categories/:id
Authorization: Bearer {token}
```

---

## 🏢 SUPPLIER ENDPOINTS

### 1. Get All Suppliers
```
GET http://localhost:3000/api/suppliers
```

**Response (200):**
```json
{
  "success": true,
  "message": "Suppliers retrieved",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "PT. Maju Jaya",
      "email": "supplier@example.com",
      "phone": "0812345678",
      "address": "Jl. Merdeka 123",
      "city": "Jakarta",
      "createdAt": "2025-12-08T11:30:00Z"
    }
  ]
}
```

---

### 2. Get Supplier by ID
```
GET http://localhost:3000/api/suppliers/:id
```

---

### 3. Create Supplier
```
POST http://localhost:3000/api/suppliers
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "PT. Maju Jaya",
  "email": "supplier@example.com",
  "phone": "0812345678",
  "address": "Jl. Merdeka 123",
  "city": "Jakarta"
}
```

---

### 4. Update Supplier
```
PUT http://localhost:3000/api/suppliers/:id
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "PT. Maju Jaya Updated",
  "phone": "0898765432"
}
```

---

### 5. Delete Supplier
```
DELETE http://localhost:3000/api/suppliers/:id
Authorization: Bearer {token}
```

---

## 📊 STOCK ENDPOINTS

### 1. Get All Stock Transactions
```
GET http://localhost:3000/api/stocks
```

**Response (200):**
```json
{
  "success": true,
  "message": "Stocks retrieved",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "product": {
        "_id": "507f...",
        "name": "Laptop Dell",
        "sku": "DELL-12345"
      },
      "type": "in",
      "quantity": 50,
      "description": "Pembelian dari supplier",
      "recordedBy": {
        "_id": "507f...",
        "name": "Admin"
      },
      "createdAt": "2025-12-08T11:30:00Z"
    }
  ]
}
```

---

### 2. Record Stock (In/Out)
```
POST http://localhost:3000/api/stocks
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "product": "507f1f77bcf86cd799439011",
  "type": "in",
  "quantity": 50,
  "description": "Pembelian dari supplier"
}
```

**Note:** type dapat berupa "in" (masuk) atau "out" (keluar)

**Response (201):**
```json
{
  "success": true,
  "message": "Stock recorded",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "product": "507f...",
    "type": "in",
    "quantity": 50,
    "description": "Pembelian dari supplier",
    "recordedBy": "507f...",
    "createdAt": "2025-12-08T11:30:00Z"
  }
}
```

---

### 3. Get Stock by Product
```
GET http://localhost:3000/api/stocks/product/:productId
```

Contoh:
```
GET http://localhost:3000/api/stocks/product/507f1f77bcf86cd799439011
```

---

## 🔑 Authentication Notes

- Untuk endpoint yang memerlukan `Authorization`, gunakan header:
  ```
  Authorization: Bearer {token}
  ```
  
- Token didapat dari endpoint **Login**

- Token berlaku selama 24 jam

---

## 📝 Testing dengan cURL

**Register:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin",
    "email": "admin@example.com",
    "password": "password123",
    "confirmPassword": "password123",
    "role": "admin"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password123"
  }'
```

**Create Product (dengan token):**
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -d '{
    "name": "Laptop Dell",
    "category": "Electronics",
    "price": 8000000,
    "quantity": 10,
    "sku": "DELL-12345"
  }'
```

---

## 📋 Summary Endpoints

| Method | Endpoint          | Auth | Deskripsi |
|--------|----------         |------|-----------|
| POST | /api/auth/register | ❌ | Register user baru |
| POST | /api/auth/login | ❌ | Login user |
| GET | /api/auth/profile | ✅ | Lihat profil user |
| POST | /api/auth/logout | ❌ | Logout |
| GET | /api/users | ❌ | Lihat semua user |
| GET | /api/users/:id | ❌ | Lihat user by ID |
| POST | /api/users | ✅ | Tambah user |
| PUT | /api/users/:id | ✅ | Edit user |
| DELETE | /api/users/:id | ✅ | Hapus user |
| GET | /api/products | ❌ | Lihat semua produk |
| GET | /api/products/:id | ❌ | Lihat produk by ID |
| POST | /api/products | ✅ | Tambah produk |
| PUT | /api/products/:id | ✅ | Edit produk |
| DELETE | /api/products/:id | ✅ | Hapus produk |
| GET | /api/categories | ❌ | Lihat semua kategori |
| GET | /api/categories/:id | ❌ | Lihat kategori by ID |
| POST | /api/categories | ✅ | Tambah kategori |
| PUT | /api/categories/:id | ✅ | Edit kategori |
| DELETE | /api/categories/:id | ✅ | Hapus kategori |
| GET | /api/suppliers | ❌ | Lihat semua supplier |
| GET | /api/suppliers/:id | ❌ | Lihat supplier by ID |
| POST | /api/suppliers | ✅ | Tambah supplier |
| PUT | /api/suppliers/:id | ✅ | Edit supplier |
| DELETE | /api/suppliers/:id | ✅ | Hapus supplier |
| GET | /api/stocks | ❌ | Lihat semua transaksi stok |
| POST | /api/stocks | ✅ | Catat stok masuk/keluar |
| GET | /api/stocks/product/:id | ❌ | Lihat stok per produk |

---

**Created by:** Kelompok Thematic PAWII
**Last Updated:** 2025-12-08
