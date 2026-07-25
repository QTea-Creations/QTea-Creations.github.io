"use strict";

/* =========================================================
   SAFETII NET — PASSWORD SAFE KEEPER
   MISSION 2 PROGRESS SYSTEM

   Saves and restores:

   1. Password Safety Lab
   2. Password Cracker Challenge
   3. Two-Factor Security Gate
   4. Account Defense Simulator
   5. Password Vault Practice
   6. Final Test
   7. Badge and mission completion

   Important:
   The pretend password typed into the Password Safety Lab
   is never saved or restored.
========================================================= */

(() => {
  const mission =
    window.PasswordMission;

  if (
    !mission ||
    !mission.state ||
    typeof mission.byId !==
      "function"
  ) {
    console.error(
      "password-progress.js could not start. Check that password-core.js loads first."
    );

    return;
  }

  const state =
    mission.state;

  const STORAGE_KEY =
    "safetiiPasswordProgress";

  const CURRENT_VERSION =
    2;


  /* =====================================================
     VALID MISSION SECTIONS
  ===================================================== */

  const VALID_SECTIONS = [
    "passwordMissionAlert",
    "passphraseZone",
    "passwordAttackZone",
    "twoFactorZone",
    "accountDefenseZone",
    "passwordVaultZone",
    "passwordTestIntroZone",
    "passwordTestZone",
    "passwordMissionResult"
  ];


  /* =====================================================
     DEFAULT PROGRESS
  ===================================================== */

  const DEFAULT_PROGRESS = {
    version:
      CURRENT_VERSION,

    missionStarted:
      false,

    missionCompleted:
      false,

    currentSection:
      "passwordMissionAlert",


    /* Password Safety Lab */

    comparisonIndex:
      0,

    comparisonCorrect:
      0,

    comparisonComplete:
      false,

    passwordBuilderComplete:
      false,

    passwordLabComplete:
      false,


    /* Password Cracker Challenge */

    passwordAttackIndex:
      0,

    passwordAttackCorrect:
      0,

    passwordAttackComplete:
      false,


    /* Two-Factor Security Gate */

    twoFactorIndex:
      0,

    twoFactorCorrect:
      0,

    twoFactorComplete:
      false,


    /* Account Defense Simulator */

    accountDefenseIndex:
      0,

    accountDefenseCorrect:
      0,

    accountDefenseComplete:
      false,

    trainingComplete:
      false,


    /* Vault Practice */

    vaultIndex:
      0,

    vaultDoorsSecured:
      0,

    vaultComplete:
      false,


    /* Final Test */

    testIndex:
      0,

    testCorrect:
      0,

    finalScore:
      0,

    badgeEarned:
      false,


    /* Rewards */

    missionPointsEarned:
      0
  };


  let restorationStarted =
    false;

  let restorationComplete =
    false;

  let saveTimer =
    null;


  /* =====================================================
     GENERAL HELPERS
  ===================================================== */

  function cloneDefaultProgress() {
    return {
      ...DEFAULT_PROGRESS
    };
  }


  function safeNumber(
    value,
    fallback = 0
  ) {
    const number =
      Number(value);

    return Number.isFinite(
      number
    )
      ? Math.max(
          0,
          number
        )
      : fallback;
  }


  function safeBoolean(
    value
  ) {
    return Boolean(
      value
    );
  }


  function clamp(
    value,
    minimum,
    maximum
  ) {
    return Math.min(
      maximum,
      Math.max(
        minimum,
        safeNumber(value)
      )
    );
  }


  function getDataLength(
    key,
    fallback
  ) {
    const collection =
      mission.data?.[
        key
      ];

    return Array.isArray(
      collection
    )
      ? collection.length
      : fallback;
  }


  /* =====================================================
     READ SAVED PROGRESS
  ===================================================== */

  function readSavedProgress() {
    try {
      const raw =
        localStorage.getItem(
          STORAGE_KEY
        );

      if (!raw) {
        return cloneDefaultProgress();
      }

      const parsed =
        JSON.parse(
          raw
        );

      if (
        !parsed ||
        typeof parsed !==
          "object"
      ) {
        return cloneDefaultProgress();
      }

      const progress = {
        ...cloneDefaultProgress(),
        ...parsed,

        version:
          CURRENT_VERSION,

        missionStarted:
          safeBoolean(
            parsed.missionStarted
          ),

        missionCompleted:
          safeBoolean(
            parsed.missionCompleted
          ),

        currentSection:
          VALID_SECTIONS.includes(
            parsed.currentSection
          )
            ? parsed.currentSection
            : "passwordMissionAlert",


        comparisonIndex:
          safeNumber(
            parsed.comparisonIndex
          ),

        comparisonCorrect:
          safeNumber(
            parsed.comparisonCorrect
          ),

        comparisonComplete:
          safeBoolean(
            parsed.comparisonComplete
          ),

        passwordBuilderComplete:
          safeBoolean(
            parsed.passwordBuilderComplete
          ),

        passwordLabComplete:
          safeBoolean(
            parsed.passwordLabComplete
          ),


        passwordAttackIndex:
          safeNumber(
            parsed.passwordAttackIndex
          ),

        passwordAttackCorrect:
          safeNumber(
            parsed.passwordAttackCorrect
          ),

        passwordAttackComplete:
          safeBoolean(
            parsed.passwordAttackComplete
          ),


        twoFactorIndex:
          safeNumber(
            parsed.twoFactorIndex
          ),

        twoFactorCorrect:
          safeNumber(
            parsed.twoFactorCorrect
          ),

        twoFactorComplete:
          safeBoolean(
            parsed.twoFactorComplete
          ),


        accountDefenseIndex:
          safeNumber(
            parsed.accountDefenseIndex
          ),

        accountDefenseCorrect:
          safeNumber(
            parsed.accountDefenseCorrect
          ),

        accountDefenseComplete:
          safeBoolean(
            parsed.accountDefenseComplete
          ),

        trainingComplete:
          safeBoolean(
            parsed.trainingComplete
          ),


        vaultIndex:
          safeNumber(
            parsed.vaultIndex
          ),

        vaultDoorsSecured:
          safeNumber(
            parsed.vaultDoorsSecured
          ),

        vaultComplete:
          safeBoolean(
            parsed.vaultComplete
          ),


        testIndex:
          safeNumber(
            parsed.testIndex
          ),

        testCorrect:
          safeNumber(
            parsed.testCorrect
          ),

        finalScore:
          safeNumber(
            parsed.finalScore
          ),

        badgeEarned:
          safeBoolean(
            parsed.badgeEarned
          ),


        missionPointsEarned:
          safeNumber(
            parsed.missionPointsEarned
          )
      };


      /*
        Migration protection:

        Older Mission 2 versions used these sections:

        uniquePasswordZone
        codeKeeperZone
        accountRescueZone

        Those section names are no longer valid. The earliest
        unfinished revised training activity will be chosen below.
      */

      if (
        !VALID_SECTIONS.includes(
          parsed.currentSection
        )
      ) {
        progress.currentSection =
          "passwordMissionAlert";
      }

      return progress;
    } catch (error) {
      console.error(
        "Could not read Password Safe Keeper progress:",
        error
      );

      return cloneDefaultProgress();
    }
  }


  /* =====================================================
     WRITE PROGRESS
  ===================================================== */

  function writeProgress(
    progress
  ) {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(
          progress
        )
      );

      return true;
    } catch (error) {
      console.error(
        "Could not save Password Safe Keeper progress:",
        error
      );

      return false;
    }
  }


  /* =====================================================
     SAVE CURRENT MISSION STATE

     The password input value is intentionally omitted.
  ===================================================== */

  function saveProgress() {
    if (
      !restorationComplete
    ) {
      return;
    }

    const visibleSection =
      typeof mission
        .getVisibleSectionId ===
        "function"
        ? mission.getVisibleSectionId()
        : state.currentSection;

    const currentSection =
      VALID_SECTIONS.includes(
        visibleSection
      )
        ? visibleSection
        : "passwordMissionAlert";

    const progress = {
      version:
        CURRENT_VERSION,

      missionStarted:
        Boolean(
          state.missionStarted
        ),

      missionCompleted:
        Boolean(
          state.missionCompleted
        ),

      currentSection,


      /* Password Safety Lab */

      comparisonIndex:
        safeNumber(
          state.comparisonIndex
        ),

      comparisonCorrect:
        safeNumber(
          state.comparisonCorrect
        ),

      comparisonComplete:
        Boolean(
          state.comparisonComplete
        ),

      passwordBuilderComplete:
        Boolean(
          state.passwordBuilderComplete
        ),

      passwordLabComplete:
        Boolean(
          state.passwordLabComplete
        ),


      /* Password Cracker Challenge */

      passwordAttackIndex:
        safeNumber(
          state.passwordAttackIndex
        ),

      passwordAttackCorrect:
        safeNumber(
          state.passwordAttackCorrect
        ),

      passwordAttackComplete:
        Boolean(
          state.passwordAttackComplete
        ),


      /* Two-Factor Security Gate */

      twoFactorIndex:
        safeNumber(
          state.twoFactorIndex
        ),

      twoFactorCorrect:
        safeNumber(
          state.twoFactorCorrect
        ),

      twoFactorComplete:
        Boolean(
          state.twoFactorComplete
        ),


      /* Account Defense Simulator */

      accountDefenseIndex:
        safeNumber(
          state.accountDefenseIndex
        ),

      accountDefenseCorrect:
        safeNumber(
          state.accountDefenseCorrect
        ),

      accountDefenseComplete:
        Boolean(
          state.accountDefenseComplete
        ),

      trainingComplete:
        Boolean(
          state.trainingComplete
        ),


      /* Vault Practice */

      vaultIndex:
        safeNumber(
          state.vaultIndex
        ),

      vaultDoorsSecured:
        safeNumber(
          state.vaultDoorsSecured
        ),

      vaultComplete:
        Boolean(
          state.vaultComplete
        ),


      /* Final Test */

      testIndex:
        safeNumber(
          state.testIndex
        ),

      testCorrect:
        safeNumber(
          state.testCorrect
        ),

      finalScore:
        safeNumber(
          state.finalScore
        ),

      badgeEarned:
        Boolean(
          state.badgeEarned
        ),


      /* Rewards */

      missionPointsEarned:
        safeNumber(
          state.missionPointsEarned
        )
    };

    writeProgress(
      progress
    );


    /*
      Simplified completion keys used by other
      Safetii Net pages.
    */

    localStorage.setItem(
      "passwordMissionCompleted",
      String(
        progress.missionCompleted
      )
    );

    localStorage.setItem(
      "passwordBadgeEarned",
      String(
        progress.badgeEarned
      )
    );
  }


  function scheduleSave() {
    window.clearTimeout(
      saveTimer
    );

    saveTimer =
      window.setTimeout(
        saveProgress,
        140
      );
  }


  /* =====================================================
     RESTORE MISSION STATE
  ===================================================== */

  function restoreState(
    progress
  ) {
    state.missionStarted =
      progress.missionStarted;

    state.missionCompleted =
      progress.missionCompleted;

    state.currentSection =
      progress.currentSection;


    /* Password Safety Lab */

    state.comparisonIndex =
      progress.comparisonIndex;

    state.comparisonCorrect =
      progress.comparisonCorrect;

    state.comparisonAnswered =
      false;

    state.comparisonComplete =
      progress.comparisonComplete;

    state.passwordBuilderComplete =
      progress.passwordBuilderComplete;

    state.passwordLabComplete =
      progress.passwordLabComplete;


    /* Password Cracker Challenge */

    state.passwordAttackIndex =
      progress.passwordAttackIndex;

    state.passwordAttackCorrect =
      progress.passwordAttackCorrect;

    state.passwordAttackAnswered =
      false;

    state.passwordAttackComplete =
      progress.passwordAttackComplete;


    /* Two-Factor Security Gate */

    state.twoFactorIndex =
      progress.twoFactorIndex;

    state.twoFactorCorrect =
      progress.twoFactorCorrect;

    state.twoFactorAnswered =
      false;

    state.twoFactorComplete =
      progress.twoFactorComplete;


    /* Account Defense Simulator */

    state.accountDefenseIndex =
      progress.accountDefenseIndex;

    state.accountDefenseCorrect =
      progress.accountDefenseCorrect;

    state.accountDefenseAnswered =
      false;

    state.accountDefenseComplete =
      progress.accountDefenseComplete;

    state.trainingComplete =
      progress.trainingComplete;


    /* Vault Practice */

    state.vaultIndex =
      progress.vaultIndex;

    state.vaultDoorsSecured =
      progress.vaultDoorsSecured;

    state.vaultAnswered =
      false;

    state.vaultComplete =
      progress.vaultComplete;


    /* Final Test */

    state.testIndex =
      progress.testIndex;

    state.testCorrect =
      progress.testCorrect;

    state.testAnswered =
      false;

    state.finalScore =
      progress.finalScore;

    state.badgeEarned =
      progress.badgeEarned;


    /* Rewards */

    state.missionPointsEarned =
      progress.missionPointsEarned;
  }


  /* =====================================================
     RESTORE COUNTERS
  ===================================================== */

  function restoreCounters(
    progress
  ) {
    const comparisonTotal =
      getDataLength(
        "comparisonChallenges",
        5
      );

    const attackTotal =
      getDataLength(
        "passwordAttackChallenges",
        8
      );

    const twoFactorTotal =
      getDataLength(
        "twoFactorScenarios",
        8
      );

    const defenseTotal =
      getDataLength(
        "accountDefenseScenarios",
        6
      );

    const vaultTotal =
      getDataLength(
        "vaultChallenges",
        5
      );

    const testTotal =
      getDataLength(
        "finalTestQuestions",
        20
      );


    let labProgress =
      clamp(
        progress.comparisonIndex,
        0,
        comparisonTotal
      );

    if (
      progress.comparisonComplete
    ) {
      labProgress =
        comparisonTotal;
    }

    if (
      progress.passwordBuilderComplete
    ) {
      labProgress =
        comparisonTotal + 1;
    }


    const counters = {
      passwordLabProgress:
        labProgress,

      passwordAttackProgress:
        progress.passwordAttackComplete
          ? attackTotal
          : clamp(
              progress.passwordAttackIndex,
              0,
              attackTotal
            ),

      twoFactorProgress:
        progress.twoFactorComplete
          ? twoFactorTotal
          : clamp(
              progress.twoFactorIndex,
              0,
              twoFactorTotal
            ),

      accountDefenseProgress:
        progress.accountDefenseComplete
          ? defenseTotal
          : clamp(
              progress.accountDefenseIndex,
              0,
              defenseTotal
            ),

      vaultDoorsSecured:
        clamp(
          progress.vaultDoorsSecured,
          0,
          vaultTotal
        ),

      vaultDoorNumber:
        Math.min(
          progress.vaultIndex + 1,
          vaultTotal
        ),

      passwordTestNumber:
        Math.min(
          progress.testIndex + 1,
          testTotal
        ),

      passwordFinalScore:
        `${Math.round(
          progress.finalScore
        )}%`,

      passwordPointsEarned:
        progress.missionPointsEarned
    };


    Object.entries(
      counters
    ).forEach(
      ([id, value]) => {
        mission.setText(
          id,
          value
        );
      }
    );
  }


  /* =====================================================
     RESTORE PASSWORD SAFETY LAB

     The typed pretend password is always cleared.
  ===================================================== */

  function restorePasswordLab(
    progress
  ) {
    const comparisonPart =
      mission.byId(
        "passwordComparisonPart"
      );

    const typedPart =
      mission.byId(
        "typedPasswordPart"
      );

    const practiceInput =
      mission.byId(
        "practicePasswordInput"
      );

    const toggleButton =
      mission.byId(
        "togglePracticePassword"
      );


    /*
      Never restore or retain the typed password.
    */

    if (practiceInput) {
      practiceInput.value =
        "";

      practiceInput.type =
        "password";
    }

    if (toggleButton) {
      toggleButton.textContent =
        "👁️ Show";

      toggleButton.setAttribute(
        "aria-pressed",
        "false"
      );

      toggleButton.setAttribute(
        "aria-label",
        "Show pretend password"
      );
    }


    mission.hideElement(
      mission.byId(
        "passwordAnalysisResult"
      )
    );

    mission.hideElement(
      mission.byId(
        "passwordBuilderSuccess"
      )
    );


    if (
      progress.comparisonComplete
    ) {
      mission.hideElement(
        comparisonPart
      );

      if (typedPart) {
        typedPart.classList.remove(
          "locked-lab-part"
        );

        typedPart.classList.add(
          "unlocked"
        );
      }
    } else {
      mission.showElement(
        comparisonPart
      );

      if (typedPart) {
        typedPart.classList.add(
          "locked-lab-part"
        );

        typedPart.classList.remove(
          "unlocked"
        );
      }
    }


    /*
      A completed lab can resume forward without requiring
      the original pretend password to be restored.
    */

    if (
      progress.passwordLabComplete
    ) {
      mission.showElement(
        mission.byId(
          "passwordBuilderSuccess"
        )
      );

      mission.setButtonState({
        id:
          "finishPasswordSafetyLab",

        unlocked:
          true,

        unlockedText:
          "Continue to Password Cracker Challenge ✅",

        lockedText:
          "Build a Strong Practice Password to Continue"
      });

      return;
    }


    if (
      progress.passwordBuilderComplete
    ) {
      mission.showElement(
        mission.byId(
          "passwordBuilderSuccess"
        )
      );

      mission.setButtonState({
        id:
          "finishPasswordSafetyLab",

        unlocked:
          true,

        unlockedText:
          "Complete Password Safety Lab ✅",

        lockedText:
          "Build a Strong Practice Password to Continue"
      });

      return;
    }


    mission.setButtonState({
      id:
        "finishPasswordSafetyLab",

      unlocked:
        false,

      unlockedText:
        "Complete Password Safety Lab ✅",

      lockedText:
        "Build a Strong Practice Password to Continue"
    });
  }


  /* =====================================================
     RESTORE TRAINING COMPLETION BUTTONS
  ===================================================== */

  function restoreTrainingButtons(
    progress
  ) {
    mission.setButtonState({
      id:
        "finishPasswordTraining",

      unlocked:
        progress.accountDefenseComplete,

      unlockedText:
        "Enter Password Vault Practice 🏰",

      lockedText:
        "Complete Account Defense Training First"
    });


    mission.setButtonState({
      id:
        "goPasswordFinalTest",

      unlocked:
        progress.vaultComplete,

      unlockedText:
        "Begin Final Vault Inspection 🛡️",

      lockedText:
        "Secure All 5 Doors to Unlock the Final Test"
    });


    if (
      progress.twoFactorComplete
    ) {
      mission.showElement(
        mission.byId(
          "twoFactorCompletion"
        )
      );
    } else {
      mission.hideElement(
        mission.byId(
          "twoFactorCompletion"
        )
      );
    }


    if (
      progress.accountDefenseComplete
    ) {
      mission.showElement(
        mission.byId(
          "accountDefenseCompletion"
        )
      );
    } else {
      mission.hideElement(
        mission.byId(
          "accountDefenseCompletion"
        )
      );
    }
  }


  /* =====================================================
     CHOOSE RESUME SECTION

     The earliest unfinished required activity always wins.
  ===================================================== */

  function chooseResumeSection(
    progress
  ) {
    if (
      progress.missionCompleted
    ) {
      return "passwordMissionResult";
    }

    if (
      !progress.missionStarted
    ) {
      return "passwordMissionAlert";
    }

    if (
      !progress.passwordLabComplete
    ) {
      return "passphraseZone";
    }

    if (
      !progress.passwordAttackComplete
    ) {
      return "passwordAttackZone";
    }

    if (
      !progress.twoFactorComplete
    ) {
      return "twoFactorZone";
    }

    if (
      !progress.accountDefenseComplete
    ) {
      return "accountDefenseZone";
    }

    if (
      !progress.vaultComplete
    ) {
      return "passwordVaultZone";
    }

    if (
      progress.testIndex <=
        0 &&
      !progress.badgeEarned
    ) {
      return "passwordTestIntroZone";
    }

    if (
      !progress.badgeEarned
    ) {
      return "passwordTestZone";
    }

    return "passwordMissionResult";
  }


  /* =====================================================
     RESTORE ACTIVE SECTION
  ===================================================== */

  function restoreSection(
    sectionId
  ) {
    switch (
      sectionId
    ) {
      case "passwordMissionAlert":
        mission.showSection(
          "passwordMissionAlert",
          {
            scroll:
              false,

            behavior:
              "auto"
          }
        );
        break;


      case "passphraseZone":
        restorePasswordLab(
          readSavedProgress()
        );

        if (
          typeof mission
            .restoreTrainingSection ===
          "function"
        ) {
          mission.restoreTrainingSection(
            "passphraseZone"
          );
        } else {
          mission.showSection(
            "passphraseZone",
            {
              scroll:
                false
            }
          );
        }
        break;


      case "passwordAttackZone":
      case "twoFactorZone":
      case "accountDefenseZone":
        if (
          typeof mission
            .restoreTrainingSection ===
          "function"
        ) {
          mission.restoreTrainingSection(
            sectionId
          );
        } else {
          mission.showSection(
            sectionId,
            {
              scroll:
                false
            }
          );
        }
        break;


      case "passwordVaultZone":
        mission.showSection(
          "passwordVaultZone",
          {
            scroll:
              false
          }
        );

        if (
          typeof mission
            .loadVaultChallenge ===
          "function"
        ) {
          mission.loadVaultChallenge();
        }
        break;


      case "passwordTestIntroZone":
        mission.showSection(
          "passwordTestIntroZone",
          {
            scroll:
              false
          }
        );

        mission.loadHeroNames?.();
        break;


      case "passwordTestZone":
        mission.showSection(
          "passwordTestZone",
          {
            scroll:
              false
          }
        );

        if (
          typeof mission
            .loadPasswordTestQuestion ===
          "function"
        ) {
          mission.loadPasswordTestQuestion();
        }
        break;


      case "passwordMissionResult":
        mission.showSection(
          "passwordMissionResult",
          {
            scroll:
              false
          }
        );

        if (
          typeof mission
            .renderPasswordMissionResult ===
          "function"
        ) {
          mission.renderPasswordMissionResult();
        }
        break;


      default:
        mission.showSection(
          "passwordMissionAlert",
          {
            scroll:
              false
          }
        );
    }
  }


  /* =====================================================
     RESTORE ALL PROGRESS
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

    restoreState(
      progress
    );

    restoreCounters(
      progress
    );

    restorePasswordLab(
      progress
    );

    restoreTrainingButtons(
      progress
    );

    const sectionId =
      chooseResumeSection(
        progress
      );

    restoreSection(
      sectionId
    );

    restorationComplete =
      true;

    scheduleSave();

    console.log(
      `Password Safe Keeper progress restored at: ${sectionId}`
    );
  }


  /* =====================================================
     PUBLIC METHODS
  ===================================================== */

  mission.savePasswordProgress =
    saveProgress;


  mission.schedulePasswordSave =
    scheduleSave;


  mission.getPasswordProgress =
    readSavedProgress;


  mission.restorePasswordProgress =
    restoreProgress;


  mission.clearPasswordProgress =
    function clearPasswordProgress() {
      localStorage.removeItem(
        STORAGE_KEY
      );

      localStorage.removeItem(
        "passwordMissionCompleted"
      );

      localStorage.removeItem(
        "passwordBadgeEarned"
      );

      restorationStarted =
        false;

      restorationComplete =
        false;
    };


  /* =====================================================
     INITIALIZATION

     Wait until:

     password-core.js
     password-activities.js
     password.js

     have all completed initialization.
  ===================================================== */

  function initializeProgressSystem() {
    const waitForMission =
      () => {
        if (
          mission.coreReady !==
            true ||
          mission.activitiesReady !==
            true ||
          mission.controllerReady !==
            true
        ) {
          window.setTimeout(
            waitForMission,
            50
          );

          return;
        }

        restoreProgress();
      };

    waitForMission();


    document.addEventListener(
      "click",
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
      3000
    );


    mission.progressReady =
      true;

    document.dispatchEvent(
      new CustomEvent(
        "passwordProgressReady"
      )
    );

    console.log(
      "Password Safe Keeper revised progress system loaded."
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
        once:
          true
      }
    );
  } else {
    initializeProgressSystem();
  }
})();
