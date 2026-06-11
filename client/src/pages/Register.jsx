import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import api from "../services/api";
import AuthLayout from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { notify } from "@/lib/toast";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const registerUser = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      notify.warning("Missing fields", "Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      console.log(response.data);

      notify.success("Registration successful", "You can now sign in to your account.");
      navigate("/login");
    } catch (err) {
      console.log(err.response?.data);
      const message =
        err.response?.data?.message ||
        (err.message === "Network Error"
          ? "Network error. Please check your connection."
          : "Registration failed. Please try again.");

      notify.error("Registration failed", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create an account"
      description="Start optimizing your job search today"
    >
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          registerUser();
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>

        <motion.div whileTap={{ scale: 0.98 }}>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Creating account..." : "Create account"}
          </Button>
        </motion.div>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-primary hover:underline"
          >
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default Register;
