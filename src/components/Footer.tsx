import Link from "next/link";
import { MapPin, Phone, Mail, ChevronRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-primary border-t border-white/10 pt-20 pb-8 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group text-white">
              <img src="/logo.png" alt="Multipath Solutions LLC Logo" className="h-8 w-8 object-contain" />
              <span className="font-bold text-xl tracking-tight text-glow group-hover:text-accent transition-colors">Multipath Solutions LLC</span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              Pioneering enterprise growth through advanced software engineering and strategic tech consulting. We map out the digital paths that lead your business to success.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              {[
                { name: "About Us", href: "/about" },
                { name: "Services", href: "/services" },
                { name: "Technology", href: "/technology" },
                { name: "Careers", href: "/careers" },
                { name: "Contact Us", href: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-slate-400 hover:text-accent transition-colors flex items-center group">
                    <ChevronRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-accent" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-6">Capabilities</h3>
            <ul className="space-y-3">
              {["Digital Transformation", "Cybersecurity", "Cloud Architecture", "Data & AI", "Custom Software"].map((item) => (
                <li key={item}>
                  <Link href="/services" className="text-sm text-slate-400 hover:text-accent transition-colors flex items-center group">
                    <ChevronRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-accent" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-6">Get In Touch</h3>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span>971 US Highway 202 N<br/>Branchburg, NJ 08876</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <a href="tel:+17794316626" className="hover:text-accent transition-colors">+1 (779) 431-6626</a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <a href="mailto:hr@multipathsolution.com" className="hover:text-accent transition-colors">hr@multipathsolution.com</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Multipath Solutions LLC. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-slate-500">
            <Link href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-accent transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
