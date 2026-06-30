import { Component, ViewChild, ElementRef, Input, OnChanges, SimpleChanges  } from '@angular/core';
// Import para animaciones
import { AnimationController, AlertController } from '@ionic/angular';

import { DbTaskService } from 'src/app/services/db-task';
@Component({
  selector: 'app-experiencia-laboral',
  templateUrl: './experiencia-laboral.component.html',
  styleUrls: ['./experiencia-laboral.component.scss'],
  standalone: false,
})
export class ExperienciaLaboralComponent implements OnChanges {

  @Input() dataLogin: any;
  @ViewChild('inputEmpresa', { read: ElementRef }) inputEmpresa!: ElementRef;
  @ViewChild('inputCargo', { read: ElementRef }) inputCargo!: ElementRef;

  experiencia = {
    empresa: '',
    annoInicio: '',
    trabajaActualmente: false,
    annoTermino: '',
    cargo: ''
  }

  constructor(
    private animCtrl: AnimationController, 
    private dbTask: DbTaskService, 
    private alert: AlertController) {
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['dataLogin'] && this.dataLogin?.user_name) {
      const experiencias = await this.dbTask.obtenerExperiencias(this.dataLogin.user_name);
      if (experiencias.length > 0) {
        const exp = experiencias[0];
        this.experiencia.empresa            = exp.empresa      || '';
        this.experiencia.cargo              = exp.cargo        || '';
        this.experiencia.annoInicio         = exp.anno_inicio  || '';
        this.experiencia.trabajaActualmente = exp.trabaja_actualmente === 1;
        this.experiencia.annoTermino        = exp.anno_termino || '';
      }
    }
  }
  async animarInput() {
    // Instrucciones para la animacion del input del nombre
    const animNombre = this.animCtrl.create()
    .addElement(this.inputEmpresa.nativeElement)
    .duration(800)
    .keyframes([
      { offset: 0, transform: 'translateX(0)', opacity: '1' },
      { offset: 0.5, transform: 'translateX(120%)', opacity: '1' },
      { offset: 1, transform: 'translateX(0)', opacity: '1' }
    ]);
    // Instrucciones para la animacion del input del apellido
    const animApellido = this.animCtrl.create()
    .addElement(this.inputCargo.nativeElement)
    .duration(800)
    .keyframes([
      { offset: 0, transform: 'translateX(0)', opacity: '1' },
      { offset: 0.5, transform: 'translateX(120%)', opacity: '1' },
      { offset: 1, transform: 'translateX(0)', opacity: '1' }
    ]);

    await Promise.all([animNombre.play(), animApellido.play()]);
  }


  limpiar() {
    this.animarInput();
    this.experiencia = {
      empresa: '',
      annoInicio: '',
      trabajaActualmente: false,
      annoTermino: '',
      cargo: ''
    }
  }

  async guardar(){
    await this.dbTask.guardarExperiencia(
      this.dataLogin?.user_name,
      this.experiencia.empresa,
      this.experiencia.cargo,
      this.experiencia.annoInicio,
      this.experiencia.trabajaActualmente,
      this.experiencia.annoTermino
    );

    const alert = await this.alert.create({
      header: 'Guardado',
      message: 'Experiencia laboral guardada correctamente.',
      buttons: ['Ok'],
      cssClass: 'alerta-home'
    });
    await alert.present();
  }
}