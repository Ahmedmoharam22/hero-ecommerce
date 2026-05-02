import { Logo } from "@/src/components/ui/logo";

interface AuthHeaderProps {
  title: string;
  subtitle?: string;
}

export const AuthHeader = ({ title, subtitle }: AuthHeaderProps) => (
    <div className="flex flex-col items-center mb-8 text-center">
        <Logo className="h-12 w-12 mb-4 transition-transform hover:rotate-12" />
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h1>
        {subtitle && <p className="text-slate-500 mt-2 text-sm font-medium">{subtitle}</p>}
    </div>
);