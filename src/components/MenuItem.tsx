
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
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow border-border/40">
      <div className="relative h-36 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="default" className="text-xs font-medium">
            ${item.price.toFixed(2)}
          </Badge>
        </div>
      </div>
      <CardHeader className="pb-1 pt-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-serif">{item.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow py-1">
        <CardDescription className="text-sm text-muted-foreground">
          {item.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="pt-0 pb-3">
        <Button 
          className="w-full gap-2 bg-primary/90 hover:bg-primary text-sm" 
          onClick={() => addToCart(item)}
          size="sm"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MenuItem;
