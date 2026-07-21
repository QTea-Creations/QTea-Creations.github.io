"use strict";

/* =========================================================
   SAFETII NET — SLASH THE SCAM
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const byId = (id) => document.getElementById(id);

  const introScreen = byId("introScreen");
  const playScreen = byId("playScreen");
  const resultScreen = byId("resultScreen");

  const startGameButton = byId("startGame");
  const playAgainButton = byId("playAgain");

  const slashArena = byId("slashArena");
  const slashObjectLayer = byId("slashObjectLayer");

  const waveCompleteOverlay = byId("waveCompleteOverlay");
  const bossIntroOverlay = byId("bossIntroOverlay");
  const continueWaveButton = byId("continueWaveButton");
  const startBossButton = byId("startBossButton");

  const bossPanel = byId("bossPanel");
  const bossHealthFill = byId("bossHealthFill");
  const bossHealthText = byId("bossHealthText");

  const slashTrailLayer = byId("slashTrailLayer");
  const slashTrailPath = byId("slashTrailPath");

  const keyboardTarget = byId("keyboardTarget");

  const controlChoices = [
    ...document.querySelectorAll(".slash-control-choice")
  ];

  const heatChoices = [
    ...document.querySelectorAll(".heat-choice")
  ];

  const slowMotionButton = byId("slowMotionButton");
  const truthVisionButton = byId("truthVisionButton");
  const safeBubbleButton = byId("safeBubbleButton");

  const globalPointsDisplay = byId("globalPoints");

  const gameSettings = {
    mild: {
      label: "Mild",
      lives: 5,
      roundTime: 65,
      spawnDelay: 1450,
      objectDuration: 6200,
      threatGoal: 7,
      safeChance: 0.33,
      powerChance: 0.1,
      scoreMultiplier: 1
    },

    spicy: {
      label: "Spicy",
      lives: 4,
      roundTime: 55,
      spawnDelay: 1120,
      objectDuration: 5100,
      threatGoal: 9,
      safeChance: 0.36,
      powerChance: 0.085,
      scoreMultiplier: 2
    },

    hot: {
      label: "Hot",
      lives: 3,
      roundTime: 48,
      spawnDelay: 850,
      objectDuration: 4200,
      threatGoal: 11,
      safeChance: 0.4,
      powerChance: 0.07,
      scoreMultiplier: 3
    }
  };

  const waveDefinitions = [
    {
      name: "Warm-Up",
      icon: "⚔️",
      message: "Start with clear scams and slower messages.",
      speedMultiplier: 1,
      spawnMultiplier: 1,
      copycatChance: 0
    },

    {
      name: "Mixed Messages",
      icon: "💬",
      message: "Safe alerts and scams are now flying together.",
      speedMultiplier: 1.08,
      spawnMultiplier: 0.92,
      copycatChance: 0.05
    },

    {
      name: "Copycat Chaos",
      icon: "👥",
      message: "Watch closely. Fake accounts look almost real.",
      speedMultiplier: 1.16,
      spawnMultiplier: 0.84,
      copycatChance: 0.38
    },

    {
      name: "Pop-Up Panic",
      icon: "🎁",
      message: "Prize traps, urgent warnings, and decoys incoming.",
      speedMultiplier: 1.28,
      spawnMultiplier: 0.7,
      copycatChance: 0.2
    },

    {
      name: "The Clickster",
      icon: "😈",
      message: "Slash only the dangerous parts of the boss message.",
      speedMultiplier: 1,
      spawnMultiplier: 1,
      copycatChance: 0
    }
  ];

  const threatObjects = [
    {
      icon: "🎁",
      title: "You won 5,000 gems!",
      body: "Tap now before the prize disappears.",
      reason: "Fake prizes often create pressure so you act before checking.",
      type: "prize"
    },

    {
      icon: "🔑",
      title: "Send your password",
      body: "We need it to repair your account.",
      reason: "Legitimate helpers should never ask for your password.",
      type: "password"
    },

    {
      icon: "🔢",
      title: "Tell me the code",
      body: "Send the verification code you just received.",
      reason: "Verification codes should stay private.",
      type: "code"
    },

    {
      icon: "📦",
      title: "Free character skin",
      body: "Open this mystery download to unlock it.",
      reason: "Unknown downloads may contain harmful software.",
      type: "download"
    },

    {
      icon: "⏰",
      title: "Account deletion warning",
      body: "Your account disappears in 30 seconds!",
      reason: "False urgency is used to make people panic.",
      type: "urgency"
    },

    {
      icon: "📍",
      title: "Where are you right now?",
      body: "Send your location to receive your reward.",
      reason: "Strangers do not need your private location.",
      type: "location"
    },

    {
      icon: "👤",
      title: "New friend request",
      body: "It is me. Use this new account instead.",
      reason: "Copycat accounts often pretend to be someone familiar.",
      type: "copycat"
    },

    {
      icon: "🔗",
      title: "Claim your bonus",
      body: "Click www.reward-center-now.example",
      reason: "Unexpected links should be checked before opening.",
      type: "link"
    },

    {
      icon: "📸",
      title: "Send a private photo",
      body: "Do not tell anyone I asked.",
      reason: "Requests for secrecy and private images are warning signs.",
      type: "secret"
    }
  ];

  const safeObjects = [
    {
      icon: "🛡️",
      title: "Security report received",
      body: "Your report was sent successfully.",
      reason: "This confirms an action the player already completed."
    },

    {
      icon: "✅",
      title: "Official update available",
      body: "Open the official app store to review it.",
      reason: "The message directs you to an official source."
    },

    {
      icon: "📣",
      title: "Practice time changed",
      body: "Check with your coach or team leader.",
      reason: "The message encourages verification."
    },

    {
      icon: "🔐",
      title: "New login detected",
      body: "Open the official app to review activity.",
      reason: "This is a legitimate safety instruction."
    },

    {
      icon: "🧑‍🤝‍🧑",
      title: "Ask a trusted adult",
      body: "Check before replying to unusual requests.",
      reason: "Seeking help is a safe response."
    },

    {
      icon: "📨",
      title: "Message delivered",
      body: "Your secure message reached the team.",
      reason: "This is a normal status confirmation."
    }
  ];

  const copycatPairs = [
    {
      real: {
        icon: "✅",
        title: "@SafetiiHero",
        body: "Verified mission account",
        reason: "The verified account is legitimate."
      },

      fake: {
        icon: "👤",
        title: "@SafetiiHer0",
        body: "Send your login code to join.",
        reason: "The username replaces the letter O with a zero."
      }
    },

    {
      real: {
        icon: "✅",
        title: "@PixelPanda",
        body: "Official game creator account",
        reason: "The verified account is legitimate."
      },

      fake: {
        icon: "👤",
        title: "@PixeIPanda",
        body: "Open this free download.",
        reason: "The fake account replaces a lowercase L with an uppercase I."
      }
    },

    {
      real: {
        icon: "✅",
        title: "@CloudCrew",
        body: "Official team announcements",
        reason: "This is the real team account."
      },

      fake: {
        icon: "👤",
        title: "@Cloud_CrewHelp",
        body: "Tell us your password for support.",
        reason: "The extra word and password request reveal the copycat."
      }
    }
  ];

  const bossMessages = [
    {
      intro: "The Clickster disguises itself as a prize message.",
      fragments: [
        {
          text: "Congratulations!",
          dangerous: false
        },
        {
          text: "You won a rare hero skin.",
          dangerous: false
        },
        {
          text: "Send your password",
          dangerous: true
        },
        {
          text: "to receive it now.",
          dangerous: true
        }
      ]
    },

    {
      intro: "The Clickster pretends to be account support.",
      fragments: [
        {
          text: "A login problem was detected.",
          dangerous: false
        },
        {
          text: "Open the official app",
          dangerous: false
        },
        {
          text: "or send us your code",
          dangerous: true
        },
        {
          text: "before time runs out.",
          dangerous: true
        }
      ]
    },

    {
      intro: "The Clickster copies a familiar account.",
      fragments: [
        {
          text: "Hey, it is me!",
          dangerous: false
        },
        {
          text: "I made a new account.",
          dangerous: false
        },
        {
          text: "Keep this secret",
          dangerous: true
        },
        {
          text: "and send your location.",
          dangerous: true
        }
      ]
    }
  ];

  let selectedControlMode = "swipe";
  let selectedHeat = "mild";

  let gameActive = false;
  let waveActive = false;
  let bossActive = false;
  let pausedForOverlay = false;

  let currentWaveIndex = 0;
  let score = 0;
  let lives = 5;
  let combo = 0;
  let bestCombo = 0;
  let timeRemaining = 60;

  let threatsStopped = 0;
  let safeMessagesProtected = 0;
  let totalThreatsSlashed = 0;
  let totalSafeProtected = 0;
  let totalMistakes = 0;
  let totalActions = 0;

  let waveThreatGoal = 8;
  let waveThreatsStopped = 0;

  let bossHealth = 100;
  let bossRoundIndex = 0;

  let spawnInterval = null;
  let timerInterval = null;
  let animationFrameId = null;

  let activeObjects = [];
  let trailPoints = [];

  let isPointerDown = false;
  let slowMotionActive = false;
  let truthVisionActive = false;
  let safeBubbleActive = false;

  let slowMotionCount = 0;
  let truthVisionCount = 0;
  let safeBubbleCount = 0;

  let keyboardX = 50;
  let keyboardY = 50;

  const activeTimeouts = new Set();

  function setText(id, value) {
    const element = byId(id);

    if (element) {
      element.textContent = String(value);
    }
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

  function showElement(element) {
    element?.classList.remove("hidden");
  }

  function hideElement(element) {
    element?.classList.add("hidden");
  }

  function getCurrentSettings() {
    return gameSettings[selectedHeat];
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

    const storedPoints = Number(
      localStorage.getItem("safetiiGlobalPoints") || 0
    );

    setText("globalPoints", storedPoints);
  }

  function updateHUD() {
    const settings = getCurrentSettings();
    const currentWave = waveDefinitions[currentWaveIndex];

    setText("currentWaveName", currentWave.name);
    setText("currentWave", currentWaveIndex + 1);
    setText("totalWaves", waveDefinitions.length);
    setText("currentScore", score);
    setText("comboCount", combo);
    setText("timeRemaining", Math.max(0, timeRemaining));
    setText("threatsStopped", waveThreatsStopped);
    setText("threatGoal", waveThreatGoal);
    setText("safeMessagesProtected", safeMessagesProtected);

    const progress = Math.min(
      100,
      (waveThreatsStopped / waveThreatGoal) * 100
    );

    const progressFill = byId("waveProgressFill");

    if (progressFill) {
      progressFill.style.width = `${progress}%`;
    }

    const heartCount = Math.max(0, lives);
    const emptyHeartCount = Math.max(
      0,
      settings.lives - heartCount
    );

    setText(
      "livesDisplay",
      `${"❤️".repeat(heartCount)}${"🖤".repeat(emptyHeartCount)}`
    );

    const timeElement = byId("timeRemaining");

    if (timeElement) {
      timeElement.classList.toggle(
        "danger-time",
        timeRemaining <= 10
      );
    }

    updatePowerButtons();
  }

  function updatePowerButtons() {
    setText("slowMotionCount", slowMotionCount);
    setText("truthVisionCount", truthVisionCount);
    setText("safeBubbleCount", safeBubbleCount);

    if (slowMotionButton) {
      slowMotionButton.disabled =
        slowMotionCount <= 0 ||
        !waveActive ||
        slowMotionActive;
    }

    if (truthVisionButton) {
      truthVisionButton.disabled =
        truthVisionCount <= 0 ||
        !waveActive ||
        truthVisionActive;
    }

    if (safeBubbleButton) {
      safeBubbleButton.disabled =
        safeBubbleCount <= 0 ||
        !waveActive ||
        safeBubbleActive;
    }
  }

  function updateControlReminder() {
    const reminderMap = {
      swipe: "Hold and swipe across suspicious objects",
      click: "Click suspicious objects and leave safe messages alone",
      keyboard: "Move with Arrow Keys and press Space to slash"
    };

    setText(
      "controlReminder",
      reminderMap[selectedControlMode]
    );

    if (selectedControlMode === "keyboard") {
      showElement(keyboardTarget);
      updateKeyboardTarget();
    } else {
      hideElement(keyboardTarget);
    }
  }

  function selectControlMode(button) {
    controlChoices.forEach((choice) => {
      choice.classList.remove("active");
    });

    button.classList.add("active");

    selectedControlMode =
      button.dataset.controlMode || "swipe";
  }

  function selectHeat(button) {
    heatChoices.forEach((choice) => {
      choice.classList.remove("active");
    });

    button.classList.add("active");

    selectedHeat = button.dataset.heat || "mild";
  }

  controlChoices.forEach((button) => {
    button.addEventListener("click", () => {
      selectControlMode(button);
    });
  });

  heatChoices.forEach((button) => {
    button.addEventListener("click", () => {
      selectHeat(button);
    });
  });

  function resetGameState() {
    stopGameLoops();
    clearManagedTimeouts();
    clearAllObjects();

    currentWaveIndex = 0;
    score = 0;
    combo = 0;
    bestCombo = 0;

    threatsStopped = 0;
    safeMessagesProtected = 0;
    totalThreatsSlashed = 0;
    totalSafeProtected = 0;
    totalMistakes = 0;
    totalActions = 0;

    bossHealth = 100;
    bossRoundIndex = 0;
    bossActive = false;
    gameActive = true;
    pausedForOverlay = false;

    slowMotionCount = 0;
    truthVisionCount = 0;
    safeBubbleCount = 0;

    slowMotionActive = false;
    truthVisionActive = false;
    safeBubbleActive = false;

    slashArena?.classList.remove(
      "slow-motion-active",
      "truth-vision-active",
      "safe-bubble-active",
      "arena-danger",
      "arena-success"
    );

    hideElement(waveCompleteOverlay);
    hideElement(bossIntroOverlay);
    hideElement(bossPanel);
    hideElement(byId("slashFeedback"));
    hideElement(byId("comboDisplay"));

    if (bossHealthFill) {
      bossHealthFill.style.width = "100%";
    }

    setText("bossHealthText", "100%");
  }

  function startGame() {
    resetGameState();

    const settings = getCurrentSettings();

    lives = settings.lives;
    timeRemaining = settings.roundTime;

    hideElement(introScreen);
    hideElement(resultScreen);
    showElement(playScreen);

    updateControlReminder();
    updateHUD();

    if (
      window.SafetiiArcade &&
      typeof window.SafetiiArcade.startRound === "function"
    ) {
      try {
        window.SafetiiArcade.startRound({
          gameId: "slash-the-scam",
          heat: selectedHeat,
          questionCount: 5
        });
      } catch (error) {
        console.warn(
          "Could not start Safetii Arcade round:",
          error
        );
      }
    }

    startWave(0);
  }

  function startWave(index) {
    stopGameLoops();
    clearAllObjects();

    currentWaveIndex = index;
    waveActive = false;
    pausedForOverlay = false;

    const settings = getCurrentSettings();

    waveThreatGoal =
      settings.threatGoal +
      Math.max(0, index - 1);

    waveThreatsStopped = 0;
    safeMessagesProtected = 0;
    timeRemaining =
      settings.roundTime -
      Math.min(8, index * 2);

    updateHUD();

    showWaveAnnouncement(() => {
      waveActive = true;

      startTimer();

      if (currentWaveIndex === 4) {
        startBossRound();
      } else {
        startSpawning();
      }

      updatePowerButtons();
    });
  }

  function showWaveAnnouncement(callback) {
    const announcement = byId("waveAnnouncement");
    const wave = waveDefinitions[currentWaveIndex];

    setText("waveAnnouncementIcon", wave.icon);
    setText("waveAnnouncementLabel", `Wave ${currentWaveIndex + 1}`);
    setText("waveAnnouncementTitle", wave.name);
    setText("waveAnnouncementMessage", wave.message);

    showElement(announcement);

    createManagedTimeout(() => {
      hideElement(announcement);

      if (typeof callback === "function") {
        callback();
      }
    }, 1900);
  }

  function startTimer() {
    window.clearInterval(timerInterval);

    timerInterval = window.setInterval(() => {
      if (
        !gameActive ||
        !waveActive ||
        pausedForOverlay
      ) {
        return;
      }

      timeRemaining -= 1;
      updateHUD();

      if (timeRemaining <= 0) {
        handleWaveFailure("Time ran out.");
      }
    }, 1000);
  }

  function startSpawning() {
    window.clearInterval(spawnInterval);

    const settings = getCurrentSettings();
    const wave = waveDefinitions[currentWaveIndex];

    const delay = Math.max(
      440,
      settings.spawnDelay * wave.spawnMultiplier
    );

    spawnObject();

    spawnInterval = window.setInterval(() => {
      if (
        gameActive &&
        waveActive &&
        !pausedForOverlay
      ) {
        spawnObject();

        if (
          currentWaveIndex >= 2 &&
          Math.random() < 0.24
        ) {
          createManagedTimeout(() => {
            if (
              gameActive &&
              waveActive &&
              !pausedForOverlay
            ) {
              spawnObject();
            }
          }, 230);
        }
      }
    }, delay);
  }

  function stopGameLoops() {
    window.clearInterval(spawnInterval);
    window.clearInterval(timerInterval);

    spawnInterval = null;
    timerInterval = null;

    if (animationFrameId) {
      window.cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  }

  function chooseRandom(list) {
    return list[
      Math.floor(Math.random() * list.length)
    ];
  }

  function spawnObject() {
    if (!waveActive || bossActive) {
      return;
    }

    const settings = getCurrentSettings();
    const wave = waveDefinitions[currentWaveIndex];

    if (
      currentWaveIndex === 2 &&
      Math.random() < wave.copycatChance
    ) {
      spawnCopycatPair();
      return;
    }

    if (Math.random() < settings.powerChance) {
      spawnPowerUp();
      return;
    }

    const isSafe =
      Math.random() < settings.safeChance;

    const data = isSafe
      ? chooseRandom(safeObjects)
      : chooseRandom(threatObjects);

    createFlyingObject({
      data,
      isSafe,
      isPowerUp: false
    });
  }

  function spawnCopycatPair() {
    const pair = chooseRandom(copycatPairs);

    createFlyingObject({
      data: pair.real,
      isSafe: true,
      isPowerUp: false,
      horizontalOffset: -10
    });

    createManagedTimeout(() => {
      if (!waveActive) {
        return;
      }

      createFlyingObject({
        data: pair.fake,
        isSafe: false,
        isPowerUp: false,
        horizontalOffset: 10,
        specialClass: "copycat-threat"
      });
    }, 180);
  }

  function spawnPowerUp() {
    const powerTypes = [
      {
        type: "slow",
        icon: "🐌",
        title: "Slow-Mo",
        body: "Slow the stream"
      },

      {
        type: "truth",
        icon: "👁️",
        title: "Truth Vision",
        body: "Reveal suspicious clues"
      },

      {
        type: "bubble",
        icon: "🫧",
        title: "Safe Bubble",
        body: "Protect one safe message"
      }
    ];

    const power = chooseRandom(powerTypes);

    createFlyingObject({
      data: power,
      isSafe: false,
      isPowerUp: true,
      specialClass: "power-up-object"
    });
  }

  function createFlyingObject({
    data,
    isSafe,
    isPowerUp,
    horizontalOffset = 0,
    specialClass = ""
  }) {
    if (!slashObjectLayer || !slashArena) {
      return;
    }

    const element = document.createElement("article");

    element.className = [
      "slash-flying-object",
      isSafe ? "safe-object" : "threat-object",
      isPowerUp ? "power-up-object" : "",
      specialClass
    ]
      .filter(Boolean)
      .join(" ");

    element.tabIndex = -1;

    const icon = document.createElement("span");
    icon.className = "slash-object-icon";
    icon.textContent = data.icon;

    const copy = document.createElement("div");
    copy.className = "slash-object-copy";

    const heading = document.createElement("strong");
    heading.textContent = data.title;

    const body = document.createElement("small");
    body.textContent = data.body;

    copy.append(heading, body);
    element.append(icon, copy);

    if (isPowerUp) {
      const powerTag = document.createElement("span");
      powerTag.className = "power-up-tag";
      powerTag.textContent = "POWER-UP";

      element.append(powerTag);
    }

    const arenaRect = slashArena.getBoundingClientRect();

    const width = Math.min(
      235,
      Math.max(165, arenaRect.width * 0.21)
    );

    const maxLeft = Math.max(
      10,
      arenaRect.width - width - 20
    );

    const startX =
      Math.random() * maxLeft +
      horizontalOffset;

    const startY =
      arenaRect.height +
      40 +
      Math.random() * 90;

    const drift =
      (Math.random() - 0.5) *
      Math.min(310, arenaRect.width * 0.34);

    const settings = getCurrentSettings();
    const wave = waveDefinitions[currentWaveIndex];

    const duration =
      settings.objectDuration /
      wave.speedMultiplier *
      (0.88 + Math.random() * 0.25);

    element.style.width = `${width}px`;
    element.style.transform =
      `translate(${startX}px, ${startY}px)`;

    slashObjectLayer.appendChild(element);

    const objectState = {
      element,
      data,
      isSafe,
      isPowerUp,
      powerType: isPowerUp ? data.type : null,
      x: startX,
      y: startY,
      startX,
      startY,
      drift,
      width,
      height: 100,
      duration,
      elapsed: 0,
      lastTimestamp: performance.now(),
      removed: false,
      sliced: false,
      protectedByBubble: false
    };

    activeObjects.push(objectState);

    requestObjectAnimation();
  }

  function requestObjectAnimation() {
    if (animationFrameId) {
      return;
    }

    animationFrameId =
      window.requestAnimationFrame(animateObjects);
  }

  function animateObjects(timestamp) {
    animationFrameId = null;

    if (
      !gameActive ||
      pausedForOverlay
    ) {
      if (activeObjects.length > 0) {
        requestObjectAnimation();
      }

      return;
    }

    activeObjects.forEach((object) => {
      if (object.removed) {
        return;
      }

      const delta =
        timestamp - object.lastTimestamp;

      object.lastTimestamp = timestamp;

      const speedFactor =
        slowMotionActive ? 0.42 : 1;

      object.elapsed += delta * speedFactor;

      const progress =
        object.elapsed / object.duration;

      const verticalTravel =
        slashArena.clientHeight + 280;

      object.y =
        object.startY -
        progress * verticalTravel;

      object.x =
        object.startX +
        Math.sin(progress * Math.PI) *
        object.drift;

      const rotation =
        Math.sin(progress * Math.PI * 2) * 5;

      object.element.style.transform =
        `translate(${object.x}px, ${object.y}px) rotate(${rotation}deg)`;

      if (truthVisionActive) {
        object.element.classList.toggle(
          "truth-threat",
          !object.isSafe &&
          !object.isPowerUp
        );

        object.element.classList.toggle(
          "truth-safe",
          object.isSafe
        );
      }

      if (progress >= 1) {
        handleObjectMissed(object);
      }
    });

    activeObjects = activeObjects.filter(
      (object) => !object.removed
    );

    if (activeObjects.length > 0) {
      requestObjectAnimation();
    }
  }

  function removeObject(object) {
    if (!object || object.removed) {
      return;
    }

    object.removed = true;

    object.element.remove();
  }

  function clearAllObjects() {
    activeObjects.forEach((object) => {
      object.removed = true;
      object.element.remove();
    });

    activeObjects = [];

    if (slashObjectLayer) {
      slashObjectLayer.innerHTML = "";
    }
  }

  function handleObjectMissed(object) {
    if (object.removed) {
      return;
    }

    if (object.isPowerUp) {
      removeObject(object);
      return;
    }

    if (object.isSafe) {
      safeMessagesProtected += 1;
      totalSafeProtected += 1;

      showFloatingWord(
        "SAFE!",
        object.x + object.width / 2,
        Math.max(70, object.y),
        "safe-word"
      );

      removeObject(object);
      updateHUD();
      return;
    }

    loseLife(
      "Threat missed!",
      object.data.reason
    );

    removeObject(object);
  }

  function getArenaPoint(clientX, clientY) {
    const rect = slashArena.getBoundingClientRect();

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }

  function isPointInsideObject(point, object) {
    const rect =
      object.element.getBoundingClientRect();

    const arenaRect =
      slashArena.getBoundingClientRect();

    const left = rect.left - arenaRect.left;
    const right = rect.right - arenaRect.left;
    const top = rect.top - arenaRect.top;
    const bottom = rect.bottom - arenaRect.top;

    return (
      point.x >= left &&
      point.x <= right &&
      point.y >= top &&
      point.y <= bottom
    );
  }

  function slashObjectsAtPoint(point) {
    if (
      !gameActive ||
      !waveActive ||
      pausedForOverlay
    ) {
      return;
    }

    const objectsToSlash =
      activeObjects.filter((object) => {
        return (
          !object.removed &&
          !object.sliced &&
          isPointInsideObject(point, object)
        );
      });

    objectsToSlash.forEach((object) => {
      slashObject(object, point);
    });

    if (
      bossActive &&
      byId("bossMessageCard")
    ) {
      slashBossFragmentAtPoint(point);
    }
  }

  function slashObject(object, point) {
    if (object.sliced || object.removed) {
      return;
    }

    object.sliced = true;
    totalActions += 1;

    if (object.isPowerUp) {
      collectPowerUp(object);
      return;
    }

    if (object.isSafe) {
      handleSafeObjectSlashed(object, point);
      return;
    }

    handleThreatSlashed(object, point);
  }

  function handleThreatSlashed(object, point) {
    combo += 1;
    bestCombo = Math.max(bestCombo, combo);

    const settings = getCurrentSettings();
    const basePoints = 10 * settings.scoreMultiplier;
    const comboBonus = Math.min(
      50,
      Math.max(0, combo - 1) * 2
    );

    const earnedPoints =
      basePoints + comboBonus;

    score += earnedPoints;

    waveThreatsStopped += 1;
    threatsStopped += 1;
    totalThreatsSlashed += 1;

    animateObjectSlice(
      object,
      point,
      "threat-sliced"
    );

    showFloatingWord(
      chooseRandom([
        "SLASH!",
        "BLOCKED!",
        "BUSTED!",
        "NOPE!"
      ]),
      point.x,
      point.y,
      "slash-word"
    );

    showFeedback({
      correct: true,
      icon: "⚔️",
      title: "Scam blocked!",
      message: object.data.reason,
      points: `+${earnedPoints}`
    });

    showComboMessage();

    if (
      window.SafetiiArcade &&
      typeof window.SafetiiArcade.answerQuestion === "function"
    ) {
      try {
        window.SafetiiArcade.answerQuestion({
          correct: true,
          points: earnedPoints
        });
      } catch (error) {
        console.warn(
          "Could not record arcade answer:",
          error
        );
      }
    }

    updateHUD();

    if (waveThreatsStopped >= waveThreatGoal) {
      completeCurrentWave();
    }
  }

  function handleSafeObjectSlashed(object, point) {
    if (safeBubbleActive) {
      safeBubbleActive = false;

      slashArena.classList.remove(
        "safe-bubble-active"
      );

      object.protectedByBubble = true;
      object.sliced = false;

      showFloatingWord(
        "SAVED!",
        point.x,
        point.y,
        "safe-word"
      );

      showFeedback({
        correct: true,
        icon: "🫧",
        title: "Safe Bubble protected it!",
        message: "The safe message stayed protected.",
        points: "+0"
      });

      updatePowerButtons();

      return;
    }

    combo = 0;
    totalMistakes += 1;

    animateObjectSlice(
      object,
      point,
      "safe-sliced"
    );

    loseLife(
      "Safe message slashed!",
      object.data.reason
    );
  }

  function animateObjectSlice(
    object,
    point,
    className
  ) {
    object.element.classList.add(className);

    object.element.style.setProperty(
      "--slice-x",
      `${point.x}px`
    );

    object.element.style.setProperty(
      "--slice-y",
      `${point.y}px`
    );

    createManagedTimeout(() => {
      removeObject(object);
    }, 330);
  }

  function collectPowerUp(object) {
    const point = {
      x: object.x + object.width / 2,
      y: object.y + 45
    };

    switch (object.powerType) {
      case "slow":
        slowMotionCount += 1;
        break;

      case "truth":
        truthVisionCount += 1;
        break;

      case "bubble":
        safeBubbleCount += 1;
        break;

      default:
        break;
    }

    animateObjectSlice(
      object,
      point,
      "power-collected"
    );

    showFloatingWord(
      "POWER-UP!",
      point.x,
      point.y,
      "power-word"
    );

    showFeedback({
      correct: true,
      icon: object.data.icon,
      title: `${object.data.title} collected!`,
      message: object.data.body,
      points: "+0"
    });

    updatePowerButtons();
  }

  function loseLife(title, message) {
    lives -= 1;
    combo = 0;
    totalMistakes += 1;

    slashArena.classList.add("arena-danger");

    createManagedTimeout(() => {
      slashArena.classList.remove("arena-danger");
    }, 420);

    showFeedback({
      correct: false,
      icon: "💥",
      title,
      message,
      points: "−1 life"
    });

    updateHUD();

    if (lives <= 0) {
      finishGame(false);
    }
  }

  function showFeedback({
    correct,
    icon,
    title,
    message,
    points
  }) {
    const panel = byId("slashFeedback");

    setText("slashFeedbackIcon", icon);
    setText("slashFeedbackTitle", title);
    setText("slashFeedbackMessage", message);
    setText("slashFeedbackPoints", points);

    panel?.classList.remove(
      "correct-feedback",
      "wrong-feedback"
    );

    panel?.classList.add(
      correct
        ? "correct-feedback"
        : "wrong-feedback"
    );

    showElement(panel);

    createManagedTimeout(() => {
      hideElement(panel);
    }, 2100);
  }

  function showFloatingWord(
    text,
    x,
    y,
    className
  ) {
    if (!slashArena) {
      return;
    }

    const word = document.createElement("div");

    word.className =
      `slash-floating-word ${className}`;

    word.textContent = text;

    word.style.left = `${x}px`;
    word.style.top = `${y}px`;

    slashArena.appendChild(word);

    createManagedTimeout(() => {
      word.remove();
    }, 850);
  }

  function showComboMessage() {
    const display = byId("comboDisplay");

    if (combo < 2 || !display) {
      return;
    }

    let title = "CLEAN CUT!";

    if (combo >= 15) {
      title = "HERO MODE!";
    } else if (combo >= 10) {
      title = "FIREWALL FRENZY!";
    } else if (combo >= 6) {
      title = "SCAM STREAK!";
    } else if (combo >= 4) {
      title = "SHARP EYES!";
    }

    setText("comboTitle", title);
    setText("comboMultiplier", `${combo}x Combo`);

    showElement(display);

    display.classList.remove("combo-pop");

    void display.offsetWidth;

    display.classList.add("combo-pop");

    createManagedTimeout(() => {
      hideElement(display);
    }, 1150);
  }

  function completeCurrentWave() {
    if (!waveActive || pausedForOverlay) {
      return;
    }

    waveActive = false;
    pausedForOverlay = true;

    stopGameLoops();
    clearAllObjects();

    if (currentWaveIndex >= 3) {
      showBossIntroduction();
      return;
    }

    const wave = waveDefinitions[currentWaveIndex];

    setText(
      "waveCompleteHeading",
      `${wave.name} Cleared!`
    );

    setText(
      "waveCompleteMessage",
      currentWaveIndex === 0
        ? "Nice work. Safe messages and scams are about to mix together."
        : "Excellent work. The next wave will move faster."
    );

    setText("waveCompleteScore", score);
    setText(
      "waveCompleteCombo",
      `${bestCombo}x`
    );
    setText(
      "waveCompleteAccuracy",
      `${calculateAccuracy()}%`
    );

    showElement(waveCompleteOverlay);
  }

  function handleWaveFailure(message) {
    if (!waveActive) {
      return;
    }

    waveActive = false;

    showFeedback({
      correct: false,
      icon: "⏰",
      title: "Wave failed",
      message,
      points: ""
    });

    createManagedTimeout(() => {
      finishGame(false);
    }, 900);
  }

  function continueToNextWave() {
    hideElement(waveCompleteOverlay);

    pausedForOverlay = false;

    startWave(currentWaveIndex + 1);
  }

  function showBossIntroduction() {
    pausedForOverlay = true;
    bossActive = false;

    hideElement(waveCompleteOverlay);
    showElement(bossIntroOverlay);
  }

  function beginBossBattle() {
    hideElement(bossIntroOverlay);
    showElement(bossPanel);

    currentWaveIndex = 4;
    bossActive = true;
    waveActive = true;
    pausedForOverlay = false;
    bossHealth = 100;
    bossRoundIndex = 0;
    timeRemaining = 75;

    updateBossHealth();
    updateHUD();
    startTimer();
    presentBossMessage();
  }

  function startBossRound() {
    bossActive = true;
    showElement(bossPanel);
    presentBossMessage();
  }

  function presentBossMessage() {
    if (
      !bossActive ||
      !gameActive ||
      pausedForOverlay
    ) {
      return;
    }

    const oldCard = byId("bossMessageCard");

    if (oldCard) {
      oldCard.remove();
    }

    const data =
      bossMessages[
        bossRoundIndex % bossMessages.length
      ];

    const card = document.createElement("article");

    card.className = "boss-message-card";
    card.id = "bossMessageCard";

    const heading = document.createElement("header");

    heading.innerHTML = `
      <span>😈</span>
      <div>
        <small>The Clickster says...</small>
        <strong>${data.intro}</strong>
      </div>
    `;

    const fragmentArea =
      document.createElement("div");

    fragmentArea.className =
      "boss-fragment-grid";

    data.fragments.forEach((fragment, index) => {
      const button = document.createElement("button");

      button.type = "button";
      button.className = "boss-fragment";
      button.textContent = fragment.text;
      button.dataset.dangerous =
        String(fragment.dangerous);
      button.dataset.fragmentIndex =
        String(index);

      if (selectedControlMode === "click") {
        button.addEventListener("click", () => {
          slashBossFragment(button);
        });
      }

      fragmentArea.appendChild(button);
    });

    card.append(heading, fragmentArea);

    slashObjectLayer.appendChild(card);

    card.classList.add("boss-card-enter");

    createManagedTimeout(() => {
      card.classList.remove("boss-card-enter");
    }, 450);
  }

  function slashBossFragmentAtPoint(point) {
    const card = byId("bossMessageCard");

    if (!card) {
      return;
    }

    const arenaRect =
      slashArena.getBoundingClientRect();

    const fragments = [
      ...card.querySelectorAll(".boss-fragment")
    ];

    fragments.forEach((fragment) => {
      if (
        fragment.disabled ||
        fragment.classList.contains("fragment-slashed")
      ) {
        return;
      }

      const rect =
        fragment.getBoundingClientRect();

      const left = rect.left - arenaRect.left;
      const right = rect.right - arenaRect.left;
      const top = rect.top - arenaRect.top;
      const bottom = rect.bottom - arenaRect.top;

      if (
        point.x >= left &&
        point.x <= right &&
        point.y >= top &&
        point.y <= bottom
      ) {
        slashBossFragment(fragment);
      }
    });
  }

  function slashBossFragment(fragment) {
    if (
      !bossActive ||
      fragment.disabled
    ) {
      return;
    }

    fragment.disabled = true;
    totalActions += 1;

    const dangerous =
      fragment.dataset.dangerous === "true";

    if (dangerous) {
      fragment.classList.add(
        "fragment-slashed",
        "correct-fragment"
      );

      bossHealth = Math.max(
        0,
        bossHealth - 25
      );

      combo += 1;
      bestCombo = Math.max(bestCombo, combo);
      totalThreatsSlashed += 1;

      const earned =
        25 *
        getCurrentSettings().scoreMultiplier;

      score += earned;

      showFloatingWord(
        "DIRECT HIT!",
        slashArena.clientWidth / 2,
        slashArena.clientHeight / 2,
        "slash-word"
      );

      showFeedback({
        correct: true,
        icon: "⚔️",
        title: "Dangerous request destroyed!",
        message: "You slashed the unsafe part without destroying the whole message.",
        points: `+${earned}`
      });

      updateBossHealth();

      if (bossHealth <= 0) {
        defeatBoss();
        return;
      }
    } else {
      fragment.classList.add(
        "fragment-slashed",
        "wrong-fragment"
      );

      combo = 0;

      loseLife(
        "Wrong target!",
        "That part of the message was not dangerous by itself."
      );

      if (lives <= 0) {
        return;
      }
    }

    updateHUD();

    const currentCard =
      byId("bossMessageCard");

    if (!currentCard) {
      return;
    }

    const remainingDangerous = [
      ...currentCard.querySelectorAll(
        '.boss-fragment[data-dangerous="true"]'
      )
    ].filter((item) => {
      return !item.classList.contains(
        "fragment-slashed"
      );
    });

    if (remainingDangerous.length === 0) {
      bossRoundIndex += 1;

      createManagedTimeout(() => {
        presentBossMessage();
      }, 900);
    }
  }

  function updateBossHealth() {
    if (bossHealthFill) {
      bossHealthFill.style.width =
        `${bossHealth}%`;
    }

    setText(
      "bossHealthText",
      `${bossHealth}%`
    );

    bossPanel?.classList.toggle(
      "boss-low-health",
      bossHealth <= 35
    );
  }

  function defeatBoss() {
    bossActive = false;
    waveActive = false;

    stopGameLoops();

    const card = byId("bossMessageCard");

    card?.classList.add("boss-defeated");

    slashArena.classList.add("arena-success");

    showFloatingWord(
      "CLICKSTER DEFEATED!",
      slashArena.clientWidth / 2,
      slashArena.clientHeight / 2,
      "boss-defeat-word"
    );

    createManagedTimeout(() => {
      finishGame(true);
    }, 1700);
  }

  function calculateAccuracy() {
    const attempts =
      totalThreatsSlashed +
      totalMistakes;

    if (attempts <= 0) {
      return 100;
    }

    return Math.round(
      (totalThreatsSlashed / attempts) * 100
    );
  }

  function calculateStars() {
    const accuracy = calculateAccuracy();

    if (
      accuracy >= 92 &&
      lives >= 2 &&
      bossHealth <= 0
    ) {
      return 3;
    }

    if (
      accuracy >= 75 &&
      bossHealth <= 0
    ) {
      return 2;
    }

    return 1;
  }

  function calculateRank() {
    const accuracy = calculateAccuracy();

    if (
      score >= 900 &&
      accuracy >= 92
    ) {
      return "Scam-Slashing Legend";
    }

    if (
      score >= 650 &&
      accuracy >= 85
    ) {
      return "Super Slicer";
    }

    if (
      score >= 400 &&
      accuracy >= 75
    ) {
      return "Firewall Fighter";
    }

    if (score >= 220) {
      return "Scam Spotter";
    }

    return "Getting Sharp";
  }

  function finishGame(won) {
    if (!gameActive) {
      return;
    }

    gameActive = false;
    waveActive = false;
    bossActive = false;
    pausedForOverlay = false;

    stopGameLoops();
    clearManagedTimeouts();
    clearAllObjects();

    hideElement(playScreen);
    hideElement(waveCompleteOverlay);
    hideElement(bossIntroOverlay);
    hideElement(bossPanel);
    showElement(resultScreen);

    const accuracy = calculateAccuracy();
    const stars = calculateStars();
    const rank = calculateRank();

    setText(
      "resultHeading",
      won
        ? "The Network Is Safe!"
        : "The Clickster Got Away!"
    );

    setText(
      "resultMessage",
      won
        ? "You protected safe messages, slashed dangerous requests, and defeated the Clickster."
        : "You stopped several threats. Train your reflexes and try the mission again."
    );

    setText("slashRank", rank);
    setText("finalScore", score);
    setText(
      "finalStars",
      `${"★".repeat(stars)}${"☆".repeat(3 - stars)}`
    );

    setText(
      "finalThreatsSlashed",
      totalThreatsSlashed
    );

    setText(
      "finalSafeProtected",
      totalSafeProtected
    );

    setText(
      "finalBestCombo",
      `${bestCombo}x`
    );

    setText(
      "finalAccuracy",
      `${accuracy}%`
    );

    let bestScore = Number(
      localStorage.getItem(
        "slashTheScamBestScore"
      ) || 0
    );

    if (score > bestScore) {
      bestScore = score;

      localStorage.setItem(
        "slashTheScamBestScore",
        String(bestScore)
      );
    }

    setText("bestScore", bestScore);

    let globalPointsEarned = score;

    if (
      window.SafetiiArcade &&
      typeof window.SafetiiArcade.finishRound === "function"
    ) {
      try {
        const result =
          window.SafetiiArcade.finishRound({
            gameId: "slash-the-scam",
            heat: selectedHeat,
            score,
            stars,
            completed: won,
            correctAnswers: totalThreatsSlashed,
            totalQuestions:
              totalThreatsSlashed +
              totalMistakes
          });

        if (
          result &&
          typeof result.pointsEarned === "number"
        ) {
          globalPointsEarned =
            result.pointsEarned;
        }
      } catch (error) {
        console.warn(
          "Could not finish Safetii Arcade round:",
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
      globalPointsEarned
    );

    updateGlobalPoints();
  }

  function activateSlowMotion() {
    if (
      slowMotionCount <= 0 ||
      slowMotionActive
    ) {
      return;
    }

    slowMotionCount -= 1;
    slowMotionActive = true;

    slashArena.classList.add(
      "slow-motion-active"
    );

    updatePowerButtons();

    createManagedTimeout(() => {
      slowMotionActive = false;

      slashArena.classList.remove(
        "slow-motion-active"
      );

      updatePowerButtons();
    }, 5000);
  }

  function activateTruthVision() {
    if (
      truthVisionCount <= 0 ||
      truthVisionActive
    ) {
      return;
    }

    truthVisionCount -= 1;
    truthVisionActive = true;

    slashArena.classList.add(
      "truth-vision-active"
    );

    activeObjects.forEach((object) => {
      object.element.classList.toggle(
        "truth-threat",
        !object.isSafe &&
        !object.isPowerUp
      );

      object.element.classList.toggle(
        "truth-safe",
        object.isSafe
      );
    });

    updatePowerButtons();

    createManagedTimeout(() => {
      truthVisionActive = false;

      slashArena.classList.remove(
        "truth-vision-active"
      );

      activeObjects.forEach((object) => {
        object.element.classList.remove(
          "truth-threat",
          "truth-safe"
        );
      });

      updatePowerButtons();
    }, 4200);
  }

  function activateSafeBubble() {
    if (
      safeBubbleCount <= 0 ||
      safeBubbleActive
    ) {
      return;
    }

    safeBubbleCount -= 1;
    safeBubbleActive = true;

    slashArena.classList.add(
      "safe-bubble-active"
    );

    updatePowerButtons();

    createManagedTimeout(() => {
      safeBubbleActive = false;

      slashArena.classList.remove(
        "safe-bubble-active"
      );

      updatePowerButtons();
    }, 10000);
  }

  function drawTrail() {
    if (!slashTrailPath) {
      return;
    }

    if (trailPoints.length < 2) {
      slashTrailPath.setAttribute("d", "");
      return;
    }

    let path =
      `M ${trailPoints[0].x} ${trailPoints[0].y}`;

    for (
      let index = 1;
      index < trailPoints.length;
      index += 1
    ) {
      path +=
        ` L ${trailPoints[index].x} ${trailPoints[index].y}`;
    }

    slashTrailPath.setAttribute("d", path);
  }

  function addTrailPoint(point) {
    trailPoints.push(point);

    if (trailPoints.length > 10) {
      trailPoints.shift();
    }

    drawTrail();

    createManagedTimeout(() => {
      trailPoints.shift();
      drawTrail();
    }, 160);
  }

  function handlePointerDown(event) {
    if (selectedControlMode !== "swipe") {
      return;
    }

    isPointerDown = true;

    slashArena?.setPointerCapture?.(
      event.pointerId
    );

    const point =
      getArenaPoint(
        event.clientX,
        event.clientY
      );

    trailPoints = [point];

    drawTrail();
    slashObjectsAtPoint(point);
  }

  function handlePointerMove(event) {
    if (
      selectedControlMode !== "swipe" ||
      !isPointerDown
    ) {
      return;
    }

    const point =
      getArenaPoint(
        event.clientX,
        event.clientY
      );

    addTrailPoint(point);
    slashObjectsAtPoint(point);
  }

  function handlePointerUp() {
    isPointerDown = false;

    createManagedTimeout(() => {
      trailPoints = [];
      drawTrail();
    }, 100);
  }

  function handleClickMode(event) {
    if (selectedControlMode !== "click") {
      return;
    }

    const point =
      getArenaPoint(
        event.clientX,
        event.clientY
      );

    slashObjectsAtPoint(point);
  }

  function updateKeyboardTarget() {
    if (!keyboardTarget) {
      return;
    }

    keyboardTarget.style.left =
      `${keyboardX}%`;

    keyboardTarget.style.top =
      `${keyboardY}%`;
  }

  function handleKeyboard(event) {
    if (
      selectedControlMode !== "keyboard" ||
      !gameActive ||
      !waveActive
    ) {
      return;
    }

    const movement = 4.5;

    switch (event.key) {
      case "ArrowLeft":
        keyboardX = Math.max(
          2,
          keyboardX - movement
        );
        event.preventDefault();
        break;

      case "ArrowRight":
        keyboardX = Math.min(
          98,
          keyboardX + movement
        );
        event.preventDefault();
        break;

      case "ArrowUp":
        keyboardY = Math.max(
          4,
          keyboardY - movement
        );
        event.preventDefault();
        break;

      case "ArrowDown":
        keyboardY = Math.min(
          92,
          keyboardY + movement
        );
        event.preventDefault();
        break;

      case " ":
      case "Enter": {
        const point = {
          x:
            slashArena.clientWidth *
            (keyboardX / 100),

          y:
            slashArena.clientHeight *
            (keyboardY / 100)
        };

        slashObjectsAtPoint(point);

        keyboardTarget?.classList.add(
          "keyboard-slash"
        );

        createManagedTimeout(() => {
          keyboardTarget?.classList.remove(
            "keyboard-slash"
          );
        }, 160);

        event.preventDefault();
        break;
      }

      default:
        return;
    }

    updateKeyboardTarget();
  }

  slashArena?.addEventListener(
    "pointerdown",
    handlePointerDown
  );

  slashArena?.addEventListener(
    "pointermove",
    handlePointerMove
  );

  slashArena?.addEventListener(
    "pointerup",
    handlePointerUp
  );

  slashArena?.addEventListener(
    "pointercancel",
    handlePointerUp
  );

  slashArena?.addEventListener(
    "click",
    handleClickMode
  );

  document.addEventListener(
    "keydown",
    handleKeyboard
  );

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

  continueWaveButton?.addEventListener(
    "click",
    continueToNextWave
  );

  startBossButton?.addEventListener(
    "click",
    beginBossBattle
  );

  slowMotionButton?.addEventListener(
    "click",
    activateSlowMotion
  );

  truthVisionButton?.addEventListener(
    "click",
    activateTruthVision
  );

  safeBubbleButton?.addEventListener(
    "click",
    activateSafeBubble
  );

  window.addEventListener("blur", () => {
    isPointerDown = false;
    trailPoints = [];
    drawTrail();
  });

  updateGlobalPoints();
});
