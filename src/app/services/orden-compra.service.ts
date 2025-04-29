import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { OrdenCompra } from '../models/orden-compra.model';

@Injectable({ providedIn: 'root' })
export class OrdenCompraService {
  private apiUrl = 'http://localhost:8080/api/ordenes';

  constructor(private http: HttpClient) { }

  getOrdenes(): Observable<OrdenCompra[]> {
    return this.http.get<OrdenCompra[]>(this.apiUrl);
  }

  getOrden(id: number): Observable<OrdenCompra> {
    return this.http.get<OrdenCompra>(`${this.apiUrl}/${id}`);
  }

  createOrden(orden: OrdenCompra): Observable<OrdenCompra> {
    return this.http.post<OrdenCompra>(this.apiUrl, orden);
  }

  deleteOrden(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getTop3Productos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/productos/top3`);
  }

  updateOrden(id: number, orden: OrdenCompra): Observable<OrdenCompra> {
    return this.http.put<OrdenCompra>(`${this.apiUrl}/${id}`, orden).pipe(
      catchError((error) => {
        console.error('Error al actualizar orden:', error);
        return throwError(() => new Error('Error al actualizar la orden'));
      })
    );
  }
}
