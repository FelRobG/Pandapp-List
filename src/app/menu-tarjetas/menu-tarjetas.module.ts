import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuTarjetasPageRoutingModule } from './menu-tarjetas-routing.module';

import { MenuTarjetasPage } from './menu-tarjetas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuTarjetasPageRoutingModule
  ],
  declarations: [MenuTarjetasPage]
})
export class MenuTarjetasPageModule {}
