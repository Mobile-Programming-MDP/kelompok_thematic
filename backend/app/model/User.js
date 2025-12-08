// Model untuk User
class User {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  // Method untuk mendapatkan user
  static getAll() {
    // Implementasi query ke database
    return [];
  }

  static getById(id) {
    // Implementasi query ke database
    return null;
  }

  static create(data) {
    // Implementasi insert ke database
    return new User(Date.now(), data.name, data.email, data.password);
  }

  static update(id, data) {
    // Implementasi update ke database
    return true;
  }

  static delete(id) {
    // Implementasi delete ke database
    return true;
  }
}

module.exports = User;
