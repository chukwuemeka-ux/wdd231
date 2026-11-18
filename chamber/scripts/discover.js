import { discoverPlaces } from "../data/discover.mjs";

const grid = document.querySelector("#discover-grid");
const visitMessage = document.querySelector("#visit-message");

function showVisitMessage() {
  const now = Date.now();
  const previous = Number(localStorage.getItem("abaDiscoverLastVisit"));
  if (!previous || !Number.isFinite(previous)) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const days = Math.floor((now - previous) / 86400000);
    if (days < 1) visitMessage.textContent = "Back so soon! Awesome!";
    else visitMessage.textContent = `You last visited ${days} ${days === 1 ? "day" : "days"} ago.`;
  }
  localStorage.setItem("abaDiscoverLastVisit", String(now));
}

function createPlaceCard(place, index) {
  const card = document.createElement("article");
  card.className = `discover-card place-${index + 1}`;
  const heading = document.createElement("h2");
  heading.textContent = place.name;
  const figure = document.createElement("figure");
  const image = document.createElement("img");
  image.src = place.image;
  image.alt = place.alt;
  image.width = 600;
  image.height = 400;
  image.loading = "lazy";
  image.decoding = "async";
  figure.append(image);
  const address = document.createElement("address");
  address.textContent = place.address;
  const description = document.createElement("p");
  description.textContent = place.description;
  const button = document.createElement("button");
  button.type = "button";
  button.className = "learn-more";
  button.textContent = "Learn More";
  button.addEventListener("click", () => {
    const query = encodeURIComponent(`${place.name}, ${place.address}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, "_blank", "noopener,noreferrer");
  });
  card.append(heading, figure, address, description, button);
  return card;
}

if (grid) {
  discoverPlaces.forEach((place, index) => grid.append(createPlaceCard(place, index)));
}
showVisitMessage();
