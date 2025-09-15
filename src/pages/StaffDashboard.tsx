import { useState } from "react";
import { useOrder } from "@/contexts/OrderContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, ArrowLeft, Trash2 } from "lucide-react";
import { OrderStatus } from "@/types/menu";

const StaffDashboard = () => {
  const { orders, updateOrderStatus } = useOrder();
  const [filter, setFilter] = useState<"recent" | "all">("recent");

  const filteredOrders = orders.filter((order) => {
    if (filter === "recent") {
      return order.status === "pending" || order.status === "preparing";
    }
    return true;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Pendente</Badge>;
      case "preparing":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">Preparando</Badge>;
      case "ready":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Pronto</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">Finalizado</Badge>;
      default:
        return null;
    }
  };

  const getTimeElapsed = (createdAt: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60));
    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }
    return `00:${minutes.toString().padStart(2, '0')}`;
  };

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  const getActionButton = (order: any) => {
    switch (order.status) {
      case "pending":
        return (
          <Button
            onClick={() => handleStatusChange(order.id, "preparing")}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white"
          >
            Iniciar Preparo
          </Button>
        );
      case "preparing":
        return (
          <Button
            onClick={() => handleStatusChange(order.id, "ready")}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white"
          >
            Finalizar
          </Button>
        );
      case "ready":
        return (
          <div className="flex gap-2">
            <Button
              onClick={() => handleStatusChange(order.id, "preparing")}
              variant="outline"
              className="flex-1 border-teal-600 text-teal-600 hover:bg-teal-50"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Voltar para preparo
            </Button>
            <Button
              onClick={() => handleStatusChange(order.id, "completed")}
              variant="outline"
              size="icon"
              className="border-red-500 text-red-500 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        );
      case "completed":
        return null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-white text-center mb-6">
            PEDIDOS
            <div className="w-24 h-1 bg-red-500 mx-auto mt-2"></div>
          </h1>
          
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => setFilter("recent")}
              variant={filter === "recent" ? "default" : "outline"}
              className={`px-6 py-3 font-semibold ${
                filter === "recent"
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "border-red-600 text-red-600 hover:bg-red-50"
              }`}
            >
              MAIS RECENTES
            </Button>
            <Button
              onClick={() => setFilter("all")}
              variant={filter === "all" ? "default" : "outline"}
              className={`px-6 py-3 font-semibold ${
                filter === "all"
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "border-red-600 text-red-600 hover:bg-red-50"
              }`}
            >
              ATUALIZAR
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="bg-gray-700 border-gray-600 overflow-hidden">
              <div className="p-6">
                <div className="bg-slate-800 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-white font-semibold text-lg">Pedido</h3>
                      <p className="text-gray-300 font-medium">
                        {order.customer.name.toUpperCase()} - {order.id.slice(-3)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {order.status === "pending" && (
                        <div className="flex items-center bg-yellow-500 text-black px-2 py-1 rounded text-sm font-medium">
                          <Clock className="w-3 h-3 mr-1" />
                          {getTimeElapsed(order.createdAt)}
                        </div>
                      )}
                      {order.status === "ready" && (
                        <div className="flex items-center bg-green-500 text-white px-2 py-1 rounded text-sm font-medium">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Pedido pronto
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <ul className="text-gray-300 mb-4 space-y-1">
                    {order.items.map((item, index) => (
                      <li key={index} className="flex justify-between">
                        <span>• {item.name}</span>
                        {item.quantity > 1 && (
                          <span className="text-gray-400">x{item.quantity}</span>
                        )}
                      </li>
                    ))}
                  </ul>

                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-400">Total:</span>
                    <span className="text-white font-semibold">
                      R$ {order.total.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-400">Pagamento:</span>
                    <span className="text-white">{order.paymentMethod}</span>
                  </div>

                  {getStatusBadge(order.status)}
                </div>

                {getActionButton(order)}
              </div>
            </Card>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center text-gray-400 mt-12">
            <p className="text-xl">Nenhum pedido encontrado</p>
            <p className="mt-2">Os pedidos aparecerão aqui quando forem realizados</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffDashboard;