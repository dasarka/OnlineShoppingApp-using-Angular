import { Category } from './../../models/category';
import { Router } from '@angular/router';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductManagementService } from '../../services/product/product-management.service';
import { Subscription } from 'rxjs';
import { Product } from '../../models/products';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  private products: Product[];
  filteredProducts: Product[];
  private categories: Category[];
  subscripton: Subscription;
  subscripton_1: Subscription;
  constructor(private prodManageService: ProductManagementService) {
    this.subscripton = this.prodManageService.getAllCategories()
      .subscribe(c => this.categories = c);
    this.subscripton_1 = this.prodManageService.getAllProducts()
      .subscribe(p => this.filteredProducts = this.products = p);
   }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.subscripton.unsubscribe();
    this.subscripton_1.unsubscribe();
  }
  filter(query: string) {
    this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }
}
