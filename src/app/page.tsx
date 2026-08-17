import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-primary">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        
        <Services />
        
        {/* Full-width interactive CTA Section */}
        <section className="py-32 bg-primary relative overflow-hidden border-t border-white/5">
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent rounded-full blur-[150px]"></div>
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[150px]"></div>
            </div>
            
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-2/3 text-left mb-10 md:mb-0">
                    <h2 className="text-4xl md:text-6xl font-black mb-6 text-white leading-tight tracking-tighter">
                        Ready to Chart a <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400">New Course?</span>
                    </h2>
                    <p className="text-xl text-slate-400 max-w-xl">
                        Let's build your next-generation networking and software infrastructure.
                    </p>
                </div>
                <div className="md:w-1/3 flex justify-end">
                    <a href="/contact" className="relative inline-flex group h-20 w-full sm:w-64 items-center justify-center overflow-hidden rounded-full bg-accent p-0.5 text-primary font-bold text-xl hover:text-white transition-colors shadow-[0_0_40px_rgba(102,252,241,0.4)]">
                        <span className="absolute w-full h-full bg-accent group-hover:bg-primary transition-all duration-300"></span>
                        <span className="relative z-10 flex items-center">
                            Partner With Us 
                            <svg className="w-6 h-6 ml-2 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </span>
                    </a>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
