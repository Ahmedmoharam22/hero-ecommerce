"use client";

import Image from "next/image";
import Link from "next/link"; 
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useCartStore } from "@/src/store/use-cart-store";
import toast from "react-hot-toast";
import { useWishlistStore } from "@/src/store/use-wishlist-store";

export function ProductCard({ product }: { product: any }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const isFavorite = isInWishlist(product.id);
  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault(); 
    toggleWishlist(product);  
    if (!isFavorite) {
      toast.success("Added to Wishlist", { icon: "❤️" });
    } else {
      toast.error("Removed from Wishlist");
    }
  };
  return (
    <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
      <Card className="overflow-hidden border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 group">
        
        <Link href={`/products/${product.id}`} className="cursor-pointer">
        <Button
        variant="ghost"
        size="icon"
        className={`absolute cursor-pointer top-2 right-2 z-20 rounded-full shadow-sm bg-white/80 backdrop-blur-sm transition-all ${
          isFavorite ? "text-red-500 hover:text-red-600" : "text-slate-400 hover:text-red-500"
        }`}
        onClick={handleWishlist}
      >
        <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
      </Button>
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={product.imageCover}
              alt={product.title}
              loading="lazy"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          <CardContent className="p-4">
            <p className="text-[10px] uppercase tracking-wider text-indigo-600 font-bold mb-1">
              {product.category?.name}
            </p>
            <h3 className="font-bold text-slate-900 line-clamp-1 mb-2 group-hover:text-indigo-600 transition-colors">
              {product.title}
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-slate-900">${product.price}</span>
              <div className="flex items-center gap-1 text-amber-400">
                <Star size={14} fill="currentColor" />
                <span className="text-xs text-slate-500">{product.ratingsAverage}</span>
              </div>
            </div>
          </CardContent>
        </Link>

        <CardFooter className="p-4 pt-0">
        <Button 
        className="w-full cursor-pointer bg-slate-900 hover:bg-slate-800"
      onClick={(e) => {
        e.preventDefault();
        addToCart(product); 
        toast.success(`${product.title.slice(0, 20)}... added to cart!`);
      }}
    >
      <ShoppingCart className="cursor-pointer" size={16} /> Add to Cart
    </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}