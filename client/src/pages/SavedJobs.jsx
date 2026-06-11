import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  ExternalLink,
  Loader2,
  MapPin,
  Trash2,
} from "lucide-react";
import api from "../services/api";
import PageLayout from "@/components/PageLayout";
import PageHeader from "@/components/PageHeader";
import ConfirmDialog from "@/components/ConfirmDialog";
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

function SavedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchJobs = async () => {
      try {
        const response = await api.get("/jobs");
        console.log(response.data.jobs);
        setJobs(response.data.jobs);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setError(err.response?.data?.message || "failed to show saved jobs");
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    setDeleting(true);
    try {
      await api.delete(`/jobs/${deleteTarget._id}`);
      setJobs((prev) => prev.filter((job) => job._id !== deleteTarget._id));
      notify.success("Job removed", `${deleteTarget.title} was deleted.`);
      setDeleteTarget(null);
    } catch (err) {
      notify.error(
        "Delete failed",
        err.response?.data?.message || "Failed to delete job."
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <PageLayout>
      <PageHeader
        title="Saved Jobs"
        description="Your bookmarked job opportunities"
      />

      {loading && <LoadingView message="Loading saved jobs..." />}
      {!loading && error && <ErrorView message={error} />}
      {!loading && !error && jobs.length === 0 && (
        <EmptyView
          title="No saved jobs"
          description="Save jobs from recommendations to track them here."
        />
      )}

      {!loading && !error && jobs.length > 0 && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {Array.isArray(jobs) &&
            jobs.map((job) => (
              <motion.div key={job._id} variants={itemVariants}>
                <Card className="flex h-full flex-col border-white/20 bg-white/70 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 dark:border-slate-700/80 dark:bg-slate-900/80">
                  <CardHeader>
                    <CardTitle className="text-base leading-snug text-slate-900 dark:text-slate-100">
                      {job.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <Building2 className="h-4 w-4 shrink-0 text-indigo-600" />
                      {job.company}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <MapPin className="h-4 w-4 shrink-0 text-indigo-600" />
                      {job.location}
                    </div>
                  </CardContent>

                  <CardFooter className="gap-2">
                    <Button variant="outline" size="sm" className="gap-1.5" asChild>
                      <a href={job.url} target="_blank" rel="noreferrer">
                        <ExternalLink className="h-3.5 w-3.5" />
                        Apply
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="gap-1.5"
                      onClick={() => setDeleteTarget(job)}
                      disabled={deleting && deleteTarget?._id === job._id}
                    >
                      {deleting && deleteTarget?._id === job._id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5" />
                      )}
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
        </motion.div>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && !deleting && setDeleteTarget(null)}
        title="Remove saved job?"
        description={`Remove "${deleteTarget?.title}" from your saved jobs?`}
        confirmLabel="Remove"
        loading={deleting}
        onConfirm={confirmDelete}
      />
    </PageLayout>
  );
}

export default SavedJobs;
