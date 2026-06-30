import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { DbRest } from '../services/db-rest';
import { AnimationController } from '@ionic/angular';

// Import para el storage de Ionic
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-api-tareas',
  templateUrl: './api-tareas.page.html',
  styleUrls: ['./api-tareas.page.scss'],
  standalone: false,
})
export class ApiTareasPage implements OnInit {

  dataLogin: any;
  tareas: any[] = [];
  
  // Variable para asegurar que el storage este listo
  private _storage: Storage | null = null;

  nuevaTarea = {
    titulo: '',
    descripcion: '',
    categoria: ''
  };

  @ViewChild('tituloApi', { read: ElementRef }) tituloApi!: ElementRef;

  constructor(
    private dbRest: DbRest,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private animCtrl: AnimationController,
    // Inyecta Storage
    private ionStorage: Storage 
  ) {
    this.activeRoute.queryParams.subscribe(params => {
      if (this.router.currentNavigation()?.extras?.state) {
        this.dataLogin = this.router.currentNavigation()?.extras?.state?.['user'];
      }
    });
  }

  // Inicializa Storage antes de cargar las tareas
  async ngOnInit() {
    const storage = await this.ionStorage.create();
    this._storage = storage;
    
    this.cargarTareas();
  }

  async animTituloCambio() {
    const animSkeleton2 = this.animCtrl.create()
    .addElement(this.tituloApi.nativeElement)
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
          user: this.dataLogin
        }
    };
    this.router.navigate(['/menu-tarjetas'], navigationExtras);
  }

  // ---------READ CON PERSISTENCIA---------
  cargarTareas() {
    this.dbRest.obtenerTareas().subscribe({
      next: async (data) => {
        // Si hay internet
        this.tareas = data;
        
        // Guardamos los datos en la memoria interna
        if (this._storage) {
          await this._storage.set('tareas_offline', data);
          console.log('✅ Datos de la API cargados y respaldados en Storage');
        }
      },
      error: async (err) => {
        // Si no hay internet o la API falla
        console.error('❌ Error al cargar tareas de la API:', err);
        
        if (this._storage) {
          const datosRespaldo = await this._storage.get('tareas_offline');
          
          if (datosRespaldo) {
            this.tareas = datosRespaldo;
            console.log('🔄 Mostrando datos desde la persistencia offline');
          } else {
            console.log('⚠️ No hay datos locales guardados previamente');
          }
        }
      }
    });
  }

  // ---------CREATE---------
  agregarTarea() {
    if (!this.nuevaTarea.titulo) {
      console.log('Error: Debes ingresar un título.');
      return;
    }

    this.dbRest.crearTarea(this.nuevaTarea).subscribe({
      next: (data) => {
        console.log('Tarea creada:', data);
        this.cargarTareas();
        this.limpiarFormulario();
      },
      error: (err) => {
        console.error('Error al crear tarea:', err);
      }
    });
  }

  // ---------DELETE---------
  eliminarTarea(id: number) {
    this.dbRest.eliminarTarea(id).subscribe({
      next: () => {
        console.log('Tarea eliminada');
        this.cargarTareas();
      },
      error: (err) => {
        console.error('Error al eliminar tarea:', err);
      }
    });
  }

  limpiarFormulario() {
    this.nuevaTarea = {
      titulo: '',
      descripcion: '',
      categoria: ''
    };
  }
}