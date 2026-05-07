import { axiosInstance } from "@/src/lib/axios";

export const productService = {
  async getProducts() {
    const { data } = await axiosInstance.get("/api/v1/products");
    return data.data; 
  },
  
  async getProductDetails(id: string) {
    const { data } = await axiosInstance.get(`/api/v1/products/${id}`);
    return data.data;
  },

  async getCategories() {
    const { data } = await axiosInstance.get("/api/v1/categories");
    return data.data;
  },
  
  async getBrands() {
    const { data } = await axiosInstance.get("/api/v1/brands");
    return data.data;
  },

  async getSubCategories() {
    const { data } = await axiosInstance.get("/api/v1/subcategories");
    return data.data;
  },

  async getSpecificSubCategories(id: string) {
    const { data } = await axiosInstance.get(`/api/v1/categories/${id}/subcategories`);
    return data.data;
  }
};
