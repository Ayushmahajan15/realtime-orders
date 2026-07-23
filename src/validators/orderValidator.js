const { z } = require("zod");

const createOrderSchema = z.object({
    customerName: z
        .string()
        .trim()
        .min(2, "Customer name must be at least 2 characters"),

    productName: z
        .string()
        .trim()
        .min(2, "Product name must be at least 2 characters"),
});

const updateOrderSchema = z.object({
    customerName: z.string().trim().min(2),
    productName: z.string().trim().min(2),
    status: z.enum(["PENDING", "SHIPPED", "DELIVERED"]),
});

module.exports = {
    createOrderSchema,
    updateOrderSchema,
};
