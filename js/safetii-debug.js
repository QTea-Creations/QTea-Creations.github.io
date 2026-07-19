"use strict";

/* =========================================================
   SAFETII NET — UNIVERSAL DEBUGGER

   Supports:
   - Main website
   - Identity Island
   - Cyber Arcade
   - Individual arcade games

   DEVELOPMENT TOOL ONLY
========================================================= */

(() => {
  const DEBUG_PREFIX =
    "[Safetii Debug]";

  const pagePath =
    window.location.pathname;

  const isIdentityPage =
    pagePath.includes(
      "/missions/identity"
    );

  const isArcadeHome =
    pagePath.endsWith(
      "/arcade/"
    ) ||
    pagePath.endsWith(
      "/arcade/index.html"
    );

  const isArcadeGame =
    pagePath.includes(
      "/arcade/games/"
    );

  const isClueCollector =
    pagePath.includes(
      "clue-collector"
    );

  const problems = [];
  const warnings = [];
  const passes = [];

  /* =====================================================
     CONSOLE OUTPUT
  ===================================================== */

  function pass(message) {
    passes.push(message);

    console.log(
      `%c✔ ${DEBUG_PREFIX} ${message}`,
      [
        "color: #168a52",
        "font-weight: 800"
      ].join(";")
    );
  }

  function warn(message) {
    warnings.push(message);

    console.warn(
      `⚠ ${DEBUG_PREFIX} ${message}`
    );
  }

  function fail(message) {
    problems.push(message);

    console.error(
      `✖ ${DEBUG_PREFIX} ${message}`
    );
  }

  /* =====================================================
     CATCH ERRORS BEFORE OTHER SCRIPTS FINISH
  ===================================================== */

  window.addEventListener(
    "error",
    (event) => {
      const filename =
        event.filename ||
        "unknown file";

      const line =
        event.lineno ||
        "?";

      const column =
        event.colno ||
        "?";

      fail(
        `${event.message} — ${filename}:${line}:${column}`
      );

      showDebuggerPanel();
    }
  );

  window.addEventListener(
    "unhandledrejection",
    (event) => {
      const reason =
        event.reason?.message ||
        String(
          event.reason ||
          "Unknown promise error"
        );

      fail(
        `Unhandled promise error: ${reason}`
      );

      showDebuggerPanel();
    }
  );

  /* =====================================================
     HELPERS
  ===================================================== */

  function byId(id) {
    return document.getElementById(
      id
    );
  }

  function getFileName(url) {
    try {
      return new URL(
        url,
        window.location.href
      ).pathname
        .split("/")
        .pop();
    } catch {
      return url;
    }
  }

  function checkElement(id) {
    const element =
      byId(id);

    if (element) {
      pass(
        `Element #${id} exists.`
      );

      return true;
    }

    fail(
      `Missing element #${id}.`
    );

    return false;
  }

  function checkGlobal(
    name,
    expectedType
  ) {
    const value =
      window[name];

    if (
      typeof value ===
      expectedType
    ) {
      pass(
        `window.${name} is available.`
      );

      return true;
    }

    fail(
      `window.${name} is missing or is not a ${expectedType}.`
    );

    return false;
  }

  /* =====================================================
     DUPLICATE IDS
  ===================================================== */

  function checkDuplicateIds() {
    const counts =
      new Map();

    document
      .querySelectorAll("[id]")
      .forEach((element) => {
        const id =
          element.id.trim();

        if (!id) {
          return;
        }

        counts.set(
          id,
          (counts.get(id) || 0) + 1
        );
      });

    const duplicates =
      Array.from(
        counts.entries()
      ).filter(
        ([, count]) =>
          count > 1
      );

    if (
      duplicates.length === 0
    ) {
      pass(
        "No duplicate HTML IDs found."
      );

      return;
    }

    duplicates.forEach(
      ([id, count]) => {
        fail(
          `Duplicate ID #${id} appears ${count} times.`
        );
      }
    );
  }

  /* =====================================================
     SCRIPT PATH CHECKER
  ===================================================== */

  function checkScripts() {
    const scripts =
      Array.from(
        document.scripts
      );

    scripts.forEach(
      (script) => {
        if (!script.src) {
          return;
        }

        const source =
          script.getAttribute(
            "src"
          );

        if (
          source.includes("././")
        ) {
          fail(
            `Suspicious script path: ${source}. Replace ././ with the correct ../ or ../../ path.`
          );
        }

        pass(
          `Script included: ${getFileName(script.src)}`
        );
      }
    );
  }

  /* =====================================================
     STYLESHEET PATH CHECKER
  ===================================================== */

  function checkStylesheets() {
    document
      .querySelectorAll(
        'link[rel="stylesheet"]'
      )
      .forEach((link) => {
        const href =
          link.getAttribute(
            "href"
          ) || "";

        if (
          href.includes("././")
        ) {
          fail(
            `Suspicious stylesheet path: ${href}.`
          );
        }
      });
  }

  /* =====================================================
     IMAGE CHECKER
  ===================================================== */

  function checkImages() {
    document
      .querySelectorAll("img")
      .forEach((image) => {
        if (
          image.complete &&
          image.naturalWidth > 0
        ) {
          return;
        }

        image.addEventListener(
          "error",
          () => {
            fail(
              `Image failed to load: ${image.getAttribute("src")}`
            );

            showDebuggerPanel();
          },
          {
            once: true
          }
        );
      });
  }

  /* =====================================================
     LINK CHECKER
  ===================================================== */

  function checkArcadeLinks() {
    document
      .querySelectorAll("a")
      .forEach((link) => {
        const text =
          link.textContent
            .trim()
            .toLowerCase();

        const href =
          link.getAttribute(
            "href"
          ) || "";

        if (
          text.includes(
            "cyber arcade"
          ) &&
          (
            href === "#arcade" ||
            href.endsWith(
              "index.html#arcade"
            )
          )
        ) {
          warn(
            `Cyber Arcade link still points to the homepage section: ${href}`
          );
        }
      });
  }

  /* =====================================================
     BUTTON CLICK TEST
  ===================================================== */

  function monitorButton(
    id,
    label
  ) {
    const button =
      byId(id);

    if (!button) {
      fail(
        `${label} button #${id} is missing.`
      );

      return;
    }

    pass(
      `${label} button #${id} exists.`
    );

    button.addEventListener(
      "click",
      () => {
        console.log(
          `%c🖱 ${DEBUG_PREFIX} ${label} was clicked.`,
          "color: #6d38db; font-weight: 900"
        );
      },
      {
        capture: true
      }
    );
  }

  /* =====================================================
     IDENTITY ISLAND CHECKS
  ===================================================== */

  function checkIdentityIsland() {
    pass(
      "Running Identity Island checks."
    );

    checkGlobal(
      "IdentityGame",
      "object"
    );

    [
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
      "testZone"
    ].forEach(
      checkElement
    );

    monitorButton(
      "acceptMission",
      "Accept Mission"
    );
  }

  /* =====================================================
     ARCADE HOME CHECKS
  ===================================================== */

  function checkArcadeHome() {
    pass(
      "Running Cyber Arcade homepage checks."
    );

    checkGlobal(
      "SafetiiArcade",
      "object"
    );

    const gameLinks =
      document.querySelectorAll(
        'a[href*="/games/"], a[href*="games/"]'
      );

    if (
      gameLinks.length > 0
    ) {
      pass(
        `${gameLinks.length} arcade game link(s) found.`
      );
    } else {
      warn(
        "No arcade game links were found."
      );
    }
  }

  /* =====================================================
     GENERAL ARCADE GAME CHECKS
  ===================================================== */

  function checkArcadeGame() {
    pass(
      "Running arcade game checks."
    );

    checkGlobal(
      "SafetiiArcade",
      "object"
    );

    [
      "introScreen",
      "playScreen",
      "resultScreen",
      "startGame",
      "globalPoints"
    ].forEach(
      checkElement
    );

    monitorButton(
      "startGame",
      "Start Game"
    );
  }

  /* =====================================================
     CLUE COLLECTOR CHECKS
  ===================================================== */

  function checkClueCollector() {
    pass(
      "Running Clue Collector checks."
    );

    const requiredElements = [
      "startGame",
      "introScreen",
      "playScreen",
      "resultScreen",
      "dynamicSocialStage",
      "checkAnswers",
      "clearSelections",
      "nextProfile",
      "profileNumber",
      "profileTotal",
      "currentScore",
      "currentHeat",
      "clueFeedbackPanel",
      "clueExplanationPopup"
    ];

    requiredElements.forEach(
      checkElement
    );

    const scoreScript =
      Array.from(
        document.scripts
      ).find(
        (script) =>
          script.src.includes(
            "arcade-score.js"
          )
      );

    const clueScript =
      Array.from(
        document.scripts
      ).find(
        (script) =>
          script.src.includes(
            "clue-collector.js"
          )
      );

    if (scoreScript) {
      pass(
        "arcade-score.js is included."
      );
    } else {
      fail(
        "arcade-score.js is not included."
      );
    }

    if (clueScript) {
      pass(
        "clue-collector.js is included."
      );
    } else {
      fail(
        "clue-collector.js is not included."
      );
    }

    if (
      window.SafetiiArcade
    ) {
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
            typeof window
              .SafetiiArcade[
                functionName
              ] === "function"
          ) {
            pass(
              `SafetiiArcade.${functionName}() exists.`
            );
          } else {
            fail(
              `SafetiiArcade.${functionName}() is missing.`
            );
          }
        }
      );
    }

    const startButton =
      byId("startGame");

    if (startButton) {
      window.setTimeout(
        () => {
          const intro =
            byId("introScreen");

          const play =
            byId("playScreen");

          if (
            !intro ||
            !play
          ) {
            return;
          }

          console.log(
            `${DEBUG_PREFIX} Start button ready for manual testing.`
          );
        },
        500
      );
    }
  }

  /* =====================================================
     VISUAL DEBUG PANEL
  ===================================================== */

  function createDebuggerPanel() {
    if (
      byId("safetiiDebuggerPanel")
    ) {
      return;
    }

    const panel =
      document.createElement(
        "aside"
      );

    panel.id =
      "safetiiDebuggerPanel";

    panel.innerHTML = `
      <button
        id="safetiiDebuggerToggle"
        type="button"
        aria-expanded="true"
      >
        🛠 Debugger
      </button>

      <div id="safetiiDebuggerContent">
        <strong>
          Safetii Net Debugger
        </strong>

        <p id="safetiiDebuggerSummary">
          Checking page…
        </p>

        <div id="safetiiDebuggerProblems"></div>

        <button
          id="safetiiRunChecks"
          type="button"
        >
          Run Checks Again
        </button>
      </div>
    `;

    Object.assign(
      panel.style,
      {
        position: "fixed",
        left: "14px",
        bottom: "14px",
        zIndex: "99999",
        width: "min(390px, calc(100vw - 28px))",
        padding: "12px",
        background: "rgba(22, 29, 52, 0.97)",
        color: "white",
        border: "3px solid #7d43ff",
        borderRadius: "16px",
        boxShadow: "0 14px 36px rgba(0,0,0,.3)",
        fontFamily: "Arial, sans-serif",
        fontSize: "13px"
      }
    );

    document.body.appendChild(
      panel
    );

    byId("safetiiDebuggerToggle")
      ?.addEventListener(
        "click",
        () => {
          const content =
            byId(
              "safetiiDebuggerContent"
            );

          const hidden =
            content?.hidden;

          if (content) {
            content.hidden =
              !hidden;
          }
        }
      );

    byId("safetiiRunChecks")
      ?.addEventListener(
        "click",
        runChecks
      );
  }

  function showDebuggerPanel() {
    createDebuggerPanel();

    const summary =
      byId(
        "safetiiDebuggerSummary"
      );

    const problemArea =
      byId(
        "safetiiDebuggerProblems"
      );

    if (summary) {
      summary.textContent =
        problems.length > 0
          ? `${problems.length} problem(s), ${warnings.length} warning(s)`
          : `No detected errors. ${warnings.length} warning(s).`;
    }

    if (problemArea) {
      const problemHtml =
        problems
          .slice(-8)
          .map(
            (problem) =>
              `<p style="color:#ff9fbd;margin:7px 0;">✖ ${problem}</p>`
          )
          .join("");

      const warningHtml =
        warnings
          .slice(-5)
          .map(
            (warning) =>
              `<p style="color:#ffe782;margin:7px 0;">⚠ ${warning}</p>`
          )
          .join("");

      problemArea.innerHTML =
        problemHtml +
        warningHtml ||
        '<p style="color:#85f0b7;">✔ No problems detected.</p>';
    }
  }

  /* =====================================================
     RUN ALL CHECKS
  ===================================================== */

  function runChecks() {
    problems.length = 0;
    warnings.length = 0;
    passes.length = 0;

    console.group(
      `${DEBUG_PREFIX} Page Report`
    );

    console.log(
      "Page:",
      window.location.href
    );

    checkDuplicateIds();
    checkScripts();
    checkStylesheets();
    checkImages();
    checkArcadeLinks();

    if (isIdentityPage) {
      checkIdentityIsland();
    }

    if (isArcadeHome) {
      checkArcadeHome();
    }

    if (isArcadeGame) {
      checkArcadeGame();
    }

    if (isClueCollector) {
      checkClueCollector();
    }

    console.groupEnd();

    showDebuggerPanel();
  }

  /* =====================================================
     START AFTER HTML LOADS
  ===================================================== */

  function initializeDebugger() {
    createDebuggerPanel();

    window.setTimeout(
      runChecks,
      250
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
})();
