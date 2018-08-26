import { ShoppingService } from '../../services/shopping/shopping.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
  @Input('productKey') productKey: string;
  @Input('quantity') quantity: number;
  @Input('suffix') suffix: string;
  @Output('change') change = new EventEmitter();

  constructor(private shoppingService: ShoppingService) { }
// ################# //
async increaseQuantity(productKey) {
  // ################# //
  await this.shoppingService.updateCount(productKey, 1);
  // emit event
  this.change.emit();
}
// ################# //
async decreaseQuantity(productKey) {
  // ################# //
  await this.shoppingService.updateCount(productKey, -1);
  // emit event
  this.change.emit();
}
}
