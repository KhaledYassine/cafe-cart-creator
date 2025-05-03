
import { Category, MenuItem } from '@/types';

export const categories: Category[] = [
  { id: 'coffee', name: 'Coffee' },
  { id: 'tea', name: 'Tea' },
  { id: 'dessert', name: 'Desserts' },
  { id: 'breakfast', name: 'Breakfast' },
  { id: 'lunch', name: 'Lunch' },
];

export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Espresso',
    description: 'Rich and intense coffee experience with perfect crema',
    price: 3.50,
    image: 'https://images.unsplash.com/photo-1581996323777-d2dacb7c8f86?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'coffee',
    tags: ['coffee', 'hot']
  },
  {
    id: '2',
    name: 'Cappuccino',
    description: 'Espresso with steamed milk and a deep layer of foam',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'coffee',
    tags: ['coffee', 'milk', 'hot']
  },
  {
    id: '3',
    name: 'Latte',
    description: 'Espresso with a lot of steamed milk and a light layer of foam',
    price: 4.75,
    image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'coffee',
    tags: ['coffee', 'milk', 'hot']
  },
  {
    id: '4',
    name: 'Green Tea',
    description: 'Light and refreshing tea with antioxidants',
    price: 3.25,
    image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'tea',
    tags: ['tea', 'hot']
  },
  {
    id: '5',
    name: 'Earl Grey',
    description: 'Black tea flavored with oil of bergamot',
    price: 3.25,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'tea',
    tags: ['tea', 'hot']
  },
  {
    id: '6',
    name: 'Chocolate Cake',
    description: 'Rich and moist chocolate cake with ganache',
    price: 5.50,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'dessert',
    tags: ['dessert', 'chocolate', 'sweet']
  },
  {
    id: '7',
    name: 'Cheesecake',
    description: 'Creamy cheesecake with graham cracker crust',
    price: 5.75,
    image: 'https://images.unsplash.com/photo-1508737804141-4c3b688e2546?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'dessert',
    tags: ['dessert', 'sweet']
  },
  {
    id: '8',
    name: 'Croissant',
    description: 'Buttery, flaky pastry, perfect for breakfast',
    price: 3.25,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'breakfast',
    tags: ['breakfast', 'pastry']
  },
  {
    id: '9',
    name: 'Avocado Toast',
    description: 'Smashed avocado on artisanal bread with sea salt',
    price: 8.50,
    image: 'https://images.unsplash.com/photo-1588137378633-dea1288d6481?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'breakfast',
    tags: ['breakfast', 'healthy']
  },
  {
    id: '10',
    name: 'Caesar Salad',
    description: 'Fresh romaine with parmesan, croutons, and Caesar dressing',
    price: 9.75,
    image: 'https://images.unsplash.com/photo-1599021419847-d8a7a6aba5b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'lunch',
    tags: ['lunch', 'salad']
  },
  {
    id: '11',
    name: 'Chicken Sandwich',
    description: 'Grilled chicken with avocado, bacon, and aioli on ciabatta',
    price: 10.50,
    image: 'https://images.unsplash.com/photo-1521390188846-e2a3a97453a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'lunch',
    tags: ['lunch', 'sandwich']
  },
  {
    id: '12',
    name: 'Iced Coffee',
    description: 'Cold brewed coffee served over ice',
    price: 4.25,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'coffee',
    tags: ['coffee', 'cold']
  },
];
