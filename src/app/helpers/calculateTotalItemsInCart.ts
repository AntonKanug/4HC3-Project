import { MenuItem } from '../models/menu-item';

const CalculateNumberOfItems = (items: MenuItem[]) => {
  return items.reduce((x, y) => x + y.count, 0);
};

export { CalculateNumberOfItems };
