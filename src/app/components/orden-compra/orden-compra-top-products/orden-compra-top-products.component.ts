import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { OrdenCompraService } from '../../../services/orden-compra.service';

@Component({
  selector: 'app-orden-compra-top-products',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule],
  templateUrl: './orden-compra-top-products.component.html',
  styleUrls: ['./orden-compra-top-products.component.css']
})
export class OrdenCompraTopProductsComponent implements OnInit {
  topProductos: any[] = [];
  displayedColumns: string[] = ['producto', 'cantidad'];

  constructor(private ordenCompraService: OrdenCompraService) {}

  ngOnInit(): void {
    this.loadTopProductos();
  }

  loadTopProductos(): void {
    this.ordenCompraService.getTop3Productos().subscribe(data => {
      this.topProductos = data;
    });
  }
}
