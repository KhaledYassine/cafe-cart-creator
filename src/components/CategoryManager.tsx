
import { useState } from 'react';
import { useMenu } from '@/context/MenuContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { Category } from '@/types';
import { useToast } from '@/hooks/use-toast';

export default function CategoryManager() {
  const { categories, menuItems, addCategory, updateCategory, deleteCategory } = useMenu();
  const { toast } = useToast();
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newCategory, setNewCategory] = useState<{ name: string } | null>(null);

  const handleAddNew = () => {
    setNewCategory({ name: '' });
  };

  const handleSaveNew = async () => {
    if (!newCategory?.name.trim()) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please enter a category name"
      });
      return;
    }

    try {
      await addCategory({ name: newCategory.name.trim() });
      setNewCategory(null);
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory({ ...category });
  };

  const handleSaveEdit = async () => {
    if (!editingCategory?.name.trim()) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please enter a category name"
      });
      return;
    }

    try {
      await updateCategory(editingCategory.id, { name: editingCategory.name.trim() });
      setEditingCategory(null);
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleDelete = async (categoryId: string) => {
    const itemsInCategory = menuItems.filter(item => item.category === categoryId);
    if (itemsInCategory.length > 0) {
      toast({
        variant: "destructive",
        title: "Cannot delete category",
        description: `This category contains ${itemsInCategory.length} menu item(s). Please move or delete them first.`
      });
      return;
    }

    try {
      await deleteCategory(categoryId);
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const getCategoryItemCount = (categoryId: string) => {
    return menuItems.filter(item => item.category === categoryId).length;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Category Management</h2>
          <p className="text-muted-foreground">Organize your menu items into categories</p>
        </div>
        <Button onClick={handleAddNew} disabled={!!newCategory || !!editingCategory}>
          <Plus className="h-4 w-4 mr-2" /> Add Category
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {newCategory && (
          <Card className="border-dashed border-2">
            <CardHeader>
              <CardTitle className="text-lg">New Category</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Category name"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && handleSaveNew()}
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleSaveNew}>
                  <Save className="h-4 w-4 mr-1" /> Save
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setNewCategory(null)}>
                  <X className="h-4 w-4 mr-1" /> Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {categories.map((category) => (
          <Card key={category.id}>
            <CardHeader>
              {editingCategory?.id === category.id ? (
                <div className="space-y-2">
                  <Input
                    value={editingCategory.name}
                    onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                    onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleSaveEdit}>
                      <Save className="h-4 w-4 mr-1" /> Save
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setEditingCategory(null)}>
                      <X className="h-4 w-4 mr-1" /> Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(category)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDelete(category.id)}
                        disabled={getCategoryItemCount(category.id) > 0}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription>
                    <Badge variant="secondary">
                      {getCategoryItemCount(category.id)} item(s)
                    </Badge>
                  </CardDescription>
                </>
              )}
            </CardHeader>
            {editingCategory?.id !== category.id && (
              <CardContent>
                <div className="space-y-2">
                  {menuItems
                    .filter(item => item.category === category.id)
                    .slice(0, 3)
                    .map((item) => (
                      <div key={item.id} className="text-sm text-muted-foreground flex justify-between">
                        <span className="truncate">{item.name}</span>
                        <span>${item.price.toFixed(2)}</span>
                      </div>
                    ))}
                  {getCategoryItemCount(category.id) > 3 && (
                    <div className="text-xs text-muted-foreground">
                      +{getCategoryItemCount(category.id) - 3} more items...
                    </div>
                  )}
                  {getCategoryItemCount(category.id) === 0 && (
                    <div className="text-sm text-muted-foreground italic">
                      No items in this category
                    </div>
                  )}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
