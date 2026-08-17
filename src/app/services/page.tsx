import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesComponent from "@/components/Services";
import { ArrowRight } from "lucide-react";

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-primary">
      <Navbar />
      <main className="flex-grow pt-40">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 break-words">
            Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400">Solutions</span>
          </h1>
          <p className="text-2xl text-slate-400 max-w-3xl font-light">
            From strategic consulting and enterprise networking to hands-on engineering, explore how we can elevate your infrastructure.
          </p>
        </div>
        
        {/* Reuse the newly redesigned Services component */}
        <div className="mt-8">
            <ServicesComponent />
        </div>

        <div className="py-32 px-4 sm:px-6 lg:px-8 bg-black w-full border-t border-white/5">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
                <div>
                    <h2 className="text-4xl font-black text-white mb-4">Need a Custom Solution?</h2>
                    <p className="text-slate-400 text-xl max-w-lg">
                        Every enterprise has unique challenges. If you don't see exactly what you need, contact us for a tailored architectural assessment.
                    </p>
                </div>
                <a href="/contact" className="group flex items-center justify-center w-40 h-40 rounded-full bg-accent text-primary font-bold hover:scale-110 transition-transform">
                    <span className="text-center flex flex-col items-center">
                        Request <br/> Assessment
                        <ArrowRight className="mt-2 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </span>
                </a>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
