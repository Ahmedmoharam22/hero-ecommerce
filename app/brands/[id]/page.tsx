"use client";

import { useParams } from "next/navigation";
import { useProducts } from "@/src/features/products/hooks/use-products";
import { ProductCard } from "@/src/features/products/components/ProductCard";
import { ProductSkeleton } from "@/src/features/products/components/ProductSkeleton";

export default function BrandProductsPage() {
  const { id } = useParams();
  const { data: products, isLoading } = useProducts();

  // فلترة المنتجات حسب الـ Brand ID
  const filteredProducts = products?.filter((p: any) => p.brand?._id === id);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-10 border-b pb-6">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Brand Collection</h2>
        <span className="text-sm font-medium text-slate-500">{filteredProducts?.length || 0} Products Found</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => <ProductSkeleton key={i} />)
        ) : (
          filteredProducts?.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
      
      {!isLoading && filteredProducts?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="bg-slate-50 rounded-full p-6 mb-4">🚫</div>
          <h3 className="text-lg font-bold text-slate-900">No products available</h3>
          <p className="text-slate-500">Check back later for new arrivals from this brand.</p>
        </div>
      )}
    </div>
  );
}