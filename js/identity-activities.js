
"use strict";

(() => {
  const game = window.IdentityGame;
  const data = game.data;
  const state = game.state;

  game.acceptMission = function acceptMission() {
    game.showSection("exploreZone");

    game.setMemeTip(
      "Explore Identity Island. Click all 6 learning objects to unlock the Safe Username Lab.",
      "welcome"
    );
  };

  game.openLesson = function openLesson(
    objectKey,
    button
  ) {
    const lesson = data.lessons[objectKey];

    const popup = game.byId("lessonPopup");
    const title = game.byId("lessonTitle");
    const text = game.byId("lessonText");
    const counter = game.byId("objectsFound");
    const labButton =
      game.byId("goUsernameLab");

    if (
      !lesson ||
      !popup ||
      !title ||
      !text
    ) {
      console.error(
        "Explore lesson elements are missing."
      );

      return;
    }

    title.textContent = lesson.title;
    text.textContent = lesson.text;

    popup.classList.remove("hidden");

    state.foundObjects.add(objectKey);

    if (button) {
      button.classList.add(
        "discovered",
        "wiggle"
      );

      window.setTimeout(() => {
        button.classList.remove("wiggle");
      }, 600);
    }

    if (counter) {
      counter.textContent =
        String(state.foundObjects.size);
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
        "Open Safe Username Lab 🧪";

      game.setMemeTip(
        "Excellent exploring! The Safe Username Lab is unlocked.",
        "congrats"
      );
    }
  };

  game.closeLessonPopup =
    function closeLessonPopup() {
      const popup =
        game.byId("lessonPopup");

      if (popup) {
        popup.classList.add("hidden");
      }
    };

 game.collectSticker = function collectSticker(button) {
  if (!button) {
    return;
  }

  const stickerName = button.dataset.sticker;

  if (
    !stickerName ||
    state.foundStickers.has(stickerName)
  ) {
    return;
  }

  state.foundStickers.add(stickerName);

  button.classList.add("collected");
  button.textContent = "✨";

  const stickerPointValue = 5;

  const currentPoints = Number(
    localStorage.getItem("safetiiPoints") || "0"
  );

  localStorage.setItem(
    "safetiiPoints",
    String(currentPoints + stickerPointValue)
  );

  localStorage.setItem(
    "identityStickers",
    JSON.stringify(
      Array.from(state.foundStickers)
    )
  );

  if (
    typeof game.saveIdentityProgress ===
    "function"
  ) {
    game.saveIdentityProgress();
  }

  game.setMemeTip(
    `You found the ${stickerName} and earned ${stickerPointValue} points!`,
    "congrats"
  );
};

    game.setMemeTip(
      `You found the ${stickerName}!`,
      "congrats"
    );
  };

  game.openUsernameLab =
    function openUsernameLab() {
      if (state.foundObjects.size < 6) {
        game.setMemeTip(
          `Find all 6 learning objects first. You found ${state.foundObjects.size} out of 6.`,
          "thinking"
        );

        return;
      }

      game.showSection("usernameZone");

      game.setMemeTip(
        "Generate a username, then decide whether it is safe or unsafe.",
        "welcome"
      );
    };

  game.generateUsername =
    function generateUsername() {
      const display =
        game.byId("generatedUsername");

      const checklist =
        game.byId("usernameChecklist");

      const finishButton =
        game.byId("approveUsername");

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

      const words = data.usernameWords;

      const safePatterns = [
        () =>
          `${game.randomItem(words.colors)}${game.randomItem(words.animals)}${game.randomItem(words.powers)}`,

        () =>
          `${game.randomItem(words.traits)}${game.randomItem(words.animals)}${game.randomItem(words.powers)}`,

        () =>
          `${game.randomItem(words.colors)}${game.randomItem(words.traits)}${game.randomItem(words.animals)}`,

        () =>
          `${game.randomItem(words.powers)}${game.randomItem(words.animals)}${game.randomItem(words.traits)}`
      ];

      state.generatedUsernameIsSafe =
        Math.random() > 0.33;

      if (state.generatedUsernameIsSafe) {
        state.generatedUsername =
          game.randomItem(safePatterns)();

        state.generatedUsernameReason =
          "This username does not reveal a real name, birthday, school, address, phone number, or location.";
      } else {
        const unsafeExample =
          game.randomItem(
            data.unsafeUsernames
          );

        state.generatedUsername =
          unsafeExample.username;

        state.generatedUsernameReason =
          unsafeExample.reason;
      }

      state.usernameAwaitingApproval = true;

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
            ✅ Safe Username
          </button>

          <button
            class="button username-safety-choice unsafe-choice"
            type="button"
            data-choice="unsafe"
          >
            ⚠️ Unsafe Username
          </button>
        </div>
      `;

      finishButton.classList.add("hidden");

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
      if (!state.usernameAwaitingApproval) {
        return;
      }

      const checklist =
        game.byId("usernameChecklist");

      const finishButton =
        game.byId("approveUsername");

      if (!checklist || !finishButton) {
        return;
      }

      const correctChoice =
        state.generatedUsernameIsSafe
          ? "safe"
          : "unsafe";

      if (choice === correctChoice) {
        checklist.innerHTML = `
          <div class="scan-result safe-scan">
            <span>✅</span>

            <p>
              <strong>Correct!</strong><br>
              ${state.generatedUsernameReason}
            </p>
          </div>
        `;

        finishButton.classList.remove(
          "hidden"
        );

        game.setMemeTip(
          state.generatedUsernameIsSafe
            ? "Correct! This username protects the user’s identity."
            : "Correct! This username reveals personal clues and should not be used.",
          "congrats"
        );

        return;
      }

      button.classList.add("shake");

      window.setTimeout(() => {
        button.classList.remove("shake");
      }, 700);

      game.setMemeTip(
        "Good guess! Look again for a name, birthday, school, location, or contact information.",
        "wrong"
      );
    };

  game.finishUsernameScan =
    function finishUsernameScan() {
      if (!state.usernameAwaitingApproval) {
        return;
      }

      state.usernameAwaitingApproval = false;
      state.usernamesChecked += 1;

      const counter =
        game.byId("usernamesChecked");

      const finishButton =
        game.byId("approveUsername");

      const backpackButton =
        game.byId("goBackpackRescue");

      if (counter) {
        counter.textContent =
          String(state.usernamesChecked);
      }

      if (finishButton) {
        finishButton.classList.add("hidden");
      }

      if (
        state.usernamesChecked >= 3 &&
        backpackButton
      ) {
        backpackButton.disabled = false;

        backpackButton.classList.remove(
          "locked-action"
        );

        backpackButton.textContent =
          "Start Backpack Rescue 🎒";

        game.setMemeTip(
          "Three scans complete! Backpack Rescue is unlocked.",
          "congrats"
        );

        return;
      }

      game.setMemeTip(
        `Great scan! You completed ${state.usernamesChecked} out of 3.`,
        "congrats"
      );
    };

  game.startBackpackRescue =
    function startBackpackRescue() {
      if (state.usernamesChecked < 3) {
        game.setMemeTip(
          `Complete 3 username scans first. You completed ${state.usernamesChecked}.`,
          "thinking"
        );

        return;
      }

      game.showSection("practiceZone");
      game.loadPractice();

      game.setMemeTip(
        "Drag each item into the Share Zone or Protect Zone.",
        "thinking"
      );
    };

  game.loadPractice =
    function loadPractice() {
      const current =
        data.practiceQuestions[
          state.practiceIndex
        ];

      const text =
        game.byId("sortItemText");

      const feedback =
        game.byId("practiceFeedback");

      const card =
        game.byId("dragItemCard");

      const counter =
        game.byId("practiceCorrect");

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

      text.textContent = current.text;

      feedback.textContent = "";
      feedback.style.background =
        "transparent";

      card.classList.remove(
        "shake",
        "correct-glow",
        "slide-away"
      );

      if (counter) {
        counter.textContent =
          String(state.practiceCorrect);
      }

      state.practiceAnswered = false;
    };

  game.answerPractice =
    function answerPractice(
      choice,
      target
    ) {
      if (state.practiceAnswered) {
        return;
      }

      const current =
        data.practiceQuestions[
          state.practiceIndex
        ];

      const feedback =
        game.byId("practiceFeedback");

      const card =
        game.byId("dragItemCard");

      const counter =
        game.byId("practiceCorrect");

      if (!current || !feedback || !card) {
        return;
      }

      if (choice !== current.answer) {
        feedback.textContent =
          `Good guess! ${current.explanation}`;

        feedback.style.background =
          "#fff3d4";

        card.classList.add("shake");

        if (target) {
          target.classList.add("shake");
        }

        window.setTimeout(() => {
          card.classList.remove("shake");

          if (target) {
            target.classList.remove(
              "shake"
            );
          }
        }, 700);

        game.setMemeTip(
          "Good guess! Try the other zone.",
          "wrong"
        );

        return;
      }

      state.practiceAnswered = true;
      state.practiceCorrect += 1;

      if (counter) {
        counter.textContent =
          String(state.practiceCorrect);
      }

      feedback.textContent =
        `🎉 Correct! ${current.explanation}`;

      feedback.style.background =
        "#e9fff3";

      card.classList.add("correct-glow");

      game.setMemeTip(
        "Great sorting!",
        "congrats"
      );

      window.setTimeout(() => {
        card.classList.add("slide-away");
      }, 350);

      window.setTimeout(() => {
        state.practiceIndex += 1;

        if (
          state.practiceIndex >=
          data.practiceQuestions.length
        ) {
          game.showSection(
            "identityCardZone"
          );

          game.loadIdentityProfile();

          game.setMemeTip(
            "Backpack Rescue complete! Now repair five unsafe usernames.",
            "congrats"
          );

          return;
        }

        game.loadPractice();
      }, 900);
    };
})();
