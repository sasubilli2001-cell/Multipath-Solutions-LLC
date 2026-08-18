"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Clock, Wifi, Shield, Cloud, Code2, BarChart3, Layers, X, LogIn, Info } from "lucide-react";
import { getActiveJobs, addApplication, JobPosting, getApplicationByEmailAndJobId } from "@/lib/db";
import { auth, googleProvider, storage } from "@/lib/firebase";
import { signInWithPopup, onAuthStateChanged, User, signOut } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const fadeUp: any = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: "easeOut" },
  }),
};

// Map departments to icons dynamically
const getIconForDepartment = (dept: string) => {
  const d = dept.toLowerCase();
  if (d.includes("engineer") || d.includes("dev")) return <Code2 className="w-5 h-5" />;
  if (d.includes("sec")) return <Shield className="w-5 h-5" />;
  if (d.includes("infra") || d.includes("sys") || d.includes("cloud")) return <Layers className="w-5 h-5" />;
  if (d.includes("data") || d.includes("analytic")) return <BarChart3 className="w-5 h-5" />;
  return <Cloud className="w-5 h-5" />;
};

export default function Careers() {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);

  // Application form state
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "", resumeUrl: "", coverLetter: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [existingStatus, setExistingStatus] = useState<string | null>(null);
  const [checkingStatus, setCheckingStatus] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    async function checkExistingApplication() {
      if (currentUser && currentUser.email && selectedJob?.id) {
        setCheckingStatus(true);
        try {
          const app = await getApplicationByEmailAndJobId(currentUser.email, selectedJob.id);
          if (app) {
            setExistingStatus(app.status);
          } else {
            setExistingStatus(null);
          }
        } catch (error) {
          console.error("Error checking application status", error);
        } finally {
          setCheckingStatus(false);
        }
      } else {
        setExistingStatus(null);
      }

      if (currentUser) {
        // Pre-fill form if logged in. We force the Google email to avoid browser autofill overwriting it.
        const names = currentUser.displayName?.split(" ") || ["", ""];
        setFormData(prev => ({
          ...prev,
          firstName: prev.firstName || names[0] || "",
          lastName: prev.lastName || names.slice(1).join(" ") || "",
          email: currentUser.email || prev.email || ""
        }));
      }
    }
    
    checkExistingApplication();
  }, [currentUser, selectedJob]);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const fetchedJobs = await getActiveJobs();
        setJobs(fetchedJobs);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  // Group jobs by department
  const groupedJobs = jobs.reduce((acc, job) => {
    if (!acc[job.department]) acc[job.department] = [];
    acc[job.department].push(job);
    return acc;
  }, {} as Record<string, JobPosting[]>);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    setSubmitting(true);
    try {
      let finalResumeUrl = formData.resumeUrl;

      // Upload file if selected
      if (resumeFile) {
        const fileRef = ref(storage, `resumes/${Date.now()}_${resumeFile.name}`);
        await uploadBytes(fileRef, resumeFile);
        finalResumeUrl = await getDownloadURL(fileRef);
      }

      await addApplication({
        jobId: selectedJob.id!,
        jobTitle: selectedJob.title,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        resumeUrl: finalResumeUrl,
        coverLetter: formData.coverLetter,
        status: "new",
      });
      setSubmitSuccess(true);
      setTimeout(() => {
        setSelectedJob(null);
        setSubmitSuccess(false);
        setFormData({ firstName: "", lastName: "", email: "", phone: "", resumeUrl: "", coverLetter: "" });
        setResumeFile(null);
        signOut(auth); // Automatically sign out after application
      }, 3000);
    } catch (error) {
      console.error("Application failed:", error);
      alert("Failed to submit application. Please verify your Firebase Storage Rules allow uploads.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      console.error("Google sign in failed:", error);
      alert("Google Sign-In Error: " + (error.message || "Unknown error. Please ensure popups are allowed and Google Auth is enabled in Firebase."));
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-primary">
      <Navbar />
      <main className="flex-grow">

        {/* Hero */}
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

        {/* Open Positions */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-16"
          >
            Open <span className="text-accent">Positions</span>
          </motion.h2>

          {loading ? (
            <div className="text-center text-slate-400 py-12 animate-pulse">Loading positions...</div>
          ) : Object.keys(groupedJobs).length === 0 ? (
            <div className="text-slate-400 py-12 border border-white/10 rounded-2xl bg-white/[0.03] text-center">
              There are currently no open positions. Please check back later.
            </div>
          ) : (
            <div className="space-y-14">
              {Object.entries(groupedJobs).map(([department, departmentJobs], gi) => (
                <motion.div key={department} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} custom={gi}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                      {getIconForDepartment(department)}
                    </div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">{department}</h3>
                    <div className="flex-1 h-px bg-white/10 ml-2" />
                  </div>

                  <div className="space-y-3">
                    {departmentJobs.map((job, ji) => (
                      <motion.div key={job.id} variants={fadeUp} custom={ji}
                        className="group flex flex-col md:flex-row justify-between items-start md:items-center gap-6 p-7 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] hover:border-accent/40 transition-all duration-300"
                      >
                        <div className="flex-1 w-full max-w-3xl">
                          <h4 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
                            {job.title}
                          </h4>
                          <p className="text-slate-400 text-sm mb-4 leading-relaxed line-clamp-2">{job.description}</p>
                          <div className="flex flex-wrap gap-2">
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 uppercase tracking-wider bg-white/10 px-3 py-1.5 rounded-full">
                              <Clock className="w-3 h-3" /> {job.type}
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 uppercase tracking-wider bg-white/10 px-3 py-1.5 rounded-full">
                              <MapPin className="w-3 h-3" /> {job.location}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => setSelectedJob(job)}
                          className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-sm font-bold text-white hover:bg-accent hover:text-primary hover:border-accent transition-all duration-300 group-hover:border-accent/60 mt-4 md:mt-0"
                        >
                          View & Apply
                          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>

      </main>
      <Footer />

      {/* Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0b1121] border border-white/20 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col relative overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-white/10 bg-white/[0.02] flex justify-between items-center shrink-0">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">{selectedJob.title}</h3>
                <p className="text-slate-400 text-sm flex items-center gap-3">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5"/> {selectedJob.location}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5"/> {selectedJob.type}</span>
                </p>
              </div>
              <button onClick={() => setSelectedJob(null)} className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors self-start">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-1 p-6 flex flex-col lg:flex-row gap-8 custom-scrollbar">
              
              {/* Job Details Section */}
              <div className="flex-1 space-y-6">
                {submitSuccess ? (
                  <div className="bg-green-500/10 border border-green-500/20 p-8 rounded-2xl text-center h-full flex flex-col justify-center">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-green-400" />
                    </div>
                    <h4 className="text-green-400 font-bold text-2xl mb-2">Application Submitted!</h4>
                    <p className="text-green-200/70 text-sm">Thank you for applying. Our team will review your application and get back to you shortly.</p>
                  </div>
                ) : (
                  <>
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-3 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent"></div> About the Role
                      </h4>
                      <div className="text-slate-300 text-sm leading-relaxed space-y-3">
                        {selectedJob.description.split('\n').map((para, i) => {
                          if (!para.trim()) return null;
                          // Catch common bullet points from MS Word pastes (including invisible/weird chars like )
                          const isBullet = /^[•\-\*□]/.test(para.trim()) || para.trim().charCodeAt(0) === 61623 || para.trim().startsWith('') || para.trim().startsWith('');
                          if (isBullet) {
                            return (
                              <div key={i} className="flex items-start gap-3 pl-2">
                                <span className="text-accent mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0"></span>
                                <span>{para.replace(/^[•\-\*□\s]+/, '').trim()}</span>
                              </div>
                            );
                          }
                          return <p key={i}>{para}</p>;
                        })}
                      </div>
                    </div>

                    {selectedJob.requirements && selectedJob.requirements.length > 0 && (
                      <div className="mt-6">
                        <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent"></div> Requirements
                        </h4>
                        <ul className="space-y-3">
                          {selectedJob.requirements.map((req, idx) => {
                            if (!req.trim()) return null;
                            return (
                              <li key={idx} className="text-slate-300 text-sm flex items-start gap-3 pl-2">
                                <span className="text-accent mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0"></span>
                                <span className="leading-relaxed">{req.replace(/^[•\-\*□\s]+/, '').trim()}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Application Form Section (Hidden if success) */}
              {!submitSuccess && (
                <div className="lg:w-[400px] shrink-0 bg-white/[0.02] border border-white/5 rounded-2xl p-6 h-fit">
                  {checkingStatus ? (
                    <div className="text-center py-12 text-slate-400 animate-pulse">Checking status...</div>
                  ) : !currentUser ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <LogIn className="w-8 h-8 text-accent" />
                      </div>
                      <h4 className="text-lg font-bold text-white mb-2">Authentication Required</h4>
                      <p className="text-slate-400 text-sm mb-6">Please sign in with Google to submit an application for this role.</p>
                      <button 
                        onClick={handleGoogleSignIn}
                        className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-bold text-[#070b14] bg-white hover:bg-slate-200 transition-colors"
                      >
                        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        Sign in with Google
                      </button>
                    </div>
                  ) : existingStatus ? (
                    <div className="text-center py-8">
                      <div className="flex items-center justify-end mb-4">
                        <button onClick={() => signOut(auth)} className="text-xs text-slate-400 hover:text-white underline">Sign out</button>
                      </div>
                      <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
                        <Info className="w-8 h-8 text-blue-400" />
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2">Already Applied</h4>
                      <p className="text-slate-400 text-sm mb-6">You have already submitted an application for this position.</p>
                      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Current Status</span>
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                          existingStatus === 'hired' ? 'bg-green-500/20 text-green-400' :
                          existingStatus === 'rejected' ? 'bg-red-500/20 text-red-400' :
                          existingStatus === 'reviewed' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-amber-500/20 text-amber-400'
                        }`}>
                          {existingStatus}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-bold text-white">Submit Application</h4>
                        <button onClick={() => signOut(auth)} className="text-xs text-slate-400 hover:text-white underline">Sign out</button>
                      </div>
                      <form onSubmit={handleApply} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">First Name</label>
                            <input required type="text" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-accent focus:bg-white/10 transition-colors" />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Last Name</label>
                            <input required type="text" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-accent focus:bg-white/10 transition-colors" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Email Address</label>
                          <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-accent focus:bg-white/10 transition-colors" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Phone Number</label>
                          <input required type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-accent focus:bg-white/10 transition-colors" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Resume Document (PDF, Word, ZIP)</label>
                          <input type="file" required accept=".pdf,.doc,.docx,.zip" onChange={(e) => setResumeFile(e.target.files?.[0] || null)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-slate-300 text-sm focus:outline-none focus:border-accent focus:bg-white/10 transition-colors file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-accent file:text-primary hover:file:bg-white cursor-pointer" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Cover Letter (Optional)</label>
                          <textarea rows={3} value={formData.coverLetter} onChange={(e) => setFormData({...formData, coverLetter: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-accent focus:bg-white/10 transition-colors"></textarea>
                        </div>
                        <div className="pt-2">
                          <button disabled={submitting} type="submit" className="w-full bg-accent text-primary font-bold py-3 rounded-xl hover:bg-white transition-all shadow-[0_0_15px_rgba(102,252,241,0.2)] disabled:opacity-50">
                            {submitting ? "Submitting..." : "Submit Application"}
                          </button>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
