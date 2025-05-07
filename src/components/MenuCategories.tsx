
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { categories, menuItems } from '@/data/menuData';
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
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            key="all"
            variant={activeCategory === 'all' ? 'default' : 'outline'}
            className={`rounded-full ${activeCategory === 'all' ? '' : 'hover:bg-secondary'}`}
            onClick={() => setActiveCategory('all')}
          >
            All
          </Button>

          {/* Show only first few categories, rest in dropdown on small screens */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:hidden">
            {categories.slice(0, 5).map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? 'default' : 'outline'}
                className={`rounded-full flex items-center gap-2 ${activeCategory === category.id ? '' : 'hover:bg-secondary'}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <div className="w-6 h-6 rounded-full overflow-hidden">
                  <img 
                    src={getCategoryImage(category.id)} 
                    alt={category.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm">{category.name}</span>
              </Button>
            ))}
            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-full">
                  More Categories
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 max-h-[60vh] overflow-y-auto">
                <div className="grid grid-cols-1 gap-1 p-2">
                  {categories.slice(5).map((category) => (
                    <Button
                      key={category.id}
                      variant={activeCategory === category.id ? 'default' : 'outline'}
                      className={`w-full justify-start flex items-center gap-2 ${activeCategory === category.id ? '' : 'hover:bg-secondary'}`}
                      onClick={() => {
                        setActiveCategory(category.id);
                        setIsDropdownOpen(false);
                      }}
                    >
                      <div className="w-6 h-6 rounded-full overflow-hidden">
                        <img 
                          src={getCategoryImage(category.id)} 
                          alt={category.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-sm">{category.name}</span>
                    </Button>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Show all categories on medium and larger screens in a scrollable container */}
          <div className="hidden md:flex md:flex-wrap md:items-center md:justify-center md:gap-2 max-h-[300px] overflow-y-auto px-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? 'default' : 'outline'}
                className={`rounded-full flex items-center gap-2 ${activeCategory === category.id ? '' : 'hover:bg-secondary'} text-sm md:text-base`}
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuCategories;
