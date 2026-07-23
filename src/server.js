const http = require("http");
const app = require("./app");

const { initializeSocket } = require("./socket/socket");
const startPostgresListener = require("./listeners/postgresListener");

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

// Initialize Socket.IO
initializeSocket(server);

// Start PostgreSQL Listener
startPostgresListener();

server.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
