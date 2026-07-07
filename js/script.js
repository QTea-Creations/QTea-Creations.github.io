console.log("🦸 Safetii Net Loaded");

const heroData = {
  color: "",
  animal: "",
  power: "",
  name: ""
};

const colors = [
  { label: "Purple", emoji: "💜" },
  { label: "Cyan", emoji: "🩵" },
  { label: "Gold", emoji: "💛" },
  { label: "Blue", emoji: "💙" },
  { label: "Green", emoji: "💚" },
  { label: "Pink", emoji: "🩷" }
];

const animals = [
  { label: "Fox", emoji: "🦊" },
  { label: "Owl", emoji: "🦉" },
  { label: "Turtle", emoji: "🐢" },
  { label: "Dolphin", emoji: "🐬" },
  { label: "Lion", emoji: "🦁" },
  { label: "Dragon", emoji: "🐉" }
];

const powers = [
  { label: "Lightning", emoji: "⚡" },
  { label: "Shield", emoji: "🛡️" },
  { label: "Star", emoji: "⭐" },
  { label: "Tech", emoji: "💻" },
  { label: "Rocket", emoji: "🚀" },
  { label: "Detective", emoji: "🔍" }
];

const heroTitles = [
  "Captain",
  "Agent",
  "Nova",
  "Cyber",
  "Mega",
  "Guardian",
  "Spark",
  "Commander",
  "Quantum",
  "Mystic",
  "Ultra",
  "Turbo"
];

function createChoices(containerId, items, type) {
  const container = document.getElementById(containerId);

  if (!container) return;

  items.forEach((item) => {
    const button = document.createElement("button");
    button.className = "choice-button";
    button.type = "button";
    button.innerHTML = `<span>${item.emoji}</span>${item.label}`;

    button.addEventListener("click", () => {
      heroData[type] = `${item.emoji} ${item.label}`;

      const allButtons = container.querySelectorAll(".choice-button");
      allButtons.forEach((btn) => btn.classList.remove("selected"));

      button.classList.add("selected");
      updateHeroPreview();
    });

    container.appendChild(button);
  });
}

function updateHeroPreview() {
  const chosenColor = document.getElementById("chosenColor");
  const chosenAnimal = document.getElementById("chosenAnimal");
  const chosenPower = document.getElementById("chosenPower");

  if (chosenColor) chosenColor.textContent = heroData.color || "Choose a color";
  if (chosenAnimal) chosenAnimal.textContent = heroData.animal || "Choose a sidekick";
  if (chosenPower) chosenPower.textContent = heroData.power || "Choose a power";
}

function generateHeroName() {
  if (!heroData.color || !heroData.animal || !heroData.power) {
    alert("Meme says: Pick your suit color, sidekick, and cyber power first!");
    return;
  }

  const randomTitle = heroTitles[Math.floor(Math.random() * heroTitles.length)];
  const animalName = heroData.animal.replace(/[^\w\s]/g, "").trim().split(" ").pop();
  const powerName = heroData.power.replace(/[^\w\s]/g, "").trim().split(" ").pop();

  const nameStyles = [
    `${randomTitle} ${powerName}`,
    `${randomTitle} ${animalName}`,
    `${powerName} ${animalName}`,
    `${randomTitle} ${animalName} ${powerName}`
  ];

  heroData.name = nameStyles[Math.floor(Math.random() * nameStyles.length)];

  const heroName = document.getElementById("heroName");
  if (heroName) heroName.textContent = heroData.name;
}

function saveHero() {
  if (!heroData.name) {
    alert("Meme says: Generate your Cyber Hero name first!");
    return;
  }

  localStorage.setItem("safetiiHero", JSON.stringify(heroData));
  window.location.href = "dashboard.html";
}

function loadHeroDashboard() {
  const savedHero = localStorage.getItem("safetiiHero");

  if (!savedHero) return;

  const hero = JSON.parse(savedHero);

  const heroName = document.getElementById("dashboardHeroName");
  const color = document.getElementById("dashboardColor");
  const animal = document.getElementById("dashboardAnimal");
  const power = document.getElementById("dashboardPower");

  if (heroName) heroName.textContent = hero.name || "Cyber Mentee";
  if (color) color.textContent = hero.color || "Not chosen yet";
  if (animal) animal.textContent = hero.animal || "Not chosen yet";
  if (power) power.textContent = hero.power || "Not chosen yet";
}

document.addEventListener("DOMContentLoaded", () => {
  createChoices("colorChoices", colors, "color");
  createChoices("animalChoices", animals, "animal");
  createChoices("powerChoices", powers, "power");

  const generateButton = document.getElementById("generateHero");
  const saveButton = document.getElementById("saveHero");

  if (generateButton) generateButton.addEventListener("click", generateHeroName);
  if (saveButton) saveButton.addEventListener("click", saveHero);

  loadHeroDashboard();
});
