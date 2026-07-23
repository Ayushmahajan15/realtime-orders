const socket = io();

/*
 * Socket Connected
 */
socket.on("connect", () => {

    const status = document.getElementById("connectionStatus");

    status.textContent = "🟢 Connected";

    status.style.background = "#16a34a";

    console.log("Connected:", socket.id);

});

/*
 * Socket Disconnected
 */
socket.on("disconnect", () => {

    const status = document.getElementById("connectionStatus");

    status.textContent = "🔴 Disconnected";

    status.style.background = "#dc2626";

});

/*
 * Listen for PostgreSQL Events
 */
socket.on("orderUpdated", async (event) => {

    console.log("Realtime Event:", event);

    await loadDashboard();

    addActivity(event);

    showToast(event);


});
