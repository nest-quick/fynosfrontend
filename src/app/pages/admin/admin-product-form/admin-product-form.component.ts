import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminProductService } from '../../../services/admin-product.service';

@Component({
  selector: 'app-admin-product-form',
  imports: [],
  templateUrl: './admin-product-form.component.html',
  styleUrl: './admin-product-form.component.scss'
})

export class AdminProductFormComponent {
  private fb = inject(FormBuilder);
  private adminProductService = inject(AdminProductService);
  private route = inject(Router);

  loading = false;
  error = '';
  success = false;

  //Product form with fields and validation
  productForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required, Validators.min(0)],
    gender: ['', Validators.required],
    productImage: ''
  });

//// onSubmit():
// - check if form is valid
// - if invalid, mark fields as touched and stop
// - set loading to true
// - clear old errors
// - send form value to AdminProductService
// - on success, show message or redirect to admin products page
// - on error, show error message
  onSubmit(): void {
    if(this.productForm.invalid){
      this.productForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = '';

    const product = {
      name: this.productForm.value.name!,
      description: this.productForm.value.description!,
      price: this.productForm.value.price!,
      gender: this.productForm.value.gender!,
      productImage: this.productForm.value.productImage!
    };

    this.adminProductService

  }

  
}
