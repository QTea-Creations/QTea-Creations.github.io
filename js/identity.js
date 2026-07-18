"use strict";

/* =========================================================
   SAFETII NET — IDENTITY ISLAND
   MAIN CONTROLLER

   Controls:
   - Mission buttons
   - Island objects
   - Stickers
   - Meme help
   - Username Lab
   - Backpack Rescue
   - Identity Repair
   - Final Test
   - Mission replay
========================================================= */

(() => {
  const game =
    window.IdentityGame;

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

  function hasFunction(
    functionName
  ) {
    const exists =
      typeof game[
        functionName
      ] === "function";

    if (!exists) {
      console.error(
        `Identity Island function is missing: ${functionName}`
      );
    }

    return exists;
  }

  function saveProgressSoon() {
    window.setTimeout(
      () => {
        if (
          typeof game
            .saveIdentityProgress ===
          "function"
        ) {
          game.saveIdentityProgress();
        }
      },
      100
    );
  }

  /* =====================================================
     SECTION SWITCHER
  ===================================================== */

  function installCompleteSectionSwitcher() {
    game.showSection =
      function showSection(
        sectionId
      ) {
        SECTION_IDS.forEach(
          (id) => {
            const section =
              document.getElementById(
                id
              );

            if (section) {
              section.classList.add(
                "hidden"
              );
            }
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

    const requiredLessons = {
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
      requiredLessons
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
     HIDE UNUSED OLD USERNAME BUTTONS
  ===================================================== */

  function hideUnusedUsernameButtons() {
    const safeButton =
      document.getElementById(
        "markUsernameSafe"
      );

    const unsafeButton =
      document.getElementById(
        "markUsernameUnsafe"
      );

    if (
      !safeButton ||
      !unsafeButton
    ) {
      return;
    }

    const container =
      safeButton.closest(
        ".username-decision-buttons"
      );

    if (container) {
      container.classList.add(
        "hidden"
      );
    }
  }

  /* =====================================================
     REPLAY MISSION
  ===================================================== */

  function replayMission() {
    const confirmed =
      window.confirm(
        "Replay Identity Island from the beginning?\n\n" +
        "Your mission progress will reset. Previously earned badge rewards will not be awarded twice."
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
      Do not remove:
      identityFoundationsRewardAwarded

      This prevents replaying the four new games
      from repeatedly awarding 50 points.
    */

    window.location.href =
      `${window.location.pathname}?replay=true`;
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

    const clickedElement =
      event.target.closest(
        "button, a"
      );

    if (!clickedElement) {
      return;
    }

    const id =
      clickedElement.id || "";

    /* -------------------------------------------------
       ACCEPT MISSION
    ------------------------------------------------- */

    if (
      id === "acceptMission"
    ) {
      if (
        hasFunction(
          "acceptMission"
        )
      ) {
        game.acceptMission();
        saveProgressSoon();
      }

      return;
    }

    /* -------------------------------------------------
       LEARNING OBJECTS
    ------------------------------------------------- */

    if (
      clickedElement.matches(
        ".island-object"
      )
    ) {
      const objectKey =
        clickedElement.dataset
          .object;

      if (
        objectKey &&
        hasFunction(
          "openLesson"
        )
      ) {
        game.openLesson(
          objectKey,
          clickedElement
        );

        saveProgressSoon();
      }

      return;
    }

    if (
      id === "closeLessonPopup" ||
      id === "closeLesson"
    ) {
      if (
        hasFunction(
          "closeLessonPopup"
        )
      ) {
        game.closeLessonPopup();
      }

      return;
    }

    /* -------------------------------------------------
       STICKERS
    ------------------------------------------------- */

    if (
      clickedElement.matches(
        ".sticker"
      )
    ) {
      if (
        hasFunction(
          "collectSticker"
        )
      ) {
        game.collectSticker(
          clickedElement
        );

        saveProgressSoon();
      }

      return;
    }

    /* -------------------------------------------------
       MEME HELP
    ------------------------------------------------- */

    if (
      clickedElement.matches(
        ".meme-help-btn"
      )
    ) {
      const tip =
        clickedElement.dataset.tip ||
        "Ask a trusted adult whenever you are unsure.";

      if (
        hasFunction(
          "setMemeTip"
        )
      ) {
        game.setMemeTip(
          tip,
          "thinking"
        );
      }

      return;
    }

    /* -------------------------------------------------
       OPEN FOUNDATIONS / USERNAME LAB
    ------------------------------------------------- */

    if (
      id === "goUsernameLab"
    ) {
      if (
        clickedElement.disabled
      ) {
        return;
      }

      if (
        hasFunction(
          "openUsernameLab"
        )
      ) {
        game.openUsernameLab();
        saveProgressSoon();
      }

      return;
    }

    /* -------------------------------------------------
       USERNAME LAB
    ------------------------------------------------- */

    if (
      id === "generateUsername"
    ) {
      if (
        clickedElement.disabled
      ) {
        return;
      }

      if (
        hasFunction(
          "generateUsername"
        )
      ) {
        game.generateUsername();
      }

      return;
    }

    if (
      id === "approveUsername"
    ) {
      if (
        clickedElement.disabled
      ) {
        return;
      }

      if (
        hasFunction(
          "finishUsernameScan"
        )
      ) {
        game.finishUsernameScan();
        saveProgressSoon();
      }

      return;
    }

    /* -------------------------------------------------
       BACKPACK RESCUE
    ------------------------------------------------- */

    if (
      id === "goBackpackRescue"
    ) {
      if (
        clickedElement.disabled
      ) {
        return;
      }

      if (
        hasFunction(
          "startBackpackRescue"
        )
      ) {
        game.startBackpackRescue();
        saveProgressSoon();
      }

      return;
    }

    if (
      clickedElement.matches(
        ".sorting-zone, .sort-zone"
      )
    ) {
      const choice =
        clickedElement.dataset
          .choice ||
        clickedElement.dataset
          .answer;

      if (
        choice &&
        hasFunction(
          "answerPractice"
        )
      ) {
        game.answerPractice(
          choice,
          clickedElement
        );

        saveProgressSoon();
      }

      return;
    }

    /* -------------------------------------------------
       OPTIONAL REPAIR BUTTON
    ------------------------------------------------- */

    if (
      id === "goIdentityRepair"
    ) {
      if (
        clickedElement.disabled
      ) {
        return;
      }

      game.showSection(
        "identityCardZone"
      );

      if (
        typeof game
          .loadIdentityProfile ===
        "function"
      ) {
        game.loadIdentityProfile();
      }

      saveProgressSoon();

      return;
    }

    /* -------------------------------------------------
       FLIP IDENTITY CARD
    ------------------------------------------------- */

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

      clickedElement.setAttribute(
        "aria-pressed",
        String(flipped)
      );

      return;
    }

    /* -------------------------------------------------
       USERNAME REPAIR BUILDER
    ------------------------------------------------- */

    if (
      id ===
        "clearRepairedUsername" ||
      id ===
        "clearUsernameBlocks"
    ) {
      if (
        hasFunction(
          "clearRepairBuilder"
        )
      ) {
        game.clearRepairBuilder();
      }

      return;
    }

    if (
      id ===
      "checkRepairedUsername"
    ) {
      if (
        clickedElement.disabled
      ) {
        return;
      }

      if (
        hasFunction(
          "checkRepairedUsername"
        )
      ) {
        game.checkRepairedUsername();
        saveProgressSoon();
      }

      return;
    }

    /* -------------------------------------------------
       FINAL TEST
    ------------------------------------------------- */

    if (
      id === "goFinalTest"
    ) {
      if (
        clickedElement.disabled
      ) {
        return;
      }

      if (
        hasFunction(
          "startFinalTest"
        )
      ) {
        game.startFinalTest();
        saveProgressSoon();
      }

      return;
    }

    if (
      id === "beginFinalTest"
    ) {
      if (
        hasFunction(
          "beginFinalTest"
        )
      ) {
        game.beginFinalTest();
        saveProgressSoon();
      }

      return;
    }

    if (
      clickedElement.matches(
        ".test-choice"
      )
    ) {
      const answer =
        clickedElement.dataset
          .answer;

      if (
        answer &&
        hasFunction(
          "answerTest"
        )
      ) {
        game.answerTest(
          answer,
          clickedElement
        );

        saveProgressSoon();
      }

      return;
    }

    if (
      id === "nextTest"
    ) {
      if (
        hasFunction(
          "nextTestQuestion"
        )
      ) {
        game.nextTestQuestion();
        saveProgressSoon();
      }

      return;
    }

    /* -------------------------------------------------
       REPLAY
    ------------------------------------------------- */

    if (
      id === "retryMission"
    ) {
      replayMission();
      return;
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

    if (dragCard) {
      dragCard.addEventListener(
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
    }

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
                hasFunction(
                  "answerPractice"
                )
              ) {
                game.answerPractice(
                  choice,
                  zone
                );

                saveProgressSoon();
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
          event.dataTransfer
            .getData(
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
              element.dataset
                .blockId ===
              blockId
          );

        if (
          block &&
          hasFunction(
            "addRepairBlock"
          )
        ) {
          game.addRepairBlock(
            block
          );

          saveProgressSoon();
        }
      }
    );
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

    /*
      Prevent the controller from installing twice.
    */
    if (
      game.controllerReady
    ) {
      return;
    }

    installCompleteSectionSwitcher();
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

    game.controllerReady = true;

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
