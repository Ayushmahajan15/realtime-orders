const orderService = require("../services/orderService");
const {
    createOrderSchema,
    updateOrderSchema,
} = require("../validators/orderValidator");
async function getOrders(req, res) {
    try {
        const orders = await orderService.getAllOrders();

        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

async function getOrder(req, res) {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid order ID",
            });
        }

        const order = await orderService.getOrderById(id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        res.status(200).json({
            success: true,
            data: order,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}
async function createOrder(req, res) {
    try {
        const validatedData = createOrderSchema.parse(req.body);

        const order = await orderService.createOrder(validatedData);

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            data: order,
        });
    } catch (error) {
        if (error.name === "ZodError") {
            return res.status(400).json({
                success: false,
                errors: error.issues,
            });
        }

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

async function updateOrder(req, res) {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid order ID",
            });
        }

        const existingOrder = await orderService.getOrderById(id);

        if (!existingOrder) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        const validatedData = updateOrderSchema.parse(req.body);

        const updatedOrder = await orderService.updateOrder(id, validatedData);

        res.status(200).json({
            success: true,
            message: "Order updated successfully",
            data: updatedOrder,
        });

    } catch (error) {
        if (error.name === "ZodError") {
            return res.status(400).json({
                success: false,
                errors: error.issues,
            });
        }

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

async function deleteOrder(req, res) {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid order ID",
            });
        }

        const existingOrder = await orderService.getOrderById(id);

        if (!existingOrder) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        await orderService.deleteOrder(id);

        res.status(200).json({
            success: true,
            message: "Order deleted successfully",
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

module.exports = {
    getOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder,
};
