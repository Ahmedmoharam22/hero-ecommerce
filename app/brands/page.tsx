    "use client";

    import { Skeleton } from "@/components/ui/skeleton";
    import { useBrands } from "@/src/features/products/hooks/use-brands";
    import Image from "next/image";
    import Link from "next/link";

    export default function BrandsPage() {
    const { data: brands, isLoading } = useBrands();

    return (
        <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-black text-slate-900 mb-2">Our Official Brands</h1>
            <p className="text-slate-500">Shop from the world's most trusted manufacturers</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {isLoading ? (
            Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} className="aspect-[3/2] rounded-xl" />
            ))
            ) : (
            brands?.map((brand: any) => (
                <Link key={brand._id} href={`/brands/${brand._id}`} className="group">
                <div className="group relative bg-white border border-slate-100 rounded-xl p-4 hover:shadow-md transition-all duration-300 flex items-center justify-center h-32 w-full">
    
    <div className="relative w-full h-full">
        <Image 
        src={brand.image} 
        alt={brand.name} 
        fill 
        unoptimized
        className="object-contain transition-transform duration-500 group-hover:scale-110"
        />
    </div>

    <div className="absolute inset-0 bg-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
    </div>
                <h3 className="mt-3 text-center font-bold text-indigo-600 transition-colors">
                    {brand.name}
                </h3>
                </Link>
            ))
            )}
        </div>
        </div>
    );
    }