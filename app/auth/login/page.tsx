import LoginForm from "@/src/features/auth/components/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg border border-slate-100">
        <h1 className="text-2xl font-bold text-center mb-2">Welcome Back</h1>
        <p className="text-slate-500 text-center mb-8">Please enter your details to sign in</p>
        <LoginForm />
        <p className="mt-6 text-center text-sm text-slate-600">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="text-blue-600 cursor-pointer font-semibold hover:underline">
            Sign up for free
          </Link>
        </p>
      </div>
    </div>
  );
}
