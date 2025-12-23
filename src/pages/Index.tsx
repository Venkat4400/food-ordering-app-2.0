import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { CategorySlider } from "@/components/home/CategorySlider";
import { FeaturedRestaurants } from "@/components/home/FeaturedRestaurants";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>FoodieHub - Delicious Food Delivered Fast</title>
        <meta
          name="description"
          content="Order from your favorite restaurants and enjoy mouth-watering meals delivered right to your doorstep in minutes. Browse 500+ restaurants near you."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1">
          <HeroSection />

          {/* Categories Section */}
          <section className="py-12 bg-secondary/30">
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <h2 className="text-2xl font-bold mb-2">What are you craving?</h2>
                <p className="text-muted-foreground">
                  Explore cuisines from around the world
                </p>
              </motion.div>
              <CategorySlider />
            </div>
          </section>

          <FeaturedRestaurants />

          {/* CTA Section */}
          <section className="py-16 bg-gradient-primary">
            <div className="container text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-2xl mx-auto"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                  Become a Restaurant Partner
                </h2>
                <p className="text-primary-foreground/80 mb-8">
                  Join thousands of restaurants already growing their business
                  with FoodieHub
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-background text-foreground font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Partner With Us
                </motion.button>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Index;
