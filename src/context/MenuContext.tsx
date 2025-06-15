import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { MenuItem, Category, SupabaseMenuItem } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface MenuContextType {
  menuItems: MenuItem[];
  categories: Category[];
  addMenuItem: (item: Omit<MenuItem, 'id'>) => Promise<void>;
  updateMenuItem: (id: string, item: Partial<MenuItem>) => Promise<void>;
  deleteMenuItem: (id: string) => Promise<void>;
  addCategory: (category: Omit<Category, 'id'>) => Promise<void>;
  updateCategory: (id: string, category: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  isLoading: boolean;
  refreshMenu: () => Promise<void>;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    loadMenuData();
  }, []);
  
  const loadMenuData = async () => {
    setIsLoading(true);
    try {
      await Promise.all([
        fetchCategories(),
        fetchMenuItems()
      ]);
    } catch (error) {
      console.error('Error loading menu data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchCategories = async () => {
    try {
      console.log('Fetching categories...');
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
        
      if (error) throw error;
      
      console.log('Categories fetched:', data?.length || 0);
      setCategories(data as Category[]);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  
  const fetchMenuItems = async () => {
    try {
      console.log('Fetching menu items...');
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .order('name');
        
      if (error) throw error;
      
      console.log('Menu items fetched:', data?.length || 0);
      
      // Convert from Supabase format to our app's MenuItem format
      const formattedItems: MenuItem[] = (data as SupabaseMenuItem[]).map(item => ({
        id: item.id,
        name: item.name,
        description: item.description || '',
        price: Number(item.price),
        image: item.image || '',
        category: item.category_id || '',
        tags: item.tags || []
      }));
      
      setMenuItems(formattedItems);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const addMenuItem = async (item: Omit<MenuItem, 'id'>) => {
    try {
      const supabaseItem = {
        name: item.name,
        description: item.description,
        price: item.price,
        image: item.image,
        category_id: item.category,
        tags: item.tags
      };
      
      const { data, error } = await supabase
        .from('menu_items')
        .insert([supabaseItem])
        .select()
        .single();
        
      if (error) throw error;
      
      const newItem: MenuItem = {
        id: data.id,
        name: data.name,
        description: data.description || '',
        price: Number(data.price),
        image: data.image || '',
        category: data.category_id || '',
        tags: data.tags || []
      };
      
      setMenuItems(prev => [...prev, newItem]);
      toast({ title: 'Menu item added successfully' });
    } catch (error: any) {
      toast({ 
        variant: 'destructive', 
        title: 'Failed to add menu item',
        description: error.message
      });
      throw error;
    }
  };

  const updateMenuItem = async (id: string, item: Partial<MenuItem>) => {
    try {
      const supabaseItem: Partial<SupabaseMenuItem> = {};
      
      if (item.name) supabaseItem.name = item.name;
      if (item.description !== undefined) supabaseItem.description = item.description;
      if (item.price) supabaseItem.price = item.price;
      if (item.image !== undefined) supabaseItem.image = item.image;
      if (item.category) supabaseItem.category_id = item.category;
      if (item.tags) supabaseItem.tags = item.tags;
      
      const { data, error } = await supabase
        .from('menu_items')
        .update(supabaseItem)
        .eq('id', id)
        .select()
        .single();
        
      if (error) throw error;
      
      const updatedItem: MenuItem = {
        id: data.id,
        name: data.name,
        description: data.description || '',
        price: Number(data.price),
        image: data.image || '',
        category: data.category_id || '',
        tags: data.tags || []
      };
      
      setMenuItems(prev => prev.map(menuItem => 
        menuItem.id === id ? updatedItem : menuItem
      ));
      
      toast({ title: 'Menu item updated successfully' });
    } catch (error: any) {
      toast({ 
        variant: 'destructive', 
        title: 'Failed to update menu item',
        description: error.message
      });
      throw error;
    }
  };

  const deleteMenuItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('menu_items')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setMenuItems(prev => prev.filter(item => item.id !== id));
      toast({ title: 'Menu item deleted successfully' });
    } catch (error: any) {
      toast({ 
        variant: 'destructive', 
        title: 'Failed to delete menu item',
        description: error.message
      });
      throw error;
    }
  };

  const addCategory = async (category: Omit<Category, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .insert([category])
        .select()
        .single();
        
      if (error) throw error;
      
      setCategories(prev => [...prev, data as Category]);
      toast({ title: 'Category added successfully' });
    } catch (error: any) {
      toast({ 
        variant: 'destructive', 
        title: 'Failed to add category',
        description: error.message
      });
      throw error;
    }
  };

  const updateCategory = async (id: string, category: Partial<Category>) => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .update(category)
        .eq('id', id)
        .select()
        .single();
        
      if (error) throw error;
      
      setCategories(prev => prev.map(cat => 
        cat.id === id ? { ...cat, ...data } as Category : cat
      ));
      
      toast({ title: 'Category updated successfully' });
    } catch (error: any) {
      toast({ 
        variant: 'destructive', 
        title: 'Failed to update category',
        description: error.message
      });
      throw error;
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      const hasItems = menuItems.some(item => item.category === id);
      if (hasItems) {
        throw new Error("Can't delete category that has menu items");
      }
      
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setCategories(prev => prev.filter(cat => cat.id !== id));
      toast({ title: 'Category deleted successfully' });
    } catch (error: any) {
      toast({ 
        variant: 'destructive', 
        title: 'Failed to delete category',
        description: error.message
      });
      throw error;
    }
  };

  const refreshMenu = async () => {
    return loadMenuData();
  };

  return (
    <MenuContext.Provider
      value={{
        menuItems,
        categories,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        addCategory,
        updateCategory,
        deleteCategory,
        isLoading,
        refreshMenu
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};
