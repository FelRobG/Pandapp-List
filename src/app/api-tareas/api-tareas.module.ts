import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApiTareasPageRoutingModule } from './api-tareas-routing.module';

import { ApiTareasPage } from './api-tareas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApiTareasPageRoutingModule
  ],
  declarations: [ApiTareasPage]
})
export class ApiTareasPageModule {}
