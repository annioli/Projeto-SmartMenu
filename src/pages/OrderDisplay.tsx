import { useEffect, useState } from "react";
import { useOrder } from "@/contexts/OrderContext";
import { Card, CardContent } from "@/components/ui/card";
import { Order } from "@/types/menu";

const OrderDisplay = () => {
  const { orders } = useOrder();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Example orders for demonstration
  const exampleOrders: Order[] = [
    {
      id: "0182",
      customer: { name: "Gabriel" },
      items: [
        { id: "1", name: "Hamburguer Artesanal", description: "", price: 24.50, category: "LANCHES", quantity: 2 },
        { id: "2", name: "Coca-Cola", description: "", price: 5.00, category: "BEBIDAS", quantity: 1 }
      ],
      paymentMethod: "PIX",
      status: "preparing",
      createdAt: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      total: 54.00
    },
    {
      id: "0183",
      customer: { name: "Maria" },
      items: [
        { id: "3", name: "X-Bacon", description: "", price: 18.00, category: "LANCHES", quantity: 1 }
      ],
      paymentMethod: "CARTAO",
      status: "preparing",
      createdAt: new Date(Date.now() - 3 * 60 * 1000), // 3 minutes ago
      total: 18.00
    },
    {
      id: "0184",
      customer: { name: "João" },
      items: [
        { id: "4", name: "Prato Feito", description: "", price: 16.00, category: "ALMOÇO", quantity: 1 },
        { id: "5", name: "Suco de Laranja", description: "", price: 7.50, category: "BEBIDAS", quantity: 1 }
      ],
      paymentMethod: "PIX",
      status: "ready",
      createdAt: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      total: 23.50
    },
    {
      id: "0185",
      customer: { name: "Ana" },
      items: [
        { id: "6", name: "X-Tudo", description: "", price: 22.00, category: "LANCHES", quantity: 1 }
      ],
      paymentMethod: "CARTAO",
      status: "ready",
      createdAt: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
      total: 22.00
    }
  ];

  // Use real orders if available, otherwise use examples
  const displayOrders = orders.length > 0 ? orders : exampleOrders;

  useEffect(() => {
    // Update current time every second for live timer
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getElapsedTime = (order: Order) => {
    const elapsed = Math.floor((currentTime.getTime() - order.createdAt.getTime()) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const preparingOrders = displayOrders.filter((o) => o.status === "preparing");
  const readyOrders = displayOrders.filter((o) => o.status === "ready");

  const OrderCard = ({ order, isReady }: { order: Order; isReady: boolean }) => (
    <Card className="border border-border/50 mb-6 bg-card/50 backdrop-blur-sm">
      <CardContent className="p-8">
        <div className="text-center space-y-4">
          <div className="text-6xl font-bold text-destructive tracking-tight">
            #{order.id.slice(-4)}
          </div>
          <div className="text-3xl font-semibold text-foreground">
            {order.customer.name}
          </div>
          {!isReady && (
            <div className="text-7xl font-mono font-bold text-foreground tabular-nums">
              {getElapsedTime(order)}
            </div>
          )}
          <div className="text-base text-muted-foreground uppercase tracking-wide">
            {isReady ? "pedido finalizado" : "pedido em preparo"}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background p-10">
      <div className="max-w-[1800px] mx-auto">
        <h1 className="text-6xl font-bold text-center mb-16 text-destructive uppercase tracking-wide">
          ACOMPANHE SEU PEDIDO
        </h1>

        <div className="grid grid-cols-2 gap-12">
          {/* Left side - Preparing orders */}
          <div className="space-y-6">
            <h2 className="text-5xl font-bold mb-8 text-center text-foreground uppercase tracking-wide border-b-4 border-primary pb-4">
              EM PREPARO
            </h2>
            {preparingOrders.length === 0 ? (
              <Card className="text-center p-12 bg-card/30">
                <p className="text-2xl text-muted-foreground">
                  Nenhum pedido em preparo
                </p>
              </Card>
            ) : (
              <div className="space-y-6">
                {preparingOrders.map((order) => (
                  <OrderCard key={order.id} order={order} isReady={false} />
                ))}
              </div>
            )}
          </div>

          {/* Right side - Ready orders */}
          <div className="space-y-6">
            <h2 className="text-5xl font-bold mb-8 text-center text-foreground uppercase tracking-wide border-b-4 border-accent pb-4">
              PRONTOS
            </h2>
            {readyOrders.length === 0 ? (
              <Card className="text-center p-12 bg-card/30">
                <p className="text-2xl text-muted-foreground">
                  Nenhum pedido pronto
                </p>
              </Card>
            ) : (
              <div className="space-y-6">
                {readyOrders.map((order) => (
                  <OrderCard key={order.id} order={order} isReady={true} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDisplay;
