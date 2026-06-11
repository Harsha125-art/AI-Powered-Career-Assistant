import { motion } from "framer-motion";
import { formatDistanceToNow } from "@/lib/formatDate";
import { Bookmark, Clock, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fadeInUp } from "@/lib/animations";

function buildActivities(resumes, savedJobs) {
  const activities = [];

  resumes.forEach((resume) => {
    if (resume.createdAt) {
      activities.push({
        id: `resume-${resume._id}`,
        type: "resume",
        title: resume.originalFileName,
        description: `ATS Score: ${resume.analysis?.atsScore ?? "—"}%`,
        date: new Date(resume.createdAt),
      });
    }
  });

  (savedJobs || []).forEach((job) => {
    if (job.createdAt) {
      activities.push({
        id: `job-${job._id}`,
        type: "job",
        title: job.title,
        description: job.company,
        date: new Date(job.createdAt),
      });
    }
  });

  return activities.sort((a, b) => b.date - a.date).slice(0, 6);
}

function ActivityIcon({ type }) {
  const Icon = type === "job" ? Bookmark : FileText;
  const colorClass =
    type === "job"
      ? "bg-gradient-to-br from-violet-500 to-violet-600 text-white"
      : "bg-gradient-to-br from-indigo-500 to-indigo-600 text-white";

  return (
    <div
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg shadow-sm ${colorClass}`}
    >
      <Icon className="h-4 w-4" />
    </div>
  );
}

function RecentActivity({ resumes, savedJobs }) {
  const activities = buildActivities(resumes, savedJobs);

  if (activities.length === 0) return null;

  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="mt-8"
    >
      <Card className="border-white/20 bg-white/70 shadow-lg backdrop-blur-lg dark:border-slate-700/80 dark:bg-slate-900/80">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-slate-100">
            <Clock className="h-4 w-4 text-indigo-600" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="flex items-center gap-3 rounded-lg px-2 py-3 transition-colors hover:bg-indigo-50/50 dark:hover:bg-slate-800/70"
            >
              <ActivityIcon type={activity.type} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">
                  {activity.type === "resume" ? "Resume uploaded" : "Job saved"}
                  <span className="font-normal text-slate-500 dark:text-slate-400">
                    {" "}
                    — {activity.title}
                  </span>
                </p>
                <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                  {activity.description}
                </p>
              </div>
              <span className="shrink-0 text-xs text-slate-400 dark:text-slate-500">
                {formatDistanceToNow(activity.date)}
              </span>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.section>
  );
}

export default RecentActivity;
