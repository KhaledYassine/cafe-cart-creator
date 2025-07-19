
import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { categories, menuItems } from '@/data/menuData';

const DataSeeder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    categories: number;
    menuItems: number;
  } | null>(null);
  const { toast } = useToast();
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const seedDatabase = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      if (!isAuthenticated) {
        toast({ variant: 'destructive', title: 'Not authenticated', description: 'Please log in first.' });
        setIsLoading(false);
        return;
      }
      // Get Auth0 access token
      const accessToken = await getAccessTokenSilently();
      // Set Supabase client to use Auth0 JWT (new API)
      // For @supabase/supabase-js v2+
      await supabase.auth.setSession({ access_token: accessToken, refresh_token: '' });

      // Step 1: Insert categories
      const { data: insertedCategories, error: categoriesError } = await supabase
        .from('categories')
        .upsert(
          categories.map(cat => ({
            id: cat.id,
            name: cat.name
          })),
          { onConflict: 'id' }
        );

      if (categoriesError) throw categoriesError;

      // Step 2: Insert menu items
      const { data: insertedMenuItems, error: menuItemsError } = await supabase
        .from('menu_items')
        .upsert(
          menuItems.map(item => ({
            id: item.id,
            name: item.name,
            description: item.description,
            price: item.price,
            image: item.image,
            category_id: item.category,
            tags: item.tags
          })),
          { onConflict: 'id' }
        );

      if (menuItemsError) throw menuItemsError;

      setResult({
        categories: categories.length,
        menuItems: menuItems.length
      });

      toast({
        title: "Database seeded successfully",
        description: `Added ${categories.length} categories and ${menuItems.length} menu items.`
      });

    } catch (error: any) {
      console.error('Error seeding database:', error);
      toast({
        variant: 'destructive',
        title: "Failed to seed database",
        description: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-md bg-secondary/20">
      <h3 className="text-lg font-medium mb-3">Database Seeder</h3>
      <p className="text-sm text-muted-foreground mb-4">
        This will upload the menu data from menuData.ts to the Supabase database.
        {result && (
          <span className="block mt-2 text-green-600">
            Successfully added {result.categories} categories and {result.menuItems} menu items.
          </span>
        )}
      </p>
      <Button 
        onClick={seedDatabase} 
        disabled={isLoading}
        variant="default"
      >
        {isLoading ? "Uploading..." : "Upload Menu Data"}
      </Button>
    </div>
  );
};

export default DataSeeder;
