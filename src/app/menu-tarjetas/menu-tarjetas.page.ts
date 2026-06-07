import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
// Import para el manejo de las tarjetas
import { ModalController } from '@ionic/angular';
import { TarjetaModalComponent } from '../components/tarjeta-modal/tarjeta-modal.component';

@Component({
  selector: 'app-menu-tarjetas',
  templateUrl: './menu-tarjetas.page.html',
  styleUrls: ['./menu-tarjetas.page.scss'],
  standalone: false,
})
export class MenuTarjetasPage implements OnInit {

  dataLogin: any;// Crea una variable de tipo any (admite cualquier valor)

  tarjetas = [
    { titulo: 'Compras', descripcion: 'Comprar 10 panes, 1 jugo Watts y 1/4 de láminas de queso', fecha: '2026-06-07', hora: '5:00 pm', categoria: 'Deporte', colorCategoria: 'yellow', iconoPrio: 'assets/img/insignia_amarilla.png' },
    { titulo: 'Ejercicios', descripcion: 'Calentamiento: trotar 5 minutos, 10 sentadillas, 20 pushups', fecha: '2026-06-10', hora: '7:03 pm', categoria: 'Estudio', colorCategoria: 'green', iconoPrio: 'assets/img/insignia_roja.png' },
    { titulo: 'Estudios', descripcion: '1 hora de repaso en matemáticas, descanso de 15 minutos y 1 hora de lectura', fecha: '2026-07-14', hora: '10:00 am', categoria: 'Ejercicio', colorCategoria: 'cyan', iconoPrio: 'assets/img/insignia_verde.png' },
    { titulo: 'Recibir pedido', descripcion: 'Abrir el portón para el pedido de MercadoLibre', fecha: '2026-08-08', hora: '10:30 pm', categoria: 'Otro', colorCategoria: 'red', iconoPrio: 'assets/img/insignia_amarilla.png' },
  ];
  
  constructor(
    private modalCtrl: ModalController, 
    private activeRoute: ActivatedRoute, 
    private router: Router, ) {
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
        console.log(this.dataLogin); // Muestra lo rescatado en consola
      }else {
        this.router.navigate(['/login']); // Si no tiene extras, envia la navegacion de vuelta al login
      }
    })
  }

  async viajarPerfil(){
    let navigationExtras: NavigationExtras = {
        state: {
          user: this.dataLogin // Le asignamos al estado un objeto con valor
        }
    };
    console.log(this.dataLogin);
    //Se ejecuta la animacion primero y luego se navega
    //await this.animTitulo();
    this.router.navigate(['/home'], navigationExtras);
  }

  // Crear tarjeta nueva
  async agregar() {

    const modal = await this.modalCtrl.create({
      component: TarjetaModalComponent
    });
    await modal.present();
    const { data, role } = await modal.onWillDismiss();

    if (data && role === 'guardar' ) {
      this.tarjetas.push(data);
    }
    
  }

  // Editar tarjeta existente
  async editar(index: number) {

    const modal = await this.modalCtrl.create({
      component: TarjetaModalComponent,
      componentProps: {
        tarjeta: { ...this.tarjetas[index] }
      }
    });

    await modal.present();
    const { data, role } = await modal.onWillDismiss();

    if (data && role === 'guardar') {
      this.tarjetas[index] = data;
    }

  }
 
  // Eliminar tarjeta
  eliminar(index: number) {
    this.tarjetas.splice(index, 1);
  }

  filtrar() {}
  ordenar() {}
  
  ngOnInit() {
  }

}
