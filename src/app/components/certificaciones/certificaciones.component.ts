import { Component, ViewChild, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AlertController, AnimationController } from '@ionic/angular';
import { DbTaskService } from 'src/app/services/db-task';

@Component({
  selector: 'app-certificaciones',
  templateUrl: './certificaciones.component.html',
  styleUrls: ['./certificaciones.component.scss'],
  standalone: false,
})
export class CertificacionesComponent implements OnChanges {

  @Input() dataLogin: any;
  @ViewChild('inputNombre', { read: ElementRef }) inputNombre!: ElementRef;

  certificacion = {
    nombre: '',
    fechaObtencion: '',
    vence: false,
    fechaVencimiento: ''
  }

  constructor(
    private animCtrl: AnimationController,
    private alert: AlertController,
    private dbTask: DbTaskService) {}

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['dataLogin'] && this.dataLogin?.user_name) {
      const certs = await this.dbTask.obtenerCertificaciones(this.dataLogin.user_name);
      if (certs.length > 0) {
        const c = certs[0];
        this.certificacion.nombre          = c.nombre           || '';
        this.certificacion.fechaObtencion  = c.fecha_obtencion  || '';
        this.certificacion.vence           = c.vence === 1;
        this.certificacion.fechaVencimiento = c.fecha_vencimiento || '';
      }
    }
  }

  async animarInput() {
    const anim = this.animCtrl.create()
      .addElement(this.inputNombre.nativeElement)
      .duration(800)
      .keyframes([
        { offset: 0,   transform: 'translateX(0)',    opacity: '1' },
        { offset: 0.5, transform: 'translateX(120%)', opacity: '1' },
        { offset: 1,   transform: 'translateX(0)',    opacity: '1' }
      ]);
    await anim.play();
  }

  limpiar() {
    this.animarInput();
    this.certificacion = {
      nombre: '',
      fechaObtencion: '',
      vence: false,
      fechaVencimiento: ''
    }
  }

  async guardar() {
    await this.dbTask.guardarCertificacion(
      this.dataLogin?.user_name,
      this.certificacion.nombre,
      this.certificacion.fechaObtencion,
      this.certificacion.vence,
      this.certificacion.fechaVencimiento
    );

    const alert = await this.alert.create({
      header: 'Guardado',
      message: 'Certificación guardada correctamente.',
      buttons: ['Ok'],
      cssClass: 'alerta-home'
    });
    await alert.present();
  }
}