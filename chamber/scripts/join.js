// Set the timestamp when the join form page loads
const timestamp = document.querySelector("#timestamp");

if (timestamp) {
    timestamp.value = new Date().toISOString();
}

// Membership modal functionality
const modalButtons = document.querySelectorAll("[data-modal]");
const closeButtons = document.querySelectorAll(".close-modal");

modalButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const modal = document.querySelector(`#${button.dataset.modal}`);

        if (modal) {
            modal.showModal();
        }
    });
});

closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const modal = button.closest("dialog");

        if (modal) {
            modal.close();
        }
    });
});

// Close a modal when clicking outside its content
document.querySelectorAll("dialog").forEach((modal) => {
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.close();
        }
    });
});

// Display submitted form information on thankyou.html
const params = new URLSearchParams(window.location.search);

if (document.querySelector("#firstName")) {
    document.querySelector("#firstName").textContent =
        params.get("first") || "Not provided";

    document.querySelector("#lastName").textContent =
        params.get("last") || "Not provided";

    document.querySelector("#email").textContent =
        params.get("email") || "Not provided";

    document.querySelector("#phone").textContent =
        params.get("phone") || "Not provided";

    document.querySelector("#organization").textContent =
        params.get("organization") || "Not provided";

    const submittedTimestamp = params.get("timestamp");

    if (submittedTimestamp) {
        const date = new Date(submittedTimestamp);

        document.querySelector("#submittedDate").textContent =
            date.toLocaleString();
    } else {
        document.querySelector("#submittedDate").textContent =
            "Not available";
    }
}