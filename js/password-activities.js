"use strict";

/* =========================================================
   SAFETII NET — PASSWORD SAFE KEEPER
   Mission 2 Training Activities

   Training 1: Password Safety Lab
   Training 2: One Account, One Password
   Training 3: Code Keeper
   Training 4: Account Rescue

   Important:
   The pretend password typed by the student is analyzed
   only in memory. Its value is never saved to localStorage.
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

  let comparisonChallenges =
    [];

  let uniquePasswordHabits =
    [];

  let codeKeeperItems =
    [];

  let rescueSteps =
    [];

  let selectedRescueIds =
    [];


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


  function getArray(
    value
  ) {
    return Array.isArray(value)
      ? value
      : [];
  }


  function clearElement(
    id
  ) {
    const element =
      mission.byId(id);

    if (element) {
      element.innerHTML =
        "";
    }
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

    typedPart.scrollIntoView({
      behavior:
        "smooth",

      block:
        "start"
    });

    mission.setMemeTip(
      "Great comparison work! Now create a pretend password and improve it until the lab marks it as strong.",
      "welcome"
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
        "Start by comparing the two pretend passwords. Look for length, unpredictability, and personal information.",
        "welcome"
      );

      saveProgressSoon();
    };


  /* =====================================================
     TRAINING 1 — PASSWORD COMPARISON
  ===================================================== */

  function prepareComparisonChallenges() {
    comparisonChallenges =
      mission.shuffleItems(
        getArray(
          data.comparisonChallenges
        )
      );

    if (
      comparisonChallenges.length ===
      0
    ) {
      console.error(
        "No password comparison challenges were found."
      );
    }
  }


  function getCurrentComparison() {
    return comparisonChallenges[
      state.comparisonIndex
    ];
  }


  mission.loadPasswordComparison =
    function loadPasswordComparison() {
      const challenge =
        getCurrentComparison();

      const prompt =
        mission.byId(
          "passphrasePrompt"
        );

      const grid =
        mission.byId(
          "passphraseChoiceGrid"
        );

      const nextButton =
        mission.byId(
          "nextPassphraseChallenge"
        );

      if (
        !challenge ||
        !prompt ||
        !grid ||
        !nextButton
      ) {
        if (
          state.comparisonIndex >=
          comparisonChallenges.length
        ) {
          completePasswordComparisons();
        }

        return;
      }

      state.comparisonAnswered =
        false;

      prompt.textContent =
        challenge.prompt;

      grid.innerHTML =
        "";

      mission.clearFeedback(
        "passphraseFeedback"
      );

      mission.hideElement(
        nextButton
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

          const password =
            document.createElement(
              "strong"
            );

          password.textContent =
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
            password,
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

          grid.appendChild(
            button
          );
        }
      );

      setProgress(
        "passwordLabProgress",
        state.comparisonIndex
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

      mission.setFeedback({
        id:
          "passphraseFeedback",

        message:
          `Correct! ${challenge.explanation}`,

        correct:
          true
      });

      mission.setMemeTip(
        "Excellent! You recognized the safer password.",
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
        "Remember: symbols do not automatically make a short or predictable password strong.",
        "wrong"
      );
    }

    mission.showElement(
      mission.byId(
        "nextPassphraseChallenge"
      )
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

    setProgress(
      "passwordLabProgress",
      5
    );

    mission.hideElement(
      mission.byId(
        "passwordComparisonPart"
      )
    );

    unlockTypedPasswordPart();

    saveProgressSoon();
  }


  /* =====================================================
     TRAINING 1 — PRETEND PASSWORD ANALYZER
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

    return getArray(
      data.weakSequences
    ).some(
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
      getArray(
        data.commonPasswordWords
      ).length > 0
        ? data.commonPasswordWords
        : getArray(
            data.bannedWords
          );

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


  function hasEnoughCharacterVariety(
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
    password
  ) {
    const value =
      String(
        password
      ).trim();

    const checks = [
      {
        label:
          "At least 12 characters",

        passed:
          value.length >=
          12,

        explanation:
          "Longer passwords are generally harder to guess."
      },


      {
        label:
          "Uses a long phrase or several words",

        passed:
          hasLongPhrasePattern(
            value
          ),

        explanation:
          "Several unrelated words can create a memorable and harder-to-guess passphrase."
      },


      {
        label:
          "Uses several character types",

        passed:
          hasEnoughCharacterVariety(
            value
          ),

        explanation:
          "A mix of letters, numbers, spaces, or symbols adds variety."
      },


      {
        label:
          "Does not contain a common password word",

        passed:
          !containsCommonPasswordWord(
            value
          ),

        explanation:
          "Common password words are often tested first."
      },


      {
        label:
          "Does not contain an easy sequence",

        passed:
          !containsWeakSequence(
            value
          ),

        explanation:
          "Patterns such as 123456, abcdef, and qwerty are easy to guess."
      },


      {
        label:
          "Does not repeat one character several times",

        passed:
          !containsRepeatedCharacters(
            value
          ),

        explanation:
          "Repeated letters or numbers do not add much protection."
      },


      {
        label:
          "Does not look like a birthday or year",

        passed:
          !containsDatePattern(
            value
          ),

        explanation:
          "Birthdays and years may be discovered or guessed."
      },


      {
        label:
          "Includes lowercase letters",

        passed:
          containsLowercase(
            value
          ),

        explanation:
          "Lowercase letters help create more possible combinations."
      },


      {
        label:
          "Includes uppercase letters",

        passed:
          containsUppercase(
            value
          ),

        explanation:
          "Uppercase letters can add variety to a passphrase."
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
          "Numbers, spaces, or symbols can add variety when the password is already long and unpredictable."
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
      "This pretend password needs several improvements.";

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
        "Excellent! This pretend password is long, varied, and difficult to predict.";

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
        "This pretend password is much safer, but it could still be improved.";

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
        "You are making progress. Review the suggestions and strengthen it again.";

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

      /*
        Students must pass at least eight of the
        ten checks. They do not need every character
        type if the password is already a strong,
        long passphrase.
      */

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
        "Password-analysis elements are missing."
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
        "This pretend password already meets every Password Safety Lab goal.";

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

    const successPanel =
      mission.byId(
        "passwordBuilderSuccess"
      );

    if (
      result.successful
    ) {
      state.passwordBuilderComplete =
        true;

      mission.showElement(
        successPanel
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

      setProgress(
        "passwordLabProgress",
        6
      );

      mission.setMemeTip(
        "Excellent! You built a strong pretend password without entering a real password.",
        "congrats"
      );
    } else {
      state.passwordBuilderComplete =
        false;

      mission.hideElement(
        successPanel
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
        "Review the red checks, change the pretend password, and analyze it again.",
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
        "Create a made-up password for this activity. Never enter one you use on a real account."
      );

      mission.setMemeTip(
        "Type a pretend password first. Do not use a real password.",
        "wrong"
      );

      return;
    }

    /*
      The password value is passed directly to the
      analyzer and is not copied into mission.state
      or localStorage.
    */

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

    /*
      Clear the typed value before leaving the
      activity. The mission does not need it again.
    */

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
      "uniquePasswordZone"
    );

    mission.loadUniquePasswordHabit();

    mission.setMemeTip(
      "Training 2 begins now. Decide whether each password habit is unique, reused, or too predictable.",
      "welcome"
    );

    saveProgressSoon();
  }


  /* =====================================================
     TRAINING 2 — ONE ACCOUNT, ONE PASSWORD
  ===================================================== */

  function prepareUniquePasswordHabits() {
    uniquePasswordHabits =
      mission.shuffleItems(
        getArray(
          data.uniquePasswordHabits
        )
      );
  }


  function getCurrentUniqueHabit() {
    return uniquePasswordHabits[
      state.uniquePasswordIndex
    ];
  }


  mission.loadUniquePasswordHabit =
    function loadUniquePasswordHabit() {
      const habit =
        getCurrentUniqueHabit();

      if (!habit) {
        completeUniquePasswordTraining();

        return;
      }

      state.uniquePasswordAnswered =
        false;

      mission.setText(
        "uniquePasswordPrompt",
        habit.text
      );

      setProgress(
        "uniquePasswordProgress",
        state.uniquePasswordIndex
      );

      mission.clearFeedback(
        "uniquePasswordFeedback"
      );

      mission.hideElement(
        mission.byId(
          "nextUniquePassword"
        )
      );

      mission.enableButtons(
        ".unique-password-choice"
      );

      mission.setMemeTip(
        "Ask whether the password is truly different, copied across accounts, or easy to predict.",
        "thinking"
      );
    };


  function answerUniquePasswordHabit(
    category,
    button
  ) {
    if (
      state.uniquePasswordAnswered
    ) {
      return;
    }

    const habit =
      getCurrentUniqueHabit();

    if (!habit) {
      return;
    }

    state.uniquePasswordAnswered =
      true;

    mission.disableButtons(
      ".unique-password-choice"
    );

    const correct =
      category ===
      habit.category;

    const correctButton =
      document.querySelector(
        `[data-password-category="${habit.category}"]`
      );

    correctButton?.classList.add(
      "correct"
    );

    if (correct) {
      state.uniquePasswordCorrect +=
        1;

      button?.classList.add(
        "correct"
      );

      mission.setFeedback({
        id:
          "uniquePasswordFeedback",

        message:
          `Correct! ${habit.explanation}`,

        correct:
          true
      });

      mission.setMemeTip(
        "Excellent password-habit judgment!",
        "congrats"
      );
    } else {
      button?.classList.add(
        "incorrect"
      );

      mission.setFeedback({
        id:
          "uniquePasswordFeedback",

        message:
          `Good try. ${habit.explanation}`,

        correct:
          false
      });

      mission.setMemeTip(
        "Look for reuse patterns and personal information.",
        "wrong"
      );
    }

    mission.showElement(
      mission.byId(
        "nextUniquePassword"
      )
    );

    saveProgressSoon();
  }


  function nextUniquePasswordHabit() {
    if (
      !state.uniquePasswordAnswered
    ) {
      return;
    }

    state.uniquePasswordIndex +=
      1;

    if (
      state.uniquePasswordIndex >=
      uniquePasswordHabits.length
    ) {
      completeUniquePasswordTraining();

      return;
    }

    mission.loadUniquePasswordHabit();

    saveProgressSoon();
  }


  function completeUniquePasswordTraining() {
    state.uniquePasswordComplete =
      true;

    setProgress(
      "uniquePasswordProgress",
      uniquePasswordHabits.length
    );

    mission.showSection(
      "codeKeeperZone"
    );

    mission.loadCodeKeeperItem();

    mission.setMemeTip(
      "Training 3 begins now. Protect passwords, PINs, login codes, recovery codes, and reset links.",
      "welcome"
    );

    saveProgressSoon();
  }


  /* =====================================================
     TRAINING 3 — CODE KEEPER
  ===================================================== */

  function prepareCodeKeeperItems() {
    codeKeeperItems =
      mission.shuffleItems(
        getArray(
          data.codeKeeperItems
        )
      );
  }


  function getCurrentCodeItem() {
    return codeKeeperItems[
      state.codeKeeperIndex
    ];
  }


  mission.loadCodeKeeperItem =
    function loadCodeKeeperItem() {
      const item =
        getCurrentCodeItem();

      if (!item) {
        completeCodeKeeperTraining();

        return;
      }

      state.codeKeeperAnswered =
        false;

      mission.setText(
        "codeItemIcon",
        item.icon
      );

      mission.setText(
        "codeItemText",
        item.text
      );

      setProgress(
        "codeKeeperProgress",
        state.codeKeeperIndex
      );

      mission.clearFeedback(
        "codeKeeperFeedback"
      );

      mission.enableButtons(
        ".code-destination"
      );

      mission.setMemeTip(
        "Decide whether this item is ordinary information or something that could unlock an account.",
        "thinking"
      );
    };


  function answerCodeKeeper(
    answer,
    button
  ) {
    if (
      state.codeKeeperAnswered
    ) {
      return;
    }

    const item =
      getCurrentCodeItem();

    if (!item) {
      return;
    }

    state.codeKeeperAnswered =
      true;

    mission.disableButtons(
      ".code-destination"
    );

    const correct =
      answer ===
      item.answer;

    if (correct) {
      state.codeKeeperCorrect +=
        1;

      button?.classList.add(
        "correct"
      );

      mission.setFeedback({
        id:
          "codeKeeperFeedback",

        message:
          `Correct! ${item.explanation}`,

        correct:
          true
      });

      mission.setMemeTip(
        item.answer ===
          "secret"
          ? "Correct! That information belongs in the Secret Vault."
          : "Correct! That general preference is usually okay to share.",
        "congrats"
      );
    } else {
      button?.classList.add(
        "incorrect"
      );

      const correctButton =
        document.querySelector(
          `[data-code-answer="${item.answer}"]`
        );

      correctButton?.classList.add(
        "correct"
      );

      mission.setFeedback({
        id:
          "codeKeeperFeedback",

        message:
          `Good try. ${item.explanation}`,

        correct:
          false
      });

      mission.setMemeTip(
        "Anything that can unlock an account should be treated like a secret.",
        "wrong"
      );
    }

    setProgress(
      "codeKeeperProgress",
      state.codeKeeperIndex +
        1
    );

    saveProgressSoon();

    window.setTimeout(
      () => {
        state.codeKeeperIndex +=
          1;

        if (
          state.codeKeeperIndex >=
          codeKeeperItems.length
        ) {
          completeCodeKeeperTraining();

          return;
        }

        mission.loadCodeKeeperItem();
      },
      1450
    );
  }


  function completeCodeKeeperTraining() {
    state.codeKeeperComplete =
      true;

    setProgress(
      "codeKeeperProgress",
      codeKeeperItems.length
    );

    mission.showSection(
      "accountRescueZone"
    );

    mission.loadAccountRescue();

    mission.setMemeTip(
      "Final training room! Build the safest rescue plan for an account that may be compromised.",
      "welcome"
    );

    saveProgressSoon();
  }


  /* =====================================================
     CODE KEEPER DRAG AND DROP
  ===================================================== */

  function setupCodeKeeperDragAndDrop() {
    const draggableCard =
      mission.byId(
        "codeItemCard"
      );

    const destinations =
      document.querySelectorAll(
        ".code-destination"
      );

    if (!draggableCard) {
      return;
    }

    draggableCard.addEventListener(
      "dragstart",
      (event) => {
        if (
          !event.dataTransfer
        ) {
          return;
        }

        event.dataTransfer.setData(
          "text/plain",
          "password-code-item"
        );

        event.dataTransfer.effectAllowed =
          "move";

        draggableCard.classList.add(
          "is-dragging"
        );
      }
    );

    draggableCard.addEventListener(
      "dragend",
      () => {
        draggableCard.classList.remove(
          "is-dragging"
        );

        destinations.forEach(
          (zone) => {
            zone.classList.remove(
              "drag-over"
            );
          }
        );
      }
    );

    destinations.forEach(
      (zone) => {
        zone.addEventListener(
          "dragover",
          (event) => {
            event.preventDefault();

            zone.classList.add(
              "drag-over"
            );
          }
        );

        zone.addEventListener(
          "dragleave",
          () => {
            zone.classList.remove(
              "drag-over"
            );
          }
        );

        zone.addEventListener(
          "drop",
          (event) => {
            event.preventDefault();

            zone.classList.remove(
              "drag-over"
            );

            answerCodeKeeper(
              zone.dataset.codeAnswer,
              zone
            );
          }
        );
      }
    );
  }


  /* =====================================================
     TRAINING 4 — ACCOUNT RESCUE
  ===================================================== */

  function prepareRescueSteps() {
    rescueSteps =
      mission.shuffleItems(
        getArray(
          data.accountRescueSteps
        )
      );
  }


  mission.loadAccountRescue =
    function loadAccountRescue() {
      const bank =
        mission.byId(
          "rescueStepBank"
        );

      const orderList =
        mission.byId(
          "rescueOrderList"
        );

      if (
        !bank ||
        !orderList
      ) {
        console.error(
          "Account Rescue elements are missing."
        );

        return;
      }

      selectedRescueIds =
        Array.isArray(
          state.selectedRescueSteps
        )
          ? [
              ...state.selectedRescueSteps
            ]
          : [];

      bank.innerHTML =
        "";

      orderList.innerHTML =
        "";

      mission.clearFeedback(
        "accountRescueFeedback"
      );

      rescueSteps.forEach(
        (step) => {
          const button =
            document.createElement(
              "button"
            );

          button.type =
            "button";

          button.className =
            "rescue-step-button";

          button.dataset.rescueId =
            step.id;

          button.textContent =
            step.label;

          if (
            selectedRescueIds.includes(
              step.id
            )
          ) {
            button.classList.add(
              "selected"
            );

            button.disabled =
              true;
          }

          button.addEventListener(
            "click",
            () => {
              selectRescueStep(
                step.id
              );
            }
          );

          bank.appendChild(
            button
          );
        }
      );

      renderRescueOrder();

      mission.setButtonState({
        id:
          "finishPasswordTraining",

        unlocked:
          state.rescueComplete,

        unlockedText:
          "Enter Password Vault Practice 🏰",

        lockedText:
          "Complete Account Rescue First"
      });
    };


  function selectRescueStep(
    stepId
  ) {
    if (
      selectedRescueIds.includes(
        stepId
      )
    ) {
      return;
    }

    selectedRescueIds.push(
      stepId
    );

    state.selectedRescueSteps =
      [
        ...selectedRescueIds
      ];

    const button =
      document.querySelector(
        `[data-rescue-id="${stepId}"]`
      );

    if (button) {
      button.disabled =
        true;

      button.classList.add(
        "selected"
      );
    }

    renderRescueOrder();

    setProgress(
      "accountRescueProgress",
      selectedRescueIds.length
    );

    mission.clearFeedback(
      "accountRescueFeedback"
    );

    saveProgressSoon();
  }


  function renderRescueOrder() {
    const orderList =
      mission.byId(
        "rescueOrderList"
      );

    if (!orderList) {
      return;
    }

    orderList.innerHTML =
      "";

    selectedRescueIds.forEach(
      (stepId) => {
        const step =
          getArray(
            data.accountRescueSteps
          ).find(
            (item) =>
              item.id ===
              stepId
          );

        if (!step) {
          return;
        }

        const item =
          document.createElement(
            "li"
          );

        item.textContent =
          step.label;

        orderList.appendChild(
          item
        );
      }
    );
  }


  function clearRescueOrder() {
    selectedRescueIds =
      [];

    state.selectedRescueSteps =
      [];

    state.rescueComplete =
      false;

    setProgress(
      "accountRescueProgress",
      0
    );

    mission.loadAccountRescue();

    mission.setMemeTip(
      "The rescue plan was cleared. Start with the action that stops the immediate danger.",
      "thinking"
    );

    saveProgressSoon();
  }


  function checkRescueOrder() {
    const correctOrder =
      getArray(
        data.accountRescueSteps
      )
        .slice()
        .sort(
          (
            first,
            second
          ) =>
            first.order -
            second.order
        )
        .map(
          (step) =>
            step.id
        );

    if (
      selectedRescueIds.length !==
      correctOrder.length
    ) {
      mission.setFeedback({
        id:
          "accountRescueFeedback",

        message:
          `Select all ${correctOrder.length} rescue actions before checking the plan.`,

        correct:
          false
      });

      mission.setMemeTip(
        "Your rescue plan still needs every action.",
        "thinking"
      );

      return;
    }

    const correct =
      correctOrder.every(
        (
          stepId,
          index
        ) =>
          selectedRescueIds[
            index
          ] ===
          stepId
      );

    if (correct) {
      state.rescueComplete =
        true;

      state.trainingComplete =
        true;

      mission.setFeedback({
        id:
          "accountRescueFeedback",

        message:
          "Correct! Stop contact, tell a trusted adult, use the official source, change the password, remove unfamiliar sessions, and add extra protection.",

        correct:
          true
      });

      mission.setButtonState({
        id:
          "finishPasswordTraining",

        unlocked:
          true,

        unlockedText:
          "Enter Password Vault Practice 🏰",

        lockedText:
          "Complete Account Rescue First"
      });

      mission.setMemeTip(
        "Excellent! You built the full Account Rescue plan.",
        "congrats"
      );

      saveProgressSoon();

      return;
    }

    state.rescueComplete =
      false;

    mission.setFeedback({
      id:
        "accountRescueFeedback",

      message:
        "The plan includes the right actions, but the order needs adjustment. Begin by stopping contact and telling a trusted adult.",

      correct:
        false
    });

    mission.setMemeTip(
      "Start by stopping the suspicious contact. Then involve a trusted adult before changing account settings.",
      "wrong"
    );
  }


  function finishAllPasswordTraining() {
    if (
      !state.rescueComplete
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
      "All four training rooms are complete. Secure the five Password Vault doors next!",
      "congrats"
    );

    saveProgressSoon();
  }


  /* =====================================================
     EVENT BINDING
  ===================================================== */

  function bindButton(
    id,
    callback
  ) {
    const button =
      mission.byId(id);

    if (
      !button ||
      button.dataset
        .passwordBound ===
        "true"
    ) {
      return;
    }

    button.dataset.passwordBound =
      "true";

    button.addEventListener(
      "click",
      callback
    );
  }


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
      "nextUniquePassword",
      nextUniquePasswordHabit
    );


    bindButton(
      "clearRescueOrder",
      clearRescueOrder
    );


    bindButton(
      "checkRescueOrder",
      checkRescueOrder
    );


    bindButton(
      "finishPasswordTraining",
      finishAllPasswordTraining
    );


    const practiceInput =
      mission.byId(
        "practicePasswordInput"
      );

    if (
      practiceInput &&
      practiceInput.dataset
        .passwordBound !==
        "true"
    ) {
      practiceInput.dataset.passwordBound =
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


    document
      .querySelectorAll(
        ".unique-password-choice"
      )
      .forEach(
        (button) => {
          if (
            button.dataset
              .passwordBound ===
            "true"
          ) {
            return;
          }

          button.dataset.passwordBound =
            "true";

          button.addEventListener(
            "click",
            () => {
              answerUniquePasswordHabit(
                button.dataset
                  .passwordCategory,
                button
              );
            }
          );
        }
      );


    document
      .querySelectorAll(
        ".code-destination"
      )
      .forEach(
        (button) => {
          if (
            button.dataset
              .passwordBound ===
            "true"
          ) {
            return;
          }

          button.dataset.passwordBound =
            "true";

          button.addEventListener(
            "click",
            () => {
              answerCodeKeeper(
                button.dataset
                  .codeAnswer,
                button
              );
            }
          );
        }
      );

    setupCodeKeeperDragAndDrop();
  }


  /* =====================================================
     RESTORE ACTIVITY SCREEN

     password-progress.js can call this after loading
     stored completion data.
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

            setProgress(
              "passwordLabProgress",
              state.passwordBuilderComplete
                ? 6
                : 5
            );
          } else {
            mission.loadPasswordComparison();
          }

          break;


        case "uniquePasswordZone":
          mission.showSection(
            "uniquePasswordZone",
            {
              scroll:
                false
            }
          );

          mission.loadUniquePasswordHabit();

          break;


        case "codeKeeperZone":
          mission.showSection(
            "codeKeeperZone",
            {
              scroll:
                false
            }
          );

          mission.loadCodeKeeperItem();

          break;


        case "accountRescueZone":
          mission.showSection(
            "accountRescueZone",
            {
              scroll:
                false
            }
          );

          mission.loadAccountRescue();

          break;


        default:
          break;
      }
    };


  /* =====================================================
     INITIALIZATION
  ===================================================== */

  function initializeActivities() {
    prepareComparisonChallenges();
    prepareUniquePasswordHabits();
    prepareCodeKeeperItems();
    prepareRescueSteps();

    bindStaticEvents();

    mission.activitiesReady =
      true;

    document.dispatchEvent(
      new CustomEvent(
        "passwordActivitiesReady"
      )
    );

    console.log(
      "Password Safe Keeper training activities loaded."
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
