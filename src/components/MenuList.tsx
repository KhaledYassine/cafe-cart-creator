
import { useMemo } from 'react';
import { MenuItem as MenuItemType } from '@/types';
import MenuItem from './MenuItem';
import { menuItems } from '@/data/menuData';

interface MenuListProps {
  activeCategory: string;
  addToCart: (item: MenuItemType) => void;
}

const MenuList = ({ activeCategory, addToCart }: MenuListProps) => {
  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') {
      return menuItems;
    }
    return menuItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="py-6">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <MenuItem key={item.id} item={item} addToCart={addToCart} />
          ))}
        </div>
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No items found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MenuList;
