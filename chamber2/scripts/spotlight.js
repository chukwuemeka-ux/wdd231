const spotlightContainer = document.querySelector("#spotlights");
function membershipName(level) { return Number(level) === 3 ? "Gold" : "Silver"; }
async function getSpotlights() {
  if (!spotlightContainer) return;
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error("Unable to load member data.");
    const members = await response.json();
    const qualified = members.filter(member => [2, 3].includes(Number(member.membershipLevel)));
    const shuffled = [...qualified].sort(() => Math.random() - 0.5);
    displaySpotlights(shuffled.slice(0, Math.min(3, qualified.length)));
  } catch (error) { spotlightContainer.innerHTML = "<p>Member spotlights are currently unavailable.</p>"; }
}
function displaySpotlights(members) {
  spotlightContainer.replaceChildren();
  members.forEach(member => {
    const card = document.createElement("article"); card.className = "spotlight-card";
    const image = document.createElement("img"); image.src = `images/${member.image}`; image.alt = `${member.name} business graphic`; image.width=130; image.height=80;
    const title=document.createElement("h3"); title.textContent=member.name;
    const level=document.createElement("p"); level.innerHTML=`<strong>${membershipName(member.membershipLevel)} Member</strong>`;
    const address=document.createElement("p"); address.textContent=member.address;
    const phone=document.createElement("p"); phone.textContent=member.phone;
    const link=document.createElement("a"); link.href=member.website; link.textContent="Visit Website"; link.target="_blank"; link.rel="noopener noreferrer";
    card.append(image,title,level,address,phone,link); spotlightContainer.append(card);
  });
}
getSpotlights();
