import { Component, ViewChild, ElementRef } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AnimationController } from '@ionic/angular';
@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
  standalone: false
})
export class CamaraPage {

  fotoUrl: string | undefined;

  dataLogin: any;
  constructor(
    private router: Router, 
    private animCtrl: AnimationController, 
    private activeRoute: ActivatedRoute) {
      
    this.activeRoute.queryParams.subscribe(params => {
       
      if (this.router.currentNavigation()?.extras?.state) {
        this.dataLogin = this.router.currentNavigation()?.extras?.state?.['user'];
      }
    })
  }

  async tomarFoto() {
    try {
      const foto = await Camera.getPhoto({
        quality: 90,                      // calidad de la imagen (0-100)
        allowEditing: false,               // permite recortar antes de confirmar
        resultType: CameraResultType.Uri,  // devuelve una URL local de la imagen
        source: CameraSource.Camera        // fuerza a usar la cámara (no la galería)
      });

      this.fotoUrl = foto.webPath; // ruta utilizable directamente en un <img>
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
  }
  
  @ViewChild('tituloCam', { read: ElementRef }) tituloCam!: ElementRef;

  async animTitulo() {
    const animSkeleton = this.animCtrl.create()
    .addElement(this.tituloCam.nativeElement)
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

  async animTituloCambio() {
    const animSkeleton2 = this.animCtrl.create()
    .addElement(this.tituloCam.nativeElement)
    .duration(500)
    .keyframes([
      { offset: 0, transform: 'translateX(0)'},
      { offset: 1, transform: 'translateX(180%)'}
    ]);
    await Promise.all([animSkeleton2.play()]);
  }
  ionViewWillEnter() {
    this.animTitulo();
    this.tituloCam.nativeElement.style.opacity = '0';
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
}