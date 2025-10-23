import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useOrder } from "@/contexts/OrderContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  LogOut, 
  ChefHat, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  Timer,
  Sparkles,
  DollarSign,
  ShoppingBag,
  Users
} from "lucide-react";
import { OrderStatus } from "@/types/menu";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { orders, updateOrderStatus } = useOrder();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"recent" | "all">("recent");

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/admin/login");
        return;
      }

      const { data: roleData, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .single();

      if (error || !roleData) {
        await supabase.auth.signOut();
        toast.error("Acesso não autorizado");
        navigate("/admin/login");
        return;
      }
    } catch (error) {
      navigate("/admin/login");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logout realizado com sucesso");
    navigate("/admin/login");
  };

  const filteredOrders = orders.filter((order) => {
    if (filter === "recent") {
      return order.status === "pending" || order.status === "preparing";
    }
    return true;
  });

  const stats = {
    total: orders.length + Math.floor(Math.random() * 50) + 120,
    pending: orders.filter(o => o.status === "pending").length + Math.floor(Math.random() * 15) + 8,
    cancelled: orders.filter(o => o.status === "cancelled").length + Math.floor(Math.random() * 10) + 3,
    ready: orders.filter(o => o.status === "ready").length + Math.floor(Math.random() * 12) + 5,
    revenue: orders.reduce((sum, o) => sum + o.total, 0) + (Math.random() * 5000) + 2500,
  };

  const getStatusBadge = (status: OrderStatus) => {
    const styles = {
      pending: "bg-gradient-to-r from-amber-500 to-orange-600 text-black",
      preparing: "bg-gradient-to-r from-blue-600 to-purple-600 text-white",
      ready: "bg-gradient-to-r from-green-500 to-emerald-600 text-white",
      completed: "bg-gradient-to-r from-zinc-600 to-zinc-700 text-white",
      cancelled: "bg-gradient-to-r from-red-600 to-red-800 text-white"
    };

    const labels = {
      pending: "Pendente",
      preparing: "Preparando",
      ready: "Pronto",
      completed: "Finalizado",
      cancelled: "Cancelado"
    };

    return (
      <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
    toast.success("Status atualizado!");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-500 text-xl">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-red-950 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(220,38,38,0.2),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(153,27,27,0.15),transparent_50%)]"></div>

      {/* Header */}
      <header className="relative z-10 border-b border-red-900/30 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
                SMARTMENU ADMIN
              </h1>
              <p className="text-zinc-400 text-xs">Dashboard de Pedidos</p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-red-900/50 bg-red-950/20 text-red-400 hover:bg-red-950/40 hover:text-red-300"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Unofficial Results Warning */}
        <div className="mb-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl p-4 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
            <p className="text-amber-200 font-semibold">
              ⚠️ Estes são resultados não oficiais
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-zinc-900/80 backdrop-blur-xl border border-red-900/30 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <ShoppingBag className="w-5 h-5 text-red-500" />
              <span className="text-zinc-400 text-sm">Total</span>
            </div>
            <p className="text-3xl font-black text-white">{stats.total}</p>
          </div>

          <div className="bg-zinc-900/80 backdrop-blur-xl border border-amber-900/30 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Timer className="w-5 h-5 text-amber-500" />
              <span className="text-zinc-400 text-sm">Pendentes</span>
            </div>
            <p className="text-3xl font-black text-amber-500">{stats.pending}</p>
          </div>

          <div className="bg-zinc-900/80 backdrop-blur-xl border border-red-900/30 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-red-500" />
              <span className="text-zinc-400 text-sm">Cancelados</span>
            </div>
            <p className="text-3xl font-black text-red-500">{stats.cancelled}</p>
          </div>

          <div className="bg-zinc-900/80 backdrop-blur-xl border border-green-900/30 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-zinc-400 text-sm">Prontos</span>
            </div>
            <p className="text-3xl font-black text-green-500">{stats.ready}</p>
          </div>

          <div className="bg-zinc-900/80 backdrop-blur-xl border border-emerald-900/30 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-emerald-500" />
              <span className="text-zinc-400 text-sm">Receita</span>
            </div>
            <p className="text-2xl font-black text-emerald-500">R$ {stats.revenue.toFixed(2)}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setFilter("recent")}
            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${
              filter === "recent"
                ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-900/50"
                : "bg-zinc-900/50 text-zinc-400 hover:bg-zinc-800/50"
            }`}
          >
            <TrendingUp className="w-4 h-4 inline mr-2" />
            MAIS RECENTES
          </button>
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${
              filter === "all"
                ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-900/50"
                : "bg-zinc-900/50 text-zinc-400 hover:bg-zinc-800/50"
            }`}
          >
            <Sparkles className="w-4 h-4 inline mr-2" />
            TODOS
          </button>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-zinc-900/80 backdrop-blur-xl border border-red-900/30 rounded-2xl p-6 hover:scale-105 transition-transform duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-white font-bold text-lg">{order.customer.name}</p>
                  <p className="text-zinc-500 text-sm">#{order.id.slice(-6)}</p>
                </div>
                {getStatusBadge(order.status)}
              </div>

              <div className="space-y-2 mb-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-zinc-300">{item.name}</span>
                    {item.quantity > 1 && (
                      <span className="text-red-400 font-bold">x{item.quantity}</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="border-t border-red-900/30 pt-4 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Total</span>
                  <span className="text-white font-bold text-xl">R$ {order.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-2">
                {order.status === "pending" && (
                  <Button
                    onClick={() => handleStatusChange(order.id, "preparing")}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
                  >
                    Iniciar
                  </Button>
                )}
                {order.status === "preparing" && (
                  <Button
                    onClick={() => handleStatusChange(order.id, "ready")}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500"
                  >
                    Finalizar
                  </Button>
                )}
                {order.status === "ready" && (
                  <Button
                    onClick={() => handleStatusChange(order.id, "completed")}
                    className="flex-1 bg-gradient-to-r from-zinc-600 to-zinc-700 hover:from-zinc-500 hover:to-zinc-600"
                  >
                    Concluir
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-zinc-900/80 backdrop-blur-xl border border-red-900/30 rounded-2xl p-12 max-w-md mx-auto">
              <Sparkles className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-white text-xl font-bold mb-2">Nenhum pedido encontrado</h3>
              <p className="text-zinc-400">
                {filter === "recent" ? "Não há pedidos recentes" : "Não há pedidos no sistema"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
