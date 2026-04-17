"use client";
import { HeartOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useWishlistStore } from "@/src/store/use-wishlist-store";
import { ProductCard } from "@/src/features/products/components/ProductCard";

export default function WishlistPage() {
  const { wishlist } = useWishlistStore();
    
  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="flex justify-center mb-6 text-slate-200">
          <HeartOff size={100} strokeWidth={1} />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Your wishlist is empty</h2>
        <p className="text-slate-500 mb-10">Save your favorite items here to find them easily later.</p>
        <Link href="/">
          <Button className="bg-indigo-600 rounded-full px-8 h-12">Start Exploring</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-black text-slate-900 mb-10 tracking-tight">My Wishlist</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}