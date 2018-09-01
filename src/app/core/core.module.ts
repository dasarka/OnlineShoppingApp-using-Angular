import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from 'core/components/home/home.component';
import { NotFoundComponent } from 'core/exceptions/not-found/not-found.component';
import { ProductFilterComponent } from 'core/components/product-filter/product-filter.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    [RouterModule.forChild([])],
    SharedModule
  ],
  exports: [
    HomeComponent
  ],
  declarations: [
    HomeComponent,
    NotFoundComponent,
    ProductFilterComponent
  ]
})
export class CoreModule { }
