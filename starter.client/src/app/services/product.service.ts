import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private products = signal<Product[]>([]);
  constructor() { }
  
  get productsSig() {
    return this.products;
  }

  getById(id: number) : Product | undefined {
    let p = this.products().find(product => product.id == id); 
    return p;
  } 

  get() {
    this.http.get<Product[]>('/api/product')
    .subscribe({
      next: (products) => {
        this.products.set(products); },
      error: (err) => console.error(err)
    });
  }

  create( product: Product) {
    this.http.post<Product>('/api/product', product)
    .subscribe({
      next: (product) => this.get(),  // dropped mutate
      error: (err) => console.error(err)
    });
  }

  update(product: Product) {
    this.http.put<Product>(`/api/product`, product)
    .subscribe({
      next: (product) => this.get(),
      error: (err) => console.error(err)
    });
  }

  delete(id: number) {
    this.http.delete<Product>(`/api/product/${id}`)
    .subscribe({
      next: (product) => this.get(),
      error: (err) => console.error(err)
    });
  }
}
