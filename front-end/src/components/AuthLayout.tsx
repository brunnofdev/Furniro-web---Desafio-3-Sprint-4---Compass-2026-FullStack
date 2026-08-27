import { type ReactNode } from "react";
import background from "../assets/login/background.svg";
import logoFurniro from "../assets/logo.svg";

interface AuthLayoutProps {
  title: string;
  children: ReactNode;
}

export function AuthLayout({ title, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
 
      <div className="hidden md:block bg-gray-100 relative">
        <img
          src={background}
          alt="Interior design background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col justify-center items-center p-8 bg-white">
        <div className="w-full max-w-sm">
        
          <div className="flex flex-col items-center mb-8">
            
            <div className="flex items-center justify-center gap-2 mb-6">
              <img 
                src={logoFurniro} 
                alt="Logo Furniro" 
                className="h-10 w-auto" 
              />
            </div>
            
            <h2 className="text-2xl font-semibold text-black">{title}</h2>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}