import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminProductService } from '../../../services/admin-product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './admin-product-form.component.html',
  styleUrl: './admin-product-form.component.scss'
})

export class AdminProductFormComponent {
  private fb = inject(FormBuilder);
  private adminProductService = inject(AdminProductService);
  private router = inject(Router);

  loading = false;
  error = '';

  //Product form with fields and validation
  productForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', [Validators.required, Validators.min(0.01)]],
    gender: ['', Validators.required],
    productImage: ['/images/muaythaishorts.jpg']
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
      description: this.productForm.value.description || undefined,
      price: Number(this.productForm.value.price!),
      gender: this.productForm.value.gender!,
      productImage: this.productForm.value.productImage || undefined
    };

    this.adminProductService.createProduct(product).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/admin']);
      },

      error: (err) => {
        console.error('Product Failed:', err);
        this.error = 'Product not created successfully';
        this.loading= false;
      }
    })

  }

  
}
