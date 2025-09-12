import { useNavigate } from "react-router-dom";
import { X, CreditCard, QrCode, Trash2, Check } from "lucide-react";
import SmartMenuButton from "@/components/SmartMenuButton";
import { useOrder } from "@/contexts/OrderContext";
import { PaymentMethod } from "@/types/menu";
import { toast } from "sonner";

const OrderReview = () => {
  const navigate = useNavigate();
  const { orderItems, paymentMethod, setPaymentMethod, getTotal, clearOrder, removeItem } = useOrder();

  const handlePaymentSelect = (method: PaymentMethod) => {
    setPaymentMethod(method);
  };

  const handleFinishOrder = () => {
    if (!paymentMethod) {
      toast.error("Selecione uma forma de pagamento");
      return;
    }
    
    toast.success("Pedido realizado com sucesso!");
    clearOrder();
    navigate("/");
  };

  if (orderItems.length === 0) {
    navigate("/menu");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/30">
      {/* Header elegante */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-lg border-b border-border/50">
        <div className="flex items-center justify-between p-6 max-w-2xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Seu Pedido</h1>
            <p className="text-muted-foreground text-sm">Revise antes de confirmar</p>
          </div>
          <button
            onClick={() => navigate("/menu")}
            className="p-2 rounded-full hover:bg-accent transition-colors"
          >
            <X className="w-6 h-6 text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-6 space-y-8">
        {/* Lista de itens do pedido */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Itens do Pedido</h2>
          {orderItems.map((item) => (
            <div key={item.id} className="bg-card rounded-2xl p-4 border border-border/50 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-muted rounded-xl overflow-hidden flex-shrink-0">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">IMG</span>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground text-base truncate">{item.name}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 mt-1">{item.description}</p>
                      {item.quantity > 1 && (
                        <p className="text-sm text-muted-foreground mt-1">Quantidade: {item.quantity}</p>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="font-bold text-primary text-lg">
                        R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-6 border border-border/50">
          <div className="flex justify-between items-center">
            <span className="text-xl font-semibold text-foreground">Total:</span>
            <span className="text-3xl font-bold text-primary">
              R$ {getTotal().toFixed(2).replace('.', ',')}
            </span>
          </div>
        </div>

        {/* Formas de pagamento */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Forma de Pagamento</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => handlePaymentSelect("PIX")}
              className={`relative p-6 rounded-2xl border-2 transition-all duration-200 ${
                paymentMethod === "PIX"
                  ? "border-primary bg-primary/5 shadow-lg"
                  : "border-border hover:border-primary/50 bg-card hover:bg-accent/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${
                  paymentMethod === "PIX" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  <QrCode className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-foreground">PIX</h3>
                  <p className="text-sm text-muted-foreground">Pagamento instantâneo</p>
                </div>
              </div>
              {paymentMethod === "PIX" && (
                <div className="absolute top-3 right-3">
                  <div className="bg-primary text-primary-foreground rounded-full p-1">
                    <Check className="w-4 h-4" />
                  </div>
                </div>
              )}
            </button>

            <button
              onClick={() => handlePaymentSelect("CARTAO")}
              className={`relative p-6 rounded-2xl border-2 transition-all duration-200 ${
                paymentMethod === "CARTAO"
                  ? "border-primary bg-primary/5 shadow-lg"
                  : "border-border hover:border-primary/50 bg-card hover:bg-accent/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${
                  paymentMethod === "CARTAO" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  <CreditCard className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-foreground">Cartão de Crédito</h3>
                  <p className="text-sm text-muted-foreground">Débito ou crédito</p>
                </div>
              </div>
              {paymentMethod === "CARTAO" && (
                <div className="absolute top-3 right-3">
                  <div className="bg-primary text-primary-foreground rounded-full p-1">
                    <Check className="w-4 h-4" />
                  </div>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Botão finalizar */}
        <div className="sticky bottom-6">
          <SmartMenuButton
            variant="primary"
            className="w-full py-4 text-lg font-semibold shadow-lg"
            onClick={handleFinishOrder}
            disabled={!paymentMethod}
          >
            {paymentMethod ? "Finalizar Pedido" : "Selecione uma forma de pagamento"}
          </SmartMenuButton>
        </div>
      </div>
    </div>
  );
};

export default OrderReview;