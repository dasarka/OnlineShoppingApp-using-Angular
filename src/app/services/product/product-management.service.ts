import { Category } from './../../models/category';
import { Product } from './../../models/products';
import { DataService } from './../data/data.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductManagementService {

  private product: Product;
  constructor(private dataService: DataService) {}

  getAllCategories() {
    return this.dataService.getAll('/categories', 'name');
  }
  getAllProducts() {
    return this.dataService.getAll('/products');
  }
  createProduct(body: Product) {
    this.dataService.create('/products', body);
  }
  getProduct(id: string): Observable<Product> {
    return this.dataService.get('/products/' + id)
    .pipe(
      switchMap(product => {
        if (product) {
          return Observable.of(product);
        }

        return Observable.of(null);
      })
    );
  }
  updateProduct(id: string, body: Product) {
    this.dataService.update('/products' , id, body);
  }
  removeProduct(id: string) {
    this.dataService.remove('/products' , id);
  }
}
