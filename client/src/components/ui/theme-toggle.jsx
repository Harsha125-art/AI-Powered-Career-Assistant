import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function ThemeToggle({ className, ...props }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const theme = mounted ? resolvedTheme : "light";
  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={cn("rounded-full transition-all duration-200 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/70", className)}
      {...props}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ opacity: 0, y: -4, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 4, scale: 0.9 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="flex h-5 w-5 items-center justify-center"
        >
          {isDark ? <Moon className="h-4 w-4" /> : <SunMedium className="h-4 w-4" />}
        </motion.span>
      </AnimatePresence>
    </Button>
  );
}

export { ThemeToggle };
