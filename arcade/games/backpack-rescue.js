"use strict";

/* =========================================================
   SAFETII NET — CYBER ARCADE
   BACKPACK RESCUE
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

  const actionNames = {
    keep: "Keep It",
    delete: "Delete It",
    report: "Block and Report",
    adult: "Tell a Trusted Adult"
  };

  /* =====================================================
     RESCUE QUESTION BANKS
  ===================================================== */

  const itemsByHeat = {
    mild: [
      {
        id: "mild-school-file",
        icon: "📄",
        title: "Homework File",
        context:
          "A worksheet appeared in the digital backpack.",
        type: "School File",
        badge: "Expected",
        message:
          "Math_Practice_Week4.pdf",
        source:
          "Normal school portal",
        extra:
          "Teacher posted it with today’s assignment",
        action: "keep",
        explanation:
          "The file arrived through the expected school portal and matches an assignment the student already knows about."
      },

      {
        id: "mild-free-coins",
        icon: "🎁",
        title: "Free Game Coins",
        context:
          "A message promises a large prize.",
        type: "Direct Message",
        badge: "Suspicious",
        message:
          "Click now to receive 50,000 free game coins!",
        source:
          "Unknown account",
        extra:
          "Includes an unfamiliar shortened link",
        action: "delete",
        explanation:
          "Unexpected prize messages and unfamiliar links are common scams. Delete the message without opening the link."
      },

      {
        id: "mild-bullying",
        icon: "😡",
        title: "Mean Messages",
        context:
          "The same account keeps sending insulting messages.",
        type: "Chat Messages",
        badge: "Harassment",
        message:
          "Everyone hates you. I am going to keep messaging you.",
        source:
          "Student account",
        extra:
          "Repeated messages after being asked to stop",
        action: "report",
        explanation:
          "Repeated harassment should be blocked and reported so the platform can stop the contact."
      },

      {
        id: "mild-threat",
        icon: "🚨",
        title: "Threatening Message",
        context:
          "A frightening message appears in the backpack.",
        type: "Direct Message",
        badge: "Danger",
        message:
          "I know where you live, and I am coming for you.",
        source:
          "Unknown user",
        extra:
          "Threat involves possible real-world harm",
        action: "adult",
        explanation:
          "Threats should be shown to a trusted adult immediately. Save the message as evidence and do not respond."
      },

      {
        id: "mild-family-photo",
        icon: "📸",
        title: "Family Photo",
        context:
          "A parent sends a familiar picture through the family chat.",
        type: "Photo",
        badge: "Expected",
        message:
          "Photo from Saturday’s family dinner",
        source:
          "Known family group chat",
        extra:
          "No strange link or request",
        action: "keep",
        explanation:
          "The photo came through a known family chat and does not contain a suspicious request."
      },

      {
        id: "mild-unknown-download",
        icon: "📦",
        title: "Unknown Download",
        context:
          "A file appears from someone the player does not know.",
        type: "Download",
        badge: "Suspicious",
        message:
          "awesome_game_hack.exe",
        source:
          "Unknown website",
        extra:
          "Promises cheats and unlimited rewards",
        action: "delete",
        explanation:
          "Unknown executable files can contain malware. Delete the file without opening it."
      },

      {
        id: "mild-fake-account",
        icon: "👤",
        title: "Fake Friend Account",
        context:
          "An account copies a friend’s picture and starts messaging.",
        type: "Social Account",
        badge: "Impostor",
        message:
          "This is my new account. Send me your password.",
        source:
          "Brand-new copied account",
        extra:
          "Requests login information",
        action: "report",
        explanation:
          "The account is impersonating someone and requesting a password. Block and report it."
      },

      {
        id: "mild-private-photo-threat",
        icon: "📱",
        title: "Photo Threat",
        context:
          "Someone threatens to post an embarrassing picture.",
        type: "Direct Message",
        badge: "Serious",
        message:
          "Send me money or I will post this photo everywhere.",
        source:
          "Unknown account",
        extra:
          "Threatens blackmail",
        action: "adult",
        explanation:
          "Blackmail should never be handled alone. Save evidence, stop responding, and tell a trusted adult immediately."
      }
    ],

    spicy: [
      {
        id: "spicy-class-link",
        icon: "🔗",
        title: "Class Meeting Link",
        context:
          "A meeting link appears before class.",
        type: "School Link",
        badge: "Expected",
        message:
          "Join today’s science review at 4:00.",
        source:
          "Teacher’s normal classroom page",
        extra:
          "Matches the schedule already posted",
        action: "keep",
        explanation:
          "The link appears through the normal classroom page and matches an expected event."
      },

      {
        id: "spicy-phishing-email",
        icon: "📧",
        title: "Account Warning",
        context:
          "An urgent email claims the account will close.",
        type: "Email",
        badge: "Suspicious",
        message:
          "Your account expires in 10 minutes. Sign in here now.",
        source:
          "security-team928@unknown.test",
        extra:
          "Link address does not match the real service",
        action: "delete",
        explanation:
          "The urgent deadline and mismatched sender are phishing clues. Delete the message and visit the service directly."
      },

      {
        id: "spicy-harassing-group",
        icon: "💬",
        title: "Harassing Group Chat",
        context:
          "A group repeatedly targets one student.",
        type: "Group Chat",
        badge: "Harassment",
        message:
          "Post another embarrassing picture of them.",
        source:
          "Classmate group",
        extra:
          "Repeated harmful posts and ridicule",
        action: "report",
        explanation:
          "The harmful group behavior should be reported. Save evidence and block accounts involved when possible."
      },

      {
        id: "spicy-hacked-account",
        icon: "🔐",
        title: "Possible Account Theft",
        context:
          "The player receives a login alert from another city.",
        type: "Security Alert",
        badge: "Serious",
        message:
          "New login detected from a device you do not recognize.",
        source:
          "Official account security page",
        extra:
          "The player did not make the login",
        action: "adult",
        explanation:
          "A trusted adult can help secure the account, change the password, and enable stronger protections."
      },

      {
        id: "spicy-known-photo",
        icon: "🖼️",
        title: "Art Club Poster",
        context:
          "A poster arrives through the club’s usual page.",
        type: "Image",
        badge: "Expected",
        message:
          "Art Club meets Wednesday in Room 210.",
        source:
          "Known school club page",
        extra:
          "No strange attachment or personal request",
        action: "keep",
        explanation:
          "The poster comes from a known source and contains a normal club announcement."
      },

      {
        id: "spicy-macro-document",
        icon: "📄",
        title: "Strange Document",
        context:
          "A document asks the player to enable special permissions.",
        type: "Document",
        badge: "Suspicious",
        message:
          "Enable macros to view your prize certificate.",
        source:
          "Unknown sender",
        extra:
          "Unexpected file with security permissions",
        action: "delete",
        explanation:
          "Unexpected documents asking for macros or permissions can install malware. Delete it."
      },

      {
        id: "spicy-impersonator",
        icon: "🎭",
        title: "Teacher Impostor",
        context:
          "A fake teacher account asks for student information.",
        type: "Social Account",
        badge: "Impostor",
        message:
          "Send me a picture of your student ID right now.",
        source:
          "Brand-new account with a misspelled username",
        extra:
          "No connection to the school’s official page",
        action: "report",
        explanation:
          "This account is impersonating a teacher and requesting private information. Block and report it."
      },

      {
        id: "spicy-secret-meeting",
        icon: "🕵️",
        title: "Secret Meeting Request",
        context:
          "An online stranger asks the player to meet alone.",
        type: "Direct Message",
        badge: "Danger",
        message:
          "Meet me behind the mall and do not tell your parents.",
        source:
          "Online-only acquaintance",
        extra:
          "Requests secrecy and an in-person meeting",
        action: "adult",
        explanation:
          "A secret meeting request is a major warning sign. Do not go and tell a trusted adult immediately."
      }
    ],

    hot: [
      {
        id: "hot-known-update",
        icon: "⬆️",
        title: "Official App Update",
        context:
          "An update appears inside the device’s normal app store.",
        type: "Software Update",
        badge: "Verified",
        message:
          "Security update available for installed app.",
        source:
          "Official device app store",
        extra:
          "Publisher and app name match the installed version",
        action: "keep",
        explanation:
          "An expected update through the official app store is generally safe to install."
      },

      {
        id: "hot-fake-antivirus",
        icon: "🦠",
        title: "Fake Virus Warning",
        context:
          "A pop-up claims hundreds of viruses were found.",
        type: "Browser Pop-Up",
        badge: "Suspicious",
        message:
          "347 viruses detected! Download CleanerPro immediately.",
        source:
          "Random advertisement",
        extra:
          "Uses flashing warnings and an unknown download",
        action: "delete",
        explanation:
          "Scareware uses fake warnings to push unsafe downloads. Close it and do not install anything."
      },

      {
        id: "hot-stalker-account",
        icon: "📍",
        title: "Location Harassment",
        context:
          "An account repeatedly comments about where the player is.",
        type: "Social Account",
        badge: "Harassment",
        message:
          "I saw you at the park again. I know when you leave school.",
        source:
          "Unknown follower",
        extra:
          "Repeated location-focused messages",
        action: "report",
        explanation:
          "The account should be blocked and reported. Save evidence and tell a trusted adult because the messages involve real-world tracking."
      },

      {
        id: "hot-self-harm",
        icon: "🆘",
        title: "Friend in Crisis",
        context:
          "A friend sends a message saying they may hurt themselves.",
        type: "Private Message",
        badge: "Emergency",
        message:
          "I do not feel safe, but promise you will not tell anyone.",
        source:
          "Known friend",
        extra:
          "Immediate safety concern",
        action: "adult",
        explanation:
          "Safety is more important than keeping this secret. Tell a trusted adult immediately."
      },

      {
        id: "hot-school-backup",
        icon: "💾",
        title: "Verified Backup File",
        context:
          "A backup appears from a project the player created.",
        type: "Cloud File",
        badge: "Verified",
        message:
          "Robotics_Project_Backup_v3.zip",
        source:
          "Player’s normal school cloud folder",
        extra:
          "Created during the player’s own backup process",
        action: "keep",
        explanation:
          "The file is expected, came from the normal cloud folder, and matches the player’s own project."
      },

      {
        id: "hot-remote-control",
        icon: "🖥️",
        title: "Remote Access Tool",
        context:
          "Someone claiming to be support sends a program.",
        type: "Download",
        badge: "Danger",
        message:
          "Install this so I can control your screen and fix everything.",
        source:
          "Unverified support account",
        extra:
          "Requests full remote access",
        action: "delete",
        explanation:
          "Unknown people should never be given remote control of a device. Delete the program and use official support."
      },

      {
        id: "hot-cloned-account",
        icon: "👥",
        title: "Cloned Family Account",
        context:
          "An account copies a family member’s photos and requests money.",
        type: "Social Account",
        badge: "Impostor",
        message:
          "I need gift cards urgently. Do not call my old number.",
        source:
          "Nearly identical copied profile",
        extra:
          "Requests secrecy and payment",
        action: "report",
        explanation:
          "The cloned account is impersonating a family member. Block and report it, then verify through a known contact method."
      },

      {
        id: "hot-private-data-leak",
        icon: "📋",
        title: "Private Information Leak",
        context:
          "A screenshot containing passwords and an address is posted publicly.",
        type: "Public Post",
        badge: "Emergency",
        message:
          "Screenshot shows a password note and home address.",
        source:
          "Player’s own public account",
        extra:
          "Sensitive information is already visible",
        action: "adult",
        explanation:
          "The post should be removed immediately, passwords changed, and a trusted adult should help secure the affected accounts."
      }
    ]
  };

  let selectedHeat =
    "mild";

  let activeItems =
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

  function getCurrentItem() {
    return activeItems[
      currentQuestionIndex
    ];
  }

  function getPointValue() {
    const fallback = {
      mild: 10,
      spicy: 20,
      hot: 30
    };

    return (
      arcade.HEAT_LEVELS?.[
        selectedHeat
      ]?.pointsPerCorrect ||
      fallback[selectedHeat] ||
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
    byId("backpackHintPanel")
      ?.classList.add(
        "hidden"
      );

    byId("openBackpackHint")
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
    .querySelectorAll(".heat-choice")
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

  byId("openBackpackHint")
    ?.addEventListener(
      "click",
      () => {
        const panel =
          byId("backpackHintPanel");

        const isOpening =
          panel?.classList.contains(
            "hidden"
          );

        panel?.classList.toggle(
          "hidden"
        );

        byId("openBackpackHint")
          ?.setAttribute(
            "aria-expanded",
            isOpening
              ? "true"
              : "false"
          );
      }
    );

  byId("closeBackpackHint")
    ?.addEventListener(
      "click",
      closeHint
    );

  /* =====================================================
     START GAME
  ===================================================== */

  function startGame() {
    try {
      activeItems =
        itemsByHeat[
          selectedHeat
        ] ||
        itemsByHeat.mild;

      currentQuestionIndex =
        0;

      correctAnswers =
        0;

      answerLocked =
        false;

      arcade.startRound({
        gameId:
          `backpack-rescue-${selectedHeat}`,

        gameName:
          `Backpack Rescue ${
            heatNames[selectedHeat]
          }`,

        heatLevel:
          selectedHeat,

        questionCount:
          activeItems.length
      });

      setText(
        "questionTotal",
        activeItems.length
      );

      setText(
        "currentHeat",
        heatNames[selectedHeat]
      );

      setText(
        "questionPointValue",
        getPointValue()
      );

      showScreen(
        "playScreen"
      );

      loadItem();
    } catch (error) {
      console.error(
        "Backpack Rescue could not start:",
        error
      );

      alert(
        `Backpack Rescue could not start: ${error.message}`
      );
    }
  }

  const startButton =
    byId("startGame");

  if (startButton) {
    startButton.dataset
      .backpackRescueConnected =
      "true";

    startButton.addEventListener(
      "click",
      startGame
    );
  } else {
    console.error(
      "Backpack Rescue start button was not found."
    );
  }

  /* =====================================================
     LOAD ITEM
  ===================================================== */

  function loadItem() {
    const item =
      getCurrentItem();

    if (!item) {
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
      "itemIcon",
      item.icon
    );

    setText(
      "itemTitle",
      item.title
    );

    setText(
      "itemContext",
      item.context
    );

    setText(
      "itemType",
      item.type
    );

    setText(
      "riskBadge",
      item.badge
    );

    setText(
      "itemMessage",
      `“${item.message}”`
    );

    setText(
      "itemSource",
      item.source
    );

    setText(
      "itemExtraDetail",
      item.extra
    );

    const progress =
      (
        currentQuestionIndex /
        activeItems.length
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
        ".backpack-answer-choice"
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

    const item =
      getCurrentItem();

    if (!item) {
      return;
    }

    answerLocked =
      true;

    const selectedAction =
      button.dataset.action;

    const correct =
      selectedAction ===
      item.action;

    const scoreResult =
      arcade.answerQuestion({
        questionId:
          item.id,

        correct
      });

    if (correct) {
      correctAnswers += 1;
    }

    document
      .querySelectorAll(
        ".backpack-answer-choice"
      )
      .forEach(
        (answerButton) => {
          answerButton.disabled =
            true;

          const action =
            answerButton.dataset.action;

          if (
            action === item.action
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
        "Backpack protected!"
      );

      setText(
        "feedbackText",
        `${actionNames[
          item.action
        ]} is the best first action. ${item.explanation}`
      );
    } else {
      setText(
        "feedbackTitle",
        "Review the rescue action."
      );

      setText(
        "feedbackText",
        `The best first action is ${
          actionNames[
            item.action
          ]
        }. ${item.explanation}`
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
        activeItems.length - 1
          ? "See Results"
          : "Next Item";

      nextButton.classList.remove(
        "hidden"
      );
    }

    showReaction({
      correct,
      points:
        scoreResult.pointsEarned,
      correctAction:
        actionNames[item.action]
    });

    updateLiveStats();
  }

  document
    .querySelectorAll(
      ".backpack-answer-choice"
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
    correctAction
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
        "Meme celebrates a successful digital rescue";

      setText(
        "memeReactionTitle",
        "Rescue complete!"
      );

      setText(
        "memeReactionMessage",
        `You earned ${points} points.`
      );
    } else {
      image.src =
        "../../assets/mascot/wrong.png";

      image.alt =
        "Meme encourages the player to review the rescue action";

      setText(
        "memeReactionTitle",
        "Choose the safest first step."
      );

      setText(
        "memeReactionMessage",
        `The best action is ${correctAction}.`
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
      activeItems.length
    ) {
      finishGame();
      return;
    }

    loadItem();
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
      `${correctAnswers}/${activeItems.length}`
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
      "Keep practicing when to keep, delete, report, or get help with digital items.";

    if (
      result.accuracy === 100
    ) {
      message =
        "Perfect rescue! You protected the digital backpack in every situation.";
    } else if (
      result.accuracy >= 75
    ) {
      message =
        "Excellent rescue work! You chose the safest response for almost every item.";
    } else if (
      result.accuracy >= 50
    ) {
      message =
        "Good effort. Remember: suspicious files get deleted, harmful accounts get reported, and serious danger needs a trusted adult.";
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
    "Backpack Rescue loaded successfully."
  );
})();
