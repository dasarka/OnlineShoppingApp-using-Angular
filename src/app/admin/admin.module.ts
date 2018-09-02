import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ManageOrdersComponent } from 'admin/components/manage-orders/manage-orders.component';
import { ProductFormComponent } from 'admin/components/product-form/product-form.component';
import { ProductsComponent } from 'admin/components/products/products.component';
import { AdminAuthGuard } from 'admin/services/admin-auth-guard/admin-auth-guard.service';
import { DataTableModule } from 'angular-6-datatable';
import { AuthGuard } from 'shared/services/auth-guard/auth-guard.service';

import { SharedModule } from './../shared/shared.module';
import { ManageOrdersService } from './services/manage-orders/manage-orders.service';

const adminRoutes: Routes = [
  {
    path: 'admin/products/:productId',
    component: ProductFormComponent,
    canActivateChild : [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/products',
    component: ProductsComponent,
    canActivateChild : [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/orders',
    component: ManageOrdersComponent,
    canActivateChild : [AuthGuard, AdminAuthGuard]
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
    ManageOrdersComponent,
    ProductsComponent,
    ProductFormComponent
  ],
  providers: [
    AdminAuthGuard,
    ManageOrdersService,
  ]
})
export class AdminModule { }
