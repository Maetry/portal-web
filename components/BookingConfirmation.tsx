import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Check, Calendar, Clock, User, Phone, CalendarPlus } from "lucide-react";
import { Service } from "./ServiceSelection";
import { Master } from "./MasterSelection";

interface BookingData {
  service: Service;
  master: Master;
  date: string;
  time: string;
  userData: { name: string; phone: string };
}

interface BookingConfirmationProps {
  booking: BookingData;
  onAddToCalendar: () => void;
  onNewBooking: () => void;
}

export function BookingConfirmation({ booking, onAddToCalendar, onNewBooking }: BookingConfirmationProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('ru', { 
      day: 'numeric', 
      month: 'long',
      weekday: 'long'
    }).format(date);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="mb-2">Запись подтверждена!</h2>
        <p className="text-muted-foreground">
          Вы записаны на {booking.service.name.toLowerCase()}
        </p>
      </div>

      <Card className="p-6 mb-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-muted-foreground">Дата и время</p>
              <p>{formatDate(booking.date)}, {booking.time}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-muted-foreground">Продолжительность</p>
              <p>{booking.service.duration} минут</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Avatar className="w-5 h-5">
              <AvatarImage src={booking.master.avatar} />
              <AvatarFallback className="text-xs">
                {booking.master.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-muted-foreground">Мастер</p>
              <p>{booking.master.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-muted-foreground">Клиент</p>
              <p>{booking.userData.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-muted-foreground">Телефон</p>
              <p>{booking.userData.phone}</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span>Стоимость:</span>
              <span>{booking.service.price}₽</span>
            </div>
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        <Button 
          onClick={onAddToCalendar}
          variant="outline" 
          className="w-full flex items-center gap-2"
        >
          <CalendarPlus className="w-4 h-4" />
          Добавить в календарь
        </Button>
        
        <Button 
          onClick={onNewBooking}
          className="w-full"
        >
          Записаться еще раз
        </Button>
      </div>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        Если вам нужно изменить или отменить запись, позвоните нам или напишите в WhatsApp
      </div>
    </div>
  );
}