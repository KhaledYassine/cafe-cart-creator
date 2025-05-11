
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

// Add interfaces to map between Supabase DB and our app types
export interface SupabaseMenuItem {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
  category_id: string | null;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface SupabaseOrder {
  id: string;
  table_number: string;
  status: string;
  total: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface SupabaseOrderItem {
  id: string;
  order_id: string | null;
  menu_item_id: string | null;
  name: string;
  quantity: number;
  price: number;
  created_at: string;
}
