import { axiosInstance } from "@/src/lib/axios";

export const productService = {
  async getProducts() {
    const { data } = await axiosInstance.get("/api/v1/products");
    return data.data; 
  },
  
  async getProductDetails(id: string) {
    const { data } = await axiosInstance.get(`/api/v1/products/${id}`);
    return data.data;
  }
};