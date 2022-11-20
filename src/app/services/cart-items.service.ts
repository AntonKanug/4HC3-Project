import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FoodCategory, FoodTag, MenuItem } from '../models/menu-item';

@Injectable({
  providedIn: 'root',
})
export class CartItemsService {
  private _cartItems: BehaviorSubject<MenuItem[]> = new BehaviorSubject<
    MenuItem[]
  >([]);

  private _deliveryChecked: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  public readonly cartItems: Observable<MenuItem[]> =
    this._cartItems.asObservable();

  public readonly deliveryChecked: Observable<boolean> =
    this._deliveryChecked.asObservable();

  addItem(item: MenuItem) {
    const filter = this._cartItems
      .getValue()
      .filter((i) => i.name == item.name);
    if (filter.length > 0) {
      filter[0].count += item.count;
    } else {
      this._cartItems.next([...this._cartItems.getValue(), { ...item }]);
    }
  }

  removeItem(item: MenuItem) {
    const removedItem = this._cartItems
      .getValue()
      .filter((i) => i.name != item.name);
    this._cartItems.next(removedItem);
  }

  removeIndex(item: MenuItem) {
    const removedItem = this._cartItems
      .getValue()
      .filter((i) => i.name != item.name);
    this._cartItems.next(removedItem);
  }

  adjustItemValue(item: MenuItem) {
    if (item.count == 0) {
      this.removeItem(item);
      return;
    }

    const filter = this._cartItems
      .getValue()
      .filter((i) => i.name == item.name);
    if (filter.length > 0) {
      filter[0].count = item.count;
    }
  }

  toggleDeliveryChecked() {
    this._deliveryChecked.next(!this._deliveryChecked.getValue());
  }
}
