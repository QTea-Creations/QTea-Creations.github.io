"use strict";

/* =========================================================
   SAFETII NET — IDENTITY ISLAND
   Main Controller
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
    "usernameZone",
    "practiceZone",
    "identityCardZone",
    "testIntroZone",
    "testZone",
    "missionResult"
  ];

  function hasFunction(functionName) {
    const exists =
      typeof game[functionName] ===
      "function";

    if (!exists) {
      console.error(
        `Identity Island function is missing: ${functionName}`
      );
    }

    return exists;
  }

  function saveProgressSoon() {
    window.setTimeout(() => {
      if (
        typeof game.saveIdentityProgress ===
        "function"
      ) {
        game.saveIdentityProgress();
      }
    }, 100);
  }

  /* =====================================================
     SECTION COMPATIBILITY

     identity-core.js does not currently include
     testIntroZone in its list. This replacement prevents
     two mission sections from appearing at once.
  ===================================================== */

  function installCompleteSectionSwitcher() {
    game.showSection =
      function showSection(sectionId) {
        SECTION_IDS.forEach((id) => {
          const section =
            document.getElementById(id);

          if (section) {
            section.classList.add(
              "hidden"
            );
          }
        });

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

     The restored HTML uses newer lesson names than the
     current identity-data.js. These lessons are added only
     when the matching key is missing.
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
          "Sensitive information includes details that could identify you, locate you, contact you, access your accounts, or help someone pretend to be you. Keep names, addresses, phone numbers, birthdays, school details, passwords, and exact locations private."
      },

      safeSharing: {
        title:
          "💬 Safe Sharing",

        text:
          "Before sharing online, ask whether the information could reveal who you are or where you can be found. General interests such as a favorite color, animal, hobby, or game are usually safer than personal details."
      },

      usernames: {
        title:
          "🎮 Safe Usernames",

        text:
          "A safe username should not include your real name, birthday, school, address, phone number, or location. Use made-up words and general interests instead."
      },

      passwords: {
        title:
          "🔑 Password Protection",

        text:
          "Passwords are private and should never be shared with friends or strangers. Use a strong, unique password and ask a trusted adult for help managing it."
      },

      trustedAdults: {
        title:
          "🤝 Trusted Adults",

        text:
          "A trusted adult can help when someone asks for private information, makes you uncomfortable, or pressures you to keep an online secret. Stop and ask for help before responding."
      },

      digitalFootprint: {
        title:
          "👣 Digital Footprints",

        text:
          "Posts, photos, comments, usernames, and messages can leave a digital footprint. Pause before sharing because online information can be copied, saved, or seen by more people than you expected."
      }
    };

    Object.entries(
      requiredLessons
    ).forEach(([key, lesson]) => {
      if (
        !game.data.lessons[key]
      ) {
        game.data.lessons[key] =
          lesson;
      }
    });
  }

  /* =====================================================
     OLD USERNAME BUTTON COMPATIBILITY

     identity-activities.js creates the working Safe and
     Unsafe buttons after generating a username.

     The restored HTML also contains an older disabled pair,
     so this hides only that unused older pair.
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
     MAIN BUTTON HANDLER
  ===================================================== */

  function handleButtonClick(event) {
    if (
      !(event.target instanceof Element)
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
        clickedElement.dataset.object;

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
       USERNAME LAB
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
        clickedElement.dataset.choice ||
        clickedElement.dataset.answer;

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
       OPTIONAL IDENTITY REPAIR BUTTON

       Backpack Rescue normally moves to this section
       automatically. This keeps the button functional
       if it is enabled later.
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
        typeof game.loadIdentityProfile ===
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
      id === "clearRepairedUsername" ||
      id === "clearUsernameBlocks"
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
      id === "checkRepairedUsername"
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
       FINAL TEST INTRODUCTION
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

    /* -------------------------------------------------
       FINAL TEST ANSWERS
    ------------------------------------------------- */

    if (
      clickedElement.matches(
        ".test-choice"
      )
    ) {
      const answer =
        clickedElement.dataset.answer;

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
   REPLAY MISSION
------------------------------------------------- */

if (
  id === "retryMission"
) {
  const confirmed =
    window.confirm(
      "Replay Identity Island from the beginning?"
    );

  if (!confirmed) {
    return;
  }

  /*
    Reset the four new Identity Foundations games.
  */
  localStorage.removeItem(
    "safetiiIdentityFoundationsV1"
  );

  /*
    Do not remove:
    identityFoundationsRewardAwarded

    Keeping that key prevents children from earning
    the same 50-point Foundations reward repeatedly.
  */

  window.location.href =
    "identity.html?replay=true";

  return;
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

          event.dataTransfer.effectAllowed =
            "move";
        }
      );
    }

    document
      .querySelectorAll(
        ".sorting-zone, .sort-zone"
      )
      .forEach((zone) => {
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
      });
  }

  /* =====================================================
     USERNAME BUILDER DRAG AND DROP
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
      Prevent the controller from being installed twice.
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
      typeof game.loadMissionHeroName ===
      "function"
    ) {
      game.loadMissionHeroName();
    }

    if (
      typeof game.updateMissionPointsDisplay ===
      "function"
    ) {
      game.updateMissionPointsDisplay();
    }

    /*
      One delegated click handler controls the page.
      There is no second identity-card listener.
    */
    document.addEventListener(
      "click",
      handleButtonClick
    );

    setupBackpackDragAndDrop();
    setupUsernameBuilderDropZone();

    game.controllerReady = true;

    /*
      identity-progress.js waits for this event before
      restoring the saved mission.
    */
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
