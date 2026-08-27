import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { checkoutSchema, type CheckoutFormData } from "../../schemas/zodSchema"; 
import { useViaCep } from "./useViaCep";
import { Banner } from "@components/PageBanner";
import { useCartStore } from "@store/useCartStore"; 
import { formatPrice } from "@utils/formatPrice";
import { useNavigate } from "react-router-dom";
import { FeaturesSection } from "@pages/Shop/sections/FeaturesSection";

const parsePrice = (priceStr: string) => {
  return parseInt(priceStr.replace(/\D/g, ""), 10) || 0;
};

export function Checkout() {
 
    const navigate = useNavigate();
    const { items, clearCart } = useCartStore();
    const totalAmount = items.reduce((acc, item) => {
    return acc + parsePrice(item.price) * item.quantity;
  }, 0);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    });

    useViaCep(watch("zipCode"), setValue);

    const onSubmit = (data: CheckoutFormData) => {

        if (items.length === 0) {
            toast.error("Your cart is empty. Please add items before placing an order.");
            return;
        }

        console.log("Order placed:", data);
        toast.success("Order placed successfully!");
        clearCart();
        navigate("/");
    };

    return (
    <>
      <Banner title="Checkout" />
      <div className="w-full min-h-screen bg-white pt-16 pb-24 font-poppins">
        <div className="w-full max-w-[1240px] mx-auto px-4 lg:px-0">
          
          <h2 className="text-[36px] font-semibold mb-10 text-black">Billing details</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col lg:flex-row gap-10 lg:gap-28">
              
            <div className="flex-1 flex flex-col gap-6">
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col gap-2 flex-1">
                  <label className="text-[16px] font-medium text-black">First Name</label>
                  <input
                    {...register("firstName")}
                    className={`h-[75px] border ${errors.firstName ? 'border-red-500' : 'border-[#9F9F9F]'} rounded-[10px] px-4`}
                  />
                  {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName.message}</span>}
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <label className="text-[16px] font-medium text-black">Last Name</label>
                  <input
                    {...register("lastName")}
                    className={`h-[75px] border ${errors.lastName ? 'border-red-500' : 'border-[#9F9F9F]'} rounded-[10px] px-4`}
                  />
                  {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName.message}</span>}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[16px] font-medium text-black">Company Name (Optional)</label>
                <input
                  {...register("companyName")}
                  className="h-[75px] border border-[#9F9F9F] rounded-[10px] px-4"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[16px] font-medium text-black">ZIP code</label>
                <input
                  {...register("zipCode")}
                  maxLength={9}
                  className={`h-[75px] border ${errors.zipCode ? 'border-red-500' : 'border-[#9F9F9F]'} rounded-[10px] px-4`}
                />
                {errors.zipCode && <span className="text-red-500 text-sm">{errors.zipCode.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[16px] font-medium text-black">Country / Region</label>
                <input
                  {...register("country")}
                  className={`h-[75px] border ${errors.country ? 'border-red-500' : 'border-[#9F9F9F]'} rounded-[10px] px-4`}
                />
                {errors.country && <span className="text-red-500 text-sm">{errors.country.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[16px] font-medium text-black">Street address</label>
                <input
                  {...register("streetAddress")}
                  className={`h-[75px] border ${errors.streetAddress ? 'border-red-500' : 'border-[#9F9F9F]'} rounded-[10px] px-4`}
                />
                {errors.streetAddress && <span className="text-red-500 text-sm">{errors.streetAddress.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[16px] font-medium text-black">Town / City</label>
                <input
                  {...register("city")}
                  className={`h-[75px] border ${errors.city ? 'border-red-500' : 'border-[#9F9F9F]'} rounded-[10px] px-4`}
                />
                {errors.city && <span className="text-red-500 text-sm">{errors.city.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[16px] font-medium text-black">Province</label>
                <input
                  {...register("province")}
                  className={`h-[75px] border ${errors.province ? 'border-red-500' : 'border-[#9F9F9F]'} rounded-[10px] px-4`}
                />
                {errors.province && <span className="text-red-500 text-sm">{errors.province.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[16px] font-medium text-black">Add-on address</label>
                <input
                  {...register("addonAddress")}
                  className="h-[75px] border border-[#9F9F9F] rounded-[10px] px-4"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[16px] font-medium text-black">Email address</label>
                <input
                  {...register("email")}
                  className={`h-[75px] border ${errors.email ? 'border-red-500' : 'border-[#9F9F9F]'} rounded-[10px] px-4`}
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <input
                  {...register("additionalInfo")}
                  placeholder="Additional information"
                  className="h-[75px] border border-[#9F9F9F] rounded-[10px] px-4 placeholder:text-[#9F9F9F]"
                />
              </div>

            </div>

            <div className="w-full lg:w-[608px] flex flex-col pt-8 lg:px-8">
              
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-[24px] font-medium text-black">Product</h3>
                <h3 className="text-[24px] font-medium text-black">Subtotal</h3>
              </div>

              <div className="flex flex-col gap-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-[16px]">
                    <p className="text-[#9F9F9F]">
                      {item.name} <span className="text-black ml-2 font-medium">x {item.quantity}</span>
                    </p>
                    <p className="font-light text-black">
                      {formatPrice(parsePrice(item.price) * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center text-[16px] mb-4">
                <p className="text-black">Subtotal</p>
                <p className="font-light text-black">{formatPrice(totalAmount)}</p>
              </div>

              <div className="flex justify-between items-center mb-8 border-b border-[#D9D9D9] pb-8">
                <p className="text-[16px] text-black">Total</p>
                <p className="text-[24px] font-bold text-[#B88E2F]">{formatPrice(totalAmount)}</p>
              </div>

              <div className="flex flex-col gap-4 mt-6">
                
                <div className="flex flex-col gap-3">
                  <label className="flex items-center gap-4 cursor-pointer">
                    <input 
                      type="radio" 
                      value="bank_transfer" 
                      {...register("paymentMethod")} 
                      className="w-4 h-4 accent-black" 
                    />
                    <span className={`text-[16px] font-medium ${watch("paymentMethod") === "bank_transfer" ? "text-black" : "text-[#9F9F9F]"}`}>
                      Direct Bank Transfer
                    </span>
                  </label>
                  <p className="text-[#9F9F9F] text-[14px] font-light text-justify ml-8">
                    Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
                  </p>
                </div>

                <label className="flex items-center gap-4 cursor-pointer mt-2">
                  <input 
                    type="radio" 
                    value="cash_on_delivery" 
                    {...register("paymentMethod")} 
                    className="w-4 h-4 accent-black" 
                  />
                  <span className={`text-[16px] font-medium ${watch("paymentMethod") === "cash_on_delivery" ? "text-black" : "text-[#9F9F9F]"}`}>
                    Cash On Delivery
                  </span>
                </label>
                
                {errors.paymentMethod && <span className="text-red-500 text-sm ml-8">{errors.paymentMethod.message}</span>}

                <p className="text-black text-[14px] font-light mt-4">
                  Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <span className="font-semibold cursor-pointer">privacy policy.</span>
                </p>
              </div>

              <button 
                type="submit" 
                className="w-full max-w-[318px] mx-auto mt-10 h-[64px] border border-black text-black rounded-[15px] hover:bg-black hover:text-white transition-colors text-[20px]"
              >
                Place order
              </button>
              
            </div>

          </form>
        </div>
      </div>
      <FeaturesSection />
    </>
  );
}