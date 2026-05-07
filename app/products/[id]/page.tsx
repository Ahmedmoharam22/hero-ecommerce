"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Star, ShoppingCart, Truck, ShieldCheck, ArrowLeft, Heart, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useProductDetails } from "@/src/features/products/hooks/use-product-details";
import { useCartStore } from "@/src/store/use-cart-store";
import { useWishlistStore } from "@/src/store/use-wishlist-store";
import toast from "react-hot-toast";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { data: product, isLoading, isError } = useProductDetails(id as string);
  const addToCart = useCartStore((state) => state.addToCart);
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const [qty, setQty] = useState(1);

  if (isLoading) return <ProductDetailsSkeleton />;
  if (isError || !product) return <div className="text-center py-20">Product not found!</div>;

  const isFavorite = isInWishlist(product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addToCart(product);
    }
    toast.success(`${qty}× ${product.title.slice(0, 22)}... added to cart!`, { icon: "🛒" });
  };

  const handleWishlist = () => {
    toggleWishlist(product);
    if (!isFavorite) {
      toast.success("Added to Wishlist", { icon: "❤️" });
    } else {
      toast.error("Removed from Wishlist");
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 mb-8 transition-colors"
      >
        <ArrowLeft size={16} className="mr-2" /> Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm">
          <Image
            src={product.imageCover}
            alt={product.title}
            fill
            className="object-contain p-8"
            priority
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <Badge className="w-fit mb-4 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border-none">
            {product.category?.name}
          </Badge>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{product.title}</h1>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1 text-amber-500">
              <Star size={20} fill="currentColor" />
              <span className="font-bold text-slate-900">{product.ratingsAverage}</span>
            </div>
            <span className="text-slate-400">|</span>
            <span className="text-slate-500 text-sm">{product.ratingsQuantity} reviews</span>
          </div>

          <p className="text-slate-600 leading-relaxed mb-8">{product.description}</p>

          <div className="text-3xl font-bold text-slate-900 mb-8">${product.price}</div>

          {/* ── Quantity Selector ── */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-semibold text-slate-700">Quantity</span>
            <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-4 py-2.5 text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <Minus size={16} />
              </button>
              <span className="px-5 py-2.5 font-bold text-slate-900 min-w-[3rem] text-center">
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="px-4 py-2.5 text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* ── Action Buttons ── */}
          <div className="flex gap-3 mb-8">
            <Button
              id="add-to-cart-btn"
              size="lg"
              className="flex-1 bg-slate-900 hover:bg-indigo-600 h-14 text-lg cursor-pointer transition-colors"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2" size={20} />
              Add to Cart
            </Button>

            <Button
              id="wishlist-btn"
              size="lg"
              variant="outline"
              className={`h-14 w-14 p-0 cursor-pointer border-slate-200 transition-colors ${
                isFavorite
                  ? "text-red-500 border-red-200 bg-red-50 hover:bg-red-100"
                  : "hover:border-red-300 hover:text-red-500"
              }`}
              onClick={handleWishlist}
            >
              <Heart size={22} fill={isFavorite ? "currentColor" : "none"} />
            </Button>
          </div>

          {/* Features Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-100 rounded-full">
                <Truck size={20} className="text-slate-600" />
              </div>
              <span className="text-sm font-medium text-slate-700">Free Worldwide Shipping</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-100 rounded-full">
                <ShieldCheck size={20} className="text-slate-600" />
              </div>
              <span className="text-sm font-medium text-slate-700">2 Years Warranty</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Skeleton Loading for a polished experience
function ProductDetailsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <Skeleton className="aspect-square rounded-2xl" />
        <div className="space-y-6">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-12 w-1/2" />
          <Skeleton className="h-14 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}