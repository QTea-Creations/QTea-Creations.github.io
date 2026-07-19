"use strict";

/* =========================================================
   SAFETII NET — CYBER ARCADE HOMEPAGE
========================================================= */

(() => {
  const arcade =
    window.SafetiiArcade;

  if (!arcade) {
    console.error(
      "SafetiiArcade is missing. Load arcade-score.js first."
    );

    return;
  }

  const gameCards =
    Array.from(
      document.querySelectorAll(
        ".arcade-game-card"
      )
    );

  const filterButtons =
    Array.from(
      document.querySelectorAll(
        ".arcade-filter"
      )
    );

  const searchInput =
    document.getElementById(
      "arcadeSearch"
    );

  let activeFilter =
    "all";

  /* =====================================================
     PLAYER STATS
  ===================================================== */

  function starsToText(
    starCount
  ) {
    const safeStars =
      Math.max(
        0,
        Math.min(
          3,
          Number(starCount) || 0
        )
      );

    return (
      "★".repeat(safeStars) +
      "☆".repeat(3 - safeStars)
    );
  }

  function updatePlayerStats() {
    const progress =
      arcade.getAllProgress();

    const games =
      Object.values(
        progress.games || {}
      );

    const gamesPlayed =
      games.reduce(
        (total, game) =>
          total +
          (
            Number(
              game.plays
            ) || 0
          ),
        0
      );

    const perfectRounds =
      games.reduce(
        (total, game) =>
          total +
          (
            Number(
              game.perfectRounds
            ) || 0
          ),
        0
      );

    const totalBestStars =
      games.reduce(
        (total, game) =>
          total +
          (
            Number(
              game.bestStars
            ) || 0
          ),
        0
      );

    const completedGames =
      games.filter(
        (game) =>
          game.completed
      ).length;

    setText(
      "arcadeTotalPoints",
      arcade.getGlobalPoints()
    );

    setText(
      "arcadeGamesPlayed",
      gamesPlayed
    );

    setText(
      "arcadePerfectRounds",
      perfectRounds
    );

    setText(
      "arcadeStarsEarned",
      totalBestStars
    );

    setText(
      "arcadeGamesCompleted",
      completedGames
    );

    gameCards.forEach(
      (card) => {
        const gameId =
          card.dataset.gameId;

        if (!gameId) {
          return;
        }

        const gameProgress =
          arcade.getGameProgress(
            gameId
          );

        const scoreElement =
          card.querySelector(
            "[data-best-score]"
          );

        const starsElement =
          card.querySelector(
            "[data-best-stars]"
          );

        if (scoreElement) {
          scoreElement.textContent =
            gameProgress
              ? String(
                  gameProgress
                    .bestScore || 0
                )
              : "—";
        }

        if (starsElement) {
          starsElement.textContent =
            starsToText(
              gameProgress
                ?.bestStars || 0
            );
        }
      }
    );
  }

  function setText(
    id,
    value
  ) {
    const element =
      document.getElementById(
        id
      );

    if (element) {
      element.textContent =
        String(value);
    }
  }

  /* =====================================================
     FILTERS AND SEARCH
  ===================================================== */

  function filterGames() {
    const searchTerm =
      (
        searchInput?.value ||
        ""
      )
        .trim()
        .toLowerCase();

    let visibleCount =
      0;

    gameCards.forEach(
      (card) => {
        const category =
          card.dataset.category ||
          "";

        const gameName =
          card.dataset.gameName ||
          "";

        const cardText =
          card.textContent
            .toLowerCase();

        const matchesFilter =
          activeFilter === "all" ||
          category === activeFilter;

        const matchesSearch =
          !searchTerm ||
          gameName
            .toLowerCase()
            .includes(
              searchTerm
            ) ||
          cardText.includes(
            searchTerm
          );

        const visible =
          matchesFilter &&
          matchesSearch;

        card.classList.toggle(
          "hidden",
          !visible
        );

        if (visible) {
          visibleCount += 1;
        }
      }
    );

    document
      .getElementById(
        "noArcadeGames"
      )
      ?.classList.toggle(
        "hidden",
        visibleCount > 0
      );
  }

  function handleFilterClick(
    button
  ) {
    activeFilter =
      button.dataset.filter ||
      "all";

    filterButtons.forEach(
      (filterButton) => {
        filterButton.classList.toggle(
          "active",
          filterButton ===
            button
        );
      }
    );

    filterGames();
  }

  filterButtons.forEach(
    (button) => {
      button.addEventListener(
        "click",
        () => {
          handleFilterClick(
            button
          );
        }
      );
    }
  );

  searchInput?.addEventListener(
    "input",
    filterGames
  );

  /* =====================================================
     HERO BUTTONS
  ===================================================== */

  document
    .getElementById(
      "playFeaturedGame"
    )
    ?.addEventListener(
      "click",
      () => {
        window.location.href =
          "games/pieces-of-me.html";
      }
    );

  document
    .getElementById(
      "viewAllGames"
    )
    ?.addEventListener(
      "click",
      () => {
        document
          .getElementById(
            "arcadeGames"
          )
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
      }
    );

  /* =====================================================
     UPDATE WHEN POINTS CHANGE
  ===================================================== */

  document.addEventListener(
    "safetiiPointsChanged",
    updatePlayerStats
  );

  document.addEventListener(
    "arcadeProgressReset",
    updatePlayerStats
  );

  updatePlayerStats();
  filterGames();

  console.log(
    "Cyber Arcade homepage loaded."
  );
})();
