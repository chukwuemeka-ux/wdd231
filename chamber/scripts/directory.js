const membersContainer = document.querySelector("#members-container");
const memberCount = document.querySelector("#member-count");
const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");
const menuButton = document.querySelector("#menu-button");
const primaryNav = document.querySelector("#primary-nav");

function membershipName(level) {
  if (Number(level) === 3) return "Gold Member";
  if (Number(level) === 2) return "Silver Member";
  return "Member";
}

function createMemberCard(member) {
  const article = document.createElement("article");
  article.className = "member-card";

  const image = document.createElement("img");
  image.src = `images/${member.image}`;
  image.alt = `${member.name} business graphic`;
  image.width = 640;
  image.height = 360;
  image.loading = "lazy";

  const details = document.createElement("div");
  details.className = "member-details";

  const heading = document.createElement("h2");
  heading.textContent = member.name;

  const category = document.createElement("p");
  category.className = "member-category";
  category.textContent = member.category || "Local Business";

  const description = document.createElement("p");
  description.textContent = member.description || "";

  const address = document.createElement("p");
  address.innerHTML = "<strong>Address:</strong> ";
  address.append(document.createTextNode(member.address));

  const phone = document.createElement("p");
  phone.innerHTML = "<strong>Phone:</strong> ";
  phone.append(document.createTextNode(member.phone));

  const website = document.createElement("a");
  website.href = member.website;
  website.textContent = "Visit Website";
  website.target = "_blank";
  website.rel = "noopener noreferrer";
  website.setAttribute("aria-label", `Visit ${member.name} website (opens in a new tab)`);

  const level = document.createElement("span");
  level.className = `membership-level level-${Number(member.membershipLevel) || 1}`;
  level.textContent = membershipName(member.membershipLevel);

  details.append(heading, category, description, address, phone, website, level);
  article.append(image, details);
  return article;
}

async function getMembers() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const members = await response.json();

    membersContainer.replaceChildren();
    members.forEach((member) => membersContainer.append(createMemberCard(member)));
    memberCount.textContent = `${members.length} local businesses`;
  } catch (error) {
    console.error("Unable to load member data:", error);
    memberCount.textContent = "Directory unavailable";
    membersContainer.innerHTML = '<p class="notice">We could not load the directory. Please run this page through a local server such as VS Code Live Server and try again.</p>';
  }
}

function setView(view) {
  const isGrid = view === "grid";
  membersContainer.classList.toggle("members-grid", isGrid);
  membersContainer.classList.toggle("members-list", !isGrid);
  gridButton.classList.toggle("active", isGrid);
  listButton.classList.toggle("active", !isGrid);
  gridButton.setAttribute("aria-pressed", String(isGrid));
  listButton.setAttribute("aria-pressed", String(!isGrid));
}

gridButton.addEventListener("click", () => setView("grid"));
listButton.addEventListener("click", () => setView("list"));

menuButton.addEventListener("click", () => {
  const isOpen = primaryNav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  menuButton.textContent = isOpen ? "✕" : "☰";
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
document.querySelector("#last-modified").textContent = document.lastModified
  ? new Date(document.lastModified).toLocaleString()
  : "Unavailable";

getMembers();
