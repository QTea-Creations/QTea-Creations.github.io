"use strict";

/* =========================================================
   SAFETII NET — CYBER ARCADE
   IMPOSTOR ALERT: DIGITAL DETECTIVE EDITION
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

  /* =====================================================
     HEAT SETTINGS
  ===================================================== */

  const heatSettings = {
    mild: {
      label: "Mild",
      difficulty: "Rookie",
      roundSeconds: 105,
      cluePoints: 10,
      caseBonus: 30,
      evidenceNeeded: 3,
      startingBadges: 4,
      wrongClickPenalty: 3,
      casesPerRound: 5
    },

    spicy: {
      label: "Spicy",
      difficulty: "Agent",
      roundSeconds: 85,
      cluePoints: 20,
      caseBonus: 60,
      evidenceNeeded: 4,
      startingBadges: 3,
      wrongClickPenalty: 5,
      casesPerRound: 5
    },

    hot: {
      label: "Hot",
      difficulty: "Elite",
      roundSeconds: 70,
      cluePoints: 30,
      caseBonus: 90,
      evidenceNeeded: 5,
      startingBadges: 3,
      wrongClickPenalty: 7,
      casesPerRound: 5
    }
  };

  /* =====================================================
     CASE FILES

     Every clickable element uses one of these clue IDs:

     profile-url
     avatar
     username
     verification
     handle
     bio
     menu
     account-age
     followers
     following
     posts
     message
     link
     pressure
     mutuals
     joined
     location
  ===================================================== */

  const caseFiles = [
    {
      id: "free-game-credit",
      title: "The Free Credit Giveaway",
      username: "GameMaster_Offical",
      handle: "@free_gem_staff",
      avatar: "🎮",
      verification: "✓",
      profileUrl:
        "gamer-rewardz.example/profile",
      bio:
        "Official reward manager. I give free game credits to lucky players.",
      accountAge: "1 day",
      followers: "2",
      following: "984",
      posts: "0",
      messageSender:
        "GameMaster_Offical",
      message:
        "Congratulations! You won 10,000 free game credits. Send me the six-digit code that just appeared on your phone.",
      link:
        "free-gemz-now.example/claim",
      pressure:
        "Hurry! Your prize disappears in five minutes!",
      mutuals:
        "No mutual friends",
      joined:
        "Joined today",
      location:
        "Location hidden",
      clues: {
        "profile-url": {
          label: "Look-alike website",
          explanation:
            "The website is not the real game company’s official domain."
        },

        username: {
          label: "Misspelled username",
          explanation:
            "The word “Official” is misspelled as “Offical,” which is a common impersonation trick."
        },

        verification: {
          label: "Fake verification badge",
          explanation:
            "A symbol typed into a profile does not prove that the account is verified."
        },

        "account-age": {
          label: "Brand-new account",
          explanation:
            "The account was created only one day ago."
        },

        followers: {
          label: "Almost no followers",
          explanation:
            "An official reward account would probably have more than two followers."
        },

        following: {
          label: "Suspicious following count",
          explanation:
            "The account follows hundreds of people while almost nobody follows it."
        },

        posts: {
          label: "No public history",
          explanation:
            "The supposed official account has no posts or public activity."
        },

        message: {
          label: "Requests a private code",
          explanation:
            "Real companies should not ask for a verification code sent to your phone."
        },

        link: {
          label: "Suspicious prize link",
          explanation:
            "The strange link is designed to look exciting but does not belong to the real company."
        },

        pressure: {
          label: "Urgent pressure",
          explanation:
            "Scammers create urgency so people act before checking the facts."
        },

        mutuals: {
          label: "No shared connections",
          explanation:
            "There are no trusted mutual friends connecting this account to the player."
        },

        joined: {
          label: "Joined today",
          explanation:
            "A brand-new profile claiming to be an official company account is suspicious."
        }
      }
    },

    {
      id: "fake-friend",
      title: "The New Friend Account",
      username: "Maya_J_Backup2",
      handle: "@maya_new_private",
      avatar: "👧🏽",
      verification: "",
      profileUrl:
        "social.example/maya_new_private",
      bio:
        "My old account got hacked. Add this one instead.",
      accountAge: "3 hours",
      followers: "4",
      following: "126",
      posts: "1",
      messageSender:
        "Maya_J_Backup2",
      message:
        "Hey! It is really me. What is your home address again? I want to send you something.",
      link:
        "No link included",
      pressure:
        "Do not ask Maya at school. Her phone is broken.",
      mutuals:
        "1 mutual friend",
      joined:
        "Joined 3 hours ago",
      location:
        "Detroit, Michigan",
      clues: {
        avatar: {
          label: "Copied-looking photo",
          explanation:
            "A familiar profile photo can be copied from someone else’s real account."
        },

        handle: {
          label: "Unfamiliar handle",
          explanation:
            "The new username does not match the friend’s known account."
        },

        bio: {
          label: "Backup-account story",
          explanation:
            "Impostors often claim that an old account was hacked to explain a new profile."
        },

        "account-age": {
          label: "Account only hours old",
          explanation:
            "The account was created just a few hours ago."
        },

        followers: {
          label: "Very few followers",
          explanation:
            "The supposed friend’s new account has almost no trusted connections."
        },

        posts: {
          label: "Almost no account history",
          explanation:
            "One post provides very little proof that this is really the friend."
        },

        message: {
          label: "Requests a home address",
          explanation:
            "A home address is private information and should not be sent without verification."
        },

        pressure: {
          label: "Tells you not to verify",
          explanation:
            "The account specifically discourages checking with the real person."
        },

        joined: {
          label: "Recently joined",
          explanation:
            "The account appeared only a few hours ago."
        },

        mutuals: {
          label: "Almost no mutual friends",
          explanation:
            "A real friend’s replacement account would often connect with more known people."
        }
      }
    },

    {
      id: "creator-manager",
      title: "The Celebrity Manager",
      username: "StarNova_Manager",
      handle: "@official_starnova_team",
      avatar: "⭐",
      verification: "✓",
      profileUrl:
        "star-nova-fans.example/contact",
      bio:
        "Private manager for StarNova. Recruiting young creators for a secret project.",
      accountAge: "2 weeks",
      followers: "37",
      following: "2,405",
      posts: "3",
      messageSender:
        "StarNova_Manager",
      message:
        "StarNova selected you for a private video project. Send your full name, age, school, and a private photo.",
      link:
        "star-nova-casting.example/apply",
      pressure:
        "Do not tell your parents yet. This opportunity must stay secret.",
      mutuals:
        "No mutual friends",
      joined:
        "Joined two weeks ago",
      location:
        "Hollywood",
      clues: {
        "profile-url": {
          label: "Unofficial fan website",
          explanation:
            "The profile is not hosted on the celebrity’s official website."
        },

        verification: {
          label: "Unproven verification mark",
          explanation:
            "A check mark inside the profile design does not prove authenticity."
        },

        bio: {
          label: "Secret recruiting claim",
          explanation:
            "Legitimate opportunities should not require children to keep the project secret."
        },

        followers: {
          label: "Tiny audience",
          explanation:
            "A real celebrity management account would likely have more established followers."
        },

        following: {
          label: "Mass-following strangers",
          explanation:
            "The account follows thousands of people while very few follow it."
        },

        posts: {
          label: "Little public history",
          explanation:
            "The account has only a few posts despite claiming to represent a celebrity."
        },

        message: {
          label: "Requests identifying details",
          explanation:
            "The message asks for a name, age, school, and private photo."
        },

        link: {
          label: "Unknown casting site",
          explanation:
            "The application link is not connected to a verified official organization."
        },

        pressure: {
          label: "Demands secrecy",
          explanation:
            "A safe adult or organization should never tell a child to hide contact from trusted adults."
        },

        mutuals: {
          label: "No trusted connection",
          explanation:
            "No mutual friends or trusted adults connect the user to the account."
        }
      }
    },

    {
      id: "tech-support",
      title: "The Emergency Tech Agent",
      username: "SafetiiSupport_Service",
      handle: "@account_security_team",
      avatar: "🛠️",
      verification: "✓",
      profileUrl:
        "safetii-security-help.example",
      bio:
        "24-hour account protection and emergency password recovery.",
      accountAge: "5 days",
      followers: "11",
      following: "612",
      posts: "2",
      messageSender:
        "SafetiiSupport_Service",
      message:
        "Your account will be deleted because of suspicious activity. Reply with your password so we can protect it.",
      link:
        "secure-account-reset.example/login",
      pressure:
        "Respond in ten minutes or permanently lose your account.",
      mutuals:
        "No mutual friends",
      joined:
        "Joined five days ago",
      location:
        "Support Center",
      clues: {
        "profile-url": {
          label: "Fake support domain",
          explanation:
            "The address is not the legitimate Safetii Net website."
        },

        username: {
          label: "Unofficial support name",
          explanation:
            "The account uses a generic support-style name instead of an established official profile."
        },

        verification: {
          label: "Fake check mark",
          explanation:
            "The check symbol can be copied and does not verify the account."
        },

        bio: {
          label: "Unverified security claim",
          explanation:
            "Anyone can write that they provide emergency account protection."
        },

        "account-age": {
          label: "Recently created support account",
          explanation:
            "A major platform’s official support account would not normally be only five days old."
        },

        followers: {
          label: "Very few followers",
          explanation:
            "An official platform support account would usually have an established audience."
        },

        message: {
          label: "Requests a password",
          explanation:
            "Real support staff should never ask users to send their password."
        },

        link: {
          label: "Fake reset link",
          explanation:
            "The login page is not on the platform’s real website."
        },

        pressure: {
          label: "Threatens account deletion",
          explanation:
            "The message uses fear and a short deadline to force a rushed response."
        },

        joined: {
          label: "Joined recently",
          explanation:
            "The profile has existed for only a few days."
        }
      }
    },

    {
      id: "coach-scout",
      title: "The Sports Scout",
      username: "National_Scouting_Pro",
      handle: "@elite_youth_scout",
      avatar: "🏀",
      verification: "",
      profileUrl:
        "youth-scouting-pro.example",
      bio:
        "National scout helping young athletes reach the next level.",
      accountAge: "1 month",
      followers: "52",
      following: "3,120",
      posts: "6",
      messageSender:
        "National_Scouting_Pro",
      message:
        "I saw your highlights. Send your school, practice schedule, home address, and a photo of your student ID.",
      link:
        "elite-athlete-form.example",
      pressure:
        "Complete the form tonight before another player takes your spot.",
      mutuals:
        "No coaches in common",
      joined:
        "Joined last month",
      location:
        "United States",
      clues: {
        "profile-url": {
          label: "Unknown scouting website",
          explanation:
            "The website is not connected to a recognized sports organization."
        },

        bio: {
          label: "Vague professional claim",
          explanation:
            "The account claims to be a national scout but provides no team or organization."
        },

        followers: {
          label: "Small following",
          explanation:
            "The profile has little evidence of an established professional reputation."
        },

        following: {
          label: "Targets thousands of users",
          explanation:
            "The account follows thousands of people, which may mean it sends the same message widely."
        },

        posts: {
          label: "Limited public work",
          explanation:
            "Only a few posts support the account’s major professional claim."
        },

        message: {
          label: "Requests dangerous personal details",
          explanation:
            "A school, schedule, home address, and student ID are highly sensitive."
        },

        link: {
          label: "Unverified application form",
          explanation:
            "The form does not belong to a recognized school, league, or sports organization."
        },

        pressure: {
          label: "False deadline",
          explanation:
            "The account pressures the athlete to act before speaking with a parent or coach."
        },

        mutuals: {
          label: "No trusted sports connections",
          explanation:
            "No known coaches or organizations connect the player to this scout."
        },

        location: {
          label: "Meaningless location",
          explanation:
            "Listing only an entire country provides no way to verify the claimed organization."
        }
      }
    },

    {
      id: "contest-winner",
      title: "The Contest Winner Message",
      username: "PrizeCenter2026",
      handle: "@official_winner_department",
      avatar: "🎁",
      verification: "★",
      profileUrl:
        "prize-center-winners.example",
      bio:
        "Awarding phones, tablets, and cash prizes every day.",
      accountAge: "8 days",
      followers: "18",
      following: "1,806",
      posts: "4",
      messageSender:
        "PrizeCenter2026",
      message:
        "You were randomly selected to receive a new phone. Pay a small delivery fee using a gift card.",
      link:
        "claim-my-phone.example/payment",
      pressure:
        "Send the gift card number now. Only one phone remains.",
      mutuals:
        "No mutual friends",
      joined:
        "Joined eight days ago",
      location:
        "Worldwide",
      clues: {
        "profile-url": {
          label: "Unrecognized prize site",
          explanation:
            "The website does not belong to a familiar store or verified contest sponsor."
        },

        username: {
          label: "Generic prize name",
          explanation:
            "The account name does not identify a real company or organization."
        },

        verification: {
          label: "Decorative fake badge",
          explanation:
            "A star symbol is not official account verification."
        },

        bio: {
          label: "Too-good-to-be-true prizes",
          explanation:
            "The account promises expensive prizes every day without explaining a real contest."
        },

        "account-age": {
          label: "New prize account",
          explanation:
            "The account is only a few days old."
        },

        followers: {
          label: "Few followers",
          explanation:
            "A major giveaway account would normally have a larger established audience."
        },

        following: {
          label: "Mass-following behavior",
          explanation:
            "The account follows many people to find potential targets."
        },

        message: {
          label: "Requests gift-card payment",
          explanation:
            "Legitimate contests do not require winners to pay with gift cards."
        },

        link: {
          label: "Suspicious payment page",
          explanation:
            "The payment link is not connected to a verified business."
        },

        pressure: {
          label: "Scarcity pressure",
          explanation:
            "The account claims only one prize remains to rush the target."
        },

        mutuals: {
          label: "No shared connection",
          explanation:
            "Nobody the user knows appears connected to the prize account."
        },

        location: {
          label: "Unverifiable location",
          explanation:
            "The word “Worldwide” does not identify a real business location."
        }
      }
    }
  ];

  /* =====================================================
     GAME STATE
  ===================================================== */

  let selectedHeat =
    "mild";

  let settings =
    heatSettings.mild;

  let roundCases =
    [];

  let currentCaseIndex =
    0;

  let currentCase =
    null;

  let timeRemaining =
    0;

  let score =
    0;

  let badges =
    3;

  let casesSolved =
    0;

  let foundClueIds =
    new Set();

  let cluesFoundTotal =
    0;

  let correctClicks =
    0;

  let wrongClicks =
    0;

  let clueStreak =
    0;

  let bestStreak =
    0;

  let caseStartingScore =
    0;

  let scanUses =
    1;

  let hintUses =
    2;

  let mistakesTowardBadgeLoss =
    0;

  let gameRunning =
    false;

  let caseLocked =
    false;

  let timerInterval =
    null;

  let feedbackTimeout =
    null;

  /* =====================================================
     BASIC HELPERS
  ===================================================== */

  function byId(id) {
    return document.getElementById(id);
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

  function shuffle(items) {
    const copy =
      [...items];

    for (
      let index = copy.length - 1;
      index > 0;
      index -= 1
    ) {
      const randomIndex =
        Math.floor(
          Math.random() *
          (index + 1)
        );

      [
        copy[index],
        copy[randomIndex]
      ] = [
        copy[randomIndex],
        copy[index]
      ];
    }

    return copy;
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
      Number(
        arcade.getGlobalPoints?.() ||
        0
      )
    );
  }

  function getCurrentEvidenceNeeded() {
    const availableClues =
      Object.keys(
        currentCase?.clues ||
        {}
      ).length;

    return Math.min(
      settings.evidenceNeeded,
      availableClues
    );
  }

  function getFoundEvidenceCount() {
    return foundClueIds.size;
  }

  function getCaseProgressPercent() {
    const needed =
      getCurrentEvidenceNeeded();

    if (needed <= 0) {
      return 0;
    }

    return Math.min(
      100,
      (
        getFoundEvidenceCount() /
        needed
      ) * 100
    );
  }

  function setMeme(
    title,
    message,
    imageName = "thinking"
  ) {
    setText(
      "memeDetectiveTitle",
      title
    );

    setText(
      "memeDetectiveMessage",
      message
    );

    const image =
      byId(
        "memeDetectiveImage"
      );

    if (image) {
      image.src =
        `../../assets/mascot/${imageName}.png`;
    }
  }

  function setElementText(
    elementId,
    value
  ) {
    const element =
      byId(elementId);

    if (element) {
      element.textContent =
        value;
    }
  }

  function setStatValue(
    elementId,
    strongValue,
    smallValue
  ) {
    const element =
      byId(elementId);

    if (!element) {
      return;
    }

    const strong =
      element.querySelector(
        "strong"
      );

    const small =
      element.querySelector(
        "small"
      );

    if (strong) {
      strong.textContent =
        strongValue;
    }

    if (small) {
      small.textContent =
        smallValue;
    }
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
     START ROUND
  ===================================================== */

  function startGame() {
    settings =
      heatSettings[
        selectedHeat
      ] ||
      heatSettings.mild;

    roundCases =
      shuffle(
        caseFiles
      ).slice(
        0,
        settings.casesPerRound
      );

    currentCaseIndex =
      0;

    currentCase =
      null;

    timeRemaining =
      settings.roundSeconds;

    score =
      0;

    badges =
      settings.startingBadges;

    casesSolved =
      0;

    foundClueIds =
      new Set();

    cluesFoundTotal =
      0;

    correctClicks =
      0;

    wrongClicks =
      0;

    clueStreak =
      0;

    bestStreak =
      0;

    caseStartingScore =
      0;

    scanUses =
      1;

    hintUses =
      2;

    mistakesTowardBadgeLoss =
      0;

    gameRunning =
      true;

    caseLocked =
      false;

    arcade.startRound({
      gameId:
        `impostor-alert-${selectedHeat}`,

      gameName:
        `Impostor Alert ${settings.label}`,

      heatLevel:
        selectedHeat,

      questionCount:
        settings.casesPerRound
    });

    setText(
      "currentHeat",
      settings.label
    );

    setText(
      "caseTotal",
      settings.casesPerRound
    );

    setText(
      "scanPowerCount",
      "1 available"
    );

    setText(
      "hintPowerCount",
      "2 available"
    );

    byId("scanPowerButton")
      ?.removeAttribute(
        "disabled"
      );

    byId("hintPowerButton")
      ?.removeAttribute(
        "disabled"
      );

    byId("timeRemaining")
      ?.classList.remove(
        "danger-time"
      );

    showScreen(
      "playScreen"
    );

    updateHud();

    startTimer();

    loadCase();
  }

  function connectStartButton() {
    const button =
      byId("startGame");

    if (!button) {
      console.error(
        "Impostor Alert start button #startGame was not found."
      );

      return;
    }

    if (
      button.dataset
        .impostorConnected ===
      "true"
    ) {
      return;
    }

    button.dataset
      .impostorConnected =
      "true";

    button.addEventListener(
      "click",
      startGame
    );

    console.log(
      "Impostor Alert start button connected."
    );
  }

  /* =====================================================
     TIMER
  ===================================================== */

  function startTimer() {
    clearInterval(
      timerInterval
    );

    timerInterval =
      window.setInterval(
        () => {
          if (
            !gameRunning ||
            caseLocked
          ) {
            return;
          }

          timeRemaining -= 1;

          if (
            timeRemaining <= 10
          ) {
            byId("timeRemaining")
              ?.classList.add(
                "danger-time"
              );
          }

          updateHud();

          if (
            timeRemaining <= 0
          ) {
            endGame("time");
          }
        },
        1000
      );
  }

  function removeTime(seconds) {
    timeRemaining =
      Math.max(
        0,
        timeRemaining - seconds
      );

    updateHud();

    if (
      timeRemaining <= 0
    ) {
      endGame("time");
    }
  }

  /* =====================================================
     CASE RENDERING
  ===================================================== */

  function loadCase() {
    if (
      !gameRunning
    ) {
      return;
    }

    if (
      currentCaseIndex >=
      roundCases.length
    ) {
      endGame("complete");
      return;
    }

    currentCase =
      roundCases[
        currentCaseIndex
      ];

    foundClueIds =
      new Set();

    caseLocked =
      false;

    caseStartingScore =
      score;

    clearTimeout(
      feedbackTimeout
    );

    byId("caseFeedback")
      ?.classList.add(
        "hidden"
      );

    byId("nextCaseButton")
      ?.classList.add(
        "hidden"
      );

    document
      .querySelectorAll(
        ".clue-surface"
      )
      .forEach((element) => {
        element.classList.remove(
          "found-clue",
          "wrong-clue",
          "scanner-clue",
          "hint-clue"
        );

        element.removeAttribute(
          "disabled"
        );

        element.setAttribute(
          "aria-pressed",
          "false"
        );
      });

    setText(
      "caseNumber",
      currentCaseIndex + 1
    );

    setText(
      "caseTitle",
      currentCase.title
    );

    setText(
      "caseDifficulty",
      settings.difficulty
    );

    setText(
      "caseInstructions",
      `Find at least ${getCurrentEvidenceNeeded()} suspicious clues, then sound the Impostor Alert.`
    );

    setElementText(
      "profileUrl",
      currentCase.profileUrl
    );

    setElementText(
      "profileAvatar",
      currentCase.avatar
    );

    setElementText(
      "profileUsername",
      currentCase.username
    );

    setElementText(
      "verificationBadge",
      currentCase.verification ||
      "○"
    );

    setElementText(
      "profileHandle",
      currentCase.handle
    );

    setElementText(
      "profileBio",
      currentCase.bio
    );

    setStatValue(
      "accountAge",
      currentCase.accountAge,
      "Account age"
    );

    setStatValue(
      "followerCount",
      currentCase.followers,
      "Followers"
    );

    setStatValue(
      "followingCount",
      currentCase.following,
      "Following"
    );

    setStatValue(
      "postCount",
      currentCase.posts,
      "Posts"
    );

    setText(
      "messageSender",
      currentCase.messageSender
    );

    setElementText(
      "suspectMessage",
      currentCase.message
    );

    setElementText(
      "suspectLink",
      currentCase.link
    );

    setElementText(
      "pressureMessage",
      currentCase.pressure
    );

    setStatValue(
      "mutualFriends",
      "Mutual friends",
      currentCase.mutuals
    );

    setStatValue(
      "joinedDate",
      "Joined",
      currentCase.joined
    );

    setStatValue(
      "profileLocation",
      "Location",
      currentCase.location
    );

    setText(
      "evidenceNeeded",
      getCurrentEvidenceNeeded()
    );

    setText(
      "evidenceFound",
      0
    );

    const evidenceFill =
      byId("evidenceFill");

    if (evidenceFill) {
      evidenceFill.style.width =
        "0%";
    }

    const list =
      byId("evidenceChipList");

    if (list) {
      list.innerHTML = `
        <span class="empty-evidence-message">
          No clues collected yet
        </span>
      `;
    }

    lockAlertButton();

    setMeme(
      "Search carefully!",
      "Click details that could reveal an impostor.",
      "thinking"
    );

    updateHud();
  }

  /* =====================================================
     CLUE INTERACTION
  ===================================================== */

  function handleClueSelection(
    element
  ) {
    if (
      !gameRunning ||
      caseLocked ||
      !currentCase
    ) {
      return;
    }

    const clueId =
      element.dataset.clueId;

    if (!clueId) {
      return;
    }

    if (
      foundClueIds.has(
        clueId
      )
    ) {
      showCaseFeedback({
        type: "neutral",
        icon: "📌",
        title: "Already collected",
        message:
          "That clue is already in your evidence file.",
        points: 0
      });

      return;
    }

    const clue =
      currentCase.clues[
        clueId
      ];

    if (clue) {
      collectCorrectClue(
        element,
        clueId,
        clue
      );
    } else {
      handleWrongClick(
        element
      );
    }
  }

  function collectCorrectClue(
    element,
    clueId,
    clue
  ) {
    foundClueIds.add(
      clueId
    );

    correctClicks += 1;

    cluesFoundTotal += 1;

    clueStreak += 1;

    bestStreak =
      Math.max(
        bestStreak,
        clueStreak
      );

    const streakMultiplier =
      Math.min(
        4,
        Math.max(
          1,
          clueStreak
        )
      );

    const earnedPoints =
      settings.cluePoints *
      streakMultiplier;

    score +=
      earnedPoints;

    element.classList.remove(
      "wrong-clue",
      "scanner-clue",
      "hint-clue"
    );

    element.classList.add(
      "found-clue"
    );

    element.setAttribute(
      "aria-pressed",
      "true"
    );

    addEvidenceChip(
      clue.label
    );

    showCaseFeedback({
      type: "correct",
      icon: "🔎",
      title:
        clueStreak >= 3
          ? `${clueStreak}x Evidence Streak!`
          : "Evidence collected!",

      message:
        clue.explanation,

      points:
        earnedPoints
    });

    setMeme(
      clueStreak >= 4
        ? "Sharp detective work!"
        : "Great clue!",

      `${clue.label} added to the evidence file.`,

      "congrats"
    );

    updateEvidenceMeter();
    updateHud();

    if (
      getFoundEvidenceCount() >=
      getCurrentEvidenceNeeded()
    ) {
      unlockAlertButton();
    }
  }

  function handleWrongClick(
    element
  ) {
    wrongClicks += 1;

    clueStreak =
      0;

    mistakesTowardBadgeLoss += 1;

    element.classList.remove(
      "scanner-clue",
      "hint-clue"
    );

    element.classList.add(
      "wrong-clue"
    );

    window.setTimeout(
      () => {
        element.classList.remove(
          "wrong-clue"
        );
      },
      650
    );

    removeTime(
      settings.wrongClickPenalty
    );

    let badgeMessage =
      `${settings.wrongClickPenalty} seconds lost.`;

    if (
      mistakesTowardBadgeLoss >= 2
    ) {
      mistakesTowardBadgeLoss =
        0;

      badges -= 1;

      badgeMessage =
        `A detective badge was lost, and ${settings.wrongClickPenalty} seconds were removed.`;
    }

    showCaseFeedback({
      type: "wrong",
      icon: "❌",
      title: "That is not evidence",
      message:
        `Look for unusual behavior, requests, links, account history, or pressure. ${badgeMessage}`,
      points: 0
    });

    setMeme(
      "Search more carefully!",
      "Not every profile detail is suspicious.",
      "wrong"
    );

    updateHud();

    if (
      badges <= 0
    ) {
      window.setTimeout(
        () => {
          endGame("badges");
        },
        550
      );
    }
  }

  function addEvidenceChip(
    label
  ) {
    const list =
      byId("evidenceChipList");

    if (!list) {
      return;
    }

    list
      .querySelector(
        ".empty-evidence-message"
      )
      ?.remove();

    const chip =
      document.createElement(
        "span"
      );

    chip.className =
      "evidence-chip";

    chip.textContent =
      `✓ ${label}`;

    list.appendChild(
      chip
    );
  }

  function updateEvidenceMeter() {
    setText(
      "evidenceFound",
      getFoundEvidenceCount()
    );

    setText(
      "evidenceNeeded",
      getCurrentEvidenceNeeded()
    );

    const fill =
      byId("evidenceFill");

    if (fill) {
      fill.style.width =
        `${getCaseProgressPercent()}%`;
    }
  }

  /* =====================================================
     CONNECT ALL CLUE SURFACES
  ===================================================== */

  function connectClueSurfaces() {
    document
      .querySelectorAll(
        ".clue-surface"
      )
      .forEach((element) => {
        if (
          element.dataset
            .clueConnected ===
          "true"
        ) {
          return;
        }

        element.dataset
          .clueConnected =
          "true";

        element.addEventListener(
          "click",
          () => {
            handleClueSelection(
              element
            );
          }
        );

        element.addEventListener(
          "keydown",
          (event) => {
            if (
              event.key === "Enter" ||
              event.key === " "
            ) {
              event.preventDefault();

              handleClueSelection(
                element
              );
            }
          }
        );
      });
  }

  /* =====================================================
     ALERT BUTTON
  ===================================================== */

  function lockAlertButton() {
    const button =
      byId(
        "impostorAlertButton"
      );

    if (!button) {
      return;
    }

    button.disabled =
      true;

    button.classList.add(
      "locked-alert"
    );

    button.classList.remove(
      "ready-alert"
    );

    setText(
      "alertButtonMessage",
      "Collect more evidence"
    );
  }

  function unlockAlertButton() {
    const button =
      byId(
        "impostorAlertButton"
      );

    if (!button) {
      return;
    }

    button.disabled =
      false;

    button.classList.remove(
      "locked-alert"
    );

    button.classList.add(
      "ready-alert"
    );

    setText(
      "alertButtonMessage",
      "Evidence ready — solve the case!"
    );

    setMeme(
      "Evidence ready!",
      "Sound the Impostor Alert to expose the fake account.",
      "congrats"
    );
  }

  function solveCurrentCase() {
    if (
      !gameRunning ||
      caseLocked ||
      !currentCase
    ) {
      return;
    }

    if (
      getFoundEvidenceCount() <
      getCurrentEvidenceNeeded()
    ) {
      return;
    }

    caseLocked =
      true;

    casesSolved += 1;

    const evidenceBonus =
      getFoundEvidenceCount() *
      settings.cluePoints;

    const timeBonus =
      Math.min(
        100,
        timeRemaining
      );

    const casePoints =
      settings.caseBonus +
      evidenceBonus +
      timeBonus;

    score +=
      casePoints;

    arcade.answerQuestion({
      questionId:
        currentCase.id,

      correct: true
    });

    document
      .querySelectorAll(
        ".clue-surface"
      )
      .forEach((element) => {
        element.setAttribute(
          "disabled",
          "disabled"
        );
      });

    setText(
      "caseSolvedHeading",
      "Impostor Exposed!"
    );

    setText(
      "caseSolvedExplanation",
      `You collected enough evidence to expose ${currentCase.username}. Never trust a profile because of a photo, name, badge, or exciting promise alone.`
    );

    setText(
      "casePointsEarned",
      `+${casePoints}`
    );

    byId("caseSolvedOverlay")
      ?.classList.remove(
        "hidden"
      );

    updateHud();
  }

  byId("impostorAlertButton")
    ?.addEventListener(
      "click",
      solveCurrentCase
    );

  byId("continueAfterSolved")
    ?.addEventListener(
      "click",
      () => {
        byId("caseSolvedOverlay")
          ?.classList.add(
            "hidden"
          );

        currentCaseIndex += 1;

        if (
          currentCaseIndex >=
          roundCases.length
        ) {
          endGame("complete");
          return;
        }

        loadCase();
      }
    );

  /* =====================================================
     EVIDENCE SCANNER
  ===================================================== */

  function getUnfoundClueElements() {
    const results =
      [];

    Object.keys(
      currentCase?.clues ||
      {}
    ).forEach((clueId) => {
      if (
        foundClueIds.has(
          clueId
        )
      ) {
        return;
      }

      const element =
        document.querySelector(
          `[data-clue-id="${clueId}"]`
        );

      if (element) {
        results.push(
          element
        );
      }
    });

    return results;
  }

  byId("scanPowerButton")
    ?.addEventListener(
      "click",
      () => {
        if (
          !gameRunning ||
          caseLocked ||
          scanUses <= 0 ||
          !currentCase
        ) {
          return;
        }

        scanUses -= 1;

        setText(
          "scanPowerCount",
          "0 available"
        );

        byId("scanPowerButton")
          ?.setAttribute(
            "disabled",
            "disabled"
          );

        const unfound =
          shuffle(
            getUnfoundClueElements()
          ).slice(
            0,
            3
          );

        unfound.forEach(
          (element) => {
            element.classList.add(
              "scanner-clue"
            );

            window.setTimeout(
              () => {
                element.classList.remove(
                  "scanner-clue"
                );
              },
              2400
            );
          }
        );

        setMeme(
          "Scanner activated!",
          "Three suspicious areas are glowing. Inspect them quickly!",
          "thinking"
        );
      }
    );

  /* =====================================================
     MEME HINT
  ===================================================== */

  byId("hintPowerButton")
    ?.addEventListener(
      "click",
      () => {
        if (
          !gameRunning ||
          caseLocked ||
          hintUses <= 0 ||
          !currentCase
        ) {
          return;
        }

        const available =
          getUnfoundClueElements();

        if (
          available.length === 0
        ) {
          setMeme(
            "You found every clue!",
            "Sound the Impostor Alert.",
            "congrats"
          );

          return;
        }

        hintUses -= 1;

        setText(
          "hintPowerCount",
          `${hintUses} available`
        );

        if (
          hintUses <= 0
        ) {
          byId("hintPowerButton")
            ?.setAttribute(
              "disabled",
              "disabled"
            );
        }

        const element =
          shuffle(
            available
          )[0];

        const clueId =
          element.dataset.clueId;

        const clue =
          currentCase.clues[
            clueId
          ];

        element.classList.add(
          "hint-clue"
        );

        element.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });

        setMeme(
          "Meme Hint",
          `Look closely for: ${clue.label}.`,
          "thinking"
        );

        window.setTimeout(
          () => {
            element.classList.remove(
              "hint-clue"
            );
          },
          2200
        );
      }
    );

  /* =====================================================
     FEEDBACK
  ===================================================== */

  function showCaseFeedback({
    type,
    icon,
    title,
    message,
    points
  }) {
    const feedback =
      byId("caseFeedback");

    if (!feedback) {
      return;
    }

    clearTimeout(
      feedbackTimeout
    );

    feedback.classList.remove(
      "hidden",
      "correct-feedback",
      "wrong-feedback",
      "neutral-feedback"
    );

    const className =
      type === "correct"
        ? "correct-feedback"
        : type === "wrong"
          ? "wrong-feedback"
          : "neutral-feedback";

    feedback.classList.add(
      className
    );

    setText(
      "caseFeedbackIcon",
      icon
    );

    setText(
      "caseFeedbackTitle",
      title
    );

    setText(
      "caseFeedbackMessage",
      message
    );

    setText(
      "caseFeedbackPoints",
      `+${points}`
    );

    feedbackTimeout =
      window.setTimeout(
        () => {
          feedback.classList.add(
            "hidden"
          );
        },
        3200
      );
  }

  /* =====================================================
     HUD
  ===================================================== */

  function updateHud() {
    setText(
      "timeRemaining",
      timeRemaining
    );

    setText(
      "currentScore",
      score
    );

    setText(
      "clueStreak",
      `x${clueStreak}`
    );

    setText(
      "livesDisplay",
      badges > 0
        ? "🛡️".repeat(
            badges
          )
        : "💥"
    );

    setText(
      "casesSolved",
      casesSolved
    );

    const progress =
      settings.casesPerRound > 0
        ? (
            casesSolved /
            settings.casesPerRound
          ) * 100
        : 0;

    const progressFill =
      byId("caseProgressFill");

    if (progressFill) {
      progressFill.style.width =
        `${Math.min(
          100,
          progress
        )}%`;
    }

    updateGlobalPoints();
  }

  /* =====================================================
     END GAME
  ===================================================== */

  function makeStars(count) {
    const stars =
      Math.max(
        0,
        Math.min(
          3,
          Number(count) || 0
        )
      );

    return (
      "★".repeat(stars) +
      "☆".repeat(3 - stars)
    );
  }

  function endGame(reason) {
    if (
      !gameRunning
    ) {
      return;
    }

    gameRunning =
      false;

    caseLocked =
      true;

    clearInterval(
      timerInterval
    );

    clearTimeout(
      feedbackTimeout
    );

    byId("caseSolvedOverlay")
      ?.classList.add(
        "hidden"
      );

    const totalClicks =
      correctClicks +
      wrongClicks;

    const accuracy =
      totalClicks > 0
        ? Math.round(
            (
              correctClicks /
              totalClicks
            ) * 100
          )
        : 0;

    let arcadeResult = {};

    try {
      arcadeResult =
        arcade.finishRound() ||
        {};
    } catch (error) {
      console.error(
        "Could not finish Impostor Alert round:",
        error
      );
    }

    const bestScoreKey =
      `impostorAlertBest-${selectedHeat}`;

    const previousBest =
      Number(
        localStorage.getItem(
          bestScoreKey
        ) || 0
      );

    const newBest =
      Math.max(
        previousBest,
        score
      );

    localStorage.setItem(
      bestScoreKey,
      String(newBest)
    );

    let starCount =
      1;

    if (
      casesSolved ===
        settings.casesPerRound &&
      accuracy >= 90
    ) {
      starCount =
        3;
    } else if (
      casesSolved >= 3 &&
      accuracy >= 65
    ) {
      starCount =
        2;
    }

    let rank =
      "Rookie Investigator";

    if (
      casesSolved ===
        settings.casesPerRound &&
      accuracy >= 90 &&
      bestStreak >= 4
    ) {
      rank =
        "Elite Impostor Hunter";
    } else if (
      casesSolved >= 4 &&
      accuracy >= 75
    ) {
      rank =
        "Senior Digital Detective";
    } else if (
      casesSolved >= 3
    ) {
      rank =
        "Cyber Investigation Agent";
    }

    let heading =
      "Investigation Complete";

    let message =
      "Keep checking account history, usernames, links, requests, and pressure before trusting unfamiliar profiles.";

    if (
      reason === "badges"
    ) {
      heading =
        "Investigation Interrupted";

      message =
        "Too many harmless details were marked as evidence. Slow down and focus on suspicious behavior.";
    } else if (
      reason === "time"
    ) {
      heading =
        "The Trail Went Cold";

      message =
        "Time expired. Search the next round for strange links, urgent demands, private-information requests, and unverified accounts.";
    } else if (
      casesSolved ===
        settings.casesPerRound &&
      accuracy >= 90
    ) {
      heading =
        "Master Detective!";
      
      message =
        "You exposed every impostor and collected evidence with excellent accuracy.";
    } else if (
      casesSolved ===
        settings.casesPerRound
    ) {
      heading =
        "All Impostors Exposed!";

      message =
        "Every case was solved. Play again to improve your accuracy and evidence streak.";
    }

    setText(
      "resultHeading",
      heading
    );

    setText(
      "detectiveRank",
      rank
    );

    setText(
      "finalScore",
      score
    );

    setText(
      "finalCasesSolved",
      `${casesSolved}/${settings.casesPerRound}`
    );

    setText(
      "finalCluesFound",
      cluesFoundTotal
    );

    setText(
      "finalAccuracy",
      `${accuracy}%`
    );

    setText(
      "finalBestStreak",
      `x${bestStreak}`
    );

    setText(
      "bestScore",
      newBest
    );

    setText(
      "globalPointsEarned",
      `+${
        Number(
          arcadeResult
            .globalPointsEarned ||
          0
        )
      }`
    );

    setText(
      "finalStars",
      makeStars(
        starCount
      )
    );

    setText(
      "resultMessage",
      message
    );

    const resultImage =
      byId("resultMemeImage");

    if (resultImage) {
      resultImage.src =
        casesSolved >= 3
          ? "../../assets/mascot/congrats.png"
          : "../../assets/mascot/thinking.png";
    }

    updateGlobalPoints();

    showScreen(
      "resultScreen"
    );
  }

  /* =====================================================
     PLAY AGAIN
  ===================================================== */

  byId("playAgain")
    ?.addEventListener(
      "click",
      () => {
        clearInterval(
          timerInterval
        );

        clearTimeout(
          feedbackTimeout
        );

        byId("caseSolvedOverlay")
          ?.classList.add(
            "hidden"
          );

        byId("timeRemaining")
          ?.classList.remove(
            "danger-time"
          );

        showScreen(
          "introScreen"
        );
      }
    );

  /* =====================================================
     INITIALIZATION
  ===================================================== */

  function initializeGame() {
    connectStartButton();
    connectClueSurfaces();
    updateGlobalPoints();

    console.log(
      "Impostor Alert detective engine loaded successfully."
    );
  }

  if (
    document.readyState ===
    "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      initializeGame,
      {
        once: true
      }
    );
  } else {
    initializeGame();
  }
})();
