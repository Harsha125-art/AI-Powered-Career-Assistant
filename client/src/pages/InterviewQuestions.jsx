import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, MessageSquare, Users, Wrench } from "lucide-react";
import { jsPDF } from "jspdf";
import api from "../services/api";
import PageLayout from "@/components/PageLayout";
import PageHeader from "@/components/PageHeader";
import { ErrorView, LoadingView } from "@/components/StatusView";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { notify } from "@/lib/toast";

const sectionVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.35 },
  }),
};

function QuestionSection({ icon: Icon, title, questions, index }) {
  return (
    <motion.div
      custom={index}
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="border-white/20 bg-white/70 shadow-lg hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 dark:border-slate-700/80 dark:bg-slate-900/80">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base text-indigo-600 dark:text-slate-100">
            <Icon className="h-4 w-4 text-indigo-600" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3">
            {questions.map((item, qIndex) => (
              <li
                key={qIndex}
                className="flex gap-3 text-sm text-slate-900 dark:text-slate-400"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                  {qIndex + 1}
                </span>
                <span className="pt-0.5">{item.question}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function Questions() {
  const { resumeId } = useParams();

  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const downloadPDF = () => {
    const checkPage = () => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    };

    const doc = new jsPDF();

    let y = 20;

    doc.setFontSize(18);
    doc.text("Interview Questions", 20, y);

    y += 15;

    doc.setFontSize(14);
    doc.text("Technical Questions", 20, y);

    y += 10;

    questions.technicalQuestions.forEach((q, index) => {
      const question = typeof q === "string" ? q : q.question;

      const lines = doc.splitTextToSize(`${index + 1}. ${question}`, 170);

      doc.text(lines, 20, y);

      y += lines.length * 7 + 3;
      checkPage();
    });

    y += 10;

    doc.text("Project Questions", 20, y);

    y += 10;

    questions.projectQuestions.forEach((q, index) => {
      const question = typeof q === "string" ? q : q.question;

      const lines = doc.splitTextToSize(`${index + 1}. ${question}`, 170);

      doc.text(lines, 20, y);

      y += lines.length * 7 + 3;
      checkPage();
    });

    y += 10;

    doc.text("HR Questions", 20, y);

    y += 10;

    questions.hrQuestions.forEach((q, index) => {
      const question = typeof q === "string" ? q : q.question;

      const lines = doc.splitTextToSize(`${index + 1}. ${question}`, 170);

      doc.text(lines, 20, y);

      y += lines.length * 7 + 3;
      checkPage();
    });

    doc.save("InterviewQuestions.pdf");
  };

  useEffect(() => {
    setLoading(true);
    setError("");
    const fetchQuestions = async () => {
      try {
        const response = await api.post(`/interview/${resumeId}`);

        setQuestions(response.data.questions);
        notify.success(
          "Interview questions generated",
          "Your personalized question set is ready."
        );
        setLoading(false);
      } catch (err) {
        console.log(err.message);
        const message =
          err.response?.data?.message || "Failed to generate questions";
        setError(message);
        notify.error("Generation failed", message);
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [resumeId]);

  if (loading) {
    return (
      <PageLayout>
        <LoadingView message="Generating interview questions..." />
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
  if (!questions) {
    return (
      <PageLayout>
        <ErrorView message="No Questions Found" />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <PageHeader
        title="Interview Questions"
        description="AI-generated questions to help you prepare"
        action={
          <Button onClick={downloadPDF} className="gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        }
      />

      <div className="space-y-6">
        <QuestionSection
          icon={Wrench}
          title="Technical Questions"
          questions={questions.technicalQuestions}
          index={0}
        />
        <QuestionSection
          icon={MessageSquare}
          title="Project Questions"
          questions={questions.projectQuestions}
          index={1}
        />
        <QuestionSection
          icon={Users}
          title="HR Questions"
          questions={questions.hrQuestions}
          index={2}
        />
      </div>
    </PageLayout>
  );
}

export default Questions;
