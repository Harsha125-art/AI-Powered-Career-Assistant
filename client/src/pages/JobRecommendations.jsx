import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Bookmark,
  Building2,
  ExternalLink,
  Loader2,
  MapPin,
  Wallet,
} from "lucide-react";
import api from "../services/api";
import PageLayout from "@/components/PageLayout";
import PageHeader from "@/components/PageHeader";
import { EmptyView, ErrorView, LoadingView } from "@/components/StatusView";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { notify } from "@/lib/toast";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

function JobRecommendations() {
  const { resumeId } = useParams();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savingId, setSavingId] = useState(null);

  const saveJob = async (job, index) => {
    setSavingId(index);
    try {
      await api.post("/jobs", job);
      notify.success("Job saved", `${job.title} added to your saved jobs.`);
    } catch (err) {
      console.log(err);
      notify.error(
        "Failed to save job",
        err.response?.data?.message ||
          (err.message === "Network Error"
            ? "Network error. Please check your connection."
            : "Could not save this job.")
      );
    } finally {
      setSavingId(null);
    }
  };

  useEffect(() => {
    const getJobs = async () => {
      try {
        const response = await api.get(`/job/recommend/${resumeId}`);
        setJobs(response.data.jobs);
      } catch (err) {
        console.log(err);
        setError(
          err.response?.data?.message || "Failed to get Job Recommendations"
        );
      } finally {
        setLoading(false);
      }
    };

    getJobs();
  }, [resumeId]);

  return (
    <PageLayout>
      <PageHeader
        title="Recommended Jobs"
        description="AI-curated job listings based on your resume"
      />

      {loading && <LoadingView message="Loading jobs..." />}
      {!loading && error && <ErrorView message={error} />}
      {!loading && !error && jobs.length === 0 && (
        <EmptyView
          title="No jobs found"
          description="We couldn't find matching jobs for your resume at this time."
        />
      )}

      {!loading && !error && jobs.length > 0 && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 sm:grid-cols-2"
        >
          {jobs.map((job, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="flex h-full flex-col border-white/20 bg-white/70 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 dark:border-slate-700/80 dark:bg-slate-900/80">
                <CardHeader>
                  <CardTitle className="text-lg leading-snug text-slate-900 dark:text-slate-100">
                    {job.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-1 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Building2 className="h-4 w-4 shrink-0 text-indigo-600" />
                    {job.company}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <MapPin className="h-4 w-4 shrink-0 text-indigo-600" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Wallet className="h-4 w-4 shrink-0 text-indigo-600" />
                    {job.salaryMin && job.salaryMax
                      ? `₹${job.salaryMin} - ₹${job.salaryMax}`
                      : "Not Mentioned"}
                  </div>
                </CardContent>

                <CardFooter className="gap-2">
                  <Button variant="outline" size="sm" className="gap-1.5" asChild>
                    <a href={job.url} target="_blank" rel="noreferrer">
                      <ExternalLink className="h-3.5 w-3.5" />
                      Apply Now
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    className="gap-1.5 bg-gradient-to-r from-indigo-600 to-violet-600"
                    onClick={() => saveJob(job, index)}
                    disabled={savingId === index}
                  >
                    {savingId === index ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Bookmark className="h-3.5 w-3.5" />
                    )}
                    Save Job
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </PageLayout>
  );
}

export default JobRecommendations;
