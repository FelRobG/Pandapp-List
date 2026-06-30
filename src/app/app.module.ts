import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//import { PipesComponent } from './components/pipes/pipes.component';

import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs);

// Imports Para SQLite e Ionic Storage
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { IonicStorageModule } from '@ionic/storage-angular';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, /*PipesComponent*/],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    BrowserAnimationsModule, 
    IonicStorageModule.forRoot(), 
    HttpClientModule],
  providers: [
    SQLite,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
    { provide: LOCALE_ID, useValue: 'es'}
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
