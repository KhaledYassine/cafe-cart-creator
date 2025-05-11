
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useMenu } from '@/context/MenuContext';

interface MenuCategoriesProps {
  activeCategories: string[];
  setActiveCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

const MenuCategories = ({ activeCategories, setActiveCategories }: MenuCategoriesProps) => {
  const { categories, menuItems } = useMenu();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isCategoryActive = (id: string) => activeCategories.includes(id);

  const categorySections = [
    {
      title: "Hot Drinks",
      ids: categories.filter(cat => cat.name.includes('Coffee') || cat.name.includes('Tea')).map(cat => cat.id)
    },
    {
      title: "Cold Drinks",
      ids: categories.filter(cat => cat.name.includes('Cold') || cat.name.includes('Smoothie')).map(cat => cat.id)
    },
    {
      title: "Snacks & Bakery",
      ids: categories.filter(cat => cat.name.includes('Pastry') || cat.name.includes('Sandwich') || cat.name.includes('Dessert')).map(cat => cat.id)
    }
  ];

  const getCategoryImage = (categoryIds: string[]) => {
    const items = menuItems.filter(item => categoryIds.includes(item.category));
    const itemWithImage = items.find(item => item.image && !item.image.includes('placeholder'));
    return itemWithImage?.image || 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
  };

  return (
    <section className="py-6 bg-[#f8f5f0]">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-serif font-medium mb-2 text-[#8B4513]">Joe's Café Menu</h2>
          <div className="w-24 h-1 mx-auto bg-primary rounded"></div>

          {/* All Items Button */}
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
              ❇️ All Items
            </Button>
          </div>
        </div>

        {/* Section Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          {categorySections.map((section) => {
            const allSectionActive = section.ids.every(id => activeCategories.includes(id));
            const sectionImage = getCategoryImage(section.ids);

            return (
              <Button
                key={section.title}
                variant={allSectionActive ? 'default' : 'outline'}
                className="rounded-full flex items-center gap-2 text-sm"
                onClick={() => {
                  setActiveCategories((prev: string[]) => {
                    if (allSectionActive) {
                      return prev.filter(id => !section.ids.includes(id));
                    } else {
                      return Array.from(new Set([...prev, ...section.ids]));
                    }
                  });
                }}
              >
                {section.title}
              </Button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MenuCategories;
