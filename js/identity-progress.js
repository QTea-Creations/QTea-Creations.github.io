"use strict";

/* =========================================================
   SAFETII NET — IDENTITY ISLAND
   STABLE PROGRESS, MIGRATION, AND RESTORATION

   This controller makes the newer Identity Foundations
   lessons mandatory before the Username Lab.

   Mission order:

   1. Mission Alert
   2. Explore Zone
   3. Pieces of Me
   4. Trust Circle
   5. Clue Collector
   6. Impostor Alert
   7. Username Lab
   8. Backpack Rescue
   9. Identity Card Repair
   10. Final Test Introduction
   11. Final Test
   12. Mission Result
========================================================= */

(() => {
  const game =
    window.IdentityGame;

  if (
    !game ||
    !game.state
  ) {
    console.error(
      "Identity progress could not load. Check that identity-core.js loads first."
    );

    return;
  }

  /* =====================================================
     STORAGE
  ===================================================== */

  const STORAGE_KEY =
    "safetiiIdentityProgress";

  const FOUNDATIONS_KEY =
    "safetiiIdentityFoundationsV1";

  const CURRENT_VERSION = 3;

  const SECTION_IDS = [
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

  const FOUNDATION_SECTIONS = [
    "piecesOfMeZone",
    "trustCircleZone",
    "clueCollectorZone",
    "impostorZone"
  ];

  const DEFAULT_PROGRESS = {
    version:
      CURRENT_VERSION,

    started:
      false,

    completed:
      false,

    currentSection:
      "missionAlert",

    foundObjects:
      [],

    foundStickers:
      [],

    usernamesChecked:
      0,

    practiceIndex:
      0,

    practiceCorrect:
      0,

    identityProfileIndex:
      0,

    profilesProtected:
      0,

    testIndex:
      0,

    testCorrect:
      0,

    testAnswered:
      false
  };

  let restorationComplete =
    false;

  let restorationStarted =
    false;

  let saveTimer =
    null;


  /* =====================================================
     GENERAL HELPERS
  ===================================================== */

  function cloneDefaultProgress() {
    return {
      ...DEFAULT_PROGRESS,

      foundObjects:
        [],

      foundStickers:
        []
    };
  }


  function safeNumber(
    value,
    fallback = 0
  ) {
    const number =
      Number(value);

    return Number.isFinite(number)
      ? Math.max(0, number)
      : fallback;
  }


  function readJson(
    key,
    fallback
  ) {
    try {
      const raw =
        localStorage.getItem(
          key
        );

      if (!raw) {
        return fallback;
      }

      const parsed =
        JSON.parse(raw);

      return parsed;
    } catch (error) {
      console.error(
        `Could not read ${key}:`,
        error
      );

      return fallback;
    }
  }


  function writeJson(
    key,
    value
  ) {
    try {
      localStorage.setItem(
        key,
        JSON.stringify(value)
      );
    } catch (error) {
      console.error(
        `Could not save ${key}:`,
        error
      );
    }
  }


  /* =====================================================
     FOUNDATION PROGRESS
  ===================================================== */

  function getFoundationProgress() {
    const stored =
      readJson(
        FOUNDATIONS_KEY,
        null
      );

    if (
      !stored ||
      typeof stored !==
        "object"
    ) {
      return {
        piecesIndex: 0,
        piecesCorrect: 0,

        trustIndex: 0,
        trustCorrect: 0,

        clueIndex: 0,
        clueCorrect: 0,

        impostorComplete: false,
        academyComplete: false
      };
    }

    return {
      piecesIndex:
        safeNumber(
          stored.piecesIndex
        ),

      piecesCorrect:
        safeNumber(
          stored.piecesCorrect
        ),

      trustIndex:
        safeNumber(
          stored.trustIndex
        ),

      trustCorrect:
        safeNumber(
          stored.trustCorrect
        ),

      clueIndex:
        safeNumber(
          stored.clueIndex
        ),

      clueCorrect:
        safeNumber(
          stored.clueCorrect
        ),

      impostorComplete:
        Boolean(
          stored.impostorComplete
        ),

      academyComplete:
        Boolean(
          stored.academyComplete
        )
    };
  }


  function foundationsComplete() {
    return Boolean(
      getFoundationProgress()
        .academyComplete
    );
  }


  function chooseFoundationSection() {
    const foundation =
      getFoundationProgress();

    /*
      Pieces of Me has eight prompts.
    */

    if (
      foundation.piecesIndex <
      8
    ) {
      return "piecesOfMeZone";
    }

    /*
      Trust Circle has eight people.
    */

    if (
      foundation.trustIndex <
      8
    ) {
      return "trustCircleZone";
    }

    /*
      Clue Collector has four profiles.
    */

    if (
      foundation.clueIndex <
      4
    ) {
      return "clueCollectorZone";
    }

    if (
      !foundation.impostorComplete ||
      !foundation.academyComplete
    ) {
      return "impostorZone";
    }

    return "usernameZone";
  }


  /* =====================================================
     OVERALL PROGRESS
  ===================================================== */

  function readSavedProgress() {
    const stored =
      readJson(
        STORAGE_KEY,
        null
      );

    if (
      !stored ||
      typeof stored !==
        "object"
    ) {
      return cloneDefaultProgress();
    }

    const progress = {
      ...cloneDefaultProgress(),
      ...stored,

      version:
        CURRENT_VERSION,

      foundObjects:
        Array.isArray(
          stored.foundObjects
        )
          ? stored.foundObjects
          : [],

      foundStickers:
        Array.isArray(
          stored.foundStickers
        )
          ? stored.foundStickers
          : [],

      usernamesChecked:
        safeNumber(
          stored.usernamesChecked
        ),

      practiceIndex:
        safeNumber(
          stored.practiceIndex
        ),

      practiceCorrect:
        safeNumber(
          stored.practiceCorrect
        ),

      identityProfileIndex:
        safeNumber(
          stored.identityProfileIndex
        ),

      profilesProtected:
        safeNumber(
          stored.profilesProtected
        ),

      testIndex:
        safeNumber(
          stored.testIndex
        ),

      testCorrect:
        safeNumber(
          stored.testCorrect
        ),

      testAnswered:
        Boolean(
          stored.testAnswered
        ),

      started:
        Boolean(
          stored.started
        ),

      completed:
        Boolean(
          stored.completed
        )
    };

    /*
      Migration rule:

      Older players may have reached the Username Lab
      before Identity Foundations was added.

      Once all six island objects have been found,
      Foundation Academy becomes mandatory unless its
      own saved progress says it was completed.
    */

    if (
      progress.foundObjects.length >=
        6 &&
      !foundationsComplete() &&
      [
        "usernameZone",
        "practiceZone",
        "identityCardZone",
        "testIntroZone",
        "testZone"
      ].includes(
        progress.currentSection
      )
    ) {
      progress.currentSection =
        chooseFoundationSection();

      progress.usernamesChecked =
        0;

      progress.practiceIndex =
        0;

      progress.practiceCorrect =
        0;

      progress.identityProfileIndex =
        0;

      progress.profilesProtected =
        0;

      progress.testIndex =
        0;

      progress.testCorrect =
        0;

      progress.testAnswered =
        false;

      writeJson(
        STORAGE_KEY,
        progress
      );

      console.log(
        "Identity progress migrated to the new Foundation Academy."
      );
    }

    return progress;
  }


  function getVisibleSectionId() {
    const visible =
      SECTION_IDS.find(
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
      visible ||
      "missionAlert"
    );
  }


  function saveProgress() {
    if (
      !restorationComplete
    ) {
      return;
    }

    const state =
      game.state;

    const previous =
      readSavedProgress();

    let currentSection =
      getVisibleSectionId();

    /*
      Never allow the overall progress file to
      bypass unfinished Foundation Academy lessons.
    */

    if (
      state.foundObjects.size >=
        6 &&
      !foundationsComplete() &&
      !FOUNDATION_SECTIONS.includes(
        currentSection
      )
    ) {
      currentSection =
        chooseFoundationSection();
    }

    const started =
      previous.started ||
      currentSection !==
        "missionAlert" ||
      state.foundObjects.size >
        0 ||
      state.usernamesChecked >
        0 ||
      state.practiceIndex >
        0 ||
      state.profilesProtected >
        0 ||
      state.testIndex >
        0;

    const completed =
      localStorage.getItem(
        "identityMissionCompleted"
      ) === "true";

    const progress = {
      version:
        CURRENT_VERSION,

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
        safeNumber(
          state.usernamesChecked
        ),

      practiceIndex:
        safeNumber(
          state.practiceIndex
        ),

      practiceCorrect:
        safeNumber(
          state.practiceCorrect
        ),

      identityProfileIndex:
        safeNumber(
          state.identityProfileIndex
        ),

      profilesProtected:
        safeNumber(
          state.profilesProtected
        ),

      testIndex:
        safeNumber(
          state.testIndex
        ),

      testCorrect:
        safeNumber(
          state.testCorrect
        ),

      testAnswered:
        Boolean(
          state.testAnswered
        )
    };

    writeJson(
      STORAGE_KEY,
      progress
    );

    writeJson(
      "identityStickers",
      progress.foundStickers
    );
  }


  function scheduleSave() {
    window.clearTimeout(
      saveTimer
    );

    saveTimer =
      window.setTimeout(
        saveProgress,
        120
      );
  }


  /* =====================================================
     RESTORE CORE STATE
  ===================================================== */

  function restoreMissionState(
    progress
  ) {
    const state =
      game.state;

    state.foundObjects =
      new Set(
        progress.foundObjects
      );

    state.foundStickers =
      new Set(
        progress.foundStickers
      );

    state.usernamesChecked =
      safeNumber(
        progress.usernamesChecked
      );

    state.practiceIndex =
      safeNumber(
        progress.practiceIndex
      );

    state.practiceCorrect =
      safeNumber(
        progress.practiceCorrect
      );

    state.practiceAnswered =
      false;

    state.identityProfileIndex =
      safeNumber(
        progress.identityProfileIndex
      );

    state.profilesProtected =
      safeNumber(
        progress.profilesProtected
      );

    state.selectedRepairBlocks =
      [];

    state.profileRepairComplete =
      false;

    state.testIndex =
      safeNumber(
        progress.testIndex
      );

    state.testCorrect =
      safeNumber(
        progress.testCorrect
      );

    state.testAnswered =
      false;

    state.generatedUsername =
      "";

    state.generatedUsernameReason =
      "";

    state.generatedUsernameIsSafe =
      true;

    state.usernameAwaitingApproval =
      false;
  }


  function restoreCounters(
    progress
  ) {
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

    Object.entries(
      values
    ).forEach(
      ([id, value]) => {
        const element =
          document.getElementById(
            id
          );

        if (element) {
          element.textContent =
            String(value);
        }
      }
    );
  }


  function restoreIslandObjects(
    progress
  ) {
    document
      .querySelectorAll(
        ".island-object"
      )
      .forEach(
        (button) => {
          const discovered =
            progress.foundObjects.includes(
              button.dataset.object
            );

          button.classList.toggle(
            "discovered",
            discovered
          );
        }
      );

    document
      .querySelectorAll(
        ".sticker"
      )
      .forEach(
        (button) => {
          const collected =
            progress.foundStickers.includes(
              button.dataset.sticker
            );

          button.classList.toggle(
            "collected",
            collected
          );

          button.textContent =
            collected
              ? "✨"
              : "⭐";

          button.disabled =
            collected;
        }
      );
  }


  function setButtonState(
    button,
    unlocked,
    unlockedText,
    lockedText
  ) {
    if (!button) {
      return;
    }

    button.disabled =
      !unlocked;

    button.classList.toggle(
      "locked-action",
      !unlocked
    );

    button.setAttribute(
      "aria-disabled",
      String(!unlocked)
    );

    button.textContent =
      unlocked
        ? unlockedText
        : lockedText;
  }


  function restoreUnlockedButtons(
    progress
  ) {
    const explorationComplete =
      progress.foundObjects.length >=
      6;

    const academyComplete =
      foundationsComplete();

    const usernameButton =
      document.getElementById(
        "goUsernameLab"
      );

    setButtonState(
      usernameButton,
      explorationComplete,

      academyComplete
        ? "Open Safe Username Lab 🧪"
        : "Begin Identity Foundations Academy 🧩",

      "Unlock Safe Username Lab"
    );

    const backpackButton =
      document.getElementById(
        "goBackpackRescue"
      );

    setButtonState(
      backpackButton,
      academyComplete &&
        progress.usernamesChecked >=
          3,

      "Start Backpack Rescue 🎒",
      "Complete 3 Username Scans First"
    );

    const finalButton =
      document.getElementById(
        "goFinalTest"
      );

    const profileTotal =
      game.data
        ?.identityProfiles
        ?.length ||
      5;

    setButtonState(
      finalButton,
      academyComplete &&
        progress.profilesProtected >=
          profileTotal,

      "Begin Identity Protector Final Test 🛡️",
      `Protect All ${profileTotal} Profiles to Unlock the Final Test`
    );
  }


  /* =====================================================
     CHOOSE RESUME LOCATION
  ===================================================== */

  function chooseResumeSection(
    progress
  ) {
    if (
      progress.completed
    ) {
      return "missionResult";
    }

    if (
      !progress.started
    ) {
      return "missionAlert";
    }

    if (
      progress.foundObjects.length <
      6
    ) {
      return "exploreZone";
    }

    /*
      This is the key protection:

      After exploration, unfinished Foundation Academy
      always comes before Username Lab.
    */

    if (
      !foundationsComplete()
    ) {
      return chooseFoundationSection();
    }

    /*
      Once Foundation Academy is complete, a valid
      saved section can be resumed.
    */

    if (
      SECTION_IDS.includes(
        progress.currentSection
      ) &&
      ![
        "missionAlert",
        "exploreZone",
        ...FOUNDATION_SECTIONS,
        "missionResult"
      ].includes(
        progress.currentSection
      )
    ) {
      return progress.currentSection;
    }

    if (
      progress.testIndex >
      0
    ) {
      return "testZone";
    }

    const profileTotal =
      game.data
        ?.identityProfiles
        ?.length ||
      5;

    if (
      progress.profilesProtected >=
      profileTotal
    ) {
      return "testIntroZone";
    }

    const practiceTotal =
      game.data
        ?.practiceQuestions
        ?.length ||
      10;

    if (
      progress.practiceIndex >=
      practiceTotal
    ) {
      return "identityCardZone";
    }

    if (
      progress.usernamesChecked >=
      3
    ) {
      return "practiceZone";
    }

    return "usernameZone";
  }


  /* =====================================================
     LOAD ACTIVE SECTION
  ===================================================== */

  function loadRestoredSection(
    sectionId
  ) {
    if (
      typeof game.showSection !==
      "function"
    ) {
      console.error(
        "IdentityGame.showSection() is unavailable during restoration."
      );

      return;
    }

    game.showSection(
      sectionId
    );

    switch (sectionId) {
      case "piecesOfMeZone":
        if (
          typeof game.loadPiecesOfMe ===
          "function"
        ) {
          game.loadPiecesOfMe();
        }
        break;


      case "trustCircleZone":
        if (
          typeof game.loadTrustCircle ===
          "function"
        ) {
          game.loadTrustCircle();
        }
        break;


      case "clueCollectorZone":
        if (
          typeof game.loadClueProfile ===
          "function"
        ) {
          game.loadClueProfile();
        }
        break;


      case "impostorZone":
        if (
          typeof game.loadImpostorGame ===
          "function"
        ) {
          game.loadImpostorGame();
        }
        break;


      case "usernameZone":
        if (
          typeof game.updateMissionPointsDisplay ===
          "function"
        ) {
          game.updateMissionPointsDisplay();
        }
        break;


      case "practiceZone": {
        if (
          typeof game.loadPractice !==
          "function"
        ) {
          break;
        }

        const total =
          game.data
            ?.practiceQuestions
            ?.length ||
          1;

        game.state.practiceIndex =
          Math.min(
            game.state.practiceIndex,
            Math.max(
              0,
              total - 1
            )
          );

        game.loadPractice();
        break;
      }


      case "identityCardZone": {
        if (
          typeof game.loadIdentityProfile !==
          "function"
        ) {
          break;
        }

        const total =
          game.data
            ?.identityProfiles
            ?.length ||
          1;

        game.state.identityProfileIndex =
          Math.min(
            game.state.identityProfileIndex,
            Math.max(
              0,
              total - 1
            )
          );

        game.loadIdentityProfile();
        break;
      }


      case "testIntroZone":
        if (
          typeof game.loadFinalTestHeroName ===
          "function"
        ) {
          game.loadFinalTestHeroName();
        }
        break;


      case "testZone": {
        if (
          typeof game.loadTest !==
          "function"
        ) {
          break;
        }

        const total =
          game.data
            ?.testQuestions
            ?.length ||
          1;

        game.state.testIndex =
          Math.min(
            game.state.testIndex,
            Math.max(
              0,
              total - 1
            )
          );

        game.loadTest();
        break;
      }


      default:
        break;
    }
  }


  /* =====================================================
     RESTORE
  ===================================================== */

  function restoreProgress() {
    if (
      restorationStarted
    ) {
      return;
    }

    restorationStarted =
      true;

    const progress =
      readSavedProgress();

    restoreMissionState(
      progress
    );

    restoreCounters(
      progress
    );

    restoreIslandObjects(
      progress
    );

    restoreUnlockedButtons(
      progress
    );

    const resumeSection =
      chooseResumeSection(
        progress
      );

    loadRestoredSection(
      resumeSection
    );

    restorationComplete =
      true;

    scheduleSave();

    console.log(
      `Identity Island restored at: ${resumeSection}`
    );
  }


  /* =====================================================
     PUBLIC METHODS
  ===================================================== */

  function clearProgress() {
    localStorage.removeItem(
      STORAGE_KEY
    );

    restorationComplete =
      false;

    restorationStarted =
      false;
  }


  function clearAllMissionProgress() {
    const keys = [
      STORAGE_KEY,
      FOUNDATIONS_KEY,

      "identityCurrentStep",
      "identityFoundObjects",
      "identityUsernameProgress",
      "identityBackpackProgress",
      "identityProfileProgress",
      "identityTestProgress",
      "identityStickers",

      "identityMissionCompleted",
      "identityBadgeEarned"
    ];

    keys.forEach(
      (key) => {
        localStorage.removeItem(
          key
        );
      }
    );

    restorationComplete =
      false;

    restorationStarted =
      false;
  }


  game.saveIdentityProgress =
    saveProgress;

  game.getIdentityProgress =
    readSavedProgress;

  game.clearIdentityProgress =
    clearProgress;

  game.clearAllIdentityProgress =
    clearAllMissionProgress;

  game.restoreIdentitySection =
    loadRestoredSection;


  /* =====================================================
     INITIALIZATION

     There is no competing 300ms restoration timer here.
     Restoration waits until the main controller announces
     that all event listeners have been installed.
  ===================================================== */

  function initializeProgressSystem() {
    const beginRestoration =
      () => {
        /*
          Foundation functions must exist before we restore
          a Foundation Academy section.
        */

        if (
          game.identityFoundationsReady !==
            true ||
          game.controllerReady !==
            true
        ) {
          window.setTimeout(
            beginRestoration,
            50
          );

          return;
        }

        restoreProgress();
      };

    beginRestoration();

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
        if (
          restorationComplete
        ) {
          saveProgress();
        }
      }
    );

    window.setInterval(
      () => {
        if (
          restorationComplete
        ) {
          saveProgress();
        }
      },
      2500
    );
  }


  if (
    document.readyState ===
    "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      initializeProgressSystem,
      {
        once: true
      }
    );
  } else {
    initializeProgressSystem();
  }
})();
