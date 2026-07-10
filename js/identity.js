"use strict";

/* =========================================================
   SAFETII NET — IDENTITY ISLAND
========================================================= */

/* ---------------------------------------------------------
   LESSON CONTENT
--------------------------------------------------------- */

const lessons = {
  house: {
    title: "🏠 Home Address",
    text: "A home address is private because it tells people exactly where someone lives."
  },
  school: {
    title: "🏫 School Name",
    text: "A school name should stay private because it can reveal where a child can be found."
  },
  phone: {
    title: "📱 Phone Number",
    text: "A phone number is private. Strangers should not be able to contact you directly."
  },
  backpack: {
    title: "🎒 Safe Online Names",
    text: "Use an online name that does not reveal your real name, birthday, school, address, phone number, or location."
  },
  pizza: {
    title: "🍕 Favorite Food",
    text: "Favorite foods are usually safe to share because they do not reveal where you live or who you are."
  },
  controller: {
    title: "🎮 Gaming Username",
    text: "A gaming username is safer when it does not include your real name, birthday, school, address, or location."
  }
};

/* ---------------------------------------------------------
   USERNAME GENERATOR
--------------------------------------------------------- */

const usernameWords = {
  colors: [
    "Purple",
    "Cyan",
    "Golden",
    "Silver",
    "Coral",
    "Emerald",
    "Indigo",
    "Sunny",
    "Cosmic",
    "Neon"
  ],
  traits: [
    "Brave",
    "Clever",
    "Curious",
    "Swift",
    "Kind",
    "Mighty",
    "Bright",
    "Calm",
    "Epic",
    "Super"
  ],
  animals: [
    "Dolphin",
    "Fox",
    "Owl",
    "Panda",
    "Turtle",
    "Dragon",
    "Tiger",
    "Penguin",
    "Koala",
    "Falcon"
  ],
  powers: [
    "Shield",
    "Rocket",
    "Spark",
    "Star",
    "Pixel",
    "Nova",
    "Comet",
    "Tech",
    "Signal",
    "Quest"
  ]
};

/* ---------------------------------------------------------
   BACKPACK RESCUE PRACTICE
--------------------------------------------------------- */

const practiceQuestions = [
  {
    text: "Favorite color",
    answer: "safe",
    explanation: "Favorite colors are usually safe to share."
  },
  {
    text: "Home address",
    answer: "private",
    explanation: "Your home address should stay private."
  },
  {
    text: "Password",
    answer: "private",
    explanation: "Passwords should never be shared."
  },
  {
    text: "Favorite animal",
    answer: "safe",
    explanation: "Favorite animals are usually safe to share."
  },
  {
    text: "School name",
    answer: "private",
    explanation: "A school name can reveal where someone can find you."
  },
  {
    text: "A made-up online nickname",
    answer: "safe",
    explanation: "A made-up nickname is safe when it does not reveal personal details."
  },
  {
    text: "Phone number",
    answer: "private",
    explanation: "Phone numbers should stay private."
  },
  {
    text: "Favorite game",
    answer: "safe",
    explanation: "Favorite games are usually safe to share."
  },
  {
    text: "Birthday and birth year",
    answer: "private",
    explanation: "Birthdays can help someone identify you or guess a password."
  },
  {
    text: "Favorite pizza topping",
    answer: "safe",
    explanation: "Favorite foods are usually safe to share."
  }
];

/* ---------------------------------------------------------
   FINAL TEST — 20 QUESTIONS
--------------------------------------------------------- */

const testQuestions = [
  {
    text: "Your home address",
    answer: "private",
    explanation: "Your home address reveals where you live."
  },
  {
    text: "Your favorite ice cream flavor",
    answer: "safe",
    explanation: "Favorite foods are usually safe to share."
  },
  {
    text: "Your full first and last name",
    answer: "private",
    explanation: "A full name can identify you."
  },
  {
    text: "A made-up online name",
    answer: "safe",
    explanation: "A made-up name is safer when it does not reveal personal details."
  },
  {
    text: "Your password",
    answer: "private",
    explanation: "Passwords should always stay private."
  },
  {
    text: "Your favorite game",
    answer: "safe",
    explanation: "Favorite games are usually safe to share."
  },
  {
    text: "Your parent or guardian's phone number",
    answer: "private",
    explanation: "Family contact information is private."
  },
  {
    text: "Your school name",
    answer: "private",
    explanation: "A school name can reveal where you can be found."
  },
  {
    text: "Your favorite superhero",
    answer: "safe",
    explanation: "That usually does not reveal personal information."
  },
  {
    text: "A photo showing your school uniform and school name",
    answer: "private",
    explanation: "Pictures can reveal private clues."
  },
  {
    text: "Your favorite color",
    answer: "safe",
    explanation: "Favorite colors are usually safe."
  },
  {
    text: "The street where you live",
    answer: "private",
    explanation: "Your street is part of your location."
  },
  {
    text: "A hobby you enjoy",
    answer: "safe",
    explanation: "Hobbies are usually safe to share."
  },
  {
    text: "Your birthday and birth year",
    answer: "private",
    explanation: "Birthdays can be used to identify you."
  },
  {
    text: "Your gaming password",
    answer: "private",
    explanation: "Gaming passwords should never be shared."
  },
  {
    text: "Your favorite animal",
    answer: "safe",
    explanation: "Favorite animals are usually safe."
  },
  {
    text: "Your exact current location",
    answer: "private",
    explanation: "Your current location should stay private."
  },
  {
    text: "A username containing your school and birth year",
    answer: "private",
    explanation: "That username reveals personal information."
  },
  {
    text: "A username like PurpleRocketFox",
    answer: "safe",
    explanation: "That username does not reveal personal details."
  },
  {
    text: "Your home Wi-Fi password",
    answer: "private",
    explanation: "Wi-Fi passwords should stay private."
  }
];

/* ---------------------------------------------------------
   MISSION STATE
--------------------------------------------------------- */

let foundObjects = new Set();
let foundStickers = new Set();

let generatedUsername = "";
let usernamesChecked = 0;
let usernameAwaitingApproval = false;

let practiceIndex = 0;
let practiceCorrect = 0;
let practiceAnswered = false;

let testIndex = 0;
let testCorrect = 0;
let testAnswered = false;

/* ---------------------------------------------------------
   GENERAL HELPERS
--------------------------------------------------------- */

function byId(id) {
  return document.getElementById(id);
}

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function setMemeTip(message, mood = "thinking") {
  const tip = byId("memeTip");
  const image = byId("memeImage");

  if (tip) {
    tip.textContent = message;
  }

  if (!image) {
    return;
  }

  const images = {
    thinking: "../assets/mascot/thinking.png",
    wrong: "../assets/mascot/wrong.png",
    congrats: "../assets/mascot/congrats.png",
    welcome: "../assets/mascot/welcome.png"
  };

  image.src = images[mood] || images.thinking;
}

function showSection(sectionId) {
  const sectionIds = [
    "missionAlert",
    "exploreZone",
    "usernameZone",
    "practiceZone",
    "testZone",
    "missionResult"
  ];

  sectionIds.forEach((id) => {
    const section = byId(id);

    if (section) {
      section.classList.add("hidden");
    }
  });

  const activeSection = byId(sectionId);

  if (activeSection) {
    activeSection.classList.remove("hidden");

    activeSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

/* ---------------------------------------------------------
   LOAD HERO NAME
--------------------------------------------------------- */

function loadMissionHeroName() {
  const heroNameElement = byId("missionHeroName");

  if (!heroNameElement) {
    return;
  }

  try {
    const savedHero = localStorage.getItem("safetiiHero");

    if (!savedHero) {
      heroNameElement.textContent = "Cyber Mentee";
      return;
    }

    const hero = JSON.parse(savedHero);

    heroNameElement.textContent =
      hero.name && typeof hero.name === "string"
        ? hero.name
        : "Cyber Mentee";
  } catch (error) {
    console.error("Could not load the saved hero:", error);
    heroNameElement.textContent = "Cyber Mentee";
  }
}

/* ---------------------------------------------------------
   ACCEPT MISSION
--------------------------------------------------------- */

function acceptMission() {
  showSection("exploreZone");

  setMemeTip(
    "Explore Identity Island. Click all 6 learning objects to unlock the Safe Username Lab.",
    "welcome"
  );
}

/* ---------------------------------------------------------
   STEP 1 — EXPLORE IDENTITY ISLAND
--------------------------------------------------------- */

function openLesson(objectKey, button) {
  const lesson = lessons[objectKey];
  const popup = byId("lessonPopup");
  const title = byId("lessonTitle");
  const text = byId("lessonText");
  const objectsFound = byId("objectsFound");
  const usernameLabButton = byId("goUsernameLab");

  if (!lesson || !popup || !title || !text) {
    console.error("A lesson element is missing.");
    return;
  }

  title.textContent = lesson.title;
  text.textContent = lesson.text;
  popup.classList.remove("hidden");

  foundObjects.add(objectKey);

  if (button) {
    button.classList.add("discovered", "wiggle");

    window.setTimeout(() => {
      button.classList.remove("wiggle");
    }, 600);
  }

  if (objectsFound) {
    objectsFound.textContent = String(foundObjects.size);
  }

  if (foundObjects.size >= 6 && usernameLabButton) {
    usernameLabButton.disabled = false;
    usernameLabButton.classList.remove("locked-action");
    usernameLabButton.textContent = "Open Safe Username Lab 🧪";

    setMemeTip(
      "Excellent exploring! The Safe Username Lab is now unlocked.",
      "congrats"
    );
  }
}

function closeLessonPopup() {
  const popup = byId("lessonPopup");

  if (popup) {
    popup.classList.add("hidden");
  }
}

function collectSticker(button) {
  if (!button) {
    return;
  }

  const stickerName = button.dataset.sticker;

  if (!stickerName || foundStickers.has(stickerName)) {
    return;
  }

  foundStickers.add(stickerName);

  button.classList.add("collected");
  button.textContent = "✨";

  setMemeTip(
    `You found a hidden sticker: ${stickerName}!`,
    "congrats"
  );
}

/* ---------------------------------------------------------
   STEP 2 — SAFE USERNAME LAB
--------------------------------------------------------- */

function openUsernameLab() {
  if (foundObjects.size < 6) {
    setMemeTip(
      `Find all 6 learning objects first. You found ${foundObjects.size} out of 6.`,
      "thinking"
    );

    return;
  }

  showSection("usernameZone");

  setMemeTip(
    "Welcome to the Safe Username Lab! Generate safe online names that do not reveal personal information.",
    "welcome"
  );
}

function generateSafeUsername() {
  const usernameDisplay = byId("generatedUsername");
  const checklist = byId("usernameChecklist");
  const approveButton = byId("approveUsername");

  if (!usernameDisplay || !checklist || !approveButton) {
    console.error("Username Lab elements are missing.");
    return;
  }

  const patterns = [
    () =>
      `${randomItem(usernameWords.colors)}${randomItem(usernameWords.animals)}${randomItem(usernameWords.powers)}`,

    () =>
      `${randomItem(usernameWords.traits)}${randomItem(usernameWords.animals)}${randomItem(usernameWords.powers)}`,

    () =>
      `${randomItem(usernameWords.colors)}${randomItem(usernameWords.traits)}${randomItem(usernameWords.animals)}`,

    () =>
      `${randomItem(usernameWords.powers)}${randomItem(usernameWords.animals)}${randomItem(usernameWords.traits)}`
  ];

  generatedUsername = randomItem(patterns)();
  usernameAwaitingApproval = true;

  usernameDisplay.textContent = generatedUsername;

  usernameDisplay.classList.remove("username-pop");
  void usernameDisplay.offsetWidth;
  usernameDisplay.classList.add("username-pop");

  checklist.innerHTML = `
    <div class="scan-result safe-scan">
      <span>✅</span>
      <p>
        <strong>No real name</strong><br>
        This username does not reveal a real first or last name.
      </p>
    </div>

    <div class="scan-result safe-scan">
      <span>✅</span>
      <p>
        <strong>No birthday</strong><br>
        It does not contain an age, birthday, or birth year.
      </p>
    </div>

    <div class="scan-result safe-scan">
      <span>✅</span>
      <p>
        <strong>No location clues</strong><br>
        It does not reveal a school, address, city, or location.
      </p>
    </div>

    <div class="scan-result safe-scan">
      <span>✅</span>
      <p>
        <strong>No contact information</strong><br>
        It does not include a phone number or email address.
      </p>
    </div>
  `;

  approveButton.classList.remove("hidden");

  setMemeTip(
    `${generatedUsername} passed the safety scan! Review the checklist, then approve it.`,
    "congrats"
  );
}

function approveSafeUsername() {
  if (!usernameAwaitingApproval) {
    return;
  }

  usernameAwaitingApproval = false;
  usernamesChecked += 1;

  const checkedDisplay = byId("usernamesChecked");
  const approveButton = byId("approveUsername");
  const backpackButton = byId("goBackpackRescue");

  if (checkedDisplay) {
    checkedDisplay.textContent = String(usernamesChecked);
  }

  if (approveButton) {
    approveButton.classList.add("hidden");
  }

  if (usernamesChecked >= 3 && backpackButton) {
    backpackButton.disabled = false;
    backpackButton.classList.remove("locked-action");
    backpackButton.textContent = "Start Backpack Rescue 🎒";

    setMemeTip(
      "You completed three username safety scans! Backpack Rescue is unlocked.",
      "congrats"
    );
  } else {
    setMemeTip(
      `Great scan! You checked ${usernamesChecked} out of 3 usernames. Generate another one.`,
      "congrats"
    );
  }
}

/* ---------------------------------------------------------
   STEP 3 — BACKPACK RESCUE
--------------------------------------------------------- */

function startBackpackRescue() {
  if (usernamesChecked < 3) {
    setMemeTip(
      `Complete 3 username scans first. You completed ${usernamesChecked} out of 3.`,
      "thinking"
    );

    return;
  }

  showSection("practiceZone");
  loadPractice();

  setMemeTip(
    "Drag each item into the Share Zone or Protect Zone.",
    "thinking"
  );
}

function loadPractice() {
  const item = practiceQuestions[practiceIndex];
  const text = byId("sortItemText");
  const feedback = byId("practiceFeedback");
  const card = byId("dragItemCard");
  const correctDisplay = byId("practiceCorrect");

  if (!item || !text || !feedback || !card) {
    console.error("Practice game elements are missing.");
    return;
  }

  text.textContent = item.text;

  feedback.textContent = "";
  feedback.style.background = "transparent";
  feedback.style.color = "";

  card.classList.remove(
    "shake",
    "correct-glow",
    "slide-away"
  );

  if (correctDisplay) {
    correctDisplay.textContent = String(practiceCorrect);
  }

  practiceAnswered = false;
}

function answerPractice(choice, target) {
  if (practiceAnswered) {
    return;
  }

  const current = practiceQuestions[practiceIndex];
  const feedback = byId("practiceFeedback");
  const card = byId("dragItemCard");
  const correctDisplay = byId("practiceCorrect");

  if (!current || !feedback || !card) {
    return;
  }

  if (choice === current.answer) {
    practiceAnswered = true;
    practiceCorrect += 1;

    if (correctDisplay) {
      correctDisplay.textContent = String(practiceCorrect);
    }

    feedback.textContent =
      `🎉 Correct! ${current.explanation}`;

    feedback.style.background = "#e9fff3";
    feedback.style.color = "#168a52";

    card.classList.add("correct-glow");

    setMemeTip(
      "Great sorting! You protected Ava's information.",
      "congrats"
    );

    window.setTimeout(() => {
      card.classList.add("slide-away");
    }, 350);

    window.setTimeout(() => {
      practiceIndex += 1;

      if (practiceIndex >= practiceQuestions.length) {
        if (practiceCorrect >= 8) {
          showSection("testZone");
          loadTest();

          setMemeTip(
            "Backpack Rescue complete! The final test is ready.",
            "congrats"
          );
        } else {
          practiceIndex = 0;
          practiceCorrect = 0;

          setMemeTip(
            "You are close! Try Backpack Rescue again and get at least 8 correct.",
            "thinking"
          );

          loadPractice();
        }

        return;
      }

      loadPractice();
    }, 900);
  } else {
    feedback.textContent =
      `Good guess! ${current.explanation}`;

    feedback.style.background = "#f3efff";
    feedback.style.color = "#7d4cff";

    card.classList.add("shake");

    if (target) {
      target.classList.add("shake");
    }

    setMemeTip(
      "Good guess! Try placing it in the other zone.",
      "wrong"
    );

    window.setTimeout(() => {
      card.classList.remove("shake");

      if (target) {
        target.classList.remove("shake");
      }
    }, 700);
  }
}

/* ---------------------------------------------------------
   STEP 4 — FINAL TEST
--------------------------------------------------------- */

function loadTest() {
  const current = testQuestions[testIndex];
  const question = byId("testQuestion");
  const number = byId("testNumber");
  const feedback = byId("testFeedback");
  const nextButton = byId("nextTest");

  if (!current || !question || !number || !feedback || !nextButton) {
    console.error("Final test elements are missing.");
    return;
  }

  question.textContent = current.text;
  number.textContent = String(testIndex + 1);

  feedback.textContent = "";
  feedback.style.background = "transparent";
  feedback.style.color = "";

  nextButton.classList.add("hidden");

  document.querySelectorAll(".test-choice").forEach((button) => {
    button.disabled = false;
    button.classList.remove("correct-glow", "shake");
  });

  testAnswered = false;
}

function answerTest(choice, button) {
  if (testAnswered) {
    return;
  }

  const current = testQuestions[testIndex];
  const feedback = byId("testFeedback");
  const nextButton = byId("nextTest");

  if (!current || !feedback || !nextButton) {
    return;
  }

  testAnswered = true;

  document.querySelectorAll(".test-choice").forEach((testButton) => {
    testButton.disabled = true;
  });

  if (choice === current.answer) {
    testCorrect += 1;

    feedback.textContent =
      `🎉 Correct! ${current.explanation}`;

    feedback.style.background = "#e9fff3";
    feedback.style.color = "#168a52";

    if (button) {
      button.classList.add("correct-glow");
    }

    setMemeTip(
      "Correct! Keep going.",
      "congrats"
    );
  } else {
    feedback.textContent =
      `Good guess! ${current.explanation}`;

    feedback.style.background = "#f3efff";
    feedback.style.color = "#7d4cff";

    if (button) {
      button.classList.add("shake");
    }

    setMemeTip(
      "Good guess. Read the explanation and keep going.",
      "wrong"
    );
  }

  nextButton.classList.remove("hidden");
}

function nextTestQuestion() {
  testIndex += 1;

  if (testIndex >= testQuestions.length) {
    finishMission();
    return;
  }

  loadTest();
}

/* ---------------------------------------------------------
   MISSION RESULT
--------------------------------------------------------- */

function finishMission() {
  const percentage = Math.round(
    (testCorrect / testQuestions.length) * 100
  );

  const passed = percentage >= 80;

  const title = byId("resultTitle");
  const message = byId("resultMessage");
  const points = byId("pointsEarned");
  const stickers = byId("stickersFound");
  const badgeDisplay = document.querySelector(".earned-badge");

  showSection("missionResult");

  if (stickers) {
    stickers.textContent = String(foundStickers.size);
  }

  if (!title || !message || !points) {
    return;
  }

  if (passed) {
    const basePoints = 50;
    const stickerBonus = foundStickers.size * 5;
    const earnedPoints = basePoints + stickerBonus;

    const alreadyEarned =
      localStorage.getItem("identityBadgeEarned") === "true";

    localStorage.setItem("identityBadgeEarned", "true");

    localStorage.setItem(
      "identityStickers",
      JSON.stringify(Array.from(foundStickers))
    );

    if (!alreadyEarned) {
      const currentPoints = Number(
        localStorage.getItem("safetiiPoints") || "0"
      );

      localStorage.setItem(
        "safetiiPoints",
        String(currentPoints + earnedPoints)
      );
    }

    title.textContent =
      "Identity Protector Badge Earned!";

    message.textContent =
      `You scored ${percentage}%. You helped Ava protect her identity!`;

    points.textContent =
      alreadyEarned
        ? "Already collected"
        : String(earnedPoints);

    if (badgeDisplay) {
      badgeDisplay.style.display = "inline-block";
    }

    setMemeTip(
      "Mission complete! You earned the Identity Protector Badge.",
      "congrats"
    );
  } else {
    title.textContent =
      "Almost there, Cyber Mentee!";

    message.textContent =
      `You scored ${percentage}%. You need at least 80% to earn the badge.`;

    points.textContent = "0";

    if (badgeDisplay) {
      badgeDisplay.style.display = "none";
    }

    setMemeTip(
      "You are close! Review what you learned and try again.",
      "thinking"
    );
  }
}

/* ---------------------------------------------------------
   REPLAY
--------------------------------------------------------- */

function retryMission() {
  foundObjects = new Set();
  foundStickers = new Set();

  generatedUsername = "";
  usernamesChecked = 0;
  usernameAwaitingApproval = false;

  practiceIndex = 0;
  practiceCorrect = 0;
  practiceAnswered = false;

  testIndex = 0;
  testCorrect = 0;
  testAnswered = false;

  const objectsFound = byId("objectsFound");
  const usernamesDisplay = byId("usernamesChecked");
  const practiceDisplay = byId("practiceCorrect");

  const usernameButton = byId("goUsernameLab");
  const backpackButton = byId("goBackpackRescue");

  const generatedUsernameDisplay =
    byId("generatedUsername");

  const checklist =
    byId("usernameChecklist");

  if (objectsFound) {
    objectsFound.textContent = "0";
  }

  if (usernamesDisplay) {
    usernamesDisplay.textContent = "0";
  }

  if (practiceDisplay) {
    practiceDisplay.textContent = "0";
  }

  if (generatedUsernameDisplay) {
    generatedUsernameDisplay.textContent =
      "Press the button to generate a safe username!";
  }

  if (checklist) {
    checklist.innerHTML =
      "<p>Generate a username to begin the safety scan.</p>";
  }

  document.querySelectorAll(".island-object").forEach((button) => {
    button.classList.remove(
      "discovered",
      "wiggle"
    );
  });

  document.querySelectorAll(".sticker").forEach((button) => {
    button.classList.remove("collected");
    button.textContent = "⭐";
  });

  if (usernameButton) {
    usernameButton.disabled = true;
    usernameButton.classList.add("locked-action");
    usernameButton.textContent =
      "Unlock Safe Username Lab";
  }

  if (backpackButton) {
    backpackButton.disabled = true;
    backpackButton.classList.add("locked-action");
    backpackButton.textContent =
      "Complete 3 Username Scans First";
  }

  showSection("missionAlert");

  setMemeTip(
    "Ready to replay Identity Island?",
    "welcome"
  );
}

/* ---------------------------------------------------------
   EVENT LISTENERS
--------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  loadMissionHeroName();

  const acceptButton = byId("acceptMission");
  const closeLessonButton = byId("closeLesson");

  const usernameLabButton = byId("goUsernameLab");
  const generateUsernameButton = byId("generateUsername");
  const approveUsernameButton = byId("approveUsername");
  const backpackButton = byId("goBackpackRescue");

  const nextTestButton = byId("nextTest");
  const retryButton = byId("retryMission");

  if (acceptButton) {
    acceptButton.addEventListener(
      "click",
      acceptMission
    );
  }

  document.querySelectorAll(".meme-help-btn").forEach((button) => {
    button.addEventListener("click", () => {
      setMemeTip(
        button.dataset.tip || "I am here to help.",
        "thinking"
      );
    });
  });

  document.querySelectorAll(".island-object").forEach((button) => {
    button.addEventListener("click", () => {
      openLesson(
        button.dataset.object,
        button
      );
    });
  });

  document.querySelectorAll(".sticker").forEach((button) => {
    button.addEventListener("click", () => {
      collectSticker(button);
    });
  });

  if (closeLessonButton) {
    closeLessonButton.addEventListener(
      "click",
      closeLessonPopup
    );
  }

  if (usernameLabButton) {
    usernameLabButton.addEventListener(
      "click",
      openUsernameLab
    );
  }

  if (generateUsernameButton) {
    generateUsernameButton.addEventListener(
      "click",
      generateSafeUsername
    );
  }

  if (approveUsernameButton) {
    approveUsernameButton.addEventListener(
      "click",
      approveSafeUsername
    );
  }

  if (backpackButton) {
    backpackButton.addEventListener(
      "click",
      startBackpackRescue
    );
  }

  const dragCard = byId("dragItemCard");

  if (dragCard) {
    dragCard.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData(
        "text/plain",
        "practice-item"
      );

      event.dataTransfer.effectAllowed = "move";
    });
  }

  document.querySelectorAll(".sort-zone").forEach((zone) => {
    zone.addEventListener("dragover", (event) => {
      event.preventDefault();
      zone.classList.add("drag-over");
    });

    zone.addEventListener("dragleave", () => {
      zone.classList.remove("drag-over");
    });

    zone.addEventListener("drop", (event) => {
      event.preventDefault();
      zone.classList.remove("drag-over");

      answerPractice(
        zone.dataset.answer,
        zone
      );
    });

    zone.addEventListener("click", () => {
      answerPractice(
        zone.dataset.answer,
        zone
      );
    });
  });

  document.querySelectorAll(".test-choice").forEach((button) => {
    button.addEventListener("click", () => {
      answerTest(
        button.dataset.answer,
        button
      );
    });
  });

  if (nextTestButton) {
    nextTestButton.addEventListener(
      "click",
      nextTestQuestion
    );
  }

  if (retryButton) {
    retryButton.addEventListener(
      "click",
      retryMission
    );
  }
});
