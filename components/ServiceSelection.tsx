import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
  icon: string;
  masters: string[];
}

interface ServiceSelectionProps {
  services: Service[];
  onServiceSelect: (service: Service) => void;
}

export function ServiceSelection({ services, onServiceSelect }: ServiceSelectionProps) {
  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h2>Услуги</h2>
        <Button variant="ghost" className="text-blue-500">
          Показать все
        </Button>
      </div>
      
      <div className="space-y-3">
        {services.map((service) => (
          <Card 
            key={service.id} 
            className="p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onServiceSelect(service)}
          >
            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: service.icon }}
              >
                <div className="w-6 h-6 bg-white/20 rounded-full"></div>
              </div>
              
              <div className="flex-1">
                <h3 className="mb-1">{service.name}</h3>
                <p className="text-muted-foreground">
                  от {service.duration} мин | от {service.price}₽
                </p>
              </div>
              
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}