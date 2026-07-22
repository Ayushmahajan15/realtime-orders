const prisma = require("../config/prisma");

async function getAllOrders() {
    return await prisma.order.findMany({
        orderBy: {
            id: "asc"
        }
    });
}

module.exports = {
    getAllOrders
};
