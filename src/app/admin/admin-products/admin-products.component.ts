import { Component} from '@angular/core';
// Services
import { CategoryService } from '../../services/category/category.service';
import { ProductManagementService } from '../../services/product/product-management.service';
// Models
import { Product } from '../../models/product';
import { Category } from '../../models/category';
// Onservables
import { take } from 'rxjs/operators';

/*
**Developed By: Arka Das
**Last Modified On: 22-08-2018
*/

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent {
  // ################## //
  filteredProducts: Product[];
  // ################## //
  private products: Product[];
  private categories: Category[];
  // ################## //
  constructor(
    private prodManageService: ProductManagementService,
    private categoryService: CategoryService
  ) {
    // ################## //
    categoryService.getAll().pipe(take(1)) .subscribe(c => this.categories = c);
    // ################## //
    prodManageService.getAll().pipe(take(1)).subscribe(p => this.filteredProducts = this.products = p);
   }
  // ################## //
  filter(query: string) {
    this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }
}
