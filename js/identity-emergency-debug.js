"use strict";

/* =========================================================
   SAFETII NET — IDENTITY ISLAND EMERGENCY DEBUGGER

   Temporary diagnostic tool.
   Load this LAST, after every Identity Island script.
========================================================= */

(() => {
  const problems = [];
  const recordedProblems = new Set();

  let panel = null;

  function addProblem(
    type,
    title,
    details = ""
  ) {
    const key =
      `${type}|${title}|${details}`;

    if (recordedProblems.has(key)) {
      return;
    }

    recordedProblems.add(key);

    problems.push({
      type,
      title,
      details
    });

    console[
      type === "error"
        ? "error"
        : "warn"
    ](
      `[Identity Debug] ${title}`,
      details
    );

    renderPanel();
  }

  function addError(
    title,
    details = ""
  ) {
    addProblem(
      "error",
      title,
      details
    );
  }

  function addWarning(
    title,
    details = ""
  ) {
    addProblem(
      "warning",
      title,
      details
    );
  }

  /* =====================================================
     CATCH JAVASCRIPT ERRORS
  ===================================================== */

  window.addEventListener(
    "error",
    (event) => {
      const target =
        event.target;

      /*
        Resource-loading error:
        script, image, stylesheet, etc.
      */
      if (
        target &&
        target !== window
      ) {
        const source =
          target.src ||
          target.href ||
          target.outerHTML ||
          "Unknown resource";

        addError(
          `${target.tagName || "Resource"} failed to load`,
          source
        );

        return;
      }

      const location =
        event.filename
          ? `${event.filename}:${event.lineno || "?"}:${event.colno || "?"}`
          : "Unknown location";

      addError(
        event.message ||
          "Unknown JavaScript error",
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
        "Unhandled promise rejection",
        reason?.stack ||
          reason?.message ||
          String(reason || "Unknown reason")
      );
    }
  );

  /* =====================================================
     REQUIRED PAGE ELEMENTS
  ===================================================== */

  const requiredIds = [
    "acceptMission",
    "exploreZone",
    "objectsFound",
    "lessonPopup",
    "closeLesson",
    "goUsernameLab",

    "piecesOfMeZone",
    "piecesOfMePrompt",
    "nextPiecesOfMe",

    "trustCircleZone",
    "trustPersonName",
    "nextTrustPerson",

    "clueCollectorZone",
    "clueGrid",
    "checkClues",
    "nextClueProfile",

    "impostorZone",
    "responseStepBank",
    "responseOrderList",
    "checkResponseOrder",
    "finishFoundationAcademy",

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
  ];

  const requiredFunctions = [
    "showSection",
    "setMemeTip",
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
    "clearRepairBuilder",
    "checkRepairedUsername",
    "startFinalTest",
    "beginFinalTest",
    "answerTest",
    "nextTestQuestion",

    "loadPiecesOfMe",
    "loadTrustCircle",
    "loadClueProfile",
    "loadImpostorGame"
  ];

  const expectedScripts = [
    "identity-data.js",
    "identity-core.js",
    "identity-activities.js",
    "identity-foundations.js",
    "identity-repair.js",
    "identity-test.js",
    "identity-progress.js",
    "identity.js",
    "identity-emergency-debug.js"
  ];

  function getScriptFileName(src) {
    if (!src) {
      return "";
    }

    try {
      const url =
        new URL(
          src,
          window.location.href
        );

      return (
        url.pathname
          .split("/")
          .pop() || ""
      );
    } catch (error) {
      return String(src)
        .split("/")
        .pop();
    }
  }

  function checkScripts() {
    const loadedScripts =
      Array.from(
        document.scripts
      )
        .map((script) =>
          getScriptFileName(
            script.src
          )
        )
        .filter(Boolean);

    expectedScripts.forEach(
      (fileName) => {
        if (
          !loadedScripts.includes(
            fileName
          )
        ) {
          addError(
            `Missing script: ${fileName}`,
            "The script tag is missing or its filename/path is different."
          );
        }
      }
    );

    const scriptCounts =
      new Map();

    loadedScripts.forEach(
      (fileName) => {
        scriptCounts.set(
          fileName,
          (
            scriptCounts.get(
              fileName
            ) || 0
          ) + 1
        );
      }
    );

    scriptCounts.forEach(
      (count, fileName) => {
        if (count > 1) {
          addWarning(
            `Script loaded ${count} times: ${fileName}`,
            "Duplicate script tags can install duplicate click handlers."
          );
        }
      }
    );

    console.table(
      loadedScripts.map(
        (fileName, index) => ({
          order: index + 1,
          script: fileName
        })
      )
    );
  }

  function checkRequiredElements() {
    requiredIds.forEach((id) => {
      if (
        !document.getElementById(id)
      ) {
        addError(
          `Missing HTML element: #${id}`,
          "The JavaScript may be trying to control an element that does not exist."
        );
      }
    });
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

        idCounts.set(
          id,
          (
            idCounts.get(id) ||
            0
          ) + 1
        );
      });

    idCounts.forEach(
      (count, id) => {
        if (count > 1) {
          addError(
            `Duplicate ID: #${id}`,
            `${count} elements use the same ID. JavaScript may update or click the wrong one.`
          );
        }
      }
    );
  }

  function checkGameNamespace() {
    const game =
      window.IdentityGame;

    if (!game) {
      addError(
        "window.IdentityGame does not exist",
        "identity-core.js may not have loaded, or a script before it stopped execution."
      );

      return;
    }

    if (!game.state) {
      addError(
        "IdentityGame.state is missing",
        "The core state was not created correctly."
      );
    }

    if (!game.data) {
      addWarning(
        "IdentityGame.data is missing",
        "identity-data.js may not have loaded correctly."
      );
    }

    requiredFunctions.forEach(
      (functionName) => {
        if (
          typeof game[
            functionName
          ] !== "function"
        ) {
          addError(
            `Missing function: IdentityGame.${functionName}()`,
            "Check the script responsible for this function."
          );
        }
      }
    );

    if (
      game.identityFoundationsReady !==
      true
    ) {
      addError(
        "Identity Foundations did not finish loading",
        "identity-foundations.js may contain a syntax or initialization error."
      );
    }

    if (
      game.controllerReady !==
      true
    ) {
      addError(
        "Identity controller did not finish loading",
        "identity.js may have stopped before initialization completed."
      );
    }
  }

  function checkButtons() {
    document
      .querySelectorAll(
        ".identity-game button"
      )
      .forEach((button) => {
        if (!button.id) {
          return;
        }

        if (
          button.disabled &&
          !button.classList.contains(
            "locked-action"
          ) &&
          ![
            "goUsernameLab",
            "goBackpackRescue",
            "checkRepairedUsername",
            "goFinalTest",
            "checkResponseOrder"
          ].includes(button.id)
        ) {
          addWarning(
            `Button is disabled: #${button.id}`,
            button.textContent
              .trim()
              .replace(/\s+/g, " ")
          );
        }
      });
  }

  function checkVisibleSections() {
    const sectionIds = [
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
      "testZone",
      "missionResult"
    ];

    const visibleSections =
      sectionIds.filter((id) => {
        const element =
          document.getElementById(id);

        return (
          element &&
          !element.classList.contains(
            "hidden"
          )
        );
      });

    if (
      visibleSections.length === 0
    ) {
      addError(
        "No mission section is visible",
        "The page may have hidden every mission section without opening another one."
      );
    }

    if (
      visibleSections.length > 1
    ) {
      addError(
        "Multiple mission sections are visible",
        visibleSections.join(", ")
      );
    }

    console.log(
      "[Identity Debug] Visible sections:",
      visibleSections
    );
  }

  function checkStoredData() {
    const jsonKeys = [
      "safetiiIdentityProgress",
      "safetiiIdentityFoundationsV1",
      "safetiiHero"
    ];

    jsonKeys.forEach((key) => {
      const value =
        localStorage.getItem(key);

      if (value === null) {
        return;
      }

      try {
        JSON.parse(value);
      } catch (error) {
        addError(
          `Invalid saved JSON: ${key}`,
          error.message
        );
      }
    });
  }

  /* =====================================================
     CLICK TRACER
  ===================================================== */

  document.addEventListener(
    "click",
    (event) => {
      const clicked =
        event.target instanceof Element
          ? event.target.closest(
              "button, a"
            )
          : null;

      if (!clicked) {
        return;
      }

      const description =
        clicked.id
          ? `#${clicked.id}`
          : clicked.className ||
            clicked.tagName;

      console.group(
        `🖱️ Identity click: ${description}`
      );

      console.log(
        "Element:",
        clicked
      );

      console.log(
        "Text:",
        clicked.textContent
          .trim()
          .replace(/\s+/g, " ")
      );

      console.log(
        "Disabled:",
        Boolean(clicked.disabled)
      );

      console.log(
        "Classes:",
        clicked.className
      );

      console.log(
        "Dataset:",
        {
          ...clicked.dataset
        }
      );

      console.log(
        "Default prevented:",
        event.defaultPrevented
      );

      console.log(
        "IdentityGame exists:",
        Boolean(
          window.IdentityGame
        )
      );

      console.log(
        "Controller ready:",
        window.IdentityGame
          ?.controllerReady
      );

      console.log(
        "Foundations ready:",
        window.IdentityGame
          ?.identityFoundationsReady
      );

      console.groupEnd();

      updateLastClick(
        clicked
      );
    },
    true
  );

  /* =====================================================
     DEBUG PANEL
  ===================================================== */

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function createPanel() {
    if (panel) {
      return;
    }

    const style =
      document.createElement(
        "style"
      );

    style.textContent = `
      #identityEmergencyDebug {
        position: fixed;
        right: 14px;
        bottom: 14px;
        z-index: 2147483647;

        width: min(460px, calc(100vw - 28px));
        max-height: 74vh;

        display: flex;
        flex-direction: column;

        background: #17233d;
        color: #ffffff;

        border: 4px solid #ffe76b;
        border-radius: 20px;

        box-shadow:
          0 18px 50px
          rgba(0, 0, 0, 0.48);

        font-family:
          Arial,
          Helvetica,
          sans-serif;
      }

      #identityEmergencyDebug * {
        box-sizing: border-box;
      }

      .identity-debug-header {
        padding: 13px 15px;

        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;

        background: #263656;
        border-radius: 15px 15px 0 0;
      }

      .identity-debug-header h2 {
        margin: 0;

        color: #ffe76b;
        font-size: 1rem;
      }

      .identity-debug-header p {
        margin: 4px 0 0;

        font-size: 0.76rem;
        line-height: 1.35;
      }

      .identity-debug-close {
        padding: 5px 9px;

        background: #ffffff;
        color: #17233d;

        border: 0;
        border-radius: 8px;

        font-weight: 900;
        cursor: pointer;
      }

      .identity-debug-last-click {
        padding: 10px 14px;

        background: #eef8ff;
        color: #17233d;

        border-bottom: 2px solid #b5d8f4;

        font-size: 0.78rem;
        line-height: 1.4;
      }

      .identity-debug-list {
        margin: 0;
        padding: 12px;

        display: grid;
        gap: 9px;

        overflow-y: auto;
        list-style: none;
      }

      .identity-debug-item {
        padding: 10px;

        border-radius: 12px;

        font-size: 0.79rem;
        line-height: 1.4;
      }

      .identity-debug-error {
        background: #5c2036;
        border: 2px solid #ff6f9b;
      }

      .identity-debug-warning {
        background: #51421d;
        border: 2px solid #ffe76b;
      }

      .identity-debug-good {
        background: #164b39;
        border: 2px solid #4fdb9e;
      }

      .identity-debug-item strong {
        display: block;
        margin-bottom: 3px;
      }

      .identity-debug-detail {
        color: #e6edf7;
        overflow-wrap: anywhere;
      }

      .identity-debug-actions {
        padding: 11px;

        display: flex;
        flex-wrap: wrap;
        gap: 8px;

        border-top:
          1px solid
          rgba(255, 255, 255, 0.16);
      }

      .identity-debug-actions button {
        padding: 8px 11px;

        background: #ffffff;
        color: #17233d;

        border: 0;
        border-radius: 9px;

        font-weight: 900;
        cursor: pointer;
      }

      .identity-debug-actions button:hover {
        background: #18cbd6;
      }
    `;

    document.head.appendChild(
      style
    );

    panel =
      document.createElement(
        "aside"
      );

    panel.id =
      "identityEmergencyDebug";

    document.body.appendChild(
      panel
    );

    renderPanel();
  }

  function updateLastClick(
    element
  ) {
    const clickBox =
      document.getElementById(
        "identityDebugLastClick"
      );

    if (!clickBox) {
      return;
    }

    const name =
      element.id
        ? `#${element.id}`
        : element.tagName;

    clickBox.innerHTML = `
      <strong>Last click:</strong>
      ${escapeHtml(name)}
      <br>
      Disabled:
      ${Boolean(element.disabled)}
      · Foundations:
      ${String(
        window.IdentityGame
          ?.identityFoundationsReady
      )}
      · Controller:
      ${String(
        window.IdentityGame
          ?.controllerReady
      )}
    `;
  }

  function createReport() {
    const lines = [
      "SAFETII NET IDENTITY DEBUG REPORT",
      `Page: ${window.location.href}`,
      `Created: ${new Date().toLocaleString()}`,
      ""
    ];

    if (
      problems.length === 0
    ) {
      lines.push(
        "No problems were detected by the automatic checks."
      );
    } else {
      problems.forEach(
        (problem, index) => {
          lines.push(
            `${index + 1}. [${problem.type.toUpperCase()}] ${problem.title}`
          );

          if (problem.details) {
            lines.push(
              `   ${problem.details}`
            );
          }
        }
      );
    }

    lines.push("");
    lines.push(
      `IdentityGame exists: ${Boolean(window.IdentityGame)}`
    );
    lines.push(
      `Controller ready: ${String(window.IdentityGame?.controllerReady)}`
    );
    lines.push(
      `Foundations ready: ${String(window.IdentityGame?.identityFoundationsReady)}`
    );

    return lines.join("\n");
  }

  async function copyReport() {
    const report =
      createReport();

    try {
      await navigator.clipboard.writeText(
        report
      );

      window.alert(
        "Identity debug report copied."
      );
    } catch (error) {
      console.log(report);

      window.alert(
        "Copy failed. The report was printed in the browser console."
      );
    }
  }

  function renderPanel() {
    if (!panel) {
      return;
    }

    const errorCount =
      problems.filter(
        (problem) =>
          problem.type ===
          "error"
      ).length;

    const warningCount =
      problems.filter(
        (problem) =>
          problem.type ===
          "warning"
      ).length;

    const problemMarkup =
      problems.length === 0
        ? `
          <li class="
            identity-debug-item
            identity-debug-good
          ">
            <strong>
              ✅ No automatic errors detected
            </strong>

            Click a broken button and watch the
            “Last click” box.
          </li>
        `
        : problems
            .map((problem) => {
              const error =
                problem.type ===
                "error";

              return `
                <li class="
                  identity-debug-item
                  ${
                    error
                      ? "identity-debug-error"
                      : "identity-debug-warning"
                  }
                ">
                  <strong>
                    ${
                      error
                        ? "❌"
                        : "⚠️"
                    }
                    ${escapeHtml(
                      problem.title
                    )}
                  </strong>

                  ${
                    problem.details
                      ? `
                        <div class="
                          identity-debug-detail
                        ">
                          ${escapeHtml(
                            problem.details
                          )}
                        </div>
                      `
                      : ""
                  }
                </li>
              `;
            })
            .join("");

    panel.innerHTML = `
      <div class="identity-debug-header">
        <div>
          <h2>
            🐞 Identity Emergency Debug
          </h2>

          <p>
            ${errorCount} error(s) ·
            ${warningCount} warning(s)
          </p>
        </div>

        <button
          class="identity-debug-close"
          id="closeIdentityDebug"
          type="button"
        >
          ×
        </button>
      </div>

      <div
        class="identity-debug-last-click"
        id="identityDebugLastClick"
      >
        <strong>Last click:</strong>
        Nothing clicked yet.
      </div>

      <ul class="identity-debug-list">
        ${problemMarkup}
      </ul>

      <div class="identity-debug-actions">
        <button
          id="rerunIdentityDebug"
          type="button"
        >
          Re-run Checks
        </button>

        <button
          id="copyIdentityDebug"
          type="button"
        >
          Copy Report
        </button>

        <button
          id="clearIdentitySaves"
          type="button"
        >
          Clear Mission Save
        </button>
      </div>
    `;

    document
      .getElementById(
        "closeIdentityDebug"
      )
      ?.addEventListener(
        "click",
        () => {
          panel.style.display =
            "none";
        }
      );

    document
      .getElementById(
        "rerunIdentityDebug"
      )
      ?.addEventListener(
        "click",
        () => {
          window.location.reload();
        }
      );

    document
      .getElementById(
        "copyIdentityDebug"
      )
      ?.addEventListener(
        "click",
        copyReport
      );

    document
      .getElementById(
        "clearIdentitySaves"
      )
      ?.addEventListener(
        "click",
        () => {
          const confirmed =
            window.confirm(
              "Clear only Identity Island saved progress and reload?"
            );

          if (!confirmed) {
            return;
          }

          [
            "safetiiIdentityProgress",
            "safetiiIdentityFoundationsV1",
            "identityCurrentStep",
            "identityFoundObjects",
            "identityUsernameProgress",
            "identityBackpackProgress",
            "identityProfileProgress",
            "identityTestProgress",
            "identityStickers"
          ].forEach((key) => {
            localStorage.removeItem(
              key
            );
          });

          window.location.href =
            "identity.html?debug=1";
        }
      );
  }

  function runChecks() {
    problems.length = 0;
    recordedProblems.clear();

    checkScripts();
    checkRequiredElements();
    checkDuplicateIds();
    checkGameNamespace();
    checkButtons();
    checkVisibleSections();
    checkStoredData();

    renderPanel();

    console.group(
      "🐞 Identity Emergency Debug Summary"
    );

    console.log(
      "IdentityGame:",
      window.IdentityGame
    );

    console.log(
      "State:",
      window.IdentityGame?.state
    );

    console.log(
      "Data:",
      window.IdentityGame?.data
    );

    console.log(
      "Problems:",
      problems
    );

    console.groupEnd();
  }

  function initialize() {
    createPanel();

    /*
      Wait until the other Identity scripts have had
      time to initialize.
    */
    window.setTimeout(
      runChecks,
      500
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
