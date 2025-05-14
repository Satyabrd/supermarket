'use client';
import { createContext, useReducer, useContext, ReactNode } from 'react';
import api from '../services/api';

type CartItem = { code: string; quantity: number };
type State = { cart: Record<string, string | number> };
type Action = { type: 'ADD_ITEM'; code: string, cart_id: string };

const CartContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(undefined);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_ITEM':
      console.log("came here");
      const { code, cart_id } = action;

      // Check if the current value is a string or a number
      const current = state.cart[code] || 0;
      
      // If it's a number, we just add 1
      const newQuantity = (typeof current === 'number') ? current + 1 : parseFloat(current) + 1;
      // If it's a number, we just add 1
      if (typeof current === 'number') {
        return {
          cart: {
            ...state.cart,
            [code]: newQuantity,
            cart_id, // You can store cartId as well if necessary
          },
        };
      }

      // If it's a string, we convert it to a number and add 1
      if (typeof current === 'string') {
        const currentNumber = parseFloat(current);
        if (!isNaN(currentNumber)) {
          return {
            cart: {
              ...state.cart,
              [code]: newQuantity,
              cart_id,
            },
          };
        } else {
          // Handle the case where the string can't be converted to a number
          console.error(`Cannot add to cart. Invalid string value for product code ${code}:`, current);
        }
      }

      // After updating the cart, make a POST request to the backend to save this to the database
      addToCartApi(cart_id, code, newQuantity);

      // In case no item was found in the cart (i.e., initial state is empty), start with 1
      return {
        cart: {
          ...state.cart,
          [code]: 1, // Start with 1 when item doesn't exist in the cart
          cart_id,
        },
      };

    default:
      return state;
  }
}

async function addToCartApi(cartId: string, productCode: string, quantity: number) {
    console.log("came here")
    const response = await api.post('/add-to-cart/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cart_id: cartId,
        product_code: productCode,
        quantity: quantity,
      }),
    });
    console.log("response is::",response);
  
  }

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { cart: {} });
  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('CartContext must be used inside provider');
  return ctx;
};
