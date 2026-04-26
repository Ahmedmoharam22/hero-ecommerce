"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useCategories } from "@/src/features/products/hooks/use-categories";
import Image from "next/image";
import Link from "next/link";

export default function CategoriesPage() {
  const { data: categories, isLoading } = useCategories();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-black mb-10">Shop by Category</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-2xl" />
          ))
        ) : (
          categories?.map((cat: any) => (
            <Link key={cat._id} href={`/categories/${cat._id}`} className="group">
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-slate-100 shadow-sm transition-all group-hover:shadow-md">
                <Image 
                  src={cat.image} 
                  alt={cat.name} 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <span className="text-white font-bold text-lg">{cat.name}</span>
                </div>
              </div>
              <h3 className="mt-4 text-center font-bold text-slate-800">{cat.name}</h3>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}