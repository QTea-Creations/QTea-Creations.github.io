"use strict";

/* =========================================================
   SAFETII NET — HOMEPAGE CONTROLLER

   Features:
   - Recognizes a returning hero
   - Changes homepage buttons to Continue Adventure
   - Reads completed missions and badges
   - Marks missions completed, current, or locked
   - Uses badge-based Hero Ranks
========================================================= */

(() => {
  /* =====================================================
     STORAGE KEYS
  ===================================================== */

  const STORAGE_KEYS = {
    hero:
      "safetiiHero",

    activeHeroId:
      "safetiiActiveHeroId",

    points:
      "safetiiPoints",

    badgeList:
      "safetiiBadges",

    identityProgress:
      "safetiiIdentityProgress",

    identityBadge:
      "identityBadgeEarned",

    passwordProgress:
      "safetiiPasswordProgress",

    passwordBadge:
      "passwordBadgeEarned",

    phishingProgress:
      "safetiiPhishingProgress",

    phishingBadge:
      "phishingBadgeEarned",

    footprintProgress:
      "safetiiFootprintProgress",

    footprintBadge:
      "footprintBadgeEarned",

    responderProgress:
      "safetiiResponderProgress",

    responderBadge:
      "responderBadgeEarned"
  };


  /* =====================================================
     MISSION CONFIGURATION
  ===================================================== */

  const MISSIONS = [
    {
      number:
        1,

      key:
        "identity",

      title:
        "Identity Protector",

      href:
        "missions/identity.html",

      cardSelector:
        '[data-home-mission="identity"]',

      progressKey:
        STORAGE_KEYS.identityProgress,

      badgeKey:
        STORAGE_KEYS.identityBadge
    },

    {
      number:
        2,

      key:
        "password",

      title:
        "Password Safe Keeper",

      href:
        "missions/password.html",

      cardSelector:
        '[data-home-mission="password"]',

      progressKey:
        STORAGE_KEYS.passwordProgress,

      badgeKey:
        STORAGE_KEYS.passwordBadge
    },

    {
      number:
        3,

      key:
        "phishing",

      title:
        "Phish Finder",

      href:
        "missions/phishing.html",

      cardSelector:
        '[data-home-mission="phishing"]',

      progressKey:
        STORAGE_KEYS.phishingProgress,

      badgeKey:
        STORAGE_KEYS.phishingBadge
    },

    {
      number:
        4,

      key:
        "footprint",

      title:
        "Digital Footprint Defender",

      href:
        "missions/footprint.html",

      cardSelector:
        '[data-home-mission="footprint"]',

      progressKey:
        STORAGE_KEYS.footprintProgress,

      badgeKey:
        STORAGE_KEYS.footprintBadge
    },

    {
      number:
        5,

      key:
        "responder",

      title:
        "Cyber Responder",

      href:
        "missions/responder.html",

      cardSelector:
        '[data-home-mission="responder"]',

      progressKey:
        STORAGE_KEYS.responderProgress,

      badgeKey:
        STORAGE_KEYS.responderBadge
    }
  ];


  /* =====================================================
     HELPERS
  ===================================================== */

  function byId(id) {
    return document.getElementById(
      id
    );
  }


  function safelyReadJson(
    key,
    fallback = null
  ) {
    try {
      const storedValue =
        localStorage.getItem(
          key
        );

      if (!storedValue) {
        return fallback;
      }

      return JSON.parse(
        storedValue
      );
    } catch (error) {
      console.error(
        `Could not read ${key}:`,
        error
      );

      return fallback;
    }
  }


  function normalizeText(value) {
    return String(
      value || ""
    )
      .trim()
      .toLowerCase();
  }


  function setLinkContent(
    element,
    text,
    href
  ) {
    if (!element) {
      return;
    }

    element.textContent =
      text;

    element.href =
      href;
  }


  /* =====================================================
     HERO INFORMATION
  ===================================================== */

  function getSavedHero() {
    const hero =
      safelyReadJson(
        STORAGE_KEYS.hero,
        null
      );

    if (
      !hero ||
      typeof hero !==
        "object" ||
      Array.isArray(hero)
    ) {
      return null;
    }

    return hero;
  }


  function getHeroName(hero) {
    return (
      hero?.name ||
      hero?.heroName ||
      hero?.username ||
      "Cyber Hero"
    );
  }


  function heroExists() {
    return Boolean(
      getSavedHero()
    );
  }


  /* =====================================================
     BADGE AND MISSION DETECTION
  ===================================================== */

  function getBadgeList() {
    const badges =
      safelyReadJson(
        STORAGE_KEYS.badgeList,
        []
      );

    return Array.isArray(
      badges
    )
      ? badges
      : [];
  }


  function badgeListIncludes(
    mission
  ) {
    const normalizedBadges =
      getBadgeList().map(
        normalizeText
      );

    const acceptedNames = [
      mission.title,
      `${mission.title} Badge`,
      mission.key
    ].map(
      normalizeText
    );

    return acceptedNames.some(
      (name) =>
        normalizedBadges.includes(
          name
        )
    );
  }


  function progressShowsComplete(
    mission
  ) {
    const progress =
      safelyReadJson(
        mission.progressKey,
        null
      );

    if (
      !progress ||
      typeof progress !==
        "object"
    ) {
      return false;
    }

    return (
      progress.completed ===
        true ||
      progress.missionCompleted ===
        true ||
      progress.badgeEarned ===
        true ||
      progress.vaultComplete ===
        true
    );
  }


  function missionIsComplete(
    mission
  ) {
    return (
      localStorage.getItem(
        mission.badgeKey
      ) ===
        "true" ||
      badgeListIncludes(
        mission
      ) ||
      progressShowsComplete(
        mission
      )
    );
  }


  function missionHasStarted(
    mission
  ) {
    if (
      missionIsComplete(
        mission
      )
    ) {
      return true;
    }

    const progress =
      safelyReadJson(
        mission.progressKey,
        null
      );

    if (
      !progress ||
      typeof progress !==
        "object"
    ) {
      return false;
    }

    return (
      progress.started ===
        true ||
      progress.missionStarted ===
        true ||
      progress.currentStep !==
        undefined ||
      progress.currentSection !==
        undefined ||
      progress.step !==
        undefined
    );
  }


  function getMissionStatuses() {
    return MISSIONS.map(
      (mission) => ({
        ...mission,

        completed:
          missionIsComplete(
            mission
          ),

        started:
          missionHasStarted(
            mission
          )
      })
    );
  }


  /* =====================================================
     BADGE-BASED HERO RANKS
  ===================================================== */

  function getCurrentHeroRank(
    statuses
  ) {
    const completedMissions =
      statuses.filter(
        (mission) =>
          mission.completed
      );

    if (
      completedMissions.length ===
      MISSIONS.length
    ) {
      return "Cyber Super Hero";
    }

    if (
      completedMissions.length ===
      0
    ) {
      return "Cyber Mentee";
    }

    return completedMissions[
      completedMissions.length -
        1
    ].title;
  }


  /* =====================================================
     HOMEPAGE HERO BUTTONS
  ===================================================== */

  function updateHeroButtons(
    statuses
  ) {
    const hero =
      getSavedHero();

    const headerButton =
      byId(
        "headerHeroButton"
      );

    const primaryButton =
      byId(
        "homePrimaryButton"
      );

    const finalButton =
      byId(
        "homeFinalButton"
      );

    const finalMessage =
      byId(
        "homeFinalMessage"
      );


    if (!hero) {
      setLinkContent(
        headerButton,
        "Create a Hero",
        "login.html"
      );

      setLinkContent(
        primaryButton,
        "Start Your Adventure",
        "login.html"
      );

      setLinkContent(
        finalButton,
        "Create Your Hero",
        "login.html"
      );

      if (finalMessage) {
        finalMessage.textContent =
          "Create a Cyber Hero, complete your first mission, and begin building your badge collection.";
      }

      return;
    }


    const heroName =
      getHeroName(
        hero
      );

    const rank =
      getCurrentHeroRank(
        statuses
      );

    const currentMission =
      statuses.find(
        (mission) =>
          !mission.completed
      );


    setLinkContent(
      headerButton,
      "Hero Headquarters",
      "dashboard.html"
    );

    setLinkContent(
      primaryButton,
      currentMission
        ? "Continue Your Adventure"
        : "Enter Hero Headquarters",
      currentMission
        ? currentMission.href
        : "dashboard.html"
    );

    setLinkContent(
      finalButton,
      currentMission
        ? "Continue Training"
        : "View Your Headquarters",
      currentMission
        ? currentMission.href
        : "dashboard.html"
    );


    if (finalMessage) {
      if (
        statuses.every(
          (mission) =>
            mission.completed
        )
      ) {
        finalMessage.textContent =
          `${heroName}, you earned all five badges and reached Cyber Super Hero status.`;
      } else {
        finalMessage.textContent =
          `${heroName}, your current rank is ${rank}. Continue your mission journey to earn the next badge.`;
      }
    }
  }


  /* =====================================================
     MISSION CARDS
  ===================================================== */

  function updateMissionCards(
    statuses
  ) {
    const firstIncomplete =
      statuses.find(
        (mission) =>
          !mission.completed
      );


    statuses.forEach(
      (mission) => {
        const card =
          document.querySelector(
            mission.cardSelector
          );

        if (!card) {
          return;
        }


        card.classList.remove(
          "completed",
          "current",
          "locked"
        );


        const numberLabel =
          card.querySelector(
            ".home-mission-number"
          );

        const actionLabel =
          card.querySelector(
            ".mission-card-link"
          );


        if (
          mission.completed
        ) {
          card.classList.add(
            "completed"
          );

          card.href =
            mission.href;

          if (numberLabel) {
            numberLabel.textContent =
              "✓ Badge Earned";
          }

          if (actionLabel) {
            actionLabel.textContent =
              "Replay Mission →";
          }

          return;
        }


        if (
          firstIncomplete &&
          mission.number ===
            firstIncomplete.number
        ) {
          card.classList.add(
            "current"
          );

          card.href =
            mission.href;

          if (numberLabel) {
            numberLabel.textContent =
              `Current Mission ${mission.number}`;
          }

          if (actionLabel) {
            actionLabel.textContent =
              mission.started
                ? "Continue Mission →"
                : "Begin Mission →";
          }

          return;
        }


        card.classList.add(
          "locked"
        );

        card.href =
          "dashboard.html";

        if (numberLabel) {
          numberLabel.textContent =
            `Mission ${mission.number} — Locked`;
        }

        if (actionLabel) {
          actionLabel.textContent =
            "Complete Earlier Missions";
        }
      }
    );
  }


  /* =====================================================
     RETURNING HERO MESSAGE
  ===================================================== */

  function addReturningHeroMessage(
    statuses
  ) {
    const hero =
      getSavedHero();

    const heroCopy =
      document.querySelector(
        ".home-hero-copy"
      );

    if (
      !hero ||
      !heroCopy ||
      byId(
        "returningHeroMessage"
      )
    ) {
      return;
    }


    const heroName =
      getHeroName(
        hero
      );

    const rank =
      getCurrentHeroRank(
        statuses
      );

    const completedCount =
      statuses.filter(
        (mission) =>
          mission.completed
      ).length;


    const message =
      document.createElement(
        "div"
      );

    message.id =
      "returningHeroMessage";

    message.className =
      "returning-hero-message";

    message.innerHTML =
      `
        <span aria-hidden="true">
          🦸
        </span>

        <div>
          <strong>
            Welcome back, ${escapeHtml(
              heroName
            )}!
          </strong>

          <p>
            Current rank:
            <strong>
              ${escapeHtml(
                rank
              )}
            </strong>
            · ${completedCount} of ${MISSIONS.length} badges earned
          </p>
        </div>
      `;


    const actions =
      heroCopy.querySelector(
        ".home-hero-actions"
      );

    if (actions) {
      heroCopy.insertBefore(
        message,
        actions
      );
    } else {
      heroCopy.appendChild(
        message
      );
    }
  }


  function escapeHtml(value) {
    return String(
      value || ""
    )
      .replaceAll(
        "&",
        "&amp;"
      )
      .replaceAll(
        "<",
        "&lt;"
      )
      .replaceAll(
        ">",
        "&gt;"
      )
      .replaceAll(
        '"',
        "&quot;"
      )
      .replaceAll(
        "'",
        "&#039;"
      );
  }


  /* =====================================================
     INITIALIZATION
  ===================================================== */

  function initializeHomepage() {
    const statuses =
      getMissionStatuses();

    updateHeroButtons(
      statuses
    );

    updateMissionCards(
      statuses
    );

    addReturningHeroMessage(
      statuses
    );

    console.log(
      "Safetii Net homepage loaded.",
      {
        heroExists:
          heroExists(),

        rank:
          getCurrentHeroRank(
            statuses
          ),

        missions:
          statuses
      }
    );
  }


  if (
    document.readyState ===
    "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      initializeHomepage,
      {
        once:
          true
      }
    );
  } else {
    initializeHomepage();
  }
})();
