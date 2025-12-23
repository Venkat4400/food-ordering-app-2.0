import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t bg-secondary/30">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl">🍽️</span>
              <span className="text-xl font-bold text-gradient">FoodieHub</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Delicious food delivered to your doorstep. Fast, fresh, and always
              tasty.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/restaurants" className="hover:text-primary transition-colors">
                  Browse Restaurants
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* For Restaurants */}
          <div>
            <h4 className="font-semibold mb-4">For Restaurants</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/partner" className="hover:text-primary transition-colors">
                  Partner with us
                </Link>
              </li>
              <li>
                <Link to="/restaurant/login" className="hover:text-primary transition-colors">
                  Restaurant Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>support@foodiehub.com</li>
              <li>1-800-FOOD-HUB</li>
              <li>Mon - Sun: 8AM - 11PM</li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2024 FoodieHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
