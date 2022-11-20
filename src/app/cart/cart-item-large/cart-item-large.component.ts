import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { MenuItem } from '../../models/menu-item';

@Component({
  selector: 'app-cart-item-large',
  templateUrl: './cart-item-large.component.html',
  styleUrls: ['./cart-item-large.component.scss'],
})
export class CartItemLargeComponent implements OnInit {
  @Input() item: MenuItem | undefined;
  @Input() index: number | undefined;

  @Output() itemToDelete = new EventEmitter();

  constructor(
    private snackBar: MatSnackBar,
    private cartItemService: CartItemsService
  ) {}

  ngOnInit(): void {}

  delItem() {
    this.itemToDelete.emit(this.item!);

    const sbRef = this.snackBar.open(
      `Removed ${this.item.name} x${this.item.count} from cart.`,
      'Undo',
      {
        duration: 3000,
      }
    );
    sbRef.onAction().subscribe(() => {
      this.cartItemService.addItem(this.item);
    });
  }

  incItemCount() {
    if (this.item?.count) {
      this.item!.count += 1;
    }
  }
  decItemCount() {
    if (this.item?.count && this.item.count > 1) {
      this.item!.count -= 1;
    }
  }
}
