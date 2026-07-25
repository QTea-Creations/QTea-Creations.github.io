"use strict";

/* =========================================================
   SAFETII NET — PASSWORD SAFE KEEPER
   MISSION 2 CORE

   Curriculum-aligned mission flow:

   1. Password Safety Lab
   2. Password Cracker Challenge
   3. Two-Factor Security Gate
   4. Account Defense Simulator
   5. Password Vault Practice
   6. Final Test

   Important:
   Pretend passwords typed into the Password Safety Lab
   are never stored in mission state or localStorage.
========================================================= */

(() => {
  const mission =
    window.PasswordMission =
      window.PasswordMission || {};


  /* =====================================================
     MISSION SECTION ORDER

     The matching HTML sections will be:

     passwordMissionAlert
     passphraseZone
     passwordAttackZone
     twoFactorZone
     accountDefenseZone
     passwordVaultZone
     passwordTestIntroZone
     passwordTestZone
     passwordMissionResult
  ===================================================== */

  const SECTION_IDS = [
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
     SHARED MISSION STATE
  ===================================================== */

  mission.state = {
    missionStarted:
      false,

    missionCompleted:
      false,

    currentSection:
      "passwordMissionAlert",


    /* -------------------------------------------------
       TRAINING 1 — PASSWORD SAFETY LAB
    ------------------------------------------------- */

    comparisonIndex:
      0,

    comparisonCorrect:
      0,

    comparisonAnswered:
      false,

    comparisonComplete:
      false,

    passwordBuilderComplete:
      false,

    passwordLabComplete:
      false,

    /*
      Never add a password-value property here.

      The pretend password entered by a student
      should exist only inside the input field
      while the analyzer checks it.
    */


    /* -------------------------------------------------
       TRAINING 2 — PASSWORD CRACKER CHALLENGE
    ------------------------------------------------- */

    passwordAttackIndex:
      0,

    passwordAttackCorrect:
      0,

    passwordAttackAnswered:
      false,

    passwordAttackComplete:
      false,


    /* -------------------------------------------------
       TRAINING 3 — TWO-FACTOR SECURITY GATE
    ------------------------------------------------- */

    twoFactorIndex:
      0,

    twoFactorCorrect:
      0,

    twoFactorAnswered:
      false,

    twoFactorComplete:
      false,


    /* -------------------------------------------------
       TRAINING 4 — ACCOUNT DEFENSE SIMULATOR
    ------------------------------------------------- */

    accountDefenseIndex:
      0,

    accountDefenseCorrect:
      0,

    accountDefenseAnswered:
      false,

    accountDefenseComplete:
      false,

    trainingComplete:
      false,


    /* -------------------------------------------------
       PASSWORD VAULT PRACTICE
    ------------------------------------------------- */

    vaultIndex:
      0,

    vaultDoorsSecured:
      0,

    vaultAnswered:
      false,

    vaultComplete:
      false,


    /* -------------------------------------------------
       FINAL TEST
    ------------------------------------------------- */

    testIndex:
      0,

    testCorrect:
      0,

    testAnswered:
      false,

    finalScore:
      0,

    badgeEarned:
      false,


    /* -------------------------------------------------
       REWARDS
    ------------------------------------------------- */

    missionPointsEarned:
      0
  };


  /* =====================================================
     BASIC HELPERS
  ===================================================== */

  mission.byId =
    function byId(id) {
      return document.getElementById(
        id
      );
    };


  mission.randomItem =
    function randomItem(items) {
      if (
        !Array.isArray(items) ||
        items.length === 0
      ) {
        return null;
      }

      return items[
        Math.floor(
          Math.random() *
            items.length
        )
      ];
    };


  mission.shuffleItems =
    function shuffleItems(items) {
      if (!Array.isArray(items)) {
        return [];
      }

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
    };


  mission.safeNumber =
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
    };


  mission.escapeHtml =
    function escapeHtml(value) {
      return String(value)
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
    };


  mission.showElement =
    function showElement(element) {
      element?.classList.remove(
        "hidden"
      );
    };


  mission.hideElement =
    function hideElement(element) {
      element?.classList.add(
        "hidden"
      );
    };


  mission.setText =
    function setText(
      id,
      value
    ) {
      const element =
        mission.byId(id);

      if (element) {
        element.textContent =
          String(value);
      }
    };


  mission.setHtml =
    function setHtml(
      id,
      value
    ) {
      const element =
        mission.byId(id);

      if (element) {
        element.innerHTML =
          String(value);
      }
    };


  /* =====================================================
     SECTION SWITCHING
  ===================================================== */

  mission.showSection =
    function showSection(
      sectionId,
      options = {}
    ) {
      const {
        scroll = true,
        behavior = "smooth"
      } = options;

      SECTION_IDS.forEach(
        (id) => {
          mission
            .byId(id)
            ?.classList.add(
              "hidden"
            );
        }
      );

      const activeSection =
        mission.byId(
          sectionId
        );

      if (!activeSection) {
        console.error(
          `Password mission section not found: ${sectionId}`
        );

        return false;
      }

      activeSection.classList.remove(
        "hidden"
      );

      mission.state.currentSection =
        sectionId;

      if (scroll) {
        activeSection.scrollIntoView({
          behavior,
          block:
            "start"
        });
      }

      if (
        typeof mission
          .savePasswordProgress ===
        "function"
      ) {
        mission.savePasswordProgress();
      }

      return true;
    };


  mission.getVisibleSectionId =
    function getVisibleSectionId() {
      const visibleSection =
        SECTION_IDS.find(
          (id) => {
            const section =
              mission.byId(id);

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
        "passwordMissionAlert"
      );
    };


  mission.getSectionIds =
    function getSectionIds() {
      return [
        ...SECTION_IDS
      ];
    };


  /* =====================================================
     MEME HELP SYSTEM
  ===================================================== */

  mission.setMemeTip =
    function setMemeTip(
      message,
      mood = "thinking"
    ) {
      const tip =
        mission.byId(
          "passwordMemeTip"
        );

      const image =
        mission.byId(
          "passwordMemeImage"
        );

      if (tip) {
        tip.textContent =
          message;
      }

      if (!image) {
        return;
      }

      const images = {
        thinking:
          "../assets/mascot/thinking.png",

        wrong:
          "../assets/mascot/wrong.png",

        congrats:
          "../assets/mascot/congrats.png",

        welcome:
          "../assets/mascot/welcome.png"
      };

      image.src =
        images[mood] ||
        images.thinking;
    };


  mission.installHelpButtons =
    function installHelpButtons() {
      document
        .querySelectorAll(
          ".password-help-button"
        )
        .forEach(
          (button) => {
            if (
              button.dataset
                .helpBound ===
              "true"
            ) {
              return;
            }

            button.dataset.helpBound =
              "true";

            button.addEventListener(
              "click",
              () => {
                mission.setMemeTip(
                  button.dataset.tip ||
                    "Ask a trusted adult whenever you are unsure.",
                  "thinking"
                );
              }
            );
          }
        );
    };


  /* =====================================================
     HERO NAME
  ===================================================== */

  mission.getSavedHeroName =
    function getSavedHeroName() {
      const fallback =
        "Cyber Mentee";

      try {
        const savedHero =
          localStorage.getItem(
            "safetiiHero"
          );

        if (!savedHero) {
          return fallback;
        }

        const hero =
          JSON.parse(
            savedHero
          );

        const possibleNames = [
          hero?.name,
          hero?.heroName,
          hero?.username
        ];

        const validName =
          possibleNames.find(
            (value) => {
              return (
                typeof value ===
                  "string" &&
                value.trim()
              );
            }
          );

        return validName
          ? validName.trim()
          : fallback;
      } catch (error) {
        console.error(
          "Could not load the saved hero name:",
          error
        );

        return fallback;
      }
    };


  mission.loadHeroNames =
    function loadHeroNames() {
      const heroName =
        mission.getSavedHeroName();

      [
        "passwordHeroName",
        "passwordFinalHeroName"
      ].forEach(
        (id) => {
          mission.setText(
            id,
            heroName
          );
        }
      );
    };


  /* =====================================================
     GLOBAL POINTS
  ===================================================== */

  mission.getTotalPoints =
    function getTotalPoints() {
      const possibleKeys = [
        "safetiiPoints",
        "safetiiGlobalPoints"
      ];

      for (
        const key of possibleKeys
      ) {
        const value =
          Number(
            localStorage.getItem(
              key
            )
          );

        if (
          Number.isFinite(
            value
          )
        ) {
          return Math.max(
            0,
            value
          );
        }
      }

      return 0;
    };


  mission.setTotalPoints =
    function setTotalPoints(
      points
    ) {
      const safePoints =
        Math.max(
          0,
          Number(points) ||
            0
        );

      localStorage.setItem(
        "safetiiPoints",
        String(safePoints)
      );

      localStorage.setItem(
        "safetiiGlobalPoints",
        String(safePoints)
      );

      mission.updatePointsDisplay();
    };


  mission.addPoints =
    function addPoints(
      amount
    ) {
      const safeAmount =
        Math.max(
          0,
          Number(amount) ||
            0
        );

      const newTotal =
        mission.getTotalPoints() +
        safeAmount;

      mission.setTotalPoints(
        newTotal
      );

      return newTotal;
    };


  mission.updatePointsDisplay =
    function updatePointsDisplay() {
      mission.setText(
        "passwordMissionPoints",
        mission.getTotalPoints()
      );
    };


  /* =====================================================
     BUTTON HELPERS
  ===================================================== */

  mission.setButtonState =
    function setButtonState({
      id,
      unlocked,
      unlockedText,
      lockedText
    }) {
      const button =
        mission.byId(id);

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

      if (
        unlocked &&
        unlockedText
      ) {
        button.textContent =
          unlockedText;
      }

      if (
        !unlocked &&
        lockedText
      ) {
        button.textContent =
          lockedText;
      }
    };


  mission.disableButtons =
    function disableButtons(
      selector
    ) {
      document
        .querySelectorAll(
          selector
        )
        .forEach(
          (button) => {
            button.disabled =
              true;
          }
        );
    };


  mission.enableButtons =
    function enableButtons(
      selector
    ) {
      document
        .querySelectorAll(
          selector
        )
        .forEach(
          (button) => {
            button.disabled =
              false;

            button.classList.remove(
              "correct",
              "incorrect",
              "selected",
              "shake",
              "active-choice"
            );
          }
        );
    };


  /* =====================================================
     FEEDBACK HELPERS
  ===================================================== */

  mission.setFeedback =
    function setFeedback({
      id,
      message,
      correct = null
    }) {
      const element =
        mission.byId(id);

      if (!element) {
        return;
      }

      element.textContent =
        message;

      element.classList.remove(
        "feedback-correct",
        "feedback-wrong"
      );

      element.style.color =
        "";

      if (correct === true) {
        element.classList.add(
          "feedback-correct"
        );

        element.style.color =
          "#16764f";
      }

      if (correct === false) {
        element.classList.add(
          "feedback-wrong"
        );

        element.style.color =
          "#b53d57";
      }
    };


  mission.clearFeedback =
    function clearFeedback(
      id
    ) {
      const element =
        mission.byId(id);

      if (!element) {
        return;
      }

      element.textContent =
        "";

      element.classList.remove(
        "feedback-correct",
        "feedback-wrong"
      );

      element.style.color =
        "";
    };


  /* =====================================================
     STATE RESET
  ===================================================== */

  mission.resetState =
    function resetState() {
      const state =
        mission.state;

      state.missionStarted =
        false;

      state.missionCompleted =
        false;

      state.currentSection =
        "passwordMissionAlert";


      /* Password Safety Lab */

      state.comparisonIndex =
        0;

      state.comparisonCorrect =
        0;

      state.comparisonAnswered =
        false;

      state.comparisonComplete =
        false;

      state.passwordBuilderComplete =
        false;

      state.passwordLabComplete =
        false;


      /* Password Cracker */

      state.passwordAttackIndex =
        0;

      state.passwordAttackCorrect =
        0;

      state.passwordAttackAnswered =
        false;

      state.passwordAttackComplete =
        false;


      /* Two-Factor Gate */

      state.twoFactorIndex =
        0;

      state.twoFactorCorrect =
        0;

      state.twoFactorAnswered =
        false;

      state.twoFactorComplete =
        false;


      /* Account Defense */

      state.accountDefenseIndex =
        0;

      state.accountDefenseCorrect =
        0;

      state.accountDefenseAnswered =
        false;

      state.accountDefenseComplete =
        false;

      state.trainingComplete =
        false;


      /* Vault */

      state.vaultIndex =
        0;

      state.vaultDoorsSecured =
        0;

      state.vaultAnswered =
        false;

      state.vaultComplete =
        false;


      /* Final Test */

      state.testIndex =
        0;

      state.testCorrect =
        0;

      state.testAnswered =
        false;

      state.finalScore =
        0;

      state.badgeEarned =
        false;


      /* Rewards */

      state.missionPointsEarned =
        0;
    };


  /* =====================================================
     RESET PAGE DISPLAY
  ===================================================== */

  mission.resetPageDisplay =
    function resetPageDisplay() {
      const counters = {
        passwordLabProgress:
          0,

        passwordAttackProgress:
          0,

        twoFactorProgress:
          0,

        accountDefenseProgress:
          0,

        vaultDoorsSecured:
          0,

        vaultDoorNumber:
          1,

        passwordTestNumber:
          1,

        passwordFinalScore:
          "0%",

        passwordPointsEarned:
          0
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


      [
        "passphraseFeedback",
        "passwordAttackFeedback",
        "twoFactorFeedback",
        "accountDefenseFeedback",
        "vaultChallengeFeedback",
        "passwordTestFeedback"
      ].forEach(
        (id) => {
          mission.clearFeedback(
            id
          );
        }
      );


      /* Clear the pretend-password field */

      const practiceInput =
        mission.byId(
          "practicePasswordInput"
        );

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


      const typedPart =
        mission.byId(
          "typedPasswordPart"
        );

      if (typedPart) {
        typedPart.classList.add(
          "locked-lab-part"
        );

        typedPart.classList.remove(
          "unlocked"
        );
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


      /* Password Cracker */

      mission.hideElement(
        mission.byId(
          "nextPasswordAttack"
        )
      );


      /* Two-Factor Gate */

      mission.hideElement(
        mission.byId(
          "nextTwoFactorScenario"
        )
      );

      mission.hideElement(
        mission.byId(
          "twoFactorCompletion"
        )
      );

      const layerTwo =
        mission.byId(
          "securityGateLayerTwo"
        );

      layerTwo?.classList.remove(
        "active",
        "correct",
        "incorrect"
      );

      mission.setText(
        "securityGateSecondFactor",
        "Second Layer Needed"
      );


      /* Account Defense */

      mission.hideElement(
        mission.byId(
          "nextAccountDefenseScenario"
        )
      );

      mission.hideElement(
        mission.byId(
          "accountDefenseCompletion"
        )
      );


      mission.setButtonState({
        id:
          "finishPasswordTraining",

        unlocked:
          false,

        unlockedText:
          "Enter Password Vault Practice 🏰",

        lockedText:
          "Complete Account Defense Training First"
      });


      mission.setButtonState({
        id:
          "goPasswordFinalTest",

        unlocked:
          false,

        unlockedText:
          "Begin Final Vault Inspection 🛡️",

        lockedText:
          "Secure All 5 Doors to Unlock the Final Test"
      });


      [
        "passphraseChoiceGrid",
        "passwordCheckGrid",
        "passwordImprovementList",
        "passwordAttackWeaknessList",
        "secondFactorChoiceGrid",
        "accountDefenseChoiceGrid",
        "vaultAnswerGrid",
        "passwordTestChoiceGrid"
      ].forEach(
        (id) => {
          const element =
            mission.byId(id);

          if (element) {
            element.innerHTML =
              "";
          }
        }
      );
    };


  /* =====================================================
     SAVED-PROGRESS RESET
  ===================================================== */

  mission.clearSavedProgress =
    function clearSavedProgress() {
      const keys = [
        "safetiiPasswordProgress",
        "passwordMissionCompleted",
        "passwordBadgeEarned",
        "passwordReplayRequested"
      ];

      keys.forEach(
        (key) => {
          localStorage.removeItem(
            key
          );
        }
      );
    };


  mission.resetMission =
    function resetMission({
      clearSavedProgress = true
    } = {}) {
      if (clearSavedProgress) {
        mission.clearSavedProgress();
      }

      mission.resetState();
      mission.resetPageDisplay();

      mission.showSection(
        "passwordMissionAlert",
        {
          scroll:
            true,

          behavior:
            "auto"
        }
      );

      mission.setMemeTip(
        "The Password Vault is ready for a new cybersecurity mission.",
        "welcome"
      );

      mission.updatePointsDisplay();
      mission.loadHeroNames();
    };


  /* =====================================================
     SAFE STORAGE HELPERS

     These helpers must never receive the value typed
     into #practicePasswordInput.
  ===================================================== */

  mission.readJson =
    function readJson(
      key,
      fallback = null
    ) {
      try {
        const raw =
          localStorage.getItem(
            key
          );

        if (!raw) {
          return fallback;
        }

        return JSON.parse(
          raw
        );
      } catch (error) {
        console.error(
          `Could not read ${key}:`,
          error
        );

        return fallback;
      }
    };


  mission.writeJson =
    function writeJson(
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
    };


  /* =====================================================
     CORE INITIALIZATION
  ===================================================== */

  function initializeCore() {
    mission.loadHeroNames();
    mission.updatePointsDisplay();
    mission.installHelpButtons();

    mission.setMemeTip(
      "Welcome to the Password Vault. Learn how attackers guess passwords and how defenders protect accounts.",
      "welcome"
    );

    mission.coreReady =
      true;

    document.dispatchEvent(
      new CustomEvent(
        "passwordCoreReady"
      )
    );

    console.log(
      "Password Safe Keeper curriculum core loaded."
    );
  }


  if (
    document.readyState ===
    "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      initializeCore,
      {
        once:
          true
      }
    );
  } else {
    initializeCore();
  }
})();
