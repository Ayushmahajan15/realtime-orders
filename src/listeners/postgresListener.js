const { Client } = require("pg");
const { getIO } = require("../socket/socket");
require("dotenv").config();

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

async function startPostgresListener() {
    try {
        await client.connect();

        console.log("✅ PostgreSQL Listener Connected");

        await client.query("LISTEN order_events");

        console.log("👂 Listening on channel: order_events");

        client.on("notification", (msg) => {
            console.log("📢 Database Event Received:");
            console.log(msg.payload);

            const io = getIO();

            io.emit("orderUpdated", JSON.parse(msg.payload));
        });

    } catch (error) {
        console.error("Listener Error:", error);
    }
}

module.exports = startPostgresListener;
