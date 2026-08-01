"use strict";

/* =========================================================
   SAFETII NET — MEMPHIS ABOUT PAGE

   Features:
   - Scroll reveal animations
   - Lightweight parallax movement
   - Interactive Meme reactions
   - Hover tilt for Memphis cards
   - Animated mission stops
   - Reduced-motion support
========================================================= */

(() => {
  const prefersReducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  /* =====================================================
     HELPERS
  ===================================================== */

  function clamp(
    value,
    minimum,
    maximum
  ) {
    return Math.min(
      Math.max(
        value,
        minimum
      ),
      maximum
    );
  }


  function escapeHtml(value) {
    return String(
      value || ""
    )
      .replaceAll(
        "&",
        "&amp;"
      )
      .replaceAll(
        "<",
        "&lt;"
      )
      .replaceAll(
        ">",
        "&gt;"
      )
      .replaceAll(
        '"',
        "&quot;"
      )
      .replaceAll(
        "'",
        "&#039;"
      );
  }


  /* =====================================================
     COPYRIGHT YEAR
  ===================================================== */

  function updateCopyrightYear() {
    const yearElement =
      document.getElementById(
        "aboutCopyrightYear"
      );

    if (!yearElement) {
      return;
    }

    yearElement.textContent =
      String(
        new Date().getFullYear()
      );
  }


  /* =====================================================
     SCROLL REVEAL
  ===================================================== */

  function initializeScrollReveal() {
    const revealElements =
      document.querySelectorAll(
        ".reveal-on-scroll"
      );

    if (
      revealElements.length ===
      0
    ) {
      return;
    }


    if (
      prefersReducedMotion ||
      !(
        "IntersectionObserver" in
        window
      )
    ) {
      revealElements.forEach(
        (element) => {
          element.classList.add(
            "is-visible"
          );
        }
      );

      return;
    }


    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach(
            (entry) => {
              if (
                !entry.isIntersecting
              ) {
                return;
              }

              entry.target.classList.add(
                "is-visible"
              );

              observer.unobserve(
                entry.target
              );
            }
          );
        },
        {
          threshold:
            0.14,

          rootMargin:
            "0px 0px -55px 0px"
        }
      );


    revealElements.forEach(
      (
        element,
        index
      ) => {
        element.style.transitionDelay =
          `${Math.min(
            index % 4,
            3
          ) * 90}ms`;

        observer.observe(
          element
        );
      }
    );
  }


  /* =====================================================
     PARALLAX SCROLLING
  ===================================================== */

  function initializeParallax() {
    if (prefersReducedMotion) {
      return;
    }

    const parallaxElements =
      Array.from(
        document.querySelectorAll(
          "[data-parallax-speed]"
        )
      );

    if (
      parallaxElements.length ===
      0
    ) {
      return;
    }


    let ticking =
      false;


    function updateParallax() {
      const viewportCenter =
        window.innerHeight / 2;

      parallaxElements.forEach(
        (element) => {
          const bounds =
            element.parentElement
              ?.getBoundingClientRect();

          if (!bounds) {
            return;
          }

          const elementCenter =
            bounds.top +
            bounds.height / 2;

          const distanceFromCenter =
            viewportCenter -
            elementCenter;

          const speed =
            Number(
              element.dataset
                .parallaxSpeed
            ) || 0.15;

          const movement =
            clamp(
              distanceFromCenter *
                speed,
              -110,
              110
            );

          element.style.setProperty(
            "--parallax-y",
            `${movement}px`
          );

          element.style.translate =
            `0 ${movement}px`;
        }
      );

      ticking =
        false;
    }


    function requestParallaxUpdate() {
      if (ticking) {
        return;
      }

      ticking =
        true;

      window.requestAnimationFrame(
        updateParallax
      );
    }


    window.addEventListener(
      "scroll",
      requestParallaxUpdate,
      {
        passive:
          true
      }
    );

    window.addEventListener(
      "resize",
      requestParallaxUpdate
    );

    requestParallaxUpdate();
  }


  /* =====================================================
     INTERACTIVE MEME
  ===================================================== */

  function initializeInteractiveMeme() {
    const memeCard =
      document.getElementById(
        "interactiveMemeCard"
      );

    const memeButton =
      document.getElementById(
        "interactiveMemeButton"
      );

    const memeImage =
      document.getElementById(
        "interactiveMemeImage"
      );

    const message =
      document.getElementById(
        "memeStoryMessage"
      );


    if (
      !memeCard ||
      !memeButton ||
      !memeImage ||
      !message
    ) {
      return;
    }


    const messages = [
      "Come on! Let’s explore how Safetii Net began.",
      "Cyber heroes protect information before they share it.",
      "Every mission teaches a skill you can use online.",
      "Safe choices become strong digital habits.",
      "Trusted adults are part of every cyber hero’s team.",
      "You are ready to keep scrolling!"
    ];


    let messageIndex =
      0;

    let animationTimer =
      null;


    function makeMemeDance() {
      window.clearTimeout(
        animationTimer
      );

      memeButton.classList.remove(
        "meme-dance"
      );

      void memeButton.offsetWidth;

      memeButton.classList.add(
        "meme-dance"
      );

      animationTimer =
        window.setTimeout(
          () => {
            memeButton.classList.remove(
              "meme-dance"
            );
          },
          950
        );
    }


    function updateMemeMessage() {
      messageIndex =
        (
          messageIndex +
          1
        ) %
        messages.length;

      message.textContent =
        messages[
          messageIndex
        ];
    }


    memeButton.addEventListener(
      "click",
      () => {
        if (
          !prefersReducedMotion
        ) {
          makeMemeDance();
        }

        updateMemeMessage();
      }
    );


    memeButton.addEventListener(
      "mouseenter",
      () => {
        memeCard.classList.add(
          "meme-is-active"
        );
      }
    );


    memeButton.addEventListener(
      "mouseleave",
      () => {
        memeCard.classList.remove(
          "meme-is-active"
        );
      }
    );
  }


  /* =====================================================
     POINTER TILT CARDS
  ===================================================== */

  function initializeTiltCards() {
    if (
      prefersReducedMotion ||
      !window.matchMedia(
        "(pointer: fine)"
      ).matches
    ) {
      return;
    }


    const tiltCards =
      document.querySelectorAll(
        "[data-tilt-card]"
      );


    tiltCards.forEach(
      (card) => {
        card.addEventListener(
          "pointermove",
          (event) => {
            const bounds =
              card.getBoundingClientRect();

            const relativeX =
              (
                event.clientX -
                bounds.left
              ) /
              bounds.width;

            const relativeY =
              (
                event.clientY -
                bounds.top
              ) /
              bounds.height;

            const rotateY =
              clamp(
                (
                  relativeX -
                  0.5
                ) *
                  8,
                -4,
                4
              );

            const rotateX =
              clamp(
                (
                  0.5 -
                  relativeY
                ) *
                  8,
                -4,
                4
              );

            card.style.transform =
              `
                perspective(800px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-7px)
              `;
          }
        );


        card.addEventListener(
          "pointerleave",
          () => {
            card.style.transform =
              "";
          }
        );
      }
    );
  }


  /* =====================================================
     MISSION STOP INTERACTIONS
  ===================================================== */

  function initializeMissionStops() {
    const missionStops =
      document.querySelectorAll(
        "[data-mission-stop]"
      );


    missionStops.forEach(
      (stop) => {
        const badge =
          stop.querySelector(
            ".mission-stop-badge"
          );

        if (!badge) {
          return;
        }


        stop.addEventListener(
          "mouseenter",
          () => {
            badge.setAttribute(
              "data-active",
              "true"
            );
          }
        );


        stop.addEventListener(
          "mouseleave",
          () => {
            badge.removeAttribute(
              "data-active"
            );
          }
        );
      }
    );
  }


  /* =====================================================
     STORY PROGRESS INDICATOR
  ===================================================== */

  function createStoryProgressBar() {
    const progressBar =
      document.createElement(
        "div"
      );

    progressBar.className =
      "about-story-progress";

    progressBar.setAttribute(
      "aria-hidden",
      "true"
    );


    const progressFill =
      document.createElement(
        "div"
      );

    progressFill.className =
      "about-story-progress-fill";

    progressBar.appendChild(
      progressFill
    );

    document.body.appendChild(
      progressBar
    );


    function updateProgress() {
      const scrollTop =
        window.scrollY;

      const scrollableHeight =
        document.documentElement
          .scrollHeight -
        window.innerHeight;

      const progress =
        scrollableHeight > 0
          ? scrollTop /
            scrollableHeight
          : 0;

      progressFill.style.transform =
        `scaleX(${clamp(
          progress,
          0,
          1
        )})`;
    }


    window.addEventListener(
      "scroll",
      updateProgress,
      {
        passive:
          true
      }
    );

    updateProgress();
  }


  /* =====================================================
     SECTION ACTIVE STATE
  ===================================================== */

  function initializeSceneTracking() {
    if (
      !(
        "IntersectionObserver" in
        window
      )
    ) {
      return;
    }


    const scenes =
      document.querySelectorAll(
        ".memphis-scene"
      );


    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach(
            (entry) => {
              entry.target.classList.toggle(
                "scene-is-active",
                entry.isIntersecting
              );
            }
          );
        },
        {
          threshold:
            0.22
        }
      );


    scenes.forEach(
      (scene) => {
        observer.observe(
          scene
        );
      }
    );
  }


  /* =====================================================
     INITIALIZE
  ===================================================== */

  function initializeAboutPage() {
    updateCopyrightYear();
    initializeScrollReveal();
    initializeParallax();
    initializeInteractiveMeme();
    initializeTiltCards();
    initializeMissionStops();
    createStoryProgressBar();
    initializeSceneTracking();

    console.log(
      "Safetii Net Memphis About page loaded."
    );
  }


  if (
    document.readyState ===
    "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      initializeAboutPage,
      {
        once:
          true
      }
    );
  } else {
    initializeAboutPage();
  }
})();
