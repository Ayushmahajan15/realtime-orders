const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;

    try {

        const response = await fetch("/api/auth/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        });

        const result = await response.json();

        if (!result.success) {

            document.getElementById("errorMessage").textContent =
                result.message;

            return;

        }

        localStorage.setItem(
            "token",
            result.data.token
        );

        window.location.href = "/";

    }

    catch (err) {

        document.getElementById("errorMessage").textContent =
            "Server Error";

    }

});