// import LoginForm from "@/src/features/auth/components/LoginForm";
// import Link from "next/link";

// export default function LoginPage() {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-slate-50">
//       <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg border border-slate-100">
//         <h1 className="text-2xl font-bold text-center mb-2">Welcome Back</h1>
//         <p className="text-slate-500 text-center mb-8">Please enter your details to sign in</p>
//         <LoginForm />
//         <p className="mt-6 text-center text-sm text-slate-600">
//           Don&apos;t have an account?{" "}
//           <Link href="/auth/register" className="text-blue-600 cursor-pointer font-semibold hover:underline">
//             Sign up for free
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }


"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/src/store/use-auth-store";
import { authService } from "@/src/features/auth/services/auth-api";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { loginSchema } from "@/src/features/auth/schemas/auth-schema";
import { AuthCardWrapper } from "@/src/features/auth/components/auth-card-wrapper";
import { AuthHeader } from "@/src/features/auth/components/auth-header";
import { FormField } from "@/src/components/ui/form-field"; 
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";


export default function LoginPage() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: any) => {
    try {
      const res = await authService.login(values);
      if (res.message === "success") {
        setAuth(res.user, res.token);
        toast.success("Welcome Back!");
        router.push("/"); //  to Home Page
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <AuthCardWrapper >
      <AuthHeader 
        title="Welcome Back" 
        subtitle="Please enter your details to sign in"
      />
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField name="email" placeholder="Email Address" register={register} error={errors.email?.message as string} />
        <FormField name="password" type="password" placeholder="Password" register={register} error={errors.password?.message as string} />
        
        <Button type="submit" className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 h-12 rounded-xl text-base font-semibold shadow-lg shadow-indigo-100 mt-2" disabled={isSubmitting}>
          {isSubmitting ? <Spinner className="text-white" /> : "Login"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        Don&apos;t have an account?
        <Link href="/auth/register" className="text-blue-600 cursor-pointer font-semibold hover:underline">
          Sign up for free
        </Link>
      </p>
    </AuthCardWrapper>
  );
}