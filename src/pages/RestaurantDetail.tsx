import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Star, Clock, MapPin, Phone, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FoodCard } from "@/components/food/FoodCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { restaurants, foodItems } from "@/data/mockData";

const RestaurantDetail = () => {
  const { id } = useParams();
  const restaurant = restaurants.find((r) => r.id === id);
  const menu = foodItems.filter((item) => item.restaurantId === id);

  // Group items by category
  const categorizedMenu = menu.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof menu>);

  const categoryNames = Object.keys(categorizedMenu);

  if (!restaurant) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-6xl mb-4">🍽️</p>
            <h1 className="text-2xl font-bold mb-2">Restaurant not found</h1>
            <p className="text-muted-foreground mb-4">
              The restaurant you're looking for doesn't exist.
            </p>
            <Link to="/restaurants">
              <Button>Browse Restaurants</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{restaurant.name} - Order Online | FoodieHub</title>
        <meta
          name="description"
          content={`Order ${restaurant.cuisine.join(", ")} from ${restaurant.name}. Fast delivery, great prices. ${restaurant.rating} star rating.`}
        />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1">
          {/* Hero Banner */}
          <section className="relative h-64 md:h-80">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="container">
                <Link to="/restaurants">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary-foreground mb-4"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back to restaurants
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Restaurant Info */}
          <section className="bg-card border-b">
            <div className="container py-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
                    <p className="text-muted-foreground mb-4">
                      {restaurant.cuisine.join(" • ")}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <Badge variant="rating" className="text-base py-1 px-3">
                        <Star className="h-4 w-4 fill-current mr-1" />
                        {restaurant.rating}
                      </Badge>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {restaurant.deliveryTime}
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {restaurant.address}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Delivery fee</p>
                    <p className="text-lg font-bold">
                      ₹{restaurant.deliveryFee.toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Min order: ₹{restaurant.minOrder}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Menu */}
          <section className="py-8 bg-secondary/20">
            <div className="container">
              <Tabs defaultValue={categoryNames[0] || "all"}>
                <TabsList className="mb-6 flex-wrap h-auto gap-2">
                  {categoryNames.map((category) => (
                    <TabsTrigger key={category} value={category}>
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {categoryNames.map((category) => (
                  <TabsContent key={category} value={category}>
                    <div className="space-y-4">
                      {categorizedMenu[category].map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <FoodCard
                            item={item}
                            restaurantName={restaurant.name}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default RestaurantDetail;
