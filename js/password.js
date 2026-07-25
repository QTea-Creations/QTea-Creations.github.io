"use strict";

/* =========================================================
   SAFETII NET — PASSWORD SAFE KEEPER
   MISSION 2 MAIN CONTROLLER

   Controls:

   - Five Password Vault challenges
   - Twenty-question final test
   - Final score and passing requirement
   - Password Safe Keeper badge
   - One-time mission points
   - Mission replay

   Curriculum areas:

   1. Password strength
   2. Password attacks
   3. Two-factor authentication
   4. Account defense
========================================================= */

(() => {
  const mission =
    window.PasswordMission;

  if (
    !mission ||
    !mission.state ||
    !mission.data ||
    typeof mission.byId !==
      "function"
  ) {
    console.error(
      "password.js could not start. Check that the Mission 2 data, core, and activities files load first."
    );

    return;
  }

  const state =
    mission.state;

  const data =
    mission.data;


  /* =====================================================
     MISSION SETTINGS
  ===================================================== */

  const PASSING_PERCENTAGE =
    80;

  const MISSION_REWARD =
    100;

  const REWARD_KEY =
    "passwordMissionRewardAwarded";

  const COMPLETED_KEY =
    "passwordMissionCompleted";

  const BADGE_KEY =
    "passwordBadgeEarned";


  /* =====================================================
     GENERAL HELPERS
  ===================================================== */

  function getArray(
    value
  ) {
    return Array.isArray(
      value
    )
      ? value
      : [];
  }


  function saveProgressSoon() {
    window.setTimeout(
      () => {
        if (
          typeof mission
            .savePasswordProgress ===
          "function"
        ) {
          mission.savePasswordProgress();
        }
      },
      100
    );
  }


  function bindButton(
    id,
    callback
  ) {
    const button =
      mission.byId(id);

    if (
      !button ||
      button.dataset
        .passwordMainBound ===
        "true"
    ) {
      return;
    }

    button.dataset.passwordMainBound =
      "true";

    button.addEventListener(
      "click",
      callback
    );
  }


  function disableButtons(
    selector
  ) {
    document
      .querySelectorAll(
        selector
      )
      .forEach(
        (button) => {
          button.disabled =
            true;
        }
      );
  }


  function enableButtons(
    selector
  ) {
    document
      .querySelectorAll(
        selector
      )
      .forEach(
        (button) => {
          button.disabled =
            false;
        }
      );
  }


  function setCounter(
    id,
    value
  ) {
    mission.setText(
      id,
      Math.max(
        0,
        Number(value) ||
          0
      )
    );
  }


  /* =====================================================
     PASSWORD VAULT PRACTICE
  ===================================================== */

  function getVaultChallenges() {
    return getArray(
      data.vaultChallenges
    );
  }


  function getCurrentVaultChallenge() {
    return getVaultChallenges()[
      state.vaultIndex
    ];
  }


  mission.loadVaultChallenge =
    function loadVaultChallenge() {
      const challenges =
        getVaultChallenges();

      if (
        state.vaultComplete
      ) {
        showCompletedVault();

        return;
      }

      if (
        state.vaultIndex >=
        challenges.length
      ) {
        completeVaultPractice();

        return;
      }

      const challenge =
        getCurrentVaultChallenge();

      const answerGrid =
        mission.byId(
          "vaultAnswerGrid"
        );

      const nextButton =
        mission.byId(
          "nextVaultDoor"
        );

      if (
        !challenge ||
        !answerGrid ||
        !nextButton
      ) {
        console.error(
          "Password Vault challenge data or HTML elements are missing."
        );

        return;
      }

      state.vaultAnswered =
        false;

      mission.setText(
        "vaultDoorNumber",
        state.vaultIndex +
          1
      );

      mission.setText(
        "vaultChallengeTitle",
        challenge.title
      );

      mission.setText(
        "vaultChallengeText",
        challenge.text
      );

      setCounter(
        "vaultDoorsSecured",
        state.vaultDoorsSecured
      );

      mission.clearFeedback(
        "vaultChallengeFeedback"
      );

      mission.hideElement(
        nextButton
      );

      answerGrid.innerHTML =
        "";

      challenge.answers.forEach(
        (
          answer,
          answerIndex
        ) => {
          const button =
            document.createElement(
              "button"
            );

          button.type =
            "button";

          button.className =
            "vault-answer-button";

          button.dataset.answerIndex =
            String(
              answerIndex
            );

          button.textContent =
            answer;

          button.addEventListener(
            "click",
            () => {
              answerVaultChallenge(
                answerIndex,
                button
              );
            }
          );

          answerGrid.appendChild(
            button
          );
        }
      );

      const vaultDoor =
        mission.byId(
          "passwordVaultDoor"
        );

      vaultDoor?.classList.remove(
        "vault-door-open",
        "vault-door-wrong"
      );

      mission.setMemeTip(
        `Vault Door ${state.vaultIndex + 1}: apply what you learned about passwords, attacks, two-factor authentication, and account defense.`,
        "thinking"
      );
    };


  function answerVaultChallenge(
    selectedIndex,
    selectedButton
  ) {
    if (
      state.vaultAnswered
    ) {
      return;
    }

    const challenge =
      getCurrentVaultChallenge();

    if (!challenge) {
      return;
    }

    const correct =
      selectedIndex ===
      challenge.correctIndex;

    const buttons =
      document.querySelectorAll(
        ".vault-answer-button"
      );

    const vaultDoor =
      mission.byId(
        "passwordVaultDoor"
      );


    /* -------------------------------------------------
       CORRECT ANSWER

       The vault door opens only after a correct answer.
    ------------------------------------------------- */

    if (correct) {
      state.vaultAnswered =
        true;

      disableButtons(
        ".vault-answer-button"
      );

      buttons.forEach(
        (
          button,
          index
        ) => {
          if (
            index ===
            challenge.correctIndex
          ) {
            button.classList.add(
              "correct"
            );
          }
        }
      );

      selectedButton?.classList.add(
        "correct"
      );

      state.vaultDoorsSecured =
        Math.max(
          state.vaultDoorsSecured,
          state.vaultIndex +
            1
        );

      setCounter(
        "vaultDoorsSecured",
        state.vaultDoorsSecured
      );

      vaultDoor?.classList.remove(
        "vault-door-wrong"
      );

      vaultDoor?.classList.add(
        "vault-door-open"
      );

      mission.setFeedback({
        id:
          "vaultChallengeFeedback",

        message:
          `Vault secured! ${challenge.explanation}`,

        correct:
          true
      });

      mission.setMemeTip(
        "Excellent. The vault door is secure.",
        "congrats"
      );

      const nextButton =
        mission.byId(
          "nextVaultDoor"
        );

      if (nextButton) {
        nextButton.textContent =
          state.vaultIndex >=
            getVaultChallenges()
              .length -
              1
            ? "Finish Vault Practice"
            : "Continue to Next Door";

        mission.showElement(
          nextButton
        );
      }

      saveProgressSoon();

      return;
    }


    /* -------------------------------------------------
       INCORRECT ANSWER

       The student may try again. The door remains locked.
    ------------------------------------------------- */

    selectedButton.classList.add(
      "incorrect"
    );

    selectedButton.disabled =
      true;

    vaultDoor?.classList.remove(
      "vault-door-open"
    );

    vaultDoor?.classList.add(
      "vault-door-wrong"
    );

    mission.setFeedback({
      id:
        "vaultChallengeFeedback",

      message:
        "That response would not fully secure this vault door. Review the choices and try again.",

      correct:
        false
    });

    mission.setMemeTip(
      "The door is still locked. Apply the password-safety rule and try another answer.",
      "wrong"
    );

    window.setTimeout(
      () => {
        vaultDoor?.classList.remove(
          "vault-door-wrong"
        );
      },
      600
    );
  }


  function nextVaultChallenge() {
    if (
      !state.vaultAnswered
    ) {
      mission.setMemeTip(
        "Select the correct response before moving to the next vault door.",
        "thinking"
      );

      return;
    }

    state.vaultIndex +=
      1;

    if (
      state.vaultIndex >=
      getVaultChallenges()
        .length
    ) {
      completeVaultPractice();

      return;
    }

    mission.loadVaultChallenge();

    saveProgressSoon();
  }


  function completeVaultPractice() {
    state.vaultComplete =
      true;

    state.vaultIndex =
      getVaultChallenges()
        .length;

    state.vaultDoorsSecured =
      getVaultChallenges()
        .length;

    setCounter(
      "vaultDoorsSecured",
      state.vaultDoorsSecured
    );

    mission.setButtonState({
      id:
        "goPasswordFinalTest",

      unlocked:
        true,

      unlockedText:
        "Begin Final Vault Inspection 🛡️",

      lockedText:
        "Secure All 5 Doors to Unlock the Final Test"
    });

    mission.setFeedback({
      id:
        "vaultChallengeFeedback",

      message:
        "All five Password Vault doors are secure! The final inspection is unlocked.",

      correct:
        true
    });

    mission.setMemeTip(
      "You secured all five vault doors. The final inspection is ready.",
      "congrats"
    );

    saveProgressSoon();
  }


  function showCompletedVault() {
    setCounter(
      "vaultDoorsSecured",
      getVaultChallenges()
        .length
    );

    mission.setText(
      "vaultChallengeTitle",
      "All Password Vault Doors Secured"
    );

    mission.setText(
      "vaultChallengeText",
      "You completed the Password Vault practice and may continue to the final inspection."
    );

    const answerGrid =
      mission.byId(
        "vaultAnswerGrid"
      );

    if (answerGrid) {
      answerGrid.innerHTML =
        "";
    }

    mission.hideElement(
      mission.byId(
        "nextVaultDoor"
      )
    );

    mission.setButtonState({
      id:
        "goPasswordFinalTest",

      unlocked:
        true,

      unlockedText:
        "Begin Final Vault Inspection 🛡️",

      lockedText:
        "Secure All 5 Doors to Unlock the Final Test"
    });

    mission.setFeedback({
      id:
        "vaultChallengeFeedback",

      message:
        "Vault Practice complete.",

      correct:
        true
    });

    mission
      .byId(
        "passwordVaultDoor"
      )
      ?.classList.add(
        "vault-door-open"
      );
  }


  function openPasswordFinalTestIntro() {
    if (
      !state.vaultComplete
    ) {
      mission.setMemeTip(
        "Secure all five Password Vault doors before beginning the final inspection.",
        "thinking"
      );

      return;
    }

    mission.loadHeroNames?.();

    mission.showSection(
      "passwordTestIntroZone"
    );

    mission.setMemeTip(
      "The final inspection contains 20 questions about password strength, attacks, two-factor authentication, and account defense. Score at least 80 percent to earn the badge.",
      "welcome"
    );

    saveProgressSoon();
  }


  /* =====================================================
     FINAL TEST
  ===================================================== */

  function getTestQuestions() {
    return getArray(
      data.finalTestQuestions
    );
  }


  function getCurrentTestQuestion() {
    return getTestQuestions()[
      state.testIndex
    ];
  }


  function beginPasswordFinalTest() {
    state.testIndex =
      0;

    state.testCorrect =
      0;

    state.testAnswered =
      false;

    state.finalScore =
      0;

    state.badgeEarned =
      false;

    state.missionCompleted =
      false;

    mission.showSection(
      "passwordTestZone"
    );

    mission.loadPasswordTestQuestion();

    mission.setMemeTip(
      "Read each question carefully and choose the safest cybersecurity response.",
      "welcome"
    );

    saveProgressSoon();
  }


  mission.loadPasswordTestQuestion =
    function loadPasswordTestQuestion() {
      const questions =
        getTestQuestions();

      if (
        state.testIndex >=
        questions.length
      ) {
        finishPasswordFinalTest();

        return;
      }

      const question =
        getCurrentTestQuestion();

      const choiceGrid =
        mission.byId(
          "passwordTestChoiceGrid"
        );

      const nextButton =
        mission.byId(
          "nextPasswordTestQuestion"
        );

      if (
        !question ||
        !choiceGrid ||
        !nextButton
      ) {
        console.error(
          "Password final-test data or HTML elements are missing."
        );

        return;
      }

      state.testAnswered =
        false;

      mission.setText(
        "passwordTestNumber",
        state.testIndex +
          1
      );

      mission.setText(
        "passwordTestIcon",
        question.icon ||
          "🔐"
      );

      mission.setText(
        "passwordTestQuestion",
        question.question
      );

      mission.clearFeedback(
        "passwordTestFeedback"
      );

      mission.hideElement(
        nextButton
      );

      choiceGrid.innerHTML =
        "";

      question.choices.forEach(
        (
          choice,
          choiceIndex
        ) => {
          const button =
            document.createElement(
              "button"
            );

          button.type =
            "button";

          button.className =
            "password-test-choice";

          button.dataset.answerIndex =
            String(
              choiceIndex
            );

          button.textContent =
            choice;

          button.addEventListener(
            "click",
            () => {
              answerPasswordTestQuestion(
                choiceIndex,
                button
              );
            }
          );

          choiceGrid.appendChild(
            button
          );
        }
      );
    };


  function answerPasswordTestQuestion(
    selectedIndex,
    selectedButton
  ) {
    if (
      state.testAnswered
    ) {
      return;
    }

    const question =
      getCurrentTestQuestion();

    if (!question) {
      return;
    }

    state.testAnswered =
      true;

    disableButtons(
      ".password-test-choice"
    );

    const correct =
      selectedIndex ===
      question.correctIndex;

    const buttons =
      document.querySelectorAll(
        ".password-test-choice"
      );

    buttons.forEach(
      (
        button,
        index
      ) => {
        if (
          index ===
          question.correctIndex
        ) {
          button.classList.add(
            "correct"
          );
        }

        if (
          index ===
            selectedIndex &&
          !correct
        ) {
          button.classList.add(
            "incorrect"
          );
        }
      }
    );

    if (correct) {
      state.testCorrect +=
        1;

      selectedButton?.classList.add(
        "correct"
      );

      mission.setFeedback({
        id:
          "passwordTestFeedback",

        message:
          `Correct! ${question.explanation}`,

        correct:
          true
      });

      mission.setMemeTip(
        "Correct. That answer applies the safer cybersecurity practice.",
        "congrats"
      );
    } else {
      selectedButton?.classList.add(
        "incorrect"
      );

      mission.setFeedback({
        id:
          "passwordTestFeedback",

        message:
          `Review this rule: ${question.explanation}`,

        correct:
          false
      });

      mission.setMemeTip(
        "Study the highlighted answer and explanation before continuing.",
        "wrong"
      );
    }

    const nextButton =
      mission.byId(
        "nextPasswordTestQuestion"
      );

    if (nextButton) {
      nextButton.textContent =
        state.testIndex >=
          getTestQuestions()
            .length -
            1
          ? "View Final Results"
          : "Next Question";

      mission.showElement(
        nextButton
      );
    }

    saveProgressSoon();
  }


  function nextPasswordTestQuestion() {
    if (
      !state.testAnswered
    ) {
      return;
    }

    state.testIndex +=
      1;

    if (
      state.testIndex >=
      getTestQuestions()
        .length
    ) {
      finishPasswordFinalTest();

      return;
    }

    mission.loadPasswordTestQuestion();

    saveProgressSoon();
  }


  function calculateFinalScore() {
    const totalQuestions =
      getTestQuestions()
        .length;

    if (
      totalQuestions <=
      0
    ) {
      return 0;
    }

    return Math.round(
      (
        state.testCorrect /
        totalQuestions
      ) *
        100
    );
  }


  function finishPasswordFinalTest() {
    state.finalScore =
      calculateFinalScore();

    if (
      state.finalScore >=
      PASSING_PERCENTAGE
    ) {
      completePasswordMission();

      return;
    }

    showFailedTestResult();
  }


  /* =====================================================
     POINTS AND BADGE
  ===================================================== */

  function rewardAlreadyAwarded() {
    return (
      localStorage.getItem(
        REWARD_KEY
      ) ===
      "true"
    );
  }


  function awardMissionPoints() {
    if (
      rewardAlreadyAwarded()
    ) {
      state.missionPointsEarned =
        0;

      return 0;
    }

    mission.addPoints(
      MISSION_REWARD
    );

    localStorage.setItem(
      REWARD_KEY,
      "true"
    );

    state.missionPointsEarned =
      MISSION_REWARD;

    return MISSION_REWARD;
  }


  function saveBadge() {
    const badgeName =
      "Password Safe Keeper";

    let earnedBadges =
      [];

    try {
      const stored =
        JSON.parse(
          localStorage.getItem(
            "safetiiBadges"
          ) || "[]"
        );

      earnedBadges =
        Array.isArray(
          stored
        )
          ? stored
          : [];
    } catch (error) {
      console.error(
        "Could not read the Safetii Net badge list:",
        error
      );
    }

    if (
      earnedBadges.includes(
        badgeName
      )
    ) {
      return;
    }

    earnedBadges.push(
      badgeName
    );

    localStorage.setItem(
      "safetiiBadges",
      JSON.stringify(
        earnedBadges
      )
    );
  }


  function completePasswordMission() {
    state.badgeEarned =
      true;

    state.missionCompleted =
      true;

    state.testIndex =
      getTestQuestions()
        .length;

    awardMissionPoints();
    saveBadge();

    localStorage.setItem(
      COMPLETED_KEY,
      "true"
    );

    localStorage.setItem(
      BADGE_KEY,
      "true"
    );

    mission.renderPasswordMissionResult();

    mission.showSection(
      "passwordMissionResult"
    );

    mission.setMemeTip(
      "Mission complete! You earned the Password Safe Keeper badge.",
      "congrats"
    );

    saveProgressSoon();
  }


  /* =====================================================
     RESULT SCREEN
  ===================================================== */

  mission.renderPasswordMissionResult =
    function renderPasswordMissionResult() {
      const passed =
        state.badgeEarned &&
        state.finalScore >=
          PASSING_PERCENTAGE;

      mission.setText(
        "passwordFinalScore",
        `${Math.round(
          state.finalScore
        )}%`
      );

      mission.setText(
        "passwordPointsEarned",
        state.missionPointsEarned
      );

      const title =
        mission.byId(
          "passwordResultTitle"
        );

      const message =
        mission.byId(
          "passwordResultMessage"
        );

      const badge =
        document.querySelector(
          ".password-earned-badge"
        );

      const replayButton =
        mission.byId(
          "replayPasswordMission"
        );


      if (passed) {
        if (title) {
          title.textContent =
            "Password Safe Keeper Badge Earned!";
        }

        if (message) {
          message.textContent =
            `You answered ${state.testCorrect} of ${getTestQuestions().length} questions correctly. You demonstrated password-strength analysis, recognized common password attacks, built two-factor protection, and defended threatened accounts.`;
        }

        badge?.classList.remove(
          "hidden"
        );

        if (replayButton) {
          replayButton.textContent =
            "Replay Mission";
        }

        return;
      }


      if (title) {
        title.textContent =
          "More Password Training Needed";
      }

      if (message) {
        message.textContent =
          `You answered ${state.testCorrect} of ${getTestQuestions().length} questions correctly and scored ${state.finalScore}%. Review the training and try the final inspection again. You need 80% to earn the badge.`;
      }

      badge?.classList.add(
        "hidden"
      );

      if (replayButton) {
        replayButton.textContent =
          "Try Final Test Again";
      }
    };


  function showFailedTestResult() {
    state.badgeEarned =
      false;

    state.missionCompleted =
      false;

    state.missionPointsEarned =
      0;

    localStorage.setItem(
      COMPLETED_KEY,
      "false"
    );

    localStorage.setItem(
      BADGE_KEY,
      "false"
    );

    mission.renderPasswordMissionResult();

    mission.showSection(
      "passwordMissionResult"
    );

    mission.setMemeTip(
      `You scored ${state.finalScore}%. Review the curriculum and try again. You need 80% to earn the badge.`,
      "thinking"
    );

    saveProgressSoon();
  }


  /* =====================================================
     RETRY AND REPLAY
  ===================================================== */

  function retryFailedFinalTest() {
    state.testIndex =
      0;

    state.testCorrect =
      0;

    state.testAnswered =
      false;

    state.finalScore =
      0;

    state.badgeEarned =
      false;

    state.missionCompleted =
      false;

    mission.showSection(
      "passwordTestIntroZone"
    );

    mission.setMemeTip(
      "Begin a fresh final-test attempt when you are ready.",
      "welcome"
    );

    saveProgressSoon();
  }


  function replayPasswordMission() {
    if (
      !state.badgeEarned
    ) {
      retryFailedFinalTest();

      return;
    }

    const confirmed =
      window.confirm(
        "Replay Password Safe Keeper from the beginning?\n\n" +
        "Mission progress will reset. Previously earned points will not be awarded again."
      );

    if (!confirmed) {
      return;
    }

    [
      "safetiiPasswordProgress",
      "passwordMissionCompleted",
      "passwordBadgeEarned",
      "passwordReplayRequested"
    ].forEach(
      (key) => {
        localStorage.removeItem(
          key
        );
      }
    );

    /*
      Keep passwordMissionRewardAwarded so students
      cannot earn the same 100 points repeatedly.
    */

    localStorage.setItem(
      "passwordReplayRequested",
      "true"
    );

    window.location.replace(
      `${window.location.pathname}?replay=true&reset=${Date.now()}`
    );
  }


  function checkReplayRequest() {
    const parameters =
      new URLSearchParams(
        window.location.search
      );

    const replayRequested =
      parameters.get(
        "replay"
      ) ===
        "true" ||
      localStorage.getItem(
        "passwordReplayRequested"
      ) ===
        "true";

    if (!replayRequested) {
      return;
    }

    [
      "safetiiPasswordProgress",
      "passwordMissionCompleted",
      "passwordBadgeEarned",
      "passwordReplayRequested"
    ].forEach(
      (key) => {
        localStorage.removeItem(
          key
        );
      }
    );

    mission.resetState();
    mission.resetPageDisplay();

    state.currentSection =
      "passwordMissionAlert";
  }


  /* =====================================================
     EVENT BINDING
  ===================================================== */

  function bindMainEvents() {
    bindButton(
      "nextVaultDoor",
      nextVaultChallenge
    );

    bindButton(
      "goPasswordFinalTest",
      openPasswordFinalTestIntro
    );

    bindButton(
      "beginPasswordFinalTest",
      beginPasswordFinalTest
    );

    bindButton(
      "nextPasswordTestQuestion",
      nextPasswordTestQuestion
    );

    bindButton(
      "replayPasswordMission",
      replayPasswordMission
    );
  }


  /* =====================================================
     INITIALIZATION
  ===================================================== */

  function initializeMainController() {
    checkReplayRequest();

    bindMainEvents();

    if (
      !state.missionStarted
    ) {
      mission.showSection(
        "passwordMissionAlert",
        {
          scroll:
            false,

          behavior:
            "auto"
        }
      );
    }

    mission.controllerReady =
      true;

    document.dispatchEvent(
      new CustomEvent(
        "passwordControllerReady"
      )
    );

    console.log(
      "Password Safe Keeper revised main controller loaded."
    );
  }


  if (
    document.readyState ===
    "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      initializeMainController,
      {
        once:
          true
      }
    );
  } else {
    initializeMainController();
  }
})();
