import { useQuery } from "@tanstack/react-query";
import { productService } from "../services/product-api";

export const useProductDetails = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => productService.getProductDetails(id),
    enabled: !!id, 
  });
};