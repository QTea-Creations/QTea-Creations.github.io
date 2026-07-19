"use strict";

/* =========================================================
   SAFETII NET — CYBER ARCADE
   CLUE COLLECTOR: SOCIAL MEDIA EDITION
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

  const profiles = [
    {
      id: "instagram-mia",

      platformHeading:
        "Mia posted this on Instagram.",

      riskyClues: [
        "username",
        "location",
        "school-logo",
        "practice-time",
        "caption-name",
        "schedule",
        "meeting-place",
        "friend-comment"
      ],

      clues: {
        username: {
          title:
            "Identifying username",

          risky: true,

          explanation:
            "The username combines Mia’s name, school, and possible age. That can help someone identify her."
        },

        location: {
          title:
            "School location tag",

          risky: true,

          explanation:
            "Tagging the school reveals where Mia regularly spends time."
        },

        "school-logo": {
          title:
            "School logo",

          risky: true,

          explanation:
            "A visible school logo can identify where Mia attends school, even when the caption does not say it."
        },

        "practice-time": {
          title:
            "Practice schedule",

          risky: true,

          explanation:
            "The sign reveals the exact day and time Mia can regularly be found."
        },

        "soccer-ball": {
          title:
            "Soccer ball",

          risky: false,

          explanation:
            "Liking soccer is a broad interest and is usually safe to share."
        },

        "like-button": {
          title:
            "Like button",

          risky: false,

          explanation:
            "The like icon itself does not reveal private information."
        },

        "caption-name": {
          title:
            "Username repeated in caption",

          risky: true,

          explanation:
            "The username still contains identifying details even when it appears in the caption."
        },

        schedule: {
          title:
            "Weekly schedule",

          risky: true,

          explanation:
            "A repeated weekly schedule tells strangers when Mia may be at a specific place."
        },

        "meeting-place": {
          title:
            "Exact meeting place",

          risky: true,

          explanation:
            "Saying which gym to meet beside gives a precise location."
        },

        "favorite-sport": {
          title:
            "Favorite sport",

          risky: false,

          explanation:
            "A favorite sport is general self-expression and does not directly identify or locate Mia."
        },

        "friend-comment": {
          title:
            "Confirming comment",

          risky: true,

          explanation:
            "The comment confirms that the event will happen again next week, making the schedule more believable."
        }
      }
    }
  ];

  let selectedHeat =
    "mild";

  let currentProfileIndex =
    0;

  let selectedClues =
    new Set();

  let answersChecked =
    false;

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

  function showScreen(
    screenId
  ) {
    [
      "introScreen",
      "playScreen",
      "resultScreen"
    ].forEach((id) => {
      byId(id)?.classList.add(
        "hidden"
      );
    });

    byId(screenId)
      ?.classList.remove(
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

  /* =====================================================
     HEAT
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
     HINT
  ===================================================== */

  function closeHint() {
    byId(
      "clueHintPanel"
    )?.classList.add(
      "hidden"
    );
  }

  byId(
    "openClueHint"
  )?.addEventListener(
    "click",
    () => {
      byId(
        "clueHintPanel"
      )?.classList.toggle(
        "hidden"
      );
    }
  );

  byId(
    "closeClueHint"
  )?.addEventListener(
    "click",
    closeHint
  );

  /* =====================================================
     START
  ===================================================== */

  function startGame() {
    currentProfileIndex =
      0;

    arcade.startRound({
      gameId:
        "clue-collector",

      gameName:
        "Clue Collector",

      heatLevel:
        selectedHeat,

      questionCount:
        profiles.length
    });

    setText(
      "profileTotal",
      profiles.length
    );

    setText(
      "currentHeat",
      heatNames[
        selectedHeat
      ] || "Mild"
    );

    setText(
      "questionPointValue",
      arcade.HEAT_LEVELS[
        selectedHeat
      ].pointsPerCorrect
    );

    showScreen(
      "playScreen"
    );

    loadProfile();
  }

  byId(
    "startGame"
  )?.addEventListener(
    "click",
    startGame
  );

  /* =====================================================
     LOAD PROFILE
  ===================================================== */

  function loadProfile() {
    const profile =
      profiles[
        currentProfileIndex
      ];

    if (!profile) {
      finishGame();
      return;
    }

    selectedClues =
      new Set();

    answersChecked =
      false;

    closeHint();
    closeExplanation();

    setText(
      "profileNumber",
      currentProfileIndex + 1
    );

    setText(
      "platformHeading",
      profile.platformHeading
    );

    setText(
      "selectedClueCount",
      0
    );

    const progress =
      (
        currentProfileIndex /
        profiles.length
      ) * 100;

    const progressFill =
      byId(
        "questionProgressFill"
      );

    if (progressFill) {
      progressFill.style.width =
        `${progress}%`;
    }

    document
      .querySelectorAll(
        "[data-clue-id]"
      )
      .forEach((hotspot) => {
        hotspot.disabled =
          false;

        hotspot.classList.remove(
          "selected-clue",
          "correct-clue",
          "incorrect-clue",
          "missed-clue",
          "review-ready"
        );
      });

    byId(
      "checkAnswers"
    )?.classList.remove(
      "hidden"
    );

    byId(
      "clearSelections"
    )?.classList.remove(
      "hidden"
    );

    byId(
      "clueFeedbackPanel"
    )?.classList.add(
      "hidden"
    );

    byId(
      "nextProfile"
    )?.classList.add(
      "hidden"
    );

    updateLiveStats();
  }

  /* =====================================================
     SELECT CLUES
  ===================================================== */

  function toggleClue(
    hotspot
  ) {
    if (answersChecked) {
      showExplanation(
        hotspot.dataset.clueId
      );

      return;
    }

    const clueId =
      hotspot.dataset.clueId;

    if (
      selectedClues.has(
        clueId
      )
    ) {
      selectedClues.delete(
        clueId
      );

      hotspot.classList.remove(
        "selected-clue"
      );
    } else {
      selectedClues.add(
        clueId
      );

      hotspot.classList.add(
        "selected-clue"
      );
    }

    setText(
      "selectedClueCount",
      selectedClues.size
    );
  }

  document.addEventListener(
    "click",
    (event) => {
      const hotspot =
        event.target.closest(
          "[data-clue-id]"
        );

      if (!hotspot) {
        return;
      }

      toggleClue(hotspot);
    }
  );

  function clearSelections() {
    if (answersChecked) {
      return;
    }

    selectedClues.clear();

    document
      .querySelectorAll(
        "[data-clue-id]"
      )
      .forEach((hotspot) => {
        hotspot.classList.remove(
          "selected-clue"
        );
      });

    setText(
      "selectedClueCount",
      0
    );
  }

  byId(
    "clearSelections"
  )?.addEventListener(
    "click",
    clearSelections
  );

  /* =====================================================
     CHECK ANSWERS
  ===================================================== */

  function checkAnswers() {
    if (answersChecked) {
      return;
    }

    const profile =
      profiles[
        currentProfileIndex
      ];

    if (!profile) {
      return;
    }

    answersChecked =
      true;

    const riskyClues =
      new Set(
        profile.riskyClues
      );

    const selectedAllRisky =
      profile.riskyClues.every(
        (clueId) =>
          selectedClues.has(
            clueId
          )
      );

    const selectedUnsafeExtras =
      Array.from(
        selectedClues
      ).some(
        (clueId) =>
          !riskyClues.has(
            clueId
          )
      );

    const perfect =
      selectedAllRisky &&
      !selectedUnsafeExtras;

    const scoreResult =
      arcade.answerQuestion({
        questionId:
          profile.id,

        correct:
          perfect
      });

    document
      .querySelectorAll(
        "[data-clue-id]"
      )
      .forEach((hotspot) => {
        const clueId =
          hotspot.dataset.clueId;

        const clue =
          profile.clues[
            clueId
          ];

        if (!clue) {
          return;
        }

        hotspot.disabled =
          false;

        const selected =
          selectedClues.has(
            clueId
          );

        if (
          selected &&
          clue.risky
        ) {
          hotspot.classList.add(
            "correct-clue"
          );
        }

        if (
          selected &&
          !clue.risky
        ) {
          hotspot.classList.add(
            "incorrect-clue"
          );
        }

        if (
          !selected &&
          clue.risky
        ) {
          hotspot.classList.add(
            "missed-clue"
          );
        }

        if (
          selected ||
          clue.risky
        ) {
          hotspot.classList.add(
            "review-ready"
          );
        }

        hotspot.classList.remove(
          "selected-clue"
        );
      });

    setText(
      "pointsEarnedThisRound",
      scoreResult.pointsEarned
    );

    if (perfect) {
      setText(
        "clueFeedbackTitle",
        "Perfect investigation!"
      );

      setText(
        "clueFeedbackText",
        "You found every risky clue and avoided selecting harmless details."
      );
    } else {
      setText(
        "clueFeedbackTitle",
        "Investigation reviewed"
      );

      setText(
        "clueFeedbackText",
        "Green clues were correctly selected. Red clues were harmless. Orange clues were risky details you missed. Click any marked clue to learn more."
      );
    }

    byId(
      "clueFeedbackPanel"
    )?.classList.remove(
      "hidden"
    );

    byId(
      "checkAnswers"
    )?.classList.add(
      "hidden"
    );

    byId(
      "clearSelections"
    )?.classList.add(
      "hidden"
    );

    const nextButton =
      byId(
        "nextProfile"
      );

    if (nextButton) {
      nextButton.textContent =
        currentProfileIndex ===
        profiles.length - 1
          ? "See Results"
          : "Next Profile";

      nextButton.classList.remove(
        "hidden"
      );
    }

    updateLiveStats();
  }

  byId(
    "checkAnswers"
  )?.addEventListener(
    "click",
    checkAnswers
  );

  /* =====================================================
     EXPLANATIONS
  ===================================================== */

  function showExplanation(
    clueId
  ) {
    if (!answersChecked) {
      return;
    }

    const profile =
      profiles[
        currentProfileIndex
      ];

    const clue =
      profile?.clues[
        clueId
      ];

    if (!clue) {
      return;
    }

    setText(
      "clueExplanationTitle",
      clue.title
    );

    setText(
      "clueExplanationText",
      clue.explanation
    );

    const icon =
      document.querySelector(
        ".explanation-alert-icon"
      );

    if (icon) {
      icon.textContent =
        clue.risky
          ? "!"
          : "✓";

      icon.style.background =
        clue.risky
          ? "#ffca28"
          : "#49d391";
    }

    byId(
      "clueExplanationPopup"
    )?.classList.remove(
      "hidden"
    );
  }

  function closeExplanation() {
    byId(
      "clueExplanationPopup"
    )?.classList.add(
      "hidden"
    );
  }

  byId(
    "closeClueExplanation"
  )?.addEventListener(
    "click",
    closeExplanation
  );

  /* =====================================================
     NEXT
  ===================================================== */

  function nextProfile() {
    if (!answersChecked) {
      return;
    }

    currentProfileIndex +=
      1;

    if (
      currentProfileIndex >=
      profiles.length
    ) {
      finishGame();
      return;
    }

    loadProfile();
  }

  byId(
    "nextProfile"
  )?.addEventListener(
    "click",
    nextProfile
  );

  /* =====================================================
     STATS
  ===================================================== */

  function updateLiveStats() {
    const round =
      arcade.getCurrentRound();

    setText(
      "currentScore",
      round.score || 0
    );

    setText(
      "profilesSolved",
      round.correctCount || 0
    );

    updateGlobalPoints();
  }

  /* =====================================================
     RESULTS
  ===================================================== */

  function starsToText(
    starCount
  ) {
    const stars =
      Math.max(
        0,
        Math.min(
          3,
          Number(
            starCount
          ) || 0
        )
      );

    return (
      "★".repeat(stars) +
      "☆".repeat(
        3 - stars
      )
    );
  }

  function finishGame() {
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
      `${result.correctCount}/${result.questionCount}`
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
      "Keep investigating and try to beat your best score.";

    if (
      result.accuracy === 100
    ) {
      message =
        "Perfect investigation! You found every risky social media clue.";
    } else if (
      result.accuracy >= 75
    ) {
      message =
        "Excellent work! You recognized most of the risky details.";
    } else if (
      result.accuracy >= 50
    ) {
      message =
        "Good effort. Look closely at captions, backgrounds, and schedules next time.";
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

  byId(
    "playAgain"
  )?.addEventListener(
    "click",
    () => {
      showScreen(
        "introScreen"
      );
    }
  );

  updateGlobalPoints();

  console.log(
    "Clue Collector Social Media Edition loaded."
  );
})();
