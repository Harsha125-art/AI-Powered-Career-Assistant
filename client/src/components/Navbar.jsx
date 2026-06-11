import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bookmark,
  LayoutDashboard,
  LogOut,
  Menu,
  Sparkles,
  Upload,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/saved-jobs", label: "Saved Jobs", icon: Bookmark },
  { to: "/upload-resume", label: "Upload", icon: Upload },
];

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActive = (path) => {
    if (path === "/dashboard") return location.pathname === "/dashboard";
    return location.pathname.startsWith(path);
  };

  return (
    <header className="glass-nav">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link
          to="/dashboard"
          className="flex items-center gap-3 transition-opacity hover:opacity-90"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/30">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="hidden sm:block">
            <span className="block text-sm font-bold tracking-tight text-slate-900 dark:text-slate-100">
            AI-Powered Career Assistant
            </span>
            <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">
           Analyse • Match • Discover
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <Link key={to} to={to}>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "relative h-9 gap-2 rounded-full px-4 font-medium transition-all",
                  isActive(to)
                    ? "text-white"
                    : "text-slate-600 hover:bg-white/60 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/60 dark:hover:text-white"
                )}
              >
                {isActive(to) && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 shadow-md shadow-indigo-500/25"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}
                <Icon className="relative h-4 w-4" />
                <span className="relative">{label}</span>
              </Button>
            </Link>
          ))}

          <div className="mx-2 h-5 w-px bg-slate-200 dark:bg-slate-700" />

          <ThemeToggle />

          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="gap-2 rounded-full text-slate-500 hover:bg-rose-50 hover:text-rose-600 dark:text-slate-300 dark:hover:bg-rose-500/10 dark:hover:text-rose-300"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="rounded-full md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-white/20 bg-white/50 backdrop-blur-lg transition-colors duration-300 dark:border-slate-800/70 dark:bg-slate-950/80 md:hidden"
          >
            <div className="flex flex-col gap-1.5 p-4">
              {navLinks.map(({ to, label, icon: Icon }) => (
                <Link key={to} to={to} onClick={() => setMobileOpen(false)}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-3 rounded-xl",
                      isActive(to) &&
                        "bg-gradient-to-r from-indigo-600 to-violet-600 font-medium text-white hover:text-white"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Button>
                </Link>
              ))}
              <ThemeToggle />
              <Button
                variant="ghost"
                onClick={logout}
                className="w-full justify-start gap-3 text-slate-500 hover:text-rose-600 dark:text-slate-300 dark:hover:text-rose-300"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
