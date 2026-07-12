"use strict";

(() => {
  const game = window.IdentityGame;

  function reportMissingFeature(featureName) {
    console.error(
      `Identity Island could not start because "${featureName}" is missing. Check that every JavaScript file exists and loads in the correct order.`
    );
  }

  function addClickListener(id, handlerName) {
    const element = game?.byId?.(id);
    const handler = game?.[handlerName];

    if (!element) {
      console.warn(`Element #${id} was not found.`);
      return;
    }

    if (typeof handler !== "function") {
      reportMissingFeature(handlerName);
      return;
    }

    element.addEventListener("click", handler);
  }

  function resetPageDisplay() {
    const counters = {
      objectsFound: "0",
      usernamesChecked: "0",
      practiceCorrect: "0",
      profilesProtected: "0"
    };

    Object.entries(counters).forEach(([id, value]) => {
      const element = game.byId(id);

      if (element) {
        element.textContent = value;
      }
    });

    document.querySelectorAll(".island-object").forEach((button) => {
      button.classList.remove("discovered", "wiggle");
    });

    document.querySelectorAll(".sticker").forEach((button) => {
      button.classList.remove("collected");
      button.textContent = "⭐";
    });

    const usernameButton = game.byId("goUsernameLab");

    if (usernameButton) {
      usernameButton.disabled = true;
      usernameButton.classList.add("locked-action");
      usernameButton.textContent = "Unlock Safe Username Lab";
    }

    const backpackButton = game.byId("goBackpackRescue");

    if (backpackButton) {
      backpackButton.disabled = true;
      backpackButton.classList.add("locked-action");
      backpackButton.textContent =
        "Complete 3 Username Scans First";
    }

    const finalButton = game.byId("goFinalTest");

    if (finalButton) {
      finalButton.disabled = true;
      finalButton.classList.add("locked-action");
      finalButton.textContent =
        "Protect All 5 Profiles to Unlock the Final Test";
    }

    const generatedUsername = game.byId("generatedUsername");

    if (generatedUsername) {
      generatedUsername.textContent =
        "Press the button to generate a username!";
    }

    const checklist = game.byId("usernameChecklist");

    if (checklist) {
      checklist.innerHTML =
        "<p>Generate a username to begin the safety scan.</p>";
    }
  }

  function retryMission() {
    if (typeof game.resetMissionState === "function") {
      game.resetMissionState();
    }

    resetPageDisplay();
    game.showSection("missionAlert");

    game.setMemeTip(
      "Ready to replay Identity Island?",
      "welcome"
    );
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (!game) {
      console.error(
        "IdentityGame was not created. identity-data.js or identity-core.js did not load."
      );

      return;
    }

    if (typeof game.byId !== "function") {
      console.error(
        "identity-core.js did not load correctly. The byId helper is missing."
      );

      return;
    }

    if (typeof game.loadMissionHeroName === "function") {
      game.loadMissionHeroName();
    }

    /* Mission controls */
    addClickListener("acceptMission", "acceptMission");
    addClickListener("closeLesson", "closeLessonPopup");
    addClickListener("goUsernameLab", "openUsernameLab");
    addClickListener("generateUsername", "generateUsername");
    addClickListener("approveUsername", "finishUsernameScan");
    addClickListener("goBackpackRescue", "startBackpackRescue");
    addClickListener("clearUsernameBlocks", "clearRepairBuilder");
    addClickListener(
      "checkRepairedUsername",
      "checkRepairedUsername"
    );
    addClickListener("goFinalTest", "startFinalTest");
    addClickListener("nextTest", "nextTestQuestion");

    const retryButton = game.byId("retryMission");

    if (retryButton) {
      retryButton.addEventListener("click", retryMission);
    }

    /* Meme Help Desk */
    document.querySelectorAll(".meme-help-btn").forEach((button) => {
      button.addEventListener("click", () => {
        if (typeof game.setMemeTip !== "function") {
          reportMissingFeature("setMemeTip");
          return;
        }

        game.setMemeTip(
          button.dataset.tip || "Meme is here to help.",
          "thinking"
        );
      });
    });

    /* Island objects */
    document.querySelectorAll(".island-object").forEach((button) => {
      button.addEventListener("click", () => {
        if (typeof game.openLesson !== "function") {
          reportMissingFeature("openLesson");
          return;
        }

        game.openLesson(button.dataset.object, button);
      });
    });

    /* Hidden stickers */
    document.querySelectorAll(".sticker").forEach((button) => {
      button.addEventListener("click", () => {
        if (typeof game.collectSticker !== "function") {
          reportMissingFeature("collectSticker");
          return;
        }

        game.collectSticker(button);
      });
    });

    /* Backpack Rescue */
    const dragCard = game.byId("dragItemCard");

    if (dragCard) {
      dragCard.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData(
          "text/plain",
          "backpack-item"
        );

        event.dataTransfer.effectAllowed = "move";
      });
    }

    document.querySelectorAll(".sort-zone").forEach((zone) => {
      zone.addEventListener("dragover", (event) => {
        event.preventDefault();
        zone.classList.add("drag-over");
      });

      zone.addEventListener("dragleave", () => {
        zone.classList.remove("drag-over");
      });

      zone.addEventListener("drop", (event) => {
        event.preventDefault();
        zone.classList.remove("drag-over");

        if (typeof game.answerPractice !== "function") {
          reportMissingFeature("answerPractice");
          return;
        }

        game.answerPractice(zone.dataset.answer, zone);
      });

      zone.addEventListener("click", () => {
        if (typeof game.answerPractice !== "function") {
          reportMissingFeature("answerPractice");
          return;
        }

        game.answerPractice(zone.dataset.answer, zone);
      });
    });

    /* Identity card flip */
    const flipCard = game.byId("identityFlipCard");

    if (flipCard) {
      flipCard.addEventListener("click", () => {
        const inner = game.byId("identityCardInner");

        if (!inner) {
          return;
        }

        const flipped = inner.classList.toggle("is-flipped");

        flipCard.setAttribute(
          "aria-pressed",
          String(flipped)
        );
      });
    }

    /* Repair Lab drop zone */
    const buildZone = game.byId("usernameBuildZone");

    if (buildZone) {
      buildZone.addEventListener("dragover", (event) => {
        event.preventDefault();
        buildZone.classList.add("drag-over");
      });

      buildZone.addEventListener("dragleave", () => {
        buildZone.classList.remove("drag-over");
      });

      buildZone.addEventListener("drop", (event) => {
        event.preventDefault();
        buildZone.classList.remove("drag-over");

        if (typeof game.addRepairBlock !== "function") {
          reportMissingFeature("addRepairBlock");
          return;
        }

        const blockId = event.dataTransfer.getData("text/plain");

        const block = document.querySelector(
          `[data-block-id="${blockId}"]`
        );

        game.addRepairBlock(block);
      });
    }

    /* Final test */
    document.querySelectorAll(".test-choice").forEach((button) => {
      button.addEventListener("click", () => {
        if (typeof game.answerTest !== "function") {
          reportMissingFeature("answerTest");
          return;
        }

        game.answerTest(button.dataset.answer, button);
      });
    });

    console.log("Identity Island controller loaded successfully.");
  });
})();
