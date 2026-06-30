import { Component, ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
// Import de Pipes
import { CapitalizarPipe } from '../components/pipes/capitalizar-pipe';
import { DatePipe } from '@angular/common';
// Import para animaciones
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-home', // Nombre del selector
  templateUrl: 'home.page.html', // Donde esta el HTML (lo visual)
  styleUrls: ['home.page.scss'], // Donde esta(n) el/los archivo(s) CSS (los estilos)
  standalone: false,
})

export class HomePage {

  segmentActivo: String = 'misDatos';
  // Informacion adicional del usuario
  userInfo = {
    nombre:'',
    apellido:'',
    nivelEd:'',
    fechaNac: null as Date | null
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
  @ViewChild('inputNombre', { read: ElementRef }) inputNombre!: ElementRef;
  @ViewChild('inputApellido', { read: ElementRef }) inputApellido!: ElementRef;
  @ViewChild('tituloHome', { read: ElementRef }) tituloHome!: ElementRef;
  constructor(
    private activeRoute: ActivatedRoute, 
    private router: Router, 
    private alert: AlertController,
    private pipe: CapitalizarPipe,
    private datePipe: DatePipe,
    private animCtrl: AnimationController) {
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
        this.dataLogin = this.router.currentNavigation()?.extras?.state?.['user']; // Si tiene extras, rescata lo enviado
      }
    })

  }

  // Instrucciones de animacion cuando se va al perfil
  async animTituloCambio() {
    const animSkeleton2 = this.animCtrl.create()
    .addElement(this.tituloHome.nativeElement)
    .duration(500)
    .keyframes([
      { offset: 0, transform: 'translateX(0)'},
      { offset: 1, transform: 'translateX(180%)'}
    ]);
    await Promise.all([animSkeleton2.play()]);
  }

  async viajarTarjetas(){
    await this.animTituloCambio();
    let navigationExtras: NavigationExtras = {
        state: {
          user: this.dataLogin // Le asignamos al estado un objeto con valor
        }
    };
    //Se ejecuta la animacion primero y luego se navega
    //await this.animTitulo();
    this.router.navigate(['/menu-tarjetas'], navigationExtras);
  }

  async animarInput() {
    // Instrucciones para la animacion del input del nombre
    const animNombre = this.animCtrl.create()
    .addElement(this.inputNombre.nativeElement)
    .duration(800)
    .keyframes([
      { offset: 0, transform: 'translateX(0)', opacity: '1' },
      { offset: 0.5, transform: 'translateX(120%)', opacity: '1' },
      { offset: 1, transform: 'translateX(0)', opacity: '1' }
    ]);
    // Instrucciones para la animacion del input del apellido
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

  // Instrucciones para la animacion del header
  async animTitulo() {
    const animSkeleton = this.animCtrl.create()
    .addElement(this.tituloHome.nativeElement)
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
  
  // Ocultar Pandapp antes de la animacion
  ionViewWillEnter() {
    this.animTitulo();
    this.tituloHome.nativeElement.style.opacity = '0';
  }

}