import React, { useState } from 'react';

interface ContributionModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  projectTitle: string;
  onSubmit: (data: ContributionData) => Promise<void>;
}

interface ContributionData {
  amount: number;
  message: string;
  isAnonymous: boolean;
  paymentMethod: 'card' | 'paypal' | 'bank_transfer';
}

const ContributionModal: React.FC<ContributionModalProps> = ({
  isOpen,
  onClose,
  projectId,
  projectTitle,
  onSubmit
}) => {
  const [contribution, setContribution] = useState<ContributionData>({
    amount: 0,
    message: '',
    isAnonymous: false,
    paymentMethod: 'card'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await onSubmit(contribution);
      onClose();
    } catch (err) {
      setError("Une erreur est survenue lors de la contribution");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const predefinedAmounts = [5, 10, 20, 50, 100];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Soutenir ce projet</h2>
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

          <div className="mb-6">
            <h3 className="text-gray-700 mb-2">Projet:</h3>
            <p className="font-medium">{projectTitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Montant prédéfini */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Montant
              </label>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {predefinedAmounts.map(amount => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => setContribution({ ...contribution, amount })}
                    className={`p-2 text-center rounded-lg border ${
                      contribution.amount === amount
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {amount}€
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={contribution.amount || ''}
                onChange={e => setContribution({
                  ...contribution,
                  amount: Math.max(0, Number(e.target.value))
                })}
                placeholder="Montant personnalisé"
                className="w-full p-3 border rounded-lg"
                min="0"
                step="1"
              />
            </div>

            {/* Méthode de paiement */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Méthode de paiement
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'card', label: 'Carte', icon: '💳' },
                  { id: 'paypal', label: 'PayPal', icon: '📱' },
                  { id: 'bank_transfer', label: 'Virement', icon: '🏦' }
                ].map(method => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setContribution({
                      ...contribution,
                      paymentMethod: method.id as ContributionData['paymentMethod']
                    })}
                    className={`p-3 flex flex-col items-center justify-center rounded-lg border ${
                      contribution.paymentMethod === method.id
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-2xl mb-1">{method.icon}</span>
                    <span className="text-sm">{method.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message (optionnel)
              </label>
              <textarea
                value={contribution.message}
                onChange={e => setContribution({
                  ...contribution,
                  message: e.target.value
                })}
                className="w-full p-3 border rounded-lg"
                rows={3}
                placeholder="Laissez un message d'encouragement..."
              />
            </div>

            {/* Anonymat */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="anonymous"
                checked={contribution.isAnonymous}
                onChange={e => setContribution({
                  ...contribution,
                  isAnonymous: e.target.checked
                })}
                className="h-4 w-4 text-indigo-600 rounded border-gray-300"
              />
              <label htmlFor="anonymous" className="ml-2 text-sm text-gray-700">
                Contribuer anonymement
              </label>
            </div>

            {/* Boutons d'action */}
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
                disabled={loading || contribution.amount <= 0}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
              >
                {loading ? 'Traitement...' : `Contribuer ${contribution.amount}€`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContributionModal;