"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Clock, Wifi, Shield, Cloud, Code2, BarChart3, Layers } from "lucide-react";

const jobs = [
  {
    category: "Engineering",
    icon: <Code2 className="w-5 h-5" />,
    openings: [
      {
        title: "Senior Network Architect",
        type: "Full-Time",
        location: "Austin, TX (Hybrid)",
        description: "Design and implement enterprise-grade multi-path network architectures for Fortune 500 clients.",
      },
      {
        title: "Frontend Engineer (React / Next.js)",
        type: "Full-Time",
        location: "Remote",
        description: "Build performant, accessible user interfaces for our internal platforms and client-facing dashboards.",
      },
      {
        title: "Cloud Systems Engineer",
        type: "Full-Time",
        location: "Remote",
        description: "Architect and maintain scalable cloud infrastructure on AWS, Azure, and GCP hybrid environments.",
      },
    ],
  },
  {
    category: "Security",
    icon: <Shield className="w-5 h-5" />,
    openings: [
      {
        title: "Cybersecurity Analyst",
        type: "Full-Time",
        location: "Austin, TX",
        description: "Monitor, detect, and respond to security threats across enterprise network environments.",
      },
      {
        title: "Penetration Tester",
        type: "Contract",
        location: "Remote",
        description: "Conduct ethical hacking engagements and produce comprehensive vulnerability assessment reports.",
      },
    ],
  },
  {
    category: "Infrastructure",
    icon: <Layers className="w-5 h-5" />,
    openings: [
      {
        title: "DevOps Engineer",
        type: "Full-Time",
        location: "Remote",
        description: "Streamline CI/CD pipelines and automate infrastructure provisioning across multi-cloud environments.",
      },
      {
        title: "Systems Administrator",
        type: "Full-Time",
        location: "Branchburg, NJ",
        description: "Manage and support on-premise and hybrid server environments for enterprise clients.",
      },
    ],
  },
  {
    category: "Data & Analytics",
    icon: <BarChart3 className="w-5 h-5" />,
    openings: [
      {
        title: "Data Engineer",
        type: "Full-Time",
        location: "Remote",
        description: "Build robust data pipelines and warehousing solutions to drive actionable business intelligence.",
      },
    ],
  },
];



const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: "easeOut" },
  }),
};

export default function Careers() {
  return (
    <div className="flex flex-col min-h-screen bg-primary">
      <Navbar />
      <main className="flex-grow">

        {/* ── Hero ───────────────────────────────────────────── */}
        <section className="relative pt-44 pb-28 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-[15%] left-[5%] w-[45vw] h-[45vw] max-w-2xl bg-accent/15 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: "5s" }} />
            <div className="absolute bottom-0 right-[5%] w-[35vw] h-[35vw] max-w-xl bg-purple-600/15 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: "7s", animationDelay: "2s" }} />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
              className="mb-6 inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
              <span className="text-xs font-bold tracking-widest text-slate-300 uppercase">We&apos;re Hiring</span>
            </motion.div>

            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
              <motion.h1 initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1 }}
                className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[1.05]"
              >
                Build What<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-accent to-purple-400">
                  Matters Most
                </span>
              </motion.h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}
                className="max-w-md text-xl text-slate-400 font-light lg:text-right"
              >
                Join a team of passionate engineers shaping the future of enterprise networking, cloud, and cybersecurity infrastructure.
              </motion.p>
            </div>

          </div>
        </section>

        {/* ── Open Positions ─────────────────────────────────── */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-16"
          >
            Open <span className="text-accent">Positions</span>
          </motion.h2>

          <div className="space-y-14">
            {jobs.map((group, gi) => (
              <motion.div key={gi} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} custom={gi}>
                {/* Category header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                    {group.icon}
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">{group.category}</h3>
                  <div className="flex-1 h-px bg-white/10 ml-2" />
                </div>

                {/* Job cards */}
                <div className="space-y-3">
                  {group.openings.map((job, ji) => (
                    <motion.div key={ji} variants={fadeUp} custom={ji}
                      className="group flex flex-col md:flex-row justify-between items-start md:items-center gap-6 p-7 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] hover:border-accent/40 transition-all duration-300"
                    >
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
                          {job.title}
                        </h4>
                        <p className="text-slate-400 text-sm mb-4 leading-relaxed max-w-xl">{job.description}</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 uppercase tracking-wider bg-white/10 px-3 py-1.5 rounded-full">
                            <Clock className="w-3 h-3" /> {job.type}
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 uppercase tracking-wider bg-white/10 px-3 py-1.5 rounded-full">
                            <MapPin className="w-3 h-3" /> {job.location}
                          </span>
                        </div>
                      </div>

                      <Link
                        href="/contact"
                        className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-sm font-bold text-white hover:bg-accent hover:text-primary hover:border-accent transition-all duration-300 group-hover:border-accent/60"
                      >
                        Apply Now
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>



        {/* ── Culture Section ────────────────────────────────── */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/[0.03] p-12 md:p-20">
            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1">
                <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                  className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-6"
                >
                  Our Culture &amp;<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400">Core Values</span>
                </motion.h2>
                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-slate-400 text-lg leading-relaxed mb-8 max-w-lg"
                >
                  We're a tight-knit team that values ownership, transparency, and continuous learning. Everyone ships, everyone leads, and everyone grows.
                </motion.p>
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-primary font-bold text-sm hover:bg-white transition-all shadow-[0_0_24px_rgba(102,252,241,0.25)]"
                >
                  Start a Conversation
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="flex-1 grid grid-cols-2 gap-4 w-full">
                {[
                  { icon: <Wifi className="w-6 h-6" />, title: "Remote DNA", desc: "Async-first with a culture of deep focus and autonomy." },
                  { icon: <Shield className="w-6 h-6" />, title: "Integrity First", desc: "We say what we mean and deliver on our commitments." },
                  { icon: <Cloud className="w-6 h-6" />, title: "Always Learning", desc: "Continuous improvement is baked into our DNA." },
                  { icon: <BarChart3 className="w-6 h-6" />, title: "Impact-Driven", desc: "Every engineer sees the real-world result of their work." },
                ].map((v, i) => (
                  <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                    className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-accent/30 transition-all"
                  >
                    <div className="text-accent mb-3">{v.icon}</div>
                    <h4 className="text-white font-bold mb-1">{v.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA Banner ─────────────────────────────────────── */}
        <section className="py-20 border-t border-white/10">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto px-4 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
              Don&apos;t see your role?
            </h2>
            <p className="text-slate-400 text-xl font-light mb-10">
              We&apos;re always open to exceptional talent. Send us your resume and let&apos;s talk.
            </p>
            <Link href="/contact"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-primary font-bold text-lg hover:bg-accent transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)]"
            >
              Get in Touch
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
