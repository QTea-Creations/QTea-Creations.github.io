"use strict";

/* =========================================================
   SAFETII NET — IDENTITY ISLAND
   Mission 1 complete logic
========================================================= */

/* -----------------------------
   Lesson objects
----------------------------- */

const lessons = {
  house: {
    title: "🏠 Home Address",
    text: "A home address is private because it shows where someone lives."
  },
  school: {
    title: "🏫 School Name",
    text: "A school name is private because it can reveal where a student can be found."
  },
  phone: {
    title: "📱 Phone Number",
    text: "Phone numbers are private because strangers should not contact you directly."
  },
  backpack: {
    title: "🎒 Safe Online Names",
    text:
      "A safe online name does not reveal your real full name, school, birthday, address, phone number, or location."
  },
  pizza: {
    title: "🍕 Favorite Food",
    text:
      "Favorite foods are usually safe to share because they do not reveal private information."
  },
  controller: {
    title: "🎮 Gaming Username",
    text:
      "A gaming username is safer when it does not include your real name, birthday, school, address, or location."
  }
};

/* -----------------------------
   Practice game
----------------------------- */

const practiceQuestions = [
  {
    text: "Favorite color",
    answer: "safe",
    explain: "Favorite colors are usually safe to share."
  },
  {
    text: "Home address",
    answer: "private",
    explain: "Your home address should stay private."
  },
  {
    text: "Password",
    answer: "private",
    explain: "Passwords should never be shared."
  },
  {
    text: "Favorite animal",
    answer: "safe",
    explain: "Favorite animals are usually safe to share."
  },
  {
    text: "School name",
    answer: "private",
    explain: "A school name can reveal where someone can find you."
  },
  {
    text: "A made-up online nickname",
    answer: "safe",
    explain:
      "A made-up nickname is safe when it does not reveal private details."
  },
  {
    text: "Phone number",
    answer: "private",
    explain: "Phone numbers should stay private."
  },
  {
    text: "Favorite game",
    answer: "safe",
    explain: "Favorite games are usually safe to share."
  },
  {
    text: "Birthday and birth year",
    answer: "private",
    explain:
      "Birthdays can be used to identify you or help someone guess a password."
  },
  {
    text: "Favorite pizza topping",
    answer: "safe",
    explain: "Favorite foods are usually safe to share."
  }
];

/* -----------------------------
   Final test — 20 questions
----------------------------- */

const testQuestions = [
  {
    text: "Your home address",
    answer: "private",
    explain: "Your home address can reveal where you live."
  },
  {
    text: "Your favorite ice cream flavor",
    answer: "safe",
    explain: "Favorite foods are usually safe to share."
  },
  {
    text: "Your full first and last name",
    answer: "private",
    explain: "A full name can identify you."
  },
  {
    text: "A made-up online name",
    answer: "safe",
    explain:
      "A made-up name is safer when it does not reveal personal details."
  },
  {
    text: "Your password",
    answer: "private",
    explain: "Passwords should always stay private."
  },
  {
    text: "Your favorite game",
    answer: "safe",
    explain: "Favorite games are usually safe to share."
  },
  {
    text: "Your parent or guardian's phone number",
    answer: "private",
    explain: "Family contact information is private."
  },
  {
    text: "Your school name",
    answer: "private",
    explain: "A school name can reveal where you can be found."
  },
  {
    text: "Your favorite superhero",
    answer: "safe",
    explain: "That usually does not reveal private information."
  },
  {
    text: "A photo showing your school uniform and school name",
    answer: "private",
    explain: "Photos can reveal private clues."
  },
  {
    text: "Your favorite color",
    answer: "safe",
    explain: "Favorite colors are usually safe."
  },
  {
    text: "The street where you live",
    answer: "private",
    explain: "Your street is part of your location."
  },
  {
    text: "A hobby you enjoy",
    answer: "safe",
    explain: "Hobbies are usually safe to share."
  },
  {
    text: "Your birthday and birth year",
    answer: "private",
    explain: "Birthdays can be used to identify you."
  },
  {
    text: "Your gaming password",
    answer: "private",
    explain: "Gaming passwords should never be shared."
  },
  {
    text: "Your favorite animal",
    answer: "safe",
    explain: "Favorite animals are usually safe."
  },
  {
    text: "Your exact current location",
    answer: "private",
    explain: "Your current location should stay private."
  },
  {
    text: "A username containing your school and birth year",
    answer: "private",
    explain: "That username reveals personal information."
  },
  {
    text: "A username like PurpleRocketFox",
    answer: "safe",
    explain: "That username does not reveal personal details."
  },
  {
    text: "Your home Wi-Fi password",
    answer: "private",
    explain: "Wi-Fi passwords should stay private."
  }
];

/* -----------------------------
   Mission state
----------------------------- */

let foundObjects = new Set();
let foundStickers = new Set();

let practiceIndex = 0;
let practiceCorrect = 0;
let practiceAnswered = false;

let testIndex = 0;
let testCorrect = 0;
let testAnswered = false;

/* -----------------------------
   Basic helpers
----------------------------- */

function getElement(id) {
  return document.getElementById(id);
}

function setMemeTip(message, mood = "thinking") {
  const tip = getElement("memeTip");
  const image = getElement("memeImage");

  if (tip) {
    tip.textContent = message;
  }

  if (!image) {
    return;
  }

  const imagePaths = {
    thinking: "../assets/mascot/thinking.png",
    wrong: "../assets/mascot/wrong.png",
    congrats: "../assets/mascot/congrats.png",
    welcome: "../assets/mascot/welcome.png"
  };

  image.src = imagePaths[mood] || imagePaths.thinking;
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
    const section = getElement(id);

    if (section) {
      section.classList.add("hidden");
    }
  });

  const activeSection = getElement(sectionId);

  if (activeSection) {
    activeSection.classList.remove("hidden");
    activeSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

/* -----------------------------
   Hero name
----------------------------- */

function loadMissionHeroName() {
  const heroNameSpot = getElement("missionHeroName");

  if (!heroNameSpot) {
    return;
  }

  try {
    const savedHero = localStorage.getItem("safetiiHero");

    if (!savedHero) {
      heroNameSpot.textContent = "Cyber Mentee";
      return;
    }

    const hero = JSON.parse(savedHero);
    heroNameSpot.textContent = hero.name || "Cyber Mentee";
  } catch (error) {
    console.error("Could not load hero name:", error);
    heroNameSpot.textContent = "Cyber Mentee";
  }
}

/* -----------------------------
   Mission alert
----------------------------- */

function acceptMission() {
  showSection("exploreZone");

  setMemeTip(
    "Explore Identity Island. Click all 6 learning objects to unlock the next activity.",
    "welcome"
  );
}

/* -----------------------------
   Safe Username Lab
----------------------------- */

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

let generatedSafeUsername = "";
let usernamesChecked = 0;
let usernameWaitingForApproval = false;

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

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
    "Welcome to the Safe Username Lab! Generate names that do not reveal personal information.",
    "welcome"
  );
}

function generateSafeUsername() {
  const usernameDisplay = getElement("generatedUsername");
  const checklist = getElement("usernameChecklist");
  const approveButton = getElement("approveUsername");

  if (!usernameDisplay || !checklist || !approveButton) {
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

  const pattern = randomItem(patterns);

  generatedSafeUsername = pattern();
  usernameWaitingForApproval = true;

  usernameDisplay.textContent = generatedSafeUsername;
  usernameDisplay.classList.remove("username-pop");

  void usernameDisplay.offsetWidth;

  usernameDisplay.classList.add("username-pop");

  checklist.innerHTML = `
    <div class="scan-result safe-scan">
      <span>✅</span>
      <p><strong>No real name</strong><br>This username does not reveal a first or last name.</p>
    </div>

    <div class="scan-result safe-scan">
      <span>✅</span>
      <p><strong>No birthday</strong><br>It does not include an age, birthday, or birth year.</p>
    </div>

    <div class="scan-result safe-scan">
      <span>✅</span>
      <p><strong>No location clues</strong><br>It does not reveal a school, address, or location.</p>
    </div>

    <div class="scan-result safe-scan">
      <span>✅</span>
      <p><strong>No contact information</strong><br>It does not include a phone number or email address.</p>
    </div>
  `;

  approveButton.classList.remove("hidden");

  setMemeTip(
    `${generatedSafeUsername} passed the safety scan! Check why it is safe.`,
    "congrats"
  );
}

function approveSafeUsername() {
  const checkedDisplay = getElement("usernamesChecked");
  const approveButton = getElement("approveUsername");
  const backpackButton = getElement("goBackpackRescue");

  if (!usernameWaitingForApproval) {
    return;
  }

  usernameWaitingForApproval = false;
  usernamesChecked += 1;

  if (checkedDisplay) {
    checkedDisplay.textContent = String(usernamesChecked);
  }

  if (approveButton) {
    approveButton.classList.add("hidden");
  }

  setMemeTip(
    `Great safety scan! You checked ${usernamesChecked} out of 3 usernames.`,
    "congrats"
  );

  if (usernamesChecked >= 3 && backpackButton) {
    backpackButton.disabled = false;
    backpackButton.classList.remove("locked-action");
    backpackButton.textContent = "Start Backpack Rescue 🎒";

    setMemeTip(
      "Username training complete! Backpack Rescue is now unlocked.",
      "congrats"
    );
  }
}

/* -----------------------------
   Explore activity
----------------------------- */

function openLesson(objectKey, button) {
  const lesson = lessons[objectKey];
  const popup = getElement("lessonPopup");
  const lessonTitle = getElement("lessonTitle");
  const lessonText = getElement("lessonText");
  const objectsFound = getElement("objectsFound");
  const goUsernameLab = getElement("goUsernameLab");

  if (!lesson || !popup || !lessonTitle || !lessonText) {
    return;
  }

  lessonTitle.textContent = lesson.title;
  lessonText.textContent = lesson.text;
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

  if (foundObjects.size >= 6 && goUsernameLab) {
  goUsernameLab.disabled = false;
  goUsernameLab.classList.remove("locked-action");
  goUsernameLab.textContent = "Open Safe Username Lab 🧪";

  setMemeTip(
    "Great exploring! The Safe Username Lab is now unlocked.",
    "congrats"
  );
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

function startBackpackRescue() {
  if (foundObjects.size < 6) {
    setMemeTip(
      `Find all 6 learning objects first. You have found ${foundObjects.size} out of 6.`,
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

/* Make inline onclick work */
window.startBackpackRescue = startBackpackRescue;

/* -----------------------------
   Practice game
----------------------------- */

function loadPractice() {
  const item = practiceQuestions[practiceIndex];
  const itemText = getElement("sortItemText");
  const feedback = getElement("practiceFeedback");
  const card = getElement("dragItemCard");
  const practiceCount = getElement("practiceCorrect");

  if (!item || !itemText || !feedback || !card) {
    return;
  }

  itemText.textContent = item.text;
  feedback.textContent = "";
  feedback.style.background = "transparent";
  feedback.style.color = "";

  card.classList.remove(
    "shake",
    "correct-glow",
    "slide-away"
  );

  if (practiceCount) {
    practiceCount.textContent = String(practiceCorrect);
  }

  practiceAnswered = false;
}

function answerPractice(choice, target) {
  if (practiceAnswered) {
    return;
  }

  const current = practiceQuestions[practiceIndex];
  const feedback = getElement("practiceFeedback");
  const card = getElement("dragItemCard");
  const practiceCount = getElement("practiceCorrect");

  if (!current || !feedback || !card) {
    return;
  }

  if (choice === current.answer) {
    practiceAnswered = true;
    practiceCorrect += 1;

    if (practiceCount) {
      practiceCount.textContent = String(practiceCorrect);
    }

    feedback.textContent = `🎉 Correct! ${current.explain}`;
    feedback.style.background = "#e9fff3";
    feedback.style.color = "#168a52";

    card.classList.add("correct-glow");

    setMemeTip(
      "Great job! You sorted that item correctly.",
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
            "You are close. Try Backpack Rescue again and get at least 8 correct.",
            "thinking"
          );

          loadPractice();
        }

        return;
      }

      loadPractice();
    }, 900);
  } else {
    feedback.textContent = `Good guess! ${current.explain}`;
    feedback.style.background = "#f3efff";
    feedback.style.color = "#7d4cff";

    card.classList.add("shake");

    if (target) {
      target.classList.add("shake");
    }

    setMemeTip(
      "Good guess! Try the other zone.",
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

/* -----------------------------
   Final test
----------------------------- */

function loadTest() {
  const current = testQuestions[testIndex];
  const question = getElement("testQuestion");
  const number = getElement("testNumber");
  const feedback = getElement("testFeedback");
  const nextButton = getElement("nextTest");

  if (!current || !question || !number || !feedback || !nextButton) {
    console.error("Final test elements are missing from identity.html.");
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
  const feedback = getElement("testFeedback");
  const nextButton = getElement("nextTest");

  if (!current || !feedback || !nextButton) {
    return;
  }

  testAnswered = true;

  document.querySelectorAll(".test-choice").forEach((testButton) => {
    testButton.disabled = true;
  });

  if (choice === current.answer) {
    testCorrect += 1;

    feedback.textContent = `🎉 Correct! ${current.explain}`;
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
    feedback.textContent = `Good guess! ${current.explain}`;
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

function nextTest() {
  testIndex += 1;

  if (testIndex >= testQuestions.length) {
    finishMission();
    return;
  }

  loadTest();
}

function finishMission() {
  const percentage = Math.round(
    (testCorrect / testQuestions.length) * 100
  );

  const passed = percentage >= 80;

  const title = getElement("resultTitle");
  const message = getElement("resultMessage");
  const points = getElement("pointsEarned");
  const stickers = getElement("stickersFound");
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
    const stickerPoints = foundStickers.size * 5;
    const earnedPoints = basePoints + stickerPoints;

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
      `You scored ${percentage}%. You helped Ava protect her identity.`;

    points.textContent =
      alreadyEarned ? "Already collected" : String(earnedPoints);

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
      "You are close. Review what you learned and try again.",
      "thinking"
    );
  }
}

/* -----------------------------
   Replay mission
----------------------------- */

function retryMission() {
  foundObjects = new Set();
  foundStickers = new Set();

  practiceIndex = 0;
  practiceCorrect = 0;
  practiceAnswered = false;

  testIndex = 0;
  testCorrect = 0;
  testAnswered = false;

  const objectsFound = getElement("objectsFound");
  const practiceCount = getElement("practiceCorrect");
  const goPractice = getElement("goPractice");

  if (objectsFound) {
    objectsFound.textContent = "0";
  }

  if (practiceCount) {
    practiceCount.textContent = "0";
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

  if (goPractice) {
    goPractice.disabled = true;
    goPractice.classList.add("locked-action");
    goPractice.textContent = "Unlock Practice";
  }

  showSection("missionAlert");

  setMemeTip(
    "Ready to replay Identity Island?",
    "welcome"
  );
}

/* -----------------------------
   Event listeners
----------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  loadMissionHeroName();

  const acceptButton = getElement("acceptMission");
  const closeLessonButton = getElement("closeLesson");
  const nextTestButton = getElement("nextTest");
  const retryButton = getElement("retryMission");
  const goUsernameLabButton = getElement("goUsernameLab");
  const generateUsernameButton = getElement("generateUsername");
  const approveUsernameButton = getElement("approveUsername");
  const goBackpackRescueButton = getElement("goBackpackRescue");

  if (acceptButton) {
    acceptButton.addEventListener(
      "click",
      acceptMission

   if (goUsernameLabButton) {
  goUsernameLabButton.addEventListener(
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

if (goBackpackRescueButton) {
  goBackpackRescueButton.addEventListener("click", () => {
    if (goBackpackRescueButton.disabled) {
      return;
    }

    showSection("practiceZone");
    loadPractice();

    setMemeTip(
      "Backpack Rescue time! Drag each item into the correct zone.",
      "thinking"
    );
  });
}
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
    closeLessonButton.addEventListener("click", () => {
      const popup = getElement("lessonPopup");

      if (popup) {
        popup.classList.add("hidden");
      }
    });
  }

  const dragCard = getElement("dragItemCard");

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
      nextTest
    );
  }

  if (retryButton) {
    retryButton.addEventListener(
      "click",
      retryMission
    );
  }
});
