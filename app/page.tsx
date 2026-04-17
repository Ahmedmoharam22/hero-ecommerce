"use client";
import { Loader2 } from "lucide-react";
import { useProducts } from "@/src/features/products/hooks/use-products";
import { ProductCard } from "@/src/features/products/components/ProductCard";
import { ProductSkeleton } from "@/src/features/products/components/ProductSkeleton";

export default function HomePage() {
  const { data: products, isLoading, isError } = useProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section Simple */}
      <section className="mb-12 rounded-3xl bg-slate-900 p-8 md:p-16 text-white text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Upgrade Your Style</h1>
        <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
          Discover our new collection of premium products designed for the modern lifestyle.
        </p>
        <button className="bg-indigo-600 hover:bg-indigo-500 px-8 py-3 rounded-full font-bold transition-all">
          Shop Now
        </button>
      </section>

      {/* Product Grid */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Featured Products</h2>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="animate-spin text-indigo-600" size={48} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         {isLoading
    ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
    : products?.map((product: any) => (
        <ProductCard key={product.id} product={product} />
      ))}
        </div>
      )}
    </div>
  );
}