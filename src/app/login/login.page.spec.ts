import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { DbTaskService } from '../services/db-task';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        { provide: DbTaskService, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe validar usuario alfanumérico', () => {
    const alfanumerico = /^[a-zA-Z0-9]+$/.test('pepito');
    expect(alfanumerico).toBeTrue();
  });

  it('debe rechazar usuario con caracteres especiales', () => {
    const alfanumerico = /^[a-zA-Z0-9]+$/.test('pep@to');
    expect(alfanumerico).toBeFalse();
  });

  it('debe validar contraseña de 4 dígitos', () => {
    const contraValida = /^[0-9]{4}$/.test('1234');
    expect(contraValida).toBeTrue();
  });

  it('debe rechazar contraseña de menos de 4 dígitos', () => {
    const contraValida = /^[0-9]{4}$/.test('123');
    expect(contraValida).toBeFalse();
  });
});