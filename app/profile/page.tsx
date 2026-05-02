import { ProfileInfo } from "@/src/features/user/components/profile-info";

export default function ProfilePage() {
  return (
    <main className="container mx-auto px-4 py-12 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black text-slate-900 mb-10 tracking-tight">
          My <span className="text-indigo-600">Account</span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Navigation Sidebar (Micro-style) */}
          <div className="md:col-span-1 space-y-2">
            <nav className="flex flex-col gap-2">
              <button className="text-left px-6 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100">
                General Info
              </button>
              <button className="text-left px-6 py-4 text-slate-500 hover:bg-slate-100 rounded-2xl font-bold transition-all">
                My Orders
              </button>
              <button className="text-left px-6 py-4 text-slate-500 hover:bg-slate-100 rounded-2xl font-bold transition-all">
                Settings
              </button>
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-2">
            <ProfileInfo />
          </div>
        </div>
      </div>
    </main>
  );
}