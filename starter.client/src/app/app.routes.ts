import { Routes } from '@angular/router';
import { ProductsComponent } from './features/products/products.component';
import { EditProductComponent } from './features/products/editproduct/editproduct.component';
import { NewProductComponent } from './features/products/newproduct/newproduct.component';


export const routes: Routes = [
    {path: '', redirectTo: 'products', pathMatch: 'full'},
    {path: 'products', component: ProductsComponent}, // List of products
    {path: 'newproduct', component: NewProductComponent}, // Add a new product
    {path: 'editproduct/:id', component: EditProductComponent}, // Edit a product
];
