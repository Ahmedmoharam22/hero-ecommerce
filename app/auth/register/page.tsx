"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "@/src/components/ui/form-field"; 
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AuthCardWrapper } from "@/src/features/auth/components/auth-card-wrapper";
import { AuthHeader } from "@/src/features/auth/components/auth-header";
import { registerSchema } from "@/src/features/auth/schemas/auth-schema";
import toast from "react-hot-toast";
import { authService } from "@/src/features/auth/services/auth-api";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(registerSchema),
  });

    const onSubmit = async (values: any) => {
        try {
          const res = await authService.register(values);
          if (res.message === "success") {
            toast.success("Registration successful!");
            router.replace("/auth/login"); 
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message);
        }
    };

  return (
    <AuthCardWrapper>
      <AuthHeader 
        title="Create Account" 
        subtitle="Join APEX and start your premium shopping journey" 
      />
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <FormField name="name" placeholder="Full Name" register={register} error={errors.name?.message as string} />
          <FormField name="phone" placeholder="Phone" register={register} error={errors.phone?.message as string} />
        </div>
        
        <FormField name="email" placeholder="Email Address" register={register} error={errors.email?.message as string} />
        
        <div className="grid grid-cols-2 gap-3">
          <FormField name="password" type="password" placeholder="Password" register={register} error={errors.password?.message as string} />
          <FormField name="rePassword" type="password" placeholder="Confirm" register={register} error={errors.rePassword?.message as string} />
        </div>

        <Button type="submit" className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 h-14 rounded-xl text-lg font-bold shadow-lg shadow-indigo-100 mt-2" disabled={isSubmitting}>
          {isSubmitting ? <Spinner className="text-white" /> : "Sign Up"}
        </Button>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-600 cursor-pointer font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </AuthCardWrapper>
  );
}