import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuTarjetasPageRoutingModule } from './menu-tarjetas-routing.module';

import { MenuTarjetasPage } from './menu-tarjetas.page';

import { TarjetaModalComponent } from '../components/tarjeta-modal/tarjeta-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuTarjetasPageRoutingModule
  ],
  declarations: [MenuTarjetasPage, TarjetaModalComponent]
})
export class MenuTarjetasPageModule {}
