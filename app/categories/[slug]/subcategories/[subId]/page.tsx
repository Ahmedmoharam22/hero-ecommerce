"use client";

import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Tag } from "lucide-react";
import { useProducts } from "@/src/features/products/hooks/use-products";
import { useSubCategories } from "@/src/features/products/hooks/use-subCategories";
import { useCategories } from "@/src/features/products/hooks/use-categories";
import { ProductCard } from "@/src/features/products/components/ProductCard";
import { ProductSkeleton } from "@/src/features/products/components/ProductSkeleton";

export default function SubCategoryProductsPage() {
  const { slug, subId } = useParams() as { slug: string; subId: string };

  const { data: products, isLoading: productsLoading } = useProducts();
  const { data: subCategories } = useSubCategories(slug);
  const { data: categories } = useCategories();

  const currentCategory = categories?.find((c: any) => c._id === slug);
  const currentSubCat = subCategories?.find((s: any) => s._id === subId);

  const filteredProducts = products?.filter(
    (p: any) =>
      p.category._id === slug &&
      (p.subcategory?._id === subId || p.subcategory === subId)
  );

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <div className="bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 py-10">
          <nav className="flex items-center gap-1 text-sm text-slate-500 mb-4">
            <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link href="/categories" className="hover:text-indigo-600 transition-colors">Categories</Link>
            <ChevronRight size={14} />
            <Link href={`/categories/${slug}`} className="hover:text-indigo-600 transition-colors">
              {currentCategory?.name ?? "Category"}
            </Link>
            <ChevronRight size={14} />
            <span className="text-slate-900 font-semibold">{currentSubCat?.name ?? "Subcategory"}</span>
          </nav>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-100 flex items-center justify-center">
              <Tag size={20} className="text-indigo-600" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900">
                {currentSubCat?.name ?? "Subcategory"}
              </h1>
              <p className="text-slate-500 text-sm mt-0.5">
                {filteredProducts?.length ?? 0} products
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {productsLoading
            ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
            : filteredProducts?.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </motion.div>

        {!productsLoading && (!filteredProducts || filteredProducts.length === 0) && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="h-20 w-20 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
              <Tag size={36} className="text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No Products Found</h3>
            <p className="text-slate-500 mb-6">No products available in this subcategory.</p>
            <Link
              href={`/categories/${slug}`}
              className="px-6 py-2 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-colors"
            >
              Back to Category
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
