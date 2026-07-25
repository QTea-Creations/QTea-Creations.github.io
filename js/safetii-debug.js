"use strict";

/* =========================================================
   SAFETII NET — UNIVERSAL DEBUGGER
   Replace the entire js/safetii-debug.js file with this.
========================================================= */

(() => {
  if (window.SafetiiDebug?.loaded) {
    return;
  }

  const state = {
    loaded: true,
    problems: [],
    warnings: [],
    passed: [],
    runtimeErrors: [],
    clicks: [],
    report: "",
    panel: null,
    reportArea: null
  };

  window.SafetiiDebug = state;

  const getById = (id) =>
    document.getElementById(id);

  /* =====================================================
     BASIC HELPERS
  ===================================================== */

  function addProblem(
    message,
    details = ""
  ) {
    state.problems.push({
      message,
      details
    });
  }

  function addWarning(
    message,
    details = ""
  ) {
    state.warnings.push({
      message,
      details
    });
  }

  function addPassed(
    message,
    details = ""
  ) {
    state.passed.push({
      message,
      details
    });
  }

  function cleanUrl(value) {
    try {
      const url =
        new URL(
          value,
          window.location.href
        );

      return (
        url.pathname +
        url.search
      );
    } catch {
      return String(
        value || ""
      );
    }
  }

  function formatError(error) {
    if (!error) {
      return "Unknown error";
    }

    if (
      typeof error ===
      "string"
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

  function isVisible(element) {
    if (!element) {
      return false;
    }

    const style =
      window.getComputedStyle(
        element
      );

    const box =
      element.getBoundingClientRect();

    return (
      !element.classList.contains(
        "hidden"
      ) &&
      style.display !==
        "none" &&
      style.visibility !==
        "hidden" &&
      Number(
        style.opacity
      ) !== 0 &&
      box.width > 0 &&
      box.height > 0
    );
  }

  function getScriptUrls() {
    return [
      ...document.scripts
    ]
      .map(
        (script) =>
          script.src
      )
      .filter(Boolean);
  }

  function getStylesheetUrls() {
    return [
      ...document.querySelectorAll(
        'link[rel="stylesheet"]'
      )
    ]
      .map(
        (link) =>
          link.href
      )
      .filter(Boolean);
  }

  /* =====================================================
     PAGE TYPE DETECTION
  ===================================================== */

  function getPageType() {
    const path =
      window.location.pathname
        .toLowerCase();

    if (
      path.includes(
        "/arcade/games/"
      )
    ) {
      return "arcade-game";
    }

    if (
      path.endsWith(
        "/arcade/"
      ) ||
      path.endsWith(
        "/arcade/index.html"
      )
    ) {
      return "arcade-library";
    }

    if (
      path.includes(
        "/missions/"
      )
    ) {
      return "mission";
    }

    if (
      path.endsWith(
        "/missions.html"
      )
    ) {
      return "mission-library";
    }

    if (
      path.includes(
        "dashboard"
      )
    ) {
      return "dashboard";
    }

    if (
      path.includes(
        "notebook"
      )
    ) {
      return "notebook";
    }

    if (
      path.includes(
        "parents"
      )
    ) {
      return "parent-page";
    }

    if (
      path.includes(
        "teachers"
      )
    ) {
      return "teacher-page";
    }

    if (
      path === "/" ||
      path.endsWith(
        "/index.html"
      )
    ) {
      return "homepage";
    }

    return "general";
  }

  function getPageProfile() {
    const profiles = {
      homepage: {
        label:
          "Homepage",

        requiresArcadeScore:
          false,

        requiresStartGame:
          false,

        requiresGameScreens:
          false,

        checksArcadeCards:
          false
      },

      "arcade-library": {
        label:
          "Cyber Arcade",

        requiresArcadeScore:
          true,

        requiresStartGame:
          false,

        requiresGameScreens:
          false,

        checksArcadeCards:
          true
      },

      "arcade-game": {
        label:
          "Arcade Game",

        requiresArcadeScore:
          true,

        requiresStartGame:
          true,

        requiresGameScreens:
          true,

        checksArcadeCards:
          false
      },

      mission: {
        label:
          "Mission",

        requiresArcadeScore:
          false,

        requiresStartGame:
          false,

        requiresGameScreens:
          false,

        checksArcadeCards:
          false
      },

      "mission-library": {
        label:
          "Mission Library",

        requiresArcadeScore:
          false,

        requiresStartGame:
          false,

        requiresGameScreens:
          false,

        checksArcadeCards:
          false
      },

      dashboard: {
        label:
          "Hero Dashboard",

        requiresArcadeScore:
          false,

        requiresStartGame:
          false,

        requiresGameScreens:
          false,

        checksArcadeCards:
          false
      },

      notebook: {
        label:
          "Cyber Notebook",

        requiresArcadeScore:
          false,

        requiresStartGame:
          false,

        requiresGameScreens:
          false,

        checksArcadeCards:
          false
      },

      "parent-page": {
        label:
          "Parent Page",

        requiresArcadeScore:
          false,

        requiresStartGame:
          false,

        requiresGameScreens:
          false,

        checksArcadeCards:
          false
      },

      "teacher-page": {
        label:
          "Teacher Page",

        requiresArcadeScore:
          false,

        requiresStartGame:
          false,

        requiresGameScreens:
          false,

        checksArcadeCards:
          false
      },

      general: {
        label:
          "General Safetii Net Page",

        requiresArcadeScore:
          false,

        requiresStartGame:
          false,

        requiresGameScreens:
          false,

        checksArcadeCards:
          false
      }
    };

    return (
      profiles[
        getPageType()
      ] ||
      profiles.general
    );
  }

  /* =====================================================
     LIVE ERROR CAPTURE
  ===================================================== */

  window.addEventListener(
    "error",
    (event) => {
      if (
        event.target &&
        event.target !==
          window
      ) {
        const target =
          event.target;

        const source =
          target.src ||
          target.href ||
          "";

        if (source) {
          state.runtimeErrors.push({
            type:
              "Resource failed to load",

            message:
              `${
                target.tagName
                  ?.toLowerCase() ||
                "resource"
              } could not be loaded`,

            location:
              cleanUrl(
                source
              ),

            stack:
              ""
          });

          renderReport();
        }

        return;
      }

      state.runtimeErrors.push({
        type:
          "JavaScript error",

        message:
          event.message ||
          "Unknown JavaScript error",

        location: [
          event.filename,

          event.lineno
            ? `line ${event.lineno}`
            : "",

          event.colno
            ? `column ${event.colno}`
            : ""
        ]
          .filter(Boolean)
          .join(" — "),

        stack:
          event.error
            ?.stack ||
          ""
      });

      renderReport();
    },
    true
  );

  window.addEventListener(
    "unhandledrejection",
    (event) => {
      state.runtimeErrors.push({
        type:
          "Unhandled promise rejection",

        message:
          formatError(
            event.reason
          ),

        location:
          "",

        stack:
          event.reason
            ?.stack ||
          ""
      });

      renderReport();
    }
  );

  /* =====================================================
     CLICK TRACKING
  ===================================================== */

  document.addEventListener(
    "click",
    (event) => {
      const target =
        event.target instanceof
        Element
          ? event.target.closest(
              "button, a, [role='button']"
            )
          : null;

      if (!target) {
        return;
      }

      state.clicks.unshift({
        name:
          target.id
            ? `#${target.id}`
            : target.className
              ? `.${String(
                  target.className
                )
                  .trim()
                  .replace(
                    /\s+/g,
                    "."
                  )}`
              : target.tagName,

        text:
          target.textContent
            ?.trim()
            .replace(
              /\s+/g,
              " "
            )
            .slice(
              0,
              90
            ) ||
          "",

        disabled:
          Boolean(
            target.disabled
          ),

        time:
          new Date()
            .toLocaleTimeString()
      });

      state.clicks =
        state.clicks.slice(
          0,
          12
        );

      window.setTimeout(
        runAllChecks,
        120
      );
    },
    true
  );

  /* =====================================================
     DOCUMENT CHECKS
  ===================================================== */

  function checkDocumentStructure() {
    if (
      document.doctype
    ) {
      addPassed(
        "DOCTYPE is present."
      );
    } else {
      addWarning(
        "The page is missing <!DOCTYPE html>."
      );
    }

    if (
      !document.head
    ) {
      addProblem(
        "The page is missing a valid <head> element."
      );
    }

    if (
      !document.body
    ) {
      addProblem(
        "The page is missing a valid <body> element."
      );
    }

    const titles =
      document.querySelectorAll(
        "title"
      );

    if (
      titles.length === 0
    ) {
      addWarning(
        "The page has no <title>."
      );
    } else if (
      titles.length > 1
    ) {
      addProblem(
        `The page has ${titles.length} <title> elements.`
      );
    } else {
      addPassed(
        "Exactly one <title> element exists."
      );
    }

    const viewports =
      document.querySelectorAll(
        'meta[name="viewport"]'
      );

    if (
      viewports.length > 1
    ) {
      addProblem(
        `The page has ${viewports.length} viewport tags.`
      );
    }

    const headChildren =
      document.head
        ? [
            ...document.head
              .children
          ]
        : [];

    const invalidHeadChildren =
      headChildren.filter(
        (element) => {
          return ![
            "BASE",
            "LINK",
            "META",
            "NOSCRIPT",
            "SCRIPT",
            "STYLE",
            "TEMPLATE",
            "TITLE"
          ].includes(
            element.tagName
          );
        }
      );

    if (
      invalidHeadChildren.length
    ) {
      addProblem(
        "Visible page elements were found inside <head>.",

        invalidHeadChildren
          .map(
            (element) =>
              `<${element.tagName.toLowerCase()}>`
          )
          .join(", ")
      );
    } else {
      addPassed(
        "No visible page elements were found inside <head>."
      );
    }
  }

  function checkDuplicateIds() {
    const counts =
      new Map();

    document
      .querySelectorAll(
        "[id]"
      )
      .forEach(
        (element) => {
          const id =
            element.id.trim();

          if (!id) {
            return;
          }

          counts.set(
            id,
            (
              counts.get(id) ||
              0
            ) + 1
          );
        }
      );

    const duplicates =
      [
        ...counts.entries()
      ].filter(
        ([, count]) =>
          count > 1
      );

    if (
      !duplicates.length
    ) {
      addPassed(
        "No duplicate IDs detected."
      );

      return;
    }

    duplicates.forEach(
      ([id, count]) => {
        addProblem(
          `Duplicate ID #${id} appears ${count} times.`
        );
      }
    );
  }

  function checkImagesAndLinks() {
    const images = [
      ...document.querySelectorAll(
        "img"
      )
    ];

    images.forEach(
      (image) => {
        const source =
          image.currentSrc ||
          image.src ||
          "";

        if (!source) {
          addWarning(
            "An image has no source."
          );

          return;
        }

        if (
          image.complete &&
          image.naturalWidth ===
            0
        ) {
          addProblem(
            "An image failed to load.",
            cleanUrl(
              source
            )
          );
        }
      }
    );

    addPassed(
      `${images.length} image(s) inspected.`
    );

    const links = [
      ...document.querySelectorAll(
        "a[href]"
      )
    ];

    links.forEach(
      (link) => {
        const href =
          link
            .getAttribute(
              "href"
            )
            ?.trim() ||
          "";

        if (
          !href ||
          href === "#"
        ) {
          addWarning(
            "A link has an empty or placeholder destination.",

            link.textContent
              ?.trim() ||
            "(no text)"
          );
        }

        if (
          href.includes(
            "././"
          ) ||
          href.includes(
            ".././"
          )
        ) {
          addWarning(
            "A link has a suspicious path.",
            href
          );
        }
      }
    );

    addPassed(
      `${links.length} link(s) inspected.`
    );
  }

  function checkUpcomingContent() {
    const items =
      new Set();

    document
      .querySelectorAll(
        ".coming-soon-card, .coming-badge, [data-status='coming-soon'], button[disabled]"
      )
      .forEach(
        (element) => {
          const container =
            element.closest(
              "article, section, .card, .arcade-game-card"
            ) ||
            element;

          const title =
            container.querySelector(
              "h1, h2, h3, h4, strong"
            )
              ?.textContent
              ?.trim();

          if (title) {
            items.add(
              title
            );
          }
        }
      );

    if (
      items.size
    ) {
      addWarning(
        `${items.size} upcoming or disabled item(s) detected.`,

        [
          ...items
        ].join(
          " | "
        )
      );
    } else {
      addPassed(
        "No upcoming or disabled content detected."
      );
    }
  }

  /* =====================================================
     ARCADE CHECKS
  ===================================================== */

  function checkArcadeSystem(
    profile
  ) {
    if (
      !profile
        .requiresArcadeScore
    ) {
      addPassed(
        "Arcade scoring is not required on this page."
      );

      return;
    }

    const arcade =
      window.SafetiiArcade;

    if (!arcade) {
      addProblem(
        "window.SafetiiArcade is missing.",

        "This page requires arcade-score.js."
      );

      return;
    }

    addPassed(
      "window.SafetiiArcade is available."
    );

    [
      "startRound",
      "answerQuestion",
      "finishRound",
      "getCurrentRound",
      "getGlobalPoints"
    ].forEach(
      (name) => {
        if (
          typeof arcade[
            name
          ] ===
          "function"
        ) {
          addPassed(
            `SafetiiArcade.${name} is available.`
          );
        } else {
          addProblem(
            `SafetiiArcade.${name} is missing.`
          );
        }
      }
    );
  }

  function checkStartButton(
    profile
  ) {
    if (
      !profile
        .requiresStartGame
    ) {
      addPassed(
        "A Start Game button is not required on this page."
      );

      return;
    }

    const button =
      getById(
        "startGame"
      );

    if (!button) {
      addProblem(
        "The #startGame button was not found."
      );

      return;
    }

    addPassed(
      "The #startGame button exists."
    );

    if (
      button.disabled
    ) {
      addProblem(
        "The Start Game button is disabled."
      );
    }

    if (
      isVisible(
        button
      )
    ) {
      addPassed(
        "The Start Game button is visible."
      );
    } else {
      addWarning(
        "The Start Game button exists but is not visible.",

        "This may be normal after the game has already started."
      );
    }
  }

  function checkGameScreens(
    profile
  ) {
    if (
      !profile
        .requiresGameScreens
    ) {
      addPassed(
        "Game-screen checks are not required on this page."
      );

      return;
    }

    const ids = [
      "introScreen",
      "playScreen",
      "resultScreen"
    ];

    const existing =
      ids.filter(
        (id) =>
          getById(id)
      );

    ids.forEach(
      (id) => {
        if (
          !getById(id)
        ) {
          addProblem(
            `Game screen #${id} is missing.`
          );
        }
      }
    );

    const visible =
      existing.filter(
        (id) =>
          isVisible(
            getById(id)
          )
      );

    if (
      visible.length === 1
    ) {
      addPassed(
        `Visible game screen: #${visible[0]}`
      );
    } else if (
      visible.length === 0
    ) {
      addProblem(
        "No game screen is visible."
      );
    } else {
      addProblem(
        "More than one game screen is visible.",

        visible.join(
          ", "
        )
      );
    }
  }

  function checkArcadeCards(
    profile
  ) {
    if (
      !profile
        .checksArcadeCards
    ) {
      return;
    }

    const cards = [
      ...document.querySelectorAll(
        ".arcade-game-card"
      )
    ];

    if (
      !cards.length
    ) {
      addProblem(
        "No arcade game cards were found."
      );

      return;
    }

    addPassed(
      `${cards.length} arcade game card(s) detected.`
    );

    const ids =
      new Map();

    cards.forEach(
      (card, index) => {
        const gameId =
          card.dataset
            .gameId ||
          "";

        const gameName =
          card.dataset
            .gameName ||
          `Card ${index + 1}`;

        const link =
          card.querySelector(
            ".play-game-button"
          );

        if (gameId) {
          ids.set(
            gameId,
            (
              ids.get(
                gameId
              ) ||
              0
            ) + 1
          );
        } else if (
          !card.classList
            .contains(
              "coming-soon-card"
            )
        ) {
          addWarning(
            `${gameName} is missing data-game-id.`
          );
        }

        if (!link) {
          addWarning(
            `${gameName} has no Play Game control.`
          );
        }
      }
    );

    [
      ...ids.entries()
    ]
      .filter(
        ([, count]) =>
          count > 1
      )
      .forEach(
        ([id, count]) => {
          addProblem(
            `Duplicate arcade game ID: ${id}`,

            `${count} cards use this ID.`
          );
        }
      );

    const handleCard =
      document.querySelector(
        '[data-game-id="handle-with-care"]'
      );

    if (!handleCard) {
      addProblem(
        "Handle With Care is missing from the Cyber Arcade page."
      );

      return;
    }

    addPassed(
      "Handle With Care appears on the Cyber Arcade page."
    );

    const handleLink =
      handleCard.querySelector(
        'a[href*="handle-with-care.html"]'
      );

    if (
      handleLink
    ) {
      addPassed(
        "Handle With Care links to its game page.",

        handleLink.getAttribute(
          "href"
        )
      );
    } else {
      addProblem(
        "Handle With Care does not link to handle-with-care.html."
      );
    }
  }

  /* =====================================================
     HANDLE WITH CARE CHECKS
  ===================================================== */

  function checkHandleWithCare() {
    if (
      !window.location.pathname
        .toLowerCase()
        .includes(
          "handle-with-care"
        )
    ) {
      return;
    }

    addPassed(
      "Handle With Care page detected."
    );

    [
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
    ].forEach(
      (id) => {
        if (
          getById(id)
        ) {
          addPassed(
            `Handle With Care found #${id}.`
          );
        } else {
          addProblem(
            `Handle With Care is missing #${id}.`
          );
        }
      }
    );

    const tutorialCard =
      getById(
        "factoryTutorialCard"
      );

    const tutorialTitle =
      getById(
        "tutorialStepTitle"
      );

    const pieces = [
      ...document.querySelectorAll(
        ".factory-moving-piece"
      )
    ];

    if (
      tutorialCard &&
      isVisible(
        tutorialCard
      )
    ) {
      addPassed(
        `Tutorial is visible: ${
          tutorialTitle
            ?.textContent
            ?.trim() ||
          "Untitled step"
        }`
      );

      if (
        tutorialTitle
          ?.textContent
          ?.toLowerCase()
          .includes(
            "wacky"
          )
      ) {
        const wackyExists =
          pieces.some(
            (piece) => {
              return piece
                .textContent
                .toLowerCase()
                .includes(
                  "wacky"
                );
            }
          );

        if (
          wackyExists
        ) {
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

    const laneTwo =
      getById(
        "factoryLaneTwo"
      );

    const laneThree =
      getById(
        "factoryLaneThree"
      );

    if (
      laneTwo &&
      laneThree &&
      !laneTwo.classList
        .contains(
          "locked-lane"
        ) &&
      !laneThree.classList
        .contains(
          "locked-lane"
        )
    ) {
      addPassed(
        "All three factory lanes are currently open."
      );
    } else {
      addWarning(
        "One or more factory lanes are currently locked.",

        "This is a problem when the current recipe requires those lanes."
      );
    }

    const worker =
      getById(
        "factoryWorker"
      );

    if (
      worker
    ) {
      addPassed(
        "Factory worker position detected.",

        `left: ${
          worker.style.left ||
          "unset"
        }, top: ${
          worker.style.top ||
          "unset"
        }`
      );
    }

    const freezeFill =
      getById(
        "timeFreezeFill"
      );

    if (
      freezeFill
    ) {
      addPassed(
        "Time Freeze meter detected.",

        `width: ${
          freezeFill.style.width ||
          window
            .getComputedStyle(
              freezeFill
            )
            .width
        }`
      );
    }

    addPassed(
      `${pieces.length} factory piece(s) currently detected.`
    );
  }

  /* =====================================================
     SCRIPT SYNTAX CHECKS
  ===================================================== */

  async function checkLocalScriptSyntax() {
    const scripts =
      getScriptUrls().filter(
        (source) => {
          try {
            return (
              new URL(
                source
              ).origin ===
              window.location
                .origin
            );
          } catch {
            return false;
          }
        }
      );

    for (
      const source of
      scripts
    ) {
      try {
        const response =
          await fetch(
            source,
            {
              cache:
                "no-store"
            }
          );

        if (
          !response.ok
        ) {
          addProblem(
            "A JavaScript file could not be downloaded.",

            `${cleanUrl(
              source
            )} returned HTTP ${
              response.status
            }`
          );

          continue;
        }

        const code =
          await response.text();

        try {
          new Function(
            code
          );

          addPassed(
            `JavaScript syntax passed: ${cleanUrl(
              source
            )}`
          );
        } catch (error) {
          addProblem(
            `JavaScript syntax error in ${cleanUrl(
              source
            )}`,

            formatError(
              error
            )
          );
        }
      } catch (error) {
        addWarning(
          `Could not inspect ${cleanUrl(
            source
          )}.`,

          formatError(
            error
          )
        );
      }
    }
  }

  /* =====================================================
     DEBUG PANEL
  ===================================================== */

  function createPanel() {
    if (
      getById(
        "safetiiDebugPanel"
      )
    ) {
      state.panel =
        getById(
          "safetiiDebugPanel"
        );

      state.reportArea =
        getById(
          "safetiiDebugReport"
        );

      return;
    }

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

        width: min(
          520px,
          calc(100vw - 32px)
        );

        max-height: 78vh;
        overflow: hidden;

        background: #111827;
        color: #f9fafb;

        border: 3px solid #7c3aed;
        border-radius: 18px;

        box-shadow:
          0 18px 50px
          rgba(0, 0, 0, 0.42);

        font-family:
          Consolas,
          Monaco,
          monospace;

        font-size: 12px;
        text-align: left;
      }

      #safetiiDebugPanel * {
        box-sizing: border-box;
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

      .safetii-debug-header strong,
      .safetii-debug-header small {
        display: block;
      }

      .safetii-debug-header small {
        margin-top: 3px;
      }

      .safetii-debug-header button {
        width: 34px;
        height: 34px;

        border: 0;
        border-radius: 9px;

        background:
          rgba(
            255,
            255,
            255,
            0.18
          );

        color: white;
        font-size: 20px;
        cursor: pointer;
      }

      .safetii-debug-content {
        max-height:
          calc(
            78vh - 62px
          );

        overflow: auto;
      }

      .safetii-debug-actions {
        position: sticky;
        top: 0;
        z-index: 2;

        padding: 10px;

        display: grid;
        grid-template-columns:
          1fr 1fr;

        gap: 8px;
        background: #111827;
      }

      .safetii-debug-actions button {
        padding: 9px 10px;

        border: 0;
        border-radius: 9px;

        font: inherit;
        font-weight: 800;

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
        padding:
          12px
          14px
          18px;

        color: #e5e7eb;

        white-space:
          pre-wrap;

        overflow-wrap:
          anywhere;

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
            🛠 Safetii Universal Debugger
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

    document.body.appendChild(
      panel
    );

    state.panel =
      panel;

    state.reportArea =
      getById(
        "safetiiDebugReport"
      );

    getById(
      "safetiiDebugRun"
    )
      ?.addEventListener(
        "click",
        runAllChecks
      );

    getById(
      "safetiiDebugCopy"
    )
      ?.addEventListener(
        "click",
        async () => {
          try {
            await navigator
              .clipboard
              .writeText(
                state.report
              );

            const button =
              getById(
                "safetiiDebugCopy"
              );

            if (!button) {
              return;
            }

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
          } catch {
            window.prompt(
              "Copy this report:",
              state.report
            );
          }
        }
      );

    getById(
      "safetiiDebugMinimize"
    )
      ?.addEventListener(
        "click",
        () => {
          panel.classList.toggle(
            "minimized"
          );

          const button =
            getById(
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
      !state.reportArea
    ) {
      return;
    }

    const profile =
      getPageProfile();

    const lines = [
      "SAFETII NET DEBUG REPORT",

      `Page: ${window.location.href}`,

      `Title: ${
        document.title ||
        "(none)"
      }`,

      `Page type: ${profile.label}`,

      `Time: ${
        new Date()
          .toLocaleString()
      }`,

      "",

      `${state.problems.length} problem(s), ${state.warnings.length} warning(s)`,

      ""
    ];

    if (
      state.runtimeErrors.length
    ) {
      lines.push(
        "RUNTIME ERRORS"
      );

      state.runtimeErrors
        .forEach(
          (
            error,
            index
          ) => {
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
      state.problems.length
    ) {
      lines.push(
        "PROBLEMS"
      );

      state.problems
        .forEach(
          (
            problem,
            index
          ) => {
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
      state.warnings.length
    ) {
      lines.push(
        "WARNINGS"
      );

      state.warnings
        .forEach(
          (
            warning,
            index
          ) => {
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
      state.passed.length
    ) {
      lines.push(
        "PASSED CHECKS"
      );

      state.passed
        .forEach(
          (item) => {
            lines.push(
              `✓ ${item.message}${
                item.details
                  ? ` — ${item.details}`
                  : ""
              }`
            );
          }
        );

      lines.push("");
    }

    lines.push(
      "LOADED JAVASCRIPT"
    );

    getScriptUrls()
      .forEach(
        (source) => {
          lines.push(
            `• ${cleanUrl(
              source
            )}`
          );
        }
      );

    lines.push("");

    lines.push(
      "LOADED STYLESHEETS"
    );

    getStylesheetUrls()
      .forEach(
        (source) => {
          lines.push(
            `• ${cleanUrl(
              source
            )}`
          );
        }
      );

    const upcoming =
      new Set();

    document
      .querySelectorAll(
        ".coming-soon-card, .coming-badge, [data-status='coming-soon']"
      )
      .forEach(
        (element) => {
          const card =
            element.closest(
              "article, section, .card"
            ) ||
            element;

          const title =
            card.querySelector(
              "h1, h2, h3, h4, strong"
            )
              ?.textContent
              ?.trim();

          if (title) {
            upcoming.add(
              title
            );
          }
        }
      );

    lines.push("");

    lines.push(
      "UPCOMING CONTENT"
    );

    if (
      upcoming.size
    ) {
      [
        ...upcoming
      ].forEach(
        (title) => {
          lines.push(
            `• ${title}`
          );
        }
      );
    } else {
      lines.push(
        "• None detected on this page"
      );
    }

    if (
      state.clicks.length
    ) {
      lines.push("");

      lines.push(
        "RECENT CLICKS"
      );

      state.clicks
        .forEach(
          (click) => {
            lines.push(
              `• ${click.time} — ${click.name} — "${click.text}"${
                click.disabled
                  ? " — DISABLED"
                  : ""
              }`
            );
          }
        );
    }

    state.report =
      lines.join("\n");

    state.reportArea
      .textContent =
      state.report;

    const summary =
      getById(
        "safetiiDebugSummary"
      );

    if (summary) {
      summary.textContent =
        `${state.problems.length} problem(s), ${state.warnings.length} warning(s)`;
    }
  }

  /* =====================================================
     MASTER CHECK
  ===================================================== */

  async function runAllChecks() {
    state.problems = [];
    state.warnings = [];
    state.passed = [];

    const profile =
      getPageProfile();

    checkDocumentStructure();
    checkDuplicateIds();
    checkImagesAndLinks();
    checkUpcomingContent();
    checkArcadeSystem(
      profile
    );
    checkStartButton(
      profile
    );
    checkGameScreens(
      profile
    );
    checkArcadeCards(
      profile
    );
    checkHandleWithCare();

    renderReport();

    await checkLocalScriptSyntax();

    renderReport();

    return state.report;
  }

  window.SafetiiDebug.run =
    runAllChecks;

  window.SafetiiDebug.copyReport =
    async () => {
      await navigator
        .clipboard
        .writeText(
          state.report
        );
    };

  /* =====================================================
     INITIALIZE
  ===================================================== */

  function initialize() {
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
      initialize,
      {
        once: true
      }
    );
  } else {
    initialize();
  }
})();
