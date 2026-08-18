"use client";

import { useState, useEffect, useMemo } from "react";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import { getActiveJobs, getAllApplications, JobPosting, JobApplication, addJob, deleteJob, updateApplicationStatus, deleteApplication } from "@/lib/db";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { LogOut, Plus, Trash2, Briefcase, Users, X, LayoutDashboard, Activity, CheckCircle, Clock, AlertCircle, Download, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "jobs" | "applications">("overview");
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // New Job Form State
  const [showNewJobModal, setShowNewJobModal] = useState(false);
  const [newJob, setNewJob] = useState({
    title: "", department: "", location: "", type: "", description: "", requirements: ""
  });

  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const fetchedJobs = await getActiveJobs();
      const fetchedApps = await getAllApplications();
      setJobs(fetchedJobs);
      setApplications(fetchedApps);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addJob({
        ...newJob,
        requirements: newJob.requirements.split('\n').filter(r => r.trim() !== ""),
        isActive: true,
      });
      setShowNewJobModal(false);
      setNewJob({ title: "", department: "", location: "", type: "", description: "", requirements: "" });
      fetchData();
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    if (confirm("Are you sure you want to delete this job posting?")) {
      try {
        await deleteJob(jobId);
        fetchData();
      } catch (error) {
        console.error("Error deleting job:", error);
      }
    }
  };

  const handleUpdateAppStatus = async (appId: string, status: JobApplication["status"]) => {
    try {
      await updateApplicationStatus(appId, status);
      fetchData();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDeleteApplication = async (app: JobApplication) => {
    if (confirm("Are you sure you want to delete this application? This action cannot be undone.")) {
      try {
        await deleteApplication(app.id!);
        
        // Automatically open email client to notify the candidate
        const subject = encodeURIComponent(`Update regarding your application for ${app.jobTitle} at Multipath Solutions LLC`);
        const body = encodeURIComponent(`Hi ${app.firstName},\n\nWe are reaching out to request that you submit a fresh application for the ${app.jobTitle} position.\n\nPlease visit our careers page and apply again so we can process your application.\n\nThank you,\nMultipath Solutions LLC Team`);
        window.location.href = `mailto:${app.email}?subject=${subject}&body=${body}`;

        fetchData();
      } catch (error) {
        console.error("Error deleting application:", error);
      }
    }
  };

  const downloadCSV = () => {
    if (applications.length === 0) return;
    
    const headers = ["First Name", "Last Name", "Email", "Phone", "Job Title", "Status", "Resume URL"];
    const rows = applications.map(app => [
      `"${app.firstName.replace(/"/g, '""')}"`,
      `"${app.lastName.replace(/"/g, '""')}"`,
      `"${app.email}"`,
      `"${app.phone}"`,
      `"${app.jobTitle.replace(/"/g, '""')}"`,
      `"${app.status}"`,
      `"${app.resumeUrl || ''}"`
    ]);

    const csvContent = [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `applications_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calculate Metrics
  const metrics = useMemo(() => {
    const newApps = applications.filter(a => a.status === "new").length;
    const reviewedApps = applications.filter(a => a.status === "reviewed").length;
    const hiredApps = applications.filter(a => a.status === "hired").length;
    return {
      totalJobs: jobs.length,
      totalApps: applications.length,
      newApps,
      reviewedApps,
      hiredApps
    };
  }, [jobs, applications]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex overflow-hidden">
        
        {/* Sidebar */}
        <aside className="w-72 bg-white border-r border-slate-200 flex flex-col hidden md:flex shadow-sm z-20">
          <div className="h-20 flex items-center px-6 border-b border-slate-200">
            <div className="w-10 h-10 mr-3 shrink-0 flex items-center justify-center">
              <img src="/logo.png" alt="Logo" className="max-h-full max-w-full object-contain" />
            </div>
            <h1 className="text-sm font-bold tracking-tight text-slate-900 leading-tight flex flex-col justify-center">
              <span>Multipath Solutions LLC</span>
              <span className="text-blue-600 text-xs font-semibold">Admin Panel</span>
            </h1>
          </div>

          <div className="flex-1 py-6 px-4 space-y-1.5">
            {[
              { id: "overview", icon: Activity, label: "Overview" },
              { id: "jobs", icon: Briefcase, label: "Job Postings", badge: jobs.length },
              { id: "applications", icon: Users, label: "Applications", badge: metrics.newApps > 0 ? metrics.newApps : undefined, badgeColor: "bg-red-500 text-white" }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  activeTab === item.id 
                    ? "bg-blue-50 text-blue-700 shadow-[inset_4px_0_0_#2563eb]" 
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center">
                  <item.icon className="h-5 w-5 mr-3 opacity-80" />
                  {item.label}
                </div>
                {item.badge !== undefined && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${item.badgeColor || "bg-slate-200 text-slate-700"}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="p-4 border-t border-slate-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center px-4 py-3 rounded-xl text-sm font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 transition-all"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 relative z-10 flex flex-col h-screen overflow-hidden">
          {/* Mobile Header */}
          <div className="md:hidden h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6 shadow-sm z-30 relative">
            <div className="flex items-center">
              <div className="w-8 h-8 mr-2 shrink-0 flex items-center justify-center">
                <img src="/logo.png" alt="Logo" className="max-h-full max-w-full object-contain" />
              </div>
              <h1 className="text-sm font-bold text-slate-900 leading-tight flex flex-col justify-center">
                <span>Multipath Solutions LLC</span>
                <span className="text-blue-600 text-xs font-semibold">Admin Panel</span>
              </h1>
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="p-2 text-slate-600 hover:text-blue-600 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-slate-200 shadow-xl z-20"
              >
                <div className="p-4 space-y-2">
                  {[
                    { id: "overview", icon: Activity, label: "Overview" },
                    { id: "jobs", icon: Briefcase, label: "Job Postings", badge: jobs.length },
                    { id: "applications", icon: Users, label: "Applications", badge: metrics.newApps > 0 ? metrics.newApps : undefined, badgeColor: "bg-red-500 text-white" }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => { setActiveTab(item.id as any); setIsMobileMenuOpen(false); }}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                        activeTab === item.id 
                          ? "bg-blue-50 text-blue-700" 
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <div className="flex items-center">
                        <item.icon className="h-5 w-5 mr-3 opacity-80" />
                        {item.label}
                      </div>
                      {item.badge !== undefined && (
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${item.badgeColor || "bg-slate-200 text-slate-700"}`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  ))}
                  <div className="pt-2 mt-2 border-t border-slate-100">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-3 rounded-xl text-sm font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 transition-all"
                    >
                      <LogOut className="h-5 w-5 mr-3 opacity-80" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6 lg:p-10 custom-scrollbar">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="max-w-6xl mx-auto space-y-8"
              >
                
                {/* ---------------- OVERVIEW TAB ---------------- */}
                {activeTab === "overview" && (
                  <>
                    <header className="mb-8">
                      <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-1">Overview</h2>
                      <p className="text-slate-500">A quick snapshot of your recruiting pipeline.</p>
                    </header>

                    {/* Metric Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                      {[
                        { title: "Active Jobs", value: metrics.totalJobs, icon: Briefcase, color: "text-blue-600", bg: "bg-blue-100" },
                        { title: "Total Applications", value: metrics.totalApps, icon: Users, color: "text-indigo-600", bg: "bg-indigo-100" },
                        { title: "Candidates Reviewed", value: metrics.reviewedApps, icon: Activity, color: "text-amber-600", bg: "bg-amber-100" },
                        { title: "Candidates Hired", value: metrics.hiredApps, icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-100" },
                      ].map((m, i) => (
                        <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">{m.title}</p>
                              <h3 className="text-4xl font-black text-slate-900">{m.value}</h3>
                            </div>
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${m.bg}`}>
                              <m.icon className={`w-6 h-6 ${m.color}`} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Recent Activity */}
                    <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
                      <h3 className="text-xl font-bold text-slate-900 mb-6">Recent Applications</h3>
                      <div className="space-y-3">
                        {applications.slice(0, 5).map(app => (
                          <div key={app.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-colors">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold border border-slate-200">
                                {app.firstName[0]}{app.lastName[0]}
                              </div>
                              <div>
                                <p className="text-slate-900 font-bold">{app.firstName} {app.lastName}</p>
                                <p className="text-slate-500 text-sm">Applied for <span className="font-medium text-slate-700">{app.jobTitle}</span></p>
                              </div>
                            </div>
                            <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${app.status === 'new' ? 'bg-orange-50 text-orange-600 border-orange-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                              {app.status.toUpperCase()}
                            </span>
                          </div>
                        ))}
                        {applications.length === 0 && <p className="text-slate-500 text-center py-6">No recent applications.</p>}
                      </div>
                    </div>
                  </>
                )}

                {/* ---------------- JOBS TAB ---------------- */}
                {activeTab === "jobs" && (
                  <>
                    <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-1">Job Postings</h2>
                        <p className="text-slate-500">Manage your active listings and create new opportunities.</p>
                      </div>
                      <button
                        onClick={() => setShowNewJobModal(true)}
                        className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Create New Job
                      </button>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {jobs.map((job) => (
                        <div key={job.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-slate-900">{job.title}</h3>
                            <button onClick={() => handleDeleteJob(job.id!)} className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors" title="Delete Job">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-slate-600 text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
                            {job.description}
                          </p>
                          <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
                            <span className="px-2.5 py-1 rounded-md bg-slate-100 text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                              <Briefcase className="w-3.5 h-3.5"/> {job.department}
                            </span>
                            <span className="px-2.5 py-1 rounded-md bg-slate-100 text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5"/> {job.type}
                            </span>
                          </div>
                        </div>
                      ))}
                      {jobs.length === 0 && <p className="text-slate-500 col-span-full text-center py-10 bg-white border border-slate-200 rounded-2xl border-dashed">No active job postings. Create one to get started.</p>}
                    </div>
                  </>
                )}

                {/* ---------------- APPLICATIONS TAB ---------------- */}
                {activeTab === "applications" && (
                  <>
                    <header className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-1">Candidate Pipeline</h2>
                        <p className="text-slate-500">Review, manage, and process job applications.</p>
                      </div>
                      <button 
                        onClick={downloadCSV}
                        className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:text-blue-600 transition-colors shadow-sm"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download CSV
                      </button>
                    </header>

                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                      <ul className="divide-y divide-slate-100">
                        {applications.length === 0 ? (
                          <li className="px-8 py-16 text-center text-slate-500">No applications received yet.</li>
                        ) : (
                          applications.map((app) => (
                            <li key={app.id} className="p-6 hover:bg-slate-50 transition-colors">
                              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-1.5">
                                    <h3 className="text-lg font-bold text-slate-900">{app.firstName} {app.lastName}</h3>
                                    <span className={`px-2.5 py-0.5 inline-flex text-xs font-bold rounded-md border
                                      ${app.status === 'new' ? 'bg-orange-50 text-orange-600 border-orange-200' : 
                                        app.status === 'reviewed' ? 'bg-amber-50 text-amber-600 border-amber-200' : 
                                        app.status === 'hired' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 
                                        'bg-red-50 text-red-600 border-red-200'}`}>
                                      {app.status.toUpperCase()}
                                    </span>
                                  </div>
                                  <p className="text-slate-600 text-sm mb-3">
                                    Applied for <span className="font-semibold text-slate-800">{app.jobTitle}</span>
                                  </p>
                                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
                                    <span className="flex items-center gap-1.5"><strong>Email:</strong> {app.email}</span>
                                    <span className="flex items-center gap-1.5"><strong>Phone:</strong> {app.phone}</span>
                                    {app.resumeUrl && (
                                      <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium hover:underline">
                                        View Resume &rarr;
                                      </a>
                                    )}
                                  </div>
                                </div>
                                <div className="flex flex-wrap gap-2 lg:justify-end shrink-0">
                                  {app.status === 'new' && (
                                    <button onClick={() => handleUpdateAppStatus(app.id!, "reviewed")} className="px-4 py-2 text-sm font-semibold rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors border border-slate-200">
                                      Mark Reviewed
                                    </button>
                                  )}
                                  {app.status === 'reviewed' && (
                                    <>
                                      <button onClick={() => handleUpdateAppStatus(app.id!, "hired")} className="px-4 py-2 text-sm font-bold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-sm">
                                        Hire
                                      </button>
                                      <button onClick={() => handleUpdateAppStatus(app.id!, "rejected")} className="px-4 py-2 text-sm font-semibold rounded-lg bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 transition-colors">
                                        Reject
                                      </button>
                                    </>
                                  )}
                                  <button onClick={() => handleDeleteApplication(app)} className="px-3 py-2 rounded-lg bg-white text-slate-400 hover:bg-red-50 hover:text-red-600 border border-slate-200 transition-colors" title="Delete Application">
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </li>
                          ))
                        )}
                      </ul>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </div>
        </main>
      </div>

      {/* Clean Light Modal */}
      {showNewJobModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full relative overflow-hidden shadow-2xl"
          >
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-900">Post a New Job</h3>
              <button onClick={() => setShowNewJobModal(false)} className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateJob}>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Job Title</label>
                    <input required type="text" value={newJob.title} onChange={(e) => setNewJob({...newJob, title: e.target.value})} className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Department</label>
                    <input required type="text" value={newJob.department} onChange={(e) => setNewJob({...newJob, department: e.target.value})} className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Location</label>
                    <input required type="text" value={newJob.location} onChange={(e) => setNewJob({...newJob, location: e.target.value})} className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Type (e.g. Full-time)</label>
                    <input required type="text" value={newJob.type} onChange={(e) => setNewJob({...newJob, type: e.target.value})} className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Description</label>
                  <textarea required rows={3} value={newJob.description} onChange={(e) => setNewJob({...newJob, description: e.target.value})} className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"></textarea>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Requirements (one per line)</label>
                  <textarea required rows={4} value={newJob.requirements} onChange={(e) => setNewJob({...newJob, requirements: e.target.value})} className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm" placeholder="- 3+ years experience..."></textarea>
                </div>
              </div>
              <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                <button type="button" onClick={() => setShowNewJobModal(false)} className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-lg text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm">
                  Post Job
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </ProtectedRoute>
  );
}
