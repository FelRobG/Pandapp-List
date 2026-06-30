import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})

export class DbTaskService {

  private db!: SQLiteObject;

  constructor(private sqlite: SQLite, private storage: Storage) {
    this.initStorage();
  }

  // Inicializar Ionic Storage
  async initStorage() {
    await this.storage.create();
  }

  // Settear el objeto SQLiteObject
  setDb(db: SQLiteObject) {
    this.db = db;
  }

  // Crear las tablas
  async crearTablas() {
    await this.db.executeSql(
      `
        CREATE TABLE IF NOT EXISTS sesion_data (
          user_name TEXT(8) PRIMARY KEY NOT NULL,
          contrasenna  INTEGER NOT NULL,
          activo    INTEGER NOT NULL
        )
      `, []
    );
    await this.db.executeSql(
      `
        CREATE TABLE IF NOT EXISTS perfil_usuario (
          user_name  TEXT(8) PRIMARY KEY NOT NULL,
          nombre     TEXT,
          apellido   TEXT,
          nivel_ed   TEXT,
          fecha_nac  TEXT
        )
      `,[]
    );
    await this.db.executeSql(
      `
        CREATE TABLE IF NOT EXISTS experiencia_laboral (
          id          INTEGER PRIMARY KEY AUTOINCREMENT,
          user_name   TEXT(8) NOT NULL,
          empresa     TEXT,
          cargo       TEXT,
          anno_inicio INTEGER,
          trabaja_actualmente INTEGER,
          anno_termino INTEGER
        )
      `, []
    );
    await this.db.executeSql(
      `
        CREATE TABLE IF NOT EXISTS certificaciones (
          id                INTEGER PRIMARY KEY AUTOINCREMENT,
          user_name         TEXT(8) NOT NULL,
          nombre            TEXT,
          fecha_obtencion   TEXT,
          vence             INTEGER,
          fecha_vencimiento TEXT
        )
      `, []
    );
    await this.db.executeSql(
      `
        CREATE TABLE IF NOT EXISTS tarjeta (
          id              INTEGER PRIMARY KEY AUTOINCREMENT,
          user_name       TEXT(8) NOT NULL,
          titulo          TEXT,
          descripcion     TEXT,
          fecha           TEXT,
          categoria       TEXT,
          color_categoria TEXT,
          icono_prio      TEXT)
      `, []
    );
  }

  // Para registrar un usuario
  async registrarUsuario(userName: string, contrasenna: string) {
    await this.db.executeSql(
      `INSERT INTO sesion_data (user_name, contrasenna, activo) VALUES (?, ?, 1)`,
      [userName, contrasenna]
    );
    // Guarda sesion activa en Storage de Ionic
    await this.storage.set('sesion_activa', { user_name: userName });
  }

  // Para validar usuario al iniciar sesión
  async validarUsuario(userName: string, contrasenna: string): Promise<boolean> {
    const result = await this.db.executeSql(
      `SELECT * FROM sesion_data WHERE user_name = ? AND contrasenna = ?`,
      [userName, contrasenna]
    );
    return result.rows.length > 0;
  }

  async existeUsuario(userName: string):
  Promise<boolean> {
    if (!this.db) return false;
    const result = await this.db.executeSql(
      `SELECT user_name FROM sesion_data WHERE user_name = ?`,
      [userName]
    );
    return result.rows.length > 0;
  }

  // Para activar la sesion
  async activarSesion(userName: string) {
    await this.db.executeSql(
      `UPDATE sesion_data SET activo = 1 WHERE user_name = ?`,
      [userName]
    );
    await this.storage.set('sesion_activa', { user_name: userName });
  }

  // Para consultar si existe una sesion activa
  async haySesionActiva(): Promise<boolean> {
    const sesion = await this.storage.get('sesion_activa');
    return sesion !== null;
  }

  async getSesionActiva() {
    return await this.storage.get('sesion_activa');
  }
  // Para cerrar la sesion
  async cerrarSesion(userName: string) {
    await this.db.executeSql(
      `UPDATE sesion_data SET activo = 0 WHERE user_name = ?`,
      [userName]
    );
    await this.storage.remove('sesion_activa');
  }

  // ---------INFORMACION DEL USUARIO---------
  // Guardar / Actualizar
  async guardarPerfil(userName: string, nombre: string, apellido: string, nivelEd: string, fechaNac: string) {
    if (!this.db) return;
    await this.db.executeSql(
      `
        INSERT OR REPLACE INTO perfil_usuario (user_name, nombre, apellido, nivel_ed, fecha_nac)
        VALUES (?, ?, ?, ?, ?)
      `, [userName, nombre, apellido, nivelEd, fechaNac]);
  }
  // Obtener
  async obtenerPerfil(userName: string) {
    if (!this.db) return null;

    const result = await this.db.executeSql(
      `SELECT * FROM perfil_usuario WHERE user_name = ?`,
      [userName]
    );

    if (result.rows.length > 0) {
      return result.rows.item(0);
    }
    return null;
  }

  // ---------EXPERIENCIA LABORAL---------
  // Añadir nuevo 
  async guardarExperiencia(userName: string, empresa: string, cargo: string, annoInicio: string, trabajaActualmente: boolean, annoTermino: string) {
    if (!this.db) return;
    await this.db.executeSql(`
      INSERT INTO experiencia_laboral (user_name, empresa, cargo, anno_inicio, trabaja_actualmente, anno_termino)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [userName, empresa, cargo, annoInicio, trabajaActualmente ? 1 : 0, annoTermino]);
  }
  // Obtener
  async obtenerExperiencias(userName: string) {
    if (!this.db) return [];
    const result = await this.db.executeSql(
      `SELECT * FROM experiencia_laboral WHERE user_name = ?`,
      [userName]
    );
    const experiencias = [];
    for (let i = 0; i < result.rows.length; i++) {
      experiencias.push(result.rows.item(i));
    }
    return experiencias;
  }
  // Eliminar
  async eliminarExperiencia(id: number) {
    if (!this.db) return;
    await this.db.executeSql(
      `DELETE FROM experiencia_laboral WHERE id = ?`,
      [id]
    );
  }
  // ---------CERTIFICACIONES---------
  // Añadir nueva 
  async guardarCertificacion(userName: string, nombre: string, fechaObtencion: string, vence: boolean, fechaVencimiento: string) {
    if (!this.db) return;
    await this.db.executeSql(
      `
        INSERT INTO certificaciones (user_name, nombre, fecha_obtencion, vence, fecha_vencimiento)
        VALUES (?, ?, ?, ?, ?)
      `, [userName, nombre, fechaObtencion, vence ? 1 : 0, fechaVencimiento]);
  }
  // Obtener
  async obtenerCertificaciones(userName: string) {
    if (!this.db) return [];
    const result = await this.db.executeSql(
      `SELECT * FROM certificaciones WHERE user_name = ?`,
      [userName]
    );
    const certificaciones = [];
    for (let i = 0; i < result.rows.length; i++) {
      certificaciones.push(result.rows.item(i));
    }
    return certificaciones;
  }
  // Eliminar 
  async eliminarCertificacion(id: number) {
    if (!this.db) return;
    await this.db.executeSql(
      `DELETE FROM certificaciones WHERE id = ?`,
      [id]
    );
  }
  // ---------TARJETAS---------
  // Agregar
  async agregarTarjeta(userName: string, tarjeta: any) {
    if (!this.db) return;
    await this.db.executeSql(`
      INSERT INTO tarjeta (user_name, titulo, descripcion, fecha, categoria, color_categoria, icono_prio)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [userName, tarjeta.titulo, tarjeta.descripcion, tarjeta.fecha, tarjeta.categoria, tarjeta.colorCategoria, tarjeta.iconoPrio]);
  }
  // Obtener todas las tarjetas del usuario
  async obtenerTarjetas(userName: string) {
    if (!this.db) return [];
    const result = await this.db.executeSql(
      `SELECT * FROM tarjeta WHERE user_name = ?`,
      [userName]
    );
    const tarjetas = [];
    for (let i = 0; i < result.rows.length; i++) {
      const row = result.rows.item(i);
      tarjetas.push({
        id:             row.id,
        titulo:         row.titulo,
        descripcion:    row.descripcion,
        fecha:          row.fecha,
        categoria:      row.categoria,
        colorCategoria: row.color_categoria,
        iconoPrio:      row.icono_prio
      });
    }
    return tarjetas;
  }
  // Editar
  async editarTarjeta(id: number, tarjeta: any) {
    if (!this.db) return;
    await this.db.executeSql(`
      UPDATE tarjeta SET 
        titulo = ?, descripcion = ?, fecha = ?, 
        categoria = ?, color_categoria = ?, icono_prio = ?
      WHERE id = ?
    `, [tarjeta.titulo, tarjeta.descripcion, tarjeta.fecha, tarjeta.categoria, tarjeta.colorCategoria, tarjeta.iconoPrio, id]);
  }
  // Eliminar
  async eliminarTarjeta(id: number) {
    if (!this.db) return;
    await this.db.executeSql(
      `DELETE FROM tarjeta WHERE id = ?`,
      [id]
    );
  }
}