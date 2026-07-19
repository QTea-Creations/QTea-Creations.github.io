
"use strict";

/* =========================================================
   SAFETII NET — CYBER ARCADE
   IMPOSTOR ALERT
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

  const verdictNames = {
    real: "Likely Real",
    suspicious: "Suspicious",
    impostor: "Impostor"
  };

  /* =====================================================
     CASE BANKS
  ===================================================== */

  const casesByHeat = {
    mild: [
      {
        id: "mild-coach-real",
        avatar: "🏀",
        displayName: "Coach Daniels",
        username: "@CoachDaniels",
        verified: false,
        accountAge: "3 years",
        followers: "412",
        mutuals: "18",
        message:
          "Practice has moved to 5:00 today. Please check the team calendar.",
        profileDetails:
          "Same account used for previous team announcements",
        requestDetails:
          "No link, password, payment, or private meeting requested",
        verdict: "real",
        explanation:
          "The established account, mutual connections, familiar communication pattern, and ordinary team update make this account likely real."
      },

      {
        id: "mild-free-prize",
        avatar: "🎁",
        displayName: "Game Prize Center",
        username: "@FREE_GEMS_NOW_928",
        verified: false,
        accountAge: "Created today",
        followers: "3",
        mutuals: "0",
        message:
          "YOU WON 50,000 GEMS! Send your password now to claim them!",
        profileDetails:
          "No posts and a generic prize image",
        requestDetails:
          "Requests the player’s password immediately",
        verdict: "impostor",
        explanation:
          "Real games do not need a password to deliver a prize. The brand-new account, pressure, and password request clearly reveal a scam."
      },

      {
        id: "mild-friend-new-account",
        avatar: "👧",
        displayName: "Maya Thompson",
        username: "@MayaThompsonNEW",
        verified: false,
        accountAge: "1 hour",
        followers: "2",
        mutuals: "0",
        message:
          "Hey! This is my new account. What is your home address again?",
        profileDetails:
          "Uses Maya’s picture but has no posts",
        requestDetails:
          "Requests a private home address",
        verdict: "suspicious",
        explanation:
          "The account may or may not belong to Maya. Verify through Maya’s known phone number or old account before responding."
      },

      {
        id: "mild-school-real",
        avatar: "🏫",
        displayName: "Roosevelt Academy",
        username: "@RooseveltAcademy",
        verified: true,
        accountAge: "6 years",
        followers: "8,420",
        mutuals: "36",
        message:
          "School is closed tomorrow because of severe weather.",
        profileDetails:
          "Verified account linked from the official school website",
        requestDetails:
          "No personal information requested",
        verdict: "real",
        explanation:
          "The verification, long account history, official website connection, and normal announcement make this likely authentic."
      },

      {
        id: "mild-fake-parent",
        avatar: "👩",
        displayName: "Mom",
        username: "@YourMomEmergency",
        verified: false,
        accountAge: "10 minutes",
        followers: "0",
        mutuals: "0",
        message:
          "I lost my phone. Send me the six-digit code you just received.",
        profileDetails:
          "No profile history or family connections",
        requestDetails:
          "Requests a verification code",
        verdict: "impostor",
        explanation:
          "Verification codes should never be shared. Contact the parent using a known number or ask another trusted adult."
      },

      {
        id: "mild-artist-real",
        avatar: "🎨",
        displayName: "Creative Kids Club",
        username: "@CreativeKidsClub",
        verified: false,
        accountAge: "4 years",
        followers: "2,104",
        mutuals: "11",
        message:
          "Saturday’s public art activity begins at noon.",
        profileDetails:
          "Regular posts from the same community organization",
        requestDetails:
          "Directs families to its normal public event page",
        verdict: "real",
        explanation:
          "The established history, consistent organization posts, and ordinary public event notice support that this account is real."
      },

      {
        id: "mild-celebrity-message",
        avatar: "🌟",
        displayName: "Taylor Famous",
        username: "@TaylorFamous_OfficialWinner",
        verified: false,
        accountAge: "2 days",
        followers: "12",
        mutuals: "0",
        message:
          "You are my biggest fan! Buy a gift card and send me the number.",
        profileDetails:
          "Copied celebrity photograph and no verification",
        requestDetails:
          "Requests gift-card payment",
        verdict: "impostor",
        explanation:
          "A celebrity would not privately demand gift cards. The copied image, tiny account, and payment request are clear warning signs."
      },

      {
        id: "mild-cousin-link",
        avatar: "👦",
        displayName: "Cousin Jay",
        username: "@CousinJayBackup",
        verified: false,
        accountAge: "Yesterday",
        followers: "5",
        mutuals: "1",
        message:
          "Is this you in this video? Click fast before it gets removed.",
        profileDetails:
          "Slightly different username from Jay’s normal account",
        requestDetails:
          "Includes a shortened unfamiliar link",
        verdict: "suspicious",
        explanation:
          "This may be a hacked or copied account. Do not open the link; contact Jay through a trusted method first."
      }
    ],

    spicy: [
      {
        id: "spicy-teacher-copy",
        avatar: "👩‍🏫",
        displayName: "Ms. Robinson",
        username: "@MsRoblnson",
        verified: false,
        accountAge: "3 days",
        followers: "19",
        mutuals: "2",
        message:
          "I need your student login and password to correct your grade.",
        profileDetails:
          "The username uses a lowercase L instead of the letter i",
        requestDetails:
          "Requests school login credentials",
        verdict: "impostor",
        explanation:
          "Teachers should not request passwords. The misspelled username and credential request show this is an impostor."
      },

      {
        id: "spicy-friend-hacked",
        avatar: "🛹",
        displayName: "Noah",
        username: "@NoahSkates",
        verified: false,
        accountAge: "2 years",
        followers: "340",
        mutuals: "23",
        message:
          "I am trapped and need you to buy three gift cards. Do not call me.",
        profileDetails:
          "Real-looking established account",
        requestDetails:
          "Unusual money request and asks the recipient not to verify",
        verdict: "suspicious",
        explanation:
          "The account may be Noah’s real account but could be hacked. The message behavior is suspicious, so contact Noah another way."
      },

      {
        id: "spicy-brand-support",
        avatar: "🎮",
        displayName: "Galaxy Builders Support",
        username: "@GalaxyBuildersHelp",
        verified: true,
        accountAge: "5 years",
        followers: "182K",
        mutuals: "0",
        message:
          "We received your support request. Continue through the help ticket you opened.",
        profileDetails:
          "Verified account linked from the official game website",
        requestDetails:
          "Does not request passwords or verification codes",
        verdict: "real",
        explanation:
          "The verified account, official link, established history, and connection to a support request the player initiated support authenticity."
      },

      {
        id: "spicy-team-manager",
        avatar: "⚽",
        displayName: "Lakeside Team Manager",
        username: "@LakesideTeamMgr",
        verified: false,
        accountAge: "18 months",
        followers: "164",
        mutuals: "26",
        message:
          "The bus leaves at 7:30. Confirm through the team app.",
        profileDetails:
          "Recognized by players and linked to the official team page",
        requestDetails:
          "Uses the normal team application",
        verdict: "real",
        explanation:
          "Known mutual connections, an established history, and use of the normal team app make the message likely real."
      },

      {
        id: "spicy-charity-copy",
        avatar: "❤️",
        displayName: "Helping Hands Charity",
        username: "@HelpingHandCharity",
        verified: false,
        accountAge: "1 week",
        followers: "41",
        mutuals: "0",
        message:
          "Donate in the next ten minutes or your account will be reported.",
        profileDetails:
          "Name resembles a real charity but one letter is missing",
        requestDetails:
          "Uses threats and an unfamiliar payment page",
        verdict: "impostor",
        explanation:
          "The copied name, threat, deadline, and strange payment request show that this is pretending to be a charity."
      },

      {
        id: "spicy-principal",
        avatar: "🏫",
        displayName: "Principal Lewis",
        username: "@PrincipalLewisOfficial",
        verified: false,
        accountAge: "1 day",
        followers: "8",
        mutuals: "0",
        message:
          "Send me a photo of your student ID immediately.",
        profileDetails:
          "No connection to the school’s official account",
        requestDetails:
          "Requests an identification document through direct message",
        verdict: "impostor",
        explanation:
          "A principal would use official school systems, not a brand-new unconnected account requesting an ID photograph."
      },

      {
        id: "spicy-sibling",
        avatar: "👧",
        displayName: "Ava",
        username: "@AvaDanceStars",
        verified: false,
        accountAge: "3 years",
        followers: "560",
        mutuals: "32",
        message:
          "Can you send me the homework photo from today?",
        profileDetails:
          "Normal account with familiar posts and shared friends",
        requestDetails:
          "Ordinary request with no secret or sensitive information",
        verdict: "real",
        explanation:
          "The established account, familiar history, mutual friends, and ordinary request make it likely real."
      },

      {
        id: "spicy-contest",
        avatar: "🏆",
        displayName: "Youth Robotics Awards",
        username: "@YouthRobotlcsAwards",
        verified: false,
        accountAge: "2 days",
        followers: "14",
        mutuals: "0",
        message:
          "You won! Pay a $75 processing fee before midnight.",
        profileDetails:
          "Uses a lowercase L in place of the letter i",
        requestDetails:
          "Requests urgent payment for an unexpected prize",
        verdict: "impostor",
        explanation:
          "The misspelled account, unexpected prize, deadline, and processing fee are classic impersonation and prize-scam clues."
      }
    ],

    hot: [
      {
        id: "hot-real-account-hacked",
        avatar: "🤖",
        displayName: "Cam Builds Bots",
        username: "@CamBuildsBots",
        verified: false,
        accountAge: "4 years",
        followers: "2,310",
        mutuals: "27",
        message:
          "Vote for me by logging in through this page. Send me the code afterward.",
        profileDetails:
          "The account history is real, but the message is unlike Cam",
        requestDetails:
          "External login page and verification-code request",
        verdict: "suspicious",
        explanation:
          "A real account can be hacked. The account may belong to Cam, but the strange login and code request require verification elsewhere."
      },

      {
        id: "hot-bank-copy",
        avatar: "🏦",
        displayName: "Metro Community Bank",
        username: "@MetroCommunityBank_Security",
        verified: false,
        accountAge: "6 hours",
        followers: "9",
        mutuals: "0",
        message:
          "Your family account will close in 15 minutes. Confirm the PIN now.",
        profileDetails:
          "Professional logo copied from the real bank",
        requestDetails:
          "Requests a bank PIN through direct message",
        verdict: "impostor",
        explanation:
          "Banks do not request PINs through social media. The copied logo, new account, threat, and deadline reveal the impersonation."
      },

      {
        id: "hot-counselor-real",
        avatar: "🧑‍💼",
        displayName: "Renaissance Counseling Office",
        username: "@RenaissanceCounseling",
        verified: true,
        accountAge: "7 years",
        followers: "3,204",
        mutuals: "44",
        message:
          "Appointments are available through the secure student portal.",
        profileDetails:
          "Linked from the school website and follows district policy",
        requestDetails:
          "Directs students to the normal secure portal",
        verdict: "real",
        explanation:
          "The official verification, long history, school link, and secure known portal make this account likely authentic."
      },

      {
        id: "hot-parent-deepfake",
        avatar: "👨",
        displayName: "Dad",
        username: "@DadEmergencyNewPhone",
        verified: false,
        accountAge: "20 minutes",
        followers: "0",
        mutuals: "0",
        message:
          "Listen to this voice message. I need money now, and you cannot tell Mom.",
        profileDetails:
          "The voice resembles Dad but the account is unknown",
        requestDetails:
          "Requests secrecy and emergency payment",
        verdict: "impostor",
        explanation:
          "Voices can be copied with AI. The new account, secrecy, and urgent money request require verification through a known number."
      },

      {
        id: "hot-influencer-manager",
        avatar: "📸",
        displayName: "Star Talent Management",
        username: "@StarTalentManagement",
        verified: false,
        accountAge: "2 years",
        followers: "21K",
        mutuals: "1",
        message:
          "We can make you famous. Send private photos and your home address.",
        profileDetails:
          "Large follower count but copied posts and disabled comments",
        requestDetails:
          "Requests private images and home location",
        verdict: "impostor",
        explanation:
          "Follower counts can be purchased. Legitimate agencies do not request private photos and home addresses from children through direct messages."
      },

      {
        id: "hot-friend-cloned",
        avatar: "🎨",
        displayName: "Maya",
        username: "@MayaArtist_",
        verified: false,
        accountAge: "1 month",
        followers: "88",
        mutuals: "14",
        message:
          "What was the name of your first pet? I forgot.",
        profileDetails:
          "Copies Maya’s photos, but her real username has no underscore",
        requestDetails:
          "Requests an answer often used for account recovery",
        verdict: "impostor",
        explanation:
          "The nearly identical username and security-question request indicate a cloned account."
      },

      {
        id: "hot-support-real-looking",
        avatar: "💻",
        displayName: "Safetii Net Support",
        username: "@SafetiiNetSupport",
        verified: false,
        accountAge: "3 years",
        followers: "5,900",
        mutuals: "0",
        message:
          "We detected a problem. Install this remote-control program so we can inspect your computer.",
        profileDetails:
          "Looks polished but is not linked from the official site",
        requestDetails:
          "Requests remote access to the device",
        verdict: "suspicious",
        explanation:
          "Professional appearance is not proof. Remote-access requests are dangerous and must be verified through the official website or a trusted adult."
      },

      {
        id: "hot-event-organizer",
        avatar: "🎟️",
        displayName: "City STEM Expo",
        username: "@CitySTEMExpo",
        verified: true,
        accountAge: "8 years",
        followers: "31K",
        mutuals: "17",
        message:
          "Schedule updates are posted on our official registration page.",
        profileDetails:
          "Verified and linked from the city government website",
        requestDetails:
          "No passwords, codes, private photos, or payment requested",
        verdict: "real",
        explanation:
          "Verification, official government linking, account history, and normal event communication support that this is authentic."
      }
    ]
  };

  let selectedHeat =
    "mild";

  let activeCases =
    [];

  let currentCaseIndex =
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

  function getCurrentCase() {
    return activeCases[
      currentCaseIndex
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
    byId("impostorHintPanel")
      ?.classList.add(
        "hidden"
      );

    byId("openImpostorHint")
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

  byId("openImpostorHint")
    ?.addEventListener(
      "click",
      () => {
        const panel =
          byId("impostorHintPanel");

        const isOpening =
          panel?.classList.contains(
            "hidden"
          );

        panel?.classList.toggle(
          "hidden"
        );

        byId("openImpostorHint")
          ?.setAttribute(
            "aria-expanded",
            isOpening
              ? "true"
              : "false"
          );
      }
    );

  byId("closeImpostorHint")
    ?.addEventListener(
      "click",
      closeHint
    );

  /* =====================================================
     START GAME
  ===================================================== */

  function startGame() {
    try {
      activeCases =
        casesByHeat[
          selectedHeat
        ] ||
        casesByHeat.mild;

      currentCaseIndex =
        0;

      correctAnswers =
        0;

      answerLocked =
        false;

      arcade.startRound({
        gameId:
          `impostor-alert-${selectedHeat}`,

        gameName:
          `Impostor Alert ${
            heatNames[selectedHeat]
          }`,

        heatLevel:
          selectedHeat,

        questionCount:
          activeCases.length
      });

      setText(
        "questionTotal",
        activeCases.length
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

      loadCase();
    } catch (error) {
      console.error(
        "Impostor Alert could not start:",
        error
      );

      alert(
        `Impostor Alert could not start: ${error.message}`
      );
    }
  }

  const startButton =
    byId("startGame");

  if (startButton) {
    startButton.dataset
      .impostorAlertConnected =
      "true";

    startButton.addEventListener(
      "click",
      startGame
    );
  } else {
    console.error(
      "Impostor Alert start button was not found."
    );
  }

  /* =====================================================
     LOAD CASE
  ===================================================== */

  function loadCase() {
    const currentCase =
      getCurrentCase();

    if (!currentCase) {
      finishGame();
      return;
    }

    answerLocked =
      false;

    closeHint();
    hideReaction();

    setText(
      "questionNumber",
      currentCaseIndex + 1
    );

    setText(
      "profileAvatar",
      currentCase.avatar
    );

    setText(
      "displayName",
      currentCase.displayName
    );

    setText(
      "username",
      currentCase.username
    );

    setText(
      "accountAge",
      currentCase.accountAge
    );

    setText(
      "followerCount",
      currentCase.followers
    );

    setText(
      "mutualCount",
      currentCase.mutuals
    );

    setText(
      "messageText",
      `“${currentCase.message}”`
    );

    setText(
      "profileDetails",
      currentCase.profileDetails
    );

    setText(
      "requestDetails",
      currentCase.requestDetails
    );

    byId("verificationBadge")
      ?.classList.toggle(
        "hidden",
        !currentCase.verified
      );

    const progress =
      (
        currentCaseIndex /
        activeCases.length
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
        ".impostor-answer-choice"
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

  function answerCase(button) {
    if (answerLocked) {
      return;
    }

    const currentCase =
      getCurrentCase();

    if (!currentCase) {
      return;
    }

    answerLocked =
      true;

    const selectedVerdict =
      button.dataset.verdict;

    const correct =
      selectedVerdict ===
      currentCase.verdict;

    const scoreResult =
      arcade.answerQuestion({
        questionId:
          currentCase.id,

        correct
      });

    if (correct) {
      correctAnswers += 1;
    }

    document
      .querySelectorAll(
        ".impostor-answer-choice"
      )
      .forEach(
        (answerButton) => {
          answerButton.disabled =
            true;

          const verdict =
            answerButton.dataset.verdict;

          if (
            verdict ===
            currentCase.verdict
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
        "Case solved!"
      );

      setText(
        "feedbackText",
        `${verdictNames[
          currentCase.verdict
        ]} is correct. ${currentCase.explanation}`
      );
    } else {
      setText(
        "feedbackTitle",
        "Review the evidence."
      );

      setText(
        "feedbackText",
        `The best verdict is ${
          verdictNames[
            currentCase.verdict
          ]
        }. ${currentCase.explanation}`
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
        currentCaseIndex ===
        activeCases.length - 1
          ? "See Results"
          : "Next Case";

      nextButton.classList.remove(
        "hidden"
      );
    }

    showReaction({
      correct,
      points:
        scoreResult.pointsEarned,
      correctVerdict:
        verdictNames[
          currentCase.verdict
        ]
    });

    updateLiveStats();
  }

  document
    .querySelectorAll(
      ".impostor-answer-choice"
    )
    .forEach((button) => {
      button.addEventListener(
        "click",
        () => {
          answerCase(button);
        }
      );
    });

  /* =====================================================
     MEME REACTION
  ===================================================== */

  function showReaction({
    correct,
    points,
    correctVerdict
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
        "Meme celebrates a solved impostor case";

      setText(
        "memeReactionTitle",
        "Excellent detective work!"
      );

      setText(
        "memeReactionMessage",
        `You earned ${points} points.`
      );
    } else {
      image.src =
        "../../assets/mascot/wrong.png";

      image.alt =
        "Meme encourages the player to review the account";

      setText(
        "memeReactionTitle",
        "Look at every clue."
      );

      setText(
        "memeReactionMessage",
        `The best verdict is ${correctVerdict}.`
      );
    }
  }

  /* =====================================================
     NEXT CASE
  ===================================================== */

  function nextCase() {
    if (!answerLocked) {
      return;
    }

    currentCaseIndex += 1;

    if (
      currentCaseIndex >=
      activeCases.length
    ) {
      finishGame();
      return;
    }

    loadCase();
  }

  byId("nextQuestion")
    ?.addEventListener(
      "click",
      nextCase
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
      `${correctAnswers}/${activeCases.length}`
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
      starsToText(result.stars)
    );

    let message =
      "Keep checking usernames, account history, message behavior, links, and requests.";

    if (
      result.accuracy === 100
    ) {
      message =
        "Perfect investigation! You identified every real account, suspicious account, and impostor.";
    } else if (
      result.accuracy >= 75
    ) {
      message =
        "Excellent detective work! You noticed most of the important account and message clues.";
    } else if (
      result.accuracy >= 50
    ) {
      message =
        "Good effort. Remember that even a real account can be hacked, so unusual behavior should always be verified.";
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
    "Impostor Alert loaded successfully."
  );
})();
