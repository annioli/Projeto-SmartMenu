import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, CreditCard, QrCode, Trash2, Check } from "lucide-react";
import SmartMenuButton from "@/components/SmartMenuButton";
import { useOrder } from "@/contexts/OrderContext";
import { PaymentMethod } from "@/types/menu";
import { PaymentForm, PaymentFormData } from "@/components/PaymentForm";
import { toast } from "sonner";

const OrderReview = () => {
  const navigate = useNavigate();
  const { orderItems, paymentMethod, setPaymentMethod, getTotal, clearOrder, removeItem, submitOrder } = useOrder();
  const [paymentData, setPaymentData] = useState<PaymentFormData>({});
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const handlePaymentSelect = (method: PaymentMethod) => {
    setPaymentMethod(method);
    setShowPaymentForm(false);
  };

  const handlePaymentDataChange = (data: PaymentFormData) => {
    setPaymentData(data);
  };

  const handleFinishOrder = () => {
    if (!paymentMethod) {
      toast.error("Selecione uma forma de pagamento");
      return;
    }
    
    if (!showPaymentForm) {
      setShowPaymentForm(true);
      return;
    }
    
    submitOrder();
    toast.success("Pedido realizado com sucesso!");
    navigate("/");
  };

  if (orderItems.length === 0) {
    return null; // Don't navigate immediately, let the user see the page
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header elegante */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-lg border-b border-border/50">
        <div className="flex items-center justify-between p-6 max-w-2xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {showPaymentForm ? "FINALIZE SEU PAGAMENTO" : "SEU PEDIDO"}
            </h1>
            <p className="text-muted-foreground text-sm">REVISE ANTES DE CONFIRMAR</p>
          </div>
          <button
            onClick={() => showPaymentForm ? setShowPaymentForm(false) : navigate("/menu")}
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

        {!showPaymentForm && (
          <>
            {/* Total */}
            <div className="text-center space-y-2 mb-8">
              <span className="text-lg font-semibold text-foreground">TOTAL:</span>
              <div className="text-4xl font-bold text-foreground">
                R$ {getTotal().toFixed(2).replace('.', ',')}
              </div>
            </div>

            {/* Formas de pagamento */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => handlePaymentSelect("PIX")}
                  className={`relative p-8 rounded-3xl border-2 transition-all duration-200 ${
                    paymentMethod === "PIX"
                      ? "bg-gradient-to-br from-primary to-primary/80 border-primary text-white"
                      : "bg-gradient-to-br from-primary to-primary/80 border-primary/50 hover:border-primary text-white"
                  }`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="p-3 rounded-xl bg-white/20">
                      <QrCode className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-xl">PIX</h3>
                  </div>
                </button>

                <button
                  onClick={() => handlePaymentSelect("CARTAO")}
                  className={`relative p-8 rounded-3xl border-2 transition-all duration-200 ${
                    paymentMethod === "CARTAO"
                      ? "bg-gradient-to-br from-primary to-primary/80 border-primary text-white"
                      : "bg-gradient-to-br from-primary to-primary/80 border-primary/50 hover:border-primary text-white"
                  }`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="p-3 rounded-xl bg-white/20">
                      <CreditCard className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-xl">CARTÃO DE</h3>
                    <h3 className="font-bold text-xl -mt-2">CRÉDITO</h3>
                  </div>
                </button>
              </div>
            </div>

            {/* Botão de ação */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <SmartMenuButton
                variant="secondary"
                className="py-4 text-lg font-bold"
                onClick={() => navigate("/menu")}
              >
                VOLTAR
              </SmartMenuButton>
              <SmartMenuButton
                variant="primary"
                className="py-4 text-lg font-bold"
                onClick={handleFinishOrder}
                disabled={!paymentMethod}
              >
                FINALIZAR PEDIDO
              </SmartMenuButton>
            </div>
          </>
        )}

        {/* Formulário de pagamento */}
        {showPaymentForm && paymentMethod && (
          <PaymentForm
            paymentMethod={paymentMethod}
            onPaymentDataChange={handlePaymentDataChange}
            onSubmit={handleFinishOrder}
          />
        )}
      </div>
    </div>
  );
};

export default OrderReview;