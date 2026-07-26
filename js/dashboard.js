"use strict";

/* =========================================================
   SAFETII NET — HERO HEADQUARTERS
   COMPLETE DASHBOARD CONTROLLER

   Reads:
   - Saved hero
   - Total points
   - Mission progress
   - Earned badges

   Updates:
   - Hero profile
   - Hero rank
   - Current mission
   - Progress bar
   - Mission dots
   - Badge collection
   - Mission map
   - Meme message
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

      description:
        "Learn how to protect personal information and make safer choices online.",

      href:
        "missions/identity.html",

      badgeName:
        "Identity Protector",

      badgeElementId:
        "identityBadge",

      badgeImageId:
        "identityBadgeImage",

      progressDotId:
        "missionProgressDot1",

      mapItemId:
        "missionMapIdentity",

      mapStatusId:
        "missionMapIdentityStatus",

      progressStorageKey:
        STORAGE_KEYS.identityProgress,

      badgeStorageKey:
        STORAGE_KEYS.identityBadge,

      icon:
        "🛡️"
    },

    {
      number:
        2,

      key:
        "password",

      title:
        "Password Safe Keeper",

      description:
        "Build stronger passwords and protect accounts from password attacks.",

      href:
        "missions/password.html",

      badgeName:
        "Password Safe Keeper",

      badgeElementId:
        "passwordBadge",

      badgeImageId:
        "passwordBadgeImage",

      progressDotId:
        "missionProgressDot2",

      mapItemId:
        "missionMapPassword",

      mapStatusId:
        "missionMapPasswordStatus",

      progressStorageKey:
        STORAGE_KEYS.passwordProgress,

      badgeStorageKey:
        STORAGE_KEYS.passwordBadge,

      icon:
        "🔐"
    },

    {
      number:
        3,

      key:
        "phishing",

      title:
        "Phish Finder",

      description:
        "Investigate suspicious messages, links, offers, and requests.",

      href:
        "missions/phishing.html",

      badgeName:
        "Phish Finder",

      badgeElementId:
        "phishingBadge",

      badgeImageId:
        "phishingBadgeImage",

      progressDotId:
        "missionProgressDot3",

      mapItemId:
        "missionMapPhishing",

      mapStatusId:
        "missionMapPhishingStatus",

      progressStorageKey:
        STORAGE_KEYS.phishingProgress,

      badgeStorageKey:
        STORAGE_KEYS.phishingBadge,

      icon:
        "🎣"
    },

    {
      number:
        4,

      key:
        "footprint",

      title:
        "Digital Footprint Defender",

      description:
        "Understand how online posts and choices can leave a lasting trail.",

      href:
        "missions/footprint.html",

      badgeName:
        "Digital Footprint Defender",

      badgeElementId:
        "footprintBadge",

      badgeImageId:
        "footprintBadgeImage",

      progressDotId:
        "missionProgressDot4",

      mapItemId:
        "missionMapFootprint",

      mapStatusId:
        "missionMapFootprintStatus",

      progressStorageKey:
        STORAGE_KEYS.footprintProgress,

      badgeStorageKey:
        STORAGE_KEYS.footprintBadge,

      icon:
        "👣"
    },

    {
      number:
        5,

      key:
        "responder",

      title:
        "Cyber Responder",

      description:
        "Learn how to respond, report, save evidence, and get help.",

      href:
        "missions/responder.html",

      badgeName:
        "Cyber Responder",

      badgeElementId:
        "responderBadge",

      badgeImageId:
        "responderBadgeImage",

      progressDotId:
        "missionProgressDot5",

      mapItemId:
        "missionMapResponder",

      mapStatusId:
        "missionMapResponderStatus",

      progressStorageKey:
        STORAGE_KEYS.responderProgress,

      badgeStorageKey:
        STORAGE_KEYS.responderBadge,

      icon:
        "🚨"
    }
  ];


  /* =====================================================
     BASIC HELPERS
  ===================================================== */

  function byId(id) {
    return document.getElementById(
      id
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


  function getBooleanStorage(
    key
  ) {
    return (
      localStorage.getItem(
        key
      ) ===
      "true"
    );
  }


  function normalizeText(
    value
  ) {
    return String(
      value || ""
    )
      .trim()
      .toLowerCase();
  }


  /* =====================================================
     HERO INFORMATION
  ===================================================== */

  function getSavedHero() {
    const hero =
      safelyReadJson(
        STORAGE_KEYS.hero,
        {}
      );

    if (
      !hero ||
      typeof hero !==
        "object" ||
      Array.isArray(hero)
    ) {
      return {};
    }

    return hero;
  }


  function getHeroName(
    hero
  ) {
    return (
      hero.name ||
      hero.heroName ||
      hero.username ||
      "Cyber Mentee"
    );
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

    return Number.isFinite(
      alternatePoints
    )
      ? Math.max(
          0,
          alternatePoints
        )
      : 0;
  }


  function loadHeroInformation() {
    const hero =
      getSavedHero();

    const heroName =
      getHeroName(
        hero
      );

    setText(
      "dashboardHeroName",
      heroName
    );

    setText(
      "dashboardHeroIdName",
      heroName
    );

    setText(
      "dashboardColor",
      hero.color ||
        "Not chosen yet"
    );

    setText(
      "dashboardAnimal",
      hero.animal ||
        "Not chosen yet"
    );

    setText(
      "dashboardPower",
      hero.power ||
        "Not chosen yet"
    );

    setText(
      "dashboardPoints",
      getTotalPoints()
    );
  }


  /* =====================================================
     BADGE DETECTION
  ===================================================== */

  function getBadgeList() {
    const badgeList =
      safelyReadJson(
        STORAGE_KEYS.badgeList,
        []
      );

    return Array.isArray(
      badgeList
    )
      ? badgeList
      : [];
  }


  function badgeListIncludes(
    mission
  ) {
    const normalizedBadges =
      getBadgeList().map(
        normalizeText
      );

    const possibleNames = [
      mission.badgeName,
      `${mission.badgeName} Badge`,
      mission.title,
      mission.key
    ].map(
      normalizeText
    );

    return possibleNames.some(
      (name) =>
        normalizedBadges.includes(
          name
        )
    );
  }


  function progressShowsCompleted(
    mission
  ) {
    const progress =
      safelyReadJson(
        mission.progressStorageKey,
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


  function missionBadgeEarned(
    mission
  ) {
    return (
      getBooleanStorage(
        mission.badgeStorageKey
      ) ||
      badgeListIncludes(
        mission
      ) ||
      progressShowsCompleted(
        mission
      )
    );
  }


  function missionHasStarted(
    mission
  ) {
    if (
      missionBadgeEarned(
        mission
      )
    ) {
      return true;
    }

    const progress =
      safelyReadJson(
        mission.progressStorageKey,
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
      progress.currentSection !==
        undefined ||
      progress.currentStep !==
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
          missionBadgeEarned(
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
     HERO RANK
  ===================================================== */

  function getHeroRank(
    completedCount
  ) {
    switch (
      completedCount
    ) {
      case 5:
        return "Cyber Super Hero";

      case 4:
        return "Cyber Guardian";

      case 3:
        return "Cyber Defender";

      case 2:
        return "Cyber Agent";

      case 1:
        return "Cyber Apprentice";

      default:
        return "Cyber Mentee";
    }
  }


  function updateHeroRank(
    completedCount
  ) {
    const rank =
      getHeroRank(
        completedCount
      );

    setText(
      "dashboardRank",
      rank
    );

    setText(
      "dashboardHeroRank",
      rank
    );
  }


  /* =====================================================
     PROGRESS BAR
  ===================================================== */

  function updateProgress(
    statuses
  ) {
    const completedCount =
      statuses.filter(
        (mission) =>
          mission.completed
      ).length;

    const percentage =
      Math.round(
        (
          completedCount /
          MISSIONS.length
        ) *
          100
      );

    setText(
      "dashboardBadgeCount",
      completedCount
    );

    setText(
      "dashboardProgressPercent",
      `${percentage}%`
    );

    setText(
      "dashboardProgressText",
      `${completedCount} of ${MISSIONS.length} missions completed`
    );

    const fill =
      byId(
        "dashboardProgressFill"
      );

    if (fill) {
      fill.style.width =
        `${percentage}%`;
    }

    const progressBar =
      byId(
        "dashboardProgressBar"
      );

    progressBar?.setAttribute(
      "aria-valuenow",
      String(
        percentage
      )
    );

    statuses.forEach(
      (mission) => {
        const dot =
          byId(
            mission.progressDotId
          );

        if (!dot) {
          return;
        }

        dot.classList.remove(
          "completed",
          "current",
          "locked"
        );

        if (
          mission.completed
        ) {
          dot.classList.add(
            "completed"
          );

          dot.textContent =
            "✓";
        } else {
          dot.textContent =
            String(
              mission.number
            );
        }
      }
    );

    updateHeroRank(
      completedCount
    );

    updateProgressMessage(
      completedCount
    );
  }


  function updateProgressMessage(
    completedCount
  ) {
    const messages = [
      "Begin Mission 1 to start your cybersecurity training.",
      "Great start! Your first badge is secured.",
      "Two badges earned! Your Hero Rank is rising.",
      "You are more than halfway through your training.",
      "Only one mission remains before Super Hero status.",
      "All missions complete! You are a Cyber Super Hero."
    ];

    setText(
      "progressEncouragement",
      messages[
        completedCount
      ] ||
        messages[0]
    );
  }


  /* =====================================================
     BADGE COLLECTION
  ===================================================== */

  function updateBadgeCollection(
    statuses
  ) {
    statuses.forEach(
      (mission) => {
        const badge =
          byId(
            mission.badgeElementId
          );

        if (!badge) {
          return;
        }

        badge.classList.toggle(
          "locked",
          !mission.completed
        );

        badge.classList.toggle(
          "earned",
          mission.completed
        );

        const lock =
          badge.querySelector(
            ".badge-lock"
          );

        if (lock) {
          lock.textContent =
            mission.completed
              ? "✓"
              : "🔒";

          lock.setAttribute(
            "aria-label",
            mission.completed
              ? "Badge earned"
              : "Badge locked"
          );
        }

        badge.title =
          mission.completed
            ? `${mission.title} badge earned`
            : `${mission.title} badge locked`;
      }
    );
  }


  /* =====================================================
     CURRENT MISSION
  ===================================================== */

  function getCurrentMission(
    statuses
  ) {
    const unfinishedMission =
      statuses.find(
        (mission) =>
          !mission.completed
      );

    return (
      unfinishedMission ||
      statuses[
        statuses.length -
        1
      ]
    );
  }


  function updateCurrentMission(
    statuses
  ) {
    const allComplete =
      statuses.every(
        (mission) =>
          mission.completed
      );

    const currentMission =
      getCurrentMission(
        statuses
      );

    if (!currentMission) {
      return;
    }

    setText(
      "dashboardMissionNumber",
      allComplete
        ? "All Complete"
        : `Mission ${currentMission.number}`
    );

    setText(
      "currentMissionLabel",
      allComplete
        ? "All 5 Missions Complete"
        : `Mission ${currentMission.number} of ${MISSIONS.length}`
    );

    setText(
      "currentMissionTitle",
      allComplete
        ? "Cyber Super Hero"
        : currentMission.title
    );

    setText(
      "currentMissionDescription",
      allComplete
        ? "You completed every Safetii Net mission and earned all five cybersecurity badges."
        : currentMission.description
    );

    const currentButton =
      byId(
        "currentMissionButton"
      );

    const continueButton =
      byId(
        "continueMissionButton"
      );

    const buttonText =
      allComplete
        ? "Review Missions"
        : currentMission.started
          ? "Continue Mission"
          : "Start Mission";

    const buttonHref =
      allComplete
        ? "missions.html"
        : currentMission.href;

    if (currentButton) {
      currentButton.textContent =
        buttonText;

      currentButton.href =
        buttonHref;
    }

    if (continueButton) {
      continueButton.textContent =
        buttonText;

      continueButton.href =
        buttonHref;
    }

    statuses.forEach(
      (mission) => {
        const dot =
          byId(
            mission.progressDotId
          );

        if (
          dot &&
          !mission.completed &&
          mission.number ===
            currentMission.number &&
          !allComplete
        ) {
          dot.classList.add(
            "current"
          );
        }
      }
    );

    updateMemeMessage(
      currentMission,
      allComplete
    );
  }


  /* =====================================================
     MEME MESSAGE
  ===================================================== */

  function updateMemeMessage(
    currentMission,
    allComplete
  ) {
    if (allComplete) {
      setText(
        "dashboardMemeHeading",
        "Cyber Super Hero status achieved!"
      );

      setText(
        "dashboardMemeMessage",
        "You completed every mission and earned the full badge collection."
      );

      return;
    }

    setText(
      "dashboardMemeHeading",
      `${currentMission.title} is ready!`
    );

    setText(
      "dashboardMemeMessage",
      currentMission.started
        ? "Continue your training from where you stopped."
        : `Begin Mission ${currentMission.number} to continue your Hero journey.`
    );
  }


  /* =====================================================
     MISSION MAP
  ===================================================== */

  function updateMissionMap(
    statuses
  ) {
    let previousCompleted =
      true;

    statuses.forEach(
      (mission) => {
        const item =
          byId(
            mission.mapItemId
          );

        const status =
          byId(
            mission.mapStatusId
          );

        if (
          !item ||
          !status
        ) {
          return;
        }

        item.classList.remove(
          "completed",
          "current",
          "locked"
        );

        if (
          mission.completed
        ) {
          item.classList.add(
            "completed"
          );

          status.textContent =
            "Completed";

          previousCompleted =
            true;

          return;
        }

        if (
          previousCompleted
        ) {
          item.classList.add(
            "current"
          );

          status.textContent =
            mission.started
              ? "Continue"
              : "Start";

          previousCompleted =
            false;

          return;
        }

        item.classList.add(
          "locked"
        );

        status.textContent =
          "Coming Soon";

        previousCompleted =
          false;
      }
    );
  }


  /* =====================================================
     DASHBOARD INITIALIZATION
  ===================================================== */

  function initializeDashboard() {
    const dashboard =
      document.querySelector(
        ".dashboard"
      );

    if (!dashboard) {
      return;
    }

    loadHeroInformation();

    const missionStatuses =
      getMissionStatuses();

    updateProgress(
      missionStatuses
    );

    updateBadgeCollection(
      missionStatuses
    );

    updateCurrentMission(
      missionStatuses
    );

    updateMissionMap(
      missionStatuses
    );

    console.log(
      "Safetii Net Hero Headquarters loaded.",
      missionStatuses
    );
  }


  if (
    document.readyState ===
    "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      initializeDashboard,
      {
        once:
          true
      }
    );
  } else {
    initializeDashboard();
  }
})();
