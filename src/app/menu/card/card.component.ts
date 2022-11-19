import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MenuItem } from 'src/app/models/menu-item';
import { CartItemsService } from 'src/app/services/cart-items.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() item: MenuItem;
  @Output() onFavourite: EventEmitter<MenuItem> = new EventEmitter();

  menuForm = new FormGroup({
    itemAmount: new FormControl(1),
  });
  constructor(
    private cartItemService: CartItemsService,
    private snackBar: MatSnackBar
  ) {}
  count = 1;

  ngOnInit(): void {}

  toggleFavourite() {
    this.item.isFavorite = !this.item.isFavorite;
    this.onFavourite.emit(this.item);
  }

  addToCart() {
    this.item.count = this.count;
    this.cartItemService.addItem(this.item);
    this.snackBar.open(
      `Added ${this.item.name} x${this.item.count} to cart.`,
      'Dismiss',
      {
        duration: 2000,
      }
    );
  }

  handleMinus() {
    this.count -= 1;
  }
  handlePlus() {
    this.count += 1;
  }
}
