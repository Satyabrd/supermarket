'use client';
import { useCart } from '../context/CartContext';
import { useEffect, useState } from 'react';
import api from '../services/api';

export default function CartSidebar() {
  const { state } = useCart();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchTotal = async () => {
        console.log("state is::",state)
      if (Object.keys(state.cart).length > 0) {
        const res = await api.post('/get-total/', {
          cart_items: state.cart,
        });
        setTotal(res.data.total);
      }
    };
    fetchTotal();
  }, [state]);

  return (
    <div className="fixed top-0 right-0 w-64 bg-white border-l shadow-lg p-4 h-full overflow-y-auto">
      <h2 className="text-xl font-bold">Cart</h2>
      <ul className="mt-2">
        {Object.entries(state.cart).map(([code, qty]) => (
          <li key={code} className="py-1">
            {code} × {qty}
          </li>
        ))}
      </ul>
      <div className="mt-4 font-bold">Total: ${total}</div>
    </div>
  );
}
