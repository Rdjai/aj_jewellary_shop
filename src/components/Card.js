import React, { useState, useEffect } from 'react';
import { Heart, ShoppingBag, Check } from 'lucide-react';
import { useCart } from './contextReducer';

const Card = ({ allitems, options }) => {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(options ? Object.keys(options[0])[0] : "");
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedOption] = useState(options ? options[0] : null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
    if (selectedOption) {
      const optionPrice = selectedOption[size] || 0;
      const calculatedPrice = optionPrice * quantity;
      setTotalPrice(calculatedPrice);
    }
  }, [quantity, size, selectedOption]);

  const handleAddToCart = () => {
    const cartItem = {
      id: allitems._id || Math.random().toString(36).substr(2, 9),
      name: allitems.name,
      img: allitems.img,
      quantity,
      size,
      totalPrice,
      unitPrice: selectedOption[size],
    };

    addToCart(cartItem);
    setIsAddedToCart(true);

    setTimeout(() => {
      setIsAddedToCart(false);
    }, 2000);
  };

  if (!allitems || !options) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] overflow-hidden">
      <div className="relative group">
        <img
          src={allitems.img}
          alt={allitems.name}
          className="w-full h-72 object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-4 right-4 h-8 w-8 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-sm transition-transform hover:scale-110 active:scale-95"
        >
          <Heart
            className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 stroke-red-500' : 'stroke-gray-600'}`}
          />
        </button>
      </div>

      <div className="p-5">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {allitems.name}
          </h3>
          <div className="text-sm text-gray-500">Handcrafted Excellence</div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full appearance-none rounded-lg border border-gray-200 bg-white pl-3 pr-8 py-2.5 text-sm font-medium text-gray-900 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900/10"
              >
                {options[0] && Object.keys(options[0]).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-2.5 top-2.5 h-5 w-5 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            <div className="relative w-24">
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full appearance-none rounded-lg border border-gray-200 bg-white pl-3 pr-8 py-2.5 text-sm font-medium text-gray-900 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900/10"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-2.5 top-2.5 h-5 w-5 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="text-2xl font-semibold text-gray-900">
              ₹{totalPrice.toLocaleString()}
            </div>
            <button
              onClick={handleAddToCart}
              disabled={isAddedToCart}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${isAddedToCart
                ? 'bg-green-500 text-white'
                : 'bg-gray-900 text-white hover:bg-gray-800 active:bg-gray-950'
                }`}
            >
              {isAddedToCart ? (
                <>
                  <Check className="h-4 w-4" />
                  Added
                </>
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4" />
                  Add to bag
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;