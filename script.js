const missions = [
  {
    id: "identity",
    name: "Identity Protector",
    icon: "/assets/Identity Protector.png",
    badge: "/assets/Identity Protector Badge.png",
    page: "/missions/identity.html"
  },
  {
    id: "password",
    name: "Password Safe Keeper",
    icon: "/assets/Password Safe Keeper.png",
    badge: "/assets/Password Safe Keeper Badge.png",
    page: "/missions/password.html"
  },
  {
    id: "phishing",
    name: "Phish Finder",
    icon: "/assets/Phish Finder.png",
    badge: "/assets/Phish Finder Badge.png",
    page: "/missions/phishing.html"
  },
  {
    id: "footprint",
    name: "Digital Footprint Defender",
    icon: "/assets/Digital Footprint Defender.png",
    badge: "/assets/Digital Footprint Defender Badge.png",
    page: "/missions/footprint.html"
  },
  {
    id: "responder",
    name: "Cyber Responder",
    icon: "/assets/Cyber Responder.png",
    badge: "/assets/Cyber Responder Badge.png",
    page: "/missions/responder.html"
  }
];

function normalizeCompletedMission(value) {
  const mission = missions.find(function (item) {
    return item.id === value || item.name === value;
  });

  return mission ? mission.id : null;
}

function getCompletedMissions() {
  try {
    const savedMissions = JSON.parse(
      localStorage.getItem("completedMissions") || "[]"
    );

    if (!Array.isArray(savedMissions)) {
      return [];
    }

    return savedMissions
      .map(normalizeCompletedMission)
      .filter(function (missionId, index, list) {
        return missionId && list.indexOf(missionId) === index;
      });
  } catch (error) {
    return [];
  }
}

function saveCompletedMissions(completedMissions) {
  const cleanedMissions = completedMissions
    .map(normalizeCompletedMission)
    .filter(function (missionId, index, list) {
      return missionId && list.indexOf(missionId) === index;
    });

  localStorage.setItem(
    "completedMissions",
    JSON.stringify(cleanedMissions)
  );
}

function getMissionById(value) {
  return missions.find(function (mission) {
    return mission.id === value || mission.name === value;
  });
}

function completeMission(missionValue) {
  const mission = getMissionById(missionValue);

  if (!mission) {
    return;
  }

  const completedMissions = getCompletedMissions();

  if (!completedMissions.includes(mission.id)) {
    completedMissions.push(mission.id);
    saveCompletedMissions(completedMissions);
  }

  window.location.href =
    "/badge.html?mission=" + encodeURIComponent(mission.id);
}

function updateProgressDisplay() {
  const completedMissions = getCompletedMissions();
  const completedCount = completedMissions.length;
  const totalMissions = missions.length;
  const progressPercentage = Math.round(
    (completedCount / totalMissions) * 100
  );

  const countElement = document.getElementById("completedMissionCount");
  const fillElement = document.getElementById("homeProgressFill");
  const messageElement = document.getElementById("homeProgressMessage");

  if (countElement) {
    countElement.textContent = completedCount;
  }

  if (fillElement) {
    fillElement.style.width = progressPercentage + "%";
  }

  if (messageElement) {
    if (completedCount === 0) {
      messageElement.textContent =
        "Complete your first mission to begin earning badges.";
    } else if (completedCount < totalMissions) {
      const remaining = totalMissions - completedCount;

      messageElement.textContent =
        remaining +
        (remaining === 1 ? " mission remains." : " missions remain.");
    } else {
      messageElement.textContent =
        "All missions complete! Your certificate is unlocked.";
    }
  }
}

function renderHomeSidebarBadges() {
  const badgeContainer = document.getElementById("homeSidebarBadges");

  if (!badgeContainer) {
    return;
  }

  const completedMissions = getCompletedMissions();

  badgeContainer.innerHTML = "";

  if (completedMissions.length === 0) {
    const emptyMessage = document.createElement("p");

    emptyMessage.className = "empty-badge-message";
    emptyMessage.textContent =
      "Your earned badges will appear here after you complete a mission.";

    badgeContainer.appendChild(emptyMessage);
    return;
  }

  completedMissions.forEach(function (missionId) {
    const mission = getMissionById(missionId);

    if (!mission) {
      return;
    }

    const badgeItem = document.createElement("div");
    badgeItem.className = "home-badge-item";

    const badgeImage = document.createElement("img");
    badgeImage.src = mission.badge;
    badgeImage.alt = mission.name + " badge";

    const badgeName = document.createElement("span");
    badgeName.textContent = mission.name;

    badgeItem.appendChild(badgeImage);
    badgeItem.appendChild(badgeName);

    badgeContainer.appendChild(badgeItem);
  });
}

function loadBadgeReveal() {
  const badgeImage = document.getElementById("earnedBadgeImage");
  const badgeTitle = document.getElementById("earnedBadgeTitle");
  const badgeMessage = document.getElementById("earnedBadgeMessage");

  if (!badgeImage && !badgeTitle && !badgeMessage) {
    return;
  }

  const parameters = new URLSearchParams(window.location.search);
  const requestedMission = parameters.get("mission");
  const mission = getMissionById(requestedMission);

  if (!mission) {
    if (badgeTitle) {
      badgeTitle.textContent = "Mission Complete!";
    }

    if (badgeMessage) {
      badgeMessage.textContent =
        "You completed a Safetii Net cybersecurity mission.";
    }

    return;
  }

  if (badgeImage) {
    badgeImage.src = mission.badge;
    badgeImage.alt = mission.name + " badge";
  }

  if (badgeTitle) {
    badgeTitle.textContent = mission.name + " Badge Earned!";
  }

  if (badgeMessage) {
    badgeMessage.textContent =
      "Great work! Your new badge has been added to your collection.";
  }
}

function goHome() {
  window.location.href = "/index.html";
}

function renderCertificatePage() {
  const badgeContainer = document.getElementById("certificateBadges");

  if (!badgeContainer) {
    return;
  }

  const completedMissions = getCompletedMissions();
  const completedCount = completedMissions.length;
  const totalMissions = missions.length;
  const progressPercentage = Math.round(
    (completedCount / totalMissions) * 100
  );
  const certificateUnlocked = completedCount === totalMissions;

  const statusElement = document.getElementById("certificateStatus");
  const countElement = document.getElementById(
    "certificateProgressCount"
  );
  const fillElement = document.getElementById(
    "certificateProgressFill"
  );
  const certificateElement = document.getElementById(
    "unlockedCertificate"
  );
  const printButton = document.getElementById(
    "printCertificateButton"
  );

  if (statusElement) {
    statusElement.textContent = certificateUnlocked
      ? "Congratulations! You completed every mission and unlocked your certificate."
      : "Complete all five missions to unlock your certificate.";
  }

  if (countElement) {
    countElement.textContent =
      completedCount + " of " + totalMissions + " missions complete";
  }

  if (fillElement) {
    fillElement.style.width = progressPercentage + "%";
  }

  if (certificateElement) {
    certificateElement.hidden = !certificateUnlocked;
  }

  if (printButton) {
    printButton.hidden = !certificateUnlocked;
  }

  badgeContainer.innerHTML = "";

  missions.forEach(function (mission) {
    const isCompleted = completedMissions.includes(mission.id);

    const badgeCard = document.createElement(
      isCompleted ? "div" : "a"
    );

    badgeCard.className =
      "certificate-badge-card " +
      (isCompleted ? "earned" : "locked");

    if (!isCompleted) {
      badgeCard.href = mission.page;
      badgeCard.setAttribute(
        "aria-label",
        "Complete the " + mission.name + " mission"
      );
    }

    const imageWrapper = document.createElement("div");
    imageWrapper.className = "certificate-badge-image";

    const badgeImage = document.createElement("img");
    badgeImage.src = mission.badge;
    badgeImage.alt = mission.name + " badge";

    const badgeName = document.createElement("h3");
    badgeName.textContent = mission.name;

    const badgeStatus = document.createElement("p");
    badgeStatus.textContent = isCompleted
      ? "Badge Earned"
      : "Locked — Complete Mission";

    imageWrapper.appendChild(badgeImage);
    badgeCard.appendChild(imageWrapper);
    badgeCard.appendChild(badgeName);
    badgeCard.appendChild(badgeStatus);

    badgeContainer.appendChild(badgeCard);
  });
}

function scrollToQuestionOfDay() {
  const questionSection =
    document.getElementById("questionOfTheDay") ||
    document.querySelector(".question-of-the-day");

  if (questionSection) {
    questionSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

function checkQuestionOfDay(answer) {
  const feedback =
    document.getElementById("questionOfDayFeedback") ||
    document.getElementById("qotdFeedback");

  const normalizedAnswer = String(answer).toLowerCase();
  const correctAnswers = [
    "scam",
    "phishing",
    "unsafe",
    "suspicious",
    "no"
  ];

  const isCorrect = correctAnswers.includes(normalizedAnswer);

  if (feedback) {
    feedback.textContent = isCorrect
      ? "Correct! Stop and check before clicking or sharing information."
      : "Look closely for pressure, strange links, prizes, and requests for private information.";

    feedback.classList.toggle("correct", isCorrect);
    feedback.classList.toggle("incorrect", !isCorrect);
  }

  return isCorrect;
}

function revealScamOne() {
  revealScamSection(
    "scamOneReveal",
    "scam-one-reveal",
    "revealScamOne"
  );
}

function revealScamTwo() {
  revealScamSection(
    "scamTwoReveal",
    "scam-two-reveal",
    "revealScamTwo"
  );
}

function revealScamSection(id, className, buttonId) {
  const revealBox =
    document.getElementById(id) ||
    document.querySelector("." + className);

  if (revealBox) {
    revealBox.hidden = false;
    revealBox.classList.add("revealed");
  }

  const button = document.getElementById(buttonId);

  if (button) {
    button.disabled = true;
    button.textContent = "Scam Revealed";
  }
}

function gradePhishingQuiz() {
  const quiz =
    document.getElementById("phishingQuiz") ||
    document.querySelector(".phishing-quiz");

  const results =
    document.getElementById("phishingQuizResult") ||
    document.getElementById("quizResult");

  const completeButton =
    document.getElementById("completePhishingMission") ||
    document.getElementById("completePhishFinderButton");

  if (!quiz) {
    return;
  }

  const questions = quiz.querySelectorAll(
    "[data-correct-answer], [data-answer]"
  );

  let correctAnswers = 0;
  let answeredQuestions = 0;

  questions.forEach(function (question) {
    const selectedAnswer = question.querySelector(
      'input[type="radio"]:checked'
    );

    const correctAnswer =
      question.dataset.correctAnswer ||
      question.dataset.answer;

    if (!selectedAnswer) {
      return;
    }

    answeredQuestions += 1;

    if (selectedAnswer.value === correctAnswer) {
      correctAnswers += 1;
    }
  });

  if (questions.length === 0) {
    if (results) {
      results.textContent =
        "The quiz questions need data-answer or data-correct-answer values before they can be graded.";
    }

    return;
  }

  if (answeredQuestions < questions.length) {
    if (results) {
      results.textContent =
        "Please answer every question before submitting the quiz.";
      results.classList.remove("passed");
      results.classList.add("failed");
    }

    return;
  }

  const score = Math.round(
    (correctAnswers / questions.length) * 100
  );

  if (results) {
    results.textContent =
      "You scored " +
      score +
      "%. " +
      (score >= 80
        ? "You passed!"
        : "You need at least 80%. Review the lesson and try again.");

    results.classList.toggle("passed", score >= 80);
    results.classList.toggle("failed", score < 80);
  }

  if (completeButton) {
    completeButton.hidden = score < 80;
  }
}

function initializePrintButton() {
  const printButton = document.getElementById(
    "printCertificateButton"
  );

  if (!printButton) {
    return;
  }

  printButton.addEventListener("click", function () {
    window.print();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  updateProgressDisplay();
  renderHomeSidebarBadges();
  loadBadgeReveal();
  renderCertificatePage();
  initializePrintButton();
});
