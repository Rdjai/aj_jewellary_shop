import React, { useState, useEffect } from 'react';
import { useDispatchCart, useCart } from './contextReducer';

const CardComponent = ({ cardWidth = '100%', allitems, options }) => {
  const dispatch = useDispatchCart();
  const data = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(options ? Object.keys(options[0])[0] : "");
  const [selectedOption] = useState(options ? options[0] : options[0]);

  useEffect(() => {
    if (selectedOption) {
      const optionPrice = selectedOption[size] || 0;
      const calculatedPrice = optionPrice * quantity;
      setTotalPrice(calculatedPrice);
    }
  }, [quantity, size, selectedOption]);

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  const handleAddToCart = async () => {
    let food = data.find((item) => item._id === allitems._id);

    if (food) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", _id: allitems._id, price: totalPrice, qty: quantity });
      } else {
        await dispatch({ type: "ADD", _id: allitems._id, name: allitems.name, price: totalPrice, qty: quantity, size: size });
      }
    } else {
      await dispatch({
        type: 'ADD',
        _id: allitems._id,
        name: allitems.name,
        qty: quantity,
        size: size,
        price: totalPrice,
        img: allitems.img,
      });
    }
    console.log(data);
  };

  return (
    <div className="card" style={{ width: cardWidth, borderRadius: '10px', fontSize: '0.9rem' }}>
      <img
        className="card-img-top"
        src={allitems.img}
        alt=""
        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
      />

      <div className="card-body">
        <h6 className="card-title" style={{ fontSize: '1.2rem' }}>{allitems.name}</h6>

        <div className='container mt-2'>
          <div className="d-flex align-items-center">
            <select
              className='m-2 h-100 bg-success rounded'
              style={{ marginRight: '10px', fontSize: '0.8rem' }}
              value={quantity}
              onChange={handleQuantityChange}
            >
              {[1, 2, 3, 4, 5].map((qty) => (
                <option key={qty} value={qty}>
                  {qty}
                </option>
              ))}
            </select>
            <select
              className='m-2 h-100 bg-success rounded'
              style={{ marginRight: '10px', fontSize: '0.8rem' }}
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              {options && options[0] && Object.keys(options[0]).map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>
            <div className="m-1" style={{ fontSize: '.9rem' }}>Total price ₹{totalPrice}</div>
          </div>
          <hr></hr>
          <div>
            <button className="btn btn-secondary bg-success text-dark" onClick={handleAddToCart}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardComponent;
