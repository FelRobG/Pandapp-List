// Importaciones de librerias
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-home', // Nombre del selector
  templateUrl: 'home.page.html', // Donde esta el HTML (lo visual)
  styleUrls: ['home.page.scss'], // Donde esta(n) el/los archivo(s) CSS (los estilos)
  standalone: false,
})
export class HomePage {

  // Informacion adicional del usuario
  userInfo = {
    nombre:"",
    apellido:"",
    nivelEd:"",
    fechaNac:""
  }

  dataLogin: any; // Crea una variable de tipo any (admite cualquier valor)
  
  /*

    * Se colocan los siguientes parametros 
    * private = visibilidad
    * activeRoute = identificador
    * ActivatedRoute = tipo del objeto
    * El ":" indica qué clase será el identificador escrito
    * 
  */ 

  // Para establecer el valor inicial de data 
  constructor(private activeRoute: ActivatedRoute, private router: Router) {
    /* Se llama a la ruta ⬆️ activa y se obtienen sus parametros mediante una suscripcion

      * subscribe permite escuchar de forma reactiva los cambios en la URL. Se utiliza cuando un usuario
      navega entre diferentes elementos dentro de la misma vista y el contenido de la pagina debe 
      actualizarse sin recargar el componente

    */
    this.activeRoute.queryParams.subscribe(params => {// Utilizamos params para leer lo que ingresa el usuario
       
      /* El "?" sirve para decir "si existe la caja de navegacion, abrela y busca extras, si no existe,
        detente y devuelve "undefined". De esta forma no crashea la app" 

        * No se usa en state en este caso porque no hay nada dentro
        * Un "extra" es información adicional que viaja escondida en la memoria cuando el usuario
        navega a otra pagina. 
      
      */
      if (this.router.currentNavigation()?.extras?.state) {// Validamos si la navegacion actual tiene extras
      
        this.dataLogin = this.router.currentNavigation()?.extras?.state?.["user"]; // Si tiene extras, rescata lo enviado
        console.log(this.dataLogin); // Muestra lo rescatado en consola
        
      }else {
        this.router.navigate(['/login']); // Si no tiene extras, envia la navegacion de vuelta al login
      }
    })

  }

  limpiar() {

  }

  mostrar() {
    
  }
  
}
