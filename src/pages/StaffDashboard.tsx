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
  
  console.log("Staff Dashboard - All orders:", orders);

  const filteredOrders = orders.filter((order) => {
    if (filter === "recent") {
      return order.status === "pending" || order.status === "preparing";
    }
    return true;
  });
  
  console.log("Filtered orders:", filteredOrders);

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
          <button
            onClick={() => handleStatusChange(order.id, "preparing")}
            className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-teal-500/30"
          >
            Iniciar Preparo
          </button>
        );
      case "preparing":
        return (
          <button
            onClick={() => handleStatusChange(order.id, "ready")}
            className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-teal-500/30"
          >
            Finalizar
          </button>
        );
      case "ready":
        return (
          <div className="flex gap-3">
            <button
              onClick={() => handleStatusChange(order.id, "preparing")}
              className="flex-1 border-2 border-teal-600 text-teal-400 hover:bg-teal-500/10 font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </button>
            <button
              onClick={() => handleStatusChange(order.id, "completed")}
              className="border-2 border-red-500 text-red-400 hover:bg-red-500/10 font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        );
      case "completed":
        return null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              PEDIDOS
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto rounded-full shadow-lg shadow-red-500/30"></div>
          </div>
          
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => setFilter("recent")}
              className={`px-8 py-4 font-bold text-sm uppercase tracking-wider rounded-xl transition-all duration-300 transform hover:scale-105 ${
                filter === "recent"
                  ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/30 scale-105"
                  : "bg-slate-700/50 text-red-400 border border-red-500/30 hover:bg-red-500/10 backdrop-blur-sm"
              }`}
            >
              MAIS RECENTES
            </button>
            <button
              onClick={() => setFilter("all")}
              className={`px-8 py-4 font-bold text-sm uppercase tracking-wider rounded-xl transition-all duration-300 transform hover:scale-105 ${
                filter === "all"
                  ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/30 scale-105"
                  : "bg-slate-700/50 text-red-400 border border-red-500/30 hover:bg-red-500/10 backdrop-blur-sm"
              }`}
            >
              TODOS
            </button>
          </div>

          <div className="text-center">
            <p className="text-slate-400 text-lg">
              Total de pedidos: <span className="text-white font-semibold">{orders.length}</span>
            </p>
            <p className="text-slate-400">
              Filtrados: <span className="text-white font-semibold">{filteredOrders.length}</span>
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredOrders.map((order, index) => (
            <div 
              key={order.id} 
              className="animate-fade-in hover-scale group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl overflow-hidden border border-slate-600/50 shadow-xl shadow-slate-900/50 backdrop-blur-sm group-hover:shadow-2xl group-hover:shadow-slate-900/70 transition-all duration-300">
                <div className="p-6">
                  <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-5 mb-6 border border-slate-600/30">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-white font-bold text-lg mb-1">Pedido</h3>
                        <p className="text-slate-300 font-semibold text-base">
                          {order.customer.name.toUpperCase()} - #{order.id.slice(-3)}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {order.status === "pending" && (
                          <div className="flex items-center bg-gradient-to-r from-yellow-500 to-amber-500 text-black px-3 py-1.5 rounded-lg text-sm font-bold shadow-lg shadow-yellow-500/30">
                            <Clock className="w-4 h-4 mr-1.5" />
                            {getTimeElapsed(order.createdAt)}
                          </div>
                        )}
                        {order.status === "ready" && (
                          <div className="flex items-center bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-lg shadow-green-500/30 animate-pulse">
                            <CheckCircle className="w-4 h-4 mr-1.5" />
                            Pedido pronto
                          </div>
                        )}
                        {getStatusBadge(order.status)}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-slate-400 text-sm font-medium mb-2">Itens:</h4>
                      <ul className="space-y-1">
                        {order.items.map((item, index) => (
                          <li key={index} className="flex justify-between items-center text-slate-300 bg-slate-800/50 rounded-lg px-3 py-2">
                            <span className="font-medium">• {item.name}</span>
                            {item.quantity > 1 && (
                              <span className="text-slate-400 bg-slate-700 px-2 py-1 rounded text-xs font-bold">
                                x{item.quantity}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                        <span className="text-slate-400 font-medium">Total:</span>
                        <span className="text-white font-bold text-lg">
                          R$ {order.total.toFixed(2)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                        <span className="text-slate-400 font-medium">Pagamento:</span>
                        <span className="text-white font-semibold">{order.paymentMethod}</span>
                      </div>
                    </div>
                  </div>

                  {getActionButton(order)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center mt-16 animate-fade-in">
            <div className="bg-slate-800/50 rounded-2xl p-12 border border-slate-600/30 backdrop-blur-sm">
              <div className="text-6xl mb-6">🍽️</div>
              <h3 className="text-2xl font-bold text-white mb-4">Nenhum pedido encontrado</h3>
              <p className="text-slate-400 text-lg mb-2">
                {filter === "recent" 
                  ? "Não há pedidos pendentes ou em preparo no momento" 
                  : "Nenhum pedido foi realizado ainda"}
              </p>
              <p className="text-slate-500">Os pedidos aparecerão aqui automaticamente</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffDashboard;