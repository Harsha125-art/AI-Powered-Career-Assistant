import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { staggerItem } from "@/lib/animations";

const iconGradients = {
  indigo: "from-indigo-500 to-indigo-600 shadow-indigo-500/30",
  violet: "from-violet-500 to-violet-600 shadow-violet-500/30",
  blue: "from-blue-500 to-blue-600 shadow-blue-500/30",
  emerald: "from-emerald-500 to-emerald-600 shadow-emerald-500/30",
};

function StatCard({
  icon: Icon,
  label,
  value,
  suffix,
  trend,
  accent = "indigo",
  className,
}) {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-slate-200 bg-white/95 p-5 shadow-sm shadow-slate-200/40 backdrop-blur-lg transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 dark:border-slate-700/80 dark:bg-slate-900/80",
        className
      )}
    >
      <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-indigo-400/10 to-violet-400/10 opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="relative flex items-start justify-between gap-3">
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
          <p className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {value}
            {suffix && (
              <span className="ml-0.5 text-lg font-semibold text-slate-500 dark:text-slate-500">
                {suffix}
              </span>
            )}
          </p>
          {trend && (
            <p className="text-xs text-slate-500 dark:text-slate-400">{trend}</p>
          )}
        </div>
        <div
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-md",
            iconGradients[accent] || iconGradients.indigo
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </motion.div>
  );
}

export default StatCard;