import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  private productService = inject(ProductService);
  products = this.productService.productsSig;

  ngOnInit(): void {
    this.productService.get();
  }

  //loadProducts() {
    // If productsSig doesn't load, I'll load here
  //}

}
