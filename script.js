let completedMissions = 0;
const totalMissions = 5;

function completeMission(missionNumber) {
  completedMissions++;

  if (completedMissions > totalMissions) {
    completedMissions = totalMissions;
  }

  const percent = (completedMissions / totalMissions) * 100;

  document.getElementById("progressText").textContent =
    completedMissions + " missions completed";

  document.getElementById("progressFill").style.width = percent + "%";

  alert("Mission " + missionNumber + " complete! Badge unlocked!");
}
