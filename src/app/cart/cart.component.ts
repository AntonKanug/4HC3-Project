import { Component, OnInit} from '@angular/core';
import { FoodCategory, FoodTag, MenuItem } from '../models/menu-item';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {}
  cartItems: MenuItem[] = [
    {name: "Potato", price: 4.97, imageUrl: "../../assets/images/menuItems/potato.png", description: "One yummy peeled potato. One yummy peeled potato. One yummy peeled potato. ", calories: 50, count: 5, tags: [FoodTag.Halal], category: FoodCategory.Burger, isFavorite: false, isPopular: true},
    {name: "Watermelon", price: 2.00, imageUrl: "../../assets/images/menuItems/watermelon.png", description: "A juicy red watermelon with seeds. A juicy red watermelon with seeds. A juicy red watermelon with seeds. ", calories: 75, count: 2, tags: [FoodTag.Vegetarian], isFavorite: true, isPopular:false, category:FoodCategory.Salad},
    {name: "Croissant", price: 4.32, imageUrl: "../../assets/images/menuItems/croissant.png", description: "A buttery croissant freshly made from paris. A buttery croissant freshly made from paris. A buttery croissant freshly made from paris. ", calories: 290, count: 8, tags: [FoodTag.Vegetarian], isPopular:true, isFavorite:true, category: FoodCategory.Salad}
  ]
  deliveryChecked = false;
  deliveryCost = 4.25;

  deliveryForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl(''),
    address2: new FormControl(''),
    city: new FormControl(''),
    province: new FormControl(''),
    postalCode: new FormControl('')
  });

  onSubmit(){
    // might want to pass this to the checkout page
    console.log(this.deliveryForm.value);
  }

  getCartTotal(): number {
    var total: number = 0;
    for (let i = 0; i<this.cartItems.length; i++){
      total+= this.cartItems[i].price * this.cartItems[i].count!;
    }
    return Math.round(total * 100)/100
  }

  removeCartItem(index:number){
    console.log(index)
    this.cartItems.splice(index,1)
  }
}
