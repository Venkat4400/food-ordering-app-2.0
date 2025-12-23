import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, Star, Filter, X, Leaf } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RestaurantCard } from "@/components/restaurant/RestaurantCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { restaurants, categories, cuisineFilters, foodItems } from "@/data/mockData";

const Restaurants = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [isVegOnly, setIsVegOnly] = useState(false);
  const [minRating, setMinRating] = useState<number | null>(null);

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((restaurant) => {
      // Search by restaurant name or food items
      const matchesSearch =
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        foodItems.some(
          (item) =>
            item.restaurantId === restaurant.id &&
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

      // Cuisine filter
      const matchesCuisine =
        selectedCuisines.length === 0 ||
        restaurant.cuisine.some((c) => selectedCuisines.includes(c));

      // Veg filter
      const matchesVeg = !isVegOnly || restaurant.isVeg;

      // Rating filter
      const matchesRating = !minRating || restaurant.rating >= minRating;

      return matchesSearch && matchesCuisine && matchesVeg && matchesRating;
    });
  }, [searchQuery, selectedCuisines, isVegOnly, minRating]);

  const toggleCuisine = (cuisine: string) => {
    setSelectedCuisines((prev) =>
      prev.includes(cuisine)
        ? prev.filter((c) => c !== cuisine)
        : [...prev, cuisine]
    );
  };

  const clearFilters = () => {
    setSelectedCuisines([]);
    setIsVegOnly(false);
    setMinRating(null);
  };

  const hasActiveFilters = selectedCuisines.length > 0 || isVegOnly || minRating;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Veg Only */}
      <div>
        <h4 className="font-semibold mb-3">Food Type</h4>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="vegOnly"
            checked={isVegOnly}
            onCheckedChange={(checked) => setIsVegOnly(checked as boolean)}
          />
          <Label htmlFor="vegOnly" className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-green-600 flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-green-600" />
            </span>
            Pure Veg Only
          </Label>
        </div>
      </div>

      {/* Cuisines */}
      <div>
        <h4 className="font-semibold mb-3">Cuisines</h4>
        <div className="space-y-2">
          {cuisineFilters.map((cuisine) => (
            <div key={cuisine} className="flex items-center space-x-2">
              <Checkbox
                id={cuisine}
                checked={selectedCuisines.includes(cuisine)}
                onCheckedChange={() => toggleCuisine(cuisine)}
              />
              <Label htmlFor={cuisine}>{cuisine}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h4 className="font-semibold mb-3">Minimum Rating</h4>
        <div className="flex flex-wrap gap-1">
          {[3, 3.5, 4, 4.5].map((rating) => (
            <Button
              key={rating}
              variant={minRating === rating ? "default" : "outline"}
              size="sm"
              onClick={() => setMinRating(minRating === rating ? null : rating)}
              className="gap-0.5 h-7 px-2 text-xs"
            >
              <Star className="h-2.5 w-2.5 fill-current" />
              {rating}+
            </Button>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <Button variant="outline" onClick={clearFilters} className="w-full">
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Restaurants in Kakinada - FoodieHub</title>
        <meta
          name="description"
          content="Explore restaurants in Kakinada. Filter by cuisine, rating, and more. Order delicious food from Sri Surya, Subbayya Gari Hotel, and more."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1 bg-secondary/20">
          {/* Header */}
          <section className="bg-gradient-hero py-8 border-b">
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h1 className="text-3xl font-bold mb-2">Restaurants in Kakinada</h1>
                <p className="text-muted-foreground mb-6">
                  Discover {restaurants.length}+ restaurants delivering to you
                </p>

                {/* Search */}
                <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Search restaurants or dishes..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-12 bg-card"
                    />
                  </div>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="h-12 gap-2 md:hidden">
                        <Filter className="h-4 w-4" />
                        Filters
                        {hasActiveFilters && (
                          <Badge variant="default" className="ml-1">
                            {selectedCuisines.length + (isVegOnly ? 1 : 0) + (minRating ? 1 : 0)}
                          </Badge>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <FilterContent />
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Quick Cuisine Filters */}
          <section className="py-4 border-b bg-card">
            <div className="container overflow-x-auto">
              <div className="flex gap-2 min-w-max">
                <Badge
                  variant={selectedCuisines.length === 0 && !isVegOnly ? "default" : "secondary"}
                  className="cursor-pointer px-4 py-2"
                  onClick={clearFilters}
                >
                  All
                </Badge>
                <Badge
                  variant={isVegOnly ? "default" : "secondary"}
                  className="cursor-pointer px-4 py-2 gap-1"
                  onClick={() => setIsVegOnly(!isVegOnly)}
                >
                  <Leaf className="h-3 w-3" />
                  Pure Veg
                </Badge>
                {categories.map((category) => (
                  <Badge
                    key={category.id}
                    variant={
                      selectedCuisines.includes(category.name) ? "default" : "secondary"
                    }
                    className="cursor-pointer px-4 py-2 gap-1"
                    onClick={() => toggleCuisine(category.name)}
                  >
                    <span>{category.icon}</span>
                    {category.name}
                  </Badge>
                ))}
              </div>
            </div>
          </section>

          {/* Active Filters */}
          {hasActiveFilters && (
            <section className="py-3 bg-muted/50">
              <div className="container">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-sm text-muted-foreground">Filters:</span>
                  {isVegOnly && (
                    <Badge variant="secondary" className="gap-1">
                      <Leaf className="h-3 w-3" />
                      Pure Veg
                      <button onClick={() => setIsVegOnly(false)}>
                        <X className="h-3 w-3 ml-1" />
                      </button>
                    </Badge>
                  )}
                  {selectedCuisines.map((cuisine) => (
                    <Badge key={cuisine} variant="secondary" className="gap-1">
                      {cuisine}
                      <button onClick={() => toggleCuisine(cuisine)}>
                        <X className="h-3 w-3 ml-1" />
                      </button>
                    </Badge>
                  ))}
                  {minRating && (
                    <Badge variant="secondary" className="gap-1">
                      <Star className="h-3 w-3 fill-current" />
                      {minRating}+ Rating
                      <button onClick={() => setMinRating(null)}>
                        <X className="h-3 w-3 ml-1" />
                      </button>
                    </Badge>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Content */}
          <section className="py-8">
            <div className="container">
              <div className="grid lg:grid-cols-4 gap-8">
                {/* Desktop Sidebar Filters */}
                <div className="hidden lg:block">
                  <Card className="sticky top-24">
                    <CardContent className="pt-6">
                      <h3 className="font-bold text-lg mb-4">Filters</h3>
                      <FilterContent />
                    </CardContent>
                  </Card>
                </div>

                {/* Restaurant Grid */}
                <div className="lg:col-span-3">
                  {filteredRestaurants.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-16"
                    >
                      <p className="text-4xl mb-4">🍽️</p>
                      <h3 className="text-xl font-semibold mb-2">
                        No restaurants found
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Try adjusting your search or filters
                      </p>
                      <Button variant="outline" onClick={clearFilters}>
                        Clear Filters
                      </Button>
                    </motion.div>
                  ) : (
                    <>
                      <p className="text-sm text-muted-foreground mb-4">
                        Showing {filteredRestaurants.length} restaurants
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredRestaurants.map((restaurant, index) => (
                          <motion.div
                            key={restaurant.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <RestaurantCard restaurant={restaurant} />
                          </motion.div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Restaurants;
