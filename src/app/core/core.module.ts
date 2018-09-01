import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from 'core/components/navbar/navbar.component';
import { HomeComponent } from 'core/components/home/home.component';
import { NotFoundComponent } from 'core/exceptions/not-found/not-found.component';
import { ProductFilterComponent } from 'core/components/product-filter/product-filter.component';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    [RouterModule.forChild([])]
  ],
  exports: [
    NavbarComponent
  ],
  declarations: [
    NavbarComponent,
    HomeComponent,
    NotFoundComponent,
    ProductFilterComponent
  ]
})
export class CoreModule { }
