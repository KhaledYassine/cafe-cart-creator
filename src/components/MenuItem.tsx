
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from 'lucide-react';
import { MenuItem as MenuItemType } from '@/types';

interface MenuItemProps {
  item: MenuItemType;
  addToCart: (item: MenuItemType) => void;
}

const MenuItem = ({ item, addToCart }: MenuItemProps) => {
  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-serif">{item.name}</CardTitle>
          <span className="font-medium text-primary">${item.price.toFixed(2)}</span>
        </div>
        <div className="flex flex-wrap gap-1 mt-1">
          {item.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-sm text-muted-foreground">
          {item.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          className="w-full gap-2" 
          onClick={() => addToCart(item)}
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MenuItem;
