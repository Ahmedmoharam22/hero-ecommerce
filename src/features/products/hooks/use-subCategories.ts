

import { useQuery } from "@tanstack/react-query";
import { productService } from "../services/product-api";

export const useSubCategories = (categoryId: string) => {
    return useQuery({
        queryKey: ["subcategories", categoryId],
        queryFn: () => productService.getSpecificSubCategories(categoryId),
    });
};