"use strict";

/* =========================================================
   SAFETII NET — IDENTITY ISLAND
   MAIN CONTROLLER
========================================================= */

(() => {
  const game = window.IdentityGame;

  if (!game) {
    console.error(
      "IdentityGame is missing. Check the Identity Island script order."
    );

    return;
  }

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

  function run(functionName, ...args) {
    if (
      typeof game[
        functionName
      ] !== "function"
    ) {
      console.error(
        `Identity Island function is missing: ${functionName}`
      );

      return false;
    }

    game[functionName](...args);

    return true;
  }

  function saveSoon() {
    window.setTimeout(() => {
      if (
        typeof game
          .saveIdentityProgress ===
        "function"
      ) {
        game.saveIdentityProgress();
      }
    }, 100);
  }

  /* =====================================================
     SECTION SWITCHER
  ===================================================== */

  function installSectionSwitcher() {
    game.showSection =
      function showSection(
        sectionId
      ) {
        SECTION_IDS.forEach(
          (id) => {
            document
              .getElementById(id)
              ?.classList.add(
                "hidden"
              );
          }
        );

        const activeSection =
          document.getElementById(
            sectionId
          );

        if (!activeSection) {
          console.error(
            `Section not found: ${sectionId}`
          );

          return;
        }

        activeSection.classList.remove(
          "hidden"
        );

        activeSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      };
  }

  /* =====================================================
     LESSON COMPATIBILITY
  ===================================================== */

  function installLessonCompatibility() {
    if (!game.data) {
      return;
    }

    game.data.lessons =
      game.data.lessons || {};

    const lessons = {
      sensitiveInformation: {
        title:
          "🔐 Sensitive Information",

        text:
          "Sensitive information includes details that could identify you, locate you, contact you, access your accounts, or help someone pretend to be you."
      },

      safeSharing: {
        title:
          "💬 Safe Sharing",

        text:
          "Before sharing online, ask whether the information could reveal who you are or where you can be found."
      },

      usernames: {
        title:
          "🎮 Safe Usernames",

        text:
          "A safe username should not include your real name, birthday, school, address, phone number, or location."
      },

      passwords: {
        title:
          "🔑 Password Protection",

        text:
          "Passwords are private and should never be shared with friends or strangers."
      },

      trustedAdults: {
        title:
          "🤝 Trusted Adults",

        text:
          "A trusted adult can help when someone asks for private information or makes you uncomfortable online."
      },

      digitalFootprint: {
        title:
          "👣 Digital Footprints",

        text:
          "Posts, photos, comments, usernames, and messages can leave a digital footprint."
      }
    };

    Object.entries(
      lessons
    ).forEach(
      ([key, lesson]) => {
        if (
          !game.data.lessons[key]
        ) {
          game.data.lessons[key] =
            lesson;
        }
      }
    );
  }

  /* =====================================================
     HIDE OLD USERNAME BUTTONS
  ===================================================== */

  function hideUnusedUsernameButtons() {
    const oldSafeButton =
      document.getElementById(
        "markUsernameSafe"
      );

    const oldUnsafeButton =
      document.getElementById(
        "markUsernameUnsafe"
      );

    if (
      !oldSafeButton ||
      !oldUnsafeButton
    ) {
      return;
    }

    oldSafeButton
      .closest(
        ".username-decision-buttons"
      )
      ?.classList.add(
        "hidden"
      );
  }

  /* =====================================================
     REPLAY MISSION
  ===================================================== */

  function replayMission() {
    const confirmed =
      window.confirm(
        "Replay Identity Island from the beginning?\n\n" +
        "This will reset all lessons, learning games, practice activities, and the final test."
      );

    if (!confirmed) {
      return;
    }

    const keysToReset = [
      "safetiiIdentityProgress",
      "safetiiIdentityFoundationsV1",
      "identityCurrentStep",
      "identityFoundObjects",
      "identityUsernameProgress",
      "identityBackpackProgress",
      "identityProfileProgress",
      "identityTestProgress",
      "identityStickers"
    ];

    keysToReset.forEach(
      (key) => {
        localStorage.removeItem(
          key
        );
      }
    );

    /*
      Keep the reward key so replaying cannot
      award the same 50 points repeatedly.
    */
    localStorage.setItem(
      "identityReplayRequested",
      "true"
    );

    window.location.replace(
      `${window.location.pathname}?replay=true&reset=${Date.now()}`
    );
  }

  /* =====================================================
     MAIN CLICK HANDLER
  ===================================================== */

  function handleButtonClick(
    event
  ) {
    if (
      !(
        event.target instanceof
        Element
      )
    ) {
      return;
    }

    const clicked =
      event.target.closest(
        "button, a"
      );

    if (!clicked) {
      return;
    }

    const id =
      clicked.id || "";

    if (
      id === "acceptMission"
    ) {
      if (
        run(
          "acceptMission"
        )
      ) {
        saveSoon();
      }

      return;
    }

    if (
      clicked.matches(
        ".island-object"
      )
    ) {
      const objectKey =
        clicked.dataset.object;

      if (
        objectKey &&
        run(
          "openLesson",
          objectKey,
          clicked
        )
      ) {
        saveSoon();
      }

      return;
    }

    if (
      id ===
        "closeLessonPopup" ||
      id ===
        "closeLesson"
    ) {
      run(
        "closeLessonPopup"
      );

      return;
    }

    if (
      clicked.matches(
        ".sticker"
      )
    ) {
      if (
        run(
          "collectSticker",
          clicked
        )
      ) {
        saveSoon();
      }

      return;
    }

    if (
      clicked.matches(
        ".meme-help-btn"
      )
    ) {
      run(
        "setMemeTip",
        clicked.dataset.tip ||
          "Ask a trusted adult whenever you are unsure.",
        "thinking"
      );

      return;
    }

    if (
      id === "goUsernameLab"
    ) {
      if (
        !clicked.disabled &&
        run(
          "openUsernameLab"
        )
      ) {
        saveSoon();
      }

      return;
    }

    if (
      id === "generateUsername"
    ) {
      if (!clicked.disabled) {
        run(
          "generateUsername"
        );
      }

      return;
    }

    if (
      id === "approveUsername"
    ) {
      if (
        !clicked.disabled &&
        run(
          "finishUsernameScan"
        )
      ) {
        saveSoon();
      }

      return;
    }

    if (
      id === "goBackpackRescue"
    ) {
      if (
        !clicked.disabled &&
        run(
          "startBackpackRescue"
        )
      ) {
        saveSoon();
      }

      return;
    }

    if (
      clicked.matches(
        ".sorting-zone, .sort-zone"
      )
    ) {
      const choice =
        clicked.dataset.choice ||
        clicked.dataset.answer;

      if (
        choice &&
        run(
          "answerPractice",
          choice,
          clicked
        )
      ) {
        saveSoon();
      }

      return;
    }

    if (
      id === "goIdentityRepair"
    ) {
      if (clicked.disabled) {
        return;
      }

      game.showSection(
        "identityCardZone"
      );

      run(
        "loadIdentityProfile"
      );

      saveSoon();

      return;
    }

    if (
      id === "identityFlipCard"
    ) {
      const cardInner =
        document.getElementById(
          "identityCardInner"
        );

      if (!cardInner) {
        return;
      }

      const flipped =
        cardInner.classList.toggle(
          "is-flipped"
        );

      clicked.setAttribute(
        "aria-pressed",
        String(flipped)
      );

      return;
    }

    if (
      id ===
        "clearRepairedUsername" ||
      id ===
        "clearUsernameBlocks"
    ) {
      run(
        "clearRepairBuilder"
      );

      return;
    }

    if (
      id ===
      "checkRepairedUsername"
    ) {
      if (
        !clicked.disabled &&
        run(
          "checkRepairedUsername"
        )
      ) {
        saveSoon();
      }

      return;
    }

    if (
      id === "goFinalTest"
    ) {
      if (
        !clicked.disabled &&
        run(
          "startFinalTest"
        )
      ) {
        saveSoon();
      }

      return;
    }

    if (
      id === "beginFinalTest"
    ) {
      if (
        run(
          "beginFinalTest"
        )
      ) {
        saveSoon();
      }

      return;
    }

    if (
      clicked.matches(
        ".test-choice"
      )
    ) {
      const answer =
        clicked.dataset.answer;

      if (
        answer &&
        run(
          "answerTest",
          answer,
          clicked
        )
      ) {
        saveSoon();
      }

      return;
    }

    if (
      id === "nextTest"
    ) {
      if (
        run(
          "nextTestQuestion"
        )
      ) {
        saveSoon();
      }

      return;
    }

    if (
      id === "retryMission"
    ) {
      replayMission();
    }
  }

  /* =====================================================
     BACKPACK DRAG AND DROP
  ===================================================== */

  function setupBackpackDragAndDrop() {
    const dragCard =
      document.getElementById(
        "dragItemCard"
      );

    dragCard?.addEventListener(
      "dragstart",
      (event) => {
        if (
          !event.dataTransfer
        ) {
          return;
        }

        event.dataTransfer.setData(
          "text/plain",
          "backpack-item"
        );

        event.dataTransfer
          .effectAllowed =
          "move";
      }
    );

    document
      .querySelectorAll(
        ".sorting-zone, .sort-zone"
      )
      .forEach(
        (zone) => {
          zone.addEventListener(
            "dragover",
            (event) => {
              event.preventDefault();

              zone.classList.add(
                "drag-over"
              );
            }
          );

          zone.addEventListener(
            "dragleave",
            () => {
              zone.classList.remove(
                "drag-over"
              );
            }
          );

          zone.addEventListener(
            "drop",
            (event) => {
              event.preventDefault();

              zone.classList.remove(
                "drag-over"
              );

              const choice =
                zone.dataset.choice ||
                zone.dataset.answer;

              if (
                choice &&
                run(
                  "answerPractice",
                  choice,
                  zone
                )
              ) {
                saveSoon();
              }
            }
          );
        }
      );
  }

  /* =====================================================
     USERNAME BUILDER DROP ZONE
  ===================================================== */

  function setupUsernameBuilderDropZone() {
    const buildZone =
      document.getElementById(
        "usernameBuildZone"
      );

    if (!buildZone) {
      return;
    }

    buildZone.addEventListener(
      "dragover",
      (event) => {
        event.preventDefault();

        buildZone.classList.add(
          "drag-over"
        );
      }
    );

    buildZone.addEventListener(
      "dragleave",
      () => {
        buildZone.classList.remove(
          "drag-over"
        );
      }
    );

    buildZone.addEventListener(
      "drop",
      (event) => {
        event.preventDefault();

        buildZone.classList.remove(
          "drag-over"
        );

        if (
          !event.dataTransfer
        ) {
          return;
        }

        const blockId =
          event.dataTransfer.getData(
            "text/plain"
          );

        if (!blockId) {
          return;
        }

        const block =
          Array.from(
            document.querySelectorAll(
              "[data-block-id]"
            )
          ).find(
            (element) =>
              element.dataset.blockId ===
              blockId
          );

        if (
          block &&
          run(
            "addRepairBlock",
            block
          )
        ) {
          saveSoon();
        }
      }
    );
  }

  /* =====================================================
     REPLAY SCREEN RESET
  ===================================================== */

  function resetReplayScreen() {
    const parameters =
      new URLSearchParams(
        window.location.search
      );

    if (
      parameters.get(
        "replay"
      ) !== "true"
    ) {
      return;
    }

    game.showSection(
      "missionAlert"
    );

    if (
      game.state?.foundObjects instanceof
      Set
    ) {
      game.state.foundObjects.clear();
    }

    const objectsFound =
      document.getElementById(
        "objectsFound"
      );

    if (objectsFound) {
      objectsFound.textContent =
        "0";
    }

    document
      .querySelectorAll(
        ".island-object"
      )
      .forEach(
        (object) => {
          object.classList.remove(
            "found",
            "completed",
            "correct-glow"
          );

          object.disabled =
            false;
        }
      );

    document
      .querySelectorAll(
        ".sticker"
      )
      .forEach(
        (sticker) => {
          sticker.classList.remove(
            "collected"
          );

          sticker.disabled =
            false;
        }
      );

    const usernameButton =
      document.getElementById(
        "goUsernameLab"
      );

    if (usernameButton) {
      usernameButton.disabled =
        true;

      usernameButton.classList.add(
        "locked-action"
      );
    }
  }

  /* =====================================================
     INITIALIZATION
  ===================================================== */

  function initializeIdentityIsland() {
    if (
      typeof game.byId !==
      "function"
    ) {
      console.error(
        "identity-core.js did not load correctly."
      );

      return;
    }

    if (
      game.controllerReady
    ) {
      return;
    }

    installSectionSwitcher();
    installLessonCompatibility();
    hideUnusedUsernameButtons();

    if (
      typeof game
        .loadMissionHeroName ===
      "function"
    ) {
      game.loadMissionHeroName();
    }

    if (
      typeof game
        .updateMissionPointsDisplay ===
      "function"
    ) {
      game.updateMissionPointsDisplay();
    }

    document.addEventListener(
      "click",
      handleButtonClick
    );

    setupBackpackDragAndDrop();
    setupUsernameBuilderDropZone();
    resetReplayScreen();

    game.controllerReady =
      true;

    document.dispatchEvent(
      new CustomEvent(
        "identityControllerReady"
      )
    );

    console.log(
      "Identity Island controller loaded successfully."
    );
  }

  if (
    document.readyState ===
    "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      initializeIdentityIsland,
      {
        once: true
      }
    );
  } else {
    initializeIdentityIsland();
  }
})();
