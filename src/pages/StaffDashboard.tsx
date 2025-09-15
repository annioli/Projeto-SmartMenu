import { useState } from "react";
import { useOrder } from "@/contexts/OrderContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, ArrowLeft, Trash2, ChefHat, Timer, Sparkles, TrendingUp } from "lucide-react";
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
        return (
          <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 text-black shadow-lg shadow-yellow-500/30 animate-pulse">
            <Timer className="w-3 h-3 mr-1" />
            Pendente
          </div>
        );
      case "preparing":
        return (
          <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white shadow-lg shadow-blue-500/30">
            <ChefHat className="w-3 h-3 mr-1" />
            Preparando
          </div>
        );
      case "ready":
        return (
          <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 text-white shadow-lg shadow-green-500/30 animate-pulse">
            <Sparkles className="w-3 h-3 mr-1" />
            Pronto
          </div>
        );
      case "completed":
        return (
          <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-lg shadow-gray-500/20">
            <CheckCircle className="w-3 h-3 mr-1" />
            Finalizado
          </div>
        );
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
            className="group w-full bg-gradient-to-r from-teal-600 via-emerald-600 to-green-600 hover:from-teal-500 hover:via-emerald-500 hover:to-green-500 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-500 transform hover:scale-105 shadow-2xl shadow-teal-500/40 hover:shadow-teal-400/60 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative flex items-center justify-center gap-2">
              <ChefHat className="w-5 h-5" />
              Iniciar Preparo
            </div>
          </button>
        );
      case "preparing":
        return (
          <button
            onClick={() => handleStatusChange(order.id, "ready")}
            className="group w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-500 transform hover:scale-105 shadow-2xl shadow-blue-500/40 hover:shadow-blue-400/60 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Finalizar
            </div>
          </button>
        );
      case "ready":
        return (
          <div className="flex gap-3">
            <button
              onClick={() => handleStatusChange(order.id, "preparing")}
              className="group flex-1 border-2 border-teal-500 bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 hover:text-teal-200 font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </button>
            <button
              onClick={() => handleStatusChange(order.id, "completed")}
              className="group border-2 border-red-500 bg-red-500/10 hover:bg-red-500/20 text-red-300 hover:text-red-200 font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent_50%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(220,38,38,0.3),transparent_50%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(168,85,247,0.2),transparent_50%)] pointer-events-none"></div>
      
      <div className="relative z-10 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8 animate-fade-in">
            <div className="text-center mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-purple-500/20 to-indigo-500/20 blur-3xl transform -rotate-6"></div>
              <div className="relative">
                <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-500 to-purple-600 mb-6 tracking-tight drop-shadow-2xl">
                  PEDIDOS
                </h1>
                <div className="flex justify-center items-center gap-2 mb-4">
                  <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-lg shadow-red-500/50"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/50">
                    <ChefHat className="w-4 h-4 text-white" />
                  </div>
                  <div className="w-16 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full shadow-lg shadow-purple-500/50"></div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center gap-6 mb-8">
              <button
                onClick={() => setFilter("recent")}
                className={`group relative px-8 py-4 font-bold text-sm uppercase tracking-wider rounded-2xl transition-all duration-500 transform hover:scale-110 overflow-hidden ${
                  filter === "recent"
                    ? "text-white scale-110"
                    : "text-red-400 hover:text-white"
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 transition-all duration-500 ${
                  filter === "recent" ? "opacity-100 scale-100" : "opacity-0 scale-95 group-hover:opacity-80 group-hover:scale-100"
                }`}></div>
                <div className="absolute inset-0 bg-slate-800/50 backdrop-blur-sm border border-red-500/30 rounded-2xl"></div>
                <div className="relative flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  MAIS RECENTES
                </div>
              </button>
              <button
                onClick={() => setFilter("all")}
                className={`group relative px-8 py-4 font-bold text-sm uppercase tracking-wider rounded-2xl transition-all duration-500 transform hover:scale-110 overflow-hidden ${
                  filter === "all"
                    ? "text-white scale-110"
                    : "text-red-400 hover:text-white"
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 transition-all duration-500 ${
                  filter === "all" ? "opacity-100 scale-100" : "opacity-0 scale-95 group-hover:opacity-80 group-hover:scale-100"
                }`}></div>
                <div className="absolute inset-0 bg-slate-800/50 backdrop-blur-sm border border-red-500/30 rounded-2xl"></div>
                <div className="relative flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  TODOS
                </div>
              </button>
            </div>

            <div className="text-center bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-2xl">
              <div className="flex justify-center items-center gap-6 text-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-slate-300">Total:</span>
                  <span className="text-white font-bold text-xl">{orders.length}</span>
                </div>
                <div className="w-px h-6 bg-slate-600"></div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-teal-500 rounded-full animate-pulse"></div>
                  <span className="text-slate-300">Visíveis:</span>
                  <span className="text-white font-bold text-xl">{filteredOrders.length}</span>
                </div>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredOrders.map((order, index) => (
              <div 
                key={order.id} 
                className="group relative animate-fade-in hover:scale-105 transition-all duration-500"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'both'
                }}
              >
                {/* Card glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-red-500/30 via-purple-500/30 to-blue-500/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                
                <div className="relative bg-gradient-to-br from-slate-800/90 via-slate-700/90 to-slate-800/90 backdrop-blur-xl rounded-3xl overflow-hidden border border-slate-600/50 shadow-2xl shadow-slate-900/50 group-hover:shadow-purple-500/20 transition-all duration-500">
                  <div className="p-6">
                    {/* Card header gradient */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500"></div>
                    
                    <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-slate-600/30 relative overflow-hidden">
                      {/* Inner glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 pointer-events-none"></div>
                      
                      <div className="relative">
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
                              <h3 className="text-white font-bold text-lg">Pedido</h3>
                            </div>
                            <p className="text-slate-300 font-semibold text-base bg-slate-800/50 rounded-lg px-3 py-1 inline-block">
                              {order.customer.name.toUpperCase()} - #{order.id.slice(-3)}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-3">
                            {order.status === "pending" && (
                              <div className="flex items-center bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 text-black px-4 py-2 rounded-xl text-sm font-bold shadow-2xl shadow-yellow-500/50 animate-pulse">
                                <Clock className="w-4 h-4 mr-2" />
                                {getTimeElapsed(order.createdAt)}
                              </div>
                            )}
                            {order.status === "ready" && (
                              <div className="flex items-center bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-2xl shadow-green-500/50 animate-bounce">
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Pedido pronto
                              </div>
                            )}
                            {getStatusBadge(order.status)}
                          </div>
                        </div>
                        
                        <div className="mb-6">
                          <h4 className="text-slate-400 text-sm font-medium mb-3 flex items-center gap-2">
                            <ChefHat className="w-4 h-4" />
                            Itens do pedido:
                          </h4>
                          <ul className="space-y-2">
                            {order.items.map((item, index) => (
                              <li key={index} className="group flex justify-between items-center text-slate-300 bg-gradient-to-r from-slate-800/80 to-slate-700/80 rounded-xl px-4 py-3 border border-slate-600/30 hover:from-slate-700/80 hover:to-slate-600/80 transition-all duration-300">
                                <span className="font-medium flex items-center gap-2">
                                  <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
                                  {item.name}
                                </span>
                                {item.quantity > 1 && (
                                  <span className="text-slate-200 bg-gradient-to-r from-purple-600 to-blue-600 px-3 py-1 rounded-lg text-xs font-bold shadow-lg">
                                    x{item.quantity}
                                  </span>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-4 mb-6">
                          <div className="flex justify-between items-center p-4 bg-gradient-to-r from-emerald-900/50 to-green-900/50 rounded-xl border border-green-500/30 shadow-lg">
                            <span className="text-green-300 font-medium flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                              Total:
                            </span>
                            <span className="text-white font-bold text-xl bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                              R$ {order.total.toFixed(2)}
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-900/50 to-indigo-900/50 rounded-xl border border-blue-500/30 shadow-lg">
                            <span className="text-blue-300 font-medium flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                              Pagamento:
                            </span>
                            <span className="text-white font-semibold">{order.paymentMethod}</span>
                          </div>
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
            <div className="text-center mt-20 animate-fade-in">
              <div className="relative bg-gradient-to-br from-slate-800/80 via-slate-700/80 to-slate-800/80 backdrop-blur-xl rounded-3xl p-16 border border-slate-600/30 shadow-2xl max-w-2xl mx-auto overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5"></div>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500"></div>
                
                <div className="relative">
                  <div className="text-8xl mb-8 animate-bounce">🍽️</div>
                  <h3 className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Nenhum pedido encontrado
                  </h3>
                  <div className="space-y-3 text-lg">
                    <p className="text-slate-300">
                      {filter === "recent" 
                        ? "🔄 Não há pedidos pendentes ou em preparo no momento" 
                        : "📋 Nenhum pedido foi realizado ainda"}
                    </p>
                    <p className="text-slate-400">✨ Os pedidos aparecerão aqui automaticamente</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;