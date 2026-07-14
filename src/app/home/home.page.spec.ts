import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';

import { RouterTestingModule } from '@angular/router/testing';
import { CapitalizarPipe } from '../components/pipes/capitalizar-pipe';
import { DatePipe } from '@angular/common';

import { MisDatosComponent } from '../components/mis-datos/mis-datos.component';
import { ExperienciaLaboralComponent } from '../components/experiencia-laboral/experiencia-laboral.component';
import { CertificacionesComponent } from '../components/certificaciones/certificaciones.component';
import { DbTaskService } from '../services/db-task';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [CapitalizarPipe, DatePipe]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});