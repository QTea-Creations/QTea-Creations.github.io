
"use strict";

/* =========================================================
   SAFETII NET — CYBER ARCADE
   TRUST CIRCLE
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

  const audienceNames = {
    anyone: "Anyone Online",
    friends: "Friends I Know",
    adults: "Trusted Adults",
    private: "Keep It Private"
  };

  /* =====================================================
     QUESTION BANKS
  ===================================================== */

  const situationsByHeat = {
    mild: [
      {
        id: "mild-drawing",
        avatar: "🎨",
        name: "Maya",
        context:
          "Maya wants to post something on her art page.",
        information:
          "I love drawing cartoon animals.",
        correctAudience:
          "anyone",
        explanation:
          "A broad hobby does not reveal Maya’s address, school, schedule, age, or account information."
      },

      {
        id: "mild-password",
        avatar: "🎮",
        name: "Jordan",
        context:
          "Jordan’s friend asks for help logging into a game.",
        information:
          "My game password is DragonHero42.",
        correctAudience:
          "private",
        explanation:
          "Passwords must stay secret. Jordan should never share a password with friends, strangers, or people claiming they can help."
      },

      {
        id: "mild-threat",
        avatar: "😟",
        name: "Ari",
        context:
          "Someone online has sent Ari a frightening message.",
        information:
          "A person online said they are going to hurt me.",
        correctAudience:
          "adults",
        explanation:
          "Threats should be shown to a trusted adult immediately. Ari should save the message, block the person, and get help."
      },

      {
        id: "mild-movie",
        avatar: "🍿",
        name: "Lena",
        context:
          "Lena is chatting with friends she knows from school.",
        information:
          "That movie made me cry at the end.",
        correctAudience:
          "friends",
        explanation:
          "A personal feeling about a movie can be shared with real friends Lena knows and trusts."
      },

      {
        id: "mild-address",
        avatar: "🏠",
        name: "Noah",
        context:
          "A player in an online game asks where Noah lives.",
        information:
          "My home address is 1842 River Street.",
        correctAudience:
          "private",
        explanation:
          "A home address can identify Noah’s exact location and should never be shared publicly or with online strangers."
      },

      {
        id: "mild-science",
        avatar: "🔬",
        name: "Zuri",
        context:
          "Zuri wants to update a public profile.",
        information:
          "Science is my favorite subject.",
        correctAudience:
          "anyone",
        explanation:
          "A favorite school subject is broad self-expression and does not identify where Zuri goes to school."
      },

      {
        id: "mild-bullying",
        avatar: "📱",
        name: "Eli",
        context:
          "Students have created an embarrassing group chat about Eli.",
        information:
          "People at school keep posting mean pictures of me.",
        correctAudience:
          "adults",
        explanation:
          "Repeated online bullying requires help from a trusted adult who can document, report, and stop the behavior."
      },

      {
        id: "mild-test",
        avatar: "📚",
        name: "Cam",
        context:
          "Cam is talking privately with a close real-life friend.",
        information:
          "I’m worried that I failed today’s math test.",
        correctAudience:
          "friends",
        explanation:
          "A personal feeling can be shared with a trusted real-life friend, provided Cam is comfortable discussing it."
      }
    ],

    spicy: [
      {
        id: "spicy-team-photo",
        avatar: "⚽",
        name: "Rosa",
        context:
          "Rosa wants to send a funny team photo to classmates she knows.",
        information:
          "Here is the silly photo our team took after practice.",
        correctAudience:
          "friends",
        explanation:
          "A team photo may include other children, so it should not automatically be posted publicly. Rosa should also get permission from everyone shown."
      },

      {
        id: "spicy-verification",
        avatar: "🔐",
        name: "Malik",
        context:
          "Someone claiming to be technical support requests a code.",
        information:
          "The six-digit verification code is 482991.",
        correctAudience:
          "private",
        explanation:
          "Verification codes provide access to accounts. Real support workers should not ask Malik to send one through a message."
      },

      {
        id: "spicy-online-friend",
        avatar: "🎧",
        name: "Kiara",
        context:
          "A person Kiara met in a public game asks about her school.",
        information:
          "I attend East Ridge Academy.",
        correctAudience:
          "private",
        explanation:
          "An online-only acquaintance is still a stranger. Kiara’s school could reveal where she can regularly be found."
      },

      {
        id: "spicy-coach-message",
        avatar: "🏀",
        name: "Ben",
        context:
          "Ben receives a confusing private message from someone claiming to be his coach.",
        information:
          "This account says my coach needs me to meet alone after practice.",
        correctAudience:
          "adults",
        explanation:
          "Ben should show the message to a parent, guardian, or another trusted adult before responding or going anywhere."
      },

      {
        id: "spicy-group-chat",
        avatar: "😂",
        name: "Ava",
        context:
          "Ava is messaging a small group of real friends.",
        information:
          "I cannot stop laughing about what happened in lunch today.",
        correctAudience:
          "friends",
        explanation:
          "This is a normal social message for real friends, as long as Ava is not embarrassing or exposing another person."
      },

      {
        id: "spicy-live-location",
        avatar: "📍",
        name: "Dev",
        context:
          "Dev wants everyone following his profile to know where he is.",
        information:
          "My live location is turned on for the next eight hours.",
        correctAudience:
          "private",
        explanation:
          "A live location reveals Dev’s movements in real time and should not be shared with a public audience."
      },

      {
        id: "spicy-book",
        avatar: "📖",
        name: "Nia",
        context:
          "Nia wants to post a recommendation on a public reading page.",
        information:
          "My favorite book this year is The Secret Garden.",
        correctAudience:
          "anyone",
        explanation:
          "A favorite book is harmless self-expression and does not directly identify or locate Nia."
      },

      {
        id: "spicy-blackmail",
        avatar: "🚨",
        name: "Omar",
        context:
          "A stranger threatens to publish an embarrassing photo unless Omar sends money.",
        information:
          "Someone says they will post my photo unless I pay them.",
        correctAudience:
          "adults",
        explanation:
          "Omar should not pay or negotiate. He should save the evidence, stop responding, and get help from a trusted adult."
      }
    ],

    hot: [
      {
        id: "hot-event-combination",
        avatar: "🏐",
        name: "Tori",
        context:
          "Tori wants to post several details about an upcoming tournament.",
        information:
          "I am number 14 for Lakeside Lightning, and we play at Harbor Arena Saturday at 9:00.",
        correctAudience:
          "private",
        explanation:
          "The team name, jersey number, location, date, and time combine to reveal exactly where Tori will be."
      },

      {
        id: "hot-recovery-answer",
        avatar: "🐶",
        name: "Sam",
        context:
          "A friend asks about the security questions on Sam’s account.",
        information:
          "My account recovery answer is the name of my first dog, Buster.",
        correctAudience:
          "private",
        explanation:
          "Security-question answers can be used to reset passwords and take over accounts."
      },

      {
        id: "hot-secret-meeting",
        avatar: "🕵️",
        name: "Cam",
        context:
          "An online creator promises Cam a prize but tells Cam not to tell anyone.",
        information:
          "They want me to meet them alone and keep it secret from my parents.",
        correctAudience:
          "adults",
        explanation:
          "Requests for secrecy and private meetings are major warning signs. Cam must tell a trusted adult and should not attend."
      },

      {
        id: "hot-friend-crisis",
        avatar: "💬",
        name: "Zuri",
        context:
          "A close friend sends Zuri a message saying they may harm themselves.",
        information:
          "My friend told me they do not feel safe and begged me not to tell.",
        correctAudience:
          "adults",
        explanation:
          "Safety is more important than keeping this secret. Zuri should tell a trusted adult immediately."
      },

      {
        id: "hot-public-achievement",
        avatar: "🏆",
        name: "Ari",
        context:
          "Ari wants to celebrate without sharing identifying details.",
        information:
          "I am proud that my team won first place!",
        correctAudience:
          "anyone",
        explanation:
          "The statement celebrates an achievement without naming the school, team, event, location, date, or individual players."
      },

      {
        id: "hot-private-photo",
        avatar: "📸",
        name: "Lena",
        context:
          "A close friend sends Lena a private and embarrassing photo of another student.",
        information:
          "Should I forward this picture to the rest of our friend group?",
        correctAudience:
          "adults",
        explanation:
          "Lena should not forward the image. A trusted adult can help if the photo is harmful, humiliating, threatening, or inappropriate."
      },

      {
        id: "hot-travel-plan",
        avatar: "✈️",
        name: "Eli",
        context:
          "Eli wants to announce a family trip on a public account.",
        information:
          "We leave Friday night and our house will be empty for two weeks.",
        correctAudience:
          "private",
        explanation:
          "The post reveals exactly when the home will be unoccupied, creating a serious security risk."
      },

      {
        id: "hot-teacher-project",
        avatar: "🤖",
        name: "Maya",
        context:
          "Maya needs help from her teacher with a school robotics project.",
        information:
          "The robot keeps failing, and I need help understanding the wiring diagram.",
        correctAudience:
          "adults",
        explanation:
          "A teacher is an appropriate trusted adult for schoolwork help. The message does not need to be posted publicly."
      }
    ]
  };

  let selectedHeat =
    "mild";

  let activeSituations =
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
    byId("trustHintPanel")
      ?.classList.add(
        "hidden"
      );

    byId("openTrustHint")
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

  function getCurrentSituation() {
    return activeSituations[
      currentQuestionIndex
    ];
  }

  /* =====================================================
     HEAT SELECTION
  ===================================================== */

  document
    .querySelectorAll(
      ".heat-choice"
    )
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

  byId("openTrustHint")
    ?.addEventListener(
      "click",
      () => {
        const panel =
          byId("trustHintPanel");

        const isOpening =
          panel?.classList.contains(
            "hidden"
          );

        panel?.classList.toggle(
          "hidden"
        );

        byId("openTrustHint")
          ?.setAttribute(
            "aria-expanded",
            isOpening
              ? "true"
              : "false"
          );
      }
    );

  byId("closeTrustHint")
    ?.addEventListener(
      "click",
      closeHint
    );

  /* =====================================================
     START GAME
  ===================================================== */

  function startGame() {
    try {
      activeSituations =
        situationsByHeat[
          selectedHeat
        ] ||
        situationsByHeat.mild;

      currentQuestionIndex =
        0;

      correctAnswers =
        0;

      answerLocked =
        false;

      arcade.startRound({
        gameId:
          `trust-circle-${selectedHeat}`,

        gameName:
          `Trust Circle ${
            heatNames[selectedHeat]
          }`,

        heatLevel:
          selectedHeat,

        questionCount:
          activeSituations.length
      });

      setText(
        "questionTotal",
        activeSituations.length
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

      loadQuestion();
    } catch (error) {
      console.error(
        "Trust Circle could not start:",
        error
      );

      alert(
        `Trust Circle could not start: ${error.message}`
      );
    }
  }

  const startButton =
    byId("startGame");

  if (startButton) {
    startButton.dataset
      .trustCircleConnected =
      "true";

    startButton.addEventListener(
      "click",
      startGame
    );
  } else {
    console.error(
      "Trust Circle start button was not found."
    );
  }

  /* =====================================================
     LOAD QUESTION
  ===================================================== */

  function loadQuestion() {
    const situation =
      getCurrentSituation();

    if (!situation) {
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
      "characterAvatar",
      situation.avatar
    );

    setText(
      "characterName",
      `${situation.name} needs your help.`
    );

    setText(
      "situationContext",
      situation.context
    );

    setText(
      "informationText",
      `“${situation.information}”`
    );

    const progress =
      (
        currentQuestionIndex /
        activeSituations.length
      ) * 100;

    const progressFill =
      byId(
        "questionProgressFill"
      );

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
        ".trust-audience-choice"
      )
      .forEach((button) => {
        button.disabled =
          false;

        button.classList.remove(
          "selected-answer",
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

    const situation =
      getCurrentSituation();

    if (!situation) {
      return;
    }

    answerLocked =
      true;

    const selectedAudience =
      button.dataset.audience;

    const correct =
      selectedAudience ===
      situation.correctAudience;

    const scoreResult =
      arcade.answerQuestion({
        questionId:
          situation.id,

        correct
      });

    if (correct) {
      correctAnswers += 1;
    }

    document
      .querySelectorAll(
        ".trust-audience-choice"
      )
      .forEach(
        (answerButton) => {
          answerButton.disabled =
            true;

          const audience =
            answerButton.dataset.audience;

          if (
            audience ===
            situation.correctAudience
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
        "Great decision!"
      );

      setText(
        "feedbackText",
        `${audienceNames[
          situation.correctAudience
        ]} is the safest choice. ${situation.explanation}`
      );
    } else {
      setText(
        "feedbackTitle",
        "Not quite—review the safest audience."
      );

      setText(
        "feedbackText",
        `The safest choice is ${
          audienceNames[
            situation.correctAudience
          ]
        }. ${situation.explanation}`
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
        activeSituations.length - 1
          ? "See Results"
          : "Next Situation";

      nextButton.classList.remove(
        "hidden"
      );
    }

    showReaction({
      correct,
      points:
        scoreResult.pointsEarned,
      correctAudience:
        audienceNames[
          situation.correctAudience
        ]
    });

    updateLiveStats();
  }

  document
    .querySelectorAll(
      ".trust-audience-choice"
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
    correctAudience
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

      setText(
        "memeReactionTitle",
        "Trust protected!"
      );

      setText(
        "memeReactionMessage",
        `Excellent choice! You earned ${points} points.`
      );
    } else {
      image.src =
        "../../assets/mascot/wrong.png";

      setText(
        "memeReactionTitle",
        "Think about who truly needs to know."
      );

      setText(
        "memeReactionMessage",
        `The safest audience is ${correctAudience}.`
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
      activeSituations.length
    ) {
      finishGame();
      return;
    }

    loadQuestion();
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
      `${correctAnswers}/${activeSituations.length}`
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
      "Keep practicing who should receive different kinds of information.";

    if (
      result.accuracy === 100
    ) {
      message =
        "Perfect Trust Circle! You protected every situation and chose the safest audience each time.";
    } else if (
      result.accuracy >= 75
    ) {
      message =
        "Excellent work! You understand the difference between public sharing, trusted friends, adult help, and private information.";
    } else if (
      result.accuracy >= 50
    ) {
      message =
        "Good effort. Remember that passwords and locations stay private, while dangerous situations should be shared with a trusted adult.";
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
    "Trust Circle arcade game loaded successfully."
  );
})();
