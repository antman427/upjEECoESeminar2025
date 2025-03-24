import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newproduct',
  imports: [ReactiveFormsModule],
  templateUrl: './newproduct.component.html',
  styleUrl: './newproduct.component.scss'
})
export class NewProductComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  myForm!: FormGroup;
  submitted = false;
  private productService = inject(ProductService);

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
      price: [0, [Validators.required, Validators.min(.01)]],
    });
  }

  onSubmit() {
    if( this.myForm.valid) {
      this.submitted = true;
      this.productService.create(
        new Product(
          this.myForm.value.name,
          this.myForm.value.description,
          this.myForm.value.price
        ));
      this.router.navigate(['/products']);
    }
  }
}
