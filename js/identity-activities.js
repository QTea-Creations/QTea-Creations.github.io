"use strict";

/* =========================================================
   SAFETII NET — IDENTITY ISLAND
   Explore, Meme Help, Stickers, Username Lab,
   and Backpack Rescue
========================================================= */

(() => {
  const game = window.IdentityGame;

  if (!game || !game.data || !game.state) {
    console.error(
      "identity-activities.js could not start. IdentityGame data or state is missing."
    );
    return;
  }

  const data = game.data;
  const state = game.state;

  const STICKER_POINTS = 5;
  const AWARDED_STICKERS_KEY =
    "identityAwardedStickers";

  function readAwardedStickers() {
    try {
      const stored = JSON.parse(
        localStorage.getItem(
          AWARDED_STICKERS_KEY
        ) || "[]"
      );

      return Array.isArray(stored)
        ? stored
        : [];
    } catch (error) {
      console.error(
        "Could not read awarded stickers:",
        error
      );

      return [];
    }
  }

  function saveAwardedStickers(stickers) {
    localStorage.setItem(
      AWARDED_STICKERS_KEY,
      JSON.stringify(stickers)
    );
  }

  function getTotalPoints() {
    const storedPoints = Number(
      localStorage.getItem(
        "safetiiPoints"
      ) || "0"
    );

    return Number.isFinite(storedPoints)
      ? storedPoints
      : 0;
  }

  function setTotalPoints(points) {
    localStorage.setItem(
      "safetiiPoints",
      String(Math.max(0, points))
    );

    updateMissionPointsDisplay();
  }

  function updateMissionPointsDisplay() {
    const display =
      game.byId("missionPoints");

    if (display) {
      display.textContent =
        String(getTotalPoints());
    }
  }

  function setGenerateButtonEnabled(enabled) {
    const button =
      game.byId("generateUsername");

    if (!button) {
      return;
    }

    button.disabled = !enabled;

    button.classList.toggle(
      "locked-action",
      !enabled
    );

    button.setAttribute(
      "aria-disabled",
      String(!enabled)
    );
  }

  game.updateMissionPointsDisplay =
    updateMissionPointsDisplay;

  /* -------------------------------------------------------
     MISSION INTRODUCTION
  ------------------------------------------------------- */

  game.acceptMission =
    function acceptMission() {
      game.showSection(
        "exploreZone"
      );

      game.setMemeTip(
        "Explore Identity Island. Select all six learning objects to unlock the Safe Username Lab.",
        "welcome"
      );

      if (
        typeof game.saveIdentityProgress ===
        "function"
      ) {
        game.saveIdentityProgress();
      }
    };

  /* -------------------------------------------------------
     STEP 1 — EXPLORE
  ------------------------------------------------------- */

  game.openLesson =
    function openLesson(
      objectKey,
      button
    ) {
      const lesson =
        data.lessons?.[objectKey];

      const popup =
        game.byId("lessonPopup");

      const title =
        game.byId("lessonTitle");

      const text =
        game.byId("lessonText");

      const counter =
        game.byId("objectsFound");

      const labButton =
        game.byId("goUsernameLab");

      if (
        !lesson ||
        !popup ||
        !title ||
        !text
      ) {
        console.error(
          `Could not open lesson: ${objectKey}`
        );
        return;
      }

      title.textContent =
        lesson.title;

      text.textContent =
        lesson.text;

      popup.classList.remove(
        "hidden"
      );

      state.foundObjects.add(
        objectKey
      );

      if (button) {
        button.classList.add(
          "discovered",
          "wiggle"
        );

        window.setTimeout(() => {
          button.classList.remove(
            "wiggle"
          );
        }, 600);
      }

      if (counter) {
        counter.textContent =
          String(
            state.foundObjects.size
          );
      }

      if (
        state.foundObjects.size >= 6 &&
        labButton
      ) {
        labButton.disabled = false;

        labButton.classList.remove(
          "locked-action"
        );

        labButton.textContent =
          "Open Safe Username Lab";

        game.setMemeTip(
          "Excellent exploring! The Safe Username Lab is unlocked.",
          "congrats"
        );
      }

      if (
        typeof game.saveIdentityProgress ===
        "function"
      ) {
        game.saveIdentityProgress();
      }
    };

  game.closeLessonPopup =
    function closeLessonPopup() {
      const popup =
        game.byId("lessonPopup");

      if (popup) {
        popup.classList.add(
          "hidden"
        );
      }
    };

  /* -------------------------------------------------------
     HIDDEN STICKERS AND POINTS
  ------------------------------------------------------- */

  game.collectSticker =
    function collectSticker(button) {
      if (!button) {
        return;
      }

      const stickerName =
        button.dataset.sticker?.trim();

      if (!stickerName) {
        console.error(
          "A sticker is missing its data-sticker value.",
          button
        );
        return;
      }

      /*
        Prevent duplicate clicks during the
        current attempt.
      */
      if (
        state.foundStickers.has(
          stickerName
        )
      ) {
        game.setMemeTip(
          `You already found the ${stickerName}.`,
          "thinking"
        );
        return;
      }

      state.foundStickers.add(
        stickerName
      );

      button.classList.add(
        "collected"
      );

      button.textContent = "✨";
      button.disabled = true;

      const awardedStickers =
        readAwardedStickers();

      const alreadyAwarded =
        awardedStickers.includes(
          stickerName
        );

      if (!alreadyAwarded) {
        const newPoints =
          getTotalPoints() +
          STICKER_POINTS;

        setTotalPoints(newPoints);

        awardedStickers.push(
          stickerName
        );

        saveAwardedStickers(
          awardedStickers
        );

        game.setMemeTip(
          `You found the ${stickerName} and earned ${STICKER_POINTS} points!`,
          "congrats"
        );
      } else {
        updateMissionPointsDisplay();

        game.setMemeTip(
          `You found the ${stickerName} again. Its points were already collected.`,
          "thinking"
        );
      }

      localStorage.setItem(
        "identityStickers",
        JSON.stringify(
          Array.from(
            state.foundStickers
          )
        )
      );

      if (
        typeof game.saveIdentityProgress ===
        "function"
      ) {
        game.saveIdentityProgress();
      }

      console.log(
        "Sticker reward:",
        {
          stickerName,
          alreadyAwarded,
          totalPoints:
            getTotalPoints(),
          awardedStickers
        }
      );
    };

  /* -------------------------------------------------------
     STEP 2 — USERNAME SCANNER
  ------------------------------------------------------- */

  game.openUsernameLab =
    function openUsernameLab() {
      if (
        state.foundObjects.size < 6
      ) {
        game.setMemeTip(
          `Find all six learning objects first. You found ${state.foundObjects.size}.`,
          "thinking"
        );
        return;
      }

      game.showSection(
        "usernameZone"
      );

      setGenerateButtonEnabled(true);

      game.setMemeTip(
        "Generate one username. Decide whether it is safe or unsafe, then finish the scan before generating another.",
        "welcome"
      );
    };

  game.generateUsername =
    function generateUsername() {
      const display =
        game.byId(
          "generatedUsername"
        );

      const checklist =
        game.byId(
          "usernameChecklist"
        );

      const finishButton =
        game.byId(
          "approveUsername"
        );

      if (
        !display ||
        !checklist ||
        !finishButton
      ) {
        console.error(
          "Username Lab elements are missing."
        );
        return;
      }

      /*
        Stop children from generating another
        username before finishing the current scan.
      */
      if (
        state.usernameAwaitingApproval
      ) {
        game.setMemeTip(
          "Finish the current safety scan before generating another username.",
          "thinking"
        );

        setGenerateButtonEnabled(false);
        return;
      }

      const words =
        data.usernameWords;

      if (!words) {
        console.error(
          "usernameWords is missing from identity-data.js."
        );
        return;
      }

      const safePatterns = [
        () =>
          `${game.randomItem(
            words.colors
          )}${game.randomItem(
            words.animals
          )}${game.randomItem(
            words.powers
          )}`,

        () =>
          `${game.randomItem(
            words.traits
          )}${game.randomItem(
            words.animals
          )}${game.randomItem(
            words.powers
          )}`,

        () =>
          `${game.randomItem(
            words.colors
          )}${game.randomItem(
            words.traits
          )}${game.randomItem(
            words.animals
          )}`
      ];

      state.generatedUsernameIsSafe =
        Math.random() > 0.33;

      if (
        state.generatedUsernameIsSafe
      ) {
        const selectedPattern =
          game.randomItem(
            safePatterns
          );

        state.generatedUsername =
          selectedPattern();

        state.generatedUsernameReason =
          "This username uses general interests and does not reveal a real name, birthday, school, address, phone number, or location.";
      } else {
        const examples =
          data.unsafeUsernames || [];

        if (
          examples.length === 0
        ) {
          console.error(
            "unsafeUsernames is missing from identity-data.js."
          );
          return;
        }

        const unsafeExample =
          game.randomItem(examples);

        state.generatedUsername =
          unsafeExample.username;

        state.generatedUsernameReason =
          unsafeExample.reason;
      }

      state.usernameAwaitingApproval =
        true;

      setGenerateButtonEnabled(false);

      display.textContent =
        state.generatedUsername;

      display.classList.remove(
        "username-pop"
      );

      void display.offsetWidth;

      display.classList.add(
        "username-pop"
      );

      checklist.innerHTML = `
        <p>
          Does this username reveal personal information?
        </p>

        <div class="username-decision-buttons">
          <button
            class="button username-safety-choice"
            type="button"
            data-choice="safe"
          >
            Safe Username
          </button>

          <button
            class="button username-safety-choice unsafe-choice"
            type="button"
            data-choice="unsafe"
          >
            Unsafe Username
          </button>
        </div>
      `;

      finishButton.classList.add(
        "hidden"
      );

      checklist
        .querySelectorAll(
          ".username-safety-choice"
        )
        .forEach((button) => {
          button.addEventListener(
            "click",
            () => {
              game.checkUsernameDecision(
                button.dataset.choice,
                button
              );
            }
          );
        });

      game.setMemeTip(
        `Scan ${state.generatedUsername}. Is it safe or unsafe?`,
        "thinking"
      );
    };

  game.checkUsernameDecision =
    function checkUsernameDecision(
      choice,
      button
    ) {
      if (
        !state.usernameAwaitingApproval
      ) {
        return;
      }

      const checklist =
        game.byId(
          "usernameChecklist"
        );

      const finishButton =
        game.byId(
          "approveUsername"
        );

      if (
        !checklist ||
        !finishButton
      ) {
        return;
      }

      const correctChoice =
        state.generatedUsernameIsSafe
          ? "safe"
          : "unsafe";

      if (
        choice === correctChoice
      ) {
        checklist.innerHTML = `
          <div class="scan-result safe-scan">
            <span>Correct!</span>

            <p>
              ${state.generatedUsernameReason}
            </p>
          </div>
        `;

        finishButton.classList.remove(
          "hidden"
        );

        game.setMemeTip(
          state.generatedUsernameIsSafe
            ? "Correct. This username protects the user’s identity."
            : "Correct. This username reveals personal clues and should not be used.",
          "congrats"
        );

        return;
      }

      if (button) {
        button.classList.add(
          "shake"
        );

        window.setTimeout(() => {
          button.classList.remove(
            "shake"
          );
        }, 700);
      }

      game.setMemeTip(
        "Good guess. Look for a real name, birthday, school, address, location, or contact information.",
        "wrong"
      );
    };

  game.finishUsernameScan =
    function finishUsernameScan() {
      if (
        !state.usernameAwaitingApproval
      ) {
        return;
      }

      state.usernameAwaitingApproval =
        false;

      state.usernamesChecked += 1;

      const counter =
        game.byId(
          "usernamesChecked"
        );

      const finishButton =
        game.byId(
          "approveUsername"
        );

      const backpackButton =
        game.byId(
          "goBackpackRescue"
        );

      if (counter) {
        counter.textContent =
          String(
            state.usernamesChecked
          );
      }

      if (finishButton) {
        finishButton.classList.add(
          "hidden"
        );
      }

      /*
        The Generate button becomes available
        only after Finish Scan is pressed.
      */
      setGenerateButtonEnabled(
        state.usernamesChecked < 3
      );

      if (
        state.usernamesChecked >= 3
      ) {
        setGenerateButtonEnabled(false);

        if (backpackButton) {
          backpackButton.disabled =
            false;

          backpackButton.classList.remove(
            "locked-action"
          );

          backpackButton.textContent =
            "Start Backpack Rescue";
        }

        game.setMemeTip(
          "Three scans complete! Backpack Rescue is unlocked.",
          "congrats"
        );
      } else {
        game.setMemeTip(
          `Scan ${state.usernamesChecked} of 3 complete. You may generate the next username.`,
          "congrats"
        );
      }

      if (
        typeof game.saveIdentityProgress ===
        "function"
      ) {
        game.saveIdentityProgress();
      }
    };

  /* -------------------------------------------------------
     STEP 3 — BACKPACK RESCUE
  ------------------------------------------------------- */

  game.startBackpackRescue =
    function startBackpackRescue() {
      if (
        state.usernamesChecked < 3
      ) {
        game.setMemeTip(
          `Complete three username scans first. You completed ${state.usernamesChecked}.`,
          "thinking"
        );
        return;
      }

      game.showSection(
        "practiceZone"
      );

      game.loadPractice();

      game.setMemeTip(
        "Drag each item into the Share Zone or Protect Zone.",
        "thinking"
      );
    };

  game.loadPractice =
    function loadPractice() {
      const questions =
        data.practiceQuestions || [];

      if (
        state.practiceIndex >=
        questions.length
      ) {
        game.showSection(
          "identityCardZone"
        );

        if (
          typeof game.loadIdentityProfile ===
          "function"
        ) {
          game.loadIdentityProfile();
        }

        return;
      }

      const current =
        questions[
          state.practiceIndex
        ];

      const text =
        game.byId("sortItemText");

      const feedback =
        game.byId(
          "practiceFeedback"
        );

      const card =
        game.byId("dragItemCard");

      const counter =
        game.byId(
          "practiceCorrect"
        );

      if (
        !current ||
        !text ||
        !feedback ||
        !card
      ) {
        console.error(
          "Backpack Rescue elements are missing."
        );
        return;
      }

      text.textContent =
        current.text;

      feedback.textContent = "";
      feedback.style.background =
        "transparent";
      feedback.style.color = "";

      card.classList.remove(
        "shake",
        "correct-glow",
        "slide-away"
      );

      if (counter) {
        counter.textContent =
          String(
            state.practiceCorrect
          );
      }

      state.practiceAnswered =
        false;
    };

  game.answerPractice =
    function answerPractice(
      choice,
      target
    ) {
      if (
        state.practiceAnswered
      ) {
        return;
      }

      const questions =
        data.practiceQuestions || [];

      const current =
        questions[
          state.practiceIndex
        ];

      const feedback =
        game.byId(
          "practiceFeedback"
        );

      const card =
        game.byId("dragItemCard");

      const counter =
        game.byId(
          "practiceCorrect"
        );

      if (
        !current ||
        !feedback ||
        !card
      ) {
        return;
      }

      if (
        choice !== current.answer
      ) {
        feedback.textContent =
          `Good guess! ${current.explanation}`;

        feedback.style.background =
          "#fff3d4";

        feedback.style.color =
          "#7d4cff";

        card.classList.add(
          "shake"
        );

        if (target) {
          target.classList.add(
            "shake"
          );
        }

        window.setTimeout(() => {
          card.classList.remove(
            "shake"
          );

          if (target) {
            target.classList.remove(
              "shake"
            );
          }
        }, 700);

        game.setMemeTip(
          "Good guess. Try the other zone.",
          "wrong"
        );

        return;
      }

      state.practiceAnswered =
        true;

      state.practiceCorrect += 1;

      if (counter) {
        counter.textContent =
          String(
            state.practiceCorrect
          );
      }

      feedback.textContent =
        `Correct! ${current.explanation}`;

      feedback.style.background =
        "#e9fff3";

      feedback.style.color =
        "#168a52";

      card.classList.add(
        "correct-glow"
      );

      game.setMemeTip(
        "Great sorting!",
        "congrats"
      );

      if (
        typeof game.saveIdentityProgress ===
        "function"
      ) {
        game.saveIdentityProgress();
      }

      window.setTimeout(() => {
        card.classList.add(
          "slide-away"
        );
      }, 350);

      window.setTimeout(() => {
        state.practiceIndex += 1;

        if (
          state.practiceIndex >=
          questions.length
        ) {
          game.showSection(
            "identityCardZone"
          );

          if (
            typeof game.loadIdentityProfile ===
            "function"
          ) {
            game.loadIdentityProfile();
          }

          game.setMemeTip(
            "Backpack Rescue complete! Now repair five unsafe usernames.",
            "congrats"
          );

          if (
            typeof game.saveIdentityProgress ===
            "function"
          ) {
            game.saveIdentityProgress();
          }

          return;
        }

        game.loadPractice();
      }, 900);
    };

  document.addEventListener(
    "DOMContentLoaded",
    updateMissionPointsDisplay
  );

  console.log(
    "Identity Island activities loaded successfully."
  );
})();
