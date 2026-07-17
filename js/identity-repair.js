"use strict";

/* =========================================================
   SAFETII NET — IDENTITY ISLAND
   Identity Card Repair Lab
========================================================= */

(() => {
  const game =
    window.IdentityGame;

  if (
    !game ||
    !game.data ||
    !game.state
  ) {
    console.error(
      "identity-repair.js could not start."
    );
    return;
  }

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

      state.selectedRepairBlocks =
        [];

      state.profileRepairComplete =
        false;

      const card =
        game.byId(
          "identityFlipCard"
        );

      const cardInner =
        game.byId(
          "identityCardInner"
        );

      if (card) {
        card.setAttribute(
          "aria-pressed",
          "false"
        );

        card.style.setProperty(
          "--profile-color",
          profile.cardColor ||
            "#7d4cff"
        );
      }

      if (cardInner) {
        cardInner.classList.remove(
          "is-flipped"
        );
      }

      const values = {
        profileAvatar:
          profile.avatar,

        profileName:
          profile.name,

        profileBirthday:
          profile.birthday,

        profileSchool:
          profile.school,

        profileLocation:
          profile.location,

        profileUnsafeUsername:
          profile.unsafeUsername
      };

      Object.entries(values).forEach(
        ([id, value]) => {
          const element =
            game.byId(id);

          if (element) {
            element.textContent =
              value;
          }
        }
      );

      const interestMission =
        game.byId(
          "profileInterestMission"
        );

      if (interestMission) {
        interestMission.textContent =
          `Build a username using ${profile.name}'s interests without revealing private information.`;
      }

      const interestList =
        game.byId(
          "profileInterestList"
        );

      if (interestList) {
        interestList.innerHTML =
          profile.interests
            .map(
              (interest) => `
                <span class="interest-chip">
                  ${interest.word}
                </span>
              `
            )
            .join("");
      }

      game.buildRepairBlockBank(
        profile
      );

      game.updateRepairBuilder();
      game.clearRepairFeedback();

      game.setMemeTip(
        `Study ${profile.name}'s fictional ID. Flip the card to discover safe interests.`,
        "thinking"
      );
    };

  game.buildRepairBlockBank =
    function buildRepairBlockBank(
      profile
    ) {
      const bank =
        game.byId(
          "wordBlockBank"
        );

      if (!bank) {
        return;
      }

      /*
        Emojis are intentionally removed
        so they do not give away the answer.
      */
      const safeBlocks =
        profile.interests.map(
          (interest) => ({
            word: interest.word,
            label: interest.word,
            safe: true,
            reason:
              "one of the student's safe interests"
          })
        );

      const unsafeBlocks =
        profile.privateBlocks.map(
          (block) => ({
            word: block.word,
            label: block.word,
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
            document.createElement(
              "button"
            );

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
              if (
                !event.dataTransfer
              ) {
                return;
              }

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

          bank.appendChild(
            button
          );
        }
      );
    };

  game.addRepairBlock =
    function addRepairBlock(
      button
    ) {
      if (
        !button ||
        button.disabled ||
        state.profileRepairComplete
      ) {
        return;
      }

      if (
        state.selectedRepairBlocks
          .length >= 3
      ) {
        game.setMemeTip(
          "The builder already has three blocks. Remove one before adding another.",
          "thinking"
        );
        return;
      }

      const blockId =
        button.dataset.blockId;

      const alreadySelected =
        state.selectedRepairBlocks
          .some(
            (block) =>
              block.blockId ===
              blockId
          );

      if (alreadySelected) {
        return;
      }

      state.selectedRepairBlocks.push(
        {
          blockId,
          word:
            button.dataset.word,

          safe:
            button.dataset.safe ===
            "true",

          reason:
            button.dataset.reason
        }
      );

      button.disabled = true;

      button.classList.add(
        "used-block"
      );

      game.updateRepairBuilder();
    };

  game.removeRepairBlock =
    function removeRepairBlock(
      blockId
    ) {
      state.selectedRepairBlocks =
        state.selectedRepairBlocks
          .filter(
            (block) =>
              block.blockId !==
              blockId
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
      state.selectedRepairBlocks =
        [];

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
        "Builder cleared. Choose three words based on the student's interests.",
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
        game.byId(
          "buildZoneMessage"
        );

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
        console.error(
          "Username builder elements are missing."
        );
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
        state.selectedRepairBlocks
          .length === 0
      ) {
        message.textContent =
          "Choose three interest-based words.";

        preview.textContent =
          "Waiting for three blocks...";
      } else {
        message.textContent =
          `${state.selectedRepairBlocks.length}/3 blocks selected`;

        preview.textContent =
          state.selectedRepairBlocks
            .map(
              (block) =>
                block.word
            )
            .join("");
      }

      const ready =
        state.selectedRepairBlocks
          .length === 3;

      checkButton.disabled =
        !ready;

      checkButton.classList.toggle(
        "locked-action",
        !ready
      );

      checkButton.setAttribute(
        "aria-disabled",
        String(!ready)
      );
    };

  game.clearRepairFeedback =
    function clearRepairFeedback() {
      const feedback =
        game.byId(
          "identityRepairFeedback"
        );

      if (feedback) {
        feedback.textContent = "";
        feedback.style.background =
          "transparent";
        feedback.style.color = "";
      }
    };

  game.checkRepairedUsername =
    function checkRepairedUsername() {
      if (
        state.selectedRepairBlocks
          .length !== 3 ||
        state.profileRepairComplete
      ) {
        return;
      }

      const feedback =
        game.byId(
          "identityRepairFeedback"
        );

      const buildZone =
        game.byId(
          "usernameBuildZone"
        );

      if (
        !feedback ||
        !buildZone
      ) {
        return;
      }

      const currentProfile =
        data.identityProfiles[
          state.identityProfileIndex
        ];

      const unsafeBlocks =
        state.selectedRepairBlocks
          .filter(
            (block) =>
              !block.safe
          );

      if (
        unsafeBlocks.length > 0
      ) {
        const reasons =
          unsafeBlocks
            .map(
              (block) =>
                `"${block.word}" reveals a ${block.reason}`
            )
            .join("; ");

        feedback.textContent =
          `Good try! ${reasons}. Replace those blocks with words based on ${currentProfile.name}'s interests.`;

        feedback.style.background =
          "#fff3d4";

        feedback.style.color =
          "#7d4cff";

        buildZone.classList.add(
          "shake"
        );

        window.setTimeout(() => {
          buildZone.classList.remove(
            "shake"
          );
        }, 700);

        game.setMemeTip(
          "Good guess. Build the username from interests instead of private information.",
          "wrong"
        );

        return;
      }

      state.profileRepairComplete =
        true;

      state.profilesProtected += 1;

      const progress =
        game.byId(
          "profilesProtected"
        );

      if (progress) {
        progress.textContent =
          String(
            state.profilesProtected
          );
      }

      const repairedName =
        state.selectedRepairBlocks
          .map(
            (block) =>
              block.word
          )
          .join("");

      feedback.textContent =
        `Excellent! ${repairedName} matches ${currentProfile.name}'s interests without revealing private information.`;

      feedback.style.background =
        "#e9fff3";

      feedback.style.color =
        "#168a52";

      buildZone.classList.add(
        "repair-success"
      );

      game.setMemeTip(
        `Profile ${state.profilesProtected} of ${data.identityProfiles.length} protected!`,
        "congrats"
      );

      if (
        typeof game.saveIdentityProgress ===
        "function"
      ) {
        game.saveIdentityProgress();
      }

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
        game.byId(
          "goFinalTest"
        );

      if (button) {
        button.disabled = false;

        button.classList.remove(
          "locked-action"
        );

        button.textContent =
          "Begin Identity Protector Final Test";
      }

      game.setMemeTip(
        "You protected all five profiles! The final test is unlocked.",
        "congrats"
      );

      if (
        typeof game.saveIdentityProgress ===
        "function"
      ) {
        game.saveIdentityProgress();
      }
    };

  console.log(
    "Identity Card Repair Lab loaded successfully."
  );
})();
