"use client";

import { ProductCard } from "@/src/features/products/components/ProductCard";
import { ProductSkeleton } from "@/src/features/products/components/ProductSkeleton";
import { useProducts } from "@/src/features/products/hooks/use-products";
import { useParams } from "next/navigation";


export default function CategoryProductsPage() {
  const { slug } = useParams(); // الـ slug هنا هو الـ ID بتاع الكاتيجوري
  const { data: products, isLoading } = useProducts();

  // فلترة المنتجات اللي تبع الكاتيجوري ده بس
  const filteredProducts = products?.filter((p: any) => p.category._id === slug);

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-black mb-8">Products in this Category</h2>
      
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
        <div className="text-center py-20 text-slate-500">
          No products found in this category.
        </div>
      )}
    </div>
  );
}