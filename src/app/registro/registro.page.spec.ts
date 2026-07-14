import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroPage } from './registro.page';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { DbTaskService } from '../services/db-task';

describe('RegistroPage', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroPage],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        { provide: DbTaskService, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe validar email con formato correcto', () => {
    const mailValido = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test('test@gmail.com');
    expect(mailValido).toBeTrue();
  });

  it('debe rechazar email sin @', () => {
    const mailValido = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test('testgmail.com');
    expect(mailValido).toBeFalse();
  });

  it('debe validar teléfono chileno', () => {
    const telValido = /^56[0-9]{9}$/.test('56912345678');
    expect(telValido).toBeTrue();
  });

  it('debe rechazar teléfono sin código de país', () => {
    const telValido = /^56[0-9]{9}$/.test('912345678');
    expect(telValido).toBeFalse();
  });
});