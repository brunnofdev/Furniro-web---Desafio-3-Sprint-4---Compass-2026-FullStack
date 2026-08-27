import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getProduct } from "@api/products";
import type { Product, ProductSize, ProductColor } from "@app-types/product";
import { formatPrice } from "@utils/formatPrice";

import facebookIcon from "@assets/facebook.svg";
import linkedinIcon from "@assets/linkedin.svg";
import twitterIcon from "@assets/twitter.svg";
import starIcon from "@assets/star.svg";

import { useCartStore } from "../../../store/useCartStore";

const parsePrice = (priceStr: string) => {
  if (!priceStr) return 0;
  return parseInt(priceStr.replace(/\D/g, ""), 10) || 0;
};

export function ProductDetailsSection() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState<string>("");
  
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const targetId = id || "1";
        const data = await getProduct(targetId);

        setProduct(data);

        const gallery = data.gallery?.length ? data.gallery : [data.image];
        setSelectedImage(gallery[0] || "");

        if (data.sizes?.length > 0) setSelectedSize(data.sizes[0]);
        if (data.colors?.length > 0) setSelectedColor(data.colors[0]);
      } catch (error) {
        console.error("Erro ao carregar produto:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  const finalDisplayPrice = useMemo(() => {
    if (!product) return "";
    
    const basePriceNum = parsePrice(product.price);
    
    const sizeModifier = selectedSize?.priceModifier || 0;
    const colorModifier = selectedColor?.priceModifier || 0;
    
    const totalRaw = basePriceNum + sizeModifier + colorModifier;
    
    return formatPrice(totalRaw);
  }, [product, selectedSize, selectedColor]);

  const handleAddToCart = () => {
    if (!product) return;

    const productToCart: Product = {
      ...product,
      price: finalDisplayPrice
    };

    addItem(productToCart, quantity);
    
    toast.success(`${quantity}x ${product.name} added to cart!`);
  };

  if (loading) {
    return (
      <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-[99px] py-12 text-center text-[#9F9F9F]">
        Loading product details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-[99px] py-12 text-center text-red-500">
        Product not found.
      </div>
    );
  }

  const productGallery = product.gallery?.length ? product.gallery : [product.image];
  const displayTags = [product.category, "Home", "Shop"];

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 md:px-12 lg:px-[99px] py-9 font-poppins">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-[105px]">
        
        <div className="flex flex-col-reverse sm:flex-row gap-8 shrink-0">
          <div className="flex sm:flex-col gap-4">
            {productGallery.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`w-[76px] h-[80px] bg-[#F9F1E7] rounded-[10px] flex items-center justify-center p-1 border transition-all ${
                  selectedImage === img
                    ? "border-[#B88E2F] opacity-100"
                    : "border-transparent opacity-80 hover:opacity-100"
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} thumb ${index + 1}`}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/76x80/F9F1E7/9F9F9F?text=Thumb";
                  }}
                />
              </button>
            ))}
          </div>

          <div className="w-full sm:w-[481px] h-[500px] bg-[#F9F1E7] rounded-[10px] flex items-center justify-center p-6 overflow-hidden relative">
            {product.badge && (
              <span
                style={{ backgroundColor: product.badgeColor || "#E97171" }}
                className="absolute top-5 right-5 text-white text-xs font-bold px-3 py-1 rounded-full"
              >
                {product.badge}
              </span>
            )}
            <img
              src={selectedImage}
              alt={product.name}
              className="max-w-full max-h-full object-contain transition-all duration-300"
              onError={(e) => {
                e.currentTarget.src = "https://via.placeholder.com/481x500/F9F1E7/9F9F9F?text=Produto";
              }}
            />
          </div>
        </div>

        <div className="w-full max-w-[606px] flex flex-col">
          <h1 className="text-[42px] font-normal leading-tight text-black">
            {product.name}
          </h1>

          <div className="flex items-center gap-3 mt-1">
            <p className="text-[24px] font-medium text-[#9F9F9F]">
              {finalDisplayPrice}
            </p>
            {product.oldPrice && (
              <span className="text-[18px] text-[#B0B0B0] line-through">
                {product.oldPrice}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <img key={i} src={starIcon} alt="Star rating" className="w-5 h-5" />
              ))}
            </div>
            <div className="w-[1px] h-[37px] bg-[#9F9F9F]" />
            <span className="text-[13px] text-[#9F9F9F]">5 Customer Review</span>
          </div>

          <p className="text-[13px] font-normal text-black leading-[20px] max-w-[424px] mt-4">
            {product.complementaryDescription || product.description}
          </p>

          {product.sizes?.length > 0 && (
            <div className="mt-6">
              <span className="text-[14px] font-normal text-[#9F9F9F] block mb-3">Size</span>
              <div className="flex items-center gap-3">
                {product.sizes.map((sizeObj) => (
                  <button
                    key={sizeObj.name}
                    onClick={() => setSelectedSize(sizeObj)}
                    className={`w-[30px] h-[30px] rounded-[5px] text-[13px] flex items-center justify-center transition-colors ${
                      selectedSize?.name === sizeObj.name
                        ? "bg-[#B88E2F] text-white"
                        : "bg-[#F9F1E7] text-black hover:bg-[#e8dbce]"
                    }`}
                  >
                    {sizeObj.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.colors?.length > 0 && (
            <div className="mt-5">
              <span className="text-[14px] font-normal text-[#9F9F9F] block mb-3">Color</span>
              <div className="flex items-center gap-4">
                {product.colors.map((colorObj) => (
                  <button
                    key={colorObj.name}
                    title={colorObj.name}
                    onClick={() => setSelectedColor(colorObj)}
                    style={{ backgroundColor: colorObj.value }}
                    className={`w-[30px] h-[30px] rounded-full transition-transform border border-black/10 ${
                      selectedColor?.name === colorObj.name
                        ? "ring-2 ring-offset-2 ring-[#B88E2F] scale-105"
                        : "hover:scale-105"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-4 mt-8">
            <div className="w-[123px] h-[64px] border border-[#9F9F9F] rounded-[10px] flex items-center justify-between px-4">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="text-[16px] text-black hover:opacity-60 transition-opacity"
              >
                -
              </button>
              <span className="text-[16px] font-medium text-black">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="text-[16px] text-black hover:opacity-60 transition-opacity"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="h-[64px] px-12 border border-black rounded-[15px] text-[20px] font-normal text-black hover:bg-black hover:text-white transition-colors cursor-pointer"
            >
              Add To Cart
            </button>
          </div>

          <div className="w-full h-[1px] bg-[#D9D9D9] my-10" />

          <div className="flex flex-col gap-3 text-[16px] text-[#9F9F9F]">
            <div className="flex items-center gap-3">
              <span className="w-[80px]">SKU</span>
              <span>:</span>
              <span>{product.sku}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-[80px]">Category</span>
              <span>:</span>
              <span className="capitalize">{product.category}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-[80px]">Tags</span>
              <span>:</span>
              <span>{displayTags.join(", ")}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-[80px]">Share</span>
              <span>:</span>
              <div className="flex items-center gap-6 text-black ml-1">
                <a
                  href="https://www.facebook.com/compass.uol/?locale=pt_BR"
                  className="hover:opacity-70 transition-opacity"
                  title="Facebook"
                >
                  <img src={facebookIcon} alt="Facebook" className="w-5 h-5" />
                </a>
                <a
                  href="https://br.linkedin.com/company/compass-uol?original_referer=https%3A%2F%2Fwww.google.com%2F"
                  className="hover:opacity-70 transition-opacity"
                  title="LinkedIn"
                >
                  <img src={linkedinIcon} alt="LinkedIn" className="w-5 h-5" />
                </a>
                <a
                  href="https://x.com/compassuol"
                  className="hover:opacity-70 transition-opacity"
                  title="Twitter"
                >
                  <img src={twitterIcon} alt="Twitter" className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}