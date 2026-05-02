import { Input } from "@/components/ui/input";

interface FormFieldProps {
  error?: string;
  register: any;
  name: string;
  type?: string;
  placeholder: string;
}

export const FormField = ({ error, register, name, type = "text", placeholder }: FormFieldProps) => (
  <div className="space-y-1.5 w-full">
    <Input
      type={type}
      {...register(name)}
      placeholder={placeholder}
      className={`rounded-xl h-12 bg-slate-50 border-slate-100 transition-all placeholder:text-slate-400 ${error ? 'border-red-500 focus-visible:ring-red-500' : 'focus-visible:ring-indigo-600'}`} 
    />
    {error && <p className="text-red-500 text-[11px] font-bold px-1">{error}</p>}
  </div>
);