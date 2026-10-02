// Replace images by swapping files in src/assets/menu/ (same filenames).
import biryani from "@/assets/menu/biryani.jpg";
import gulab from "@/assets/menu/gulab-jamun.jpg";
import saffron from "@/assets/menu/saffron-ice-cream.jpg";
import kebab from "@/assets/menu/seekh-kebab.jpg";

export type MenuItem = { id: string; name: string; price: number; desc: string; image: string; tag: string };

export const MENU: MenuItem[] = [
  { id: "biryani", name: "Royal Chicken Biryani", price: 249, desc: "Slow-dum basmati, saffron, tender chicken.", image: biryani, tag: "Mains" },
  { id: "gulab", name: "Gulab Jamun", price: 99, desc: "Warm, rose-cardamom syrup, pistachio.", image: gulab, tag: "Dessert" },
  { id: "saffron", name: "Saffron Ice Cream", price: 89, desc: "Kesar kulfi-style, creamy and cool.", image: saffron, tag: "Dessert" },
  { id: "kebab", name: "Seekh Kebab", price: 199, desc: "Charcoal-grilled, mint chutney.", image: kebab, tag: "Starters" },
];
