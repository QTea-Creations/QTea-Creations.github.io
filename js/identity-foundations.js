
"use strict";

/* =========================================================
   SAFETII NET — IDENTITY ISLAND
   IDENTITY FOUNDATIONS ACADEMY

   Game 1: Pieces of Me
   Game 2: Trust Circle
   Game 3: Clue Collector
   Game 4: Identity Impostor Response
========================================================= */

(() => {
  const game =
    window.IdentityGame;

  if (
    !game ||
    !game.state ||
    typeof game.byId !== "function"
  ) {
    console.error(
      "Identity Foundations could not start. Check that identity-core.js loads first."
    );

    return;
  }

  const STORAGE_KEY =
    "safetiiIdentityFoundationsV1";

  const ACADEMY_REWARD = 50;

  const defaultProgress = {
    piecesIndex: 0,
    piecesCorrect: 0,

    trustIndex: 0,
    trustCorrect: 0,

    clueIndex: 0,
    clueCorrect: 0,

    impostorComplete: false,
    academyComplete: false
  };

  let progress =
    readProgress();

  let piecesAnswered = false;
  let trustAnswered = false;

  let selectedClues =
    new Set();

  let responseOrder = [];

  const piecesOfMeItems = [
    {
      text:
        "Jordan loves drawing comic-book heroes.",
      category:
        "expression",
      explanation:
        "Interests and hobbies can help someone express who they are without revealing where they live."
    },

    {
      text:
        "Jordan is in fifth grade.",
      category:
        "personal",
      explanation:
        "A grade level is personal information. It should still be shared thoughtfully."
    },

    {
      text:
        "Jordan attends Lakeview Elementary School.",
      category:
        "private",
      explanation:
        "A school name can reveal where a child may be found."
    },

    {
      text:
        "Jordan’s password is ArtStar2026!",
      category:
        "secret",
      explanation:
        "Passwords must stay secret and should never be posted or shared with friends."
    },

    {
      text:
        "Jordan’s favorite animal is a red panda.",
      category:
        "expression",
      explanation:
        "A favorite animal is generally safe self-expression."
    },

    {
      text:
        "Jordan’s birthday is September 14, 2015.",
      category:
        "private",
      explanation:
        "A complete birthday is identifying information and can also be used in account security questions."
    },

    {
      text:
        "Jordan plays on a neighborhood basketball team.",
      category:
        "personal",
      explanation:
        "This is personal information. It becomes riskier if the team name, location, or practice schedule is included."
    },

    {
      text:
        "Jordan’s one-time login code is 482991.",
      category:
        "secret",
      explanation:
        "Login codes protect accounts and must stay secret, even when someone claims they need the code."
    }
  ];

  const trustCirclePeople = [
    {
      icon: "👩🏽",
      name: "Jordan’s parent",
      description:
        "An approved caregiver helping Jordan with an unsafe message.",
      category:
        "trusted",
      explanation:
        "A parent or approved caregiver belongs in the trusted-adult circle."
    },

    {
      icon: "👨🏻‍🏫",
      name: "Jordan’s teacher",
      description:
        "A teacher Jordan knows at school.",
      category:
        "trusted",
      explanation:
        "A known teacher can help with school-related or online-safety concerns."
    },

    {
      icon: "🧑🏾‍⚕️",
      name: "School counselor",
      description:
        "The counselor works at Jordan’s school and has been introduced by the school.",
      category:
        "trusted",
      explanation:
        "An approved school counselor can be part of a child’s trusted-adult network."
    },

    {
      icon: "👧🏻",
      name: "Classmate Riley",
      description:
        "Jordan knows Riley from science class.",
      category:
        "known",
      explanation:
        "A classmate is someone Jordan knows, but does not automatically need private account information."
    },

    {
      icon: "👦🏽",
      name: "Cousin Malik",
      description:
        "Jordan sees Malik during family events.",
      category:
        "known",
      explanation:
        "A relative may be known, but passwords and login codes should still remain private."
    },

    {
      icon: "🎮",
      name: "DragonMaster77",
      description:
        "A player Jordan met yesterday in an online game.",
      category:
        "unknown",
      explanation:
        "An online-only player is still a stranger, even if the person seems friendly."
    },

    {
      icon: "📱",
      name: "A new follower",
      description:
        "The account says, “We have the same interests! What school do you attend?”",
      category:
        "unknown",
      explanation:
        "A new follower should not receive identifying information."
    },

    {
      icon: "🧑‍💻",
      name: "Game Support Helper",
      description:
        "An unknown account asks Jordan to send a password to fix the game.",
      category:
        "unknown",
      explanation:
        "Legitimate support workers should never ask a child to send a password in a message."
    }
  ];

const clueProfiles = [
  {
    avatar: "⚽",

    name:
      "@GoalGetterMia",

    post:
      "Great practice at Westview Academy! We meet beside the blue gym every Tuesday at 5:30. ⚽",

    clues: [
      {
        label:
          "Favorite sport",

        revealing:
          false
      },

      {
        label:
          "School name",

        revealing:
          true
      },

      {
        label:
          "Weekly schedule",

        revealing:
          true
      },

      {
        label:
          "Exact meeting location",

        revealing:
          true
      },

      {
        label:
          "Soccer emoji",

        revealing:
          false
      },

      {
        label:
          "Team colors",

        revealing:
          false
      }
    ],

    explanation:
      "The school, repeated schedule, and meeting location could help someone find Mia."
  },

  {
    avatar: "🎂",

    name:
      "@JaydenTurns10",

    post:
      "Only three days until my birthday! My party is at 1842 River Street. Everyone come at 2:00!",

    clues: [
      {
        label:
          "Birthday countdown",

        revealing:
          true
      },

      {
        label:
          "Exact home address",

        revealing:
          true
      },

      {
        label:
          "Party time",

        revealing:
          true
      },

      {
        label:
          "Excited feeling",

        revealing:
          false
      },

      {
        label:
          "Cake emoji",

        revealing:
          false
      },

      {
        label:
          "Favorite dessert",

        revealing:
          false
      }
    ],

    explanation:
      "The post reveals Jayden’s approximate birthday, address, and the time people will gather."
  },

  {
    avatar: "📸",

    name:
      "@ArtWithNia",

    post:
      "My newest painting! The photo also shows Nia’s school badge and a street sign reflected in the window.",

    clues: [
      {
        label:
          "Painting",

        revealing:
          false
      },

      {
        label:
          "School badge",

        revealing:
          true
      },

      {
        label:
          "Street-sign reflection",

        revealing:
          true
      },

      {
        label:
          "Favorite hobby",

        revealing:
          false
      },

      {
        label:
          "Photo background",

        revealing:
          true
      },

      {
        label:
          "Paint colors",

        revealing:
          false
      }
    ],

    explanation:
      "Photos can reveal information in badges, reflections, signs, and backgrounds."
  },

  {
    avatar: "✈️",

    name:
      "@FamilyTripKai",

    post:
      "We leave for vacation tonight and will be gone for two whole weeks! Our house will finally be quiet.",

    clues: [
      {
        label:
          "Travel interest",

        revealing:
          false
      },

      {
        label:
          "Departure time",

        revealing:
          true
      },

      {
        label:
          "Length of trip",

        revealing:
          true
      },

      {
        label:
          "Home will be empty",

        revealing:
          true
      },

      {
        label:
          "Airplane emoji",

        revealing:
          false
      },

      {
        label:
          "Vacation excitement",

        revealing:
          false
      }
    ],

    explanation:
      "Posting live travel details can tell people exactly when a family is away from home."
  }
];
  const impostorSteps = [
    {
      id: "stop",
      label:
        "Stop responding to the fake account",
      order: 1
    },

    {
      id: "save",
      label:
        "Save screenshots and account details",
      order: 2
    },

    {
      id: "tell",
      label:
        "Tell a trusted adult",
      order: 3
    },

    {
      id: "block",
      label:
        "Block and report the fake account",
      order: 4
    },

    {
      id: "secure",
      label:
        "Review and secure the real account",
      order: 5
    }
  ];

  function readProgress() {
    try {
      const stored =
        JSON.parse(
          localStorage.getItem(
            STORAGE_KEY
          ) || "null"
        );

      if (
        !stored ||
        typeof stored !== "object"
      ) {
        return {
          ...defaultProgress
        };
      }

      return {
        ...defaultProgress,
        ...stored
      };
    } catch (error) {
      console.error(
        "Could not read Identity Foundations progress:",
        error
      );

      return {
        ...defaultProgress
      };
    }
  }

  function saveProgress() {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(progress)
    );

    if (
      typeof game.saveIdentityProgress ===
      "function"
    ) {
      game.saveIdentityProgress();
    }
  }

  function setFeedback(
    id,
    message,
    correct
  ) {
    const element =
      game.byId(id);

    if (!element) {
      return;
    }

    element.textContent =
      message;

    element.classList.remove(
      "foundation-feedback-correct",
      "foundation-feedback-wrong"
    );

    element.classList.add(
      correct
        ? "foundation-feedback-correct"
        : "foundation-feedback-wrong"
    );
  }

  function disableButtons(selector) {
    document
      .querySelectorAll(selector)
      .forEach((button) => {
        button.disabled = true;
      });
  }

  function enableButtons(selector) {
    document
      .querySelectorAll(selector)
      .forEach((button) => {
        button.disabled = false;

        button.classList.remove(
          "correct-glow",
          "shake"
        );
      });
  }

  /* =====================================================
     GAME 1 — PIECES OF ME
  ===================================================== */

  game.loadPiecesOfMe =
    function loadPiecesOfMe() {
      const item =
        piecesOfMeItems[
          progress.piecesIndex
        ];

      const prompt =
        game.byId(
          "piecesOfMePrompt"
        );

      const counter =
        game.byId(
          "piecesOfMeProgress"
        );

      const feedback =
        game.byId(
          "piecesOfMeFeedback"
        );

      const nextButton =
        game.byId(
          "nextPiecesOfMe"
        );

      if (counter) {
        counter.textContent =
          String(
            progress.piecesIndex
          );
      }

      if (!item) {
        openTrustCircle();
        return;
      }

      if (prompt) {
        prompt.textContent =
          item.text;
      }

      if (feedback) {
        feedback.textContent = "";

        feedback.classList.remove(
          "foundation-feedback-correct",
          "foundation-feedback-wrong"
        );
      }

      if (nextButton) {
        nextButton.classList.add(
          "hidden"
        );
      }

      piecesAnswered = false;

      enableButtons(
        ".pieces-category"
      );

      game.setMemeTip(
        "Decide whether the clue is safe self-expression, personal information, private information, or secret account information.",
        "thinking"
      );
    };

  function answerPiecesOfMe(
    category,
    button
  ) {
    if (piecesAnswered) {
      return;
    }

    const item =
      piecesOfMeItems[
        progress.piecesIndex
      ];

    if (!item) {
      return;
    }

    piecesAnswered = true;

    disableButtons(
      ".pieces-category"
    );

    const correct =
      category ===
      item.category;

    if (correct) {
      progress.piecesCorrect += 1;

      button?.classList.add(
        "correct-glow"
      );

      setFeedback(
        "piecesOfMeFeedback",
        `Correct! ${item.explanation}`,
        true
      );

      game.setMemeTip(
        "Excellent identity judgment!",
        "congrats"
      );
    } else {
      button?.classList.add(
        "shake"
      );

      const correctButton =
        document.querySelector(
          `[data-pieces-category="${item.category}"]`
        );

      correctButton?.classList.add(
        "correct-glow"
      );

      setFeedback(
        "piecesOfMeFeedback",
        `Good try. ${item.explanation}`,
        false
      );

      game.setMemeTip(
        "Read the explanation and remember the difference.",
        "wrong"
      );
    }

    game
      .byId("nextPiecesOfMe")
      ?.classList.remove(
        "hidden"
      );

    saveProgress();
  }

  function nextPiecesOfMe() {
    progress.piecesIndex += 1;

    saveProgress();

    if (
      progress.piecesIndex >=
      piecesOfMeItems.length
    ) {
      openTrustCircle();
      return;
    }

    game.loadPiecesOfMe();
  }

  function openTrustCircle() {
    game.showSection(
      "trustCircleZone"
    );

    game.loadTrustCircle();
  }

  /* =====================================================
     GAME 2 — TRUST CIRCLE
  ===================================================== */

  game.loadTrustCircle =
    function loadTrustCircle() {
      const person =
        trustCirclePeople[
          progress.trustIndex
        ];

      const counter =
        game.byId(
          "trustCircleProgress"
        );

      const feedback =
        game.byId(
          "trustCircleFeedback"
        );

      if (counter) {
        counter.textContent =
          String(
            progress.trustIndex
          );
      }

      if (!person) {
        openClueCollector();
        return;
      }

      const values = {
        trustPersonIcon:
          person.icon,

        trustPersonName:
          person.name,

        trustPersonDescription:
          person.description
      };

      Object.entries(values).forEach(
        ([id, value]) => {
          const element =
            game.byId(id);

          if (element) {
            element.textContent =
              value;
          }
        }
      );

      if (feedback) {
        feedback.textContent = "";

        feedback.classList.remove(
          "foundation-feedback-correct",
          "foundation-feedback-wrong"
        );
      }

      game
        .byId("nextTrustPerson")
        ?.classList.add(
          "hidden"
        );

      trustAnswered = false;

      enableButtons(
        ".trust-choice"
      );

      game.setMemeTip(
        "Knowing someone does not automatically mean they should receive private information.",
        "thinking"
      );
    };

  function answerTrustCircle(
    category,
    button
  ) {
    if (trustAnswered) {
      return;
    }

    const person =
      trustCirclePeople[
        progress.trustIndex
      ];

    if (!person) {
      return;
    }

    trustAnswered = true;

    disableButtons(
      ".trust-choice"
    );

    const correct =
      category ===
      person.category;

    if (correct) {
      progress.trustCorrect += 1;

      button?.classList.add(
        "correct-glow"
      );

      setFeedback(
        "trustCircleFeedback",
        `Correct! ${person.explanation}`,
        true
      );

      game.setMemeTip(
        "You placed that person in the correct trust circle.",
        "congrats"
      );
    } else {
      button?.classList.add(
        "shake"
      );

      const correctButton =
        document.querySelector(
          `[data-trust-choice="${person.category}"]`
        );

      correctButton?.classList.add(
        "correct-glow"
      );

      setFeedback(
        "trustCircleFeedback",
        `Think carefully about what this person truly needs to know. ${person.explanation}`,
        false
      );

      game.setMemeTip(
        "Friendly does not always mean trusted.",
        "wrong"
      );
    }

    game
      .byId("nextTrustPerson")
      ?.classList.remove(
        "hidden"
      );

    saveProgress();
  }

  function nextTrustPerson() {
    progress.trustIndex += 1;

    saveProgress();

    if (
      progress.trustIndex >=
      trustCirclePeople.length
    ) {
      openClueCollector();
      return;
    }

    game.loadTrustCircle();
  }

  function openClueCollector() {
    game.showSection(
      "clueCollectorZone"
    );

    game.loadClueProfile();
  }

  /* =====================================================
     GAME 3 — CLUE COLLECTOR
  ===================================================== */

  game.loadClueProfile =
    function loadClueProfile() {
      const profile =
        clueProfiles[
          progress.clueIndex
        ];

      const counter =
        game.byId(
          "clueCollectorProgress"
        );

      const clueGrid =
        game.byId(
          "clueGrid"
        );

      const feedback =
        game.byId(
          "clueCollectorFeedback"
        );

      if (counter) {
        counter.textContent =
          String(
            progress.clueIndex
          );
      }

      if (!profile) {
        openImpostorGame();
        return;
      }

      const values = {
        clueProfileAvatar:
          profile.avatar,

        clueProfileName:
          profile.name,

        clueProfilePost:
          profile.post
      };

      Object.entries(values).forEach(
        ([id, value]) => {
          const element =
            game.byId(id);

          if (element) {
            element.textContent =
              value;
          }
        }
      );

      selectedClues =
        new Set();

      updateSelectedClueCount();

      if (clueGrid) {
        clueGrid.innerHTML = "";

        profile.clues.forEach(
          (clue, index) => {
            const button =
              document.createElement(
                "button"
              );

            button.type = "button";

            button.className =
              "clue-choice";

            button.dataset.index =
              String(index);

            button.textContent =
              clue.label;

            button.addEventListener(
              "click",
              () => {
                toggleClue(
                  index,
                  button
                );
              }
            );

            clueGrid.appendChild(
              button
            );
          }
        );
      }

      if (feedback) {
        feedback.textContent = "";

        feedback.classList.remove(
          "foundation-feedback-correct",
          "foundation-feedback-wrong"
        );
      }

      game
        .byId("checkClues")
        ?.classList.remove(
          "hidden"
        );

      game
        .byId("nextClueProfile")
        ?.classList.add(
          "hidden"
        );

      game.setMemeTip(
        "One harmless clue may not reveal much, but several clues together can identify or locate someone.",
        "thinking"
      );
    };

  function toggleClue(
    index,
    button
  ) {
    if (
      selectedClues.has(index)
    ) {
      selectedClues.delete(index);

      button.classList.remove(
        "selected-clue"
      );
    } else {
      selectedClues.add(index);

      button.classList.add(
        "selected-clue"
      );
    }

    updateSelectedClueCount();
  }

  function updateSelectedClueCount() {
    const element =
      game.byId(
        "selectedClueCount"
      );

    if (element) {
      element.textContent =
        String(
          selectedClues.size
        );
    }
  }

  function checkClues() {
    const profile =
      clueProfiles[
        progress.clueIndex
      ];

    if (!profile) {
      return;
    }

    const required =
      profile.clues
        .map(
          (clue, index) =>
            clue.revealing
              ? index
              : null
        )
        .filter(
          (index) =>
            index !== null
        );

    const correct =
      selectedClues.size ===
        required.length &&
      required.every(
        (index) =>
          selectedClues.has(index)
      );

    document
      .querySelectorAll(
        ".clue-choice"
      )
      .forEach(
        (button, index) => {
          button.disabled = true;

          if (
            profile.clues[index]
              .revealing
          ) {
            button.classList.add(
              "correct-clue"
            );
          } else if (
            selectedClues.has(index)
          ) {
            button.classList.add(
              "incorrect-clue"
            );
          }
        }
      );

    if (correct) {
      progress.clueCorrect += 1;

      setFeedback(
        "clueCollectorFeedback",
        `Excellent investigation! ${profile.explanation}`,
        true
      );

      game.setMemeTip(
        "You connected the clues like a real identity investigator!",
        "congrats"
      );
    } else {
      setFeedback(
        "clueCollectorFeedback",
        `Review the highlighted clues. ${profile.explanation}`,
        false
      );

      game.setMemeTip(
        "Look beyond the main post. Background details can reveal information too.",
        "wrong"
      );
    }

    game
      .byId("checkClues")
      ?.classList.add(
        "hidden"
      );

    game
      .byId("nextClueProfile")
      ?.classList.remove(
        "hidden"
      );

    saveProgress();
  }

  function nextClueProfile() {
    progress.clueIndex += 1;

    saveProgress();

    if (
      progress.clueIndex >=
      clueProfiles.length
    ) {
      openImpostorGame();
      return;
    }

    game.loadClueProfile();
  }

  function openImpostorGame() {
    game.showSection(
      "impostorZone"
    );

    game.loadImpostorGame();
  }

  /* =====================================================
     GAME 4 — IDENTITY IMPOSTOR RESPONSE
  ===================================================== */

  game.loadImpostorGame =
    function loadImpostorGame() {
      const bank =
        game.byId(
          "responseStepBank"
        );

      if (!bank) {
        return;
      }

      responseOrder = [];

      bank.innerHTML = "";

      game
        .shuffleItems(
          impostorSteps
        )
        .forEach((step) => {
          const button =
            document.createElement(
              "button"
            );

          button.type = "button";

          button.className =
            "response-step";

          button.dataset.stepId =
            step.id;

          button.textContent =
            step.label;

          button.addEventListener(
            "click",
            () => {
              addResponseStep(
                step,
                button
              );
            }
          );

          bank.appendChild(
            button
          );
        });

      updateResponseOrder();

      const feedback =
        game.byId(
          "impostorFeedback"
        );

      if (feedback) {
        feedback.textContent = "";

        feedback.classList.remove(
          "foundation-feedback-correct",
          "foundation-feedback-wrong"
        );
      }

      game
        .byId(
          "finishFoundationAcademy"
        )
        ?.classList.add(
          "hidden"
        );

      game.setMemeTip(
        "Do not argue with an impostor. Stop, save evidence, tell a trusted adult, report the account, and secure the real account.",
        "thinking"
      );
    };

  function addResponseStep(
    step,
    button
  ) {
    if (
      responseOrder.some(
        (item) =>
          item.id === step.id
      )
    ) {
      return;
    }

    responseOrder.push(step);

    button.disabled = true;

    button.classList.add(
      "used-response-step"
    );

    updateResponseOrder();
  }

  function updateResponseOrder() {
    const list =
      game.byId(
        "responseOrderList"
      );

    const counter =
      game.byId(
        "impostorProgress"
      );

    const checkButton =
      game.byId(
        "checkResponseOrder"
      );

    if (counter) {
      counter.textContent =
        String(
          responseOrder.length
        );
    }

    if (checkButton) {
      checkButton.disabled =
        responseOrder.length !==
        impostorSteps.length;
    }

    if (!list) {
      return;
    }

    if (
      responseOrder.length === 0
    ) {
      list.innerHTML = `
        <p class="empty-response-message">
          Select the five steps in the safest order.
        </p>
      `;

      return;
    }

    list.innerHTML =
      responseOrder
        .map(
          (step, index) => `
            <div class="ordered-response-step">
              <span>
                ${index + 1}
              </span>

              <p>
                ${step.label}
              </p>
            </div>
          `
        )
        .join("");
  }

  function clearResponseOrder() {
    responseOrder = [];

    document
      .querySelectorAll(
        ".response-step"
      )
      .forEach((button) => {
        button.disabled = false;

        button.classList.remove(
          "used-response-step"
        );
      });

    updateResponseOrder();

    const feedback =
      game.byId(
        "impostorFeedback"
      );

    if (feedback) {
      feedback.textContent = "";
    }
  }

  function checkResponseOrder() {
    const correct =
      responseOrder.every(
        (step, index) =>
          step.order ===
          index + 1
      );

    if (correct) {
      progress.impostorComplete =
        true;

      progress.academyComplete =
        true;

      setFeedback(
        "impostorFeedback",
        "Mission response complete! Stop, save evidence, tell a trusted adult, block and report, then secure the real account.",
        true
      );

      awardAcademyPoints();

      game
        .byId(
          "finishFoundationAcademy"
        )
        ?.classList.remove(
          "hidden"
        );

      game.setMemeTip(
        "You completed Identity Foundations Academy and earned 50 points!",
        "congrats"
      );

      disableButtons(
        ".response-step"
      );
    } else {
      setFeedback(
        "impostorFeedback",
        "Those are the right actions, but the order needs work. Start by stopping contact and saving evidence before blocking the account.",
        false
      );

      game.setMemeTip(
        "Evidence may disappear after an account is blocked. Save it first.",
        "wrong"
      );
    }

    saveProgress();
  }

  function awardAcademyPoints() {
    const rewardKey =
      "identityFoundationsRewardAwarded";

    if (
      localStorage.getItem(
        rewardKey
      ) === "true"
    ) {
      return;
    }

    const currentPoints =
      Number(
        localStorage.getItem(
          "safetiiPoints"
        ) || "0"
      );

    const safePoints =
      Number.isFinite(
        currentPoints
      )
        ? currentPoints
        : 0;

    localStorage.setItem(
      "safetiiPoints",
      String(
        safePoints +
          ACADEMY_REWARD
      )
    );

    localStorage.setItem(
      rewardKey,
      "true"
    );

    if (
      typeof game
        .updateMissionPointsDisplay ===
      "function"
    ) {
      game.updateMissionPointsDisplay();
    }
  }

  function finishFoundationAcademy() {
    game.showSection(
      "usernameZone"
    );

    const generateButton =
      game.byId(
        "generateUsername"
      );

    if (generateButton) {
      generateButton.disabled = false;

      generateButton.classList.remove(
        "locked-action"
      );

      generateButton.setAttribute(
        "aria-disabled",
        "false"
      );
    }

    game.setMemeTip(
      "Identity Foundations complete! Now use what you learned to scan safe and unsafe usernames.",
      "welcome"
    );

    saveProgress();
  }

  /* =====================================================
     OVERRIDE THE OLD EXPLORE → USERNAME TRANSITION
  ===================================================== */

  game.openUsernameLab =
    function openUsernameLab() {
      if (
        game.state
          .foundObjects.size < 6
      ) {
        game.setMemeTip(
          `Find all six learning objects first. You found ${game.state.foundObjects.size}.`,
          "thinking"
        );

        return;
      }

      if (
        progress.academyComplete
      ) {
        finishFoundationAcademy();
        return;
      }

      game.showSection(
        "piecesOfMeZone"
      );

      game.loadPiecesOfMe();
    };

  /* =====================================================
     EVENT LISTENERS
  ===================================================== */

  function handleFoundationClick(
    event
  ) {
    const piecesButton =
      event.target.closest(
        ".pieces-category"
      );

    if (piecesButton) {
      answerPiecesOfMe(
        piecesButton.dataset
          .piecesCategory,
        piecesButton
      );

      return;
    }

    if (
      event.target.closest(
        "#nextPiecesOfMe"
      )
    ) {
      nextPiecesOfMe();
      return;
    }

    const trustButton =
      event.target.closest(
        ".trust-choice"
      );

    if (trustButton) {
      answerTrustCircle(
        trustButton.dataset
          .trustChoice,
        trustButton
      );

      return;
    }

    if (
      event.target.closest(
        "#nextTrustPerson"
      )
    ) {
      nextTrustPerson();
      return;
    }

    if (
      event.target.closest(
        "#checkClues"
      )
    ) {
      checkClues();
      return;
    }

    if (
      event.target.closest(
        "#nextClueProfile"
      )
    ) {
      nextClueProfile();
      return;
    }

    if (
      event.target.closest(
        "#clearResponseOrder"
      )
    ) {
      clearResponseOrder();
      return;
    }

    if (
      event.target.closest(
        "#checkResponseOrder"
      )
    ) {
      checkResponseOrder();
      return;
    }

    if (
      event.target.closest(
        "#finishFoundationAcademy"
      )
    ) {
      finishFoundationAcademy();
    }
  }

  function restoreVisibleFoundation() {
    const visibleSection =
      [
        "piecesOfMeZone",
        "trustCircleZone",
        "clueCollectorZone",
        "impostorZone"
      ].find((id) => {
        const section =
          game.byId(id);

        return (
          section &&
          !section.classList.contains(
            "hidden"
          )
        );
      });

    if (
      visibleSection ===
      "piecesOfMeZone"
    ) {
      game.loadPiecesOfMe();
    }

    if (
      visibleSection ===
      "trustCircleZone"
    ) {
      game.loadTrustCircle();
    }

    if (
      visibleSection ===
      "clueCollectorZone"
    ) {
      game.loadClueProfile();
    }

    if (
      visibleSection ===
      "impostorZone"
    ) {
      game.loadImpostorGame();
    }
  }

  document.addEventListener(
    "click",
    handleFoundationClick
  );

  window.setTimeout(
    restoreVisibleFoundation,
    300
  );

  game.identityFoundationsReady =
    true;

  console.log(
    "Identity Foundations Academy loaded successfully."
  );
})();
