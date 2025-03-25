import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private productsSig = signal<Product[]>([]);
  private productSig = signal<Product | null>(null);

  get products() {
    return this.productsSig;
  }

  get product() {
    return this.productSig;
  } 

  constructor() { }
  get() {
    this.http.get<Product[]>('/api/product')
    .subscribe({
      next: (products) => this.productsSig.set(products),
      error: (err) => console.error(err)
    });
  }

  getById(id: number) {
    this.http.get<Product>(`/api/product/${id}`)
    .subscribe({
      next: (product) => this.productSig.set(product),
      error: (err) => console.error(err)
    });
  }

  create( product: Product) {
    this.http.post<Product>('/api/product', product)
    .subscribe({
      next: (product) => this.productSig.set(product),
      error: (err) => console.error(err)
    });
  }

  update(product: Product) {
    this.http.put<Product>(`/api/product/${product.id}`, product)
    .subscribe({
      next: (product) => this.productSig.set(product),
      error: (err) => console.error(err)
    });
  }

  delete(id: number) {
    this.http.delete<Product>(`/api/product/${id}`)
    .subscribe({
      next: (product) => this.productSig.set(product),
      error: (err) => console.error(err)
    });
  }
}
