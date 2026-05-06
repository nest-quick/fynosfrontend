import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { AdminLoginComponent } from './pages/admin/admin-login/admin-login.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { adminAuthGuard } from './guards/admin-auth.guard';

export const routes: Routes = [
    {
        path: '',
        children: [
            {path: '', component: HomeComponent},
            {path: 'products', component: ProductsComponent}
        ]
    },
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {path: 'admin-login', component: AdminLoginComponent}
        ]
    },
    {
        path: '',
        component: AdminLayoutComponent,
        canActivateChild: [adminAuthGuard],
        children: [
            { path: 'admin', component: AdminDashboardComponent }
            // { path: 'products', component: AdminProductsComponent },
            // { path: 'products/new', component: AdminProductFormComponent }
        ]
    }
];
