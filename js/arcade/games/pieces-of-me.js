"use strict";

/* =========================================================
   SAFETII NET — CYBER ARCADE
   PIECES OF ME
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

  const questions = [
    {
      id:
        "drawing",

      text:
        "Jordan loves drawing comic-book heroes.",

      category:
        "expression",

      explanation:
        "A broad hobby or interest is usually safe self-expression."
    },

    {
      id:
        "grade",

      text:
        "Jordan is in fifth grade.",

      category:
        "private",

      explanation:
        "A grade level can reveal Jordan’s approximate age and help narrow down who Jordan is."
    },

    {
      id:
        "school",

      text:
        "Jordan attends Lakeview Elementary School.",

      category:
        "private",

      explanation:
        "A school name can reveal where Jordan may be found."
    },

    {
      id:
        "password",

      text:
        "Jordan’s password is ArtStar2026!",

      category:
        "secret",

      explanation:
        "Passwords protect accounts and must remain secret."
    },

    {
      id:
        "animal",

      text:
        "Jordan’s favorite animal is a red panda.",

      category:
        "expression",

      explanation:
        "A favorite animal is a broad preference and safe self-expression."
    },

    {
      id:
        "birthday",

      text:
        "Jordan’s birthday is September 14, 2015.",

      category:
        "private",

      explanation:
        "A complete birthday can identify someone and may be used in account security questions."
    },

    {
  id:
    "favorite-subject",

  text:
    "Jordan’s favorite subject is science.",

  category:
    "expression",

  explanation:
    "A favorite subject is a broad preference and is usually safe self-expression."
},

    {
      id:
        "login-code",

      text:
        "Jordan’s one-time login code is 482991.",

      category:
        "secret",

      explanation:
        "Login codes provide access to accounts and must never be shared."
    }
  ];

  const heatNames = {
    mild:
      "Mild",

    spicy:
      "Spicy",

    hot:
      "Hot"
  };

  let selectedHeat =
    "mild";

  let currentQuestionIndex =
    0;

  let currentQuestionAnswered =
    false;

  /* =====================================================
     ELEMENT HELPERS
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
     HEAT LEVEL
  ===================================================== */

  function selectHeat(button) {
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

  document
    .querySelectorAll(
      ".heat-choice"
    )
    .forEach(
      (button) => {
        button.addEventListener(
          "click",
          () => {
            selectHeat(button);
          }
        );
      }
    );

  /* =====================================================
     START GAME
  ===================================================== */

  function startGame() {
    currentQuestionIndex =
      0;

    currentQuestionAnswered =
      false;

    arcade.startRound({
      gameId:
        "pieces-of-me",

      gameName:
        "Pieces of Me",

      heatLevel:
        selectedHeat,

      questionCount:
        questions.length
    });

    setText(
      "questionTotal",
      questions.length
    );

    setText(
      "currentHeat",
      heatNames[
        selectedHeat
      ] || "Mild"
    );

    const heat =
      arcade.HEAT_LEVELS[
        selectedHeat
      ] ||
      arcade.HEAT_LEVELS.mild;

    setText(
      "questionPointValue",
      heat.pointsPerCorrect
    );

    showScreen(
      "playScreen"
    );

    loadQuestion();
  }

  byId(
    "startGame"
  )?.addEventListener(
    "click",
    startGame
  );

  /* =====================================================
     LOAD QUESTION
  ===================================================== */

  function loadQuestion() {
    const question =
      questions[
        currentQuestionIndex
      ];

    if (!question) {
      finishGame();

      return;
    }

    currentQuestionAnswered =
      false;

    setText(
      "questionNumber",
      currentQuestionIndex + 1
    );

    setText(
      "questionText",
      question.text
    );

    const percentage =
      (
        currentQuestionIndex /
        questions.length
      ) * 100;

    const progressFill =
      byId(
        "questionProgressFill"
      );

    if (progressFill) {
      progressFill.style.width =
        `${percentage}%`;
    }

    const feedback =
      byId(
        "answerFeedback"
      );

    feedback?.classList.add(
      "hidden"
    );

    feedback?.classList.remove(
      "correct-feedback",
      "wrong-feedback"
    );

    byId(
      "nextQuestion"
    )?.classList.add(
      "hidden"
    );

    document
      .querySelectorAll(
        ".answer-choice"
      )
      .forEach(
        (button) => {
          button.disabled =
            false;

          button.classList.remove(
            "correct-answer",
            "wrong-answer",
            "reveal-answer"
          );
        }
      );

    updateLiveScore();
  }

  /* =====================================================
     ANSWER QUESTION
  ===================================================== */

  function answerQuestion(
    button
  ) {
    if (
      currentQuestionAnswered
    ) {
      return;
    }

    const question =
      questions[
        currentQuestionIndex
      ];

    if (!question) {
      return;
    }

    currentQuestionAnswered =
      true;

    const selectedCategory =
      button.dataset.category;

    const correct =
      selectedCategory ===
      question.category;

    const result =
      arcade.answerQuestion({
        questionId:
          question.id,

        correct
      });

    document
      .querySelectorAll(
        ".answer-choice"
      )
      .forEach(
        (answerButton) => {
          answerButton.disabled =
            true;

          if (
            answerButton.dataset
              .category ===
            question.category
          ) {
            answerButton.classList.add(
              "reveal-answer"
            );
          }
        }
      );

    if (correct) {
      button.classList.add(
        "correct-answer"
      );

      showFeedback({
        correct: true,

        title:
          "Correct!",

        text:
          question.explanation,

        points:
          result.pointsEarned
      });
    } else {
      button.classList.add(
        "wrong-answer"
      );

      showFeedback({
        correct: false,

        title:
          "No points this time.",

        text:
          question.explanation,

        points:
          0
      });
    }

    updateLiveScore();

    const nextButton =
      byId(
        "nextQuestion"
      );

    if (nextButton) {
      nextButton.textContent =
        currentQuestionIndex ===
        questions.length - 1
          ? "See Results"
          : "Next Question";

      nextButton.classList.remove(
        "hidden"
      );
    }
  }

  document
    .querySelectorAll(
      ".answer-choice"
    )
    .forEach(
      (button) => {
        button.addEventListener(
          "click",
          () => {
            answerQuestion(
              button
            );
          }
        );
      }
    );

  function showFeedback({
    correct,
    title,
    text,
    points
  }) {
    const feedback =
      byId(
        "answerFeedback"
      );

    if (!feedback) {
      return;
    }

    feedback.classList.remove(
      "hidden",
      "correct-feedback",
      "wrong-feedback"
    );

    feedback.classList.add(
      correct
        ? "correct-feedback"
        : "wrong-feedback"
    );

    setText(
      "feedbackTitle",
      title
    );

    setText(
      "feedbackText",
      text
    );

    setText(
      "pointsEarnedThisQuestion",
      points
    );
  }

  /* =====================================================
     NEXT QUESTION
  ===================================================== */

  function nextQuestion() {
    if (
      !currentQuestionAnswered
    ) {
      return;
    }

    currentQuestionIndex +=
      1;

    if (
      currentQuestionIndex >=
      questions.length
    ) {
      finishGame();

      return;
    }

    loadQuestion();
  }

  byId(
    "nextQuestion"
  )?.addEventListener(
    "click",
    nextQuestion
  );

  /* =====================================================
     LIVE SCORE
  ===================================================== */

  function updateLiveScore() {
    const round =
      arcade.getCurrentRound();

    setText(
      "currentScore",
      round.score || 0
    );

    setText(
      "correctCount",
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
    const safeStars =
      Math.max(
        0,
        Math.min(
          3,
          Number(starCount) || 0
        )
      );

    return (
      "★".repeat(safeStars) +
      "☆".repeat(3 - safeStars)
    );
  }

  function getResultMessage(
    result
  ) {
    if (
      result.accuracy === 100
    ) {
      return (
        "Perfect round! You protected every piece of Jordan’s identity."
      );
    }

    if (
      result.accuracy >= 75
    ) {
      return (
        "Excellent work! You recognized most identity clues correctly."
      );
    }

    if (
      result.accuracy >= 50
    ) {
      return (
        "Good effort. Replay the game and try to beat your best score."
      );
    }

    return (
      "Identity clues can be tricky. Review the explanations and try another round."
    );
  }

  function finishGame() {
    const progressFill =
      byId(
        "questionProgressFill"
      );

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

    setText(
      "resultMessage",
      getResultMessage(
        result
      )
    );

    updateGlobalPoints();

    showScreen(
      "resultScreen"
    );
  }

  /* =====================================================
     PLAY AGAIN
  ===================================================== */

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

  document.addEventListener(
    "safetiiPointsChanged",
    updateGlobalPoints
  );

  updateGlobalPoints();

  console.log(
    "Pieces of Me arcade game loaded."
  );
})();
