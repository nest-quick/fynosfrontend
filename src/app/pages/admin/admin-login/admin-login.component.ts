import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})

export class AdminLoginComponent {
  private fb = inject(FormBuilder); // Helps create forms
  private authService = inject(AuthService); // Handles API login
  private router = inject(Router); // Navigation

  loading = false; // Disable button when logging in
  error = '';

  // Create the Login form
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  // Runs when user clicks submit
  onSubmit(): void{
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = '';

    // Extract form values
    const credentials = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!
    };

    // Call backend login API AuthService
    this.authService.login(credentials).subscribe({
      // If login succeeds
      next: () => {
        this.loading = false;
        this.router.navigate(['/admin']);
      },

      // If login fails
      error: (err) => {
        console.error('Login failed:', err);
        this.error = 'Invalid email or password';
        this.loading = false;
      }
    });
  }
}
