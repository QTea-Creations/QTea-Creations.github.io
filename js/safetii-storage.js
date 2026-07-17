
"use strict";

/* =========================================================
   SAFETII NET
   Shared Multi-Hero Storage System

   This file manages:
   - Multiple heroes
   - The active hero
   - Points
   - Badges
   - Stickers
   - Mission progress
   - Compatibility with the current Identity Island scripts
========================================================= */

(() => {
  const STORAGE_KEY =
    "safetiiHeroesV1";

  /*
    These are the older localStorage keys currently used
    by Identity Island, the dashboard, and the notebook.

    Each hero receives a separate copy of these values.
  */
  const LEGACY_PROGRESS_KEYS = [
    "safetiiPoints",

    "safetiiIdentityProgress",

    "identityBadgeEarned",
    "identityMissionCompleted",

    "identityStickers",
    "identityAwardedStickers",

    "identityCurrentStep",
    "identityFoundObjects",
    "identityUsernameProgress",
    "identityBackpackProgress",
    "identityProfileProgress",
    "identityTestProgress"
  ];

  /* -------------------------------------------------------
     BASIC HELPERS
  ------------------------------------------------------- */

  function safelyParse(
    value,
    fallbackValue
  ) {
    if (!value) {
      return fallbackValue;
    }

    try {
      return JSON.parse(value);
    } catch (error) {
      console.error(
        "Safetii Storage could not read saved data:",
        error
      );

      return fallbackValue;
    }
  }

  function copyValue(value) {
    return JSON.parse(
      JSON.stringify(value)
    );
  }

  function createHeroId() {
    const randomPart =
      Math.random()
        .toString(36)
        .slice(2, 10);

    return `hero-${Date.now()}-${randomPart}`;
  }

  function dispatchHeroUpdate(
    eventName = "safetii:hero-updated"
  ) {
    document.dispatchEvent(
      new CustomEvent(eventName)
    );
  }

  /* -------------------------------------------------------
     DEFAULT DATA
  ------------------------------------------------------- */

  function createDefaultLegacyData() {
    const legacyData = {};

    LEGACY_PROGRESS_KEYS.forEach(
      (key) => {
        legacyData[key] = null;
      }
    );

    /*
      Every brand-new hero begins with zero points.
    */
    legacyData.safetiiPoints = "0";

    return legacyData;
  }

  function createEmptyStore() {
    return {
      version: 1,
      activeHeroId: null,
      heroes: []
    };
  }

  function normalizeStore(store) {
    if (
      !store ||
      typeof store !== "object"
    ) {
      return createEmptyStore();
    }

    return {
      version: 1,

      activeHeroId:
        typeof store.activeHeroId ===
        "string"
          ? store.activeHeroId
          : null,

      heroes:
        Array.isArray(store.heroes)
          ? store.heroes
          : []
    };
  }

  /* -------------------------------------------------------
     READ AND WRITE MAIN STORE
  ------------------------------------------------------- */

  function readStore() {
    const storedData =
      safelyParse(
        localStorage.getItem(
          STORAGE_KEY
        ),
        null
      );

    return normalizeStore(
      storedData
    );
  }

  function writeStore(store) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        normalizeStore(store)
      )
    );
  }

  /* -------------------------------------------------------
     LEGACY SAVE SNAPSHOT

     Identity Island still writes to the older keys.

     We capture those values and attach them to the
     currently active hero.
  ------------------------------------------------------- */

  function readLegacySnapshot() {
    const snapshot =
      createDefaultLegacyData();

    LEGACY_PROGRESS_KEYS.forEach(
      (key) => {
        const value =
          localStorage.getItem(key);

        snapshot[key] =
          value === null
            ? null
            : value;
      }
    );

    return snapshot;
  }

  function clearLegacyProgress() {
    LEGACY_PROGRESS_KEYS.forEach(
      (key) => {
        localStorage.removeItem(key);
      }
    );
  }

  function applyHeroToLegacy(hero) {
    if (!hero) {
      return;
    }

    clearLegacyProgress();

    /*
      Current pages expect safetiiHero to contain
      the hero's basic identity.
    */
    localStorage.setItem(
      "safetiiHero",
      JSON.stringify({
        id: hero.id,
        name: hero.name,
        color: hero.color,
        animal: hero.animal,
        power: hero.power
      })
    );

    const legacyData = {
      ...createDefaultLegacyData(),
      ...(hero.legacy || {})
    };

    Object.entries(
      legacyData
    ).forEach(([key, value]) => {
      if (
        value !== null &&
        value !== undefined
      ) {
        localStorage.setItem(
          key,
          String(value)
        );
      }
    });
  }

  /* -------------------------------------------------------
     CREATE HERO OBJECT
  ------------------------------------------------------- */

  function buildHero(
    heroData,
    legacyData =
      createDefaultLegacyData()
  ) {
    const now =
      new Date().toISOString();

    return {
      id:
        heroData.id ||
        createHeroId(),

      name:
        typeof heroData.name ===
          "string" &&
        heroData.name.trim()
          ? heroData.name.trim()
          : "Cyber Mentee",

      color:
        heroData.color || "",

      animal:
        heroData.animal || "",

      power:
        heroData.power || "",

      createdAt:
        heroData.createdAt || now,

      updatedAt: now,

      legacy: {
        ...createDefaultLegacyData(),
        ...legacyData
      }
    };
  }

  /* -------------------------------------------------------
     MIGRATE THE CURRENT SINGLE HERO

     This preserves the hero and progress that already
     exist in the browser.
  ------------------------------------------------------- */

  function migrateExistingHero() {
    const store =
      readStore();

    if (
      store.heroes.length > 0
    ) {
      return store;
    }

    const oldHeroValue =
      localStorage.getItem(
        "safetiiHero"
      );

    if (!oldHeroValue) {
      return store;
    }

    const oldHero =
      safelyParse(
        oldHeroValue,
        null
      );

    if (
      !oldHero ||
      typeof oldHero !== "object"
    ) {
      return store;
    }

    const migratedHero =
      buildHero(
        oldHero,
        readLegacySnapshot()
      );

    store.heroes.push(
      migratedHero
    );

    store.activeHeroId =
      migratedHero.id;

    writeStore(store);

    console.log(
      "Existing Safetii Net hero migrated into the multi-hero system."
    );

    return store;
  }

  function getStore() {
    return migrateExistingHero();
  }

  /* -------------------------------------------------------
     FIND ACTIVE HERO
  ------------------------------------------------------- */

  function findActiveHero(store) {
    if (
      !store ||
      !store.activeHeroId
    ) {
      return null;
    }

    return (
      store.heroes.find(
        (hero) =>
          hero.id ===
          store.activeHeroId
      ) || null
    );
  }

  /* -------------------------------------------------------
     CAPTURE CURRENT HERO PROGRESS

     Call this after returning from a mission so anything
     written by Identity Island is stored under this hero.
  ------------------------------------------------------- */

  function captureLegacyProgress() {
    const store =
      getStore();

    const activeHero =
      findActiveHero(store);

    if (!activeHero) {
      return null;
    }

    activeHero.legacy =
      readLegacySnapshot();

    activeHero.updatedAt =
      new Date().toISOString();

    writeStore(store);

    return copyValue(
      activeHero
    );
  }

  /* -------------------------------------------------------
     GET HEROES
  ------------------------------------------------------- */

  function getHeroes() {
    const store =
      getStore();

    return copyValue(
      store.heroes
    );
  }

  function getActiveHero() {
    const store =
      getStore();

    const activeHero =
      findActiveHero(store);

    return activeHero
      ? copyValue(activeHero)
      : null;
  }

  /* -------------------------------------------------------
     CREATE A NEW HERO

     A new hero starts with:
     - Zero points
     - No mission progress
     - No stickers
     - No badges
  ------------------------------------------------------- */

  function createHero(heroData) {
    /*
      Save the current hero before switching away.
    */
    captureLegacyProgress();

    const store =
      getStore();

    const hero =
      buildHero(
        heroData,
        createDefaultLegacyData()
      );

    store.heroes.push(hero);
    store.activeHeroId = hero.id;

    writeStore(store);
    applyHeroToLegacy(hero);

    dispatchHeroUpdate(
      "safetii:hero-created"
    );

    return copyValue(hero);
  }

  /* -------------------------------------------------------
     SWITCH HERO
  ------------------------------------------------------- */

  function setActiveHero(heroId) {
    if (!heroId) {
      return null;
    }

    /*
      Save the current hero's most recent progress first.
    */
    captureLegacyProgress();

    const store =
      getStore();

    const selectedHero =
      store.heroes.find(
        (hero) =>
          hero.id === heroId
      );

    if (!selectedHero) {
      console.error(
        `Safetii hero not found: ${heroId}`
      );

      return null;
    }

    store.activeHeroId =
      selectedHero.id;

    selectedHero.updatedAt =
      new Date().toISOString();

    writeStore(store);
    applyHeroToLegacy(selectedHero);

    dispatchHeroUpdate(
      "safetii:hero-changed"
    );

    return copyValue(
      selectedHero
    );
  }

  /* -------------------------------------------------------
     UPDATE ACTIVE HERO IDENTITY
  ------------------------------------------------------- */

  function updateActiveHero(changes) {
    const store =
      getStore();

    const activeHero =
      findActiveHero(store);

    if (!activeHero) {
      return null;
    }

    const allowedFields = [
      "name",
      "color",
      "animal",
      "power"
    ];

    allowedFields.forEach(
      (field) => {
        if (
          Object.prototype.hasOwnProperty.call(
            changes,
            field
          )
        ) {
          activeHero[field] =
            changes[field];
        }
      }
    );

    activeHero.updatedAt =
      new Date().toISOString();

    writeStore(store);
    applyHeroToLegacy(activeHero);

    dispatchHeroUpdate();

    return copyValue(
      activeHero
    );
  }

  /* -------------------------------------------------------
     DELETE HERO

     The last remaining hero cannot be deleted without
     creating another one first.
  ------------------------------------------------------- */

  function deleteHero(heroId) {
    captureLegacyProgress();

    const store =
      getStore();

    const heroIndex =
      store.heroes.findIndex(
        (hero) =>
          hero.id === heroId
      );

    if (heroIndex === -1) {
      return false;
    }

    store.heroes.splice(
      heroIndex,
      1
    );

    if (
      store.activeHeroId ===
      heroId
    ) {
      const nextHero =
        store.heroes[0] || null;

      store.activeHeroId =
        nextHero
          ? nextHero.id
          : null;

      if (nextHero) {
        applyHeroToLegacy(
          nextHero
        );
      } else {
        localStorage.removeItem(
          "safetiiHero"
        );

        clearLegacyProgress();
      }
    }

    writeStore(store);

    dispatchHeroUpdate(
      "safetii:hero-deleted"
    );

    return true;
  }

  /* -------------------------------------------------------
     POINT HELPERS
  ------------------------------------------------------- */

  function getHeroPoints(hero) {
    const rawPoints =
      hero?.legacy?.safetiiPoints;

    const points =
      Number(rawPoints || 0);

    return Number.isFinite(points)
      ? points
      : 0;
  }

  function getActiveHeroPoints() {
    return getHeroPoints(
      getActiveHero()
    );
  }

  /* -------------------------------------------------------
     RESET ALL HEROES

     This is intended only for development/testing.
  ------------------------------------------------------- */

  function resetAllHeroesForTesting() {
    const confirmed =
      window.confirm(
        "Delete every saved hero and all Safetii Net progress from this browser?"
      );

    if (!confirmed) {
      return false;
    }

    localStorage.removeItem(
      STORAGE_KEY
    );

    localStorage.removeItem(
      "safetiiHero"
    );

    clearLegacyProgress();

    dispatchHeroUpdate(
      "safetii:all-heroes-reset"
    );

    return true;
  }

  /* -------------------------------------------------------
     PUBLIC API
  ------------------------------------------------------- */

  window.SafetiiStorage = {
    getHeroes,
    getActiveHero,
    getActiveHeroPoints,

    createHero,
    setActiveHero,
    updateActiveHero,
    deleteHero,

    captureLegacyProgress,
    applyHeroToLegacy,

    resetAllHeroesForTesting
  };

  /*
    Run migration immediately when this file loads.
  */
  migrateExistingHero();

  console.log(
    "Safetii multi-hero storage loaded."
  );
})();
