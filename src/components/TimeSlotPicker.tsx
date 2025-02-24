import React, { useState, useEffect } from 'react';
import { format, addDays, startOfDay, eachHourOfInterval } from 'date-fns';
import { fr } from 'date-fns/locale';

interface TimeSlot {
  id: string;
  startTime: Date;
  endTime: Date;
  available: boolean;
}

interface TimeSlotPickerProps {
  onSelectSlot: (slot: TimeSlot) => void;
  selectedDate?: Date;
  excludedTimes?: Date[];
  minTime?: number; // Heure minimale (0-23)
  maxTime?: number; // Heure maximale (0-23)
}

const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  onSelectSlot,
  selectedDate = new Date(),
  excludedTimes = [],
  minTime = 9,
  maxTime = 18
}) => {
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState(startOfDay(selectedDate));

  useEffect(() => {
    fetchAvailableSlots();
  }, [currentDate]);

  const fetchAvailableSlots = async () => {
    try {
      // Simuler un appel API pour récupérer les créneaux disponibles
      const response = await fetch(`/api/time-slots?date=${currentDate.toISOString()}`, {
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setAvailableSlots(data);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des créneaux:', error);
    }
  };

  const generateTimeSlots = () => {
    const slots: TimeSlot[] = [];
    const hours = eachHourOfInterval({
      start: new Date(currentDate.setHours(minTime)),
      end: new Date(currentDate.setHours(maxTime))
    });

    hours.forEach((hour, index) => {
      if (index < hours.length - 1) {
        const startTime = new Date(hour);
        const endTime = new Date(hours[index + 1]);
        
        const isExcluded = excludedTimes.some(
          excludedTime => 
            excludedTime.getHours() === startTime.getHours() &&
            excludedTime.getDate() === startTime.getDate()
        );

        slots.push({
          id: `slot-${startTime.getTime()}`,
          startTime,
          endTime,
          available: !isExcluded
        });
      }
    });

    return slots;
  };

  const handleSlotSelect = (slot: TimeSlot) => {
    if (!slot.available) return;
    setSelectedSlot(slot.id);
    onSelectSlot(slot);
  };

  const navigateDate = (direction: number) => {
    setCurrentDate(addDays(currentDate, direction));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigateDate(-1)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          ←
        </button>
        <h2 className="text-lg font-semibold">
          {format(currentDate, 'EEEE d MMMM', { locale: fr })}
        </h2>
        <button
          onClick={() => navigateDate(1)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {generateTimeSlots().map((slot) => (
          <button
            key={slot.id}
            onClick={() => handleSlotSelect(slot)}
            disabled={!slot.available}
            className={`
              p-3 rounded-lg text-sm font-medium
              ${
                selectedSlot === slot.id
                  ? 'bg-indigo-600 text-white'
                  : slot.available
                  ? 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            {format(slot.startTime, 'HH:mm')} - {format(slot.endTime, 'HH:mm')}
          </button>
        ))}
      </div>

      <div className="mt-4 text-sm text-gray-500">
        <div className="flex items-center">
          <span className="w-3 h-3 bg-gray-100 rounded-full mr-2"></span>
          Non disponible
        </div>
        <div className="flex items-center mt-1">
          <span className="w-3 h-3 bg-indigo-600 rounded-full mr-2"></span>
          Sélectionné
        </div>
      </div>
    </div>
  );
};

export default TimeSlotPicker;