import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FileUp, Loader2, Upload } from "lucide-react";
import api from "../services/api";
import PageLayout from "@/components/PageLayout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { notify } from "@/lib/toast";

function UploadResume() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fileUpload = async () => {
    if (!file) {
      notify.warning("No file selected", "Please upload a PDF resume to continue.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("resume", file);
      await api.post("/resume/upload", formData);

      notify.success("Resume uploaded", "Your resume is being analyzed.");
      navigate("/dashboard");
    } catch (err) {
      console.log(err.message);
      notify.error(
        "Upload failed",
        err.response?.data?.message ||
          (err.message === "Network Error"
            ? "Network error. Please check your connection."
            : "Failed to upload resume.")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <PageHeader
        title="Upload Resume"
        description="Upload a PDF resume to get AI-powered analysis and job recommendations"
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mx-auto max-w-xl"
      >
        <Card className="border-white/20 bg-white/70 shadow-xl shadow-indigo-500/5 dark:border-slate-700/80 dark:bg-slate-900/80">
          <CardContent className="p-6 sm:p-8">
            <div className="space-y-6">
              <div className="relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-indigo-200/80 bg-gradient-to-br from-indigo-50/50 to-violet-50/50 px-6 py-12 transition-colors hover:border-indigo-400/60 hover:from-indigo-50 hover:to-violet-50">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/25">
                  <FileUp className="h-7 w-7" />
                </div>
                <Label
                  htmlFor="resume-file"
                  className="cursor-pointer text-center"
                >
                  <span className="text-sm font-semibold text-slate-900 dark:text-slate-600">
                    {file ? file.name : "Click to select a PDF file"}
                  </span>
                  <span className="mt-1 block text-xs text-slate-500 dark:text-indigo-600">
                    PDF format only
                  </span>
                </Label>
                <input
                  id="resume-file"
                  type="file"
                  accept=".pdf"
                  className="absolute inset-0 cursor-pointer opacity-0"
                  onChange={(e) => setFile(e.target.files[0])}
                  disabled={loading}
                />
              </div>

              <Button
                onClick={fileUpload}
                disabled={loading}
                className="w-full gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700"
                size="lg"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4" />
                )}
                {loading ? "Uploading..." : "Upload Resume"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </PageLayout>
  );
}

export default UploadResume;
