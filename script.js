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

  document.getElementById("progressFill").style.width = percent + "%";

  document.getElementById("circleProgress").textContent = percent + "%";

  alert("Mission complete! Badge unlocked!");
}
