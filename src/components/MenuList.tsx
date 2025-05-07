
import { useMemo, useState } from 'react';
import { MenuItem as MenuItemType } from '@/types';
import MenuItem from './MenuItem';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { categories } from '@/data/menuData';

interface MenuListProps {
  activeCategory: string;
  addToCart: (item: MenuItemType) => void;
}

const MenuList = ({ activeCategory, addToCart }: MenuListProps) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  
  const filteredCategories = useMemo(() => {
    if (activeCategory === 'all') {
      return categories;
    }
    return categories.filter(category => category.id === activeCategory);
  }, [activeCategory]);

  const getItemsByCategory = (categoryId: string) => {
    return menuItems.filter(item => item.category === categoryId);
  };

  const handleToggle = (categoryId: string) => {
    setExpandedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  // Get a representative image for each category
  const getCategoryImage = (categoryId: string) => {
    const items = menuItems.filter(item => item.category === categoryId);
    if (items.length > 0) {
      // Find first item with a valid image URL
      const itemWithImage = items.find(item => item.image && !item.image.includes('placeholder'));
      return itemWithImage?.image || 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'; // Default coffee image
    }
    return 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'; // Default coffee image
  };

  return (
    <section className="py-8 bg-secondary/30">
      <div className="container px-4 mx-auto">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground italic">No categories found.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredCategories.map((category) => {
              const categoryItems = getItemsByCategory(category.id);
              
              if (categoryItems.length === 0) return null;
              
              return (
                <div key={category.id} className="bg-card rounded-lg border shadow-sm overflow-hidden">
                  <Accordion 
                    type="single" 
                    collapsible
                    defaultValue={expandedCategories.includes(category.id) ? category.id : undefined}
                    onValueChange={(value) => {
                      if (value) handleToggle(category.id);
                      else handleToggle(category.id);
                    }}
                  >
                    <AccordionItem value={category.id} className="border-none">
                      <AccordionTrigger className="px-6 py-4 hover:no-underline bg-secondary/20">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-md overflow-hidden shadow-sm flex-shrink-0">
                            <img 
                              src={getCategoryImage(category.id)} 
                              alt={category.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <h3 className="text-xl font-serif font-medium text-left">{category.name}</h3>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                          {categoryItems.map((item) => (
                            <MenuItem key={item.id} item={item} addToCart={addToCart} />
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

import { menuItems } from '@/data/menuData';
export default MenuList;
