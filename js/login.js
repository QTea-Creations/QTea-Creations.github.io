"use strict";

/* =========================================================
   SAFETII NET — HERO LOGIN
   COMPLETE HERO CREATOR AND HERO SELECTOR

   Features:
   - Creates multiple saved heroes
   - Generates safe Hero Names
   - Displays live suit, sidekick, and power previews
   - Switches between saved heroes
   - Preserves each hero’s mission progress
   - Deletes a selected hero
   - Keeps compatibility with existing "safetiiHero" storage
========================================================= */

(() => {
  /* =====================================================
     STORAGE KEYS
  ===================================================== */

  const STORAGE_KEYS = {
    activeHero:
      "safetiiHero",

    activeHeroId:
      "safetiiActiveHeroId",

    heroList:
      "safetiiHeroes",

    heroProfiles:
      "safetiiHeroProfiles"
  };


  /*
    These are the existing Safetii Net keys that belong
    to one hero’s progress.

    When heroes switch, the active hero's values are saved
    inside their profile. The selected hero's values are then
    restored.
  */

  const HERO_PROGRESS_KEYS = [
    "safetiiPoints",
    "safetiiGlobalPoints",
    "safetiiBadges",

    "safetiiIdentityProgress",
    "identityBadgeEarned",
    "identityMissionCompleted",
    "identityMissionRewardAwarded",
    "identityStickers",
    "identityCurrentStep",
    "identityFoundObjects",
    "identityUsernameProgress",
    "identityBackpackProgress",
    "identityProfileProgress",
    "identityTestProgress",

    "safetiiPasswordProgress",
    "passwordBadgeEarned",
    "passwordMissionCompleted",
    "passwordMissionRewardAwarded",
    "passwordReplayRequested",

    "safetiiPhishingProgress",
    "phishingBadgeEarned",
    "phishingMissionCompleted",
    "phishingMissionRewardAwarded",

    "safetiiFootprintProgress",
    "footprintBadgeEarned",
    "footprintMissionCompleted",
    "footprintMissionRewardAwarded",

    "safetiiResponderProgress",
    "responderBadgeEarned",
    "responderMissionCompleted",
    "responderMissionRewardAwarded"
  ];


  /* =====================================================
     HERO OPTIONS
  ===================================================== */

  const COLORS = [
    {
      label:
        "Purple",

      emoji:
        "💜",

      value:
        "#7d4cff",

      className:
        "hero-color-purple"
    },

    {
      label:
        "Cyan",

      emoji:
        "🩵",

      value:
        "#29bfd0",

      className:
        "hero-color-cyan"
    },

    {
      label:
        "Gold",

      emoji:
        "💛",

      value:
        "#f2c84b",

      className:
        "hero-color-gold"
    },

    {
      label:
        "Blue",

      emoji:
        "💙",

      value:
        "#4285f4",

      className:
        "hero-color-blue"
    },

    {
      label:
        "Green",

      emoji:
        "💚",

      value:
        "#35c783",

      className:
        "hero-color-green"
    },

    {
      label:
        "Pink",

      emoji:
        "🩷",

      value:
        "#ef71b8",

      className:
        "hero-color-pink"
    }
  ];


  const SIDEKICKS = [
    {
      label:
        "Fox",

      emoji:
        "🦊"
    },

    {
      label:
        "Owl",

      emoji:
        "🦉"
    },

    {
      label:
        "Turtle",

      emoji:
        "🐢"
    },

    {
      label:
        "Dolphin",

      emoji:
        "🐬"
    },

    {
      label:
        "Lion",

      emoji:
        "🦁"
    },

    {
      label:
        "Dragon",

      emoji:
        "🐉"
    }
  ];


  const POWERS = [
    {
      label:
        "Lightning",

      emoji:
        "⚡"
    },

    {
      label:
        "Shield",

      emoji:
        "🛡️"
    },

    {
      label:
        "Star",

      emoji:
        "⭐"
    },

    {
      label:
        "Tech",

      emoji:
        "💻"
    },

    {
      label:
        "Rocket",

      emoji:
        "🚀"
    },

    {
      label:
        "Detective",

      emoji:
        "🔎"
    }
  ];


  /* =====================================================
     HERO-NAME WORD BANKS
  ===================================================== */

  const HERO_TITLES = [
    "Captain",
    "Agent",
    "Commander",
    "Guardian",
    "Nova",
    "Quantum",
    "Spark",
    "Ultra",
    "Mega",
    "Mystic",
    "Turbo",
    "Cosmic"
  ];


  const HERO_WORDS = [
    "Orbit",
    "Comet",
    "Prism",
    "Pixel",
    "Echo",
    "Solar",
    "Lunar",
    "Neon",
    "Meteor",
    "Circuit",
    "Galaxy",
    "Aurora",
    "Nova",
    "Vortex",
    "Beacon",
    "Vector"
  ];


  /* =====================================================
     CREATOR STATE
  ===================================================== */

  const creatorState = {
    color:
      null,

    sidekick:
      null,

    power:
      null,

    name:
      "",

    id:
      ""
  };


  let heroPendingDeletionId =
    null;


  /* =====================================================
     BASIC HELPERS
  ===================================================== */

  function byId(id) {
    return document.getElementById(
      id
    );
  }


  function safelyReadJson(
    key,
    fallback
  ) {
    try {
      const value =
        localStorage.getItem(
          key
        );

      if (!value) {
        return fallback;
      }

      return JSON.parse(
        value
      );
    } catch (error) {
      console.error(
        `Could not read ${key}:`,
        error
      );

      return fallback;
    }
  }


  function safelyWriteJson(
    key,
    value
  ) {
    try {
      localStorage.setItem(
        key,
        JSON.stringify(
          value
        )
      );

      return true;
    } catch (error) {
      console.error(
        `Could not save ${key}:`,
        error
      );

      return false;
    }
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


  function showElement(
    elementOrId
  ) {
    const element =
      typeof elementOrId ===
        "string"
        ? byId(
            elementOrId
          )
        : elementOrId;

    element?.classList.remove(
      "hidden"
    );
  }


  function hideElement(
    elementOrId
  ) {
    const element =
      typeof elementOrId ===
        "string"
        ? byId(
            elementOrId
          )
        : elementOrId;

    element?.classList.add(
      "hidden"
    );
  }


  function createHeroId() {
    if (
      typeof crypto !==
        "undefined" &&
      typeof crypto.randomUUID ===
        "function"
    ) {
      return crypto.randomUUID();
    }

    return (
      "hero-" +
      Date.now() +
      "-" +
      Math.random()
        .toString(36)
        .slice(2, 10)
    );
  }


  function escapeHtml(value) {
    return String(
      value || ""
    )
      .replaceAll(
        "&",
        "&amp;"
      )
      .replaceAll(
        "<",
        "&lt;"
      )
      .replaceAll(
        ">",
        "&gt;"
      )
      .replaceAll(
        '"',
        "&quot;"
      )
      .replaceAll(
        "'",
        "&#039;"
      );
  }


  function randomItem(array) {
    return array[
      Math.floor(
        Math.random() *
          array.length
      )
    ];
  }


  function getLabel(
    selectedItem
  ) {
    return selectedItem
      ? `${selectedItem.emoji} ${selectedItem.label}`
      : "";
  }


  /* =====================================================
     HERO LIST AND PROFILES
  ===================================================== */

  function getHeroList() {
    const heroes =
      safelyReadJson(
        STORAGE_KEYS.heroList,
        []
      );

    return Array.isArray(
      heroes
    )
      ? heroes
      : [];
  }


  function saveHeroList(
    heroes
  ) {
    safelyWriteJson(
      STORAGE_KEYS.heroList,
      heroes
    );
  }


  function getHeroProfiles() {
    const profiles =
      safelyReadJson(
        STORAGE_KEYS.heroProfiles,
        {}
      );

    if (
      !profiles ||
      typeof profiles !==
        "object" ||
      Array.isArray(
        profiles
      )
    ) {
      return {};
    }

    return profiles;
  }


  function saveHeroProfiles(
    profiles
  ) {
    safelyWriteJson(
      STORAGE_KEYS.heroProfiles,
      profiles
    );
  }


  function getActiveHeroId() {
    return localStorage.getItem(
      STORAGE_KEYS.activeHeroId
    );
  }


  /* =====================================================
     LEGACY HERO MIGRATION
  ===================================================== */

  function migrateExistingHero() {
    const heroes =
      getHeroList();

    if (
      heroes.length >
      0
    ) {
      return;
    }

    const oldHero =
      safelyReadJson(
        STORAGE_KEYS.activeHero,
        null
      );

    if (
      !oldHero ||
      typeof oldHero !==
        "object" ||
      !(
        oldHero.name ||
        oldHero.heroName
      )
    ) {
      return;
    }

    const migratedHero = {
      id:
        oldHero.id ||
        createHeroId(),

      name:
        oldHero.name ||
        oldHero.heroName ||
        "Cyber Hero",

      color:
        oldHero.color ||
        "",

      colorLabel:
        extractPlainLabel(
          oldHero.color
        ),

      colorEmoji:
        extractEmoji(
          oldHero.color
        ),

      colorValue:
        findColorValue(
          oldHero.color
        ),

      sidekick:
        oldHero.animal ||
        oldHero.sidekick ||
        "",

      sidekickLabel:
        extractPlainLabel(
          oldHero.animal ||
          oldHero.sidekick
        ),

      sidekickEmoji:
        extractEmoji(
          oldHero.animal ||
          oldHero.sidekick
        ),

      power:
        oldHero.power ||
        "",

      powerLabel:
        extractPlainLabel(
          oldHero.power
        ),

      powerEmoji:
        extractEmoji(
          oldHero.power
        ),

      createdAt:
        Date.now(),

      updatedAt:
        Date.now()
    };

    saveHeroList([
      migratedHero
    ]);

    localStorage.setItem(
      STORAGE_KEYS.activeHeroId,
      migratedHero.id
    );

    saveCurrentProgressToProfile(
      migratedHero.id
    );
  }


  function extractPlainLabel(
    value
  ) {
    return String(
      value || ""
    )
      .replace(
        /[^\p{L}\p{N}\s-]/gu,
        ""
      )
      .trim();
  }


  function extractEmoji(
    value
  ) {
    const stringValue =
      String(
        value || ""
      );

    const knownItems = [
      ...COLORS,
      ...SIDEKICKS,
      ...POWERS
    ];

    const match =
      knownItems.find(
        (item) =>
          stringValue.includes(
            item.emoji
          )
      );

    return match?.emoji ||
      "";
  }


  function findColorValue(
    value
  ) {
    const normalized =
      String(
        value || ""
      ).toLowerCase();

    const match =
      COLORS.find(
        (color) =>
          normalized.includes(
            color.label.toLowerCase()
          )
      );

    return match?.value ||
      "#7d4cff";
  }


  /* =====================================================
     PER-HERO PROGRESS
  ===================================================== */

  function captureCurrentProgress() {
    const progress = {};

    HERO_PROGRESS_KEYS.forEach(
      (key) => {
        const value =
          localStorage.getItem(
            key
          );

        if (
          value !==
          null
        ) {
          progress[key] =
            value;
        }
      }
    );

    return progress;
  }


  function clearActiveProgress() {
    HERO_PROGRESS_KEYS.forEach(
      (key) => {
        localStorage.removeItem(
          key
        );
      }
    );
  }


  function saveCurrentProgressToProfile(
    heroId
  ) {
    if (!heroId) {
      return;
    }

    const profiles =
      getHeroProfiles();

    profiles[heroId] = {
      progress:
        captureCurrentProgress(),

      savedAt:
        Date.now()
    };

    saveHeroProfiles(
      profiles
    );
  }


  function restoreHeroProgress(
    heroId
  ) {
    clearActiveProgress();

    const profiles =
      getHeroProfiles();

    const profile =
      profiles[heroId];

    if (
      !profile ||
      typeof profile !==
        "object" ||
      !profile.progress
    ) {
      localStorage.setItem(
        "safetiiPoints",
        "0"
      );

      localStorage.setItem(
        "safetiiGlobalPoints",
        "0"
      );

      safelyWriteJson(
        "safetiiBadges",
        []
      );

      return;
    }

    Object.entries(
      profile.progress
    ).forEach(
      ([
        key,
        value
      ]) => {
        if (
          typeof value ===
            "string"
        ) {
          localStorage.setItem(
            key,
            value
          );
        }
      }
    );
  }


  function saveActiveHeroProgress() {
    const activeHeroId =
      getActiveHeroId();

    if (activeHeroId) {
      saveCurrentProgressToProfile(
        activeHeroId
      );
    }
  }


  /* =====================================================
     HERO CHOICE BUTTONS
  ===================================================== */

  function createChoiceButtons({
    containerId,
    items,
    stateKey
  }) {
    const container =
      byId(
        containerId
      );

    if (!container) {
      return;
    }

    container.innerHTML =
      "";

    items.forEach(
      (item) => {
        const button =
          document.createElement(
            "button"
          );

        button.type =
          "button";

        button.className =
          "choice-button";

        button.dataset.value =
          item.label;

        button.innerHTML =
          `
            <span aria-hidden="true">
              ${escapeHtml(item.emoji)}
            </span>

            <strong>
              ${escapeHtml(item.label)}
            </strong>
          `;

        button.addEventListener(
          "click",
          () => {
            selectChoice({
              container,
              button,
              stateKey,
              item
            });
          }
        );

        container.appendChild(
          button
        );
      }
    );
  }


  function selectChoice({
    container,
    button,
    stateKey,
    item
  }) {
    creatorState[stateKey] =
      item;

    container
      .querySelectorAll(
        ".choice-button"
      )
      .forEach(
        (choiceButton) => {
          choiceButton.classList.remove(
            "selected"
          );

          choiceButton.setAttribute(
            "aria-pressed",
            "false"
          );
        }
      );

    button.classList.add(
      "selected"
    );

    button.setAttribute(
      "aria-pressed",
      "true"
    );

    creatorState.name =
      "";

    setText(
      "heroName",
      "Your Hero Name"
    );

    updateHeroPreview();

    updateCreatorProgress();

    updateActionButtons();
  }


  /* =====================================================
     LIVE HERO PREVIEW
  ===================================================== */

  function updateHeroPreview() {
    setText(
      "chosenColor",
      creatorState.color
        ? getLabel(
            creatorState.color
          )
        : "Choose a color"
    );

    setText(
      "chosenAnimal",
      creatorState.sidekick
        ? getLabel(
            creatorState.sidekick
          )
        : "Choose a sidekick"
    );

    setText(
      "chosenPower",
      creatorState.power
        ? getLabel(
            creatorState.power
          )
        : "Choose a power"
    );


    const avatar =
      byId(
        "heroPreviewAvatar"
      );

    if (
      avatar &&
      creatorState.color
    ) {
      avatar.style.background =
        `
          linear-gradient(
            180deg,
            ${creatorState.color.value}22,
            #e9faff
          )
        `;

      avatar.style.borderColor =
        creatorState.color.value;
    }


    const sidekickIcon =
      byId(
        "heroPreviewSidekickIcon"
      );

    if (sidekickIcon) {
      sidekickIcon.textContent =
        creatorState.sidekick
          ? creatorState.sidekick
              .emoji
          : "?";
    }


    const suitIcon =
      byId(
        "heroPreviewSuitIcon"
      );

    if (suitIcon) {
      suitIcon.textContent =
        creatorState.power
          ? getPowerHeroIcon(
              creatorState.power
                .label
            )
          : "🦸";
    }
  }


  function getPowerHeroIcon(
    powerLabel
  ) {
    const icons = {
      Lightning:
        "⚡",

      Shield:
        "🛡️",

      Star:
        "🌟",

      Tech:
        "🤖",

      Rocket:
        "🚀",

      Detective:
        "🕵️"
    };

    return icons[
      powerLabel
    ] || "🦸";
  }


  /* =====================================================
     HERO NAME GENERATION
  ===================================================== */

  function allCreatorChoicesSelected() {
    return Boolean(
      creatorState.color &&
      creatorState.sidekick &&
      creatorState.power
    );
  }


  function generateHeroName() {
    if (
      !allCreatorChoicesSelected()
    ) {
      showCreatorMessage(
        "Choose a suit color, sidekick, and cyber power first.",
        false
      );

      return;
    }

    const powerName =
      creatorState.power.label;

    const sidekickName =
      creatorState.sidekick.label;

    const title =
      randomItem(
        HERO_TITLES
      );

    const heroWord =
      randomItem(
        HERO_WORDS
      );

    const namePatterns = [
      `${title} ${powerName}`,
      `${title} ${sidekickName}`,
      `${heroWord} ${sidekickName}`,
      `${powerName} ${heroWord}`,
      `${title} ${heroWord}`,
      `${heroWord} ${powerName}`
    ];

    creatorState.name =
      randomItem(
        namePatterns
      );

    setText(
      "heroName",
      creatorState.name
    );

    showCreatorMessage(
      `${creatorState.name} is ready for registration.`,
      true
    );

    updateCreatorProgress();

    updateActionButtons();
  }


  function showCreatorMessage(
    message,
    positive
  ) {
    const safetyBox =
      byId(
        "heroNameSafety"
      );

    if (!safetyBox) {
      return;
    }

    const paragraph =
      safetyBox.querySelector(
        "p"
      );

    if (paragraph) {
      paragraph.textContent =
        message;
    }

    safetyBox.classList.toggle(
      "hero-name-ready",
      positive
    );
  }


  /* =====================================================
     CREATOR PROGRESS
  ===================================================== */

  function updateCreatorProgress() {
    const steps = [
      {
        id:
          "creatorProgressColor",

        complete:
          Boolean(
            creatorState.color
          )
      },

      {
        id:
          "creatorProgressSidekick",

        complete:
          Boolean(
            creatorState.sidekick
          )
      },

      {
        id:
          "creatorProgressPower",

        complete:
          Boolean(
            creatorState.power
          )
      },

      {
        id:
          "creatorProgressName",

        complete:
          Boolean(
            creatorState.name
          )
      }
    ];


    let firstIncompleteFound =
      false;


    steps.forEach(
      (
        step,
        index
      ) => {
        const element =
          byId(
            step.id
          );

        if (!element) {
          return;
        }

        element.classList.remove(
          "active",
          "complete"
        );

        if (
          step.complete
        ) {
          element.classList.add(
            "complete"
          );

          element.textContent =
            "✓";

          return;
        }

        element.textContent =
          String(
            index +
              1
          );

        if (
          !firstIncompleteFound
        ) {
          element.classList.add(
            "active"
          );

          firstIncompleteFound =
            true;
        }
      }
    );
  }


  function updateActionButtons() {
    const generateButton =
      byId(
        "generateHero"
      );

    const saveButton =
      byId(
        "saveHero"
      );

    if (generateButton) {
      generateButton.disabled =
        !allCreatorChoicesSelected();

      generateButton.textContent =
        creatorState.name
          ? "Generate Another Hero Name"
          : "Generate Hero Name";
    }

    if (saveButton) {
      saveButton.disabled =
        !(
          allCreatorChoicesSelected() &&
          creatorState.name
        );
    }
  }


  /* =====================================================
     SAVE NEW HERO
  ===================================================== */

  function saveNewHero() {
    if (
      !allCreatorChoicesSelected() ||
      !creatorState.name
    ) {
      showCreatorMessage(
        "Complete all four Hero Creator steps before saving.",
        false
      );

      return;
    }


    saveActiveHeroProgress();


    const heroId =
      createHeroId();


    const hero = {
      id:
        heroId,

      name:
        creatorState.name,

      color:
        getLabel(
          creatorState.color
        ),

      colorLabel:
        creatorState.color.label,

      colorEmoji:
        creatorState.color.emoji,

      colorValue:
        creatorState.color.value,

      animal:
        getLabel(
          creatorState.sidekick
        ),

      sidekick:
        getLabel(
          creatorState.sidekick
        ),

      sidekickLabel:
        creatorState.sidekick
          .label,

      sidekickEmoji:
        creatorState.sidekick
          .emoji,

      power:
        getLabel(
          creatorState.power
        ),

      powerLabel:
        creatorState.power.label,

      powerEmoji:
        creatorState.power.emoji,

      createdAt:
        Date.now(),

      updatedAt:
        Date.now()
    };


    const heroes =
      getHeroList();

    heroes.push(
      hero
    );

    saveHeroList(
      heroes
    );


    clearActiveProgress();

    localStorage.setItem(
      "safetiiPoints",
      "0"
    );

    localStorage.setItem(
      "safetiiGlobalPoints",
      "0"
    );

    safelyWriteJson(
      "safetiiBadges",
      []
    );


    localStorage.setItem(
      STORAGE_KEYS.activeHeroId,
      heroId
    );

    safelyWriteJson(
      STORAGE_KEYS.activeHero,
      hero
    );


    saveCurrentProgressToProfile(
      heroId
    );


    window.location.href =
      "dashboard.html";
  }


  /* =====================================================
     SAVED HERO CARDS
  ===================================================== */

  function renderSavedHeroes() {
    const grid =
      byId(
        "savedHeroGrid"
      );

    const section =
      byId(
        "savedHeroesSection"
      );

    if (
      !grid ||
      !section
    ) {
      return;
    }


    const heroes =
      getHeroList();


    if (
      heroes.length ===
      0
    ) {
      grid.innerHTML =
        `
          <article
            class="no-saved-heroes"
            id="noSavedHeroes"
          >
            <span aria-hidden="true">
              🪪
            </span>

            <h3>
              No saved heroes yet
            </h3>

            <p>
              Create your first Cyber Hero below.
            </p>
          </article>
        `;

      return;
    }


    const activeHeroId =
      getActiveHeroId();


    grid.innerHTML =
      "";


    heroes.forEach(
      (hero) => {
        const card =
          document.createElement(
            "article"
          );

        card.className =
          "saved-hero-card";

        if (
          hero.id ===
          activeHeroId
        ) {
          card.classList.add(
            "active-saved-hero"
          );
        }


        const sidekick =
          hero.sidekickEmoji ||
          extractEmoji(
            hero.sidekick ||
            hero.animal
          ) ||
          "🦸";


        const power =
          hero.powerEmoji ||
          extractEmoji(
            hero.power
          ) ||
          "⭐";


        const colorLabel =
          hero.colorLabel ||
          extractPlainLabel(
            hero.color
          ) ||
          "Hero Color";


        card.innerHTML =
          `
            <div
              class="saved-hero-avatar"
              style="
                border-color:
                  ${escapeHtml(
                    hero.colorValue ||
                      findColorValue(
                        hero.color
                      )
                  )};
              "
            >
              <span aria-hidden="true">
                ${escapeHtml(power)}
              </span>
            </div>

            <h3>
              ${escapeHtml(
                hero.name ||
                  "Cyber Hero"
              )}
            </h3>

            <p>
              <strong>
                Suit:
              </strong>

              ${escapeHtml(
                colorLabel
              )}
            </p>

            <p>
              <strong>
                Sidekick:
              </strong>

              ${escapeHtml(sidekick)}
              ${escapeHtml(
                hero.sidekickLabel ||
                  extractPlainLabel(
                    hero.sidekick ||
                      hero.animal
                  )
              )}
            </p>

            <p>
              <strong>
                Power:
              </strong>

              ${escapeHtml(
                hero.powerLabel ||
                  extractPlainLabel(
                    hero.power
                  )
              )}
            </p>

            ${
              hero.id ===
              activeHeroId
                ? `
                  <p class="active-hero-label">
                    Active Hero
                  </p>
                `
                : ""
            }

            <div class="saved-hero-actions">

              <button
                class="select-saved-hero"
                type="button"
                data-select-hero="${escapeHtml(
                  hero.id
                )}"
              >
                ${
                  hero.id ===
                  activeHeroId
                    ? "Enter Headquarters"
                    : "Choose Hero"
                }
              </button>

              <button
                class="delete-saved-hero"
                type="button"
                data-delete-hero="${escapeHtml(
                  hero.id
                )}"
              >
                Delete
              </button>

            </div>
          `;


        grid.appendChild(
          card
        );
      }
    );


    bindSavedHeroButtons();
  }


  function bindSavedHeroButtons() {
    document
      .querySelectorAll(
        "[data-select-hero]"
      )
      .forEach(
        (button) => {
          button.addEventListener(
            "click",
            () => {
              selectSavedHero(
                button.dataset
                  .selectHero
              );
            }
          );
        }
      );


    document
      .querySelectorAll(
        "[data-delete-hero]"
      )
      .forEach(
        (button) => {
          button.addEventListener(
            "click",
            () => {
              openDeleteHeroDialog(
                button.dataset
                  .deleteHero
              );
            }
          );
        }
      );
  }


  /* =====================================================
     SELECT SAVED HERO
  ===================================================== */

  function selectSavedHero(
    heroId
  ) {
    const heroes =
      getHeroList();

    const selectedHero =
      heroes.find(
        (hero) =>
          hero.id ===
          heroId
      );

    if (!selectedHero) {
      return;
    }


    const currentHeroId =
      getActiveHeroId();


    if (
      currentHeroId &&
      currentHeroId !==
        heroId
    ) {
      saveCurrentProgressToProfile(
        currentHeroId
      );
    }


    restoreHeroProgress(
      heroId
    );


    localStorage.setItem(
      STORAGE_KEYS.activeHeroId,
      heroId
    );

    safelyWriteJson(
      STORAGE_KEYS.activeHero,
      selectedHero
    );


    window.location.href =
      "dashboard.html";
  }


  /* =====================================================
     DELETE HERO
  ===================================================== */

  function openDeleteHeroDialog(
    heroId
  ) {
    heroPendingDeletionId =
      heroId;


    const heroes =
      getHeroList();

    const hero =
      heroes.find(
        (item) =>
          item.id ===
          heroId
      );


    setText(
      "heroDeleteTitle",
      hero?.name
        ? `Delete ${hero.name}?`
        : "Delete This Hero?"
    );


    const dialog =
      byId(
        "heroDeleteDialog"
      );


    if (
      dialog &&
      typeof dialog.showModal ===
        "function"
    ) {
      dialog.showModal();

      return;
    }


    const confirmed =
      window.confirm(
        "Delete this saved hero?"
      );


    if (confirmed) {
      deletePendingHero();
    }
  }


  function deletePendingHero() {
    if (
      !heroPendingDeletionId
    ) {
      return;
    }


    const deletingHeroId =
      heroPendingDeletionId;


    let heroes =
      getHeroList();


    heroes =
      heroes.filter(
        (hero) =>
          hero.id !==
          deletingHeroId
      );


    saveHeroList(
      heroes
    );


    const profiles =
      getHeroProfiles();

    delete profiles[
      deletingHeroId
    ];

    saveHeroProfiles(
      profiles
    );


    const activeHeroId =
      getActiveHeroId();


    if (
      activeHeroId ===
      deletingHeroId
    ) {
      clearActiveProgress();

      localStorage.removeItem(
        STORAGE_KEYS.activeHeroId
      );

      localStorage.removeItem(
        STORAGE_KEYS.activeHero
      );


      const nextHero =
        heroes[0];


      if (nextHero) {
        restoreHeroProgress(
          nextHero.id
        );

        localStorage.setItem(
          STORAGE_KEYS.activeHeroId,
          nextHero.id
        );

        safelyWriteJson(
          STORAGE_KEYS.activeHero,
          nextHero
        );
      }
    }


    heroPendingDeletionId =
      null;


    byId(
      "heroDeleteDialog"
    )?.close();


    renderSavedHeroes();
  }


  /* =====================================================
     RESET CREATOR
  ===================================================== */

  function resetCreator() {
    creatorState.color =
      null;

    creatorState.sidekick =
      null;

    creatorState.power =
      null;

    creatorState.name =
      "";


    document
      .querySelectorAll(
        ".choice-button"
      )
      .forEach(
        (button) => {
          button.classList.remove(
            "selected"
          );

          button.setAttribute(
            "aria-pressed",
            "false"
          );
        }
      );


    setText(
      "heroName",
      "Your Hero Name"
    );


    const avatar =
      byId(
        "heroPreviewAvatar"
      );

    if (avatar) {
      avatar.removeAttribute(
        "style"
      );
    }


    showCreatorMessage(
      "Hero Names should not include real names, birthdays, schools, addresses, or locations.",
      false
    );


    updateHeroPreview();

    updateCreatorProgress();

    updateActionButtons();
  }


  function scrollToCreator() {
    showElement(
      "heroCreatorSection"
    );

    byId(
      "heroCreatorSection"
    )?.scrollIntoView({
      behavior:
        "smooth",

      block:
        "start"
    });
  }


  /* =====================================================
     DIALOG EVENTS
  ===================================================== */

  function bindDeleteDialog() {
    const dialog =
      byId(
        "heroDeleteDialog"
      );


    byId(
      "cancelHeroDelete"
    )?.addEventListener(
      "click",
      () => {
        heroPendingDeletionId =
          null;

        dialog?.close();
      }
    );


    byId(
      "confirmHeroDelete"
    )?.addEventListener(
      "click",
      deletePendingHero
    );


    dialog?.addEventListener(
      "click",
      (event) => {
        if (
          event.target ===
          dialog
        ) {
          heroPendingDeletionId =
            null;

          dialog.close();
        }
      }
    );
  }


  /* =====================================================
     PAGE EVENTS
  ===================================================== */

  function bindPageEvents() {
    byId(
      "generateHero"
    )?.addEventListener(
      "click",
      generateHeroName
    );


    byId(
      "saveHero"
    )?.addEventListener(
      "click",
      saveNewHero
    );


    byId(
      "resetHeroCreator"
    )?.addEventListener(
      "click",
      resetCreator
    );


    byId(
      "showHeroCreator"
    )?.addEventListener(
      "click",
      scrollToCreator
    );


    bindDeleteDialog();


    window.addEventListener(
      "pagehide",
      () => {
        saveActiveHeroProgress();
      }
    );
  }


  /* =====================================================
     INITIALIZATION
  ===================================================== */

  function initializeLoginPage() {
    migrateExistingHero();


    createChoiceButtons({
      containerId:
        "colorChoices",

      items:
        COLORS,

      stateKey:
        "color"
    });


    createChoiceButtons({
      containerId:
        "animalChoices",

      items:
        SIDEKICKS,

      stateKey:
        "sidekick"
    });


    createChoiceButtons({
      containerId:
        "powerChoices",

      items:
        POWERS,

      stateKey:
        "power"
    });


    bindPageEvents();


    renderSavedHeroes();


    resetCreator();


    const heroes =
      getHeroList();


    if (
      heroes.length >
      0
    ) {
      showElement(
        "savedHeroesSection"
      );
    }


    console.log(
      "Safetii Net Hero Login loaded."
    );
  }


  if (
    document.readyState ===
    "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      initializeLoginPage,
      {
        once:
          true
      }
    );
  } else {
    initializeLoginPage();
  }
})();
