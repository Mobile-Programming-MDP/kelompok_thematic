import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './sisteminventaris.html',
})
export class AppComponent {
  nomor = 1;
  dataInventaris: any[] = [];

  form = {
    nama: '',
    kategori: '',
    jumlah: null as number | null,
    lokasi: ''
  };

  simpanData() {
    if (!this.form.nama || !this.form.kategori || !this.form.jumlah || !this.form.lokasi) {
      return;
    }

    this.dataInventaris.push({
      no: this.nomor++,
      nama: this.form.nama,
      kategori: this.form.kategori,
      jumlah: this.form.jumlah,
      lokasi: this.form.lokasi
    });

    this.form = {
      nama: '',
      kategori: '',
      jumlah: null,
      lokasi: ''
    };
  }
}
