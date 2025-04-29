import { Routes } from '@angular/router';
import { ProductoListComponent } from './components/producto/producto-list/producto-list.component';
import { ProductoFormComponent } from './components/producto/producto-form/producto-form.component';
import { OrdenCompraListComponent } from './components/orden-compra/orden-compra-list/orden-compra-list.component';
import { OrdenCompraFormComponent } from './components/orden-compra/orden-compra-form/orden-compra-form.component';
import { OrdenCompraTopProductsComponent } from './components/orden-compra/orden-compra-top-products/orden-compra-top-products.component';

export const routes: Routes = [
    { path: 'productos', component: ProductoListComponent },
    { path: 'productos/new', component: ProductoFormComponent },
    { path: 'productos/:id', component: ProductoFormComponent },
    { path: 'ordenes', component: OrdenCompraListComponent },
    { path: 'ordenes/new', component: OrdenCompraFormComponent },
    { path: 'ordenes/:id', component: OrdenCompraFormComponent },
    { path: 'top-productos', component: OrdenCompraTopProductsComponent },
    { path: '', redirectTo: '/ordenes', pathMatch: 'full' },
    { path: '**', redirectTo: '/ordenes' }
];
