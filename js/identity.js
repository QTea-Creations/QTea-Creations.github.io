"use strict";

(() => {
  const game = window.IdentityGame;

  if (!game) {
    console.error(
      "Identity Game files were not loaded in the correct order."
    );

    return;
  }

  function resetPageDisplay() {
    const objectsFound =
      game.byId("objectsFound");

    const usernamesChecked =
      game.byId("usernamesChecked");

    const practiceCorrect =
      game.byId("practiceCorrect");

    const profilesProtected =
      game.byId("profilesProtected");

    if (objectsFound) {
      objectsFound.textContent = "0";
    }

    if (usernamesChecked) {
      usernamesChecked.textContent = "0";
    }

    if (practiceCorrect) {
      practiceCorrect.textContent = "0";
    }

    if (profilesProtected) {
      profilesProtected.textContent = "0";
    }

    document
      .querySelectorAll(".island-object")
      .forEach((button) => {
        button.classList.remove(
          "discovered",
          "wiggle"
        );
      });

    document
      .querySelectorAll(".sticker")
      .forEach((button) => {
        button.classList.remove(
          "collected"
        );

        button.textContent = "⭐";
      });

    const usernameButton =
      game.byId("goUsernameLab");

    if (usernameButton) {
      usernameButton.disabled = true;

      usernameButton.classList.add(
        "locked-action"
      );

      usernameButton.textContent =
        "Unlock Safe Username Lab";
    }

    const backpackButton =
      game.byId("goBackpackRescue");

    if (backpackButton) {
      backpackButton.disabled = true;

      backpackButton.classList.add(
        "locked-action"
      );

      backpackButton.textContent =
        "Complete 3 Username Scans First";
    }

    const finalButton =
      game.byId("goFinalTest");

    if (finalButton) {
      finalButton.disabled = true;

      finalButton.classList.add(
        "locked-action"
      );

      finalButton.textContent =
        "Protect All 5 Profiles to Unlock the Final Test";
    }

    const generatedUsername =
      game.byId("generatedUsername");

    if (generatedUsername) {
      generatedUsername.textContent =
        "Press the button to generate a username!";
    }

    const checklist =
      game.byId("usernameChecklist");

    if (checklist) {
      checklist.innerHTML = `
        <p>
          Generate a username to begin the safety scan.
        </p>
      `;
    }
  }

  function retryMission() {
    game.resetMissionState();
    resetPageDisplay();

    game.showSection("missionAlert");

    game.setMemeTip(
      "Ready to replay Identity Island?",
      "welcome"
    );
  }

  document.addEventListener(
    "DOMContentLoaded",
    () => {
      game.loadMissionHeroName();

      game.byId("acceptMission")
        ?.addEventListener(
          "click",
          game.acceptMission
        );

      game.byId("closeLesson")
        ?.addEventListener(
          "click",
          game.closeLessonPopup
        );

      game.byId("goUsernameLab")
        ?.addEventListener(
          "click",
          game.openUsernameLab
        );

      game.byId("generateUsername")
        ?.addEventListener(
          "click",
          game.generateUsername
        );

      game.byId("approveUsername")
        ?.addEventListener(
          "click",
          game.finishUsernameScan
        );

      game.byId("goBackpackRescue")
        ?.addEventListener(
          "click",
          game.startBackpackRescue
        );

      game.byId("clearUsernameBlocks")
        ?.addEventListener(
          "click",
          game.clearRepairBuilder
        );

      game.byId("checkRepairedUsername")
        ?.addEventListener(
          "click",
          game.checkRepairedUsername
        );

      game.byId("goFinalTest")
        ?.addEventListener(
          "click",
          game.startFinalTest
        );

      game.byId("nextTest")
        ?.addEventListener(
          "click",
          game.nextTestQuestion
        );

      game.byId("retryMission")
        ?.addEventListener(
          "click",
          retryMission
        );

      document
        .querySelectorAll(
          ".meme-help-btn"
        )
        .forEach((button) => {
          button.addEventListener(
            "click",
            () => {
              game.setMemeTip(
                button.dataset.tip ||
                  "Meme is here to help.",
                "thinking"
              );
            }
          );
        });

      document
        .querySelectorAll(
          ".island-object"
        )
        .forEach((button) => {
          button.addEventListener(
            "click",
            () => {
              game.openLesson(
                button.dataset.object,
                button
              );
            }
          );
        });

      document
        .querySelectorAll(".sticker")
        .forEach((button) => {
          button.addEventListener(
            "click",
            () => {
              game.collectSticker(
                button
              );
            }
          );
        });

      const dragCard =
        game.byId("dragItemCard");

      dragCard?.addEventListener(
        "dragstart",
        (event) => {
          event.dataTransfer.setData(
            "text/plain",
            "backpack-item"
          );

          event.dataTransfer.effectAllowed =
            "move";
        }
      );

      document
        .querySelectorAll(".sort-zone")
        .forEach((zone) => {
          zone.addEventListener(
            "dragover",
            (event) => {
              event.preventDefault();

              zone.classList.add(
                "drag-over"
              );
            }
          );

          zone.addEventListener(
            "dragleave",
            () => {
              zone.classList.remove(
                "drag-over"
              );
            }
          );

          zone.addEventListener(
            "drop",
            (event) => {
              event.preventDefault();

              zone.classList.remove(
                "drag-over"
              );

              game.answerPractice(
                zone.dataset.answer,
                zone
              );
            }
          );

          zone.addEventListener(
            "click",
            () => {
              game.answerPractice(
                zone.dataset.answer,
                zone
              );
            }
          );
        });

      const flipCard =
        game.byId("identityFlipCard");

      flipCard?.addEventListener(
        "click",
        () => {
          const inner =
            game.byId(
              "identityCardInner"
            );

          const flipped =
            inner.classList.toggle(
              "is-flipped"
            );

          flipCard.setAttribute(
            "aria-pressed",
            String(flipped)
          );
        }
      );

      const buildZone =
        game.byId("usernameBuildZone");

      buildZone?.addEventListener(
        "dragover",
        (event) => {
          event.preventDefault();

          buildZone.classList.add(
            "drag-over"
          );
        }
      );

      buildZone?.addEventListener(
        "dragleave",
        () => {
          buildZone.classList.remove(
            "drag-over"
          );
        }
      );

      buildZone?.addEventListener(
        "drop",
        (event) => {
          event.preventDefault();

          buildZone.classList.remove(
            "drag-over"
          );

          const blockId =
            event.dataTransfer.getData(
              "text/plain"
            );

          const block =
            document.querySelector(
              `[data-block-id="${blockId}"]`
            );

          game.addRepairBlock(block);
        }
      );

      document
        .querySelectorAll(
          ".test-choice"
        )
        .forEach((button) => {
          button.addEventListener(
            "click",
            () => {
              game.answerTest(
                button.dataset.answer,
                button
              );
            }
          );
        });
    }
  );
})();
