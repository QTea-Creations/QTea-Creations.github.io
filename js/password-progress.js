"use strict";

/* =========================================================
   SAFETII NET — PASSWORD SAFE KEEPER
   Mission 2 Progress System

   This file saves and restores:
   - Current mission section
   - Training progress
   - Vault progress
   - Final-test progress
   - Badge and completion status

   Important:
   The pretend password typed into the Password Safety Lab
   is never stored in this file or in localStorage.
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
    1;

  const VALID_SECTIONS = [
    "passwordMissionAlert",
    "passphraseZone",
    "uniquePasswordZone",
    "codeKeeperZone",
    "accountRescueZone",
    "passwordVaultZone",
    "passwordTestIntroZone",
    "passwordTestZone",
    "passwordMissionResult"
  ];


  const DEFAULT_PROGRESS = {
    version:
      CURRENT_VERSION,

    missionStarted:
      false,

    missionCompleted:
      false,

    currentSection:
      "passwordMissionAlert",


    /* Training 1 */

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


    /* Training 2 */

    uniquePasswordIndex:
      0,

    uniquePasswordCorrect:
      0,

    uniquePasswordComplete:
      false,


    /* Training 3 */

    codeKeeperIndex:
      0,

    codeKeeperCorrect:
      0,

    codeKeeperComplete:
      false,


    /* Training 4 */

    selectedRescueSteps:
      [],

    rescueComplete:
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
      ...DEFAULT_PROGRESS,

      selectedRescueSteps:
        []
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

      return {
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


        uniquePasswordIndex:
          safeNumber(
            parsed.uniquePasswordIndex
          ),

        uniquePasswordCorrect:
          safeNumber(
            parsed.uniquePasswordCorrect
          ),

        uniquePasswordComplete:
          safeBoolean(
            parsed.uniquePasswordComplete
          ),


        codeKeeperIndex:
          safeNumber(
            parsed.codeKeeperIndex
          ),

        codeKeeperCorrect:
          safeNumber(
            parsed.codeKeeperCorrect
          ),

        codeKeeperComplete:
          safeBoolean(
            parsed.codeKeeperComplete
          ),


        selectedRescueSteps:
          Array.isArray(
            parsed.selectedRescueSteps
          )
            ? parsed.selectedRescueSteps.filter(
                (
                  value,
                  index,
                  array
                ) => {
                  return (
                    typeof value ===
                      "string" &&
                    value.trim() &&
                    array.indexOf(
                      value
                    ) ===
                      index
                  );
                }
              )
            : [],

        rescueComplete:
          safeBoolean(
            parsed.rescueComplete
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
    } catch (error) {
      console.error(
        "Could not read Password Safe Keeper progress:",
        error
      );

      return cloneDefaultProgress();
    }
  }


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
     SAVE CURRENT STATE

     No password-input value is included here.
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


      uniquePasswordIndex:
        safeNumber(
          state.uniquePasswordIndex
        ),

      uniquePasswordCorrect:
        safeNumber(
          state.uniquePasswordCorrect
        ),

      uniquePasswordComplete:
        Boolean(
          state.uniquePasswordComplete
        ),


      codeKeeperIndex:
        safeNumber(
          state.codeKeeperIndex
        ),

      codeKeeperCorrect:
        safeNumber(
          state.codeKeeperCorrect
        ),

      codeKeeperComplete:
        Boolean(
          state.codeKeeperComplete
        ),


      selectedRescueSteps:
        Array.isArray(
          state.selectedRescueSteps
        )
          ? [
              ...state.selectedRescueSteps
            ]
          : [],

      rescueComplete:
        Boolean(
          state.rescueComplete
        ),

      trainingComplete:
        Boolean(
          state.trainingComplete
        ),


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


      missionPointsEarned:
        safeNumber(
          state.missionPointsEarned
        )
    };

    writeProgress(
      progress
    );


    /*
      These simpler keys make Mission 2 status
      available to the dashboard and notebook.
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
     RESTORE STATE
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


    state.uniquePasswordIndex =
      progress.uniquePasswordIndex;

    state.uniquePasswordCorrect =
      progress.uniquePasswordCorrect;

    state.uniquePasswordAnswered =
      false;

    state.uniquePasswordComplete =
      progress.uniquePasswordComplete;


    state.codeKeeperIndex =
      progress.codeKeeperIndex;

    state.codeKeeperCorrect =
      progress.codeKeeperCorrect;

    state.codeKeeperAnswered =
      false;

    state.codeKeeperComplete =
      progress.codeKeeperComplete;


    state.selectedRescueSteps =
      [
        ...progress.selectedRescueSteps
      ];

    state.rescueComplete =
      progress.rescueComplete;

    state.trainingComplete =
      progress.trainingComplete;


    state.vaultIndex =
      progress.vaultIndex;

    state.vaultDoorsSecured =
      progress.vaultDoorsSecured;

    state.vaultAnswered =
      false;

    state.vaultComplete =
      progress.vaultComplete;


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


    state.missionPointsEarned =
      progress.missionPointsEarned;
  }


  /* =====================================================
     RESTORE COUNTERS AND BUTTONS
  ===================================================== */

  function restoreCounters(
    progress
  ) {
    const comparisonCount =
      progress.comparisonComplete
        ? 5
        : Math.min(
            progress.comparisonIndex,
            5
          );

    const passwordLabCount =
      progress.passwordBuilderComplete
        ? 6
        : comparisonCount;

    const values = {
      passwordLabProgress:
        passwordLabCount,

      uniquePasswordProgress:
        Math.min(
          progress.uniquePasswordIndex,
          8
        ),

      codeKeeperProgress:
        Math.min(
          progress.codeKeeperIndex,
          10
        ),

      accountRescueProgress:
        Math.min(
          progress.selectedRescueSteps
            .length,
          6
        ),

      vaultDoorsSecured:
        Math.min(
          progress.vaultDoorsSecured,
          5
        ),

      vaultDoorNumber:
        Math.min(
          progress.vaultIndex + 1,
          5
        ),

      passwordTestNumber:
        Math.min(
          progress.testIndex + 1,
          20
        ),

      passwordFinalScore:
        `${Math.round(
          progress.finalScore
        )}%`,

      passwordPointsEarned:
        progress.missionPointsEarned
    };

    Object.entries(
      values
    ).forEach(
      ([id, value]) => {
        mission.setText(
          id,
          value
        );
      }
    );
  }


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

    /*
      Always clear the field during restoration.
      The practice password is never restored.
    */

    if (practiceInput) {
      practiceInput.value =
        "";

      practiceInput.type =
        "password";
    }


    const toggleButton =
      mission.byId(
        "togglePracticePassword"
      );

    if (toggleButton) {
      toggleButton.textContent =
        "👁️ Show";

      toggleButton.setAttribute(
        "aria-pressed",
        "false"
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
      Even if the student previously completed the
      builder, they must type a new pretend password
      after refreshing because the original value
      was intentionally never saved.
    */

    if (
      progress.passwordLabComplete
    ) {
      mission.setButtonState({
        id:
          "finishPasswordSafetyLab",

        unlocked:
          true,

        unlockedText:
          "Continue to One Account, One Password ✅",

        lockedText:
          "Build a Strong Practice Password to Continue"
      });

      mission.showElement(
        mission.byId(
          "passwordBuilderSuccess"
        )
      );
    } else if (
      progress.passwordBuilderComplete
    ) {
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

      mission.showElement(
        mission.byId(
          "passwordBuilderSuccess"
        )
      );
    } else {
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
  }


  function restoreTrainingButtons(
    progress
  ) {
    mission.setButtonState({
      id:
        "finishPasswordTraining",

      unlocked:
        progress.rescueComplete,

      unlockedText:
        "Enter Password Vault Practice 🏰",

      lockedText:
        "Complete Account Rescue First"
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
      !progress.uniquePasswordComplete
    ) {
      return "uniquePasswordZone";
    }

    if (
      !progress.codeKeeperComplete
    ) {
      return "codeKeeperZone";
    }

    if (
      !progress.rescueComplete
    ) {
      return "accountRescueZone";
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
              false
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


      case "uniquePasswordZone":
      case "codeKeeperZone":
      case "accountRescueZone":
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
     RESTORE COMPLETE MISSION
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


  mission.restorePasswordProgress =
    restoreProgress;


  /* =====================================================
     INITIALIZATION

     Wait until:
     - password-core.js is ready
     - password-activities.js is ready
     - password.js is ready

     password.js will set mission.controllerReady.
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
      "Password Safe Keeper progress system loaded."
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
