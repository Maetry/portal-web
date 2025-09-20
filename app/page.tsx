'use client'

import { useState } from "react";
import { ServiceSelection, Service } from "../components/ServiceSelection";
import { MasterSelection, Master } from "../components/MasterSelection";
import { TimeSelection } from "../components/TimeSelection";
import { AuthStep } from "../components/AuthStep";
import { BookingConfirmation } from "../components/BookingConfirmation";

type Step = 'services' | 'masters' | 'time' | 'auth' | 'confirmation';

interface BookingState {
  service?: Service;
  master?: Master;
  date?: string;
  time?: string;
  userData?: { name: string; phone: string };
}

export default function HomePage() {
  const [currentStep, setCurrentStep] = useState<Step>('services');
  const [bookingState, setBookingState] = useState<BookingState>({});

  // Моковые данные услуг
  const services: Service[] = [
    {
      id: '1',
      name: 'Маникюр наращивание',
      duration: 80,
      price: 2000,
      icon: '#ff6b6b',
      masters: ['1', '2']
    },
    {
      id: '2', 
      name: 'Японский маникюр',
      duration: 90,
      price: 4000,
      icon: '#ff6b6b',
      masters: ['1', '3']
    },
    {
      id: '3',
      name: 'Ремонт ногтя',
      duration: 15,
      price: 300,
      icon: '#ff6b6b',
      masters: ['2', '3']
    },
    {
      id: '4',
      name: 'Классический педикюр',
      duration: 90,
      price: 2500,
      icon: '#ff6b6b',
      masters: ['1', '2', '3']
    }
  ];

  // Моковые данные мастеров
  const masters: Master[] = [
    {
      id: '1',
      name: 'Анна Иванова',
      rating: 4.9,
      experience: '5 лет опыта',
      services: ['1', '2', '4']
    },
    {
      id: '2',
      name: 'Мария Петрова', 
      rating: 4.8,
      experience: '3 года опыта',
      services: ['1', '3', '4']
    },
    {
      id: '3',
      name: 'Елена Сидорова',
      rating: 4.7,
      experience: '7 лет опыта',
      services: ['2', '3', '4']
    }
  ];

  const handleServiceSelect = (service: Service) => {
    setBookingState(prev => ({ ...prev, service }));
    setCurrentStep('masters');
  };

  const handleMasterSelect = (master: Master) => {
    setBookingState(prev => ({ ...prev, master }));
    setCurrentStep('time');
  };

  const handleTimeSelect = (date: string, time: string) => {
    setBookingState(prev => ({ ...prev, date, time }));
    setCurrentStep('auth');
  };

  const handleAuth = (userData: { name: string; phone: string }) => {
    setBookingState(prev => ({ ...prev, userData }));
    setCurrentStep('confirmation');
  };

  const handleAddToCalendar = () => {
    if (!bookingState.service || !bookingState.date || !bookingState.time) return;
    
    const startDate = new Date(`${bookingState.date}T${bookingState.time}:00`);
    const endDate = new Date(startDate.getTime() + bookingState.service.duration * 60000);
    
    const event = {
      title: bookingState.service.name,
      start: startDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
      end: endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
      details: `Мастер: ${bookingState.master?.name}`
    };

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start}/${event.end}&details=${encodeURIComponent(event.details)}`;
    
    window.open(googleCalendarUrl, '_blank');
  };

  const handleNewBooking = () => {
    setBookingState({});
    setCurrentStep('services');
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'masters':
        setCurrentStep('services');
        break;
      case 'time':
        setCurrentStep('masters');
        break;
      case 'auth':
        setCurrentStep('time');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {currentStep === 'services' && (
        <ServiceSelection
          services={services}
          onServiceSelect={handleServiceSelect}
        />
      )}

      {currentStep === 'masters' && bookingState.service && (
        <MasterSelection
          service={bookingState.service}
          masters={masters}
          onMasterSelect={handleMasterSelect}
          onBack={handleBack}
        />
      )}

      {currentStep === 'time' && bookingState.service && bookingState.master && (
        <TimeSelection
          service={bookingState.service}
          master={bookingState.master}
          onTimeSelect={handleTimeSelect}
          onBack={handleBack}
        />
      )}

      {currentStep === 'auth' && (
        <AuthStep
          onAuth={handleAuth}
          onBack={handleBack}
        />
      )}

      {currentStep === 'confirmation' && bookingState.service && bookingState.master && bookingState.date && bookingState.time && bookingState.userData && (
        <BookingConfirmation
          booking={{
            service: bookingState.service,
            master: bookingState.master,
            date: bookingState.date,
            time: bookingState.time,
            userData: bookingState.userData
          }}
          onAddToCalendar={handleAddToCalendar}
          onNewBooking={handleNewBooking}
        />
      )}
    </div>
  );
}
