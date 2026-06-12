let completedMissions = 0;
const totalMissions = 5;
let completedList = [];

function completeMission(missionNumber) {
  if (!completedList.includes(missionNumber)) {
    completedList.push(missionNumber);
    completedMissions++;
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
const missions = [
  {
    id: "identity",
    title: "Identity Protector",
    lessonPath: "missions/identity.html",
    badgePath: "assets/badges/identity-badge.png"
  },
  {
    id: "password",
    title: "Password Safe Keeper",
    lessonPath: "missions/password.html",
    badgePath: "assets/badges/password-badge.png"
  },
  {
    id: "phishing",
    title: "Phish Finder",
    lessonPath: "missions/phishing.html",
    badgePath: "assets/badges/phishing-badge.png"
  },
  {
    id: "footprint",
    title: "Digital Footprint Defender",
    lessonPath: "missions/footprint.html",
    badgePath: "assets/badges/footprint-badge.png"
  },
  {
    id: "responder",
    title: "Cyber Responder",
    lessonPath: "missions/responder.html",
    badgePath: "assets/badges/responder-badge.png"
  }
];
  const percent = Math.round((completedMissions / totalMissions) * 100);

  document.getElementById("progressText").textContent =
    completedMissions + " of " + totalMissions + " missions complete";

  document.getElementById("circleProgress").textContent = percent + "%";

  alert("Mission complete! Badge unlocked!");
}
function getMissionById(missionId) {
  return missions.find(function(mission) {
    return mission.id === missionId;
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
function checkAnswer(isCorrect) {
  const result = document.getElementById("practiceResult");

  if (isCorrect) {
    result.textContent = "Correct! Sharing your full name, age, and school is not safe.";
  } else {
    result.textContent = "Try again. That information can help strangers identify you.";
  }
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
    progressCount.textContent = completedCount + " of " + totalMissions + " missions complete";
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

function showResult(resultId, isCorrect) {
  const result = document.getElementById(resultId);

  if (isCorrect) {
    result.textContent = "Correct! Great job, Cyber Super Hero.";
  } else {
    result.textContent = "Try again. Think about the safest choice.";
  }
}

function quizAnswer(isCorrect) {
  const result = document.getElementById("quizResult");

  if (isCorrect) {
    result.textContent = "Correct! Always tell a trusted adult.";
  } else {
    result.textContent = "Try again. You should not share private information online.";
  }
}

function checkQuestionOfDay(answer) {
  const feedback = document.getElementById("questionFeedback");

  if (!feedback) {
    return;
  }

  if (answer === "correct") {
    feedback.textContent = "Correct! Free Robux scams are often phishing tricks. Ignore it and tell a trusted adult.";
  } else {
    feedback.textContent = "Careful! Scammers use exciting words like FREE to make you click before you think.";
  }
}

function renderBadgeProgress() {
  const badgeGrid = document.getElementById("badgeProgressGrid");

  if (!badgeGrid) {
    return;
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

function showPhishFlag() {
  const feedback = document.getElementById("phishFlagFeedback");

  if (!feedback) {
    return;
  }

  feedback.textContent = "Good catch! The link is suspicious because it does not look like a real delivery company website.";
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
    quizResult.textContent = "Great job! You scored " + percentage + "%. You caught the phisher!";
    missionCompleteBox.classList.remove("hidden");
  } else {
    quizResult.textContent = "You scored " + percentage + "%. Try again. You need 80% or higher.";
    missionCompleteBox.classList.add("hidden");
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

    document.addEventListener("DOMContentLoaded", function() {
  updateProgressDisplay();
  loadBadgeReveal();
  renderCertificatePage();
});

    card.innerHTML =
      '<img src="' + mission.badgePath + '" alt="' + mission.title + ' badge">' +
      '<h3>' + mission.title + '</h3>' +
      '<p class="badge-status">' + (earned ? "Earned!" : "Click to earn") + '</p>';

    certificateBadgeGrid.appendChild(card);
  });
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
document.addEventListener("DOMContentLoaded", function() {
  updateProgressDisplay();
  loadBadgeReveal();
});
