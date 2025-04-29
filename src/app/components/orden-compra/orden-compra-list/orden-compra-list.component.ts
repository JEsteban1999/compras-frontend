import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { OrdenCompra } from '../../../models/orden-compra.model';
import { OrdenCompraService } from '../../../services/orden-compra.service';

@Component({
  selector: 'app-orden-compra-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './orden-compra-list.component.html',
  styleUrls: ['./orden-compra-list.component.css']
})
export class OrdenCompraListComponent implements OnInit {
  ordenes: OrdenCompra[] = [];
  displayedColumns: string[] = ['numeroOrden', 'total', 'actions'];

  constructor(private ordenCompraService: OrdenCompraService) { }

  ngOnInit(): void {
    this.loadOrdenes();
  }

  loadOrdenes(): void {
    this.ordenCompraService.getOrdenes().subscribe(data => {
      this.ordenes = data;
    });
  }

  deleteOrden(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta orden?')) {
      this.ordenCompraService.deleteOrden(id).subscribe(() => {
        this.loadOrdenes();
      });
    }
  }
}
