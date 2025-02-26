import React, { useState, useEffect } from 'react';

interface UserSettings {
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private' | 'contacts';
    showEmail: boolean;
    showPhone: boolean;
  };
  preferences: {
    language: string;
    currency: string;
    timezone: string;
  };
  security: {
    twoFactorEnabled: boolean;
    sessionTimeout: number;
  };
}

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<UserSettings>({
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: true,
      showPhone: false
    },
    preferences: {
      language: 'fr',
      currency: 'EUR',
      timezone: 'Europe/Paris'
    },
    security: {
      twoFactorEnabled: false,
      sessionTimeout: 30
    }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/user/settings', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      }
    } catch (error) {
      setError('Erreur lors de la récupération des paramètres');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    setError(null);

    try {
      const response = await fetch('/api/user/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la sauvegarde');
      }
    } catch (error) {
      setError('Erreur lors de la sauvegarde des paramètres');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-4">Chargement...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Paramètres</h1>

      {error && (
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {/* Notifications */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Notifications par email</span>
              <input
                type="checkbox"
                checked={settings.notifications.email}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: {
                    ...settings.notifications,
                    email: e.target.checked
                  }
                })}
                className="toggle"
              />
            </div>
            <div className="flex items-center justify-between">
              <span>Notifications push</span>
              <input
                type="checkbox"
                checked={settings.notifications.push}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: {
                    ...settings.notifications,
                    push: e.target.checked
                  }
                })}
                className="toggle"
              />
            </div>
            <div className="flex items-center justify-between">
              <span>Notifications SMS</span>
              <input
                type="checkbox"
                checked={settings.notifications.sms}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: {
                    ...settings.notifications,
                    sms: e.target.checked
                  }
                })}
                className="toggle"
              />
            </div>
          </div>
        </section>

        {/* Confidentialité */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Confidentialité</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Visibilité du profil
              </label>
              <select
                value={settings.privacy.profileVisibility}
                onChange={(e) => setSettings({
                  ...settings,
                  privacy: {
                    ...settings.privacy,
                    profileVisibility: e.target.value as UserSettings['privacy']['profileVisibility']
                  }
                })}
                className="w-full p-2 border rounded"
              >
                <option value="public">Public</option>
                <option value="private">Privé</option>
                <option value="contacts">Contacts uniquement</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span>Afficher l'email</span>
              <input
                type="checkbox"
                checked={settings.privacy.showEmail}
                onChange={(e) => setSettings({
                  ...settings,
                  privacy: {
                    ...settings.privacy,
                    showEmail: e.target.checked
                  }
                })}
                className="toggle"
              />
            </div>
            <div className="flex items-center justify-between">
              <span>Afficher le téléphone</span>
              <input
                type="checkbox"
                checked={settings.privacy.showPhone}
                onChange={(e) => setSettings({
                  ...settings,
                  privacy: {
                    ...settings.privacy,
                    showPhone: e.target.checked
                  }
                })}
                className="toggle"
              />
            </div>
          </div>
        </section>

        {/* Préférences */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Préférences</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Langue
              </label>
              <select
                value={settings.preferences.language}
                onChange={(e) => setSettings({
                  ...settings,
                  preferences: {
                    ...settings.preferences,
                    language: e.target.value
                  }
                })}
                className="w-full p-2 border rounded"
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
                <option value="es">Español</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Devise
              </label>
              <select
                value={settings.preferences.currency}
                onChange={(e) => setSettings({
                  ...settings,
                  preferences: {
                    ...settings.preferences,
                    currency: e.target.value
                  }
                })}
                className="w-full p-2 border rounded"
              >
                <option value="EUR">EUR (€)</option>
                <option value="USD">USD ($)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
          </div>
        </section>

        {/* Sécurité */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Sécurité</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Authentification à deux facteurs</span>
              <input
                type="checkbox"
                checked={settings.security.twoFactorEnabled}
                onChange={(e) => setSettings({
                  ...settings,
                  security: {
                    ...settings.security,
                    twoFactorEnabled: e.target.checked
                  }
                })}
                className="toggle"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Délai d'expiration de session (minutes)
              </label>
              <input
                type="number"
                value={settings.security.sessionTimeout}
                onChange={(e) => setSettings({
                  ...settings,
                  security: {
                    ...settings.security,
                    sessionTimeout: parseInt(e.target.value)
                  }
                })}
                className="w-full p-2 border rounded"
                min="5"
                max="120"
              />
            </div>
          </div>
        </section>

        <div className="flex justify-end">
          <button
            onClick={handleSaveSettings}
            disabled={saving}
            className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
          >
            {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;