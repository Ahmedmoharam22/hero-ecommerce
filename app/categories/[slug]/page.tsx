"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import { useProducts } from "@/src/features/products/hooks/use-products";
import { useSubCategories } from "@/src/features/products/hooks/use-subCategories";
import { useCategories } from "@/src/features/products/hooks/use-categories";
import { ProductCard } from "@/src/features/products/components/ProductCard";
import { ProductSkeleton } from "@/src/features/products/components/ProductSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { Layers, ChevronRight, Tag } from "lucide-react";
import Link from "next/link";

export default function CategoryProductsPage() {
  const { slug } = useParams() as { slug: string };
  const [selectedSubCat, setSelectedSubCat] = useState<string | null>(null);

  const { data: products, isLoading: productsLoading } = useProducts();
  const { data: subCategories, isLoading: subCatsLoading } = useSubCategories(slug);
  const { data: categories } = useCategories();

  const currentCategory = categories?.find((c: any) => c._id === slug);

  // Filter products: first by category, then optionally by subcategory
  const categoryProducts = products?.filter((p: any) => p.category._id === slug);
  const filteredProducts = selectedSubCat
    ? categoryProducts?.filter((p: any) => p.subcategory?._id === selectedSubCat || p.subcategory === selectedSubCat)
    : categoryProducts;

  const hasSubCategories = !subCatsLoading && subCategories && subCategories.length > 0;

  return (
    <div className="min-h-screen bg-[#f8fafc]">

      {/* ── Page Header ── */}
      <div className="bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 py-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 text-sm text-slate-500 mb-4">
            <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link href="/categories" className="hover:text-indigo-600 transition-colors">Categories</Link>
            <ChevronRight size={14} />
            <span className="text-slate-900 font-semibold">
              {currentCategory?.name ?? "Category"}
            </span>
          </nav>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-100 flex items-center justify-center">
              <Layers size={20} className="text-indigo-600" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900">
                {currentCategory?.name ?? "Category"}
              </h1>
              <p className="text-slate-500 text-sm mt-0.5">
                {filteredProducts?.length ?? 0} products
                {selectedSubCat && subCategories && (
                  <span className="ml-1">
                    in <span className="text-indigo-600 font-semibold">
                      {subCategories.find((s: any) => s._id === selectedSubCat)?.name}
                    </span>
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">

        {/* ── Sub Categories Section ── */}
        {(subCatsLoading || hasSubCategories) && (
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Tag size={16} className="text-indigo-500" />
              <h2 className="text-lg font-bold text-slate-800">Sub Categories</h2>
            </div>

            <div className="flex flex-wrap gap-3">
              {/* "All" chip */}
              {!subCatsLoading && (
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedSubCat(null)}
                  className={`
                    relative px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-200 cursor-pointer
                    ${selectedSubCat === null
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200"
                      : "bg-white text-slate-700 border-slate-200 hover:border-indigo-400 hover:text-indigo-600"
                    }
                  `}
                >
                  All Products
                </motion.button>
              )}

              {/* Subcategory chips */}
              {subCatsLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-10 w-28 rounded-full" />
                  ))
                : subCategories?.map((sub: any) => (
                    <motion.button
                      key={sub._id}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() =>
                        setSelectedSubCat(sub._id === selectedSubCat ? null : sub._id)
                      }
                      className={`
                        px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-200 cursor-pointer
                        ${selectedSubCat === sub._id
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200"
                          : "bg-white text-slate-700 border-slate-200 hover:border-indigo-400 hover:text-indigo-600"
                        }
                      `}
                    >
                      {sub.name}
                    </motion.button>
                  ))
              }
            </div>

            {/* Active filter indicator */}
            <AnimatePresence>
              {selectedSubCat && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mt-4 flex items-center gap-2"
                >
                  <span className="text-sm text-slate-500">Filtering by:</span>
                  <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 border border-indigo-200 px-3 py-1 rounded-full text-sm font-semibold">
                    {subCategories?.find((s: any) => s._id === selectedSubCat)?.name}
                    <button
                      onClick={() => setSelectedSubCat(null)}
                      className="ml-1 text-indigo-400 hover:text-indigo-700 transition-colors cursor-pointer"
                    >
                      ✕
                    </button>
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Divider */}
            <div className="mt-8 border-t border-slate-100" />
          </section>
        )}

        {/* ── Products Grid ── */}
        <section>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSubCat ?? "all"}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {productsLoading
                ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
                : filteredProducts?.map((product: any) => (
                    <ProductCard key={product.id} product={product} />
                  ))
              }
            </motion.div>
          </AnimatePresence>

          {/* Empty state */}
          {!productsLoading && (!filteredProducts || filteredProducts.length === 0) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="h-20 w-20 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                <Layers size={36} className="text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">No Products Found</h3>
              <p className="text-slate-500 mb-6 max-w-sm">
                {selectedSubCat
                  ? "No products found in this subcategory. Try selecting a different one."
                  : "No products found in this category."}
              </p>
              {selectedSubCat && (
                <button
                  onClick={() => setSelectedSubCat(null)}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-colors cursor-pointer"
                >
                  Clear Filter
                </button>
              )}
            </motion.div>
          )}
        </section>
      </div>
    </div>
  );
}