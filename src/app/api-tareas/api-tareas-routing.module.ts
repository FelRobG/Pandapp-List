import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApiTareasPage } from './api-tareas.page';

const routes: Routes = [
  {
    path: '',
    component: ApiTareasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApiTareasPageRoutingModule {}
