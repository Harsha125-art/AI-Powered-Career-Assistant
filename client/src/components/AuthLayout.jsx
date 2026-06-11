import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function AuthLayout({ title, description, children }) {
  return (
    <div className="page-gradient flex min-h-svh items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-xl shadow-indigo-500/30">
            <Sparkles className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
           AI-Powered Career Assistant
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Analyse • Match • Discover
            </p>
          </div>
        </div>

        <Card className="border-white/20 shadow-xl shadow-indigo-500/5 backdrop-blur-lg dark:border-slate-700/80 dark:bg-slate-900/80">
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-slate-900 dark:text-slate-100">{title}</CardTitle>
            {description && (
              <CardDescription className="text-slate-500 dark:text-slate-400">
                {description}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default AuthLayout;
