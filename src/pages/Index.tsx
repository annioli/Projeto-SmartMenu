import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redireciona automaticamente para a tela de cadastro do cliente
    navigate("/customer");
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <p className="text-xl text-muted-foreground">Carregando SmartMenu...</p>
      </div>
    </div>
  );
};

export default Index;
