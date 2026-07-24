"use strict";

/* =========================================================
   SAFETII NET — HANDLE WITH CARE
   MULTI-ROUTE USERNAME FACTORY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const byId = (id) => document.getElementById(id);

  const introScreen = byId("introScreen");
  const playScreen = byId("playScreen");
  const resultScreen = byId("resultScreen");

  const handleFactory = byId("handleFactory");
  const factoryWorker = byId("factoryWorker");

  const startGameButton = byId("startGame");
  const playAgainButton = byId("playAgain");

  const orderCompleteOverlay = byId("orderCompleteOverlay");
  const factoryCompleteOverlay = byId("factoryCompleteOverlay");

  const continueOrderButton = byId("continueOrderButton");
  const finishFactoryButton = byId("finishFactoryButton");

  const mixUsernameButton = byId("mixUsernameButton");
  const scanUsernameButton = byId("scanUsernameButton");
  const shipItBin = byId("shipItBin");
  const partsBin = byId("partsBin");
  const nopeChute = byId("nopeChute");

  const factoryMobileControls = byId("factoryMobileControls");

  const controlChoices = [
    ...document.querySelectorAll(".handle-control-choice")
  ];

  const heatChoices = [
    ...document.querySelectorAll(".heat-choice")
  ];

  const routeElements = {
    top: {
      layer: byId("topRoutePieces"),
      switch: byId("topRouteSwitch"),
      gate: byId("topRouteGate")
    },

    middle: {
      layer: byId("middleRoutePieces"),
      switch: byId("middleRouteSwitch"),
      gate: byId("middleRouteGate")
    },

    bottom: {
      layer: byId("bottomRoutePieces"),
      switch: byId("bottomRouteSwitch"),
      gate: byId("bottomRouteGate")
    }
  };

  const mobileButtons = {
    left: byId("moveLeftButton"),
    right: byId("moveRightButton"),
    up: byId("moveUpButton"),
    down: byId("moveDownButton"),
    jump: byId("jumpButton"),
    action: byId("actionButton")
  };


  /* =========================================================
     GAME DATA
  ========================================================= */

  const heatSettings = {
    mild: {
      label: "Mild",
      orders: 5,
      health: 5,
      orderTime: 80,
      spawnDelay: 2200,
      pieceDuration: 10500,
      unsafeChance: 0.24,
      jamChance: 0.04,
      scoreMultiplier: 1
    },

    spicy: {
      label: "Spicy",
      orders: 6,
      health: 4,
      orderTime: 68,
      spawnDelay: 1750,
      pieceDuration: 8500,
      unsafeChance: 0.34,
      jamChance: 0.07,
      scoreMultiplier: 2
    },

    hot: {
      label: "Hot",
      orders: 7,
      health: 3,
      orderTime: 58,
      spawnDelay: 1350,
      pieceDuration: 6900,
      unsafeChance: 0.43,
      jamChance: 0.11,
      scoreMultiplier: 3
    }
  };

  const safeWords = {
    style: [
      "Wacky",
      "Cosmic",
      "Mighty",
      "Neon",
      "Sneaky",
      "Turbo",
      "Glitter",
      "Mystic",
      "Jolly",
      "Brave",
      "Fuzzy",
      "Super"
    ],

    animal: [
      "Panda",
      "Otter",
      "Dragon",
      "Falcon",
      "Koala",
      "Tiger",
      "Llama",
      "Gecko",
      "Penguin",
      "Rabbit",
      "Turtle",
      "Fox"
    ],

    action: [
      "Bounce",
      "Zoom",
      "Blast",
      "Dash",
      "Flip",
      "Spark",
      "Spin",
      "Jump",
      "Glide",
      "Roar",
      "Rush",
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
      "Rocket",
      "Cosmos",
      "Starlight"
    ],

    nature: [
      "River",
      "Meadow",
      "Forest",
      "Breeze",
      "Canyon",
      "Pebble",
      "Willow",
      "Sunbeam",
      "Rain",
      "Cloud"
    ],

    hero: [
      "Guardian",
      "Captain",
      "Ranger",
      "Shield",
      "Champion",
      "Hero",
      "Defender",
      "Scout",
      "Protector",
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
      "Pudding",
      "Sprinkles",
      "Goofy"
    ]
  };

  const unsafePieces = [
    {
      text: "Real Name",
      privateType: "name",
      reason: "A real name can reveal who owns the account."
    },

    {
      text: "Birth Year",
      privateType: "birthday",
      reason: "A birth year can expose age and identity information."
    },

    {
      text: "School Name",
      privateType: "school",
      reason: "A school name can reveal where someone regularly goes."
    },

    {
      text: "Phone Number",
      privateType: "phone",
      reason: "Phone numbers should not be placed in public usernames."
    },

    {
      text: "Home Address",
      privateType: "address",
      reason: "An address is private location information."
    },

    {
      text: "Password",
      privateType: "password",
      reason: "Passwords must always remain secret."
    },

    {
      text: "Login Code",
      privateType: "code",
      reason: "Verification codes should never be shared."
    },

    {
      text: "Exact Age",
      privateType: "age",
      reason: "Exact age can expose personal information."
    },

    {
      text: "Team Schedule",
      privateType: "schedule",
      reason: "A schedule may reveal where someone will be."
    }
  ];

  const orderDefinitions = [
    {
      title: "Silly Animal",
      description:
        "Build a funny username using one style word, one animal word, and one action word.",
      categories: ["style", "animal", "action"],
      labels: ["STYLE", "ANIMAL", "ACTION"],
      example: "WackyPandaBounce"
    },

    {
      title: "Space Explorer",
      description:
        "Build a space-themed username with a cosmic word, a character, and an action.",
      categories: ["space", "animal", "action"],
      labels: ["SPACE", "CHARACTER", "ACTION"],
      example: "NovaFalconZoom"
    },

    {
      title: "Nature Hero",
      description:
        "Build a username inspired by nature and superhero adventures.",
      categories: ["nature", "hero", "action"],
      labels: ["NATURE", "HERO", "ACTION"],
      example: "WillowGuardianDash"
    },

    {
      title: "Maximum Mayhem",
      description:
        "Create a wild username using something silly, a character, and a power word.",
      categories: ["silly", "animal", "action"],
      labels: ["SILLY", "CHARACTER", "POWER"],
      example: "PickleDragonBlast"
    },

    {
      title: "Hero in Space",
      description:
        "Combine a space word, a hero title, and an energetic action.",
      categories: ["space", "hero", "action"],
      labels: ["SPACE", "HERO", "ACTION"],
      example: "CometRangerBolt"
    },

    {
      title: "Forest Friend",
      description:
        "Use nature, animal, and silly pieces to create a playful username.",
      categories: ["nature", "animal", "silly"],
      labels: ["NATURE", "ANIMAL", "SILLY"],
      example: "RiverOtterGiggle"
    },

    {
      title: "Mystery Mix",
      description:
        "Build a creative username from three surprise categories.",
      categories: ["style", "hero", "nature"],
      labels: ["STYLE", "HERO", "NATURE"],
      example: "MysticScoutBreeze"
    }
  ];

  const routeCategoryPools = {
    top: [
      "style",
      "space",
      "nature",
      "silly"
    ],

    middle: [
      "animal",
      "hero",
      "silly"
    ],

    bottom: [
      "action",
      "hero",
      "nature"
    ]
  };


  /* =========================================================
     GAME STATE
  ========================================================= */

  let selectedControlMode = "keyboard";
  let selectedHeat = "mild";

  let gameActive = false;
  let orderActive = false;
  let pausedForOverlay = false;

  let currentOrderIndex = 0;
  let totalOrders = 5;
  let ordersShipped = 0;

  let score = 0;
  let combo = 0;
  let bestCombo = 0;

  let factoryHealth = 5;
  let timeRemaining = 80;
  let orderPatience = 100;

  let privateCluesBlocked = 0;
  let orderPrivateBlocked = 0;

  let correctActions = 0;
  let mistakes = 0;

  let currentOrder = null;
  let mixerPieces = [null, null, null];

  let mixedUsername = "";
  let scannedUsername = "";
  let packageApproved = false;

  let savedPart = null;
  let selectedPiece = null;

  let activePieces = [];

  let spawnInterval = null;
  let timerInterval = null;
  let animationFrameId = null;

  let factoryJamActive = false;
  let jammedRoute = null;

  let workerX = 10;
  let workerY = 78;
  let workerVelocityY = 0;
  let workerGrounded = true;
  let workerMovingLeft = false;
  let workerMovingRight = false;
  let workerMovingUp = false;
  let workerMovingDown = false;

  let lastWorkerTimestamp = 0;

  const shippedUsernames = [];
  const activeTimeouts = new Set();


  /* =========================================================
     HELPERS
  ========================================================= */

  function setText(id, value) {
    const element = byId(id);

    if (element) {
      element.textContent = String(value);
    }
  }

  function showElement(element) {
    element?.classList.remove("hidden");
  }

  function hideElement(element) {
    element?.classList.add("hidden");
  }

  function chooseRandom(list) {
    return list[
      Math.floor(Math.random() * list.length)
    ];
  }

  function createManagedTimeout(callback, delay) {
    const timeout = window.setTimeout(() => {
      activeTimeouts.delete(timeout);
      callback();
    }, delay);

    activeTimeouts.add(timeout);

    return timeout;
  }

  function clearManagedTimeouts() {
    activeTimeouts.forEach((timeout) => {
      window.clearTimeout(timeout);
    });

    activeTimeouts.clear();
  }

  function getSettings() {
    return heatSettings[selectedHeat];
  }

  function updateGlobalPoints() {
    if (
      window.SafetiiArcade &&
      typeof window.SafetiiArcade.getGlobalPoints === "function"
    ) {
      setText(
        "globalPoints",
        window.SafetiiArcade.getGlobalPoints()
      );

      return;
    }

    setText(
      "globalPoints",
      Number(
        localStorage.getItem("safetiiGlobalPoints") || 0
      )
    );
  }


  /* =========================================================
     SELECTION CONTROLS
  ========================================================= */

  controlChoices.forEach((button) => {
    button.addEventListener("click", () => {
      controlChoices.forEach((choice) => {
        choice.classList.remove("active");
      });

      button.classList.add("active");

      selectedControlMode =
        button.dataset.controlMode || "keyboard";
    });
  });

  heatChoices.forEach((button) => {
    button.addEventListener("click", () => {
      heatChoices.forEach((choice) => {
        choice.classList.remove("active");
      });

      button.classList.add("active");

      selectedHeat =
        button.dataset.heat || "mild";
    });
  });


  /* =========================================================
     START AND RESET
  ========================================================= */

  function resetGameState() {
    stopLoops();
    clearManagedTimeouts();
    clearAllPieces();

    gameActive = true;
    orderActive = false;
    pausedForOverlay = false;

    currentOrderIndex = 0;
    ordersShipped = 0;

    score = 0;
    combo = 0;
    bestCombo = 0;

    correctActions = 0;
    mistakes = 0;

    privateCluesBlocked = 0;
    orderPrivateBlocked = 0;

    currentOrder = null;
    mixerPieces = [null, null, null];

    mixedUsername = "";
    scannedUsername = "";
    packageApproved = false;

    savedPart = null;
    selectedPiece = null;

    factoryJamActive = false;
    jammedRoute = null;

    shippedUsernames.length = 0;

    const settings = getSettings();

    totalOrders = settings.orders;
    factoryHealth = settings.health;
    timeRemaining = settings.orderTime;
    orderPatience = 100;

    workerX = 10;
    workerY = 78;
    workerVelocityY = 0;
    workerGrounded = true;

    hideElement(orderCompleteOverlay);
    hideElement(factoryCompleteOverlay);
    hideElement(byId("factoryJamAlert"));
    hideElement(byId("handleFeedback"));
    hideElement(byId("comboDisplay"));

    resetMixer();
    updateWorkerPosition();
    updateHUD();
  }

  function startGame() {
    resetGameState();

    hideElement(introScreen);
    hideElement(resultScreen);
    showElement(playScreen);

    configureControls();

    if (
      window.SafetiiArcade &&
      typeof window.SafetiiArcade.startRound === "function"
    ) {
      try {
        window.SafetiiArcade.startRound({
          gameId: "handle-with-care",
          heat: selectedHeat,
          questionCount: totalOrders
        });
      } catch (error) {
        console.warn(
          "Could not start arcade round:",
          error
        );
      }
    }

    startOrder(0);
    startWorkerLoop();
  }

  function configureControls() {
    const useScreenButtons =
      selectedControlMode === "buttons" ||
      selectedControlMode === "assist";

    factoryMobileControls?.classList.toggle(
      "hidden",
      !useScreenButtons
    );

    const reminderMap = {
      keyboard:
        "Move with Arrow Keys or WASD · Jump with Space · Use with E",

      buttons:
        "Use the movement buttons · Press USE near switches and pieces",

      assist:
        "Assist Mode: slower belts and automatic ladder climbing"
    };

    setText(
      "controlReminder",
      reminderMap[selectedControlMode]
    );
  }


  /* =========================================================
     ORDER SYSTEM
  ========================================================= */

  function startOrder(index) {
    stopLoops();
    clearAllPieces();

    currentOrderIndex = index;
    currentOrder =
      orderDefinitions[
        index % orderDefinitions.length
      ];

    mixerPieces = [null, null, null];
    mixedUsername = "";
    scannedUsername = "";
    packageApproved = false;
    selectedPiece = null;
    orderPrivateBlocked = 0;

    timeRemaining = getSettings().orderTime;
    orderPatience = 100;

    resetMixer();
    renderOrder();
    updateHUD();

    showAnnouncement(
      "📦",
      `Order ${index + 1}`,
      currentOrder.title,
      currentOrder.description,
      () => {
        orderActive = true;
        pausedForOverlay = false;

        startSpawning();
        startTimer();
      }
    );
  }

  function renderOrder() {
    setText(
      "currentOrderNumber",
      currentOrderIndex + 1
    );

    setText("totalOrders", totalOrders);
    setText("ordersRequired", totalOrders);

    setText("orderTitle", currentOrder.title);
    setText(
      "orderDescription",
      currentOrder.description
    );

    setText(
      "recipeSlotOne",
      currentOrder.labels[0]
    );

    setText(
      "recipeSlotTwo",
      currentOrder.labels[1]
    );

    setText(
      "recipeSlotThree",
      currentOrder.labels[2]
    );
  }

  function showAnnouncement(
    icon,
    label,
    title,
    message,
    callback
  ) {
    const announcement =
      byId("factoryAnnouncement");

    setText("announcementIcon", icon);
    setText("announcementLabel", label);
    setText("announcementTitle", title);
    setText("announcementMessage", message);

    showElement(announcement);

    createManagedTimeout(() => {
      hideElement(announcement);

      if (typeof callback === "function") {
        callback();
      }
    }, 1900);
  }


  /* =========================================================
     HUD
  ========================================================= */

  function updateHUD() {
    setText("currentScore", score);
    setText("comboCount", combo);
    setText(
      "timeRemaining",
      Math.max(0, timeRemaining)
    );

    setText("ordersShipped", ordersShipped);
    setText(
      "privateCluesBlocked",
      privateCluesBlocked
    );

    const progress =
      totalOrders <= 0
        ? 0
        : (ordersShipped / totalOrders) * 100;

    const progressFill =
      byId("orderProgressFill");

    if (progressFill) {
      progressFill.style.width =
        `${Math.min(100, progress)}%`;
    }

    const settings = getSettings();

    setText(
      "factoryHealthDisplay",
      `${"❤️".repeat(Math.max(0, factoryHealth))}${"🖤".repeat(
        Math.max(0, settings.health - factoryHealth)
      )}`
    );

    const patienceFill =
      byId("orderPatienceFill");

    if (patienceFill) {
      patienceFill.style.width =
        `${Math.max(0, orderPatience)}%`;

      patienceFill.classList.toggle(
        "low-patience",
        orderPatience <= 30
      );
    }

    const timeElement = byId("timeRemaining");

    timeElement?.classList.toggle(
      "danger-time",
      timeRemaining <= 10
    );
  }


  /* =========================================================
     SPAWNING
  ========================================================= */

  function startSpawning() {
    window.clearInterval(spawnInterval);

    spawnPiece("top");
    spawnPiece("middle");
    spawnPiece("bottom");

    const settings = getSettings();

    let delay = settings.spawnDelay;

    if (selectedControlMode === "assist") {
      delay *= 1.25;
    }

    spawnInterval = window.setInterval(() => {
      if (
        !gameActive ||
        !orderActive ||
        pausedForOverlay ||
        factoryJamActive
      ) {
        return;
      }

      const route = chooseRandom([
        "top",
        "middle",
        "bottom"
      ]);

      spawnPiece(route);

      if (
        selectedHeat !== "mild" &&
        Math.random() < 0.28
      ) {
        const secondRoute = chooseRandom(
          ["top", "middle", "bottom"].filter(
            (item) => item !== route
          )
        );

        createManagedTimeout(() => {
          if (orderActive && !factoryJamActive) {
            spawnPiece(secondRoute);
          }
        }, 250);
      }

      maybeTriggerJam();
    }, delay);
  }

  function spawnPiece(route) {
    if (
      !orderActive ||
      !routeElements[route]?.layer
    ) {
      return;
    }

    const settings = getSettings();

    const isUnsafe =
      Math.random() < settings.unsafeChance;

    let pieceData;

    if (isUnsafe) {
      const unsafe = chooseRandom(unsafePieces);

      pieceData = {
        text: unsafe.text,
        category: "unsafe",
        unsafe: true,
        reason: unsafe.reason
      };
    } else {
      const routePool =
        routeCategoryPools[route];

      let category = chooseRandom(routePool);

      if (Math.random() < 0.62) {
        const neededCategories =
          currentOrder.categories.filter(
            (needed) =>
              !mixerPieces.some(
                (piece) =>
                  piece?.category === needed
              )
          );

        const allowedNeeded =
          neededCategories.filter(
            (needed) =>
              routePool.includes(needed)
          );

        if (allowedNeeded.length > 0) {
          category = chooseRandom(
            allowedNeeded
          );
        }
      }

      pieceData = {
        text: chooseRandom(safeWords[category]),
        category,
        unsafe: false,
        reason:
          "This is a creative word that does not reveal private information."
      };
    }

    createFactoryPiece(route, pieceData);
  }

  function createFactoryPiece(route, data) {
    const layer =
      routeElements[route].layer;

    const element =
      document.createElement("button");

    element.type = "button";
    element.className =
      `factory-moving-piece ${
        data.unsafe
          ? "private-piece"
          : "creative-piece"
      }`;

    element.innerHTML = `
      <span>
        ${data.unsafe ? "⚠️" : "✨"}
      </span>

      <strong>
        ${data.text}
      </strong>

      <small>
        ${data.unsafe ? "PRIVATE" : data.category.toUpperCase()}
      </small>
    `;

    layer.appendChild(element);

    const settings = getSettings();

    let duration = settings.pieceDuration;

    if (selectedControlMode === "assist") {
      duration *= 1.28;
    }

    const piece = {
      element,
      route,
      data,
      progress: 0,
      duration,
      createdAt: performance.now(),
      removed: false,
      selected: false,
      routed: false
    };

    activePieces.push(piece);

    element.addEventListener("click", () => {
      selectFactoryPiece(piece);
    });

    requestPieceAnimation();
  }


  /* =========================================================
     PIECE MOVEMENT
  ========================================================= */

  function requestPieceAnimation() {
    if (animationFrameId) {
      return;
    }

    animationFrameId =
      window.requestAnimationFrame(
        animateFactoryPieces
      );
  }

  function animateFactoryPieces(timestamp) {
    animationFrameId = null;

    if (!gameActive) {
      return;
    }

    activePieces.forEach((piece) => {
      if (piece.removed) {
        return;
      }

      if (
        pausedForOverlay ||
        factoryJamActive
      ) {
        piece.createdAt = timestamp;
        return;
      }

      const elapsed =
        timestamp - piece.createdAt;

      piece.createdAt = timestamp;

      piece.progress +=
        elapsed / piece.duration;

      const x =
        piece.progress * 112 - 10;

      piece.element.style.left =
        `${x}%`;

      if (piece.progress >= 1) {
        handlePieceMissed(piece);
      }
    });

    activePieces = activePieces.filter(
      (piece) => !piece.removed
    );

    if (activePieces.length > 0) {
      requestPieceAnimation();
    }
  }

  function handlePieceMissed(piece) {
    if (piece.removed) {
      return;
    }

    if (piece.data.unsafe) {
      damageFactory(
        "Private clue reached the end!",
        piece.data.reason
      );
    } else {
      breakCombo();

      showFeedback({
        correct: false,
        icon: "📦",
        title: "Useful piece missed",
        message:
          `${piece.data.text} rolled past the factory controls.`,
        points: "+0"
      });
    }

    removePiece(piece);
  }

  function removePiece(piece) {
    if (!piece || piece.removed) {
      return;
    }

    piece.removed = true;
    piece.element.remove();

    if (selectedPiece === piece) {
      selectedPiece = null;
    }
  }

  function clearAllPieces() {
    activePieces.forEach((piece) => {
      piece.removed = true;
      piece.element.remove();
    });

    activePieces = [];

    Object.values(routeElements).forEach(
      (route) => {
        if (route.layer) {
          route.layer.innerHTML = "";
        }
      }
    );
  }


  /* =========================================================
     PIECE SELECTION AND ROUTING
  ========================================================= */

  function selectFactoryPiece(piece) {
    if (
      !orderActive ||
      piece.removed ||
      pausedForOverlay
    ) {
      return;
    }

    activePieces.forEach((item) => {
      item.selected = false;
      item.element.classList.remove(
        "selected-piece"
      );
    });

    piece.selected = true;
    piece.element.classList.add(
      "selected-piece"
    );

    selectedPiece = piece;

    showFeedback({
      correct: true,
      icon: piece.data.unsafe ? "⚠️" : "✨",
      title: `${piece.data.text} selected`,
      message:
        piece.data.unsafe
          ? "Send it to the Nope Chute."
          : "Route it into the mixer, save it, or let it pass.",
      points: ""
    });
  }

  function routeSelectedPiece(route) {
    if (
      !selectedPiece ||
      selectedPiece.removed ||
      selectedPiece.route !== route
    ) {
      showFeedback({
        correct: false,
        icon: "↘",
        title: "Nothing selected on this route",
        message:
          "Choose a moving piece on this conveyor first.",
        points: "+0"
      });

      return;
    }

    const piece = selectedPiece;

    if (piece.data.unsafe) {
      sendPieceToNopeChute(piece);
      return;
    }

    sendPieceToMixer(piece);
  }

  function sendPieceToMixer(piece) {
    const neededIndex =
      currentOrder.categories.findIndex(
        (category, index) =>
          category === piece.data.category &&
          !mixerPieces[index]
      );

    if (neededIndex === -1) {
      breakCombo();
      mistakes += 1;

      showFeedback({
        correct: false,
        icon: "🔀",
        title: "Wrong ingredient",
        message:
          `${piece.data.text} does not fit an empty slot in this order.`,
        points: "+0"
      });

      animateRejectedPiece(piece);
      return;
    }

    mixerPieces[neededIndex] = {
      text: piece.data.text,
      category: piece.data.category
    };

    combo += 1;
    bestCombo = Math.max(
      bestCombo,
      combo
    );

    correctActions += 1;

    const earned =
      10 *
      getSettings().scoreMultiplier +
      Math.min(30, combo * 2);

    score += earned;

    piece.element.classList.add(
      "piece-routed-success"
    );

    createManagedTimeout(() => {
      removePiece(piece);
    }, 420);

    selectedPiece = null;

    updateMixer();

    showFeedback({
      correct: true,
      icon: "⚙️",
      title: "Piece routed!",
      message:
        `${piece.data.text} was added to the mixer.`,
      points: `+${earned}`
    });

    showCombo();
    updateHUD();
  }

  function sendPieceToNopeChute(piece) {
    if (!piece.data.unsafe) {
      breakCombo();
      mistakes += 1;

      showFeedback({
        correct: false,
        icon: "🚫",
        title: "That piece was safe",
        message:
          `${piece.data.text} was a creative word that could have been used.`,
        points: "+0"
      });

      animateRejectedPiece(piece);
      return;
    }

    combo += 1;
    bestCombo = Math.max(
      bestCombo,
      combo
    );

    correctActions += 1;
    privateCluesBlocked += 1;
    orderPrivateBlocked += 1;

    const earned =
      15 *
      getSettings().scoreMultiplier +
      Math.min(30, combo * 2);

    score += earned;

    piece.element.classList.add(
      "piece-nope-drop"
    );

    createManagedTimeout(() => {
      removePiece(piece);
    }, 430);

    selectedPiece = null;

    showFeedback({
      correct: true,
      icon: "🚫",
      title: "Private clue blocked!",
      message: piece.data.reason,
      points: `+${earned}`
    });

    showCombo();
    updateHUD();
  }

  function animateRejectedPiece(piece) {
    piece.element.classList.add(
      "piece-rejected"
    );

    createManagedTimeout(() => {
      piece.element.classList.remove(
        "piece-rejected"
      );

      piece.selected = false;
      piece.element.classList.remove(
        "selected-piece"
      );

      selectedPiece = null;
    }, 450);
  }


  /* =========================================================
     MIXER
  ========================================================= */

  function updateMixer() {
    const slotIds = [
      "mixerSlotOne",
      "mixerSlotTwo",
      "mixerSlotThree"
    ];

    mixerPieces.forEach((piece, index) => {
      setText(
        slotIds[index],
        piece ? piece.text : "?"
      );

      byId(slotIds[index])?.classList.toggle(
        "filled-slot",
        Boolean(piece)
      );
    });

    const complete =
      mixerPieces.every(Boolean);

    mixUsernameButton.disabled = !complete;

    if (complete) {
      setText(
        "mixerUsername",
        mixerPieces
          .map((piece) => piece.text)
          .join("")
      );
    } else {
      setText(
        "mixerUsername",
        "Waiting for pieces..."
      );
    }
  }

  function resetMixer() {
    const slotIds = [
      "mixerSlotOne",
      "mixerSlotTwo",
      "mixerSlotThree"
    ];

    slotIds.forEach((id) => {
      setText(id, "?");

      byId(id)?.classList.remove(
        "filled-slot"
      );
    });

    setText(
      "mixerUsername",
      "Waiting for pieces..."
    );

    setText(
      "scannerUsername",
      "No package"
    );

    setText(
      "scannerMessage",
      "Finish mixing a username first."
    );

    mixUsernameButton.disabled = true;
    scanUsernameButton.disabled = true;
    shipItBin.disabled = true;

    byId("usernameMixer")?.classList.remove(
      "mixer-running",
      "mixer-complete"
    );

    byId("factoryScanner")?.classList.remove(
      "scanner-running",
      "scanner-approved",
      "scanner-rejected"
    );
  }

  function mixUsername() {
    if (
      !mixerPieces.every(Boolean) ||
      mixedUsername
    ) {
      return;
    }

    mixedUsername =
      mixerPieces
        .map((piece) => piece.text)
        .join("");

    const mixer =
      byId("usernameMixer");

    mixer?.classList.add(
      "mixer-running"
    );

    mixUsernameButton.disabled = true;

    setText(
      "mixerUsername",
      "Mixing..."
    );

    createManagedTimeout(() => {
      mixer?.classList.remove(
        "mixer-running"
      );

      mixer?.classList.add(
        "mixer-complete"
      );

      setText(
        "mixerUsername",
        mixedUsername
      );

      setText(
        "scannerUsername",
        mixedUsername
      );

      setText(
        "scannerMessage",
        "Package ready for final inspection."
      );

      scanUsernameButton.disabled = false;

      showFeedback({
        correct: true,
        icon: "⚙️",
        title: "Username mixed!",
        message:
          `${mixedUsername} is ready for inspection.`,
        points: "+20"
      });

      score +=
        20 *
        getSettings().scoreMultiplier;

      updateHUD();
    }, 1350);
  }


  /* =========================================================
     SCANNER
  ========================================================= */

  function scanUsername() {
    if (
      !mixedUsername ||
      packageApproved
    ) {
      return;
    }

    const scanner =
      byId("factoryScanner");

    scanner?.classList.remove(
      "scanner-approved",
      "scanner-rejected"
    );

    scanner?.classList.add(
      "scanner-running"
    );

    scanUsernameButton.disabled = true;

    setText(
      "scannerMessage",
      "Checking privacy and recipe..."
    );

    createManagedTimeout(() => {
      scanner?.classList.remove(
        "scanner-running"
      );

      const correctRecipe =
        mixerPieces.every(
          (piece, index) =>
            piece.category ===
            currentOrder.categories[index]
        );

      const containsPrivate =
        unsafePieces.some((unsafe) =>
          mixedUsername
            .toLowerCase()
            .includes(
              unsafe.text.toLowerCase()
            )
        );

      packageApproved =
        correctRecipe &&
        !containsPrivate;

      if (packageApproved) {
        scannedUsername = mixedUsername;

        scanner?.classList.add(
          "scanner-approved"
        );

        setText(
          "scannerMessage",
          "APPROVED! Safe, creative, and ready to ship."
        );

        shipItBin.disabled = false;

        const earned =
          30 *
          getSettings().scoreMultiplier;

        score += earned;
        correctActions += 1;

        showFeedback({
          correct: true,
          icon: "✅",
          title: "Package approved!",
          message:
            "The username matches the order and contains no private clues.",
          points: `+${earned}`
        });
      } else {
        scanner?.classList.add(
          "scanner-rejected"
        );

        setText(
          "scannerMessage",
          "REJECTED! This package does not match the order."
        );

        mistakes += 1;
        breakCombo();

        showFeedback({
          correct: false,
          icon: "❌",
          title: "Inspection failed",
          message:
            "Return the pieces and rebuild the order.",
          points: "+0"
        });

        createManagedTimeout(() => {
          mixerPieces = [null, null, null];
          mixedUsername = "";
          scannedUsername = "";
          packageApproved = false;

          resetMixer();
        }, 1200);
      }

      updateHUD();
    }, 1450);
  }


  /* =========================================================
     BINS
  ========================================================= */

  function shipUsername() {
    if (
      !packageApproved ||
      !scannedUsername
    ) {
      return;
    }

    orderActive = false;
    pausedForOverlay = true;

    stopLoops();
    clearAllPieces();

    ordersShipped += 1;

    const patienceBonus =
      Math.round(orderPatience);

    const orderScore =
      50 *
      getSettings().scoreMultiplier +
      patienceBonus;

    score += orderScore;

    shippedUsernames.push(
      scannedUsername
    );

    setText(
      "orderCompleteHeading",
      scannedUsername
    );

    setText(
      "orderCompleteMessage",
      "Safe, creative, and ready for delivery!"
    );

    setText(
      "orderCompleteScore",
      orderScore
    );

    setText(
      "orderCreativity",
      getCreativityLabel(scannedUsername)
    );

    setText(
      "orderPrivateBlocked",
      orderPrivateBlocked
    );

    updateHUD();

    showElement(orderCompleteOverlay);
  }

  function saveSelectedPart() {
    if (
      !selectedPiece ||
      selectedPiece.removed
    ) {
      showFeedback({
        correct: false,
        icon: "🧰",
        title: "No piece selected",
        message:
          "Choose a creative piece before using the Parts Box.",
        points: "+0"
      });

      return;
    }

    if (selectedPiece.data.unsafe) {
      showFeedback({
        correct: false,
        icon: "⚠️",
        title: "Do not save private clues",
        message:
          "Private information belongs in the Nope Chute.",
        points: "+0"
      });

      return;
    }

    savedPart = {
      text: selectedPiece.data.text,
      category:
        selectedPiece.data.category
    };

    setText(
      "partsBin",
      "PART SAVED"
    );

    const piece = selectedPiece;

    piece.element.classList.add(
      "piece-saved"
    );

    createManagedTimeout(() => {
      removePiece(piece);
    }, 420);

    selectedPiece = null;

    showFeedback({
      correct: true,
      icon: "🧰",
      title: "Part saved!",
      message:
        `${savedPart.text} is stored for the next matching slot.`,
      points: "+5"
    });

    score +=
      5 *
      getSettings().scoreMultiplier;

    updateHUD();
  }

  function useNopeChute() {
    if (
      !selectedPiece ||
      selectedPiece.removed
    ) {
      showFeedback({
        correct: false,
        icon: "🚫",
        title: "No piece selected",
        message:
          "Select a private clue before using the Nope Chute.",
        points: "+0"
      });

      return;
    }

    sendPieceToNopeChute(
      selectedPiece
    );
  }

  function getCreativityLabel(username) {
    const length = username.length;

    if (length >= 20) {
      return "Legendary";
    }

    if (length >= 16) {
      return "Awesome";
    }

    if (length >= 12) {
      return "Great";
    }

    return "Good";
  }


  /* =========================================================
     FACTORY HEALTH AND FAILURE
  ========================================================= */

  function damageFactory(title, message) {
    factoryHealth -= 1;
    mistakes += 1;

    breakCombo();

    handleFactory?.classList.add(
      "factory-damaged"
    );

    createManagedTimeout(() => {
      handleFactory?.classList.remove(
        "factory-damaged"
      );
    }, 430);

    showFeedback({
      correct: false,
      icon: "💥",
      title,
      message,
      points: "−1 health"
    });

    updateHUD();

    if (factoryHealth <= 0) {
      finishGame(false);
    }
  }

  function breakCombo() {
    combo = 0;
    updateHUD();
  }


  /* =========================================================
     FACTORY JAMS
  ========================================================= */

  function maybeTriggerJam() {
    if (
      factoryJamActive ||
      Math.random() >=
        getSettings().jamChance
    ) {
      return;
    }

    factoryJamActive = true;

    jammedRoute = chooseRandom([
      "top",
      "middle",
      "bottom"
    ]);

    const route =
      routeElements[jammedRoute];

    route.switch?.classList.add(
      "jammed-switch"
    );

    route.gate?.classList.add(
      "jammed-gate"
    );

    showElement(byId("factoryJamAlert"));

    showFeedback({
      correct: false,
      icon: "⚠️",
      title: "Factory jam!",
      message:
        `Repair the ${jammedRoute} route switch before production continues.`,
      points: ""
    });

    createManagedTimeout(() => {
      if (factoryJamActive) {
        damageFactory(
          "Jam not repaired",
          "The factory lost health while the conveyor was blocked."
        );

        repairJam(false);
      }
    }, selectedHeat === "hot" ? 5000 : 7000);
  }

  function repairJam(reward = true) {
    if (!factoryJamActive) {
      return;
    }

    const route =
      routeElements[jammedRoute];

    route.switch?.classList.remove(
      "jammed-switch"
    );

    route.gate?.classList.remove(
      "jammed-gate"
    );

    hideElement(byId("factoryJamAlert"));

    factoryJamActive = false;
    jammedRoute = null;

    if (reward) {
      combo += 1;
      bestCombo = Math.max(
        bestCombo,
        combo
      );

      correctActions += 1;

      const earned =
        25 *
        getSettings().scoreMultiplier;

      score += earned;

      showFeedback({
        correct: true,
        icon: "🔧",
        title: "Jam repaired!",
        message:
          "The conveyor routes are moving again.",
        points: `+${earned}`
      });

      updateHUD();
    }

    requestPieceAnimation();
  }


  /* =========================================================
     TIMER
  ========================================================= */

  function startTimer() {
    window.clearInterval(timerInterval);

    timerInterval = window.setInterval(() => {
      if (
        !gameActive ||
        !orderActive ||
        pausedForOverlay
      ) {
        return;
      }

      timeRemaining -= 1;

      orderPatience =
        Math.max(
          0,
          orderPatience -
            100 / getSettings().orderTime
        );

      updateHUD();

      if (
        timeRemaining <= 0 ||
        orderPatience <= 0
      ) {
        damageFactory(
          "Order expired!",
          "The order waited too long and left the factory."
        );

        if (factoryHealth > 0) {
          currentOrderIndex += 1;

          if (
            currentOrderIndex >= totalOrders
          ) {
            finishGame(false);
          } else {
            startOrder(currentOrderIndex);
          }
        }
      }
    }, 1000);
  }

  function stopLoops() {
    window.clearInterval(spawnInterval);
    window.clearInterval(timerInterval);

    spawnInterval = null;
    timerInterval = null;
  }


  /* =========================================================
     FEEDBACK AND COMBOS
  ========================================================= */

  function showFeedback({
    correct,
    icon,
    title,
    message,
    points
  }) {
    const feedback =
      byId("handleFeedback");

    setText("handleFeedbackIcon", icon);
    setText("handleFeedbackTitle", title);
    setText(
      "handleFeedbackMessage",
      message
    );
    setText(
      "handleFeedbackPoints",
      points
    );

    feedback?.classList.remove(
      "correct-feedback",
      "wrong-feedback"
    );

    feedback?.classList.add(
      correct
        ? "correct-feedback"
        : "wrong-feedback"
    );

    showElement(feedback);

    createManagedTimeout(() => {
      hideElement(feedback);
    }, 2100);
  }

  function showCombo() {
    if (combo < 2) {
      return;
    }

    let title = "NICE ROUTE!";

    if (combo >= 15) {
      title = "FACTORY LEGEND!";
    } else if (combo >= 10) {
      title = "MACHINE MAYHEM!";
    } else if (combo >= 6) {
      title = "ROUTE RUSH!";
    } else if (combo >= 4) {
      title = "BELT BOSS!";
    }

    setText("comboTitle", title);
    setText(
      "comboMultiplier",
      `${combo}x Combo`
    );

    const display =
      byId("comboDisplay");

    showElement(display);

    display?.classList.remove(
      "combo-pop"
    );

    void display?.offsetWidth;

    display?.classList.add(
      "combo-pop"
    );

    createManagedTimeout(() => {
      hideElement(display);
    }, 1100);
  }


  /* =========================================================
     ORDER PROGRESSION
  ========================================================= */

  function continueToNextOrder() {
    hideElement(orderCompleteOverlay);

    currentOrderIndex += 1;

    if (
      ordersShipped >= totalOrders ||
      currentOrderIndex >= totalOrders
    ) {
      showElement(
        factoryCompleteOverlay
      );

      return;
    }

    startOrder(currentOrderIndex);
  }

  function showResultsFromFactory() {
    hideElement(factoryCompleteOverlay);
    finishGame(true);
  }


  /* =========================================================
     PLAYER MOVEMENT
  ========================================================= */

  function startWorkerLoop() {
    lastWorkerTimestamp =
      performance.now();

    window.requestAnimationFrame(
      updateWorker
    );
  }

  function updateWorker(timestamp) {
    if (!gameActive) {
      return;
    }

    const delta =
      Math.min(
        32,
        timestamp - lastWorkerTimestamp
      );

    lastWorkerTimestamp = timestamp;

    const speed =
      selectedControlMode === "assist"
        ? 0.026
        : 0.034;

    if (workerMovingLeft) {
      workerX -= speed * delta;
    }

    if (workerMovingRight) {
      workerX += speed * delta;
    }

    workerX = Math.max(
      2,
      Math.min(93, workerX)
    );

    if (!workerGrounded) {
      workerVelocityY +=
        0.0026 * delta;

      workerY +=
        workerVelocityY * delta;

      const floor =
        getNearestPlatformY(workerY);

      if (
        workerVelocityY > 0 &&
        workerY >= floor
      ) {
        workerY = floor;
        workerVelocityY = 0;
        workerGrounded = true;
      }
    }

    if (
      selectedControlMode === "assist"
    ) {
      autoClimbAssist();
    }

    updateWorkerPosition();

    window.requestAnimationFrame(
      updateWorker
    );
  }

  function getNearestPlatformY(y) {
    const platforms = [
      18,
      39,
      60,
      78
    ];

    const below = platforms.filter(
      (platform) => platform >= y
    );

    return below.length > 0
      ? Math.min(...below)
      : 78;
  }

  function updateWorkerPosition() {
    if (!factoryWorker) {
      return;
    }

    factoryWorker.style.left =
      `${workerX}%`;

    factoryWorker.style.top =
      `${workerY}%`;

    factoryWorker.classList.toggle(
      "worker-moving",
      workerMovingLeft ||
        workerMovingRight
    );

    factoryWorker.classList.toggle(
      "worker-facing-left",
      workerMovingLeft
    );
  }

  function jumpWorker() {
    if (!workerGrounded) {
      return;
    }

    workerGrounded = false;
    workerVelocityY = -0.048;

    factoryWorker?.classList.add(
      "worker-jumping"
    );

    createManagedTimeout(() => {
      factoryWorker?.classList.remove(
        "worker-jumping"
      );
    }, 350);
  }

  function moveWorkerVertical(direction) {
    const ladderZones = [
      {
        x: 22,
        tolerance: 10
      },

      {
        x: 77,
        tolerance: 10
      }
    ];

    const nearLadder =
      ladderZones.some(
        (ladder) =>
          Math.abs(workerX - ladder.x) <=
          ladder.tolerance
      );

    if (
      !nearLadder &&
      selectedControlMode !== "assist"
    ) {
      return;
    }

    const levels = [
      18,
      39,
      60,
      78
    ];

    const currentIndex =
      levels.reduce(
        (closestIndex, level, index) => {
          const currentDistance =
            Math.abs(
              levels[closestIndex] -
                workerY
            );

          const nextDistance =
            Math.abs(level - workerY);

          return nextDistance <
            currentDistance
            ? index
            : closestIndex;
        },
        0
      );

    const nextIndex =
      direction === "up"
        ? Math.max(0, currentIndex - 1)
        : Math.min(
            levels.length - 1,
            currentIndex + 1
          );

    workerY = levels[nextIndex];
    workerVelocityY = 0;
    workerGrounded = true;

    factoryWorker?.classList.add(
      "worker-climbing"
    );

    createManagedTimeout(() => {
      factoryWorker?.classList.remove(
        "worker-climbing"
      );
    }, 350);
  }

  function autoClimbAssist() {
    if (workerMovingUp) {
      moveWorkerVertical("up");
      workerMovingUp = false;
    }

    if (workerMovingDown) {
      moveWorkerVertical("down");
      workerMovingDown = false;
    }
  }


  /* =========================================================
     NEARBY ACTION
  ========================================================= */

  function useNearbyControl() {
    if (factoryJamActive) {
      repairJam(true);
      return;
    }

    const routeYMap = {
      top: 18,
      middle: 39,
      bottom: 60
    };

    const nearbyRoute =
      Object.entries(routeYMap).find(
        ([, routeY]) =>
          Math.abs(workerY - routeY) <= 10
      );

    if (nearbyRoute) {
      routeSelectedPiece(
        nearbyRoute[0]
      );

      return;
    }

    if (
      Math.abs(workerY - 78) <= 12
    ) {
      if (workerX >= 68) {
        shipUsername();
        return;
      }

      if (
        workerX >= 45 &&
        workerX < 68
      ) {
        mixUsername();
        return;
      }

      if (workerX < 28) {
        useNopeChute();
        return;
      }
    }

    showFeedback({
      correct: false,
      icon: "🎮",
      title: "Nothing nearby",
      message:
        "Move closer to a route switch, machine, or factory bin.",
      points: "+0"
    });
  }


  /* =========================================================
     KEYBOARD CONTROLS
  ========================================================= */

  function handleKeyDown(event) {
    if (
      !gameActive ||
      pausedForOverlay
    ) {
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
        moveWorkerVertical("up");
        event.preventDefault();
        break;

      case "arrowdown":
      case "s":
        moveWorkerVertical("down");
        event.preventDefault();
        break;

      case " ":
        jumpWorker();
        event.preventDefault();
        break;

      case "e":
      case "enter":
        useNearbyControl();
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
     MOBILE BUTTONS
  ========================================================= */

  function bindHoldButton(
    button,
    start,
    stop
  ) {
    button?.addEventListener(
      "pointerdown",
      (event) => {
        event.preventDefault();
        start();
      }
    );

    button?.addEventListener(
      "pointerup",
      stop
    );

    button?.addEventListener(
      "pointercancel",
      stop
    );

    button?.addEventListener(
      "pointerleave",
      stop
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
    () => moveWorkerVertical("up")
  );

  mobileButtons.down?.addEventListener(
    "click",
    () => moveWorkerVertical("down")
  );

  mobileButtons.jump?.addEventListener(
    "click",
    jumpWorker
  );

  mobileButtons.action?.addEventListener(
    "click",
    useNearbyControl
  );


  /* =========================================================
     RESULTS
  ========================================================= */

  function calculateAccuracy() {
    const total =
      correctActions + mistakes;

    if (total <= 0) {
      return 100;
    }

    return Math.round(
      (correctActions / total) * 100
    );
  }

  function calculateStars(won) {
    const accuracy =
      calculateAccuracy();

    if (
      won &&
      accuracy >= 92 &&
      ordersShipped === totalOrders
    ) {
      return 3;
    }

    if (
      won &&
      accuracy >= 75
    ) {
      return 2;
    }

    return 1;
  }

  function calculateRank() {
    const accuracy =
      calculateAccuracy();

    if (
      score >= 1800 &&
      accuracy >= 92
    ) {
      return "Factory Floor Legend";
    }

    if (
      score >= 1200 &&
      accuracy >= 85
    ) {
      return "Conveyor Commander";
    }

    if (
      score >= 750 &&
      accuracy >= 75
    ) {
      return "Route Master";
    }

    if (score >= 350) {
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
    pausedForOverlay = false;

    stopLoops();
    clearManagedTimeouts();
    clearAllPieces();

    hideElement(playScreen);
    hideElement(orderCompleteOverlay);
    hideElement(factoryCompleteOverlay);
    showElement(resultScreen);

    const accuracy =
      calculateAccuracy();

    const stars =
      calculateStars(won);

    setText(
      "resultHeading",
      won
        ? "Factory Floor Mastered!"
        : "The Factory Needs Repairs!"
    );

    setText(
      "resultMessage",
      won
        ? "You managed every route, blocked private clues, and shipped creative usernames."
        : "You completed part of the shift. Try again and keep the routes under control."
    );

    setText(
      "factoryRank",
      calculateRank()
    );

    setText("finalScore", score);

    setText(
      "finalStars",
      `${"★".repeat(stars)}${"☆".repeat(
        3 - stars
      )}`
    );

    setText(
      "finalOrdersShipped",
      ordersShipped
    );

    setText(
      "finalPrivateBlocked",
      privateCluesBlocked
    );

    setText(
      "finalBestCombo",
      `${bestCombo}x`
    );

    setText(
      "finalAccuracy",
      `${accuracy}%`
    );

    renderShippedUsernames();

    let bestScore = Number(
      localStorage.getItem(
        "handleWithCareBestScore"
      ) || 0
    );

    if (score > bestScore) {
      bestScore = score;

      localStorage.setItem(
        "handleWithCareBestScore",
        String(bestScore)
      );
    }

    setText("bestScore", bestScore);

    let pointsEarned = score;

    if (
      window.SafetiiArcade &&
      typeof window.SafetiiArcade.finishRound === "function"
    ) {
      try {
        const result =
          window.SafetiiArcade.finishRound({
            gameId: "handle-with-care",
            heat: selectedHeat,
            score,
            stars,
            completed: won,
            correctAnswers:
              correctActions,
            totalQuestions:
              correctActions + mistakes
          });

        if (
          result &&
          typeof result.pointsEarned === "number"
        ) {
          pointsEarned =
            result.pointsEarned;
        }
      } catch (error) {
        console.warn(
          "Could not finish arcade round:",
          error
        );
      }
    } else {
      const storedPoints = Number(
        localStorage.getItem(
          "safetiiGlobalPoints"
        ) || 0
      );

      localStorage.setItem(
        "safetiiGlobalPoints",
        String(storedPoints + score)
      );
    }

    setText(
      "globalPointsEarned",
      pointsEarned
    );

    updateGlobalPoints();
  }

  function renderShippedUsernames() {
    const list =
      byId("shippedUsernameList");

    if (!list) {
      return;
    }

    list.innerHTML = "";

    if (shippedUsernames.length === 0) {
      const empty =
        document.createElement("p");

      empty.textContent =
        "No usernames were shipped this shift.";

      list.appendChild(empty);
      return;
    }

    shippedUsernames.forEach(
      (username, index) => {
        const packageCard =
          document.createElement("article");

        packageCard.innerHTML = `
          <span>
            📦
          </span>

          <div>
            <small>
              Package ${index + 1}
            </small>

            <strong>
              ${username}
            </strong>
          </div>
        `;

        list.appendChild(packageCard);
      }
    );
  }


  /* =========================================================
     EVENT LISTENERS
  ========================================================= */

  startGameButton?.addEventListener(
    "click",
    startGame
  );

  playAgainButton?.addEventListener(
    "click",
    () => {
      hideElement(resultScreen);
      showElement(introScreen);
      updateGlobalPoints();
    }
  );

  continueOrderButton?.addEventListener(
    "click",
    continueToNextOrder
  );

  finishFactoryButton?.addEventListener(
    "click",
    showResultsFromFactory
  );

  mixUsernameButton?.addEventListener(
    "click",
    mixUsername
  );

  scanUsernameButton?.addEventListener(
    "click",
    scanUsername
  );

  shipItBin?.addEventListener(
    "click",
    shipUsername
  );

  partsBin?.addEventListener(
    "click",
    saveSelectedPart
  );

  nopeChute?.addEventListener(
    "click",
    useNopeChute
  );

  Object.entries(routeElements).forEach(
    ([route, elements]) => {
      elements.switch?.addEventListener(
        "click",
        () => {
          if (
            factoryJamActive &&
            jammedRoute === route
          ) {
            repairJam(true);
            return;
          }

          routeSelectedPiece(route);
        }
      );
    }
  );

  document.addEventListener(
    "keydown",
    handleKeyDown
  );

  document.addEventListener(
    "keyup",
    handleKeyUp
  );

  window.addEventListener("blur", () => {
    workerMovingLeft = false;
    workerMovingRight = false;
    workerMovingUp = false;
    workerMovingDown = false;
  });

  updateGlobalPoints();
});
