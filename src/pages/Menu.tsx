import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SmartMenuLogo from "@/components/SmartMenuLogo";
import SmartMenuButton from "@/components/SmartMenuButton";
import { menuItems, categories } from "@/data/menuItems";
import { useOrder } from "@/contexts/OrderContext";
import { Badge } from "@/components/ui/badge";

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("LANCHES");
  const navigate = useNavigate();
  const { addItem, orderItems } = useOrder();

  const filteredItems = menuItems.filter(item => item.category === selectedCategory);

  const handleAddToOrder = (item: any) => {
    addItem({ ...item, quantity: 1 });
  };

  const getTotalItems = () => {
    return orderItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header com gradiente vermelho aprimorado */}
      <div className="bg-gradient-to-br from-primary via-primary to-primary/90 pt-12 pb-8 px-6 shadow-2xl">
        <SmartMenuLogo />
      </div>

      <div className="px-6 py-8">
        {/* Botões de categoria com design melhorado */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {categories.map((category) => (
            <SmartMenuButton
              key={category}
              variant={selectedCategory === category ? "category-active" : "category"}
              className="text-base px-8 py-4 min-w-[120px]"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </SmartMenuButton>
          ))}
        </div>

        {/* Lista de produtos com cards melhorados */}
        <div className="space-y-8 max-w-2xl mx-auto">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-card rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] border border-border/50">
              {item.image && (
                <div className="h-52 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-foreground">
                    {item.name}
                  </h3>
                  <div className="bg-gradient-to-r from-accent to-accent/90 text-accent-foreground text-xl font-bold px-4 py-2 rounded-2xl shadow-lg">
                    R$ {item.price.toFixed(2).replace('.', ',')}
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-8 text-base leading-relaxed">
                  {item.description}
                </p>
                
                <SmartMenuButton
                  variant="primary"
                  className="w-full text-lg py-4"
                  onClick={() => handleAddToOrder(item)}
                >
                  + ADICIONAR PEDIDO
                </SmartMenuButton>
              </div>
            </div>
          ))}
        </div>

        {/* Botão Ver Pedidos - fixo na parte inferior melhorado */}
        {getTotalItems() > 0 && (
          <div className="fixed bottom-8 right-8 z-50">
            <div className="relative">
              <SmartMenuButton
                variant="floating"
                className="rounded-full text-lg px-8 py-4 shadow-2xl"
                onClick={() => navigate("/order")}
              >
                VER PEDIDOS
              </SmartMenuButton>
              {getTotalItems() > 0 && (
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center text-base font-bold shadow-lg animate-bounce">
                  {getTotalItems()}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;