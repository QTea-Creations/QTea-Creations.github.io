"use strict";

/* =========================================================
   SAFETII NET — CYBER ARCADE
   BACKPACK RESCUE: CONVEYOR EDITION
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
     CONFIGURATION
  ===================================================== */

  const heatSettings = {
    mild: {
      label: "Mild",
      basePoints: 10,
      roundSeconds: 75,
      travelSeconds: 12,
      spawnDelay: 850,
      totalItems: 15,
      startingLives: 4
    },

    spicy: {
      label: "Spicy",
      basePoints: 20,
      roundSeconds: 65,
      travelSeconds: 9,
      spawnDelay: 700,
      totalItems: 15,
      startingLives: 3
    },

    hot: {
      label: "Hot",
      basePoints: 30,
      roundSeconds: 55,
      travelSeconds: 7,
      spawnDelay: 550,
      totalItems: 15,
      startingLives: 3
    }
  };

  const answerNames = {
    safe: "Backpack",
    private: "Safe"
  };

  /* =====================================================
     QUESTION BANKS
  ===================================================== */

  const itemBanks = {
    mild: [
      {
        id: "mild-animal",
        text:
          "My favorite animal is a dolphin.",
        answer: "safe",
        explanation:
          "A favorite animal is harmless self-expression."
      },

      {
        id: "mild-address",
        text:
          "My home address is 1842 River Street.",
        answer: "private",
        explanation:
          "A home address reveals exactly where someone lives."
      },

      {
        id: "mild-color",
        text:
          "Purple is my favorite color.",
        answer: "safe",
        explanation:
          "A favorite color does not identify or locate someone."
      },

      {
        id: "mild-password",
        text:
          "My game password is DragonHero42.",
        answer: "private",
        explanation:
          "Passwords must always remain secret."
      },

      {
        id: "mild-hobby",
        text:
          "I enjoy drawing comic-book heroes.",
        answer: "safe",
        explanation:
          "A hobby is usually okay to share."
      },

      {
        id: "mild-school",
        text:
          "I attend Lakeview Elementary School.",
        answer: "private",
        explanation:
          "A school name reveals where a child can regularly be found."
      },

      {
        id: "mild-subject",
        text:
          "Science is my favorite subject.",
        answer: "safe",
        explanation:
          "A favorite subject is broad self-expression."
      },

      {
        id: "mild-phone",
        text:
          "My phone number is 313-555-0184.",
        answer: "private",
        explanation:
          "A phone number is private contact information."
      },

      {
        id: "mild-talent",
        text:
          "I am good at playing the piano.",
        answer: "safe",
        explanation:
          "A general talent does not identify someone."
      },

      {
        id: "mild-birthday",
        text:
          "My birthday is October 12.",
        answer: "private",
        explanation:
          "An exact birthday can help identify someone or unlock accounts."
      },

      {
        id: "mild-food",
        text:
          "Pizza is my favorite food.",
        answer: "safe",
        explanation:
          "A favorite food is normally safe to share."
      },

      {
        id: "mild-code",
        text:
          "My verification code is 492813.",
        answer: "private",
        explanation:
          "Verification codes can give someone access to an account."
      },

      {
        id: "mild-movie",
        text:
          "I like funny adventure movies.",
        answer: "safe",
        explanation:
          "A general movie preference is harmless."
      },

      {
        id: "mild-location",
        text:
          "I am standing outside Oak Park right now.",
        answer: "private",
        explanation:
          "A live location can reveal where someone is at that exact moment."
      },

      {
        id: "mild-book",
        text:
          "My favorite book is The Secret Garden.",
        answer: "safe",
        explanation:
          "A favorite book is broad self-expression."
      },

      {
        id: "mild-full-name",
        text:
          "My full name is Jordan Alexander Thompson.",
        answer: "private",
        explanation:
          "A full legal name can make someone easy to identify."
      }
    ],

    spicy: [
      {
        id: "spicy-pet",
        text:
          "Here is a photo of my cat sleeping.",
        answer: "safe",
        explanation:
          "A pet photo can be safe when the background reveals nothing private."
      },

      {
        id: "spicy-pet-address",
        text:
          "Here is my dog outside 1842 River Street.",
        answer: "private",
        explanation:
          "The pet is harmless, but the address makes the post private."
      },

      {
        id: "spicy-sport",
        text:
          "Basketball is my favorite sport.",
        answer: "safe",
        explanation:
          "A favorite sport is broad self-expression."
      },

      {
        id: "spicy-team",
        text:
          "I am number 14 for the Lakeside Lightning.",
        answer: "private",
        explanation:
          "A team name and jersey number may identify a specific child."
      },

      {
        id: "spicy-vacation",
        text:
          "I had fun at the beach last summer.",
        answer: "safe",
        explanation:
          "A general memory from the past does not reveal a current location."
      },

      {
        id: "spicy-hotel",
        text:
          "We are at Harbor Hotel in room 314 right now.",
        answer: "private",
        explanation:
          "A hotel and room number reveal an exact current location."
      },

      {
        id: "spicy-nickname",
        text:
          "My online nickname is StarFox.",
        answer: "safe",
        explanation:
          "A creative nickname can help protect a real identity."
      },

      {
        id: "spicy-grade",
        text:
          "I am in fifth grade.",
        answer: "private",
        explanation:
          "A grade level reveals an approximate age."
      },

      {
        id: "spicy-art",
        text:
          "I painted a picture of a purple dragon.",
        answer: "safe",
        explanation:
          "Sharing art is normally safe without identifying information."
      },

      {
        id: "spicy-art-school",
        text:
          "My artwork is in Room 204 at East Ridge School.",
        answer: "private",
        explanation:
          "The school and room number reveal where the child can be found."
      },

      {
        id: "spicy-gaming",
        text:
          "I enjoy puzzle games and building games.",
        answer: "safe",
        explanation:
          "General game preferences do not identify someone."
      },

      {
        id: "spicy-username",
        text:
          "My username is MayaJohnson2014.",
        answer: "private",
        explanation:
          "This username may reveal a full name and birth year."
      },

      {
        id: "spicy-achievement",
        text:
          "My team won first place!",
        answer: "safe",
        explanation:
          "A general achievement is safe without identifying details."
      },

      {
        id: "spicy-practice",
        text:
          "Practice is every Thursday at 6:00 at Brighton Dance Center.",
        answer: "private",
        explanation:
          "A repeating schedule and exact location reveal where someone will be."
      },

      {
        id: "spicy-music",
        text:
          "I like jazz and piano music.",
        answer: "safe",
        explanation:
          "Music preferences are broad self-expression."
      },

      {
        id: "spicy-live-trip",
        text:
          "Our house will be empty for two weeks starting tonight.",
        answer: "private",
        explanation:
          "This announces when the home will be unoccupied."
      }
    ],

    hot: [
      {
        id: "hot-robot",
        text:
          "I built a robot that can move across the floor.",
        answer: "safe",
        explanation:
          "A general project achievement is normally safe."
      },

      {
        id: "hot-robot-event",
        text:
          "Meet me at Central High tomorrow at 4:00 for robotics practice.",
        answer: "private",
        explanation:
          "The school, date, and time reveal a precise meeting location."
      },

      {
        id: "hot-bike",
        text:
          "I like riding my bike on weekends.",
        answer: "safe",
        explanation:
          "A broad hobby is safe without a route or schedule."
      },

      {
        id: "hot-bike-route",
        text:
          "Every Saturday at 9:00 I ride alone from my house to Oak Park.",
        answer: "private",
        explanation:
          "A repeated time and route reveal a predictable routine."
      },

      {
        id: "hot-food",
        text:
          "Tacos are my favorite food.",
        answer: "safe",
        explanation:
          "A favorite food does not identify someone."
      },

      {
        id: "hot-lunch",
        text:
          "I eat lunch every weekday at 12:15 beside the west entrance.",
        answer: "private",
        explanation:
          "A repeating time and location reveal where someone can be found."
      },

      {
        id: "hot-code",
        text:
          "The code sent to my phone is 482991.",
        answer: "private",
        explanation:
          "A verification code can unlock an account."
      },

      {
        id: "hot-book",
        text:
          "I love mystery books and space stories.",
        answer: "safe",
        explanation:
          "Reading preferences are harmless self-expression."
      },

      {
        id: "hot-security-answer",
        text:
          "My account recovery answer is Buster.",
        answer: "private",
        explanation:
          "Recovery answers can be used to reset passwords."
      },

      {
        id: "hot-dance",
        text:
          "Dance is one of my favorite activities.",
        answer: "safe",
        explanation:
          "A general activity is usually okay to share."
      },

      {
        id: "hot-dance-time",
        text:
          "I am Ava, and I dance alone every Thursday at 6:00.",
        answer: "private",
        explanation:
          "A name, activity, and repeating schedule combine to reveal too much."
      },

      {
        id: "hot-pet",
        text:
          "My dog makes funny noises while sleeping.",
        answer: "safe",
        explanation:
          "A harmless pet story normally reveals nothing private."
      },

      {
        id: "hot-school-team",
        text:
          "Renaissance Robotics Team 72264 is at Central High today.",
        answer: "private",
        explanation:
          "The school, team, event location, and current date identify a group’s location."
      },

      {
        id: "hot-color",
        text:
          "Blue and purple are my favorite colors.",
        answer: "safe",
        explanation:
          "Favorite colors are harmless preferences."
      },

      {
        id: "hot-empty-house",
        text:
          "We leave Friday, and nobody will be home until next month.",
        answer: "private",
        explanation:
          "This reveals exactly when a home will be empty."
      },

      {
        id: "hot-talent",
        text:
          "I am learning how to design video games.",
        answer: "safe",
        explanation:
          "A general skill or interest is safe to share."
      }
    ]
  };

  /* =====================================================
     STATE
  ===================================================== */

  let selectedHeat =
    "mild";

  let settings =
    heatSettings.mild;

  let roundItems =
    [];

  let currentItemIndex =
    0;

  let activeItem =
    null;

  let activeCard =
    null;

  let score =
    0;

  let correctCount =
    0;

  let attemptedCount =
    0;

  let lives =
    3;

  let timeRemaining =
    60;

  let combo =
    0;

  let bestCombo =
    0;

  let freezeUses =
    1;

  let hintUses =
    2;

  let gameRunning =
    false;

  let gameFrozen =
    false;

  let answerLocked =
    false;

  let cardSelected =
    false;

  let timerInterval =
    null;

  let animationFrame =
    null;

  let cardStartTime =
    0;

  let cardTravelDuration =
    10000;

  let pausedElapsed =
    0;

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
      let index =
        copy.length - 1;
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

  function showScreen(
    screenId
  ) {
    [
      "introScreen",
      "playScreen",
      "resultScreen"
    ].forEach((id) => {
      byId(id)?.classList.add(
        "hidden"
      );
    });

    byId(screenId)
      ?.classList.remove(
        "hidden"
      );

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  function getGlobalPoints() {
    return Number(
      arcade.getGlobalPoints?.() ||
      0
    );
  }

  function updateGlobalPoints() {
    setText(
      "globalPoints",
      getGlobalPoints()
    );
  }

  function closeContainer(
    imageId
  ) {
    const image =
      byId(imageId);

    const closedSource =
      image?.dataset.closedSrc;

    if (
      image &&
      closedSource
    ) {
      image.src =
        closedSource;
    }
  }

  function openContainer(
    imageId
  ) {
    const image =
      byId(imageId);

    const openSource =
      image?.dataset.openSrc;

    if (
      image &&
      openSource
    ) {
      image.src =
        openSource;
    }
  }

  function closeAllContainers() {
    closeContainer(
      "backpackImage"
    );

    closeContainer(
      "safeImage"
    );

    document
      .querySelectorAll(
        ".rescue-destination"
      )
      .forEach((zone) => {
        zone.classList.remove(
          "drag-over"
        );
      });
  }

  function updateHud() {
    setText(
      "currentScore",
      score
    );

    setText(
      "timeRemaining",
      timeRemaining
    );

    setText(
      "comboCount",
      `x${Math.max(1, combo)}`
    );

    setText(
      "bestComboLive",
      `x${Math.max(1, bestCombo)}`
    );

    setText(
      "livesDisplay",
      lives > 0
        ? "❤️".repeat(lives)
        : "💔"
    );

    setText(
      "itemsSorted",
      attemptedCount
    );

    setText(
      "itemsTotal",
      settings.totalItems
    );

    const percentage =
      (
        attemptedCount /
        settings.totalItems
      ) * 100;

    const fill =
      byId("roundProgressFill");

    if (fill) {
      fill.style.width =
        `${Math.min(
          100,
          percentage
        )}%`;
    }
  }

  function setMeme(
    title,
    message,
    imageName =
      "thinking"
  ) {
    setText(
      "memeGameTitle",
      title
    );

    setText(
      "memeGameMessage",
      message
    );

    const image =
      byId("memeGameImage");

    if (image) {
      image.src =
        `../../assets/mascot/${imageName}.png`;
    }
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
     ROUND START
  ===================================================== */

  function startGame() {
    settings =
      heatSettings[
        selectedHeat
      ] ||
      heatSettings.mild;

    roundItems =
      shuffle(
        itemBanks[
          selectedHeat
        ] ||
        itemBanks.mild
      ).slice(
        0,
        settings.totalItems
      );

    currentItemIndex =
      0;

    activeItem =
      null;

    activeCard =
      null;

    score =
      0;

    correctCount =
      0;

    attemptedCount =
      0;

    lives =
      settings.startingLives;

    timeRemaining =
      settings.roundSeconds;

    combo =
      0;

    bestCombo =
      0;

    freezeUses =
      1;

    hintUses =
      2;

    gameRunning =
      true;

    gameFrozen =
      false;

    answerLocked =
      false;

    cardSelected =
      false;

    arcade.startRound({
      gameId:
        `backpack-rescue-${selectedHeat}`,

      gameName:
        `Backpack Rescue ${settings.label}`,

      heatLevel:
        selectedHeat,

      questionCount:
        settings.totalItems
    });

    setText(
      "currentHeat",
      settings.label
    );

    setText(
      "currentSpeedLabel",
      settings.travelSeconds >= 11
        ? "Normal"
        : settings.travelSeconds >= 8
          ? "Fast"
          : "Turbo"
    );

    setText(
      "freezePowerCount",
      "1 available"
    );

    setText(
      "hintPowerCount",
      "2 available"
    );

    byId("freezePowerButton")
      ?.removeAttribute(
        "disabled"
      );

    byId("hintPowerButton")
      ?.removeAttribute(
        "disabled"
      );

    showScreen(
      "playScreen"
    );

    updateHud();

    setMeme(
      "Rescue ready!",
      "Catch each block before it reaches the Danger Zone.",
      "thinking"
    );

    startRoundTimer();

    window.setTimeout(
      spawnNextItem,
      650
    );
  }

  function connectStartButton() {
    const button =
      byId("startGame");

    if (!button) {
      console.error(
        "Backpack Rescue start button was not found."
      );

      return;
    }

    if (
      button.dataset
        .rescueConnected ===
      "true"
    ) {
      return;
    }

    button.dataset
      .rescueConnected =
      "true";

    button.addEventListener(
      "click",
      startGame
    );
  }

  /* =====================================================
     TIMER
  ===================================================== */

  function startRoundTimer() {
    clearInterval(
      timerInterval
    );

    timerInterval =
      window.setInterval(
        () => {
          if (
            !gameRunning ||
            gameFrozen
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
            endGame(
              "time"
            );
          }
        },
        1000
      );
  }

  /* =====================================================
     MOVING CARD
  ===================================================== */

  function spawnNextItem() {
    if (
      !gameRunning ||
      answerLocked
    ) {
      return;
    }

    if (
      currentItemIndex >=
      roundItems.length
    ) {
      endGame(
        "complete"
      );
      return;
    }

    activeItem =
      roundItems[
        currentItemIndex
      ];

    answerLocked =
      false;

    cardSelected =
      false;

    pausedElapsed =
      0;

    const layer =
      byId("movingItemLayer");

    if (!layer) {
      endGame(
        "error"
      );
      return;
    }

    layer.innerHTML = "";

    const card =
      document.createElement(
        "article"
      );

    card.className =
      "moving-information-card";

    card.id =
      "activeMovingCard";

    card.draggable =
      true;

    card.tabIndex =
      0;

    card.setAttribute(
      "role",
      "button"
    );

    card.setAttribute(
      "aria-label",
      `${activeItem.text}. Drag this card to the Backpack or Safe.`
    );

    card.innerHTML = `
      <span class="moving-card-icon">
        ${activeItem.answer === "private"
          ? "🔎"
          : "✨"}
      </span>

      <strong>
        ${activeItem.text}
      </strong>

      <small>
        Grab me!
      </small>
    `;

    layer.appendChild(
      card
    );

    activeCard =
      card;

    setText(
      "activeItemReadout",
      activeItem.text
    );

    card.addEventListener(
      "dragstart",
      handleDragStart
    );

    card.addEventListener(
      "dragend",
      handleDragEnd
    );

    card.addEventListener(
      "click",
      () => {
        selectCard(
          card
        );
      }
    );

    card.addEventListener(
      "keydown",
      (event) => {
        if (
          event.key === "Enter" ||
          event.key === " "
        ) {
          event.preventDefault();

          selectCard(
            card
          );
        }
      }
    );

    cardStartTime =
      performance.now();

    cardTravelDuration =
      settings.travelSeconds *
      1000;

    animateCard();
  }

  function animateCard() {
    cancelAnimationFrame(
      animationFrame
    );

    function frame(now) {
      if (
        !gameRunning ||
        !activeCard ||
        answerLocked
      ) {
        return;
      }

      if (gameFrozen) {
        animationFrame =
          requestAnimationFrame(
            frame
          );

        return;
      }

      const elapsed =
        now -
        cardStartTime -
        pausedElapsed;

      const progress =
        Math.min(
          1,
          elapsed /
          cardTravelDuration
        );

      activeCard.style.left =
        `${progress * 78}%`;

      if (
        progress >= 1
      ) {
        handleMissedItem();
        return;
      }

      animationFrame =
        requestAnimationFrame(
          frame
        );
    }

    animationFrame =
      requestAnimationFrame(
        frame
      );
  }

  function selectCard(
    card
  ) {
    if (
      answerLocked ||
      !gameRunning
    ) {
      return;
    }

    cardSelected =
      !cardSelected;

    card.classList.toggle(
      "selected-card",
      cardSelected
    );

    setMeme(
      cardSelected
        ? "Card selected!"
        : "Keep rescuing!",
      cardSelected
        ? "Now choose Backpack or Safe."
        : "Grab the information before it reaches danger.",
      "thinking"
    );
  }

  function handleDragStart(
    event
  ) {
    if (
      answerLocked ||
      !gameRunning
    ) {
      event.preventDefault();
      return;
    }

    cardSelected =
      true;

    activeCard?.classList.add(
      "dragging"
    );

    event.dataTransfer.effectAllowed =
      "move";

    event.dataTransfer.setData(
      "text/plain",
      activeItem?.id ||
      "rescue-item"
    );
  }

  function handleDragEnd() {
    activeCard?.classList.remove(
      "dragging"
    );

    closeAllContainers();
  }

  /* =====================================================
     DROP ZONES
  ===================================================== */

  function connectDropZone({
    zoneId,
    imageId
  }) {
    const zone =
      byId(zoneId);

    if (!zone) {
      return;
    }

    zone.addEventListener(
      "dragenter",
      (event) => {
        event.preventDefault();

        if (
          answerLocked ||
          !activeCard
        ) {
          return;
        }

        zone.classList.add(
          "drag-over"
        );

        openContainer(
          imageId
        );
      }
    );

    zone.addEventListener(
      "dragover",
      (event) => {
        event.preventDefault();

        if (
          answerLocked ||
          !activeCard
        ) {
          return;
        }

        event.dataTransfer.dropEffect =
          "move";

        zone.classList.add(
          "drag-over"
        );

        openContainer(
          imageId
        );
      }
    );

    zone.addEventListener(
      "dragleave",
      (event) => {
        if (
          event.relatedTarget &&
          zone.contains(
            event.relatedTarget
          )
        ) {
          return;
        }

        zone.classList.remove(
          "drag-over"
        );

        closeContainer(
          imageId
        );
      }
    );

    zone.addEventListener(
      "drop",
      (event) => {
        event.preventDefault();

        handleAnswer(
          zone.dataset.answer,
          zone
        );
      }
    );

    zone.addEventListener(
      "click",
      () => {
        if (
          !cardSelected ||
          answerLocked
        ) {
          setMeme(
            "Select the moving card first!",
            "Click the information block, then choose a destination.",
            "thinking"
          );

          return;
        }

        handleAnswer(
          zone.dataset.answer,
          zone
        );
      }
    );
  }

  connectDropZone({
    zoneId:
      "backpackDropZone",

    imageId:
      "backpackImage"
  });

  connectDropZone({
    zoneId:
      "safeDropZone",

    imageId:
      "safeImage"
  });

  byId("sendToBackpackButton")
    ?.addEventListener(
      "click",
      () => {
        if (!activeCard) {
          return;
        }

        cardSelected =
          true;

        handleAnswer(
          "safe",
          byId(
            "backpackDropZone"
          )
        );
      }
    );

  byId("sendToSafeButton")
    ?.addEventListener(
      "click",
      () => {
        if (!activeCard) {
          return;
        }

        cardSelected =
          true;

        handleAnswer(
          "private",
          byId(
            "safeDropZone"
          )
        );
      }
    );

  /* =====================================================
     ANSWER HANDLING
  ===================================================== */

  function handleAnswer(
    selectedAnswer,
    selectedZone
  ) {
    if (
      answerLocked ||
      !activeItem ||
      !activeCard
    ) {
      return;
    }

    answerLocked =
      true;

    cancelAnimationFrame(
      animationFrame
    );

    closeAllContainers();

    const correct =
      selectedAnswer ===
      activeItem.answer;

    attemptedCount += 1;

    if (correct) {
      correctCount += 1;

      combo += 1;

      bestCombo =
        Math.max(
          bestCombo,
          combo
        );

      const multiplier =
        Math.min(
          5,
          Math.max(
            1,
            combo
          )
        );

      const earnedPoints =
        settings.basePoints *
        multiplier;

      score +=
        earnedPoints;

      arcade.answerQuestion({
        questionId:
          activeItem.id,

        correct: true
      });

      activeCard.classList.add(
        "rescued-correct"
      );

      selectedZone?.classList.add(
        "correct-drop"
      );

      showFeedback({
        correct: true,
        points:
          earnedPoints,
        title:
          combo >= 3
            ? `${combo}x Combo!`
            : "Great rescue!",

        message:
          `${activeItem.explanation} It belongs in the ${answerNames[activeItem.answer]}.`
      });

      setMeme(
        combo >= 4
          ? "Super combo!"
          : "Great rescue!",
        `You sorted it correctly and earned ${earnedPoints} points.`,
        "congrats"
      );
    } else {
      combo =
        0;

      lives -= 1;

      arcade.answerQuestion({
        questionId:
          activeItem.id,

        correct: false
      });

      activeCard.classList.add(
        "rescued-wrong"
      );

      selectedZone?.classList.add(
        "wrong-drop"
      );

      const correctZone =
        activeItem.answer ===
        "safe"
          ? byId(
              "backpackDropZone"
            )
          : byId(
              "safeDropZone"
            );

      correctZone?.classList.add(
        "reveal-correct-drop"
      );

      showFeedback({
        correct: false,
        points: 0,
        title:
          "Wrong container!",

        message:
          `${activeItem.explanation} It belongs in the ${answerNames[activeItem.answer]}.`
      });

      setMeme(
        "Watch the private clues!",
        `That information belongs in the ${answerNames[activeItem.answer]}.`,
        "wrong"
      );
    }

    updateHud();

    window.setTimeout(
      completeCurrentItem,
      1150
    );
  }

  function handleMissedItem() {
    if (
      answerLocked ||
      !activeItem
    ) {
      return;
    }

    answerLocked =
      true;

    attemptedCount += 1;

    combo =
      0;

    lives -= 1;

    arcade.answerQuestion({
      questionId:
        activeItem.id,

      correct: false
    });

    activeCard?.classList.add(
      "missed-item"
    );

    byId("dangerZone")
      ?.classList.add(
        "danger-hit"
      );

    showFeedback({
      correct: false,
      points: 0,
      title:
        "Information reached danger!",

      message:
        `${activeItem.explanation} Move faster on the next block.`
    });

    setMeme(
      "Too slow!",
      "Grab the next card before it reaches the Danger Zone.",
      "wrong"
    );

    updateHud();

    window.setTimeout(
      () => {
        byId("dangerZone")
          ?.classList.remove(
            "danger-hit"
          );

        completeCurrentItem();
      },
      1000
    );
  }

  function completeCurrentItem() {
    document
      .querySelectorAll(
        ".rescue-destination"
      )
      .forEach((zone) => {
        zone.classList.remove(
          "correct-drop",
          "wrong-drop",
          "reveal-correct-drop"
        );
      });

    byId("rescueFeedback")
      ?.classList.add(
        "hidden"
      );

    currentItemIndex += 1;

    activeItem =
      null;

    activeCard =
      null;

    cardSelected =
      false;

    answerLocked =
      false;

    if (
      lives <= 0
    ) {
      endGame(
        "lives"
      );

      return;
    }

    if (
      currentItemIndex >=
      roundItems.length
    ) {
      endGame(
        "complete"
      );

      return;
    }

    window.setTimeout(
      spawnNextItem,
      settings.spawnDelay
    );
  }

  /* =====================================================
     FEEDBACK
  ===================================================== */

  function showFeedback({
    correct,
    points,
    title,
    message
  }) {
    const feedback =
      byId("rescueFeedback");

    feedback?.classList.remove(
      "hidden",
      "correct-feedback",
      "wrong-feedback"
    );

    feedback?.classList.add(
      correct
        ? "correct-feedback"
        : "wrong-feedback"
    );

    setText(
      "feedbackIcon",
      correct
        ? "✅"
        : "❌"
    );

    setText(
      "feedbackTitle",
      title
    );

    setText(
      "feedbackMessage",
      message
    );

    setText(
      "feedbackPoints",
      `+${points}`
    );
  }

  /* =====================================================
     POWER-UPS
  ===================================================== */

  byId("freezePowerButton")
    ?.addEventListener(
      "click",
      () => {
        if (
          !gameRunning ||
          freezeUses <= 0 ||
          gameFrozen
        ) {
          return;
        }

        freezeUses -= 1;

        gameFrozen =
          true;

        setText(
          "freezePowerCount",
          "0 available"
        );

        byId("freezePowerButton")
          ?.setAttribute(
            "disabled",
            "disabled"
          );

        byId("freezeOverlay")
          ?.classList.remove(
            "hidden"
          );

        const freezeStart =
          performance.now();

        setMeme(
          "Time frozen!",
          "Use these seconds to study the information.",
          "thinking"
        );

        window.setTimeout(
          () => {
            pausedElapsed +=
              performance.now() -
              freezeStart;

            gameFrozen =
              false;

            byId("freezeOverlay")
              ?.classList.add(
                "hidden"
              );

            setMeme(
              "Conveyor moving!",
              "Sort the information before it reaches danger.",
              "thinking"
            );
          },
          4000
        );
      }
    );

  byId("hintPowerButton")
    ?.addEventListener(
      "click",
      () => {
        if (
          !gameRunning ||
          hintUses <= 0 ||
          !activeItem
        ) {
          return;
        }

        hintUses -= 1;

        setText(
          "hintPowerCount",
          `${hintUses} available`
        );

        if (
          hintUses <= 0
        ) {
          byId("hintPowerButton")
            ?.setAttribute(
              "disabled",
              "disabled"
            );
        }

        const destination =
          answerNames[
            activeItem.answer
          ];

        setMeme(
          "Meme Hint",
          activeItem.answer ===
          "safe"
            ? `This is broad self-expression. Try the ${destination}.`
            : `This could identify, locate, contact, or unlock something. Try the ${destination}.`,
          "thinking"
        );

        const correctZone =
          activeItem.answer ===
          "safe"
            ? byId(
                "backpackDropZone"
              )
            : byId(
                "safeDropZone"
              );

        correctZone?.classList.add(
          "hint-glow"
        );

        window.setTimeout(
          () => {
            correctZone?.classList.remove(
              "hint-glow"
            );
          },
          1800
        );
      }
    );

  /* =====================================================
     END GAME
  ===================================================== */

  function starText(
    count
  ) {
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

  function endGame(
    reason
  ) {
    if (!gameRunning) {
      return;
    }

    gameRunning =
      false;

    gameFrozen =
      false;

    clearInterval(
      timerInterval
    );

    cancelAnimationFrame(
      animationFrame
    );

    closeAllContainers();

    byId("freezeOverlay")
      ?.classList.add(
        "hidden"
      );

    const accuracy =
      attemptedCount > 0
        ? Math.round(
            (
              correctCount /
              attemptedCount
            ) * 100
          )
        : 0;

    /*
      The arcade score helper records correct answers
      using its standard point system. The conveyor game
      also has combo bonuses, so display the local score
      as the final arcade-game score.
    */
    let arcadeResult = {};

    try {
      arcadeResult =
        arcade.finishRound() || {};
    } catch (error) {
      console.error(
        "Could not finish Backpack Rescue round:",
        error
      );
    }

    const bestScoreKey =
      `backpackRescueBest-${selectedHeat}`;

    const oldBest =
      Number(
        localStorage.getItem(
          bestScoreKey
        ) || 0
      );

    const newBest =
      Math.max(
        oldBest,
        score
      );

    localStorage.setItem(
      bestScoreKey,
      String(newBest)
    );

    const globalEarned =
      Number(
        arcadeResult
          .globalPointsEarned ||
        0
      );

    let stars =
      1;

    if (
      accuracy >= 90 &&
      correctCount >= 10
    ) {
      stars =
        3;
    } else if (
      accuracy >= 65
    ) {
      stars =
        2;
    }

    setText(
      "finalScore",
      score
    );

    setText(
      "finalCorrect",
      `${correctCount}/${attemptedCount}`
    );

    setText(
      "finalAccuracy",
      `${accuracy}%`
    );

    setText(
      "finalBestCombo",
      `x${Math.max(
        1,
        bestCombo
      )}`
    );

    setText(
      "finalLives",
      lives
    );

    setText(
      "bestScore",
      newBest
    );

    setText(
      "globalPointsEarned",
      `+${globalEarned}`
    );

    setText(
      "finalStars",
      starText(
        stars
      )
    );

    let heading =
      "Backpack Saved!";

    let message =
      "Keep practicing to build longer combos and protect more information.";

    if (
      reason === "lives"
    ) {
      heading =
        "Danger Took Over!";

      message =
        "The backpack needs another rescue. Watch for names, locations, schedules, passwords, and account codes.";
    } else if (
      reason === "time"
    ) {
      heading =
        "Time Ran Out!";

      message =
        "You rescued several items. Try again and sort the cards more quickly.";
    } else if (
      accuracy === 100
    ) {
      heading =
        "Perfect Rescue!";

      message =
        "You protected every private detail and built an incredible rescue streak.";
    } else if (
      accuracy >= 75
    ) {
      heading =
        "Backpack Saved!";

      message =
        "Excellent rescue work! You caught most of the information before danger.";
    }

    setText(
      "resultHeading",
      heading
    );

    setText(
      "resultMessage",
      message
    );

    updateGlobalPoints();

    showScreen(
      "resultScreen"
    );
  }

  /* =====================================================
     PLAY AGAIN
  ===================================================== */

  byId("playAgain")
    ?.addEventListener(
      "click",
      () => {
        clearInterval(
          timerInterval
        );

        cancelAnimationFrame(
          animationFrame
        );

        byId("timeRemaining")
          ?.classList.remove(
            "danger-time"
          );

        byId("movingItemLayer")
          ?.replaceChildren();

        showScreen(
          "introScreen"
        );
      }
    );

  /* =====================================================
     INITIALIZATION
  ===================================================== */

  if (
    document.readyState ===
    "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      connectStartButton,
      {
        once: true
      }
    );
  } else {
    connectStartButton();
  }

  updateGlobalPoints();

  console.log(
    "Backpack Rescue conveyor engine loaded successfully."
  );
})();
