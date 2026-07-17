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

const identityGameQuestions = [
  {
    text: "Your favorite ice cream flavor",
    answer: "safe",
    explain: "Yes! Favorite foods do not usually reveal where you live or who you are."
  },
  {
    text: "Your home address",
    answer: "private",
    explain: "Correct. Your home address can show where you live, so keep it private."
  },
  {
    text: "Your password",
    answer: "private",
    explain: "Correct. Passwords should never be shared with friends or strangers."
  },
  {
    text: "A hero nickname like Cyber Dolphin",
    answer: "safe",
    explain: "Great job! A nickname is safer than using your real full name."
  },
  {
    text: "Your school name",
    answer: "private",
    explain: "Correct. Your school name can help someone figure out where to find you."
  },
  {
    text: "Your favorite animal",
    answer: "safe",
    explain: "Yes! Favorite animals are usually okay to share."
  },
  {
    text: "Your phone number",
    answer: "private",
    explain: "Correct. Your phone number should stay private."
  },
  {
    text: "Your gaming username",
    answer: "safe",
    explain: "Usually safe if it does not include your real name, birthday, school, or location."
  },
  {
    text: "Your birthday and year",
    answer: "private",
    explain: "Correct. Birthdays can be used to guess passwords or identify you."
  },
  {
    text: "Your favorite game",
    answer: "safe",
    explain: "Yes! A favorite game is usually safe to share."
  }
];

let identityGameIndex = 0;
let identityGameScore = 0;
let hasAnsweredIdentity = false;

function loadIdentityGameQuestion() {
  const question = document.getElementById("identityQuestion");
  const feedback = document.getElementById("feedbackText");
  const next = document.getElementById("nextQuestion");

  if (!question || !feedback || !next) return;

  question.textContent = identityGameQuestions[identityGameIndex].text;
  feedback.textContent = "";
  feedback.style.background = "transparent";
  next.classList.add("hidden");
  hasAnsweredIdentity = false;
}

function answerIdentityGame(choice) {
  if (hasAnsweredIdentity) return;

  const feedback = document.getElementById("feedbackText");
  const score = document.getElementById("identityScore");
  const next = document.getElementById("nextQuestion");
  const current = identityGameQuestions[identityGameIndex];

  if (!feedback || !score || !next) return;

  hasAnsweredIdentity = true;

  if (choice === current.answer) {
    identityGameScore += 10;
    score.textContent = identityGameScore;
    feedback.textContent = "🎉 Great job! " + current.explain;
    feedback.style.background = "#e9fff3";
    feedback.style.color = "#168a52";
  } else {
    feedback.textContent = "Nice try! Meme says: " + current.explain;
    feedback.style.background = "#f3efff";
    feedback.style.color = "#7d4cff";
  }

  next.classList.remove("hidden");
}

function nextIdentityGameQuestion() {
  identityGameIndex++;

  if (identityGameIndex >= identityGameQuestions.length) {
    completeIdentityGameMission();
    return;
  }

  loadIdentityGameQuestion();
}

function completeIdentityGameMission() {
  localStorage.setItem("identityBadgeEarned", "true");

  const complete = document.getElementById("missionComplete");
  if (complete) {
    complete.classList.remove("hidden");
    complete.scrollIntoView({ behavior: "smooth" });
  }
}

"use strict";

/* =========================================================
   NOTEBOOK — REPLAY IDENTITY ISLAND
   Runs only on notebook.html
========================================================= */

function replayIdentityMissionFromNotebook() {
  const confirmed = window.confirm(
    "Are you sure you want to replay Identity Island?\n\n" +
    "This will erase your current mission progress and return you to the beginning.\n\n" +
    "Points, previously rewarded stickers, and earned badges will not be removed."
  );

  if (!confirmed) {
    return;
  }

  const identityProgressKeys = [
    "safetiiIdentityProgress",
    "identityCurrentStep",
    "identityFoundObjects",
    "identityUsernameProgress",
    "identityBackpackProgress",
    "identityProfileProgress",
    "identityTestProgress",
    "identityStickers"
  ];

  identityProgressKeys.forEach((key) => {
    localStorage.removeItem(key);
  });

  window.location.href =
    "missions/identity.html?replay=true";
}

document.addEventListener("DOMContentLoaded", () => {
  const isNotebookPage =
    window.location.pathname.endsWith("/notebook.html") ||
    window.location.pathname.endsWith("notebook.html");

  if (!isNotebookPage) {
    return;
  }

  const replayButton =
    document.getElementById("retryMission");

  if (replayButton) {
    replayButton.addEventListener(
      "click",
      replayIdentityMissionFromNotebook
    );
  }
});

  if (nextButton) {
    nextButton.addEventListener(
      "click",
      nextIdentityGameQuestion
    );
  }

  /*
    Notebook replay button.
  */

  const retryButton =
    document.getElementById("retryMission");

  if (retryButton) {
    retryButton.addEventListener(
      "click",
      replayIdentityMission
    );
  }
});

function loadCyberNotebook() {
  const heroName = document.getElementById("notebookHeroName");
  const points = document.getElementById("notebookPoints");
  const badge = document.getElementById("identityNotebookBadge");
  const badgeText = document.getElementById("identityBadgeText");
  const stickerBook = document.getElementById("identityStickerBook");

  const savedHero = localStorage.getItem("safetiiHero");
  const savedPoints = localStorage.getItem("safetiiPoints") || "0";
  const identityEarned = localStorage.getItem("identityBadgeEarned") === "true";
 let stickers = [];

try {
  const missionProgress = JSON.parse(
    localStorage.getItem(
      "safetiiIdentityProgress"
    ) || "null"
  );

  stickers =
    missionProgress?.foundStickers ||
    JSON.parse(
      localStorage.getItem(
        "identityStickers"
      ) || "[]"
    );
} catch (error) {
  console.error(
    "Could not load notebook stickers:",
    error
  );

  stickers = [];
}
  if (heroName) {
    if (savedHero) {
      const hero = JSON.parse(savedHero);
      heroName.textContent = `${hero.name || "Cyber Mentee"}’s Notebook`;
    } else {
      heroName.textContent = "Cyber Mentee’s Notebook";
    }
  }

  if (points) {
    points.textContent = savedPoints;
  }

  if (badge && badgeText && identityEarned) {
    badge.classList.remove("locked-notebook-badge");
    badgeText.textContent = "Badge earned! You are an Identity Protector.";
  }

  if (stickerBook) {
    const slots = stickerBook.querySelectorAll(".sticker-slot");

    stickers.forEach((sticker, index) => {
      if (slots[index]) {
        slots[index].textContent = "⭐";
        slots[index].title = sticker;
        slots[index].classList.add("earned");
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", loadCyberNotebook);

function updateIdentityMissionButton() {
  const button = document.getElementById(
    "identityMissionButton"
  );

  if (!button) {
    return;
  }

  let progress = null;

  try {
    progress = JSON.parse(
      localStorage.getItem(
        "safetiiIdentityProgress"
      ) || "null"
    );
  } catch (error) {
    console.error(
      "Could not read Identity Island progress:",
      error
    );
  }

  if (!progress || !progress.started) {
    button.textContent = "Start Lesson";
    button.href = "missions/identity.html";
    return;
  }

  if (progress.completed) {
    button.textContent = "Replay Lesson";
    button.href = "missions/identity.html";
    return;
  }

  button.textContent = "Continue Lesson";
  button.href = "missions/identity.html";
}

document.addEventListener(
  "DOMContentLoaded",
  updateIdentityMissionButton
);
"use strict";

function replayIdentityMission() {
  const confirmed = window.confirm(
    "Are you sure you want to replay Identity Island?\n\n" +
    "This will erase your current mission progress and return you to the beginning.\n\n" +
    "Points and badges you already earned will not be removed."
  );

  if (!confirmed) {
    return;
  }

  /*
    Erase progress for the current mission attempt.
  */
  const missionProgressKeys = [
    "safetiiIdentityProgress",
    "identityStickers",
    "identityCurrentStep",
    "identityFoundObjects",
    "identityUsernameProgress",
    "identityBackpackProgress",
    "identityProfileProgress",
    "identityTestProgress"
  ];

  missionProgressKeys.forEach((key) => {
    localStorage.removeItem(key);
  });

  /*
    Do not remove:
      safetiiPoints
      identityAwardedStickers
      earned badges

    Keeping identityAwardedStickers prevents students from
    repeatedly replaying the mission to earn sticker points.
  */

  window.location.href = "./missions/identity.html?replay=true";
}

document.addEventListener("DOMContentLoaded", () => {
  const replayButton = document.getElementById(
    "replayIdentityMission"
  );

  if (replayButton) {
    replayButton.addEventListener(
      "click",
      replayIdentityMission
    );
  }
});

