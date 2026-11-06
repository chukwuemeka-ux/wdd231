const parameters = new URLSearchParams(window.location.search);

const firstName = parameters.get("first") || "Not provided";
const lastName = parameters.get("last") || "Not provided";
const email = parameters.get("email") || "Not provided";
const phone = parameters.get("phone") || "Not provided";
const organization = parameters.get("organization") || "Not provided";
const timestampValue = parameters.get("timestamp");

document.querySelector("#first").textContent = firstName;
document.querySelector("#last").textContent = lastName;
document.querySelector("#email").textContent = email;
document.querySelector("#phone").textContent = phone;
document.querySelector("#organization").textContent = organization;

const timestampDisplay = document.querySelector("#timestamp-display");

if (timestampValue) {
    const date = new Date(timestampValue);

    timestampDisplay.textContent = date.toLocaleString();
} else {
    timestampDisplay.textContent = "Not available";
}