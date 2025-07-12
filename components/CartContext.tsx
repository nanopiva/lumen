"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export type CartItem = {
  productId: string;
  title: string;
  price: number;
  image: string | null;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const supabase = createClient();

  useEffect(() => {
    (async () => {
      const stored = localStorage.getItem("cart");
      if (!stored) return;

      let parsed: CartItem[] = [];
      try {
        parsed = JSON.parse(stored);
      } catch {
        localStorage.removeItem("cart");
        return;
      }

      if (parsed.length === 0) {
        setItems([]);
        return;
      }

      const ids = parsed.map((i) => i.productId);
      const { data, error } = await supabase
        .from("products")
        .select("id, is_deleted, stock")
        .in("id", ids);

      if (error) {
        console.error("Error checking cart products:", error.message);
        setItems(parsed);
        return;
      }

      const unavailableIds =
        data?.filter((p) => p.is_deleted || p.stock === 0).map((p) => p.id) ||
        [];

      if (unavailableIds.length) {
        parsed = parsed.filter((i) => !unavailableIds.includes(i.productId));
      }

      setItems(parsed);
    })();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === item.productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  };

  const removeItem = (productId: string) =>
    setItems((prev) => prev.filter((i) => i.productId !== productId));

  const updateQuantity = (productId: string, quantity: number) =>
    setItems((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, quantity } : i))
    );

  const clearCart = () => setItems([]);

  const getTotalItems = () => items.reduce((total, i) => total + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
