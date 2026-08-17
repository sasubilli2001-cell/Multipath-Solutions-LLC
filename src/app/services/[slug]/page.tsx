import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";

// We could export this from a shared data file, but redefining here for simplicity in this example
const servicesData = {
  "enterprise-networking": {
    title: "Enterprise Networking & SD-WAN",
    subtitle: "Robust, scalable, and highly available network architectures.",
    description: "Our enterprise networking solutions are built to support the demanding workloads of modern businesses. We design and implement Software-Defined Wide Area Networks (SD-WAN) that optimize traffic, reduce costs, and provide centralized management across all your locations.",
    features: [
      "BGP and advanced routing protocols",
      "High-availability and failover architectures",
      "Centralized network orchestration",
      "Traffic shaping and QoS optimization",
    ],
  },
  "cloud-infrastructure": {
    title: "Cloud Infrastructure",
    subtitle: "Scalable and resilient cloud-native environments.",
    description: "We help you transition to the cloud or optimize your existing cloud footprint. Our experts architect solutions across AWS, Azure, and Google Cloud, ensuring your infrastructure is highly available, secure, and cost-efficient.",
    features: [
      "Multi-cloud and hybrid deployments",
      "Infrastructure as Code (IaC) with Terraform",
      "Containerization and Kubernetes orchestration",
      "Automated scaling and load balancing",
    ],
  },
  "cybersecurity": {
    title: "Zero-Trust Cybersecurity",
    subtitle: "Comprehensive protection for your critical assets.",
    description: "Security is no longer a perimeter defense. We implement zero-trust frameworks that verify every user, device, and application. From Identity and Access Management (IAM) to continuous threat monitoring, we keep your enterprise safe.",
    features: [
      "Zero-Trust Network Access (ZTNA)",
      "Identity and Access Management (IAM)",
      "Endpoint detection and response (EDR)",
      "24/7 Security Operations Center (SOC) integration",
    ],
  },
  "data-ai": {
    title: "Data & AI Integration",
    subtitle: "Turn data into actionable intelligence.",
    description: "Unlock the value of your data with advanced analytics and machine learning. We build robust data pipelines, data warehouses, and integrate AI models that automate workflows and provide predictive insights.",
    features: [
      "Scalable data pipelines and ETL processes",
      "Machine learning model deployment",
      "Real-time analytics dashboards",
      "Predictive modeling and forecasting",
    ],
  },
  "digital-transformation": {
    title: "Digital Transformation",
    subtitle: "Modernize your business logic and applications.",
    description: "Embrace the digital age by modernizing legacy systems and adopting agile methodologies. We develop custom software solutions and automate processes to increase efficiency and accelerate your time to market.",
    features: [
      "Legacy system modernization",
      "Custom software development",
      "API integration and microservices",
      "Agile process consulting",
    ],
  },
  "managed-it": {
    title: "Managed IT Services",
    subtitle: "Proactive support and operational excellence.",
    description: "Focus on your core business while we handle the IT. Our managed services provide 24/7 proactive monitoring, regular maintenance, and rapid incident response to ensure maximum uptime.",
    features: [
      "24/7 proactive monitoring and support",
      "Routine maintenance and patching",
      "Disaster recovery and business continuity",
      "Dedicated account management",
    ],
  },
};

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = servicesData[slug as keyof typeof servicesData];

  if (!service) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-primary">
      <Navbar />
      <main className="flex-grow pt-40 pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link href="/services" className="inline-flex items-center text-slate-400 hover:text-accent transition-colors mb-12">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Link>

          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">
            {service.title}
          </h1>
          <p className="text-xl text-accent font-medium mb-12">
            {service.subtitle}
          </p>

          <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 md:p-12 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Overview</h2>
            <p className="text-lg text-slate-300 leading-relaxed">
              {service.description}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-8">Key Capabilities</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {service.features.map((feature, idx) => (
                <div key={idx} className="flex items-start bg-black/20 p-6 rounded-2xl border border-white/5">
                  <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mr-4" />
                  <span className="text-slate-300 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 text-center bg-accent/10 border border-accent/20 rounded-[2rem] p-12">
            <h3 className="text-3xl font-bold text-white mb-4">Ready to get started?</h3>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">
              Contact our engineering team to discuss how we can tailor this solution for your enterprise.
            </p>
            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-accent text-primary font-bold text-lg hover:bg-white transition-colors">
              Schedule a Consultation
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
