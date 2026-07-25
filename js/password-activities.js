"use strict";

/* =========================================================
   SAFETII NET — PASSWORD SAFE KEEPER
   MISSION 2 TRAINING ACTIVITIES

   Training 1:
   Password Safety Lab

   Training 2:
   Password Cracker Challenge

   Training 3:
   Two-Factor Security Gate

   Training 4:
   Account Defense Simulator

   Important:
   Pretend passwords typed by students are analyzed only
   while they are in the input field. They are never saved
   to mission state or localStorage.
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
      "password-activities.js could not start. Check that password-data.js and password-core.js load first."
    );

    return;
  }

  const state =
    mission.state;

  const data =
    mission.data;


  /* =====================================================
     ACTIVITY DATA

     Keep the curriculum order stable so saved indexes
     always restore the same activity.
  ===================================================== */

  const comparisonChallenges =
    Array.isArray(
      data.comparisonChallenges
    )
      ? data.comparisonChallenges
      : [];


  const passwordAttackChallenges =
    Array.isArray(
      data.passwordAttackChallenges
    )
      ? data.passwordAttackChallenges
      : [];


  const twoFactorScenarios =
    Array.isArray(
      data.twoFactorScenarios
    )
      ? data.twoFactorScenarios
      : [];


  const accountDefenseScenarios =
    Array.isArray(
      data.accountDefenseScenarios
    )
      ? data.accountDefenseScenarios
      : [];


  /* =====================================================
     GENERAL HELPERS
  ===================================================== */

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


  function bindButton(
    id,
    callback
  ) {
    const button =
      mission.byId(id);

    if (
      !button ||
      button.dataset
        .passwordActivityBound ===
        "true"
    ) {
      return;
    }

    button.dataset.passwordActivityBound =
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

          button.classList.remove(
            "correct",
            "incorrect",
            "selected",
            "active-choice",
            "shake"
          );
        }
      );
  }


  function showNextButton(
    id
  ) {
    mission.showElement(
      mission.byId(id)
    );
  }


  function hideNextButton(
    id
  ) {
    mission.hideElement(
      mission.byId(id)
    );
  }


  /* =====================================================
     MISSION INTRODUCTION
  ===================================================== */

  mission.acceptPasswordMission =
    function acceptPasswordMission() {
      state.missionStarted =
        true;

      mission.showSection(
        "passphraseZone"
      );

      mission.loadPasswordComparison();

      mission.setMemeTip(
        "Begin in the Password Safety Lab. Compare each pretend password and look for length, unpredictability, and personal clues.",
        "welcome"
      );

      saveProgressSoon();
    };


  /* =====================================================
     TRAINING 1 — PASSWORD SAFETY LAB
     PART 1: PASSWORD COMPARISONS
  ===================================================== */

  function getCurrentComparison() {
    return comparisonChallenges[
      state.comparisonIndex
    ];
  }


  mission.loadPasswordComparison =
    function loadPasswordComparison() {
      if (
        state.comparisonComplete ||
        state.comparisonIndex >=
          comparisonChallenges.length
      ) {
        completePasswordComparisons();

        return;
      }

      const challenge =
        getCurrentComparison();

      const prompt =
        mission.byId(
          "passphrasePrompt"
        );

      const choiceGrid =
        mission.byId(
          "passphraseChoiceGrid"
        );

      if (
        !challenge ||
        !prompt ||
        !choiceGrid
      ) {
        console.error(
          "Password comparison elements or data are missing."
        );

        return;
      }

      state.comparisonAnswered =
        false;

      prompt.textContent =
        challenge.prompt;

      choiceGrid.innerHTML =
        "";

      mission.clearFeedback(
        "passphraseFeedback"
      );

      hideNextButton(
        "nextPassphraseChallenge"
      );

      setCounter(
        "passwordLabProgress",
        state.comparisonIndex
      );

      challenge.choices.forEach(
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
            "password-choice-button";

          button.dataset.choiceIndex =
            String(
              choiceIndex
            );

          const passwordText =
            document.createElement(
              "strong"
            );

          passwordText.textContent =
            choice.value;

          const note =
            document.createElement(
              "span"
            );

          note.className =
            "choice-note";

          note.textContent =
            choice.note;

          button.append(
            passwordText,
            note
          );

          button.addEventListener(
            "click",
            () => {
              answerPasswordComparison(
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


  function answerPasswordComparison(
    selectedIndex,
    selectedButton
  ) {
    if (
      state.comparisonAnswered
    ) {
      return;
    }

    const challenge =
      getCurrentComparison();

    if (!challenge) {
      return;
    }

    state.comparisonAnswered =
      true;

    const correct =
      selectedIndex ===
      challenge.correctIndex;

    const buttons =
      document.querySelectorAll(
        ".password-choice-button"
      );

    buttons.forEach(
      (
        button,
        index
      ) => {
        button.disabled =
          true;

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

    if (correct) {
      state.comparisonCorrect +=
        1;

      selectedButton?.classList.add(
        "correct"
      );

      mission.setFeedback({
        id:
          "passphraseFeedback",

        message:
          `Correct! ${challenge.explanation}`,

        correct:
          true
      });

      mission.setMemeTip(
        "Excellent. You recognized the password that better resists guessing attacks.",
        "congrats"
      );
    } else {
      selectedButton?.classList.add(
        "incorrect"
      );

      mission.setFeedback({
        id:
          "passphraseFeedback",

        message:
          `Good try. ${challenge.explanation}`,

        correct:
          false
      });

      mission.setMemeTip(
        "Look beyond symbols. A short, common, or predictable password can still be weak.",
        "wrong"
      );
    }

    showNextButton(
      "nextPassphraseChallenge"
    );

    saveProgressSoon();
  }


  function nextPasswordComparison() {
    if (
      !state.comparisonAnswered
    ) {
      return;
    }

    state.comparisonIndex +=
      1;

    if (
      state.comparisonIndex >=
      comparisonChallenges.length
    ) {
      completePasswordComparisons();

      return;
    }

    mission.loadPasswordComparison();

    saveProgressSoon();
  }


  function completePasswordComparisons() {
    state.comparisonComplete =
      true;

    state.comparisonIndex =
      comparisonChallenges.length;

    setCounter(
      "passwordLabProgress",
      comparisonChallenges.length
    );

    mission.hideElement(
      mission.byId(
        "passwordComparisonPart"
      )
    );

    unlockTypedPasswordPart();

    saveProgressSoon();
  }


  function unlockTypedPasswordPart() {
    const typedPart =
      mission.byId(
        "typedPasswordPart"
      );

    if (!typedPart) {
      return;
    }

    typedPart.classList.remove(
      "locked-lab-part"
    );

    typedPart.classList.add(
      "unlocked"
    );

    mission.setMemeTip(
      "Now create a pretend password and improve it until the analyzer marks it as strong.",
      "welcome"
    );
  }


  /* =====================================================
     TRAINING 1 — PASSWORD SAFETY LAB
     PART 2: PRETEND PASSWORD ANALYZER
  ===================================================== */

  function containsLowercase(
    value
  ) {
    return /[a-z]/.test(
      value
    );
  }


  function containsUppercase(
    value
  ) {
    return /[A-Z]/.test(
      value
    );
  }


  function containsNumber(
    value
  ) {
    return /\d/.test(
      value
    );
  }


  function containsSymbol(
    value
  ) {
    return /[^A-Za-z0-9\s]/.test(
      value
    );
  }


  function containsSpace(
    value
  ) {
    return /\s/.test(
      value
    );
  }


  function containsRepeatedCharacters(
    value
  ) {
    return /(.)\1{2,}/i.test(
      value
    );
  }


  function containsWeakSequence(
    value
  ) {
    const lowerValue =
      value.toLowerCase();

    const sequences =
      Array.isArray(
        data.weakSequences
      )
        ? data.weakSequences
        : [];

    return sequences.some(
      (sequence) => {
        return lowerValue.includes(
          String(
            sequence
          ).toLowerCase()
        );
      }
    );
  }


  function containsCommonPasswordWord(
    value
  ) {
    const lowerValue =
      value.toLowerCase();

    const words =
      Array.isArray(
        data.commonPasswordWords
      )
        ? data.commonPasswordWords
        : Array.isArray(
            data.bannedWords
          )
          ? data.bannedWords
          : [];

    return words.some(
      (word) => {
        return lowerValue.includes(
          String(
            word
          ).toLowerCase()
        );
      }
    );
  }


  function containsDatePattern(
    value
  ) {
    const yearPattern =
      /\b(?:19|20)\d{2}\b/;

    const fullDatePattern =
      /\b\d{1,2}[/-]\d{1,2}[/-]\d{2,4}\b/;

    return (
      yearPattern.test(
        value
      ) ||
      fullDatePattern.test(
        value
      )
    );
  }


  function hasLongPhrasePattern(
    value
  ) {
    const trimmed =
      value.trim();

    const words =
      trimmed
        .split(
          /[\s\-_]+/
        )
        .filter(Boolean);

    return (
      words.length >=
        3 ||
      trimmed.length >=
        16
    );
  }


  function hasCharacterVariety(
    value
  ) {
    const groups = [
      containsLowercase(
        value
      ),

      containsUppercase(
        value
      ),

      containsNumber(
        value
      ),

      containsSymbol(
        value
      ) ||
        containsSpace(
          value
        )
    ];

    return (
      groups.filter(
        Boolean
      ).length >=
      3
    );
  }


  function analyzePracticePassword(
    pretendPassword
  ) {
    const value =
      String(
        pretendPassword
      ).trim();

    const checks = [
      {
        label:
          "At least 12 characters",

        passed:
          value.length >=
          12,

        explanation:
          "Longer passwords create more possible combinations for an attacker to test."
      },


      {
        label:
          "Uses a long phrase or several words",

        passed:
          hasLongPhrasePattern(
            value
          ),

        explanation:
          "Several unrelated words can create a longer and less predictable passphrase."
      },


      {
        label:
          "Uses several character types",

        passed:
          hasCharacterVariety(
            value
          ),

        explanation:
          "Letters, numbers, spaces, or symbols can add variety when the password is already long."
      },


      {
        label:
          "Avoids common password words",

        passed:
          !containsCommonPasswordWord(
            value
          ),

        explanation:
          "Dictionary attacks test common words and commonly used passwords."
      },


      {
        label:
          "Avoids easy sequences",

        passed:
          !containsWeakSequence(
            value
          ),

        explanation:
          "Patterns such as 123456, abcdef, and qwerty are tested frequently."
      },


      {
        label:
          "Avoids repeated characters",

        passed:
          !containsRepeatedCharacters(
            value
          ),

        explanation:
          "Repeated letters and numbers are predictable and add little protection."
      },


      {
        label:
          "Does not look like a date or year",

        passed:
          !containsDatePattern(
            value
          ),

        explanation:
          "Birthdays and years may be discovered through posts, profiles, or conversations."
      },


      {
        label:
          "Includes lowercase letters",

        passed:
          containsLowercase(
            value
          ),

        explanation:
          "Lowercase letters increase the possible combinations."
      },


      {
        label:
          "Includes uppercase letters",

        passed:
          containsUppercase(
            value
          ),

        explanation:
          "Uppercase letters can add variety to a longer passphrase."
      },


      {
        label:
          "Includes a number, symbol, or space",

        passed:
          containsNumber(
            value
          ) ||
          containsSymbol(
            value
          ) ||
          containsSpace(
            value
          ),

        explanation:
          "Additional character types can strengthen a password that is already long and unpredictable."
      }
    ];

    const score =
      checks.filter(
        (check) =>
          check.passed
      ).length;

    let title =
      "Unsafe Practice Password";

    let icon =
      "🔴";

    let label =
      "Unsafe";

    let message =
      "This pretend password would be vulnerable to several common guessing methods.";

    let percentage =
      25;

    let gradient =
      "linear-gradient(90deg, #ef607a, #ff936f)";


    if (score >= 9) {
      title =
        "Strong Practice Password";

      icon =
        "🟢";

      label =
        "Strong";

      message =
        "Excellent. This pretend password is long, varied, and difficult to predict.";

      percentage =
        100;

      gradient =
        "linear-gradient(90deg, #28ba78, #37c7c9)";
    } else if (
      score >= 7
    ) {
      title =
        "Stronger Practice Password";

      icon =
        "🔵";

      label =
        "Stronger";

      message =
        "This pretend password resists several attacks, but it could still be improved.";

      percentage =
        78;

      gradient =
        "linear-gradient(90deg, #329ce0, #7757db)";
    } else if (
      score >= 5
    ) {
      title =
        "Getting Safer";

      icon =
        "🟡";

      label =
        "Getting Safer";

      message =
        "You are making progress. Review the failed checks and strengthen it again.";

      percentage =
        55;

      gradient =
        "linear-gradient(90deg, #e9b62e, #f19b3e)";
    }

    const improvements =
      checks
        .filter(
          (check) =>
            !check.passed
        )
        .map(
          (check) =>
            check.explanation
        );

    return {
      checks,
      score,
      title,
      icon,
      label,
      message,
      percentage,
      gradient,
      improvements,

      successful:
        score >= 8
    };
  }


  function renderPasswordAnalysis(
    result
  ) {
    const resultPanel =
      mission.byId(
        "passwordAnalysisResult"
      );

    const checkGrid =
      mission.byId(
        "passwordCheckGrid"
      );

    const improvementList =
      mission.byId(
        "passwordImprovementList"
      );

    const strengthFill =
      mission.byId(
        "passwordStrengthFill"
      );

    if (
      !resultPanel ||
      !checkGrid ||
      !improvementList ||
      !strengthFill
    ) {
      console.error(
        "Password analyzer HTML elements are missing."
      );

      return;
    }

    mission.showElement(
      resultPanel
    );

    mission.setText(
      "passwordVerdictIcon",
      result.icon
    );

    mission.setText(
      "passwordVerdictTitle",
      result.title
    );

    mission.setText(
      "passwordVerdictMessage",
      result.message
    );

    mission.setText(
      "passwordStrengthLabel",
      `${result.label} — ${result.score}/10 checks`
    );

    strengthFill.style.width =
      `${result.percentage}%`;

    strengthFill.style.background =
      result.gradient;

    checkGrid.innerHTML =
      "";

    result.checks.forEach(
      (check) => {
        const card =
          document.createElement(
            "article"
          );

        card.className =
          `password-check-item ${
            check.passed
              ? "pass"
              : "fail"
          }`;

        const heading =
          document.createElement(
            "strong"
          );

        heading.textContent =
          `${
            check.passed
              ? "✅"
              : "❌"
          } ${check.label}`;

        const explanation =
          document.createElement(
            "p"
          );

        explanation.textContent =
          check.explanation;

        card.append(
          heading,
          explanation
        );

        checkGrid.appendChild(
          card
        );
      }
    );

    improvementList.innerHTML =
      "";

    if (
      result.improvements.length ===
      0
    ) {
      const item =
        document.createElement(
          "li"
        );

      item.textContent =
        "This pretend password meets all Password Safety Lab goals.";

      improvementList.appendChild(
        item
      );
    } else {
      result.improvements.forEach(
        (improvement) => {
          const item =
            document.createElement(
              "li"
            );

          item.textContent =
            improvement;

          improvementList.appendChild(
            item
          );
        }
      );
    }

    if (
      result.successful
    ) {
      state.passwordBuilderComplete =
        true;

      mission.showElement(
        mission.byId(
          "passwordBuilderSuccess"
        )
      );

      mission.setButtonState({
        id:
          "finishPasswordSafetyLab",

        unlocked:
          true,

        unlockedText:
          "Complete Password Safety Lab ✅",

        lockedText:
          "Build a Strong Practice Password to Continue"
      });

      setCounter(
        "passwordLabProgress",
        comparisonChallenges.length +
          1
      );

      mission.setMemeTip(
        "Excellent. Your pretend password resists common words, simple patterns, and short-password attacks.",
        "congrats"
      );
    } else {
      state.passwordBuilderComplete =
        false;

      mission.hideElement(
        mission.byId(
          "passwordBuilderSuccess"
        )
      );

      mission.setButtonState({
        id:
          "finishPasswordSafetyLab",

        unlocked:
          false,

        unlockedText:
          "Complete Password Safety Lab ✅",

        lockedText:
          "Build a Strong Practice Password to Continue"
      });

      mission.setMemeTip(
        "Review the red checks, revise the pretend password, and analyze it again.",
        "thinking"
      );
    }

    saveProgressSoon();
  }


  function analyzeTypedPracticePassword() {
    const input =
      mission.byId(
        "practicePasswordInput"
      );

    if (!input) {
      return;
    }

    const pretendPassword =
      input.value;

    if (
      !pretendPassword.trim()
    ) {
      mission.showElement(
        mission.byId(
          "passwordAnalysisResult"
        )
      );

      mission.setText(
        "passwordVerdictIcon",
        "⚠️"
      );

      mission.setText(
        "passwordVerdictTitle",
        "Type a Pretend Password"
      );

      mission.setText(
        "passwordVerdictMessage",
        "Create a made-up password for this activity. Never enter a password used on a real account."
      );

      mission.setMemeTip(
        "Type a pretend password first. Never use a real password in the training lab.",
        "wrong"
      );

      return;
    }

    const result =
      analyzePracticePassword(
        pretendPassword
      );

    renderPasswordAnalysis(
      result
    );
  }


  function togglePracticePassword() {
    const input =
      mission.byId(
        "practicePasswordInput"
      );

    const button =
      mission.byId(
        "togglePracticePassword"
      );

    if (
      !input ||
      !button
    ) {
      return;
    }

    const currentlyVisible =
      input.type ===
      "text";

    input.type =
      currentlyVisible
        ? "password"
        : "text";

    button.textContent =
      currentlyVisible
        ? "👁️ Show"
        : "🙈 Hide";

    button.setAttribute(
      "aria-pressed",
      String(
        !currentlyVisible
      )
    );

    button.setAttribute(
      "aria-label",
      currentlyVisible
        ? "Show pretend password"
        : "Hide pretend password"
    );
  }


  function finishPasswordSafetyLab() {
    if (
      !state.passwordBuilderComplete
    ) {
      return;
    }

    state.passwordLabComplete =
      true;

    const input =
      mission.byId(
        "practicePasswordInput"
      );

    if (input) {
      input.value =
        "";

      input.type =
        "password";
    }

    mission.showSection(
      "passwordAttackZone"
    );

    mission.loadPasswordAttack();

    mission.setMemeTip(
      "Training 2 begins now. Investigate how attackers test common words, personal clues, patterns, and password reuse.",
      "welcome"
    );

    saveProgressSoon();
  }


  /* =====================================================
     TRAINING 2 — PASSWORD CRACKER CHALLENGE
  ===================================================== */

  function getCurrentPasswordAttack() {
    return passwordAttackChallenges[
      state.passwordAttackIndex
    ];
  }


  function getResistanceSettings(
    resistance
  ) {
    const settings = {
      low: {
        percent:
          24,

        label:
          "Low Resistance",

        status:
          "The simulated attacker finds useful clues quickly.",

        className:
          "low-resistance"
      },

      medium: {
        percent:
          58,

        label:
          "Medium Resistance",

        status:
          "The attack takes longer, but the password still has weaknesses.",

        className:
          "medium-resistance"
      },

      high: {
        percent:
          94,

        label:
          "High Resistance",

        status:
          "The simulation struggles to find useful patterns or clues.",

        className:
          "high-resistance"
      }
    };

    return (
      settings[
        resistance
      ] ||
      settings.low
    );
  }


  mission.loadPasswordAttack =
    function loadPasswordAttack() {
      if (
        state.passwordAttackComplete ||
        state.passwordAttackIndex >=
          passwordAttackChallenges.length
      ) {
        completePasswordAttackTraining();

        return;
      }

      const challenge =
        getCurrentPasswordAttack();

      if (!challenge) {
        console.error(
          "Password attack challenge data is missing."
        );

        return;
      }

      state.passwordAttackAnswered =
        false;

      mission.setText(
        "passwordAttackIcon",
        challenge.icon ||
          "🤖"
      );

      mission.setText(
        "passwordAttackName",
        challenge.attackName
      );

      mission.setText(
        "passwordAttackDescription",
        challenge.attackDescription
      );

      mission.setText(
        "passwordAttackTarget",
        challenge.password
      );

      mission.setText(
        "passwordAttackResistanceBadge",
        "Prediction Needed"
      );

      mission.setText(
        "passwordAttackStatus",
        "Study the simulated password and predict its resistance."
      );

      mission.setText(
        "passwordAttackResistanceLabel",
        "Not analyzed"
      );

      mission.setText(
        "passwordAttackCrackTime",
        "Unknown"
      );

      setCounter(
        "passwordAttackProgress",
        state.passwordAttackIndex
      );

      const meter =
        mission.byId(
          "passwordAttackMeter"
        );

      const meterFill =
        mission.byId(
          "passwordAttackMeterFill"
        );

      if (meter) {
        meter.setAttribute(
          "aria-valuenow",
          "0"
        );
      }

      if (meterFill) {
        meterFill.style.width =
          "0%";

        meterFill.className =
          "attack-resistance-fill";
      }

      mission.hideElement(
        mission.byId(
          "passwordAttackAnalysis"
        )
      );

      hideNextButton(
        "nextPasswordAttack"
      );

      mission.clearFeedback(
        "passwordAttackFeedback"
      );

      enableButtons(
        ".password-attack-choice"
      );

      mission.setMemeTip(
        "Read the attack description and predict whether the pretend password has low, medium, or high resistance.",
        "thinking"
      );
    };


  function answerPasswordAttack(
    selectedResistance,
    selectedButton
  ) {
    if (
      state.passwordAttackAnswered
    ) {
      return;
    }

    const challenge =
      getCurrentPasswordAttack();

    if (!challenge) {
      return;
    }

    state.passwordAttackAnswered =
      true;

    disableButtons(
      ".password-attack-choice"
    );

    const correct =
      selectedResistance ===
      challenge.resistance;

    const correctButton =
      document.querySelector(
        `[data-attack-answer="${challenge.resistance}"]`
      );

    correctButton?.classList.add(
      "correct"
    );

    if (correct) {
      state.passwordAttackCorrect +=
        1;

      selectedButton?.classList.add(
        "correct"
      );
    } else {
      selectedButton?.classList.add(
        "incorrect"
      );
    }

    renderPasswordAttackResult(
      challenge,
      correct
    );

    saveProgressSoon();
  }


  function renderPasswordAttackResult(
    challenge,
    predictionCorrect
  ) {
    const settings =
      getResistanceSettings(
        challenge.resistance
      );

    const meter =
      mission.byId(
        "passwordAttackMeter"
      );

    const meterFill =
      mission.byId(
        "passwordAttackMeterFill"
      );

    if (meter) {
      meter.setAttribute(
        "aria-valuenow",
        String(
          settings.percent
        )
      );
    }

    if (meterFill) {
      meterFill.style.width =
        `${settings.percent}%`;

      meterFill.className =
        `attack-resistance-fill ${settings.className}`;
    }

    mission.setText(
      "passwordAttackResistanceBadge",
      settings.label
    );

    mission.setText(
      "passwordAttackResistanceLabel",
      settings.label
    );

    mission.setText(
      "passwordAttackStatus",
      settings.status
    );

    mission.setText(
      "passwordAttackCrackTime",
      challenge.crackTime
    );

    mission.setText(
      "passwordAttackExplanation",
      challenge.explanation
    );

    const weaknessList =
      mission.byId(
        "passwordAttackWeaknessList"
      );

    if (weaknessList) {
      weaknessList.innerHTML =
        "";

      const findings = [
        ...(
          Array.isArray(
            challenge.weaknesses
          )
            ? challenge.weaknesses
            : []
        ),

        ...(
          Array.isArray(
            challenge.strengths
          )
            ? challenge.strengths
            : []
        )
      ];

      findings.forEach(
        (finding) => {
          const item =
            document.createElement(
              "li"
            );

          item.textContent =
            finding;

          weaknessList.appendChild(
            item
          );
        }
      );

      if (
        findings.length ===
        0
      ) {
        const item =
          document.createElement(
            "li"
          );

        item.textContent =
          "The simulation found no obvious common-word, personal-clue, or pattern weakness.";

        weaknessList.appendChild(
          item
        );
      }
    }

    mission.showElement(
      mission.byId(
        "passwordAttackAnalysis"
      )
    );

    if (predictionCorrect) {
      mission.setFeedback({
        id:
          "passwordAttackFeedback",

        message:
          `Correct prediction! ${challenge.explanation}`,

        correct:
          true
      });

      mission.setMemeTip(
        "Excellent analysis. You correctly predicted how the password would resist the simulated attack.",
        "congrats"
      );
    } else {
      mission.setFeedback({
        id:
          "passwordAttackFeedback",

        message:
          `The correct result is ${settings.label}. ${challenge.explanation}`,

        correct:
          false
      });

      mission.setMemeTip(
        "Study what the simulation found. Length, patterns, personal clues, and reuse all affect resistance.",
        "wrong"
      );
    }

    showNextButton(
      "nextPasswordAttack"
    );
  }


  function nextPasswordAttack() {
    if (
      !state.passwordAttackAnswered
    ) {
      return;
    }

    state.passwordAttackIndex +=
      1;

    if (
      state.passwordAttackIndex >=
      passwordAttackChallenges.length
    ) {
      completePasswordAttackTraining();

      return;
    }

    mission.loadPasswordAttack();

    saveProgressSoon();
  }


  function completePasswordAttackTraining() {
    state.passwordAttackComplete =
      true;

    state.passwordAttackIndex =
      passwordAttackChallenges.length;

    setCounter(
      "passwordAttackProgress",
      passwordAttackChallenges.length
    );

    mission.showSection(
      "twoFactorZone"
    );

    mission.loadTwoFactorScenario();

    mission.setMemeTip(
      "Training 3 begins now. Build two different protection layers for each account.",
      "welcome"
    );

    saveProgressSoon();
  }


  /* =====================================================
     TRAINING 3 — TWO-FACTOR SECURITY GATE
  ===================================================== */

  function getCurrentTwoFactorScenario() {
    return twoFactorScenarios[
      state.twoFactorIndex
    ];
  }


  mission.loadTwoFactorScenario =
    function loadTwoFactorScenario() {
      if (
        state.twoFactorComplete ||
        state.twoFactorIndex >=
          twoFactorScenarios.length
      ) {
        completeTwoFactorTraining();

        return;
      }

      const scenario =
        getCurrentTwoFactorScenario();

      const choiceGrid =
        mission.byId(
          "secondFactorChoiceGrid"
        );

      if (
        !scenario ||
        !choiceGrid
      ) {
        console.error(
          "Two-factor scenario data or HTML elements are missing."
        );

        return;
      }

      state.twoFactorAnswered =
        false;

      mission.setText(
        "twoFactorAccountIcon",
        scenario.accountIcon ||
          "🔐"
      );

      mission.setText(
        "twoFactorAccountName",
        scenario.accountName
      );

      mission.setText(
        "twoFactorScenarioText",
        scenario.scenario
      );

      mission.setText(
        "firstFactorName",
        scenario.firstFactor
      );

      mission.setText(
        "firstFactorDescription",
        scenario.firstFactor ===
          "Choose the full setup"
          ? "Identify the setup that uses two genuinely different factors."
          : "This is the account’s first protection factor."
      );

      mission.setText(
        "securityGateSecondFactor",
        "Second Layer Needed"
      );

      setCounter(
        "twoFactorProgress",
        state.twoFactorIndex
      );

      mission.clearFeedback(
        "twoFactorFeedback"
      );

      hideNextButton(
        "nextTwoFactorScenario"
      );

      const secondLayer =
        mission.byId(
          "securityGateLayerTwo"
        );

      secondLayer?.classList.remove(
        "active",
        "correct",
        "incorrect"
      );

      const gateDisplay =
        mission.byId(
          "securityGateDisplay"
        );

      gateDisplay?.classList.remove(
        "security-gate-protected",
        "security-gate-warning"
      );

      choiceGrid.innerHTML =
        "";

      scenario.choices.forEach(
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
            "second-factor-choice";

          button.dataset.choiceIndex =
            String(
              choiceIndex
            );

          const icon =
            document.createElement(
              "span"
            );

          icon.className =
            "second-factor-choice-icon";

          icon.setAttribute(
            "aria-hidden",
            "true"
          );

          icon.textContent =
            choice.icon ||
            "🔐";

          const label =
            document.createElement(
              "strong"
            );

          label.textContent =
            choice.label;

          const type =
            document.createElement(
              "small"
            );

          type.textContent =
            getFactorTypeLabel(
              choice.factorType
            );

          button.append(
            icon,
            label,
            type
          );

          button.addEventListener(
            "click",
            () => {
              answerTwoFactorScenario(
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

      mission.setMemeTip(
        "Two-factor authentication uses two different kinds of proof—not the same password twice.",
        "thinking"
      );
    };


  function getFactorTypeLabel(
    factorType
  ) {
    const labels = {
      know:
        "Something you know",

      have:
        "Something you have",

      are:
        "Something you are",

      identity:
        "Account identifier",

      unsafe:
        "Unsafe action",

      "safe-response":
        "Safe security response",

      "know-have":
        "Knowledge + possession",

      "know-know":
        "Two knowledge steps",

      "identifier-know":
        "Identifier + knowledge"
    };

    return (
      labels[
        factorType
      ] ||
      "Security option"
    );
  }


  function answerTwoFactorScenario(
    selectedIndex,
    selectedButton
  ) {
    if (
      state.twoFactorAnswered
    ) {
      return;
    }

    const scenario =
      getCurrentTwoFactorScenario();

    const choice =
      scenario?.choices?.[
        selectedIndex
      ];

    if (
      !scenario ||
      !choice
    ) {
      return;
    }

    state.twoFactorAnswered =
      true;

    disableButtons(
      ".second-factor-choice"
    );

    const correct =
      choice.correct ===
      true;

    const buttons =
      document.querySelectorAll(
        ".second-factor-choice"
      );

    buttons.forEach(
      (
        button,
        index
      ) => {
        const option =
          scenario.choices[
            index
          ];

        if (
          option?.correct
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

    const correctChoice =
      scenario.choices.find(
        (option) =>
          option.correct
      );

    mission.setText(
      "securityGateSecondFactor",
      correctChoice?.label ||
        "Second Factor"
    );

    const secondLayer =
      mission.byId(
        "securityGateLayerTwo"
      );

    secondLayer?.classList.add(
      "active",
      correct
        ? "correct"
        : "incorrect"
    );

    const gateDisplay =
      mission.byId(
        "securityGateDisplay"
      );

    gateDisplay?.classList.add(
      correct
        ? "security-gate-protected"
        : "security-gate-warning"
    );

    if (correct) {
      state.twoFactorCorrect +=
        1;

      selectedButton?.classList.add(
        "correct"
      );

      mission.setFeedback({
        id:
          "twoFactorFeedback",

        message:
          `Security gate protected! ${choice.explanation}`,

        correct:
          true
      });

      mission.setMemeTip(
        "Excellent. You added a different kind of proof to strengthen the account.",
        "congrats"
      );
    } else {
      selectedButton?.classList.add(
        "incorrect"
      );

      mission.setFeedback({
        id:
          "twoFactorFeedback",

        message:
          `That does not create the safest second layer. ${choice.explanation} The correct choice is: ${correctChoice?.label || "the highlighted option"}.`,

        correct:
          false
      });

      mission.setMemeTip(
        "Remember: repeating a knowledge factor does not create true two-factor authentication.",
        "wrong"
      );
    }

    showNextButton(
      "nextTwoFactorScenario"
    );

    saveProgressSoon();
  }


  function nextTwoFactorScenario() {
    if (
      !state.twoFactorAnswered
    ) {
      return;
    }

    state.twoFactorIndex +=
      1;

    if (
      state.twoFactorIndex >=
      twoFactorScenarios.length
    ) {
      completeTwoFactorTraining();

      return;
    }

    mission.loadTwoFactorScenario();

    saveProgressSoon();
  }


  function completeTwoFactorTraining() {
    state.twoFactorComplete =
      true;

    state.twoFactorIndex =
      twoFactorScenarios.length;

    setCounter(
      "twoFactorProgress",
      twoFactorScenarios.length
    );

    mission.showElement(
      mission.byId(
        "twoFactorCompletion"
      )
    );

    mission.setMemeTip(
      "All security gates are protected. Next, defend accounts against real warning signs.",
      "congrats"
    );

    window.setTimeout(
      () => {
        mission.showSection(
          "accountDefenseZone"
        );

        mission.loadAccountDefenseScenario();
      },
      900
    );

    saveProgressSoon();
  }


  /* =====================================================
     TRAINING 4 — ACCOUNT DEFENSE SIMULATOR
  ===================================================== */

  function getCurrentAccountDefenseScenario() {
    return accountDefenseScenarios[
      state.accountDefenseIndex
    ];
  }


  mission.loadAccountDefenseScenario =
    function loadAccountDefenseScenario() {
      if (
        state.accountDefenseComplete ||
        state.accountDefenseIndex >=
          accountDefenseScenarios.length
      ) {
        completeAccountDefenseTraining();

        return;
      }

      const scenario =
        getCurrentAccountDefenseScenario();

      const choiceGrid =
        mission.byId(
          "accountDefenseChoiceGrid"
        );

      if (
        !scenario ||
        !choiceGrid
      ) {
        console.error(
          "Account Defense scenario data or HTML elements are missing."
        );

        return;
      }

      state.accountDefenseAnswered =
        false;

      mission.setText(
        "accountDefenseIcon",
        scenario.icon ||
          "🚨"
      );

      mission.setText(
        "accountDefenseScenarioTitle",
        scenario.title
      );

      mission.setText(
        "accountDefenseScenarioText",
        scenario.alert
      );

      mission.setText(
        "accountDefenseStatusIcon",
        "⏳"
      );

      mission.setText(
        "accountDefenseStatusTitle",
        "Waiting for your response"
      );

      mission.setText(
        "accountDefenseStatusMessage",
        "Review the alert before choosing an action."
      );

      setCounter(
        "accountDefenseProgress",
        state.accountDefenseIndex
      );

      mission.clearFeedback(
        "accountDefenseFeedback"
      );

      hideNextButton(
        "nextAccountDefenseScenario"
      );

      const statusPanel =
        mission.byId(
          "accountDefenseStatusPanel"
        );

      statusPanel?.classList.remove(
        "defense-success",
        "defense-warning"
      );

      choiceGrid.innerHTML =
        "";

      scenario.choices.forEach(
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
            "account-defense-choice";

          button.dataset.choiceIndex =
            String(
              choiceIndex
            );

          button.textContent =
            choice;

          button.addEventListener(
            "click",
            () => {
              answerAccountDefenseScenario(
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

      mission.setMemeTip(
        "Choose a response that protects the account, avoids suspicious links, and involves a trusted adult when needed.",
        "thinking"
      );
    };


  function answerAccountDefenseScenario(
    selectedIndex,
    selectedButton
  ) {
    if (
      state.accountDefenseAnswered
    ) {
      return;
    }

    const scenario =
      getCurrentAccountDefenseScenario();

    if (!scenario) {
      return;
    }

    state.accountDefenseAnswered =
      true;

    disableButtons(
      ".account-defense-choice"
    );

    const correct =
      selectedIndex ===
      scenario.correctIndex;

    const buttons =
      document.querySelectorAll(
        ".account-defense-choice"
      );

    buttons.forEach(
      (
        button,
        index
      ) => {
        if (
          index ===
          scenario.correctIndex
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

    const statusPanel =
      mission.byId(
        "accountDefenseStatusPanel"
      );

    if (correct) {
      state.accountDefenseCorrect +=
        1;

      selectedButton?.classList.add(
        "correct"
      );

      statusPanel?.classList.add(
        "defense-success"
      );

      mission.setText(
        "accountDefenseStatusIcon",
        "🛡️"
      );

      mission.setText(
        "accountDefenseStatusTitle",
        "Threat Defended"
      );

      mission.setText(
        "accountDefenseStatusMessage",
        scenario.explanation
      );

      mission.setFeedback({
        id:
          "accountDefenseFeedback",

        message:
          `Correct! ${scenario.explanation}`,

        correct:
          true
      });

      mission.setMemeTip(
        "Excellent defense decision. That response protects the account without helping the attacker.",
        "congrats"
      );
    } else {
      selectedButton?.classList.add(
        "incorrect"
      );

      statusPanel?.classList.add(
        "defense-warning"
      );

      mission.setText(
        "accountDefenseStatusIcon",
        "⚠️"
      );

      mission.setText(
        "accountDefenseStatusTitle",
        "Account Still at Risk"
      );

      mission.setText(
        "accountDefenseStatusMessage",
        scenario.explanation
      );

      mission.setFeedback({
        id:
          "accountDefenseFeedback",

        message:
          `Review the highlighted safer response. ${scenario.explanation}`,

        correct:
          false
      });

      mission.setMemeTip(
        "Do not send codes, trust unexpected links, or ignore unfamiliar account activity.",
        "wrong"
      );
    }

    showNextButton(
      "nextAccountDefenseScenario"
    );

    saveProgressSoon();
  }


  function nextAccountDefenseScenario() {
    if (
      !state.accountDefenseAnswered
    ) {
      return;
    }

    state.accountDefenseIndex +=
      1;

    if (
      state.accountDefenseIndex >=
      accountDefenseScenarios.length
    ) {
      completeAccountDefenseTraining();

      return;
    }

    mission.loadAccountDefenseScenario();

    saveProgressSoon();
  }


  function completeAccountDefenseTraining() {
    state.accountDefenseComplete =
      true;

    state.trainingComplete =
      true;

    state.accountDefenseIndex =
      accountDefenseScenarios.length;

    setCounter(
      "accountDefenseProgress",
      accountDefenseScenarios.length
    );

    mission.showElement(
      mission.byId(
        "accountDefenseCompletion"
      )
    );

    mission.setButtonState({
      id:
        "finishPasswordTraining",

      unlocked:
        true,

      unlockedText:
        "Enter Password Vault Practice 🏰",

      lockedText:
        "Complete Account Defense Training First"
    });

    mission.setMemeTip(
      "All four training rooms are complete. Enter the Password Vault and apply everything you learned.",
      "congrats"
    );

    saveProgressSoon();
  }


  function finishAllPasswordTraining() {
    if (
      !state.accountDefenseComplete
    ) {
      return;
    }

    state.trainingComplete =
      true;

    mission.showSection(
      "passwordVaultZone"
    );

    if (
      typeof mission
        .loadVaultChallenge ===
      "function"
    ) {
      mission.loadVaultChallenge();
    }

    mission.setMemeTip(
      "Secure all five vault doors using password-strength, attack, two-factor, and account-defense skills.",
      "welcome"
    );

    saveProgressSoon();
  }


  /* =====================================================
     STATIC EVENT BINDING
  ===================================================== */

  function bindStaticEvents() {
    bindButton(
      "acceptPasswordMission",
      mission.acceptPasswordMission
    );


    bindButton(
      "nextPassphraseChallenge",
      nextPasswordComparison
    );


    bindButton(
      "analyzePracticePassword",
      analyzeTypedPracticePassword
    );


    bindButton(
      "togglePracticePassword",
      togglePracticePassword
    );


    bindButton(
      "finishPasswordSafetyLab",
      finishPasswordSafetyLab
    );


    bindButton(
      "nextPasswordAttack",
      nextPasswordAttack
    );


    bindButton(
      "nextTwoFactorScenario",
      nextTwoFactorScenario
    );


    bindButton(
      "nextAccountDefenseScenario",
      nextAccountDefenseScenario
    );


    bindButton(
      "finishPasswordTraining",
      finishAllPasswordTraining
    );


    document
      .querySelectorAll(
        ".password-attack-choice"
      )
      .forEach(
        (button) => {
          if (
            button.dataset
              .passwordActivityBound ===
            "true"
          ) {
            return;
          }

          button.dataset.passwordActivityBound =
            "true";

          button.addEventListener(
            "click",
            () => {
              answerPasswordAttack(
                button.dataset
                  .attackAnswer,
                button
              );
            }
          );
        }
      );


    const practiceInput =
      mission.byId(
        "practicePasswordInput"
      );

    if (
      practiceInput &&
      practiceInput.dataset
        .passwordActivityBound !==
        "true"
    ) {
      practiceInput.dataset.passwordActivityBound =
        "true";

      practiceInput.addEventListener(
        "keydown",
        (event) => {
          if (
            event.key ===
            "Enter"
          ) {
            event.preventDefault();

            analyzeTypedPracticePassword();
          }
        }
      );
    }
  }


  /* =====================================================
     RESTORE TRAINING SECTION

     password-progress.js calls this after restoring the
     saved indexes and completion properties.
  ===================================================== */

  mission.restoreTrainingSection =
    function restoreTrainingSection(
      sectionId
    ) {
      switch (
        sectionId
      ) {
        case "passphraseZone":
          mission.showSection(
            "passphraseZone",
            {
              scroll:
                false
            }
          );

          if (
            state.comparisonComplete
          ) {
            mission.hideElement(
              mission.byId(
                "passwordComparisonPart"
              )
            );

            unlockTypedPasswordPart();

            setCounter(
              "passwordLabProgress",
              state.passwordBuilderComplete
                ? comparisonChallenges.length +
                    1
                : comparisonChallenges.length
            );
          } else {
            mission.showElement(
              mission.byId(
                "passwordComparisonPart"
              )
            );

            mission.loadPasswordComparison();
          }

          break;


        case "passwordAttackZone":
          mission.showSection(
            "passwordAttackZone",
            {
              scroll:
                false
            }
          );

          mission.loadPasswordAttack();

          break;


        case "twoFactorZone":
          mission.showSection(
            "twoFactorZone",
            {
              scroll:
                false
            }
          );

          mission.loadTwoFactorScenario();

          break;


        case "accountDefenseZone":
          mission.showSection(
            "accountDefenseZone",
            {
              scroll:
                false
            }
          );

          mission.loadAccountDefenseScenario();

          break;


        default:
          console.warn(
            `Unknown Password Mission training section: ${sectionId}`
          );
      }
    };


  /* =====================================================
     INITIALIZATION
  ===================================================== */

  function initializeActivities() {
    bindStaticEvents();

    mission.activitiesReady =
      true;

    document.dispatchEvent(
      new CustomEvent(
        "passwordActivitiesReady"
      )
    );

    console.log(
      "Password Safe Keeper curriculum activities loaded:",
      {
        comparisons:
          comparisonChallenges.length,

        passwordAttacks:
          passwordAttackChallenges.length,

        twoFactorScenarios:
          twoFactorScenarios.length,

        accountDefenseScenarios:
          accountDefenseScenarios.length
      }
    );
  }


  if (
    document.readyState ===
    "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      initializeActivities,
      {
        once:
          true
      }
    );
  } else {
    initializeActivities();
  }
})();
