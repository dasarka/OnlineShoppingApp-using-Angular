import { Category } from './../../models/category';
import { Product } from './../../models/products';
import { ProductManagementService } from './../../services/product/product-management.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {take} from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  removeFlag: boolean;
  productForm;
  product: Product = {title: '', price: null, selectedCategory: '', imgUrl: ''};
  categories: Category[];
  subscription: Subscription;
  private productId;
  constructor(
    fb: FormBuilder,
    private prodManageService: ProductManagementService,
    private router: Router,
    private route: ActivatedRoute
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

    this.subscription = this.prodManageService.getAllCategories()
    .subscribe(c => this.categories = c);

  }
  // base64 validateion pattern
  // /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i

  // image address pattern
  // "([^\\s]+(\\.(?i)(jpg|png|gif|bmp))$)"

  ngOnInit() {
    const params = this.route.snapshot.paramMap;
    this.productId = params.get('productId');
    // new form
    if (this.productId === 'new') {
      this.removeFlag = false;
    } else {
      this.removeFlag = true;
      this.prodManageService.getProduct(this.productId).pipe(take(1)).subscribe(p => {
        this.product = p;
      });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
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
