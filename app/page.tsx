"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useProducts } from "@/src/features/products/hooks/use-products";
import { useCategories } from "@/src/features/products/hooks/use-categories";
import { useSubCategories } from "@/src/features/products/hooks/use-subCategories";
import { useBrands } from "@/src/features/products/hooks/use-brands";
import { ProductCard } from "@/src/features/products/components/ProductCard";
import { ProductSkeleton } from "@/src/features/products/components/ProductSkeleton";
import HeroSlider from "@/src/components/home/HeroSlider";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomePage() {
  const [activeCatId, setActiveCatId] = useState<string | null>(null);

  const { data: products, isLoading: productsLoading } = useProducts();
  const { data: categories, isLoading: catsLoading } = useCategories();
  const { data: brands, isLoading: brandsLoading } = useBrands();
  const { data: subCategories, isLoading: subCatsLoading } = useSubCategories(activeCatId ?? "");

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      
      {/* 1. Hero Section */}
     <HeroSlider />

      {/* 2. Featured Categories */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-black text-slate-900">Featured Categories</h2>
            <p className="text-slate-500">Explore our most popular departments</p>
          </div>
          <Link href="/categories" className="text-indigo-600 font-bold hover:underline flex items-center gap-1">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {catsLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-48 bg-slate-200 animate-pulse rounded-2xl" />
              ))
            : categories?.slice(0, 5).map((cat: any) => (
                <motion.button
                  key={cat._id}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveCatId(activeCatId === cat._id ? null : cat._id)}
                  className={`group relative h-48 rounded-2xl overflow-hidden border shadow-sm transition-all duration-300 cursor-pointer text-left w-full ${
                    activeCatId === cat._id
                      ? "border-indigo-500 ring-2 ring-indigo-400 shadow-indigo-200"
                      : "border-slate-100"
                  }`}
                >
                  <Image src={cat.image} alt={cat.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                    <span className="text-white font-bold">{cat.name}</span>
                  </div>
                  {activeCatId === cat._id && (
                    <div className="absolute inset-0 bg-indigo-600/20 flex items-center justify-center">
                      <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">Selected</span>
                    </div>
                  )}
                </motion.button>
              ))
          }
        </div>

        {/* ── Sub Categories Strip ── */}
        <AnimatePresence>
          {activeCatId && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 24 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Tag size={16} className="text-indigo-500" />
                    <h3 className="text-base font-bold text-slate-800">Sub Categories</h3>
                  </div>
                  <Link
                    href={`/categories/${activeCatId}`}
                    className="text-sm text-indigo-600 font-semibold hover:underline flex items-center gap-1"
                  >
                    View all products <ArrowRight size={14} />
                  </Link>
                </div>

                <div className="flex flex-wrap gap-3">
                  {subCatsLoading
                    ? Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-10 w-28 rounded-full" />
                      ))
                    : subCategories && subCategories.length > 0
                    ? subCategories.map((sub: any) => (
                        <Link
                          key={sub._id}
                          href={`/categories/${activeCatId}`}
                          className="px-5 py-2.5 rounded-full text-sm font-semibold border bg-white text-slate-700 border-slate-200 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200"
                        >
                          {sub.name}
                        </Link>
                      ))
                    : (
                        <p className="text-slate-400 text-sm py-2">No subcategories found for this category.</p>
                      )
                  }
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 3. Latest Products */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-4xl font-black text-slate-900 mb-4">Latest Arrivals</h2>
            <p className="text-slate-500">Hand-picked products just for you, fresh from our global warehouses.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {productsLoading ? Array.from({length: 8}).map((_, i) => <ProductSkeleton key={i} />) : 
              products?.slice(0, 8).map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))
            }
          </div>
        </div>
      </section>

      {/* 4. Top Brands */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex flex-col items-center mb-10">
            <h2 className="text-4xl font-black text-slate-900 mb-4">Top Brands</h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {brandsLoading ? null : 
              brands?.slice(0, 6).map((brand: any) => (
                <Link key={brand._id} href={`/brands/${brand._id}`} className="relative h-12 w-24">
                  <Image src={brand.image} alt={brand.name} fill unoptimized className="object-contain" />
                </Link>
              ))
            }
          </div>
        </div>
      </section>

      {/* Sub Features Section */}
      <section className="py-16 bg-white border-y border-slate-100">
        
      </section>
    </main>
  );
}