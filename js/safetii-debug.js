"use strict";

/* =========================================================
   SAFETII NET — UNIVERSAL DEBUGGER
   Replace the entire js/safetii-debug.js file with this.
========================================================= */

(() => {
  if (window.SafetiiDebug?.loaded) {
    return;
  }

  const debugState = {
    loaded: true,
    problems: [],
    warnings: [],
    successes: [],
    runtimeErrors: [],
    clickHistory: [],
    lastReport: "",
    panel: null,
    reportArea: null
  };

  window.SafetiiDebug = debugState;

  /* =====================================================
     BASIC HELPERS
  ===================================================== */

  function addProblem(message, details = "") {
    debugState.problems.push({
      message,
      details
    });
  }

  function addWarning(message, details = "") {
    debugState.warnings.push({
      message,
      details
    });
  }

  function addSuccess(message, details = "") {
    debugState.successes.push({
      message,
      details
    });
  }

  function elementExists(id) {
    return Boolean(
      document.getElementById(id)
    );
  }

  function getElement(id) {
    return document.getElementById(id);
  }

  function getScriptUrls() {
    return Array.from(
      document.scripts
    )
      .map((script) => script.src)
      .filter(Boolean);
  }

  function getStylesheetUrls() {
    return Array.from(
      document.querySelectorAll(
        'link[rel="stylesheet"]'
      )
    )
      .map((link) => link.href)
      .filter(Boolean);
  }

  function isVisible(element) {
    if (!element) {
      return false;
    }

    const style =
      window.getComputedStyle(element);

    const rectangle =
      element.getBoundingClientRect();

    return (
      style.display !== "none" &&
      style.visibility !== "hidden" &&
      Number(style.opacity) !== 0 &&
      rectangle.width > 0 &&
      rectangle.height > 0
    );
  }

  function cleanUrl(url) {
    try {
      const parsed =
        new URL(url);

      return (
        parsed.pathname +
        parsed.search
      );
    } catch {
      return String(url);
    }
  }

  function formatError(error) {
    if (!error) {
      return "Unknown error";
    }

    if (
      typeof error === "string"
    ) {
      return error;
    }

    return [
      error.name,
      error.message,
      error.stack
    ]
      .filter(Boolean)
      .join("\n");
  }

  /* =====================================================
     RUNTIME ERROR CAPTURE
  ===================================================== */

  window.addEventListener(
    "error",
    (event) => {
      const message =
        event.message ||
        "Unknown JavaScript error";

      const location = [
        event.filename,
        event.lineno
          ? `line ${event.lineno}`
          : "",
        event.colno
          ? `column ${event.colno}`
          : ""
      ]
        .filter(Boolean)
        .join(" — ");

      debugState.runtimeErrors.push({
        type: "JavaScript error",
        message,
        location,
        stack:
          event.error?.stack || ""
      });

      renderReport();
    }
  );

  window.addEventListener(
    "unhandledrejection",
    (event) => {
      debugState.runtimeErrors.push({
        type:
          "Unhandled promise rejection",

        message:
          formatError(event.reason),

        location: "",
        stack:
          event.reason?.stack || ""
      });

      renderReport();
    }
  );

  /*
    Detect missing scripts, stylesheets, images,
    and other resources.
  */
  window.addEventListener(
    "error",
    (event) => {
      const target =
        event.target;

      if (
        !target ||
        target === window
      ) {
        return;
      }

      const tagName =
        target.tagName?.toLowerCase();

      let resourceUrl = "";

      if (
        tagName === "script" ||
        tagName === "img"
      ) {
        resourceUrl =
          target.src || "";
      }

      if (
        tagName === "link"
      ) {
        resourceUrl =
          target.href || "";
      }

      if (!resourceUrl) {
        return;
      }

      debugState.runtimeErrors.push({
        type:
          "Resource failed to load",

        message:
          `${tagName} could not be loaded`,

        location:
          cleanUrl(resourceUrl),

        stack: ""
      });

      renderReport();
    },
    true
  );

  /* =====================================================
     CLICK TRACKING
  ===================================================== */

  document.addEventListener(
    "click",
    (event) => {
      const clickable =
        event.target.closest(
          "button, a, [role='button']"
        );

      if (!clickable) {
        return;
      }

      const description =
        clickable.id
          ? `#${clickable.id}`
          : clickable.className
            ? `.${String(
                clickable.className
              )
                .trim()
                .replace(/\s+/g, ".")}`
            : clickable.tagName;

      debugState.clickHistory.unshift({
        description,
        text:
          clickable.textContent
            ?.trim()
            .replace(/\s+/g, " ")
            .slice(0, 80) || "",

        disabled:
          Boolean(clickable.disabled),

        time:
          new Date()
            .toLocaleTimeString()
      });

      debugState.clickHistory =
        debugState.clickHistory.slice(
          0,
          10
        );

      if (
        clickable.id === "startGame"
      ) {
        window.setTimeout(
          () => {
            runAllChecks();
          },
          150
        );
      }
    },
    true
  );

  /* =====================================================
     GENERAL DOCUMENT CHECKS
  ===================================================== */

  function checkDocumentStructure() {
    if (!document.doctype) {
      addWarning(
        "The page is missing <!DOCTYPE html>."
      );
    } else {
      addSuccess(
        "DOCTYPE is present."
      );
    }

    if (!document.head) {
      addProblem(
        "The page does not have a valid <head> element."
      );
    }

    if (!document.body) {
      addProblem(
        "The page does not have a valid <body> element."
      );
    }

    const titles =
      document.querySelectorAll(
        "title"
      );

    if (titles.length === 0) {
      addWarning(
        "The page has no <title>."
      );
    }

    if (titles.length > 1) {
      addProblem(
        `The page has ${titles.length} <title> elements.`
      );
    }

    const viewportTags =
      document.querySelectorAll(
        'meta[name="viewport"]'
      );

    if (
      viewportTags.length > 1
    ) {
      addProblem(
        `The page has ${viewportTags.length} viewport tags.`
      );
    }

    const headElements =
      document.querySelectorAll(
        "head"
      );

    if (
      headElements.length > 1
    ) {
      addProblem(
        `The page has ${headElements.length} <head> elements.`
      );
    }
  }

  function checkDuplicateIds() {
    const idCounts =
      new Map();

    document
      .querySelectorAll("[id]")
      .forEach((element) => {
        const id =
          element.id.trim();

        if (!id) {
          return;
        }

        if (
          !idCounts.has(id)
        ) {
          idCounts.set(
            id,
            []
          );
        }

        idCounts
          .get(id)
          .push(element);
      });

    let duplicateFound =
      false;

    idCounts.forEach(
      (elements, id) => {
        if (
          elements.length <= 1
        ) {
          return;
        }

        duplicateFound = true;

        const descriptions =
          elements.map(
            (element, index) => {
              const parent =
                element.parentElement;

              return [
                `${index + 1}.`,
                `<${element.tagName.toLowerCase()}>`,
                parent
                  ? `inside <${parent.tagName.toLowerCase()} class="${parent.className || ""}">`
                  : ""
              ]
                .filter(Boolean)
                .join(" ");
            }
          );

        addProblem(
          `Duplicate ID #${id} appears ${elements.length} times.`,
          descriptions.join("\n")
        );
      }
    );

    if (!duplicateFound) {
      addSuccess(
        "No duplicate IDs detected."
      );
    }
  }

  function checkBrokenLinksAndImages() {
    document
      .querySelectorAll("img")
      .forEach((image) => {
        if (
          image.complete &&
          image.naturalWidth === 0
        ) {
          addProblem(
            "An image failed to load.",
            cleanUrl(image.src)
          );
        }
      });

    document
      .querySelectorAll("a[href]")
      .forEach((link) => {
        const href =
          link.getAttribute("href");

        if (
          !href ||
          href === "#"
        ) {
          addWarning(
            "A link has an empty or placeholder destination.",
            link.textContent
              ?.trim() || href
          );
        }
      });
  }

  /* =====================================================
     SCRIPT CHECKS
  ===================================================== */

  function checkScriptOrder() {
    const scripts =
      getScriptUrls();

    const scoreIndex =
      scripts.findIndex(
        (url) =>
          url.includes(
            "/arcade/arcade-score.js"
          )
      );

    const clueIndex =
      scripts.findIndex(
        (url) =>
          url.includes(
            "/arcade/games/clue-collector.js"
          )
      );

    const piecesIndex =
      scripts.findIndex(
        (url) =>
          url.includes(
            "/arcade/games/pieces-of-me.js"
          )
      );

    if (
      clueIndex !== -1 &&
      scoreIndex === -1
    ) {
      addProblem(
        "Clue Collector is loaded without arcade-score.js."
      );
    }

    if (
      clueIndex !== -1 &&
      scoreIndex > clueIndex
    ) {
      addProblem(
        "arcade-score.js is loaded after clue-collector.js.",
        "The scoring script must appear first."
      );
    }

    if (
      clueIndex !== -1 &&
      piecesIndex !== -1
    ) {
      addProblem(
        "Both Clue Collector and Pieces of Me scripts are loaded on the same page."
      );
    }

    if (
      document.title.includes(
        "Clue Collector"
      ) &&
      clueIndex === -1
    ) {
      addProblem(
        "This is the Clue Collector page, but clue-collector.js is not loaded."
      );
    }

    if (
      document.title.includes(
        "Pieces of Me"
      ) &&
      piecesIndex === -1
    ) {
      addProblem(
        "This is the Pieces of Me page, but pieces-of-me.js is not loaded."
      );
    }

    if (
      scoreIndex !== -1
    ) {
      addSuccess(
        "arcade-score.js is included."
      );
    }

    if (
      clueIndex !== -1
    ) {
      addSuccess(
        "clue-collector.js is included."
      );
    }

    if (
      piecesIndex !== -1
    ) {
      addSuccess(
        "pieces-of-me.js is included."
      );
    }
  }

  async function checkLocalScriptSyntax() {
    const scripts =
      getScriptUrls();

    const sameOriginScripts =
      scripts.filter((url) => {
        try {
          return (
            new URL(url).origin ===
            window.location.origin
          );
        } catch {
          return false;
        }
      });

    for (
      const scriptUrl of
      sameOriginScripts
    ) {
      try {
        const response =
          await fetch(
            scriptUrl,
            {
              cache: "no-store"
            }
          );

        if (!response.ok) {
          addProblem(
            "A JavaScript file could not be downloaded.",
            `${cleanUrl(
              scriptUrl
            )} returned HTTP ${response.status}`
          );

          continue;
        }

        const source =
          await response.text();

        try {
          /*
            This checks JavaScript syntax without
            running the downloaded code.
          */
          new Function(source);

          addSuccess(
            `JavaScript syntax passed: ${cleanUrl(
              scriptUrl
            )}`
          );
        } catch (error) {
          addProblem(
            `JavaScript syntax error in ${cleanUrl(
              scriptUrl
            )}`,
            formatError(error)
          );
        }
      } catch (error) {
        addWarning(
          `Could not inspect ${cleanUrl(
            scriptUrl
          )}`,
          formatError(error)
        );
      }
    }
  }

  function checkArcadeSystem() {
    const arcade =
      window.SafetiiArcade;

    if (!arcade) {
      addProblem(
        "window.SafetiiArcade is missing.",
        "arcade-score.js may not have loaded or may have stopped because of an error."
      );

      return;
    }

    addSuccess(
      "window.SafetiiArcade is available."
    );

    const requiredFunctions = [
      "startRound",
      "answerQuestion",
      "finishRound",
      "getCurrentRound",
      "getGlobalPoints"
    ];

    requiredFunctions.forEach(
      (functionName) => {
        if (
          typeof arcade[
            functionName
          ] !== "function"
        ) {
          addProblem(
            `SafetiiArcade.${functionName} is missing or is not a function.`
          );
        } else {
          addSuccess(
            `SafetiiArcade.${functionName} is available.`
          );
        }
      }
    );

    if (
      arcade.HEAT_LEVELS
    ) {
      addSuccess(
        "SafetiiArcade.HEAT_LEVELS is available."
      );
    } else {
      addWarning(
        "SafetiiArcade.HEAT_LEVELS is not exposed.",
        "The game can still work if it uses fallback point values."
      );
    }
  }

  /* =====================================================
     START BUTTON CHECKS
  ===================================================== */

  function checkStartButton() {
    const startButton =
      getElement("startGame");

    if (!startButton) {
      addProblem(
        "The #startGame button was not found."
      );

      return;
    }

    addSuccess(
      "The #startGame button exists."
    );

    if (
      startButton.disabled
    ) {
      addProblem(
        "The Start Game button is disabled."
      );
    }

    if (
      !isVisible(startButton)
    ) {
      addProblem(
        "The Start Game button exists but is not visible."
      );
    } else {
      addSuccess(
        "The Start Game button is visible."
      );
    }

    if (
      startButton.dataset
        .clueCollectorConnected ===
      "true"
    ) {
      addSuccess(
        "The Clue Collector start handler is connected."
      );
    } else if (
      document.title.includes(
        "Clue Collector"
      )
    ) {
      addProblem(
        "The Clue Collector start handler is not connected.",
        "The clue-collector.js file probably stopped before connectStartButton() finished."
      );
    }

    const lastStartClick =
      debugState.clickHistory.find(
        (click) =>
          click.description ===
          "#startGame"
      );

    if (lastStartClick) {
      addSuccess(
        `The debugger detected a click on #startGame at ${lastStartClick.time}.`
      );
    } else {
      addWarning(
        "The debugger has not detected a click on #startGame during this page visit."
      );
    }
  }

  /* =====================================================
     SCREEN CHECKS
  ===================================================== */

  function checkGameScreens() {
    const screenIds = [
      "introScreen",
      "playScreen",
      "resultScreen"
    ];

    const existingScreens =
      screenIds.filter(
        elementExists
      );

    if (
      existingScreens.length === 0
    ) {
      return;
    }

    screenIds.forEach((id) => {
      if (!elementExists(id)) {
        addProblem(
          `Game screen #${id} is missing.`
        );
      }
    });

    const visibleScreens =
      existingScreens.filter(
        (id) =>
          isVisible(
            getElement(id)
          )
      );

    if (
      visibleScreens.length > 1
    ) {
      addProblem(
        "More than one game screen is visible.",
        visibleScreens.join(", ")
      );
    }

    if (
      visibleScreens.length === 0
    ) {
      addProblem(
        "No game screen is visible."
      );
    }

    if (
      visibleScreens.length === 1
    ) {
      addSuccess(
        `Visible game screen: #${visibleScreens[0]}`
      );
    }
  }

  /* =====================================================
     CLUE COLLECTOR CHECKS
  ===================================================== */

  function checkClueCollector() {
    const isClueCollector =
      document.title.includes(
        "Clue Collector"
      ) ||
      elementExists(
        "dynamicSocialStage"
      );

    if (!isClueCollector) {
      return;
    }

    addSuccess(
      "Clue Collector page detected."
    );

    const requiredIds = [
      "introScreen",
      "playScreen",
      "resultScreen",
      "startGame",
      "dynamicSocialStage",
      "checkAnswers",
      "clearSelections",
      "nextProfile",
      "profileNumber",
      "profileTotal",
      "currentScore",
      "profilesSolved",
      "currentHeat",
      "questionPointValue",
      "clueFeedbackPanel",
      "memeReaction",
      "globalPoints"
    ];

    requiredIds.forEach((id) => {
      if (!elementExists(id)) {
        addProblem(
          `Clue Collector is missing #${id}.`
        );
      } else {
        addSuccess(
          `Clue Collector found #${id}.`
        );
      }
    });

    const wrongScript =
      getScriptUrls().some(
        (url) =>
          url.includes(
            "pieces-of-me.js"
          )
      );

    if (wrongScript) {
      addProblem(
        "The Clue Collector page is loading pieces-of-me.js."
      );
    }

    const stage =
      getElement(
        "dynamicSocialStage"
      );

    const playScreen =
      getElement(
        "playScreen"
      );

    if (
      playScreen &&
      isVisible(playScreen)
    ) {
      if (
        !stage?.children.length
      ) {
        addProblem(
          "The play screen is visible, but no social-media profile was rendered.",
          "loadProfile() or renderProfile() may have failed."
        );
      } else {
        addSuccess(
          "A social-media profile is rendered."
        );
      }
    }
  }

  /* =====================================================
     PIECES OF ME CHECKS
  ===================================================== */

  function checkPiecesOfMe() {
    const isPieces =
      document.title.includes(
        "Pieces of Me"
      );

    if (!isPieces) {
      return;
    }

    addSuccess(
      "Pieces of Me page detected."
    );

    const requiredIds = [
      "introScreen",
      "playScreen",
      "resultScreen",
      "startGame",
      "questionText",
      "answerGrid",
      "nextQuestion",
      "currentScore",
      "correctCount",
      "globalPoints"
    ];

    requiredIds.forEach((id) => {
      if (!elementExists(id)) {
        addProblem(
          `Pieces of Me is missing #${id}.`
        );
      }
    });

    const wrongScript =
      getScriptUrls().some(
        (url) =>
          url.includes(
            "clue-collector.js"
          )
      );

    if (wrongScript) {
      addProblem(
        "The Pieces of Me page is loading clue-collector.js."
      );
    }
  }

  /* =====================================================
     PANEL
  ===================================================== */

  function createPanel() {
    if (
      document.getElementById(
        "safetiiDebugPanel"
      )
    ) {
      debugState.panel =
        document.getElementById(
          "safetiiDebugPanel"
        );

      debugState.reportArea =
        document.getElementById(
          "safetiiDebugReport"
        );

      return;
    }

    const panel =
      document.createElement(
        "aside"
      );

    panel.id =
      "safetiiDebugPanel";

    panel.innerHTML = `
      <div class="safetii-debug-header">
        <div>
          <strong>
            🛠 Safetii Debugger
          </strong>

          <small id="safetiiDebugSummary">
            Preparing report…
          </small>
        </div>

        <button
          id="safetiiDebugMinimize"
          type="button"
          aria-label="Minimize debugger"
        >
          −
        </button>
      </div>

      <div
        class="safetii-debug-content"
        id="safetiiDebugContent"
      >
        <div class="safetii-debug-actions">
          <button
            id="safetiiDebugRun"
            type="button"
          >
            Run Checks Again
          </button>

          <button
            id="safetiiDebugCopy"
            type="button"
          >
            Copy Full Report
          </button>
        </div>

        <pre id="safetiiDebugReport"></pre>
      </div>
    `;

    const style =
      document.createElement(
        "style"
      );

    style.textContent = `
      #safetiiDebugPanel {
        position: fixed;
        right: 16px;
        bottom: 16px;
        z-index: 2147483647;

        width: min(470px, calc(100vw - 32px));
        max-height: 75vh;

        overflow: hidden;

        background: #111827;
        color: #f9fafb;

        border: 2px solid #7c3aed;
        border-radius: 18px;

        box-shadow:
          0 18px 50px
          rgba(0, 0, 0, 0.38);

        font-family:
          Consolas,
          Monaco,
          monospace;

        font-size: 12px;
        text-align: left;
      }

      .safetii-debug-header {
        padding: 12px 14px;

        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;

        background:
          linear-gradient(
            135deg,
            #6d28d9,
            #2563eb
          );
      }

      .safetii-debug-header strong {
        display: block;
        font-size: 14px;
      }

      .safetii-debug-header small {
        display: block;
        margin-top: 3px;
      }

      .safetii-debug-header button {
        width: 34px;
        height: 34px;

        border: 0;
        border-radius: 9px;

        background:
          rgba(255, 255, 255, 0.18);
        color: white;

        font-size: 20px;
        cursor: pointer;
      }

      .safetii-debug-content {
        max-height: calc(75vh - 62px);
        overflow: auto;
      }

      .safetii-debug-actions {
        position: sticky;
        top: 0;
        z-index: 2;

        padding: 10px;

        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;

        background: #111827;
      }

      .safetii-debug-actions button {
        padding: 9px 10px;

        border: 0;
        border-radius: 9px;

        font: inherit;
        font-weight: 700;

        cursor: pointer;
      }

      #safetiiDebugRun {
        background: #22c55e;
        color: #052e16;
      }

      #safetiiDebugCopy {
        background: #facc15;
        color: #422006;
      }

      #safetiiDebugReport {
        margin: 0;
        padding: 12px 14px 18px;

        color: #e5e7eb;

        white-space: pre-wrap;
        overflow-wrap: anywhere;

        line-height: 1.55;
      }

      #safetiiDebugPanel.minimized
      .safetii-debug-content {
        display: none;
      }
    `;

    document.head.appendChild(
      style
    );

    document.body.appendChild(
      panel
    );

    debugState.panel =
      panel;

    debugState.reportArea =
      document.getElementById(
        "safetiiDebugReport"
      );

    document
      .getElementById(
        "safetiiDebugRun"
      )
      ?.addEventListener(
        "click",
        runAllChecks
      );

    document
      .getElementById(
        "safetiiDebugCopy"
      )
      ?.addEventListener(
        "click",
        async () => {
          try {
            await navigator.clipboard
              .writeText(
                debugState.lastReport
              );

            const button =
              document.getElementById(
                "safetiiDebugCopy"
              );

            if (button) {
              const oldText =
                button.textContent;

              button.textContent =
                "Copied!";

              window.setTimeout(
                () => {
                  button.textContent =
                    oldText;
                },
                1200
              );
            }
          } catch {
            window.prompt(
              "Copy this report:",
              debugState.lastReport
            );
          }
        }
      );

    document
      .getElementById(
        "safetiiDebugMinimize"
      )
      ?.addEventListener(
        "click",
        () => {
          panel.classList.toggle(
            "minimized"
          );

          const button =
            document.getElementById(
              "safetiiDebugMinimize"
            );

          if (button) {
            button.textContent =
              panel.classList.contains(
                "minimized"
              )
                ? "+"
                : "−";
          }
        }
      );
  }

  /* =====================================================
     REPORT RENDERING
  ===================================================== */

  function renderReport() {
    if (
      !debugState.reportArea
    ) {
      return;
    }

    const lines = [];

    lines.push(
      "SAFETII NET DEBUG REPORT"
    );

    lines.push(
      `Page: ${window.location.href}`
    );

    lines.push(
      `Title: ${document.title || "(none)"}`
    );

    lines.push(
      `Time: ${new Date().toLocaleString()}`
    );

    lines.push("");

    lines.push(
      `${debugState.problems.length} problem(s), ${debugState.warnings.length} warning(s)`
    );

    lines.push("");

    if (
      debugState.runtimeErrors.length
    ) {
      lines.push(
        "RUNTIME ERRORS"
      );

      debugState.runtimeErrors
        .forEach(
          (error, index) => {
            lines.push(
              `✖ ${index + 1}. ${error.type}: ${error.message}`
            );

            if (
              error.location
            ) {
              lines.push(
                `   Location: ${error.location}`
              );
            }

            if (
              error.stack
            ) {
              lines.push(
                `   ${error.stack}`
              );
            }
          }
        );

      lines.push("");
    }

    if (
      debugState.problems.length
    ) {
      lines.push(
        "PROBLEMS"
      );

      debugState.problems
        .forEach(
          (problem, index) => {
            lines.push(
              `✖ ${index + 1}. ${problem.message}`
            );

            if (
              problem.details
            ) {
              lines.push(
                `   ${problem.details.replaceAll(
                  "\n",
                  "\n   "
                )}`
              );
            }
          }
        );

      lines.push("");
    }

    if (
      debugState.warnings.length
    ) {
      lines.push(
        "WARNINGS"
      );

      debugState.warnings
        .forEach(
          (warning, index) => {
            lines.push(
              `⚠ ${index + 1}. ${warning.message}`
            );

            if (
              warning.details
            ) {
              lines.push(
                `   ${warning.details.replaceAll(
                  "\n",
                  "\n   "
                )}`
              );
            }
          }
        );

      lines.push("");
    }

    if (
      debugState.successes.length
    ) {
      lines.push(
        "PASSED CHECKS"
      );

      debugState.successes
        .forEach(
          (success) => {
            lines.push(
              `✓ ${success.message}`
            );
          }
        );

      lines.push("");
    }

    lines.push(
      "LOADED JAVASCRIPT"
    );

    getScriptUrls()
      .forEach((url) => {
        lines.push(
          `• ${cleanUrl(url)}`
        );
      });

    lines.push("");

    lines.push(
      "LOADED STYLESHEETS"
    );

    getStylesheetUrls()
      .forEach((url) => {
        lines.push(
          `• ${cleanUrl(url)}`
        );
      });

    if (
      debugState.clickHistory.length
    ) {
      lines.push("");
      lines.push(
        "RECENT CLICKS"
      );

      debugState.clickHistory
        .forEach((click) => {
          lines.push(
            `• ${click.time} — ${click.description} — "${click.text}"${
              click.disabled
                ? " — DISABLED"
                : ""
            }`
          );
        });
    }

    const report =
      lines.join("\n");

    debugState.lastReport =
      report;

    debugState.reportArea.textContent =
      report;

    const summary =
      document.getElementById(
        "safetiiDebugSummary"
      );

    if (summary) {
      summary.textContent =
        `${debugState.problems.length} problem(s), ${debugState.warnings.length} warning(s)`;
    }
  }

  /* =====================================================
     MASTER CHECK
  ===================================================== */

  async function runAllChecks() {
    debugState.problems = [];
    debugState.warnings = [];
    debugState.successes = [];

    checkDocumentStructure();
    checkDuplicateIds();
    checkBrokenLinksAndImages();
    checkScriptOrder();
    checkArcadeSystem();
    checkStartButton();
    checkGameScreens();
    checkClueCollector();
    checkPiecesOfMe();

    renderReport();

    await checkLocalScriptSyntax();

    renderReport();

    return debugState.lastReport;
  }

  window.SafetiiDebug.run =
    runAllChecks;

  window.SafetiiDebug.copyReport =
    async () => {
      await navigator.clipboard
        .writeText(
          debugState.lastReport
        );
    };

  /* =====================================================
     INITIALIZE
  ===================================================== */

  function initializeDebugger() {
    createPanel();

    window.setTimeout(
      runAllChecks,
      350
    );

    window.addEventListener(
      "load",
      () => {
        window.setTimeout(
          runAllChecks,
          500
        );
      },
      {
        once: true
      }
    );
  }

  if (
    document.readyState ===
    "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      initializeDebugger,
      {
        once: true
      }
    );
  } else {
    initializeDebugger();
  }

   /* =========================================================
   SAFETII NET — DETAILED ARCADE DIAGNOSTICS
========================================================= */

function runDetailedArcadeDiagnostics() {
  const diagnosticResults = {
    problems: [],
    warnings: [],
    passed: [],
    details: []
  };

  const addProblem = (message, details = "") => {
    diagnosticResults.problems.push({
      message,
      details
    });
  };

  const addWarning = (message, details = "") => {
    diagnosticResults.warnings.push({
      message,
      details
    });
  };

  const addPassed = (message, details = "") => {
    diagnosticResults.passed.push({
      message,
      details
    });
  };

  const addDetail = (label, value) => {
    diagnosticResults.details.push({
      label,
      value
    });
  };

  /* -------------------------------------------------------
     PAGE INFORMATION
  ------------------------------------------------------- */

  addDetail(
    "Page path",
    window.location.pathname
  );

  addDetail(
    "Page title",
    document.title || "No title"
  );

  addDetail(
    "Viewport",
    `${window.innerWidth} × ${window.innerHeight}`
  );

  addDetail(
    "Device pixel ratio",
    String(window.devicePixelRatio || 1)
  );

  addDetail(
    "Online status",
    navigator.onLine ? "Online" : "Offline"
  );

  addDetail(
    "Document ready state",
    document.readyState
  );

  /* -------------------------------------------------------
     INVALID HTML STRUCTURE
  ------------------------------------------------------- */

  const body = document.body;
  const head = document.head;

  if (body) {
    addPassed("The page contains a <body> element.");
  } else {
    addProblem("The page is missing its <body> element.");
  }

  if (head) {
    addPassed("The page contains a <head> element.");
  } else {
    addProblem("The page is missing its <head> element.");
  }

  const bodyBeforeHead =
    document.documentElement &&
    [...document.documentElement.children].findIndex(
      (element) => element.tagName === "BODY"
    ) <
    [...document.documentElement.children].findIndex(
      (element) => element.tagName === "HEAD"
    );

  if (bodyBeforeHead) {
    addProblem(
      "The <body> appears before the <head>.",
      "Check for misplaced HTML between </head> and <body>."
    );
  }

  const invalidHeadChildren = head
    ? [...head.children].filter((element) => {
        return ![
          "BASE",
          "LINK",
          "META",
          "NOSCRIPT",
          "SCRIPT",
          "STYLE",
          "TEMPLATE",
          "TITLE"
        ].includes(element.tagName);
      })
    : [];

  if (invalidHeadChildren.length) {
    addProblem(
      "Visible page elements were found inside <head>.",
      invalidHeadChildren
        .map((element) => {
          return `<${element.tagName.toLowerCase()}>`;
        })
        .join(", ")
    );
  } else {
    addPassed(
      "No visible page elements were found inside <head>."
    );
  }

  /* -------------------------------------------------------
     DUPLICATE IDS
  ------------------------------------------------------- */

  const allIdElements = [
    ...document.querySelectorAll("[id]")
  ];

  const idCounts = {};

  allIdElements.forEach((element) => {
    idCounts[element.id] =
      (idCounts[element.id] || 0) + 1;
  });

  const duplicateIds = Object
    .entries(idCounts)
    .filter(([, count]) => count > 1);

  if (duplicateIds.length) {
    duplicateIds.forEach(([id, count]) => {
      addProblem(
        `Duplicate ID: #${id}`,
        `${count} elements use this ID.`
      );
    });
  } else {
    addPassed("No duplicate IDs detected.");
  }

  /* -------------------------------------------------------
     BROKEN IMAGES
  ------------------------------------------------------- */

  const images = [
    ...document.querySelectorAll("img")
  ];

  if (!images.length) {
    addWarning("No images were found on this page.");
  }

  images.forEach((image) => {
    const source =
      image.currentSrc ||
      image.getAttribute("src") ||
      "";

    if (!source) {
      addWarning(
        "An image has no source.",
        image.outerHTML.slice(0, 180)
      );

      return;
    }

    if (
      image.complete &&
      image.naturalWidth === 0
    ) {
      addProblem(
        "Broken image detected.",
        source
      );
    }
  });

  const workingImages = images.filter((image) => {
    return (
      image.complete &&
      image.naturalWidth > 0
    );
  });

  addDetail(
    "Images",
    `${workingImages.length}/${images.length} loaded`
  );

  /* -------------------------------------------------------
     LINKS
  ------------------------------------------------------- */

  const links = [
    ...document.querySelectorAll("a[href]")
  ];

  links.forEach((link) => {
    const href = link.getAttribute("href");

    if (!href || href.trim() === "#") {
      addWarning(
        "Empty or placeholder link found.",
        link.textContent.trim() || link.outerHTML.slice(0, 120)
      );

      return;
    }

    if (
      href.includes("././") ||
      href.includes(".././")
    ) {
      addWarning(
        "Suspicious link path found.",
        href
      );
    }
  });

  addDetail(
    "Links checked",
    String(links.length)
  );

  /* -------------------------------------------------------
     JAVASCRIPT AND CSS VERSIONS
  ------------------------------------------------------- */

  const scriptSources = [
    ...document.scripts
  ]
    .map((script) => script.src)
    .filter(Boolean);

  const stylesheetSources = [
    ...document.querySelectorAll(
      'link[rel="stylesheet"]'
    )
  ]
    .map((link) => link.href)
    .filter(Boolean);

  const versionPattern = /[?&]v=([^&]+)/;

  scriptSources.forEach((source) => {
    const match = source.match(versionPattern);

    addDetail(
      "JavaScript",
      match
        ? `${source} — version ${match[1]}`
        : `${source} — no cache version`
    );
  });

  stylesheetSources.forEach((source) => {
    const match = source.match(versionPattern);

    addDetail(
      "Stylesheet",
      match
        ? `${source} — version ${match[1]}`
        : `${source} — no cache version`
    );
  });

  const gameScript = scriptSources.find((source) => {
    return source.includes(
      "handle-with-care.js"
    );
  });

  if (
    window.location.pathname.includes(
      "handle-with-care"
    )
  ) {
    if (gameScript) {
      addPassed(
        "Handle With Care JavaScript is included.",
        gameScript
      );
    } else {
      addProblem(
        "Handle With Care JavaScript is missing."
      );
    }
  }

  /* -------------------------------------------------------
     VISIBILITY AND SCREEN STATES
  ------------------------------------------------------- */

  const visibleScreens = [
    ...document.querySelectorAll(
      ".handle-screen, .game-screen, .rescue-screen"
    )
  ].filter((element) => {
    const style =
      window.getComputedStyle(element);

    return (
      !element.classList.contains("hidden") &&
      style.display !== "none" &&
      style.visibility !== "hidden" &&
      Number(style.opacity) !== 0
    );
  });

  if (visibleScreens.length === 1) {
    addPassed(
      "Exactly one game screen is visible.",
      `#${visibleScreens[0].id || "no-id"}`
    );
  } else if (visibleScreens.length === 0) {
    addProblem(
      "No game screen is visible."
    );
  } else {
    addWarning(
      "Multiple game screens are visible.",
      visibleScreens
        .map((screen) => {
          return `#${screen.id || "no-id"}`;
        })
        .join(", ")
    );
  }

  /* -------------------------------------------------------
     ARCADE GAME CARDS
  ------------------------------------------------------- */

  const arcadeCards = [
    ...document.querySelectorAll(
      ".arcade-game-card"
    )
  ];

  if (
    window.location.pathname.includes(
      "/arcade/"
    ) &&
    !window.location.pathname.includes(
      "/games/"
    )
  ) {
    if (arcadeCards.length) {
      addPassed(
        `${arcadeCards.length} arcade game card(s) detected.`
      );
    } else {
      addProblem(
        "No arcade game cards were found."
      );
    }

    const gameIds = {};

    arcadeCards.forEach((card, index) => {
      const gameId =
        card.dataset.gameId;

      const gameName =
        card.dataset.gameName;

      const link =
        card.querySelector(
          ".play-game-button"
        );

      if (!gameId) {
        addProblem(
          `Arcade card ${index + 1} is missing data-game-id.`
        );
      } else {
        gameIds[gameId] =
          (gameIds[gameId] || 0) + 1;
      }

      if (!gameName) {
        addWarning(
          `Arcade card ${index + 1} is missing data-game-name.`
        );
      }

      if (!link) {
        addProblem(
          `${gameName || gameId || `Card ${index + 1}`} has no Play Game link.`
        );
      } else {
        const href =
          link.getAttribute("href");

        if (!href) {
          addProblem(
            `${gameName || gameId} has an empty Play Game link.`
          );
        }

        if (
          href &&
          !href.endsWith(".html")
        ) {
          addWarning(
            `${gameName || gameId} does not link to an HTML game page.`,
            href
          );
        }
      }
    });

    Object
      .entries(gameIds)
      .filter(([, count]) => count > 1)
      .forEach(([gameId, count]) => {
        addProblem(
          `Duplicate arcade game ID: ${gameId}`,
          `${count} cards use this game ID.`
        );
      });

    const handleWithCareCard =
      document.querySelector(
        '[data-game-id="handle-with-care"]'
      );

    if (handleWithCareCard) {
      addPassed(
        "Handle With Care appears on the Cyber Arcade page."
      );

      const handleLink =
        handleWithCareCard.querySelector(
          'a[href*="handle-with-care.html"]'
        );

      if (handleLink) {
        addPassed(
          "Handle With Care links to its game page.",
          handleLink.getAttribute("href")
        );
      } else {
        addProblem(
          "Handle With Care does not link to handle-with-care.html."
        );
      }
    } else {
      addProblem(
        "Handle With Care is missing from the Cyber Arcade page."
      );
    }
  }

  /* -------------------------------------------------------
     HANDLE WITH CARE-SPECIFIC CHECKS
  ------------------------------------------------------- */

  if (
    window.location.pathname.includes(
      "handle-with-care"
    )
  ) {
    const requiredIds = [
      "introScreen",
      "playScreen",
      "resultScreen",
      "startGame",
      "handleFactory",
      "factoryWorker",
      "laneOnePieces",
      "laneTwoPieces",
      "laneThreePieces",
      "nopeChuteStation",
      "garbageCanStation",
      "partsShelfStation",
      "mixerStation",
      "scannerStation",
      "shippingStation",
      "factoryTutorialCard",
      "timeFreezeFill"
    ];

    requiredIds.forEach((id) => {
      if (document.getElementById(id)) {
        addPassed(
          `Required element exists: #${id}`
        );
      } else {
        addProblem(
          `Required element is missing: #${id}`
        );
      }
    });

    const laneTwo =
      document.getElementById(
        "factoryLaneTwo"
      );

    const laneThree =
      document.getElementById(
        "factoryLaneThree"
      );

    if (
      laneTwo &&
      laneThree &&
      !laneTwo.classList.contains(
        "locked-lane"
      ) &&
      !laneThree.classList.contains(
        "locked-lane"
      )
    ) {
      addPassed(
        "All three factory lanes are currently open."
      );
    } else {
      addWarning(
        "One or more factory lanes are currently locked.",
        "This is a problem if a real order or tutorial requires pieces from those lanes."
      );
    }

    const movingPieces = [
      ...document.querySelectorAll(
        ".factory-moving-piece"
      )
    ];

    addDetail(
      "Visible factory pieces",
      String(movingPieces.length)
    );

    const tutorialCard =
      document.getElementById(
        "factoryTutorialCard"
      );

    const tutorialTitle =
      document.getElementById(
        "tutorialStepTitle"
      );

    if (
      tutorialCard &&
      !tutorialCard.classList.contains(
        "hidden"
      )
    ) {
      addDetail(
        "Tutorial step",
        tutorialTitle?.textContent.trim() ||
        "Tutorial is visible, but no title was found."
      );

      if (
        tutorialTitle?.textContent
          .toLowerCase()
          .includes("wacky")
      ) {
        const wackyPiece =
          [...movingPieces].find((piece) => {
            return piece.textContent
              .toLowerCase()
              .includes("wacky");
          });

        if (wackyPiece) {
          addPassed(
            "The tutorial asks for Wacky and the Wacky piece exists."
          );
        } else {
          addProblem(
            "The tutorial asks for Wacky, but no Wacky piece exists."
          );
        }
      }
    }

    const freezeMeter =
      document.getElementById(
        "timeFreezeFill"
      );

    if (freezeMeter) {
      addDetail(
        "Time Freeze meter width",
        freezeMeter.style.width ||
        window.getComputedStyle(
          freezeMeter
        ).width
      );
    }

    const worker =
      document.getElementById(
        "factoryWorker"
      );

    if (worker) {
      addDetail(
        "Worker position",
        `left: ${worker.style.left || "unset"}, top: ${worker.style.top || "unset"}`
      );
    }
  }

  /* -------------------------------------------------------
     LOCAL STORAGE
  ------------------------------------------------------- */

  const relevantStorageKeys = Object
    .keys(localStorage)
    .filter((key) => {
      return (
        key.toLowerCase().includes("safetii") ||
        key.toLowerCase().includes("arcade") ||
        key.toLowerCase().includes("handle")
      );
    });

  addDetail(
    "Relevant saved values",
    relevantStorageKeys.length
      ? relevantStorageKeys
          .map((key) => {
            return `${key}: ${localStorage.getItem(key)}`;
          })
          .join(" | ")
      : "None"
  );

  return diagnosticResults;
}

/*
  Make the detailed report available to the existing debugger.
*/
window.SafetiiDetailedDiagnostics =
  runDetailedArcadeDiagnostics;
})();
