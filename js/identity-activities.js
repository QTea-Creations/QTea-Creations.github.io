/* -------------------------------------------------------
   HIDDEN STICKERS + POINTS
------------------------------------------------------- */

function getAwardedIdentityStickers() {
  try {
    return JSON.parse(
      localStorage.getItem("identityAwardedStickers") || "[]"
    );
  } catch (error) {
    console.error("Could not read awarded stickers:", error);
    return [];
  }
}

function saveAwardedIdentityStickers(stickers) {
  localStorage.setItem(
    "identityAwardedStickers",
    JSON.stringify(stickers)
  );
}

function updateMissionPointsDisplay() {
  const pointsDisplay = game.byId("missionPoints");

  if (pointsDisplay) {
    pointsDisplay.textContent =
      localStorage.getItem("safetiiPoints") || "0";
  }
}

game.collectSticker = function collectSticker(button) {
  if (!button) {
    return;
  }

  const stickerName = button.dataset.sticker?.trim();

  if (!stickerName) {
    console.error(
      "This sticker is missing its data-sticker name:",
      button
    );
    return;
  }

  /*
    Mark it visually and save it in the mission,
    even if its points were already earned before.
  */
  state.foundStickers.add(stickerName);

  button.classList.add("collected");
  button.textContent = "✨";
  button.disabled = true;

  const awardedStickers =
    getAwardedIdentityStickers();

  const alreadyAwarded =
    awardedStickers.includes(stickerName);

  if (!alreadyAwarded) {
    const stickerPoints = 5;

    const currentPoints = Number(
      localStorage.getItem("safetiiPoints") || "0"
    );

    localStorage.setItem(
      "safetiiPoints",
      String(currentPoints + stickerPoints)
    );

    awardedStickers.push(stickerName);

    saveAwardedIdentityStickers(
      awardedStickers
    );

    game.setMemeTip(
      `You found the ${stickerName} and earned ${stickerPoints} points!`,
      "congrats"
    );
  } else {
    game.setMemeTip(
      `You already collected the ${stickerName}.`,
      "thinking"
    );
  }

  localStorage.setItem(
    "identityStickers",
    JSON.stringify(
      Array.from(state.foundStickers)
    )
  );

  updateMissionPointsDisplay();

  if (
    typeof game.saveIdentityProgress ===
    "function"
  ) {
    game.saveIdentityProgress();
  }

  console.log("Sticker collected:", {
    stickerName,
    alreadyAwarded,
    totalPoints:
      localStorage.getItem("safetiiPoints"),
    awardedStickers
  });
};
