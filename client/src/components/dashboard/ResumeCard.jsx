import { motion } from "framer-motion";
import { Loader2, Eye, MessageSquare, Search, Sparkles, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircularProgress, getScoreStyles } from "@/components/ui/circular-progress";
import { cn } from "@/lib/utils";
import { staggerItem } from "@/lib/animations";

const MAX_SKILLS = 4;

function getTopBorderClass(score) {
  if (score >= 80) return "border-t-emerald-500";
  if (score >= 60) return "border-t-amber-500";
  return "border-t-rose-500";
}

function ResumeCard({
  resume,
  onView,
  onMatch,
  onJobs,
  onInterview,
  onDelete,
  deleting = false,
}) {
  const score = resume.analysis?.atsScore || 0;
  const skills = resume.analysis?.skills || [];
  const visibleSkills = skills.slice(0, MAX_SKILLS);
  const remainingCount = skills.length - MAX_SKILLS;
  const scoreStyles = getScoreStyles(score);

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.25 } }}
    >
      <Card
        className={cn(
          "group flex h-full flex-col overflow-hidden border border-slate-200 border-t-4 bg-white/95 shadow-lg shadow-slate-200/40 backdrop-blur-lg transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 dark:border-slate-700/80 dark:bg-slate-900/80",
          getTopBorderClass(score)
        )}
      >
        <CardHeader className="pb-4">
          <div className="flex items-start gap-4">
            <CircularProgress value={score} size={72} glow />
            <div className="min-w-0 flex-1 pt-1">
              <CardTitle className="truncate text-base font-bold leading-snug text-slate-900 dark:text-slate-100">
                {resume.originalFileName}
              </CardTitle>
              <p
                className={cn(
                  "mt-1.5 text-xs font-semibold uppercase tracking-wider",
                  scoreStyles.text
                )}
              >
                ATS Score · {score >= 80 ? "Excellent" : score >= 60 ? "Good" : "Needs Work"}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 space-y-3">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Top Skills
            </p>
            <div className="flex flex-wrap gap-1.5">
              {visibleSkills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                   className="
  bg-blue-700
  text-white
  border-0
  font-medium
  dark:bg-indigo-500
">
                  {skill}
                </Badge>
              ))}
              {remainingCount > 0 && (
                <Badge variant="outline" className="text-slate-500 dark:text-slate-400">
                  +{remainingCount} more
                </Badge>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-wrap gap-2 border-t border-slate-200 bg-slate-50/80 pt-4 dark:border-slate-700/70 dark:bg-slate-950/50">
          <Button size="sm" variant="outline" className="gap-1.5" onClick={onView}>
            <Eye className="h-3.5 w-3.5" />
            Details
          </Button>
          <Button size="sm" variant="outline" className="gap-1.5" onClick={onMatch}>
            <Search className="h-3.5 w-3.5" />
            Match
          </Button>
          <Button size="sm" variant="outline" className="gap-1.5" onClick={onJobs}>
            <Sparkles className="h-3.5 w-3.5" />
            Jobs
          </Button>
          <Button size="sm" variant="outline" className="gap-1.5" onClick={onInterview}>
            <MessageSquare className="h-3.5 w-3.5" />
            Interview
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="gap-1.5 text-slate-600 hover:text-destructive dark:text-slate-200 dark:hover:text-destructive-foreground"
            onClick={onDelete}
            disabled={deleting}
          >
            {deleting ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Trash2 className="h-3.5 w-3.5" />
            )}
            Delete
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default ResumeCard;
