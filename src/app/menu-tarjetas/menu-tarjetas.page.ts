import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
// Import para el manejo de las tarjetas
import { ModalController } from '@ionic/angular';
import { TarjetaModalComponent } from '../components/tarjeta-modal/tarjeta-modal.component';
// Import para animaciones
import { AnimationController} from '@ionic/angular';

import { DbTaskService } from '../services/db-task';
@Component({
  selector: 'app-menu-tarjetas',
  templateUrl: './menu-tarjetas.page.html',
  styleUrls: ['./menu-tarjetas.page.scss'],
  standalone: false,
})
export class MenuTarjetasPage  {

  dataLogin: any;// Crea una variable de tipo any (admite cualquier valor)
  // tarjetas default
  tarjetas: any[] = [];

  tarjetasFiltradas: any[] = [];
  criterioFiltro: string = '';
  criterioOrden: string = '';

  filtrar(criterio: string) {
    this.criterioFiltro = criterio;
    if (!criterio) {
      this.tarjetasFiltradas = [...this.tarjetas];
      return;
    }
    this.tarjetasFiltradas = this.tarjetas.filter(t => 
      t.categoria.toLowerCase() === criterio.toLowerCase()
    );
  }

  ordenar(criterio: string) {
    this.criterioOrden = criterio;
    this.tarjetasFiltradas = [...this.tarjetasFiltradas].sort((a, b) => {
      if (criterio === 'fecha') {
        return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
      }
      if (criterio === 'titulo') {
        return a.titulo.localeCompare(b.titulo);
      }
      return 0;
    });
  }


  @ViewChild('tituloMenu', { read: ElementRef }) tituloMenu!: ElementRef;
  constructor(
    private modalCtrl: ModalController, 
    private activeRoute: ActivatedRoute, 
    private router: Router,
    private animCtrl: AnimationController,
    private dbTask: DbTaskService) {
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
    .addElement(this.tituloMenu.nativeElement)
    .duration(500)
    .keyframes([
      { offset: 0, transform: 'translateX(0)'},
      { offset: 1, transform: 'translateX(180%)'}
    ]);
    await Promise.all([animSkeleton2.play()]);
  }

  async viajarPerfil(){
    await this.animTituloCambio();
    let navigationExtras: NavigationExtras = {
        state: {
          user: this.dataLogin // Le asignamos al estado un objeto con valor
        }
    };
    this.router.navigate(['/home'], navigationExtras);
  }

  async viajarApiTareas() {
    await this.animTituloCambio();
    let navigationExtras: NavigationExtras = {
      state: { user: this.dataLogin }
    };
    this.router.navigate(['/api-tareas'], navigationExtras);
  }

  viajarMapa() {
    let navigationExtras: NavigationExtras = {
      state: { user: this.dataLogin }
    };
    this.router.navigate(['/mapa'], navigationExtras);
  }

  viajarCamara() {
    let navigationExtras: NavigationExtras = {
      state: { user: this.dataLogin }
    };
    this.router.navigate(['/camara'], navigationExtras);
  }

  // Crear tarjeta nueva
  async agregar() {
    const modal = await this.modalCtrl.create({
      component: TarjetaModalComponent
    });
    await modal.present();
    const { data, role } = await modal.onWillDismiss();

    if (data && role === 'guardar') {
      await this.dbTask.agregarTarjeta(this.dataLogin?.user_name, data);
      this.tarjetas = await this.dbTask.obtenerTarjetas(this.dataLogin?.user_name);
      this.filtrar(this.criterioFiltro);
    }
  }

  async editar(index: number) {
    const modal = await this.modalCtrl.create({
      component: TarjetaModalComponent,
      componentProps: {
        tarjeta: { ...this.tarjetasFiltradas[index] }
      }
    });
    await modal.present();
    const { data, role } = await modal.onWillDismiss();

    if (data && role === 'guardar') {
      await this.dbTask.editarTarjeta(this.tarjetasFiltradas[index].id, data);
      this.tarjetas = await this.dbTask.obtenerTarjetas(this.dataLogin?.user_name);
      this.filtrar(this.criterioFiltro);
    }
  }

  async eliminar(index: number) {
    await this.dbTask.eliminarTarjeta(this.tarjetasFiltradas[index].id);
    this.tarjetas = await this.dbTask.obtenerTarjetas(this.dataLogin?.user_name);
    this.filtrar(this.criterioFiltro);
  }

  async animTitulo() {
    const animSkeleton = this.animCtrl.create()
    .addElement(this.tituloMenu.nativeElement)
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

  // Ocultar skeletonAPP antes de la animacion
  ionViewWillEnter() {
    this.tituloMenu.nativeElement.style.opacity = '0';
  }
  // Ejecutar animacion al entrar y obtener tarjetas para evitar que este vacio
  async ionViewDidEnter() {
    this.animTitulo();
    const tarjetasDB = await this.dbTask.obtenerTarjetas(this.dataLogin?.user_name);
    if (tarjetasDB.length > 0) {
      this.tarjetas = tarjetasDB;
      this.tarjetasFiltradas = [...this.tarjetas];
    }
  }

}
