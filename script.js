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

const PROFILE_STORAGE_KEY = "safetiiStudentProfile";

const studentAvatars = [
  {
    id: "braided-cyber-hero",
    name: "Braided Cyber Hero",
    emoji: "👩🏾‍💻"
  },
  {
    id: "puff-power-protector",
    name: "Puff Power Protector",
    emoji: "👩🏿‍🚀"
  },
  {
    id: "curly-code-captain",
    name: "Curly Code Captain",
    emoji: "🧑🏽‍💻"
  },
  {
    id: "locs-lock-defender",
    name: "Locs Lock Defender",
    emoji: "🦸🏿‍♀️"
  },
  {
    id: "fade-firewall-hero",
    name: "Fade Firewall Hero",
    emoji: "🦸🏾‍♂️"
  },
  {
    id: "twist-tech-explorer",
    name: "Twist Tech Explorer",
    emoji: "👩🏽‍🔬"
  },
  {
    id: "hijab-cyber-guardian",
    name: "Hijab Cyber Guardian",
    emoji: "🧕🏽"
  },
  {
    id: "ponytail-password-keeper",
    name: "Ponytail Password Keeper",
    emoji: "👩🏻‍💻"
  },
  {
    id: "wavy-web-watcher",
    name: "Wavy Web Watcher",
    emoji: "🧑🏼‍🚀"
  },
  {
    id: "buzz-cut-byte-hero",
    name: "Buzz Cut Byte Hero",
    emoji: "👨🏾‍💻"
  },
  {
    id: "bantu-knot-badge-hunter",
    name: "Bantu Knot Badge Hunter",
    emoji: "🦸🏿"
  },
  {
    id: "space-bun-safety-scout",
    name: "Space Bun Safety Scout",
    emoji: "👩🏽‍🚀"
  }
];

let selectedStudentAvatarId = "";

function getStudentAvatarById(avatarId) {
  return studentAvatars.find(function (avatar) {
    return avatar.id === avatarId;
  });
}

function getStudentProfile() {
  try {
    const savedProfile = JSON.parse(
      localStorage.getItem(PROFILE_STORAGE_KEY) || "null"
    );

    if (
      !savedProfile ||
      typeof savedProfile !== "object"
    ) {
      return null;
    }

    const nickname =
      typeof savedProfile.nickname === "string"
        ? savedProfile.nickname.trim()
        : "";

    const avatar = getStudentAvatarById(
      savedProfile.avatarId
    );

    if (!nickname || !avatar) {
      return null;
    }

    return {
      nickname: nickname,
      avatarId: avatar.id
    };
  } catch (error) {
    return null;
  }
}

function selectAvatar(avatarId) {
  const avatar = getStudentAvatarById(avatarId);

  if (!avatar) {
    return;
  }

  selectedStudentAvatarId = avatar.id;

  const avatarButtons = document.querySelectorAll(
    "[data-avatar-id]"
  );

  avatarButtons.forEach(function (button) {
    const isSelected =
      button.dataset.avatarId === avatar.id;

    button.classList.toggle(
      "selected",
      isSelected
    );

    button.setAttribute(
      "aria-pressed",
      String(isSelected)
    );
  });

  const previewAvatar = document.getElementById(
    "profilePreviewAvatar"
  );

  const previewName = document.getElementById(
    "profilePreviewName"
  );

  if (previewAvatar) {
    previewAvatar.textContent = avatar.emoji;
  }

  if (previewName) {
    previewName.textContent = avatar.name;
  }
}

function renderProfileCreator() {
  const avatarChoices = document.getElementById(
    "avatarChoices"
  );

  if (!avatarChoices) {
    return;
  }

  avatarChoices.innerHTML = "";

  studentAvatars.forEach(function (avatar) {
    const avatarButton =
      document.createElement("button");

    avatarButton.type = "button";
    avatarButton.className = "avatar-choice";
    avatarButton.dataset.avatarId = avatar.id;

    avatarButton.setAttribute(
      "aria-pressed",
      "false"
    );

    const avatarEmoji =
      document.createElement("span");

    avatarEmoji.className =
      "avatar-choice-emoji";

    avatarEmoji.setAttribute(
      "aria-hidden",
      "true"
    );

    avatarEmoji.textContent = avatar.emoji;

    const avatarName =
      document.createElement("span");

    avatarName.className =
      "avatar-choice-name";

    avatarName.textContent = avatar.name;

    avatarButton.appendChild(avatarEmoji);
    avatarButton.appendChild(avatarName);

    avatarButton.addEventListener(
      "click",
      function () {
        selectAvatar(avatar.id);
      }
    );

    avatarChoices.appendChild(avatarButton);
  });

  const savedProfile = getStudentProfile();

  const nicknameInput = document.getElementById(
    "studentNickname"
  );

  if (nicknameInput) {
    nicknameInput.value = savedProfile
      ? savedProfile.nickname
      : "";
  }

  selectAvatar(
    savedProfile
      ? savedProfile.avatarId
      : studentAvatars[0].id
  );
}

function saveStudentProfile() {
  const nicknameInput = document.getElementById(
    "studentNickname"
  );

  const profileStatus = document.getElementById(
    "profileStatus"
  );

  if (!nicknameInput) {
    return;
  }

  const nickname = nicknameInput.value.trim();

  const selectedAvatar = getStudentAvatarById(
    selectedStudentAvatarId
  );

  if (nickname.length < 2) {
    if (profileStatus) {
      profileStatus.textContent =
        "Enter a nickname with at least 2 characters.";

      profileStatus.className =
        "profile-status error";
    }

    nicknameInput.focus();
    return;
  }

  if (!selectedAvatar) {
    if (profileStatus) {
      profileStatus.textContent =
        "Choose a cyber hero before saving.";

      profileStatus.className =
        "profile-status error";
    }

    return;
  }

  const profile = {
    nickname: nickname,
    avatarId: selectedAvatar.id
  };

  localStorage.setItem(
    PROFILE_STORAGE_KEY,
    JSON.stringify(profile)
  );

  if (profileStatus) {
    profileStatus.textContent = "Profile saved!";

    profileStatus.className =
      "profile-status success";
  }

  renderStudentProfile();
  closeProfileModal();
}

function renderStudentProfile() {
  const profileAvatar = document.getElementById(
    "studentProfileAvatar"
  );

  const profileNickname = document.getElementById(
    "studentProfileNickname"
  );

  const profileRole = document.getElementById(
    "studentProfileRole"
  );

  const openProfileButton = document.getElementById(
    "openProfileButton"
  );

  if (
    !profileAvatar ||
    !profileNickname ||
    !profileRole ||
    !openProfileButton
  ) {
    return;
  }

  const savedProfile = getStudentProfile();

  if (!savedProfile) {
    profileAvatar.textContent = "🛡️";

    profileNickname.textContent =
      "Create Your Profile";

    profileRole.textContent =
      "Choose a nickname and cyber hero.";

    openProfileButton.textContent =
      "Choose My Hero";

    return;
  }

  const avatar = getStudentAvatarById(
    savedProfile.avatarId
  );

  profileAvatar.textContent = avatar.emoji;
  profileNickname.textContent =
    savedProfile.nickname;
  profileRole.textContent = avatar.name;

  openProfileButton.textContent =
    "Edit Profile";
}

function openProfileModal() {
  const profileModal = document.getElementById(
    "profileModal"
  );

  const nicknameInput = document.getElementById(
    "studentNickname"
  );

  const profileStatus = document.getElementById(
    "profileStatus"
  );

  if (!profileModal) {
    return;
  }

  const savedProfile = getStudentProfile();

  if (nicknameInput) {
    nicknameInput.value = savedProfile
      ? savedProfile.nickname
      : "";
  }

  selectAvatar(
    savedProfile
      ? savedProfile.avatarId
      : studentAvatars[0].id
  );

  if (profileStatus) {
    profileStatus.textContent = "";
    profileStatus.className = "profile-status";
  }

  profileModal.hidden = false;

  document.body.classList.add(
    "profile-modal-open"
  );

  if (nicknameInput) {
    nicknameInput.focus();
  }
}

function closeProfileModal() {
  const profileModal = document.getElementById(
    "profileModal"
  );

  if (!profileModal) {
    return;
  }

  profileModal.hidden = true;

  document.body.classList.remove(
    "profile-modal-open"
  );
}

function initializeStudentProfile() {
  const profileForm = document.getElementById(
    "studentProfileForm"
  );

  const openProfileButton = document.getElementById(
    "openProfileButton"
  );

  const closeProfileButton = document.getElementById(
    "closeProfileButton"
  );

  const profileBackdrop = document.querySelector(
    "[data-close-profile-modal]"
  );

  if (!profileForm && !openProfileButton) {
    return;
  }

  renderProfileCreator();
  renderStudentProfile();

  if (profileForm) {
    profileForm.addEventListener(
      "submit",
      function (event) {
        event.preventDefault();
        saveStudentProfile();
      }
    );
  }

  if (openProfileButton) {
    openProfileButton.addEventListener(
      "click",
      openProfileModal
    );
  }

  if (closeProfileButton) {
    closeProfileButton.addEventListener(
      "click",
      closeProfileModal
    );
  }

  if (profileBackdrop) {
    profileBackdrop.addEventListener(
      "click",
      closeProfileModal
    );
  }

  document.addEventListener(
    "keydown",
    function (event) {
      if (event.key === "Escape") {
        closeProfileModal();
      }
    }
  );
}

function getMissionById(value) {
  return missions.find(function (mission) {
    return mission.id === value || mission.name === value;
  });
}

function normalizeCompletedMission(value) {
  const mission = getMissionById(value);
  return mission ? mission.id : null;
}

function getCompletedMissions() {
  try {
    const newSavedMissions = JSON.parse(
      localStorage.getItem("safetiiCompletedMissions") || "[]"
    );

    const oldSavedMissions = JSON.parse(
      localStorage.getItem("completedMissions") || "[]"
    );

    const combinedMissions = [];

    if (Array.isArray(newSavedMissions)) {
      combinedMissions.push(...newSavedMissions);
    }

    if (Array.isArray(oldSavedMissions)) {
      combinedMissions.push(...oldSavedMissions);
    }

    const cleanedMissions = combinedMissions
      .map(normalizeCompletedMission)
      .filter(function (missionId, index, list) {
        return missionId && list.indexOf(missionId) === index;
      });

    localStorage.setItem(
      "safetiiCompletedMissions",
      JSON.stringify(cleanedMissions)
    );

    return cleanedMissions;
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
    "safetiiCompletedMissions",
    JSON.stringify(cleanedMissions)
  );
}

function completeMission(missionValue) {
  const mission = getMissionById(missionValue);

  if (!mission) {
    return;
  }

  const completedMissions = getCompletedMissions();

  if (!completedMissions.includes(mission.id)) {
    completedMissions.push(mission.id);
  }

  saveCompletedMissions(completedMissions);

  localStorage.setItem(
    "lastCompletedMission",
    mission.id
  );

  window.location.href =
    "/badge.html?mission=" +
    encodeURIComponent(mission.id);
}

function updateProgressDisplay() {
  const completedMissions = getCompletedMissions();
  const completedCount = completedMissions.length;
  const totalMissions = missions.length;

  const percentage = Math.round(
    (completedCount / totalMissions) * 100
  );

  const completedMissionCount = document.getElementById(
    "completedMissionCount"
  );

  const homeProgressFill = document.getElementById(
    "homeProgressFill"
  );

  const homeProgressMessage = document.getElementById(
    "homeProgressMessage"
  );

  if (completedMissionCount) {
    completedMissionCount.textContent = completedCount;
  }

  if (homeProgressFill) {
    homeProgressFill.style.width = percentage + "%";
  }

  if (homeProgressMessage) {
    if (completedCount === 0) {
      homeProgressMessage.textContent =
        "Complete your first mission to begin earning badges.";
    } else if (completedCount < totalMissions) {
      const remaining = totalMissions - completedCount;

      homeProgressMessage.textContent =
        remaining +
        (remaining === 1
          ? " mission remains."
          : " missions remain.");
    } else {
      homeProgressMessage.textContent =
        "All missions complete! Your certificate is unlocked.";
    }
  }

  const olderProgressText = document.getElementById(
    "progressText"
  );

  const olderProgressFill = document.getElementById(
    "progressFill"
  );

  if (olderProgressText) {
    olderProgressText.textContent =
      completedCount +
      " of " +
      totalMissions +
      " missions complete";
  }

  if (olderProgressFill) {
    olderProgressFill.style.width = percentage + "%";
  }
}

function renderHomeSidebarBadges() {
  const badgeContainer = document.getElementById(
    "homeSidebarBadges"
  );

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
  const parameters = new URLSearchParams(
    window.location.search
  );

  const requestedMission =
    parameters.get("mission") ||
    localStorage.getItem("lastCompletedMission");

  const mission = getMissionById(requestedMission);

  const newBadgeTitle = document.getElementById(
    "earnedBadgeTitle"
  );

  const newBadgeImage = document.getElementById(
    "earnedBadgeImage"
  );

  const newBadgeMessage = document.getElementById(
    "earnedBadgeMessage"
  );

  const olderBadgeTitle = document.getElementById(
    "badgeTitle"
  );

  const olderBadgeImage = document.getElementById(
    "earnedBadgeImg"
  );

  const olderBadgeMessage = document.getElementById(
    "badgeMessage"
  );

  if (!mission) {
    if (newBadgeTitle) {
      newBadgeTitle.textContent = "Badge Earned!";
    }

    if (olderBadgeTitle) {
      olderBadgeTitle.textContent = "Badge Earned!";
    }

    return;
  }

  if (newBadgeTitle) {
    newBadgeTitle.textContent =
      mission.name + " Badge Earned!";
  }

  if (newBadgeImage) {
    newBadgeImage.src = mission.badge;
    newBadgeImage.alt = mission.name + " badge";
  }

  if (newBadgeMessage) {
    newBadgeMessage.textContent =
      "Great work! Your badge has been added to your collection.";
  }

  if (olderBadgeTitle) {
    olderBadgeTitle.textContent =
      mission.name + " Badge Earned!";
  }

  if (olderBadgeImage) {
    olderBadgeImage.src = mission.badge;
    olderBadgeImage.alt = mission.name + " badge";
    olderBadgeImage.style.display = "block";
  }

  if (olderBadgeMessage) {
    olderBadgeMessage.textContent =
      "Great job! You completed " + mission.name + ".";
  }
}

function goHome() {
  window.location.href = "/index.html";
}

function renderCertificatePage() {
  const newBadgeContainer = document.getElementById(
    "certificateBadges"
  );

  const olderBadgeContainer = document.getElementById(
    "certificateBadgeGrid"
  );

  const badgeContainer =
    newBadgeContainer || olderBadgeContainer;

  if (!badgeContainer) {
    return;
  }

  const completedMissions = getCompletedMissions();
  const completedCount = completedMissions.length;
  const totalMissions = missions.length;

  const progressPercentage = Math.round(
    (completedCount / totalMissions) * 100
  );

  const certificateUnlocked =
    completedCount === totalMissions;

  const certificateStatus = document.getElementById(
    "certificateStatus"
  );

  const certificateProgressCount =
    document.getElementById(
      "certificateProgressCount"
    );

  const certificateProgressFill =
    document.getElementById(
      "certificateProgressFill"
    );

  const unlockedCertificate = document.getElementById(
    "unlockedCertificate"
  );

  const printCertificateButton =
    document.getElementById(
      "printCertificateButton"
    );

  if (certificateStatus) {
    certificateStatus.textContent = certificateUnlocked
      ? "Congratulations! You completed every mission and unlocked your certificate."
      : "Complete all five missions to unlock your certificate.";
  }

  if (certificateProgressCount) {
    certificateProgressCount.textContent =
      completedCount +
      " of " +
      totalMissions +
      " missions complete";
  }

  if (certificateProgressFill) {
    certificateProgressFill.style.width =
      progressPercentage + "%";
  }

  if (unlockedCertificate) {
    unlockedCertificate.hidden = !certificateUnlocked;
  }

  if (printCertificateButton) {
    printCertificateButton.hidden = !certificateUnlocked;
  }

  badgeContainer.innerHTML = "";

  missions.forEach(function (mission) {
    const isCompleted = completedMissions.includes(
      mission.id
    );

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
  const questionSection = document.getElementById(
    "questionOfDay"
  );

  if (questionSection) {
    questionSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

function checkQuestionOfDay(answer) {
  const feedback = document.getElementById(
    "questionFeedback"
  );

  if (!feedback) {
    return;
  }

  if (answer === "correct") {
    feedback.textContent =
      "Correct! Free Robux scams are often phishing tricks. Ignore the message and tell a trusted adult.";

    feedback.classList.add("correct");
    feedback.classList.remove("incorrect");
  } else {
    feedback.textContent =
      "Careful! Scammers use exciting words like FREE to make you click before you think.";

    feedback.classList.add("incorrect");
    feedback.classList.remove("correct");
  }
}

function revealScamOne() {
  const scamBox = document.getElementById(
    "scamRevealOne"
  );

  if (scamBox) {
    scamBox.classList.toggle("hidden");
  }
}

function revealScamTwo() {
  const scamBox = document.getElementById(
    "scamRevealTwo"
  );

  if (scamBox) {
    scamBox.classList.toggle("hidden");
  }
}

function gradePhishingQuiz() {
  const quiz = document.getElementById(
    "phishingQuiz"
  );

  const quizResult = document.getElementById(
    "quizResult"
  );

  const missionCompleteBox = document.getElementById(
    "missionCompleteBox"
  );

  if (!quiz || !quizResult || !missionCompleteBox) {
    return;
  }

  const totalQuestions = 5;

  const selectedAnswers = quiz.querySelectorAll(
    'input[type="radio"]:checked'
  );

  if (selectedAnswers.length < totalQuestions) {
    quizResult.textContent =
      "Answer all 5 questions before submitting.";

    quizResult.classList.remove("passed");
    quizResult.classList.add("failed");

    missionCompleteBox.classList.add("hidden");
    return;
  }

  let score = 0;

  selectedAnswers.forEach(function (answer) {
    if (answer.value === "correct") {
      score += 1;
    }
  });

  const percentage = Math.round(
    (score / totalQuestions) * 100
  );

  if (percentage >= 80) {
    quizResult.textContent =
      "Great job! You scored " +
      percentage +
      "%. You caught the phisher!";

    quizResult.classList.add("passed");
    quizResult.classList.remove("failed");

    missionCompleteBox.classList.remove("hidden");
  } else {
    quizResult.textContent =
      "You scored " +
      percentage +
      "%. Try again. You need 80% or higher.";

    quizResult.classList.add("failed");
    quizResult.classList.remove("passed");

    missionCompleteBox.classList.add("hidden");
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

document.addEventListener(
  "DOMContentLoaded",
  function () {
    updateProgressDisplay();
    renderHomeSidebarBadges();
    loadBadgeReveal();
    renderCertificatePage();
    initializePrintButton();
  }
);
