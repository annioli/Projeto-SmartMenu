import { createContext, useContext, useState, ReactNode } from "react";
import { OrderItem, Customer, PaymentMethod } from "@/types/menu";

interface OrderContextType {
  customer: Customer | null;
  orderItems: OrderItem[];
  paymentMethod: PaymentMethod | null;
  setCustomer: (customer: Customer) => void;
  addItem: (item: OrderItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  clearOrder: () => void;
  getTotal: () => number;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);

  const addItem = (item: OrderItem) => {
    setOrderItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
  };

  const removeItem = (itemId: string) => {
    setOrderItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setOrderItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, quantity } : i))
    );
  };

  const clearOrder = () => {
    setOrderItems([]);
    setPaymentMethod(null);
  };

  const getTotal = () => {
    return orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <OrderContext.Provider
      value={{
        customer,
        orderItems,
        paymentMethod,
        setCustomer,
        addItem,
        removeItem,
        updateQuantity,
        setPaymentMethod,
        clearOrder,
        getTotal,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};