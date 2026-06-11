import { motion } from "framer-motion";
import {
  Bookmark,
  FileText,
  MessageSquare,
  Target,
} from "lucide-react";
import StatCard from "./StatCard";
import { staggerContainer } from "@/lib/animations";

function StatsGrid({ resumes, savedJobsCount }) {
  const totalResumes = resumes.length;
  const avgAts =
    totalResumes > 0
      ? Math.round(
          resumes.reduce((sum, r) => sum + (r.analysis?.atsScore || 0), 0) /
            totalResumes
        )
      : 0;

  const stats = [
    {
      icon: FileText,
      label: "Total Resumes",
      value: totalResumes,
      trend: totalResumes > 0 ? "Active in your library" : "Upload to get started",
      accent: "indigo",
    },
    {
      icon: Target,
      label: "Average ATS Score",
      value: avgAts,
      suffix: "%",
      trend:
        avgAts >= 80
          ? "Excellent standing"
          : avgAts >= 60
            ? "Room to improve"
            : "Needs attention",
      accent: "emerald",
    },
    {
      icon: Bookmark,
      label: "Saved Jobs",
      value: savedJobsCount,
      trend:
        savedJobsCount > 0
          ? "Tracked opportunities"
          : "Save jobs from recommendations",
      accent: "blue",
    },
    {
      icon: MessageSquare,
      label: "Interview Questions Generated",
      value: totalResumes,
      trend: "One set per analyzed resume",
      accent: "violet",
    },
  ];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </motion.div>
  );
}

export default StatsGrid;