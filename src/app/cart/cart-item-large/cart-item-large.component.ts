import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MenuItem } from '../../schemas/MenuItem';

@Component({
  selector: 'app-cart-item-large',
  templateUrl: './cart-item-large.component.html',
  styleUrls: ['./cart-item-large.component.scss'],
})
export class CartItemLargeComponent implements OnInit {
  @Input() item: MenuItem | undefined;
  @Input() index: number | undefined;

  @Output() itemToDelete = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  delItem(){
    this.itemToDelete.emit(this.index!);
  }

  incItemCount() {
    if (this.item?.count && this.item.count < 10) {
      this.item!.count += 1;
    }
  }
  decItemCount() {
    if (this.item?.count && this.item.count > 1) {
      this.item!.count -= 1;
    }
  }
}
