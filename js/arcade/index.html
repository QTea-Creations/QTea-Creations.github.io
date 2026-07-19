"use strict";

/* =========================================================
   SAFETII NET — CYBER ARCADE
   SHARED SCORE SYSTEM

   Heat Levels:
   - Mild: 10 points
   - Spicy: 20 points
   - Hot: 30 points

   Arcade rules:
   - Correct first answer earns points.
   - Incorrect answers earn zero points.
   - Questions cannot award points twice in one round.
   - Global points are awarded only for improvement
     over the player's previous best score.
========================================================= */

(() => {
  const STORAGE_KEY =
    "safetiiArcadeProgressV1";

  const GLOBAL_POINTS_KEY =
    "safetiiPoints";

  const HEAT_LEVELS = {
    mild: {
      id: "mild",
      name: "Mild",
      icon: "🌶️",
      pointsPerCorrect: 10
    },

    spicy: {
      id: "spicy",
      name: "Spicy",
      icon: "🌶️🌶️",
      pointsPerCorrect: 20
    },

    hot: {
      id: "hot",
      name: "Hot",
      icon: "🌶️🌶️🌶️",
      pointsPerCorrect: 30
    }
  };

  const activeRound = {
    gameId: "",
    gameName: "",
    heatLevel: "mild",

    questionCount: 0,
    answeredCount: 0,
    correctCount: 0,
    incorrectCount: 0,

    score: 0,
    maximumScore: 0,

    answeredQuestionIds:
      new Set(),

    startedAt: null,
    finished: false
  };

  /* =====================================================
     BASIC HELPERS
  ===================================================== */

  function safeNumber(
    value,
    fallback = 0
  ) {
    const number =
      Number(value);

    return Number.isFinite(number)
      ? number
      : fallback;
  }

  function createDefaultProgress() {
    return {
      version: 1,
      games: {}
    };
  }

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
        return createDefaultProgress();
      }

      return {
        ...createDefaultProgress(),
        ...stored,

        games:
          stored.games &&
          typeof stored.games ===
            "object"
            ? stored.games
            : {}
      };
    } catch (error) {
      console.error(
        "Could not read Cyber Arcade progress:",
        error
      );

      return createDefaultProgress();
    }
  }

  function saveProgress(
    progress
  ) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(progress)
    );
  }

  function getHeatLevel(
    heatLevel
  ) {
    return (
      HEAT_LEVELS[
        heatLevel
      ] ||
      HEAT_LEVELS.mild
    );
  }

  function getGlobalPoints() {
    return safeNumber(
      localStorage.getItem(
        GLOBAL_POINTS_KEY
      ),
      0
    );
  }

  function addGlobalPoints(
    amount
  ) {
    const safeAmount =
      Math.max(
        0,
        safeNumber(amount)
      );

    if (safeAmount === 0) {
      return getGlobalPoints();
    }

    const newTotal =
      getGlobalPoints() +
      safeAmount;

    localStorage.setItem(
      GLOBAL_POINTS_KEY,
      String(newTotal)
    );

    document.dispatchEvent(
      new CustomEvent(
        "safetiiPointsChanged",
        {
          detail: {
            amountAdded:
              safeAmount,

            totalPoints:
              newTotal,

            source:
              "cyber-arcade"
          }
        }
      )
    );

    return newTotal;
  }

  function calculateStars(
    correctCount,
    questionCount
  ) {
    if (questionCount <= 0) {
      return 0;
    }

    const accuracy =
      correctCount /
      questionCount;

    if (accuracy === 1) {
      return 3;
    }

    if (accuracy >= 0.75) {
      return 2;
    }

    if (accuracy >= 0.5) {
      return 1;
    }

    return 0;
  }

  /* =====================================================
     START A ROUND
  ===================================================== */

  function startRound({
    gameId,
    gameName,
    heatLevel = "mild",
    questionCount
  }) {
    if (
      !gameId ||
      typeof gameId !==
        "string"
    ) {
      throw new Error(
        "Cyber Arcade requires a valid gameId."
      );
    }

    const safeQuestionCount =
      Math.max(
        1,
        Math.floor(
          safeNumber(
            questionCount,
            1
          )
        )
      );

    const heat =
      getHeatLevel(
        heatLevel
      );

    activeRound.gameId =
      gameId;

    activeRound.gameName =
      gameName ||
      gameId;

    activeRound.heatLevel =
      heat.id;

    activeRound.questionCount =
      safeQuestionCount;

    activeRound.answeredCount =
      0;

    activeRound.correctCount =
      0;

    activeRound.incorrectCount =
      0;

    activeRound.score =
      0;

    activeRound.maximumScore =
      safeQuestionCount *
      heat.pointsPerCorrect;

    activeRound.answeredQuestionIds =
      new Set();

    activeRound.startedAt =
      Date.now();

    activeRound.finished =
      false;

    document.dispatchEvent(
      new CustomEvent(
        "arcadeRoundStarted",
        {
          detail:
            getCurrentRound()
        }
      )
    );

    return getCurrentRound();
  }

  /* =====================================================
     SCORE AN ANSWER
  ===================================================== */

  function answerQuestion({
    questionId,
    correct
  }) {
    if (
      !activeRound.gameId
    ) {
      throw new Error(
        "Start the arcade round before scoring an answer."
      );
    }

    if (
      activeRound.finished
    ) {
      return {
        accepted: false,
        reason:
          "round-finished",
        pointsEarned: 0,
        round:
          getCurrentRound()
      };
    }

    const safeQuestionId =
      String(
        questionId || ""
      ).trim();

    if (!safeQuestionId) {
      throw new Error(
        "Every arcade question needs a unique questionId."
      );
    }

    if (
      activeRound
        .answeredQuestionIds
        .has(
          safeQuestionId
        )
    ) {
      return {
        accepted: false,
        reason:
          "already-answered",
        pointsEarned: 0,
        round:
          getCurrentRound()
      };
    }

    activeRound
      .answeredQuestionIds
      .add(
        safeQuestionId
      );

    activeRound.answeredCount +=
      1;

    const heat =
      getHeatLevel(
        activeRound.heatLevel
      );

    let pointsEarned =
      0;

    if (correct === true) {
      activeRound.correctCount +=
        1;

      pointsEarned =
        heat.pointsPerCorrect;

      activeRound.score +=
        pointsEarned;
    } else {
      activeRound.incorrectCount +=
        1;
    }

    const result = {
      accepted: true,
      correct:
        correct === true,

      pointsEarned,
      round:
        getCurrentRound()
    };

    document.dispatchEvent(
      new CustomEvent(
        "arcadeQuestionAnswered",
        {
          detail: result
        }
      )
    );

    return result;
  }

  /* =====================================================
     FINISH A ROUND
  ===================================================== */

  function finishRound() {
    if (
      !activeRound.gameId
    ) {
      throw new Error(
        "No Cyber Arcade round is active."
      );
    }

    if (
      activeRound.finished
    ) {
      return getLastResult();
    }

    activeRound.finished =
      true;

    const progress =
      readProgress();

    const existingGame =
      progress.games[
        activeRound.gameId
      ] || {};

    const previousBest =
      safeNumber(
        existingGame.bestScore,
        0
      );

    const scoreImprovement =
      Math.max(
        0,
        activeRound.score -
          previousBest
      );

    const stars =
      calculateStars(
        activeRound.correctCount,
        activeRound.questionCount
      );

    const accuracy =
      activeRound.questionCount >
      0
        ? Math.round(
            (
              activeRound.correctCount /
              activeRound.questionCount
            ) * 100
          )
        : 0;

    const perfectRound =
      activeRound.correctCount ===
        activeRound.questionCount &&
      activeRound.questionCount >
        0;

    const completedAt =
      new Date()
        .toISOString();

    const result = {
      gameId:
        activeRound.gameId,

      gameName:
        activeRound.gameName,

      heatLevel:
        activeRound.heatLevel,

      score:
        activeRound.score,

      maximumScore:
        activeRound.maximumScore,

      correctCount:
        activeRound.correctCount,

      incorrectCount:
        activeRound.incorrectCount,

      questionCount:
        activeRound.questionCount,

      accuracy,
      stars,
      perfectRound,

      previousBest,
      newBest:
        Math.max(
          previousBest,
          activeRound.score
        ),

      globalPointsEarned:
        scoreImprovement,

      completedAt
    };

    progress.games[
      activeRound.gameId
    ] = {
      gameId:
        activeRound.gameId,

      gameName:
        activeRound.gameName,

      heatLevel:
        activeRound.heatLevel,

      plays:
        safeNumber(
          existingGame.plays,
          0
        ) + 1,

      bestScore:
        result.newBest,

      bestAccuracy:
        Math.max(
          safeNumber(
            existingGame
              .bestAccuracy,
            0
          ),
          accuracy
        ),

      bestStars:
        Math.max(
          safeNumber(
            existingGame
              .bestStars,
            0
          ),
          stars
        ),

      perfectRounds:
        safeNumber(
          existingGame
            .perfectRounds,
          0
        ) +
        (
          perfectRound
            ? 1
            : 0
        ),

      lastScore:
        activeRound.score,

      lastAccuracy:
        accuracy,

      lastPlayedAt:
        completedAt,

      completed:
        true
    };

    progress.lastPlayedGame =
      activeRound.gameId;

    progress.lastPlayedAt =
      completedAt;

    progress.lastResult =
      result;

    saveProgress(
      progress
    );

    if (
      scoreImprovement > 0
    ) {
      addGlobalPoints(
        scoreImprovement
      );
    }

    document.dispatchEvent(
      new CustomEvent(
        "arcadeRoundFinished",
        {
          detail: result
        }
      )
    );

    return result;
  }

  /* =====================================================
     READ RESULTS AND PROGRESS
  ===================================================== */

  function getCurrentRound() {
    return {
      gameId:
        activeRound.gameId,

      gameName:
        activeRound.gameName,

      heatLevel:
        activeRound.heatLevel,

      questionCount:
        activeRound.questionCount,

      answeredCount:
        activeRound.answeredCount,

      correctCount:
        activeRound.correctCount,

      incorrectCount:
        activeRound.incorrectCount,

      score:
        activeRound.score,

      maximumScore:
        activeRound.maximumScore,

      startedAt:
        activeRound.startedAt,

      finished:
        activeRound.finished
    };
  }

  function getGameProgress(
    gameId
  ) {
    const progress =
      readProgress();

    return (
      progress.games[
        gameId
      ] || null
    );
  }

  function getAllProgress() {
    return readProgress();
  }

  function getLastResult() {
    return (
      readProgress()
        .lastResult || null
    );
  }

  function resetArcadeProgress() {
    localStorage.removeItem(
      STORAGE_KEY
    );

    document.dispatchEvent(
      new CustomEvent(
        "arcadeProgressReset"
      )
    );
  }

  /* =====================================================
     PUBLIC ARCADE API
  ===================================================== */

  window.SafetiiArcade = {
    HEAT_LEVELS,

    startRound,
    answerQuestion,
    finishRound,

    getCurrentRound,
    getGameProgress,
    getAllProgress,
    getLastResult,

    getGlobalPoints,
    resetArcadeProgress
  };

  console.log(
    "Safetii Net Cyber Arcade score system loaded."
  );
})();
