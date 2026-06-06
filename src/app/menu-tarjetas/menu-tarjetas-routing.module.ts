import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuTarjetasPage } from './menu-tarjetas.page';

const routes: Routes = [
  {
    path: '',
    component: MenuTarjetasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuTarjetasPageRoutingModule {}
