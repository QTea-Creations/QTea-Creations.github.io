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

const identityQuestions = [
  {
    text: "Your favorite ice cream flavor",
    answer: "safe",
    explanation: "Correct! A favorite ice cream flavor usually does not identify where you live or who you are."
  },
  {
    text: "Your home address",
    answer: "private",
    explanation: "Correct! Your home address should stay private because it can show where you live."
  },
  {
    text: "Your password",
    answer: "private",
    explanation: "Correct! Passwords should never be shared except with a trusted adult when needed."
  },
  {
    text: "Your favorite color",
    answer: "safe",
    explanation: "Correct! A favorite color is usually safe because it does not reveal personal details."
  },
  {
    text: "Your school name",
    answer: "private",
    explanation: "Correct! Your school name can help strangers figure out where to find you."
  }
];

let identityIndex = 0;
let identityScore = 0;

function loadIdentityQuestion() {
  const questionText = document.getElementById("questionText");
  const feedbackText = document.getElementById("feedbackText");

  if (!questionText || !feedbackText) return;

  questionText.textContent = identityQuestions[identityIndex].text;
  feedbackText.textContent = "";
}

function answerIdentityQuestion(selectedAnswer) {
  const feedbackText = document.getElementById("feedbackText");
  if (!feedbackText) return;

  const currentQuestion = identityQuestions[identityIndex];

  if (selectedAnswer === currentQuestion.answer) {
    identityScore++;
    feedbackText.textContent = "🎉 " + currentQuestion.explanation;
    feedbackText.style.color = "#168a52";
  } else {
    feedbackText.textContent =
      "Nice try! " +
      currentQuestion.text +
      " is something we should think carefully about. The safer answer is: " +
      currentQuestion.answer +
      ".";
    feedbackText.style.color = "#7d4cff";
  }
}

function nextIdentityQuestion() {
  identityIndex++;

  if (identityIndex >= identityQuestions.length) {
    completeIdentityMission();
    return;
  }

  loadIdentityQuestion();
}

function completeIdentityMission() {
  localStorage.setItem("identityBadgeEarned", "true");

  const badgeSection = document.getElementById("badgeSection");
  const badgeIcon = document.querySelector(".locked-badge");

  if (badgeSection) {
    badgeSection.querySelector(".eyebrow").textContent = "Badge Earned!";
    badgeSection.querySelector("p").textContent =
      "Amazing work! You earned the Identity Protector Badge.";
  }

  if (badgeIcon) {
    badgeIcon.classList.remove("locked-badge");
    badgeIcon.classList.add("badge-earned");
  }

  alert("🎉 Meme says: You earned your Identity Protector Badge!");
}

document.addEventListener("DOMContentLoaded", () => {
  loadIdentityQuestion();

  const quizChoices = document.querySelectorAll(".quiz-choice");
  const nextButton = document.getElementById("nextQuestion");

  quizChoices.forEach((button) => {
    button.addEventListener("click", () => {
      answerIdentityQuestion(button.dataset.answer);
    });
  });

  if (nextButton) {
    nextButton.addEventListener("click", nextIdentityQuestion);
  }
});
function updateDashboardBadges() {
  const identityBadge = document.getElementById("identityBadge");
  const identityEarned = localStorage.getItem("identityBadgeEarned");

  if (identityBadge && identityEarned === "true") {
    identityBadge.classList.remove("locked");
    identityBadge.title = "Identity Protector Badge earned!";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateDashboardBadges();
});
