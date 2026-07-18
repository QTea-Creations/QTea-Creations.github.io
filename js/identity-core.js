
"use strict";

(() => {
  const game = window.IdentityGame =
    window.IdentityGame || {};

  game.state = {
    foundObjects: new Set(),
    foundStickers: new Set(),

    generatedUsername: "",
    generatedUsernameIsSafe: true,
    generatedUsernameReason: "",
    usernamesChecked: 0,
    usernameAwaitingApproval: false,

    practiceIndex: 0,
    practiceCorrect: 0,
    practiceAnswered: false,

    identityProfileIndex: 0,
    profilesProtected: 0,
    selectedRepairBlocks: [],
    profileRepairComplete: false,

    testIndex: 0,
    testCorrect: 0,
    testAnswered: false
  };

  game.byId = function byId(id) {
    return document.getElementById(id);
  };

  game.randomItem = function randomItem(items) {
    return items[
      Math.floor(Math.random() * items.length)
    ];
  };

  game.shuffleItems = function shuffleItems(items) {
    const copy = [...items];

    for (
      let index = copy.length - 1;
      index > 0;
      index -= 1
    ) {
      const randomIndex =
        Math.floor(Math.random() * (index + 1));

      [copy[index], copy[randomIndex]] = [
        copy[randomIndex],
        copy[index]
      ];
    }

    return copy;
  };

  game.setMemeTip = function setMemeTip(
    message,
    mood = "thinking"
  ) {
    const tip = game.byId("memeTip");
    const image = game.byId("memeImage");

    if (tip) {
      tip.textContent = message;
    }

    if (!image) {
      return;
    }

    const images = {
      thinking: "../assets/mascot/thinking.png",
      wrong: "../assets/mascot/wrong.png",
      congrats: "../assets/mascot/congrats.png",
      welcome: "../assets/mascot/welcome.png"
    };

    image.src =
      images[mood] || images.thinking;
  };

  game.showSection = function showSection(sectionId) {
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

    sectionIds.forEach((id) => {
      const section = game.byId(id);

      if (section) {
        section.classList.add("hidden");
      }
    });

    const activeSection =
      game.byId(sectionId);

    if (!activeSection) {
      console.error(
        `Section not found: ${sectionId}`
      );

      return;
    }

    activeSection.classList.remove("hidden");

    activeSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };

  game.loadMissionHeroName =
    function loadMissionHeroName() {
      const heroName =
        game.byId("missionHeroName");

      if (!heroName) {
        return;
      }

      try {
        const savedHero =
          localStorage.getItem("safetiiHero");

        if (!savedHero) {
          heroName.textContent = "Cyber Mentee";
          return;
        }

        const hero = JSON.parse(savedHero);

        heroName.textContent =
          typeof hero.name === "string" &&
          hero.name.trim()
            ? hero.name
            : "Cyber Mentee";
      } catch (error) {
        console.error(
          "Could not load hero name:",
          error
        );

        heroName.textContent = "Cyber Mentee";
      }
    };

  game.resetMissionState =
    function resetMissionState() {
      const state = game.state;

      state.foundObjects = new Set();
      state.foundStickers = new Set();

      state.generatedUsername = "";
      state.generatedUsernameIsSafe = true;
      state.generatedUsernameReason = "";
      state.usernamesChecked = 0;
      state.usernameAwaitingApproval = false;

      state.practiceIndex = 0;
      state.practiceCorrect = 0;
      state.practiceAnswered = false;

      state.identityProfileIndex = 0;
      state.profilesProtected = 0;
      state.selectedRepairBlocks = [];
      state.profileRepairComplete = false;

      state.testIndex = 0;
      state.testCorrect = 0;
      state.testAnswered = false;
    };
})();
