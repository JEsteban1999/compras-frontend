import { DetalleOrden } from './detalle-orden.model';

export interface OrdenCompra {
    id?: number;
    numeroOrden?: string;
    total: number;
    detalles: DetalleOrden[];
}