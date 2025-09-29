import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, CreditCard, Eye, EyeOff } from "lucide-react";
import { PaymentMethod } from "@/types/menu";

interface PaymentFormProps {
  paymentMethod: PaymentMethod;
  onPaymentDataChange: (data: PaymentFormData) => void;
  onSubmit: () => void;
}

export interface PaymentFormData {
  pix?: {
    cpf: string;
    email: string;
  };
  card?: {
    number: string;
    name: string;
    expiry: string;
    cvv: string;
  };
}

export const PaymentForm = ({ paymentMethod, onPaymentDataChange, onSubmit }: PaymentFormProps) => {
  const [pixData, setPixData] = useState({ cpf: "", email: "" });
  const [cardData, setCardData] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [showCvv, setShowCvv] = useState(false);

  const handlePixChange = (field: string, value: string) => {
    const newPixData = { ...pixData, [field]: value };
    setPixData(newPixData);
    onPaymentDataChange({ pix: newPixData });
  };

  const handleCardChange = (field: string, value: string) => {
    let formattedValue = value;
    
    // Format card number
    if (field === 'number') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').trim();
      if (formattedValue.length > 19) formattedValue = formattedValue.slice(0, 19);
    }
    
    // Format expiry
    if (field === 'expiry') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      if (formattedValue.length > 5) formattedValue = formattedValue.slice(0, 5);
    }
    
    // Format CVV
    if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 4) formattedValue = formattedValue.slice(0, 4);
    }
    
    const newCardData = { ...cardData, [field]: formattedValue };
    setCardData(newCardData);
    onPaymentDataChange({ card: newCardData });
  };

  const isFormValid = () => {
    if (paymentMethod === "PIX") {
      return pixData.cpf.length >= 11 && pixData.email.includes("@");
    } else {
      return cardData.number.replace(/\s/g, '').length >= 16 && 
             cardData.name.length >= 2 && 
             cardData.expiry.length === 5 && 
             cardData.cvv.length >= 3;
    }
  };

  if (paymentMethod === "PIX") {
    return (
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <QrCode className="w-5 h-5 text-primary" />
            Dados PIX
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cpf" className="text-foreground">CPF</Label>
            <Input
              id="cpf"
              placeholder="000.000.000-00"
              value={pixData.cpf}
              onChange={(e) => handlePixChange('cpf', e.target.value)}
              className="bg-input border-border text-foreground"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={pixData.email}
              onChange={(e) => handlePixChange('email', e.target.value)}
              className="bg-input border-border text-foreground"
            />
          </div>
          <Button 
            onClick={onSubmit}
            disabled={!isFormValid()}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            FINALIZAR PEDIDO
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/50 border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <CreditCard className="w-5 h-5 text-primary" />
          Dados do Cartão
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="cardNumber" className="text-foreground">Número do Cartão</Label>
          <Input
            id="cardNumber"
            placeholder="0000 0000 0000 0000"
            value={cardData.number}
            onChange={(e) => handleCardChange('number', e.target.value)}
            className="bg-input border-border text-foreground"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cardName" className="text-foreground">Nome no Cartão</Label>
          <Input
            id="cardName"
            placeholder="NOME COMPLETO"
            value={cardData.name}
            onChange={(e) => handleCardChange('name', e.target.value.toUpperCase())}
            className="bg-input border-border text-foreground"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expiry" className="text-foreground">Validade</Label>
            <Input
              id="expiry"
              placeholder="MM/AA"
              value={cardData.expiry}
              onChange={(e) => handleCardChange('expiry', e.target.value)}
              className="bg-input border-border text-foreground"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cvv" className="text-foreground">CVV</Label>
            <div className="relative">
              <Input
                id="cvv"
                type={showCvv ? "text" : "password"}
                placeholder="000"
                value={cardData.cvv}
                onChange={(e) => handleCardChange('cvv', e.target.value)}
                className="bg-input border-border text-foreground pr-10"
              />
              <button
                type="button"
                onClick={() => setShowCvv(!showCvv)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showCvv ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
        <Button 
          onClick={onSubmit}
          disabled={!isFormValid()}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          FINALIZAR PEDIDO
        </Button>
      </CardContent>
    </Card>
  );
};