import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuTarjetasPageRoutingModule } from './menu-tarjetas-routing.module';

import { MenuTarjetasPage } from './menu-tarjetas.page';

import { TarjetaModalComponent } from '../components/tarjeta-modal/tarjeta-modal.component';
// Importaciones de MatDatePicker
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
// Para el formato de la fecha y la hora
import { DatePipe } from '@angular/common';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuTarjetasPageRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  declarations: [MenuTarjetasPage, TarjetaModalComponent],
  providers: [DatePipe]
})
export class MenuTarjetasPageModule {}
