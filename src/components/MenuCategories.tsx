
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { categories, menuItems, categorySections } from '@/data/menuData';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface MenuCategoriesProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}


const MenuCategories = ({ activeCategory, setActiveCategory }: MenuCategoriesProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

    <section className="py-6 bg-[#f8f5f0]">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-serif font-medium mb-2 text-[#8B4513]">Joe's Café Menu</h2>
          <div className="w-24 h-1 mx-auto bg-primary rounded"></div>
          <div className="flex justify-center mb-6">
            <Button
              key="all"
              variant={activeCategory === 'all' ? 'default' : 'outline'}
              className={`rounded-full ${activeCategory === 'all' ? '' : 'hover:bg-secondary'}`}
              onClick={() => setActiveCategory('all')}
            >
              🍽️ All Items
            </Button>
          </div>

        </div>

        {categorySections.map((section) => (
          <div key={section.title} className="w-full mb-4">
            <h3 className="text-lg font-semibold text-[#8B4513] mb-2">{section.title}</h3>
            <div className="flex flex-wrap gap-2">
              {section.ids.map((categoryId) => {
                const category = categories.find((c) => c.id === categoryId);
                if (!category) return null;

                return (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.id ? 'default' : 'outline'}
                    className={`rounded-full flex items-center gap-2 ${activeCategory === category.id ? '' : 'hover:bg-secondary'} text-sm`}
                    onClick={() => setActiveCategory(category.id)}
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
        ))}
      </div>
    </section>
  );
};

export default MenuCategories;
