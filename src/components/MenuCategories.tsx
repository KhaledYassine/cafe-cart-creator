import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { categories, menuItems, categorySections } from '@/data/menuData';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface MenuCategoriesProps {
  activeCategories: string[];
  setActiveCategories: (categories: string[]) => void;
}

const MenuCategories = ({ activeCategories, setActiveCategories }: MenuCategoriesProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isCategoryActive = (id: string) => activeCategories.includes(id);

  // Get a representative image for each category
  const getCategoryImage = (categoryId: string) => {
    const items = menuItems.filter(item => item.category === categoryId);
    if (items.length > 0) {
      const itemWithImage = items.find(item => item.image && !item.image.includes('placeholder'));
      return itemWithImage?.image || 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    }
    return 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
  };

  const toggleCategory = (id: string) => {
    setActiveCategories(prev => {
      const updated = prev.includes(id)
        ? prev.filter(cat => cat !== id)
        : [...prev, id];
      console.log('Updated active categories:', updated);
      return updated;
    });
  };




  return (
    <section className="py-6 bg-[#f8f5f0]">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-serif font-medium mb-2 text-[#8B4513]">Joe's Café Menu</h2>
          <div className="w-24 h-1 mx-auto bg-primary rounded"></div>
          <div className="flex justify-center mb-6">
            <Button
              key="all"
              variant={activeCategories.length === categories.length ? 'default' : 'outline'}
              className="rounded-full"
              onClick={() => {
                if (activeCategories.length === categories.length) {
                  setActiveCategories([]);
                } else {
                  setActiveCategories(categories.map(cat => cat.id));
                }
              }}
            >
              🍽️ All Items
            </Button>

          </div>
        </div>

        {categorySections.map((section) => {
          const allSectionActive = section.ids.every(id => activeCategories.includes(id));

          return (
            <div key={section.title} className="w-full mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-[#8B4513]">{section.title}</h3>
                <Button
                  size="sm"
                  variant={allSectionActive ? 'default' : 'outline'}
                  onClick={() => {
                    setActiveCategories(prev => {
                      if (allSectionActive) {
                        const updated = prev.filter(id => !section.ids.includes(id));
                        console.log('Unselect section:', updated);
                        return updated;
                      } else {
                        const merged = new Set([...prev, ...section.ids]);
                        const updated = Array.from(merged);
                        console.log('Select section:', updated);
                        return updated;
                      }
                    });
                  }}
                >
                  {allSectionActive ? 'Unselect' : 'Select All'}
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {section.ids.map((categoryId) => {
                  const category = categories.find(c => c.id === categoryId);
                  if (!category) return null;

                  return (
                    <Button
                      key={category.id}
                      variant={isCategoryActive(category.id) ? 'default' : 'outline'}
                      className="rounded-full flex items-center gap-2 text-sm"
                      onClick={() => toggleCategory(category.id)}
                    >
                      <div className="w-6 h-6 rounded-full overflow-hidden">
                        <img
                          src={getCategoryImage(category.id)}
                          alt={category.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {category.name}
                    </Button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MenuCategories;
