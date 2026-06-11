let completedMissions = 0;
const totalMissions = 5;
let completedList = [];

function completeMission(missionNumber) {
  if (!completedList.includes(missionNumber)) {
    completedList.push(missionNumber);
    completedMissions++;
  }

  const percent = Math.round((completedMissions / totalMissions) * 100);

  document.getElementById("progressText").textContent =
    completedMissions + " of " + totalMissions + " missions complete";

  document.getElementById("circleProgress").textContent = percent + "%";

  alert("Mission complete! Badge unlocked!");
}

function checkAnswer(isCorrect) {
  const result = document.getElementById("practiceResult");

  if (isCorrect) {
    result.textContent = "Correct! Sharing your full name, age, and school is not safe.";
  } else {
    result.textContent = "Try again. That information can help strangers identify you.";
  }
}

function showResult(resultId, isCorrect) {
  const result = document.getElementById(resultId);

  if (isCorrect) {
    result.textContent = "Correct! Great job, Cyber Guardian.";
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
