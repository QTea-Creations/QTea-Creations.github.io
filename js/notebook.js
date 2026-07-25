"use strict";

/* =========================================================
   SAFETII NET — CYBER NOTEBOOK CONTROLLER

   Controls:

   - Hero name and total points
   - Mission and badge counts
   - Mission notebook tabs
   - Identity Protector progress
   - Identity Protector stickers
   - Password Safe Keeper progress
   - Password mission checklist
   - Start, continue, and completed states
   - Replay controls for both missions

   Important:
   Replaying a mission clears the current mission attempt,
   but preserves previously earned points and rewards.
========================================================= */

(() => {
  /* =====================================================
     STORAGE KEYS
  ===================================================== */

  const STORAGE_KEYS = {
    hero:
      "safetiiHero",

    points:
      "safetiiPoints",

    alternatePoints:
      "safetiiGlobalPoints",

    badges:
      "safetiiBadges",


    /* Identity Protector */

    identityProgress:
      "safetiiIdentityProgress",

    identityBadge:
      "identityBadgeEarned",

    identityStickers:
      "identityStickers",

    identityAwardedStickers:
      "identityAwardedStickers",


    /* Password Safe Keeper */

    passwordProgress:
      "safetiiPasswordProgress",

    passwordBadge:
      "passwordBadgeEarned",

    passwordCompleted:
      "passwordMissionCompleted",

    passwordReward:
      "passwordMissionRewardAwarded"
  };


  const MISSION_URLS = {
    identity:
      "missions/identity.html",

    password:
      "missions/password.html"
  };


  const IDENTITY_STICKER_NAMES = [
    "Shield Sticker",
    "Privacy Sticker",
    "Hero Name Sticker",
    "Trusted Adult Sticker",
    "Smart Share Sticker"
  ];


  const PASSWORD_SECTION_LABELS = {
    passwordMissionAlert:
      "Mission introduction",

    passphraseZone:
      "Password Safety Lab",

    passwordAttackZone:
      "Password Cracker Challenge",

    twoFactorZone:
      "Two-Factor Security Gate",

    accountDefenseZone:
      "Account Defense Simulator",

    passwordVaultZone:
      "Password Vault Practice",

    passwordTestIntroZone:
      "Final inspection introduction",

    passwordTestZone:
      "Final Vault Inspection",

    passwordMissionResult:
      "Mission results"
  };


  const PASSWORD_CHECKLIST = [
    {
      id:
        "passwordLabNotebookCheck",

      progressKey:
        "passwordLabComplete"
    },

    {
      id:
        "passwordAttackNotebookCheck",

      progressKey:
        "passwordAttackComplete"
    },

    {
      id:
        "twoFactorNotebookCheck",

      progressKey:
        "twoFactorComplete"
    },

    {
      id:
        "accountDefenseNotebookCheck",

      progressKey:
        "accountDefenseComplete"
    },

    {
      id:
        "passwordVaultNotebookCheck",

      progressKey:
        "vaultComplete"
    },

    {
      id:
        "passwordTestNotebookCheck",

      progressKey:
        "missionCompleted"
    }
  ];


  /* =====================================================
     PAGE STATE
  ===================================================== */

  let pendingReplayMission =
    null;


  /* =====================================================
     BASIC HELPERS
  ===================================================== */

  function byId(id) {
    return document.getElementById(
      id
    );
  }


  function safeNumber(
    value,
    fallback = 0
  ) {
    const number =
      Number(value);

    return Number.isFinite(
      number
    )
      ? Math.max(
          0,
          number
        )
      : fallback;
  }


  function safelyReadJson(
    key,
    fallback = null
  ) {
    try {
      const raw =
        localStorage.getItem(
          key
        );

      if (!raw) {
        return fallback;
      }

      return JSON.parse(
        raw
      );
    } catch (error) {
      console.error(
        `Could not read ${key}:`,
        error
      );

      return fallback;
    }
  }


  function safelyReadObject(
    key
  ) {
    const stored =
      safelyReadJson(
        key,
        null
      );

    return (
      stored &&
      typeof stored ===
        "object" &&
      !Array.isArray(stored)
    )
      ? stored
      : null;
  }


  function safelyReadArray(
    key
  ) {
    const stored =
      safelyReadJson(
        key,
        []
      );

    return Array.isArray(
      stored
    )
      ? stored
      : [];
  }


  function isTrueStorageValue(
    key
  ) {
    return (
      localStorage.getItem(
        key
      ) === "true"
    );
  }


  function setText(
    id,
    value
  ) {
    const element =
      byId(id);

    if (element) {
      element.textContent =
        String(value);
    }
  }


  function setStatusClass(
    element,
    status
  ) {
    if (!element) {
      return;
    }

    element.classList.remove(
      "completed-status",
      "progress-status",
      "not-started-status"
    );

    switch (status) {
      case "completed":
        element.classList.add(
          "completed-status"
        );
        break;

      case "progress":
        element.classList.add(
          "progress-status"
        );
        break;

      default:
        element.classList.add(
          "not-started-status"
        );
    }
  }


  /* =====================================================
     HERO AND POINTS
  ===================================================== */

  function getHeroName() {
    const hero =
      safelyReadObject(
        STORAGE_KEYS.hero
      );

    const possibleNames = [
      hero?.name,
      hero?.heroName,
      hero?.username
    ];

    const savedName =
      possibleNames.find(
        (value) => {
          return (
            typeof value ===
              "string" &&
            value.trim()
          );
        }
      );

    return savedName
      ? savedName.trim()
      : "Cyber Hero";
  }


  function getTotalPoints() {
    const primaryPoints =
      Number(
        localStorage.getItem(
          STORAGE_KEYS.points
        )
      );

    if (
      Number.isFinite(
        primaryPoints
      )
    ) {
      return Math.max(
        0,
        primaryPoints
      );
    }

    const alternatePoints =
      Number(
        localStorage.getItem(
          STORAGE_KEYS.alternatePoints
        )
      );

    if (
      Number.isFinite(
        alternatePoints
      )
    ) {
      return Math.max(
        0,
        alternatePoints
      );
    }

    return 0;
  }


  function loadNotebookHeader() {
    setText(
      "notebookHeroName",
      getHeroName()
    );

    setText(
      "notebookPoints",
      getTotalPoints()
    );
  }


  /* =====================================================
     BADGE AND MISSION COUNTS
  ===================================================== */

  function getIdentityBadgeEarned() {
    return isTrueStorageValue(
      STORAGE_KEYS.identityBadge
    );
  }


  function getPasswordBadgeEarned() {
    return (
      isTrueStorageValue(
        STORAGE_KEYS.passwordBadge
      ) ||
      isTrueStorageValue(
        STORAGE_KEYS.passwordCompleted
      )
    );
  }


  function getBadgeCount() {
    let count =
      0;

    if (
      getIdentityBadgeEarned()
    ) {
      count +=
        1;
    }

    if (
      getPasswordBadgeEarned()
    ) {
      count +=
        1;
    }

    return count;
  }


  function getMissionCount() {
    let count =
      0;

    if (
      getIdentityBadgeEarned()
    ) {
      count +=
        1;
    }

    if (
      getPasswordBadgeEarned()
    ) {
      count +=
        1;
    }

    return count;
  }


  function updateNotebookCounts() {
    setText(
      "notebookBadgeCount",
      getBadgeCount()
    );

    setText(
      "notebookMissionCount",
      getMissionCount()
    );
  }


  /* =====================================================
     NOTEBOOK TABS
  ===================================================== */

function activateNotebookPage(
  pageId,
  updateHash = true
) {
  const targetPage =
    byId(pageId);

  if (!targetPage) {
    console.error(
      `Notebook page not found: ${pageId}`
    );

    return;
  }

  const pages =
    document.querySelectorAll(
      ".notebook-page"
    );

  const tabs =
    document.querySelectorAll(
      ".notebook-tab"
    );

  pages.forEach(
    (page) => {
      const isActive =
        page.id ===
        pageId;

      page.classList.toggle(
        "active",
        isActive
      );

      page.classList.toggle(
        "hidden",
        !isActive
      );

      page.hidden =
        !isActive;
    }
  );

  tabs.forEach(
    (tab) => {
      const isActive =
        tab.dataset.notebookPage ===
        pageId;

      tab.classList.toggle(
        "active",
        isActive
      );

      tab.setAttribute(
        "aria-selected",
        String(isActive)
      );

      tab.tabIndex =
        isActive
          ? 0
          : -1;
    }
  );

  try {
    sessionStorage.setItem(
      "safetiiNotebookPage",
      pageId
    );
  } catch (error) {
    console.error(
      "Could not remember the active notebook page:",
      error
    );
  }

  if (!updateHash) {
    return;
  }

  const pageHash =
    pageId ===
      "passwordNotebookPage"
      ? "#password"
      : "#identity";

  if (
    window.location.hash !==
    pageHash
  ) {
    history.replaceState(
      null,
      "",
      pageHash
    );
  }
}

function bindNotebookTabs() {
  const tabs =
    Array.from(
      document.querySelectorAll(
        ".notebook-tab"
      )
    );

  tabs.forEach(
    (
      tab,
      tabIndex
    ) => {
      tab.addEventListener(
        "click",
        () => {
          const pageId =
            tab.dataset.notebookPage;

          activateNotebookPage(
            pageId
          );
        }
      );

      tab.addEventListener(
        "keydown",
        (event) => {
          const supportedKeys = [
            "ArrowRight",
            "ArrowLeft",
            "Home",
            "End"
          ];

          if (
            !supportedKeys.includes(
              event.key
            )
          ) {
            return;
          }

          event.preventDefault();

          let nextIndex =
            tabIndex;

          if (
            event.key ===
            "ArrowRight"
          ) {
            nextIndex =
              (
                tabIndex +
                1
              ) %
              tabs.length;
          }

          if (
            event.key ===
            "ArrowLeft"
          ) {
            nextIndex =
              (
                tabIndex -
                1 +
                tabs.length
              ) %
              tabs.length;
          }

          if (
            event.key ===
            "Home"
          ) {
            nextIndex =
              0;
          }

          if (
            event.key ===
            "End"
          ) {
            nextIndex =
              tabs.length -
              1;
          }

          const nextTab =
            tabs[
              nextIndex
            ];

          nextTab.focus();

          activateNotebookPage(
            nextTab.dataset.notebookPage
          );
        }
      );
    }
  );

  let savedPage =
    null;

  try {
    savedPage =
      sessionStorage.getItem(
        "safetiiNotebookPage"
      );
  } catch (error) {
    console.error(
      "Could not read the saved notebook page:",
      error
    );
  }

  let startingPage =
    "identityNotebookPage";

  if (
    window.location.hash ===
    "#password"
  ) {
    startingPage =
      "passwordNotebookPage";
  } else if (
    window.location.hash ===
    "#identity"
  ) {
    startingPage =
      "identityNotebookPage";
  } else if (
    savedPage &&
    byId(savedPage)
  ) {
    startingPage =
      savedPage;
  }

  activateNotebookPage(
    startingPage,
    false
  );
}

  /* =====================================================
     IDENTITY PROTECTOR
  ===================================================== */

  function getIdentityProgress() {
    return safelyReadObject(
      STORAGE_KEYS.identityProgress
    );
  }


  function identityMissionStarted(
    progress
  ) {
    if (!progress) {
      return false;
    }

    return (
      progress.missionStarted ===
        true ||
      progress.started ===
        true ||
      progress.currentStep >
        0 ||
      typeof progress.currentSection ===
        "string" ||
      Object.keys(progress)
        .length >
        0
    );
  }


  function getIdentityProgressLabel(
    progress,
    badgeEarned
  ) {
    if (badgeEarned) {
      return "Completed";
    }

    if (!progress) {
      return "Not started";
    }

    const possibleStep =
      safeNumber(
        progress.currentStep ||
        progress.step ||
        progress.trainingIndex ||
        0
      );

    if (possibleStep > 0) {
      return `In progress — step ${possibleStep}`;
    }

    if (
      typeof progress.currentSection ===
        "string" &&
      progress.currentSection
    ) {
      return "In progress";
    }

    return "In progress";
  }


  function loadIdentityBadge() {
    const badgeEarned =
      getIdentityBadgeEarned();

    const progress =
      getIdentityProgress();

    const badge =
      byId(
        "identityNotebookBadge"
      );

    const status =
      byId(
        "identityMissionStatus"
      );

    if (badge) {
      badge.classList.toggle(
        "locked",
        !badgeEarned
      );

      badge.classList.toggle(
        "earned",
        badgeEarned
      );
    }

    setText(
      "identityBadgeText",
      badgeEarned
        ? "Badge earned! You completed the Identity Protector mission."
        : "Complete Identity Protector to unlock this badge."
    );

    setText(
      "identityProgressText",
      getIdentityProgressLabel(
        progress,
        badgeEarned
      )
    );

    if (status) {
      if (badgeEarned) {
        status.textContent =
          "Mission completed";

        setStatusClass(
          status,
          "completed"
        );
      } else if (
        identityMissionStarted(
          progress
        )
      ) {
        status.textContent =
          "Mission in progress";

        setStatusClass(
          status,
          "progress"
        );
      } else {
        status.textContent =
          "Not started";

        setStatusClass(
          status,
          "not-started"
        );
      }
    }
  }


  function getCollectedIdentityStickers() {
    const currentStickers =
      safelyReadArray(
        STORAGE_KEYS.identityStickers
      );

    const rewardedStickers =
      safelyReadArray(
        STORAGE_KEYS.identityAwardedStickers
      );

    return new Set([
      ...currentStickers,
      ...rewardedStickers
    ]);
  }


  function createIdentitySticker(
    stickerName,
    collected
  ) {
    const sticker =
      document.createElement(
        "div"
      );

    sticker.className =
      "notebook-sticker";

    if (!collected) {
      sticker.classList.add(
        "locked"
      );
    }

    const symbol =
      document.createElement(
        "span"
      );

    symbol.className =
      "notebook-sticker-symbol";

    symbol.setAttribute(
      "aria-hidden",
      "true"
    );

    symbol.textContent =
      collected
        ? "⭐"
        : "☆";

    const label =
      document.createElement(
        "span"
      );

    label.textContent =
      collected
        ? stickerName
        : "Hidden Sticker";

    sticker.append(
      symbol,
      label
    );

    return sticker;
  }


  function loadIdentityStickers() {
    const stickerBook =
      byId(
        "identityStickerBook"
      );

    if (!stickerBook) {
      return;
    }

    const collected =
      getCollectedIdentityStickers();

    stickerBook.innerHTML =
      "";

    IDENTITY_STICKER_NAMES.forEach(
      (stickerName) => {
        stickerBook.appendChild(
          createIdentitySticker(
            stickerName,
            collected.has(
              stickerName
            )
          )
        );
      }
    );

    setText(
      "identityStickerCount",
      `${Math.min(
        collected.size,
        IDENTITY_STICKER_NAMES.length
      )} of ${IDENTITY_STICKER_NAMES.length}`
    );
  }


  function updateIdentityAction() {
    const action =
      byId(
        "identityMissionAction"
      );

    if (!action) {
      return;
    }

    const badgeEarned =
      getIdentityBadgeEarned();

    const progress =
      getIdentityProgress();

    action.href =
      MISSION_URLS.identity;

    if (badgeEarned) {
      action.textContent =
        "View Completed Mission";

      return;
    }

    if (
      identityMissionStarted(
        progress
      )
    ) {
      action.textContent =
        "Continue Mission";

      return;
    }

    action.textContent =
      "Start Mission";
  }


  /* =====================================================
     PASSWORD SAFE KEEPER
  ===================================================== */

  function getPasswordProgress() {
    return safelyReadObject(
      STORAGE_KEYS.passwordProgress
    );
  }


  function passwordMissionStarted(
    progress
  ) {
    return Boolean(
      progress &&
      (
        progress.missionStarted ===
          true ||
        progress.currentSection !==
          "passwordMissionAlert" ||
        safeNumber(
          progress.comparisonIndex
        ) >
          0 ||
        progress.passwordLabComplete ===
          true
      )
    );
  }


  function getPasswordSectionLabel(
    progress
  ) {
    if (!progress) {
      return "Not started";
    }

    if (
      progress.missionCompleted ===
        true ||
      progress.badgeEarned ===
        true
    ) {
      return "Mission completed";
    }

    return (
      PASSWORD_SECTION_LABELS[
        progress.currentSection
      ] ||
      "Mission in progress"
    );
  }


  function loadPasswordBadge() {
    const badgeEarned =
      getPasswordBadgeEarned();

    const progress =
      getPasswordProgress();

    const badge =
      byId(
        "passwordNotebookBadge"
      );

    const status =
      byId(
        "passwordMissionStatus"
      );

    if (badge) {
      badge.classList.toggle(
        "locked",
        !badgeEarned
      );

      badge.classList.toggle(
        "earned",
        badgeEarned
      );
    }

    setText(
      "passwordBadgeText",
      badgeEarned
        ? "Badge earned! You completed the Password Safe Keeper mission."
        : "Complete the Password Safe Keeper mission and score at least 80% on the final inspection."
    );

    setText(
      "passwordCurrentSection",
      getPasswordSectionLabel(
        progress
      )
    );


    const finalScore =
      safeNumber(
        progress?.finalScore
      );

    const finalTestStarted =
      progress &&
      (
        safeNumber(
          progress.testIndex
        ) >
          0 ||
        finalScore >
          0 ||
        progress.missionCompleted ===
          true
      );

    setText(
      "passwordNotebookScore",
      finalTestStarted
        ? `${Math.round(
            finalScore
          )}%`
        : "Not completed"
    );


    const rewardAwarded =
      isTrueStorageValue(
        STORAGE_KEYS.passwordReward
      );

    const attemptReward =
      safeNumber(
        progress?.missionPointsEarned
      );

    setText(
      "passwordNotebookReward",
      rewardAwarded
        ? attemptReward > 0
          ? `${attemptReward} points earned`
          : "100 points previously earned"
        : "Not earned"
    );


    if (status) {
      if (badgeEarned) {
        status.textContent =
          "Mission completed";

        setStatusClass(
          status,
          "completed"
        );
      } else if (
        passwordMissionStarted(
          progress
        )
      ) {
        status.textContent =
          "Mission in progress";

        setStatusClass(
          status,
          "progress"
        );
      } else {
        status.textContent =
          "Not started";

        setStatusClass(
          status,
          "not-started"
        );
      }
    }
  }


  function getCurrentPasswordChecklistId(
    progress
  ) {
    if (!progress) {
      return PASSWORD_CHECKLIST[
        0
      ].id;
    }

    const unfinished =
      PASSWORD_CHECKLIST.find(
        (item) => {
          return (
            progress[
              item.progressKey
            ] !==
            true
          );
        }
      );

    return unfinished
      ? unfinished.id
      : null;
  }


  function updatePasswordChecklist() {
    const progress =
      getPasswordProgress();

    const currentId =
      getCurrentPasswordChecklistId(
        progress
      );

    PASSWORD_CHECKLIST.forEach(
      (item) => {
        const element =
          byId(item.id);

        if (!element) {
          return;
        }

        const completed =
          progress?.[
            item.progressKey
          ] ===
          true;

        const current =
          !completed &&
          item.id ===
            currentId &&
          passwordMissionStarted(
            progress
          );

        element.classList.toggle(
          "completed",
          completed
        );

        element.classList.toggle(
          "current",
          current
        );

        const symbol =
          element.querySelector(
            ":scope > span"
          );

        if (symbol) {
          symbol.textContent =
            completed
              ? "☑"
              : current
                ? "➜"
                : "☐";
        }
      }
    );
  }


  function updatePasswordAction() {
    const action =
      byId(
        "passwordMissionAction"
      );

    if (!action) {
      return;
    }

    const badgeEarned =
      getPasswordBadgeEarned();

    const progress =
      getPasswordProgress();

    action.href =
      MISSION_URLS.password;

    if (badgeEarned) {
      action.textContent =
        "View Completed Mission";

      return;
    }

    if (
      passwordMissionStarted(
        progress
      )
    ) {
      action.textContent =
        "Continue Mission";

      return;
    }

    action.textContent =
      "Start Mission";
  }


  /* =====================================================
     REPLAY DIALOG
  ===================================================== */

  function getReplayDialog() {
    return byId(
      "notebookReplayDialog"
    );
  }


  function openReplayDialog(
    missionName
  ) {
    const dialog =
      getReplayDialog();

    if (!dialog) {
      return;
    }

    pendingReplayMission =
      missionName;

    const identityMission =
      missionName ===
      "identity";

    setText(
      "replayDialogTitle",
      identityMission
        ? "Replay Identity Protector?"
        : "Replay Password Safe Keeper?"
    );

    setText(
      "replayDialogMessage",
      identityMission
        ? "This will erase the current Identity Protector attempt and return to the beginning. Previously earned points, rewarded stickers, and badges will remain."
        : "This will erase the current Password Safe Keeper attempt and return to the beginning. Previously earned points and the one-time mission reward will remain."
    );

    if (
      typeof dialog.showModal ===
        "function"
    ) {
      dialog.showModal();

      return;
    }

    /*
      Fallback for older browsers.
    */

    const confirmed =
      window.confirm(
        byId(
          "replayDialogMessage"
        )?.textContent ||
        "Replay this mission?"
      );

    if (confirmed) {
      confirmMissionReplay();
    }
  }


  function closeReplayDialog() {
    const dialog =
      getReplayDialog();

    pendingReplayMission =
      null;

    if (
      dialog?.open
    ) {
      dialog.close();
    }
  }


  /* =====================================================
     IDENTITY REPLAY
  ===================================================== */

  function clearIdentityAttempt() {
    const keys = [
      STORAGE_KEYS.identityProgress,
      STORAGE_KEYS.identityStickers,
      "identityCurrentStep",
      "identityFoundObjects",
      "identityUsernameProgress",
      "identityBackpackProgress",
      "identityProfileProgress",
      "identityTestProgress",
      "identityReplayRequested"
    ];

    keys.forEach(
      (key) => {
        localStorage.removeItem(
          key
        );
      }
    );

    /*
      Keep:

      identityBadgeEarned
      identityAwardedStickers
      safetiiPoints
    */
  }


  function replayIdentityMission() {
    clearIdentityAttempt();

    localStorage.setItem(
      "identityReplayRequested",
      "true"
    );

    window.location.href =
      `${MISSION_URLS.identity}?replay=true&reset=${Date.now()}`;
  }


  /* =====================================================
     PASSWORD REPLAY
  ===================================================== */

  function clearPasswordAttempt() {
    const keys = [
      STORAGE_KEYS.passwordProgress,
      STORAGE_KEYS.passwordCompleted,
      STORAGE_KEYS.passwordBadge,
      "passwordReplayRequested"
    ];

    keys.forEach(
      (key) => {
        localStorage.removeItem(
          key
        );
      }
    );

    /*
      Keep:

      passwordMissionRewardAwarded
      safetiiPoints
      safetiiBadges
    */
  }


  function replayPasswordMission() {
    clearPasswordAttempt();

    localStorage.setItem(
      "passwordReplayRequested",
      "true"
    );

    window.location.href =
      `${MISSION_URLS.password}?replay=true&reset=${Date.now()}`;
  }


  function confirmMissionReplay() {
    const missionName =
      pendingReplayMission;

    closeReplayDialog();

    if (
      missionName ===
      "identity"
    ) {
      replayIdentityMission();

      return;
    }

    if (
      missionName ===
      "password"
    ) {
      replayPasswordMission();
    }
  }


  function bindReplayControls() {
    const identityReplay =
      byId(
        "replayIdentityFromNotebook"
      );

    const passwordReplay =
      byId(
        "replayPasswordFromNotebook"
      );

    const cancelReplay =
      byId(
        "cancelMissionReplay"
      );

    const confirmReplay =
      byId(
        "confirmMissionReplay"
      );

    identityReplay?.addEventListener(
      "click",
      () => {
        openReplayDialog(
          "identity"
        );
      }
    );

    passwordReplay?.addEventListener(
      "click",
      () => {
        openReplayDialog(
          "password"
        );
      }
    );

    cancelReplay?.addEventListener(
      "click",
      closeReplayDialog
    );

    confirmReplay?.addEventListener(
      "click",
      confirmMissionReplay
    );


    const dialog =
      getReplayDialog();

    dialog?.addEventListener(
      "cancel",
      () => {
        pendingReplayMission =
          null;
      }
    );

    dialog?.addEventListener(
      "click",
      (event) => {
        if (
          event.target ===
          dialog
        ) {
          closeReplayDialog();
        }
      }
    );
  }


  /* =====================================================
     REFRESH NOTEBOOK DISPLAY
  ===================================================== */

  function refreshNotebook() {
    loadNotebookHeader();
    updateNotebookCounts();

    loadIdentityBadge();
    loadIdentityStickers();
    updateIdentityAction();

    loadPasswordBadge();
    updatePasswordChecklist();
    updatePasswordAction();
  }

/* =====================================================
   INITIALIZATION
===================================================== */

function installBadgeImageFallbacks() {
  document
    .querySelectorAll(
      ".notebook-badge"
    )
    .forEach(
      (badge) => {
        badge.addEventListener(
          "error",
          () => {
            const wrapper =
              badge.closest(
                ".badge-tape-wrap"
              );

            badge.classList.add(
              "hidden"
            );

            if (
              !wrapper ||
              wrapper.querySelector(
                ".missing-badge-placeholder"
              )
            ) {
              return;
            }

            const placeholder =
              document.createElement(
                "div"
              );

            placeholder.className =
              "missing-badge-placeholder";

            placeholder.innerHTML =
              `
                <span aria-hidden="true">
                  🏅
                </span>

                <strong>
                  Badge artwork coming soon
                </strong>
              `;

            wrapper.appendChild(
              placeholder
            );
          },
          {
            once:
              true
          }
        );
      }
    );
}


function initializeNotebook() {
  installBadgeImageFallbacks();
  bindNotebookTabs();
  bindReplayControls();
  refreshNotebook();

  window.addEventListener(
    "hashchange",
    () => {
      if (
        window.location.hash ===
        "#password"
      ) {
        activateNotebookPage(
          "passwordNotebookPage",
          false
        );

        return;
      }

      if (
        window.location.hash ===
        "#identity"
      ) {
        activateNotebookPage(
          "identityNotebookPage",
          false
        );
      }
    }
  );

  /*
    Refresh when returning from another tab or mission.
  */

  window.addEventListener(
    "focus",
    refreshNotebook
  );

  window.addEventListener(
    "storage",
    refreshNotebook
  );

  document.addEventListener(
    "visibilitychange",
    () => {
      if (
        document.visibilityState ===
        "visible"
      ) {
        refreshNotebook();
      }
    }
  );

  console.log(
    "Safetii Net Cyber Notebook loaded."
  );
}


if (
  document.readyState ===
  "loading"
) {
  document.addEventListener(
    "DOMContentLoaded",
    initializeNotebook,
    {
      once:
        true
    }
  );
} else {
  initializeNotebook();
}
})();
