import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateProduct } from '../models/create-product.model';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/auth-response.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class AdminProductService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/products'

  createProduct(product: CreateProduct): Observable<Product>{
    return this.http.post<Product>(this.apiUrl, product);
  }

  deleteProduct(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
