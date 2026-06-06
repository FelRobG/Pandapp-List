import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private router: Router) { }

  registrar() {
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
    // Variable para la validacion de contraseña con 4 digitos
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
    
    if (!alfanumerico) {
      console.log('Error: El usuario solo puede contener letras y números.');
      return
    }

    if (!longitudUsuario) {
      console.log('Error: El usuario debe tener entre 3 y 8 caracteres.');
      return;
    }

    if (!contraValida) {
      console.log('Error: La contraseña debe ser de exactamente 4 números.');
      return;
    }

    if (this.registro.contra !== this.registro.contra2){
      console.log('Las contraseñas no coinciden.');
      return;
    }

    if (!mailValido) {
      console.log ('Error: El email es inválido.');
      return;
    }

    if (!telValido){
      console.log('Error: El teléfono es inválido.');
      return;
    }

    console.log('Registro exitoso');
    this.router.navigate(['/login']);
  }

  volver() {
    this.router.navigate(['/login']);
  }
  
  ngOnInit() {
  }

}
