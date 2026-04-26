import { useQuery } from "@tanstack/react-query";
import { productService } from "../services/product-api";

export const useBrands = () => {
    return useQuery({
        queryKey: ["brands"],
        queryFn: productService.getBrands,
    });
};