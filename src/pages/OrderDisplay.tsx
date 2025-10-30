import { useEffect, useState } from "react";
import { useOrder } from "@/contexts/OrderContext";
import { Card, CardContent } from "@/components/ui/card";
import { Order } from "@/types/menu";

const OrderDisplay = () => {
  const { orders } = useOrder();
  const [currentTime, setCurrentTime] = useState(new Date());

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

  const preparingOrders = orders.filter((o) => o.status === "preparing");
  const readyOrders = orders.filter((o) => o.status === "ready");

  const OrderCard = ({ order, isReady }: { order: Order; isReady: boolean }) => (
    <Card className="border-2 mb-4 bg-card hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="text-center space-y-3">
          <div className="text-4xl font-bold text-primary">
            #{order.id.slice(-4)}
          </div>
          <div className="text-2xl font-semibold">
            {order.customer.name}
          </div>
          {!isReady && (
            <div className="text-5xl font-mono font-bold text-foreground">
              {getElapsedTime(order)}
            </div>
          )}
          <div className="text-sm text-muted-foreground">
            {isReady ? "pedido finalizado" : "pedido em preparo"}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-12 text-primary">
          ACOMPANHE SEU PEDIDO
        </h1>

        <div className="grid grid-cols-2 gap-8">
          {/* Left side - Preparing orders */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-center text-foreground">
              EM PREPARO
            </h2>
            {preparingOrders.length === 0 ? (
              <Card className="text-center p-8">
                <p className="text-xl text-muted-foreground">
                  Nenhum pedido em preparo
                </p>
              </Card>
            ) : (
              <div>
                {preparingOrders.map((order) => (
                  <OrderCard key={order.id} order={order} isReady={false} />
                ))}
              </div>
            )}
          </div>

          {/* Right side - Ready orders */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-center text-foreground">
              PRONTOS
            </h2>
            {readyOrders.length === 0 ? (
              <Card className="text-center p-8">
                <p className="text-xl text-muted-foreground">
                  Nenhum pedido pronto
                </p>
              </Card>
            ) : (
              <div>
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
