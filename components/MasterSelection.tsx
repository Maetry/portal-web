import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ArrowLeft, Star } from "lucide-react";
import { Service } from "./ServiceSelection";

export interface Master {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  experience: string;
  services: string[];
}

interface MasterSelectionProps {
  service: Service;
  masters: Master[];
  onMasterSelect: (master: Master) => void;
  onBack: () => void;
}

export function MasterSelection({ service, masters, onMasterSelect, onBack }: MasterSelectionProps) {
  const availableMasters = masters.filter(master => 
    service.masters.includes(master.id)
  );

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h2>Выбор мастера</h2>
          <p className="text-muted-foreground">{service.name}</p>
        </div>
      </div>

      <div className="space-y-3">
        {availableMasters.map((master) => (
          <Card 
            key={master.id}
            className="p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onMasterSelect(master)}
          >
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={master.avatar} />
                <AvatarFallback>
                  {master.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h3 className="mb-1">{master.name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{master.rating}</span>
                  </div>
                  <span>•</span>
                  <span>{master.experience}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}