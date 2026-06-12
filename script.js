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
