"use strict";

/* =========================================================
   SAFETII NET — IDENTITY ISLAND
   STEP 5: FINAL TEST
========================================================= */

(() => {
  const game = window.IdentityGame;

  if (!game) {
    console.error(
      "IdentityGame is missing. Make sure identity-data.js and identity-core.js load before identity-test.js."
    );

    return;
  }

  if (!game.data || !game.state) {
    console.error(
      "Identity Island data or state is missing. Check identity-data.js and identity-core.js."
    );

    return;
  }

  /* -------------------------------------------------------
     START FINAL TEST
  ------------------------------------------------------- */

  game.startFinalTest = function startFinalTest() {
    const profiles = game.data.identityProfiles || [];
    const requiredProfiles = profiles.length;
    const protectedProfiles = game.state.profilesProtected;

    if (protectedProfiles < requiredProfiles) {
      game.setMemeTip(
        `Protect all five profiles first. You protected ${protectedProfiles} out of ${requiredProfiles}.`,
        "thinking"
      );

      return;
    }

    game.state.testIndex = 0;
    game.state.testCorrect = 0;
    game.state.testAnswered = false;

    game.showSection("testZone");
    game.loadTest();

    game.setMemeTip(
      "Final test time! You need at least 80 percent to earn your Identity Protector Badge.",
      "thinking"
    );
  };

  /* -------------------------------------------------------
     LOAD CURRENT TEST QUESTION
  ------------------------------------------------------- */

  game.loadTest = function loadTest() {
    const questions = game.data.testQuestions || [];
    const currentQuestion =
      questions[game.state.testIndex];

    const questionElement =
      game.byId("testQuestion");

    const questionNumberElement =
      game.byId("testNumber");

    const feedbackElement =
      game.byId("testFeedback");

    const nextButton =
      game.byId("nextTest");

    if (
      !currentQuestion ||
      !questionElement ||
      !questionNumberElement ||
      !feedbackElement ||
      !nextButton
    ) {
      console.error(
        "Final test could not load. One or more required HTML elements are missing."
      );

      return;
    }

    questionElement.textContent =
      currentQuestion.text;

    questionNumberElement.textContent =
      String(game.state.testIndex + 1);

    feedbackElement.textContent = "";
    feedbackElement.style.background =
      "transparent";

    feedbackElement.style.color = "";

    nextButton.classList.add("hidden");

    document
      .querySelectorAll(".test-choice")
      .forEach((button) => {
        button.disabled = false;

        button.classList.remove(
          "correct-glow",
          "shake"
        );
      });

    game.state.testAnswered = false;
  };

  /* -------------------------------------------------------
     ANSWER CURRENT QUESTION
  ------------------------------------------------------- */

  game.answerTest = function answerTest(
    selectedAnswer,
    selectedButton
  ) {
    if (game.state.testAnswered) {
      return;
    }

    const questions =
      game.data.testQuestions || [];

    const currentQuestion =
      questions[game.state.testIndex];

    const feedbackElement =
      game.byId("testFeedback");

    const nextButton =
      game.byId("nextTest");

    if (
      !currentQuestion ||
      !feedbackElement ||
      !nextButton
    ) {
      console.error(
        "The test answer could not be checked."
      );

      return;
    }

    game.state.testAnswered = true;

    document
      .querySelectorAll(".test-choice")
      .forEach((button) => {
        button.disabled = true;
      });

    const isCorrect =
      selectedAnswer ===
      currentQuestion.answer;

    if (isCorrect) {
      game.state.testCorrect += 1;

      feedbackElement.textContent =
        `🎉 Correct! ${currentQuestion.explanation}`;

      feedbackElement.style.background =
        "#e9fff3";

      feedbackElement.style.color =
        "#168a52";

      if (selectedButton) {
        selectedButton.classList.add(
          "correct-glow"
        );
      }

      game.setMemeTip(
        "Correct! Keep going, Cyber Super Hero!",
        "congrats"
      );
    } else {
      feedbackElement.textContent =
        `Good guess! ${currentQuestion.explanation}`;

      feedbackElement.style.background =
        "#f3efff";

      feedbackElement.style.color =
        "#7d4cff";

      if (selectedButton) {
        selectedButton.classList.add(
          "shake"
        );

        window.setTimeout(() => {
          selectedButton.classList.remove(
            "shake"
          );
        }, 700);
      }

      game.setMemeTip(
        "Good guess. Read the explanation, then keep going.",
        "wrong"
      );
    }

    nextButton.classList.remove("hidden");
  };

  /* -------------------------------------------------------
     GO TO NEXT QUESTION
  ------------------------------------------------------- */

  game.nextTestQuestion =
    function nextTestQuestion() {
      if (!game.state.testAnswered) {
        return;
      }

      game.state.testIndex += 1;

      if (
        game.state.testIndex >=
        game.data.testQuestions.length
      ) {
        game.finishMission();
        return;
      }

      game.loadTest();
    };

  /* -------------------------------------------------------
     FINISH MISSION
  ------------------------------------------------------- */

  game.finishMission =
    function finishMission() {
      const totalQuestions =
        game.data.testQuestions.length;

      const percentage = Math.round(
        (
          game.state.testCorrect /
          totalQuestions
        ) * 100
      );

      const passed = percentage >= 80;

      const title =
        game.byId("resultTitle");

      const message =
        game.byId("resultMessage");

      const pointsElement =
        game.byId("pointsEarned");

      const stickersElement =
        game.byId("stickersFound");

      const badgeElement =
        document.querySelector(
          ".earned-badge"
        );

      if (
        !title ||
        !message ||
        !pointsElement ||
        !stickersElement
      ) {
        console.error(
          "Mission result elements are missing."
        );

        return;
      }

      game.showSection("missionResult");

      stickersElement.textContent =
        String(
          game.state.foundStickers.size
        );

      if (passed) {
        const earnedPoints = 50;

       
        const alreadyEarned =
          localStorage.getItem(
            "identityBadgeEarned"
          ) === "true";

        localStorage.setItem(
          "identityBadgeEarned",
          "true"
        );

        localStorage.setItem(
          "identityMissionCompleted",
          "true"
        );

        localStorage.setItem(
          "identityBestScore",
          String(
            Math.max(
              percentage,
              Number(
                localStorage.getItem(
                  "identityBestScore"
                ) || "0"
              )
            )
          )
        );

        localStorage.setItem(
          "identityStickers",
          JSON.stringify(
            Array.from(
              game.state.foundStickers
            )
          )
        );

        if (!alreadyEarned) {
          const currentPoints =
            Number(
              localStorage.getItem(
                "safetiiPoints"
              ) || "0"
            );

          localStorage.setItem(
            "safetiiPoints",
            String(
              currentPoints +
              earnedPoints
            )
          );
        }

        title.textContent =
          "Identity Protector Badge Earned!";

        message.textContent =
          `You scored ${percentage}%. You helped Ava protect her identity and completed Identity Island!`;

        pointsElement.textContent =
          alreadyEarned
            ? "Already collected"
            : String(earnedPoints);

        if (badgeElement) {
          badgeElement.style.display =
            "inline-block";
        }

        game.setMemeTip(
          "Mission complete! You earned the Identity Protector Badge!",
          "congrats"
        );

        return;
      }

      title.textContent =
        "Almost There, Cyber Mentee!";

      message.textContent =
        `You scored ${percentage}%. You need at least 80% to earn the Identity Protector Badge.`;

      pointsElement.textContent = "0";

      if (badgeElement) {
        badgeElement.style.display =
          "none";
      }

      game.setMemeTip(
        "You are close! Review what you learned and try again.",
        "thinking"
      );
    };

  console.log(
    "Identity Island final test loaded successfully."
  );
})();
