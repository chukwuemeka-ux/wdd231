// Set the date and time when the form loads
const timestamp = document.querySelector("#timestamp");

if (timestamp) {
    timestamp.value = new Date().toISOString();
}


// Open membership information modals
const modalButtons = document.querySelectorAll("[data-modal]");

modalButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const modalId = button.dataset.modal;
        const modal = document.querySelector(`#${modalId}`);

        if (modal) {
            modal.showModal();
        }
    });
});


// Close membership modals
const closeButtons = document.querySelectorAll(".close-modal");

closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const modal = button.closest("dialog");

        if (modal) {
            modal.close();
        }
    });
});


// Allow users to close a modal by clicking outside it
const dialogs = document.querySelectorAll("dialog");

dialogs.forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
        const dialogDimensions = dialog.getBoundingClientRect();

        const clickedOutside =
            event.clientX < dialogDimensions.left ||
            event.clientX > dialogDimensions.right ||
            event.clientY < dialogDimensions.top ||
            event.clientY > dialogDimensions.bottom;

        if (clickedOutside) {
            dialog.close();
        }
    });
});