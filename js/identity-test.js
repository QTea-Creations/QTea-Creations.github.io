
"use strict";

(() => {
  const game = window.IdentityGame;
  const data = game.data;
  const state = game.state;

  game.loadIdentityProfile =
    function loadIdentityProfile() {
      const profile =
        data.identityProfiles[
          state.identityProfileIndex
        ];

      if (!profile) {
        game.unlockFinalTest();
        return;
      }

      state.selectedRepairBlocks = [];
      state.profileRepairComplete = false;

      const card =
        game.byId("identityFlipCard");

      const cardInner =
        game.byId("identityCardInner");

      if (card) {
        card.setAttribute(
          "aria-pressed",
          "false"
        );
      }

      if (cardInner) {
        cardInner.classList.remove(
          "is-flipped"
        );
      }

      game.byId("profileAvatar").textContent =
        profile.avatar;

      game.byId("profileName").textContent =
        profile.name;

      game.byId("profileBirthday").textContent =
        profile.birthday;

      game.byId("profileSchool").textContent =
        profile.school;

      game.byId("profileLocation").textContent =
        profile.location;

      game.byId(
        "profileUnsafeUsername"
      ).textContent =
        profile.unsafeUsername;

      const interestList =
        game.byId("profileInterestList");

      interestList.innerHTML =
        profile.interests
          .map(
            (interest) => `
              <span class="interest-chip">
                ${interest.emoji}
                ${interest.word}
              </span>
            `
          )
          .join("");

      game.buildRepairBlockBank(profile);
      game.updateRepairBuilder();
      game.clearRepairFeedback();

      game.setMemeTip(
        `Study ${profile.name}'s example ID. Flip the card to find safe interests.`,
        "thinking"
      );
    };

  game.buildRepairBlockBank =
    function buildRepairBlockBank(profile) {
      const bank =
        game.byId("wordBlockBank");

      if (!bank) {
        return;
      }

      const safeBlocks =
        profile.interests.map(
          (interest) => ({
            word: interest.word,
            label:
              `${interest.emoji} ${interest.word}`,
            safe: true,
            reason: "safe interest"
          })
        );

      const unsafeBlocks =
        profile.privateBlocks.map(
          (block) => ({
            word: block.word,
            label: `🔎 ${block.word}`,
            safe: false,
            reason: block.reason
          })
        );

      const mixedBlocks =
        game.shuffleItems([
          ...safeBlocks,
          ...unsafeBlocks
        ]);

      bank.innerHTML = "";

      mixedBlocks.forEach(
        (block, index) => {
          const button =
            document.createElement("button");

          button.type = "button";
          button.draggable = true;

          button.className =
            "repair-word-block";

          button.dataset.word =
            block.word;

          button.dataset.safe =
            String(block.safe);

          button.dataset.reason =
            block.reason;

          button.dataset.blockId =
            `repair-${state.identityProfileIndex}-${index}`;

          button.textContent =
            block.label;

          button.addEventListener(
            "dragstart",
            (event) => {
              event.dataTransfer.setData(
                "text/plain",
                button.dataset.blockId
              );

              event.dataTransfer.effectAllowed =
                "move";

              button.classList.add(
                "is-dragging"
              );
            }
          );

          button.addEventListener(
            "dragend",
            () => {
              button.classList.remove(
                "is-dragging"
              );
            }
          );

          button.addEventListener(
            "click",
            () => {
              game.addRepairBlock(
                button
              );
            }
          );

          bank.appendChild(button);
        }
      );
    };

  game.addRepairBlock =
    function addRepairBlock(button) {
      if (
        !button ||
        state.profileRepairComplete
      ) {
        return;
      }

      if (
        state.selectedRepairBlocks.length >= 3
      ) {
        game.setMemeTip(
          "The builder already has three blocks. Remove one first.",
          "thinking"
        );

        return;
      }

      const blockId =
        button.dataset.blockId;

      const alreadySelected =
        state.selectedRepairBlocks.some(
          (block) =>
            block.blockId === blockId
        );

      if (alreadySelected) {
        return;
      }

      state.selectedRepairBlocks.push({
        blockId,
        word: button.dataset.word,
        safe:
          button.dataset.safe === "true",
        reason: button.dataset.reason
      });

      button.disabled = true;

      button.classList.add(
        "used-block"
      );

      game.updateRepairBuilder();
    };

  game.removeRepairBlock =
    function removeRepairBlock(blockId) {
      state.selectedRepairBlocks =
        state.selectedRepairBlocks.filter(
          (block) =>
            block.blockId !== blockId
        );

      const original =
        document.querySelector(
          `[data-block-id="${blockId}"]`
        );

      if (original) {
        original.disabled = false;

        original.classList.remove(
          "used-block"
        );
      }

      game.updateRepairBuilder();
    };

  game.clearRepairBuilder =
    function clearRepairBuilder() {
      state.selectedRepairBlocks = [];

      document
        .querySelectorAll(
          ".repair-word-block"
        )
        .forEach((block) => {
          block.disabled = false;

          block.classList.remove(
            "used-block"
          );
        });

      game.updateRepairBuilder();
      game.clearRepairFeedback();

      game.setMemeTip(
        "Builder cleared. Choose three safe interest blocks.",
        "thinking"
      );
    };

  game.updateRepairBuilder =
    function updateRepairBuilder() {
      const selectedArea =
        game.byId(
          "selectedUsernameBlocks"
        );

      const preview =
        game.byId(
          "repairedUsernamePreview"
        );

      const message =
        game.byId("buildZoneMessage");

      const checkButton =
        game.byId(
          "checkRepairedUsername"
        );

      if (
        !selectedArea ||
        !preview ||
        !message ||
        !checkButton
      ) {
        return;
      }

      selectedArea.innerHTML = "";

      state.selectedRepairBlocks.forEach(
        (block) => {
          const button =
            document.createElement(
              "button"
            );

          button.type = "button";

          button.className =
            "selected-repair-block";

          button.textContent =
            `${block.word} ×`;

          button.addEventListener(
            "click",
            () => {
              game.removeRepairBlock(
                block.blockId
              );
            }
          );

          selectedArea.appendChild(
            button
          );
        }
      );

      if (
        state.selectedRepairBlocks.length ===
        0
      ) {
        message.textContent =
          "Drop or click three safe blocks here.";

        preview.textContent =
          "Waiting for three blocks...";
      } else {
        message.textContent =
          `${state.selectedRepairBlocks.length}/3 blocks selected`;

        preview.textContent =
          state.selectedRepairBlocks
            .map((block) => block.word)
            .join("");
      }

      const ready =
        state.selectedRepairBlocks.length ===
        3;

      checkButton.disabled = !ready;

      checkButton.classList.toggle(
        "locked-action",
        !ready
      );
    };

  game.clearRepairFeedback =
    function clearRepairFeedback() {
      const feedback =
        game.byId(
          "identityRepairFeedback"
        );

      if (!feedback) {
        return;
      }

      feedback.textContent = "";
      feedback.style.background =
        "transparent";
    };

  game.checkRepairedUsername =
    function checkRepairedUsername() {
      if (
        state.selectedRepairBlocks.length !==
          3 ||
        state.profileRepairComplete
      ) {
        return;
      }

      const feedback =
        game.byId(
          "identityRepairFeedback"
        );

      const buildZone =
        game.byId("usernameBuildZone");

      const unsafeBlocks =
        state.selectedRepairBlocks.filter(
          (block) => !block.safe
        );

      if (unsafeBlocks.length > 0) {
        const reasons =
          unsafeBlocks
            .map(
              (block) =>
                `"${block.word}" reveals a ${block.reason}`
            )
            .join("; ");

        feedback.textContent =
          `Good try! ${reasons}. Choose safe interests instead.`;

        feedback.style.background =
          "#fff3d4";

        buildZone.classList.add("shake");

        window.setTimeout(() => {
          buildZone.classList.remove(
            "shake"
          );
        }, 700);

        game.setMemeTip(
          "Good guess! Avoid names, birthdays, schools, and locations.",
          "wrong"
        );

        return;
      }

      state.profileRepairComplete = true;
      state.profilesProtected += 1;

      const progress =
        game.byId("profilesProtected");

      progress.textContent =
        String(state.profilesProtected);

      const repairedName =
        state.selectedRepairBlocks
          .map((block) => block.word)
          .join("");

      feedback.textContent =
        `🎉 Excellent! ${repairedName} uses interests without revealing private information.`;

      feedback.style.background =
        "#e9fff3";

      buildZone.classList.add(
        "repair-success"
      );

      game.setMemeTip(
        `Profile ${state.profilesProtected} of 5 protected!`,
        "congrats"
      );

      window.setTimeout(() => {
        buildZone.classList.remove(
          "repair-success"
        );

        state.identityProfileIndex += 1;

        if (
          state.identityProfileIndex >=
          data.identityProfiles.length
        ) {
          game.unlockFinalTest();
          return;
        }

        game.loadIdentityProfile();
      }, 1800);
    };

  game.unlockFinalTest =
    function unlockFinalTest() {
      const button =
        game.byId("goFinalTest");

      if (button) {
        button.disabled = false;

        button.classList.remove(
          "locked-action"
        );

        button.textContent =
          "Begin Identity Protector Final Test 🛡️";
      }

      game.setMemeTip(
        "You protected all five profiles! The final test is unlocked.",
        "congrats"
      );
    };
  game.startFinalTest = function startFinalTest() {
  const requiredProfiles = game.data.identityProfiles.length;
  const protectedProfiles = game.state.profilesProtected;

  if (protectedProfiles < requiredProfiles) {
    game.setMemeTip(
      `Protect all five profiles first. You protected ${protectedProfiles} out of ${requiredProfiles}.`,
      "thinking"
    );

    return;
  }

  game.state.testIndex = 0;
  game.state.testCorrect = 0;
  game.state.testAnswered = false;

  game.showSection("testZone");
  game.loadTest();

  game.setMemeTip(
    "Final test time! You need at least 80 percent to earn your badge.",
    "thinking"
  );
};
})();
