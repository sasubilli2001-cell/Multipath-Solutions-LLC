"use client";

import { motion } from "framer-motion";
import { Cpu, ShieldCheck, Server, LineChart, Network, HeadphonesIcon, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Enterprise Networking & SD-WAN",
    slug: "enterprise-networking",
    description: "Design, implementation, and optimization of robust enterprise networks. Specializing in SD-WAN deployments, BGP routing, and high-availability infrastructure to ensure zero downtime.",
    icon: <Network className="w-10 h-10 text-accent" />,
    color: "from-accent/20 to-transparent"
  },
  {
    title: "Cloud Infrastructure",
    slug: "cloud-infrastructure",
    description: "Architect scalable, cloud-native environments across AWS, Azure, and Google Cloud. We handle complex migrations and optimize for performance and cost-efficiency.",
    icon: <Server className="w-10 h-10 text-purple-400" />,
    color: "from-purple-500/20 to-transparent"
  },
  {
    title: "Zero-Trust Cybersecurity",
    slug: "cybersecurity",
    description: "Protect your critical assets with our comprehensive, zero-trust security frameworks, identity access management (IAM), and continuous threat monitoring.",
    icon: <ShieldCheck className="w-10 h-10 text-rose-400" />,
    color: "from-rose-500/20 to-transparent"
  },
  {
    title: "Data & AI Integration",
    slug: "data-ai",
    description: "Harness the power of machine learning and big data pipelines to uncover hidden trends, automate operations, and drive data-backed decisions.",
    icon: <LineChart className="w-10 h-10 text-amber-400" />,
    color: "from-amber-500/20 to-transparent"
  },
  {
    title: "Digital Transformation",
    slug: "digital-transformation",
    description: "Modernize legacy systems, embrace agile methodologies, and develop bespoke software solutions tailored to your unique business logic.",
    icon: <Cpu className="w-10 h-10 text-blue-400" />,
    color: "from-blue-500/20 to-transparent"
  },
  {
    title: "Managed IT Services",
    slug: "managed-it",
    description: "24/7 proactive support, infrastructure maintenance, and disaster recovery planning ensuring your operations run smoothly without interruption.",
    icon: <HeadphonesIcon className="w-10 h-10 text-emerald-400" />,
    color: "from-emerald-500/20 to-transparent"
  }
];

export default function Services() {
  return (
    <section className="py-32 bg-primary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-8">
          
          {/* Sticky Left Column */}
          <div className="lg:w-1/3 lg:sticky lg:top-32 lg:h-fit">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight"
            >
              Core <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400">
                Capabilities
              </span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-slate-400 mb-10 leading-relaxed"
            >
              From complex network topologies to cloud-native architectures, we deliver engineered solutions that serve as the backbone for modern enterprises.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link href="/services" className="inline-flex items-center text-white font-bold uppercase tracking-widest text-sm hover:text-accent transition-colors group">
                View All Services
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Scrolling Right Column */}
          <div className="lg:w-2/3 flex flex-col space-y-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10 hover:bg-white/10 transition-all duration-500 overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl -z-10`}></div>
                
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="w-16 h-16 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center shrink-0">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-accent transition-colors">{service.title}</h3>
                    <p className="text-slate-400 leading-relaxed text-lg mb-6">{service.description}</p>
                    <Link href={`/services/${service.slug}`} className="inline-flex items-center text-sm font-semibold text-accent/80 hover:text-accent transition-colors">
                      Explore Technical Details
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
