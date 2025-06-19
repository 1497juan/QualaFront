import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ProductCreateEditComponent } from "../product-create-edit/product-create-edit.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NzTableModule, CommonModule, NzModalModule, ProductCreateEditComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  product: Product | null = null;

  constructor(private productService: ProductService, private loginService: LoginService) { }

  ngOnInit(): void {

    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe(
      (products) => {
        this.products = products;
      },
      (error) => {
        console.error('Error al cargar productos:', error);
      }
    );
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(
      () => {
        this.loadProducts();  // Recarga la lista de productos después de eliminar uno
      },
      (error) => {
        console.error('Error al eliminar producto:', error);
      }
    );
  }

  createProduct(): void {
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

    this.productService.createProduct(newProduct).subscribe(
      (product) => {
        this.products.push(product); // Agrega el nuevo producto a la lista
      },
      (error) => {
        console.error('Error al crear producto:', error);
      }
    );
  }

  editProduct(id: number): void {
  this.productService.getProductById(id).subscribe(
    (product) => {
      this.product = product;       // ← este objeto lo pasas al formulario como @Input()
      this.isVisible = true;        // ← abres el modal
    },
    (error) => {
      console.error('Error al cargar producto por ID:', error);
    }
  );
}


  updateProduct(id: number): void {
    const updatedProduct: Product = {
      id: id,
      codigoProducto: 14,
      nombre: 'Producto Actualizado',
      descripcion: 'Descripción actualizada del producto',
      referenciaInterna: 'Ref123',
      precioUnitario: 150,
      estado: true,
      unidadMedida: 'Unidad',
      fechaCreacion: new Date()
    };

    this.productService.updateProduct(id, updatedProduct).subscribe(
      (product) => {
        console.log('Producto actualizado:', product);
        this.loadProducts();
      },
      (error) => {
        console.error('Error al actualizar producto:', error);
      }
    );
  }

  isVisible = false;
  showModal(): void {
    this.isVisible = true;
    this.product = null;
  }

  onModalClosed(): void {
    this.loadProducts();
  }

}