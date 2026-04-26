// "use client";
// import { Loader2 } from "lucide-react";
// import { useProducts } from "@/src/features/products/hooks/use-products";
// import { ProductCard } from "@/src/features/products/components/ProductCard";
// import { ProductSkeleton } from "@/src/features/products/components/ProductSkeleton";
// import HeroSlider from "@/src/components/home/HeroSlider";

// export default function HomePage() {
//   const { data: products, isLoading, isError } = useProducts();

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Hero Section Simple */}
//       {/* <section className="mb-12 rounded-3xl bg-slate-900 p-8 md:p-16 text-white text-center">
//         <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Upgrade Your Style</h1>
//         <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
//           Discover our new collection of premium products designed for the modern lifestyle.
//         </p>
//         <button className="bg-indigo-600 hover:bg-indigo-500 px-8 py-3 rounded-full font-bold transition-all">
//           Shop Now
//         </button>
//       </section> */}
//       <HeroSlider />

//       {/* Product Grid */}
//       <div className="mb-8 flex items-center justify-between">
//         <h2 className="text-2xl font-bold text-slate-900">Featured Products</h2>
//       </div>

//       {isLoading ? (
//         <div className="flex h-64 items-center justify-center">
//           <Loader2 className="animate-spin text-indigo-600" size={48} />
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//          {isLoading
//     ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
//     : products?.map((product: any) => (
//         <ProductCard key={product.id} product={product} />
//       ))}
//         </div>
//       )}
//     </div>
//   );
// }










"use client";


import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Zap, Star, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/src/features/products/hooks/use-products";
import { useCategories } from "@/src/features/products/hooks/use-categories";
import { useBrands } from "@/src/features/products/hooks/use-brands";
import { ProductCard } from "@/src/features/products/components/ProductCard";
import { ProductSkeleton } from "@/src/features/products/components/ProductSkeleton";
import HeroSlider from "@/src/components/home/HeroSlider";

export default function HomePage() {
  const { data: products, isLoading: productsLoading } = useProducts();
  const { data: categories, isLoading: catsLoading } = useCategories();
  const { data: brands, isLoading: brandsLoading } = useBrands();

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
          {catsLoading ? Array.from({length: 5}).map((_, i) => <div key={i} className="h-40 bg-slate-200 animate-pulse rounded-2xl" />) : 
            categories?.slice(0, 5).map((cat: any) => (
              <Link key={cat._id} href={`/categories/${cat._id}`} className="group relative h-48 rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                <Image src={cat.image} alt={cat.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                  <span className="text-white font-bold">{cat.name}</span>
                </div>
              </Link>
            ))
          }
        </div>
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

    </main>
  );
}