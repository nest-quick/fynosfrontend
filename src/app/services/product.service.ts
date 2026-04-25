import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/products';

  getProducts(gender?: string): Observable<Product[]> {
    let url = this.apiUrl;
    if (gender){
      url += `?gender=${gender}`;
    }
    return this.http.get<Product[]>(url);
  }
}