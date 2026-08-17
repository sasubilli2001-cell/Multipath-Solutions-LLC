import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Privacy() {
  return (
    <div className="flex flex-col min-h-screen bg-primary">
      <Navbar />
      <main className="flex-grow pt-40 pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter">
                Privacy Policy
            </h1>
            <div className="prose prose-invert max-w-none text-slate-300 space-y-6">
                <p>Last updated: August 2026</p>
                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
                    <p>We collect information you provide directly to us, such as when you fill out a contact form, request a quote, or communicate with us. This may include your name, email address, phone number, company name, and any other information you choose to provide.</p>
                </section>
                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
                    <p>We use the information we collect to provide, maintain, and improve our services, to process transactions, to communicate with you, and to personalize your experience. We do not sell your personal data to third parties.</p>
                </section>
                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">3. Data Security</h2>
                    <p>We implement appropriate technical and organizational security measures designed to protect your personal information against accidental or unlawful destruction, loss, alteration, unauthorized disclosure, or access.</p>
                </section>
                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">4. Your Rights</h2>
                    <p>Depending on your location, you may have the right to access, correct, delete, or restrict the processing of your personal data. Please contact us at privacy@multipathsolutions.com to exercise these rights.</p>
                </section>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
