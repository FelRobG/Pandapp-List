import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
// import para animaciones
import { AnimationController } from '@ionic/angular';

import { AlertController } from '@ionic/angular';

import { DbTaskService } from '../services/db-task';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})

export class LoginPage implements OnInit {
  // Generación de un modelo user con dos claves con un valor inicial.
  user = {
    user_name:'',
    contra:''
  }

  fechaHoy: Date = new Date();

  @ViewChild('tituloHome', { read: ElementRef }) tituloHome!: ElementRef;
  // Se instancia el Router
  constructor(
    private router: Router, 
    private animCtrl: AnimationController,
    private alert: AlertController,
    private dbTask: DbTaskService) { 
  }

  ngOnInit() {
  }

  // Instrucciones para la animacion del titulo
  async animTitulo() {
    const animSkeleton = this.animCtrl.create()
    .addElement(this.tituloHome.nativeElement)
    .duration(900)
    .keyframes([
      { offset: 0, transform: 'scale(1)' },
      // Se achica
      { offset: 0.4, transform: 'translateX(0) scale(0.4)', opacity: '1' },
      // Se mueve hacia la derecha, fuera de pantalla
      { offset: 1, transform: 'translateX(110%)', opacity: '1' }
    ]);
    await Promise.all([animSkeleton.play()]);
  }
  async animTituloEntrada() {
    const tituloEntrada = this.animCtrl.create()
      .addElement(this.tituloHome.nativeElement)
      .duration(0)
      .keyframes([
        { offset: 1, transform: 'translateX(0)', opacity: '1' }
      ]);
    await tituloEntrada.play();
  }
  ionViewWillEnter() {
    // Resetea la posicion del titulo al volver a login
    this.tituloHome.nativeElement.style.transform = 'translateX(0) scale(1)';
    this.tituloHome.nativeElement.style.opacity = '0';
    this.animTituloEntrada();
    console.log('--------------------------------CONSOLA: Entra a login--------------------------------');
  }

  async ingresar() {
    console.log('--------------------------------Ingresar: BOTÓN PRESIONADO--------------------------------');
    // Variables mas cortas
    const user_name = this.user.user_name;
    const contra = this.user.contra;
    
    // Variable para la validacion de los caracteres del usuario
    /* 
     *'^' y '$' marcan el inicio y final de la cadena
     *'[a-zA-Z0-9]' acepta cualquier letra y numeros del 0 al 9
     *'+' exige que haya al menos uno o mas caracteres
    */
    const alfanumerico = /^[a-zA-Z0-9]+$/.test(user_name);
    // Variable para la validacion de la longitud del usuario
    const longitudUsuario = user_name.length >= 3 && user_name.length <= 8;

    // Variable para la validación de contraseña con 4 digitos
    // * '{4}' Indica que solo se admiten contraseñas con longitud = 4
    const contraValida = /^[0-9]{4}$/.test(contra);
    // Compara con la base de datos
    const valido = await this.dbTask.validarUsuario(user_name, contra);
    if (!valido) {
      const alert = await this.alert.create({
        header: 'Usuario',
        message: `Usuario o contraseña incorrectos.`,
        buttons: ['Ok'],
        cssClass: 'alerta-home'
      });
      await alert.present();
      return;
    }
    // Se declara e instancia el elemento NavigationExtras
    // Sirve para interpolar datos (pasar datos de un Page a otro)
    console.log('--------------------------------Ingresar: ANTES DE DB.TASK.ACTIVARSESION--------------------------------');
    await this.dbTask.activarSesion(user_name); 
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.user // Le asignamos al estado un objeto con valor
      }
    };
    // Se ejecuta la animacion primero y luego se navega
    await this.animTitulo();
    console.log('validacion:', valido);
    console.log('navegando a menu-tarjetas');
    this.router.navigate(['/menu-tarjetas'], navigationExtras);
    console.log('NAVEGADO a menu-tarjetas');
  }

  async viajeRegistro(){
    await this.animTitulo();
    this.router.navigate(['/registro']);
  }
}
