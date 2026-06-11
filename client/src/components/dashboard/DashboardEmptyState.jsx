import { motion } from "framer-motion";
import {
  ArrowRight,
  FileSearch,
  Sparkles,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeInUp } from "@/lib/animations";

const features = [
  {
    icon: FileSearch,
    title: "ATS Analysis",
    description: "Get instant scores and improvement suggestions",
    color: "from-indigo-500 to-indigo-600",
  },
  {
    icon: Sparkles,
    title: "Smart Job Matching",
    description: "Discover roles tailored to your skills",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Upload,
    title: "Interview Prep",
    description: "Generate AI-powered interview questions",
    color: "from-violet-500 to-violet-600",
  },
];

function DashboardEmptyState({ onUpload }) {
  return (
    
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="relative overflow-hidden rounded-2xl border border-dashed border-indigo-600/50 bg-white/60 p-8 text-center shadow-lg shadow-indigo-500/5 backdrop-blur-lg transition-colors duration-300 dark:border-indigo-500/40 dark:bg-slate-900/70 sm:p-12"
    >
      
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-violet-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-indigo-300/20 blur-3xl" />

      <div className="relative mx-auto max-w-lg">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-xl shadow-indigo-500/30">
          <Upload className="h-8 w-8" />
        </div>

        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-2xl">
          Start your career journey
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:text-base">
          Upload your first resume to unlock AI-powered ATS scoring, job
          recommendations, and personalized interview preparation.
        </p>

        <Button onClick={onUpload} size="lg" className="mt-6 gap-2">
          <Upload className="h-4 w-4" />
          Upload Your First Resume
          <ArrowRight className="h-4 w-4" />
        </Button>

        <div className="mt-10 grid gap-4 text-left sm:grid-cols-3">
          {features.map(({ icon: Icon, title, description, color }) => (
            <div
              key={title}
              className="rounded-xl border border-white/40 bg-white/70 p-4 shadow-sm backdrop-blur-sm transition-colors duration-300 dark:border-slate-700/70 dark:bg-slate-900/70"
            >
              <div
                className={`mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br text-white shadow-md ${color}`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default DashboardEmptyState;
