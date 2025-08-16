import React from "react";
import {ShoppingCart, TrashIcon } from "lucide-react";

const ProductCard = ({
  product,
  isFavorite = false,
  isInCart = false,
  onFavoriteToggle = () => {},
  onAddToCart = () => {},
}) => {
  const price = Number(product.price || 0);
  return (
    <div className="relative bg-white rounded-2xl p-5 shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition duration-200 border border-gray-100 flex flex-col">
      <div className="flex-1 flex flex-col items-center text-center">
        <div className="w-full h-40 flex items-center justify-center mb-4">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-36 object-contain"
          />
        </div>
        <h3 className="text-sm font-semibold line-clamp-2 mb-1">
          {product.title}
        </h3>
        <p className="text-xs text-gray-400 mb-3 capitalize">
          {product.category}
        </p>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span className="text-indigo-600 font-extrabold text-lg">
            ₹{price.toFixed(2)}
          </span>
          <span className="text-xs text-gray-400 line-through">
            ₹{(price * 1.15).toFixed(2)}
          </span>
        </div>

        <button
          onClick={onFavoriteToggle}
          aria-pressed={isFavorite}
          className={`p-2 rounded-full backdrop-blur-sm transition ${
            isFavorite
              ? "bg-amber-100 text-amber-600"
              : "bg-white/70 text-gray-500"
          }`}
          title={isFavorite ? "Remove favorite" : "Add to favorites"}
        >
          {isFavorite ? (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21s-7.5-4.35-10-7.3C-1.1 9.8 2.2 4 7.6 4 10 4 12 5.3 12 5.3S14 4 16.4 4C21.8 4 25.1 9.8 22 13.7 19.5 16.65 12 21 12 21z" />
            </svg>
          ) : (
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeWidth="1.5"
                d="M12 21s-7.5-4.35-10-7.3C-1.1 9.8 2.2 4 7.6 4 10 4 12 5.3 12 5.3S14 4 16.4 4C21.8 4 25.1 9.8 22 13.7 19.5 16.65 12 21 12 21z"
              />
            </svg>
          )}
        </button>
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="text-teal-600 font-bold">₹{price.toFixed(2)}</div>
        <div className="flex items-center gap-2">
          <button
            onClick={onAddToCart}
            className="text-sm bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded-full transition flex items-center gap-2"
            title="Add to cart"
          >
           
            
            {isInCart ? <TrashIcon className="w-6 h-6" />  :<ShoppingCart className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
