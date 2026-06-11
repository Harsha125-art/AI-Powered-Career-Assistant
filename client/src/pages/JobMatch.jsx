import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  Loader2,
  Search,
  Target,
} from "lucide-react";
import api from "../services/api";
import PageLayout from "@/components/PageLayout";
import PageHeader from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircularProgress } from "@/components/ui/circular-progress";
import { Textarea } from "@/components/ui/textarea";
import { notify } from "@/lib/toast";

function MatchJob() {
  const { resumeId } = useParams();
  console.log(resumeId);

  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const matchJob = async () => {
    setLoading(true);
    setResult(null);
    if (!jobDescription.trim()) {
      notify.warning("Missing job description", "Please paste a job description to match.");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post(`/job/match/${resumeId}`, {
        jobDescription,
      });

      console.log(response.data);
      setResult(response.data.saveJobMatch);
      notify.success("Match complete", "Your resume has been compared to the job description.");
    } catch (err) {
      console.log(err.message);
      notify.error(
        "Match failed",
        err.response?.data?.message ||
          (err.message === "Network Error"
            ? "Network error. Please check your connection."
            : "Failed to match resume.")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <PageHeader
        title="Job Match"
        description="Paste a job description to see how well your resume matches"
      />

      <div className="mx-auto max-w-3xl space-y-6">
        <Card className="border-white/20 bg-white/70 shadow-lg dark:border-slate-700/80 dark:bg-slate-900/80">
          <CardContent className="space-y-4 p-6">
            <Textarea
              rows={10}
              placeholder="Paste Job Description Here"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="min-h-[200px] resize-y border-white/30 bg-white/60 dark:border-slate-700/80 dark:bg-slate-950/90"
              disabled={loading}
            />
            <Button onClick={matchJob} disabled={loading} className="gap-2">
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              {loading ? "Matching..." : "Match Resume"}
            </Button>
          </CardContent>
        </Card>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <Card className="border-white/20 bg-white/70 shadow-lg dark:border-slate-700/80 dark:bg-slate-900/80">
              <CardContent className="flex items-center gap-6 p-6">
                <CircularProgress value={result.matchScore} size={96} glow />
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Match Score</p>
                  <p className="mt-1 flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-slate-100">
                    <Target className="h-5 w-5 text-indigo-600" />
                    {result.matchScore >= 80
                      ? "Strong Match"
                      : result.matchScore >= 60
                        ? "Moderate Match"
                        : "Low Match"}
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-emerald-200/60 bg-gradient-to-br from-emerald-50/80 to-white/70 dark:border-slate-700/80 dark:bg-slate-950/80">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base text-slate-900 dark:text-indigo-600">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    Matched Skills
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {result.matchedSkills.map((skill, index) => (
                    <Badge key={index} variant="success">
                      {skill}
                    </Badge>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-amber-200/60 bg-gradient-to-br from-amber-50/80 to-white/70 dark:border-slate-700/80 dark:bg-slate-950/80">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base text-slate-900 dark:text-indigo-600">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    Missing Skills
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {result.missingSkills.map((skill, index) => (
                    <Badge key={index} variant="warning">
                      {skill}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            </div>

            <Card className="border-blue-200/60 bg-gradient-to-br from-blue-50/80 to-white/70 dark:border-slate-700/80 dark:bg-slate-950/80">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base text-slate-900 dark:text-indigo-600">
                  <Lightbulb className="h-4 w-4 text-blue-600" />
                  Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.suggestions.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-800"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </PageLayout>
  );
}

export default MatchJob;
