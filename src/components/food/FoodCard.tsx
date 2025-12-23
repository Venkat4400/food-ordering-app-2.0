import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star, Plus, Leaf } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { FoodItem, formatPrice, getRestaurantById } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";

interface FoodCardProps {
  item: FoodItem;
  restaurantName: string;
  showRestaurant?: boolean;
}

export function FoodCard({ item, restaurantName, showRestaurant = false }: FoodCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      restaurantId: item.restaurantId,
      restaurantName: restaurantName,
    });
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden group">
        <div className="flex flex-col sm:flex-row">
          <div className="relative sm:w-40 h-32 sm:h-auto overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {item.isVeg ? (
              <div className="absolute top-2 left-2">
                <Badge variant="success" className="gap-1">
                  <Leaf className="h-3 w-3" />
                  Veg
                </Badge>
              </div>
            ) : (
              <div className="absolute top-2 left-2">
                <Badge variant="destructive" className="gap-1 text-xs">
                  Non-Veg
                </Badge>
              </div>
            )}
          </div>
          <CardContent className="flex-1 p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  {showRestaurant && (
                    <Link
                      to={`/restaurant/${item.restaurantId}`}
                      className="text-sm text-primary hover:underline"
                    >
                      {restaurantName}
                    </Link>
                  )}
                </div>
                <Badge variant="rating" className="flex-shrink-0">
                  <Star className="h-3 w-3 fill-current" />
                  {item.rating}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {item.description}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-primary">
                {formatPrice(item.price)}
              </span>
              <Button
                size="sm"
                onClick={handleAddToCart}
                disabled={!item.isAvailable}
                className="gap-1"
              >
                <Plus className="h-4 w-4" />
                Add
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
}
