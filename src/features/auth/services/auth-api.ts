import { axiosInstance } from "@/src/lib/axios";
import { LoginValues, RegisterValues } from "../schemas/auth-schema";

export const authService = {
  async login(data: LoginValues) {
    const response = await axiosInstance.post("/api/v1/auth/signin", data);
    return response.data;
  },
  
  async register(data: RegisterValues) {
    const response = await axiosInstance.post("/api/v1/auth/signup", data);
    return response.data;
  }
};