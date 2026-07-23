const API_URL = "/api/orders";

/*
 * Fetch all orders from the backend
 */
async function fetchOrders() {

    try {

        const response = await fetch(API_URL);

        const result = await response.json();

        if (result.success) {
            return result.data;
        }

        return [];

    } catch (error) {

        console.error("Error fetching orders:", error);

        return [];
    }

}
