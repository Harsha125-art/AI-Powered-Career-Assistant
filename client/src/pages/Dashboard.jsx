import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../services/api.js";
import PageLayout from "@/components/PageLayout";
import DashboardHero from "@/components/dashboard/DashboardHero";
import StatsGrid from "@/components/dashboard/StatsGrid";
import ResumeCard from "@/components/dashboard/ResumeCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import DashboardEmptyState from "@/components/dashboard/DashboardEmptyState";
import ConfirmDialog from "@/components/ConfirmDialog";
import { ErrorView, LoadingView } from "@/components/StatusView";
import { staggerContainer } from "@/lib/animations";
import { notify } from "@/lib/toast";

function DashBoard() {
  const navigate = useNavigate();

  const [resumes, setResumes] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setLoading(true);
    const loadDashboard = async () => {
      try {
        const [resumesRes, savedJobsRes] = await Promise.all([
          api.get("/resume/my-resumes"),
          api.get("/jobs"),
        ]);

        setResumes(resumesRes.data);
        setSavedJobs(savedJobsRes.data.jobs || []);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError(err.response?.data?.message || "Failed to load dashboard");
        setLoading(false);
      }
    };
    loadDashboard();
  }, []);

  const confirmDeleteResume = async () => {
    if (!deleteTarget) return;

    setDeleting(true);
    try {
      await api.delete(`/resume/${deleteTarget._id}`);
      setResumes((prev) =>
        prev.filter((resume) => resume._id !== deleteTarget._id)
      );
      notify.success("Resume deleted", `${deleteTarget.originalFileName} was removed.`);
      setDeleteTarget(null);
    } catch (err) {
      console.log(err.message);
      notify.error(
        "Delete failed",
        err.response?.data?.message || "Failed to delete resume."
      );
    } finally {
      setDeleting(false);
    }
  };

  const goToUpload = () => navigate("/upload-resume");

  return (
    <PageLayout>
      <DashboardHero onUpload={goToUpload} />

      {loading && <LoadingView message="Loading your dashboard..." />}
      {!loading && error && <ErrorView message={error} />}

      {!loading && !error && (
        <>
          <StatsGrid resumes={resumes} savedJobsCount={savedJobs.length} />

          {resumes.length === 0 && (
            <DashboardEmptyState onUpload={goToUpload} />
          )}

          {resumes.length > 0 && (
            <section>
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  Your Resumes
                </h2>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {resumes.length} resume{resumes.length !== 1 ? "s" : ""}
                </span>
              </div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
              >
                {resumes.map((resume) => (
                  <ResumeCard
                    key={resume._id}
                    resume={resume}
                    deleting={deleting && deleteTarget?._id === resume._id}
                    onView={() => navigate(`/resume/${resume._id}`)}
                    onMatch={() => navigate(`/job-match/${resume._id}`)}
                    onJobs={() => navigate(`/jobs/${resume._id}`)}
                    onInterview={() =>
                      navigate(`/interview-questions/${resume._id}`)
                    }
                    onDelete={() => setDeleteTarget(resume)}
                  />
                ))}
              </motion.div>

              <RecentActivity resumes={resumes} savedJobs={savedJobs} />
            </section>
          )}
        </>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && !deleting && setDeleteTarget(null)}
        title="Delete resume?"
        description={`This will permanently remove "${deleteTarget?.originalFileName}". This action cannot be undone.`}
        confirmLabel="Delete"
        loading={deleting}
        onConfirm={confirmDeleteResume}
      />
    </PageLayout>
  );
}

export default DashBoard;
