import { Category } from 'shared/models/category';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
// Services
import { ProductManagementService } from 'shared/services/product/product-management.service';
// Models
import { Product } from 'shared/models/product';
// Observables
import { switchMap, take } from 'rxjs/operators';

/*
**Developed By: Arka Das
**Last Modified On: 22-08-2018
*/

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // ################## //
  filteredProducts: Product[];
  favList = {};
  // ################## //
  private products;
  // ################## //
  constructor(
    private route: ActivatedRoute,
    private prodManageService: ProductManagementService
  ) {
    // ################## //
    this.populateProducts();
  }

  private populateProducts() {
    this.prodManageService.getAll()
    .pipe(
      take(1),
      switchMap(products => {
      this.products = products;
      this.products.forEach(element => {
        this.favList[element.key] = false;
      });
      // ################## //
      return this.route.queryParamMap;
      })
    ).subscribe(params => {
        const category = ( params.get('category')) ? params.get('category') : 'all';
        this.applyFilter(category);
      });
  }

  private applyFilter(category) {
    this.filteredProducts = (category === 'all') ? this.products :
    this.products.filter(p => p.selectedCategory.toLowerCase().includes(category.toLowerCase())) ;
  }
}
