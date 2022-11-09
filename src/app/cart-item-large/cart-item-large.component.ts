import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MenuItem } from '../schemas/MenuItem';

@Component({
  selector: 'app-cart-item-large',
  templateUrl: './cart-item-large.component.html',
  styleUrls: ['./cart-item-large.component.scss'],
})
export class CartItemLargeComponent implements OnInit {
  @Input() CartItem: MenuItem | undefined;
  @Input() index: number | undefined;

  @Output() itemToDelete = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  delItem(){
    this.itemToDelete.emit(this.index!);
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
  }
}
