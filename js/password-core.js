"use strict";

/* =========================================================
   SAFETII NET — PASSWORD SAFE KEEPER
   Mission 2 Core

   This file creates:
   - Shared mission state
   - Section switching
   - Meme help system
   - Hero-name loading
   - Points display
   - Progress helpers
   - Mission reset helpers
========================================================= */

(() => {
  const mission =
    window.PasswordMission =
      window.PasswordMission || {};


  /* =====================================================
     SECTION ORDER

     Only one mission section should be visible at a time.
  ===================================================== */

  const SECTION_IDS = [
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

    /* Training 1 */

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
      The password typed into the practice field is
      intentionally never stored here.
    */


    /* Training 2 */

    uniquePasswordIndex:
      0,

    uniquePasswordCorrect:
      0,

    uniquePasswordAnswered:
      false,

    uniquePasswordComplete:
      false,


    /* Training 3 */

    codeKeeperIndex:
      0,

    codeKeeperCorrect:
      0,

    codeKeeperAnswered:
      false,

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

    vaultAnswered:
      false,

    vaultComplete:
      false,


    /* Final Test */

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


    /* Rewards */

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
          block: "start"
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
      const visible =
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
        visible ||
        "passwordMissionAlert"
      );
    };


  mission.getSectionIds =
    function getSectionIds() {
      return [...SECTION_IDS];
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

        if (
          typeof hero?.name ===
            "string" &&
          hero.name.trim()
        ) {
          return hero.name.trim();
        }

        /*
          Support older hero formats.
        */

        if (
          typeof hero
            ?.heroName ===
            "string" &&
          hero.heroName.trim()
        ) {
          return hero.heroName.trim();
        }

        if (
          typeof hero
            ?.username ===
            "string" &&
          hero.username.trim()
        ) {
          return hero.username.trim();
        }

        return fallback;
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
      const name =
        mission.getSavedHeroName();

      [
        "passwordHeroName",
        "passwordFinalHeroName"
      ].forEach(
        (id) => {
          mission.setText(
            id,
            name
          );
        }
      );
    };


  /* =====================================================
     GLOBAL POINTS
  ===================================================== */

  mission.getTotalPoints =
    function getTotalPoints() {
      const keys = [
        "safetiiPoints",
        "safetiiGlobalPoints"
      ];

      for (
        const key of keys
      ) {
        const stored =
          Number(
            localStorage.getItem(
              key
            )
          );

        if (
          Number.isFinite(
            stored
          )
        ) {
          return Math.max(
            0,
            stored
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

      /*
        Keep both keys synchronized because older
        Safetii Net pages may use either one.
      */

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
              "shake",
              "selected"
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
     RESET STATE
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


      state.uniquePasswordIndex =
        0;

      state.uniquePasswordCorrect =
        0;

      state.uniquePasswordAnswered =
        false;

      state.uniquePasswordComplete =
        false;


      state.codeKeeperIndex =
        0;

      state.codeKeeperCorrect =
        0;

      state.codeKeeperAnswered =
        false;

      state.codeKeeperComplete =
        false;


      state.selectedRescueSteps =
        [];

      state.rescueComplete =
        false;

      state.trainingComplete =
        false;


      state.vaultIndex =
        0;

      state.vaultDoorsSecured =
        0;

      state.vaultAnswered =
        false;

      state.vaultComplete =
        false;


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

      state.missionPointsEarned =
        0;
    };


  /* =====================================================
     CLEAR PAGE ELEMENTS FOR REPLAY
  ===================================================== */

  mission.resetPageDisplay =
    function resetPageDisplay() {
      const values = {
        passwordLabProgress:
          0,

        uniquePasswordProgress:
          0,

        codeKeeperProgress:
          0,

        accountRescueProgress:
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
        values
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
        "uniquePasswordFeedback",
        "codeKeeperFeedback",
        "accountRescueFeedback",
        "vaultChallengeFeedback",
        "passwordTestFeedback"
      ].forEach(
        (id) => {
          mission.clearFeedback(
            id
          );
        }
      );


      const practiceInput =
        mission.byId(
          "practicePasswordInput"
        );

      if (practiceInput) {
        /*
          Never preserve or restore the typed
          practice password.
        */

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
          "Complete Password Safety Lab",

        lockedText:
          "Build a Strong Practice Password to Continue"
      });


      mission.setButtonState({
        id:
          "finishPasswordTraining",

        unlocked:
          false,

        unlockedText:
          "Enter Password Vault Practice",

        lockedText:
          "Complete Account Rescue First"
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


      const rescueList =
        mission.byId(
          "rescueOrderList"
        );

      if (rescueList) {
        rescueList.innerHTML =
          "";
      }


      [
        "passphraseChoiceGrid",
        "passwordCheckGrid",
        "passwordImprovementList",
        "rescueStepBank",
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
     CLEAR SAVED PROGRESS
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
        "The Password Vault is ready for a new training mission.",
        "welcome"
      );

      mission.updatePointsDisplay();
      mission.loadHeroNames();
    };


  /* =====================================================
     SAFE STORAGE HELPERS

     These helpers never receive or store the value typed
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
      "Welcome to the Password Vault. Complete each training room to earn the Password Safe Keeper badge.",
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
      "Password Safe Keeper core loaded."
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
        once: true
      }
    );
  } else {
    initializeCore();
  }
})();
