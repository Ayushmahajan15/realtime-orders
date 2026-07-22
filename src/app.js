const express = require("express");
const cors = require("cors");

const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("🚀 Real-Time Order Monitoring System API");
});

app.use("/api/orders", orderRoutes);

module.exports = app;
