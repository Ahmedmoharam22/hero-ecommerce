import { useQuery } from "@tanstack/react-query";
import { productService } from "../services/product-api";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: productService.getProducts,
    staleTime: 1000 * 60 * 5, 
  });
};