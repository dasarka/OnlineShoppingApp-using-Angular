import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// Services
import { CategoryService } from '../../services/category/category.service';
import { ProductManagementService } from '../../services/product/product-management.service';
// Models
import { Category } from '../../models/category';
import { Product } from '../../models/product';
// Observables
import {take} from 'rxjs/operators';

/*
**Developed By: Arka Das
**Last Modified On: 22-08-2018
*/

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
 // ################## //
  removeFlag: boolean;
  productForm;
  product: Product = {
    title: '',
    price: null,
    selectedCategory: '',
    imgUrl: ''
  };
  categories: Category[];
  // ################## //
  private productId;
  constructor(
    fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private prodManageService: ProductManagementService,
    private categoryService: CategoryService
  ) {
    this.productForm = fb.group({
      title  : new FormControl('',
        Validators.required),
      price  : new FormControl('',
        [
          Validators.required,
          Validators.min(1)
        ]),
      selectedCategory : new FormControl('',
        Validators.required),
      imgUrl : new FormControl('',
        [
          Validators.required
          // Validators.pattern('([^\\s]+(\\.(?i)(jpg|png|gif|bmp))$)')
        ]),
    });
    // ################## //
    categoryService.getAll().pipe(take(1)).subscribe(c => {
      this.categories = c;
    });
  }
  // base64 validateion pattern
  // /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i

  // image address pattern
  // "([^\\s]+(\\.(?i)(jpg|png|gif|bmp))$)"
  // ################## //
  ngOnInit() {
    const params = this.route.snapshot.paramMap;
    this.productId = params.get('productId');
    // ################## //
    if (this.productId === 'new') {
      this.removeFlag = false;
    } else {
      this.removeFlag = true;
      this.prodManageService.get(this.productId).pipe(take(1)).subscribe(p => {
        this.product = p;
      });
    }
  }

  // ################## //
  get title() {
    return this.productForm.get('title');
  }
  get price() {
    return this.productForm.get('price');
  }
  get selectedCategory() {
    return this.productForm.get('selectedCategory');
  }
  get imgUrl() {
    return this.productForm.get('imgUrl');
  }

  // ################## //
  removeProduct() {
    if (confirm('Are your sure to delete this product?')) {
      this.prodManageService.removeProduct(this.productId);
    }
    this.router.navigate(['/admin/products']);
  }

  saveProduct() {
    if (this.productId === 'new') {
      this.prodManageService.createProduct(this.productForm.value);
    } else {
      this.prodManageService.updateProduct(this.productId, this.productForm.value);
    }
    this.router.navigate(['/admin/products']);
  }
}
