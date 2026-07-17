"use strict";

/* =========================================================
   SAFETII NET — IDENTITY ISLAND DEBUGGER

   Development tool only.
   Remove this script before the final public release.
========================================================= */

(() => {
  const SCRIPT_NAME =
    "Identity Island Debugger";

  const expectedScripts = [
    "identity-data.js",
    "identity-core.js",
    "identity-activities.js",
    "identity-repair.js",
    "identity-test.js",
    "identity-progress.js",
    "identity.js"
  ];

  const expectedSections = [
    "missionAlert",
    "exploreZone",
    "usernameZone",
    "practiceZone",
    "identityCardZone",
    "testZone"
  ];

  const expectedButtons = [
    "acceptMission",
    "goUsernameLab",
    "generateUsername",
    "approveUsername",
    "goBackpackRescue",
    "checkRepairedUsername",
    "goFinalTest",
    "retryMission"
  ];

  const expectedGameFunctions = [
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
    "beginFinalTest"
  ];

  function pass(message) {
    console.log(
      `%c✔ ${message}`,
      [
        "color: #168a52",
        "font-weight: 800"
      ].join(";")
    );
  }

  function warn(message) {
    console.warn(
      `⚠ ${message}`
    );
  }

  function fail(message) {
    console.error(
      `✖ ${message}`
    );
  }

  function findDuplicateIds() {
    const elements =
      document.querySelectorAll(
        "[id]"
      );

    const counts =
      new Map();

    elements.forEach(
      (element) => {
        const id =
          element.id.trim();

        if (!id) {
          return;
        }

        counts.set(
          id,
          (counts.get(id) || 0) + 1
        );
      }
    );

    const duplicateIds =
      Array.from(
        counts.entries()
      ).filter(
        ([, count]) =>
          count > 1
      );

    if (
      duplicateIds.length === 0
    ) {
      pass(
        "No duplicate HTML IDs found."
      );

      return;
    }

    duplicateIds.forEach(
      ([id, count]) => {
        fail(
          `Duplicate ID #${id} appears ${count} times.`
        );
      }
    );
  }

  function checkExpectedScripts() {
    const scripts =
      Array.from(
        document.scripts
      );

    expectedScripts.forEach(
      (expectedFile) => {
        const found =
          scripts.some(
            (script) =>
              script.src.includes(
                expectedFile
              )
          );

        if (found) {
          pass(
            `${expectedFile} is included.`
          );
        } else {
          fail(
            `${expectedFile} is missing from identity.html.`
          );
        }
      }
    );
  }

  function checkScriptOrder() {
    const scriptFiles =
      Array.from(
        document.scripts
      )
        .map((script) => {
          const source =
            script.src;

          return source
            ? source.split("/").pop()
            : "";
        })
        .filter(Boolean);

    const positions =
      expectedScripts.map(
        (file) =>
          scriptFiles.indexOf(file)
      );

    const allPresent =
      positions.every(
        (position) =>
          position !== -1
      );

    if (!allPresent) {
      warn(
        "Script order could not be fully checked because one or more Identity Island scripts are missing."
      );

      return;
    }

    const correctOrder =
      positions.every(
        (position, index) =>
          index === 0 ||
          position >
            positions[index - 1]
      );

    if (correctOrder) {
      pass(
        "Identity Island scripts are in the correct order."
      );
    } else {
      fail(
        "Identity Island scripts are not in the correct order."
      );

      console.table(
        expectedScripts.map(
          (file, index) => ({
            expectedPosition:
              index + 1,
            file,
            actualPosition:
              positions[index] + 1
          })
        )
      );
    }
  }

  function checkSections() {
    expectedSections.forEach(
      (id) => {
        if (
          document.getElementById(id)
        ) {
          pass(
            `Section #${id} exists.`
          );
        } else {
          fail(
            `Section #${id} is missing.`
          );
        }
      }
    );
  }

  function checkButtons() {
    expectedButtons.forEach(
      (id) => {
        const button =
          document.getElementById(id);

        if (!button) {
          fail(
            `Button #${id} is missing.`
          );

          return;
        }

        if (
          button.tagName !== "BUTTON" &&
          button.tagName !== "A"
        ) {
          warn(
            `#${id} exists but is a ${button.tagName}, not a button or link.`
          );

          return;
        }

        pass(
          `Button #${id} exists.`
        );
      }
    );
  }

  function checkGameNamespace() {
    const game =
      window.IdentityGame;

    if (!game) {
      fail(
        "window.IdentityGame is missing. identity-core.js may have failed to load."
      );

      return;
    }

    pass(
      "window.IdentityGame exists."
    );

    if (game.data) {
      pass(
        "IdentityGame.data exists."
      );
    } else {
      fail(
        "IdentityGame.data is missing."
      );
    }

    if (game.state) {
      pass(
        "IdentityGame.state exists."
      );
    } else {
      fail(
        "IdentityGame.state is missing."
      );
    }

    expectedGameFunctions.forEach(
      (functionName) => {
        if (
          typeof game[
            functionName
          ] === "function"
        ) {
          pass(
            `game.${functionName}() exists.`
          );
        } else {
          fail(
            `game.${functionName}() is missing.`
          );
        }
      }
    );
  }

  function checkStickerIds() {
    const stickers =
      Array.from(
        document.querySelectorAll(
          "[data-sticker]"
        )
      );

    if (
      stickers.length === 0
    ) {
      warn(
        "No elements with data-sticker were found."
      );

      return;
    }

    const stickerNames =
      stickers.map(
        (sticker) =>
          sticker.dataset.sticker
            ?.trim()
      );

    const missingNames =
      stickerNames.filter(
        (name) =>
          !name
      );

    if (
      missingNames.length > 0
    ) {
      fail(
        `${missingNames.length} sticker element(s) have an empty data-sticker value.`
      );
    }

    const uniqueNames =
      new Set(
        stickerNames.filter(
          Boolean
        )
      );

    if (
      uniqueNames.size !==
      stickerNames.filter(Boolean).length
    ) {
      fail(
        "Two or more stickers share the same data-sticker name. Duplicate sticker names will prevent points from being awarded correctly."
      );

      console.table(
        stickerNames.map(
          (name, index) => ({
            sticker:
              index + 1,
            name
          })
        )
      );
    } else {
      pass(
        "All sticker data-sticker names are unique."
      );
    }
  }

  function checkUsernameControls() {
    const generateButton =
      document.getElementById(
        "generateUsername"
      );

    const finishButton =
      document.getElementById(
        "approveUsername"
      );

    const checkRepairButton =
      document.getElementById(
        "checkRepairedUsername"
      );

    if (generateButton) {
      pass(
        "Generate Username button exists."
      );
    }

    if (finishButton) {
      pass(
        "Finish Scan button exists."
      );
    }

    if (checkRepairButton) {
      pass(
        "Check Username button exists."
      );
    }
  }

  function checkReplayButtonConflict() {
    const notebookReplay =
      document.getElementById(
        "replayIdentityFromNotebook"
      );

    const missionReplay =
      document.getElementById(
        "retryMission"
      );

    if (
      notebookReplay &&
      missionReplay
    ) {
      fail(
        "Notebook and mission replay buttons both exist on this page. These controls should be on separate pages."
      );

      return;
    }

    if (notebookReplay) {
      warn(
        "The notebook replay button is present on Identity Island. Check that the correct HTML file is being displayed."
      );

      return;
    }

    if (missionReplay) {
      pass(
        "Identity Island replay button uses #retryMission."
      );
    }
  }

  function checkGeneralScriptInterference() {
    const generalScript =
      Array.from(
        document.scripts
      ).find(
        (script) =>
          script.src.endsWith(
            "/script.js"
          ) ||
          script.src.endsWith(
            "script.js"
          )
      );

    if (generalScript) {
      warn(
        "General script.js is loaded on Identity Island. Ensure it does not attach notebook or dashboard listeners to mission buttons."
      );
    } else {
      pass(
        "General script.js is not loaded on Identity Island."
      );
    }
  }

  function checkVisibleOverlay() {
    const elements =
      Array.from(
        document.querySelectorAll(
          "body *"
        )
      );

    const possibleOverlays =
      elements.filter(
        (element) => {
          const style =
            window.getComputedStyle(
              element
            );

          if (
            style.display === "none" ||
            style.visibility ===
              "hidden" ||
            style.pointerEvents ===
              "none"
          ) {
            return false;
          }

          const zIndex =
            Number(style.zIndex);

          const position =
            style.position;

          const rect =
            element.getBoundingClientRect();

          return (
            (
              position === "fixed" ||
              position === "absolute"
            ) &&
            Number.isFinite(zIndex) &&
            zIndex >= 100 &&
            rect.width >=
              window.innerWidth * 0.8 &&
            rect.height >=
              window.innerHeight * 0.8
          );
        }
      );

    if (
      possibleOverlays.length === 0
    ) {
      pass(
        "No large high-z-index overlay appears to be blocking the page."
      );

      return;
    }

    warn(
      `${possibleOverlays.length} large overlay element(s) may be blocking button clicks.`
    );

    console.table(
      possibleOverlays.map(
        (element) => ({
          tag:
            element.tagName,
          id:
            element.id || "",
          className:
            typeof element.className ===
            "string"
              ? element.className
              : "",
          zIndex:
            window.getComputedStyle(
              element
            ).zIndex
        })
      )
    );
  }

  function runDebugger() {
    console.group(
      `🔨🤖🔧 ${SCRIPT_NAME}`
    );

    console.log(
      `Page: ${window.location.pathname}`
    );

    findDuplicateIds();
    checkExpectedScripts();
    checkScriptOrder();
    checkSections();
    checkButtons();
    checkGameNamespace();
    checkStickerIds();
    checkUsernameControls();
    checkReplayButtonConflict();
    checkGeneralScriptInterference();
    checkVisibleOverlay();

    console.groupEnd();
  }

  window.runIdentityDebugger =
    runDebugger;

  if (
    document.readyState ===
    "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      runDebugger
    );
  } else {
    runDebugger();
  }
})();
