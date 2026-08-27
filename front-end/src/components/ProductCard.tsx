import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useCartStore } from "@store/useCartStore";
import type { Product } from "@app-types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  // Puxa a action da Store para adicionar o item ao carrinho
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    addItem(product);

    toast.success(`${product.name} added to cart!`);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group relative bg-[#F4F5F7] flex flex-col overflow-hidden cursor-pointer"
    >
      <div className="relative w-full h-[301px]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />

        {product.badge && (
          <div
            className="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center text-white font-medium text-sm z-10"
            style={{
              backgroundColor: product.badgeColor || "transparent",
            }}
          >
            {product.badge}
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-poppins font-semibold text-[24px] text-[#3A3A3A]">
          {product.name}
        </h3>
        <p className="font-poppins font-medium text-[#898989] text-[16px] truncate">
          {product.description}
        </p>
        <div className="flex items-center gap-4 mt-1">
          <span className="font-poppins font-semibold text-[20px] text-[#3A3A3A]">
            {product.price}
          </span>
          {product.oldPrice && (
            <span className="font-poppins text-[16px] text-[#B0B0B0] line-through">
              {product.oldPrice}
            </span>
          )}
        </div>
      </div>

      <div className="absolute inset-0 bg-[#3A3A3A]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
        <button
          onClick={handleAddToCart}
          className="bg-white text-[#B88E2F] font-semibold py-3 px-10 hover:bg-[#B88E2F] hover:text-white transition-colors"
        >
          Add to cart
        </button>
      </div>
    </Link>
  );
}
