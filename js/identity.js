const lessons = {
  house: {
    title: "🏠 Home Address",
    text: "Ava’s home address is private. Sharing it could help someone find where she lives."
  },
  school: {
    title: "🏫 School Name",
    text: "A school name should stay private because it can reveal where a child can be found."
  },
  phone: {
    title: "📱 Phone Number",
    text: "Phone numbers are private. Strangers should not be able to contact you directly."
  },
  backpack: {
    title: "🎒 Full Name",
    text: "A real first and last name can identify someone. A hero nickname is much safer online."
  },
  pizza: {
    title: "🍕 Favorite Food",
    text: "Favorite foods are usually safe to share because they do not reveal where you live."
  },
  controller: {
    title: "🎮 Gaming Username",
    text: "A username can be safe if it does not include your real name, birthday, school, or location."
  }
};

const practiceQuestions = [
  { text: "Ava wants to post: “My favorite color is purple.”", answer: "safe", explain: "Favorite colors are usually okay to share." },
  { text: "Someone in a game asks Ava for her password.", answer: "private", explain: "Passwords should never be shared with friends or strangers." },
  { text: "Ava says her favorite animal is a dolphin.", answer: "safe", explain: "Favorite animals are usually safe." },
  { text: "Ava posts the name of her school.", answer: "private", explain: "School names can reveal where someone can be found." },
  { text: "Ava uses the username CyberDolphin instead of her real name.", answer: "safe", explain: "A safe nickname protects her identity." },
  { text: "A stranger asks Ava what street she lives on.", answer: "private", explain: "Addresses and streets should stay private." },
  { text: "Ava says she likes pizza.", answer: "safe", explain: "Favorite foods usually do not reveal private details." },
  { text: "Ava shares her phone number in a group chat.", answer: "private", explain: "Phone numbers are private information." },
  { text: "Ava tells someone her birthday and year.", answer: "private", explain: "Birthdays can help identify someone or guess passwords." },
  { text: "Ava says she likes drawing superheroes.", answer: "safe", explain: "Hobbies are usually safe to share." }
];

const testQuestions = [
  ...practiceQuestions,
  { text: "Your home address", answer: "private", explain: "Your home address can show where you live." },
  { text: "Your favorite ice cream flavor", answer: "safe", explain: "Favorites are usually safe." },
  { text: "Your full first and last name", answer: "private", explain: "Full names can identify you." },
  { text: "A made-up hero nickname", answer: "safe", explain: "Nicknames are safer than real names." },
  { text: "Your password", answer: "private", explain: "Passwords should stay secret." },
  { text: "Your favorite game", answer: "safe", explain: "Favorite games are usually okay." },
  { text: "Your parent’s phone number", answer: "private", explain: "Family contact information is private." },
  { text: "Your pet’s name if it is used in your password", answer: "private", explain: "Password clues should not be shared." },
  { text: "Your favorite superhero", answer: "safe", explain: "That does not usually reveal private information." },
  { text: "A picture showing your school uniform and school name", answer: "private", explain: "Photos can reveal private clues." }
];

let foundObjects = new Set();
let foundStickers = new Set();

let practiceIndex = 0;
let practiceCorrect = 0;
let practiceAnswered = false;

let testIndex = 0;
let testCorrect = 0;
let testAnswered = false;

function setMemeTip(message, mood = "thinking") {
  const tip = document.getElementById("memeTip");
  const image = document.getElementById("memeImage");

  if (tip) tip.textContent = message;

  if (image) {
    image.src =
      mood === "congrats"
        ? "../assets/mascot/congrats.png"
        : mood === "wrong"
        ? "../assets/mascot/wrong.png"
        : "../assets/mascot/thinking.png";
  }
}

function showSection(sectionId) {
  ["missionAlert", "exploreZone", "practiceZone", "testZone", "missionResult"].forEach((id) => {
    const section = document.getElementById(id);
    if (section) section.classList.add("hidden");
  });

  const active = document.getElementById(sectionId);
  if (active) active.classList.remove("hidden");
}

function acceptMission() {
  showSection("exploreZone");
  setMemeTip("Explore Identity Island! Click objects to learn what is safe and what should stay private.");
}

function openLesson(objectKey, button) {
  const lesson = lessons[objectKey];
  const popup = document.getElementById("lessonPopup");

  document.getElementById("lessonTitle").textContent = lesson.title;
  document.getElementById("lessonText").textContent = lesson.text;

  popup.classList.remove("hidden");
  foundObjects.add(objectKey);

  button.classList.add("discovered");
  button.classList.add("wiggle");

  setTimeout(() => button.classList.remove("wiggle"), 600);

  document.getElementById("objectsFound").textContent = foundObjects.size;

if (foundObjects.size >= 6) {
  const goPractice = document.getElementById("goPractice");

if (goPractice) {
  goPractice.addEventListener("click", () => {
    if (goPractice.disabled) return;

    showSection("practiceZone");
    loadPractice();
    setMemeTip("Practice time! Drag each item into the correct zone.");
  });
}

  setMemeTip("Great exploring! Backpack Rescue is unlocked now.", "congrats");
}

function collectSticker(button) {
  const stickerName = button.dataset.sticker;
  foundStickers.add(stickerName);
  button.classList.add("collected");
  button.textContent = "✨";
  setMemeTip(`You found a hidden sticker: ${stickerName}!`, "congrats");
}

function loadPractice() {
  const item = practiceQuestions[practiceIndex];
  const itemText = document.getElementById("sortItemText");
  const feedback = document.getElementById("practiceFeedback");
  const card = document.getElementById("sortItemCard");

  if (!itemText || !feedback || !card) return;

  itemText.textContent = item.text;
  feedback.textContent = "";
  feedback.style.background = "transparent";
  card.classList.remove("shake", "correct-glow", "slide-away");

  practiceAnswered = false;
}

function answerPractice(choice, button) {
  if (practiceAnswered) return;

  const current = practiceQuestions[practiceIndex];
  const feedback = document.getElementById("practiceFeedback");
  const card = document.getElementById("sortItemCard");

  if (!feedback || !card) return;

  if (choice === current.answer) {
    practiceAnswered = true;
    practiceCorrect++;
    document.getElementById("practiceCorrect").textContent = practiceCorrect;

    feedback.textContent = "🎉 Nice rescue! " + current.explain;
    feedback.style.background = "#e9fff3";
    feedback.style.color = "#168a52";

    card.classList.add("correct-glow");

    setTimeout(() => {
      card.classList.add("slide-away");
    }, 500);

    setTimeout(() => {
      practiceIndex++;

      if (practiceIndex >= practiceQuestions.length) {
        if (practiceCorrect >= 8) {
          showSection("testZone");
          loadTest();
          setMemeTip("Backpack Rescue complete! You unlocked the final test.", "congrats");
        } else {
          practiceIndex = 0;
          practiceCorrect = 0;
          document.getElementById("practiceCorrect").textContent = "0";
          setMemeTip("Almost! Try Backpack Rescue again. You need 8 correct to continue.");
          loadPractice();
        }
        return;
      }

      loadPractice();
    }, 900);
  } else {
    feedback.textContent = "Good guess! " + current.explain;
    feedback.style.background = "#f3efff";
    feedback.style.color = "#7d4cff";

    card.classList.add("shake");
    button.classList.add("shake");

    setMemeTip("Good guess! Try sorting it into the other zone.", "wrong");

    setTimeout(() => {
      card.classList.remove("shake");
      button.classList.remove("shake");
    }, 700);
  }
}
function loadTest() {
  const q = testQuestions[testIndex];

  document.getElementById("testQuestion").textContent = q.text;
  document.getElementById("testNumber").textContent = testIndex + 1;
  document.getElementById("testFeedback").textContent = "";
  document.getElementById("testFeedback").style.background = "transparent";
  document.getElementById("nextTest").classList.add("hidden");

  testAnswered = false;
}

function answerTest(choice, button) {
  if (testAnswered) return;

  testAnswered = true;
  const q = testQuestions[testIndex];
  const feedback = document.getElementById("testFeedback");

  if (choice === q.answer) {
    testCorrect++;
    feedback.textContent = "🎉 Correct! " + q.explain;
    feedback.style.background = "#e9fff3";
    button.classList.add("correct-glow");
  } else {
    feedback.textContent = "Good guess! " + q.explain;
    feedback.style.background = "#f3efff";
    button.classList.add("shake");
  }

  setTimeout(() => {
    button.classList.remove("shake", "correct-glow");
  }, 700);

  document.getElementById("nextTest").classList.remove("hidden");
}

function nextTest() {
  testIndex++;

  if (testIndex >= testQuestions.length) {
    finishMission();
    return;
  }

  loadTest();
}

function finishMission() {
  const percentage = Math.round((testCorrect / testQuestions.length) * 100);
  const passed = percentage >= 80;

  showSection("missionResult");

  const title = document.getElementById("resultTitle");
  const message = document.getElementById("resultMessage");
  const points = document.getElementById("pointsEarned");
  const stickers = document.getElementById("stickersFound");

  stickers.textContent = foundStickers.size;

  if (passed) {
    const earnedPoints = 50 + foundStickers.size * 5;

    localStorage.setItem("identityBadgeEarned", "true");
    localStorage.setItem("identityStickers", JSON.stringify([...foundStickers]));

    const currentPoints = Number(localStorage.getItem("safetiiPoints") || "0");
    localStorage.setItem("safetiiPoints", String(currentPoints + earnedPoints));

    title.textContent = "Identity Protector Badge Earned!";
    message.textContent = `You scored ${percentage}%. You helped Ava protect her identity!`;
    points.textContent = earnedPoints;
    setMemeTip("Mission complete! You earned your Identity Protector Badge!", "congrats");
  } else {
    title.textContent = "Almost there, Cyber Mentee!";
    message.textContent = `You scored ${percentage}%. You need 80% to earn the badge. Try again!`;
    points.textContent = "0";
    setMemeTip("You’re close! Review and try again. I believe in you!");
  }
}

function retryMission() {
  foundObjects = new Set();
  foundStickers = new Set();
  practiceIndex = 0;
  practiceCorrect = 0;
  practiceAnswered = false;
  testIndex = 0;
  testCorrect = 0;
  testAnswered = false;

  document.getElementById("objectsFound").textContent = "0";
  document.getElementById("practiceCorrect").textContent = "0";

  document.querySelectorAll(".island-object").forEach((btn) => {
    btn.classList.remove("discovered");
  });

  document.querySelectorAll(".sticker").forEach((btn) => {
    btn.classList.remove("collected");
    btn.textContent = "⭐";
  });

  document.getElementById("goPractice").disabled = true;
  document.getElementById("goPractice").classList.add("locked-action");

  showSection("missionAlert");
  setMemeTip("Ready to replay Identity Island?");
}

document.addEventListener("DOMContentLoaded", () => {
  const accept = document.getElementById("acceptMission");
  if (accept) accept.addEventListener("click", acceptMission);

  document.querySelectorAll(".meme-help-btn").forEach((button) => {
    button.addEventListener("click", () => setMemeTip(button.dataset.tip));
  });

  document.querySelectorAll(".island-object").forEach((button) => {
    button.addEventListener("click", () => openLesson(button.dataset.object, button));
  });

  document.querySelectorAll(".sticker").forEach((button) => {
    button.addEventListener("click", () => collectSticker(button));
  });

  const closeLesson = document.getElementById("closeLesson");
  if (closeLesson) {
    closeLesson.addEventListener("click", () => {
      document.getElementById("lessonPopup").classList.add("hidden");
    });
  }

const dragCard = document.getElementById("dragItemCard");

if (dragCard) {
  dragCard.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text/plain", "practice-item");
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
    answerPractice(zone.dataset.answer, zone);
  });

  zone.addEventListener("click", () => {
    answerPractice(zone.dataset.answer, zone);
  });
});
  const nextTestButton = document.getElementById("nextTest");
  if (nextTestButton) nextTestButton.addEventListener("click", nextTest);

  const retry = document.getElementById("retryMission");
  if (retry) retry.addEventListener("click", retryMission);
});

function loadMissionHeroName() {
  const heroNameSpot = document.getElementById("missionHeroName");
  const savedHero = localStorage.getItem("safetiiHero");

  if (!heroNameSpot) return;

  if (!savedHero) {
    heroNameSpot.textContent = "Cyber Mentee";
    return;
  }

  const hero = JSON.parse(savedHero);
  heroNameSpot.textContent = hero.name || "Cyber Mentee";
}

document.addEventListener("DOMContentLoaded", loadMissionHeroName);
