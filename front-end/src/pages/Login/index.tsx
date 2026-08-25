import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { User, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { AuthLayout } from "../../components/AuthLayout";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || "Failed to log in");

      login(result.token, result.user);
      toast.success(`Welcome back, ${result.user.name}!`);
      navigate(from, { replace: true });
    } catch (error: unknown) {
      toast.error((error as Error).message);
      console.error("Login Error:", error);
    }
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <div className="relative flex items-center bg-gray-200">
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="w-full bg-transparent text-gray-800 px-4 py-3 outline-none"
            />
            <User className="absolute right-4 text-gray-600" size={20} />
          </div>
          {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>}
        </div>

        <div>
          <div className="relative flex items-center bg-gray-200">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full bg-transparent text-gray-800 px-4 py-3 outline-none pr-12"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 text-gray-600">
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && <span className="text-red-500 text-sm mt-1">{errors.password.message}</span>}
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full bg-black text-white font-semibold py-3 mt-4 hover:bg-gray-800 transition disabled:opacity-50">
          {isSubmitting ? "Loading..." : "LOGIN"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        Not registered yet?{" "}
        <Link to="/register" className="font-bold text-black hover:underline">
          Sign up
        </Link>
      </div>
    </AuthLayout>
  );
}