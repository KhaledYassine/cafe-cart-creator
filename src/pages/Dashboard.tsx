
import { useState } from 'react';
import { useMenu } from '@/context/MenuContext';
import AdminLayout from '@/components/AdminLayout';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Save, X, Search, Filter, Upload, Download } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MenuItem, Category } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import CategoryManager from '@/components/CategoryManager';
import MenuItemForm from '@/components/MenuItemForm';
import BulkOperations from '@/components/BulkOperations';

export default function Dashboard() {
  const { menuItems, categories, addMenuItem, updateMenuItem, deleteMenuItem } = useMenu();
  const { toast } = useToast();
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [newItem, setNewItem] = useState<Partial<MenuItem> | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'category'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Filter and sort menu items
  const filteredItems = menuItems
    .filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === 'price') {
        comparison = a.price - b.price;
      } else if (sortBy === 'category') {
        const categoryA = categories.find(cat => cat.id === a.category)?.name || '';
        const categoryB = categories.find(cat => cat.id === b.category)?.name || '';
        comparison = categoryA.localeCompare(categoryB);
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const handleAddNew = () => {
    setNewItem({
      name: '',
      description: '',
      price: 0,
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: categories[0]?.id || '',
      tags: []
    });
  };

  const handleSaveNew = async () => {
    if (!newItem?.name || !newItem?.category || newItem.price <= 0) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill in all required fields"
      });
      return;
    }

    try {
      await addMenuItem(newItem as Omit<MenuItem, 'id'>);
      setNewItem(null);
    } catch (error) {
      console.error('Error adding menu item:', error);
    }
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem({ ...item });
  };

  const handleSaveEdit = async () => {
    if (!editingItem) return;
    
    try {
      await updateMenuItem(editingItem.id, editingItem);
      setEditingItem(null);
    } catch (error) {
      console.error('Error updating menu item:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMenuItem(id);
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

  const handleBulkDelete = async () => {
    for (const itemId of selectedItems) {
      try {
        await deleteMenuItem(itemId);
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
    setSelectedItems([]);
  };

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const selectAllItems = () => {
    setSelectedItems(filteredItems.map(item => item.id));
  };

  const clearSelection = () => {
    setSelectedItems([]);
  };

  const exportMenuData = () => {
    const dataStr = JSON.stringify(menuItems, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'menu-export.json';
    link.click();
  };

  return (
    <AdminLayout requiredRole="owner">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-serif font-bold">Menu Management</h1>
            <p className="text-muted-foreground">Manage your restaurant menu items and categories</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={exportMenuData}>
              <Download className="h-4 w-4 mr-2" /> Export Menu
            </Button>
            <Button onClick={handleAddNew} disabled={!!newItem || !!editingItem}>
              <Plus className="h-4 w-4 mr-2" /> Add Menu Item
            </Button>
          </div>
        </div>

        <Tabs defaultValue="menu" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="menu">Menu Items</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="bulk">Bulk Operations</TabsTrigger>
          </TabsList>

          <TabsContent value="menu" className="space-y-6">
            {/* Filters and Search */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Filters & Search</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search menu items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={sortBy} onValueChange={(value: 'name' | 'price' | 'category') => setSortBy(value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="price">Price</SelectItem>
                      <SelectItem value="category">Category</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  >
                    {sortOrder === 'asc' ? '↑' : '↓'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Bulk Operations Bar */}
            {selectedItems.length > 0 && (
              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium">
                        {selectedItems.length} item(s) selected
                      </span>
                      <Button variant="outline" size="sm" onClick={clearSelection}>
                        Clear Selection
                      </Button>
                    </div>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={handleBulkDelete}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete Selected
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Menu Items Table */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <input
                            type="checkbox"
                            onChange={(e) => e.target.checked ? selectAllItems() : clearSelection()}
                            checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                          />
                        </TableHead>
                        <TableHead>Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Tags</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {newItem && (
                        <MenuItemForm
                          item={newItem}
                          categories={categories}
                          onSave={handleSaveNew}
                          onCancel={() => setNewItem(null)}
                          onChange={setNewItem}
                        />
                      )}
                      
                      {filteredItems.map((item) => (
                        <TableRow key={item.id} className={selectedItems.includes(item.id) ? 'bg-muted/50' : ''}>
                          <TableCell>
                            <input
                              type="checkbox"
                              checked={selectedItems.includes(item.id)}
                              onChange={() => toggleItemSelection(item.id)}
                            />
                          </TableCell>
                          {editingItem?.id === item.id ? (
                            <MenuItemForm
                              item={editingItem}
                              categories={categories}
                              onSave={handleSaveEdit}
                              onCancel={() => setEditingItem(null)}
                              onChange={setEditingItem}
                              isEditing
                            />
                          ) : (
                            <>
                              <TableCell>
                                <div className="h-16 w-16 overflow-hidden rounded">
                                  <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                      e.currentTarget.src = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
                                    }}
                                  />
                                </div>
                              </TableCell>
                              <TableCell className="font-medium">{item.name}</TableCell>
                              <TableCell className="max-w-xs">
                                <div className="truncate" title={item.description}>
                                  {item.description}
                                </div>
                              </TableCell>
                              <TableCell className="font-medium">${item.price.toFixed(2)}</TableCell>
                              <TableCell>
                                <Badge variant="secondary">
                                  {categories.find(cat => cat.id === item.category)?.name}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-wrap gap-1">
                                  {item.tags.slice(0, 2).map((tag, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                  {item.tags.length > 2 && (
                                    <Badge variant="outline" className="text-xs">
                                      +{item.tags.length - 2}
                                    </Badge>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="ghost" size="sm" onClick={() => handleEdit(item)}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)}>
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                  </Button>
                                </div>
                              </TableCell>
                            </>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold">{menuItems.length}</div>
                  <p className="text-xs text-muted-foreground">Total Items</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold">{categories.length}</div>
                  <p className="text-xs text-muted-foreground">Categories</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold">
                    ${menuItems.length > 0 ? (menuItems.reduce((sum, item) => sum + item.price, 0) / menuItems.length).toFixed(2) : '0.00'}
                  </div>
                  <p className="text-xs text-muted-foreground">Avg Price</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold">{filteredItems.length}</div>
                  <p className="text-xs text-muted-foreground">Filtered Results</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="categories">
            <CategoryManager />
          </TabsContent>

          <TabsContent value="bulk">
            <BulkOperations />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
