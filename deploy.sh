#!/bin/bash

echo "🚀 Déploiement de CollabHub..."

# Construction de l'application
echo "📦 Construction de l'application..."
npm run build

# Tests
echo "🧪 Exécution des tests..."
npm run test

# Si les tests passent, déploiement
if [ $? -eq 0 ]; then
  echo "✅ Tests réussis, déploiement en cours..."
  
  # Déploiement sur le serveur de production
  docker-compose -f docker-compose.prod.yml up -d --build
  
  echo "🎉 Déploiement terminé avec succès!"
else
  echo "❌ Échec des tests, déploiement annulé"
  exit 1
fi