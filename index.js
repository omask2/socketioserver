require("dotenv").config();

const app = require("express")();
const httpServer = require("http").createServer(app);
const { Server } = require("socket.io");

// Configuration du serveur Socket.io
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Gestion des connexions Socket.io
io.on("connection", (socket) => {
    const auth = socket.handshake.auth;
    const userData = {
        socketId: socket.id,
        username: auth.username,
        docteurId: auth.iddocteur
    };

    console.log(`Un utilisateur connecté: ${userData.socketId}, nom: ${userData.username}, id: ${userData.docteurId}`);

    // Notifier la connexion d'un docteur
    if (userData.docteurId) {
        io.emit("User_connect_doctor", {
            id: userData.docteurId,
            status: "connect"
        });
    }

    // Gestion de la déconnexion
    socket.on("disconnect", () => {
        console.log(`Un utilisateur déconnecté: ${userData.socketId}, nom: ${userData.username}, id: ${userData.docteurId}`);

        if (userData.docteurId) {
            io.emit("User_connect_doctor", {
                id: userData.docteurId,
                status: "disconnect"
            });
        }
    });

    // Création d'une fonction générique pour gérer les événements
    const handleAndBroadcast = (eventName) => {
        socket.on(eventName, (data) => {
            console.log(`Événement ${eventName}:`, data);
            io.emit(eventName, data);
        });
    };

    // Enregistrement des gestionnaires d'événements
    [
        "Notificationpatientevent",
        "Notificationdocteur",
        "Messagesendevent",
        "Accusereception",
        "Notificationdocteurprivate"
    ].forEach(handleAndBroadcast);

    // Gestion séparée pour chatstate car la structure est différente
    socket.on("chatstate", (idconcerne) => {
        console.log("chatstate:", idconcerne);
        io.emit("chatstate", idconcerne);
    });
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});

// Route de base
app.get("/", (req, res) => {
    res.send("Serveur Socket.io opérationnel");
});