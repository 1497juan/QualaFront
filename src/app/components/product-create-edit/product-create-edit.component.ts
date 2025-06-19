import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@Component({
  selector: 'app-product-create-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NzFormModule, NzSwitchModule],
  templateUrl: './product-create-edit.component.html',
  styleUrl: './product-create-edit.component.scss'
})
export class ProductCreateEditComponent implements OnInit {
  @Input() product: Product | null = null;
  @Output() closeModal = new EventEmitter<void>();

  productForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.initForm();

    if (this.product) {
      this.productForm.patchValue(this.product);
    }
  }


  initForm() {
    console.log(new Date);
    const now = new Date();

    this.productForm = this.fb.group({
      id: [0],
      codigoProducto: [null, Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      referenciaInterna: ['', Validators.required],
      precioUnitario: [null, [Validators.required, Validators.min(0)]],
      estado: [true],
      unidadMedida: ['', Validators.required],
      fechaCreacion: [new Date(), Validators.required],
    });
  }

  submitForm() {
    if (this.productForm.invalid) {
      console.log('Formulario inválido');
      return;
    }
    console.log(this.productForm.value);

    if (this.productForm.value.id === 0) {
      this.productService.createProduct(this.productForm.value).subscribe(
        (response) => {
          console.log('Producto creado:', response);
        },
        (error) => {
          console.error('Error al crear producto:', error);
        }
      );
    } else {
      this.productService.updateProduct(this.productForm.value.id, this.productForm.value).subscribe(
        (response) => {
          console.log('Producto actualizado:', response);
        },
        (error) => {
          console.error('Error al actualizar producto:', error);
        }
      );
    }
    this.closeModal.emit();
  }
}