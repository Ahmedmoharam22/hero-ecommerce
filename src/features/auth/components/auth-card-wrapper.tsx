interface AuthCardWrapperProps {
  children: React.ReactNode;
}

export const AuthCardWrapper = ({ children }: AuthCardWrapperProps) => (
    <div className="flex min-h-[85vh] items-center justify-center py-12 px-4 bg-slate-50/50">
        <div className="w-full max-w-[480px] p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/40">
            {children}
        </div>
    </div>
);