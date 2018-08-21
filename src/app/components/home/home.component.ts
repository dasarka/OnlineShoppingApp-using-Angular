import { Product } from './../../models/products';
import { Subscription } from 'rxjs';
import { ProductManagementService } from './../../services/product/product-management.service';
import { Category } from './../../models/category';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  activeItem: string;
  categories: Category[];
  private products: Product[];
  filteredProducts: Product[];
  subscription: Subscription;
  subscription_1: Subscription;
  favList = {};
  constructor(private prodManageService: ProductManagementService) {
    this.activeItem = 'all';
    this.subscription = this.prodManageService.getAllCategories()
    .subscribe(c => {
      this.categories = c;
      this.categories.splice(0, 0, {
        key: 'all',
        name: 'All Categories',
        unit: ''
      });
    });
    this.subscription_1 = this.prodManageService.getAllProducts()
      .subscribe(p => {
        this.filteredProducts = this.products = p;
        p.forEach(element => {
          this.favList[element.key] = false;
        });
      });
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription_1.unsubscribe();
  }

  filterProduct(category: string) {
    this.activeItem = category;
    this.filteredProducts = (category === 'all') ? this.products :
      this.products.filter(p => p.selectedCategory.toLowerCase().includes(category.toLowerCase())) ;
  }
  addFavourite(productId: string) {
    this.favList[productId] = !this.favList[productId];
  }
}
