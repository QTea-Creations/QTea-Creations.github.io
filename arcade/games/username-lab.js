"use strict";

/* =========================================================
   SAFETII NET — CYBER ARCADE
   USERNAME LAB: CREATIVE FACTORY EDITION
========================================================= */

(() => {
  const arcade =
    window.SafetiiArcade;

  if (!arcade) {
    console.error(
      "SafetiiArcade is missing. Load arcade-score.js first."
    );

    return;
  }

  /* =====================================================
     HEAT SETTINGS
  ===================================================== */

  const heatSettings = {
    mild: {
      label: "Mild",
      basePoints: 10,
      roundSeconds: 120,
      rerolls: 12,
      challenges: 5,
      contaminationChance: 0.13,
      spinDuration: 850
    },

    spicy: {
      label: "Spicy",
      basePoints: 20,
      roundSeconds: 100,
      rerolls: 10,
      challenges: 5,
      contaminationChance: 0.22,
      spinDuration: 1000
    },

    hot: {
      label: "Hot",
      basePoints: 30,
      roundSeconds: 85,
      rerolls: 8,
      challenges: 5,
      contaminationChance: 0.32,
      spinDuration: 1150
    }
  };

  /* =====================================================
     SAFE WORD BANKS
  ===================================================== */

  const wordBanks = {
    style: [
      "Cosmic",
      "Neon",
      "Purple",
      "Silver",
      "Electric",
      "Mystic",
      "Golden",
      "Shadow",
      "Pixel",
      "Turbo",
      "Glowing",
      "Frosty",
      "Sunny",
      "Epic",
      "Super",
      "Mega"
    ],

    creature: [
      "Dragon",
      "Panda",
      "Falcon",
      "Dolphin",
      "Tiger",
      "Phoenix",
      "Wolf",
      "Otter",
      "Raven",
      "Gecko",
      "Penguin",
      "Fox",
      "Koala",
      "Lynx",
      "Robot",
      "Unicorn"
    ],

    power: [
      "Spark",
      "Blaze",
      "Zoom",
      "Dash",
      "Storm",
      "Quest",
      "Pulse",
      "Shield",
      "Nova",
      "Comet",
      "Bolt",
      "Glow",
      "Force",
      "Beam",
      "Whirl",
      "Wave"
    ],

    space: [
      "Cosmic",
      "Nova",
      "Comet",
      "Orbit",
      "Galaxy",
      "Lunar",
      "Meteor",
      "Astro",
      "Rocket",
      "Saturn",
      "Nebula",
      "Star"
    ],

    hero: [
      "Hero",
      "Guardian",
      "Ranger",
      "Defender",
      "Captain",
      "Legend",
      "Champion",
      "Protector",
      "Knight",
      "Scout",
      "Agent",
      "Avenger"
    ],

    silly: [
      "Wobble",
      "Noodle",
      "Pickle",
      "Giggle",
      "Bouncy",
      "Sneezy",
      "Banana",
      "Jelly",
      "Wacky",
      "Marshmallow",
      "Cupcake",
      "Bubble"
    ],

    hobby: [
      "Gamer",
      "Artist",
      "Builder",
      "Coder",
      "Dancer",
      "Reader",
      "Maker",
      "Inventor",
      "Painter",
      "Dreamer",
      "Explorer",
      "Designer"
    ],

    nature: [
      "River",
      "Cloud",
      "Meadow",
      "Forest",
      "Ocean",
      "Sunset",
      "Moon",
      "Breeze",
      "Rain",
      "Flower",
      "Mountain",
      "Leaf"
    ]
  };

  /* =====================================================
     IDENTITY CONTAMINATION BANK
  ===================================================== */

  const contaminatedWords = [
    {
      text: "Maya",
      category: "Real name",
      reason:
        "A real first name can help strangers identify you."
    },

    {
      text: "Johnson",
      category: "Real last name",
      reason:
        "A real last name may reveal your family identity."
    },

    {
      text: "2014",
      category: "Birth year",
      reason:
        "A birth year may reveal your age."
    },

    {
      text: "October12",
      category: "Birthday",
      reason:
        "An exact birthday is private identifying information."
    },

    {
      text: "Age10",
      category: "Exact age",
      reason:
        "An exact age reveals personal information."
    },

    {
      text: "LakeviewSchool",
      category: "School name",
      reason:
        "A school name can reveal where a child can be found."
    },

    {
      text: "Detroit",
      category: "Real city",
      reason:
        "A real city narrows down where someone lives."
    },

    {
      text: "RiverStreet",
      category: "Street name",
      reason:
        "A street name may reveal where someone lives."
    },

    {
      text: "3135550184",
      category: "Phone number",
      reason:
        "A phone number allows strangers to contact someone."
    },

    {
      text: "DragonHero42",
      category: "Password",
      reason:
        "A password should never appear in a public username."
    },

    {
      text: "Code482991",
      category: "Verification code",
      reason:
        "Verification codes can give someone access to an account."
    },

    {
      text: "FifthGrade",
      category: "Grade level",
      reason:
        "A grade level can reveal an approximate age."
    },

    {
      text: "Room204",
      category: "Exact location",
      reason:
        "A room number may reveal a precise location."
    },

    {
      text: "Lakeside14",
      category: "Team identity",
      reason:
        "A team name and jersey number may identify a specific child."
    }
  ];

  /* =====================================================
     CREATIVE CHALLENGES
  ===================================================== */

  const challenges = [
    {
      id: "space",
      icon: "🚀",
      title: "Space Explorer",
      description:
        "Build a username using at least one space-themed word.",
      requiredCategories: ["space"],
      bonusText:
        "Space mission complete!"
    },

    {
      id: "animal",
      icon: "🐾",
      title: "Animal Adventure",
      description:
        "Build a username containing a safe animal or creature.",
      requiredCategories: ["creature"],
      bonusText:
        "Animal mission complete!"
    },

    {
      id: "hero",
      icon: "🦸",
      title: "Cyber Hero",
      description:
        "Build a username containing a heroic word.",
      requiredCategories: ["hero"],
      bonusText:
        "Hero mission complete!"
    },

    {
      id: "silly",
      icon: "🤪",
      title: "Silly Username",
      description:
        "Build a funny username using at least one silly word.",
      requiredCategories: ["silly"],
      bonusText:
        "Silly mission complete!"
    },

    {
      id: "nature",
      icon: "🌿",
      title: "Nature Creator",
      description:
        "Build a username containing a nature word.",
      requiredCategories: ["nature"],
      bonusText:
        "Nature mission complete!"
    },

    {
      id: "three-types",
      icon: "🌈",
      title: "Variety Builder",
      description:
        "Use three different safe word categories.",
      uniqueCategoriesRequired: 3,
      bonusText:
        "Variety mission complete!"
    },

    {
      id: "no-numbers",
      icon: "🔤",
      title: "Word Power",
      description:
        "Build a safe username using only words and no numbers.",
      disallowNumbers: true,
      bonusText:
        "Word-only mission complete!"
    },

    {
      id: "tech",
      icon: "💻",
      title: "Tech Creator",
      description:
        "Build a username using a technology or hobby word.",
      requiredCategories: ["hobby", "style"],
      matchAnyRequiredCategory: true,
      bonusText:
        "Tech mission complete!"
    }
  ];

  /* =====================================================
     WHEEL DEFINITIONS
  ===================================================== */

const wheelDefinitions = [
  {
    element: "wheelOne",
    wordElement: "wheelOneWord",
    category: "wheelOneCategory",
    warning: "wheelOneWarning",
    lockButton: "wheelOneLock",
    rerollButton: "wheelOneReroll",
    defaultCategory: "style"
  },

  {
    element: "wheelTwo",
    wordElement: "wheelTwoWord",
    category: "wheelTwoCategory",
    warning: "wheelTwoWarning",
    lockButton: "wheelTwoLock",
    rerollButton: "wheelTwoReroll",
    defaultCategory: "creature"
  },

  {
    element: "wheelThree",
    wordElement: "wheelThreeWord",
    category: "wheelThreeCategory",
    warning: "wheelThreeWarning",
    lockButton: "wheelThreeLock",
    rerollButton: "wheelThreeReroll",
    defaultCategory: "power"
  }
];
  /* =====================================================
     GAME STATE
  ===================================================== */

  let selectedHeat =
    "mild";

  let settings =
    heatSettings.mild;

  let roundChallenges =
    [];

  let currentChallengeIndex =
    0;

  let currentChallenge =
    null;

  let wheels =
    [];

  let score =
    0;

  let timeRemaining =
    90;

  let rerollsRemaining =
    8;

  let usernamesBuilt =
    0;

  let contaminantsRemoved =
    0;

  let combo =
    0;

  let bestCombo =
    0;

  let bestCreativityScore =
    0;

  let correctScans =
    0;

  let failedScans =
    0;

  let decontaminateUses =
    2;

  let hintUses =
    2;

  let gameRunning =
    false;

  let machineSpinning =
    false;

  let challengeLocked =
    false;

  let timerInterval =
    null;

  let feedbackTimeout =
    null;

  /* =====================================================
     HELPERS
  ===================================================== */

  function byId(id) {
    return document.getElementById(id);
  }

  function setText(
    id,
    value
  ) {
    const element =
      byId(id);

    if (element) {
      element.textContent =
        String(value);
    }
  }

  function shuffle(items) {
    const copy =
      [...items];

    for (
      let index = copy.length - 1;
      index > 0;
      index -= 1
    ) {
      const randomIndex =
        Math.floor(
          Math.random() *
          (index + 1)
        );

      [
        copy[index],
        copy[randomIndex]
      ] = [
        copy[randomIndex],
        copy[index]
      ];
    }

    return copy;
  }

  function randomItem(items) {
    return items[
      Math.floor(
        Math.random() *
        items.length
      )
    ];
  }

  function titleCase(value) {
    return String(value)
      .split("-")
      .map(
        (part) =>
          part.charAt(0).toUpperCase() +
          part.slice(1)
      )
      .join(" ");
  }

  function showScreen(screenId) {
    [
      "introScreen",
      "playScreen",
      "resultScreen"
    ].forEach((id) => {
      byId(id)?.classList.add(
        "hidden"
      );
    });

    byId(screenId)?.classList.remove(
      "hidden"
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  function updateGlobalPoints() {
    setText(
      "globalPoints",
      Number(
        arcade.getGlobalPoints?.() ||
        0
      )
    );
  }

  function setMeme(
    title,
    message,
    imageName = "thinking"
  ) {
    setText(
      "memeLabTitle",
      title
    );

    setText(
      "memeLabMessage",
      message
    );

    const image =
      byId("memeLabImage");

    if (image) {
      image.src =
        `../../assets/mascot/${imageName}.png`;
    }
  }

  function getCurrentUsername() {
    return wheels
      .map(
        (wheel) =>
          wheel.word.text
      )
      .join("");
  }

  function getContaminatedWheels() {
    return wheels.filter(
      (wheel) =>
        wheel.word.contaminated
    );
  }

  function getSafeCategories() {
    return wheels
      .filter(
        (wheel) =>
          !wheel.word.contaminated
      )
      .map(
        (wheel) =>
          wheel.word.category
      );
  }

  /* =====================================================
     HEAT SELECTION
  ===================================================== */

  document
    .querySelectorAll(
      ".heat-choice"
    )
    .forEach((button) => {
      button.addEventListener(
        "click",
        () => {
          selectedHeat =
            button.dataset.heat ||
            "mild";

          document
            .querySelectorAll(
              ".heat-choice"
            )
            .forEach(
              (heatButton) => {
                heatButton.classList.toggle(
                  "selected",
                  heatButton === button
                );
              }
            );
        }
      );
    });

  /* =====================================================
     CREATE WORD
  ===================================================== */

  function createSafeWord(category) {
    const bank =
      wordBanks[category] ||
      wordBanks.style;

    return {
      text:
        randomItem(bank),
      category,
      contaminated: false,
      reason: ""
    };
  }

  function createContaminatedWord() {
    const item =
      randomItem(
        contaminatedWords
      );

    return {
      text:
        item.text,
      category:
        item.category,
      contaminated: true,
      reason:
        item.reason
    };
  }

  function chooseCategoryForWheel(
    wheelIndex
  ) {
    const baseCategories = [
      ["style", "space", "nature", "silly"],
      ["creature", "hero", "hobby", "nature"],
      ["power", "space", "hero", "silly"]
    ];

    const challengeCategory =
      currentChallenge
        ?.requiredCategories?.[0];

    if (
      challengeCategory &&
      Math.random() < 0.44
    ) {
      return challengeCategory;
    }

    return randomItem(
      baseCategories[
        wheelIndex
      ] ||
      ["style", "creature", "power"]
    );
  }

  function generateWheelWord(
    wheelIndex,
    forceSafe = false
  ) {
    const shouldContaminate =
      !forceSafe &&
      Math.random() <
        settings.contaminationChance;

    if (shouldContaminate) {
      return createContaminatedWord();
    }

    return createSafeWord(
      chooseCategoryForWheel(
        wheelIndex
      )
    );
  }

  /* =====================================================
     INITIALIZE WHEELS
  ===================================================== */

  function initializeWheels() {
    wheels =
      wheelDefinitions.map(
        (definition, index) => ({
          ...definition,
          index,
          locked: false,
          word:
            createSafeWord(
              definition.defaultCategory
            )
        })
      );

    renderAllWheels();
  }

  function renderAllWheels() {
    wheels.forEach(
      renderWheel
    );

    updateUsernameDisplay();
  }

  function renderWheel(wheel) {
    setText(
      wheel.word,
      wheel.word.text
    );

    setText(
      wheel.category,
      wheel.word.contaminated
        ? wheel.word.category
        : titleCase(
            wheel.word.category
          )
    );

    const warning =
      byId(wheel.warning);

    warning?.classList.toggle(
      "hidden",
      !wheel.word.contaminated
    );

    const wheelElement =
      byId(wheel.element);

    wheelElement?.classList.toggle(
      "contaminated-wheel",
      wheel.word.contaminated
    );

    wheelElement?.classList.toggle(
      "locked-wheel",
      wheel.locked
    );

    const lockButton =
      byId(wheel.lockButton);

    if (lockButton) {
      lockButton.textContent =
        wheel.locked
          ? "🔒 Locked"
          : "🔓 Lock";

      lockButton.classList.toggle(
        "active-lock",
        wheel.locked
      );
    }
  }

  /* =====================================================
     START GAME
  ===================================================== */

  function startGame() {
    clearInterval(
      timerInterval
    );

    clearTimeout(
      feedbackTimeout
    );

    settings =
      heatSettings[
        selectedHeat
      ] ||
      heatSettings.mild;

    roundChallenges =
      shuffle(
        challenges
      ).slice(
        0,
        settings.challenges
      );

    currentChallengeIndex =
      0;

    currentChallenge =
      null;

    score =
      0;

    timeRemaining =
      settings.roundSeconds;

    rerollsRemaining =
      settings.rerolls;

    usernamesBuilt =
      0;

    contaminantsRemoved =
      0;

    combo =
      0;

    bestCombo =
      0;

    bestCreativityScore =
      0;

    correctScans =
      0;

    failedScans =
      0;

    decontaminateUses =
      2;

    hintUses =
      2;

    gameRunning =
      true;

    machineSpinning =
      false;

    challengeLocked =
      false;

    arcade.startRound({
      gameId:
        `username-lab-${selectedHeat}`,

      gameName:
        `Username Lab ${settings.label}`,

      heatLevel:
        selectedHeat,

      questionCount:
        settings.challenges
    });

    setText(
      "currentHeat",
      settings.label
    );

    setText(
      "challengeTotal",
      settings.challenges
    );

    setText(
      "decontaminateCount",
      "2 available"
    );

    setText(
      "memeHintCount",
      "2 available"
    );

    byId("decontaminateButton")
      ?.removeAttribute(
        "disabled"
      );

    byId("memeHintButton")
      ?.removeAttribute(
        "disabled"
      );

    byId("timeRemaining")
      ?.classList.remove(
        "danger-time"
      );

    initializeWheels();

    showScreen(
      "playScreen"
    );

    loadChallenge();

    updateHud();

    startTimer();

    window.setTimeout(
      () => {
        spinAllWheels({
          chargeReroll: false
        });
      },
      450
    );
  }

  function connectStartButton() {
    const button =
      byId("startGame");

    if (!button) {
      console.error(
        "Username Lab start button #startGame was not found."
      );

      return;
    }

    if (
      button.dataset
        .usernameFactoryConnected ===
      "true"
    ) {
      return;
    }

    button.dataset
      .usernameFactoryConnected =
      "true";

    button.addEventListener(
      "click",
      startGame
    );
  }

  /* =====================================================
     TIMER
  ===================================================== */

  function startTimer() {
    clearInterval(
      timerInterval
    );

    timerInterval =
      window.setInterval(
        () => {
          if (
            !gameRunning ||
            machineSpinning ||
            challengeLocked
          ) {
            return;
          }

          timeRemaining -= 1;

          if (
            timeRemaining <= 10
          ) {
            byId("timeRemaining")
              ?.classList.add(
                "danger-time"
              );
          }

          updateHud();

          if (
            timeRemaining <= 0
          ) {
            endGame("time");
          }
        },
        1000
      );
  }

  /* =====================================================
     LOAD CHALLENGE
  ===================================================== */

  function loadChallenge() {
    if (
      currentChallengeIndex >=
      roundChallenges.length
    ) {
      endGame("complete");
      return;
    }

    currentChallenge =
      roundChallenges[
        currentChallengeIndex
      ];

    challengeLocked =
      false;

    setText(
      "challengeNumber",
      currentChallengeIndex + 1
    );

    setText(
      "challengeIcon",
      currentChallenge.icon
    );

    setText(
      "challengeTitle",
      currentChallenge.title
    );

    setText(
      "challengeDescription",
      currentChallenge.description
    );

    setText(
      "factoryStatus",
      "Ready"
    );

    setText(
      "inspectionStatus",
      "Scanner Ready"
    );

    setText(
      "inspectionMessage",
      "Spin, lock, and inspect your creation"
    );

    setText(
      "inspectionIcon",
      "🛡️"
    );

    byId("usernameFeedback")
      ?.classList.add(
        "hidden"
      );

    unlockAllWheels();

    updateUsernameDisplay();

    setMeme(
      "New challenge!",
      currentChallenge.description,
      "thinking"
    );
  }

  /* =====================================================
     SPINNING
  ===================================================== */

  function canReroll() {
    if (
      !gameRunning ||
      machineSpinning ||
      challengeLocked
    ) {
      return false;
    }

    if (
      rerollsRemaining <= 0
    ) {
      setMeme(
        "No rerolls remaining!",
        "Scan your current creation or use Decontaminate if needed.",
        "thinking"
      );

      return false;
    }

    return true;
  }

  function spinAllWheels({
    chargeReroll = true
  } = {}) {
    if (
      !gameRunning ||
      machineSpinning ||
      challengeLocked
    ) {
      return;
    }

    const unlockedWheels =
      wheels.filter(
        (wheel) =>
          !wheel.locked
      );

    if (
      unlockedWheels.length === 0
    ) {
      setMeme(
        "Every wheel is locked!",
        "Unlock at least one wheel before spinning.",
        "thinking"
      );

      return;
    }

    if (
      chargeReroll &&
      !canReroll()
    ) {
      return;
    }

    if (chargeReroll) {
      rerollsRemaining -= 1;
    }

    machineSpinning =
      true;

    setText(
      "factoryStatus",
      "Spinning"
    );

    byId("usernameWheelMachine")
      ?.classList.add(
        "machine-spinning"
      );

    unlockedWheels.forEach(
      (wheel, sequenceIndex) => {
        animateWheelSpin(
          wheel,
          settings.spinDuration +
          sequenceIndex * 180
        );
      }
    );

    const longestDuration =
      settings.spinDuration +
      (
        unlockedWheels.length -
        1
      ) * 180;

    window.setTimeout(
      () => {
        machineSpinning =
          false;

        setText(
          "factoryStatus",
          "Ready"
        );

        byId("usernameWheelMachine")
          ?.classList.remove(
            "machine-spinning"
          );

        renderAllWheels();

        const contaminationCount =
          getContaminatedWheels().length;

        if (
          contaminationCount > 0
        ) {
          setMeme(
            "Identity contamination detected!",
            `${contaminationCount} wheel${
              contaminationCount === 1
                ? ""
                : "s"
            } contain personal information. Reroll or decontaminate before scanning.`,
            "wrong"
          );
        } else {
          setMeme(
            "Interesting creation!",
            "Check whether it completes the challenge, then scan it.",
            "thinking"
          );
        }

        updateHud();
      },
      longestDuration + 120
    );
  }

  function animateWheelSpin(
    wheel,
    duration
  ) {
    const wordElement =
      byId(wheel.word);

    const wheelElement =
      byId(wheel.element);

    wheelElement?.classList.add(
      "wheel-spinning"
    );

    const interval =
      window.setInterval(
        () => {
          const previewWord =
            generateWheelWord(
              wheel.index,
              true
            );

          if (wordElement) {
            wordElement.textContent =
              previewWord.text;
          }
        },
        75
      );

    window.setTimeout(
      () => {
        clearInterval(
          interval
        );

        wheel.word =
          generateWheelWord(
            wheel.index
          );

        wheelElement?.classList.remove(
          "wheel-spinning"
        );

        renderWheel(
          wheel
        );

        updateUsernameDisplay();
      },
      duration
    );
  }

  function rerollSingleWheel(
    wheelIndex
  ) {
    if (!canReroll()) {
      return;
    }

    const wheel =
      wheels[
        wheelIndex
      ];

    if (!wheel) {
      return;
    }

    if (wheel.locked) {
      setMeme(
        "That wheel is locked!",
        "Unlock it before rerolling.",
        "thinking"
      );

      return;
    }

    rerollsRemaining -= 1;

    machineSpinning =
      true;

    setText(
      "factoryStatus",
      "Rerolling"
    );

    animateWheelSpin(
      wheel,
      settings.spinDuration
    );

    window.setTimeout(
      () => {
        machineSpinning =
          false;

        setText(
          "factoryStatus",
          "Ready"
        );

        updateUsernameDisplay();
        updateHud();
      },
      settings.spinDuration + 120
    );
  }

  /* =====================================================
     LOCKING
  ===================================================== */

  function toggleWheelLock(
    wheelIndex
  ) {
    if (
      machineSpinning ||
      challengeLocked
    ) {
      return;
    }

    const wheel =
      wheels[
        wheelIndex
      ];

    if (!wheel) {
      return;
    }

    wheel.locked =
      !wheel.locked;

    renderWheel(
      wheel
    );

    setMeme(
      wheel.locked
        ? "Word locked!"
        : "Wheel unlocked!",
      wheel.locked
        ? `${wheel.word.text} will stay during the next spin.`
        : `${wheel.word.text} can now change.`,
      "thinking"
    );
  }

  function unlockAllWheels() {
    wheels.forEach(
      (wheel) => {
        wheel.locked =
          false;

        renderWheel(
          wheel
        );
      }
    );
  }

  /* =====================================================
     USERNAME DISPLAY AND CREATIVITY
  ===================================================== */

  function calculateCreativity() {
    const safeWheels =
      wheels.filter(
        (wheel) =>
          !wheel.word.contaminated
      );

    if (
      safeWheels.length === 0
    ) {
      return 0;
    }

    const uniqueCategories =
      new Set(
        safeWheels.map(
          (wheel) =>
            wheel.word.category
        )
      ).size;

    const uniqueWords =
      new Set(
        safeWheels.map(
          (wheel) =>
            wheel.word.text
        )
      ).size;

    let value =
      25;

    value +=
      uniqueCategories * 18;

    value +=
      uniqueWords * 7;

    const usernameLength =
      getCurrentUsername().length;

    if (
      usernameLength >= 12 &&
      usernameLength <= 24
    ) {
      value += 10;
    }

    value -=
      getContaminatedWheels().length *
      35;

    return Math.max(
      0,
      Math.min(
        100,
        value
      )
    );
  }

  function getCreativityLabel(
    value
  ) {
    if (value >= 90) {
      return "Legendary";
    }

    if (value >= 72) {
      return "Epic";
    }

    if (value >= 48) {
      return "Cool";
    }

    return "Common";
  }

  function updateUsernameDisplay() {
    const username =
      getCurrentUsername();

    const creativity =
      calculateCreativity();

    const creativityLabel =
      getCreativityLabel(
        creativity
      );

    setText(
      "currentUsername",
      username
    );

    setText(
      "creativityScore",
      `${creativity}%`
    );

    setText(
      "creativityLabel",
      creativityLabel
    );

    const fill =
      byId("creativityFill");

    if (fill) {
      fill.style.width =
        `${creativity}%`;
    }

    bestCreativityScore =
      Math.max(
        bestCreativityScore,
        creativity
      );
  }

  /* =====================================================
     CHALLENGE CHECKING
  ===================================================== */

  function meetsChallenge() {
    const categories =
      getSafeCategories();

    const username =
      getCurrentUsername();

    if (
      currentChallenge
        .disallowNumbers &&
      /\d/.test(username)
    ) {
      return {
        passed: false,
        reason:
          "This challenge requires a username with no numbers."
      };
    }

    if (
      currentChallenge
        .uniqueCategoriesRequired
    ) {
      const count =
        new Set(
          categories
        ).size;

      if (
        count <
        currentChallenge
          .uniqueCategoriesRequired
      ) {
        return {
          passed: false,
          reason:
            `Use ${currentChallenge.uniqueCategoriesRequired} different word categories.`
        };
      }
    }

    if (
      currentChallenge
        .requiredCategories
        ?.length
    ) {
      const matches =
        currentChallenge
          .requiredCategories
          .filter(
            (category) =>
              categories.includes(
                category
              )
          );

      const passed =
        currentChallenge
          .matchAnyRequiredCategory
          ? matches.length >= 1
          : matches.length ===
            currentChallenge
              .requiredCategories
              .length;

      if (!passed) {
        const categoryNames =
          currentChallenge
            .requiredCategories
            .map(
              titleCase
            )
            .join(" or ");

        return {
          passed: false,
          reason:
            `This creation still needs a ${categoryNames} word.`
        };
      }
    }

    return {
      passed: true,
      reason:
        currentChallenge
          .bonusText
    };
  }

  /* =====================================================
     SCANNER
  ===================================================== */

  function scanCreation() {
    if (
      !gameRunning ||
      machineSpinning ||
      challengeLocked
    ) {
      return;
    }

    challengeLocked =
      true;

    setText(
      "factoryStatus",
      "Scanning"
    );

    setText(
      "inspectionStatus",
      "Scanning..."
    );

    setText(
      "inspectionMessage",
      "Checking identity safety and challenge rules"
    );

    byId("usernameInspectionPanel")
      ?.classList.add(
        "inspection-running"
      );

    window.setTimeout(
      finishScan,
      1050
    );
  }

  function finishScan() {
    byId("usernameInspectionPanel")
      ?.classList.remove(
        "inspection-running"
      );

    const contaminated =
      getContaminatedWheels();

    if (
      contaminated.length > 0
    ) {
      failedScans += 1;

      combo =
        0;

      challengeLocked =
        false;

      setText(
        "factoryStatus",
        "Contaminated"
      );

      setText(
        "inspectionIcon",
        "⚠️"
      );

      setText(
        "inspectionStatus",
        "Identity Risk Detected"
      );

      const first =
        contaminated[0];

      setText(
        "inspectionMessage",
        `${first.word.text}: ${first.word.reason}`
      );

      showFeedback({
        correct: false,
        title:
          "Username contaminated!",
        message:
          `Replace ${contaminated
            .map(
              (wheel) =>
                wheel.word.text
            )
            .join(", ")} before scanning again.`,
        points: 0
      });

      setMeme(
        "Protect your identity!",
        first.word.reason,
        "wrong"
      );

      updateHud();

      return;
    }

    const challengeResult =
      meetsChallenge();

    if (
      !challengeResult.passed
    ) {
      failedScans += 1;

      combo =
        0;

      challengeLocked =
        false;

      setText(
        "factoryStatus",
        "Challenge Incomplete"
      );

      setText(
        "inspectionIcon",
        "🧩"
      );

      setText(
        "inspectionStatus",
        "Mission Not Complete"
      );

      setText(
        "inspectionMessage",
        challengeResult.reason
      );

      showFeedback({
        correct: false,
        title:
          "Safe, but the challenge is incomplete!",
        message:
          challengeResult.reason,
        points: 0
      });

      setMeme(
        "Almost there!",
        challengeResult.reason,
        "thinking"
      );

      updateHud();

      return;
    }

    approveCreation();
  }

  function approveCreation() {
    correctScans += 1;

    usernamesBuilt += 1;

    combo += 1;

    bestCombo =
      Math.max(
        bestCombo,
        combo
      );

    const creativity =
      calculateCreativity();

    const creativityLabel =
      getCreativityLabel(
        creativity
      );

    let creativityMultiplier =
      1;

    if (creativity >= 90) {
      creativityMultiplier =
        4;
    } else if (creativity >= 72) {
      creativityMultiplier =
        3;
    } else if (creativity >= 48) {
      creativityMultiplier =
        2;
    }

    const challengePoints =
      settings.basePoints *
      5;

    const creativityPoints =
      settings.basePoints *
      creativityMultiplier;

    const streakPoints =
      settings.basePoints *
      combo;

    const timePoints =
      Math.min(
        50,
        timeRemaining
      );

    const totalPoints =
      challengePoints +
      creativityPoints +
      streakPoints +
      timePoints;

    score +=
      totalPoints;

    arcade.answerQuestion({
      questionId:
        currentChallenge.id,
      correct: true
    });

    setText(
      "factoryStatus",
      "Approved"
    );

    setText(
      "inspectionIcon",
      "✅"
    );

    setText(
      "inspectionStatus",
      "Username Approved"
    );

    setText(
      "inspectionMessage",
      "Identity protected and challenge completed"
    );

    setText(
      "approvedUsername",
      getCurrentUsername()
    );

    setText(
      "approvedUsernameMessage",
      "This creation expresses personality without revealing real-world identity details."
    );

    setText(
      "approvedChallenge",
      currentChallenge.title
    );

    setText(
      "approvedCreativity",
      creativityLabel
    );

    setText(
      "approvedPoints",
      `+${totalPoints}`
    );

    byId("usernameSuccessOverlay")
      ?.classList.remove(
        "hidden"
      );

    setMeme(
      "Creation approved!",
      `${getCurrentUsername()} completed the ${currentChallenge.title} challenge.`,
      "congrats"
    );

    updateHud();
  }

  /* =====================================================
     DECONTAMINATION
  ===================================================== */

  function decontaminate() {
    if (
      !gameRunning ||
      machineSpinning ||
      challengeLocked ||
      decontaminateUses <= 0
    ) {
      return;
    }

    const contaminated =
      getContaminatedWheels();

    if (
      contaminated.length === 0
    ) {
      setMeme(
        "No contamination detected!",
        "Save this power for a username containing private information.",
        "thinking"
      );

      return;
    }

    decontaminateUses -= 1;

    contaminantsRemoved +=
      contaminated.length;

    setText(
      "decontaminateCount",
      `${decontaminateUses} available`
    );

    if (
      decontaminateUses <= 0
    ) {
      byId("decontaminateButton")
        ?.setAttribute(
          "disabled",
          "disabled"
        );
    }

    contaminated.forEach(
      (wheel) => {
        wheel.word =
          generateWheelWord(
            wheel.index,
            true
          );

        renderWheel(
          wheel
        );

        byId(wheel.element)
          ?.classList.add(
            "decontaminated-wheel"
          );

        window.setTimeout(
          () => {
            byId(wheel.element)
              ?.classList.remove(
                "decontaminated-wheel"
              );
          },
          850
        );
      }
    );

    updateUsernameDisplay();

    setText(
      "factoryStatus",
      "Purified"
    );

    setMeme(
      "Identity clues removed!",
      "The contaminated wheels were replaced with safe creative words.",
      "congrats"
    );

    updateHud();
  }

  /* =====================================================
     MEME HINT
  ===================================================== */

  function useMemeHint() {
    if (
      !gameRunning ||
      machineSpinning ||
      challengeLocked ||
      hintUses <= 0
    ) {
      return;
    }

    hintUses -= 1;

    setText(
      "memeHintCount",
      `${hintUses} available`
    );

    if (
      hintUses <= 0
    ) {
      byId("memeHintButton")
        ?.setAttribute(
          "disabled",
          "disabled"
        );
    }

    const contaminated =
      getContaminatedWheels();

    if (
      contaminated.length > 0
    ) {
      const wheel =
        contaminated[0];

      byId(wheel.element)
        ?.classList.add(
          "hint-wheel"
        );

      setMeme(
        "Meme Hint",
        `${wheel.word.text} is a ${wheel.word.category.toLowerCase()} and may reveal real identity.`,
        "thinking"
      );

      window.setTimeout(
        () => {
          byId(wheel.element)
            ?.classList.remove(
              "hint-wheel"
            );
        },
        2100
      );

      return;
    }

    const challengeResult =
      meetsChallenge();

    if (
      !challengeResult.passed
    ) {
      setMeme(
        "Meme Hint",
        challengeResult.reason,
        "thinking"
      );

      return;
    }

    setMeme(
      "Meme Hint",
      "Your creation looks safe and completes the challenge. Scan it!",
      "congrats"
    );
  }

  /* =====================================================
     FEEDBACK
  ===================================================== */

  function showFeedback({
    correct,
    title,
    message,
    points
  }) {
    const feedback =
      byId("usernameFeedback");

    if (!feedback) {
      return;
    }

    clearTimeout(
      feedbackTimeout
    );

    feedback.classList.remove(
      "hidden",
      "correct-feedback",
      "wrong-feedback"
    );

    feedback.classList.add(
      correct
        ? "correct-feedback"
        : "wrong-feedback"
    );

    setText(
      "usernameFeedbackIcon",
      correct
        ? "✅"
        : "❌"
    );

    setText(
      "usernameFeedbackTitle",
      title
    );

    setText(
      "usernameFeedbackMessage",
      message
    );

    setText(
      "usernameFeedbackPoints",
      `+${points}`
    );

    feedbackTimeout =
      window.setTimeout(
        () => {
          feedback.classList.add(
            "hidden"
          );
        },
        3400
      );
  }

  /* =====================================================
     HUD
  ===================================================== */

  function updateHud() {
    setText(
      "timeRemaining",
      timeRemaining
    );

    setText(
      "currentScore",
      score
    );

    setText(
      "comboCount",
      `x${combo}`
    );

    setText(
      "rerollsRemaining",
      rerollsRemaining
    );

    setText(
      "usernamesBuilt",
      usernamesBuilt
    );

    const progress =
      (
        usernamesBuilt /
        settings.challenges
      ) * 100;

    const fill =
      byId("usernameProgressFill");

    if (fill) {
      fill.style.width =
        `${Math.min(
          100,
          progress
        )}%`;
    }

    updateGlobalPoints();
  }

  /* =====================================================
     RESULTS
  ===================================================== */

  function makeStars(count) {
    const stars =
      Math.max(
        0,
        Math.min(
          3,
          Number(count) || 0
        )
      );

    return (
      "★".repeat(stars) +
      "☆".repeat(3 - stars)
    );
  }

  function endGame(reason) {
    if (!gameRunning) {
      return;
    }

    gameRunning =
      false;

    machineSpinning =
      false;

    challengeLocked =
      true;

    clearInterval(
      timerInterval
    );

    clearTimeout(
      feedbackTimeout
    );

    byId("usernameSuccessOverlay")
      ?.classList.add(
        "hidden"
      );

    const totalScans =
      correctScans +
      failedScans;

    const accuracy =
      totalScans > 0
        ? Math.round(
            (
              correctScans /
              totalScans
            ) * 100
          )
        : 0;

    let arcadeResult = {};

    try {
      arcadeResult =
        arcade.finishRound() ||
        {};
    } catch (error) {
      console.error(
        "Could not finish Username Lab round:",
        error
      );
    }

    const bestScoreKey =
      `usernameFactoryBest-${selectedHeat}`;

    const previousBest =
      Number(
        localStorage.getItem(
          bestScoreKey
        ) || 0
      );

    const newBest =
      Math.max(
        previousBest,
        score
      );

    localStorage.setItem(
      bestScoreKey,
      String(newBest)
    );

    let stars =
      1;

    if (
      usernamesBuilt ===
        settings.challenges &&
      accuracy >= 85
    ) {
      stars =
        3;
    } else if (
      usernamesBuilt >= 3
    ) {
      stars =
        2;
    }

    let rank =
      "Creative Username Builder";

    if (
      usernamesBuilt ===
        settings.challenges &&
      accuracy >= 90 &&
      bestCreativityScore >= 90
    ) {
      rank =
        "Legendary Identity Inventor";
    } else if (
      usernamesBuilt >= 4 &&
      bestCreativityScore >= 72
    ) {
      rank =
        "Epic Username Engineer";
    } else if (
      usernamesBuilt >= 3
    ) {
      rank =
        "Cyber Creativity Scientist";
    }

    let heading =
      "Factory Shift Complete";

    let message =
      "A strong username can express your interests without using your real name, birthday, school, location, password, or contact details.";

    if (
      reason === "time"
    ) {
      heading =
        "Factory Time Expired";

      message =
        "Your completed creations were saved. Try again and use locks and rerolls more quickly.";
    } else if (
      usernamesBuilt ===
        settings.challenges &&
      accuracy >= 90
    ) {
      heading =
        "Legendary Username Inventor!";

      message =
        "You completed every challenge while protecting identity information.";
    } else if (
      usernamesBuilt ===
      settings.challenges
    ) {
      heading =
        "Every Challenge Complete!";

      message =
        "You built five safe usernames. Play again to reach Legendary creativity.";
    }

    setText(
      "resultHeading",
      heading
    );

    setText(
      "usernameRank",
      rank
    );

    setText(
      "finalScore",
      score
    );

    setText(
      "finalChallengesCompleted",
      `${usernamesBuilt}/${settings.challenges}`
    );

    setText(
      "finalUsernamesBuilt",
      usernamesBuilt
    );

    setText(
      "finalContaminantsRemoved",
      contaminantsRemoved
    );

    setText(
      "finalBestCreativity",
      getCreativityLabel(
        bestCreativityScore
      )
    );

    setText(
      "finalBestCombo",
      `x${bestCombo}`
    );

    setText(
      "bestScore",
      newBest
    );

    setText(
      "globalPointsEarned",
      `+${
        Number(
          arcadeResult
            .globalPointsEarned ||
          0
        )
      }`
    );

    setText(
      "finalStars",
      makeStars(
        stars
      )
    );

    setText(
      "resultMessage",
      message
    );

    const resultImage =
      byId("resultMemeImage");

    if (resultImage) {
      resultImage.src =
        usernamesBuilt >= 3
          ? "../../assets/mascot/congrats.png"
          : "../../assets/mascot/thinking.png";
    }

    updateGlobalPoints();

    showScreen(
      "resultScreen"
    );
  }

  /* =====================================================
     BUTTON CONNECTIONS
  ===================================================== */

  byId("spinAllButton")
    ?.addEventListener(
      "click",
      () => {
        spinAllWheels({
          chargeReroll: true
        });
      }
    );

  byId("unlockAllButton")
    ?.addEventListener(
      "click",
      () => {
        unlockAllWheels();

        setMeme(
          "All wheels unlocked!",
          "Your next spin can change every word.",
          "thinking"
        );
      }
    );

  byId("inspectUsernameButton")
    ?.addEventListener(
      "click",
      scanCreation
    );

  byId("decontaminateButton")
    ?.addEventListener(
      "click",
      decontaminate
    );

  byId("memeHintButton")
    ?.addEventListener(
      "click",
      useMemeHint
    );

  wheelDefinitions.forEach(
    (definition, index) => {
      byId(definition.lockButton)
        ?.addEventListener(
          "click",
          () => {
            toggleWheelLock(
              index
            );
          }
        );

      byId(definition.rerollButton)
        ?.addEventListener(
          "click",
          () => {
            rerollSingleWheel(
              index
            );
          }
        );
    }
  );

  byId("continueBuildingButton")
    ?.addEventListener(
      "click",
      () => {
        byId("usernameSuccessOverlay")
          ?.classList.add(
            "hidden"
          );

        currentChallengeIndex += 1;

        if (
          currentChallengeIndex >=
          roundChallenges.length
        ) {
          endGame("complete");
          return;
        }

        loadChallenge();

        spinAllWheels({
          chargeReroll: false
        });
      }
    );

  byId("playAgain")
    ?.addEventListener(
      "click",
      () => {
        clearInterval(
          timerInterval
        );

        clearTimeout(
          feedbackTimeout
        );

        byId("usernameSuccessOverlay")
          ?.classList.add(
            "hidden"
          );

        byId("timeRemaining")
          ?.classList.remove(
            "danger-time"
          );

        showScreen(
          "introScreen"
        );
      }
    );

  /* =====================================================
     INITIALIZATION
  ===================================================== */

  function initializeGame() {
    connectStartButton();
    updateGlobalPoints();

    console.log(
      "Username Lab creative factory engine loaded successfully."
    );
  }

  if (
    document.readyState ===
    "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      initializeGame,
      {
        once: true
      }
    );
  } else {
    initializeGame();
  }
})();
