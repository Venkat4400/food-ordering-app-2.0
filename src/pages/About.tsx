import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { MapPin, Code, Heart, Target, Users, Utensils } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const About = () => {
  const techStack = [
    { name: "React.js", category: "Frontend" },
    { name: "TypeScript", category: "Language" },
    { name: "Tailwind CSS", category: "Styling" },
    { name: "Framer Motion", category: "Animations" },
    { name: "React Router", category: "Routing" },
    { name: "React Query", category: "Data Fetching" },
    { name: "Supabase", category: "Backend" },
    { name: "PostgreSQL", category: "Database" },
  ];

  const features = [
    {
      icon: Utensils,
      title: "Wide Restaurant Selection",
      description: "Browse through popular local restaurants in Kakinada with authentic Andhra cuisine.",
    },
    {
      icon: MapPin,
      title: "Local Focus",
      description: "Dedicated to serving the Kakinada community with fast and reliable food delivery.",
    },
    {
      icon: Users,
      title: "Customer First",
      description: "User-friendly interface designed for seamless food ordering experience.",
    },
    {
      icon: Target,
      title: "Quality Assured",
      description: "Partner with only the best restaurants to ensure quality food every time.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>About Us - FoodieHub Kakinada</title>
        <meta
          name="description"
          content="Learn about FoodieHub - Kakinada's premier online food ordering platform. Discover our mission, technology, and commitment to serving delicious food."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="bg-gradient-hero py-16">
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-3xl mx-auto"
              >
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  About Us
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Bringing <span className="text-gradient">Kakinada's Best Food</span> to Your Doorstep
                </h1>
                <p className="text-lg text-muted-foreground">
                  FoodieHub is Kakinada's favorite online food ordering platform, connecting you with the city's most beloved restaurants.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Mission & Vision */}
          <section className="py-16">
            <div className="container">
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <Target className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-2xl">Our Mission</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        To revolutionize the way Kakinada orders food by providing a seamless, 
                        reliable, and enjoyable online food ordering experience. We aim to support 
                        local restaurants while delivering happiness to every customer's doorstep.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <Heart className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-2xl">Our Vision</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        To become the most trusted and preferred food delivery platform in 
                        Andhra Pradesh, known for our commitment to quality, speed, and 
                        customer satisfaction. We envision a future where every craving 
                        is just a few clicks away.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="py-16 bg-secondary/30">
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold mb-4">Why Choose FoodieHub?</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  We're committed to making your food ordering experience as smooth and enjoyable as possible.
                </p>
              </motion.div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full text-center">
                      <CardContent className="pt-6">
                        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                          <feature.icon className="h-7 w-7 text-primary" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Location */}
          <section className="py-16">
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
                  <MapPin className="h-5 w-5" />
                  <span className="font-medium">Proudly Serving Kakinada</span>
                </div>
                <h2 className="text-3xl font-bold mb-4">Our Location</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Based in Kakinada, Andhra Pradesh, we serve the entire city and surrounding areas. 
                  From Jagannaickpur to Sarpavaram, from Bhanugudi to Ramanayyapeta - we've got you covered!
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <p className="text-3xl font-bold text-gradient mb-2">8+</p>
                    <p className="text-muted-foreground">Partner Restaurants</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <p className="text-3xl font-bold text-gradient mb-2">50+</p>
                    <p className="text-muted-foreground">Menu Items</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <p className="text-3xl font-bold text-gradient mb-2">30 min</p>
                    <p className="text-muted-foreground">Avg. Delivery Time</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Tech Stack */}
          <section className="py-16 bg-secondary/30">
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
                  <Code className="h-5 w-5" />
                  <span className="font-medium">Built with Modern Tech</span>
                </div>
                <h2 className="text-3xl font-bold mb-4">Technologies Used</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  FoodieHub is built using cutting-edge web technologies to ensure a fast, 
                  reliable, and secure food ordering experience.
                </p>
              </motion.div>

              <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
                {techStack.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Badge variant="secondary" className="px-4 py-2 text-sm">
                      {tech.name}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Developer Info */}
          <section className="py-16">
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-2xl mx-auto text-center"
              >
                <h2 className="text-3xl font-bold mb-4">Developer Details</h2>
                <Card>
                  <CardContent className="pt-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl text-primary-foreground font-bold">FH</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">FoodieHub Development Team</h3>
                    <p className="text-muted-foreground mb-4">
                      B.Tech Final Year Project
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      <Badge variant="outline">Full Stack Development</Badge>
                      <Badge variant="outline">UI/UX Design</Badge>
                      <Badge variant="outline">Database Architecture</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">
                      Location: Kakinada, East Godavari, Andhra Pradesh, India
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default About;
