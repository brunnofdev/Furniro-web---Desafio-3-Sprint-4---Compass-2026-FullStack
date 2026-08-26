import { useNavigate } from "react-router-dom";
import { useCartStore } from "@store/useCartStore";
import { formatPrice } from "@utils/formatPrice";
import { toast } from "react-hot-toast";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const parsePrice = (priceStr: string) => {
  if (!priceStr) return 0;
  return parseInt(priceStr.toString().replace(/\D/g, ""), 10) || 0;
};

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const navigate = useNavigate();
  const { items, removeItem } = useCartStore();


  const subtotal = items.reduce(
    (acc, item) => acc + parsePrice(item.price) * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty. Please add items to checkout.", {
        style: { background: "#E97171", color: "#fff" },
        iconTheme: { primary: "#fff", secondary: "#E97171" },
      });;
      return; 
    }
    onClose();
    navigate("/checkout");
  };

  const handleGoToCart = () => {
    onClose();
    navigate("/cart");
  };

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/20 z-[998] transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      <aside
        className={`fixed top-0 right-0 h-screen w-full sm:w-[417px] bg-white shadow-xl z-[999] transition-transform duration-300 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-7 py-7">
          <h2 className="text-[24px] font-poppins font-semibold text-black">Shopping Cart</h2>
          <button onClick={onClose} className="text-[#9F9F9F] hover:text-black transition">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="px-7">
          <hr className="border-[#D9D9D9] w-[80%]" />
        </div>

        <div className="flex-1 overflow-y-auto px-7 py-10 flex flex-col gap-5">
          {items.length === 0 ? (
            <p className="text-[#9F9F9F] font-poppins text-center mt-10">Your cart is empty.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-8">
                  <div className="w-[105px] h-[105px] bg-[#F9F1E7] rounded-[10px] overflow-hidden shrink-0 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-w-full max-h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col gap-2 font-poppins">
                    <h3 className="text-[16px] text-black">{item.name}</h3>
                    <div className="flex items-center gap-3">
                      <span className="text-[16px] text-black font-light">{item.quantity}</span>
                      <span className="text-[12px] text-black font-light">X</span>
                      <span className="text-[12px] text-[#B88E2F] font-medium">{formatPrice(parsePrice(item.price))}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="w-[20px] h-[20px] rounded-full bg-[#9F9F9F] text-white flex items-center justify-center hover:bg-red-500 transition-colors shrink-0"
                  title="Remove item"
                >
                  <span className="text-[12px] leading-none mb-[2px]">x</span>
                </button>
              </div>
            ))
          )}
        </div>

        <div className="mt-auto bg-white px-7 py-6">
          <div className="flex items-center justify-between mb-6 font-poppins">
            <span className="text-[16px] text-black">Subtotal</span>
            <span className="text-[16px] text-[#B88E2F] font-semibold">{formatPrice(subtotal)}</span>
          </div>

          <hr className="border-[#D9D9D9] mb-6" />

          <div className="flex items-center gap-4 font-poppins">
            <button
              onClick={handleGoToCart}
              className="flex-1 py-2 rounded-full border border-black text-[12px] text-black hover:bg-black hover:text-white transition-colors"
            >
              Cart
            </button>
            <button
              onClick={handleCheckout}
              className="flex-1 py-2 rounded-full border border-black text-[12px] text-black hover:bg-black hover:text-white transition-colors"
            >
              Checkout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}