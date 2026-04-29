"use client";

import Link from "next/link";
import { ShoppingCart, Heart, Search, User } from "lucide-react"; 
import { useWishlistStore } from "@/src/store/use-wishlist-store";
import { useCartStore } from "@/src/store/use-cart-store";
import { Logo } from "../ui/logo";

export default function Navbar() {
  const cart = useCartStore((state) => state.cart);
  const wishlist = useWishlistStore((state) => state.wishlist);

  // حساب عدد العناصر في الكارت والويش ليست
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-black tracking-tight text-slate-900">
          <Logo className="text-3xl" showText />
        </Link>

 {/* Desktop Navigation */}
         <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
           <Link href="/products" className="hover:text-indigo-600 transition-colors">Products</Link>
           <Link href="/categories" className="hover:text-indigo-600 transition-colors">Categories</Link>
           <Link href="/brands" className="hover:text-indigo-600 transition-colors">Brands</Link>
         </div>
        {/* Icons Area */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Wishlist Icon */}
          <Link href="/wishlist" className="relative p-2 text-slate-600 hover:text-red-500 transition-colors group">
            <Heart className={`h-6 w-6 ${wishlistCount > 0 ? "fill-red-500 text-red-500" : ""}`} />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white animate-in zoom-in">
                {wishlistCount}
              </span>
            )}
            <span className="sr-only">Wishlist</span>
          </Link>
            
          {/* Cart Icon */}
          <Link href="/cart" className="relative p-2 text-slate-600 hover:text-indigo-600 transition-colors">
            <ShoppingCart className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white animate-in zoom-in">
                {cartCount}
              </span>
            )}
            <span className="sr-only">Cart</span>
          </Link>

          {/* User Icon / Login */}
          <Link href="/profile" className="p-2 text-slate-600 hover:text-indigo-600">
            <User className="h-6 w-6" />
          </Link>

        </div>
      </div>
    </nav>
  );
}