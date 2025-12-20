import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './sisteminventaris';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should add data to inventaris when simpanData is called', () => {
    component.form = {
      nama: 'Laptop',
      kategori: 'Elektronik',
      jumlah: 5,
      lokasi: 'Lab Komputer'
    };

    component.simpanData();

    expect(component.dataInventaris.length).toBe(1);
  });
});
