
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, X, Plus, Trash2 } from 'lucide-react';
import { MenuItem, Category } from '@/types';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

interface MenuItemFormProps {
  item: Partial<MenuItem>;
  categories: Category[];
  onSave: () => void;
  onCancel: () => void;
  onChange: (item: Partial<MenuItem>) => void;
  isEditing?: boolean;
}

export default function MenuItemForm({ 
  item, 
  categories, 
  onSave, 
  onCancel, 
  onChange, 
  isEditing = false 
}: MenuItemFormProps) {
  const [newTag, setNewTag] = useState('');

  const addTag = () => {
    if (newTag.trim() && !item.tags?.includes(newTag.trim())) {
      onChange({
        ...item,
        tags: [...(item.tags || []), newTag.trim()]
      });
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange({
      ...item,
      tags: item.tags?.filter(tag => tag !== tagToRemove) || []
    });
  };

  return (
    <>
      <TableCell>
        <div className="space-y-2">
          <Input 
            type="text"
            placeholder="Image URL"
            value={item.image || ''}
            onChange={(e) => onChange({...item, image: e.target.value})}
            className="w-32"
          />
          {item.image && (
            <div className="h-16 w-16 overflow-hidden rounded">
              <img 
                src={item.image} 
                alt="Preview" 
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
                }}
              />
            </div>
          )}
        </div>
      </TableCell>
      <TableCell>
        <Input 
          placeholder="Item name"
          value={item.name || ''}
          onChange={(e) => onChange({...item, name: e.target.value})}
          className="min-w-32"
        />
      </TableCell>
      <TableCell>
        <Textarea 
          placeholder="Description"
          value={item.description || ''}
          onChange={(e) => onChange({...item, description: e.target.value})}
          rows={3}
          className="min-w-48"
        />
      </TableCell>
      <TableCell>
        <Input 
          type="number"
          min="0"
          step="0.01"
          placeholder="Price"
          value={item.price || ''}
          onChange={(e) => onChange({...item, price: parseFloat(e.target.value)})}
          className="w-24"
        />
      </TableCell>
      <TableCell>
        <Select 
          value={item.category} 
          onValueChange={(value) => onChange({...item, category: value})}
        >
          <SelectTrigger className="w-full min-w-32">
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
      <TableCell>
        <div className="space-y-2 min-w-48">
          <div className="flex flex-wrap gap-1">
            {item.tags?.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="ml-1 text-xs hover:text-destructive"
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-1">
            <Input
              placeholder="Add tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTag()}
              className="text-xs"
            />
            <Button variant="outline" size="sm" onClick={addTag}>
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={onSave}>
            <Save className="h-4 w-4 mr-1" /> Save
          </Button>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="h-4 w-4 mr-1" /> Cancel
          </Button>
        </div>
      </TableCell>
    </>
  );
}
