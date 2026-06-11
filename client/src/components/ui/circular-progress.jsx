import { cn } from "@/lib/utils";

function getScoreStyles(score) {
  if (score >= 80) {
    return {
      stroke: "stroke-emerald-500",
      glow: "glow-emerald",
      text: "text-emerald-600",
    };
  }
  if (score >= 60) {
    return {
      stroke: "stroke-amber-500",
      glow: "glow-amber",
      text: "text-amber-600",
    };
  }
  return {
    stroke: "stroke-rose-500",
    glow: "glow-rose",
    text: "text-rose-600",
  };
}

function CircularProgress({
  value = 0,
  size = 72,
  strokeWidth = 5,
  className,
  glow = true,
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (Math.min(value, 100) / 100) * circumference;
  const styles = getScoreStyles(value);

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center rounded-full",
        glow && styles.glow,
        className
      )}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className="stroke-slate-200"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={cn(
            "transition-all duration-700 ease-out",
            styles.stroke
          )}
        />
      </svg>
      <span
        className={cn("absolute text-sm font-bold", styles.text)}
      >
        {value}%
      </span>
    </div>
  );
}

export { CircularProgress, getScoreStyles };
