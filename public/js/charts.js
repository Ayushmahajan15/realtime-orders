let statusChart;

/*
 * Create or Update Status Chart
 */
function updateStatusChart(orders) {

    const pending = orders.filter(order => order.status === "PENDING").length;
    const shipped = orders.filter(order => order.status === "SHIPPED").length;
    const delivered = orders.filter(order => order.status === "DELIVERED").length;

    const ctx = document.getElementById("statusChart");

    if (statusChart) {
        statusChart.destroy();
    }

    statusChart = new Chart(ctx, {

        type: "doughnut",

        data: {

            labels: [
                "Pending",
                "Shipped",
                "Delivered"
            ],

            datasets: [

                {

                    data: [
                        pending,
                        shipped,
                        delivered
                    ],

                    backgroundColor: [
                        "#facc15",
                        "#22c55e",
                        "#3b82f6"
                    ],

                    borderWidth: 0

                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    position: "bottom"

                }

            }

        }

    });

}