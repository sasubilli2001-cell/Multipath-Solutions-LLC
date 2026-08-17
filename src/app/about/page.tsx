import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-primary">
      <Navbar />
      <main className="flex-grow pt-40 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
                <div>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">
                        We Are <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400">Multipath</span>
                    </h1>
                    <p className="text-xl text-slate-400 leading-relaxed font-light mb-8">
                        A collective of engineers, strategists, and visionaries dedicated to charting the optimal technological path for your enterprise. We believe that robust networking and elegant software go hand-in-hand.
                    </p>

                </div>
                <div className="relative h-[600px] rounded-3xl overflow-hidden glass border border-white/10 hidden lg:block">
                    <img src="/about-hero.png" alt="Abstract modern office" className="w-full h-full object-cover opacity-80 mix-blend-screen" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/80 to-transparent"></div>
                </div>
            </div>

            <div className="border-t border-white/10 pt-32">
                <div className="grid md:grid-cols-3 gap-12">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold text-white">Integrity First</h2>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            We build trust through transparent communication and reliable delivery. No hidden clauses, just clean engineering.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold text-white">Constant Evolution</h2>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Our engineers master the latest stacks—from SD-WAN to GenAI—to keep your enterprise ahead of the curve.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold text-white">Client-Centric</h2>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Your success is our success. We measure our achievements strictly by your operational growth and stability.
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
