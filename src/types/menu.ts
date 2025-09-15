export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
}

export interface OrderItem extends MenuItem {
  quantity: number;
}

export interface Customer {
  name: string;
}

export type PaymentMethod = "PIX" | "CARTAO";

export type OrderStatus = "pending" | "preparing" | "ready" | "completed";

export interface Order {
  id: string;
  customer: Customer;
  items: OrderItem[];
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  createdAt: Date;
  total: number;
}