'use client';
import { useEffect, useState } from 'react';
import CartSidebar from '../components/CartSidebar';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import api from '../services/api';
import { v4 as uuidv4 } from 'uuid';

type Product = { id: number; name: string; code: string; price: number };

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart_id, setCartId] = useState("")
  const { dispatch } = useCart();

  useEffect(() => {
    const fetch = async () => {
      const res = await api.get('/products/');
      const cart = await api.get('create-cart');
      setProducts(res.data);
      console.log("cart is::",cart);
      setCartId(cart.data.cart_id);
    };
    fetch();
  }, []);

  const generateCartId = () => {
    const cartId = uuidv4();  // Generate a unique cart ID
    return cartId;
  };

  return (
    <div>
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Product Inventory</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.code}
            name={product.name}
            code={product.code}
            price={product.price}
            onAdd={(code) => dispatch({ type: 'ADD_ITEM', code, cart_id })}
          />
        ))}
      </div>
    </main>
    <CartSidebar />
    </div>
  );
}
