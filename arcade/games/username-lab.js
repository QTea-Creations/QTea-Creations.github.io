"use strict";

/* =========================================================
   SAFETII NET — CYBER ARCADE
   USERNAME LAB: MIXER EDITION
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
      roundSeconds: 100,
      travelSeconds: 12,
      spawnDelay: 650,
      startingLives: 4,
      usernameGoal: 5,
      ingredientsNeeded: 3
    },

    spicy: {
      label: "Spicy",
      basePoints: 20,
      roundSeconds: 85,
      travelSeconds: 9,
      spawnDelay: 525,
      startingLives: 3,
      usernameGoal: 5,
      ingredientsNeeded: 3
    },

    hot: {
      label: "Hot",
      basePoints: 30,
      roundSeconds: 70,
      travelSeconds: 7,
      spawnDelay: 425,
      startingLives: 3,
      usernameGoal: 5,
      ingredientsNeeded: 4
    }
  };

  /* =====================================================
     INGREDIENT BANKS
  ===================================================== */

  const safeIngredients = [
    {
      id: "safe-purple",
      text: "Purple",
      category: "Color",
      explanation:
        "A favorite color is broad self-expression."
    },

    {
      id: "safe-blue",
      text: "Blue",
      category: "Color",
      explanation:
        "A color does not reveal a real identity."
    },

    {
      id: "safe-silver",
      text: "Silver",
      category: "Color",
      explanation:
        "A creative color word is safe for a username."
    },

    {
      id: "safe-cosmic",
      text: "Cosmic",
      category: "Imaginary word",
      explanation:
        "An imaginative word helps create a username without exposing personal details."
    },

    {
      id: "safe-shadow",
      text: "Shadow",
      category: "Imaginary word",
      explanation:
        "A fictional or descriptive word is generally safe."
    },

    {
      id: "safe-neon",
      text: "Neon",
      category: "Style",
      explanation:
        "A style word adds creativity without revealing identity."
    },

    {
      id: "safe-dragon",
      text: "Dragon",
      category: "Creature",
      explanation:
        "A fantasy creature is a strong, safe username ingredient."
    },

    {
      id: "safe-dolphin",
      text: "Dolphin",
      category: "Animal",
      explanation:
        "A favorite animal is usually safe to include."
    },

    {
      id: "safe-panda",
      text: "Panda",
      category: "Animal",
      explanation:
        "An animal word does not identify the user."
    },

    {
      id: "safe-falcon",
      text: "Falcon",
      category: "Animal",
      explanation:
        "A broad animal choice is safe."
    },

    {
      id: "safe-robot",
      text: "Robot",
      category: "Interest",
      explanation:
        "A general interest can be used without revealing who someone is."
    },

    {
      id: "safe-gamer",
      text: "Gamer",
      category: "Hobby",
      explanation:
        "A broad hobby word is normally safe."
    },

    {
      id: "safe-artist",
      text: "Artist",
      category: "Hobby",
      explanation:
        "A general creative interest is safe."
    },

    {
      id: "safe-builder",
      text: "Builder",
      category: "Hobby",
      explanation:
        "A broad talent or hobby protects real identity."
    },

    {
      id: "safe-spark",
      text: "Spark",
      category: "Power",
      explanation:
        "A fictional power word makes a username more creative."
    },

    {
      id: "safe-blaze",
      text: "Blaze",
      category: "Power",
      explanation:
        "A dramatic fictional word is safe."
    },

    {
      id: "safe-zoom",
      text: "Zoom",
      category: "Power",
      explanation:
        "An action word adds personality without exposing private details."
    },

    {
      id: "safe-nova",
      text: "Nova",
      category: "Space",
      explanation:
        "A space-themed word is creative and non-identifying."
    },

    {
      id: "safe-comet",
      text: "Comet",
      category: "Space",
      explanation:
        "A space word is safe for a username."
    },

    {
      id: "safe-orbit",
      text: "Orbit",
      category: "Space",
      explanation:
        "A general science or space word protects identity."
    },

    {
      id: "safe-pixel",
      text: "Pixel",
      category: "Technology",
      explanation:
        "A technology word is safe when it does not include personal information."
    },

    {
      id: "safe-glitch",
      text: "Glitch",
      category: "Technology",
      explanation:
        "A fictional technology word is safe."
    },

    {
      id: "safe-quest",
      text: "Quest",
      category: "Adventure",
      explanation:
        "An adventure word adds creativity."
    },

    {
      id: "safe-ranger",
      text: "Ranger",
      category: "Adventure",
      explanation:
        "A fictional role is safe for a username."
    },

    {
      id: "safe-whiz",
      text: "Whiz",
      category: "Talent",
      explanation:
        "A playful talent word does not identify the person."
    }
  ];

  const dangerousIngredients = [
    {
      id: "danger-maya",
      text: "Maya",
      category: "Real first name",
      explanation:
        "A real first name can help strangers identify the account owner."
    },

    {
      id: "danger-johnson",
      text: "Johnson",
      category: "Real last name",
      explanation:
        "A real last name may expose family identity."
    },

    {
      id: "danger-maya-johnson",
      text: "MayaJohnson",
      category: "Full-name clue",
      explanation:
        "A first and last name can reveal exactly who owns the account."
    },

    {
      id: "danger-2014",
      text: "2014",
      category: "Birth year",
      explanation:
        "A birth year may reveal the user's age."
    },

    {
      id: "danger-october12",
      text: "October12",
      category: "Birthday",
      explanation:
        "An exact birthday is personal identifying information."
    },

    {
      id: "danger-age10",
      text: "Age10",
      category: "Exact age",
      explanation:
        "An exact age reveals personal information."
    },

    {
      id: "danger-lakeview",
      text: "LakeviewElementary",
      category: "School name",
      explanation:
        "A school name can reveal where a child can be found."
    },

    {
      id: "danger-room204",
      text: "Room204",
      category: "School location",
      explanation:
        "A room number can reveal a precise location."
    },

    {
      id: "danger-detroit",
      text: "Detroit",
      category: "City",
      explanation:
        "A real city narrows down where someone lives."
    },

    {
      id: "danger-riverstreet",
      text: "RiverStreet",
      category: "Street name",
      explanation:
        "A street name can reveal where someone lives."
    },

    {
      id: "danger-1842",
      text: "1842",
      category: "Address number",
      explanation:
        "An address number can become dangerous when combined with other clues."
    },

    {
      id: "danger-313",
      text: "313",
      category: "Phone area code",
      explanation:
        "An area code can reveal a general location."
    },

    {
      id: "danger-phone",
      text: "5550184",
      category: "Phone number",
      explanation:
        "A phone number allows strangers to contact someone."
    },

    {
      id: "danger-password",
      text: "DragonHero42",
      category: "Password",
      explanation:
        "A password should never be used as a public username ingredient."
    },

    {
      id: "danger-code",
      text: "482991",
      category: "Verification code",
      explanation:
        "A verification code can give someone access to an account."
    },

    {
      id: "danger-studentid",
      text: "StudentID72264",
      category: "Identification number",
      explanation:
        "Student identification details should remain private."
    },

    {
      id: "danger-jersey14",
      text: "Lakeside14",
      category: "Team and jersey clue",
      explanation:
        "A team name and jersey number may identify a specific player."
    },

    {
      id: "danger-saturday9",
      text: "Saturday9AM",
      category: "Repeating schedule",
      explanation:
        "A regular schedule can reveal when someone will be at a location."
    },

    {
      id: "danger-oakpark",
      text: "OakPark",
      category: "Frequent location",
      explanation:
        "A real location may reveal where someone spends time."
    },

    {
      id: "danger-grade5",
      text: "FifthGrade",
      category: "Grade level",
      explanation:
        "A grade level can reveal an approximate age."
    }
  ];

  /* =====================================================
     STATE
  ===================================================== */

  let selectedHeat =
    "mild";

  let settings =
    heatSettings.mild;

  let ingredientQueue =
    [];

  let activeIngredient =
    null;

  let activeIngredientCard =
    null;

  let selectedIngredients =
    [];

  let score =
    0;

  let combo =
    0;

  let bestCombo =
    0;

  let lives =
    3;

  let timeRemaining =
    75;

  let usernamesBuilt =
    0;

  let safeIngredientsAccepted =
    0;

  let dangerousIngredientsEjected =
    0;

  let correctActions =
    0;

  let wrongActions =
    0;

  let ingredientScannerUses =
    2;

  let purifyUses =
    1;

  let gameRunning =
    false;

  let actionLocked =
    false;

  let ingredientSelected =
    false;

  let timerInterval =
    null;

  let animationFrame =
    null;

  let spawnTimeout =
    null;

  let feedbackTimeout =
    null;

  let ingredientStartTime =
    0;

  let ingredientTravelDuration =
    10000;

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

  function makeIngredientQueue() {
    const queue = [];

    const safeCount =
      settings.usernameGoal *
      settings.ingredientsNeeded +
      8;

    const dangerCount =
      Math.ceil(
        safeCount * 0.7
      );

    for (
      let index = 0;
      index < safeCount;
      index += 1
    ) {
      const ingredient =
        safeIngredients[
          Math.floor(
            Math.random() *
            safeIngredients.length
          )
        ];

      queue.push({
        ...ingredient,
        instanceId:
          `${ingredient.id}-${index}-safe`,
        safe: true
      });
    }

    for (
      let index = 0;
      index < dangerCount;
      index += 1
    ) {
      const ingredient =
        dangerousIngredients[
          Math.floor(
            Math.random() *
            dangerousIngredients.length
          )
        ];

      queue.push({
        ...ingredient,
        instanceId:
          `${ingredient.id}-${index}-danger`,
        safe: false
      });
    }

    return shuffle(queue);
  }

  function getCurrentUsername() {
    return selectedIngredients
      .map(
        (ingredient) =>
          ingredient.text
      )
      .join("");
  }

  function getCreativityPercent() {
    const required =
      settings.ingredientsNeeded;

    return Math.min(
      100,
      (
        selectedIngredients.length /
        required
      ) * 100
    );
  }

  function getComboMultiplier() {
    if (combo >= 8) {
      return 5;
    }

    if (combo >= 6) {
      return 4;
    }

    if (combo >= 4) {
      return 3;
    }

    if (combo >= 2) {
      return 2;
    }

    return 1;
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
     START GAME
  ===================================================== */

  function startGame() {
    clearInterval(
      timerInterval
    );

    cancelAnimationFrame(
      animationFrame
    );

    clearTimeout(
      spawnTimeout
    );

    clearTimeout(
      feedbackTimeout
    );

    settings =
      heatSettings[
        selectedHeat
      ] ||
      heatSettings.mild;

    ingredientQueue =
      makeIngredientQueue();

    activeIngredient =
      null;

    activeIngredientCard =
      null;

    selectedIngredients =
      [];

    score =
      0;

    combo =
      0;

    bestCombo =
      0;

    lives =
      settings.startingLives;

    timeRemaining =
      settings.roundSeconds;

    usernamesBuilt =
      0;

    safeIngredientsAccepted =
      0;

    dangerousIngredientsEjected =
      0;

    correctActions =
      0;

    wrongActions =
      0;

    ingredientScannerUses =
      2;

    purifyUses =
      1;

    gameRunning =
      true;

    actionLocked =
      false;

    ingredientSelected =
      false;

    arcade.startRound({
      gameId:
        `username-lab-${selectedHeat}`,

      gameName:
        `Username Lab ${settings.label}`,

      heatLevel:
        selectedHeat,

      questionCount:
        settings.usernameGoal
    });

    setText(
      "currentHeat",
      settings.label
    );

    setText(
      "usernameGoal",
      settings.usernameGoal
    );

    setText(
      "recipeGoal",
      `Add ${settings.ingredientsNeeded} safe ingredients`
    );

    setText(
      "ingredientScannerCount",
      "2 available"
    );

    setText(
      "purifyCount",
      "1 available"
    );

    byId("ingredientScannerButton")
      ?.removeAttribute(
        "disabled"
      );

    byId("purifyButton")
      ?.removeAttribute(
        "disabled"
      );

    byId("timeRemaining")
      ?.classList.remove(
        "danger-time"
      );

    resetMixer();

    showScreen(
      "playScreen"
    );

    updateHud();

    setMeme(
      "Lab ready!",
      "Catch each ingredient and decide whether to mix or eject it.",
      "thinking"
    );

    startTimer();

    spawnTimeout =
      window.setTimeout(
        spawnNextIngredient,
        600
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
        .usernameLabConnected ===
      "true"
    ) {
      return;
    }

    button.dataset
      .usernameLabConnected =
      "true";

    button.addEventListener(
      "click",
      startGame
    );

    console.log(
      "Username Lab start button connected."
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
          if (!gameRunning) {
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

  function removeTime(seconds) {
    timeRemaining =
      Math.max(
        0,
        timeRemaining - seconds
      );

    updateHud();

    if (
      timeRemaining <= 0
    ) {
      endGame("time");
    }
  }

  /* =====================================================
     INGREDIENT SPAWNING
  ===================================================== */

  function spawnNextIngredient() {
    if (
      !gameRunning ||
      actionLocked ||
      activeIngredientCard
    ) {
      return;
    }

    if (
      ingredientQueue.length === 0
    ) {
      ingredientQueue =
        makeIngredientQueue();
    }

    activeIngredient =
      ingredientQueue.shift();

    if (!activeIngredient) {
      return;
    }

    ingredientSelected =
      false;

    const layer =
      byId("ingredientLayer");

    if (!layer) {
      endGame("error");
      return;
    }

    layer.innerHTML = "";

    const card =
      document.createElement(
        "article"
      );

    card.className =
      "moving-ingredient-card";

    card.id =
      "activeIngredientCard";

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
      `${activeIngredient.text}. Select this ingredient, then add it to the mixer or eject it.`
    );

    card.innerHTML = `
      <span class="ingredient-card-icon">
        ${getIngredientIcon(
          activeIngredient.category
        )}
      </span>

      <div>
        <strong>
          ${escapeHtml(
            activeIngredient.text
          )}
        </strong>

        <small>
          Inspect me!
        </small>
      </div>
    `;

    layer.appendChild(
      card
    );

    activeIngredientCard =
      card;

    setText(
      "activeIngredientText",
      activeIngredient.text
    );

    setText(
      "activeIngredientCategory",
      "Unknown"
    );

    card.addEventListener(
      "dragstart",
      handleIngredientDragStart
    );

    card.addEventListener(
      "dragend",
      handleIngredientDragEnd
    );

    card.addEventListener(
      "click",
      () => {
        selectIngredientCard();
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

          selectIngredientCard();
        }
      }
    );

    ingredientStartTime =
      performance.now();

    ingredientTravelDuration =
      settings.travelSeconds *
      1000;

    animateIngredient();
  }

  function escapeHtml(value) {
    const temporary =
      document.createElement(
        "div"
      );

    temporary.textContent =
      String(value);

    return temporary.innerHTML;
  }

  function getIngredientIcon(category) {
    const lower =
      String(category).toLowerCase();

    if (
      lower.includes("color")
    ) {
      return "🎨";
    }

    if (
      lower.includes("animal") ||
      lower.includes("creature")
    ) {
      return "🐾";
    }

    if (
      lower.includes("space")
    ) {
      return "🚀";
    }

    if (
      lower.includes("technology")
    ) {
      return "💻";
    }

    if (
      lower.includes("hobby") ||
      lower.includes("talent") ||
      lower.includes("interest")
    ) {
      return "⭐";
    }

    if (
      lower.includes("name") ||
      lower.includes("birthday") ||
      lower.includes("age")
    ) {
      return "🪪";
    }

    if (
      lower.includes("school") ||
      lower.includes("grade")
    ) {
      return "🏫";
    }

    if (
      lower.includes("location") ||
      lower.includes("city") ||
      lower.includes("street") ||
      lower.includes("address")
    ) {
      return "📍";
    }

    if (
      lower.includes("password") ||
      lower.includes("code")
    ) {
      return "🔑";
    }

    return "🧩";
  }

  function animateIngredient() {
    cancelAnimationFrame(
      animationFrame
    );

    function frame(now) {
      if (
        !gameRunning ||
        !activeIngredientCard ||
        actionLocked
      ) {
        return;
      }

      const elapsed =
        now -
        ingredientStartTime;

      const progress =
        Math.min(
          1,
          elapsed /
          ingredientTravelDuration
        );

      activeIngredientCard.style.left =
        `${progress * 77}%`;

      if (
        progress >= 1
      ) {
        handleMissedIngredient();
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

  function selectIngredientCard() {
    if (
      !gameRunning ||
      actionLocked ||
      !activeIngredientCard
    ) {
      return;
    }

    ingredientSelected =
      !ingredientSelected;

    activeIngredientCard
      .classList.toggle(
        "selected-ingredient-card",
        ingredientSelected
      );

    setMeme(
      ingredientSelected
        ? "Ingredient selected!"
        : "Keep inspecting!",
      ingredientSelected
        ? "Now choose the Username Mixer or Identity Eject Bin."
        : "Catch the ingredient before it reaches contamination.",
      "thinking"
    );
  }

  function handleIngredientDragStart(
    event
  ) {
    if (
      !gameRunning ||
      actionLocked ||
      !activeIngredientCard
    ) {
      event.preventDefault();
      return;
    }

    ingredientSelected =
      true;

    activeIngredientCard
      .classList.add(
        "dragging"
      );

    if (
      event.dataTransfer
    ) {
      event.dataTransfer.effectAllowed =
        "move";

      event.dataTransfer.setData(
        "text/plain",
        activeIngredient
          ?.instanceId ||
        "username-ingredient"
      );
    }
  }

  function handleIngredientDragEnd() {
    activeIngredientCard
      ?.classList.remove(
        "dragging"
      );

    closeDropZones();
  }

  /* =====================================================
     DROP ZONES
  ===================================================== */

  function connectDropZone(
    zoneId,
    action
  ) {
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
          !activeIngredientCard ||
          actionLocked
        ) {
          return;
        }

        zone.classList.add(
          "drag-over"
        );
      }
    );

    zone.addEventListener(
      "dragover",
      (event) => {
        event.preventDefault();

        if (
          !activeIngredientCard ||
          actionLocked
        ) {
          return;
        }

        if (
          event.dataTransfer
        ) {
          event.dataTransfer.dropEffect =
            "move";
        }

        zone.classList.add(
          "drag-over"
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
      }
    );

    zone.addEventListener(
      "drop",
      (event) => {
        event.preventDefault();

        processIngredientAction(
          action,
          zone
        );
      }
    );

    zone.addEventListener(
      "click",
      () => {
        if (
          !ingredientSelected ||
          !activeIngredientCard
        ) {
          setMeme(
            "Select the ingredient first!",
            "Click the moving ingredient, then choose its destination.",
            "thinking"
          );

          return;
        }

        processIngredientAction(
          action,
          zone
        );
      }
    );
  }

  connectDropZone(
    "mixerDropZone",
    "mix"
  );

  connectDropZone(
    "ejectDropZone",
    "eject"
  );

  byId("sendToMixerButton")
    ?.addEventListener(
      "click",
      () => {
        if (!activeIngredientCard) {
          return;
        }

        ingredientSelected =
          true;

        processIngredientAction(
          "mix",
          byId("mixerDropZone")
        );
      }
    );

  byId("sendToEjectButton")
    ?.addEventListener(
      "click",
      () => {
        if (!activeIngredientCard) {
          return;
        }

        ingredientSelected =
          true;

        processIngredientAction(
          "eject",
          byId("ejectDropZone")
        );
      }
    );

  function closeDropZones() {
    document
      .querySelectorAll(
        ".username-destination"
      )
      .forEach((zone) => {
        zone.classList.remove(
          "drag-over"
        );
      });
  }

  /* =====================================================
     INGREDIENT ACTIONS
  ===================================================== */

  function processIngredientAction(
    action,
    selectedZone
  ) {
    if (
      !gameRunning ||
      actionLocked ||
      !activeIngredient ||
      !activeIngredientCard
    ) {
      return;
    }

    actionLocked =
      true;

    cancelAnimationFrame(
      animationFrame
    );

    closeDropZones();

    const correct =
      (
        activeIngredient.safe &&
        action === "mix"
      ) ||
      (
        !activeIngredient.safe &&
        action === "eject"
      );

    if (correct) {
      handleCorrectIngredient(
        action,
        selectedZone
      );
    } else {
      handleWrongIngredient(
        action,
        selectedZone
      );
    }

    updateHud();

    spawnTimeout =
      window.setTimeout(
        completeIngredient,
        850
      );
  }

  function handleCorrectIngredient(
    action,
    selectedZone
  ) {
    correctActions += 1;

    combo += 1;

    bestCombo =
      Math.max(
        bestCombo,
        combo
      );

    const earnedPoints =
      settings.basePoints *
      getComboMultiplier();

    score +=
      earnedPoints;

    selectedZone
      ?.classList.add(
        "correct-destination"
      );

    activeIngredientCard
      ?.classList.add(
        "ingredient-correct"
      );

    if (
      action === "mix"
    ) {
      safeIngredientsAccepted += 1;

      selectedIngredients.push(
        activeIngredient
      );

      updateMixer();

      showFeedback({
        correct: true,
        title:
          combo >= 4
            ? `${combo}x Lab Combo!`
            : "Safe ingredient added!",

        message:
          `${activeIngredient.explanation} ${activeIngredient.text} was added to the mixer.`,

        points:
          earnedPoints
      });

      setMeme(
        "Great ingredient!",
        `${activeIngredient.text} keeps the username creative without revealing identity.`,
        "congrats"
      );
    } else {
      dangerousIngredientsEjected += 1;

      byId("identityEjectBin")
        ?.classList.add(
          "eject-active"
        );

      showFeedback({
        correct: true,
        title:
          combo >= 4
            ? `${combo}x Lab Combo!`
            : "Identity clue ejected!",

        message:
          `${activeIngredient.explanation} It was safely removed from the machine.`,

        points:
          earnedPoints
      });

      setMeme(
        "Contamination removed!",
        `${activeIngredient.text} could have revealed personal information.`,
        "congrats"
      );
    }
  }

  function handleWrongIngredient(
    action,
    selectedZone
  ) {
    wrongActions += 1;

    combo =
      0;

    lives -= 1;

    selectedZone
      ?.classList.add(
        "wrong-destination"
      );

    activeIngredientCard
      ?.classList.add(
        "ingredient-wrong"
      );

    removeTime(
      selectedHeat === "hot"
        ? 5
        : 3
    );

    if (
      action === "mix"
    ) {
      showFeedback({
        correct: false,
        title:
          "Mixer contaminated!",

        message:
          `${activeIngredient.explanation} This ingredient should have been ejected.`,

        points: 0
      });

      setMeme(
        "That reveals too much!",
        `${activeIngredient.text} belongs in the Identity Eject Bin.`,
        "wrong"
      );
    } else {
      showFeedback({
        correct: false,
        title:
          "Safe ingredient discarded!",

        message:
          `${activeIngredient.explanation} This ingredient was safe for the Username Mixer.`,

        points: 0
      });

      setMeme(
        "That ingredient was safe!",
        `${activeIngredient.text} could have helped build a creative username.`,
        "wrong"
      );
    }

    if (
      lives <= 0
    ) {
      spawnTimeout =
        window.setTimeout(
          () => {
            endGame("lives");
          },
          700
        );
    }
  }

  function completeIngredient() {
    document
      .querySelectorAll(
        ".username-destination"
      )
      .forEach((zone) => {
        zone.classList.remove(
          "correct-destination",
          "wrong-destination"
        );
      });

    byId("identityEjectBin")
      ?.classList.remove(
        "eject-active"
      );

    const layer =
      byId("ingredientLayer");

    if (layer) {
      layer.innerHTML = "";
    }

    activeIngredient =
      null;

    activeIngredientCard =
      null;

    ingredientSelected =
      false;

    actionLocked =
      false;

    setText(
      "activeIngredientText",
      "Waiting for the machine..."
    );

    setText(
      "activeIngredientCategory",
      "Unknown"
    );

    if (
      !gameRunning ||
      lives <= 0
    ) {
      return;
    }

    spawnTimeout =
      window.setTimeout(
        spawnNextIngredient,
        settings.spawnDelay
      );
  }

  function handleMissedIngredient() {
    if (
      actionLocked ||
      !activeIngredient ||
      !gameRunning
    ) {
      return;
    }

    actionLocked =
      true;

    wrongActions += 1;

    combo =
      0;

    lives -= 1;

    activeIngredientCard
      ?.classList.add(
        "ingredient-missed"
      );

    byId("ingredientDangerGate")
      ?.classList.add(
        "contamination-hit"
      );

    showFeedback({
      correct: false,
      title:
        "Ingredient reached contamination!",

      message:
        `${activeIngredient.text} was not inspected in time.`,

      points: 0
    });

    setMeme(
      "The machine needs you!",
      "Catch the next ingredient before it reaches the Contamination Gate.",
      "wrong"
    );

    updateHud();

    spawnTimeout =
      window.setTimeout(
        () => {
          byId("ingredientDangerGate")
            ?.classList.remove(
              "contamination-hit"
            );

          if (
            lives <= 0
          ) {
            endGame("lives");
            return;
          }

          completeIngredient();
        },
        800
      );
  }

  /* =====================================================
     MIXER
  ===================================================== */

  function updateMixer() {
    const username =
      getCurrentUsername();

    setText(
      "currentUsername",
      username ||
      "No ingredients added"
    );

    setText(
      "mixerPreview",
      username ||
      "Empty"
    );

    setText(
      "recipeProgress",
      `${selectedIngredients.length} of ${settings.ingredientsNeeded} collected`
    );

    setText(
      "creativityLabel",
      getCreativityLabel()
    );

    const creativityFill =
      byId("creativityFill");

    if (creativityFill) {
      creativityFill.style.width =
        `${getCreativityPercent()}%`;
    }

    renderIngredientChips();

    const ready =
      selectedIngredients.length >=
      settings.ingredientsNeeded;

    const scanButton =
      byId("scanUsernameButton");

    if (scanButton) {
      scanButton.disabled =
        !ready;
    }

    if (ready) {
      setText(
        "scannerStatus",
        "Username Ready"
      );

      setText(
        "scannerMessage",
        "Run the safety scan"
      );

      byId("usernameMixer")
        ?.classList.add(
          "mixer-ready"
        );
    } else {
      setText(
        "scannerStatus",
        "Scanner Ready"
      );

      setText(
        "scannerMessage",
        "Build a username before scanning"
      );

      byId("usernameMixer")
        ?.classList.remove(
          "mixer-ready"
        );
    }
  }

  function getCreativityLabel() {
    const count =
      selectedIngredients.length;

    if (count === 0) {
      return "Empty";
    }

    if (
      count <
      settings.ingredientsNeeded
    ) {
      return "Building";
    }

    if (
      count ===
      settings.ingredientsNeeded
    ) {
      return "Powerful";
    }

    return "Maximum";
  }

  function renderIngredientChips() {
    const list =
      byId(
        "selectedIngredientList"
      );

    if (!list) {
      return;
    }

    list.innerHTML = "";

    if (
      selectedIngredients.length === 0
    ) {
      list.innerHTML = `
        <span class="empty-mixer-message">
          Add safe ingredients to begin
        </span>
      `;

      return;
    }

    selectedIngredients.forEach(
      (ingredient, index) => {
        const chip =
          document.createElement(
            "button"
          );

        chip.type =
          "button";

        chip.className =
          "selected-ingredient-chip";

        chip.innerHTML = `
          <span>
            ${escapeHtml(
              ingredient.text
            )}
          </span>

          <small>
            Remove
          </small>
        `;

        chip.addEventListener(
          "click",
          () => {
            removeMixerIngredient(
              index
            );
          }
        );

        list.appendChild(
          chip
        );
      }
    );
  }

  function removeMixerIngredient(index) {
    if (
      !gameRunning ||
      index < 0 ||
      index >=
        selectedIngredients.length
    ) {
      return;
    }

    selectedIngredients.splice(
      index,
      1
    );

    updateMixer();

    setMeme(
      "Ingredient removed.",
      "Keep building until the recipe is complete.",
      "thinking"
    );
  }

  function resetMixer() {
    selectedIngredients =
      [];

    updateMixer();
  }

  byId("clearMixerButton")
    ?.addEventListener(
      "click",
      () => {
        if (
          selectedIngredients.length ===
          0
        ) {
          return;
        }

        resetMixer();

        setMeme(
          "Mixer cleared!",
          "Start a fresh creative username recipe.",
          "thinking"
        );
      }
    );

  /* =====================================================
     USERNAME SCANNER
  ===================================================== */

  byId("scanUsernameButton")
    ?.addEventListener(
      "click",
      scanUsername
    );

  function scanUsername() {
    if (
      !gameRunning ||
      selectedIngredients.length <
        settings.ingredientsNeeded
    ) {
      return;
    }

    const username =
      getCurrentUsername();

    byId("usernameSafetyScanner")
      ?.classList.add(
        "scanner-running"
      );

    setText(
      "scannerStatus",
      "Scanning..."
    );

    setText(
      "scannerMessage",
      "Checking for identity clues"
    );

    window.setTimeout(
      () => {
        approveUsername(
          username
        );
      },
      900
    );
  }

  function approveUsername(username) {
    byId("usernameSafetyScanner")
      ?.classList.remove(
        "scanner-running"
      );

    usernamesBuilt += 1;

    const buildBonus =
      settings.basePoints *
      settings.ingredientsNeeded *
      2;

    const creativityBonus =
      new Set(
        selectedIngredients.map(
          (ingredient) =>
            ingredient.category
        )
      ).size *
      settings.basePoints;

    const comboBonus =
      bestCombo *
      settings.basePoints;

    const totalBuildPoints =
      buildBonus +
      creativityBonus +
      comboBonus;

    score +=
      totalBuildPoints;

    arcade.answerQuestion({
      questionId:
        `username-build-${usernamesBuilt}`,

      correct: true
    });

    setText(
      "approvedUsername",
      username
    );

    setText(
      "approvedUsernameMessage",
      "This username expresses creativity without using a real name, birthday, school, address, or account secret."
    );

    setText(
      "approvedPoints",
      `+${totalBuildPoints}`
    );

    setText(
      "scannerStatus",
      "Approved!"
    );

    setText(
      "scannerMessage",
      "Identity protected"
    );

    byId("usernameSuccessOverlay")
      ?.classList.remove(
        "hidden"
      );

    updateHud();
  }

  byId("continueBuildingButton")
    ?.addEventListener(
      "click",
      () => {
        byId("usernameSuccessOverlay")
          ?.classList.add(
            "hidden"
          );

        if (
          usernamesBuilt >=
          settings.usernameGoal
        ) {
          endGame("complete");
          return;
        }

        resetMixer();

        setMeme(
          "New recipe ready!",
          "Build another creative username without exposing identity clues.",
          "thinking"
        );
      }
    );

  /* =====================================================
     POWER-UPS
  ===================================================== */

  byId("ingredientScannerButton")
    ?.addEventListener(
      "click",
      () => {
        if (
          !gameRunning ||
          ingredientScannerUses <= 0 ||
          !activeIngredient
        ) {
          return;
        }

        ingredientScannerUses -= 1;

        setText(
          "ingredientScannerCount",
          `${ingredientScannerUses} available`
        );

        if (
          ingredientScannerUses <= 0
        ) {
          byId(
            "ingredientScannerButton"
          )?.setAttribute(
            "disabled",
            "disabled"
          );
        }

        setText(
          "activeIngredientCategory",
          activeIngredient.category
        );

        activeIngredientCard
          ?.classList.add(
            activeIngredient.safe
              ? "scanner-safe"
              : "scanner-danger"
          );

        setMeme(
          "Ingredient scan complete!",
          activeIngredient.safe
            ? `${activeIngredient.text} appears safe for the mixer.`
            : `${activeIngredient.text} contains an identity clue. Eject it!`,
          "thinking"
        );

        window.setTimeout(
          () => {
            activeIngredientCard
              ?.classList.remove(
                "scanner-safe",
                "scanner-danger"
              );
          },
          2200
        );
      }
    );

  byId("purifyButton")
    ?.addEventListener(
      "click",
      () => {
        if (
          !gameRunning ||
          purifyUses <= 0
        ) {
          return;
        }

        purifyUses -= 1;

        setText(
          "purifyCount",
          "0 available"
        );

        byId("purifyButton")
          ?.setAttribute(
            "disabled",
            "disabled"
          );

        resetMixer();

        byId("usernameMixer")
          ?.classList.add(
            "purify-active"
          );

        window.setTimeout(
          () => {
            byId("usernameMixer")
              ?.classList.remove(
                "purify-active"
              );
          },
          900
        );

        setMeme(
          "Mixer purified!",
          "The recipe has been cleared without losing a life.",
          "congrats"
        );
      }
    );

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
        2900
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
      "bestComboLive",
      `x${bestCombo}`
    );

    setText(
      "livesDisplay",
      lives > 0
        ? "❤️".repeat(lives)
        : "💔"
    );

    setText(
      "usernamesBuilt",
      usernamesBuilt
    );

    const percentage =
      (
        usernamesBuilt /
        settings.usernameGoal
      ) * 100;

    const progressFill =
      byId(
        "usernameProgressFill"
      );

    if (progressFill) {
      progressFill.style.width =
        `${Math.min(
          100,
          percentage
        )}%`;
    }

    updateGlobalPoints();
  }

  /* =====================================================
     END GAME
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

    clearInterval(
      timerInterval
    );

    cancelAnimationFrame(
      animationFrame
    );

    clearTimeout(
      spawnTimeout
    );

    clearTimeout(
      feedbackTimeout
    );

    byId("usernameSuccessOverlay")
      ?.classList.add(
        "hidden"
      );

    const totalActions =
      correctActions +
      wrongActions;

    const accuracy =
      totalActions > 0
        ? Math.round(
            (
              correctActions /
              totalActions
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
      `usernameLabBest-${selectedHeat}`;

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

    let starCount =
      1;

    if (
      usernamesBuilt >=
        settings.usernameGoal &&
      accuracy >= 90
    ) {
      starCount =
        3;
    } else if (
      usernamesBuilt >= 3 &&
      accuracy >= 65
    ) {
      starCount =
        2;
    }

    let rank =
      "Junior Username Builder";

    if (
      usernamesBuilt >=
        settings.usernameGoal &&
      accuracy >= 90 &&
      bestCombo >= 6
    ) {
      rank =
        "Master Identity Inventor";
    } else if (
      usernamesBuilt >= 4 &&
      accuracy >= 75
    ) {
      rank =
        "Senior Username Scientist";
    } else if (
      usernamesBuilt >= 3
    ) {
      rank =
        "Cyber Identity Engineer";
    }

    let heading =
      "Laboratory Complete";

    let message =
      "Creative usernames should avoid real names, birthdays, school names, locations, schedules, passwords, and contact information.";

    if (
      reason === "lives"
    ) {
      heading =
        "The Lab Was Contaminated";

      message =
        "Too many ingredients were placed in the wrong destination. Inspect each clue carefully before mixing or ejecting it.";
    } else if (
      reason === "time"
    ) {
      heading =
        "Laboratory Time Expired";

      message =
        "The machine shut down, but your completed usernames were saved. Try again and sort the ingredients faster.";
    } else if (
      usernamesBuilt >=
        settings.usernameGoal &&
      accuracy >= 90
    ) {
      heading =
        "Master Username Inventor!";

      message =
        "You built creative usernames while protecting every important identity clue.";
    } else if (
      usernamesBuilt >=
      settings.usernameGoal
    ) {
      heading =
        "Username Mission Complete!";

      message =
        "You completed every recipe. Play again to improve your accuracy and build a longer lab combo.";
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
      "finalUsernamesBuilt",
      `${usernamesBuilt}/${settings.usernameGoal}`
    );

    setText(
      "finalSafeIngredients",
      safeIngredientsAccepted
    );

    setText(
      "finalDangersEjected",
      dangerousIngredientsEjected
    );

    setText(
      "finalAccuracy",
      `${accuracy}%`
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
        starCount
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

        clearTimeout(
          spawnTimeout
        );

        clearTimeout(
          feedbackTimeout
        );

        byId("usernameSuccessOverlay")
          ?.classList.add(
            "hidden"
          );

        byId("ingredientLayer")
          ?.replaceChildren();

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
      "Username Lab machine engine loaded successfully."
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
