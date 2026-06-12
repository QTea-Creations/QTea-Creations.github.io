const missions = [
  {
    id: "identity",
    name: "Identity Protector",
    icon: "assets/Identity Protector.png",
    badge: "assets/Identity Protector Badge.png",
    page: "missions/identity.html"
  },
  {
    id: "password",
    name: "Password Safe Keeper",
    icon: "assets/Password Safe Keeper.png",
    badge: "assets/Password Safe Keeper Badge.png",
    page: "missions/password.html"
  },
  {
    id: "phishing",
    name: "Phish Finder",
    icon: "assets/Phish Finder.png",
    badge: "assets/Phish Finder Badge.png",
    page: "missions/phishing.html"
  },
  {
    id: "footprint",
    name: "Digital Footprint Defender",
    icon: "assets/Digital Footprint Defender.png",
    badge: "assets/Digital Footprint Defender Badge.png",
    page: "missions/footprint.html"
  },
  {
    id: "responder",
    name: "Cyber Responder",
    icon: "assets/Cyber Responder.png",
    badge: "assets/Cyber Responder Badge.png",
    page: "missions/responder.html"
  }
];

function getCompletedMissions() {
  const saved = localStorage.getItem("completedMissions");
  return saved ? JSON.parse(saved) : [];
}

function saveCompletedMissions(completedMissions) {
  localStorage.setItem("completedMissions", JSON.stringify(completedMissions));
}

function getMissionById(id) {
  return missions.find(function (mission) {
    return mission.id === id || mission.name === id;
  });
}

function completeMission(missionName) {
  const completedMissions = getCompletedMissions();

  if (!completedMissions.includes(missionName)) {
    completedMissions.push(missionName);
    saveCompletedMissions(completedMissions);
  }

  window.location.href = "../badge.html?mission=" + encodeURIComponent(missionName);
}

function updateProgressDisplay() {
  const completedMissions = getCompletedMissions();
  const progressText = document.getElementById("progressText");
  const progressFill = document.getElementById("progressFill");

  if (!progressText || !progressFill) {
    return;
  }

  const completedCount = completedMissions.length;
  const totalCount = missions.length;
  const percentage = Math.round((completedCount / totalCount) * 100);

  progressText.textContent = completedCount + " of " + totalCount + " missions complete";
  progressFill.style.width = percentage + "%";
}

function renderHomeSidebarBadges() {
  const badgeContainer = document.getElementById("homeSidebarBadges");

  if (!badgeContainer) {
    return;
  }

  const completedMissions = getCompletedMissions();
  badgeContainer.innerHTML = "";

  if (completedMissions.length === 0) {
    badgeContainer.innerHTML = '<p class="empty-badge-message">Complete a mission to earn your first badge!</p>';
    return;
  }

  completedMissions.forEach(function (completedMission) {
    const mission = getMissionById(completedMission);

    if (!mission) {
      return;
    }

    const badgeImage = document.createElement("img");
    badgeImage.src = mission.badge;
    badgeImage.alt = mission.name + " Badge";
    badgeContainer.appendChild(badgeImage);
  });
}

function loadBadgeReveal() {
  const badgeImage = document.getElementById("earnedBadgeImage");
  const badgeTitle = document.getElementById("earnedBadgeTitle");

  if (!badgeImage || !badgeTitle) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const missionName = params.get("mission");
  const mission = getMissionById(missionName);

  if (!mission) {
    badgeTitle.textContent = "Badge Earned!";
    return;
  }

  badgeImage.src = mission.badge;
  badgeImage.alt = mission.name + " Badge";
  badgeTitle.textContent = mission.name + " Badge Earned!";
}

function goHome() {
  window.location.href = "index.html";
}

function renderCertificatePage() {
  const certificateStatus = document.getElementById("certificateStatus");
  const certificateBadges = document.getElementById("certificateBadges");

  if (!certificateStatus || !certificateBadges) {
    return;
  }

  const completedMissions = getCompletedMissions();
  certificateBadges.innerHTML = "";

  if (completedMissions.length === missions.length) {
    certificateStatus.textContent = "Congratulations! You completed every mission and unlocked your Safetii Net certificate.";
  } else {
    certificateStatus.textContent = "Complete all 5 missions to unlock your Safetii Net certificate.";
  }

  missions.forEach(function (mission) {
    const isComplete = completedMissions.includes(mission.name);

    const badgeCard = document.createElement("div");
    badgeCard.className = isComplete ? "certificate-badge-card earned" : "certificate-badge-card locked";

    const badgeImage = document.createElement("img");
    badgeImage.src = mission.badge;
    badgeImage.alt = mission.name + " Badge";

    const badgeName = document.createElement("h3");
    badgeName.textContent = mission.name;

    const badgeStatus = document.createElement("p");
    badgeStatus.textContent = isComplete ? "Earned" : "Locked";

    badgeCard.appendChild(badgeImage);
    badgeCard.appendChild(badgeName);
    badgeCard.appendChild(badgeStatus);

    if (!isComplete) {
      badgeCard.addEventListener("click", function () {
        window.location.href = mission.page;
      });
    }

    certificateBadges.appendChild(badgeCard);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  updateProgressDisplay();
  renderHomeSidebarBadges();
  loadBadgeReveal();
  renderCertificatePage();
});
const missions = [
  {
    id: "identity",
    title: "Identity Protector",
    lessonPath: "missions/identity.html",
    badgePath: "assets/Identity Protector Badge.png"
  },
  {
    id: "password",
    title: "Password Safe Keeper",
    lessonPath: "missions/password.html",
    badgePath: "assets/Password Safe Keeper Badge.png"
  },
  {
    id: "phishing",
    title: "Phish Finder",
    lessonPath: "missions/phishing.html",
    badgePath: "assets/Phish Finder Badge.png"
  },
  {
    id: "footprint",
    title: "Digital Footprint Defender",
    lessonPath: "missions/footprint.html",
    badgePath: "assets/Digital Footprint Defender Badge.png"
  },
  {
    id: "responder",
    title: "Cyber Responder",
    lessonPath: "missions/responder.html",
    badgePath: "assets/Cyber Responder Badge.png"
  }
];

function getCompletedMissions() {
  const savedData = localStorage.getItem("safetiiCompletedMissions");

  if (savedData) {
    return JSON.parse(savedData);
  }

  return [];
}

function saveCompletedMissions(completedMissions) {
  localStorage.setItem(
    "safetiiCompletedMissions",
    JSON.stringify(completedMissions)
  );
}

function getMissionById(missionId) {
  return missions.find(function(mission) {
    return mission.id === missionId;
  });
}

function completeMission(missionName) {
  let completedMissions = getCompletedMissions();

  if (!completedMissions.includes(missionName)) {
    completedMissions.push(missionName);
  }

  saveCompletedMissions(completedMissions);
  localStorage.setItem("lastCompletedMission", missionName);

  window.location.href = "../badge.html";
}

function updateProgressDisplay() {
  const completedMissions = getCompletedMissions();
  const completedCount = completedMissions.length;
  const totalMissions = missions.length;
  const percentage = Math.round((completedCount / totalMissions) * 100);

  const progressPercent = document.getElementById("progressPercent");
  const progressCircle = document.querySelector(".progress-circle");
  const progressCount = document.getElementById("progressCount");
  const certificateSection = document.getElementById("certificateSection");

  if (progressPercent) {
    progressPercent.textContent = percentage + "%";
  }

  if (progressCircle) {
    progressCircle.style.background =
      "conic-gradient(#1fd7e8 " + percentage + "%, #eeeeee " + percentage + "%)";
  }

  if (progressCount) {
    progressCount.textContent =
      completedCount + " of " + totalMissions + " missions complete";
  }

  if (certificateSection) {
    if (completedCount === totalMissions) {
      certificateSection.classList.remove("locked");
      certificateSection.classList.add("unlocked");
    } else {
      certificateSection.classList.add("locked");
      certificateSection.classList.remove("unlocked");
    }
  }

  renderBadgeProgress();
}

function renderBadgeProgress() {
  const badgeList = document.getElementById("badgeCascadeList");

  if (!badgeList) {
    return;
  }

  const completedMissions = getCompletedMissions();
  badgeList.innerHTML = "";

  const earnedMissions = missions.filter(function(mission) {
    return completedMissions.includes(mission.id);
  });

  if (earnedMissions.length === 0) {
    badgeList.innerHTML =
      '<a href="missions/identity.html" class="sidebar-badge-empty">' +
      '<img src="assets/Identity Protector Badge.png" alt="Start earning badges" class="sidebar-badge-icon">' +
      '<div>' +
      '<p class="sidebar-badge-title">No badges earned yet</p>' +
      '<p class="sidebar-badge-subtext">Click to start your first mission</p>' +
      '</div>' +
      '</a>';
    return;
  }

  earnedMissions.forEach(function(mission, index) {
    const badgeCard = document.createElement("a");
    badgeCard.href = "certificate.html";
    badgeCard.className = "sidebar-badge-item";
    badgeCard.style.setProperty("--cascade-offset", (index * 18) + "px");

    badgeCard.innerHTML =
      '<img src="' + mission.badgePath + '" alt="' + mission.title + ' badge" class="sidebar-badge-icon">' +
      '<div>' +
      '<p class="sidebar-badge-title">' + mission.title + '</p>' +
      '<p class="sidebar-badge-subtext">Earned!</p>' +
      '</div>';

    badgeList.appendChild(badgeCard);
  });
}

  const completedMissions = getCompletedMissions();

  badgeGrid.innerHTML = "";

  missions.forEach(function(mission) {
    const earned = completedMissions.includes(mission.id);

    const badgeCard = document.createElement("a");
    badgeCard.classList.add("badge-progress-card");

    if (earned) {
      badgeCard.classList.add("earned");
      badgeCard.href = "certificate.html";
    } else {
      badgeCard.classList.add("locked");
      badgeCard.href = mission.lessonPath;
    }

    badgeCard.innerHTML =
      '<img src="' + mission.badgePath + '" alt="' + mission.title + ' badge">' +
      '<h3>' + mission.title + '</h3>' +
      '<p class="badge-status">' + (earned ? "Earned!" : "Click to earn") + '</p>';

    badgeGrid.appendChild(badgeCard);
  });
}

function loadBadgeReveal() {
  const badgeTitle = document.getElementById("badgeTitle");
  const earnedBadgeImg = document.getElementById("earnedBadgeImg");
  const badgeMessage = document.getElementById("badgeMessage");

  if (!badgeTitle || !earnedBadgeImg || !badgeMessage) {
    return;
  }

  const lastCompletedMission = localStorage.getItem("lastCompletedMission");
  const mission = getMissionById(lastCompletedMission);

  if (!mission) {
    badgeTitle.textContent = "Badge Earned!";
    badgeMessage.textContent = "Great job completing your mission!";
    earnedBadgeImg.style.display = "none";
    return;
  }

  badgeTitle.textContent = mission.title + " Badge Earned!";
  earnedBadgeImg.src = mission.badgePath;
  earnedBadgeImg.alt = mission.title + " badge";
  badgeMessage.textContent = "Great job! You completed " + mission.title + ".";
}

function goHome() {
  window.location.href = "index.html";
}

function scrollToQuestionOfDay() {
  const questionSection = document.getElementById("questionOfDay");

  if (questionSection) {
    questionSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

function checkQuestionOfDay(answer) {
  const feedback = document.getElementById("questionFeedback");

  if (!feedback) {
    return;
  }

  if (answer === "correct") {
    feedback.textContent =
      "Correct! Free Robux scams are often phishing tricks. Ignore it and tell a trusted adult.";
  } else {
    feedback.textContent =
      "Careful! Scammers use exciting words like FREE to make you click before you think.";
  }
}

function revealScamOne() {
  const scamBox = document.getElementById("scamRevealOne");

  if (scamBox) {
    scamBox.classList.toggle("hidden");
  }
}

function revealScamTwo() {
  const scamBox = document.getElementById("scamRevealTwo");

  if (scamBox) {
    scamBox.classList.toggle("hidden");
  }
}

function gradePhishingQuiz() {
  const quiz = document.getElementById("phishingQuiz");
  const quizResult = document.getElementById("quizResult");
  const missionCompleteBox = document.getElementById("missionCompleteBox");

  if (!quiz || !quizResult || !missionCompleteBox) {
    return;
  }

  let score = 0;
  const totalQuestions = 5;

  const answers = quiz.querySelectorAll("input[type='radio']:checked");

  if (answers.length < totalQuestions) {
    quizResult.textContent = "Answer all 5 questions before submitting.";
    missionCompleteBox.classList.add("hidden");
    return;
  }

  answers.forEach(function(answer) {
    if (answer.value === "correct") {
      score++;
    }
  });

  const percentage = Math.round((score / totalQuestions) * 100);

  if (percentage >= 80) {
    quizResult.textContent =
      "Great job! You scored " + percentage + "%. You caught the phisher!";
    missionCompleteBox.classList.remove("hidden");
  } else {
    quizResult.textContent =
      "You scored " + percentage + "%. Try again. You need 80% or higher.";
    missionCompleteBox.classList.add("hidden");
  }
}

function renderCertificatePage() {
  const certificateStatus = document.getElementById("certificateStatus");
  const certificateBadgeGrid = document.getElementById("certificateBadgeGrid");

  if (!certificateStatus || !certificateBadgeGrid) {
    return;
  }

  const completedMissions = getCompletedMissions();
  const completedCount = completedMissions.length;
  const allMissionsComplete = completedCount === missions.length;

  if (allMissionsComplete) {
    certificateStatus.innerHTML =
      '<div class="certificate-unlocked-box">' +
        '<h2>Certificate Unlocked!</h2>' +
        '<p>You completed all missions. Next step: take and pass the final quiz to officially earn your certificate.</p>' +
        '<a href="final-quiz.html" class="mission-btn">Take Final Quiz</a>' +
      '</div>';
  } else {
    certificateStatus.innerHTML =
      '<div class="certificate-locked-box">' +
        '<h2>Certificate Locked</h2>' +
        '<p>You have completed ' + completedCount + ' of ' + missions.length + ' missions.</p>' +
        '<p>Click a locked badge below to go to the lesson and earn it.</p>' +
      '</div>';
  }

  certificateBadgeGrid.innerHTML = "";

  missions.forEach(function(mission) {
    const earned = completedMissions.includes(mission.id);

    const card = document.createElement("a");
    card.classList.add("certificate-badge-card");

    if (earned) {
      card.classList.add("earned");
      card.href = "#";
    } else {
      card.classList.add("locked");
      card.href = mission.lessonPath;
    }

    card.innerHTML =
      '<img src="' + mission.badgePath + '" alt="' + mission.title + ' badge">' +
      '<h3>' + mission.title + '</h3>' +
      '<p class="badge-status">' + (earned ? "Earned!" : "Click to earn") + '</p>';

    certificateBadgeGrid.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", function() {
  updateProgressDisplay();
  loadBadgeReveal();
  renderCertificatePage();
});
