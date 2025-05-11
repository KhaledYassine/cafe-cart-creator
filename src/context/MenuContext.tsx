
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { MenuItem, Category } from '@/types';
import { categories as defaultCategories, menuItems as defaultMenuItems } from '@/data/menuData';

interface MenuContextType {
  menuItems: MenuItem[];
  categories: Category[];
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (id: string, item: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  
  // Load menu data from localStorage or use defaults
  useEffect(() => {
    const storedItems = localStorage.getItem('cafeMenuItems');
    const storedCategories = localStorage.getItem('cafeCategories');
    
    if (storedItems) {
      try {
        setMenuItems(JSON.parse(storedItems));
      } catch (error) {
        console.error('Failed to parse stored menu items', error);
        setMenuItems(defaultMenuItems);
      }
    } else {
      setMenuItems(defaultMenuItems);
    }
    
    if (storedCategories) {
      try {
        setCategories(JSON.parse(storedCategories));
      } catch (error) {
        console.error('Failed to parse stored categories', error);
        setCategories(defaultCategories);
      }
    } else {
      setCategories(defaultCategories);
    }
  }, []);
  
  // Save menu data to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cafeMenuItems', JSON.stringify(menuItems));
  }, [menuItems]);
  
  useEffect(() => {
    localStorage.setItem('cafeCategories', JSON.stringify(categories));
  }, [categories]);

  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: `item-${Date.now()}`,
    };
    setMenuItems(prev => [...prev, newItem]);
  };

  const updateMenuItem = (id: string, item: Partial<MenuItem>) => {
    setMenuItems(prev => 
      prev.map(menuItem => 
        menuItem.id === id ? { ...menuItem, ...item } : menuItem
      )
    );
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...category,
      id: `category-${Date.now()}`,
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const updateCategory = (id: string, category: Partial<Category>) => {
    setCategories(prev => 
      prev.map(cat => 
        cat.id === id ? { ...cat, ...category } : cat
      )
    );
  };

  const deleteCategory = (id: string) => {
    // Don't delete if there are items using this category
    const hasItems = menuItems.some(item => item.category === id);
    if (hasItems) {
      throw new Error("Can't delete category that has menu items");
    }
    setCategories(prev => prev.filter(cat => cat.id !== id));
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
