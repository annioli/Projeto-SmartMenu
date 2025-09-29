import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import SmartMenuLogo from "@/components/SmartMenuLogo";
import SmartMenuButton from "@/components/SmartMenuButton";
import { useOrder } from "@/contexts/OrderContext";

const CustomerName = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { setCustomer } = useOrder();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setCustomer({ name: name.trim() });
      navigate("/menu");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header com gradiente vermelho aprimorado */}
      <div className="bg-gradient-to-br from-primary via-primary to-primary/90 pt-16 pb-12 px-6 shadow-2xl">
        <SmartMenuLogo />
      </div>

      <div className="px-6 py-12">
        <div className="max-w-md mx-auto">
          <h2 className="text-4xl font-bold text-center mb-2 text-foreground">
            FAÇA SEU PEDIDO
          </h2>
          <p className="text-lg text-center text-muted-foreground mb-12">
            Realize seu pedido
          </p>

          <form onSubmit={handleSubmit}>
            <div className="bg-gradient-to-br from-secondary via-secondary/95 to-primary rounded-3xl p-8 mb-12 shadow-2xl border border-border/20">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                Realizar Pedido:
              </h3>
              
              <div className="mb-6">
                <label className="block text-lg text-white mb-4 font-medium">
                  Nome do cliente:
                </label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white text-gray-800 text-lg p-6 rounded-2xl border-0 shadow-lg focus:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                  placeholder="Digite seu nome"
                  required
                />
              </div>
            </div>

            <div className="text-center">
              <SmartMenuButton
                type="submit"
                variant="primary"
                className="w-64 text-xl py-4"
                disabled={!name.trim()}
              >
                CONTINUAR
              </SmartMenuButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerName;