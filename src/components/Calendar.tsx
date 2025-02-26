import React, { useState, useEffect } from 'react';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, add, sub } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: 'meeting' | 'deadline' | 'payment';
  description?: string;
  participants?: {
    id: string;
    name: string;
    avatar?: string;
  }[];
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: '',
    description: '',
    type: 'meeting'
  });

  useEffect(() => {
    fetchEvents();
  }, [currentDate]);

  const fetchEvents = async () => {
    try {
      const start = startOfWeek(currentDate);
      const end = endOfWeek(currentDate);
      
      const response = await fetch(
        `/api/events?start=${start.toISOString()}&end=${end.toISOString()}`,
        { credentials: 'include' }
      );
      
      if (response.ok) {
        const data = await response.json();
        setEvents(data.map((event: any) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end)
        })));
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des événements:', error);
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !newEvent.title) return;

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newEvent,
          start: selectedDate,
          end: add(selectedDate, { hours: 1 })
        }),
        credentials: 'include'
      });

      if (response.ok) {
        await fetchEvents();
        setShowEventModal(false);
        setNewEvent({ title: '', description: '', type: 'meeting' });
      }
    } catch (error) {
      console.error('Erreur lors de la création de l\'événement:', error);
    }
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(new Date(event.start), date));
  };

  const weekDays = eachDayOfInterval({
    start: startOfWeek(currentDate, { locale: fr }),
    end: endOfWeek(currentDate, { locale: fr })
  });

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setCurrentDate(sub(currentDate, { weeks: 1 }))}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          ←
        </button>
        <h2 className="text-lg font-semibold">
          {format(currentDate, 'MMMM yyyy', { locale: fr })}
        </h2>
        <button
          onClick={() => setCurrentDate(add(currentDate, { weeks: 1 }))}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          →
        </button>
      </div>

      {/* Grille des jours */}
      <div className="grid grid-cols-7 gap-2">
        {/* En-têtes des jours */}
        {weekDays.map(day => (
          <div
            key={day.toISOString()}
            className="text-center py-2 font-medium text-gray-600"
          >
            {format(day, 'EEE', { locale: fr })}
          </div>
        ))}

        {/* Cellules des jours */}
        {weekDays.map(day => (
          <div
            key={day.toISOString()}
            onClick={() => {
              setSelectedDate(day);
              setShowEventModal(true);
            }}
            className={`
              min-h-[120px] p-2 border rounded-lg cursor-pointer
              ${isSameMonth(day, currentDate) ? 'bg-white' : 'bg-gray-50'}
              ${isSameDay(day, new Date()) ? 'border-indigo-500' : 'border-gray-200'}
              hover:border-indigo-300
            `}
          >
            <div className="font-medium text-gray-700">
              {format(day, 'd')}
            </div>
            <div className="mt-1 space-y-1">
              {getEventsForDate(day).map(event => (
                <div
                  key={event.id}
                  className={`
                    text-xs p-1 rounded truncate
                    ${event.type === 'meeting' ? 'bg-blue-100 text-blue-800' : ''}
                    ${event.type === 'deadline' ? 'bg-red-100 text-red-800' : ''}
                    ${event.type === 'payment' ? 'bg-green-100 text-green-800' : ''}
                  `}
                >
                  {format(new Date(event.start), 'HH:mm')} - {event.title}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal d'ajout d'événement */}
      {showEventModal && selectedDate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              Nouvel événement pour le {format(selectedDate, 'dd/MM/yyyy')}
            </h3>
            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Titre</label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select
                  value={newEvent.type}
                  onChange={e => setNewEvent({ ...newEvent, type: e.target.value as Event['type'] })}
                  className="w-full p-2 border rounded"
                >
                  <option value="meeting">Rendez-vous</option>
                  <option value="deadline">Deadline</option>
                  <option value="payment">Paiement</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={newEvent.description}
                  onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="w-full p-2 border rounded"
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Créer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;