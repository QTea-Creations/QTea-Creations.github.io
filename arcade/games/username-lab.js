"use strict";

/* =========================================================
   SAFETII NET — CYBER ARCADE
   USERNAME LAB
========================================================= */

(() => {
  const arcade =
    window.SafetiiArcade;

  if (!arcade) {
    console.error(
      "SafetiiArcade is missing. Load arcade-score.js first."
    );

    return;
  }

  const heatNames = {
    mild: "Mild",
    spicy: "Spicy",
    hot: "Hot"
  };

  const verdictNames = {
    safe: "Safe Choice",
    caution: "Use Caution",
    unsafe: "Unsafe Choice"
  };

  /* =====================================================
     USERNAME QUESTION BANKS
  ===================================================== */

  const usernamesByHeat = {
    mild: [
      {
        id: "mild-cosmic-tiger",
        avatar: "🎮",
        name: "Jordan",
        context:
          "Jordan is creating a public gaming account.",
        username:
          "CosmicTiger",
        clues: [
          "Creative space word",
          "Favorite animal",
          "No personal information"
        ],
        verdict: "safe",
        explanation:
          "This username is creative and does not reveal Jordan’s real name, age, school, location, birthday, or contact information."
      },

      {
        id: "mild-full-name",
        avatar: "🎨",
        name: "Maya",
        context:
          "Maya is creating a public art account.",
        username:
          "MayaJohnson",
        clues: [
          "First name",
          "Last name",
          "Public account"
        ],
        verdict: "unsafe",
        explanation:
          "Using both a first and last name can make it much easier for strangers to identify Maya."
      },

      {
        id: "mild-blue-panda",
        avatar: "🐼",
        name: "Eli",
        context:
          "Eli needs a username for a puzzle game.",
        username:
          "BluePandaQuest",
        clues: [
          "Favorite color",
          "Favorite animal",
          "Creative game word"
        ],
        verdict: "safe",
        explanation:
          "The username uses broad interests and does not contain identifying information."
      },

      {
        id: "mild-birth-year",
        avatar: "⚽",
        name: "Noah",
        context:
          "Noah wants a username for a public sports page.",
        username:
          "Noah2014",
        clues: [
          "First name",
          "Possible birth year",
          "Approximate age"
        ],
        verdict: "unsafe",
        explanation:
          "The name and likely birth year can reveal Noah’s identity and approximate age."
      },

      {
        id: "mild-dance-star",
        avatar: "💃",
        name: "Ava",
        context:
          "Ava is creating an account to watch dance videos.",
        username:
          "DanceStarGlow",
        clues: [
          "Dance interest",
          "Creative words",
          "No location details"
        ],
        verdict: "safe",
        explanation:
          "This username reflects an interest without exposing Ava’s real name, school, age, or address."
      },

      {
        id: "mild-school-name",
        avatar: "📚",
        name: "Lena",
        context:
          "Lena is joining a public reading forum.",
        username:
          "ParkviewLena",
        clues: [
          "Possible school name",
          "First name",
          "Public forum"
        ],
        verdict: "unsafe",
        explanation:
          "Combining Lena’s name with a school name may reveal where she can regularly be found."
      },

      {
        id: "mild-random-number",
        avatar: "🚀",
        name: "Zuri",
        context:
          "Zuri is creating a science-game profile.",
        username:
          "RocketOtter57",
        clues: [
          "Space interest",
          "Favorite animal",
          "Random number"
        ],
        verdict: "safe",
        explanation:
          "A random number is fine when it is not connected to an age, birthday, address, phone number, or team number."
      },

      {
        id: "mild-exact-age",
        avatar: "🎧",
        name: "Cam",
        context:
          "Cam is joining a public music community.",
        username:
          "CamAge11",
        clues: [
          "First name",
          "Exact age",
          "Public community"
        ],
        verdict: "unsafe",
        explanation:
          "The username directly tells strangers Cam’s name and exact age."
      }
    ],

    spicy: [
      {
        id: "spicy-team-number",
        avatar: "🏐",
        name: "Nia",
        context:
          "Nia is creating an account for sports highlights.",
        username:
          "LightningNumber14",
        clues: [
          "Team name",
          "Jersey number",
          "Player may be identifiable"
        ],
        verdict: "caution",
        explanation:
          "The username does not include Nia’s name, but a team name combined with a jersey number may identify a specific player."
      },

      {
        id: "spicy-city-name",
        avatar: "🎸",
        name: "Ben",
        context:
          "Ben is joining a public music server.",
        username:
          "DetroitGuitarKid",
        clues: [
          "City",
          "Music interest",
          "Signals that user is a child"
        ],
        verdict: "caution",
        explanation:
          "The username does not reveal an exact address, but it exposes a city and tells strangers that Ben may be a child."
      },

      {
        id: "spicy-fictional-name",
        avatar: "🐉",
        name: "Kiara",
        context:
          "Kiara wants a username for a fantasy game.",
        username:
          "MoonDragonKeeper",
        clues: [
          "Fictional theme",
          "Creative title",
          "No personal details"
        ],
        verdict: "safe",
        explanation:
          "The username is imaginative and does not reveal Kiara’s identity, age, location, or school."
      },

      {
        id: "spicy-school-mascot",
        avatar: "🏫",
        name: "Omar",
        context:
          "Omar is joining a public coding forum.",
        username:
          "RooseveltEagleCoder",
        clues: [
          "Possible school name",
          "School mascot",
          "Coding interest"
        ],
        verdict: "unsafe",
        explanation:
          "A school name and mascot together can strongly reveal where Omar attends school."
      },

      {
        id: "spicy-initials-year",
        avatar: "📸",
        name: "Rosa Martinez",
        context:
          "Rosa is creating a public photography profile.",
        username:
          "RM_Photos2013",
        clues: [
          "Possible initials",
          "Possible birth year",
          "Creative interest"
        ],
        verdict: "caution",
        explanation:
          "Initials and a likely birth year may help people connect the account to Rosa and estimate her age."
      },

      {
        id: "spicy-food-animal",
        avatar: "🍕",
        name: "Dev",
        context:
          "Dev needs a username for an online building game.",
        username:
          "PizzaFoxBuilder",
        clues: [
          "Favorite food",
          "Favorite animal",
          "Game interest"
        ],
        verdict: "safe",
        explanation:
          "These are broad preferences and do not reveal identifying information."
      },

      {
        id: "spicy-neighborhood",
        avatar: "🛹",
        name: "Malik",
        context:
          "Malik wants a username for a public skateboarding page.",
        username:
          "OakParkSkater",
        clues: [
          "Possible neighborhood",
          "Regular activity",
          "Location clue"
        ],
        verdict: "caution",
        explanation:
          "The username may reveal the neighborhood or park where Malik regularly spends time."
      },

      {
        id: "spicy-phone-ending",
        avatar: "🎮",
        name: "Ari",
        context:
          "Ari is creating an account for online competitions.",
        username:
          "PixelHero7719",
        clues: [
          "Creative gaming words",
          "Four-digit number",
          "Could match phone information"
        ],
        verdict: "caution",
        explanation:
          "The words are safe, but people should avoid using numbers connected to phone numbers, birthdays, PINs, or addresses."
      }
    ],

    hot: [
      {
        id: "hot-name-school-year",
        avatar: "🤖",
        name: "Cam Rivera",
        context:
          "Cam is creating a public robotics account.",
        username:
          "CamRiveraLincoln2013",
        clues: [
          "Full name",
          "Possible school",
          "Possible birth year"
        ],
        verdict: "unsafe",
        explanation:
          "The username combines a full name, possible school, and likely birth year, making Cam highly identifiable."
      },

      {
        id: "hot-team-combination",
        avatar: "🏀",
        name: "Jordan",
        context:
          "Jordan wants to share basketball clips publicly.",
        username:
          "WestsideWolves23",
        clues: [
          "Team or school name",
          "Jersey number",
          "Player identity can be narrowed down"
        ],
        verdict: "unsafe",
        explanation:
          "A team name and jersey number can identify the exact player even without using Jordan’s name."
      },

      {
        id: "hot-random-safe",
        avatar: "🌌",
        name: "Maya",
        context:
          "Maya wants a username for an astronomy club forum.",
        username:
          "NebulaKoalaOrbit",
        clues: [
          "Space theme",
          "Animal",
          "No personal information"
        ],
        verdict: "safe",
        explanation:
          "This username is creative and unrelated to Maya’s real identity or location."
      },

      {
        id: "hot-street-house",
        avatar: "🏠",
        name: "Eli",
        context:
          "Eli is creating a neighborhood gaming account.",
        username:
          "RiverStreet1842",
        clues: [
          "Street name",
          "House number",
          "Possible exact address"
        ],
        verdict: "unsafe",
        explanation:
          "The street and house number may reveal Eli’s exact home address."
      },

      {
        id: "hot-first-name-routine",
        avatar: "🩰",
        name: "Ava",
        context:
          "Ava is creating an account for dance videos.",
        username:
          "AvaDanceThurs6",
        clues: [
          "First name",
          "Activity",
          "Weekly day and time"
        ],
        verdict: "unsafe",
        explanation:
          "The username reveals Ava’s name, regular activity, and predictable weekly schedule."
      },

      {
        id: "hot-subtle-initials",
        avatar: "🎨",
        name: "Lena Smith",
        context:
          "Lena wants a username for a digital art portfolio.",
        username:
          "LS_ArtStudio",
        clues: [
          "Possible initials",
          "Creative interest",
          "No exact location or age"
        ],
        verdict: "caution",
        explanation:
          "The username is not immediately unsafe, but initials may make the account easier to connect to Lena when combined with profile details."
      },

      {
        id: "hot-password-like",
        avatar: "🔐",
        name: "Noah",
        context:
          "Noah wants to reuse something memorable as a username.",
        username:
          "BlueTiger9",
        clues: [
          "Looks creative",
          "Matches part of a school login",
          "May help someone guess a password"
        ],
        verdict: "unsafe",
        explanation:
          "A username should not reuse a password, recovery answer, or recognizable part of login credentials."
      },

      {
        id: "hot-general-safe",
        avatar: "🧩",
        name: "Zuri",
        context:
          "Zuri needs a username for a public puzzle community.",
        username:
          "PuzzleCometFox",
        clues: [
          "Puzzle interest",
          "Space word",
          "Animal word"
        ],
        verdict: "safe",
        explanation:
          "This username uses broad, imaginative interests without revealing identifying details."
      }
    ]
  };

  let selectedHeat =
    "mild";

  let activeUsernames =
    [];

  let currentQuestionIndex =
    0;

  let correctAnswers =
    0;

  let answerLocked =
    false;

  /* =====================================================
     HELPERS
  ===================================================== */

  function byId(id) {
    return document.getElementById(id);
  }

  function setText(id, value) {
    const element =
      byId(id);

    if (element) {
      element.textContent =
        String(value);
    }
  }

  function getCurrentUsername() {
    return activeUsernames[
      currentQuestionIndex
    ];
  }

  function getPointValue() {
    const fallbackPoints = {
      mild: 10,
      spicy: 20,
      hot: 30
    };

    return (
      arcade.HEAT_LEVELS?.[
        selectedHeat
      ]?.pointsPerCorrect ||
      fallbackPoints[
        selectedHeat
      ] ||
      10
    );
  }

  function showScreen(screenId) {
    [
      "introScreen",
      "playScreen",
      "resultScreen"
    ].forEach((id) => {
      byId(id)?.classList.add(
        "hidden"
      );
    });

    byId(screenId)?.classList.remove(
      "hidden"
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  function updateGlobalPoints() {
    setText(
      "globalPoints",
      arcade.getGlobalPoints()
    );
  }

  function closeHint() {
    byId("usernameHintPanel")
      ?.classList.add(
        "hidden"
      );

    byId("openUsernameHint")
      ?.setAttribute(
        "aria-expanded",
        "false"
      );
  }

  function hideReaction() {
    const reaction =
      byId("memeReaction");

    reaction?.classList.add(
      "hidden"
    );

    reaction?.classList.remove(
      "show-reaction",
      "correct-reaction",
      "wrong-reaction"
    );
  }

  /* =====================================================
     HEAT SELECTION
  ===================================================== */

  document
    .querySelectorAll(
      ".heat-choice"
    )
    .forEach((button) => {
      button.addEventListener(
        "click",
        () => {
          selectedHeat =
            button.dataset.heat ||
            "mild";

          document
            .querySelectorAll(
              ".heat-choice"
            )
            .forEach(
              (heatButton) => {
                heatButton.classList.toggle(
                  "selected",
                  heatButton === button
                );
              }
            );
        }
      );
    });

  /* =====================================================
     HINT PANEL
  ===================================================== */

  byId("openUsernameHint")
    ?.addEventListener(
      "click",
      () => {
        const panel =
          byId("usernameHintPanel");

        const isOpening =
          panel?.classList.contains(
            "hidden"
          );

        panel?.classList.toggle(
          "hidden"
        );

        byId("openUsernameHint")
          ?.setAttribute(
            "aria-expanded",
            isOpening
              ? "true"
              : "false"
          );
      }
    );

  byId("closeUsernameHint")
    ?.addEventListener(
      "click",
      closeHint
    );

  /* =====================================================
     START GAME
  ===================================================== */

  function startGame() {
    try {
      activeUsernames =
        usernamesByHeat[
          selectedHeat
        ] ||
        usernamesByHeat.mild;

      currentQuestionIndex =
        0;

      correctAnswers =
        0;

      answerLocked =
        false;

      arcade.startRound({
        gameId:
          `username-lab-${selectedHeat}`,

        gameName:
          `Username Lab ${
            heatNames[
              selectedHeat
            ]
          }`,

        heatLevel:
          selectedHeat,

        questionCount:
          activeUsernames.length
      });

      setText(
        "questionTotal",
        activeUsernames.length
      );

      setText(
        "currentHeat",
        heatNames[
          selectedHeat
        ]
      );

      setText(
        "questionPointValue",
        getPointValue()
      );

      showScreen(
        "playScreen"
      );

      loadQuestion();
    } catch (error) {
      console.error(
        "Username Lab could not start:",
        error
      );

      alert(
        `Username Lab could not start: ${error.message}`
      );
    }
  }

  const startButton =
    byId("startGame");

  if (startButton) {
    startButton.dataset
      .usernameLabConnected =
      "true";

    startButton.addEventListener(
      "click",
      startGame
    );
  } else {
    console.error(
      "Username Lab start button was not found."
    );
  }

  /* =====================================================
     LOAD QUESTION
  ===================================================== */

  function loadQuestion() {
    const usernameCase =
      getCurrentUsername();

    if (!usernameCase) {
      finishGame();
      return;
    }

    answerLocked =
      false;

    closeHint();
    hideReaction();

    setText(
      "questionNumber",
      currentQuestionIndex + 1
    );

    setText(
      "profileAvatar",
      usernameCase.avatar
    );

    setText(
      "profileName",
      `${usernameCase.name} needs a username.`
    );

    setText(
      "profileContext",
      usernameCase.context
    );

    setText(
      "usernameDisplay",
      usernameCase.username
    );

    setText(
      "usernameClueOne",
      usernameCase.clues[0] || ""
    );

    setText(
      "usernameClueTwo",
      usernameCase.clues[1] || ""
    );

    setText(
      "usernameClueThree",
      usernameCase.clues[2] || ""
    );

    const progress =
      (
        currentQuestionIndex /
        activeUsernames.length
      ) * 100;

    const progressFill =
      byId("questionProgressFill");

    if (progressFill) {
      progressFill.style.width =
        `${progress}%`;
    }

    byId("answerFeedback")
      ?.classList.add(
        "hidden"
      );

    byId("nextQuestion")
      ?.classList.add(
        "hidden"
      );

    document
      .querySelectorAll(
        ".username-answer-choice"
      )
      .forEach((button) => {
        button.disabled =
          false;

        button.classList.remove(
          "correct-answer",
          "wrong-answer",
          "reveal-correct-answer"
        );
      });

    updateLiveStats();
  }

  /* =====================================================
     ANSWERS
  ===================================================== */

  function answerQuestion(button) {
    if (answerLocked) {
      return;
    }

    const usernameCase =
      getCurrentUsername();

    if (!usernameCase) {
      return;
    }

    answerLocked =
      true;

    const selectedVerdict =
      button.dataset.verdict;

    const correct =
      selectedVerdict ===
      usernameCase.verdict;

    const scoreResult =
      arcade.answerQuestion({
        questionId:
          usernameCase.id,

        correct
      });

    if (correct) {
      correctAnswers += 1;
    }

    document
      .querySelectorAll(
        ".username-answer-choice"
      )
      .forEach(
        (answerButton) => {
          answerButton.disabled =
            true;

          const verdict =
            answerButton.dataset.verdict;

          if (
            verdict ===
            usernameCase.verdict
          ) {
            answerButton.classList.add(
              correct
                ? "correct-answer"
                : "reveal-correct-answer"
            );
          }

          if (
            answerButton === button &&
            !correct
          ) {
            answerButton.classList.add(
              "wrong-answer"
            );
          }
        }
      );

    if (correct) {
      setText(
        "feedbackTitle",
        "Experiment successful!"
      );

      setText(
        "feedbackText",
        `${verdictNames[
          usernameCase.verdict
        ]} is correct. ${usernameCase.explanation}`
      );
    } else {
      setText(
        "feedbackTitle",
        "Review the username ingredients."
      );

      setText(
        "feedbackText",
        `The best verdict is ${
          verdictNames[
            usernameCase.verdict
          ]
        }. ${usernameCase.explanation}`
      );
    }

    setText(
      "pointsEarnedThisQuestion",
      scoreResult.pointsEarned
    );

    byId("answerFeedback")
      ?.classList.remove(
        "hidden"
      );

    const nextButton =
      byId("nextQuestion");

    if (nextButton) {
      nextButton.textContent =
        currentQuestionIndex ===
        activeUsernames.length - 1
          ? "See Results"
          : "Next Experiment";

      nextButton.classList.remove(
        "hidden"
      );
    }

    showReaction({
      correct,
      points:
        scoreResult.pointsEarned,
      correctVerdict:
        verdictNames[
          usernameCase.verdict
        ]
    });

    updateLiveStats();
  }

  document
    .querySelectorAll(
      ".username-answer-choice"
    )
    .forEach((button) => {
      button.addEventListener(
        "click",
        () => {
          answerQuestion(
            button
          );
        }
      );
    });

  /* =====================================================
     MEME REACTION
  ===================================================== */

  function showReaction({
    correct,
    points,
    correctVerdict
  }) {
    const reaction =
      byId("memeReaction");

    const image =
      byId("memeReactionImage");

    if (!reaction || !image) {
      return;
    }

    reaction.classList.remove(
      "hidden",
      "show-reaction",
      "correct-reaction",
      "wrong-reaction"
    );

    void reaction.offsetWidth;

    reaction.classList.add(
      "show-reaction",
      correct
        ? "correct-reaction"
        : "wrong-reaction"
    );

    if (correct) {
      image.src =
        "../../assets/mascot/congrats.png";

      image.alt =
        "Meme celebrates a safe username analysis";

      setText(
        "memeReactionTitle",
        "Identity protected!"
      );

      setText(
        "memeReactionMessage",
        `Excellent analysis! You earned ${points} points.`
      );
    } else {
      image.src =
        "../../assets/mascot/wrong.png";

      image.alt =
        "Meme encourages the player to review the username";

      setText(
        "memeReactionTitle",
        "Check every ingredient."
      );

      setText(
        "memeReactionMessage",
        `The best verdict is ${correctVerdict}.`
      );
    }
  }

  /* =====================================================
     NEXT QUESTION
  ===================================================== */

  function nextQuestion() {
    if (!answerLocked) {
      return;
    }

    currentQuestionIndex += 1;

    if (
      currentQuestionIndex >=
      activeUsernames.length
    ) {
      finishGame();
      return;
    }

    loadQuestion();
  }

  byId("nextQuestion")
    ?.addEventListener(
      "click",
      nextQuestion
    );

  /* =====================================================
     LIVE STATS
  ===================================================== */

  function updateLiveStats() {
    const round =
      arcade.getCurrentRound();

    setText(
      "currentScore",
      round.score || 0
    );

    setText(
      "correctCount",
      correctAnswers
    );

    updateGlobalPoints();
  }

  /* =====================================================
     RESULTS
  ===================================================== */

  function starsToText(starCount) {
    const stars =
      Math.max(
        0,
        Math.min(
          3,
          Number(starCount) || 0
        )
      );

    return (
      "★".repeat(stars) +
      "☆".repeat(3 - stars)
    );
  }

  function finishGame() {
    hideReaction();
    closeHint();

    const progressFill =
      byId("questionProgressFill");

    if (progressFill) {
      progressFill.style.width =
        "100%";
    }

    const result =
      arcade.finishRound();

    setText(
      "finalScore",
      result.score
    );

    setText(
      "maximumScore",
      result.maximumScore
    );

    setText(
      "finalAccuracy",
      `${result.accuracy}%`
    );

    setText(
      "finalCorrect",
      `${correctAnswers}/${activeUsernames.length}`
    );

    setText(
      "bestScore",
      result.newBest
    );

    setText(
      "globalPointsEarned",
      `+${result.globalPointsEarned}`
    );

    setText(
      "finalStars",
      starsToText(
        result.stars
      )
    );

    let message =
      "Keep checking usernames for names, ages, schools, locations, routines, and account information.";

    if (
      result.accuracy === 100
    ) {
      message =
        "Perfect experiment! You identified every safe, questionable, and unsafe username.";
    } else if (
      result.accuracy >= 75
    ) {
      message =
        "Excellent work! You noticed most of the hidden identity clues inside the usernames.";
    } else if (
      result.accuracy >= 50
    ) {
      message =
        "Good effort. Remember that several small clues can combine to reveal someone’s identity.";
    }

    setText(
      "resultMessage",
      message
    );

    updateGlobalPoints();
    showScreen(
      "resultScreen"
    );
  }

  byId("playAgain")
    ?.addEventListener(
      "click",
      () => {
        hideReaction();
        closeHint();

        showScreen(
          "introScreen"
        );
      }
    );

  updateGlobalPoints();

  console.log(
    "Username Lab loaded successfully."
  );
})();
