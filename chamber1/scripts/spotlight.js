const spotlightContainer = document.querySelector("#spotlights");

async function getSpotlights() {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) throw new Error("Unable to load member data.");

        const members = await response.json();
        const qualified = members.filter(member =>
            ["Gold", "Silver"].includes(member.membershipLevel)
        );

        const shuffled = [...qualified].sort(() => Math.random() - 0.5);
        const count = qualified.length >= 3 ? 3 : 2;
        displaySpotlights(shuffled.slice(0, count));
    } catch (error) {
        spotlightContainer.innerHTML = "<p>Member spotlights are currently unavailable.</p>";
    }
}

function displaySpotlights(members) {
    spotlightContainer.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("article");
        card.className = "spotlight-card";

        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo" width="130" height="80">
            <h3>${member.name}</h3>
            <p><strong>${member.membershipLevel} Member</strong></p>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
        `;

        spotlightContainer.appendChild(card);
    });
}

getSpotlights();
