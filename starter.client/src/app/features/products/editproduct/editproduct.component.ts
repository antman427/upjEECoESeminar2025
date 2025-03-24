import { Component, effect, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-newproduct',
  imports: [ReactiveFormsModule],
  templateUrl: './editproduct.component.html',
  styleUrl: './editproduct.component.scss'
})
export class EditProductComponent {
  private fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private productService = inject(ProductService);

  myForm!: FormGroup;
  submitted = false;
  productid = 0;

  constructor() {
    this.myForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
      price: [0, [Validators.required, Validators.min(.01)]],
    });

    if( this.activatedRoute.snapshot.paramMap.has('id') &&
        Number(this.activatedRoute.snapshot.paramMap.get('id')) > 0) {
      this.productid = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    }
    if( this.productid > 0) {
      this.productService.get();
      effect(() => {
        const prod = this.productService.productsSig();
        if( prod.length > 0) {
          this.loadProductData(this.productid);
        }
      });
    }
  }

  loadProductData(id: number) {
    const product = this.productService.getById(id);
    if( product !== undefined) {
      this.myForm.setValue({
        name: product.name,
        description: product.description,
        price: product.price
      });
    }
  }

  onSubmit() {
    if( this.myForm.valid && this.productid === 0) {
      this.submitted = true;
      this.productService.create(
        new Product( 0,
          this.myForm.value.name,
          this.myForm.value.description,
          this.myForm.value.price
        ));
      this.router.navigate(['/products']);
    } else if( this.myForm.valid && this.productid > 0) {
      this.submitted = true;
      this.productService.update(
        new Product(
          this.productid,
          this.myForm.value.name,
          this.myForm.value.description,
          this.myForm.value.price
        ));
      this.router.navigate(['/products']);
    }
  }
}
