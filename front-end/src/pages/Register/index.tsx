import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { User, Eye, EyeOff } from "lucide-react";
import { AuthLayout } from "../../components/AuthLayout";


const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterFormInputs = z.infer<typeof registerSchema>;

export function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || "Failed to create account");

      toast.success("Account created successfully! Please log in.");
      navigate("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
        console.error("Register Error:", error);
      }
    }
  };

  return (
    <AuthLayout title="Sign up">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div>
          <input
            {...register("name")}
            type="text"
            placeholder="Name"
            className="w-full bg-gray-200 text-gray-800 px-4 py-3 outline-none"
          />
          {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>}
        </div>

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

        <div>
          <div className="relative flex items-center bg-gray-200">
            <input
              {...register("confirmPassword")}
              type={showPassword ? "text" : "password"}
              placeholder="Confirm password"
              className="w-full bg-transparent text-gray-800 px-4 py-3 outline-none pr-12"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 text-gray-600">
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.confirmPassword && <span className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</span>}
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full bg-black text-white font-semibold py-3 mt-4 hover:bg-gray-800 transition disabled:opacity-50">
          {isSubmitting ? "Loading..." : "SIGN UP"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="font-bold text-black hover:underline">
          Log in
        </Link>
      </div>
    </AuthLayout>
  );
}