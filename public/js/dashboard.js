/*
 * Load dashboard data
 */
async function loadDashboard() {

    allOrders = await fetchOrders();

    updateCards(allOrders);

    updateStatusChart(allOrders);

    renderTable(allOrders);

}

/*
 * Update KPI Cards
 */
function updateCards(orders) {

    document.getElementById("totalOrders").textContent = orders.length;

    const pending = orders.filter(order => order.status === "PENDING").length;

    const shipped = orders.filter(order => order.status === "SHIPPED").length;

    const delivered = orders.filter(order => order.status === "DELIVERED").length;

    document.getElementById("pendingOrders").textContent = pending;

    document.getElementById("shippedOrders").textContent = shipped;

    document.getElementById("deliveredOrders").textContent = delivered;

}

/*
 * Populate Orders Table
 */
function renderTable(orders) {

    const tableBody = document.getElementById("ordersTable");

    tableBody.innerHTML = "";

    orders.forEach(order => {

        const row = document.createElement("tr");
        
        row.style.cursor = "pointer";

        row.onclick = () => openModal(order);

        row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.customerName}</td>
            <td>${order.productName}</td>
            <td>
                <select
                    class="status-select"
                    onchange="changeStatus(${order.id}, this.value)"
                >
                    <option value="PENDING" ${order.status==="PENDING"?"selected":""}>Pending</option>
                    <option value="SHIPPED" ${order.status==="SHIPPED"?"selected":""}>Shipped</option>
                    <option value="DELIVERED" ${order.status==="DELIVERED"?"selected":""}>Delivered</option>
                </select>
            </td>
            <td>${new Date(order.updatedAt).toLocaleString()}</td>
        `;

        tableBody.appendChild(row);

    });

}

function getStatusBadge(status) {

    switch (status) {

        case "PENDING":
            return `<span class="badge pending">Pending</span>`;

        case "SHIPPED":
            return `<span class="badge shipped">Shipped</span>`;

        case "DELIVERED":
            return `<span class="badge delivered">Delivered</span>`;

        default:
            return status;

    }

}

function searchOrders() {

    const searchText = document
        .getElementById("searchBox")
        .value
        .toLowerCase();

    const filteredOrders = allOrders.filter(order =>

        order.customerName.toLowerCase().includes(searchText) ||

        order.productName.toLowerCase().includes(searchText) ||

        order.status.toLowerCase().includes(searchText)

    );

    renderTable(filteredOrders);

}

function addActivity(event) {

    const feed = document.getElementById("activityFeed");

    const item = document.createElement("div");

    item.className = "activity-item";

    item.innerHTML = `
        <strong>${event.operation}</strong><br>
        ${event.customerName} ordered ${event.productName}<br>
        <small>${new Date().toLocaleTimeString()}</small>
    `;

    feed.prepend(item);

}

function showToast(event) {

    const container = document.getElementById("toastContainer");

    const toast = document.createElement("div");

    toast.className = "toast";

    toast.innerHTML = `
        <h4>🟢 ${event.operation} Order</h4>

        <p>
            <strong>${event.customerName}</strong><br>
            ${event.productName}
        </p>

        <small>${new Date().toLocaleTimeString()}</small>
    `;

    container.appendChild(toast);

    setTimeout(() => {

        toast.remove();

    }, 4000);

}

function openModal(order) {

    document.getElementById("modalOrderId").textContent = order.id;

    document.getElementById("modalCustomer").textContent = order.customerName;

    document.getElementById("modalProduct").textContent = order.productName;

    document.getElementById("modalStatus").textContent = order.status;

    document.getElementById("modalUpdated").textContent =
        new Date(order.updatedAt).toLocaleString();

    document.getElementById("orderModal").style.display = "flex";

}

function closeModal() {

    document.getElementById("orderModal").style.display = "none";

}

async function changeStatus(id, status) {

    try {

        await updateOrderStatus(id, status);

    } catch (err) {

        console.error(err);

        alert("Failed to update order.");

    }

}

/*
 * Load dashboard when page opens
 */
loadDashboard();

document
    .getElementById("searchBox")
    .addEventListener("input", searchOrders);