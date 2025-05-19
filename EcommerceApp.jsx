// App.jsx
import { useState } from "react";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 59.99,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 99.99,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 39.99,
    image: "https://via.placeholder.com/150",
  },
];

export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, amount) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty + amount } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">ShopEasy</h1>
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-6 h-6" />
          <span>{cart.length} items</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded-lg shadow-md bg-white"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover mb-4"
            />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-700 mb-2">${product.price.toFixed(2)}</p>
            <Button onClick={() => addToCart(product)}>Add to Cart</Button>
          </div>
        ))}
      </div>

      <div className="mt-10 p-6 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    ${item.price.toFixed(2)} x {item.qty}
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <Button onClick={() => updateQty(item.id, -1)} size="icon">
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span>{item.qty}</span>
                  <Button onClick={() => updateQty(item.id, 1)} size="icon">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
            <div className="text-right font-bold text-lg">
              Total: ${total.toFixed(2)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
