import { db } from "./firebase";
import { collection, addDoc, getDocs, query, orderBy, Timestamp, doc, updateDoc, deleteDoc, where } from "firebase/firestore";

export interface JobPosting {
  id?: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  createdAt?: Timestamp;
  isActive: boolean;
}

export interface JobApplication {
  id?: string;
  jobId: string;
  jobTitle: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  resumeUrl?: string; // We'd use Firebase Storage if we want to store files
  coverLetter?: string;
  status: "new" | "reviewed" | "rejected" | "hired";
  appliedAt?: Timestamp;
}

// -- JOBS --

export const addJob = async (job: Omit<JobPosting, "createdAt" | "id">) => {
  const jobsRef = collection(db, "jobs");
  return await addDoc(jobsRef, {
    ...job,
    createdAt: Timestamp.now(),
  });
};

export const getActiveJobs = async (): Promise<JobPosting[]> => {
  const jobsRef = collection(db, "jobs");
  // In a real app we'd filter by isActive, but we keep it simple here
  const q = query(jobsRef, orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as JobPosting));
};

export const toggleJobStatus = async (jobId: string, isActive: boolean) => {
  const jobRef = doc(db, "jobs", jobId);
  return await updateDoc(jobRef, { isActive });
};

export const deleteJob = async (jobId: string) => {
  const jobRef = doc(db, "jobs", jobId);
  return await deleteDoc(jobRef);
}

// -- APPLICATIONS --

export const addApplication = async (application: Omit<JobApplication, "appliedAt" | "id">) => {
  const appsRef = collection(db, "applications");
  return await addDoc(appsRef, {
    ...application,
    appliedAt: Timestamp.now(),
  });
};

export const getApplicationByEmailAndJobId = async (email: string, jobId: string): Promise<JobApplication | null> => {
  const appsRef = collection(db, "applications");
  const q = query(appsRef, where("email", "==", email), where("jobId", "==", jobId));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) return null;
  
  const doc = querySnapshot.docs[0];
  return { id: doc.id, ...doc.data() } as JobApplication;
};

export const getAllApplications = async (): Promise<JobApplication[]> => {
  const appsRef = collection(db, "applications");
  const q = query(appsRef, orderBy("appliedAt", "desc"));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as JobApplication));
};

export const updateApplicationStatus = async (appId: string, status: JobApplication["status"]) => {
  const appRef = doc(db, "applications", appId);
  return await updateDoc(appRef, { status });
};

export const deleteApplication = async (appId: string) => {
  const appRef = doc(db, "applications", appId);
  return await deleteDoc(appRef);
};
