import { Routes } from '@angular/router';
import { ProductsComponent } from './features/products/products.component';
import { EditProductComponent } from './features/products/editproduct/editproduct.component';

export const routes: Routes = [
    {path: '', redirectTo: 'products', pathMatch: 'full'},
    {path: 'products', component: ProductsComponent}, // List of products
    {path: 'editproduct/:id', component: EditProductComponent}, // Edit a product
];
