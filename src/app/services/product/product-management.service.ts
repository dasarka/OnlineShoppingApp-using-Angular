import { Product } from './../../models/products';
import { DataService } from './../data/data.service';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ProductManagementService {

  constructor(private dataService: DataService) { }

  get categories() {
    return this.dataService.get('/categories', 'name');
  }
  createProduct(body: Product) {
    this.dataService.create('/products', body);
  }
}
