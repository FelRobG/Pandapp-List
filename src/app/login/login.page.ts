import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})

export class LoginPage implements OnInit {

  // Generación de un modelo user con dos claves con un valor inicial.
  user = {
    usuario:'',
    contra:''
  }

  fechaHoy: Date = new Date();

  // Se instancia el Router
  constructor(private router: Router) { }

  ngOnInit() {
  }

  ingresar() {
    // Variables mas cortas
    const usuario = this.user.usuario;
    const contra = this.user.contra;

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

    // Validamos que el usuario Y la contraseña coincidan
    if (usuario !== 'pepito' || contra !== '1234') {
      console.log('Error: Usuario o contraseña incorrectos');
      return;
    }

    // Se declara e instancia el elemento NavigationExtras
    // Sirve para interpolar datos (pasar datos de un Page a otro)
    let navigationExtras: NavigationExtras = {
        state: {
          user: this.user // Le asignamos al estado un objeto con valor
        }
      };
      this.router.navigate(['/home'], navigationExtras);
  }
}
