import { useEffect } from "react";
import { useOrder } from "@/contexts/OrderContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@/types/menu";

const OrderDisplay = () => {
  const { orders } = useOrder();

  useEffect(() => {
    // Auto-refresh page every 30 seconds
    const interval = setInterval(() => {
      window.location.reload();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getStatusBadge = (status: OrderStatus) => {
    const variants = {
      pending: { variant: "secondary" as const, label: "AGUARDANDO" },
      preparing: { variant: "default" as const, label: "PREPARANDO" },
      ready: { variant: "default" as const, label: "PRONTO" },
      completed: { variant: "outline" as const, label: "FINALIZADO" },
      cancelled: { variant: "destructive" as const, label: "CANCELADO" },
    };
    const config = variants[status];
    return (
      <Badge variant={config.variant} className="text-lg px-4 py-2">
        {config.label}
      </Badge>
    );
  };

  const activeOrders = orders.filter(
    (o) => o.status === "pending" || o.status === "preparing" || o.status === "ready"
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-12 text-primary">
          ACOMPANHE SEU PEDIDO
        </h1>

        {activeOrders.length === 0 ? (
          <Card className="text-center p-12">
            <p className="text-2xl text-muted-foreground">
              Nenhum pedido em andamento no momento
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeOrders.map((order) => (
              <Card key={order.id} className="border-2 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-3xl font-bold">
                      #{order.id.slice(-4)}
                    </span>
                    {getStatusBadge(order.status)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Cliente</p>
                      <p className="text-xl font-semibold">{order.customer.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Itens</p>
                      <ul className="space-y-1">
                        {order.items.map((item, idx) => (
                          <li key={idx} className="text-sm">
                            {item.quantity}x {item.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-3 border-t">
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="text-2xl font-bold text-primary">
                        R$ {order.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-12 text-center text-muted-foreground">
          <p className="text-lg">
            Atualização automática a cada 30 segundos
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDisplay;
