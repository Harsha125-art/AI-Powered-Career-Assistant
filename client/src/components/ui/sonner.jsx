import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

function Toaster({ ...props }) {
  const { resolvedTheme } = useTheme();
  return (
    <Sonner
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white/95 group-[.toaster]:backdrop-blur-lg group-[.toaster]:text-slate-900 group-[.toaster]:border-white/30 group-[.toaster]:shadow-xl group-[.toaster]:shadow-indigo-100/50 dark:group-[.toaster]:bg-slate-950/95 dark:group-[.toaster]:text-slate-100 dark:group-[.toaster]:border-slate-700/70 dark:group-[.toaster]:shadow-black/30",
          description: "group-[.toast]:text-slate-500 dark:group-[.toast]:text-slate-400",
          actionButton:
            "group-[.toast]:bg-indigo-600 group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-slate-100 group-[.toast]:text-slate-600 dark:group-[.toast]:bg-slate-800/80 dark:group-[.toast]:text-slate-300",
          success:
            "group-[.toaster]:border-emerald-200/60 group-[.toaster]:bg-emerald-50/90 dark:group-[.toaster]:border-emerald-600/60 dark:group-[.toaster]:bg-emerald-900/90",
          error:
            "group-[.toaster]:border-rose-200/60 group-[.toaster]:bg-rose-50/90 dark:group-[.toaster]:border-rose-600/60 dark:group-[.toaster]:bg-rose-950/90",
          warning:
            "group-[.toaster]:border-amber-200/60 group-[.toaster]:bg-amber-50/90 dark:group-[.toaster]:border-amber-600/60 dark:group-[.toaster]:bg-amber-950/90",
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
