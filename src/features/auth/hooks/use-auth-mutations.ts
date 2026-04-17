import { useMutation } from "@tanstack/react-query";
import { authService } from "../services/auth-api";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export const useLoginMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      if (data.message === "success") {
        localStorage.setItem("userToken", data.token);
        toast.success("login successfully");
        router.push("/");
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "login failed");
    },
  });
};


export const useRegisterMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      if (data.message === "success") {
        toast.success("Account created successfully! Please login.");
        router.push("/auth/login");
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Registration failed");
    },
  });
};