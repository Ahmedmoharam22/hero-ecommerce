"use client";

import Link from "next/link";
import { ShoppingCart, Heart, User, LogOut, Settings } from "lucide-react"; 
import { Logo } from "../ui/logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWishlistStore } from "@/src/store/use-wishlist-store";
import { useAuthStore } from "@/src/store/use-auth-store";
import { useCartStore } from "@/src/store/use-cart-store";

export default function Navbar() {
  const cart = useCartStore((state) => state.cart);
  const wishlist = useWishlistStore((state) => state.wishlist);
  const { isAuthenticated, user, logout } = useAuthStore();

  // حساب عدد العناصر
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md font-tajawal">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* 1. Logo Section */}
        <Link href="/" className="flex items-center gap-2 group transition-opacity hover:opacity-90">
          <Logo showText />
        </Link>

        {/* 2. Desktop Navigation (Centered) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-500">
          <Link href="/products" className="hover:text-indigo-600 transition-colors">Products</Link>
          <Link href="/categories" className="hover:text-indigo-600 transition-colors">Categories</Link>
          <Link href="/brands" className="hover:text-indigo-600 transition-colors">Brands</Link>
        </div>

        {/* 3. Action Area (Icons & Auth) */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* تظهر فقط لو مسجل - Protected Features */}
          {isAuthenticated && (
            <>
              {/* Wishlist Icon */}
              <Link href="/wishlist" className="relative p-2 text-slate-600 hover:text-red-500 transition-all group">
                <Heart className={`h-6 w-6 transition-all ${wishlistCount > 0 ? "fill-red-500 text-red-500 scale-110" : "group-hover:scale-110"}`} />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
                    {wishlistCount}
                  </span>
                )}
              </Link>
                
              {/* Cart Icon */}
              <Link href="/cart" className="relative p-2 text-slate-600 hover:text-indigo-600 transition-all group">
                <ShoppingCart className="h-6 w-6 group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white ring-2 ring-white">
                    {cartCount}
                  </span>
                )}
              </Link>
            </>
          )}

          {/* User Section - Dynamic based on Auth State */}
          <div className="ml-2 hover: cursor-pointer pl-2 border-l border-slate-100">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full bg-slate-100 p-0 hover:bg-slate-200">
                    <span className="text-sm font-black text-indigo-600">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl shadow-xl border-slate-100">
                  <DropdownMenuLabel className="font-tajawal">
                    <p className="text-sm font-black text-slate-900">{user?.name}</p>
                    <p className="text-xs font-medium text-slate-500 truncate">{user?.email}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center cursor-pointer py-2.5 font-bold text-slate-600">
                      <User className="mr-2 h-4 w-4" /> Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center cursor-pointer py-2.5 font-bold text-slate-600">
                    <Settings className="mr-2 h-4 w-4" /> Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={logout}
                    className="flex items-center cursor-pointer py-2.5 font-bold text-red-500 focus:bg-red-50 focus:text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/auth/login">
                  <Button variant="ghost" className="hidden sm:flex font-bold text-slate-600 h-9">Login</Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="bg-indigo-600 hover:bg-indigo-700 h-9 rounded-xl px-5 font-bold shadow-md shadow-indigo-100">
                    Join
                  </Button>
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}