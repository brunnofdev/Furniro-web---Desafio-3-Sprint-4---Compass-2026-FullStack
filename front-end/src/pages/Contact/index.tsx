import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Banner } from "@components/PageBanner";
import { FeaturesSection } from "@pages/Shop/sections/FeaturesSection"; 
import { contactSchema, type ContactFormData } from "../../schemas/zodSchema"; 

import locationIcon from "../../assets/contact/location-icon.svg";
import phoneIcon from "../../assets/contact/phone-icon.svg";
import clockIcon from "../../assets/contact/clock-icon.svg";

export function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    console.log("Message data:", data);
    
    toast.success("Message sent successfully!", {
      style: { background: "#2EC1AC", color: "#fff" },
    });
    
    reset();
  };

  return (
    <>
      <Banner title="Contact" />
      
      <div className="w-full bg-white pt-24 pb-20 font-poppins">
        <div className="w-full max-w-[1240px] mx-auto px-4 lg:px-0">
          
          <div className="flex flex-col items-center text-center mb-20 max-w-[644px] mx-auto">
            <h2 className="text-[36px] font-semibold text-black mb-4">Get In Touch With Us</h2>
            <p className="text-[16px] text-[#9F9F9F] font-light">
              For More Information About Our Product & Services. Please Feel Free To Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 lg:gap-32 w-full max-w-[1058px] mx-auto">
            
            <div className="w-full lg:w-[393px] flex flex-col gap-12 lg:pl-12">
              
              <div className="flex gap-5 items-start">
                <div className="w-[30px] flex justify-center shrink-0 pt-1">
                  <img src={locationIcon} alt="Location" className="w-[22px] h-[28px]" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-[24px] font-medium text-black mb-1">Address</h3>
                  <p className="text-[16px] text-black font-normal">236 5th SE Avenue, New<br/>York NY10000, United<br/>States</p>
                </div>
              </div>

              <div className="flex gap-5 items-start">
                <div className="w-[30px] flex justify-center shrink-0 pt-1">
                  <img src={phoneIcon} alt="Phone" className="w-[30px] h-[30px]" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-[24px] font-medium text-black mb-1">Phone</h3>
                  <p className="text-[16px] text-black font-normal">Mobile: +(84) 546-6789<br/>Hotline: +(84) 456-6789</p>
                </div>
              </div>

              <div className="flex gap-5 items-start">
                <div className="w-[30px] flex justify-center shrink-0 pt-1">
                  <img src={clockIcon} alt="Working Time" className="w-[23px] h-[23px]" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-[24px] font-medium text-black mb-1">Working Time</h3>
                  <p className="text-[16px] text-black font-normal">Monday-Friday: 9:00 - 22:00<br/>Saturday-Sunday: 9:00 - 21:00</p>
                </div>
              </div>

            </div>
            <div className="flex-1 lg:pr-[50px]">
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <label className="text-[16px] font-medium text-black">Your name</label>
                  <input
                    {...register("name")}
                    placeholder="Abc"
                    className={`h-[75px] border ${errors.name ? 'border-red-500' : 'border-[#9F9F9F]'} rounded-[10px] px-6 placeholder:text-[#9F9F9F]`}
                  />
                  {errors.name && <span className="text-red-500 text-sm mt-[-10px]">{errors.name.message}</span>}
                </div>

                <div className="flex flex-col gap-4">
                  <label className="text-[16px] font-medium text-black">Email address</label>
                  <input
                    {...register("email")}
                    placeholder="Abc@def.com"
                    className={`h-[75px] border ${errors.email ? 'border-red-500' : 'border-[#9F9F9F]'} rounded-[10px] px-6 placeholder:text-[#9F9F9F]`}
                  />
                  {errors.email && <span className="text-red-500 text-sm mt-[-10px]">{errors.email.message}</span>}
                </div>

                <div className="flex flex-col gap-4">
                  <label className="text-[16px] font-medium text-black">Subject</label>
                  <input
                    {...register("subject")}
                    placeholder="This is an optional"
                    className="h-[75px] border border-[#9F9F9F] rounded-[10px] px-6 placeholder:text-[#9F9F9F]"
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <label className="text-[16px] font-medium text-black">Message</label>
                  <textarea
                    {...register("message")}
                    placeholder="Hi! i'd like to ask about"
                    className="h-[120px] border border-[#9F9F9F] rounded-[10px] px-6 py-5 resize-none placeholder:text-[#9F9F9F]"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full max-w-[237px] h-[55px] bg-[#B88E2F] text-white rounded-[5px] hover:bg-[#A07A25] transition-colors text-[16px] font-normal mt-4"
                >
                  Submit
                </button>

              </form>
            </div>

          </div>
        </div>
      </div>
      
      <FeaturesSection />
    </>
  );
}