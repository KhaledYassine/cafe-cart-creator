import { Category, MenuItem,CategorySection } from '@/types';
export const categorySections: CategorySection[] = [
  {
    title: '☕ Hot Drinks',
    ids: ['chocolat-chaud', 'cappuccino', 'frappuccino', 'coffee', 'the']
  },
  {
    title: '🧊 Cold Drinks',
    ids: [
      'ice-coffee', 'eau', 'smoothie', 'mocktail', 'jus',
      'mojito', 'milkshake', 'boisson'
    ]
  },
  {
    title: '🍰 Desserts & Sweet Treats',
    ids: [
      'jwajem', 'cake', 'crepes-sucree', 'bubble-waffle', 'gaufre',
      'gaufres-boules', 'pancake', 'crepe-kunafa', 'glace'
    ]
  },
  {
    title: '🍳 Savory Dishes',
    ids: ['crepes-salee', 'omelette', 'panini']
  },


  {
    title: '💨 Relax',
    ids: ['chicha']
  }
];


export const categories: Category[] = [
  { id: 'coffee', name: '☕ COFFEE' },
  { id: 'cappuccino', name: '☕ CAPPUCCINO' },
  { id: 'chocolat-chaud', name: '☕ CHOCOLAT CHAUD' },
  { id: 'frappuccino', name: '☕ FRAPPUCCINO' },
  { id: 'the', name: '🍵 THÉ' },
  { id: 'boisson', name: '🥤 BOISSON GAZEUSE' },
  { id: 'eau', name: '💧 EAU' },
  { id: 'smoothie', name: '🍹 SMOOTHIE' },
  { id: 'mocktail', name: '🍸 MOCKTAIL' },
  { id: 'jus', name: '🍊 JUS' },
  { id: 'mojito', name: '🍃 MOJITO' },
  { id: 'ice-coffee', name: '🧊 ICE COFFEE & TEA' },
  { id: 'milkshake', name: '🥤 MILKSHAKE' },
  { id: 'glace', name: '🍨 GLACE' },
  { id: 'cake', name: '🍰 CAKE' },
  { id: 'crepes-sucree', name: '🧇 CRÊPES SUCRÉE' },
  { id: 'bubble-waffle', name: '🧇 BUBBLE WAFFLE' },
  { id: 'gaufre', name: '🧇 GAUFRE' },
  { id: 'gaufres-boules', name: '🍡 GAUFRES À BOULES' },
  { id: 'pancake', name: '🥞 PANCAKE' },
  { id: 'crepe-kunafa', name: '🔥 CRÊPE KUNAFA' },
  { id: 'jwajem', name: 'JWAJEM' },
  { id: 'crepes-salee', name: '🥓 CRÊPES SALÉE' },
  { id: 'omelette', name: '🍳 OMELETTE' },
  { id: 'panini', name: '🥪 PANINI' },
  { id: 'chicha', name: '💨 CHICHA' },

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
    name: 'Joe',
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
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0',
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
  
  // COFFEE
  {
    id: 'coffee-express',
    name: 'Express',
    description: 'Strong espresso shot',
    price: 2.50,
    image: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?q=80&w=2084&auto=format&fit=crop&ixlib=rb-4.1.0',
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
  {
    id: 'coffee-cappucin',
    name: 'Cappucin',
    description: 'Classic cappuccino',
    price: 2.70,
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'coffee',
    tags: ['coffee', 'hot', 'cappuccino']
  },
  {
    id: 'coffee-direct',
    name: 'Direct',
    description: 'Specialty coffee preparation',
    price: 3.00,
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'coffee',
    tags: ['coffee', 'hot', 'special']
  },
  {
    id: 'coffee-turc',
    name: 'Café Turc',
    description: 'Traditional Turkish coffee',
    price: 3.00,
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'coffee',
    tags: ['coffee', 'hot', 'traditional']
  },
  {
    id: 'coffee-nescafe',
    name: 'Nescafe',
    description: 'Instant coffee preparation',
    price: 3.00,
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'coffee',
    tags: ['coffee', 'hot', 'instant']
  },
  {
    id: 'coffee-au-lait',
    name: 'Café Au Lait',
    description: 'Coffee with milk',
    price: 3.00,
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'coffee',
    tags: ['coffee', 'hot', 'milk']
  },
  {
    id: 'coffee-aromatise',
    name: 'Café Aromatisé',
    description: 'Flavored coffee',
    price: 3.50,
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'coffee',
    tags: ['coffee', 'hot', 'flavored']
  },
  {
    id: 'coffee-macchiato',
    name: 'Café Macchiato',
    description: 'Espresso with a dash of milk',
    price: 4.00,
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'coffee',
    tags: ['coffee', 'hot', 'macchiato']
  },
  {
    id: 'coffee-pistache',
    name: 'Café Pistache',
    description: 'Coffee with pistachio flavor',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'coffee',
    tags: ['coffee', 'hot', 'pistachio']
  },

  // THÉ
  {
    id: 'the-menthe',
    name: 'Thé Menthe',
    description: 'Fresh mint tea',
    price: 2.00,
    image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'the',
    tags: ['tea', 'hot', 'mint']
  },
  {
    id: 'the-louz',
    name: 'Thé Louz',
    description: 'Special almond tea',
    price: 6.00,
    image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'the',
    tags: ['tea', 'hot', 'almond']
  },
  {
    id: 'the-bondeg',
    name: 'Thé Bondeg',
    description: 'Premium special tea',
    price: 7.00,
    image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'the',
    tags: ['tea', 'hot', 'premium']
  },

  // EAU
  {
    id: 'eau-05',
    name: 'Eau 0.5L',
    description: 'Bottled water 0.5 liter',
    price: 1.50,
    image: 'https://images.unsplash.com/photo-1711395472036-d3bf9eb4e04b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'eau',
    tags: ['water', 'bottle']
  },
  {
    id: 'eau-1',
    name: 'Eau 1L',
    description: 'Bottled water 1 liter',
    price: 2.50,
    image: 'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'eau',
    tags: ['water', 'bottle']
  },

  // SMOOTHIE
  {
    id: 'smoothie-banane',
    name: 'Smoothie Banane',
    description: 'Banana smoothie',
    price: 7.50,
    image: 'https://images.unsplash.com/photo-1657101455328-6821c90b0ad3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'smoothie',
    tags: ['smoothie', 'cold', 'banana']
  },
  {
    id: 'smoothie-kiwi',
    name: 'Smoothie Kiwi',
    description: 'Kiwi smoothie',
    price: 7.50,
    image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'smoothie',
    tags: ['smoothie', 'cold', 'kiwi']
  },
  {
    id: 'smoothie-frais',
    name: 'Smoothie Frais',
    description: 'Strawberry smoothie',
    price: 7.50,
    image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'smoothie',
    tags: ['smoothie', 'cold', 'strawberry']
  },
  {
    id: 'smoothie-cerise',
    name: 'Smoothie Cerise',
    description: 'Cherry smoothie',
    price: 7.50,
    image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'smoothie',
    tags: ['smoothie', 'cold', 'cherry']
  },
  {
    id: 'smoothie-healthy',
    name: 'Smoothie Healthy',
    description: 'Healthy mix smoothie',
    price: 8.00,
    image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'smoothie',
    tags: ['smoothie', 'cold', 'healthy']
  },
  {
    id: 'smoothie-joe',
    name: 'Smoothie Joe',
    description: 'Special Joe\'s smoothie',
    price: 9.00,
    image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'smoothie',
    tags: ['smoothie', 'cold', 'special']
  },
  {
    id: 'smoothie-pina',
    name: 'Smoothie Pina Colada',
    description: 'Pina colada flavor smoothie',
    price: 8.50,
    image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'smoothie',
    tags: ['smoothie', 'cold', 'pina colada']
  },
  {
    id: 'smoothie-manga',
    name: 'Smoothie Manga',
    description: 'Mango smoothie',
    price: 7.50,
    image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'smoothie',
    tags: ['smoothie', 'cold', 'mango']
  },

  // MOCKTAIL
  {
    id: 'mocktail-hawai',
    name: 'Mocktail Hawai',
    description: 'Hawaiian style mocktail',
    price: 8.00,
    image: 'https://mocktail.net/wp-content/uploads/2021/10/Blue-Mocktail-Recipe_2.jpg',
    category: 'mocktail',
    tags: ['mocktail', 'cold', 'fruit']
  },
  {
    id: 'mocktail-blue',
    name: 'Mocktail Blue',
    description: 'Blueberry mocktail',
    price: 8.00,
    image: 'https://images.unsplash.com/photo-1551751299-1b51cab2694c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'mocktail',
    tags: ['mocktail', 'cold', 'blueberry']
  },
  {
    id: 'mocktail-joe',
    name: 'Mocktail JOE',
    description: 'Special Joe\'s mocktail',
    price: 9.50,
    image: 'https://images.unsplash.com/photo-1551751299-1b51cab2694c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'mocktail',
    tags: ['mocktail', 'cold', 'special']
  },

  // JUS
  {
    id: 'jus-citron',
    name: 'Citron',
    description: 'Fresh lemon juice',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1676159434937-c7b51a52ff5a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'jus',
    tags: ['juice', 'cold', 'lemon']
  },
  {
    id: 'jus-orange',
    name: 'Orange',
    description: 'Fresh orange juice',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1676159434937-c7b51a52ff5a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'jus',
    tags: ['juice', 'cold', 'orange']
  },
  {
    id: 'jus-lait-poule',
    name: 'Lait de Poule',
    description: 'Traditional egg-based drink',
    price: 6.00,
    image: 'https://images.unsplash.com/photo-1676159434937-c7b51a52ff5a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'jus',
    tags: ['juice', 'cold', 'traditional']
  },
  {
    id: 'jus-fraise',
    name: 'Fraise',
    description: 'Strawberry juice',
    price: 6.00,
    image: 'https://images.unsplash.com/photo-1676159434937-c7b51a52ff5a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'jus',
    tags: ['juice', 'cold', 'strawberry']
  },
  {
    id: 'jus-fruit',
    name: 'Fruit',
    description: 'Mixed fruit juice',
    price: 7.50,
    image: 'https://images.unsplash.com/photo-1676159434937-c7b51a52ff5a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'jus',
    tags: ['juice', 'cold', 'mixed']
  },
  {
    id: 'jus-fraise-banane',
    name: 'Fraise Banane',
    description: 'Strawberry banana juice',
    price: 7.50,
    image: 'https://images.unsplash.com/photo-1676159434937-c7b51a52ff5a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'jus',
    tags: ['juice', 'cold', 'strawberry', 'banana']
  },
  {
    id: 'jus-cocktail-joe',
    name: 'Cocktail Joe',
    description: 'Special Joe\'s fruit cocktail',
    price: 9.50,
    image: 'https://images.unsplash.com/photo-1676159434937-c7b51a52ff5a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'jus',
    tags: ['juice', 'cold', 'special']
  },

  // MOJITO
  {
    id: 'mojito-vergin',
    name: 'Mojito Vergin',
    description: 'Virgin mojito',
    price: 6.00,
    image: 'https://images.unsplash.com/photo-1541745038731-f1c2b5a1a49e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'mojito',
    tags: ['mojito', 'cold', 'virgin']
  },
  {
    id: 'mojito-blue',
    name: 'Mojito Blue',
    description: 'Blueberry mojito',
    price: 7.00,
    image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'mojito',
    tags: ['mojito', 'cold', 'blueberry']
  },
  {
    id: 'mojito-red',
    name: 'Mojito Red',
    description: 'Red fruit mojito',
    price: 7.00,
    image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'mojito',
    tags: ['mojito', 'cold', 'red fruit']
  },
  {
    id: 'mojito-energetique',
    name: 'Mojito Énergétique',
    description: 'Energy drink mojito',
    price: 9.00,
    image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'mojito',
    tags: ['mojito', 'cold', 'energy']
  },

  // ICE COFFEE & TEA
  {
    id: 'ice-coffee-caramel',
    name: 'Ice Coffee Caramel',
    description: 'Iced coffee with caramel',
    price: 6.00,
    image: 'https://images.unsplash.com/photo-1609250144044-6ac2689df83f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'ice-coffee',
    tags: ['coffee', 'cold', 'caramel']
  },
  {
    id: 'ice-coffee-noisette',
    name: 'Ice Coffee Noisette',
    description: 'Iced coffee with hazelnut',
    price: 6.00,
    image: 'https://images.unsplash.com/photo-1568649929103-28ffbefaca1e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'ice-coffee',
    tags: ['coffee', 'cold', 'hazelnut']
  },
  {
    id: 'ice-coffee-cookies',
    name: 'Ice Coffee Cookies',
    description: 'Iced coffee with cookies',
    price: 6.00,
    image: 'https://images.unsplash.com/photo-1568649929103-28ffbefaca1e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'ice-coffee',
    tags: ['coffee', 'cold', 'cookies']
  },
  {
    id: 'ice-tea-red',
    name: 'Ice Tea Red',
    description: 'Red fruit iced tea',
    price: 5.00,
    image: 'https://images.unsplash.com/photo-1568649929103-28ffbefaca1e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'ice-coffee',
    tags: ['tea', 'cold', 'red fruit']
  },
  {
    id: 'ice-tea-citron',
    name: 'Ice Tea Citron',
    description: 'Lemon iced tea',
    price: 5.50,
    image: 'https://images.unsplash.com/photo-1568649929103-28ffbefaca1e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'ice-coffee',
    tags: ['tea', 'cold', 'lemon']
  },
  {
    id: 'ice-tea-orange',
    name: 'Ice Tea Orange',
    description: 'Orange iced tea',
    price: 5.50,
    image: 'https://images.unsplash.com/photo-1568649929103-28ffbefaca1e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'ice-coffee',
    tags: ['tea', 'cold', 'orange']
  },

  // MILKSHAKE
  {
    id: 'milkshake-vanille',
    name: 'Milkshake Vanille',
    description: 'Vanilla milkshake',
    price: 7.50,
    image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'milkshake',
    tags: ['milkshake', 'cold', 'vanilla']
  },
  {
    id: 'milkshake-fraise',
    name: 'Milkshake Fraise',
    description: 'Strawberry milkshake',
    price: 7.50,
    image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'milkshake',
    tags: ['milkshake', 'cold', 'strawberry']
  },
  {
    id: 'milkshake-banane',
    name: 'Milkshake Banane',
    description: 'Banana milkshake',
    price: 7.50,
    image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'milkshake',
    tags: ['milkshake', 'cold', 'banana']
  },
  {
    id: 'milkshake-chocolat',
    name: 'Milkshake Chocolat',
    description: 'Chocolate milkshake',
    price: 8.00,
    image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'milkshake',
    tags: ['milkshake', 'cold', 'chocolate']
  },
  {
    id: 'milkshake-nutella',
    name: 'Milkshake Nutella',
    description: 'Nutella milkshake',
    price: 8.50,
    image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'milkshake',
    tags: ['milkshake', 'cold', 'nutella']
  },
  {
    id: 'milkshake-oreo',
    name: 'Milkshake Oreo',
    description: 'Oreo milkshake',
    price: 8.50,
    image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'milkshake',
    tags: ['milkshake', 'cold', 'oreo']
  },

  // GLACE
  {
    id: 'glace-1',
    name: '1 Boule',
    description: 'Single scoop ice cream',
    price: 5.50,
    image: 'https://images.unsplash.com/photo-1560008581-09826d1de69e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'glace',
    tags: ['ice cream', 'cold']
  },
  {
    id: 'glace-2',
    name: '2 Boules',
    description: 'Double scoop ice cream',
    price: 6.00,
    image: 'https://images.unsplash.com/photo-1560008581-09826d1de69e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'glace',
    tags: ['ice cream', 'cold']
  },
  {
    id: 'glace-3',
    name: '3 Boules',
    description: 'triple scoop ice cream',
    price: 6.50,
    image: 'https://images.unsplash.com/photo-1560008581-09826d1de69e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'glace',
    tags: ['ice cream', 'cold']
  },
// CAKE
{
  id: 'joes-cake',
  name: "Joe's Cake",
  description: 'Delicious cake special',
  price: 4.0,
  image: 'https://images.unsplash.com/photo-1505253599537-305b179737ce?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  category: 'cake',
  tags: ['dessert', 'sweet']
},
{
  id: 'cheesecake',
  name: 'Cheesecake',
  description: 'Classic cheesecake',
  price: 6.0,
  image: 'https://placeholder-for-cheesecake-image.jpg',
  category: 'cake',
  tags: ['dessert', 'cheese']
},
{
  id: 'tiramisu',
  name: 'Tiramisu',
  description: 'Italian coffee-flavored dessert',
  price: 6.0,
  image: 'https://placeholder-for-tiramisu-image.jpg',
  category: 'cake',
  tags: ['dessert', 'coffee']
},
{
  id: 'saint-sebastien',
  name: 'Saint-Sébastien',
  description: 'Premium cake selection',
  price: 9.0,
  image: 'https://placeholder-for-saint-sebastien-image.jpg',
  category: 'cake',
  tags: ['dessert', 'premium']
},

// CHICHA
{
  id: 'chicha-fakher',
  name: 'Chicha Fakher',
  description: 'Traditional flavored shisha',
  price: 4.5,
  image: 'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2023/04/vaping-anonymous-1296x728-header-1024x576.jpg',
  category: 'chicha',
  tags: ['hookah', 'flavored']
},
{
  id: 'chicha-love',
  name: 'Chicha Love',
  description: 'Special love flavor shisha',
  price: 5.0,
  image: 'https://placeholder-for-chicha-image.jpg',
  category: 'chicha',
  tags: ['hookah', 'special']
},
{
  id: 'chicha-chick-money',
  name: 'Chicha Chick Money',
  description: 'Unique flavor combination',
  price: 5.0,
  image: 'https://placeholder-for-chicha-image.jpg',
  category: 'chicha',
  tags: ['hookah', 'unique']
},
{
  id: 'chicha-JB',
  name: 'Chicha JBR',
  description: 'taste JBR flavor shisha',
  price: 5,
  image: 'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2023/04/vaping-anonymous-1296x728-header-1024x576.jpg',
  category: 'chicha',
  tags: ['hookah', 'flavored']
},

// CRÊPES SUCRÉE
{
  id: 'crepe-chocolat',
  name: 'Crêpe Chocolat',
  description: 'Sweet crepe with chocolate',
  price: 7.0,
  image: 'https://images.coinafrique.com/3248803_uploaded_image1_1627473729.jpg',
  category: 'crepes-sucree',
  tags: ['sweet', 'chocolate']
},
{
  id: 'crepe-nutella',
  name: 'Crêpe Nutella',
  description: 'Sweet crepe with Nutella',
  price: 8.0,
  image: 'https://placeholder-for-crepe-image.jpg',
  category: 'crepes-sucree',
  tags: ['sweet', 'nutella']
},
{
  id: 'crepe-nutella-fruit',
  name: 'Crêpe Nutella Fruit',
  description: 'Sweet crepe with Nutella and fresh fruit',
  price: 8.5,
  image: 'https://placeholder-for-crepe-image.jpg',
  category: 'crepes-sucree',
  tags: ['sweet', 'nutella', 'fruit']
},
{
  id: 'crepe-nutella-fruit-sec',
  name: 'Crêpe Nutella Fruit Sec',
  description: 'Sweet crepe with Nutella and dried fruit',
  price: 9.0,
  image: 'https://placeholder-for-crepe-image.jpg',
  category: 'crepes-sucree',
  tags: ['sweet', 'nutella', 'dried fruit']
},
{
  id: 'crepe-nutella-oreo',
  name: 'Crêpe Nutella Oreo',
  description: 'Sweet crepe with Nutella and Oreo',
  price: 9.0,
  image: 'https://placeholder-for-crepe-image.jpg',
  category: 'crepes-sucree',
  tags: ['sweet', 'nutella', 'oreo']
},
{
  id: 'crepe-joes',
  name: "Crêpe Joe's",
  description: 'Special crepe combination',
  price: 15.0,
  image: 'https://placeholder-for-crepe-image.jpg',
  category: 'crepes-sucree',
  tags: ['special', 'premium']
},

// CRÊPES SALÉE
{
  id: 'crepe-jambon-fromage',
  name: 'Crêpe Jambon Fromage',
  description: 'Savory crepe with ham and cheese',
  price: 6.5,
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQzPYpcP4AILqvrfkAFk5k0qCTmTmde18Gy3oZDB8UxF-wHFv_qxr80QsRYG_0HuRNq2M&usqp=CAU',
  category: 'crepes-salee',
  tags: ['savory', 'ham', 'cheese']
},
{
  id: 'crepe-thon-fromage',
  name: 'Crêpe Thon Fromage',
  description: 'Savory crepe with tuna and cheese',
  price: 7.0,
  image: 'https://placeholder-for-crepe-image.jpg',
  category: 'crepes-salee',
  tags: ['savory', 'tuna', 'cheese']
},
{
  id: 'crepe-thon-oeuf-fromage',
  name: 'Crêpe Thon Œuf Fromage',
  description: 'Savory crepe with tuna, egg and cheese',
  price: 8.0,
  image: 'https://placeholder-for-crepe-image.jpg',
  category: 'crepes-salee',
  tags: ['savory', 'tuna', 'egg', 'cheese']
},
{
  id: 'crepe-thon-jambon-fromage',
  name: 'Crêpe Thon Jambon Fromage',
  description: 'Savory crepe with tuna, ham and cheese',
  price: 9.0,
  image: 'https://placeholder-for-crepe-image.jpg',
  category: 'crepes-salee',
  tags: ['savory', 'tuna', 'ham', 'cheese']
},

// OMELETTE
{
  id: 'omelette-jambon',
  name: 'Jambon',
  description: 'Omelette with ham',
  price: 5.5,
  image: 'https://images.unsplash.com/photo-1646579933415-92109f9805df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0',
  category: 'omelette',
  tags: ['egg', 'ham']
},
{
  id: 'omelette-thon-fromage',
  name: 'Thon Fromage',
  description: 'Omelette with tuna and cheese',
  price: 6.0,
  image: 'https://placeholder-for-omelette-image.jpg',
  category: 'omelette',
  tags: ['egg', 'tuna', 'cheese']
},
{
  id: 'omelette-jambon-thon-fromage',
  name: 'Jambon Thon Fromage',
  description: 'Omelette with ham, tuna and cheese',
  price: 7.0,
  image: 'https://placeholder-for-omelette-image.jpg',
  category: 'omelette',
  tags: ['egg', 'ham', 'tuna', 'cheese']
},

// PANINI
{
  id: 'panini-jambon',
  name: 'Jambon',
  description: 'Panini with ham',
  price: 4.5,
  image: 'https://images.unsplash.com/photo-1621852004158-f3bc188ace2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.',
  category: 'panini',
  tags: ['sandwich', 'ham']
},
{
  id: 'panini-thon',
  name: 'Thon',
  description: 'Panini with tuna',
  price: 5.0,
  image: 'https://placeholder-for-panini-image.jpg',
  category: 'panini',
  tags: ['sandwich', 'tuna']
},
{
  id: 'panini-thon-jambon',
  name: 'Thon Jambon',
  description: 'Panini with tuna and ham',
  price: 5.5,
  image: 'https://placeholder-for-panini-image.jpg',
  category: 'panini',
  tags: ['sandwich', 'tuna', 'ham']
},

// BOISSON GAZEUSE
{
  id: 'canette',
  name: 'Canette',
  description: 'Soda can',
  price: 2.5,
  image: 'https://plus.unsplash.com/premium_photo-1681487655849-f25f861ff78b',
  category: 'boisson',
  tags: ['soda', 'cold']
},
{
  id: 'eau-gazeifiee',
  name: 'Eau Gazéifiée',
  description: 'Sparkling water',
  price: 3.0,
  image: 'https://placeholder-for-drink-image.jpg',
  category: 'boisson',
  tags: ['water', 'sparkling']
},
{
  id: 'jus-canette',
  name: 'Jus en Canette',
  description: 'Juice in can',
  price: 3.5,
  image: 'https://placeholder-for-drink-image.jpg',
  category: 'boisson',
  tags: ['juice', 'cold']
},
{
  id: 'boisson-energetique',
  name: 'Boisson Énergétique',
  description: 'Energy drink',
  price: 6.0,
  image: 'https://placeholder-for-drink-image.jpg',
  category: 'boisson',
  tags: ['energy', 'stimulant']
},

// BUBBLE WAFFLE
{
  id: 'bubble-miel',
  name: 'Miel',
  description: 'Bubble waffle with honey',
  price: 6.5,
  image: 'https://images.pexels.com/photos/28263691/pexels-photo-28263691/free-photo-of-a-table-with-a-plate-of-food-and-a-cup-of-coffee.jpeg',
  category: 'bubble-waffle',
  tags: ['waffle', 'honey']
},
{
  id: 'bubble-chocolat',
  name: 'Chocolat',
  description: 'Bubble waffle with chocolate',
  price: 7.0,
  image: 'https://placeholder-for-waffle-image.jpg',
  category: 'bubble-waffle',
  tags: ['waffle', 'chocolate']
},
{
  id: 'bubble-nutella',
  name: 'Nutella',
  description: 'Bubble waffle with Nutella',
  price: 8.0,
  image: 'https://placeholder-for-waffle-image.jpg',
  category: 'bubble-waffle',
  tags: ['waffle', 'nutella']
},
{
  id: 'bubble-fruit-sec',
  name: 'Fruit Sec',
  description: 'Bubble waffle with dried fruit',
  price: 8.5,
  image: 'https://placeholder-for-waffle-image.jpg',
  category: 'bubble-waffle',
  tags: ['waffle', 'dried fruit']
},

// GAUFRE
{
  id: 'gaufre-chocolat',
  name: 'Chocolat',
  description: 'Waffle with chocolate',
  price: 7.0,
  image: 'https://cdn.pixabay.com/photo/2016/10/17/15/27/waffles-1747973_1280.jpg',
  category: 'gaufre',
  tags: ['waffle', 'chocolate']
},
{
  id: 'gaufre-nutella',
  name: 'Nutella',
  description: 'Waffle with Nutella',
  price: 8.0,
  image: 'https://placeholder-for-waffle-image.jpg',
  category: 'gaufre',
  tags: ['waffle', 'nutella']
},
{
  id: 'gaufre-fruit',
  name: 'Fruit',
  description: 'Waffle with fresh fruit',
  price: 8.5,
  image: 'https://placeholder-for-waffle-image.jpg',
  category: 'gaufre',
  tags: ['waffle', 'fruit']
},
{
  id: 'gaufre-fruit-sec',
  name: 'Fruit Sec',
  description: 'Waffle with dried fruit',
  price: 9.0,
  image: 'https://placeholder-for-waffle-image.jpg',
  category: 'gaufre',
  tags: ['waffle', 'dried fruit']
},

// GAUFRES À BOULES
{
  id: 'boules-chocolat-7',
  name: 'Chocolate (7 Boules)',
  description: '7 chocolate bubble waffle balls',
  price: 5.5,
  image: 'IMG_20250507_162443.jpg',
  category: 'gaufres-boules',
  tags: ['waffle', 'chocolate', 'balls']
},
{
  id: 'boules-chocolat-14',
  name: 'Chocolate (14 Boules)',
  description: '14 chocolate bubble waffle balls',
  price: 9.0,
  image: 'https://placeholder-for-waffle-image.jpg',
  category: 'gaufres-boules',
  tags: ['waffle', 'chocolate', 'balls']
},
{
  id: 'boules-chocolat-21',
  name: 'Chocolate (21 Boules)',
  description: '21 chocolate bubble waffle balls',
  price: 12.0,
  image: 'https://placeholder-for-waffle-image.jpg',
  category: 'gaufres-boules',
  tags: ['waffle', 'chocolate', 'balls']
},
{
  id: 'boules-nutella-7',
  name: 'Nutella (7 Boules)',
  description: '7 Nutella bubble waffle balls',
  price: 7.0,
  image: 'https://placeholder-for-waffle-image.jpg',
  category: 'gaufres-boules',
  tags: ['waffle', 'nutella', 'balls']
},
{
  id: 'boules-nutella-14',
  name: 'Nutella (14 Boules)',
  description: '14 Nutella bubble waffle balls',
  price: 11.0,
  image: 'https://placeholder-for-waffle-image.jpg',
  category: 'gaufres-boules',
  tags: ['waffle', 'nutella', 'balls']
},
{
  id: 'boules-nutella-21',
  name: 'Nutella (21 Boules)',
  description: '21 Nutella bubble waffle balls',
  price: 14.0,
  image: 'https://placeholder-for-waffle-image.jpg',
  category: 'gaufres-boules',
  tags: ['waffle', 'nutella', 'balls']
},
{
  id: 'boules-joes',
  name: "Boules Joe's (21)",
  description: '21  bubble waffle balls special',
  price: 18.5,
  image: 'https://placeholder-for-waffle-image.jpg',
  category: 'gaufres-boules',
  tags: ['waffle', 'special', 'premium']
},

// PANCAKE
{
  id: 'pancake-chocolat',
  name: 'Chocolat',
  description: 'Pancake with chocolate',
  price: 7.0,
  image: 'https://images.unsplash.com/photo-1541288097308-7b8e3f58c4c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0',
  category: 'pancake',
  tags: ['pancake', 'chocolate']
},
{
  id: 'pancake-nutella',
  name: 'Nutella',
  description: 'Pancake with Nutella',
  price: 8.0,
  image: 'https://placeholder-for-pancake-image.jpg',
  category: 'pancake',
  tags: ['pancake', 'nutella']
},
{
  id: 'pancake-nutella-fruit',
  name: 'Nutella Fruit',
  description: 'Pancake with Nutella and fresh fruit',
  price: 8.5,
  image: 'https://placeholder-for-pancake-image.jpg',
  category: 'pancake',
  tags: ['pancake', 'nutella', 'fruit']
},
{
  id: 'pancake-nutella-fruit-sec',
  name: 'Nutella Fruit Sec',
  description: 'Pancake with Nutella and dried fruit',
  price: 9.0,
  image: 'https://placeholder-for-pancake-image.jpg',
  category: 'pancake',
  tags: ['pancake', 'nutella', 'dried fruit']
},

// CRÊPE KUNAFA
{
  id: 'kunafa-pistache',
  name: 'Pistache',
  description: 'Kunafa crepe with pistachio',
  price: 10.0,
  image: 'https://placeholder-for-kunafa-image.jpg',
  category: 'crepe-kunafa',
  tags: ['kunafa', 'pistachio']
},
{
  id: 'kunafa-joes',
  name: "Kunafa Joe's",
  description: 'Special kunafa crepe combination',
  price: 16.0,
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSP2_Q57ySBQ42eqRJP90aOii8yjBddy7cpg&s',
  category: 'crepe-kunafa',
  tags: ['kunafa', 'special', 'premium']
},
{
  id: 'kunafa-nutella',
  name: 'Nutella',
  description: 'Kunafa crepe with Nutella',
  price: 12.0,
  image: 'https://placeholder-for-kunafa-image.jpg',
  category: 'crepe-kunafa',
  tags: ['kunafa', 'nutella']
},
{
  id: 'kunafa-chocolat-blanc',
  name: 'Chocolat Blanc',
  description: 'Kunafa crepe with white chocolate',
  price: 12.0,
  image: 'https://placeholder-for-kunafa-image.jpg',
  category: 'crepe-kunafa',
  tags: ['kunafa', 'white chocolate']
},

// JWAJEM
{
  id: 'jo-mini',
  name: 'Joe-mini',
  description: 'Mini jwajem special',
  price: 7.0,
  image: 'https://static.wixstatic.com/media/7302b9_80f53a41bcf94de8ae427a7abf6136b4~mv2.jpg/v1/fill/w_524,h_382,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/7302b9_80f53a41bcf94de8ae427a7abf6136b4~mv2.jpg',
  category: 'jwajem',
  tags: ['jwajem', 'mini']
},
{
  id: 'jo-big-flavor',
  name: 'Joe Big Flavor',
  description: 'Large jwajem special',
  price: 12.0,
  image: 'https://placeholder-for-jwajem-image.jpg',
  category: 'jwajem',
  tags: ['jwajem', 'large', 'special']
}
];