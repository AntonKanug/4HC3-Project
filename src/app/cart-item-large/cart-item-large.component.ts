import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from '../schemas/MenuItem';

@Component({
  selector: 'app-cart-item-large',
  templateUrl: './cart-item-large.component.html',
  styleUrls: ['./cart-item-large.component.scss'],
})
export class CartItemLargeComponent implements OnInit {
  @Input() CartItem: MenuItem | undefined;
  @Input() a: number | undefined;
  constructor() {}

  ngOnInit(): void {}

  delItem(){
    delete(this.CartItem)
  }
  incItemCount() {
    if (this.CartItem?.count && this.CartItem.count < 10) {
      this.CartItem!.count += 1;
    }
  }
  decItemCount() {
    if (this.CartItem?.count && this.CartItem.count > 1) {
      this.CartItem!.count -= 1;
    }
    console.log(this.CartItem?.count);
  }
}
