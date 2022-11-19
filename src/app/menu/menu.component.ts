import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { map, Observable, startWith } from 'rxjs';
import { FoodCategory, FoodTag, MenuItem } from '../models/menu-item';
import { CartItemsService } from '../services/cart-items.service';
import { CalculateNumberOfItems } from '../helpers/calculateTotalItemsInCart';

enum SortOption {
  PLTH = 'Price (Low to High)',
  PHTL = 'Price (High to Low)',
  CLTH = 'Calories (Low to High)',
  CHTL = 'Calories (High to Low)',
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  foodCategories = Object.values(FoodCategory);

  dietaryRestrictions = Object.values(FoodTag);
  dietaryFilters = new FormControl('');

  searchableNames: Observable<string[]>;
  searchControl = new FormControl('');

  sortOption = '';
  sortOptions: string[] = Object.values(SortOption);

  allItems: MenuItem[] = [
    {
      name: 'Shiba Inu',
      price: 99.99,
      description:
        'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.',
      calories: 350,
      tags: [FoodTag.Halal, FoodTag.Vegetarian],
      category: FoodCategory.Burger,
      imageUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      isPopular: true,
      isFavorite: true,
    },
    {
      name: 'Apple Bowl',
      price: 9.99,
      description: 'A juicy bowl of apples.',
      calories: 200,
      tags: [FoodTag.Vegetarian],
      category: FoodCategory.Salad,
      imageUrl:
        'https://media.istockphoto.com/id/518339352/photo/apples-in-bowl.jpg?s=612x612&w=0&k=20&c=5OESjebtcZBrD6t6O82Ohf_pmJITLdJFdavfTB5e57I=',
      isPopular: false,
      isFavorite: false,
    },
    {
      name: 'Crispy Tofu',
      price: 14.99,
      description:
        'Crispy Japanese tofu served with sweet chili sauce and peanut.',
      calories: 550,
      tags: [FoodTag.Vegetarian],
      category: FoodCategory.Appetizers,
      imageUrl:
        'https://raw.githubusercontent.com/YoussefRizkalla/wild-tiger/master/src/images/food/tofu.jpg',
      isPopular: false,
      isFavorite: false,
    },
    {
      name: 'Stir-fried Cashew',
      price: 19.99,
      description:
        'Onion, celery, bell pepper, carrot, and cashew nut in roasted sweet chili sauce.',
      calories: 800,
      tags: [FoodTag.Vegetarian],
      category: FoodCategory.Salad,
      imageUrl:
        'https://raw.githubusercontent.com/YoussefRizkalla/wild-tiger/master/src/images/food/friedcashew.jpg',
      isPopular: false,
      isFavorite: true,
    },
    {
      name: 'Apple Tart',
      price: 10.99,
      description: 'Loaded with fresh apples and baked to a perfect golden brown',
      calories: 348,
      tags: [FoodTag.Vegetarian],
      category: FoodCategory.Appetizers,
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0277/5626/5555/products/ApplePuffPastry1_1024x1024@2x.jpg?v=1637474617',
      isPopular: true,
      isFavorite: false,
    },
    {
      name: 'Grilled Shrimp with Apple and Charred Scallions',
      price: 13.99,
      description: 'We prepare the shrimp as a light appetizer with green apple, charred scallions, smoked paprika and sesame seeds.',
      calories: 450,
      tags: [],
      category: FoodCategory.Seafood,
      imageUrl:
        'https://www.foodandwine.com/thmb/7GxLbPd4jVu4ITuTgiftxOJ5uqo=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/201111-xl-grilled-shrimp-with-apple-and-charred-scallions-f7d303453cf5461082d949c56967b235.jpg',
      isPopular: true,
      isFavorite: false,
    },
    {
      name: 'Scallops with Apple Pan Sauce',
      price: 21.99,
      description: 'Our sweet-tart juice complements the rich scallops.',
      calories: 1000,
      tags: [],
      category: FoodCategory.Seafood,
      imageUrl:
        'https://assets.bonappetit.com/photos/57ae124af1c801a1038bcf66/1:1/w_2240,c_limit/scallops-with-apple-pan-sauce-646.jpg',
      isPopular: false,
      isFavorite: false,
    },
  ];
  currentItems: MenuItem[] = this.allItems;

  cartItems: MenuItem[] = [];

  searchValue = '';
  curTabLabel = 'All';

  constructor(private cartItemService: CartItemsService) {}

  ngOnInit(): void {
    this.cartItemService.cartItems.subscribe((res) => {
      this.cartItems = res;
    });

    this.searchableNames = this.searchControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._search(value || ''))
    );
  }

  private _search(value: string): string[] {
    this.searchValue = value.toLowerCase();
    this.filterItems();
    return this.currentItems.map((item) => item.name);
  }

  onChangeTab(event: MatTabChangeEvent): void {
    this.curTabLabel = event.tab.textLabel;
    this.filterItems();
  }

  toggleFavourite(item: MenuItem): void {
    this.filterItems();
  }

  filterItems() {
    switch (this.curTabLabel) {
      case 'All':
        this.currentItems = this.allItems;
        break;
      case 'Favourites':
        this.currentItems = this.allItems.filter((item) => item.isFavorite);
        break;
      case 'Popular':
        this.currentItems = this.allItems.filter((item) => item.isPopular);
        break;
      default:
        const category = this.curTabLabel as FoodCategory;
        this.currentItems = this.allItems.filter(
          (item) => item.category === category
        );
        break;
    }
    const dietaryFilters = this.dietaryFilters.value as FoodTag[];
    this.currentItems = this.currentItems.filter(
      (item) =>
        item.name.toLowerCase().includes(this.searchValue) &&
        (item.tags.some((t) => dietaryFilters.includes(t)) ||
          dietaryFilters.length === 0)
    );
    const sortOption = this.sortOption as SortOption;
    switch (sortOption) {
      case SortOption.PLTH:
        this.currentItems.sort((a, b) => a.price - b.price);
        break;
      case SortOption.PHTL:
        this.currentItems.sort((a, b) => b.price - a.price);
        break;
      case SortOption.CLTH:
        this.currentItems.sort((a, b) => a.calories - b.calories);
        break;
      case SortOption.CHTL:
        this.currentItems.sort((a, b) => b.calories - a.calories);
        break;
      default:
        break;
    }
  }

  removeItemFromCart(item: MenuItem) {
    this.cartItemService.removeItem(item);
  }

  getNumberOfItems() {
    return CalculateNumberOfItems(this.cartItems);
  }
}
