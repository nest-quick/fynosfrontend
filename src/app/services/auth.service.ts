import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest } from '../models/login-request.model';
import { AuthResponse } from '../models/auth-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //Inject Angular's HTTP client to make api calls
  private http = inject(HttpClient);

  //Base URL for auth endpoints
  private readonly apiUrl = 'http://localhost:8080/api/auth';

  //Keys to store data in localStorage
  private readonly tokenKey = 'fynos_admin_token';
  private readonly rolesKey = 'fynos_admin_roles';
  private readonly emailKey = 'fynos_admin_email';

  //LOGIN METHOD
  login(credentials: LoginRequest): Observable<AuthResponse>{
    //Send POST request to backend with email and password
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials)
    .pipe(
      //tap() saves data without changing the response
      tap((response) => {
        
        localStorage.setItem(this.tokenKey, response.token);
        localStorage.setItem(this.rolesKey, JSON.stringify(response.roles));
        localStorage.setItem(this.emailKey, response.email);
      })
    );
  }

  //LOGOUT METHOD
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.rolesKey);
    localStorage.removeItem(this.emailKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getEmail(): string | null {
    return localStorage.getItem(this.emailKey);
  }

  getRoles(): string[] {
    const roles = localStorage.getItem(this.rolesKey);

    if(!roles) {
      return [];
    }

    return JSON.parse(roles);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    return this.getRoles().includes('Admin');
  }
}
