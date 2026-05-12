import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);

  products: Product[] = [];
  loading = true;
  error = '';

  ngOnInit(): void {
    //Listen for changes in URL
    this.route.queryParams
    //Process the URL data
    .pipe(
      //switchMap takes the URL params and turn them into an API call
      switchMap(params => {
        //get gender for the URL 
        const gender =params['gender'] ?? null;

        //Reset UI state before new request
        this.loading = true;
        this.error = '';

        //Call backend API to get products
        return this.productService.getProducts(gender);
      })
      //Subscribe = actually run the code and get the result
    ).subscribe({
      //If API call is successful
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      //If API call fails
      error: (err) => {
        console.error('Error fetching products:', err);
        this.error = 'Failed to load products';
        this.loading = false;
      }
    });
  }
}

//queryParams --> Watch the URL

//switchMap --> Turn URL into API call

//subscribe --> get the result and use it
