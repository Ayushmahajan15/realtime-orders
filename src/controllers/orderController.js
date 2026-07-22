const orderService = require("../services/orderService");

async function getOrders(req, res) {
    try {
        const orders = await orderService.getAllOrders();

        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

module.exports = {
    getOrders
};
