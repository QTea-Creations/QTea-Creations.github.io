"use strict";

/* =========================================================
   SAFETII NET — SHARED MEMPHIS INTERACTIONS

   Features:
   - Scroll reveal animations
   - Lightweight parallax
   - Interactive mascot reactions
   - Pointer tilt for cards
   - Neon hover support
   - Scroll progress indicator
   - Reduced-motion accessibility
========================================================= */

(() => {
  const reducedMotionQuery =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

  const prefersReducedMotion =
    reducedMotionQuery.matches;


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


  function isFinePointer() {
    return window.matchMedia(
      "(pointer: fine)"
    ).matches;
  }


  /* =====================================================
     SCROLL REVEAL
  ===================================================== */

  function initializeRevealAnimations() {
    const elements =
      document.querySelectorAll(
        [
          ".memphis-reveal",
          ".memphis-reveal-left",
          ".memphis-reveal-right"
        ].join(",")
      );

    if (!elements.length) {
      return;
    }


    if (
      prefersReducedMotion ||
      !(
        "IntersectionObserver" in
        window
      )
    ) {
      elements.forEach(
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
            "0px 0px -50px 0px"
        }
      );


    elements.forEach(
      (
        element,
        index
      ) => {
        const delay =
          Math.min(
            index % 4,
            3
          ) * 90;

        element.style.transitionDelay =
          `${delay}ms`;

        observer.observe(
          element
        );
      }
    );
  }


  /* =====================================================
     PARALLAX
  ===================================================== */

  function initializeParallax() {
    if (
      prefersReducedMotion
    ) {
      return;
    }


    const elements =
      Array.from(
        document.querySelectorAll(
          "[data-memphis-parallax]"
        )
      );

    if (!elements.length) {
      return;
    }


    let ticking =
      false;


    function updateParallax() {
      const viewportCenter =
        window.innerHeight / 2;


      elements.forEach(
        (element) => {
          const parent =
            element.closest(
              ".memphis-section"
            ) ||
            element.parentElement;

          if (!parent) {
            return;
          }


          const bounds =
            parent.getBoundingClientRect();

          const parentCenter =
            bounds.top +
            bounds.height / 2;

          const distance =
            viewportCenter -
            parentCenter;

          const speed =
            Number(
              element.dataset
                .memphisParallax
            ) || 0.15;

          const movement =
            clamp(
              distance *
                speed,
              -120,
              120
            );

          element.style.transform =
            `translate3d(0, ${movement}px, 0)`;
        }
      );


      ticking =
        false;
    }


    function requestUpdate() {
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
      requestUpdate,
      {
        passive:
          true
      }
    );

    window.addEventListener(
      "resize",
      requestUpdate
    );

    requestUpdate();
  }


  /* =====================================================
     MASCOT INTERACTION
  ===================================================== */

  function initializeMascots() {
    const mascots =
      document.querySelectorAll(
        ".memphis-mascot"
      );

    if (!mascots.length) {
      return;
    }


    mascots.forEach(
      (mascot) => {
        let danceTimer =
          null;


        function makeMascotDance() {
          if (
            prefersReducedMotion
          ) {
            return;
          }

          window.clearTimeout(
            danceTimer
          );

          mascot.classList.remove(
            "mascot-dance"
          );

          void mascot.offsetWidth;

          mascot.classList.add(
            "mascot-dance"
          );

          danceTimer =
            window.setTimeout(
              () => {
                mascot.classList.remove(
                  "mascot-dance"
                );
              },
              950
            );
        }


        mascot.addEventListener(
          "click",
          makeMascotDance
        );


        mascot.addEventListener(
          "keydown",
          (event) => {
            if (
              event.key !==
                "Enter" &&
              event.key !==
                " "
            ) {
              return;
            }

            event.preventDefault();

            makeMascotDance();
          }
        );


        if (
          !mascot.hasAttribute(
            "tabindex"
          )
        ) {
          mascot.setAttribute(
            "tabindex",
            "0"
          );
        }


        if (
          !mascot.hasAttribute(
            "role"
          )
        ) {
          mascot.setAttribute(
            "role",
            "button"
          );
        }
      }
    );
  }


  /* =====================================================
     POINTER TILT
  ===================================================== */

  function initializeTiltCards() {
    if (
      prefersReducedMotion ||
      !isFinePointer()
    ) {
      return;
    }


    const cards =
      document.querySelectorAll(
        "[data-memphis-tilt]"
      );


    cards.forEach(
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
                perspective(900px)
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
     CARD SPOTLIGHT
  ===================================================== */

  function initializeCardSpotlights() {
    if (
      prefersReducedMotion ||
      !isFinePointer()
    ) {
      return;
    }


    const cards =
      document.querySelectorAll(
        "[data-memphis-spotlight]"
      );


    cards.forEach(
      (card) => {
        card.addEventListener(
          "pointermove",
          (event) => {
            const bounds =
              card.getBoundingClientRect();

            const x =
              event.clientX -
              bounds.left;

            const y =
              event.clientY -
              bounds.top;

            card.style.setProperty(
              "--spotlight-x",
              `${x}px`
            );

            card.style.setProperty(
              "--spotlight-y",
              `${y}px`
            );
          }
        );
      }
    );
  }


  /* =====================================================
     SCROLL PROGRESS BAR
  ===================================================== */

  function initializeScrollProgress() {
    const body =
      document.body;


    if (
      !body.classList.contains(
        "memphis-scroll-progress"
      )
    ) {
      return;
    }


    const bar =
      document.createElement(
        "div"
      );

    bar.className =
      "memphis-page-progress";

    bar.setAttribute(
      "aria-hidden",
      "true"
    );


    const fill =
      document.createElement(
        "div"
      );

    fill.className =
      "memphis-page-progress-fill";

    bar.appendChild(
      fill
    );

    body.appendChild(
      bar
    );


    function updateProgress() {
      const maximumScroll =
        document.documentElement
          .scrollHeight -
        window.innerHeight;

      const progress =
        maximumScroll > 0
          ? window.scrollY /
            maximumScroll
          : 0;

      fill.style.transform =
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

    window.addEventListener(
      "resize",
      updateProgress
    );

    updateProgress();
  }


  /* =====================================================
     BUTTON PRESS EFFECT
  ===================================================== */

  function initializeButtonFeedback() {
    const buttons =
      document.querySelectorAll(
        ".memphis-button"
      );


    buttons.forEach(
      (button) => {
        button.addEventListener(
          "pointerdown",
          () => {
            button.classList.add(
              "is-pressed"
            );
          }
        );


        function removePressedState() {
          button.classList.remove(
            "is-pressed"
          );
        }


        button.addEventListener(
          "pointerup",
          removePressedState
        );

        button.addEventListener(
          "pointercancel",
          removePressedState
        );

        button.addEventListener(
          "pointerleave",
          removePressedState
        );
      }
    );
  }


  /* =====================================================
     INITIALIZATION
  ===================================================== */

  function initializeMemphisInteractions() {
    initializeRevealAnimations();
    initializeParallax();
    initializeMascots();
    initializeTiltCards();
    initializeCardSpotlights();
    initializeScrollProgress();
    initializeButtonFeedback();

    console.log(
      "Safetii Net Memphis interactions loaded."
    );
  }


  if (
    document.readyState ===
    "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      initializeMemphisInteractions,
      {
        once:
          true
      }
    );
  } else {
    initializeMemphisInteractions();
  }
})();
