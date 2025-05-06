
import { Category, MenuItem } from '@/types';

export const categories: Category[] = [
  { id: 'chocolat-chaud', name: '☕ CHOCOLAT CHAUD' },
  { id: 'cappuccino', name: '☕ CAPPUCCINO' },
  { id: 'frappuccino', name: '☕ FRAPPUCCINO' },
  { id: 'coffee', name: '☕ COFFEE' },
  { id: 'the', name: '🍵 THÉ' },
  { id: 'eau', name: '💧 EAU' },
  { id: 'smoothie', name: '🍹 SMOOTHIE' },
  { id: 'mocktail', name: '🍸 MOCKTAIL' },
  { id: 'jus', name: '🍊 JUS' },
  { id: 'mojito', name: '🍃 MOJITO' },
  { id: 'ice-coffee', name: '🧊 ICE COFFEE & TEA' },
  { id: 'milkshake', name: '🥤 MILKSHAKE' },
  { id: 'glace', name: '🍨 GLACE' },
  { id: 'cake', name: '🍰 CAKE' },
  { id: 'chicha', name: '💨 CHICHA' },
  { id: 'crepes-sucree', name: '🧇 CRÊPES SUCRÉE' },
  { id: 'crepes-salee', name: '🥓 CRÊPES SALÉE' },
  { id: 'omelette', name: '🍳 OMELETTE' },
  { id: 'panini', name: '🥪 PANINI' },
  { id: 'boisson', name: '🥤 BOISSON GAZEUSE' },
  { id: 'bubble-waffle', name: '🧇 BUBBLE WAFFLE' },
  { id: 'gaufre', name: '🧇 GAUFRE' },
  { id: 'gaufres-boules', name: '🍡 GAUFRES À BOULES' },
  { id: 'pancake', name: '🥞 PANCAKE' },
  { id: 'crepe-kunafa', name: '🔥 CRÊPE KUNAFA' },
  { id: 'jwajem', name: 'JWAJEM' },
];

export const menuItems: MenuItem[] = [
  // CHOCOLAT CHAUD
  {
    id: 'choc-normal',
    name: 'Normal',
    description: 'Classic hot chocolate',
    price: 5.50,
    image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'chocolat-chaud',
    tags: ['hot', 'chocolate']
  },
  {
    id: 'choc-cantille',
    name: 'Cantille',
    description: 'Hot chocolate with a special twist',
    price: 6.50,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'chocolat-chaud',
    tags: ['hot', 'chocolate', 'premium']
  },
  {
    id: 'choc-coffee',
    name: 'Coffee',
    description: 'Hot chocolate with coffee',
    price: 7.50,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'chocolat-chaud',
    tags: ['hot', 'chocolate', 'coffee']
  },
  
  // CAPPUCCINO
  {
    id: 'cap-caramel',
    name: 'Cappuccino Caramel',
    description: 'Cappuccino with caramel flavor',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'cappuccino',
    tags: ['coffee', 'hot', 'caramel']
  },
  {
    id: 'cap-noisette',
    name: 'Cappuccino Noisette',
    description: 'Cappuccino with hazelnut flavor',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1551539441-1fa3fb31af02?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'cappuccino',
    tags: ['coffee', 'hot', 'hazelnut']
  },
  {
    id: 'cap-cookies',
    name: 'Cappuccino Cookies',
    description: 'Cappuccino with cookie flavor',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1585494156145-5c18fbd9147f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'cappuccino',
    tags: ['coffee', 'hot', 'cookies']
  },
  
  // FRAPPUCCINO
  {
    id: 'frap-caramel',
    name: 'Frappuccino Caramel',
    description: 'Cold blended coffee with caramel',
    price: 6.50,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'frappuccino',
    tags: ['coffee', 'cold', 'caramel']
  },
  {
    id: 'frap-noisette',
    name: 'Frappuccino Noisette',
    description: 'Cold blended coffee with hazelnut',
    price: 6.50,
    image: 'https://images.unsplash.com/photo-1592321675774-3de57f3ee0dc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'frappuccino',
    tags: ['coffee', 'cold', 'hazelnut']
  },
  {
    id: 'frap-cookies',
    name: 'Frappuccino Cookies',
    description: 'Cold blended coffee with cookie flavor',
    price: 6.50,
    image: 'https://images.unsplash.com/photo-1563233258-7ae6a6a1e0fc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3', 
    category: 'frappuccino',
    tags: ['coffee', 'cold', 'cookies']
  },
  {
    id: 'frap-nutella',
    name: 'Frappuccino Nutella',
    description: 'Cold blended coffee with Nutella',
    price: 7.50,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'frappuccino',
    tags: ['coffee', 'cold', 'nutella']
  },
  {
    id: 'frap-oreo',
    name: 'Frappuccino Oreo',
    description: 'Cold blended coffee with Oreo cookies',
    price: 7.50,
    image: 'https://images.unsplash.com/photo-1591211301359-8c2cce0b4478?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'frappuccino',
    tags: ['coffee', 'cold', 'oreo']
  },
  {
    id: 'frap-vanille',
    name: 'Frappuccino Vanille',
    description: 'Cold blended coffee with vanilla flavor',
    price: 6.50,
    image: 'https://images.unsplash.com/photo-1587080413959-06b859fb107d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'frappuccino',
    tags: ['coffee', 'cold', 'vanilla']
  },
  
  // COFFEE section
  {
    id: 'coffee-express',
    name: 'Express',
    description: 'Strong espresso shot',
    price: 2.50,
    image: 'https://images.unsplash.com/photo-1581996323777-d2dacb7c8f86?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'coffee',
    tags: ['coffee', 'hot', 'espresso']
  },
  {
    id: 'coffee-american',
    name: 'American',
    description: 'Espresso diluted with hot water',
    price: 2.60,
    image: 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'coffee',
    tags: ['coffee', 'hot', 'american']
  },
  
  // Sample items for other categories (add more as needed)
  // THE
  {
    id: 'the-menthe',
    name: 'Thé Menthe',
    description: 'Fresh mint tea',
    price: 2.00,
    image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'the',
    tags: ['tea', 'hot', 'mint']
  },
  
  // JWAJEM
  {
    id: 'jwajem-mini',
    name: 'Joe-mini',
    description: 'Small portion of traditional Jwajem',
    price: 7.00,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'jwajem',
    tags: ['traditional', 'specialty']
  },
  {
    id: 'jwajem-big',
    name: 'Joe Big Flavor',
    description: 'Large portion of traditional Jwajem with special flavors',
    price: 12.00,
    image: 'https://images.unsplash.com/photo-1484980972926-edee96e0960d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'jwajem',
    tags: ['traditional', 'specialty', 'premium']
  }
  
  // Add more menu items for other categories as needed
];
