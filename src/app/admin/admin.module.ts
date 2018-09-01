import { SharedModule } from './../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AllOrdersComponent } from 'admin/components/orders/orders.component';
import { ProductFormComponent } from 'admin/components/product-form/product-form.component';
import { ProductsComponent } from 'admin/components/products/products.component';
import { AdminAuthGuard } from 'admin/services/admin-auth-guard/admin-auth-guard.service';
import { DataTableModule } from 'angular-6-datatable';
import { AuthGuard } from 'shared/services/auth-guard/auth-guard.service';

const adminRoutes: Routes = [
  {
    path: 'admin/products/:productId',
    component: ProductFormComponent,
    canActivate : [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/products',
    component: ProductsComponent,
    canActivate : [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/orders',
    component: AllOrdersComponent,
    canActivate : [AuthGuard, AdminAuthGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    [RouterModule.forChild(adminRoutes)],
    SharedModule
  ],
  declarations: [
    AllOrdersComponent,
    ProductsComponent,
    ProductFormComponent
  ],
  providers: [
    AdminAuthGuard
  ],
})
export class AdminModule { }
