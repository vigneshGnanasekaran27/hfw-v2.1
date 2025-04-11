"use client";
import { useState } from "react";
import CartItem from "./components/CartItem";
import CartSummary from "./components/CartSummary";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: "protein-smoothie",
      title: "Berry Protein Smoothie",
      price: 155,
      quantity: 1,
      image: "/api/placeholder/400/300",
    },
    {
      id: "1-protein-smoothie",
      title: "1-Berry Protein Smoothie",
      price: 155,
      quantity: 1,
      image: "/api/placeholder/400/300",
    },
    {
      id: "2-protein-smoothie",
      title: "2-Berry Protein Smoothie",
      price: 155,
      quantity: 1,
      image: "/api/placeholder/400/300",
    },
    // Add more initial items as needed
  ]);

  const updateQuantity = (id, newQuantity) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-600">Your cart is empty</p>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <CartSummary subtotal={subtotal} tax={tax} total={total} />
        </div>
      </div>
    </div>
  );
}
