# Serveur Socket.io pour Communication en Temps Réel

Ce serveur gère les communications en temps réel entre les utilisateurs et les médecins via Socket.io.

## Fonctionnalités

- Connexion et déconnexion des médecins
- Notifications pour les patients et les médecins
- Messagerie en temps réel
- Accusés de réception
- Indication de l'état de chat

## Installation

```bash
# Installer les dépendances
npm install

# Installer nodemon globalement (facultatif)
npm install -g nodemon
```

## Utilisation

```bash
# Démarrer en mode production
npm start

# Démarrer en mode développement (avec rechargement automatique)
npm run dev
```

Le serveur démarrera sur le port 5000 par défaut, ou sur le port défini dans la variable d'environnement PORT.

## Endpoints

- **GET /** - Point de vérification du serveur

## Événements Socket.io

### Événements entrants (du client vers le serveur)

- `Notificationpatientevent` - Notification pour les patients
- `Notificationdocteur` - Notification pour tous les médecins
- `Notificationdocteurprivate` - Notification privée pour un médecin spécifique
- `Messagesendevent` - Message envoyé
- `Accusereception` - Accusé de réception
- `chatstate` - État de la conversation

### Événements sortants (du serveur vers le client)

- `User_connect_doctor` - Statut de connexion/déconnexion d'un médecin
- Tous les événements entrants sont également retransmis à tous les clients
