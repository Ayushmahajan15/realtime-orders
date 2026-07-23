const prisma = require("../config/prisma");

async function createOrder(orderData) {
    return await prisma.order.create({
        data: orderData,
    });
}

async function getAllOrders() {
    return await prisma.order.findMany({
        orderBy: {
            id: "asc",
        },
    });
}

async function getOrderById(id) {
    return await prisma.order.findUnique({
        where: {
            id,
        },
    });
}

async function updateOrder(id, orderData) {
    return await prisma.order.update({
        where: { id },
        data: orderData,
    });
}

async function deleteOrder(id) {
    return await prisma.order.delete({
        where: { id },
    });
}

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
};
