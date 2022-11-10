import { Component, OnInit} from '@angular/core';
import { FoodCategory, FoodTag, MenuItem } from '../models/menu-item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: MenuItem[] = [
    {name: "Potato", price: 4.97, imageUrl: "../../assets/images/menuItems/potato.png", description: "One yummy peeled potato. One yummy peeled potato. One yummy peeled potato. ", calories: 50, count: 5, tags: [FoodTag.Halal], category: FoodCategory.Burger, isFavorite: false, isPopular: true},
    {name: "Watermelon", price: 2.00, imageUrl: "../../assets/images/menuItems/watermelon.png", description: "A juicy red watermelon with seeds. A juicy red watermelon with seeds. A juicy red watermelon with seeds. ", calories: 75, count: 2, tags: [FoodTag.Vegetarian], isFavorite: true, isPopular:false, category:FoodCategory.Salad},
    {name: "Croissant", price: 4.32, imageUrl: "../../assets/images/menuItems/croissant.png", description: "A buttery croissant freshly made from paris. A buttery croissant freshly made from paris. A buttery croissant freshly made from paris. ", calories: 290, count: 8, tags: [FoodTag.Vegetarian], isPopular:true, isFavorite:true, category: FoodCategory.Salad}
  ]
  deliveryChecked = true;
  constructor() { }

  ngOnInit(): void {
  }
  checkTrue(): boolean{
    console.log(this.cartItems)
    return true
  }

  removeCartItem(index:number){
    console.log(index)
    this.cartItems.splice(index,1)
  }

}
