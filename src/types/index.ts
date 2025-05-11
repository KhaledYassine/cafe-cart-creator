
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  tags: string[];
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
}

export interface CategorySection {
  title: string;
  ids: string[]; // Important: these are IDs (strings), not full `Category` objects
}

export interface Order {
  id: string;
  items: CartItem[];
  tableNumber: string;
  status: 'pending' | 'completed' | 'canceled';
  total: number;
  createdAt: string;
  notes?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'owner' | 'employee';
}
