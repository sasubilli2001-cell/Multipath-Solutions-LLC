"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowDownRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-primary overflow-hidden pt-32 pb-20">
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] max-w-2xl max-h-2xl bg-accent/20 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-[10%] right-[10%] w-[35vw] h-[35vw] max-w-xl max-h-xl bg-purple-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md inline-flex items-center"
        >
          <span className="w-2 h-2 rounded-full bg-accent mr-3 animate-ping"></span>
          <span className="text-sm font-semibold tracking-widest text-slate-300 uppercase">Enterprise Infrastructure & Networking</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[1.1] max-w-5xl"
        >
          Architecting <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-accent to-purple-500">
            Resilient Ecosystems
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-2xl text-slate-400 mb-12 max-w-3xl font-light"
        >
          We engineer scalable digital infrastructure, advanced networking solutions, and robust cybersecurity frameworks that power modern enterprise growth.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <Link href="/services" className="px-10 py-5 rounded-full bg-white text-primary font-bold text-lg hover:bg-accent hover:text-primary transition-all duration-300 flex items-center group shadow-[0_0_30px_rgba(102,252,241,0.3)]">
            Explore Capabilities
            <ArrowDownRight className="ml-3 group-hover:rotate-[-45deg] transition-transform" />
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-50 animate-bounce">
        <span className="text-xs tracking-widest uppercase mb-2 text-white">Scroll to discover</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
      </div>
    </section>
  );
}
