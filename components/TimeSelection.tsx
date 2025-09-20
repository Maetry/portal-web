import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowLeft, Calendar } from "lucide-react";
import { Service } from "./ServiceSelection";
import { Master } from "./MasterSelection";

interface TimeSlot {
  time: string;
  available: boolean;
}

interface TimeSelectionProps {
  service: Service;
  master: Master;
  onTimeSelect: (date: string, time: string) => void;
  onBack: () => void;
}

export function TimeSelection({ service, master, onTimeSelect, onBack }: TimeSelectionProps) {
  const [selectedDate, setSelectedDate] = useState<string>("2024-12-20");
  
  // Моковые данные для слотов времени
  const timeSlots: TimeSlot[] = [
    { time: "10:00", available: true },
    { time: "10:30", available: false },
    { time: "11:00", available: true },
    { time: "11:30", available: true },
    { time: "12:00", available: false },
    { time: "12:30", available: true },
    { time: "13:00", available: true },
    { time: "13:30", available: false },
    { time: "14:00", available: true },
    { time: "14:30", available: true },
    { time: "15:00", available: true },
    { time: "15:30", available: false },
    { time: "16:00", available: true },
    { time: "16:30", available: true },
  ];

  const dates = [
    { date: "2024-12-20", label: "Сегодня", day: "Пт" },
    { date: "2024-12-21", label: "Завтра", day: "Сб" },
    { date: "2024-12-22", label: "22 дек", day: "Вс" },
    { date: "2024-12-23", label: "23 дек", day: "Пн" },
    { date: "2024-12-24", label: "24 дек", day: "Вт" },
  ];

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h2>Выбор времени</h2>
          <p className="text-muted-foreground">{service.name} • {master.name}</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5" />
          <span>Дата</span>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2">
          {dates.map((dateInfo) => (
            <Button
              key={dateInfo.date}
              variant={selectedDate === dateInfo.date ? "default" : "outline"}
              className="flex-none min-w-[80px] flex-col h-auto py-3"
              onClick={() => setSelectedDate(dateInfo.date)}
            >
              <span className="text-xs">{dateInfo.day}</span>
              <span>{dateInfo.label}</span>
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4">Доступное время</h3>
        
        <div className="grid grid-cols-3 gap-3">
          {timeSlots.map((slot) => (
            <Button
              key={slot.time}
              variant="outline"
              disabled={!slot.available}
              className="h-12"
              onClick={() => slot.available && onTimeSelect(selectedDate, slot.time)}
            >
              {slot.time}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}