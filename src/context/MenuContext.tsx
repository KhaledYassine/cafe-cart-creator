
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { MenuItem, Category } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from './AuthContext';

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
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    if (isAuthenticated) {
      loadMenuData();
    }
  }, [isAuthenticated]);
  
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
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
        
      if (error) throw error;
      
      setCategories(data as Category[]);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  
  const fetchMenuItems = async () => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .order('name');
        
      if (error) throw error;
      
      setMenuItems(data as MenuItem[]);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const addMenuItem = async (item: Omit<MenuItem, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .insert([item])
        .select()
        .single();
        
      if (error) throw error;
      
      setMenuItems(prev => [...prev, data as MenuItem]);
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
      const { data, error } = await supabase
        .from('menu_items')
        .update(item)
        .eq('id', id)
        .select()
        .single();
        
      if (error) throw error;
      
      setMenuItems(prev => prev.map(menuItem => 
        menuItem.id === id ? { ...menuItem, ...data } as MenuItem : menuItem
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
      // Check if there are items using this category
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
