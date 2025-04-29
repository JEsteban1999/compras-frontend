import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OrdenCompraService } from '../../../services/orden-compra.service';
import { ProductoService } from '../../../services/producto.service';
import { Producto } from '../../../models/producto.model';
import { DetalleOrden } from '../../../models/detalle-orden.model';

@Component({
  selector: 'app-orden-compra-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './orden-compra-form.component.html',
  styleUrls: ['./orden-compra-form.component.css']
})
export class OrdenCompraFormComponent implements OnInit {
  ordenForm: FormGroup;
  productos: Producto[] = [];
  isEdit = false;
  ordenId?: number;

  constructor(
    private fb: FormBuilder,
    private ordenCompraService: OrdenCompraService,
    private productoService: ProductoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.ordenForm = this.fb.group({
      total: [0, [Validators.required, Validators.min(0.01)]],
      detalles: this.fb.array([], Validators.required)
    });
  }

  ngOnInit(): void {
    this.productoService.getProductos().subscribe(productos => {
      this.productos = productos;
    });

    this.ordenId = this.route.snapshot.params['id'];
    if (this.ordenId) {
      this.isEdit = true;
      this.ordenCompraService.getOrden(this.ordenId).subscribe(orden => {
        this.ordenForm.patchValue({
          total: orden.total
        });
        orden.detalles.forEach(detalle => {
          this.addDetalle(detalle);
        });
      });
    } else {
      this.addDetalle();
    }
  }

  get detalles(): FormArray {
    return this.ordenForm.get('detalles') as FormArray;
  }

  addDetalle(detalle?: DetalleOrden): void {
    const detalleGroup = this.fb.group({
      productoId: [detalle?.productoId || '', Validators.required],
      cantidad: [detalle?.cantidad || 1, [Validators.required, Validators.min(1)]],
      precioUnitario: [detalle?.precioUnitario || '', [Validators.required, Validators.min(0.01)]],
      subtotal: [{ value: detalle?.subtotal || 0, disabled: true }]
    });

    detalleGroup.valueChanges.subscribe(value => {
      if (value.cantidad && value.precioUnitario) {
        const subtotal = Number(value.cantidad) * Number(value.precioUnitario);
        detalleGroup.patchValue({ subtotal: subtotal }, { emitEvent: false });
        this.calculateTotal();
      }
    });

    this.detalles.push(detalleGroup);
  }

  removeDetalle(index: number): void {
    this.detalles.removeAt(index);
    this.calculateTotal();
  }

  calculateTotal(): void {
    let total = 0;
    this.detalles.controls.forEach(control => {
      const subtotal = control.get('subtotal')?.value || 0;
      total += subtotal;
    });
    this.ordenForm.patchValue({ total: total });
  }

  onProductoChange(index: number): void {
    const detalle = this.detalles.at(index);
    const productoId = detalle.get('productoId')?.value;
    const producto = this.productos.find(p => p.id === productoId);
    if (producto) {
      detalle.patchValue({
        precioUnitario: producto.precio
      });
    }
  }

  onSubmit(): void {
    if (this.ordenForm.valid) {
      const ordenData = this.ordenForm.value;
      ordenData.detalles = this.detalles.value;

      if (this.isEdit && this.ordenId) {
        this.ordenCompraService.updateOrden(this.ordenId, ordenData).subscribe(() => {
          this.router.navigate(['/ordenes']);
        });
      } else {
        this.ordenCompraService.createOrden(ordenData).subscribe(() => {
          this.router.navigate(['/ordenes']);
        });
      }
    }
  }
}
