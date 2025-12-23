import { motion } from "framer-motion";
import { categories } from "@/data/mockData";

export function CategorySlider() {
  return (
    <div className="overflow-x-auto pb-4 -mx-4 px-4">
      <div className="flex gap-4 min-w-max">
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border shadow-sm hover:shadow-md hover:border-primary/50 transition-all min-w-[100px]"
          >
            <span className="text-3xl">{category.icon}</span>
            <span className="text-sm font-medium">{category.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
