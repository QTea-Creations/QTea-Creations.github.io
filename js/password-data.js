"use strict";

(() => {
  const mission = window.PasswordMission =
    window.PasswordMission || {};

  mission.data = {
    comparisonChallenges: [
      {
        prompt: "Which practice password is safer for a pretend game account?",
        choices: [
          {
            value: "soccer123",
            note: "Short, predictable, and based on a common interest."
          },
          {
            value: "PurpleRiverTaco88!",
            note: "Longer, less predictable, and harder to guess."
          }
        ],
        correctIndex: 1,
        explanation:
          "Longer and less predictable passwords are usually safer than short, common patterns."
      },
      {
        prompt: "Which practice password is safer?",
        choices: [
          {
            value: "password1",
            note: "Uses a very common word with one number added."
          },
          {
            value: "CloudTigerLantern42",
            note: "Uses a longer phrase-style password."
          }
        ],
        correctIndex: 1,
        explanation:
          "Adding one number to a common word does not make a password very strong."
      },
      {
        prompt: "Which practice password is safer?",
        choices: [
          {
            value: "abcdef123",
            note: "Uses simple sequences that are easy to guess."
          },
          {
            value: "MintRocketCactus7!",
            note: "Longer, more random, and not a simple sequence."
          }
        ],
        correctIndex: 1,
        explanation:
          "Simple sequences like abcdef or 123 are weak because attackers try those first."
      },
      {
        prompt: "Which practice password is safer?",
        choices: [
          {
            value: "Emma2014",
            note: "Looks like a name plus a year."
          },
          {
            value: "Sunbeam-Penguin-Race",
            note: "Uses a longer phrase that does not reveal personal info."
          }
        ],
        correctIndex: 1,
        explanation:
          "Names and years can be easier to guess, especially if they relate to someone’s life."
      },
      {
        prompt: "Which practice password is safer?",
        choices: [
          {
            value: "qwerty!!",
            note: "Keyboard pattern, even with symbols."
          },
          {
            value: "MarblePlanetNoodle5",
            note: "Long and harder to predict."
          }
        ],
        correctIndex: 1,
        explanation:
          "Keyboard patterns like qwerty are common weak passwords, even when symbols are added."
      }
    ],

    bannedWords: [
      "password",
      "qwerty",
      "admin",
      "welcome",
      "login",
      "letmein",
      "secret",
      "abc123",
      "iloveyou",
      "dragon",
      "monkey",
      "football",
      "baseball",
      "princess"
    ],

    weakSequences: [
      "1234",
      "12345",
      "123456",
      "abcdef",
      "qwerty",
      "1111",
      "0000"
    ]
  };
})();
