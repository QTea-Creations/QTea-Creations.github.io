"use strict";

/* =========================================================
   SAFETII NET — CYBER ARCADE
   BACKPACK RESCUE

   Backpack = usually okay to share
   Safe = protect this information
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

  const destinationNames = {
    safe: "Backpack Share Zone",
    private: "Safe Protect Zone"
  };

  /* =====================================================
     ARCADE-ONLY QUESTION BANKS
  ===================================================== */

  const itemsByHeat = {
    mild: [
      {
        id: "mild-favorite-animal",
        text:
          "My favorite animal is a dolphin.",
        context:
          "This is a broad personal preference.",
        answer:
          "safe",
        explanation:
          "A favorite animal is harmless self-expression and does not identify or locate someone."
      },

      {
        id: "mild-home-address",
        text:
          "My home address is 1842 River Street.",
        context:
          "This reveals an exact physical location.",
        answer:
          "private",
        explanation:
          "A home address can tell strangers exactly where someone lives and belongs in the safe."
      },

      {
        id: "mild-favorite-color",
        text:
          "Purple is my favorite color.",
        context:
          "This is a broad preference.",
        answer:
          "safe",
        explanation:
          "A favorite color is usually safe because it does not reveal someone’s identity or location."
      },

      {
        id: "mild-password",
        text:
          "My game password is DragonHero42.",
        context:
          "This can provide access to an account.",
        answer:
          "private",
        explanation:
          "Passwords should never be shared. They belong in the Safe Protect Zone."
      },

      {
        id: "mild-hobby",
        text:
          "I enjoy drawing comic-book heroes.",
        context:
          "This describes a hobby.",
        answer:
          "safe",
        explanation:
          "A hobby is broad self-expression and is usually okay to share."
      },

      {
        id: "mild-school",
        text:
          "I attend Lakeview Elementary School.",
        context:
          "This reveals where a child regularly goes.",
        answer:
          "private",
        explanation:
          "A school name can reveal where someone can regularly be found."
      },

      {
        id: "mild-favorite-subject",
        text:
          "Science is my favorite subject.",
        context:
          "This describes a broad school preference.",
        answer:
          "safe",
        explanation:
          "A favorite subject is broad self-expression and does not name the actual school."
      },

      {
        id: "mild-phone-number",
        text:
          "My phone number is 313-555-0184.",
        context:
          "This allows strangers to contact someone directly.",
        answer:
          "private",
        explanation:
          "A phone number is identifying contact information and belongs in the safe."
      },

      {
        id: "mild-talent",
        text:
          "I am good at playing the piano.",
        context:
          "This describes a talent.",
        answer:
          "safe",
        explanation:
          "A general talent does not directly identify or locate someone."
      },

      {
        id: "mild-birthday",
        text:
          "My birthday is October 12.",
        context:
          "This reveals personal identity information.",
        answer:
          "private",
        explanation:
          "An exact birthday can help strangers identify someone or guess account information."
      }
    ],

    spicy: [
      {
        id: "spicy-pet-photo",
        text:
          "Here is a picture of my cat sleeping on the couch.",
        context:
          "The picture does not show an address, school, uniform, or location.",
        answer:
          "safe",
        explanation:
          "A pet picture can usually be shared when the background does not reveal identifying information."
      },

      {
        id: "spicy-pet-photo-tagged",
        text:
          "Here is my dog outside 1842 River Street.",
        context:
          "The caption includes a specific street address.",
        answer:
          "private",
        explanation:
          "The pet is harmless, but the exact address makes the full post private."
      },

      {
        id: "spicy-team-interest",
        text:
          "Basketball is my favorite sport.",
        context:
          "This names an interest but not a specific team.",
        answer:
          "safe",
        explanation:
          "A favorite sport is a broad preference and is usually safe to share."
      },

      {
        id: "spicy-team-number",
        text:
          "I play number 14 for the Lakeside Lightning.",
        context:
          "The team name and jersey number may identify a specific player.",
        answer:
          "private",
        explanation:
          "A team name combined with a jersey number can narrow down exactly who the child is."
      },

      {
        id: "spicy-book",
        text:
          "My favorite book is The Secret Garden.",
        context:
          "This describes a reading preference.",
        answer:
          "safe",
        explanation:
          "A favorite book is harmless self-expression."
      },

      {
        id: "spicy-grade",
        text:
          "I am in fifth grade.",
        context:
          "This reveals an approximate age range.",
        answer:
          "private",
        explanation:
          "A grade level is personal information and should be shared carefully rather than publicly."
      },

      {
        id: "spicy-vacation-memory",
        text:
          "I had fun visiting the beach last summer.",
        context:
          "This describes a past event with no current location.",
        answer:
          "safe",
        explanation:
          "A general past vacation memory does not reveal where the person is now."
      },

      {
        id: "spicy-vacation-live",
        text:
          "We are at Harbor Hotel right now in room 314.",
        context:
          "This reveals a current and precise location.",
        answer:
          "private",
        explanation:
          "A hotel name and room number reveal exactly where someone is staying."
      },

      {
        id: "spicy-nickname",
        text:
          "My friends call me StarFox.",
        context:
          "This is a creative nickname unrelated to a real name.",
        answer:
          "safe",
        explanation:
          "A creative nickname can help protect a real identity."
      },

      {
        id: "spicy-full-name",
        text:
          "My full name is Jordan Alexander Thompson.",
        context:
          "This reveals a complete legal name.",
        answer:
          "private",
        explanation:
          "A full name can make it easier to identify and research someone."
      }
    ],

    hot: [
      {
        id: "hot-art-post",
        text:
          "I finished a painting of a purple dragon!",
        context:
          "The statement shares creativity but no identity details.",
        answer:
          "safe",
        explanation:
          "Sharing artwork or a creative achievement is usually safe when no identifying details are included."
      },

      {
        id: "hot-art-location",
        text:
          "Come see my purple dragon painting at East Ridge School, Room 204, tomorrow at 4:00.",
        context:
          "The post combines a school, room number, date, and time.",
        answer:
          "private",
        explanation:
          "Several details combine to reveal exactly where and when the child can be found."
      },

      {
        id: "hot-achievement",
        text:
          "My team won first place!",
        context:
          "The statement does not name the team, event, location, or date.",
        answer:
          "safe",
        explanation:
          "A general achievement can be celebrated without exposing identifying information."
      },

      {
        id: "hot-achievement-details",
        text:
          "Renaissance Robotics Team 72264 won at Central High today.",
        context:
          "The team, school, event location, and current date are revealed.",
        answer:
          "private",
        explanation:
          "The combined details can identify the group, school, and recent location."
      },

      {
        id: "hot-weekend-hobby",
        text:
          "I like riding my bike on weekends.",
        context:
          "This is a broad hobby without a route or schedule.",
        answer:
          "safe",
        explanation:
          "A general hobby is usually safe when it does not include a precise routine."
      },

      {
        id: "hot-bike-routine",
        text:
          "Every Saturday at 9:00, I ride alone from my house to Oak Park.",
        context:
          "This reveals a repeating schedule and route.",
        answer:
          "private",
        explanation:
          "A predictable time and route can allow someone to locate or follow the child."
      },

      {
        id: "hot-general-food",
        text:
          "Pizza is my favorite food.",
        context:
          "This is a broad preference.",
        answer:
          "safe",
        explanation:
          "A favorite food does not identify or locate someone."
      },

      {
        id: "hot-lunch-location",
        text:
          "I eat lunch every weekday at 12:15 beside the west entrance.",
        context:
          "This reveals a repeating daily location and time.",
        answer:
          "private",
        explanation:
          "A regular schedule and precise meeting place should be protected."
      },

      {
        id: "hot-game-preference",
        text:
          "I like building games and puzzle games.",
        context:
          "This describes broad entertainment interests.",
        answer:
          "safe",
        explanation:
          "General game preferences are harmless self-expression."
      },

      {
        id: "hot-security-code",
        text:
          "The code that just came to my phone is 482991.",
        context:
          "This is a one-time account verification code.",
        answer:
          "private",
        explanation:
          "Verification codes can give someone access to an account and must remain secret."
      }
    ]
  };

  let selectedHeat =
    "mild";

  let activeItems =
    [];

  let currentItemIndex =
    0;

  let correctAnswers =
    0;

  let answerLocked =
    false;

  let draggingActive =
    false;

  /* =====================================================
     ELEMENT HELPERS
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
      currentItemIndex
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

  /* =====================================================
     IMAGE HELPERS
  ===================================================== */

  function openContainer(imageId) {
    const image =
      byId(imageId);

    if (!image) {
      return;
    }

    const openSource =
      image.dataset.openSrc;

    if (openSource) {
      image.src =
        openSource;
    }
  }

  function closeContainer(imageId) {
    const image =
      byId(imageId);

    if (!image) {
      return;
    }

    const closedSource =
      image.dataset.closedSrc;

    if (closedSource) {
      image.src =
        closedSource;
    }
  }

  function closeAllContainers() {
    closeContainer(
      "backpackImage"
    );

    closeContainer(
      "safeImage"
    );

    byId("shareZone")
      ?.classList.remove(
        "drag-over"
      );

    byId("protectZone")
      ?.classList.remove(
        "drag-over"
      );
  }

  /* =====================================================
     HINT PANEL
  ===================================================== */

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

  byId("openBackpackHint")
    ?.addEventListener(
      "click",
      () => {
        const panel =
          byId(
            "backpackHintPanel"
          );

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
     START GAME
  ===================================================== */

  function startGame() {
    try {
      activeItems =
        itemsByHeat[
          selectedHeat
        ] ||
        itemsByHeat.mild;

      currentItemIndex =
        0;

      correctAnswers =
        0;

      answerLocked =
        false;

      draggingActive =
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

  function connectStartButton() {
    const startButton =
      byId("startGame");

    if (!startButton) {
      console.error(
        "Backpack Rescue start button #startGame was not found."
      );

      return;
    }

    if (
      startButton.dataset
        .backpackRescueConnected ===
      "true"
    ) {
      return;
    }

    startButton.dataset
      .backpackRescueConnected =
      "true";

    startButton.addEventListener(
      "click",
      startGame
    );

    console.log(
      "Backpack Rescue start button connected."
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

    draggingActive =
      false;

    closeHint();
    closeAllContainers();
    hideReaction();

    setText(
      "questionNumber",
      currentItemIndex + 1
    );

    setText(
      "sortItemText",
      item.text
    );

    setText(
      "sortItemContext",
      item.context
    );

    const progress =
      (
        currentItemIndex /
        activeItems.length
      ) * 100;

    const progressFill =
      byId(
        "questionProgressFill"
      );

    if (progressFill) {
      progressFill.style.width =
        `${progress}%`;
    }

    const dragCard =
      byId("dragItemCard");

    if (dragCard) {
      dragCard.draggable =
        true;

      dragCard.setAttribute(
        "aria-disabled",
        "false"
      );

      dragCard.classList.remove(
        "dragging",
        "sorted-correct",
        "sorted-wrong"
      );
    }

    document
      .querySelectorAll(
        ".backpack-drop-zone"
      )
      .forEach((zone) => {
        zone.disabled =
          false;

        zone.classList.remove(
          "correct-zone",
          "wrong-zone",
          "reveal-correct-zone",
          "drag-over"
        );
      });

    byId("answerFeedback")
      ?.classList.add(
        "hidden"
      );

    byId("nextQuestion")
      ?.classList.add(
        "hidden"
      );

    updateLiveStats();
  }

  /* =====================================================
     DROP-ZONE EVENTS
  ===================================================== */

  function prepareDropZone({
    zone,
    imageId
  }) {
    if (!zone) {
      return;
    }

    zone.addEventListener(
      "dragenter",
      (event) => {
        event.preventDefault();

        if (
          answerLocked ||
          !draggingActive
        ) {
          return;
        }

        zone.classList.add(
          "drag-over"
        );

        openContainer(
          imageId
        );
      }
    );

    zone.addEventListener(
      "dragover",
      (event) => {
        event.preventDefault();

        if (
          answerLocked ||
          !draggingActive
        ) {
          return;
        }

        if (
          event.dataTransfer
        ) {
          event.dataTransfer.dropEffect =
            "move";
        }

        zone.classList.add(
          "drag-over"
        );

        openContainer(
          imageId
        );
      }
    );

    zone.addEventListener(
      "dragleave",
      (event) => {
        const nextTarget =
          event.relatedTarget;

        if (
          nextTarget &&
          zone.contains(
            nextTarget
          )
        ) {
          return;
        }

        zone.classList.remove(
          "drag-over"
        );

        closeContainer(
          imageId
        );
      }
    );

    zone.addEventListener(
      "drop",
      (event) => {
        event.preventDefault();

        const selectedAnswer =
          zone.dataset.answer;

        handleAnswer(
          selectedAnswer,
          zone
        );

        closeAllContainers();
      }
    );

    zone.addEventListener(
      "click",
      () => {
        if (answerLocked) {
          return;
        }

        const selectedAnswer =
          zone.dataset.answer;

        openContainer(
          imageId
        );

        handleAnswer(
          selectedAnswer,
          zone
        );

        window.setTimeout(
          closeAllContainers,
          400
        );
      }
    );
  }

  prepareDropZone({
    zone:
      byId("shareZone"),

    imageId:
      "backpackImage"
  });

  prepareDropZone({
    zone:
      byId("protectZone"),

    imageId:
      "safeImage"
  });

  /* =====================================================
     DRAG CARD EVENTS
  ===================================================== */

  const dragCard =
    byId("dragItemCard");

  dragCard?.addEventListener(
    "dragstart",
    (event) => {
      if (answerLocked) {
        event.preventDefault();
        return;
      }

      draggingActive =
        true;

      dragCard.classList.add(
        "dragging"
      );

      if (
        event.dataTransfer
      ) {
        event.dataTransfer.effectAllowed =
          "move";

        event.dataTransfer.setData(
          "text/plain",
          getCurrentItem()?.id ||
          "backpack-item"
        );
      }
    }
  );

  dragCard?.addEventListener(
    "dragend",
    () => {
      draggingActive =
        false;

      dragCard.classList.remove(
        "dragging"
      );

      closeAllContainers();
    }
  );

  /* =====================================================
     ANSWER HANDLING
  ===================================================== */

  function handleAnswer(
    selectedAnswer,
    selectedZone
  ) {
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

    draggingActive =
      false;

    const correct =
      selectedAnswer ===
      item.answer;

    const scoreResult =
      arcade.answerQuestion({
        questionId:
          item.id,

        correct
      });

    if (correct) {
      correctAnswers += 1;
    }

    const dragItem =
      byId("dragItemCard");

    if (dragItem) {
      dragItem.draggable =
        false;

      dragItem.setAttribute(
        "aria-disabled",
        "true"
      );

      dragItem.classList.add(
        correct
          ? "sorted-correct"
          : "sorted-wrong"
      );
    }

    document
      .querySelectorAll(
        ".backpack-drop-zone"
      )
      .forEach((zone) => {
        zone.disabled =
          true;

        const zoneAnswer =
          zone.dataset.answer;

        if (
          zoneAnswer ===
          item.answer
        ) {
          zone.classList.add(
            correct
              ? "correct-zone"
              : "reveal-correct-zone"
          );
        }

        if (
          zone === selectedZone &&
          !correct
        ) {
          zone.classList.add(
            "wrong-zone"
          );
        }
      });

    if (correct) {
      setText(
        "feedbackTitle",
        "Great sorting!"
      );

      setText(
        "feedbackText",
        `${destinationNames[
          item.answer
        ]} is correct. ${item.explanation}`
      );
    } else {
      setText(
        "feedbackTitle",
        "That belongs somewhere else."
      );

      setText(
        "feedbackText",
        `The correct destination is ${
          destinationNames[
            item.answer
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
        currentItemIndex ===
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
      correctDestination:
        destinationNames[
          item.answer
        ]
    });

    updateLiveStats();
  }

  /* =====================================================
     MEME REACTION
  ===================================================== */

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

  function showReaction({
    correct,
    points,
    correctDestination
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
        "Meme celebrates a correct Backpack Rescue answer";

      setText(
        "memeReactionTitle",
        "Perfect placement!"
      );

      setText(
        "memeReactionMessage",
        `You earned ${points} points.`
      );
    } else {
      image.src =
        "../../assets/mascot/wrong.png";

      image.alt =
        "Meme helps explain the correct Backpack Rescue answer";

      setText(
        "memeReactionTitle",
        "Protect the right details."
      );

      setText(
        "memeReactionMessage",
        `This belongs in the ${correctDestination}.`
      );
    }
  }

  /* =====================================================
     NEXT ITEM
  ===================================================== */

  function nextQuestion() {
    if (!answerLocked) {
      return;
    }

    currentItemIndex += 1;

    if (
      currentItemIndex >=
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

  function starsToText(
    starCount
  ) {
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
    closeHint();
    closeAllContainers();
    hideReaction();

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
      "Keep practicing which information can go in the backpack and which information belongs in the safe.";

    if (
      result.accuracy === 100
    ) {
      message =
        "Perfect rescue! You protected every private detail and correctly recognized every safe piece of self-expression.";
    } else if (
      result.accuracy >= 75
    ) {
      message =
        "Excellent sorting! You understand the difference between safe sharing and information that needs protection.";
    } else if (
      result.accuracy >= 50
    ) {
      message =
        "Good effort. Remember that names, locations, schools, schedules, passwords, and account codes belong in the safe.";
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
        closeAllContainers();
        hideReaction();
        closeHint();

        showScreen(
          "introScreen"
        );
      }
    );

  /* =====================================================
     INITIALIZATION
  ===================================================== */

  if (
    document.readyState ===
    "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      connectStartButton,
      {
        once: true
      }
    );
  } else {
    connectStartButton();
  }

  updateGlobalPoints();

  console.log(
    "Backpack Rescue drag-and-drop game loaded successfully."
  );
})();
