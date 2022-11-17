export interface MenuItem {
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  calories: number;
  tags: FoodTag[];
  category: FoodCategory;
  isPopular: boolean;
  isFavorite: boolean;
  count?: number;
}

export enum FoodTag {
  Vegetarian = 'Vegetarian',
  Halal = 'Halal',
}

export enum FoodCategory {
  Burger = 'Burgers',
  Seafood = 'Seafood',
  Salad = 'Salads',
  Appetizers = 'Appetizers',
}
