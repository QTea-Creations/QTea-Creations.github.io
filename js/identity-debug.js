"use strict";

/* =========================================================
   SAFETII NET — IDENTITY ISLAND DEBUGGER
   Temporary diagnostic tool
========================================================= */

(() => {
  function logSuccess(message, details = "") {
    console.log(
      `%c✔ ${message}`,
      "color:#168a52;font-weight:bold;",
      details
    );
  }

  function logWarning(message, details = "") {
    console.warn(
      `⚠ ${message}`,
      details
    );
  }

  function logError(message, details = "") {
    console.error(
      `❌ ${message}`,
      details
    );
  }

  function getGame() {
    return window.IdentityGame;
  }

  function inspectScriptFiles() {
    console.group("Identity Island: Script Files");

    const scripts = Array.from(
      document.querySelectorAll("script[src]")
    );

    if (scripts.length === 0) {
      logError("No external JavaScript files were found.");
      console.groupEnd();
      return;
    }

    scripts.forEach((script, index) => {
      console.log(
        `${index + 1}. ${script.getAttribute("src")}`
      );
    });

    console.groupEnd();
  }

  function inspectRequiredElements() {
    console.group("Identity Island: Required HTML Elements");

    const requiredIds = [
      "acceptMission",
      "missionAlert",
      "exploreZone",
      "memeImage",
      "memeTip",
      "goUsernameLab",
      "generateUsername",
      "approveUsername",
      "goBackpackRescue",
      "practiceZone",
      "identityCardZone",
      "goFinalTest",
      "testIntroZone",
      "beginFinalTest",
      "testZone",
      "testQuestion",
      "nextTest",
      "missionResult"
    ];

    requiredIds.forEach((id) => {
      const element = document.getElementById(id);

      if (element) {
        logSuccess(`#${id} exists`, element);
      } else {
        logWarning(`#${id} is missing`);
      }
    });

    const memeButtons = document.querySelectorAll(
      ".meme-help-btn"
    );

    if (memeButtons.length > 0) {
      logSuccess(
        `${memeButtons.length} Meme Help buttons found`
      );
    } else {
      logError(
        "No Meme Help buttons were found. They need the class .meme-help-btn"
      );
    }

    console.groupEnd();
  }

  function inspectGameObject() {
    console.group("Identity Island: Game Object");

    const game = getGame();

    if (!game) {
      logError(
        "window.IdentityGame does not exist. One of the earlier JavaScript files did not load."
      );

      console.groupEnd();
      return;
    }

    logSuccess("window.IdentityGame exists", game);

    const expectedFunctions = [
      "byId",
      "showSection",
      "setMemeTip",
      "acceptMission",
      "openLesson",
      "collectSticker",
      "openUsernameLab",
      "generateUsername",
      "finishUsernameScan",
      "startBackpackRescue",
      "loadPractice",
      "answerPractice",
      "loadIdentityProfile",
      "checkRepairedUsername",
      "startFinalTest",
      "beginFinalTest",
      "loadTest",
      "answerTest",
      "nextTestQuestion"
    ];

    expectedFunctions.forEach((functionName) => {
      if (typeof game[functionName] === "function") {
        logSuccess(
          `game.${functionName}() exists`
        );
      } else {
        logWarning(
          `game.${functionName}() is missing`
        );
      }
    });

    console.groupEnd();
  }

  function inspectDuplicateIds() {
    console.group("Identity Island: Duplicate ID Check");

    const allIdElements = Array.from(
      document.querySelectorAll("[id]")
    );

    const idCounts = new Map();

    allIdElements.forEach((element) => {
      const id = element.id;

      idCounts.set(
        id,
        (idCounts.get(id) || 0) + 1
      );
    });

    const duplicates = Array.from(
      idCounts.entries()
    ).filter(([, count]) => count > 1);

    if (duplicates.length === 0) {
      logSuccess("No duplicate IDs found.");
    } else {
      duplicates.forEach(([id, count]) => {
        logError(
          `Duplicate ID found: #${id} appears ${count} times`
        );
      });
    }

    console.groupEnd();
  }

  function inspectButtonStates() {
    console.group("Identity Island: Button States");

    const buttonIds = [
      "acceptMission",
      "goUsernameLab",
      "generateUsername",
      "approveUsername",
      "goBackpackRescue",
      "checkRepairedUsername",
      "goFinalTest",
      "beginFinalTest",
      "nextTest",
      "retryMission"
    ];

    buttonIds.forEach((id) => {
      const button = document.getElementById(id);

      if (!button) {
        return;
      }

      console.log(`#${id}`, {
        disabled: button.disabled,
        hidden:
          button.classList.contains("hidden"),
        pointerEvents:
          getComputedStyle(button).pointerEvents,
        display:
          getComputedStyle(button).display,
        visibility:
          getComputedStyle(button).visibility,
        zIndex:
          getComputedStyle(button).zIndex
      });
    });

    console.groupEnd();
  }

  function attachClickDiagnostics() {
    document.addEventListener(
      "click",
      (event) => {
        const clickable = event.target.closest(
          "button, a, .sort-zone, .island-object, .sticker"
        );

        if (!clickable) {
          return;
        }

        console.group(
          `Clicked: ${
            clickable.id
              ? `#${clickable.id}`
              : clickable.className
          }`
        );

        console.log("Element:", clickable);
        console.log(
          "Disabled:",
          Boolean(clickable.disabled)
        );

        console.log(
          "Classes:",
          clickable.className
        );

        console.log(
          "Pointer events:",
          getComputedStyle(clickable).pointerEvents
        );

        console.log(
          "Closest hidden section:",
          clickable.closest(".hidden")
        );

        console.groupEnd();
      },
      true
    );

    logSuccess(
      "Global click diagnostics attached."
    );
  }

  function attachEmergencyAcceptMissionTest() {
    const button =
      document.getElementById("acceptMission");

    if (!button) {
      return;
    }

    button.addEventListener(
      "click",
      () => {
        console.log(
          "DEBUG: Accept Mission button received a click."
        );

        const game = getGame();

        if (
          game &&
          typeof game.acceptMission === "function"
        ) {
          console.log(
            "DEBUG: Calling game.acceptMission()."
          );

          game.acceptMission();
          return;
        }

        logError(
          "game.acceptMission() is unavailable."
        );

        const missionAlert =
          document.getElementById(
            "missionAlert"
          );

        const exploreZone =
          document.getElementById(
            "exploreZone"
          );

        if (missionAlert && exploreZone) {
          missionAlert.classList.add("hidden");
          exploreZone.classList.remove("hidden");

          logWarning(
            "Emergency fallback opened Explore Zone. This confirms the HTML works, but the normal game controller is missing."
          );
        }
      }
    );
  }

  function attachEmergencyMemeHelpTest() {
    const buttons =
      document.querySelectorAll(
        ".meme-help-btn"
      );

    buttons.forEach((button) => {
      button.addEventListener(
        "click",
        () => {
          console.log(
            "DEBUG: Meme Help button received a click.",
            button
          );

          const tip =
            document.getElementById(
              "memeTip"
            );

          if (!tip) {
            logError(
              "#memeTip is missing."
            );

            return;
          }

          tip.textContent =
            button.dataset.tip ||
            "Meme is here to help.";

          logSuccess(
            "Emergency Meme Help response worked."
          );
        }
      );
    });
  }

  function runDebugger() {
    console.clear();

    console.log(
      "%cSAFETII NET — IDENTITY ISLAND DEBUGGER",
      "background:#7d4cff;color:white;font-size:16px;font-weight:bold;padding:8px 12px;border-radius:6px;"
    );

    inspectScriptFiles();
    inspectRequiredElements();
    inspectGameObject();
    inspectDuplicateIds();
    inspectButtonStates();

    attachClickDiagnostics();
    attachEmergencyAcceptMissionTest();
    attachEmergencyMemeHelpTest();

    console.log(
      "%cDebugger finished loading. Click a broken button and read the newest console messages.",
      "color:#7d4cff;font-weight:bold;"
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      runDebugger,
      { once: true }
    );
  } else {
    runDebugger();
  }
})();
