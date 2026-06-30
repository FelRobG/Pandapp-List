import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
// Import para animaciones
import { AnimationController, Animation } from '@ionic/angular';

import { AlertController } from '@ionic/angular';

import { DbTaskService } from '../services/db-task';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false,
})

export class RegistroPage implements OnInit {

  registro = {
    usuario: '',
    contra: '',
    contra2: '',
    email: '',
    tel: ''
  }

  dataRegistro: any;

  @ViewChild('tituloRegistro', { read: ElementRef }) tituloRegistro!: ElementRef;
  constructor(
    private router: Router, 
    private animCtrl: AnimationController, 
    private alert: AlertController,
    private dbTask: DbTaskService) { 

  }

  async registrar() {
    const usuario = this.registro.usuario;
    const contra = this.registro.contra;
    const contra2 = this.registro.contra2;
    const email = this.registro.email;
    const tel = this.registro.tel;

    // Variable para la validacion de los caracteres del usuario
    /* 
     *'^' y '$' marcan el inicio y final de la cadena
     *'[a-zA-Z0-9]' acepta cualquier letra y numeros del 0 al 9
     *'+' exige que haya al menos uno o mas caracteres
    */
    const alfanumerico = /^[a-zA-Z0-9]+$/.test(usuario);
    // Variable para la validacion de la longitud del usuario
    const longitudUsuario = usuario.length >= 3 && usuario.length <= 8;

    // Variable para la validación de contraseña con 4 digitos
    // * '{4}' Indica que solo se admiten contraseñas con longitud = 4
    const contraValida = /^[0-9]{4}$/.test(contra);

    // Variable para la validacion del email
    /* 
     *'^' y '$' marcan el inicio y final de la cadena
     *'[a-zA-Z0-9]' acepta cualquier letra y numeros del 0 al 9
     * @ para el arroba, parte del formato del email
     * [a-zA-Z0-9.-] para aceptar los dominios
     * El . fuera de \ es el caracter literal
     * [a-zA-Z]{2,} es la extension (com, org, etc...) y exige minimo 2 caracteres.
     *'+' exige que haya al menos uno o mas caracteres
    */
    const mailValido = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    // Variable para la validacion del telefono chileno
    const telValido = /^56[0-9]{9}$/.test(tel);

    const existeUsuario = await this.dbTask.existeUsuario(usuario);


    if (!alfanumerico) {
      const alert = await this.alert.create({
        header: 'Advertencia', 
        message: `El usuario solo puede contener letras y números.`,
        buttons: ['Ok'],
        cssClass: 'alerta-home'
      });
      await alert.present();
      return
    }

    if (!longitudUsuario) {
      const alert = await this.alert.create({
        header: 'Advertencia', 
        message: `El usuario debe tener entre 3 y 8 caracteres.`,
        buttons: ['Ok'],
        cssClass: 'alerta-home'
      });
      await alert.present();
      return;
    }

    if (!contraValida) {
      const alert = await this.alert.create({
        header: 'Advertencia', 
        message: `La contraseña debe ser de exactamente 4 números.`,
        buttons: ['Ok'],
        cssClass: 'alerta-home'
      });
      await alert.present();
      return;
    }

    if (this.registro.contra !== this.registro.contra2){
      const alert = await this.alert.create({
        header: 'Advertencia', 
        message: `Las contraseñas no coinciden.`,
        buttons: ['Ok'],
        cssClass: 'alerta-home'
      });
      await alert.present();
      return;
    }

    if (!mailValido) {
      const alert = await this.alert.create({
        header: 'Advertencia', 
        message: `El formato del email es inválido.`,
        buttons: ['Ok'],
        cssClass: 'alerta-home'
      });
      await alert.present();
      return;
    }

    if (!telValido){
      const alert = await this.alert.create({
        header: 'Advertencia', 
        message: `El teléfono es inválido o no es chileno.`,
        buttons: ['Ok'],
        cssClass: 'alerta-home'
      });
      await alert.present();
      return;
    }

    if (existeUsuario){
      const alert = await this.alert.create({
        header: 'Error',
        message: 'Este nombre de usuario ya está registrado.',
        buttons: ['Ok'],
        cssClass: 'alerta-home'
      });
      await alert.present();
      return;  
    }

    await this.dbTask.registrarUsuario(usuario, contra);
    await this.dbTask.activarSesion(usuario);
    const alert = await this.alert.create({
      header: 'Registro exitoso',
      message: `Usuario ${usuario} registrado correctamente.`,
      buttons: ['Ok'],
      cssClass: 'alerta-home'
    });
    await alert.present();
    this.router.navigate(['/menu-tarjetas']); // CAMBIAR A MENU-TARJETAS
  }

  volver() {
    this.router.navigate(['/login']);
  }
  
  ngOnInit() {
  }

  async animTitulo() {
    const animSkeleton = this.animCtrl.create()
    .addElement(this.tituloRegistro.nativeElement)
    .duration(800)
    .keyframes([
      // Inicia fuera de pantalla
      { offset: 0, transform: 'translateX(-50%)', opacity: '1' },
      // Simula animacion de rebote
      { offset: 0.4, transform: 'translateX(15%)', opacity: '1' },
      { offset: 0.55, transform: 'translateX(0)', opacity: '1' },
      { offset: 0.7, transform: 'translateX(15%)', opacity: '1' },
      { offset: 1, transform: 'translateX(0)', opacity: '1' }
    ]);
    await Promise.all([animSkeleton.play()]);
  }
  // Ejecuta la animacion antes de que entre, asi no se muestra por 1 milisegundo
    ionViewWillEnter() {
    this.animTitulo();
  }

}
