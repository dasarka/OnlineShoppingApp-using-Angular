import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DatabaseModule } from 'database/database.module';

import { OrderCardComponent } from './components/order-card/order-card.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { AuthGuard } from './services/auth-guard/auth-guard.service';
import { AuthService } from './services/auth/auth.service';
import { CategoryService } from './services/category/category.service';
import { ProductManagementService } from './services/product/product-management.service';
import { ShoppingService } from './services/shopping/shopping.service';

@NgModule({
  imports: [
    CommonModule,
    DatabaseModule
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent,
    OrderCardComponent
  ],
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
    OrderCardComponent
  ],
  providers: [
    AuthService,
    AuthGuard,
    ProductManagementService,
    CategoryService,
    ShoppingService
  ]
})
export class SharedModule { }
