'use client';
import { useCart } from '../../context/CartContext';
import api from '../../services/api';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const { state } = useCart();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getTotal = async () => {
        console.log("state is::",state);
      const res = await api.post('/get-total/', {
        cart_items: state.cart, // backend should accept format: { A: 2, B: 1 }
      });
      setTotal(res.data.total);
    };
    getTotal();
  }, [state]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      {Object.entries(state.cart).map(([code, qty]) => (
        <div key={code} className="mb-2">
          {code} × {qty}
        </div>
      ))}
      <hr className="my-4" />
      <p className="text-lg font-bold">Total: ${total}</p>
    </div>
  );
}
