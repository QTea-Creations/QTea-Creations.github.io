"use strict";

/* =========================================================
   SAFETII NET — HANDLE WITH CARE
   PHYSICAL USERNAME FACTORY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const byId = (id) => document.getElementById(id);

  /* ---------------------------------------------------------
     MAIN SCREENS
  --------------------------------------------------------- */

  const introScreen = byId("introScreen");
  const playScreen = byId("playScreen");
  const resultScreen = byId("resultScreen");

  const startGameButton = byId("startGame");
  const playAgainButton = byId("playAgain");

  const handleFactory = byId("handleFactory");
  const factoryWorker = byId("factoryWorker");

  /* ---------------------------------------------------------
     OVERLAYS
  --------------------------------------------------------- */

  const tutorialOpeningOverlay = byId("tutorialOpeningOverlay");
  const howToPlayOverlay = byId("howToPlayOverlay");
  const pauseOverlay = byId("pauseOverlay");
  const orderCompleteOverlay = byId("orderCompleteOverlay");

  const beginTutorialButton = byId("beginTutorialButton");
  const skipTutorialOpeningButton = byId("skipTutorialOpeningButton");
  const tutorialSkipButton = byId("tutorialSkipButton");

  const howToPlayButton = byId("howToPlayButton");
  const gameHelpButton = byId("gameHelpButton");
  const pauseHelpButton = byId("pauseHelpButton");
  const replayTutorialButton = byId("replayTutorialButton");

  const closeHowToPlayButton = byId("closeHowToPlayButton");
  const closeInstructionsButton = byId("closeInstructionsButton");

  const pauseGameButton = byId("pauseGameButton");
  const resumeGameButton = byId("resumeGameButton");
  const restartGameButton = byId("restartGameButton");

  const continueOrderButton = byId("continueOrderButton");

  /* ---------------------------------------------------------
     GAME ELEMENTS
  --------------------------------------------------------- */

  const carriedItemBubble = byId("carriedItemBubble");
  const carriedItemText = byId("carriedItemText");
  const carriedItemIcon = byId("carriedItemIcon");

   const mixerStation = byId("mixerStation");
   const scannerStation = byId("scannerStation");
   const shippingStation = byId("shippingStation");
   const nopeChuteStation = byId("nopeChuteStation");
   const garbageCanStation = byId("garbageCanStation");
   const partsShelfStation = byId("partsShelfStation");

  const tutorialCard = byId("factoryTutorialCard");
  const tutorialHighlight = byId("tutorialHighlight");

  const timeFreezeEffect = byId("timeFreezeEffect");
  const soundToggleButton = byId("soundToggleButton");

  const mobileControls = byId("factoryMobileControls");

  const controlChoices = [
    ...document.querySelectorAll(".handle-control-choice")
  ];

  const difficultyChoices = [
    ...document.querySelectorAll(".handle-difficulty-choice")
  ];

  const shelfSlotButtons = [
    ...document.querySelectorAll(".parts-shelf-slot")
  ];

  const laneElements = {
    one: {
      element: byId("factoryLaneOne"),
      layer: byId("laneOnePieces")
    },

    two: {
      element: byId("factoryLaneTwo"),
      layer: byId("laneTwoPieces"),
      lock: byId("laneTwoLock")
    },

    three: {
      element: byId("factoryLaneThree"),
      layer: byId("laneThreePieces"),
      lock: byId("laneThreeLock")
    }
  };

  const mobileButtons = {
    left: byId("moveLeftButton"),
    right: byId("moveRightButton"),
    up: byId("moveUpButton"),
    down: byId("moveDownButton"),
    action: byId("actionButton"),
    freeze: byId("freezeButton")
  };

  /* =========================================================
     STORAGE KEYS
  ========================================================= */

  const TUTORIAL_KEY = "handleWithCareTutorialComplete";
  const BEST_SCORE_KEY = "handleWithCareBestScore";

  /* =========================================================
     GAME DATA
  ========================================================= */

  const difficultySettings = {
    easy: {
      totalOrders: 6,
      health: 5,
      firstTimedOrder: 2,
      orderTime: 105,
      spawnDelay: 4200,
      pieceDuration: 19000,
      unsafeChance: 0.18,
      freezeDuration: 7000,
      freezeSpeed: 0.2,
      scoreMultiplier: 1
    },

    medium: {
      totalOrders: 6,
      health: 4,
      firstTimedOrder: 0,
      orderTime: 80,
      spawnDelay: 3000,
      pieceDuration: 14000,
      unsafeChance: 0.29,
      freezeDuration: 6000,
      freezeSpeed: 0.26,
      scoreMultiplier: 1.5
    },

    hard: {
      totalOrders: 7,
      health: 3,
      firstTimedOrder: 0,
      orderTime: 65,
      spawnDelay: 2200,
      pieceDuration: 10500,
      unsafeChance: 0.39,
      freezeDuration: 5000,
      freezeSpeed: 0.32,
      scoreMultiplier: 2
    }
  };

  const safeWords = {
    style: [
      "Wacky",
      "Cosmic",
      "Mighty",
      "Neon",
      "Turbo",
      "Glitter",
      "Mystic",
      "Fuzzy"
    ],

    animal: [
      "Panda",
      "Otter",
      "Dragon",
      "Falcon",
      "Koala",
      "Tiger",
      "Llama",
      "Penguin"
    ],

    action: [
      "Bounce",
      "Zoom",
      "Blast",
      "Dash",
      "Flip",
      "Spark",
      "Glide",
      "Bolt"
    ],

    space: [
      "Nova",
      "Comet",
      "Orbit",
      "Galaxy",
      "Meteor",
      "Lunar",
      "Astro",
      "Rocket"
    ],

    nature: [
      "River",
      "Meadow",
      "Forest",
      "Breeze",
      "Canyon",
      "Willow",
      "Sunbeam",
      "Cloud"
    ],

    hero: [
      "Guardian",
      "Captain",
      "Ranger",
      "Shield",
      "Champion",
      "Scout",
      "Defender",
      "Legend"
    ],

    silly: [
      "Pickle",
      "Wobble",
      "Noodle",
      "Giggle",
      "Bubbles",
      "Banana",
      "Jelly",
      "Sprinkles"
    ]
  };

  const unsafePieces = [
    {
      text: "Real Name",
      reason: "A real name can identify the person behind an account."
    },
    {
      text: "Home Address",
      reason: "A home address is private location information."
    },
    {
      text: "School Name",
      reason: "A school name may reveal where someone regularly goes."
    },
    {
      text: "Phone Number",
      reason: "Phone numbers should not appear in public usernames."
    },
    {
      text: "Password",
      reason: "Passwords must always remain private."
    },
    {
      text: "Birth Year",
      reason: "A birth year may reveal someone’s exact age."
    },
    {
      text: "Login Code",
      reason: "Login and verification codes should never be shared."
    }
  ];

  const orders = [
    {
      title: "Silly Animal",
      description: "Collect one style, one animal, and one action word.",
      categories: ["style", "animal", "action"],
      labels: ["STYLE", "ANIMAL", "ACTION"]
    },
    {
      title: "Space Explorer",
      description: "Collect one space word, one animal, and one action.",
      categories: ["space", "animal", "action"],
      labels: ["SPACE", "ANIMAL", "ACTION"]
    },
    {
      title: "Nature Hero",
      description: "Collect one nature word, one hero word, and one action.",
      categories: ["nature", "hero", "action"],
      labels: ["NATURE", "HERO", "ACTION"]
    },
    {
      title: "Maximum Mayhem",
      description: "Collect one silly word, one animal, and one action.",
      categories: ["silly", "animal", "action"],
      labels: ["SILLY", "ANIMAL", "ACTION"]
    },
    {
      title: "Hero in Space",
      description: "Collect one space word, one hero word, and one action.",
      categories: ["space", "hero", "action"],
      labels: ["SPACE", "HERO", "ACTION"]
    },
    {
      title: "Forest Friend",
      description: "Collect one nature word, one animal, and one silly word.",
      categories: ["nature", "animal", "silly"],
      labels: ["NATURE", "ANIMAL", "SILLY"]
    },
    {
      title: "Mystery Mix",
      description: "Collect one style word, one hero word, and one nature word.",
      categories: ["style", "hero", "nature"],
      labels: ["STYLE", "HERO", "NATURE"]
    }
  ];

  const laneCategoryPools = {
    one: ["style", "space", "nature", "silly"],
    two: ["animal", "hero", "silly"],
    three: ["action", "hero", "nature"]
  };

 const stationElements = {
  nope: nopeChuteStation,
  garbage: garbageCanStation,
  parts: partsShelfStation,
  mixer: mixerStation,
  scanner: scannerStation,
  shipping: shippingStation
};

   function getStationCenterX(stationName) {
  const station = stationElements[stationName];

  if (!station || !handleFactory) {
    return null;
  }

  const factoryRect =
    handleFactory.getBoundingClientRect();

  const stationRect =
    station.getBoundingClientRect();

  const stationCenter =
    stationRect.left +
    stationRect.width / 2;

  return (
    ((stationCenter - factoryRect.left) /
      factoryRect.width) *
    100
  );
}
  const floorLevels = {
    ground: 87,
    laneThree: 62,
    laneTwo: 39,
    laneOne: 16
  };

  /* =========================================================
     STATE
  ========================================================= */

  let selectedControlMode = "keyboard";
  let selectedDifficulty = "easy";

  let gameActive = false;
  let orderActive = false;
  let paused = false;
  let tutorialActive = false;
  let soundEnabled = true;

  let currentOrderIndex = 0;
  let currentOrder = orders[0];

  let score = 0;
  let combo = 0;
  let bestCombo = 0;

  let health = 5;
  let timeRemaining = 0;
  let ordersShipped = 0;
  let privateCluesBlocked = 0;
  let orderPrivateBlocked = 0;

  let correctActions = 0;
  let mistakes = 0;

  let workerX = 12;
  let workerY = floorLevels.ground;
  let workerMovingLeft = false;
  let workerMovingRight = false;

  let carriedItem = null;
  let activePieces = [];
  let mixerPieces = [null, null, null];
  let shelfPieces = [null, null, null];

  let mixedPackage = null;
  let approvedPackage = null;

  let timeFreezeCharge = 100;
  let timeFreezeActive = false;

  let spawnInterval = null;
  let timerInterval = null;
  let workerAnimationFrame = null;
  let pieceAnimationFrame = null;
  let lastWorkerTimestamp = 0;

  let tutorialStep = 0;
  let tutorialTargetPiece = null;

  const shippedUsernames = [];
  const managedTimeouts = new Set();

  /* =========================================================
     GENERAL HELPERS
  ========================================================= */

  function setText(id, value) {
    const element = byId(id);

    if (element) {
      element.textContent = String(value);
    }
  }

  function show(element) {
    element?.classList.remove("hidden");
  }

  function hide(element) {
    element?.classList.add("hidden");
  }

  function chooseRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function managedTimeout(callback, delay) {
    const timeout = window.setTimeout(() => {
      managedTimeouts.delete(timeout);
      callback();
    }, delay);

    managedTimeouts.add(timeout);
    return timeout;
  }

  function clearManagedTimeouts() {
    managedTimeouts.forEach((timeout) => {
      window.clearTimeout(timeout);
    });

    managedTimeouts.clear();
  }

  function getSettings() {
    return difficultySettings[selectedDifficulty];
  }

  function isTutorialComplete() {
    return localStorage.getItem(TUTORIAL_KEY) === "true";
  }

  function markTutorialComplete() {
    localStorage.setItem(TUTORIAL_KEY, "true");
  }

  function updateGlobalPoints() {
    if (
      window.SafetiiArcade &&
      typeof window.SafetiiArcade.getGlobalPoints === "function"
    ) {
      setText("globalPoints", window.SafetiiArcade.getGlobalPoints());
      return;
    }

    setText(
      "globalPoints",
      Number(localStorage.getItem("safetiiGlobalPoints") || 0)
    );
  }

  /* =========================================================
     INTRO SELECTIONS
  ========================================================= */

  controlChoices.forEach((button) => {
    button.addEventListener("click", () => {
      controlChoices.forEach((choice) => {
        choice.classList.remove("active");
      });

      button.classList.add("active");
      selectedControlMode = button.dataset.controlMode || "keyboard";
    });
  });

  difficultyChoices.forEach((button) => {
    button.addEventListener("click", () => {
      difficultyChoices.forEach((choice) => {
        choice.classList.remove("active");
      });

      button.classList.add("active");
      selectedDifficulty = button.dataset.difficulty || "easy";
    });
  });

  /* =========================================================
     START AND RESET
  ========================================================= */

  function resetGame() {
    stopAllLoops();
    clearManagedTimeouts();
    clearPieces();

    const settings = getSettings();

    gameActive = true;
    orderActive = false;
    paused = false;
    tutorialActive = false;

    currentOrderIndex = 0;
    currentOrder = orders[0];

    score = 0;
    combo = 0;
    bestCombo = 0;

    health = settings.health;
    timeRemaining = settings.orderTime;
    ordersShipped = 0;
    privateCluesBlocked = 0;
    orderPrivateBlocked = 0;

    correctActions = 0;
    mistakes = 0;

    workerX = 12;
    workerY = floorLevels.ground;
    workerMovingLeft = false;
    workerMovingRight = false;

    carriedItem = null;
    mixerPieces = [null, null, null];
    shelfPieces = [null, null, null];

    mixedPackage = null;
    approvedPackage = null;

    timeFreezeCharge = 100;
    timeFreezeActive = false;

    shippedUsernames.length = 0;

    hide(tutorialOpeningOverlay);
    hide(howToPlayOverlay);
    hide(pauseOverlay);
    hide(orderCompleteOverlay);
    hide(tutorialCard);
    hide(tutorialSkipButton);
    hide(tutorialHighlight);
    hide(timeFreezeEffect);

    updateWorker();
    updateCarriedItem();
    updateMixer();
    updateShelf();
    updateHUD();
  }

  function startGame() {
    resetGame();

    hide(introScreen);
    hide(resultScreen);
    show(playScreen);

    configureControls();
    startWorkerLoop();

    if (
      window.SafetiiArcade &&
      typeof window.SafetiiArcade.startRound === "function"
    ) {
      try {
        window.SafetiiArcade.startRound({
          gameId: "handle-with-care",
          heat: selectedDifficulty,
          questionCount: getSettings().totalOrders
        });
      } catch (error) {
        console.warn("Unable to start arcade round:", error);
      }
    }

    if (selectedDifficulty === "easy") {
      showTutorialChoice();
    } else {
      beginNormalOrder(0);
    }
  }

  function configureControls() {
    const usesButtons =
      selectedControlMode === "buttons" ||
      selectedControlMode === "assist";

    mobileControls?.classList.toggle("hidden", !usesButtons);

    const reminders = {
      keyboard: "Move: WASD or Arrows · Use: E · Time Freeze: F",
      buttons: "Move with the screen buttons · USE picks up and places",
      assist: "Assist Mode · Larger interaction range · Easier climbing"
    };

    setText("controlReminder", reminders[selectedControlMode]);
  }

  /* =========================================================
     TUTORIAL CHOICE
  ========================================================= */

  function showTutorialChoice() {
    const returning = isTutorialComplete();

    setText(
      "tutorialOpeningHeading",
      returning
        ? "Welcome back to factory training!"
        : "Ready for a quick tutorial?"
    );

    setText(
      "tutorialOpeningMessage",
      returning
        ? "Replay the training or skip directly to your first order."
        : "Learn how to collect, carry, mix, inspect, and ship your first username."
    );

    show(tutorialOpeningOverlay);
  }

  function beginTutorial() {
    hide(tutorialOpeningOverlay);

    tutorialActive = true;
    orderActive = false;
    tutorialStep = 0;

    show(tutorialCard);
    show(tutorialSkipButton);

    clearPieces();
    resetOrderMachines();

    unlockLanes(1);

    currentOrder = orders[0];
    renderOrder();

    workerX = 12;
    workerY = floorLevels.laneOne;

    updateWorker();

    runTutorialStep();
  }

  function skipTutorial() {
    markTutorialComplete();

    tutorialActive = false;

    hide(tutorialOpeningOverlay);
    hide(tutorialCard);
    hide(tutorialSkipButton);
    hide(tutorialHighlight);

    clearPieces();
    resetOrderMachines();

    beginNormalOrder(0);
  }

  const tutorialSteps = [
    {
      title: "Walk to the Wacky piece",
      message: "Use A and D or the left and right arrow keys.",
      control: "⬅️  ➡️"
    },
    {
      title: "Pick it up",
      message: "Stand close to Wacky and press E.",
      control: "E"
    },
    {
      title: "Carry it to the mixer",
      message: "Climb down, walk to the Username Mixer, and press E.",
      control: "⚙️"
    },
    {
      title: "Block private information",
      message: "Pick up Home Address and carry it to the Nope Chute.",
      control: "🚫"
    },
    {
      title: "Fill the remaining slots",
      message: "Collect Panda and Bounce and place them in the mixer.",
      control: "✨"
    },
    {
      title: "Mix the username",
      message: "Stand at the mixer with empty hands and press E.",
      control: "⚙️"
    },
{
  title: "Collect and inspect the package",
  message:
    "Press E at the mixer to collect the package. Then carry it to Final Inspection and press E again.",
  control: "📦 ➜ 🔍"
},
    {
      title: "Ship it!",
      message: "Carry the approved package to Ship It and press E.",
      control: "🚀"
    }
  ];

   function clearTutorialTargetPulses() {
  document
    .querySelectorAll(".tutorial-target-pulse")
    .forEach((element) => {
      element.classList.remove("tutorial-target-pulse");
    });
}

function pulseTutorialTarget(element) {
  if (!element) {
    return;
  }

  element.classList.add("tutorial-target-pulse");
}

function runTutorialStep() {
  const step = tutorialSteps[tutorialStep];

  clearTutorialTargetPulses();

  setText(
    "tutorialStepLabel",
    `Tutorial ${tutorialStep + 1} of ${tutorialSteps.length}`
  );

  setText("tutorialStepTitle", step.title);
  setText("tutorialStepMessage", step.message);
  setText("tutorialControlIcon", step.control);

  switch (tutorialStep) {
    case 0:
      tutorialTargetPiece = createPiece("one", {
        text: "Wacky",
        category: "style",
        unsafe: false,
        fixedX: 54,
        tutorial: true
      });

      pulseTutorialTarget(
        tutorialTargetPiece?.element
      );
      break;

    case 1:
      pulseTutorialTarget(
        tutorialTargetPiece?.element
      );
      break;

    case 2:
      pulseTutorialTarget(mixerStation);
      break;

    case 3:
      tutorialTargetPiece = createPiece("one", {
        text: "Home Address",
        category: "unsafe",
        unsafe: true,
        reason:
          "A home address is private location information.",
        fixedX: 52,
        tutorial: true
      });

      pulseTutorialTarget(
        tutorialTargetPiece?.element
      );
      break;

    case 4:
      if (
        !activePieces.some(
          (piece) =>
            piece.data.text === "Panda"
        )
      ) {
        const pandaPiece = createPiece("two", {
          text: "Panda",
          category: "animal",
          unsafe: false,
          fixedX: 40,
          tutorial: true
        });

        const bouncePiece = createPiece("three", {
          text: "Bounce",
          category: "action",
          unsafe: false,
          fixedX: 64,
          tutorial: true
        });

        unlockLanes(3);

        pulseTutorialTarget(
          pandaPiece?.element
        );

        pulseTutorialTarget(
          bouncePiece?.element
        );
      }
      break;

    case 5:
      pulseTutorialTarget(mixerStation);
      break;

    case 6:
      /*
        The mixer pulses first because the player
        must collect the completed package there.
      */
      pulseTutorialTarget(mixerStation);
      break;

    case 7:
      pulseTutorialTarget(shippingStation);
      break;

    default:
      break;
  }
}
  function advanceTutorial() {
    tutorialStep += 1;

    if (tutorialStep >= tutorialSteps.length) {
      completeTutorial();
      return;
    }

    runTutorialStep();
  }

  function completeTutorial() {
    markTutorialComplete();

    tutorialActive = false;

    hide(tutorialCard);
    hide(tutorialSkipButton);
    hide(tutorialHighlight);

    showFeedback({
      correct: true,
      icon: "🎉",
      title: "Training complete!",
      message: "The real factory shift is ready.",
      points: "+50"
    });

    score += 50;

    managedTimeout(() => {
      clearPieces();
      resetOrderMachines();
      beginNormalOrder(0);
    }, 1200);
  }

  /* =========================================================
     ORDER SYSTEM
  ========================================================= */

  function beginNormalOrder(index) {
    clearPieces();
    resetOrderMachines();

    currentOrderIndex = index;
    currentOrder = orders[index % orders.length];

    orderPrivateBlocked = 0;

    const settings = getSettings();

    timeRemaining = settings.orderTime;

    if (
      selectedDifficulty === "easy" &&
      index < settings.firstTimedOrder
    ) {
      timeRemaining = null;
    }

    const laneCount = getLaneCountForOrder(index);

    unlockLanes(laneCount);
    renderOrder();
    updateHUD();

    showAnnouncement(
      "📦",
      `Order ${index + 1}`,
      currentOrder.title,
      currentOrder.description,
      () => {
        orderActive = true;
        startSpawning();
        startTimer();
      }
    );
  }

  function getLaneCountForOrder(index) {
    if (selectedDifficulty === "hard") {
      return 3;
    }

    if (selectedDifficulty === "medium") {
      return index >= 2 ? 3 : 2;
    }

    if (index <= 1) {
      return 1;
    }

    if (index <= 3) {
      return 2;
    }

    return 3;
  }

  function unlockLanes(count) {
    const laneNames = ["one", "two", "three"];

    laneNames.forEach((name, index) => {
      const unlocked = index < count;
      const lane = laneElements[name];

      lane.element?.classList.toggle("locked-lane", !unlocked);
      lane.lock?.classList.toggle("hidden", unlocked);
    });
  }

  function renderOrder() {
    setText("currentOrderNumber", currentOrderIndex + 1);
    setText("totalOrders", getSettings().totalOrders);

    setText("orderTitle", currentOrder.title);
    setText("orderDescription", currentOrder.description);

    setText("recipeSlotOne", currentOrder.labels[0]);
    setText("recipeSlotTwo", currentOrder.labels[1]);
    setText("recipeSlotThree", currentOrder.labels[2]);

    setText(
      "factoryStageName",
      getLaneCountForOrder(currentOrderIndex) === 1
        ? "Training Floor"
        : getLaneCountForOrder(currentOrderIndex) === 2
          ? "Double-Line Floor"
          : "Full Factory Floor"
    );
  }

  /* =========================================================
     HUD
  ========================================================= */

  function updateHUD() {
    setText("currentScore", Math.round(score));
    setText("comboCount", combo);

    setText(
      "timeRemaining",
      timeRemaining === null
        ? "Practice"
        : Math.max(0, Math.ceil(timeRemaining))
    );

    const settings = getSettings();

    setText(
      "factoryHealthDisplay",
      `${"❤️".repeat(Math.max(0, health))}${"🖤".repeat(
        Math.max(0, settings.health - health)
      )}`
    );

    const freezeFill = byId("timeFreezeFill");

    if (freezeFill) {
      freezeFill.style.width = `${Math.min(100, timeFreezeCharge)}%`;
    }
  }

  /* =========================================================
     PIECE SPAWNING
  ========================================================= */

  function startSpawning() {
    window.clearInterval(spawnInterval);

    spawnNeededPiece();

    spawnInterval = window.setInterval(() => {
      if (
        !gameActive ||
        !orderActive ||
        paused ||
        tutorialActive
      ) {
        return;
      }

      spawnNeededPiece();

      if (
        selectedDifficulty !== "easy" &&
        Math.random() < 0.22
      ) {
        managedTimeout(spawnNeededPiece, 450);
      }
    }, getSettings().spawnDelay);
  }

  function spawnNeededPiece() {
    const unlockedLanes = getUnlockedLanes();

    if (unlockedLanes.length === 0) {
      return;
    }

    const unsafe = Math.random() < getSettings().unsafeChance;

    if (unsafe) {
      const data = chooseRandom(unsafePieces);

      createPiece(chooseRandom(unlockedLanes), {
        text: data.text,
        category: "unsafe",
        unsafe: true,
        reason: data.reason
      });

      return;
    }

    const missingCategories = currentOrder.categories.filter(
      (category, index) => !mixerPieces[index]
    );

    let category = chooseRandom(missingCategories);

    const validLanes = unlockedLanes.filter((lane) =>
      laneCategoryPools[lane].includes(category)
    );

    let lane = validLanes.length
      ? chooseRandom(validLanes)
      : chooseRandom(unlockedLanes);

    if (!laneCategoryPools[lane].includes(category)) {
      category = chooseRandom(laneCategoryPools[lane]);
    }

    createPiece(lane, {
      text: chooseRandom(safeWords[category]),
      category,
      unsafe: false
    });
  }

  function getUnlockedLanes() {
    return ["one", "two", "three"].filter(
      (name) =>
        !laneElements[name].element?.classList.contains("locked-lane")
    );
  }

  function createPiece(lane, data) {
    const layer = laneElements[lane]?.layer;

    if (!layer) {
      return null;
    }

    const element = document.createElement("button");

    element.type = "button";
    element.className = `factory-moving-piece ${
      data.unsafe ? "private-piece" : "creative-piece"
    }`;

    element.innerHTML = `
      <span>${data.unsafe ? "⚠️" : "✨"}</span>
      <strong>${data.text}</strong>
      <small>${data.unsafe ? "PRIVATE" : data.category.toUpperCase()}</small>
    `;

    layer.appendChild(element);

    const piece = {
      element,
      lane,
      data,
      x: data.fixedX ?? -12,
      removed: false,
      tutorial: Boolean(data.tutorial),
      lastTimestamp: performance.now()
    };

    activePieces.push(piece);

    updatePiecePosition(piece);

    if (!piece.tutorial) {
      requestPieceAnimation();
    }

    return piece;
  }

  function requestPieceAnimation() {
    if (pieceAnimationFrame) {
      return;
    }

    pieceAnimationFrame = window.requestAnimationFrame(animatePieces);
  }

  function animatePieces(timestamp) {
    pieceAnimationFrame = null;

    if (!gameActive) {
      return;
    }

    activePieces.forEach((piece) => {
      if (piece.removed || piece.tutorial) {
        return;
      }

      const delta = timestamp - piece.lastTimestamp;
      piece.lastTimestamp = timestamp;

      if (!paused && orderActive) {
        const speedFactor = timeFreezeActive
          ? getSettings().freezeSpeed
          : 1;

        piece.x +=
          (delta / getSettings().pieceDuration) *
          124 *
          speedFactor;

        updatePiecePosition(piece);

        if (piece.x >= 108) {
          handleMissedPiece(piece);
        }
      }
    });

    activePieces = activePieces.filter((piece) => !piece.removed);

    if (activePieces.length) {
      requestPieceAnimation();
    }
  }

  function updatePiecePosition(piece) {
    piece.element.style.left = `${piece.x}%`;
  }

  function removePiece(piece) {
    if (!piece || piece.removed) {
      return;
    }

    piece.removed = true;
    piece.element.remove();
  }

  function clearPieces() {
    activePieces.forEach((piece) => {
      piece.removed = true;
      piece.element.remove();
    });

    activePieces = [];

    Object.values(laneElements).forEach((lane) => {
      if (lane.layer) {
        lane.layer.innerHTML = "";
      }
    });
  }

  function handleMissedPiece(piece) {
    if (piece.data.unsafe) {
      damageFactory(
        "Private clue escaped!",
        piece.data.reason
      );
    } else {
      combo = 0;

      showFeedback({
        correct: false,
        icon: "📦",
        title: "Piece missed",
        message: `${piece.data.text} rolled off the line.`,
        points: "+0"
      });
    }

    removePiece(piece);
  }

  /* =========================================================
     PLAYER MOVEMENT
  ========================================================= */

  function startWorkerLoop() {
    lastWorkerTimestamp = performance.now();

    workerAnimationFrame =
      window.requestAnimationFrame(workerLoop);
  }

  function workerLoop(timestamp) {
    if (!gameActive) {
      return;
    }

    const delta = Math.min(34, timestamp - lastWorkerTimestamp);
    lastWorkerTimestamp = timestamp;

    if (!paused) {
      const speed =
        selectedControlMode === "assist"
          ? 0.045
          : 0.038;

      if (workerMovingLeft) {
        workerX -= speed * delta;
      }

      if (workerMovingRight) {
        workerX += speed * delta;
      }

      workerX = Math.max(2, Math.min(98, workerX));

      timeFreezeCharge = Math.min(
        100,
        timeFreezeCharge + delta * 0.0038
      );

      updateWorker();
      updateHUD();

      if (tutorialActive) {
        checkTutorialMovement();
      }
    }

    workerAnimationFrame =
      window.requestAnimationFrame(workerLoop);
  }

  function updateWorker() {
    if (!factoryWorker) {
      return;
    }

    factoryWorker.style.left = `${workerX}%`;
    factoryWorker.style.top = `${workerY}%`;

    factoryWorker.classList.toggle(
      "worker-moving",
      workerMovingLeft || workerMovingRight
    );

    factoryWorker.classList.toggle(
      "worker-facing-left",
      workerMovingLeft
    );
  }

  function moveVertical(direction) {
    const levels = [
      floorLevels.laneOne,
      floorLevels.laneTwo,
      floorLevels.laneThree,
      floorLevels.ground
    ];

    const currentIndex = levels.reduce(
      (closest, value, index) =>
        Math.abs(value - workerY) <
        Math.abs(levels[closest] - workerY)
          ? index
          : closest,
      0
    );

    const nextIndex =
      direction === "up"
        ? Math.max(0, currentIndex - 1)
        : Math.min(levels.length - 1, currentIndex + 1);

    const laneCount = getLaneCountForOrder(currentOrderIndex);

    const minimumIndex =
      laneCount === 1
        ? 0
        : laneCount === 2
          ? 0
          : 0;

    workerY = levels[Math.max(minimumIndex, nextIndex)];

    factoryWorker?.classList.add("worker-climbing");

    managedTimeout(() => {
      factoryWorker?.classList.remove("worker-climbing");
    }, 300);

    updateWorker();
  }
/* =========================================================
   INTERACTION
========================================================= */

function useNearbyObject() {
  if (!gameActive || paused) {
    return;
  }

  /*
    When carrying an object, first try to place it
    into the nearest ground-floor station.
  */
  if (carriedItem) {
    const nearbyStation =
      getNearbyStation();

    if (nearbyStation) {
      placeCarriedItem(
        nearbyStation
      );

      return;
    }
  }

  /*
    With empty hands, first look for a nearby
    conveyor piece.
  */
  const nearbyPiece =
    getNearbyPiece();

  if (nearbyPiece) {
    pickUpPiece(
      nearbyPiece
    );

    return;
  }

  /*
    Then look for a saved Parts Shelf item.
  */
  const shelfPiece =
    getNearbyShelfPiece();

  if (shelfPiece) {
    pickUpShelfPiece(
      shelfPiece.index
    );

    return;
  }

  /*
    Finally, operate a nearby machine with
    empty hands.
  */
  const nearbyStation =
    getNearbyStation();

  if (nearbyStation) {
    useEmptyHandStation(
      nearbyStation
    );

    return;
  }

  showFeedback({
    correct: false,
    icon: "✋",
    title: "Nothing close enough",
    message:
      "Move closer to a piece or machine and press E again.",
    points: "+0"
  });
}


function getWorkerLane() {
  const distances = {
    one:
      Math.abs(
        workerY -
        floorLevels.laneOne
      ),

    two:
      Math.abs(
        workerY -
        floorLevels.laneTwo
      ),

    three:
      Math.abs(
        workerY -
        floorLevels.laneThree
      )
  };

  return Object
    .entries(distances)
    .sort(
      (first, second) =>
        first[1] - second[1]
    )[0][0];
}


function getNearbyPiece() {
  const workerLane =
    getWorkerLane();

  const interactionRange =
    selectedControlMode === "assist"
      ? 18
      : 12;

  const nearbyPieces =
    activePieces
      .filter((piece) => {
        return (
          piece &&
          !piece.removed &&
          piece.element &&
          piece.lane === workerLane &&
          Math.abs(
            piece.x -
            workerX
          ) <= interactionRange
        );
      })
      .sort(
        (first, second) =>
          Math.abs(
            first.x -
            workerX
          ) -
          Math.abs(
            second.x -
            workerX
          )
      );

  return nearbyPieces[0] || null;
}


function pickUpPiece(piece) {
  if (
    carriedItem ||
    !piece ||
    piece.removed
  ) {
    return;
  }

  carriedItem = {
    ...piece.data,
    source: "belt"
  };

  removePiece(piece);
  updateCarriedItem();

  combo += 1;

  bestCombo = Math.max(
    bestCombo,
    combo
  );

  correctActions += 1;

  score +=
    5 *
    getSettings().scoreMultiplier;

  showFeedback({
    correct: true,
    icon:
      carriedItem.unsafe
        ? "⚠️"
        : "✨",
    title:
      `${carriedItem.text} picked up!`,
    message:
      carriedItem.unsafe
        ? "Carry it to the Nope Chute."
        : "Carry it to the mixer, Parts Shelf, or Garbage Can.",
    points: "+5"
  });

  if (tutorialActive) {
    if (
      tutorialStep === 1 &&
      carriedItem.text === "Wacky"
    ) {
      advanceTutorial();
    }

    if (
      tutorialStep === 3 &&
      carriedItem.text === "Home Address"
    ) {
      clearTutorialTargetPulses();

      pulseTutorialTarget(
        nopeChuteStation
      );

      setText(
        "tutorialStepMessage",
        "Great! Climb down, walk to the pulsing Nope Chute, and press E."
      );
    }
  }

  updateHUD();
}


function getNearbyStation() {
  if (
    Math.abs(
      workerY -
      floorLevels.ground
    ) > 12
  ) {
    return null;
  }

  const interactionRange =
    selectedControlMode === "assist"
      ? 12
      : 8;

  const nearbyStations =
    Object
      .keys(stationElements)
      .map((stationName) => {
        const stationX =
          getStationCenterX(
            stationName
          );

        if (stationX === null) {
          return null;
        }

        return {
          name: stationName,
          distance:
            Math.abs(
              workerX -
              stationX
            )
        };
      })
      .filter(Boolean)
      .filter(
        (station) =>
          station.distance <=
          interactionRange
      )
      .sort(
        (first, second) =>
          first.distance -
          second.distance
      );

  return (
    nearbyStations[0]?.name ||
    null
  );
}

  function updateCarriedItem() {
    if (!carriedItem) {
      hide(carriedItemBubble);
      return;
    }

    setText("carriedItemText", carriedItem.text);
    setText(
      "carriedItemIcon",
      carriedItem.package
        ? "📦"
        : carriedItem.unsafe
          ? "⚠️"
          : "✨"
    );

    show(carriedItemBubble);
  }

 function placeCarriedItem(station) {
  switch (station) {
    case "nope":
      placeInNopeChute();
      break;

    case "garbage":
      placeInGarbageCan();
      break;

    case "parts":
      placeOnShelf();
      break;

    case "mixer":
      placeInMixer();
      break;

    case "scanner":
      placeInScanner();
      break;

    case "shipping":
      placeInShipping();
      break;

    default:
      break;
  }
}

function placeInGarbageCan() {
  if (!carriedItem) {
    return;
  }

function placeInNopeChute() {
  if (!carriedItem) {
    return;
  }

  if (!carriedItem.unsafe) {
    mistake(
      "That piece was safe",
      `${carriedItem.text} is a creative word. Use the Garbage Can if you do not want it.`
    );

    return;
  }

  const removedText =
    carriedItem.text;

  privateCluesBlocked += 1;
  orderPrivateBlocked += 1;
  correctActions += 1;

  score +=
    20 *
    getSettings().scoreMultiplier;

  combo += 1;

  bestCombo = Math.max(
    bestCombo,
    combo
  );

  carriedItem = null;

  updateCarriedItem();

  nopeChuteStation?.classList.add(
    "nope-drop"
  );

  managedTimeout(() => {
    nopeChuteStation?.classList.remove(
      "nope-drop"
    );
  }, 420);

  showFeedback({
    correct: true,
    icon: "🚫",
    title: "Private clue blocked!",
    message:
      `${removedText} went into the Nope Chute.`,
    points: "+20"
  });

  if (
    tutorialActive &&
    tutorialStep === 3
  ) {
    advanceTutorial();
  }

  updateHUD();
}
   
  if (carriedItem.package) {
    showFeedback({
      correct: false,
      icon: "📦",
      title: "Do not trash the package",
      message:
        "Take the finished package to Final Inspection or Shipping.",
      points: "+0"
    });

    return;
  }

  const discardedItem =
    carriedItem;

  const neededForOrder =
    !discardedItem.unsafe &&
    currentOrder.categories.some(
      (category, index) =>
        category ===
          discardedItem.category &&
        !mixerPieces[index]
    );

  carriedItem = null;
  updateCarriedItem();

  garbageCanStation?.classList.add(
    "garbage-drop"
  );

  managedTimeout(() => {
    garbageCanStation?.classList.remove(
      "garbage-drop"
    );
  }, 420);

  if (discardedItem.unsafe) {
    combo = 0;

    showFeedback({
      correct: false,
      icon: "🚫",
      title: "Private clue discarded",
      message:
        `${discardedItem.text} is gone, but private clues belong in the Nope Chute.`,
      points: "+0"
    });

    return;
  }

  if (neededForOrder) {
    score = Math.max(
      0,
      score - 5
    );

    combo = 0;
    mistakes += 1;

    showFeedback({
      correct: false,
      icon: "🗑️",
      title: "Needed piece discarded",
      message:
        `${discardedItem.text} matched an empty recipe slot.`,
      points: "−5"
    });
  } else {
    showFeedback({
      correct: true,
      icon: "🗑️",
      title: "Unwanted piece removed",
      message:
        `${discardedItem.text} was safely cleared from your hands.`,
      points: "+0"
    });
  }

  updateHUD();
}
  function placeOnShelf() {
    if (!carriedItem) {
      return;
    }

    if (carriedItem.unsafe || carriedItem.package) {
      mistake(
        "That cannot go on the shelf",
        "The Parts Shelf only stores creative username pieces."
      );
      return;
    }

    const emptyIndex = shelfPieces.findIndex((piece) => !piece);

    if (emptyIndex === -1) {
      showFeedback({
        correct: false,
        icon: "🧰",
        title: "Shelf full",
        message: "Pick up a saved piece before storing another one.",
        points: "+0"
      });
      return;
    }

    shelfPieces[emptyIndex] = carriedItem;

    const savedText = carriedItem.text;

    carriedItem = null;
    updateCarriedItem();
    updateShelf();

    showFeedback({
      correct: true,
      icon: "🧰",
      title: "Piece saved!",
      message: `${savedText} is visible on the Parts Shelf.`,
      points: "+5"
    });

    score += 5 * getSettings().scoreMultiplier;
    updateHUD();
  }

  function updateShelf() {
    shelfSlotButtons.forEach((button, index) => {
      const piece = shelfPieces[index];

      button.disabled = !piece;
      button.textContent = piece ? piece.text : "Empty";
      button.classList.toggle("filled-shelf-slot", Boolean(piece));
    });
  }

function getNearbyShelfPiece() {
  const partsX =
    getStationCenterX("parts");

  if (
    partsX === null ||
    Math.abs(
      workerY -
      floorLevels.ground
    ) > 12 ||
    Math.abs(
      workerX - partsX
    ) > 12 ||
    carriedItem
  ) {
    return null;
  }

  const index =
    shelfPieces.findIndex(Boolean);

  return index >= 0
    ? {
        index,
        piece: shelfPieces[index]
      }
    : null;
}

  function pickUpShelfPiece(index) {
    if (carriedItem || !shelfPieces[index]) {
      return;
    }

    carriedItem = shelfPieces[index];
    shelfPieces[index] = null;

    updateCarriedItem();
    updateShelf();

    showFeedback({
      correct: true,
      icon: "🧰",
      title: "Saved part retrieved!",
      message: `You are carrying ${carriedItem.text}.`,
      points: "+0"
    });
  }

  function placeInMixer() {
    if (!carriedItem) {
      return;
    }

    if (carriedItem.unsafe || carriedItem.package) {
      mistake(
        "Mixer rejected the item",
        "Only creative username pieces belong in the mixer."
      );
      return;
    }

    const matchingIndex = currentOrder.categories.findIndex(
      (category, index) =>
        category === carriedItem.category &&
        !mixerPieces[index]
    );

    if (matchingIndex === -1) {
      mistake(
        "That ingredient does not fit",
        `${carriedItem.text} does not match an empty recipe slot.`
      );
      return;
    }

    mixerPieces[matchingIndex] = carriedItem;

    const placedText = carriedItem.text;

    carriedItem = null;
    updateCarriedItem();
    updateMixer();

    combo += 1;
    bestCombo = Math.max(bestCombo, combo);
    correctActions += 1;

    score += 15 * getSettings().scoreMultiplier;

    showFeedback({
      correct: true,
      icon: "⚙️",
      title: "Mixer slot filled!",
      message: `${placedText} was placed into the recipe.`,
      points: "+15"
    });

    if (
      tutorialActive &&
      tutorialStep === 2 &&
      placedText === "Wacky"
    ) {
      advanceTutorial();
    }

    if (
      tutorialActive &&
      tutorialStep === 4 &&
      mixerPieces.every(Boolean)
    ) {
      advanceTutorial();
    }

    updateHUD();
  }

  function updateMixer() {
    const ids = [
      "mixerSlotOne",
      "mixerSlotTwo",
      "mixerSlotThree"
    ];

    mixerPieces.forEach((piece, index) => {
      setText(ids[index], piece ? piece.text : "?");
      byId(ids[index])?.classList.toggle(
        "filled-slot",
        Boolean(piece)
      );
    });

    if (mixedPackage) {
      setText("mixerStatus", mixedPackage.text);
    } else if (mixerPieces.every(Boolean)) {
      setText("mixerStatus", "Ready to mix — press E");
    } else {
      setText("mixerStatus", "Bring three pieces");
    }
  }

  function useEmptyHandStation(station) {
    switch (station) {
      case "mixer":
        mixUsername();
        break;

      case "scanner":
        collectApprovedPackage();
        break;

      default:
        break;
    }
  }

function mixUsername() {
  if (carriedItem) {
    return;
  }

  /*
    IMPORTANT:
    Check for a completed package BEFORE checking the mixer slots.
    The slots are emptied after the package is created.
  */
  if (mixedPackage) {
    carriedItem = mixedPackage;
    mixedPackage = null;

    updateCarriedItem();
    updateMixer();

    mixerStation?.classList.remove("tutorial-target-pulse");
    scannerStation?.classList.add("tutorial-target-pulse");

    showFeedback({
      correct: true,
      icon: "📦",
      title: "Package collected!",
      message: "Carry it to Final Inspection and press E.",
      points: "+0"
    });

    return;
  }

  if (!mixerPieces.every(Boolean)) {
    showFeedback({
      correct: false,
      icon: "⚙️",
      title: "Mixer not ready",
      message: "Fill all three recipe slots first.",
      points: "+0"
    });

    return;
  }

  mixerStation?.classList.add("mixer-running");

  setText("mixerStatus", "Mixing...");

  managedTimeout(() => {
    mixerStation?.classList.remove("mixer-running");

    const username = mixerPieces
      .map((piece) => piece.text)
      .join("");

    mixedPackage = {
      text: username,
      package: true,
      approved: false
    };

    mixerPieces = [null, null, null];

    score += 25 * getSettings().scoreMultiplier;
    correctActions += 1;

    updateMixer();

    setText(
      "mixerStatus",
      `${username} ready — press E to collect`
    );

    mixerStation?.classList.add("tutorial-target-pulse");

    showFeedback({
      correct: true,
      icon: "📦",
      title: `${username} created!`,
      message:
        "Press E at the mixer again to pick up the finished package.",
      points: "+25"
    });

    if (
      tutorialActive &&
      tutorialStep === 5
    ) {
      advanceTutorial();
    }

    updateHUD();
  }, 1000);
}

  function placeInScanner() {
    if (!carriedItem?.package) {
      mistake(
        "Scanner needs a package",
        "Only a mixed username package can be inspected."
      );
      return;
    }

    const packageToScan = carriedItem;

    carriedItem = null;
    updateCarriedItem();

    scannerStation?.classList.add("scanner-running");

    setText("scannerPackage", packageToScan.text);
    setText("scannerStatus", "Inspecting package...");

    managedTimeout(() => {
      scannerStation?.classList.remove("scanner-running");
      scannerStation?.classList.add("scanner-approved");

      approvedPackage = {
        ...packageToScan,
        approved: true
      };

      setText("scannerStatus", "APPROVED — press E to collect");

      score += 30 * getSettings().scoreMultiplier;
      correctActions += 1;

      showFeedback({
        correct: true,
        icon: "✅",
        title: "Package approved!",
        message: "Press E at the scanner to collect it.",
        points: "+30"
      });

      if (
        tutorialActive &&
        tutorialStep === 6
      ) {
        advanceTutorial();
      }

      updateHUD();
    }, 1200);
  }

  function collectApprovedPackage() {
    if (carriedItem || !approvedPackage) {
      return;
    }

    carriedItem = approvedPackage;
    approvedPackage = null;

    setText("scannerPackage", "No package");
    setText("scannerStatus", "Ready for inspection");

    scannerStation?.classList.remove("scanner-approved");

    updateCarriedItem();

    showFeedback({
      correct: true,
      icon: "📦",
      title: "Approved package collected!",
      message: "Carry it to Ship It.",
      points: "+0"
    });
  }

  function placeInShipping() {
    if (!carriedItem?.package || !carriedItem.approved) {
      mistake(
        "Shipping rejected the package",
        "The username must pass Final Inspection first."
      );
      return;
    }

    const username = carriedItem.text;

    carriedItem = null;
    updateCarriedItem();

    shippedUsernames.push(username);
    ordersShipped += 1;

    orderActive = false;

    stopOrderLoops();
    clearPieces();

    const orderScore =
      Math.round(75 * getSettings().scoreMultiplier);

    score += orderScore;

    setText("orderCompleteHeading", username);
    setText(
      "orderCompleteMessage",
      "Safe, creative, and ready for delivery!"
    );
    setText("orderCompleteScore", orderScore);
    setText("orderCompleteCombo", `${bestCombo}x`);
    setText("orderPrivateBlocked", orderPrivateBlocked);

    show(orderCompleteOverlay);

    if (
      tutorialActive &&
      tutorialStep === 7
    ) {
      hide(orderCompleteOverlay);
      completeTutorial();
    }

    updateHUD();
  }

  /* =========================================================
     TIME FREEZE
  ========================================================= */

  function activateTimeFreeze() {
    if (
      !gameActive ||
      paused ||
      timeFreezeActive ||
      timeFreezeCharge < 100
    ) {
      return;
    }

    timeFreezeCharge = 0;
    timeFreezeActive = true;

    handleFactory?.classList.add("time-freeze-active");

    show(timeFreezeEffect);

    managedTimeout(() => {
      hide(timeFreezeEffect);
    }, 1000);

    showFeedback({
      correct: true,
      icon: "❄️",
      title: "Time Freeze activated!",
      message: "Every conveyor belt has slowed down.",
      points: "+0"
    });

    managedTimeout(() => {
      timeFreezeActive = false;
      handleFactory?.classList.remove("time-freeze-active");
    }, getSettings().freezeDuration);

    updateHUD();
  }

  /* =========================================================
     TIMER AND DAMAGE
  ========================================================= */

  function startTimer() {
    window.clearInterval(timerInterval);

    if (timeRemaining === null) {
      return;
    }

    timerInterval = window.setInterval(() => {
      if (
        !gameActive ||
        !orderActive ||
        paused ||
        tutorialActive
      ) {
        return;
      }

      timeRemaining -= 1;

      updateHUD();

      if (timeRemaining <= 0) {
        damageFactory(
          "Order expired!",
          "The order waited too long."
        );

        if (health > 0) {
          continueAfterFailedOrder();
        }
      }
    }, 1000);
  }

  function damageFactory(title, message) {
    health -= 1;
    mistakes += 1;
    combo = 0;

    handleFactory?.classList.add("factory-damaged");

    managedTimeout(() => {
      handleFactory?.classList.remove("factory-damaged");
    }, 450);

    showFeedback({
      correct: false,
      icon: "💥",
      title,
      message,
      points: "−1 health"
    });

    updateHUD();

    if (health <= 0) {
      finishGame(false);
    }
  }

  function mistake(title, message) {
    mistakes += 1;
    combo = 0;

    showFeedback({
      correct: false,
      icon: "❌",
      title,
      message,
      points: "+0"
    });

    updateHUD();
  }

  function continueAfterFailedOrder() {
    stopOrderLoops();
    clearPieces();
    resetOrderMachines();

    currentOrderIndex += 1;

    if (currentOrderIndex >= getSettings().totalOrders) {
      finishGame(false);
    } else {
      beginNormalOrder(currentOrderIndex);
    }
  }

  /* =========================================================
     ORDER CONTINUATION
  ========================================================= */

  function continueOrder() {
    hide(orderCompleteOverlay);

    currentOrderIndex += 1;

    if (
      ordersShipped >= getSettings().totalOrders ||
      currentOrderIndex >= getSettings().totalOrders
    ) {
      finishGame(true);
      return;
    }

    beginNormalOrder(currentOrderIndex);
  }

  function resetOrderMachines() {
    carriedItem = null;
    mixerPieces = [null, null, null];
    shelfPieces = [null, null, null];

    mixedPackage = null;
    approvedPackage = null;

    updateCarriedItem();
    updateMixer();
    updateShelf();

    setText("scannerPackage", "No package");
    setText("scannerStatus", "Mix a username first");
    setText("shippingStatus", "Waiting for approval");

    scannerStation?.classList.remove(
      "scanner-running",
      "scanner-approved"
    );
  }

  /* =========================================================
     ANNOUNCEMENTS AND FEEDBACK
  ========================================================= */

  function showAnnouncement(
    icon,
    label,
    title,
    message,
    callback
  ) {
    const announcement = byId("factoryAnnouncement");

    setText("announcementIcon", icon);
    setText("announcementLabel", label);
    setText("announcementTitle", title);
    setText("announcementMessage", message);

    show(announcement);

    managedTimeout(() => {
      hide(announcement);

      if (typeof callback === "function") {
        callback();
      }
    }, 1700);
  }

  function showFeedback({
    correct,
    icon,
    title,
    message,
    points
  }) {
    const feedback = byId("handleFeedback");

    setText("handleFeedbackIcon", icon);
    setText("handleFeedbackTitle", title);
    setText("handleFeedbackMessage", message);
    setText("handleFeedbackPoints", points);

    feedback?.classList.remove(
      "correct-feedback",
      "wrong-feedback"
    );

    feedback?.classList.add(
      correct
        ? "correct-feedback"
        : "wrong-feedback"
    );

    show(feedback);

    managedTimeout(() => {
      hide(feedback);
    }, 1900);
  }

  /* =========================================================
     TUTORIAL MOVEMENT CHECKS
  ========================================================= */

  function checkTutorialMovement() {
    if (!tutorialTargetPiece) {
      return;
    }

    if (
      tutorialStep === 0 &&
      Math.abs(workerX - tutorialTargetPiece.x) <= 14
    ) {
      advanceTutorial();
    }
  }

  /* =========================================================
     PAUSE AND HELP
  ========================================================= */

  function pauseGame() {
    if (!gameActive || paused) {
      return;
    }

    paused = true;
    show(pauseOverlay);
  }

  function resumeGame() {
    paused = false;
    hide(pauseOverlay);
  }

  function openHelp() {
    const wasPaused = paused;

    if (gameActive) {
      paused = true;
    }

    hide(pauseOverlay);
    show(howToPlayOverlay);

    howToPlayOverlay.dataset.resumeAfterClose =
      wasPaused || gameActive
        ? "true"
        : "false";
  }

  function closeHelp() {
    hide(howToPlayOverlay);

    if (
      howToPlayOverlay.dataset.resumeAfterClose === "true" &&
      gameActive
    ) {
      paused = false;
    }
  }

  function restartGame() {
    hide(pauseOverlay);
    startGame();
  }

  /* =========================================================
     RESULTS
  ========================================================= */

  function calculateAccuracy() {
    const total = correctActions + mistakes;

    if (total <= 0) {
      return 100;
    }

    return Math.round(
      (correctActions / total) * 100
    );
  }

  function calculateStars(won) {
    const accuracy = calculateAccuracy();

    if (
      won &&
      accuracy >= 90 &&
      ordersShipped >= getSettings().totalOrders
    ) {
      return 3;
    }

    if (won && accuracy >= 70) {
      return 2;
    }

    return 1;
  }

  function calculateRank() {
    const accuracy = calculateAccuracy();

    if (score >= 1600 && accuracy >= 90) {
      return "Factory Floor Legend";
    }

    if (score >= 1000 && accuracy >= 82) {
      return "Conveyor Commander";
    }

    if (score >= 650) {
      return "Route Master";
    }

    if (score >= 300) {
      return "Mixer Manager";
    }

    return "Route Rookie";
  }

  function finishGame(won) {
    if (!gameActive) {
      return;
    }

    gameActive = false;
    orderActive = false;
    paused = false;

    stopAllLoops();
    clearManagedTimeouts();
    clearPieces();

    hide(playScreen);
    hide(orderCompleteOverlay);
    hide(pauseOverlay);
    hide(howToPlayOverlay);

    show(resultScreen);

    const accuracy = calculateAccuracy();
    const stars = calculateStars(won);

    setText(
      "resultHeading",
      won
        ? "Factory Floor Mastered!"
        : "The Factory Needs Repairs!"
    );

    setText(
      "resultMessage",
      won
        ? "You collected creative pieces, blocked private clues, and shipped every order."
        : "You completed part of the shift. Try again and use Time Freeze when the factory gets busy."
    );

    setText("factoryRank", calculateRank());
    setText("finalScore", Math.round(score));

    setText(
      "finalStars",
      `${"★".repeat(stars)}${"☆".repeat(3 - stars)}`
    );

    setText("finalOrdersShipped", ordersShipped);
    setText("finalPrivateBlocked", privateCluesBlocked);
    setText("finalBestCombo", `${bestCombo}x`);
    setText("finalAccuracy", `${accuracy}%`);

    renderShippedUsernames();

    let bestScore = Number(
      localStorage.getItem(BEST_SCORE_KEY) || 0
    );

    if (score > bestScore) {
      bestScore = Math.round(score);
      localStorage.setItem(BEST_SCORE_KEY, String(bestScore));
    }

    setText("bestScore", bestScore);

    let pointsEarned = Math.round(score);

    if (
      window.SafetiiArcade &&
      typeof window.SafetiiArcade.finishRound === "function"
    ) {
      try {
        const result = window.SafetiiArcade.finishRound({
          gameId: "handle-with-care",
          heat: selectedDifficulty,
          score: Math.round(score),
          stars,
          completed: won,
          correctAnswers: correctActions,
          totalQuestions: correctActions + mistakes
        });

        if (
          result &&
          typeof result.pointsEarned === "number"
        ) {
          pointsEarned = result.pointsEarned;
        }
      } catch (error) {
        console.warn("Unable to finish arcade round:", error);
      }
    } else {
      const storedPoints = Number(
        localStorage.getItem("safetiiGlobalPoints") || 0
      );

      localStorage.setItem(
        "safetiiGlobalPoints",
        String(storedPoints + pointsEarned)
      );
    }

    setText("globalPointsEarned", pointsEarned);
    updateGlobalPoints();
  }

  function renderShippedUsernames() {
    const list = byId("shippedUsernameList");

    if (!list) {
      return;
    }

    list.innerHTML = "";

    if (!shippedUsernames.length) {
      const empty = document.createElement("p");
      empty.textContent = "No usernames were shipped this shift.";
      list.appendChild(empty);
      return;
    }

    shippedUsernames.forEach((username, index) => {
      const card = document.createElement("article");

      card.innerHTML = `
        <span>📦</span>

        <div>
          <small>Package ${index + 1}</small>
          <strong>${username}</strong>
        </div>
      `;

      list.appendChild(card);
    });
  }

  /* =========================================================
     LOOP CONTROL
  ========================================================= */

  function stopOrderLoops() {
    window.clearInterval(spawnInterval);
    window.clearInterval(timerInterval);

    spawnInterval = null;
    timerInterval = null;
  }

  function stopAllLoops() {
    stopOrderLoops();

    if (workerAnimationFrame) {
      window.cancelAnimationFrame(workerAnimationFrame);
      workerAnimationFrame = null;
    }

    if (pieceAnimationFrame) {
      window.cancelAnimationFrame(pieceAnimationFrame);
      pieceAnimationFrame = null;
    }
  }

  /* =========================================================
     KEYBOARD CONTROLS
  ========================================================= */

  function handleKeyDown(event) {
    if (!gameActive || paused) {
      return;
    }

    switch (event.key.toLowerCase()) {
      case "arrowleft":
      case "a":
        workerMovingLeft = true;
        event.preventDefault();
        break;

      case "arrowright":
      case "d":
        workerMovingRight = true;
        event.preventDefault();
        break;

      case "arrowup":
      case "w":
        moveVertical("up");
        event.preventDefault();
        break;

      case "arrowdown":
      case "s":
        moveVertical("down");
        event.preventDefault();
        break;

      case "e":
      case "enter":
        useNearbyObject();
        event.preventDefault();
        break;

      case "f":
        activateTimeFreeze();
        event.preventDefault();
        break;

      case "escape":
        pauseGame();
        event.preventDefault();
        break;

      default:
        break;
    }
  }

  function handleKeyUp(event) {
    switch (event.key.toLowerCase()) {
      case "arrowleft":
      case "a":
        workerMovingLeft = false;
        break;

      case "arrowright":
      case "d":
        workerMovingRight = false;
        break;

      default:
        break;
    }
  }

  /* =========================================================
     SCREEN BUTTON CONTROLS
  ========================================================= */

  function bindHoldButton(button, begin, end) {
    button?.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      begin();
    });

    ["pointerup", "pointercancel", "pointerleave"].forEach(
      (eventName) => {
        button?.addEventListener(eventName, end);
      }
    );
  }

  bindHoldButton(
    mobileButtons.left,
    () => {
      workerMovingLeft = true;
    },
    () => {
      workerMovingLeft = false;
    }
  );

  bindHoldButton(
    mobileButtons.right,
    () => {
      workerMovingRight = true;
    },
    () => {
      workerMovingRight = false;
    }
  );

  mobileButtons.up?.addEventListener(
    "click",
    () => moveVertical("up")
  );

  mobileButtons.down?.addEventListener(
    "click",
    () => moveVertical("down")
  );

  mobileButtons.action?.addEventListener(
    "click",
    useNearbyObject
  );

  mobileButtons.freeze?.addEventListener(
    "click",
    activateTimeFreeze
  );

  /* =========================================================
     EVENT LISTENERS
  ========================================================= */

  startGameButton?.addEventListener("click", startGame);

  playAgainButton?.addEventListener("click", () => {
    hide(resultScreen);
    show(introScreen);
    updateGlobalPoints();
  });

  beginTutorialButton?.addEventListener(
    "click",
    beginTutorial
  );

  skipTutorialOpeningButton?.addEventListener(
    "click",
    skipTutorial
  );

  tutorialSkipButton?.addEventListener(
    "click",
    skipTutorial
  );

  continueOrderButton?.addEventListener(
    "click",
    continueOrder
  );

  pauseGameButton?.addEventListener(
    "click",
    pauseGame
  );

  resumeGameButton?.addEventListener(
    "click",
    resumeGame
  );

  restartGameButton?.addEventListener(
    "click",
    restartGame
  );

  howToPlayButton?.addEventListener(
    "click",
    openHelp
  );

  gameHelpButton?.addEventListener(
    "click",
    openHelp
  );

  pauseHelpButton?.addEventListener(
    "click",
    openHelp
  );

  closeHowToPlayButton?.addEventListener(
    "click",
    closeHelp
  );

  closeInstructionsButton?.addEventListener(
    "click",
    closeHelp
  );

  replayTutorialButton?.addEventListener("click", () => {
    hide(howToPlayOverlay);

    if (!gameActive) {
      startGame();
    }

    beginTutorial();
  });

  soundToggleButton?.addEventListener("click", () => {
    soundEnabled = !soundEnabled;

    soundToggleButton.textContent =
      soundEnabled ? "🔊" : "🔇";

    soundToggleButton.setAttribute(
      "aria-pressed",
      String(soundEnabled)
    );
  });

shelfSlotButtons.forEach(
  (button, index) => {
    button.addEventListener(
      "click",
      () => {
        const partsX =
          getStationCenterX("parts");

        if (
          partsX !== null &&
          Math.abs(
            workerX -
            partsX
          ) <= 14 &&
          Math.abs(
            workerY -
            floorLevels.ground
          ) <= 12
        ) {
          pickUpShelfPiece(
            index
          );
        }
      }
    );
  }
);

  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);

  window.addEventListener("blur", () => {
    workerMovingLeft = false;
    workerMovingRight = false;
  });

  updateGlobalPoints();
});
