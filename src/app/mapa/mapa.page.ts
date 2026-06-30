import { Component, ElementRef, ViewChild, OnDestroy, NgZone } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { Geolocation } from '@capacitor/geolocation';
import { ActivatedRoute, Router, NavigationExtras} from '@angular/router';
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
  standalone: false,
})
export class MapaPage {
  // Captura el elemento HTML usando la referencia #map
  @ViewChild('map') mapRef!: ElementRef<HTMLElement>;

  dataLogin: any;

  latitud: number = -2.1537488;
  longitud: number = -79.8883037;
  // Guarda la instancia del mapa
  map!: GoogleMap;
  constructor(private ngZone: NgZone, private router: Router, private activeRoute: ActivatedRoute) {
      this.activeRoute.queryParams.subscribe(params => {

      if (this.router.currentNavigation()?.extras?.state) {
        this.dataLogin = this.router.currentNavigation()?.extras?.state?.['user'];
      }
    })
  }

  // Usa el ciclo de vida de Ionic cuando la vista ya entro completamente
  ionViewDidEnter() {
    this.createMap();
  }
  async createMap() {
    try {
      this.map = await GoogleMap.create({
        id: 'mi-mapa',
        element: this.mapRef.nativeElement,
        apiKey: 'AIzaSyC_vinxfbg2MctyYvbiDJ-TOn9VWaaHZeA',
        config: {
          center: {
            lat: -2.1537488, 
            lng: -79.8883037, 
          },
          zoom: 16, // Nivel de acercamiento
        },
      });
      // Para Escuchar eventos
      this.map.setOnMarkerClickListener((event) => {
        console.log('Marcador clickeado: ', event.markerId);
      });

      const pos = await Geolocation.getCurrentPosition();
      this.ngZone.run(() => {
        this.latitud = pos.coords.latitude;
        this.longitud = pos.coords.longitude;
      });

      // Añade un marcador en el centro
      await this.map.addMarker({
        coordinate: {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        },
        title: '¡Estoy aquí!'
      });

      // Mover el mapa a la posición real
      await this.map.setCamera({
        coordinate: {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        },
        zoom: 16
      });
    } catch (error) {
      console.error('Error al crear el mapa: ', error);
    }
  }

  async viajarTarjetas(){
    let navigationExtras: NavigationExtras = {
        state: {
          user: this.dataLogin 
        }
    };
    this.router.navigate(['/menu-tarjetas'], navigationExtras);
  }
}
