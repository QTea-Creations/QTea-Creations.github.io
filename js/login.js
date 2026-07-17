"use strict";

/* =========================================================
   SAFETII NET
   Hero Creator / Login Controller

   This file:
   - Displays hero choices
   - Generates short hero names
   - Creates a brand-new hero profile
   - Preserves previously created heroes
========================================================= */

(() => {
  const storage =
    window.SafetiiStorage;

  if (!storage) {
    console.error(
      "SafetiiStorage is missing. Load safetii-storage.js before login.js."
    );

    return;
  }

  const heroDraft = {
    color: "",
    animal: "",
    power: "",
    name: ""
  };

  const colors = [
    {
      label: "Purple",
      emoji: "💜"
    },
    {
      label: "Cyan",
      emoji: "🩵"
    },
    {
      label: "Gold",
      emoji: "💛"
    },
    {
      label: "Blue",
      emoji: "💙"
    },
    {
      label: "Green",
      emoji: "💚"
    },
    {
      label: "Pink",
      emoji: "🩷"
    }
  ];

  const animals = [
    {
      label: "Fox",
      emoji: "🦊"
    },
    {
      label: "Owl",
      emoji: "🦉"
    },
    {
      label: "Turtle",
      emoji: "🐢"
    },
    {
      label: "Dolphin",
      emoji: "🐬"
    },
    {
      label: "Lion",
      emoji: "🦁"
    },
    {
      label: "Dragon",
      emoji: "🐉"
    }
  ];

  const powers = [
    {
      label: "Lightning",
      emoji: "⚡"
    },
    {
      label: "Shield",
      emoji: "🛡️"
    },
    {
      label: "Star",
      emoji: "⭐"
    },
    {
      label: "Tech",
      emoji: "💻"
    },
    {
      label: "Rocket",
      emoji: "🚀"
    },
    {
      label: "Detective",
      emoji: "🔍"
    }
  ];

  /*
    Two-part names keep hero names short enough
    for the dashboard and notebook.
  */
  const heroTitles = [
    "Captain",
    "Agent",
    "Nova",
    "Cyber",
    "Mega",
    "Guardian",
    "Spark",
    "Commander",
    "Quantum",
    "Mystic",
    "Ultra",
    "Turbo"
  ];

  function byId(id) {
    return document.getElementById(id);
  }

  function randomItem(items) {
    return items[
      Math.floor(
        Math.random() *
        items.length
      )
    ];
  }

  function removeEmoji(value) {
    return String(value || "")
      .replace(
        /[^\p{L}\p{N}\s]/gu,
        ""
      )
      .trim();
  }

  function getChoiceLabel(value) {
    const cleaned =
      removeEmoji(value);

    const words =
      cleaned.split(/\s+/);

    return (
      words[
        words.length - 1
      ] || ""
    );
  }

  function resetGeneratedName() {
    heroDraft.name = "";

    const heroName =
      byId("heroName");

    if (heroName) {
      heroName.textContent =
        "Your Hero Name";
    }

    updateSaveButton();
  }

  function updateSaveButton() {
    const saveButton =
      byId("saveHero");

    if (!saveButton) {
      return;
    }

    const ready =
      Boolean(
        heroDraft.name &&
        heroDraft.color &&
        heroDraft.animal &&
        heroDraft.power
      );

    saveButton.disabled =
      !ready;

    saveButton.classList.toggle(
      "locked-action",
      !ready
    );

    saveButton.setAttribute(
      "aria-disabled",
      String(!ready)
    );
  }

  function updateHeroPreview() {
    const chosenColor =
      byId("chosenColor");

    const chosenAnimal =
      byId("chosenAnimal");

    const chosenPower =
      byId("chosenPower");

    if (chosenColor) {
      chosenColor.textContent =
        heroDraft.color ||
        "Choose a color";
    }

    if (chosenAnimal) {
      chosenAnimal.textContent =
        heroDraft.animal ||
        "Choose a sidekick";
    }

    if (chosenPower) {
      chosenPower.textContent =
        heroDraft.power ||
        "Choose a power";
    }
  }

  function selectChoice(
    container,
    button,
    type,
    item
  ) {
    container
      .querySelectorAll(
        ".choice-button"
      )
      .forEach(
        (choiceButton) => {
          choiceButton.classList.remove(
            "selected"
          );

          choiceButton.setAttribute(
            "aria-pressed",
            "false"
          );
        }
      );

    button.classList.add(
      "selected"
    );

    button.setAttribute(
      "aria-pressed",
      "true"
    );

    heroDraft[type] =
      `${item.emoji} ${item.label}`;

    /*
      A changed choice means the old generated
      name may no longer match the hero.
    */
    resetGeneratedName();
    updateHeroPreview();
  }

  function createChoices(
    containerId,
    items,
    type
  ) {
    const container =
      byId(containerId);

    if (!container) {
      return;
    }

    container.innerHTML = "";

    items.forEach((item) => {
      const button =
        document.createElement(
          "button"
        );

      button.type = "button";

      button.className =
        "choice-button";

      button.setAttribute(
        "aria-pressed",
        "false"
      );

      const emoji =
        document.createElement(
          "span"
        );

      emoji.setAttribute(
        "aria-hidden",
        "true"
      );

      emoji.textContent =
        item.emoji;

      const label =
        document.createTextNode(
          item.label
        );

      button.append(
        emoji,
        label
      );

      button.addEventListener(
        "click",
        () => {
          selectChoice(
            container,
            button,
            type,
            item
          );
        }
      );

      container.appendChild(
        button
      );
    });
  }

  function allChoicesSelected() {
    return Boolean(
      heroDraft.color &&
      heroDraft.animal &&
      heroDraft.power
    );
  }

  function generateHeroName() {
    if (
      !allChoicesSelected()
    ) {
      window.alert(
        "Meme says: Pick your suit color, sidekick, and cyber power first!"
      );

      return;
    }

    const title =
      randomItem(heroTitles);

    const animal =
      getChoiceLabel(
        heroDraft.animal
      );

    const power =
      getChoiceLabel(
        heroDraft.power
      );

    const color =
      getChoiceLabel(
        heroDraft.color
      );

    const nameStyles = [
      `${title} ${animal}`,
      `${title} ${power}`,
      `${color} ${animal}`,
      `${power} ${animal}`
    ];

    heroDraft.name =
      randomItem(nameStyles);

    const heroName =
      byId("heroName");

    if (heroName) {
      heroName.textContent =
        heroDraft.name;
    }

    updateSaveButton();
  }

  function createNewHero() {
    if (!heroDraft.name) {
      window.alert(
        "Meme says: Generate your Cyber Hero name first!"
      );

      return;
    }

    const newHero =
      storage.createHero({
        name:
          heroDraft.name,

        color:
          heroDraft.color,

        animal:
          heroDraft.animal,

        power:
          heroDraft.power
      });

    if (!newHero) {
      window.alert(
        "Meme could not save your hero. Please try again."
      );

      return;
    }

    /*
      The new hero becomes the active hero automatically
      and begins with zero points and no mission progress.
    */
    window.location.href =
      "dashboard.html";
  }

  function initializeLogin() {
    createChoices(
      "colorChoices",
      colors,
      "color"
    );

    createChoices(
      "animalChoices",
      animals,
      "animal"
    );

    createChoices(
      "powerChoices",
      powers,
      "power"
    );

    updateHeroPreview();
    updateSaveButton();

    const generateButton =
      byId("generateHero");

    const saveButton =
      byId("saveHero");

    if (generateButton) {
      generateButton.addEventListener(
        "click",
        generateHeroName
      );
    }

    if (saveButton) {
      saveButton.addEventListener(
        "click",
        createNewHero
      );
    }

    console.log(
      "Safetii hero creator loaded."
    );
  }

  if (
    document.readyState ===
    "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      initializeLogin,
      {
        once: true
      }
    );
  } else {
    initializeLogin();
  }
})();
