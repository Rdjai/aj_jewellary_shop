import React, { createContext, useContext, useReducer } from 'react';

export const CartStateContext = createContext();
export const CartDispatchContext = createContext();

// Define the reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [
        ...state,
        {
          _id: action._id,
          name: action.name,
          qty: action.qty,
          size: action.size,
          price: action.price,
          img: action.img
        }
      ];
    case 'REMOVE':
      let newArr = [...state];
      newArr.splice(action.index, 1);
      return newArr;
    case 'UPDATE':
      let arr = [...state];
      arr = arr.map((food) => {
        if (food._id === action._id) {
          return {
            ...food,
            qty: parseInt(action.qty) + food.qty,
            price: action.price + food.price
          };
        }
        return food;
      });
      return arr;
      case 'DROP':
      let ar = [];
      return ar;
    default:
      console.log('error in reducer');
      return state;
  }
};

// Create the CartProvider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);