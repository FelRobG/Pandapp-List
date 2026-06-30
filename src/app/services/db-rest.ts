import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class DbRest {
    // URL de la API
  private apiUrl = 'http://10.0.2.2:3000/tareas';

  // Opciones HTTP con headers
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient){}

  // Para manejo de errores
  private handleError(error: HttpErrorResponse) {
    console.error('Error en el request:', error.message);
    return throwError(() => new Error('Algo salió mal, intenta de nuevo más tarde.'));
  }

  // ---------GET---------
  // Para obtener todas las tareas
  obtenerTareas(): Observable<any> {
    return this.http.get(this.apiUrl)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Para obtener una tarea por el ID
  obtenerTarea(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
  // ---------POST---------
  // Para crear nueva tarea
  crearTarea(tarea: any): Observable<any> {
    return this.http.post(this.apiUrl, tarea, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // ---------PUT---------
  // Para modificar una tarea existente por el id
  modificarTarea(id: number, tarea: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, tarea, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  // ---------DELETE---------
  // Para eliminar una tarea por el id
  eliminarTarea(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}