"use strict";

/* =========================================================
   SAFETII NET — GLOBAL PAGE DEBUGGER

   Turn on:
   Add ?debug=1 to any Safetii Net page.

   Example:
   login.html?debug=1

   Turn off:
   Add ?debug=0 to any page.

   Keyboard shortcut:
   Ctrl + Shift + D
========================================================= */

(() => {
  const DEBUG_STORAGE_KEY =
    "safetiiDebugMode";

  const issues = [];
  const issueKeys = new Set();

  let debugPanel = null;
  let debugEnabled = false;

  const pageRules = {
    "login.html": {
      requiredIds: [
        "colorChoices",
        "animalChoices",
        "powerChoices",
        "heroName",
        "chosenColor",
        "chosenAnimal",
        "chosenPower",
        "generateHero",
        "saveHero"
      ],

      requiredScripts: [
        "safetii-storage.js",
        "login.js"
      ],

      forbiddenScripts: [
        "script.js"
      ]
    },

    "dashboard.html": {
      requiredIds: [
        "dashboardHeroName",
        "dashboardColor",
        "dashboardAnimal",
        "dashboardPower",
        "identityMissionButton"
      ],

      recommendedScripts: [
        "safetii-storage.js",
        "dashboard.js"
      ]
    },

    "notebook.html": {
      requiredIds: [
        "notebookHeroName",
        "notebookPoints",
        "identityMissionStatus",
        "identityNotebookBadge",
        "identityBadgeText",
        "identityStickerBook",
        "identityMissionAction",
        "replayIdentityFromNotebook"
      ],

      recommendedScripts: [
        "safetii-storage.js",
        "notebook.js"
      ]
    },

    "identity.html": {
      requiredIds: [
        "missionAlert",
        "acceptMission",
        "exploreZone",
        "objectsFound",
        "lessonPopup",
        "goUsernameLab",
        "usernameZone",
        "generateUsername",
        "approveUsername",
        "goBackpackRescue",
        "practiceZone",
        "dragItemCard",
        "identityCardZone",
        "identityFlipCard",
        "identityCardInner",
        "checkRepairedUsername",
        "goFinalTest",
        "testIntroZone",
        "beginFinalTest",
        "testZone",
        "nextTest",
        "missionResult",
        "retryMission"
      ],

      requiredScripts: [
        "identity-data.js",
        "identity-core.js",
        "identity-activities.js",
        "identity-repair.js",
        "identity-test.js",
        "identity-progress.js",
        "identity.js"
      ],

      requiredGameFunctions: [
        "acceptMission",
        "openLesson",
        "closeLessonPopup",
        "collectSticker",
        "openUsernameLab",
        "generateUsername",
        "finishUsernameScan",
        "startBackpackRescue",
        "answerPractice",
        "loadIdentityProfile",
        "checkRepairedUsername",
        "startFinalTest",
        "beginFinalTest",
        "answerTest",
        "nextTestQuestion"
      ]
    }
  };

  /* =====================================================
     DEBUG MODE
  ===================================================== */

  function configureDebugMode() {
    const parameters =
      new URLSearchParams(
        window.location.search
      );

    const requestedMode =
      parameters.get("debug");

    if (requestedMode === "1") {
      localStorage.setItem(
        DEBUG_STORAGE_KEY,
        "true"
      );
    }

    if (requestedMode === "0") {
      localStorage.removeItem(
        DEBUG_STORAGE_KEY
      );
    }

    debugEnabled =
      localStorage.getItem(
        DEBUG_STORAGE_KEY
      ) === "true";
  }

  configureDebugMode();

  document.addEventListener(
    "keydown",
    (event) => {
      const pressedShortcut =
        event.ctrlKey &&
        event.shiftKey &&
        event.key.toLowerCase() === "d";

      if (!pressedShortcut) {
        return;
      }

      event.preventDefault();

      const currentlyEnabled =
        localStorage.getItem(
          DEBUG_STORAGE_KEY
        ) === "true";

      if (currentlyEnabled) {
        localStorage.removeItem(
          DEBUG_STORAGE_KEY
        );
      } else {
        localStorage.setItem(
          DEBUG_STORAGE_KEY,
          "true"
        );
      }

      window.location.reload();
    }
  );

  /* =====================================================
     REPORT HELPERS
  ===================================================== */

  function addIssue(
    level,
    title,
    detail = ""
  ) {
    const issueKey =
      `${level}|${title}|${detail}`;

    if (issueKeys.has(issueKey)) {
      return;
    }

    issueKeys.add(issueKey);

    issues.push({
      level,
      title,
      detail
    });

    renderPanel();
  }

  function addError(
    title,
    detail = ""
  ) {
    addIssue(
      "error",
      title,
      detail
    );
  }

  function addWarning(
    title,
    detail = ""
  ) {
    addIssue(
      "warning",
      title,
      detail
    );
  }

  function getFileName(path) {
    if (!path) {
      return "";
    }

    try {
      const url =
        new URL(
          path,
          window.location.href
        );

      return (
        url.pathname
          .split("/")
          .pop() || ""
      );
    } catch (error) {
      return String(path)
        .split("/")
        .pop();
    }
  }

  function getCurrentPageName() {
    const pageName =
      window.location.pathname
        .split("/")
        .pop();

    return pageName ||
      "index.html";
  }

  /* =====================================================
     CATCH JAVASCRIPT AND RESOURCE ERRORS EARLY
  ===================================================== */

  window.addEventListener(
    "error",
    (event) => {
      const target =
        event.target;

      if (
        target &&
        target !== window
      ) {
        const tagName =
          target.tagName ||
          "RESOURCE";

        const source =
          target.src ||
          target.href ||
          "(unknown source)";

        addError(
          `${tagName} failed to load`,
          source
        );

        return;
      }

      const location =
        event.filename
          ? `${event.filename}:${event.lineno || "?"}`
          : "Unknown script";

      addError(
        event.message ||
          "JavaScript error",

        location
      );
    },
    true
  );

  window.addEventListener(
    "unhandledrejection",
    (event) => {
      const reason =
        event.reason;

      addError(
        "Unhandled promise error",

        reason?.message ||
          String(reason || "Unknown rejection")
      );
    }
  );

  /* =====================================================
     DOM CHECKS
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

    counts.forEach(
      (count, id) => {
        if (count > 1) {
          addError(
            `Duplicate HTML ID: #${id}`,

            `${count} elements use this ID. Every ID must be unique.`
          );
        }
      }
    );
  }

  function checkEmptyAttributes() {
    document
      .querySelectorAll(
        "img, script, link, a"
      )
      .forEach((element) => {
        const attributeName =
          element.tagName === "A"
            ? "href"
            : element.tagName === "LINK"
              ? "href"
              : "src";

        if (
          !element.hasAttribute(
            attributeName
          )
        ) {
          return;
        }

        const value =
          element
            .getAttribute(
              attributeName
            )
            ?.trim();

        if (!value) {
          addWarning(
            `${element.tagName} has an empty ${attributeName}`,

            element.outerHTML.slice(
              0,
              180
            )
          );
        }

        if (
          element.tagName === "A" &&
          value === "#"
        ) {
          addWarning(
            "Link points only to #",

            element.textContent.trim() ||
              element.outerHTML.slice(
                0,
                120
              )
          );
        }
      });
  }

  function checkImages() {
    document
      .querySelectorAll("img")
      .forEach((image) => {
        if (
          image.complete &&
          image.naturalWidth === 0
        ) {
          addError(
            "Broken image",

            image.currentSrc ||
              image.src ||
              image.getAttribute("src") ||
              "Unknown image"
          );
        }

        if (
          !image.hasAttribute("alt")
        ) {
          addWarning(
            "Image is missing alt text",

            image.src ||
              image.outerHTML.slice(
                0,
                140
              )
          );
        }
      });
  }

  function checkScripts() {
    const scriptFiles =
      Array.from(
        document.scripts
      )
        .map((script) =>
          getFileName(script.src)
        )
        .filter(Boolean);

    const counts =
      new Map();

    scriptFiles.forEach((file) => {
      counts.set(
        file,
        (counts.get(file) || 0) + 1
      );
    });

    counts.forEach(
      (count, file) => {
        if (count > 1) {
          addWarning(
            `Script loaded more than once: ${file}`,

            `${count} copies were found.`
          );
        }
      }
    );

    return scriptFiles;
  }

  function checkRenderedJson() {
    document
      .querySelectorAll(
        "h1, h2, h3, p, strong"
      )
      .forEach((element) => {
        const text =
          element.textContent.trim();

        const looksLikeJson =
          text.startsWith("{") &&
          text.includes('"name"');

        if (looksLikeJson) {
          addError(
            "Saved hero object is being displayed as text",

            `Parse safetiiHero with JSON.parse() and display hero.name instead. Found in <${element.tagName.toLowerCase()}>.`
          );
        }
      });
  }

  function checkDocumentBasics() {
    if (!document.title.trim()) {
      addWarning(
        "Page title is empty"
      );
    }

    if (!document.body) {
      addError(
        "Document body is missing"
      );

      return;
    }

    if (
      document.body.children.length === 0
    ) {
      addError(
        "Page body is empty"
      );
    }

    const stylesheets =
      document.querySelectorAll(
        'link[rel="stylesheet"]'
      );

    if (
      stylesheets.length === 0
    ) {
      addWarning(
        "No external stylesheet was found"
      );
    }
  }

  /* =====================================================
     PAGE-SPECIFIC CHECKS
  ===================================================== */

  function checkRequiredIds(
    requiredIds
  ) {
    requiredIds.forEach((id) => {
      if (
        !document.getElementById(id)
      ) {
        addError(
          `Required element is missing: #${id}`
        );
      }
    });
  }

  function checkRequiredScripts(
    requiredScripts,
    loadedScripts
  ) {
    requiredScripts.forEach(
      (requiredFile) => {
        if (
          !loadedScripts.includes(
            requiredFile
          )
        ) {
          addError(
            `Required script is missing: ${requiredFile}`
          );
        }
      }
    );
  }

  function checkRecommendedScripts(
    recommendedScripts,
    loadedScripts
  ) {
    recommendedScripts.forEach(
      (recommendedFile) => {
        if (
          !loadedScripts.includes(
            recommendedFile
          )
        ) {
          addWarning(
            `Recommended script is not loaded: ${recommendedFile}`
          );
        }
      }
    );
  }

  function checkForbiddenScripts(
    forbiddenScripts,
    loadedScripts
  ) {
    forbiddenScripts.forEach(
      (forbiddenFile) => {
        if (
          loadedScripts.includes(
            forbiddenFile
          )
        ) {
          addError(
            `Conflicting script is still loaded: ${forbiddenFile}`,

            "This page should use its dedicated controller instead."
          );
        }
      }
    );
  }

  function checkIdentityGameFunctions(
    functionNames
  ) {
    const game =
      window.IdentityGame;

    if (!game) {
      addError(
        "window.IdentityGame is missing",

        "One of the Identity Island scripts failed before creating the game namespace."
      );

      return;
    }

    functionNames.forEach(
      (functionName) => {
        if (
          typeof game[
            functionName
          ] !== "function"
        ) {
          addError(
            `Identity function is missing: game.${functionName}()`
          );
        }
      }
    );
  }

  function checkPageRules() {
    const pageName =
      getCurrentPageName();

    const rules =
      pageRules[pageName];

    if (!rules) {
      return;
    }

    const loadedScripts =
      checkScripts();

    if (rules.requiredIds) {
      checkRequiredIds(
        rules.requiredIds
      );
    }

    if (rules.requiredScripts) {
      checkRequiredScripts(
        rules.requiredScripts,
        loadedScripts
      );
    }

    if (rules.recommendedScripts) {
      checkRecommendedScripts(
        rules.recommendedScripts,
        loadedScripts
      );
    }

    if (rules.forbiddenScripts) {
      checkForbiddenScripts(
        rules.forbiddenScripts,
        loadedScripts
      );
    }

    if (
      rules.requiredGameFunctions
    ) {
      checkIdentityGameFunctions(
        rules.requiredGameFunctions
      );
    }
  }

  /* =====================================================
     STORAGE CHECKS
  ===================================================== */

  function safelyParseStorage(
    key
  ) {
    const rawValue =
      localStorage.getItem(key);

    if (rawValue === null) {
      return null;
    }

    try {
      return JSON.parse(rawValue);
    } catch (error) {
      addError(
        `Saved data is invalid: ${key}`,

        error.message
      );

      return null;
    }
  }

  function checkHeroStorage() {
    const legacyHero =
      localStorage.getItem(
        "safetiiHero"
      );

    if (legacyHero !== null) {
      const parsedHero =
        safelyParseStorage(
          "safetiiHero"
        );

      if (
        parsedHero &&
        typeof parsedHero !== "object"
      ) {
        addWarning(
          "safetiiHero is not stored as an object"
        );
      }

      if (
        parsedHero &&
        !parsedHero.name
      ) {
        addWarning(
          "Saved hero has no name"
        );
      }
    }

    const multiHeroStore =
      localStorage.getItem(
        "safetiiHeroesV1"
      );

    if (multiHeroStore === null) {
      return;
    }

    const store =
      safelyParseStorage(
        "safetiiHeroesV1"
      );

    if (
      !store ||
      typeof store !== "object"
    ) {
      return;
    }

    if (!Array.isArray(store.heroes)) {
      addError(
        "Multi-hero save has no heroes array"
      );

      return;
    }

    if (
      store.activeHeroId &&
      !store.heroes.some(
        (hero) =>
          hero.id ===
          store.activeHeroId
      )
    ) {
      addError(
        "Active hero ID does not match a saved hero",

        store.activeHeroId
      );
    }

    const duplicateHeroIds =
      store.heroes
        .map((hero) => hero.id)
        .filter(
          (id, index, allIds) =>
            id &&
            allIds.indexOf(id) !==
              index
        );

    if (
      duplicateHeroIds.length > 0
    ) {
      addError(
        "Two saved heroes share the same ID",

        duplicateHeroIds.join(", ")
      );
    }
  }

  function checkIdentityStorage() {
    const progress =
      safelyParseStorage(
        "safetiiIdentityProgress"
      );

    const stickerArray =
      safelyParseStorage(
        "identityStickers"
      );

    if (
      progress?.foundStickers &&
      Array.isArray(stickerArray)
    ) {
      const progressCount =
        progress.foundStickers.length;

      const stickerCount =
        stickerArray.length;

      if (
        progressCount !==
        stickerCount
      ) {
        addWarning(
          "Identity sticker saves do not match",

          `Progress has ${progressCount}; identityStickers has ${stickerCount}.`
        );
      }
    }
  }

  function checkStorage() {
    checkHeroStorage();
    checkIdentityStorage();
  }

  /* =====================================================
     PANEL
  ===================================================== */

  function createPanel() {
    if (
      debugPanel ||
      !debugEnabled
    ) {
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

        width: min(420px, calc(100vw - 32px));
        max-height: 72vh;

        display: flex;
        flex-direction: column;

        background: #15213a;
        color: #ffffff;

        border: 4px solid #ffe76b;
        border-radius: 22px;

        box-shadow:
          0 18px 55px
          rgba(0, 0, 0, 0.45);

        font-family:
          Arial,
          Helvetica,
          sans-serif;
      }

      #safetiiDebugPanel * {
        box-sizing: border-box;
      }

      .safetii-debug-header {
        padding: 14px 16px;

        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;

        background: #23324d;
        border-radius: 17px 17px 0 0;
      }

      .safetii-debug-title {
        margin: 0;
        color: #ffe76b;
        font-size: 1rem;
      }

      .safetii-debug-summary {
        margin: 4px 0 0;
        font-size: 0.78rem;
      }

      .safetii-debug-close {
        padding: 7px 10px;

        background: #ffffff;
        color: #23324d;

        border: 0;
        border-radius: 10px;

        font-weight: 900;
        cursor: pointer;
      }

      .safetii-debug-list {
        margin: 0;
        padding: 12px;

        display: grid;
        gap: 10px;

        overflow-y: auto;
        list-style: none;
      }

      .safetii-debug-item {
        padding: 11px;

        border-radius: 13px;

        font-size: 0.82rem;
        line-height: 1.4;
      }

      .safetii-debug-error {
        background: #541f32;
        border: 2px solid #ff6b8f;
      }

      .safetii-debug-warning {
        background: #51421d;
        border: 2px solid #ffe76b;
      }

      .safetii-debug-good {
        background: #174c3a;
        border: 2px solid #53e0a5;
      }

      .safetii-debug-item strong {
        display: block;
        margin-bottom: 3px;
      }

      .safetii-debug-detail {
        color: #e4ebf7;
        overflow-wrap: anywhere;
      }

      .safetii-debug-actions {
        padding: 12px;

        display: flex;
        flex-wrap: wrap;
        gap: 8px;

        border-top: 1px solid
          rgba(255, 255, 255, 0.16);
      }

      .safetii-debug-actions button {
        padding: 9px 12px;

        background: #ffffff;
        color: #23324d;

        border: 0;
        border-radius: 10px;

        font-weight: 900;
        cursor: pointer;
      }

      .safetii-debug-actions button:hover {
        background: #15d3dc;
      }
    `;

    document.head.appendChild(
      style
    );

    debugPanel =
      document.createElement(
        "aside"
      );

    debugPanel.id =
      "safetiiDebugPanel";

    debugPanel.setAttribute(
      "aria-label",
      "Safetii Net debugger"
    );

    document.body.appendChild(
      debugPanel
    );
  }

  function createReportText() {
    const pageName =
      getCurrentPageName();

    const lines = [
      "SAFETII NET DEBUG REPORT",
      `Page: ${pageName}`,
      `URL: ${window.location.href}`,
      `Generated: ${new Date().toLocaleString()}`,
      ""
    ];

    if (issues.length === 0) {
      lines.push(
        "No problems were detected."
      );

      return lines.join("\n");
    }

    issues.forEach(
      (issue, index) => {
        lines.push(
          `${index + 1}. [${issue.level.toUpperCase()}] ${issue.title}`
        );

        if (issue.detail) {
          lines.push(
            `   ${issue.detail}`
          );
        }
      }
    );

    return lines.join("\n");
  }

  async function copyReport() {
    const report =
      createReportText();

    try {
      await navigator.clipboard.writeText(
        report
      );

      window.alert(
        "Debug report copied."
      );
    } catch (error) {
      console.log(report);

      window.alert(
        "The browser could not copy automatically. The report was printed in the console."
      );
    }
  }

  function renderPanel() {
    if (
      !debugPanel ||
      !debugEnabled
    ) {
      return;
    }

    const errorCount =
      issues.filter(
        (issue) =>
          issue.level === "error"
      ).length;

    const warningCount =
      issues.filter(
        (issue) =>
          issue.level === "warning"
      ).length;

    const issueMarkup =
      issues.length === 0
        ? `
          <li class="
            safetii-debug-item
            safetii-debug-good
          ">
            <strong>
              ✅ No problems detected
            </strong>

            This page passed the current checks.
          </li>
        `
        : issues
            .map((issue) => {
              const icon =
                issue.level === "error"
                  ? "❌"
                  : "⚠️";

              const cssClass =
                issue.level === "error"
                  ? "safetii-debug-error"
                  : "safetii-debug-warning";

              return `
                <li class="
                  safetii-debug-item
                  ${cssClass}
                ">
                  <strong>
                    ${icon}
                    ${escapeHtml(
                      issue.title
                    )}
                  </strong>

                  ${
                    issue.detail
                      ? `
                        <div class="
                          safetii-debug-detail
                        ">
                          ${escapeHtml(
                            issue.detail
                          )}
                        </div>
                      `
                      : ""
                  }
                </li>
              `;
            })
            .join("");

    debugPanel.innerHTML = `
      <div class="safetii-debug-header">
        <div>
          <h2 class="safetii-debug-title">
            🐞 Safetii Debug:
            ${escapeHtml(
              getCurrentPageName()
            )}
          </h2>

          <p class="safetii-debug-summary">
            ${errorCount} error(s) ·
            ${warningCount} warning(s)
          </p>
        </div>

        <button
          class="safetii-debug-close"
          id="closeSafetiiDebug"
          type="button"
          aria-label="Hide debugger"
        >
          ×
        </button>
      </div>

      <ul class="safetii-debug-list">
        ${issueMarkup}
      </ul>

      <div class="safetii-debug-actions">
        <button
          id="rerunSafetiiDebug"
          type="button"
        >
          Re-run Checks
        </button>

        <button
          id="copySafetiiDebug"
          type="button"
        >
          Copy Report
        </button>

        <button
          id="disableSafetiiDebug"
          type="button"
        >
          Turn Off
        </button>
      </div>
    `;

    document
      .getElementById(
        "closeSafetiiDebug"
      )
      ?.addEventListener(
        "click",
        () => {
          debugPanel.style.display =
            "none";
        }
      );

    document
      .getElementById(
        "rerunSafetiiDebug"
      )
      ?.addEventListener(
        "click",
        () => {
          window.location.reload();
        }
      );

    document
      .getElementById(
        "copySafetiiDebug"
      )
      ?.addEventListener(
        "click",
        copyReport
      );

    document
      .getElementById(
        "disableSafetiiDebug"
      )
      ?.addEventListener(
        "click",
        () => {
          localStorage.removeItem(
            DEBUG_STORAGE_KEY
          );

          window.location.reload();
        }
      );
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  /* =====================================================
     RUN ALL CHECKS
  ===================================================== */

  function runChecks() {
    checkDocumentBasics();
    checkDuplicateIds();
    checkEmptyAttributes();
    checkImages();
    checkScripts();
    checkRenderedJson();
    checkStorage();
    checkPageRules();

    renderPanel();

    console.group(
      `🐞 Safetii Debug: ${getCurrentPageName()}`
    );

    if (issues.length === 0) {
      console.log(
        "✅ No problems detected."
      );
    } else {
      issues.forEach((issue) => {
        const method =
          issue.level === "error"
            ? "error"
            : "warn";

        console[method](
          issue.title,
          issue.detail
        );
      });
    }

    console.groupEnd();
  }

  function initializeDebugger() {
    if (!debugEnabled) {
      return;
    }

    createPanel();

    /*
      Give other DOMContentLoaded scripts a moment
      to create their buttons and page content.
    */
    window.setTimeout(
      runChecks,
      250
    );
  }

  if (
    document.readyState === "loading"
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
