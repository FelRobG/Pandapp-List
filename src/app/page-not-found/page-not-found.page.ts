import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
// import para animaciones
import { AnimationController } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.page.html',
  styleUrls: ['./page-not-found.page.scss'],
  standalone: false,
})
export class PageNotFoundPage implements OnInit {

  dataLogin: any;
  @ViewChild('titulo404', { read: ElementRef }) titulo404!: ElementRef;
  constructor(
    private animCtrl: AnimationController, 
    private router: Router, 
    private activeRoute: ActivatedRoute,) {
    // Recuperar extras
    this.activeRoute.queryParams.subscribe(params => {
       
      if (this.router.currentNavigation()?.extras?.state) {
        this.dataLogin = this.router.currentNavigation()?.extras?.state?.['user'];
      }
    })
  }

  // Instrucciones para la animacion del header
  async animTitulo() {
    const animSkeleton = this.animCtrl.create()
    .addElement(this.titulo404.nativeElement)
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
    this.titulo404.nativeElement.style.opacity = '0';
  }

  async animTituloCambio() {
    const animSkeleton2 = this.animCtrl.create()
    .addElement(this.titulo404.nativeElement)
    .duration(500)
    .keyframes([
      { offset: 0, transform: 'translateX(0)'},
      { offset: 1, transform: 'translateX(180%)'}
    ]);
    await Promise.all([animSkeleton2.play()]);
  }

  async volver() {
    await this.animTituloCambio();
    let navigationExtras: NavigationExtras = {
        state: {
          user: this.dataLogin // Le asignamos al estado un objeto con valor
        }
    };
    this.router.navigate(['/menu-tarjetas'], navigationExtras);
  }

  ngOnInit() {
  }

}
