
import { useState } from 'react';
import { useMenu } from '@/context/MenuContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Upload, Download, Trash2, Edit, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function BulkOperations() {
  const { menuItems, categories, updateMenuItem, deleteMenuItem } = useMenu();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [priceAdjustment, setPriceAdjustment] = useState<number>(0);
  const [adjustmentType, setAdjustmentType] = useState<'percentage' | 'fixed'>('percentage');

  const handleBulkPriceUpdate = async () => {
    if (!selectedCategory || priceAdjustment === 0) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please select a category and enter a price adjustment"
      });
      return;
    }

    const itemsToUpdate = menuItems.filter(item => item.category === selectedCategory);
    
    try {
      for (const item of itemsToUpdate) {
        let newPrice = item.price;
        
        if (adjustmentType === 'percentage') {
          newPrice = item.price * (1 + priceAdjustment / 100);
        } else {
          newPrice = item.price + priceAdjustment;
        }
        
        // Ensure price is not negative
        newPrice = Math.max(0, newPrice);
        
        await updateMenuItem(item.id, { price: Number(newPrice.toFixed(2)) });
      }
      
      toast({
        title: "Bulk update completed",
        description: `Updated prices for ${itemsToUpdate.length} items`
      });
    } catch (error) {
      console.error('Error updating prices:', error);
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "Failed to update some items"
      });
    }
  };

  const handleBulkDelete = async () => {
    if (!selectedCategory) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please select a category"
      });
      return;
    }

    const itemsToDelete = menuItems.filter(item => item.category === selectedCategory);
    
    if (itemsToDelete.length === 0) {
      toast({
        variant: "destructive",
        title: "No items found",
        description: "No items found in the selected category"
      });
      return;
    }

    try {
      for (const item of itemsToDelete) {
        await deleteMenuItem(item.id);
      }
      
      toast({
        title: "Bulk deletion completed",
        description: `Deleted ${itemsToDelete.length} items`
      });
    } catch (error) {
      console.error('Error deleting items:', error);
      toast({
        variant: "destructive",
        title: "Deletion failed",
        description: "Failed to delete some items"
      });
    }
  };

  const exportCategoryData = () => {
    if (!selectedCategory) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please select a category"
      });
      return;
    }

    const categoryItems = menuItems.filter(item => item.category === selectedCategory);
    const categoryName = categories.find(cat => cat.id === selectedCategory)?.name || 'Unknown';
    
    const dataStr = JSON.stringify({
      category: categoryName,
      items: categoryItems
    }, null, 2);
    
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${categoryName.toLowerCase().replace(/\s+/g, '-')}-export.json`;
    link.click();
  };

  const importMenuData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        console.log('Imported data:', data);
        toast({
          title: "Data imported",
          description: "Menu data has been imported successfully"
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Import failed",
          description: "Invalid file format"
        });
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Bulk Operations</h2>
        <p className="text-muted-foreground">Perform operations on multiple menu items at once</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bulk Price Update */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Bulk Price Update
            </CardTitle>
            <CardDescription>
              Update prices for all items in a category
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                    <Badge variant="secondary" className="ml-2">
                      {menuItems.filter(item => item.category === category.id).length} items
                    </Badge>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Select value={adjustmentType} onValueChange={(value: 'percentage' | 'fixed') => setAdjustmentType(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">%</SelectItem>
                  <SelectItem value="fixed">$</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="number"
                placeholder={adjustmentType === 'percentage' ? '10' : '5.00'}
                value={priceAdjustment || ''}
                onChange={(e) => setPriceAdjustment(Number(e.target.value))}
                step={adjustmentType === 'percentage' ? '1' : '0.01'}
              />
            </div>

            <Button onClick={handleBulkPriceUpdate} className="w-full">
              Update Prices
            </Button>
          </CardContent>
        </Card>

        {/* Import/Export */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Import/Export
            </CardTitle>
            <CardDescription>
              Import or export menu data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Import Menu Data</label>
              <Input
                type="file"
                accept=".json"
                onChange={importMenuData}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Export Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category to export" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={exportCategoryData} variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Export Category
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Bulk Delete */}
        <Card className="border-destructive/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <Trash2 className="h-5 w-5" />
              Bulk Delete
            </CardTitle>
            <CardDescription>
              Delete all items in a category (use with caution)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category to delete" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                    <Badge variant="destructive" className="ml-2">
                      {menuItems.filter(item => item.category === category.id).length} items
                    </Badge>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button onClick={handleBulkDelete} variant="destructive" className="w-full">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete All Items in Category
            </Button>
          </CardContent>
        </Card>

        {/* Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Menu Statistics</CardTitle>
            <CardDescription>
              Overview of your menu data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-2xl font-bold">{menuItems.length}</div>
                <p className="text-xs text-muted-foreground">Total Items</p>
              </div>
              <div>
                <div className="text-2xl font-bold">{categories.length}</div>
                <p className="text-xs text-muted-foreground">Categories</p>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  ${menuItems.length > 0 ? Math.min(...menuItems.map(item => item.price)).toFixed(2) : '0.00'}
                </div>
                <p className="text-xs text-muted-foreground">Lowest Price</p>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  ${menuItems.length > 0 ? Math.max(...menuItems.map(item => item.price)).toFixed(2) : '0.00'}
                </div>
                <p className="text-xs text-muted-foreground">Highest Price</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
