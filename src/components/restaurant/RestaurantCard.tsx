import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star, Clock, MapPin, Leaf } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Restaurant, formatPrice } from "@/data/mockData";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Link to={`/restaurant/${restaurant.id}`}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
      >
        <Card className="overflow-hidden cursor-pointer group">
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {!restaurant.isOpen && (
              <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
                <span className="text-background font-semibold text-lg">
                  Currently Closed
                </span>
              </div>
            )}
            <div className="absolute top-3 left-3 flex gap-2">
              {restaurant.isVeg && (
                <Badge variant="success" className="gap-1">
                  <Leaf className="h-3 w-3" />
                  Pure Veg
                </Badge>
              )}
            </div>
            <div className="absolute top-3 right-3">
              <Badge variant="rating" className="shadow-md">
                <Star className="h-3 w-3 fill-current" />
                {restaurant.rating}
              </Badge>
            </div>
          </div>
          <CardContent className="p-4">
            <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
              {restaurant.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              {restaurant.cuisine.join(" • ")}
            </p>
            <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {restaurant.address}
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {restaurant.deliveryTime}
              </span>
              <span>•</span>
              <span>{formatPrice(restaurant.deliveryFee)} delivery</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}
