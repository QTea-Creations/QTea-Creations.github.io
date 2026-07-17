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
      profilesProtected: "0"
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
      });

    document
      .querySelectorAll(".sticker")
      .forEach((button) => {
        button.classList.remove(
          "collected"
        );

        button.textContent = "⭐";
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
      lessonPopup.classList.add("hidden");
    }
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

  /*
    Reset all in-memory mission state.
  */
  if (
    typeof game.resetMissionState ===
    "function"
  ) {
    game.resetMissionState();
  } else {
    game.state.foundObjects = new Set();
    game.state.foundStickers = new Set();

    game.state.generatedUsername = "";
    game.state.generatedUsernameIsSafe = true;
    game.state.generatedUsernameReason = "";
    game.state.usernamesChecked = 0;
    game.state.usernameAwaitingApproval = false;

    game.state.practiceIndex = 0;
    game.state.practiceCorrect = 0;
    game.state.practiceAnswered = false;

    game.state.identityProfileIndex = 0;
    game.state.profilesProtected = 0;
    game.state.selectedRepairBlocks = [];
    game.state.profileRepairComplete = false;

    game.state.testIndex = 0;
    game.state.testCorrect = 0;
    game.state.testAnswered = false;
  }

  /*
    Remove only the current mission-attempt progress.
    Earned points and badges remain untouched.
  */
  localStorage.removeItem(
    "safetiiIdentityProgress"
  );

  /*
    Reset counters.
  */
  const counters = {
    objectsFound: "0",
    usernamesChecked: "0",
    practiceCorrect: "0",
    profilesProtected: "0",
    testNumber: "1"
  };

  Object.entries(counters).forEach(
    ([id, value]) => {
      const element = game.byId(id);

      if (element) {
        element.textContent = value;
      }
    }
  );

  /*
    Reset explored objects.
  */
  document
    .querySelectorAll(".island-object")
    .forEach((button) => {
      button.classList.remove(
        "discovered",
        "wiggle"
      );

      button.disabled = false;
    });

  /*
    Reset the visible stickers for this attempt.
    Previously earned sticker points are not awarded again.
  */
  document
    .querySelectorAll(".sticker")
    .forEach((button) => {
      button.classList.remove(
        "collected"
      );

      button.textContent = "⭐";
      button.disabled = false;
    });

  /*
    Close the lesson popup.
  */
  const lessonPopup =
    game.byId("lessonPopup");

  if (lessonPopup) {
    lessonPopup.classList.add("hidden");
  }

  /*
    Reset Username Lab.
  */
  const generatedUsername =
    game.byId("generatedUsername");

  if (generatedUsername) {
    generatedUsername.textContent =
      "Press the button to generate a username!";
  }

  const usernameChecklist =
    game.byId("usernameChecklist");

  if (usernameChecklist) {
    usernameChecklist.innerHTML = `
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

  /*
    Reset Backpack Rescue.
  */
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

  const practiceFeedback =
    game.byId("practiceFeedback");

  if (practiceFeedback) {
    practiceFeedback.textContent = "";
    practiceFeedback.style.background =
      "transparent";
  }

  /*
    Reset Identity Card Repair Lab.
  */
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

  /*
    Lock the final test again.
  */
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

  /*
    Reset final-test interface.
  */
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
    nextTest.classList.add("hidden");
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

  /*
    Return to the mission introduction.
  */
  game.showSection("missionAlert");

  game.setMemeTip(
    "Your mission has been reset. Accept the mission whenever you are ready!",
    "welcome"
  );

  /*
    Scroll to the top of the mission.
  */
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

  function handleButtonClick(event) {
    const clickedElement =
      event.target.closest(
        "button, .sort-zone"
      );

     if (
  id === "checkRepairedUsername"
) {
  if (clickedElement.disabled) {
    return;
  }

  if (
    typeof game.checkRepairedUsername ===
    "function"
  ) {
    game.checkRepairedUsername();
  } else {
    console.error(
      "checkRepairedUsername is missing."
    );
  }

  return;
}

    if (!clickedElement) {
      return;
    }

    const id = clickedElement.id;

    if (id === "acceptMission") {
      if (hasFunction("acceptMission")) {
        game.acceptMission();
        saveProgressSoon();
      }

      return;
    }

    if (id === "closeLesson") {
      if (hasFunction("closeLessonPopup")) {
        game.closeLessonPopup();
      }

      return;
    }

    if (id === "goUsernameLab") {
      if (
        clickedElement.disabled
      ) {
        return;
      }

      if (hasFunction("openUsernameLab")) {
        game.openUsernameLab();
        saveProgressSoon();
      }

      return;
    }

    if (id === "generateUsername") {
      if (hasFunction("generateUsername")) {
        game.generateUsername();
      }

      return;
    }

    if (id === "approveUsername") {
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

    if (id === "goBackpackRescue") {
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

    if (id === "clearUsernameBlocks") {
      if (
        hasFunction(
          "clearRepairBuilder"
        )
      ) {
        game.clearRepairBuilder();
      }

      return;
    }

    if (id === "checkRepairedUsername") {
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

    if (id === "goFinalTest") {
      if (
        clickedElement.disabled
      ) {
        return;
      }

      if (
        hasFunction("startFinalTest")
      ) {
        game.startFinalTest();
        saveProgressSoon();
      }

      return;
    }

    if (id === "beginFinalTest") {
      if (
        hasFunction("beginFinalTest")
      ) {
        game.beginFinalTest();
        saveProgressSoon();
      }

      return;
    }

    if (id === "nextTest") {
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

    if (id === "retryMission") {
      retryMission();
      return;
    }

    if (
      clickedElement.classList.contains(
        "meme-help-btn"
      )
    ) {
      game.setMemeTip(
        clickedElement.dataset.tip ||
          "Meme is here to help.",
        "thinking"
      );

      return;
    }

    if (
      clickedElement.classList.contains(
        "island-object"
      )
    ) {
      if (hasFunction("openLesson")) {
        game.openLesson(
          clickedElement.dataset.object,
          clickedElement
        );

        saveProgressSoon();
      }

      return;
    }

    if (
      clickedElement.classList.contains(
        "sticker"
      )
    ) {
      if (hasFunction("collectSticker")) {
        game.collectSticker(
          clickedElement
        );

        saveProgressSoon();
      }

      return;
    }

    if (
      clickedElement.classList.contains(
        "sort-zone"
      )
    ) {
      if (hasFunction("answerPractice")) {
        game.answerPractice(
          clickedElement.dataset.answer,
          clickedElement
        );

        saveProgressSoon();
      }

      return;
    }

    if (
      clickedElement.classList.contains(
        "test-choice"
      )
    ) {
      if (hasFunction("answerTest")) {
        game.answerTest(
          clickedElement.dataset.answer,
          clickedElement
        );

        saveProgressSoon();
      }
    }
  }

  function setupBackpackDragAndDrop() {
    const dragCard =
      game.byId("dragItemCard");

    if (dragCard) {
      dragCard.addEventListener(
        "dragstart",
        (event) => {
          if (!event.dataTransfer) {
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
      .querySelectorAll(".sort-zone")
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

            if (
              hasFunction(
                "answerPractice"
              )
            ) {
              game.answerPractice(
                zone.dataset.answer,
                zone
              );

              saveProgressSoon();
            }
          }
        );
      });
  }

  function setupIdentityCardFlip() {
    const flipCard =
      game.byId("identityFlipCard");

    if (!flipCard) {
      return;
    }

    flipCard.addEventListener(
      "click",
      () => {
        const inner =
          game.byId(
            "identityCardInner"
          );

        if (!inner) {
          return;
        }

        const flipped =
          inner.classList.toggle(
            "is-flipped"
          );

        flipCard.setAttribute(
          "aria-pressed",
          String(flipped)
        );
      }
    );
  }

  function setupUsernameBuilderDropZone() {
    const buildZone =
      game.byId("usernameBuildZone");

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

        if (!event.dataTransfer) {
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
          hasFunction("addRepairBlock")
        ) {
          game.addRepairBlock(block);
          saveProgressSoon();
        }
      }
    );
  }

  function initializeIdentityIsland() {
    if (
      typeof game.byId !== "function"
    ) {
      console.error(
        "identity-core.js did not load correctly."
      );

      return;
    }

    if (
      typeof game.loadMissionHeroName ===
      "function"
    ) {
      game.loadMissionHeroName();
    }

    /*
      One delegated click listener handles all
      static mission buttons. This still works
      after progress restoration.
    */
    document.addEventListener(
      "click",
      handleButtonClick
    );

    setupBackpackDragAndDrop();
    setupIdentityCardFlip();
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
    document.readyState === "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      initializeIdentityIsland,
      { once: true }
    );

     const pageParameters = new URLSearchParams(
  window.location.search
);

const isReplay =
  pageParameters.get("replay") === "true";

if (isReplay) {
  localStorage.removeItem(
    "safetiiIdentityProgress"
  );

  if (
    window.IdentityGame &&
    typeof window.IdentityGame.showSection ===
      "function"
  ) {
    window.IdentityGame.showSection(
      "missionAlert"
    );
  }

  window.history.replaceState(
    {},
    document.title,
    window.location.pathname
  );
}
  } else {
    initializeIdentityIsland();
  }
})();
