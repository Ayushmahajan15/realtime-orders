const { Server } = require("socket.io");

let io;

function initializeSocket(server) {
    io = new Server(server, {
        cors: {
            origin: "*",
        },
    });

    io.on("connection", (socket) => {
        console.log(`🟢 Client Connected: ${socket.id}`);

        socket.on("disconnect", () => {
            console.log(`🔴 Client Disconnected: ${socket.id}`);
        });
    });

    return io;
}

function getIO() {
    if (!io) {
        throw new Error("Socket.IO has not been initialized.");
    }

    return io;
}

module.exports = {
    initializeSocket,
    getIO,
};
