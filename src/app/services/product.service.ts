import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../models/product.model';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/Producto`;
  private token = localStorage.getItem('jwt');
  private headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`,
  });

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {


    return this.http.get<Product[]>(`${this.apiUrl}/ObtenerProductos`, { headers: this.headers });
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/ObtenerProductoXId/${id}`, { headers: this.headers });
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/AgregarProducto`, product, { headers: this.headers });
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/ActualizarProducto/${id}`, product, { headers: this.headers });
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/EliminarProductoXId${id}`, { headers: this.headers });
  }
}
