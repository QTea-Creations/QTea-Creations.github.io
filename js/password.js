"use strict";

/* =========================================================
   SAFETII NET — PASSWORD SAFE KEEPER
   COMPLETE MISSION 2 CONTROLLER

   Controls:
   - Mission introduction
   - Password Power Lab
   - Crack Attack
   - Two-Factor Security Gate
   - Account Rescue
   - Password Vault
   - Clickable cyber-word definitions
   - Meme’s Corner
   - Progress saving
   - Points and badge completion
   - Mission replay

   This rebuilt version does NOT use:
   - password-data.js
   - password-core.js
   - password-activities.js
   - password-progress.js
   - a final test
========================================================= */

(() => {
  /* =====================================================
     STORAGE KEYS
  ===================================================== */

  const STORAGE_KEYS = {
    progress:
      "safetiiPasswordProgress",

    points:
      "safetiiPoints",

    alternatePoints:
      "safetiiGlobalPoints",

    badges:
      "safetiiBadges",

    completed:
      "passwordMissionCompleted",

    badge:
      "passwordBadgeEarned",

    reward:
      "passwordMissionRewardAwarded",

    replay:
      "passwordReplayRequested",

    hero:
      "safetiiHero"
  };


  /* =====================================================
     MISSION SETTINGS
  ===================================================== */

  const MISSION_REWARD =
    100;

  const BADGE_NAME =
    "Password Safe Keeper";

  const DEFAULT_SECTION =
    "passwordMissionAlert";


  /* =====================================================
     MISSION DATA
  ===================================================== */

  const PASSWORD_COMPARISONS = [
    {
      prompt:
        "Choose the pretend password that would be harder to guess.",

      choices: [
        {
          password:
            "puppy123",

          note:
            "Short, common word, and number pattern."
        },

        {
          password:
            "Cloud!River7Lamp",

          note:
            "Longer and made from unrelated ideas."
        }
      ],

      correctIndex:
        1,

      explanation:
        "Cloud!River7Lamp is longer and does not rely on one common word or an easy number pattern."
    },

    {
      prompt:
        "Which pretend password avoids personal information?",

      choices: [
        {
          password:
            "Maya2012",

          note:
            "Uses a name and a year."
        },

        {
          password:
            "Jazz$Orbit92Tree",

          note:
            "Uses unrelated words and symbols."
        }
      ],

      correctIndex:
        1,

      explanation:
        "Jazz$Orbit92Tree avoids obvious personal clues such as a name, birthday, school, or pet."
    },

    {
      prompt:
        "Which pretend password is less predictable?",

      choices: [
        {
          password:
            "qwerty456",

          note:
            "Uses a keyboard pattern and number sequence."
        },

        {
          password:
            "Rocket!Piano4Lake",

          note:
            "Uses unrelated words in a longer combination."
        }
      ],

      correctIndex:
        1,

      explanation:
        "Rocket!Piano4Lake does not use a common keyboard pattern or an easy number sequence."
    }
  ];


  const PASSWORD_UPGRADES = [
    {
      id:
        "makeLonger",

      icon:
        "📏",

      title:
        "Make It Longer",

      description:
        "Add more characters or another unrelated word.",

      textAddition:
        "River",

      points:
        25
    },

    {
      id:
        "addSymbol",

      icon:
        "✨",

      title:
        "Add a Symbol",

      description:
        "Use a symbol in a place that is not too obvious.",

      textAddition:
        "!",

      points:
        20
    },

    {
      id:
        "addNumber",

      icon:
        "🔢",

      title:
        "Add a Number",

      description:
        "Use a number that is not a birthday or simple sequence.",

      textAddition:
        "47",

      points:
        20
    },

    {
      id:
        "addUnrelatedWord",

      icon:
        "🧩",

      title:
        "Add an Unrelated Word",

      description:
        "Combine ideas that do not normally go together.",

      textAddition:
        "Lantern",

      points:
        35
    }
  ];


  const CRACK_ATTACKS = [
    {
      title:
        "Personal Clue Attack",

      text:
        "The attacker found public information about a pretend user. Remove every clue that could help someone guess the password.",

      clues: [
        {
          icon:
            "🎂",

          label:
            "Birthday",

          dangerous:
            true
        },

        {
          icon:
            "🐶",

          label:
            "Pet’s name",

          dangerous:
            true
        },

        {
          icon:
            "🏫",

          label:
            "School name",

          dangerous:
            true
        },

        {
          icon:
            "🌌",

          label:
            "Random space word",

          dangerous:
            false
        },

        {
          icon:
            "🎨",

          label:
            "Unrelated art word",

          dangerous:
            false
        },

        {
          icon:
            "📅",

          label:
            "Birth year",

          dangerous:
            true
        }
      ],

      explanation:
        "Names, birthdays, schools, pets, and other personal details can help an attacker make better guesses."
    },

    {
      title:
        "Common Password Attack",

      text:
        "The attacker is trying words that many people use. Remove the clues that would make the pretend password too common.",

      clues: [
        {
          icon:
            "🔑",

          label:
            "password",

          dangerous:
            true
        },

        {
          icon:
            "⌨️",

          label:
            "qwerty",

          dangerous:
            true
        },

        {
          icon:
            "🔢",

          label:
            "123456",

          dangerous:
            true
        },

        {
          icon:
            "🛰️",

          label:
            "Nebula",

          dangerous:
            false
        },

        {
          icon:
            "🎻",

          label:
            "Violin",

          dangerous:
            false
        },

        {
          icon:
            "⚽",

          label:
            "soccer",

          dangerous:
            true
        }
      ],

      explanation:
        "Common words, popular hobbies, and common number patterns are often tested first."
    },

    {
      title:
        "Pattern Attack",

      text:
        "The attacker is checking easy patterns. Remove every clue that follows a predictable sequence.",

      clues: [
        {
          icon:
            "➡️",

          label:
            "abcd",

          dangerous:
            true
        },

        {
          icon:
            "🔢",

          label:
            "987654",

          dangerous:
            true
        },

        {
          icon:
            "⌨️",

          label:
            "asdfgh",

          dangerous:
            true
        },

        {
          icon:
            "🌳",

          label:
            "Forest",

          dangerous:
            false
        },

        {
          icon:
            "🎺",

          label:
            "Trumpet",

          dangerous:
            false
        },

        {
          icon:
            "🔁",

          label:
            "111111",

          dangerous:
            true
        }
      ],

      explanation:
        "Keyboard paths, repeated characters, and number sequences are predictable and easier to guess."
    },

    {
      title:
        "Password Reuse Attack",

      text:
        "One pretend account was exposed. Remove every choice that would put other accounts in danger too.",

      clues: [
        {
          icon:
            "📧",

          label:
            "Same password for email",

          dangerous:
            true
        },

        {
          icon:
            "🎮",

          label:
            "Same password for gaming",

          dangerous:
            true
        },

        {
          icon:
            "🏫",

          label:
            "Same password for school",

          dangerous:
            true
        },

        {
          icon:
            "🔐",

          label:
            "Different password for each account",

          dangerous:
            false
        },

        {
          icon:
            "🗝️",

          label:
            "Password manager",

          dangerous:
            false
        },

        {
          icon:
            "📱",

          label:
            "Extra security check",

          dangerous:
            false
        }
      ],

      explanation:
        "When one reused password is stolen, every account using that same password may be exposed."
    }
  ];


  const SECURITY_GATE_SCENARIOS = [
    {
      icon:
        "🎮",

      account:
        "Gaming Account",

      story:
        "The account already has a password. Choose a different kind of security check.",

      choices: [
        {
          icon:
            "📱",

          title:
            "Authenticator app",

          description:
            "A trusted app creates a temporary code.",

          factor:
            "have",

          correct:
            true,

          definition:
            "An authenticator app is a trusted app that creates a temporary code to help prove it is really you."
        },

        {
          icon:
            "🔑",

          title:
            "Type the same password again",

          description:
            "Repeats the first security check.",

          factor:
            "know",

          correct:
            false
        },

        {
          icon:
            "📝",

          title:
            "Password hint",

          description:
            "Gives someone another clue about the password.",

          factor:
            "know",

          correct:
            false
        }
      ],

      explanation:
        "The authenticator app adds a different kind of proof. Someone who only knows the password may not have the changing code."
    },

    {
      icon:
        "📧",

      account:
        "Email Account",

      story:
        "The account uses a password. Add another security check that depends on something the user has.",

      choices: [
        {
          icon:
            "🗝️",

          title:
            "Security key",

          description:
            "A physical device used to approve a sign-in.",

          factor:
            "have",

          correct:
            true,

          definition:
            "A security key is a physical device that can be used to approve a sign-in."
        },

        {
          icon:
            "🔢",

          title:
            "Birth year",

          description:
            "Personal information that may be easy to find.",

          factor:
            "know",

          correct:
            false
        },

        {
          icon:
            "💬",

          title:
            "Tell a friend the password",

          description:
            "Shares the account secret with someone else.",

          factor:
            "unsafe",

          correct:
            false
        }
      ],

      explanation:
        "A physical security key is separate from the password and can help stop someone who only knows the password."
    },

    {
      icon:
        "🏫",

      account:
        "School Account",

      story:
        "The account already uses a password. Add a different kind of approved proof.",

      choices: [
        {
          icon:
            "🫆",

          title:
            "Fingerprint check",

          description:
            "Uses an approved biometric check.",

          factor:
            "are",

          correct:
            true,

          definition:
            "A biometric check uses a body feature, such as a fingerprint or face scan, to help prove who someone is."
        },

        {
          icon:
            "🔁",

          title:
            "Reuse another password",

          description:
            "Uses another password instead of a different factor.",

          factor:
            "know",

          correct:
            false
        },

        {
          icon:
            "📛",

          title:
            "Use the student’s name",

          description:
            "Uses personal information that may be known.",

          factor:
            "know",

          correct:
            false
        }
      ],

      explanation:
        "A fingerprint is a different kind of proof from a password."
    },

    {
      icon:
        "🛍️",

      account:
        "Shopping Account",

      story:
        "A sign-in request appears. Choose the safest extra check.",

      choices: [
        {
          icon:
            "📲",

          title:
            "Approve the sign-in in the official app",

          description:
            "Uses the official account app to confirm the request.",

          factor:
            "have",

          correct:
            true
        },

        {
          icon:
            "📩",

          title:
            "Send the code to a stranger",

          description:
            "Shares the verification code.",

          factor:
            "unsafe",

          correct:
            false
        },

        {
          icon:
            "🔓",

          title:
            "Turn off extra security",

          description:
            "Removes protection from the account.",

          factor:
            "unsafe",

          correct:
            false
        }
      ],

      explanation:
        "Using the official app helps confirm the request without sharing a verification code with another person."
    }
  ];


  const ACCOUNT_RESCUE_SCENARIOS = [
    {
      icon:
        "📱",

      title:
        "Unexpected Sign-In Alert",

      message:
        "A notification says someone signed in from a device the user does not recognize.",

      choices: [
        {
          text:
            "Open the official app, review the activity, change the password, and ask a trusted adult for help.",

          correct:
            true
        },

        {
          text:
            "Ignore the alert and hope nothing else happens.",

          correct:
            false
        },

        {
          text:
            "Reply to a random message with the password.",

          correct:
            false
        }
      ],

      explanation:
        "Use the official app or website, review the account activity, secure the account, and involve a trusted adult."
    },

    {
      icon:
        "🔢",

      title:
        "Someone Asks for a Verification Code",

      message:
        "A person messages the user and says they need the code that just arrived.",

      choices: [
        {
          text:
            "Do not share the code. Stop responding and tell a trusted adult.",

          correct:
            true
        },

        {
          text:
            "Send the code because they said it was urgent.",

          correct:
            false
        },

        {
          text:
            "Post the code publicly so others can help.",

          correct:
            false
        }
      ],

      explanation:
        "Verification codes are secret. A person asking for one may be trying to enter the account."
    },

    {
      icon:
        "📧",

      title:
        "Password Reset Email Not Requested",

      message:
        "The user receives a password reset message but did not request one.",

      choices: [
        {
          text:
            "Do not click the message link. Open the official site or app directly and check the account.",

          correct:
            true
        },

        {
          text:
            "Click every link in the email to see what happens.",

          correct:
            false
        },

        {
          text:
            "Forward the message to friends and ask them to click it.",

          correct:
            false
        }
      ],

      explanation:
        "Open the official app or website directly instead of trusting a link in an unexpected message."
    },

    {
      icon:
        "🎮",

      title:
        "Gaming Account Password May Be Stolen",

      message:
        "The user learns that a site using the same password had a security breach.",

      choices: [
        {
          text:
            "Change the reused password on every affected account and create a different password for each one.",

          correct:
            true
        },

        {
          text:
            "Keep using the same password because it is easy to remember.",

          correct:
            false
        },

        {
          text:
            "Share the password so friends can watch the account.",

          correct:
            false
        }
      ],

      explanation:
        "A stolen reused password can expose several accounts. Each important account should have a different password."
    }
  ];


  const VAULT_CHALLENGES = [
    {
      title:
        "Vault Door 1 — Password Power",

      text:
        "Which pretend password is the strongest choice?",

      answers: [
        "cat123",
        "Victoria2010",
        "Moon!Piano47River",
        "qwerty"
      ],

      correctIndex:
        2,

      explanation:
        "Moon!Piano47River is longer and uses unrelated ideas instead of obvious personal information or common patterns."
    },

    {
      title:
        "Vault Door 2 — Personal Clues",

      text:
        "Which detail should not be used to build a password?",

      answers: [
        "A random unrelated word",
        "A pet’s name posted online",
        "A made-up symbol pattern",
        "A password manager suggestion"
      ],

      correctIndex:
        1,

      explanation:
        "A pet’s name may be public or easy for someone to discover."
    },

    {
      title:
        "Vault Door 3 — Extra Security",

      text:
        "A password was stolen. Which extra check could still help protect the account?",

      answers: [
        "Type the same password again",
        "Use a changing code from a trusted authenticator app",
        "Tell another person the password",
        "Turn off account alerts"
      ],

      correctIndex:
        1,

      explanation:
        "A changing code from a trusted authenticator app adds a different kind of proof."
    },

    {
      title:
        "Vault Door 4 — Verification Code",

      text:
        "Someone asks for a verification code. What is the safest response?",

      answers: [
        "Send it because the request sounds urgent",
        "Post it in a group chat",
        "Keep it secret, stop responding, and tell a trusted adult",
        "Use the code as a public username"
      ],

      correctIndex:
        2,

      explanation:
        "Verification codes are secret and should not be shared with another person."
    },

    {
      title:
        "Vault Door 5 — Password Reuse",

      text:
        "One account password was exposed. What should happen next?",

      answers: [
        "Keep using it everywhere",
        "Change it only on the least important account",
        "Create different passwords for every affected account",
        "Tell friends to use the same password"
      ],

      correctIndex:
        2,

      explanation:
        "Different passwords prevent one stolen password from opening several accounts."
    }
  ];


  /* =====================================================
     DEFAULT STATE
  ===================================================== */

  const defaultState = {
    missionStarted:
      false,

    currentSection:
      DEFAULT_SECTION,

    passwordComparisonIndex:
      0,

    passwordComparisonAnswered:
      false,

    passwordComparisonComplete:
      false,

    selectedUpgrades:
      [],

    passwordPowerScore:
      10,

    passwordPowerComplete:
      false,

    crackAttackIndex:
      0,

    removedClues:
      [],

    crackAttackComplete:
      false,

    securityGateIndex:
      0,

    securityGateAnswered:
      false,

    securityGateComplete:
      false,

    accountRescueIndex:
      0,

    accountRescueAnswered:
      false,

    accountRescueComplete:
      false,

    vaultIndex:
      0,

    vaultAnswered:
      false,

    vaultDoorsSecured:
      0,

    vaultComplete:
      false,

    missionCompleted:
      false,

    badgeEarned:
      false,

    missionPointsEarned:
      0
  };


  let state =
    loadSavedState();


  /* =====================================================
     BASIC HELPERS
  ===================================================== */

  function byId(id) {
    return document.getElementById(
      id
    );
  }


  function safelyReadJson(
    key,
    fallback
  ) {
    try {
      const stored =
        localStorage.getItem(
          key
        );

      if (!stored) {
        return fallback;
      }

      return JSON.parse(
        stored
      );
    } catch (error) {
      console.error(
        `Could not read ${key}:`,
        error
      );

      return fallback;
    }
  }


  function safelyWriteJson(
    key,
    value
  ) {
    try {
      localStorage.setItem(
        key,
        JSON.stringify(
          value
        )
      );
    } catch (error) {
      console.error(
        `Could not save ${key}:`,
        error
      );
    }
  }


  function loadSavedState() {
    const saved =
      safelyReadJson(
        STORAGE_KEYS.progress,
        null
      );

    if (
      !saved ||
      typeof saved !==
        "object" ||
      Array.isArray(saved)
    ) {
      return {
        ...defaultState
      };
    }

    return {
      ...defaultState,
      ...saved,

      selectedUpgrades:
        Array.isArray(
          saved.selectedUpgrades
        )
          ? saved.selectedUpgrades
          : [],

      removedClues:
        Array.isArray(
          saved.removedClues
        )
          ? saved.removedClues
          : []
    };
  }


  function saveProgress() {
    safelyWriteJson(
      STORAGE_KEYS.progress,
      state
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


  function showElement(
    elementOrId
  ) {
    const element =
      typeof elementOrId ===
        "string"
        ? byId(
            elementOrId
          )
        : elementOrId;

    element?.classList.remove(
      "hidden"
    );
  }


  function hideElement(
    elementOrId
  ) {
    const element =
      typeof elementOrId ===
        "string"
        ? byId(
            elementOrId
          )
        : elementOrId;

    element?.classList.add(
      "hidden"
    );
  }


  function showSection(
    sectionId,
    scroll = true
  ) {
    document
      .querySelectorAll(
        ".password-zone"
      )
      .forEach(
        (section) => {
          section.classList.toggle(
            "hidden",
            section.id !==
              sectionId
          );
        }
      );

    state.currentSection =
      sectionId;

    saveProgress();

    if (
      scroll &&
      byId(sectionId)
    ) {
      window.setTimeout(
        () => {
          byId(sectionId)
            ?.scrollIntoView({
              behavior:
                "smooth",

              block:
                "start"
            });
        },
        80
      );
    }
  }


  function setFeedback(
    id,
    message,
    correct
  ) {
    const element =
      byId(id);

    if (!element) {
      return;
    }

    element.textContent =
      message;

    element.classList.remove(
      "correct-feedback",
      "incorrect-feedback"
    );

    element.classList.add(
      correct
        ? "correct-feedback"
        : "incorrect-feedback"
    );
  }


  function clearFeedback(
    id
  ) {
    const element =
      byId(id);

    if (!element) {
      return;
    }

    element.textContent =
      "";

    element.classList.remove(
      "correct-feedback",
      "incorrect-feedback"
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


  function getHeroName() {
    const hero =
      safelyReadJson(
        STORAGE_KEYS.hero,
        {}
      );

    const possibleNames = [
      hero?.heroName,
      hero?.name,
      hero?.username
    ];

    return (
      possibleNames.find(
        (value) =>
          typeof value ===
            "string" &&
          value.trim()
      ) ||
      "Cyber Hero"
    );
  }


  function getTotalPoints() {
    const primary =
      Number(
        localStorage.getItem(
          STORAGE_KEYS.points
        )
      );

    if (
      Number.isFinite(
        primary
      )
    ) {
      return Math.max(
        0,
        primary
      );
    }

    const alternate =
      Number(
        localStorage.getItem(
          STORAGE_KEYS.alternatePoints
        )
      );

    return Number.isFinite(
      alternate
    )
      ? Math.max(
          0,
          alternate
        )
      : 0;
  }


  function setTotalPoints(
    value
  ) {
    const safeValue =
      Math.max(
        0,
        Number(value) ||
          0
      );

    localStorage.setItem(
      STORAGE_KEYS.points,
      String(
        safeValue
      )
    );

    localStorage.setItem(
      STORAGE_KEYS.alternatePoints,
      String(
        safeValue
      )
    );

    setText(
      "passwordMissionPoints",
      safeValue
    );
  }


  function addPoints(
    amount
  ) {
    setTotalPoints(
      getTotalPoints() +
        amount
    );
  }


  function setMemeTip(
    message,
    imageName =
      "thinking"
  ) {
    setText(
      "passwordMemeTip",
      message
    );

    const image =
      byId(
        "passwordMemeImage"
      );

    if (image) {
      image.src =
        `../assets/mascot/${imageName}.png`;
    }
  }


  function bindButton(
    id,
    callback
  ) {
    const button =
      byId(id);

    if (!button) {
      return;
    }

    button.addEventListener(
      "click",
      callback
    );
  }

   function shuffledAnswers(
  answers,
  correctIndex
) {
  const prepared =
    answers.map(
      (
        answer,
        originalIndex
      ) => ({
        answer,
        correct:
          originalIndex ===
          correctIndex
      })
    );

  for (
    let index =
      prepared.length - 1;
    index > 0;
    index -=
      1
  ) {
    const randomIndex =
      Math.floor(
        Math.random() *
        (
          index +
          1
        )
      );

    [
      prepared[index],
      prepared[randomIndex]
    ] = [
      prepared[randomIndex],
      prepared[index]
    ];
  }

  return prepared;
}

  /* =====================================================
     PAGE HEADER
  ===================================================== */

  function loadHeaderInformation() {
    setText(
      "passwordHeroName",
      getHeroName()
    );

    setText(
      "passwordMissionPoints",
      getTotalPoints()
    );
  }


  /* =====================================================
     MEME’S CORNER
  ===================================================== */

  function bindMemeCorner() {
    document
      .querySelectorAll(
        ".password-help-button"
      )
      .forEach(
        (button) => {
          button.addEventListener(
            "click",
            () => {
              setMemeTip(
                button.dataset
                  .helpMessage ||
                "Ask a trusted adult when you are unsure.",
                "thinking"
              );
            }
          );
        }
      );
  }


  /* =====================================================
     CYBER WORD DIALOG
  ===================================================== */

  function bindCyberWordDefinitions() {
    const dialog =
      byId(
        "cyberWordDialog"
      );

    const title =
      byId(
        "cyberWordTitle"
      );

    const definition =
      byId(
        "cyberWordDefinition"
      );

    document.addEventListener(
      "click",
      (event) => {
        const button =
          event.target.closest(
            ".cyber-word"
          );

        if (!button) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();

        if (title) {
          title.textContent =
            button.dataset
              .cyberWord ||
            button.textContent.trim();
        }

        if (definition) {
          definition.textContent =
            button.dataset
              .cyberDefinition ||
            "A cybersecurity word used in this mission.";
        }

        if (
          dialog &&
          typeof dialog.showModal ===
            "function"
        ) {
          dialog.showModal();
        }
      }
    );

    bindButton(
      "closeCyberWordDialog",
      () => {
        dialog?.close();
      }
    );

    dialog?.addEventListener(
      "click",
      (event) => {
        if (
          event.target ===
          dialog
        ) {
          dialog.close();
        }
      }
    );
  }


  /* =====================================================
     MISSION INTRODUCTION
  ===================================================== */

  function startMission() {
    state.missionStarted =
      true;

    state.currentSection =
      "passwordPowerZone";

    saveProgress();

    loadPasswordPowerLab();

    showSection(
      "passwordPowerZone"
    );

    setMemeTip(
      "Start by comparing pretend passwords. Look for length, uniqueness, and fewer obvious clues.",
      "welcome"
    );
  }


  /* =====================================================
     ROOM 1 — PASSWORD POWER LAB
  ===================================================== */

function loadPasswordPowerLab() {
  setText(
    "passwordPowerProgress",
    Math.min(
      state.passwordComparisonIndex,
      PASSWORD_COMPARISONS.length
    )
  );

  renderPasswordComparison();

  renderPasswordUpgrades();

  updatePasswordPowerMeter();

  if (
    state.passwordComparisonComplete
  ) {
    unlockPasswordBuilder();
  }

  syncPowerLabButton();

  saveProgress();
}


  function renderPasswordComparison() {
    const challenge =
      PASSWORD_COMPARISONS[
        state.passwordComparisonIndex
      ];

    const grid =
      byId(
        "passwordComparisonChoices"
      );

    if (!grid) {
      return;
    }

    grid.innerHTML =
      "";

    clearFeedback(
      "passwordComparisonFeedback"
    );

    hideElement(
      "nextPasswordComparison"
    );

    if (
      state.passwordComparisonComplete ||
      !challenge
    ) {
      grid.innerHTML =
        `
          <div class="password-builder-result">
            <span aria-hidden="true">✅</span>

            <div>
              <strong>Password Face-Off complete!</strong>
              <p>You recognized the stronger pretend passwords.</p>
            </div>
          </div>
        `;

      setText(
        "passwordPowerProgress",
        PASSWORD_COMPARISONS.length
      );

      unlockPasswordBuilder();

      return;
    }

    challenge.choices.forEach(
      (
        choice,
        index
      ) => {
        const button =
          document.createElement(
            "button"
          );

        button.type =
          "button";

        button.className =
          "password-choice-button";

        button.innerHTML =
          `
            <strong>${choice.password}</strong>
            <small>${choice.note}</small>
          `;

        button.addEventListener(
          "click",
          () => {
            answerPasswordComparison(
              index,
              button
            );
          }
        );

        grid.appendChild(
          button
        );
      }
    );
  }


  function answerPasswordComparison(
    selectedIndex,
    selectedButton
  ) {
    if (
      state.passwordComparisonAnswered
    ) {
      return;
    }

    const challenge =
      PASSWORD_COMPARISONS[
        state.passwordComparisonIndex
      ];

    if (!challenge) {
      return;
    }

    const correct =
      selectedIndex ===
      challenge.correctIndex;

    if (!correct) {
      selectedButton.classList.add(
        "incorrect"
      );

      setFeedback(
        "passwordComparisonFeedback",
        "That password still has clues or patterns that may make it easier to guess. Try the other choice.",
        false
      );

      setMemeTip(
        "Look for the longer password with fewer personal clues and fewer common patterns.",
        "wrong"
      );

      return;
    }

    state.passwordComparisonAnswered =
      true;

    disableButtons(
      ".password-choice-button"
    );

    selectedButton.classList.add(
      "correct"
    );

    setFeedback(
      "passwordComparisonFeedback",
      `Correct! ${challenge.explanation}`,
      true
    );

    setMemeTip(
      "Great choice. Longer and less predictable passwords are usually harder to guess.",
      "congrats"
    );

    showElement(
      "nextPasswordComparison"
    );

    saveProgress();
  }


  function nextPasswordComparison() {
    if (
      !state.passwordComparisonAnswered
    ) {
      return;
    }

    state.passwordComparisonAnswered =
      false;

    state.passwordComparisonIndex +=
      1;

    if (
      state.passwordComparisonIndex >=
      PASSWORD_COMPARISONS.length
    ) {
      state.passwordComparisonComplete =
        true;

      state.passwordComparisonIndex =
        PASSWORD_COMPARISONS.length;

      unlockPasswordBuilder();
    }

    setText(
      "passwordPowerProgress",
      state.passwordComparisonIndex
    );

    saveProgress();

    renderPasswordComparison();
  }


  function unlockPasswordBuilder() {
    byId(
      "passwordBuilderGame"
    )?.classList.add(
      "unlocked"
    );
  }


  function renderPasswordUpgrades() {
    const grid =
      byId(
        "passwordUpgradeGrid"
      );

    if (!grid) {
      return;
    }

    grid.innerHTML =
      "";

    PASSWORD_UPGRADES.forEach(
      (upgrade) => {
        const selected =
          state.selectedUpgrades.includes(
            upgrade.id
          );

        const button =
          document.createElement(
            "button"
          );

        button.type =
          "button";

        button.className =
          "password-upgrade-button";

        if (selected) {
          button.classList.add(
            "selected"
          );
        }

        button.innerHTML =
          `
            <strong>${upgrade.icon} ${upgrade.title}</strong>
            <small>${upgrade.description}</small>
          `;

        button.disabled =
          selected;

        button.addEventListener(
          "click",
          () => {
            applyPasswordUpgrade(
              upgrade.id
            );
          }
        );

        grid.appendChild(
          button
        );
      }
    );
  }


  function applyPasswordUpgrade(
    upgradeId
  ) {
    if (
      state.selectedUpgrades.includes(
        upgradeId
      )
    ) {
      return;
    }

    const upgrade =
      PASSWORD_UPGRADES.find(
        (item) =>
          item.id ===
          upgradeId
      );

    if (!upgrade) {
      return;
    }

    state.selectedUpgrades.push(
      upgradeId
    );

    state.passwordPowerScore =
      Math.min(
        100,
        state.passwordPowerScore +
          upgrade.points
      );

    updateBuilderPasswordText();

    updatePasswordPowerMeter();

    renderPasswordUpgrades();

 if (
  state.passwordPowerScore >=
  80
) {
  state.passwordPowerComplete =
    true;

  showElement(
    "passwordBuilderResult"
  );

  setMemeTip(
    "You powered up the pretend password. Press Continue to Crack Attack.",
    "congrats"
  );
} else {
  setMemeTip(
    "Good upgrade. Keep adding safe improvements until the power meter reaches the strong zone.",
    "thinking"
  );
}

syncPowerLabButton();
    saveProgress();
  }


  function updateBuilderPasswordText() {
    let password =
      "turtle";

    state.selectedUpgrades.forEach(
      (upgradeId) => {
        const upgrade =
          PASSWORD_UPGRADES.find(
            (item) =>
              item.id ===
              upgradeId
          );

        if (upgrade) {
          password +=
            upgrade.textAddition;
        }
      }
    );

    setText(
      "builderPasswordDisplay",
      password
    );
  }


  function updatePasswordPowerMeter() {
    const score =
      Math.min(
        100,
        state.passwordPowerScore
      );

    const fill =
      byId(
        "passwordPowerMeterFill"
      );

    const meter =
      byId(
        "passwordPowerMeter"
      );

    if (fill) {
      fill.style.width =
        `${score}%`;

      if (score < 40) {
        fill.style.background =
          "#ed607a";
      } else if (
        score <
        80
      ) {
        fill.style.background =
          "#f0b64a";
      } else {
        fill.style.background =
          "#32bd7b";
      }
    }

    meter?.setAttribute(
      "aria-valuenow",
      String(score)
    );

    let label =
      "Very weak";

    if (
      score >=
      80
    ) {
      label =
        "Strong practice password";
    } else if (
      score >=
      55
    ) {
      label =
        "Getting stronger";
    } else if (
      score >=
      30
    ) {
      label =
        "Still needs work";
    }

    setText(
      "passwordPowerLabel",
      label
    );

    updateBuilderPasswordText();
  }

   function syncPowerLabButton() {
  const finishButton =
    byId(
      "finishPasswordPowerLab"
    );

  if (!finishButton) {
    return;
  }

  const labComplete =
    state.passwordPowerScore >=
      80 ||
    state.passwordPowerComplete ===
      true;

  state.passwordPowerComplete =
    labComplete;

  finishButton.disabled =
    !labComplete;

  finishButton.classList.toggle(
    "locked-action",
    !labComplete
  );

  finishButton.textContent =
    labComplete
      ? "Continue to Crack Attack 🤖"
      : "Power Up the Password to Continue";
}

function finishPasswordPowerLab() {
  const labComplete =
    state.passwordPowerScore >=
      80 ||
    state.passwordPowerComplete ===
      true;

  if (!labComplete) {
    syncPowerLabButton();

    setMemeTip(
      "Power up the pretend password until the meter reaches the strong zone.",
      "thinking"
    );

    return;
  }

  state.passwordPowerComplete =
    true;

  state.currentSection =
    "crackAttackZone";

  saveProgress();

  loadCrackAttack();

  showSection(
    "crackAttackZone"
  );

  setMemeTip(
    "Now find the clues that could help a simulated attacker guess a password.",
    "welcome"
  );
}

  /* =====================================================
     ROOM 2 — CRACK ATTACK
  ===================================================== */

  function loadCrackAttack() {
    const scenario =
      CRACK_ATTACKS[
        state.crackAttackIndex
      ];

    if (
      state.crackAttackComplete ||
      !scenario
    ) {
      finishCrackAttackRoom();

      return;
    }

    state.removedClues =
      [];

    setText(
      "crackAttackProgress",
      state.crackAttackIndex
    );

    setText(
      "crackAttackScenarioTitle",
      scenario.title
    );

    setText(
      "crackAttackScenarioText",
      scenario.text
    );

    setText(
      "attackerProgressLabel",
      "The attacker has useful clues."
    );

    const fill =
      byId(
        "attackerProgressFill"
      );

    if (fill) {
      fill.style.width =
        "75%";

      fill.style.background =
        "#ef607a";
    }

    byId(
      "attackerProgressMeter"
    )?.setAttribute(
      "aria-valuenow",
      "75"
    );

    hideElement(
      "crackDefenseResult"
    );

    hideElement(
      "nextCrackAttack"
    );

    clearFeedback(
      "crackAttackFeedback"
    );

    renderAttackClues();
  }


  function renderAttackClues() {
    const scenario =
      CRACK_ATTACKS[
        state.crackAttackIndex
      ];

    const grid =
      byId(
        "attackClueGrid"
      );

    if (
      !scenario ||
      !grid
    ) {
      return;
    }

    grid.innerHTML =
      "";

    scenario.clues.forEach(
      (
        clue,
        index
      ) => {
        const button =
          document.createElement(
            "button"
          );

        button.type =
          "button";

        button.className =
          "attack-clue-button";

        if (
          !clue.dangerous
        ) {
          button.classList.add(
            "safe-clue"
          );
        }

        button.innerHTML =
          `
            <span aria-hidden="true">${clue.icon}</span>
            <strong>${clue.label}</strong>
          `;

        button.addEventListener(
          "click",
          () => {
            handleAttackClue(
              index,
              button
            );
          }
        );

        grid.appendChild(
          button
        );
      }
    );
  }


  function handleAttackClue(
    clueIndex,
    button
  ) {
    const scenario =
      CRACK_ATTACKS[
        state.crackAttackIndex
      ];

    const clue =
      scenario?.clues[
        clueIndex
      ];

    if (
      !clue ||
      button.disabled
    ) {
      return;
    }

    if (
      !clue.dangerous
    ) {
      button.classList.add(
        "wrong-clue"
      );

      setFeedback(
        "crackAttackFeedback",
        "That clue is not especially useful to the attacker. Look for personal details, common words, patterns, or reused passwords.",
        false
      );

      setMemeTip(
        "Try again. Remove clues that make the password easier to predict.",
        "wrong"
      );

      window.setTimeout(
        () => {
          button.classList.remove(
            "wrong-clue"
          );
        },
        500
      );

      return;
    }

    button.disabled =
      true;

    button.classList.add(
      "clue-removed"
    );

    state.removedClues.push(
      clueIndex
    );

    const dangerousCount =
      scenario.clues.filter(
        (item) =>
          item.dangerous
      ).length;

    const remaining =
      dangerousCount -
      state.removedClues.length;

    const progress =
      Math.max(
        0,
        Math.round(
          (
            remaining /
            dangerousCount
          ) *
            75
        )
      );

    const fill =
      byId(
        "attackerProgressFill"
      );

    if (fill) {
      fill.style.width =
        `${progress}%`;

      fill.style.background =
        progress <=
          20
          ? "#32bd7b"
          : "#f0b64a";
    }

    byId(
      "attackerProgressMeter"
    )?.setAttribute(
      "aria-valuenow",
      String(progress)
    );

    if (
      remaining >
      0
    ) {
      setText(
        "attackerProgressLabel",
        `${remaining} useful clue${remaining === 1 ? "" : "s"} remain.`
      );

      setFeedback(
        "crackAttackFeedback",
        "Clue removed. Keep searching.",
        true
      );

      saveProgress();

      return;
    }

    finishCurrentCrackAttack();
  }


  function finishCurrentCrackAttack() {
    const scenario =
      CRACK_ATTACKS[
        state.crackAttackIndex
      ];

    setText(
      "attackerProgressLabel",
      "Attack stopped. No useful clues remain."
    );

    setText(
      "crackDefenseTitle",
      "Attack stopped!"
    );

    setText(
      "crackDefenseExplanation",
      scenario.explanation
    );

    showElement(
      "crackDefenseResult"
    );

    showElement(
      "nextCrackAttack"
    );

    setFeedback(
      "crackAttackFeedback",
      "You removed every useful clue from the simulated attack.",
      true
    );

    setMemeTip(
      "Nice defense. Personal clues and predictable patterns can make passwords easier to guess.",
      "congrats"
    );

    saveProgress();
  }


  function nextCrackAttack() {
    state.crackAttackIndex +=
      1;

    if (
      state.crackAttackIndex >=
      CRACK_ATTACKS.length
    ) {
      state.crackAttackComplete =
        true;

      state.crackAttackIndex =
        CRACK_ATTACKS.length;

      finishCrackAttackRoom();

      return;
    }

    saveProgress();

    loadCrackAttack();
  }


  function finishCrackAttackRoom() {
    state.crackAttackComplete =
      true;

    state.currentSection =
      "securityGateZone";

    saveProgress();

    loadSecurityGate();

    showSection(
      "securityGateZone"
    );

    setMemeTip(
      "Next, build a second security layer. Click dotted cyber words whenever you need a definition.",
      "welcome"
    );
  }


  /* =====================================================
     ROOM 3 — SECURITY GATE
  ===================================================== */

  function loadSecurityGate() {
    const scenario =
      SECURITY_GATE_SCENARIOS[
        state.securityGateIndex
      ];

    if (
      state.securityGateComplete ||
      !scenario
    ) {
      finishSecurityGateRoom();

      return;
    }

    state.securityGateAnswered =
      false;

    setText(
      "securityGateProgress",
      state.securityGateIndex
    );

    setText(
      "securityAccountIcon",
      scenario.icon
    );

    setText(
      "securityAccountName",
      scenario.account
    );

    setText(
      "securityAccountStory",
      scenario.story
    );

    setText(
      "secondSecurityLayerName",
      "Choose another check"
    );

    byId(
      "secondSecurityLayer"
    )?.classList.remove(
      "protected"
    );

    byId(
      "securityGateDisplay"
    )?.classList.remove(
      "gate-protected"
    );

    hideElement(
      "nextSecurityGate"
    );

    clearFeedback(
      "securityGateFeedback"
    );

    renderSecurityChoices();
  }


  function renderSecurityChoices() {
    const scenario =
      SECURITY_GATE_SCENARIOS[
        state.securityGateIndex
      ];

    const grid =
      byId(
        "securityChoiceGrid"
      );

    if (
      !scenario ||
      !grid
    ) {
      return;
    }

    grid.innerHTML =
      "";

    scenario.choices.forEach(
      (
        choice,
        index
      ) => {
        const button =
          document.createElement(
            "button"
          );

        button.type =
          "button";

        button.className =
          "security-choice-button";

        const titleMarkup =
          choice.definition
            ? `
              <button
                class="cyber-word"
                type="button"
                data-cyber-word="${choice.title}"
                data-cyber-definition="${choice.definition}"
              >
                ${choice.title}
              </button>
            `
            : `
              <strong>
                ${choice.title}
              </strong>
            `;

        button.innerHTML =
          `
            <span aria-hidden="true">${choice.icon}</span>
            ${titleMarkup}
            <small>${choice.description}</small>
          `;

        button.addEventListener(
          "click",
          (event) => {
            if (
              event.target.closest(
                ".cyber-word"
              )
            ) {
              return;
            }

            answerSecurityGate(
              index,
              button
            );
          }
        );

        grid.appendChild(
          button
        );
      }
    );
  }


  function answerSecurityGate(
    selectedIndex,
    button
  ) {
    if (
      state.securityGateAnswered
    ) {
      return;
    }

    const scenario =
      SECURITY_GATE_SCENARIOS[
        state.securityGateIndex
      ];

    const choice =
      scenario?.choices[
        selectedIndex
      ];

    if (!choice) {
      return;
    }

    if (
      !choice.correct
    ) {
      button.classList.add(
        "incorrect"
      );

      setFeedback(
        "securityGateFeedback",
        "That choice does not add a safe, different security check. Try another option.",
        false
      );

      setMemeTip(
        "The second check should be different from the password and should not require sharing secrets.",
        "wrong"
      );

      return;
    }

    state.securityGateAnswered =
      true;

    disableButtons(
      ".security-choice-button"
    );

    button.classList.add(
      "correct"
    );

    setText(
      "secondSecurityLayerName",
      choice.title
    );

    byId(
      "secondSecurityLayer"
    )?.classList.add(
      "protected"
    );

    byId(
      "securityGateDisplay"
    )?.classList.add(
      "gate-protected"
    );

    setFeedback(
      "securityGateFeedback",
      `Gate protected! ${scenario.explanation}`,
      true
    );

    setMemeTip(
      "The account now has two different security checks.",
      "congrats"
    );

    showElement(
      "nextSecurityGate"
    );

    saveProgress();
  }


  function nextSecurityGate() {
    if (
      !state.securityGateAnswered
    ) {
      return;
    }

    state.securityGateIndex +=
      1;

    if (
      state.securityGateIndex >=
      SECURITY_GATE_SCENARIOS.length
    ) {
      state.securityGateComplete =
        true;

      state.securityGateIndex =
        SECURITY_GATE_SCENARIOS.length;

      finishSecurityGateRoom();

      return;
    }

    saveProgress();

    loadSecurityGate();
  }


  function finishSecurityGateRoom() {
    state.securityGateComplete =
      true;

    state.currentSection =
      "accountRescueZone";

    saveProgress();

    loadAccountRescue();

    showSection(
      "accountRescueZone"
    );

    setMemeTip(
      "Account alerts can feel scary. Stay calm, use official apps or websites, and ask a trusted adult for help.",
      "welcome"
    );
  }


  /* =====================================================
     ROOM 4 — ACCOUNT RESCUE
  ===================================================== */

  function loadAccountRescue() {
    const scenario =
      ACCOUNT_RESCUE_SCENARIOS[
        state.accountRescueIndex
      ];

    if (
      state.accountRescueComplete ||
      !scenario
    ) {
      finishAccountRescueRoom();

      return;
    }

    state.accountRescueAnswered =
      false;

    setText(
      "accountRescueProgress",
      state.accountRescueIndex
    );

    setText(
      "accountAlertIcon",
      scenario.icon
    );

    setText(
      "accountAlertTitle",
      scenario.title
    );

    setText(
      "accountAlertMessage",
      scenario.message
    );

    hideElement(
      "accountRescueResult"
    );

    hideElement(
      "nextAccountRescue"
    );

    clearFeedback(
      "accountRescueFeedback"
    );

    renderAccountRescueChoices();
  }


  function renderAccountRescueChoices() {
    const scenario =
      ACCOUNT_RESCUE_SCENARIOS[
        state.accountRescueIndex
      ];

    const grid =
      byId(
        "accountRescueChoiceGrid"
      );

    if (
      !scenario ||
      !grid
    ) {
      return;
    }

    grid.innerHTML =
      "";

    scenario.choices.forEach(
      (
        choice,
        index
      ) => {
        const button =
          document.createElement(
            "button"
          );

        button.type =
          "button";

        button.className =
          "account-rescue-choice";

        button.textContent =
          choice.text;

        button.addEventListener(
          "click",
          () => {
            answerAccountRescue(
              index,
              button
            );
          }
        );

        grid.appendChild(
          button
        );
      }
    );
  }


  function answerAccountRescue(
    selectedIndex,
    button
  ) {
    if (
      state.accountRescueAnswered
    ) {
      return;
    }

    const scenario =
      ACCOUNT_RESCUE_SCENARIOS[
        state.accountRescueIndex
      ];

    const choice =
      scenario?.choices[
        selectedIndex
      ];

    if (!choice) {
      return;
    }

    if (
      !choice.correct
    ) {
      button.classList.add(
        "incorrect"
      );

      setFeedback(
        "accountRescueFeedback",
        "That response could make the situation less safe. Try another choice.",
        false
      );

      setMemeTip(
        "Use the official app or website, protect the account, and tell a trusted adult.",
        "wrong"
      );

      return;
    }

    state.accountRescueAnswered =
      true;

    disableButtons(
      ".account-rescue-choice"
    );

    button.classList.add(
      "correct"
    );

    setText(
      "accountRescueResultIcon",
      "🛡️"
    );

    setText(
      "accountRescueResultTitle",
      "Account protected"
    );

    setText(
      "accountRescueExplanation",
      scenario.explanation
    );

    showElement(
      "accountRescueResult"
    );

    showElement(
      "nextAccountRescue"
    );

    setFeedback(
      "accountRescueFeedback",
      "Safe response selected.",
      true
    );

    setMemeTip(
      "Excellent rescue. Staying calm and using official account tools helps protect the account.",
      "congrats"
    );

    saveProgress();
  }


  function nextAccountRescue() {
    if (
      !state.accountRescueAnswered
    ) {
      return;
    }

    state.accountRescueIndex +=
      1;

    if (
      state.accountRescueIndex >=
      ACCOUNT_RESCUE_SCENARIOS.length
    ) {
      state.accountRescueComplete =
        true;

      state.accountRescueIndex =
        ACCOUNT_RESCUE_SCENARIOS.length;

      finishAccountRescueRoom();

      return;
    }

    saveProgress();

    loadAccountRescue();
  }


  function finishAccountRescueRoom() {
    state.accountRescueComplete =
      true;

    state.currentSection =
      "passwordVaultZone";

    saveProgress();

    loadVaultChallenge();

    showSection(
      "passwordVaultZone"
    );

    setMemeTip(
      "Final room: secure all five Password Vault doors.",
      "welcome"
    );
  }


  /* =====================================================
     ROOM 5 — PASSWORD VAULT
  ===================================================== */

  function loadVaultChallenge() {
    const challenge =
      VAULT_CHALLENGES[
        state.vaultIndex
      ];

    if (
      state.vaultComplete ||
      !challenge
    ) {
      completeMission();

      return;
    }

    state.vaultAnswered =
      false;

    setText(
      "vaultDoorsSecured",
      state.vaultDoorsSecured
    );

    setText(
      "vaultDoorNumber",
      state.vaultIndex +
        1
    );

    setText(
      "vaultChallengeTitle",
      challenge.title
    );

    setText(
      "vaultChallengeText",
      challenge.text
    );

    hideElement(
      "nextVaultDoor"
    );

    clearFeedback(
      "vaultChallengeFeedback"
    );

    byId(
      "passwordVaultDoor"
    )?.classList.remove(
      "vault-door-open",
      "vault-door-wrong"
    );

    renderVaultAnswers();
  }


  function renderVaultAnswers() {
    const challenge =
      VAULT_CHALLENGES[
        state.vaultIndex
      ];

    const grid =
      byId(
        "vaultAnswerGrid"
      );

    if (
      !challenge ||
      !grid
    ) {
      return;
    }

    grid.innerHTML =
      "";

const displayedAnswers =
  shuffledAnswers(
    challenge.answers,
    challenge.correctIndex
  );

displayedAnswers.forEach(
  (
    item
  ) => {
     
        const button =
          document.createElement(
            "button"
          );

        button.type =
          "button";

        button.className =
          "vault-answer-button";

button.textContent =
  item.answer;
     
        button.addEventListener(
          "click",
          () => {
answerVaultChallenge(
  item.correct,
  button
);
          }
        );

        grid.appendChild(
          button
        );
      }
    );
  }


function answerVaultChallenge(
  correct,
  button
){
    if (
      state.vaultAnswered
    ) {
      return;
    }

    const challenge =
      VAULT_CHALLENGES[
        state.vaultIndex
      ];

    if (!challenge) {
      return;
    }

       if (!correct) {
      button.disabled =
        true;

      button.classList.add(
        "incorrect"
      );

      byId(
        "passwordVaultDoor"
      )?.classList.add(
        "vault-door-wrong"
      );

      setFeedback(
        "vaultChallengeFeedback",
        "That choice does not fully secure the vault door. Try another answer.",
        false
      );

      setMemeTip(
        "The door is still locked. Use what you learned in the training rooms.",
        "wrong"
      );

      window.setTimeout(
        () => {
          byId(
            "passwordVaultDoor"
          )?.classList.remove(
            "vault-door-wrong"
          );
        },
        500
      );

      return;
    }

    state.vaultAnswered =
      true;

    disableButtons(
      ".vault-answer-button"
    );

    button.classList.add(
      "correct"
    );

    state.vaultDoorsSecured =
      state.vaultIndex +
        1;

    setText(
      "vaultDoorsSecured",
      state.vaultDoorsSecured
    );

    byId(
      "passwordVaultDoor"
    )?.classList.add(
      "vault-door-open"
    );

    setFeedback(
      "vaultChallengeFeedback",
      `Vault secured! ${challenge.explanation}`,
      true
    );

    setMemeTip(
      `Vault Door ${state.vaultIndex + 1} is secure.`,
      "congrats"
    );

    const nextButton =
      byId(
        "nextVaultDoor"
      );

    if (nextButton) {
      nextButton.textContent =
        state.vaultIndex ===
          VAULT_CHALLENGES.length -
          1
          ? "Complete the Mission"
          : "Continue to the Next Door";
    }

    showElement(
      "nextVaultDoor"
    );

    saveProgress();
  }


  function nextVaultDoor() {
    if (
      !state.vaultAnswered
    ) {
      return;
    }

    state.vaultIndex +=
      1;

    if (
      state.vaultIndex >=
      VAULT_CHALLENGES.length
    ) {
      state.vaultComplete =
        true;

      state.vaultIndex =
        VAULT_CHALLENGES.length;

      state.vaultDoorsSecured =
        VAULT_CHALLENGES.length;

      completeMission();

      return;
    }

    saveProgress();

    loadVaultChallenge();
  }


  /* =====================================================
     MISSION COMPLETION
  ===================================================== */

  function rewardAlreadyAwarded() {
    return (
      localStorage.getItem(
        STORAGE_KEYS.reward
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

      return;
    }

    addPoints(
      MISSION_REWARD
    );

    localStorage.setItem(
      STORAGE_KEYS.reward,
      "true"
    );

    state.missionPointsEarned =
      MISSION_REWARD;
  }


  function saveBadge() {
    const badges =
      safelyReadJson(
        STORAGE_KEYS.badges,
        []
      );

    const safeBadges =
      Array.isArray(
        badges
      )
        ? badges
        : [];

    if (
      !safeBadges.includes(
        BADGE_NAME
      )
    ) {
      safeBadges.push(
        BADGE_NAME
      );
    }

    safelyWriteJson(
      STORAGE_KEYS.badges,
      safeBadges
    );

    localStorage.setItem(
      STORAGE_KEYS.badge,
      "true"
    );

    localStorage.setItem(
      STORAGE_KEYS.completed,
      "true"
    );
  }


  function completeMission() {
    state.vaultComplete =
      true;

    state.vaultDoorsSecured =
      VAULT_CHALLENGES.length;

    state.missionCompleted =
      true;

    state.badgeEarned =
      true;

    state.currentSection =
      "passwordMissionResult";

    awardMissionPoints();

    saveBadge();

    saveProgress();

    setText(
      "passwordResultMessage",
      "You built stronger pretend passwords, stopped simulated attacks, added extra security, rescued threatened accounts, and secured all five Password Vault doors."
    );

    setText(
      "passwordPointsEarned",
      state.missionPointsEarned
    );

    showSection(
      "passwordMissionResult"
    );

    setMemeTip(
      "Mission complete! You earned the Password Safe Keeper badge.",
      "congrats"
    );
  }


  /* =====================================================
     REPLAY
  ===================================================== */

  function openReplayDialog() {
    const dialog =
      byId(
        "passwordReplayDialog"
      );

    if (
      dialog &&
      typeof dialog.showModal ===
        "function"
    ) {
      dialog.showModal();

      return;
    }

    const confirmed =
      window.confirm(
        "Replay Password Safe Keeper from the beginning?"
      );

    if (confirmed) {
      replayMission();
    }
  }


  function replayMission() {
    localStorage.removeItem(
      STORAGE_KEYS.progress
    );

    localStorage.removeItem(
      STORAGE_KEYS.completed
    );

    localStorage.removeItem(
      STORAGE_KEYS.badge
    );

    localStorage.setItem(
      STORAGE_KEYS.replay,
      "true"
    );

    /*
      Keep:
      - passwordMissionRewardAwarded
      - total points
      - Safetii badge list

      This prevents repeated point farming.
    */

    window.location.replace(
      `${window.location.pathname}?replay=true&reset=${Date.now()}`
    );
  }


  function bindReplayDialog() {
    const dialog =
      byId(
        "passwordReplayDialog"
      );

    bindButton(
      "replayPasswordMission",
      openReplayDialog
    );

    bindButton(
      "cancelPasswordReplay",
      () => {
        dialog?.close();
      }
    );

    bindButton(
      "confirmPasswordReplay",
      replayMission
    );

    dialog?.addEventListener(
      "click",
      (event) => {
        if (
          event.target ===
          dialog
        ) {
          dialog.close();
        }
      }
    );
  }


  function checkReplayRequest() {
    const params =
      new URLSearchParams(
        window.location.search
      );

    const replayRequested =
      params.get(
        "replay"
      ) ===
        "true" ||
      localStorage.getItem(
        STORAGE_KEYS.replay
      ) ===
        "true";

    if (!replayRequested) {
      return;
    }

    localStorage.removeItem(
      STORAGE_KEYS.progress
    );

    localStorage.removeItem(
      STORAGE_KEYS.completed
    );

    localStorage.removeItem(
      STORAGE_KEYS.badge
    );

    localStorage.removeItem(
      STORAGE_KEYS.replay
    );

    state = {
      ...defaultState
    };
  }


  /* =====================================================
     RESTORE SAVED SECTION
  ===================================================== */

  function restoreMission() {
    loadHeaderInformation();

    if (
      state.missionCompleted
    ) {
      setText(
        "passwordPointsEarned",
        state.missionPointsEarned
      );

      showSection(
        "passwordMissionResult",
        false
      );

      return;
    }

    switch (
      state.currentSection
    ) {
      case "passwordPowerZone":
        loadPasswordPowerLab();
        break;

      case "crackAttackZone":
        loadCrackAttack();
        break;

      case "securityGateZone":
        loadSecurityGate();
        break;

      case "accountRescueZone":
        loadAccountRescue();
        break;

      case "passwordVaultZone":
        loadVaultChallenge();
        break;

      default:
        state.currentSection =
          DEFAULT_SECTION;
    }

    showSection(
      state.currentSection,
      false
    );
  }


  /* =====================================================
     EVENT BINDING
  ===================================================== */

  function bindMissionEvents() {
    bindButton(
      "acceptPasswordMission",
      startMission
    );

    bindButton(
      "nextPasswordComparison",
      nextPasswordComparison
    );

    bindButton(
      "finishPasswordPowerLab",
      finishPasswordPowerLab
    );

    bindButton(
      "nextCrackAttack",
      nextCrackAttack
    );

    bindButton(
      "nextSecurityGate",
      nextSecurityGate
    );

    bindButton(
      "nextAccountRescue",
      nextAccountRescue
    );

    bindButton(
      "nextVaultDoor",
      nextVaultDoor
    );

    bindMemeCorner();

    bindCyberWordDefinitions();

    bindReplayDialog();
  }


  /* =====================================================
     INITIALIZATION
  ===================================================== */

  function initializePasswordMission() {
    checkReplayRequest();

    bindMissionEvents();

    restoreMission();

    console.log(
      "Safetii Net Password Safe Keeper rebuilt mission loaded."
    );
  }


  if (
    document.readyState ===
    "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      initializePasswordMission,
      {
        once:
          true
      }
    );
  } else {
    initializePasswordMission();
  }
})();
