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

  if (!container) {
    return;
  }

  items.forEach((item) => {
    const button = document.createElement("button");

    button.className = "choice-button";
    button.type = "button";

    button.innerHTML = `
      <span>${item.emoji}</span>
      ${item.label}
    `;

    button.addEventListener("click", () => {
      heroData[type] = `${item.emoji} ${item.label}`;

      const allButtons =
        container.querySelectorAll(".choice-button");

      allButtons.forEach((choiceButton) => {
        choiceButton.classList.remove("selected");
      });

      button.classList.add("selected");

      updateHeroPreview();
    });

    container.appendChild(button);
  });
}

function updateHeroPreview() {
  const chosenColor =
    document.getElementById("chosenColor");

  const chosenAnimal =
    document.getElementById("chosenAnimal");

  const chosenPower =
    document.getElementById("chosenPower");

  if (chosenColor) {
    chosenColor.textContent =
      heroData.color || "Choose a color";
  }

  if (chosenAnimal) {
    chosenAnimal.textContent =
      heroData.animal || "Choose a sidekick";
  }

  if (chosenPower) {
    chosenPower.textContent =
      heroData.power || "Choose a power";
  }
}

function generateHeroName() {
  if (
    !heroData.color ||
    !heroData.animal ||
    !heroData.power
  ) {
    window.alert(
      "Meme says: Pick your suit color, sidekick, and cyber power first!"
    );

    return;
  }

  const randomTitle =
    heroTitles[
      Math.floor(
        Math.random() * heroTitles.length
      )
    ];

  const animalName =
    heroData.animal
      .replace(/[^\w\s]/g, "")
      .trim()
      .split(" ")
      .pop();

  const powerName =
    heroData.power
      .replace(/[^\w\s]/g, "")
      .trim()
      .split(" ")
      .pop();

  const nameStyles = [
    `${randomTitle} ${powerName}`,
    `${randomTitle} ${animalName}`,
    `${powerName} ${animalName}`,
    `${randomTitle} ${animalName} ${powerName}`
  ];

  heroData.name =
    nameStyles[
      Math.floor(
        Math.random() * nameStyles.length
      )
    ];

  const heroName =
    document.getElementById("heroName");

  if (heroName) {
    heroName.textContent = heroData.name;
  }
}

function saveHero() {
  if (!heroData.name) {
    window.alert(
      "Meme says: Generate your Cyber Hero name first!"
    );

    return;
  }

  localStorage.setItem(
    "safetiiHero",
    JSON.stringify(heroData)
  );

  window.location.href = "dashboard.html";
}

function loadHeroDashboard() {
  const savedHero =
    localStorage.getItem("safetiiHero");

  if (!savedHero) {
    return;
  }

  let hero;

  try {
    hero = JSON.parse(savedHero);
  } catch (error) {
    console.error(
      "Could not load saved hero:",
      error
    );

    return;
  }

  const heroName =
    document.getElementById(
      "dashboardHeroName"
    );

  const color =
    document.getElementById(
      "dashboardColor"
    );

  const animal =
    document.getElementById(
      "dashboardAnimal"
    );

  const power =
    document.getElementById(
      "dashboardPower"
    );

  if (heroName) {
    heroName.textContent =
      hero.name || "Cyber Mentee";
  }

  if (color) {
    color.textContent =
      hero.color || "Not chosen yet";
  }

  if (animal) {
    animal.textContent =
      hero.animal || "Not chosen yet";
  }

  if (power) {
    power.textContent =
      hero.power || "Not chosen yet";
  }
}

document.addEventListener(
  "DOMContentLoaded",
  () => {
    createChoices(
      "colorChoices",
      colors,
      "color"
    );

    createChoices(
      "animalChoices",
      animals,
      "animal"
    );

    createChoices(
      "powerChoices",
      powers,
      "power"
    );

    const generateButton =
      document.getElementById(
        "generateHero"
      );

    const saveButton =
      document.getElementById(
        "saveHero"
      );

    if (generateButton) {
      generateButton.addEventListener(
        "click",
        generateHeroName
      );
    }

    if (saveButton) {
      saveButton.addEventListener(
        "click",
        saveHero
      );
    }

    loadHeroDashboard();
  }
);

/* =========================================================
   BASIC IDENTITY QUIZ
========================================================= */

const identityQuestions = [
  {
    text:
      "Your favorite ice cream flavor",

    answer:
      "safe",

    explanation:
      "Correct! A favorite ice cream flavor usually does not identify where you live or who you are."
  },

  {
    text:
      "Your home address",

    answer:
      "private",

    explanation:
      "Correct! Your home address should stay private because it can show where you live."
  },

  {
    text:
      "Your password",

    answer:
      "private",

    explanation:
      "Correct! Passwords should never be shared except with a trusted adult when needed."
  },

  {
    text:
      "Your favorite color",

    answer:
      "safe",

    explanation:
      "Correct! A favorite color is usually safe because it does not reveal personal details."
  },

  {
    text:
      "Your school name",

    answer:
      "private",

    explanation:
      "Correct! Your school name can help strangers figure out where to find you."
  }
];

let identityIndex = 0;
let identityScore = 0;
let basicIdentityAnswered = false;

function loadIdentityQuestion() {
  const questionText =
    document.getElementById(
      "questionText"
    );

  const feedbackText =
    document.getElementById(
      "feedbackText"
    );

  if (
    !questionText ||
    !feedbackText ||
    !identityQuestions[identityIndex]
  ) {
    return;
  }

  questionText.textContent =
    identityQuestions[
      identityIndex
    ].text;

  feedbackText.textContent = "";

  basicIdentityAnswered = false;
}

function answerIdentityQuestion(
  selectedAnswer
) {
  if (basicIdentityAnswered) {
    return;
  }

  const feedbackText =
    document.getElementById(
      "feedbackText"
    );

  if (
    !feedbackText ||
    !identityQuestions[identityIndex]
  ) {
    return;
  }

  basicIdentityAnswered = true;

  const currentQuestion =
    identityQuestions[
      identityIndex
    ];

  if (
    selectedAnswer ===
    currentQuestion.answer
  ) {
    identityScore += 1;

    feedbackText.textContent =
      `🎉 ${currentQuestion.explanation}`;

    feedbackText.style.color =
      "#168a52";
  } else {
    feedbackText.textContent =
      "Nice try! " +
      currentQuestion.text +
      " is something we should think carefully about. " +
      "The safer answer is: " +
      currentQuestion.answer +
      ".";

    feedbackText.style.color =
      "#7d4cff";
  }
}

function nextIdentityQuestion() {
  identityIndex += 1;

  if (
    identityIndex >=
    identityQuestions.length
  ) {
    completeIdentityMission();
    return;
  }

  loadIdentityQuestion();
}

function completeIdentityMission() {
  localStorage.setItem(
    "identityBadgeEarned",
    "true"
  );

  const badgeSection =
    document.getElementById(
      "badgeSection"
    );

  const badgeIcon =
    document.querySelector(
      ".locked-badge"
    );

  if (badgeSection) {
    const eyebrow =
      badgeSection.querySelector(
        ".eyebrow"
      );

    const paragraph =
      badgeSection.querySelector(
        "p"
      );

    if (eyebrow) {
      eyebrow.textContent =
        "Badge Earned!";
    }

    if (paragraph) {
      paragraph.textContent =
        "Amazing work! You earned the Identity Protector Badge.";
    }
  }

  if (badgeIcon) {
    badgeIcon.classList.remove(
      "locked-badge"
    );

    badgeIcon.classList.add(
      "badge-earned"
    );
  }

  window.alert(
    "🎉 Meme says: You earned your Identity Protector Badge!"
  );
}

document.addEventListener(
  "DOMContentLoaded",
  () => {
    const quizChoices =
      document.querySelectorAll(
        ".quiz-choice"
      );

    const nextButton =
      document.getElementById(
        "nextQuestion"
      );

    if (
      document.getElementById(
        "questionText"
      )
    ) {
      loadIdentityQuestion();
    }

    quizChoices.forEach(
      (button) => {
        button.addEventListener(
          "click",
          () => {
            answerIdentityQuestion(
              button.dataset.answer
            );
          }
        );
      }
    );

    if (
      nextButton &&
      document.getElementById(
        "questionText"
      )
    ) {
      nextButton.addEventListener(
        "click",
        nextIdentityQuestion
      );
    }
  }
);

/* =========================================================
   DASHBOARD BADGE
========================================================= */

function updateDashboardBadges() {
  const identityBadge =
    document.getElementById(
      "identityBadge"
    );

  const identityEarned =
    localStorage.getItem(
      "identityBadgeEarned"
    );

  if (
    identityBadge &&
    identityEarned === "true"
  ) {
    identityBadge.classList.remove(
      "locked"
    );

    identityBadge.title =
      "Identity Protector Badge earned!";
  }
}

document.addEventListener(
  "DOMContentLoaded",
  updateDashboardBadges
);

/* =========================================================
   IDENTITY GAME QUIZ
========================================================= */

const identityGameQuestions = [
  {
    text:
      "Your favorite ice cream flavor",

    answer:
      "safe",

    explain:
      "Yes! Favorite foods do not usually reveal where you live or who you are."
  },

  {
    text:
      "Your home address",

    answer:
      "private",

    explain:
      "Correct. Your home address can show where you live, so keep it private."
  },

  {
    text:
      "Your password",

    answer:
      "private",

    explain:
      "Correct. Passwords should never be shared with friends or strangers."
  },

  {
    text:
      "A hero nickname like Cyber Dolphin",

    answer:
      "safe",

    explain:
      "Great job! A nickname is safer than using your real full name."
  },

  {
    text:
      "Your school name",

    answer:
      "private",

    explain:
      "Correct. Your school name can help someone figure out where to find you."
  },

  {
    text:
      "Your favorite animal",

    answer:
      "safe",

    explain:
      "Yes! Favorite animals are usually okay to share."
  },

  {
    text:
      "Your phone number",

    answer:
      "private",

    explain:
      "Correct. Your phone number should stay private."
  },

  {
    text:
      "Your gaming username",

    answer:
      "safe",

    explain:
      "Usually safe if it does not include your real name, birthday, school, or location."
  },

  {
    text:
      "Your birthday and year",

    answer:
      "private",

    explain:
      "Correct. Birthdays can be used to guess passwords or identify you."
  },

  {
    text:
      "Your favorite game",

    answer:
      "safe",

    explain:
      "Yes! A favorite game is usually safe to share."
  }
];

let identityGameIndex = 0;
let identityGameScore = 0;
let hasAnsweredIdentity = false;

function loadIdentityGameQuestion() {
  const question =
    document.getElementById(
      "identityQuestion"
    );

  const feedback =
    document.getElementById(
      "feedbackText"
    );

  const next =
    document.getElementById(
      "nextQuestion"
    );

  if (
    !question ||
    !feedback ||
    !next ||
    !identityGameQuestions[
      identityGameIndex
    ]
  ) {
    return;
  }

  question.textContent =
    identityGameQuestions[
      identityGameIndex
    ].text;

  feedback.textContent = "";
  feedback.style.background =
    "transparent";

  next.classList.add("hidden");

  hasAnsweredIdentity = false;
}

function answerIdentityGame(choice) {
  if (hasAnsweredIdentity) {
    return;
  }

  const feedback =
    document.getElementById(
      "feedbackText"
    );

  const score =
    document.getElementById(
      "identityScore"
    );

  const next =
    document.getElementById(
      "nextQuestion"
    );

  const current =
    identityGameQuestions[
      identityGameIndex
    ];

  if (
    !feedback ||
    !score ||
    !next ||
    !current
  ) {
    return;
  }

  hasAnsweredIdentity = true;

  if (choice === current.answer) {
    identityGameScore += 10;

    score.textContent =
      identityGameScore;

    feedback.textContent =
      `🎉 Great job! ${current.explain}`;

    feedback.style.background =
      "#e9fff3";

    feedback.style.color =
      "#168a52";
  } else {
    feedback.textContent =
      `Nice try! Meme says: ${current.explain}`;

    feedback.style.background =
      "#f3efff";

    feedback.style.color =
      "#7d4cff";
  }

  next.classList.remove("hidden");
}

function nextIdentityGameQuestion() {
  identityGameIndex += 1;

  if (
    identityGameIndex >=
    identityGameQuestions.length
  ) {
    completeIdentityGameMission();
    return;
  }

  loadIdentityGameQuestion();
}

function completeIdentityGameMission() {
  localStorage.setItem(
    "identityBadgeEarned",
    "true"
  );

  const complete =
    document.getElementById(
      "missionComplete"
    );

  if (complete) {
    complete.classList.remove(
      "hidden"
    );

    complete.scrollIntoView({
      behavior: "smooth"
    });
  }
}

document.addEventListener(
  "DOMContentLoaded",
  () => {
    const identityQuestion =
      document.getElementById(
        "identityQuestion"
      );

    if (!identityQuestion) {
      return;
    }

    loadIdentityGameQuestion();

    const gameChoices =
      document.querySelectorAll(
        "[data-identity-answer]"
      );

    const nextButton =
      document.getElementById(
        "nextQuestion"
      );

    gameChoices.forEach(
      (button) => {
        button.addEventListener(
          "click",
          () => {
            answerIdentityGame(
              button.dataset
                .identityAnswer
            );
          }
        );
      }
    );

    if (nextButton) {
      nextButton.addEventListener(
        "click",
        nextIdentityGameQuestion
      );
    }
  }
);

/* =========================================================
   NOTEBOOK — REPLAY IDENTITY ISLAND
========================================================= */

function replayIdentityMissionFromNotebook() {
  const confirmed =
    window.confirm(
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

  identityProgressKeys.forEach(
    (key) => {
      localStorage.removeItem(key);
    }
  );

  window.location.href =
    "missions/identity.html?replay=true";
}

document.addEventListener(
  "DOMContentLoaded",
  () => {
    const isNotebookPage =
      window.location.pathname
        .endsWith(
          "/notebook.html"
        ) ||
      window.location.pathname
        .endsWith(
          "notebook.html"
        );

    if (!isNotebookPage) {
      return;
    }

    const replayButton =
      document.getElementById(
        "replayIdentityMission"
      );

    if (replayButton) {
      replayButton.addEventListener(
        "click",
        replayIdentityMissionFromNotebook
      );
    }
  }
);

/* =========================================================
   LOAD CYBER NOTEBOOK
========================================================= */

function loadCyberNotebook() {
  const heroName =
    document.getElementById(
      "notebookHeroName"
    );

  const points =
    document.getElementById(
      "notebookPoints"
    );

  const badge =
    document.getElementById(
      "identityNotebookBadge"
    );

  const badgeText =
    document.getElementById(
      "identityBadgeText"
    );

  const stickerBook =
    document.getElementById(
      "identityStickerBook"
    );

  const savedHero =
    localStorage.getItem(
      "safetiiHero"
    );

  const savedPoints =
    localStorage.getItem(
      "safetiiPoints"
    ) || "0";

  const identityEarned =
    localStorage.getItem(
      "identityBadgeEarned"
    ) === "true";

  let stickers = [];

  try {
    const missionProgress =
      JSON.parse(
        localStorage.getItem(
          "safetiiIdentityProgress"
        ) || "null"
      );

    stickers =
      missionProgress
        ?.foundStickers ||
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
      try {
        const hero =
          JSON.parse(savedHero);

        heroName.textContent =
          `${hero.name || "Cyber Mentee"}’s Notebook`;
      } catch (error) {
        console.error(
          "Could not load notebook hero:",
          error
        );

        heroName.textContent =
          "Cyber Mentee’s Notebook";
      }
    } else {
      heroName.textContent =
        "Cyber Mentee’s Notebook";
    }
  }

  if (points) {
    points.textContent =
      savedPoints;
  }

  if (
    badge &&
    badgeText &&
    identityEarned
  ) {
    badge.classList.remove(
      "locked-notebook-badge"
    );

    badgeText.textContent =
      "Badge earned! You are an Identity Protector.";
  }

  if (stickerBook) {
    const slots =
      stickerBook.querySelectorAll(
        ".sticker-slot"
      );

    stickers.forEach(
      (sticker, index) => {
        if (!slots[index]) {
          return;
        }

        slots[index].textContent =
          "⭐";

        slots[index].title =
          sticker;

        slots[index].classList.add(
          "earned"
        );
      }
    );
  }
}

document.addEventListener(
  "DOMContentLoaded",
  loadCyberNotebook
);

/* =========================================================
   UPDATE IDENTITY MISSION BUTTON
========================================================= */

function updateIdentityMissionButton() {
  const button =
    document.getElementById(
      "identityMissionButton"
    );

  if (!button) {
    return;
  }

  let progress = null;

  try {
    progress =
      JSON.parse(
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

  if (
    !progress ||
    !progress.started
  ) {
    button.textContent =
      "Start Lesson";

    button.href =
      "missions/identity.html";

    return;
  }

  if (progress.completed) {
    button.textContent =
      "Replay Lesson";

    button.href =
      "missions/identity.html";

    return;
  }

  button.textContent =
    "Continue Lesson";

  button.href =
    "missions/identity.html";
}

document.addEventListener(
  "DOMContentLoaded",
  updateIdentityMissionButton
);

/* =========================================================
   REPLAY IDENTITY MISSION
========================================================= */

function replayIdentityMission() {
  const confirmed =
    window.confirm(
      "Are you sure you want to replay Identity Island?\n\n" +
      "This will erase your current mission progress and return you to the beginning.\n\n" +
      "Points and badges you already earned will not be removed."
    );

  if (!confirmed) {
    return;
  }

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

  missionProgressKeys.forEach(
    (key) => {
      localStorage.removeItem(key);
    }
  );

  window.location.href =
    "./missions/identity.html?replay=true";
}

document.addEventListener(
  "DOMContentLoaded",
  () => {
    const retryButton =
      document.getElementById(
        "retryMission"
      );

    if (
      retryButton &&
      typeof replayIdentityMission ===
        "function"
    ) {
      retryButton.addEventListener(
        "click",
        replayIdentityMission
      );
    }
  }
);

/* =========================================
   DASHBOARD ARCADE RECENT GAME
========================================= */

(function () {
  const STORAGE_KEY = "safetiiLastArcadeGame";

  const gameInfo = {
    "Handle With Care": {
      icon: "📦",
      label: "Last played",
      subtitle: "Sorting clues in the Username Factory.",
      buttonText: "Jump Back In",
      href: "arcade/games/handle-with-care.html"
    },
    "Slash the Scam": {
      icon: "⚔️",
      label: "Last played",
      subtitle: "Cutting through scam messages and spotting safe choices.",
      buttonText: "Jump Back In",
      href: "arcade/games/slash-the-scam.html"
    },
    "Pieces of Me": {
      icon: "🧩",
      label: "Last played",
      subtitle: "Sorting identity clues into the right groups.",
      buttonText: "Jump Back In",
      href: "arcade/games/pieces-of-me.html"
    }
  };

  function safeReadRecentGame() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      return null;
    }
  }

  function safeWriteRecentGame(payload) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (error) {
      console.warn("Could not save recent arcade game.", error);
    }
  }

  function updateDashboardArcadePanel() {
    const panel = document.getElementById("dashboardArcadePanel");
    if (!panel) {
      return;
    }

    const heading = document.getElementById("dashboardArcadeHeading");
    const description = document.getElementById("dashboardArcadeDescription");
    const recentLabel = document.getElementById("dashboardArcadeRecentLabel");
    const recentText = document.getElementById("dashboardArcadeRecentText");
    const button = document.getElementById("dashboardArcadeButton");
    const badge = document.getElementById("dashboardArcadeBadge");
    const icon = document.getElementById("dashboardArcadeIcon");
    const gameName = document.getElementById("dashboardArcadeGameName");
    const gameMode = document.getElementById("dashboardArcadeGameMode");

    const recent = safeReadRecentGame();

    if (!recent || !recent.title) {
      if (heading) heading.textContent = "Cyber Arcade";
      if (description) {
        description.textContent =
          "Practice cybersecurity skills through games and challenges.";
      }
      if (recentLabel) recentLabel.textContent = "No game played yet";
      if (recentText) {
        recentText.textContent =
          "Start your first arcade game to see it here.";
      }
      if (button) {
        button.textContent = "Enter the Arcade";
        button.href = "arcade/index.html";
      }
      if (badge) badge.textContent = "Ready to Play";
      if (icon) icon.textContent = "🎮";
      if (gameName) gameName.textContent = "Cyber Arcade";
      if (gameMode) gameMode.textContent = "Pick a game and start practicing.";
      return;
    }

    const details = gameInfo[recent.title] || {
      icon: recent.icon || "🎮",
      label: "Last played",
      subtitle: recent.subtitle || "Continue your most recent arcade game.",
      buttonText: "Jump Back In",
      href: recent.href || "arcade/index.html"
    };

    if (heading) heading.textContent = "Cyber Arcade";
    if (description) {
      description.textContent =
        "Your most recent arcade game is ready whenever you want to keep practicing.";
    }
    if (recentLabel) recentLabel.textContent = `${details.label}: ${recent.title}`;
    if (recentText) recentText.textContent = details.subtitle;

    if (button) {
      button.textContent = details.buttonText;
      button.href = details.href;
    }

    if (badge) badge.textContent = "Recent Game";
    if (icon) icon.textContent = details.icon;
    if (gameName) gameName.textContent = recent.title;
    if (gameMode) gameMode.textContent = "Continue where you left off.";
  }

  function trackArcadeGameFromBody() {
    const body = document.body;
    if (!body) {
      return;
    }

    const title = body.dataset.arcadeTitle;
    if (!title) {
      return;
    }

    const payload = {
      title: title,
      icon: body.dataset.arcadeIcon || "🎮",
      href: body.dataset.arcadeHref || location.pathname.replace(/^\//, "")
    };

    safeWriteRecentGame(payload);
  }

  window.SafetiiSetRecentArcadeGame = function (title, href, icon) {
    safeWriteRecentGame({
      title: title,
      href: href,
      icon: icon || "🎮"
    });
  };

  document.addEventListener("DOMContentLoaded", function () {
    trackArcadeGameFromBody();
    updateDashboardArcadePanel();
  });
})();

/* =========================================
   HOMEPAGE HERO — CYBER HERO LAUNCH ZONE
========================================= */

(function () {
  const memePortraitButton = document.getElementById("memePortraitButton");
  const memePortrait = document.getElementById("memePortrait");
  const memeMessageTitle = document.getElementById("memeMessageTitle");
  const memeMessageBody = document.getElementById("memeMessageBody");
  const memeBurst = document.getElementById("memeBurst");
  const launchWelcomeName = document.getElementById("launchWelcomeName");
  const launchWelcomeRank = document.getElementById("launchWelcomeRank");
  const launchStartButton = document.getElementById("launchStartButton");

  if (!memePortraitButton || !memePortrait) {
    return;
  }

  const memeMessages = [
    {
      title: "Your Cyber Mentor",
      body: "I will guide you through every mission and help you understand the choices that keep accounts, information, and people safer online."
    },
    {
      title: "Mission Time!",
      body: "Every hero starts with one smart choice. Begin your first mission and build your cyber powers step by step."
    },
    {
      title: "Badges Ahead!",
      body: "Complete missions, earn badges, and watch your cyber skills grow stronger every time you play."
    },
    {
      title: "Arcade Practice",
      body: "After missions, visit the arcade to practice what you learned through games and fun challenges."
    }
  ];

  let memeMessageIndex = 0;

  function getHeroData() {
    try {
      const raw = localStorage.getItem("safetiiHero");
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      return null;
    }
  }

  function getCompletedBadges() {
    try {
      const progressRaw = localStorage.getItem("safetiiMissionProgress");
      if (!progressRaw) {
        return [];
      }

      const progress = JSON.parse(progressRaw);
      const badgeTitles = [];

      if (progress.identity && progress.identity.completed) {
        badgeTitles.push("Identity Protector");
      }
      if (progress.password && progress.password.completed) {
        badgeTitles.push("Password Safe Keeper");
      }
      if (progress.phishing && progress.phishing.completed) {
        badgeTitles.push("Phish Finder");
      }
      if (progress.footprint && progress.footprint.completed) {
        badgeTitles.push("Digital Footprint Defender");
      }
      if (progress.responder && progress.responder.completed) {
        badgeTitles.push("Cyber Responder");
      }

      return badgeTitles;
    } catch (error) {
      return [];
    }
  }

  function updateLaunchWelcome() {
    const hero = getHeroData();
    const badges = getCompletedBadges();

    if (!launchWelcomeName || !launchWelcomeRank || !launchStartButton) {
      return;
    }

    if (hero && hero.name) {
      const currentRank =
        badges.length > 0 ? badges[badges.length - 1] : "Cyber Mentee";

      launchWelcomeName.textContent = `Welcome back, ${hero.name}!`;
      launchWelcomeRank.textContent = `Current rank: ${currentRank} • ${badges.length} of 5 badges earned`;
      launchStartButton.textContent = "Continue Your Adventure";
      launchStartButton.setAttribute("href", "dashboard.html");
    } else {
      launchWelcomeName.textContent = "Welcome, Cyber Hero!";
      launchWelcomeRank.textContent = "Create your hero and begin your first cyber adventure.";
      launchStartButton.textContent = "Start Your Adventure";
      launchStartButton.setAttribute("href", "login.html");
    }
  }

  function createBurst() {
    if (!memeBurst) {
      return;
    }

    memeBurst.innerHTML = "";

    const burstItems = ["⭐", "✨", "🛡️", "💫", "⚡"];
    const positions = [
      { x: "-42px", y: "-52px" },
      { x: "52px", y: "-42px" },
      { x: "-58px", y: "16px" },
      { x: "56px", y: "22px" },
      { x: "0px", y: "-64px" }
    ];

    positions.forEach((position, index) => {
      const star = document.createElement("span");
      star.className = "meme-burst-star";
      star.textContent = burstItems[index % burstItems.length];
      star.style.left = "110px";
      star.style.top = "90px";
      star.style.setProperty("--burst-x", position.x);
      star.style.setProperty("--burst-y", position.y);
      star.style.animationDelay = `${index * 0.04}s`;
      memeBurst.appendChild(star);
    });

    setTimeout(() => {
      memeBurst.innerHTML = "";
    }, 850);
  }

  function playMemeDance() {
    memePortrait.classList.remove("meme-dance");
    void memePortrait.offsetWidth;
    memePortrait.classList.add("meme-dance");

    createBurst();

    memeMessageIndex = (memeMessageIndex + 1) % memeMessages.length;
    memeMessageTitle.textContent = memeMessages[memeMessageIndex].title;
    memeMessageBody.textContent = memeMessages[memeMessageIndex].body;
  }

  memePortraitButton.addEventListener("click", playMemeDance);

  updateLaunchWelcome();
})();
