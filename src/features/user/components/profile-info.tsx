"use client";

import { useAuthStore } from "@/src/store/use-auth-store";
import { Mail, User } from "lucide-react";

export const ProfileInfo = () => {
  const { user } = useAuthStore();

  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
      <div className="flex items-center gap-6 mb-8">
        <div className="h-20 w-20 rounded-full bg-indigo-600 flex items-center justify-center text-white text-3xl font-black">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900">{user?.name}</h2>
          <p className="text-slate-500">Premium Member</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
          <Mail className="text-indigo-600 h-5 w-5" />
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Email Address</p>
            <p className="text-slate-700 font-semibold">{user?.email}</p>
          </div>
        </div>
        {/* ممكن تضيف Mobile هنا لو متخزن */}
      </div>
    </div>
  );
};