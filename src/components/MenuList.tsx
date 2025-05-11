
import { useMemo, useState } from 'react';
import { MenuItem as MenuItemType } from '@/types';
import MenuItem from './MenuItem';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useMenu } from '@/context/MenuContext';
import { useIsMobile } from '@/hooks/use-mobile';

interface MenuListProps {
  activeCategories: string[];
  addToCart: (item: MenuItemType) => void;
}

const MenuList = ({
  activeCategories,
  addToCart
}: MenuListProps) => {
  const { categories, menuItems } = useMenu();
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const isMobile = useIsMobile();
  
  const filteredCategories = useMemo(() => {
    if (activeCategories.length === 0) {
      return categories;
    }
    return categories.filter(category => activeCategories.includes(category.id));
  }, [activeCategories, categories]);
  
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map(category => {
              const categoryItems = getItemsByCategory(category.id);
              if (categoryItems.length === 0) return null;
              
              return (
                <div key={category.id} className="bg-card rounded-lg border shadow-sm overflow-hidden flex flex-col">
                  {/* Image positioned at the top of the card */}
                  <div className="w-full h-48 overflow-hidden">
                    <img 
                      src={getCategoryImage(category.id)} 
                      alt={category.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  
                  <Accordion type="single" collapsible defaultValue={expandedCategories.includes(category.id) ? category.id : undefined} onValueChange={value => {
                    if (value) handleToggle(category.id);
                    else handleToggle(category.id);
                  }}>
                    <AccordionItem value={category.id} className="border-none">
                      <AccordionTrigger className="px-6 py-4 hover:no-underline bg-secondary/20 rounded-none text-base font-normal">
                        <h3 className="text-xl font-serif font-medium text-left">{category.name}</h3>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="divide-y divide-border/30">
                          {categoryItems.map(item => (
                            <div key={item.id} className="flex justify-between items-center py-4 px-6 hover:bg-secondary/10">
                              <div className="flex-1">
                                <h4 className="font-medium text-base">{item.name}</h4>
                                <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>
                              </div>
                              <div className="flex items-center gap-4">
                                <span className="font-medium text-base">${item.price.toFixed(2)}</span>
                                <button 
                                  onClick={() => addToCart(item)}
                                  className="bg-primary/90 hover:bg-primary text-white px-3 py-1 rounded text-sm"
                                >
                                  Add
                                </button>
                              </div>
                            </div>
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

export default MenuList;
