import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "@store/useCartStore";
import { FeaturesSection } from "@pages/Shop/sections/FeaturesSection";
import trashIcon from "@assets/trashIcon.svg"; 
import { Banner } from "@components/PageBanner";
import { formatPrice } from "@utils/formatPrice";

const parsePrice = (priceStr: string) => {
  return parseInt(priceStr.replace(/\D/g, ""), 10) || 0;
};

export function Cart() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem } = useCartStore();

  const cartTotal = items.reduce((acc, item) => {
    return acc + parsePrice(item.price) * item.quantity;
  }, 0);

  const handleCheckOut = () => {
    navigate("/checkout");
  };

  return (
    <>
      <Banner title="Cart" />
      <div className="w-full bg-white flex flex-col items-center pt-10 pb-20">
        <div className="w-full max-w-[1240px] px-4 lg:px-0">
          
          <div className="mb-6 lg:mb-10 text-center lg:text-left">
            <h2 className="font-poppins font-bold text-[28px] lg:text-[32px] text-[#333333]">
              Shopping Cart
            </h2>
          </div>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-[#F9F1E7] rounded-lg mb-16 mx-4 lg:mx-0">
              <p className="font-poppins text-xl text-[#333333] mb-6">Your cart is empty</p>
              <Link to="/shop">
                <button className="bg-[#B88E2F] text-white font-poppins font-semibold py-3 px-10 hover:bg-[#A07A25] transition-colors rounded">
                  Return to Shop
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              
              <div className="flex flex-col gap-4 lg:hidden w-full">
                {items.map((item) => {
                  const itemSubtotal = parsePrice(item.price) * item.quantity;

                  return (
                    <div key={item.id} className="flex gap-4 items-center bg-white border border-[#F9F1E7] p-4 rounded-lg shadow-sm">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-[80px] h-[80px] object-cover rounded-[10px] bg-[#F9F1E7] flex-shrink-0"
                      />
                      <div className="flex flex-col flex-1 gap-2">
                        <div className="flex justify-between items-start">
                          <span className="text-[#9F9F9F] font-medium text-sm sm:text-base leading-tight pr-2">
                            {item.name}
                          </span>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="hover:opacity-70 transition-opacity p-1"
                            title="Remove item"
                          >
                            <img src={trashIcon} alt="Remove" className="w-[18px] h-[18px]" />
                          </button>
                        </div>
                        <div className="text-[#333333] text-sm">{item.price}</div>
                        <div className="flex justify-between items-center mt-1">
                          <div className="flex items-center justify-between w-[90px] h-[30px] border border-[#9F9F9F] rounded-[5px] px-2">
                            <button
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="text-black hover:text-[#B88E2F] transition-colors font-medium"
                            >
                              -
                            </button>
                            <span className="text-[#000000] text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="text-black hover:text-[#B88E2F] transition-colors font-medium"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-[#000000] font-medium text-sm">
                            {formatPrice(itemSubtotal)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="hidden lg:block flex-1 overflow-x-auto">
                <table className="w-full min-w-[700px] text-left border-collapse">
                  <thead className="bg-[#F9F1E7] font-poppins font-medium text-[16px] text-[#000000]">
                    <tr>
                      <th className="py-4 px-4 rounded-l-lg">Product</th>
                      <th className="py-4 px-4">Price</th>
                      <th className="py-4 px-4 text-center">Quantity</th>
                      <th className="py-4 px-4">Subtotal</th>
                      <th className="py-4 px-4 rounded-r-lg"></th>
                    </tr>
                  </thead>
                  <tbody className="font-poppins text-[16px] text-[#9F9F9F]">
                    {items.map((item) => {
                      const itemSubtotal = parsePrice(item.price) * item.quantity;

                      return (
                        <tr key={item.id} className="border-b border-[#F9F1E7] last:border-none hover:bg-gray-50 transition-colors">
                          <td className="py-6 px-4 flex items-center gap-4">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-[105px] h-[105px] object-cover rounded-[10px] bg-[#F9F1E7]"
                            />
                            <span className="text-[#9F9F9F]">{item.name}</span>
                          </td>
                          <td className="py-6 px-4">{item.price}</td>
                          <td className="py-6 px-4">
                            <div className="flex items-center justify-between w-[108px] h-[32px] border border-[#9F9F9F] rounded-[5px] px-3 mx-auto">
                              <button
                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                className="text-black hover:text-[#B88E2F] transition-colors font-medium"
                              >
                                -
                              </button>
                              <span className="text-[#000000] font-medium">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="text-black hover:text-[#B88E2F] transition-colors font-medium"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="py-6 px-4 text-[#000000]">
                            {formatPrice(itemSubtotal)}
                          </td>
                          <td className="py-6 px-4 text-center">
                            <button
                              onClick={() => removeItem(item.id)}
                              className="hover:opacity-70 transition-opacity flex items-center justify-center w-full"
                              title="Remove item"
                            >
                              <img src={trashIcon} alt="Remove" className="w-[21px] h-[21.5px]" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="w-full lg:w-[393px] bg-[#F9F1E7] px-6 lg:px-[75px] py-8 lg:pt-[15px] lg:pb-[80px] flex flex-col items-center rounded-lg lg:rounded-none h-fit">
                <h2 className="font-poppins font-semibold text-[24px] lg:text-[32px] text-[#000000] mb-8 lg:mb-[60px]">
                  Cart Totals
                </h2>
                
                <div className="w-full flex justify-between mb-4 lg:mb-6 items-center">
                  <span className="font-poppins font-medium text-[16px] text-[#000000]">Subtotal</span>
                  <span className="font-poppins text-[16px] text-[#9F9F9F]">
                    {formatPrice(cartTotal)}
                  </span>
                </div>

                <div className="w-full flex justify-between mb-8 lg:mb-10 items-center border-b border-[#E8E8E8] pb-4 lg:border-none lg:pb-0">
                  <span className="font-poppins font-medium text-[16px] text-[#000000]">Total</span>
                  <span className="font-poppins font-medium text-[20px] text-[#B88E2F]">
                    {formatPrice(cartTotal)}
                  </span>
                </div>

                <button 
                  onClick={handleCheckOut}
                  className="w-full max-w-[222px] py-[14px] border border-[#000000] rounded-[15px] font-poppins text-[18px] lg:text-[20px] text-[#000000] hover:bg-[#000000] hover:text-white transition-colors"
                >
                  Check Out
                </button>
              </div>

            </div>
          )}
        </div>

        <FeaturesSection/>
      </div>
    </>
  );
}