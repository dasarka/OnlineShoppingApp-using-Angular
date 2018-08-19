import { Product } from './../../models/products';
import { ProductManagementService } from './../../services/product/product-management.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  removeFlag: boolean;
  productForm;
  categories$;
  private productId;
  constructor(
    fb: FormBuilder,
    private prodManageService: ProductManagementService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.categories$ = this.prodManageService.categories;
    this.productForm = fb.group({
      title  : new FormControl('',
        Validators.required),
      price  : new FormControl('',
        Validators.required),
      selectedCategory : new FormControl('',
        Validators.required),
      imgUrl : new FormControl('',
        Validators.required),
    });
  }
  ngOnInit() {
    const params = this.route.snapshot.paramMap;
    this.productId = params.get('productId');
    // new form
    if (this.productId === 'new') {
      this.removeFlag = false;
    } else {
      this.removeFlag = true;
    }
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
    console.log('removeProduct');
  }

  saveProduct() {
    if (this.productId === 'new') {
      this.prodManageService.createProduct(this.productForm.value);
    }
    this.router.navigate(['/admin/products']);
  }
}
