import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { map, Observable, startWith } from 'rxjs';
import { FoodCategory, FoodTag, MenuItem } from '../models/menu-item';
import { CartItemsService } from '../services/cart-items.service';
import { CalculateNumberOfItems } from '../helpers/calculateTotalItemsInCart';
import { MatSnackBar } from '@angular/material/snack-bar';

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
      name: 'Apple Bowl',
      price: 9.99,
      description: 'A juicy bowl of apples.',
      calories: 200,
      tags: [FoodTag.Vegetarian],
      category: FoodCategory.Salad,
      imageUrl: './assets/images/menuItems/apple.jpg',
      isPopular: false,
      isFavorite: false,
    },
    {
      name: 'Cheeseburger',
      price: 14.99,
      description:
        'Lamb meat grilled to perfection and topped with cheese, onions, tomatoes and lettuce.',
      calories: 876,
      tags: [FoodTag.Halal],
      category: FoodCategory.Burger,
      imageUrl: './assets/images/menuItems/MeatBurger.jpg',
      isPopular: true,
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
      imageUrl: './assets/images/menuItems/tofu.jpg',
      isPopular: false,
      isFavorite: false,
    },
    {
      name: 'Crispy Calamari',
      price: 11.49,
      description:
        'Crispy calamari served with Siracha cream sauce.',
      calories: 650,
      tags: [FoodTag.Halal],
      category: FoodCategory.Seafood,
      imageUrl: './assets/images/menuItems/calamari.jpg',
      isPopular: false,
      isFavorite: false,
    },
    {
      name: 'Chicken Burger',
      price: 12.99,
      description:
        'Our crispy Halal chicken with lettuce and our speciality buttermilk sauce.',
      calories: 640,
      tags: [FoodTag.Halal],
      category: FoodCategory.Burger,
      imageUrl: './assets/images/menuItems/ChickenBurger.jpg',
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
      imageUrl: './assets/images/menuItems/friedcashew.jpg',
      isPopular: false,
      isFavorite: false,
    },
    {
      name: 'Grilled Shrimp',
      price: 13.99,
      description:
        'We prepare the shrimp as a light appetizer with green apple, charred scallions, smoked paprika and sesame seeds.',
      calories: 450,
      tags: [FoodTag.Halal],
      category: FoodCategory.Seafood,
      imageUrl: './assets/images/menuItems/GrilledShrimp.png',
      isPopular: true,
      isFavorite: false,
    },
    {
      name: 'Veggie Burger',
      price: 13.99,
      description:
        'A healthy beyond meat matty with tomatoes, lettuce and onions.',
      calories: 600,
      tags: [FoodTag.Vegetarian],
      category: FoodCategory.Burger,
      imageUrl: './assets/images/menuItems/VeggieBurger.jpg',
      isPopular: false,
      isFavorite: false,
    },
    {
      name: 'Apple Pan Scallops',
      price: 21.99,
      description: 'Our sweet-tart juice complements the rich scallops.',
      calories: 1000,
      tags: [FoodTag.Halal],
      category: FoodCategory.Seafood,
      imageUrl: './assets/images/menuItems/scallop.png',
      isPopular: false,
      isFavorite: false,
    },
    {
      name: 'Apple Tart',
      price: 10.99,
      description:
        'Loaded with fresh apples and baked to a perfect golden brown',
      calories: 348,
      tags: [FoodTag.Vegetarian],
      category: FoodCategory.Appetizers,
      imageUrl: './assets/images/menuItems/AppleTart.png',
      isPopular: true,
      isFavorite: false,
    },
  ];
  currentItems: MenuItem[] = this.allItems;

  cartItems: MenuItem[] = [];

  searchValue = '';
  curTabLabel = 'All';

  constructor(
    private cartItemService: CartItemsService,
    private snackBar: MatSnackBar
  ) {}

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
    const sbRef = this.snackBar.open(
      `Removed ${item.name} x${item.count} from cart.`,
      'Undo',
      {
        duration: 3000,
      }
    );
    sbRef.onAction().subscribe(() => {
      this.cartItemService.addItem(item);
    });
  }

  getNumberOfItems() {
    return CalculateNumberOfItems(this.cartItems);
  }
}
