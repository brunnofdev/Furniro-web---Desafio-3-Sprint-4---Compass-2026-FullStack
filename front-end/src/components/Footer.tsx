import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import facebookIcon from "@assets/facebook.svg";
import instagramIcon from "@assets/instagram.svg";
import twitterIcon from "@assets/twitter.svg";
import linkedinIcon from "@assets/linkedin.svg";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    toast.success("Successfully subscribed!");

    setEmail("");
  };

  return (
    <footer className="w-full bg-white flex justify-center pt-16 pb-8 border-t border-gray-200">
      
      <div className="w-full max-w-[1183px] px-5 lg:px-0 flex flex-col">
        
        <div className="flex flex-col lg:flex-row justify-between gap-10 mb-12 flex-wrap">
          
          <div className="flex flex-col gap-10 max-w-[285px]">
            <h2 className="font-poppins font-bold text-2xl text-black">
              Funiro.
            </h2>
            <p className="font-poppins text-gray-400 text-base">
              400 University Drive Suite 200 Coral Gables, <br />
              FL 33134 USA
            </p>

            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/compass.uol/?locale=pt_BR"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 cursor-pointer transition-colors"
              >
                <img src={facebookIcon} alt="Facebook" className="w-5 h-5 object-contain" />
              </a>

              <a
                href="https://www.instagram.com/compass.uol/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 cursor-pointer transition-colors"
              >
                <img src={instagramIcon} alt="Instagram" className="w-5 h-5 object-contain" />
              </a>

              <a
                href="https://x.com/compassuol"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 cursor-pointer transition-colors"
              >
                <img src={twitterIcon} alt="Twitter" className="w-5 h-5 object-contain" />
              </a>

              <a
                href="https://br.linkedin.com/company/compass-uol?original_referer=https%3A%2F%2Fwww.google.com%2F"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 cursor-pointer transition-colors"
              >
                <img src={linkedinIcon} alt="LinkedIn" className="w-5 h-5 object-contain" />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <h3 className="font-poppins font-medium text-gray-400">Links</h3>
            <nav className="flex flex-col gap-6 font-poppins font-medium text-black">
              <Link to="/" className="hover:text-[#B88E2F] transition-colors">
                Home
              </Link>
              <Link to="/shop" className="hover:text-[#B88E2F] transition-colors">
                Shop
              </Link>
              <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#B88E2F] transition-colors cursor-pointer">
                About
              </a>
              <Link to="/contact" className="hover:text-[#B88E2F] transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          <div className="flex flex-col gap-8">
            <h3 className="font-poppins font-medium text-gray-400">Help</h3>
            <nav className="flex flex-col gap-6 font-poppins font-medium text-black">
              <a href="#" className="hover:text-[#B88E2F] transition-colors">
                Payment Options
              </a>
              <a href="#" className="hover:text-[#B88E2F] transition-colors">
                Returns
              </a>
              <a href="#" className="hover:text-[#B88E2F] transition-colors">
                Privacy Policies
              </a>
            </nav>
          </div>

          <div className="flex flex-col gap-8">
            <h3 className="font-poppins font-medium text-gray-400">
              Newsletter
            </h3>

            <form
              className="flex gap-4 items-center"
              onSubmit={handleSubscribe}
            >
              <input
                type="text"
                placeholder="Enter Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="font-poppins text-sm text-black placeholder-gray-400 border-b border-black pb-1 focus:outline-none w-[200px]"
              />
              <button
                type="submit"
                className="font-poppins font-medium text-sm text-black border-b border-black pb-1 uppercase hover:text-[#B88E2F] hover:border-[#B88E2F] transition-colors"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>

        <hr className="border-gray-200 mb-8" />
        <p className="font-poppins text-black text-base">
          2023 furino. All rights reserved
        </p>
      </div>
    </footer>
  );
}
