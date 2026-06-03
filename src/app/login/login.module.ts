import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';

import { PipesComponent } from '../components/pipes/pipes.component';
import { ɵallowPreviousPlayerStylesMerge } from '@angular/animations/browser';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule
  ],
  declarations: [
    LoginPage,
    PipesComponent
  ]
})
export class LoginPageModule {}
