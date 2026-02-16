import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {path: '', component: HomeComponent }
];
