import { Injectable } from '@angular/core';
// Services
import { DataService } from '../data/data.service';
// Models
import { Product } from '../../models/product';
// Observables
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';

/*
**Developed By: Arka Das
**Last Modified On: 26-08-2018
*/

@Injectable({
  providedIn: 'root'
})
export class ProductManagementService {
  private product: Product;
  constructor(private dataService: DataService) {}
  // ********************************************************************************************** //
  // Create Product in firebase
  // ********************************************************************************************** //
  createProduct(body: Product) {
    this.dataService.create('/products', body);
  }
  // ********************************************************************************************** //
  // get all product from firebase
  // ********************************************************************************************** //
  getAll(): Observable<Product[]> {
    return this.dataService.getAll('/products');
  }
  // ********************************************************************************************** //
  // get single product from firebase
  // ********************************************************************************************** //
  get(id: string): Observable<Product> {
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
  // ********************************************************************************************** //
  // update product in firebase
  // ********************************************************************************************** //
  updateProduct(id: string, body: Product) {
    this.dataService.update('/products' , id, body);
  }
  // ********************************************************************************************** //
  // remove product from firebase
  // ********************************************************************************************** //
  removeProduct(id: string) {
    this.dataService.remove('/products' , id);
  }
}
