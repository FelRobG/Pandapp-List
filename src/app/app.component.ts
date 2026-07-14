import { Component } from '@angular/core';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { DbTaskService } from './services/db-task';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})

export class AppComponent {
  constructor(
    private sqlite: SQLite, 
    private dbTask: DbTaskService, 
    private router: Router) {
    
    this.startDB();
  }

  // Inicializar la BBDD
  async startDB() {
    try {
      const db = await this.sqlite.create({
        name: 'pandapp.db',
        location: 'default'
      });
      this.dbTask.setDb(db);
      await this.dbTask.crearTablas();
      await this.checkSesion();
    } catch (err) {
      console.log('SQLite no disponible en navegador, usando fallback');
      await this.checkSesion();
    }
  }

  /* Revisa si hay una sesion activa en storage al volver a entrar,
    obtiene los datos y navega directamente a menu-tarjetas
  */
  async checkSesion() {
    const haySession = await this.dbTask.haySesionActiva();
    if (haySession) {
      const sesion = await this.dbTask.getSesionActiva();
      this.router.navigate(['/menu-tarjetas'], {
        state: { user: sesion }
      });
    }
  }
}