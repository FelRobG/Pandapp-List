import { Component, Input, OnInit } from '@angular/core';
// Import para crear y editar las tarjetas
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-tarjeta-modal',
  templateUrl: './tarjeta-modal.component.html',
  styleUrls: ['./tarjeta-modal.component.scss'],
  standalone: false,
})
export class TarjetaModalComponent  implements OnInit {
  // Para editar tarjeta existente
  // Rescata los datos de la tarjeta existente
  @Input() tarjetaE: any = null;

  // Definicion de variables que reciben lo ingresado en el formulario
  titulo: string = '';
  descripcion: string = '';
  fecha: string = '';
  hora: string = '';
  categoria: string = '';
  colorCategoria: string = '#B8DDD3';
  iconoPrio: string = 'assets/img/insignia_verde.png';
  /* Muestra diferente opcion dependiendo de si estas creando una 
  tarjeta nueva o editando una existente*/
  modoEdicion: boolean = false;

  // Categorias default
  categorias = [
    { nombre: 'Personal', color: '#c75f30' },
    { nombre: 'Trabajo', color: '#00c3ff' },
    { nombre: 'Estudio', color: '#4a7c59' },
    { nombre: 'Ejercicio', color: '#e8a870' },
    { nombre: 'Otro', color: '#7e7e7e' },
  ];
  
  // Iconos de prioridad
  iconosPrio = [
    'assets/img/insignia_verde.png',
    'assets/img/insignia_amarilla.png',
    'assets/img/insignia_roja.png',
  ];

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    /* 
      Si es para editar(if this tarjeta): Se asignan los valores de la tarjeta existente
      Si es para crear(else): Se asigna la fecha y la hora para que no esté vacio
    */
    if (this.tarjetaE) {
      this.modoEdicion = true;
      this.titulo = this.tarjetaE.titulo;
      this.descripcion = this.tarjetaE.descripcion;
      this.fecha = this.tarjetaE.fecha;
      this.hora = this.tarjetaE.hora;
      this.categoria = this.tarjetaE.categoria;
      this.colorCategoria = this.tarjetaE.colorCategoria;
      this.iconoPrio= this.tarjetaE.iconoPrio;
    }else {
      const ahora = new Date();
      this.fecha = ahora.toISOString().split('T')[0];
      this.hora  = ahora.toTimeString().slice(0, 5);
    }
  }
  /* Se asigna el color de la insignia de categoria 
  segun la categoria escogida*/
  cambioCategoria() {
    const encontrado = this.categorias.find(c => c.nombre === this.categoria);
    if (encontrado) this.colorCategoria = encontrado.color;
  }

  guardar() {
    // Si no tiene titulo, se asigna 'Titulo'
    if (!this.titulo.trim()) {
      this.titulo = 'Título';
    }
    // Si no tiene categoria al guardar, se le asigna 'Otro'
    if (!this.categoria.trim()) {
      this.categoria = 'Otro';
      this.cambioCategoria();
    }
    // Se asignan los datos ingresados a la tarjeta
    const resultado = {
      titulo: this.titulo.trim(),
      descripcion: this.descripcion.trim(),
      fecha: this.fecha,
      hora: this.hora,
      categoria: this.categoria,
      colorCategoria: this.colorCategoria,
      iconoPrio: this.iconoPrio,
    };
    // Envia el resultado a menu-tarjetas y el rol 'guardar'
    this.modalCtrl.dismiss(resultado, 'guardar');
  }
  // Cierra modal de la tarjeta y devuelve null a menu-tarjetas y el rol 'cancelar'
  cancelar() {
    this.modalCtrl.dismiss(null, 'cancelar');
  }
}
