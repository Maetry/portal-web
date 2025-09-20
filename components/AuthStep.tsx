import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ArrowLeft, Phone, User } from "lucide-react";

interface AuthStepProps {
  onAuth: (userData: { name: string; phone: string }) => void;
  onBack: () => void;
}

export function AuthStep({ onAuth, onBack }: AuthStepProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    
    setIsSubmitting(true);
    // Имитация API запроса
    await new Promise(resolve => setTimeout(resolve, 1000));
    onAuth({ name: name.trim(), phone: phone.trim() });
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h2>Ваши данные</h2>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Имя
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Введите ваше имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Телефон
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+7 (___) ___-__-__"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={!name.trim() || !phone.trim() || isSubmitting}
          >
            {isSubmitting ? "Записываемся..." : "Записаться"}
          </Button>
        </form>
      </Card>

      <div className="mt-4 text-center text-sm text-muted-foreground">
        Нажимая "Записаться", вы соглашаетесь с условиями обработки персональных данных
      </div>
    </div>
  );
}