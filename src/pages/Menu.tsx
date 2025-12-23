import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Search, Filter, Leaf, X } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { FoodCard } from "@/components/food/FoodCard";
import { foodItems, restaurants, getAllFoodCategories, priceRanges, formatPrice } from "@/data/mockData";

const Menu = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [isVegOnly, setIsVegOnly] = useState(false);
  const [isNonVegOnly, setIsNonVegOnly] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<{ min: number; max: number } | null>(null);

  const allCategories = getAllFoodCategories();

  // Update search query when URL param changes
  useEffect(() => {
    const urlSearch = searchParams.get("search");
    if (urlSearch) {
      setSearchQuery(urlSearch);
    }
  }, [searchParams]);

  const filteredItems = useMemo(() => {
    return foodItems.filter((item) => {
      // Search filter
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Veg/Non-veg filter
      const matchesVegFilter =
        (!isVegOnly && !isNonVegOnly) ||
        (isVegOnly && item.isVeg) ||
        (isNonVegOnly && !item.isVeg);

      // Category filter
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(item.category);

      // Price filter
      const matchesPrice =
        !selectedPriceRange ||
        (item.price >= selectedPriceRange.min && item.price <= selectedPriceRange.max);

      return matchesSearch && matchesVegFilter && matchesCategory && matchesPrice;
    });
  }, [searchQuery, isVegOnly, isNonVegOnly, selectedCategories, selectedPriceRange]);

  const getRestaurantName = (restaurantId: string) => {
    const restaurant = restaurants.find((r) => r.id === restaurantId);
    return restaurant?.name || "Unknown Restaurant";
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setIsVegOnly(false);
    setIsNonVegOnly(false);
    setSelectedCategories([]);
    setSelectedPriceRange(null);
  };

  const hasActiveFilters = isVegOnly || isNonVegOnly || selectedCategories.length > 0 || selectedPriceRange;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Veg/Non-Veg */}
      <div>
        <h4 className="font-semibold mb-3">Food Type</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="veg"
              checked={isVegOnly}
              onCheckedChange={(checked) => {
                setIsVegOnly(checked as boolean);
                if (checked) setIsNonVegOnly(false);
              }}
            />
            <Label htmlFor="veg" className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-green-600 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-green-600" />
              </span>
              Veg Only
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="nonveg"
              checked={isNonVegOnly}
              onCheckedChange={(checked) => {
                setIsNonVegOnly(checked as boolean);
                if (checked) setIsVegOnly(false);
              }}
            />
            <Label htmlFor="nonveg" className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-red-600 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-red-600" />
              </span>
              Non-Veg Only
            </Label>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h4 className="font-semibold mb-3">Categories</h4>
        <div className="space-y-2">
          {allCategories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <Label htmlFor={category}>{category}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-semibold mb-3">Price Range</h4>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <div key={range.label} className="flex items-center space-x-2">
              <Checkbox
                id={range.label}
                checked={
                  selectedPriceRange?.min === range.min &&
                  selectedPriceRange?.max === range.max
                }
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedPriceRange({ min: range.min, max: range.max });
                  } else {
                    setSelectedPriceRange(null);
                  }
                }}
              />
              <Label htmlFor={range.label}>{range.label}</Label>
            </div>
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
        <title>Menu - All Food Items | FoodieHub Kakinada</title>
        <meta
          name="description"
          content="Browse all food items from Kakinada's top restaurants. Filter by veg/non-veg, cuisine, and price. Order delicious Andhra food online."
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
                <h1 className="text-3xl font-bold mb-2">Full Menu</h1>
                <p className="text-muted-foreground mb-6">
                  Browse {foodItems.length}+ dishes from restaurants across Kakinada
                </p>

                {/* Search */}
                <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Search for dishes..."
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
                            {(isVegOnly ? 1 : 0) +
                              (isNonVegOnly ? 1 : 0) +
                              selectedCategories.length +
                              (selectedPriceRange ? 1 : 0)}
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

          {/* Active Filters */}
          {hasActiveFilters && (
            <section className="py-4 border-b bg-card">
              <div className="container">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-sm text-muted-foreground">Active filters:</span>
                  {isVegOnly && (
                    <Badge variant="secondary" className="gap-1">
                      <Leaf className="h-3 w-3" />
                      Veg Only
                      <button onClick={() => setIsVegOnly(false)}>
                        <X className="h-3 w-3 ml-1" />
                      </button>
                    </Badge>
                  )}
                  {isNonVegOnly && (
                    <Badge variant="secondary" className="gap-1">
                      Non-Veg Only
                      <button onClick={() => setIsNonVegOnly(false)}>
                        <X className="h-3 w-3 ml-1" />
                      </button>
                    </Badge>
                  )}
                  {selectedCategories.map((cat) => (
                    <Badge key={cat} variant="secondary" className="gap-1">
                      {cat}
                      <button onClick={() => toggleCategory(cat)}>
                        <X className="h-3 w-3 ml-1" />
                      </button>
                    </Badge>
                  ))}
                  {selectedPriceRange && (
                    <Badge variant="secondary" className="gap-1">
                      {formatPrice(selectedPriceRange.min)} - {formatPrice(selectedPriceRange.max)}
                      <button onClick={() => setSelectedPriceRange(null)}>
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

                {/* Food Items Grid */}
                <div className="lg:col-span-3">
                  {filteredItems.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-16"
                    >
                      <p className="text-4xl mb-4">🍽️</p>
                      <h3 className="text-xl font-semibold mb-2">No dishes found</h3>
                      <p className="text-muted-foreground mb-4">
                        Try adjusting your search or filters
                      </p>
                      <Button variant="outline" onClick={clearFilters}>
                        Clear Filters
                      </Button>
                    </motion.div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Showing {filteredItems.length} items
                      </p>
                      <div className="grid gap-4">
                        {filteredItems.map((item, index) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.03 }}
                          >
                            <FoodCard
                              item={item}
                              restaurantName={getRestaurantName(item.restaurantId)}
                              showRestaurant
                            />
                          </motion.div>
                        ))}
                      </div>
                    </div>
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

export default Menu;
