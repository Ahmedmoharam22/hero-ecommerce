"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { Star, ShoppingCart, Truck, ShieldCheck, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useProductDetails } from "@/src/features/products/hooks/use-product-details";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { data: product, isLoading, isError } = useProductDetails(id as string);

  if (isLoading) return <ProductDetailsSkeleton />;
  if (isError || !product) return <div className="text-center py-20">Product not found!</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back Button */}
      <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 mb-8 transition-colors">
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

          <p className="text-slate-600 leading-relaxed mb-8">
            {product.description}
          </p>

          <div className="text-3xl font-bold text-slate-900 mb-8">
            ${product.price}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button size="lg" className="flex-1 bg-slate-900 hover:bg-indigo-600 h-14 text-lg">
              <ShoppingCart className="mr-2" /> Add to Cart
            </Button>
          </div>

          {/* Features Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-100 rounded-full"><Truck size={20} className="text-slate-600" /></div>
              <span className="text-sm font-medium text-slate-700">Free Worldwide Shipping</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-100 rounded-full"><ShieldCheck size={20} className="text-slate-600" /></div>
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
        </div>
      </div>
    </div>
  );
}