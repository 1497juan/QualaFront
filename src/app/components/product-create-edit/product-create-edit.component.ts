import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-create-edit',
  standalone: true,
  imports: [],
  templateUrl: './product-create-edit.component.html',
  styleUrl: './product-create-edit.component.scss'
})
export class ProductCreateEditComponent {
  @Input() product: Product | null = null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    if (this.product) {
      console.log('Producto a editar:', this.product); 
    } else {
      console.log('Nuevo producto'); 
    }
  }

  submitForm(): void {
    if (this.product) {
      this.productService.updateProduct(this.product.id, this.product).subscribe(() => {
        console.log('Producto actualizado');
      });
    } else {
      const newProduct: Product = {
        id: 0,
        codigoProducto: 14,
        nombre: 'Nuevo Producto',
        descripcion: 'Descripción del nuevo producto',
        referenciaInterna: 'Ref123',
        precioUnitario: 100,
        estado: true,
        unidadMedida: 'Unidad',
        fechaCreacion: new Date()
      };
      this.productService.createProduct(newProduct).subscribe(() => {
        console.log('Producto creado');
      });
    }
  }
}
