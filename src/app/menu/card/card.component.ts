import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  constructor(private cartItemService: CartItemsService) {}

  ngOnInit(): void {}

  toggleFavourite() {
    this.item.isFavorite = !this.item.isFavorite;
    this.onFavourite.emit(this.item);
  }

  addToCart() {
    this.item.count = this.menuForm.value['itemAmount'];
    this.cartItemService.addItem(this.item);
  }
}
