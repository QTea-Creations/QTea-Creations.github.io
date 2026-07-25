"use strict";

/* =========================================================
   SAFETII NET — PASSWORD SAFE KEEPER
   Mission 2 Main Controller

   This file controls:
   - Five Password Vault challenges
   - Twenty-question final test
   - Final score
   - Badge completion
   - One-time mission reward
   - Mission replay
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
      "password.js could not start. Check that password-data.js, password-core.js, and password-activities.js load first."
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

  function getArray(value) {
    return Array.isArray(value)
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


  function setProgress(
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


  function disableButtonGroup(
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

      const challenge =
        getCurrentVaultChallenge();

      /*
        All five doors have already been completed.
      */

      if (
        state.vaultComplete ||
        state.vaultIndex >=
          challenges.length
      ) {
        finishVaultPractice();

        return;
      }

      if (!challenge) {
        console.error(
          "The current Password Vault challenge could not be found."
        );

        return;
      }

      const answerGrid =
        mission.byId(
          "vaultAnswerGrid"
        );

      const nextButton =
        mission.byId(
          "nextVaultDoor"
        );

      if (
        !answerGrid ||
        !nextButton
      ) {
        console.error(
          "Password Vault HTML elements are missing."
        );

        return;
      }

      state.vaultAnswered =
        false;

      mission.setText(
        "vaultDoorNumber",
        state.vaultIndex + 1
      );

      mission.setText(
        "vaultChallengeTitle",
        challenge.title
      );

      mission.setText(
        "vaultChallengeText",
        challenge.text
      );

      setProgress(
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
            String(answerIndex);

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
        `Vault Door ${state.vaultIndex + 1}: choose the safest answer.`,
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

    state.vaultAnswered =
      true;

    disableButtonGroup(
      ".vault-answer-button"
    );

    const correct =
      selectedIndex ===
      challenge.correctIndex;

    const buttons =
      document.querySelectorAll(
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

    const vaultDoor =
      mission.byId(
        "passwordVaultDoor"
      );

    if (correct) {
      state.vaultDoorsSecured =
        Math.max(
          state.vaultDoorsSecured,
          state.vaultIndex + 1
        );

      selectedButton?.classList.add(
        "correct"
      );

      vaultDoor?.classList.add(
        "vault-door-open"
      );

      setProgress(
        "vaultDoorsSecured",
        state.vaultDoorsSecured
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
        "Excellent! That vault door is secure.",
        "congrats"
      );
    } else {
      selectedButton?.classList.add(
        "incorrect"
      );

      vaultDoor?.classList.add(
        "vault-door-wrong"
      );

      mission.setFeedback({
        id:
          "vaultChallengeFeedback",

        message:
          `Review the safer answer. ${challenge.explanation}`,

        correct:
          false
      });

      mission.setMemeTip(
        "That choice could leave the account vulnerable. Read the explanation before continuing.",
        "wrong"
      );
    }

    const nextButton =
      mission.byId(
        "nextVaultDoor"
      );

    if (nextButton) {
      nextButton.textContent =
        state.vaultIndex >=
          getVaultChallenges().length -
            1
          ? "Finish Vault Practice"
          : "Continue to Next Door";

      mission.showElement(
        nextButton
      );
    }

    saveProgressSoon();
  }


  function nextVaultChallenge() {
    if (
      !state.vaultAnswered
    ) {
      return;
    }

    state.vaultIndex +=
      1;

    if (
      state.vaultIndex >=
      getVaultChallenges().length
    ) {
      finishVaultPractice();

      return;
    }

    mission.loadVaultChallenge();

    saveProgressSoon();
  }


  function finishVaultPractice() {
    state.vaultComplete =
      true;

    state.vaultIndex =
      getVaultChallenges()
        .length;

    state.vaultDoorsSecured =
      getVaultChallenges()
        .length;

    setProgress(
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
      "All five doors are secure. You are ready for the Password Safe Keeper final test!",
      "congrats"
    );

    saveProgressSoon();
  }


  function openPasswordFinalTestIntro() {
    if (
      !state.vaultComplete
    ) {
      mission.setMemeTip(
        "Secure all five Password Vault doors before beginning the final test.",
        "thinking"
      );

      return;
    }

    mission.loadHeroNames?.();

    mission.showSection(
      "passwordTestIntroZone"
    );

    mission.setMemeTip(
      "The final inspection contains 20 questions. Score at least 80% to earn the badge.",
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
    /*
      Starting from the introduction begins a fresh
      test attempt.
    */

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

    mission.showSection(
      "passwordTestZone"
    );

    mission.loadPasswordTestQuestion();

    mission.setMemeTip(
      "Read every answer carefully. Choose the safest response.",
      "welcome"
    );

    saveProgressSoon();
  }


  mission.loadPasswordTestQuestion =
    function loadPasswordTestQuestion() {
      const questions =
        getTestQuestions();

      /*
        A restored test might already be at the end.
      */

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
          "Password final-test elements are missing."
        );

        return;
      }

      state.testAnswered =
        false;

      mission.setText(
        "passwordTestNumber",
        state.testIndex + 1
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
            String(choiceIndex);

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

    disableButtonGroup(
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
        "Correct! That choice protects the password or account.",
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
          `Review this one carefully. ${question.explanation}`,

        correct:
          false
      });

      mission.setMemeTip(
        "Read the explanation and remember the safer response.",
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
          getTestQuestions().length -
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
      getTestQuestions().length
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

    const passed =
      state.finalScore >=
      PASSING_PERCENTAGE;

    if (passed) {
      completePasswordMission();
    } else {
      showFailedTestResult();
    }
  }


  /* =====================================================
     PASSING RESULT AND BADGE
  ===================================================== */

  function rewardAlreadyAwarded() {
    return (
      localStorage.getItem(
        REWARD_KEY
      ) === "true"
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


  function completePasswordMission() {
    state.badgeEarned =
      true;

    state.missionCompleted =
      true;

    state.testIndex =
      getTestQuestions()
        .length;

    awardMissionPoints();

    localStorage.setItem(
      COMPLETED_KEY,
      "true"
    );

    localStorage.setItem(
      BADGE_KEY,
      "true"
    );

    /*
      A general badge list can be read by the
      notebook or dashboard later.
    */

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
        Array.isArray(stored)
          ? stored
          : [];
    } catch (error) {
      console.error(
        "Could not read Safetii Net badges:",
        error
      );
    }

    if (
      !earnedBadges.includes(
        badgeName
      )
    ) {
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


  mission.renderPasswordMissionResult =
    function renderPasswordMissionResult() {
      const passed =
        state.finalScore >=
        PASSING_PERCENTAGE &&
        state.badgeEarned;

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

      if (passed) {
        if (title) {
          title.textContent =
            "Password Safe Keeper Badge Earned!";
        }

        if (message) {
          message.textContent =
            `You answered ${state.testCorrect} of ${getTestQuestions().length} questions correctly. You proved that you can recognize stronger passwords, avoid password reuse, protect secret codes, and respond to account threats.`;
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
          `You answered ${state.testCorrect} of ${getTestQuestions().length} questions correctly and scored ${state.finalScore}%. Review the explanations and try the final inspection again. You need 80% to earn the badge.`;
      }

      badge?.classList.add(
        "hidden"
      );

      if (replayButton) {
        replayButton.textContent =
          "Try Final Test Again";
      }
    };


  /* =====================================================
     FAILED TEST RESULT
  ===================================================== */

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
      `You scored ${state.finalScore}%. Review the explanations and try again. You need 80% to earn the badge.`,
      "thinking"
    );

    saveProgressSoon();
  }


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
      "Take another look at the safety rules, then begin a fresh final-test attempt.",
      "welcome"
    );

    saveProgressSoon();
  }


  /* =====================================================
     FULL MISSION REPLAY
  ===================================================== */

  function replayPasswordMission() {
    /*
      A failed test uses this button as a test retry.
      A completed mission uses it as a full replay.
    */

    if (
      !state.badgeEarned
    ) {
      retryFailedFinalTest();

      return;
    }

    const confirmed =
      window.confirm(
        "Replay Password Safe Keeper from the beginning?\n\n" +
        "Your mission progress will reset. Previously earned reward points will not be awarded again."
      );

    if (!confirmed) {
      return;
    }

    const keysToReset = [
      "safetiiPasswordProgress",
      "passwordMissionCompleted",
      "passwordBadgeEarned",
      "passwordReplayRequested"
    ];

    keysToReset.forEach(
      (key) => {
        localStorage.removeItem(
          key
        );
      }
    );

    /*
      Do not remove passwordMissionRewardAwarded.
      That prevents repeated point farming.
    */

    localStorage.setItem(
      "passwordReplayRequested",
      "true"
    );

    window.location.replace(
      `${window.location.pathname}?replay=true&reset=${Date.now()}`
    );
  }


  /* =====================================================
     REPLAY REQUEST HANDLING
  ===================================================== */

  function checkReplayRequest() {
    const parameters =
      new URLSearchParams(
        window.location.search
      );

    const replayRequested =
      parameters.get(
        "replay"
      ) === "true" ||
      localStorage.getItem(
        "passwordReplayRequested"
      ) === "true";

    if (!replayRequested) {
      return;
    }

    localStorage.removeItem(
      "safetiiPasswordProgress"
    );

    localStorage.removeItem(
      "passwordMissionCompleted"
    );

    localStorage.removeItem(
      "passwordBadgeEarned"
    );

    localStorage.removeItem(
      "passwordReplayRequested"
    );

    mission.resetState();

    /*
      The typed practice password is also cleared
      by resetPageDisplay().
    */

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
     CONTROLLER INITIALIZATION
  ===================================================== */

  function initializeMainController() {
    checkReplayRequest();

    bindMainEvents();

    /*
      Keep all sections hidden except the introduction
      until password-progress.js restores the correct
      saved location.
    */

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
      "Password Safe Keeper main controller loaded."
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
