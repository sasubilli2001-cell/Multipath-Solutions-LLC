import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Technology() {
  const stacks = [
    { 
        name: "Enterprise Networking", 
        description: "SD-WAN, Cisco, Juniper, Fortinet, BGP/OSPF, Network Automation, Zero-Trust Architecture",
        color: "bg-blue-500/10 border-blue-500/30 text-blue-400"
    },
    { 
        name: "Frontend Ecosystem", 
        description: "React, Next.js, Vue, Tailwind CSS, WebGL, Framer Motion",
        color: "bg-accent/10 border-accent/30 text-accent"
    },
    { 
        name: "Backend Architecture", 
        description: "Node.js, Python, Go, Java, .NET Core, Microservices, gRPC",
        color: "bg-purple-500/10 border-purple-500/30 text-purple-400"
    },
    { 
        name: "Cloud & DevOps", 
        description: "AWS, Azure, GCP, Docker, Kubernetes, Terraform, CI/CD pipelines",
        color: "bg-rose-500/10 border-rose-500/30 text-rose-400"
    },
    { 
        name: "Data & AI", 
        description: "TensorFlow, PyTorch, Snowflake, Databricks, PostgreSQL, Apache Kafka",
        color: "bg-amber-500/10 border-amber-500/30 text-amber-400"
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-primary">
      <Navbar />
      <main className="flex-grow pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
                Our Tech <br/><span className="text-slate-500">Arsenal</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-md">
                We leverage modern, battle-tested technologies to deliver performant and scalable software and networks.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {stacks.map((stack, i) => (
                <div key={i} className={`p-8 rounded-3xl border ${stack.color.split(' ')[1]} ${stack.color.split(' ')[0]} transition-transform hover:-translate-y-2`}>
                    <h3 className={`text-2xl font-bold mb-4 ${stack.color.split(' ')[2]}`}>{stack.name}</h3>
                    <p className="text-slate-300 text-lg leading-relaxed">{stack.description}</p>
                </div>
            ))}
        </div>

        <div className="w-full bg-white/5 border border-white/10 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-3xl bg-accent/10 blur-[100px] z-0 pointer-events-none"></div>
            <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Security-First Engineering</h2>
                <p className="text-slate-400 max-w-3xl mx-auto text-xl leading-relaxed">
                    Across all our stacks and network topologies, we implement a Zero-Trust architecture. From static code analysis in our CI/CD pipelines to end-to-end encryption and SD-WAN tunneling, your data's integrity is our highest priority.
                </p>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
