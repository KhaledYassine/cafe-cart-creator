
import { useState } from 'react';
import { useMenu } from '@/context/MenuContext';
import AdminLayout from '@/components/AdminLayout';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MenuItem, Category } from '@/types';
import { useToast } from '@/hooks/use-toast';

export default function Dashboard() {
  const { menuItems, categories, addMenuItem, updateMenuItem, deleteMenuItem } = useMenu();
  const { toast } = useToast();
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [newItem, setNewItem] = useState<Partial<MenuItem> | null>(null);

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

  const handleSaveNew = () => {
    if (!newItem?.name || !newItem?.category || newItem.price <= 0) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill in all required fields"
      });
      return;
    }

    addMenuItem(newItem as Omit<MenuItem, 'id'>);
    toast({
      title: "Item added",
      description: "New menu item has been added successfully"
    });
    setNewItem(null);
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem({ ...item });
  };

  const handleSaveEdit = () => {
    if (!editingItem) return;
    
    updateMenuItem(editingItem.id, editingItem);
    toast({
      title: "Item updated",
      description: "Menu item has been updated successfully"
    });
    setEditingItem(null);
  };

  const handleDelete = (id: string) => {
    deleteMenuItem(id);
    toast({
      title: "Item deleted",
      description: "Menu item has been removed from the menu"
    });
  };

  const cancelEdit = () => {
    setEditingItem(null);
  };

  const cancelNew = () => {
    setNewItem(null);
  };

  return (
    <AdminLayout requiredRole="owner">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-serif font-bold">Menu Management</h1>
          <Button onClick={handleAddNew} disabled={!!newItem || !!editingItem}>
            <Plus className="h-4 w-4 mr-2" /> Add Menu Item
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {newItem && (
                <TableRow>
                  <TableCell>
                    <Input 
                      type="text"
                      placeholder="Image URL"
                      value={newItem.image || ''}
                      onChange={(e) => setNewItem({...newItem, image: e.target.value})}
                      className="w-32"
                    />
                    {newItem.image && (
                      <div className="mt-2 h-16 w-16 overflow-hidden rounded">
                        <img 
                          src={newItem.image} 
                          alt="Preview" 
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
                          }}
                        />
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Input 
                      placeholder="Item name"
                      value={newItem.name || ''}
                      onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                    />
                  </TableCell>
                  <TableCell>
                    <Textarea 
                      placeholder="Description"
                      value={newItem.description || ''}
                      onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                      rows={2}
                    />
                  </TableCell>
                  <TableCell>
                    <Input 
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="Price"
                      value={newItem.price || ''}
                      onChange={(e) => setNewItem({...newItem, price: parseFloat(e.target.value)})}
                      className="w-24"
                    />
                  </TableCell>
                  <TableCell>
                    <Select 
                      value={newItem.category} 
                      onValueChange={(value) => setNewItem({...newItem, category: value})}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={handleSaveNew}>
                        <Save className="h-4 w-4 mr-1" /> Save
                      </Button>
                      <Button variant="ghost" size="sm" onClick={cancelNew}>
                        <X className="h-4 w-4 mr-1" /> Cancel
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
              
              {menuItems.map((item) => (
                <TableRow key={item.id}>
                  {editingItem?.id === item.id ? (
                    <>
                      <TableCell>
                        <Input 
                          type="text"
                          placeholder="Image URL"
                          value={editingItem.image}
                          onChange={(e) => setEditingItem({...editingItem, image: e.target.value})}
                          className="w-32"
                        />
                        <div className="mt-2 h-16 w-16 overflow-hidden rounded">
                          <img 
                            src={editingItem.image} 
                            alt={editingItem.name} 
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
                            }}
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Input 
                          value={editingItem.name}
                          onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                        />
                      </TableCell>
                      <TableCell>
                        <Textarea 
                          value={editingItem.description}
                          onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                          rows={2}
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          type="number"
                          min="0"
                          step="0.01"
                          value={editingItem.price}
                          onChange={(e) => setEditingItem({...editingItem, price: parseFloat(e.target.value)})}
                          className="w-24"
                        />
                      </TableCell>
                      <TableCell>
                        <Select 
                          value={editingItem.category} 
                          onValueChange={(value) => setEditingItem({...editingItem, category: value})}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={handleSaveEdit}>
                            <Save className="h-4 w-4 mr-1" /> Save
                          </Button>
                          <Button variant="ghost" size="sm" onClick={cancelEdit}>
                            <X className="h-4 w-4 mr-1" /> Cancel
                          </Button>
                        </div>
                      </TableCell>
                    </>
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
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="max-w-xs truncate">{item.description}</TableCell>
                      <TableCell>${item.price.toFixed(2)}</TableCell>
                      <TableCell>
                        {categories.find(cat => cat.id === item.category)?.name}
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
      </div>
    </AdminLayout>
  );
}
