"use strict";

/* =========================================================
   SAFETII NET — IDENTITY ISLAND
   Main Controller
========================================================= */

(() => {
  const game = window.IdentityGame;

  if (!game) {
    console.error(
      "IdentityGame is missing. Check that the Identity Island scripts load in the correct order."
    );
    return;
  }

  function hasFunction(functionName) {
    const exists =
      typeof game[functionName] === "function";

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

  function resetPageDisplay() {
    const counterValues = {
      objectsFound: "0",
      usernamesChecked: "0",
      practiceCorrect: "0",
      profilesProtected: "0",
      testNumber: "1"
    };

    Object.entries(counterValues).forEach(
      ([id, value]) => {
        const element = game.byId(id);

        if (element) {
          element.textContent = value;
        }
      }
    );

    document
      .querySelectorAll(".island-object")
      .forEach((button) => {
        button.classList.remove(
          "discovered",
          "wiggle"
        );

        button.disabled = false;
      });

    document
      .querySelectorAll(".sticker")
      .forEach((button) => {
        button.classList.remove(
          "collected"
        );

        button.textContent = "⭐";
        button.disabled = false;
      });

    const usernameButton =
      game.byId("goUsernameLab");

    if (usernameButton) {
      usernameButton.disabled = true;

      usernameButton.classList.add(
        "locked-action"
      );

      usernameButton.textContent =
        "Unlock Safe Username Lab";
    }

    const backpackButton =
      game.byId("goBackpackRescue");

    if (backpackButton) {
      backpackButton.disabled = true;

      backpackButton.classList.add(
        "locked-action"
      );

      backpackButton.textContent =
        "Complete 3 Username Scans First";
    }

    const finalTestButton =
      game.byId("goFinalTest");

    if (finalTestButton) {
      finalTestButton.disabled = true;

      finalTestButton.classList.add(
        "locked-action"
      );

      finalTestButton.textContent =
        "Protect All 5 Profiles to Unlock the Final Test";
    }

    const generatedUsername =
      game.byId("generatedUsername");

    if (generatedUsername) {
      generatedUsername.textContent =
        "Press the button to generate a username!";
    }

    const checklist =
      game.byId("usernameChecklist");

    if (checklist) {
      checklist.innerHTML = `
        <p>
          Generate a username to begin the safety scan.
        </p>
      `;
    }

    const approveUsername =
      game.byId("approveUsername");

    if (approveUsername) {
      approveUsername.classList.add(
        "hidden"
      );
    }

    const lessonPopup =
      game.byId("lessonPopup");

    if (lessonPopup) {
      lessonPopup.classList.add(
        "hidden"
      );
    }

    const practiceFeedback =
      game.byId("practiceFeedback");

    if (practiceFeedback) {
      practiceFeedback.textContent = "";

      practiceFeedback.style.background =
        "transparent";
    }

    const wordBlockBank =
      game.byId("wordBlockBank");

    if (wordBlockBank) {
      wordBlockBank.innerHTML = "";
    }

    const selectedBlocks =
      game.byId(
        "selectedUsernameBlocks"
      );

    if (selectedBlocks) {
      selectedBlocks.innerHTML = "";
    }

    const repairedPreview =
      game.byId(
        "repairedUsernamePreview"
      );

    if (repairedPreview) {
      repairedPreview.textContent =
        "Waiting for three blocks...";
    }

    const buildMessage =
      game.byId("buildZoneMessage");

    if (buildMessage) {
      buildMessage.textContent =
        "Drop or click three safe blocks here.";
    }

    const repairFeedback =
      game.byId(
        "identityRepairFeedback"
      );

    if (repairFeedback) {
      repairFeedback.textContent = "";

      repairFeedback.style.background =
        "transparent";
    }

    const checkRepairButton =
      game.byId(
        "checkRepairedUsername"
      );

    if (checkRepairButton) {
      checkRepairButton.disabled = true;

      checkRepairButton.classList.add(
        "locked-action"
      );
    }

    const testQuestion =
      game.byId("testQuestion");

    if (testQuestion) {
      testQuestion.textContent = "";
    }

    const testFeedback =
      game.byId("testFeedback");

    if (testFeedback) {
      testFeedback.textContent = "";

      testFeedback.style.background =
        "transparent";
    }

    const nextTest =
      game.byId("nextTest");

    if (nextTest) {
      nextTest.classList.add(
        "hidden"
      );

      nextTest.textContent =
        "Next Question";
    }

    document
      .querySelectorAll(".test-choice")
      .forEach((button) => {
        button.disabled = false;

        button.classList.remove(
          "correct-glow",
          "shake"
        );
      });
  }

  function retryMission() {
    const confirmed = window.confirm(
      "Are you sure you want to replay Identity Island?\n\n" +
        "This will erase your current mission progress and return you to the beginning.\n\n" +
        "Points and badges you already earned will not be removed."
    );

    if (!confirmed) {
      return;
    }

    if (
      typeof game.resetMissionState ===
      "function"
    ) {
      game.resetMissionState();
    } else {
      game.state =
        game.state || {};

      game.state.foundObjects =
        new Set();

      game.state.foundStickers =
        new Set();

      game.state.generatedUsername =
        "";

      game.state.generatedUsernameIsSafe =
        true;

      game.state.generatedUsernameReason =
        "";

      game.state.usernamesChecked =
        0;

      game.state.usernameAwaitingApproval =
        false;

      game.state.practiceIndex =
        0;

      game.state.practiceCorrect =
        0;

      game.state.practiceAnswered =
        false;

      game.state.identityProfileIndex =
        0;

      game.state.profilesProtected =
        0;

      game.state.selectedRepairBlocks =
        [];

      game.state.profileRepairComplete =
        false;

      game.state.testIndex =
        0;

      game.state.testCorrect =
        0;

      game.state.testAnswered =
        false;
    }

    localStorage.removeItem(
      "safetiiIdentityProgress"
    );

    resetPageDisplay();

    if (
      typeof game.showSection ===
      "function"
    ) {
      game.showSection(
        "missionAlert"
      );
    }

    if (
      typeof game.setMemeTip ===
      "function"
    ) {
      game.setMemeTip(
        "Your mission has been reset. Accept the mission whenever you are ready!",
        "welcome"
      );
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  function handleButtonClick(event) {
    const clickedElement =
      event.target.closest(
        "button, a"
      );

    if (!clickedElement) {
      return;
    }

    const id =
      clickedElement.id || "";

    /* =====================================================
       MISSION INTRODUCTION
    ===================================================== */

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

    /* =====================================================
       LESSON POPUP
    ===================================================== */

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

    /* =====================================================
       STICKERS
    ===================================================== */

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

    /* =====================================================
       MEME HELP
    ===================================================== */

    if (
      clickedElement.matches(
        ".meme-help-btn"
      )
    ) {
      const tip =
        clickedElement.dataset.tip ||
        "Meme is here to help.";

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

    /* =====================================================
       USERNAME LAB
    ===================================================== */

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

    /* =====================================================
       BACKPACK RESCUE
    ===================================================== */

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
        ".sort-zone, .sorting-zone"
      )
    ) {
      const answer =
        clickedElement.dataset.answer ||
        clickedElement.dataset.choice;

      if (
        answer &&
        hasFunction(
          "answerPractice"
        )
      ) {
        game.answerPractice(
          answer,
          clickedElement
        );

        saveProgressSoon();
      }

      return;
    }

    /* =====================================================
       IDENTITY CARD
    ===================================================== */

    if (
      id === "identityFlipCard"
    ) {
      const cardInner =
        game.byId(
          "identityCardInner"
        );

      if (!cardInner) {
        return;
      }

      const isFlipped =
        cardInner.classList.toggle(
          "is-flipped"
        );

      clickedElement.setAttribute(
        "aria-pressed",
        String(isFlipped)
      );

      return;
    }

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

    /* =====================================================
       FINAL TEST
    ===================================================== */

    if (
      id === "goFinalTest"
    ) {
      if (
        clickedElement.disabled
      ) {
        return;
      }

      if (
        typeof game.openFinalTestIntro ===
        "function"
      ) {
        game.openFinalTestIntro();
      } else if (
        typeof game.startFinalTest ===
        "function"
      ) {
        game.startFinalTest();
      } else if (
        typeof game.showSection ===
        "function"
      ) {
        game.showSection(
          "testIntroZone"
        );
      } else {
        console.error(
          "Identity Island function is missing: openFinalTestIntro or startFinalTest"
        );
      }

      saveProgressSoon();
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
        clickedElement.dataset.answer;

      if (
        answer &&
        typeof game.answerFinalTest ===
          "function"
      ) {
        game.answerFinalTest(
          answer,
          clickedElement
        );

        saveProgressSoon();
      } else if (
        answer &&
        typeof game.answerTest ===
          "function"
      ) {
        game.answerTest(
          answer,
          clickedElement
        );

        saveProgressSoon();
      } else if (answer) {
        console.error(
          "Identity Island function is missing: answerFinalTest or answerTest"
        );
      }

      return;
    }

    if (
      id === "nextTest"
    ) {
      if (
        typeof game.nextFinalTestQuestion ===
        "function"
      ) {
        game.nextFinalTestQuestion();
        saveProgressSoon();
      } else if (
        typeof game.nextTestQuestion ===
        "function"
      ) {
        game.nextTestQuestion();
        saveProgressSoon();
      } else {
        console.error(
          "Identity Island function is missing: nextFinalTestQuestion or nextTestQuestion"
        );
      }

      return;
    }

    /* =====================================================
       REPLAY
    ===================================================== */

    if (
      id === "retryMission"
    ) {
      if (
        typeof game.retryMission ===
        "function"
      ) {
        game.retryMission();
      } else {
        retryMission();
      }

      return;
    }
  }

  function setupBackpackDragAndDrop() {
    const dragCard =
      game.byId("dragItemCard");

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
        ".sort-zone, .sorting-zone"
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

            const answer =
              zone.dataset.answer ||
              zone.dataset.choice;

            if (
              answer &&
              hasFunction(
                "answerPractice"
              )
            ) {
              game.answerPractice(
                answer,
                zone
              );

              saveProgressSoon();
            }
          }
        );
      });
  }

  function setupUsernameBuilderDropZone() {
    const buildZone =
      game.byId(
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
          document.querySelector(
            `[data-block-id="${blockId}"]`
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

  function handleReplayParameter() {
    const pageParameters =
      new URLSearchParams(
        window.location.search
      );

    const isReplay =
      pageParameters.get(
        "replay"
      ) === "true";

    if (!isReplay) {
      return;
    }

    localStorage.removeItem(
      "safetiiIdentityProgress"
    );

    if (
      typeof game.resetMissionState ===
      "function"
    ) {
      game.resetMissionState();
    }

    resetPageDisplay();

    if (
      typeof game.showSection ===
      "function"
    ) {
      game.showSection(
        "missionAlert"
      );
    }

    window.history.replaceState(
      {},
      document.title,
      window.location.pathname
    );
  }

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

    if (
      typeof game.loadMissionHeroName ===
      "function"
    ) {
      game.loadMissionHeroName();
    }

    document.addEventListener(
      "click",
      handleButtonClick
    );

    setupBackpackDragAndDrop();
    setupUsernameBuilderDropZone();
    handleReplayParameter();

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
