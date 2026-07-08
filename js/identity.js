const lessons = {
  house: {
    title: "🏠 Home Address",
    text: "A home address is private because it shows where someone lives."
  },
  school: {
    title: "🏫 School Name",
    text: "A school name is private because it can show where a student can be found."
  },
  phone: {
    title: "📱 Phone Number",
    text: "Phone numbers are private because strangers should not contact you directly."
  },
  backpack: {
    title: "🎒 Online Names",
    text: "Use an online name that does not reveal your real full name, school, birthday, address, or location."
  },
  pizza: {
    title: "🍕 Favorite Food",
    text: "Favorite foods are usually safe because they do not reveal private information."
  },
  controller: {
    title: "🎮 Gaming Username",
    text: "A username is safer when it does not include your real name, birthday, school, or location."
  }
};

const practiceQuestions = [
  { text: "Favorite color", answer: "safe", explain: "Favorite colors are usually safe to share." },
  { text: "Home address", answer: "private", explain: "Your address should stay private." },
  { text: "Password", answer: "private", explain: "Passwords should never be shared." },
  { text: "Favorite animal", answer: "safe", explain: "Favorite animals are usually safe." },
  { text: "School name", answer: "private", explain: "School names can reveal where someone can find you." },
  { text: "Safe online nickname", answer: "safe", explain: "A nickname is safe if it does not reveal private details." },
  { text: "Phone number", answer: "private", explain: "Phone numbers should stay private." },
  { text: "Favorite game", answer: "safe", explain: "Favorite games are usually safe." },
  { text: "Birthday and year", answer: "private", explain: "Birthdays can be used to identify you or guess passwords." },
  { text: "Favorite pizza topping", answer: "safe", explain: "Favorite foods are usually safe." }
];

let foundObjects = new Set();
let foundStickers = new Set();
let practiceIndex = 0;
let practiceCorrect = 0;
let practiceAnswered = false;

function setMemeTip(message) {
  const tip = document.getElementById("memeTip");
  if (tip) tip.textContent = message;
}

function showSection(sectionId) {
  ["missionAlert", "exploreZone", "practiceZone", "testZone", "missionResult"].forEach((id) => {
    const section = document.getElementById(id);
    if (section) section.classList.add("hidden");
  });

  const active = document.getElementById(sectionId);
  if (active) active.classList.remove("hidden");
}

function loadMissionHeroName() {
  const heroNameSpot = document.getElementById("missionHeroName");
  const savedHero = localStorage.getItem("safetiiHero");

  if (!heroNameSpot) return;

  if (savedHero) {
    const hero = JSON.parse(savedHero);
    heroNameSpot.textContent = hero.name || "Cyber Mentee";
  } else {
    heroNameSpot.textContent = "Cyber Mentee";
  }
}

function acceptMission() {
  showSection("exploreZone");
  setMemeTip("Click all 6 learning objects on Identity Island to unlock Backpack Rescue.");
}

function openLesson(objectKey, button) {
  const lesson = lessons[objectKey];
  const popup = document.getElementById("lessonPopup");

  if (!lesson || !popup) return;

  document.getElementById("lessonTitle").textContent = lesson.title;
  document.getElementById("lessonText").textContent = lesson.text;

  popup.classList.remove("hidden");

  foundObjects.add(objectKey);
  button.classList.add("discovered", "wiggle");

  setTimeout(() => button.classList.remove("wiggle"), 600);

  const count = document.getElementById("objectsFound");
  if (count) count.textContent = foundObjects.size;

  if (foundObjects.size >= 6) {
    setMemeTip("Great exploring! Backpack Rescue is ready.");
  }
}

function collectSticker(button) {
  const stickerName = button.dataset.sticker;

  if (foundStickers.has(stickerName)) return;

  foundStickers.add(stickerName);
  button.classList.add("collected");
  button.textContent = "✨";

  setMemeTip(`You found a hidden sticker: ${stickerName}!`);
}

function startBackpackRescue() {
  if (foundObjects.size < 6) {
    setMemeTip(`Click all 6 learning objects first. You found ${foundObjects.size} out of 6.`);
    return;
  }

  showSection("practiceZone");
  loadPractice();
  setMemeTip("Backpack Rescue time! Drag each item into the correct zone.");
}

function loadPractice() {
  const item = practiceQuestions[practiceIndex];
  const itemText = document.getElementById("sortItemText");
  const feedback = document.getElementById("practiceFeedback");
  const card = document.getElementById("dragItemCard");

  if (!itemText || !feedback || !card) return;

  itemText.textContent = item.text;
  feedback.textContent = "";
  feedback.style.background = "transparent";
  card.classList.remove("shake", "correct-glow", "slide-away");

  practiceAnswered = false;
}

function answerPractice(choice, target) {
  if (practiceAnswered) return;

  const current = practiceQuestions[practiceIndex];
  const feedback = document.getElementById("practiceFeedback");
  const card = document.getElementById("dragItemCard");

  if (!current || !feedback || !card) return;

  if (choice === current.answer) {
    practiceAnswered = true;
    practiceCorrect++;

    document.getElementById("practiceCorrect").textContent = practiceCorrect;

    feedback.textContent = "🎉 Correct! " + current.explain;
    feedback.style.background = "#e9fff3";
    card.classList.add("correct-glow");

    setTimeout(() => {
      practiceIndex++;

      if (practiceIndex >= practiceQuestions.length) {
        setMemeTip("Backpack Rescue complete! Final test coming next.");
        showSection("testZone");
        return;
      }

      loadPractice();
    }, 900);
  } else {
    feedback.textContent = "Good guess! " + current.explain;
    feedback.style.background = "#f3efff";

    card.classList.add("shake");
    target.classList.add("shake");

    setTimeout(() => {
      card.classList.remove("shake");
      target.classList.remove("shake");
    }, 700);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadMissionHeroName();

  const acceptButton = document.getElementById("acceptMission");
  if (acceptButton) {
    acceptButton.addEventListener("click", acceptMission);
  }

  document.querySelectorAll(".meme-help-btn").forEach((button) => {
    button.addEventListener("click", () => {
      setMemeTip(button.dataset.tip);
    });
  });

  document.querySelectorAll(".island-object").forEach((button) => {
    button.addEventListener("click", () => {
      openLesson(button.dataset.object, button);
    });
  });

  document.querySelectorAll(".sticker").forEach((button) => {
    button.addEventListener("click", () => {
      collectSticker(button);
    });
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
});
