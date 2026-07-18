"use strict";

/* =========================================================
   SAFETII NET — IDENTITY ISLAND
   Progress Saving, Restoration, and Testing Tools
========================================================= */

(() => {
  const game = window.IdentityGame;

  if (!game || !game.state) {
    console.error(
      "Identity progress could not load. Check the script order."
    );

    return;
  }

  const STORAGE_KEY =
    "safetiiIdentityProgress";

const VALID_SECTIONS = [
  "missionAlert",
  "exploreZone",

  "piecesOfMeZone",
  "trustCircleZone",
  "clueCollectorZone",
  "impostorZone",

  "usernameZone",
  "practiceZone",
  "identityCardZone",
  "testIntroZone",
  "testZone",
  "missionResult"
];

  const DEFAULT_PROGRESS = {
    version: 2,

    started: false,
    completed: false,

    currentSection:
      "missionAlert",

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

  let restorationComplete = false;
  let saveTimer = null;

  function cloneDefaultProgress() {
    return {
      ...DEFAULT_PROGRESS,
      foundObjects: [],
      foundStickers: []
    };
  }

  function readSavedProgress() {
    try {
      const rawProgress =
        localStorage.getItem(
          STORAGE_KEY
        );

      if (!rawProgress) {
        return cloneDefaultProgress();
      }

      const parsedProgress =
        JSON.parse(rawProgress);

      return {
        ...cloneDefaultProgress(),
        ...parsedProgress,

        foundObjects:
          Array.isArray(
            parsedProgress.foundObjects
          )
            ? parsedProgress.foundObjects
            : [],

        foundStickers:
          Array.isArray(
            parsedProgress.foundStickers
          )
            ? parsedProgress.foundStickers
            : []
      };
    } catch (error) {
      console.error(
        "Could not read Identity Island progress:",
        error
      );

      return cloneDefaultProgress();
    }
  }

  function getVisibleSectionId() {
    const visibleSection =
      VALID_SECTIONS.find(
        (sectionId) => {
          const section =
            document.getElementById(
              sectionId
            );

          return (
            section &&
            !section.classList.contains(
              "hidden"
            )
          );
        }
      );

    return (
      visibleSection ||
      "missionAlert"
    );
  }

  function saveProgress() {
    if (!restorationComplete) {
      return;
    }

    const state = game.state;
    const previous =
      readSavedProgress();

    const currentSection =
      getVisibleSectionId();

    const started =
      previous.started ||
      currentSection !==
        "missionAlert" ||
      state.foundObjects.size > 0 ||
      state.usernamesChecked > 0 ||
      state.practiceIndex > 0 ||
      state.profilesProtected > 0 ||
      state.testIndex > 0;

    const completed =
      localStorage.getItem(
        "identityMissionCompleted"
      ) === "true";

    const progress = {
      version: 2,

      started,
      completed,

      currentSection,

      foundObjects:
        Array.from(
          state.foundObjects
        ),

      foundStickers:
        Array.from(
          state.foundStickers
        ),

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
      The notebook reads this key too.
    */
    localStorage.setItem(
      "identityStickers",
      JSON.stringify(
        progress.foundStickers
      )
    );
  }

  function scheduleSave() {
    window.clearTimeout(saveTimer);

    saveTimer = window.setTimeout(
      saveProgress,
      150
    );
  }

  function restoreMissionState(progress) {
    const state = game.state;

    state.foundObjects =
      new Set(
        progress.foundObjects
      );

    state.foundStickers =
      new Set(
        progress.foundStickers
      );

    state.usernamesChecked =
      Math.max(
        0,
        Number(
          progress.usernamesChecked
        ) || 0
      );

    state.practiceIndex =
      Math.max(
        0,
        Number(
          progress.practiceIndex
        ) || 0
      );

    state.practiceCorrect =
      Math.max(
        0,
        Number(
          progress.practiceCorrect
        ) || 0
      );

    state.identityProfileIndex =
      Math.max(
        0,
        Number(
          progress.identityProfileIndex
        ) || 0
      );

    state.profilesProtected =
      Math.max(
        0,
        Number(
          progress.profilesProtected
        ) || 0
      );

    state.testIndex =
      Math.max(
        0,
        Number(
          progress.testIndex
        ) || 0
      );

    state.testCorrect =
      Math.max(
        0,
        Number(
          progress.testCorrect
        ) || 0
      );

    state.testAnswered =
      Boolean(
        progress.testAnswered
      );

    /*
      Temporary interaction state should not
      be restored halfway through a click.
    */
    state.practiceAnswered = false;
    state.usernameAwaitingApproval = false;
    state.selectedRepairBlocks = [];
    state.profileRepairComplete = false;
  }

  function restoreCounters(progress) {
    const counterValues = {
      objectsFound:
        progress.foundObjects.length,

      usernamesChecked:
        progress.usernamesChecked,

      practiceCorrect:
        progress.practiceCorrect,

      profilesProtected:
        progress.profilesProtected
    };

    Object.entries(
      counterValues
    ).forEach(([id, value]) => {
      const element =
        document.getElementById(id);

      if (element) {
        element.textContent =
          String(value);
      }
    });
  }

  function restoreIslandObjects(
    progress
  ) {
    document
      .querySelectorAll(
        ".island-object"
      )
      .forEach((button) => {
        const wasFound =
          progress.foundObjects.includes(
            button.dataset.object
          );

        button.classList.toggle(
          "discovered",
          wasFound
        );
      });

    document
      .querySelectorAll(".sticker")
      .forEach((button) => {
        const wasFound =
          progress.foundStickers.includes(
            button.dataset.sticker
          );

        button.classList.toggle(
          "collected",
          wasFound
        );

        button.textContent =
          wasFound ? "✨" : "⭐";
      });
  }

  function restoreUnlockedButtons(
    progress
  ) {
    const usernameButton =
      document.getElementById(
        "goUsernameLab"
      );

    if (usernameButton) {
      const isUnlocked =
        progress.foundObjects.length >=
        6;

      usernameButton.disabled =
        !isUnlocked;

      usernameButton.classList.toggle(
        "locked-action",
        !isUnlocked
      );

      usernameButton.textContent =
        isUnlocked
          ? "Open Safe Username Lab 🧪"
          : "Unlock Safe Username Lab";
    }

    const backpackButton =
      document.getElementById(
        "goBackpackRescue"
      );

    if (backpackButton) {
      const isUnlocked =
        progress.usernamesChecked >= 3;

      backpackButton.disabled =
        !isUnlocked;

      backpackButton.classList.toggle(
        "locked-action",
        !isUnlocked
      );

      backpackButton.textContent =
        isUnlocked
          ? "Start Backpack Rescue 🎒"
          : "Complete 3 Username Scans First";
    }

    const finalButton =
      document.getElementById(
        "goFinalTest"
      );

    if (finalButton) {
      const requiredProfiles =
        game.data.identityProfiles.length;

      const isUnlocked =
        progress.profilesProtected >=
        requiredProfiles;

      finalButton.disabled =
        !isUnlocked;

      finalButton.classList.toggle(
        "locked-action",
        !isUnlocked
      );

      finalButton.textContent =
        isUnlocked
          ? "Begin Identity Protector Final Test 🛡️"
          : "Protect All 5 Profiles to Unlock the Final Test";
    }
  }

  function chooseResumeSection(
    progress
  ) {
    if (progress.completed) {
      return "missionResult";
    }

    if (!progress.started) {
      return "missionAlert";
    }

    if (
      VALID_SECTIONS.includes(
        progress.currentSection
      ) &&
      progress.currentSection !==
        "missionResult"
    ) {
      return progress.currentSection;
    }

    if (
      progress.testIndex > 0
    ) {
      return "testZone";
    }

    if (
      progress.profilesProtected >=
      game.data.identityProfiles.length
    ) {
      return "testIntroZone";
    }

    if (
      progress.practiceIndex >=
      game.data.practiceQuestions.length
    ) {
      return "identityCardZone";
    }

    if (
      progress.usernamesChecked >= 3
    ) {
      return "practiceZone";
    }

    if (
      progress.foundObjects.length >= 6
    ) {
      return "usernameZone";
    }

    return "exploreZone";
  }

  function loadRestoredSection(
    sectionId
  ) {
    game.showSection(sectionId);

    if (
      sectionId === "practiceZone" &&
      typeof game.loadPractice ===
        "function"
    ) {
      const maximumIndex =
        game.data.practiceQuestions.length -
        1;

      game.state.practiceIndex =
        Math.min(
          game.state.practiceIndex,
          maximumIndex
        );

      game.loadPractice();
    }

    if (
      sectionId ===
        "identityCardZone" &&
      typeof game.loadIdentityProfile ===
        "function"
    ) {
      const maximumIndex =
        game.data.identityProfiles.length -
        1;

      game.state.identityProfileIndex =
        Math.min(
          game.state.identityProfileIndex,
          maximumIndex
        );

      game.loadIdentityProfile();
    }

    if (
      sectionId ===
        "testIntroZone" &&
      typeof game.loadFinalTestHeroName ===
        "function"
    ) {
      game.loadFinalTestHeroName();
    }

    if (
      sectionId === "testZone" &&
      typeof game.loadTest ===
        "function"
    ) {
      const maximumIndex =
        game.data.testQuestions.length -
        1;

      game.state.testIndex =
        Math.min(
          game.state.testIndex,
          maximumIndex
        );

      game.loadTest();
    }
  }

  function restoreProgress() {
    const progress =
      readSavedProgress();

    restoreMissionState(progress);
    restoreCounters(progress);
    restoreIslandObjects(progress);
    restoreUnlockedButtons(progress);

    const resumeSection =
      chooseResumeSection(progress);

    loadRestoredSection(
      resumeSection
    );

    restorationComplete = true;

    /*
      Save once after restoration so older
      progress formats are updated safely.
    */
    scheduleSave();

    console.log(
      `Identity Island progress restored at: ${resumeSection}`
    );
  }

  function createDeveloperToolbar() {
    const searchParams =
      new URLSearchParams(
        window.location.search
      );

    const developerMode =
      searchParams.get("dev") === "1";

    if (!developerMode) {
      return;
    }

    const toolbar =
      document.createElement("aside");

    toolbar.className =
      "identity-dev-toolbar";

    toolbar.innerHTML = `
      <strong>🛠 Mission Tester</strong>

      <button type="button" data-dev-section="missionAlert">
        Intro
      </button>

      <button type="button" data-dev-section="exploreZone">
        Explore
      </button>

      <button type="button" data-dev-section="usernameZone">
        Username Lab
      </button>

      <button type="button" data-dev-section="practiceZone">
        Backpack
      </button>

      <button type="button" data-dev-section="identityCardZone">
        ID Cards
      </button>

      <button type="button" data-dev-section="testIntroZone">
        Test Instructions
      </button>

      <button type="button" data-dev-section="testZone">
        Test Questions
      </button>

      <button type="button" id="resetDeveloperMission">
        Reset Mission
      </button>
    `;

    document.body.appendChild(
      toolbar
    );

    toolbar
      .querySelectorAll(
        "[data-dev-section]"
      )
      .forEach((button) => {
        button.addEventListener(
          "click",
          () => {
            const sectionId =
              button.dataset.devSection;

            const state =
              game.state;

            if (
              sectionId ===
                "usernameZone" ||
              sectionId ===
                "practiceZone" ||
              sectionId ===
                "identityCardZone" ||
              sectionId ===
                "testIntroZone" ||
              sectionId ===
                "testZone"
            ) {
              state.foundObjects =
                new Set([
                  "house",
                  "school",
                  "phone",
                  "backpack",
                  "pizza",
                  "controller"
                ]);
            }

            if (
              sectionId ===
                "practiceZone" ||
              sectionId ===
                "identityCardZone" ||
              sectionId ===
                "testIntroZone" ||
              sectionId ===
                "testZone"
            ) {
              state.usernamesChecked = 3;
            }

            if (
              sectionId ===
                "identityCardZone" ||
              sectionId ===
                "testIntroZone" ||
              sectionId ===
                "testZone"
            ) {
              state.practiceIndex =
                game.data.practiceQuestions.length;

              state.practiceCorrect =
                game.data.practiceQuestions.length;
            }

            if (
              sectionId ===
                "testIntroZone" ||
              sectionId ===
                "testZone"
            ) {
              state.identityProfileIndex =
                game.data.identityProfiles.length;

              state.profilesProtected =
                game.data.identityProfiles.length;
            }

            if (
              sectionId ===
              "practiceZone"
            ) {
              state.practiceIndex = 0;
              state.practiceCorrect = 0;
            }

            if (
              sectionId ===
              "identityCardZone"
            ) {
              state.identityProfileIndex = 0;
              state.profilesProtected = 0;
            }

            if (
              sectionId ===
              "testZone"
            ) {
              state.testIndex = 0;
              state.testCorrect = 0;
              state.testAnswered = false;
            }

            restoreCounters({
              foundObjects:
                Array.from(
                  state.foundObjects
                ),

              usernamesChecked:
                state.usernamesChecked,

              practiceCorrect:
                state.practiceCorrect,

              profilesProtected:
                state.profilesProtected
            });

            restoreIslandObjects({
              foundObjects:
                Array.from(
                  state.foundObjects
                ),

              foundStickers:
                Array.from(
                  state.foundStickers
                )
            });

            restoreUnlockedButtons({
              foundObjects:
                Array.from(
                  state.foundObjects
                ),

              usernamesChecked:
                state.usernamesChecked,

              profilesProtected:
                state.profilesProtected
            });

            loadRestoredSection(
              sectionId
            );

            scheduleSave();
          }
        );
      });

    toolbar
      .querySelector(
        "#resetDeveloperMission"
      )
      ?.addEventListener(
        "click",
        () => {
          game.clearIdentityProgress();

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

  function clearProgress() {
    localStorage.removeItem(
      STORAGE_KEY
    );

    restorationComplete = false;
  }

  game.saveIdentityProgress =
    saveProgress;

  game.getIdentityProgress =
    readSavedProgress;

  game.clearIdentityProgress =
    clearProgress;

  function initializeProgressSystem() {
    /*
      The main controller sends this event
      after all click and drag listeners exist.
    */
    const startRestoration = () => {
      if (restorationComplete) {
        return;
      }

      restoreProgress();
      createDeveloperToolbar();
    };

    if (game.controllerReady) {
      startRestoration();
    } else {
      document.addEventListener(
        "identityControllerReady",
        startRestoration,
        { once: true }
      );

      /*
        Safety fallback in case a browser misses
        the custom event.
      */
      window.setTimeout(
        startRestoration,
        300
      );
    }

    /*
      Capture game activity without replacing
      showSection or removing button listeners.
    */
    document.addEventListener(
      "click",
      scheduleSave,
      true
    );

    document.addEventListener(
      "drop",
      scheduleSave,
      true
    );

    window.addEventListener(
      "beforeunload",
      () => {
        if (restorationComplete) {
          saveProgress();
        }
      }
    );

    window.setInterval(() => {
      if (restorationComplete) {
        saveProgress();
      }
    }, 2000);
  }

  if (
    document.readyState === "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      initializeProgressSystem,
      { once: true }
    );
  } else {
    initializeProgressSystem();
  }
})();
