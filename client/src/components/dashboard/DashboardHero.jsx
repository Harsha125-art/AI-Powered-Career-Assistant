import { motion } from "framer-motion";
import { Sparkles, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeInUp } from "@/lib/animations";

function DashboardHero({ onUpload }) {
  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="hero-gradient glow-indigo relative mb-8 overflow-hidden rounded-2xl border border-white/20 p-6 shadow-2xl transition-all duration-300 sm:p-8 dark:border-slate-700/80 dark:bg-slate-950/95"
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl dark:bg-white/5" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-violet-400/20 blur-3xl" />
      <div className="pointer-events-none absolute right-1/4 top-1/2 h-32 w-32 rounded-full bg-blue-300/20 blur-2xl" />

      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-medium text-white/95 backdrop-blur-md dark:border-slate-700/70 dark:bg-white/10">
            <Sparkles className="h-3.5 w-3.5" />
            AI-Powered Career Assistant
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Welcome Back
          </h1>
          <p className="max-w-lg text-sm leading-relaxed text-indigo-100 sm:text-base dark:text-slate-300">
            Track your resumes, optimize ATS scores, discover matching roles, and
            prepare for interviews — all in one place.
          </p>
        </div>

        <Button
          onClick={onUpload}
          size="lg"
          className="shrink-0 gap-2 border-0 bg-white/95 text-indigo-700 shadow-lg hover:bg-white hover:scale-[1.02] transition-transform dark:bg-slate-800/95 dark:text-indigo-200 dark:hover:bg-slate-700"
        >
          <Upload className="h-4 w-4" />
          Upload Resume
        </Button>
      </div>
    </motion.section>
  );
}

export default DashboardHero;
