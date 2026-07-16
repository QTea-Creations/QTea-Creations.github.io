"use strict";

/* =========================================================
   SAFETII NET — IDENTITY ISLAND
   Progress Saving + Developer Testing Tools
========================================================= */

(() => {
  const game = window.IdentityGame;

  if (!game || !game.state) {
    console.error(
      "Identity progress could not load. Make sure this file loads after the other Identity Island files."
    );

    return;
  }

  const STORAGE_KEY = "safetiiIdentityProgress";

  const DEFAULT_PROGRESS = {
    started: false,
    completed: false,
    currentSection: "missionAlert",

    foundObjects: [],
    foundStickers: [],

    usernamesChecked: 0,

    practiceIndex: 0,
    practiceCorrect: 0,

    identityProfileIndex: 0,
    profilesProtected: 0,

    testIndex: 0,
    testCorrect: 0,
    testAnswered: false
  };

  /* -------------------------------------------------------
     STORAGE HELPERS
  ------------------------------------------------------- */

  function readSavedProgress() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (!saved) {
        return { ...DEFAULT_PROGRESS };
      }

      return {
        ...DEFAULT_PROGRESS,
        ...JSON.parse(saved)
      };
    } catch (error) {
      console.error(
        "Identity Island progress could not be read:",
        error
      );

      return { ...DEFAULT_PROGRESS };
    }
  }

  function saveProgress() {
    const state = game.state;

    const activeSection =
      document.querySelector(
        ".identity-stage > section:not(.hidden)"
      );

    const existing = readSavedProgress();

    const progress = {
      ...existing,

      started:
        existing.started ||
        state.foundObjects.size > 0 ||
        state.usernamesChecked > 0 ||
        state.practiceIndex > 0 ||
        state.profilesProtected > 0 ||
        state.testIndex > 0,

      completed:
        localStorage.getItem(
          "identityMissionCompleted"
        ) === "true",

      currentSection:
        activeSection?.id ||
        existing.currentSection ||
        "missionAlert",

      foundObjects:
        Array.from(state.foundObjects),

      foundStickers:
        Array.from(state.foundStickers),

      usernamesChecked:
        state.usernamesChecked,

      practiceIndex:
        state.practiceIndex,

      practiceCorrect:
        state.practiceCorrect,

      identityProfileIndex:
        state.identityProfileIndex,

      profilesProtected:
        state.profilesProtected,

      testIndex:
        state.testIndex,

      testCorrect:
        state.testCorrect,

      testAnswered:
        state.testAnswered
    };

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(progress)
    );

    /*
      Save stickers separately too, so the
      Cyber Notebook can read them immediately.
    */
    localStorage.setItem(
      "identityStickers",
      JSON.stringify(progress.foundStickers)
    );
  }

  function markMissionStarted() {
    const progress = readSavedProgress();

    progress.started = true;

    if (
      !progress.currentSection ||
      progress.currentSection === "missionAlert"
    ) {
      progress.currentSection = "exploreZone";
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(progress)
    );
  }

  /* -------------------------------------------------------
     RESTORE STATE
  ------------------------------------------------------- */

  function restoreState(progress) {
    const state = game.state;

    state.foundObjects =
      new Set(progress.foundObjects);

    state.foundStickers =
      new Set(progress.foundStickers);

    state.usernamesChecked =
      progress.usernamesChecked;

    state.practiceIndex =
      progress.practiceIndex;

    state.practiceCorrect =
      progress.practiceCorrect;

    state.identityProfileIndex =
      progress.identityProfileIndex;

    state.profilesProtected =
      progress.profilesProtected;

    state.testIndex =
      progress.testIndex;

    state.testCorrect =
      progress.testCorrect;

    state.testAnswered =
      progress.testAnswered;
  }

  function restoreCounters(progress) {
    const values = {
      objectsFound:
        progress.foundObjects.length,

      usernamesChecked:
        progress.usernamesChecked,

      practiceCorrect:
        progress.practiceCorrect,

      profilesProtected:
        progress.profilesProtected
    };

    Object.entries(values).forEach(
      ([id, value]) => {
        const element =
          document.getElementById(id);

        if (element) {
          element.textContent =
            String(value);
        }
      }
    );
  }

  function restoreExploredObjects(progress) {
    document
      .querySelectorAll(".island-object")
      .forEach((button) => {
        if (
          progress.foundObjects.includes(
            button.dataset.object
          )
        ) {
          button.classList.add(
            "discovered"
          );
        }
      });

    document
      .querySelectorAll(".sticker")
      .forEach((button) => {
        if (
          progress.foundStickers.includes(
            button.dataset.sticker
          )
        ) {
          button.classList.add(
            "collected"
          );

          button.textContent = "✨";
        }
      });
  }

  function restoreUnlockedButtons(progress) {
    const usernameButton =
      document.getElementById(
        "goUsernameLab"
      );

    if (
      usernameButton &&
      progress.foundObjects.length >= 6
    ) {
      usernameButton.disabled = false;

      usernameButton.classList.remove(
        "locked-action"
      );

      usernameButton.textContent =
        "Open Safe Username Lab 🧪";
    }

    const backpackButton =
      document.getElementById(
        "goBackpackRescue"
      );

    if (
      backpackButton &&
      progress.usernamesChecked >= 3
    ) {
      backpackButton.disabled = false;

      backpackButton.classList.remove(
        "locked-action"
      );

      backpackButton.textContent =
        "Start Backpack Rescue 🎒";
    }

    const finalButton =
      document.getElementById(
        "goFinalTest"
      );

    if (
      finalButton &&
      progress.profilesProtected >= 5
    ) {
      finalButton.disabled = false;

      finalButton.classList.remove(
        "locked-action"
      );

      finalButton.textContent =
        "Begin Identity Protector Final Test 🛡️";
    }
  }

  function restoreCurrentActivity(progress) {
    const section =
      progress.currentSection;

    if (
      !progress.started &&
      !progress.completed
    ) {
      game.showSection("missionAlert");
      return;
    }

    if (
      progress.completed
    ) {
      game.showSection("missionResult");
      return;
    }

    const validSections = [
      "missionAlert",
      "exploreZone",
      "usernameZone",
      "practiceZone",
      "identityCardZone",
      "testIntroZone",
      "testZone",
      "missionResult"
    ];

    const sectionToOpen =
      validSections.includes(section)
        ? section
        : "exploreZone";

    game.showSection(sectionToOpen);

    if (
      sectionToOpen === "practiceZone" &&
      typeof game.loadPractice ===
        "function"
    ) {
      game.loadPractice();
    }

    if (
      sectionToOpen ===
        "identityCardZone" &&
      typeof game.loadIdentityProfile ===
        "function"
    ) {
      game.loadIdentityProfile();
    }

    if (
      sectionToOpen ===
        "testIntroZone" &&
      typeof game.loadFinalTestHeroName ===
        "function"
    ) {
      game.loadFinalTestHeroName();
    }

    if (
      sectionToOpen === "testZone" &&
      typeof game.loadTest === "function"
    ) {
      game.loadTest();
    }
  }

  function restoreProgress() {
    const progress =
      readSavedProgress();

    restoreState(progress);
    restoreCounters(progress);
    restoreExploredObjects(progress);
    restoreUnlockedButtons(progress);
    restoreCurrentActivity(progress);
  }

  /* -------------------------------------------------------
     WRAP SECTION CHANGES SO THEY SAVE
  ------------------------------------------------------- */

  const originalShowSection =
    game.showSection.bind(game);

  game.showSection = function showAndSave(
    sectionId
  ) {
    originalShowSection(sectionId);

    const progress =
      readSavedProgress();

    progress.currentSection = sectionId;

    if (sectionId !== "missionAlert") {
      progress.started = true;
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(progress)
    );

    window.setTimeout(
      saveProgress,
      50
    );
  };

  /* -------------------------------------------------------
     DEVELOPER TESTING TOOLBAR
  ------------------------------------------------------- */

  function setDeveloperStep(step) {
    const state = game.state;

    switch (step) {
      case "intro":
        game.showSection("missionAlert");
        break;

      case "explore":
        markMissionStarted();
        game.showSection("exploreZone");
        break;

      case "username":
        state.foundObjects =
          new Set([
            "house",
            "school",
            "phone",
            "backpack",
            "pizza",
            "controller"
          ]);

        game.showSection("usernameZone");
        break;

      case "backpack":
        state.foundObjects =
          new Set([
            "house",
            "school",
            "phone",
            "backpack",
            "pizza",
            "controller"
          ]);

        state.usernamesChecked = 3;
        state.practiceIndex = 0;
        state.practiceCorrect = 0;

        game.showSection("practiceZone");

        if (
          typeof game.loadPractice ===
          "function"
        ) {
          game.loadPractice();
        }

        break;

      case "cards":
        state.foundObjects =
          new Set([
            "house",
            "school",
            "phone",
            "backpack",
            "pizza",
            "controller"
          ]);

        state.usernamesChecked = 3;

        state.practiceIndex =
          game.data.practiceQuestions.length;

        state.practiceCorrect =
          game.data.practiceQuestions.length;

        state.identityProfileIndex = 0;
        state.profilesProtected = 0;

        game.showSection(
          "identityCardZone"
        );

        if (
          typeof game.loadIdentityProfile ===
          "function"
        ) {
          game.loadIdentityProfile();
        }

        break;

      case "testIntro":
        state.foundObjects =
          new Set([
            "house",
            "school",
            "phone",
            "backpack",
            "pizza",
            "controller"
          ]);

        state.usernamesChecked = 3;

        state.practiceIndex =
          game.data.practiceQuestions.length;

        state.practiceCorrect =
          game.data.practiceQuestions.length;

        state.identityProfileIndex =
          game.data.identityProfiles.length;

        state.profilesProtected =
          game.data.identityProfiles.length;

        game.showSection(
          "testIntroZone"
        );

        if (
          typeof game.loadFinalTestHeroName ===
          "function"
        ) {
          game.loadFinalTestHeroName();
        }

        break;

      case "test":
        state.foundObjects =
          new Set([
            "house",
            "school",
            "phone",
            "backpack",
            "pizza",
            "controller"
          ]);

        state.usernamesChecked = 3;

        state.practiceCorrect =
          game.data.practiceQuestions.length;

        state.identityProfileIndex =
          game.data.identityProfiles.length;

        state.profilesProtected =
          game.data.identityProfiles.length;

        state.testIndex = 0;
        state.testCorrect = 0;
        state.testAnswered = false;

        game.showSection("testZone");

        if (
          typeof game.loadTest ===
          "function"
        ) {
          game.loadTest();
        }

        break;

      default:
        return;
    }

    restoreCounters({
      foundObjects:
        Array.from(state.foundObjects),

      usernamesChecked:
        state.usernamesChecked,

      practiceCorrect:
        state.practiceCorrect,

      profilesProtected:
        state.profilesProtected
    });

    restoreExploredObjects({
      foundObjects:
        Array.from(state.foundObjects),

      foundStickers:
        Array.from(state.foundStickers)
    });

    restoreUnlockedButtons({
      foundObjects:
        Array.from(state.foundObjects),

      usernamesChecked:
        state.usernamesChecked,

      profilesProtected:
        state.profilesProtected
    });

    saveProgress();
  }

  function createDeveloperToolbar() {
    const query =
      new URLSearchParams(
        window.location.search
      );

    const developerMode =
      query.get("dev") === "1" ||
      localStorage.getItem(
        "safetiiDeveloperMode"
      ) === "true";

    if (!developerMode) {
      return;
    }

    const toolbar =
      document.createElement("aside");

    toolbar.className =
      "identity-dev-toolbar";

    toolbar.innerHTML = `
      <strong>🛠 Mission Tester</strong>

      <button type="button" data-dev-step="intro">
        Intro
      </button>

      <button type="button" data-dev-step="explore">
        Explore
      </button>

      <button type="button" data-dev-step="username">
        Username Lab
      </button>

      <button type="button" data-dev-step="backpack">
        Backpack
      </button>

      <button type="button" data-dev-step="cards">
        ID Cards
      </button>

      <button type="button" data-dev-step="testIntro">
        Test Intro
      </button>

      <button type="button" data-dev-step="test">
        Test Questions
      </button>

      <button type="button" id="clearIdentityProgress">
        Reset Mission
      </button>
    `;

    document.body.appendChild(toolbar);

    toolbar
      .querySelectorAll(
        "[data-dev-step]"
      )
      .forEach((button) => {
        button.addEventListener(
          "click",
          () => {
            setDeveloperStep(
              button.dataset.devStep
            );
          }
        );
      });

    toolbar
      .querySelector(
        "#clearIdentityProgress"
      )
      .addEventListener(
        "click",
        () => {
          localStorage.removeItem(
            STORAGE_KEY
          );

          localStorage.removeItem(
            "identityMissionCompleted"
          );

          localStorage.removeItem(
            "identityBadgeEarned"
          );

          localStorage.removeItem(
            "identityStickers"
          );

          window.location.reload();
        }
      );
  }

  /* -------------------------------------------------------
     PUBLIC HELPERS
  ------------------------------------------------------- */

  game.saveIdentityProgress =
    saveProgress;

  game.getIdentityProgress =
    readSavedProgress;

  game.clearIdentityProgress =
    function clearIdentityProgress() {
      localStorage.removeItem(
        STORAGE_KEY
      );
    };

  /* -------------------------------------------------------
     START
  ------------------------------------------------------- */

  document.addEventListener(
    "DOMContentLoaded",
    () => {
      restoreProgress();
      createDeveloperToolbar();

      /*
        Save continuously during development.
        This also catches sticker clicks and game updates.
      */
      window.setInterval(
        saveProgress,
        750
      );

      window.addEventListener(
        "beforeunload",
        saveProgress
      );
    }
  );
})();
