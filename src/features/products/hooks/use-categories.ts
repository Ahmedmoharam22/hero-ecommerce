import { useQuery } from "@tanstack/react-query";
import { productService } from "../services/product-api";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: productService.getCategories,
  });
};