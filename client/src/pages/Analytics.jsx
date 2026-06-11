import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  Target,
  TrendingUp,
} from "lucide-react";
import api from "../services/api.js";
import PageLayout from "@/components/PageLayout";
import PageHeader from "@/components/PageHeader";
import { ErrorView, LoadingView } from "@/components/StatusView";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircularProgress } from "@/components/ui/circular-progress";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0 },
};

const tintStyles = {
  default: "border-white/20 bg-white/70 dark:border-slate-700/80 dark:bg-slate-900/80",
  emerald:
    "border-emerald-200/60 bg-gradient-to-br from-emerald-50/80 to-white/70 dark:border-slate-700/80 dark:bg-slate-950/80",
  amber:
    "border-amber-200/60 bg-gradient-to-br from-amber-50/80 to-white/70 dark:border-slate-700/80 dark:bg-slate-950/80",
  blue: "border-blue-200/60 bg-gradient-to-br from-blue-50/80 to-white/70 dark:border-slate-700/80 dark:bg-slate-950/80",
  violet:
    "border-violet-200/60 bg-gradient-to-br from-violet-50/80 to-white/70 dark:border-slate-700/80 dark:bg-slate-950/80",
};

const iconColors = {
  default: "text-indigo-600",
  emerald: "text-emerald-600",
  amber: "text-amber-600",
  blue: "text-blue-600",
  violet: "text-violet-600",
};

function AnalysisSection({
  icon: Icon,
  title,
  items,
  variant = "default",
  tint = "default",
}) {
  if (!items?.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <Card className={cn("shadow-lg shadow-slate-900/5", tintStyles[tint])}>
        <CardHeader className="pb-3">
          <CardTitle
  className={cn(
    "flex items-center gap-2 text-base font-semibold",
    iconColors[tint]
  )}
>
  <Icon className={cn("h-4 w-4", iconColors[tint])} />
  {title}
</CardTitle>
        </CardHeader>
        <CardContent>
          <motion.ul
            variants={listVariants}
            initial="hidden"
            animate="visible"
            className="space-y-2"
          >
            {items.map((item, index) => (
              <motion.li
                key={index}
                variants={listItemVariants}
                className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-700"
              >
                {variant === "badge" ? (
                  <Badge
                    variant="secondary"
                    className={cn(
                      "shrink-0 border-0",
                      tint === "violet" && "bg-violet-100 text-violet-700",
                      tint === "emerald" && "bg-emerald-100 text-emerald-700",
                      tint === "default" && "bg-indigo-100 text-indigo-700"
                    )}
                  >
                    {item}
                  </Badge>
                ) : (
                  <>
                    <span
                      className={cn(
                        "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                        tint === "emerald" && "bg-emerald-500",
                        tint === "amber" && "bg-amber-500",
                        tint === "blue" && "bg-blue-500",
                        tint === "violet" && "bg-violet-500",
                        tint === "default" && "bg-indigo-500"
                      )}
                    />
                    <span>{item}</span>
                  </>
                )}
              </motion.li>
            ))}
          </motion.ul>
        </CardContent>
      </Card>
    </motion.div>
  );
}
function ProjectSection({ projects }) {
  if (!projects?.length) return null;

  return (
    <Card className="mt-6 border-violet-200/60 bg-gradient-to-br from-violet-50/80 to-white/70 shadow-lg dark:border-slate-700/80 dark:bg-slate-950/80">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-violet-600" />
          Projects
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {projects.map((project, index) => (
          <div
            key={index}
            className="rounded-xl border border-slate-200 p-4 dark:border-slate-700"
          >
            <h3 className="font-semibold text-slate-900 dark:text-slate-700">
              {project.name}
            </h3>

            <p className="mt-2 text-sm text-slate-600 dark:text-slate-700">
              {project.description}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {project.technologies?.map((tech, idx) => (
                <Badge
                  key={idx}
                  className="bg-indigo-100 text-indigo-700"
                >
                  {tech}
                </Badge>
              ))}
            </div>

            {project.strengths?.length > 0 && (
              <div className="mt-3">
                <p className="font-medium text-emerald-600">
                  Strengths
                </p>
                <ul className="mt-1 list-disc pl-5 text-sm text-slate-600 dark:text-slate-700">
                  {project.strengths.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {project.improvements?.length > 0 && (
              <div className="mt-3">
                <p className="font-medium text-amber-600">
                  Improvements
                </p>
                <ul className="mt-1 list-disc pl-5 text-sm text-slate-600 dark:text-slate-700">
                  {project.improvements.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function Analysis() {
  const [resume, setResume] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    const getResume = async () => {
      try {
        const response = await api.get(`/resume/${id}`);
        setResume(response.data.resume);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError(err.response?.data?.message || "Failed to Analyse Resume");
        setLoading(false);
      }
    };
    getResume();
  }, [id]);

  if (loading) {
    return (
      <PageLayout>
        <LoadingView message="Analysing your resume..." />
      </PageLayout>
    );
  }
  if (error) {
    return (
      <PageLayout>
        <ErrorView message={error} />
      </PageLayout>
    );
  }
  if (!resume) {
    return (
      <PageLayout>
        <ErrorView message="No Resume Found" />
      </PageLayout>
    );
  }

  const score = resume.analysis.atsScore;
console.log(resume.analysis);
console.log(resume.analysis.projects);
  return (
    <PageLayout>
      <PageHeader
        title={resume.originalFileName}
        description="Detailed AI analysis of your resume"
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="h-full border-white/20 bg-white/70 shadow-lg dark:border-slate-700/80 dark:bg-slate-900/80">
            <CardContent className="flex items-center gap-6 p-6">
              <CircularProgress value={score} size={88} glow />
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">ATS Score</p>
                <p className="mt-1 text-xl font-bold text-slate-900 dark:text-slate-100">
                  {score >= 80
                    ? "Excellent"
                    : score >= 60
                      ? "Good"
                      : "Needs Improvement"}
                </p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Recruiter-friendly benchmark
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="h-full border-white/20 bg-gradient-to-br from-indigo-50/80 to-white/70 shadow-lg dark:border-slate-700/80 dark:bg-slate-950/80">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base text-slate-900 dark:text-indigo-500">
                <TrendingUp className="h-4 w-4 text-indigo-600" />
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-700">
                {resume.analysis.summary}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Separator className="mb-8" />

      <div className="grid gap-6 md:grid-cols-2">
        <AnalysisSection
          icon={CheckCircle2}
          title="Skills"
          items={resume.analysis.skills}
          variant="badge"
          tint="default"
        />
        <AnalysisSection
          icon={TrendingUp}
          title="Strengths"
          items={resume.analysis.strengths}
          tint="emerald"
        />
        <AnalysisSection
          icon={AlertTriangle}
          title="Missing Skills"
          items={resume.analysis.missingSkills}
          tint="amber"
        />
        <AnalysisSection
          icon={Lightbulb}
          title="Suggestions"
          items={resume.analysis.suggestions}
          tint="blue"
        />
        <AnalysisSection
          icon={Target}
          title="Recommended Roles"
          items={resume.analysis.recommendedRoles}
          variant="badge"
          tint="violet"
        />
      </div>
      <ProjectSection
  projects={resume.analysis.projects}
/>
    </PageLayout>
  );
}

export default Analysis;
