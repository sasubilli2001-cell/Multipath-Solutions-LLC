"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center w-full px-4">
      <div 
        className={`transition-all duration-500 w-full md:w-auto px-6 py-4 rounded-full border ${
          isScrolled 
            ? "glass border-white/20 shadow-[0_10px_40px_rgba(0,0,0,0.5)]" 
            : "bg-primary/50 backdrop-blur-md border-transparent"
        } flex justify-between items-center`}
      >
        <Link href="/" className="flex items-center gap-2 group mr-4 md:mr-8 shrink-0">
          <img src="/logo.png" alt="Multipath Solutions LLC Logo" className="h-8 w-8 object-contain" />
          <span className="font-bold text-lg md:text-xl tracking-tighter text-white group-hover:text-accent transition-colors hidden sm:block">
            Multipath Solutions LLC
          </span>
          <span className="font-bold text-lg md:text-xl tracking-tighter text-white group-hover:text-accent transition-colors sm:hidden">
            Multipath
          </span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          {["Services", "Technology", "About", "Careers", "Contact"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-xs uppercase tracking-widest font-semibold transition-colors hover:text-accent text-slate-300"
            >
              {item}
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-4 px-6 py-2 rounded-full text-xs uppercase tracking-widest font-bold transition-all bg-accent text-primary hover:bg-white"
          >
            Partner With Us
          </Link>
        </div>

        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="focus:outline-none transition-colors text-white hover:text-accent"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="md:hidden bg-primary/95 backdrop-blur-2xl border border-white/10 shadow-2xl absolute top-20 left-4 right-4 p-6 rounded-3xl flex flex-col space-y-6"
        >
          {["Services", "Technology", "About", "Careers", "Contact"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-xl font-bold transition-colors hover:text-accent text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
        </motion.div>
      )}
    </nav>
  );
}
