import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { AlertController, AnimationController } from '@ionic/angular';
import { CapitalizarPipe } from '../pipes/capitalizar-pipe';
import { DatePipe } from '@angular/common';

import { DbTaskService } from 'src/app/services/db-task';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.scss'],
  standalone: false,
})

export class MisDatosComponent {

  userInfo = {
    nombre: '',
    apellido: '',
    nivelEd: '',
    fechaNac: null as Date | null
  }
  // Para cargar los datos del perfil desde la base de datos
  async ngOnInit() {
    const perfil = await this.dbTask.obtenerPerfil(this.dataLogin?.user_name);
    if (perfil) {
      this.userInfo.nombre    = perfil.nombre    || '';
      this.userInfo.apellido  = perfil.apellido  || '';
      this.userInfo.nivelEd   = perfil.nivel_ed  || '';
      this.userInfo.fechaNac  = perfil.fecha_nac ? new Date(perfil.fecha_nac) : null;
    }
  }
  @Input() dataLogin: any; // Para que no crashee la app si es null

  @ViewChild('inputNombre', { read: ElementRef }) inputNombre!: ElementRef;
  @ViewChild('inputApellido', { read: ElementRef }) inputApellido!: ElementRef;

  constructor(
    private alert: AlertController,
    private pipe: CapitalizarPipe,
    private datePipe: DatePipe,
    private animCtrl: AnimationController,
    private dbTask: DbTaskService,
    private router: Router) {
  }

  async animarInput() {
    const animNombre = this.animCtrl.create()
      .addElement(this.inputNombre.nativeElement)
      .duration(800)
      .keyframes([
        { offset: 0, transform: 'translateX(0)', opacity: '1' },
        { offset: 0.5, transform: 'translateX(120%)', opacity: '1' },
        { offset: 1, transform: 'translateX(0)', opacity: '1' }
      ]);
    const animApellido = this.animCtrl.create()
      .addElement(this.inputApellido.nativeElement)
      .duration(800)
      .keyframes([
        { offset: 0, transform: 'translateX(0)', opacity: '1' },
        { offset: 0.5, transform: 'translateX(120%)', opacity: '1' },
        { offset: 1, transform: 'translateX(0)', opacity: '1' }
      ]);
    await Promise.all([animNombre.play(), animApellido.play()]);
  }

  capitalizar(campo: 'nombre' | 'apellido', texto: string) {
    this.userInfo[campo] = this.pipe.transform(texto);
  }

  formatoFecha(texto: Date) {
    console.log(`fecha: ${this.userInfo.fechaNac}`)
  }

  limpiar() {
    this.animarInput();
    this.userInfo.nombre = '';
    this.userInfo.apellido = '';
    this.userInfo.nivelEd = '';
    this.userInfo.fechaNac = null as Date | null;
  }

  async mostrar() {
    const fecha = this.datePipe.transform(this.userInfo.fechaNac, 'dd/MM/yyyy', '', 'es-ES')
    const alert = await this.alert.create({
      header: 'Usuario',
      message: `
        Su nombre es ${this.userInfo.nombre} ${this.userInfo.apellido}, 
        su nivel de educación es ${this.userInfo.nivelEd} 
        y su fecha de nacimiento es ${fecha}`,
      buttons: ['Ok'],
      cssClass: 'alerta-home'
    });
    await alert.present();
  }

  async guardarPerfil() {
    const fecha = this.datePipe.transform(this.userInfo.fechaNac, 'dd/MM/yyyy', '', 'es-ES') || '';
    
    await this.dbTask.guardarPerfil(
      this.dataLogin?.user_name,
      this.userInfo.nombre,
      this.userInfo.apellido,
      this.userInfo.nivelEd,
      fecha
    );

    const alert = await this.alert.create({
      header: 'Guardado',
      message: 'Perfil guardado correctamente.',
      buttons: ['Ok'],
      cssClass: 'alerta-home'
    });
    await alert.present();
  }

  cerrarSesion(){
    this.dbTask.cerrarSesion(this.dataLogin.user_name);
    this.router.navigate(['/login']);
  }
}