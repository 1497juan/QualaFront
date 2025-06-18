import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NzTableModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  productos: Product[] = [];
  loading = false;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {

    this.loading = true;
    this.productService.getAllProducts().subscribe(
      (data) => {
        console.log(data);
        this.productos = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error al obtener los productos', error);
        this.loading = false;
      }
    );
  }
}
