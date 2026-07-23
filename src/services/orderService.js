const orderRepository = require("../repositories/orderRepository");

async function getAllOrders() {
    return await orderRepository.getAllOrders();
}

async function getOrderById(id) {
    return await orderRepository.getOrderById(id);
}

async function createOrder(orderData) {
    return await orderRepository.createOrder(orderData);
}

async function updateOrder(id, orderData) {
    return await orderRepository.updateOrder(id, orderData);
}

async function deleteOrder(id) {
    return await orderRepository.deleteOrder(id);
}

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
};
