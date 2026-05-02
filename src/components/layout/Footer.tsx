import Link from "next/link";
import { Phone, Mail, Globe2, X, GitBranchPlus } from "lucide-react";
import { Logo } from "../ui/logo";
const footerLinks = {
  shop: [
    { name: "All Products", href: "/products" },
    { name: "Categories", href: "/categories" },
    { name: "Featured", href: "/featured" },
  ],
  support: [
    { name: "Contact Us", href: "/contact" },
    { name: "Shipping Policy", href: "/shipping" },
    { name: "Refund Policy", href: "/refund" },
    { name: "FAQ", href: "/faq" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
  ],
};

export default function Footer() {
    
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="text-xl font-bold tracking-tight text-slate-900">
           <Logo showText />
            </Link>
            <p className="text-sm text-slate-500 max-w-xs">
              Experience the future of shopping with our curated collection of premium products. Quality and style, delivered to your door.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-slate-400 hover:text-indigo-600 transition-colors"><Globe2 size={20} /></Link>
              <Link href="#" className="text-slate-400 hover:text-indigo-600 transition-colors"><X size={20} /></Link>
              <Link href="#" className="text-slate-400 hover:text-indigo-600 transition-colors"><GitBranchPlus size={20} /></Link>
              <Link href="#" className="text-slate-400 hover:text-indigo-600 transition-colors"><GitBranchPlus size={20} /></Link>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} HEROSTORE. All rights reserved. Built with ❤️ for the community.
          </p>
          <div className="flex items-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1"><Phone size={14} /> +20 123 456 789</span>
            <span className="flex items-center gap-1"><Mail size={14} /> support@herostore.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}