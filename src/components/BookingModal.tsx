import React, { useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate?: Date;
  availableSlots: {
    id: string;
    startTime: Date;
    endTime: Date;
    price?: number;
  }[];
  onBooking: (slotId: string, details: BookingDetails) => Promise<void>;
}

interface BookingDetails {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  selectedDate,
  availableSlots,
  onBooking
}) => {
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await onBooking(selectedSlot, bookingDetails);
      onClose();
    } catch (err) {
      setError('Une erreur est survenue lors de la réservation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              Réserver un créneau
              {selectedDate && (
                <span className="block text-sm text-gray-500">
                  {format(selectedDate, 'EEEE d MMMM yyyy', { locale: fr })}
                </span>
              )}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Sélection du créneau */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Créneaux disponibles
              </label>
              <div className="grid grid-cols-2 gap-2">
                {availableSlots.map((slot) => (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => setSelectedSlot(slot.id)}
                    className={`p-3 text-sm rounded-lg border ${
                      selectedSlot === slot.id
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div>
                      {format(slot.startTime, 'HH:mm')} - {format(slot.endTime, 'HH:mm')}
                    </div>
                    {slot.price && (
                      <div className="text-xs text-gray-500">
                        {slot.price}€
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Informations personnelles */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom complet
              </label>
              <input
                type="text"
                value={bookingDetails.name}
                onChange={(e) => setBookingDetails({
                  ...bookingDetails,
                  name: e.target.value
                })}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={bookingDetails.email}
                onChange={(e) => setBookingDetails({
                  ...bookingDetails,
                  email: e.target.value
                })}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                value={bookingDetails.phone}
                onChange={(e) => setBookingDetails({
                  ...bookingDetails,
                  phone: e.target.value
                })}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message (optionnel)
              </label>
              <textarea
                value={bookingDetails.message}
                onChange={(e) => setBookingDetails({
                  ...bookingDetails,
                  message: e.target.value
                })}
                rows={3}
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading || !selectedSlot}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
              >
                {loading ? 'Réservation...' : 'Confirmer la réservation'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;