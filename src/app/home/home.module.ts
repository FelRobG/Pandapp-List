import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { CapitalizarPipe } from '../components/pipes/capitalizar-pipe';
import { DatePipe } from '@angular/common';

// Importaciones de MatDatePicker
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';

// Import de Componentes
import { CertificacionesComponent } from '../components/certificaciones/certificaciones.component';
import { ExperienciaLaboralComponent } from '../components/experiencia-laboral/experiencia-laboral.component';
import { MisDatosComponent } from '../components/mis-datos/mis-datos.component';

import { RouterTestingModule } from '@angular/router/testing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatFormFieldModule,
    IonicModule.forRoot(),
    RouterTestingModule
  ],
  providers: [CapitalizarPipe, DatePipe],
  declarations: [
    HomePage, 
    MisDatosComponent, 
    ExperienciaLaboralComponent, 
    CertificacionesComponent
  ]
})
export class HomePageModule {}
