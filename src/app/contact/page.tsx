"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{type: 'success' | 'error' | null, message: string}>({
    type: null,
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: "" });

    try {
      const res = await fetch("https://formsubmit.co/ajax/hr@multipathsolution.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          _subject: `New Contact Request from ${formData.name}`,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message
        }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Something went wrong.");
      }

      setStatus({ type: 'success', message: "Your message has been sent successfully!" });
      setFormData({ name: "", email: "", phone: "", message: "" }); // Reset form
      
    } catch (error: any) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-primary">
      <Navbar />
      <main className="flex-grow pt-40 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-20">
                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
                    Let's Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400">Together</span>
                </h1>
                <p className="text-xl text-slate-400 font-light">
                    Ready to chart a new course? Contact us to discuss your enterprise IT and networking needs.
                </p>
            </div>

            {/* Contact Info + Form */}
            <div className="flex flex-col lg:flex-row bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden mb-12">
                <div className="lg:w-1/2 p-12 md:p-20 flex flex-col justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-10">Contact Information</h2>
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-sm font-bold text-accent uppercase tracking-widest mb-2">Headquarters</h3>
                                <p className="text-slate-300 text-lg leading-relaxed">
                                    971 US Highway 202 N<br/>
                                    Branchburg, New Jersey 08876
                                </p>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-accent uppercase tracking-widest mb-2">Phone</h3>
                                <a href="tel:+17794316626" className="text-slate-300 text-lg hover:text-accent transition-colors">
                                    +1 (779) 431-6626
                                </a>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-accent uppercase tracking-widest mb-2">Email</h3>
                                <a href="mailto:hr@multipathsolution.com" className="text-slate-300 text-lg hover:text-accent transition-colors">
                                    hr@multipathsolution.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:w-1/2 bg-black/20 p-12 md:p-20 border-l border-white/5">
                    <form className="space-y-8" onSubmit={handleSubmit}>
                        <div>
                            <input required name="name" value={formData.name} onChange={handleChange} type="text" className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-white text-lg placeholder-slate-500 focus:outline-none focus:border-accent transition-colors" placeholder="Full Name" />
                        </div>
                        <div>
                            <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-white text-lg placeholder-slate-500 focus:outline-none focus:border-accent transition-colors" placeholder="Work Email" />
                        </div>
                        <div>
                            <input name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-white text-lg placeholder-slate-500 focus:outline-none focus:border-accent transition-colors" placeholder="Phone Number" />
                        </div>
                        <div>
                            <textarea required name="message" value={formData.message} onChange={handleChange} rows={4} className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-white text-lg placeholder-slate-500 focus:outline-none focus:border-accent transition-colors resize-none" placeholder="How can we help with your infrastructure?"></textarea>
                        </div>
                        
                        {status.message && (
                          <div className={`p-4 rounded-xl text-sm font-bold ${status.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                            {status.message}
                          </div>
                        )}

                        <button disabled={isSubmitting} type="submit" className="w-full py-5 rounded-full bg-accent text-primary font-bold text-lg hover:bg-white transition-all shadow-[0_0_20px_rgba(102,252,241,0.3)] disabled:opacity-70 disabled:cursor-not-allowed">
                            {isSubmitting ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
