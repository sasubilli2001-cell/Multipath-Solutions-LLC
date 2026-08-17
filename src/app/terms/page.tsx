import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Terms() {
  return (
    <div className="flex flex-col min-h-screen bg-primary">
      <Navbar />
      <main className="flex-grow pt-40 pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter">
                Terms of Service
            </h1>
            <div className="prose prose-invert max-w-none text-slate-300 space-y-6">
                <p>Last updated: August 2026</p>
                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
                    <p>By accessing or using the services provided by Multipath Solutions LLC, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our services.</p>
                </section>
                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">2. Services</h2>
                    <p>Multipath Solutions LLC provides enterprise IT consulting, custom software development, cloud architecture, and networking solutions. The specific scope of services will be detailed in individual Statements of Work (SOW) or service agreements.</p>
                </section>
                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">3. Intellectual Property</h2>
                    <p>Unless otherwise stated in a specific agreement, the intellectual property rights for all original code, architectures, and systems developed by Multipath Solutions LLC remain with us until full payment is received, at which point rights are transferred as specified in the applicable contract.</p>
                </section>
                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">4. Limitation of Liability</h2>
                    <p>In no event shall Multipath Solutions LLC be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the services.</p>
                </section>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
