"use strict";

/* =========================================================
   SAFETII NET — PASSWORD SAFE KEEPER
   Mission 2 Data

   This file contains:
   - Password comparison challenges
   - Password habit sorting
   - Code Keeper items
   - Account Rescue steps
   - Vault-door challenges
   - Final-test questions
========================================================= */

(() => {
  const mission =
    window.PasswordMission =
      window.PasswordMission || {};


  /* =====================================================
     PASSWORD COMPARISON CHALLENGES

     Training 1, Part 1
  ===================================================== */

  const comparisonChallenges = [
    {
      prompt:
        "Which pretend password is safer for a game account?",

      choices: [
        {
          value:
            "soccer123",

          note:
            "Short, predictable, and based on a common interest."
        },

        {
          value:
            "PurpleRiverTaco88!",

          note:
            "Longer, less predictable, and made from unrelated ideas."
        }
      ],

      correctIndex:
        1,

      explanation:
        "PurpleRiverTaco88! is longer and less predictable. A short word followed by 123 is easier to guess."
    },


    {
      prompt:
        "Which pretend password is safer?",

      choices: [
        {
          value:
            "password1",

          note:
            "Uses a very common password word with one number."
        },

        {
          value:
            "CloudTigerLantern42",

          note:
            "Uses a longer combination of unrelated words."
        }
      ],

      correctIndex:
        1,

      explanation:
        "Adding one number to the word password does not make it secure. Longer, unusual word combinations are generally safer."
    },


    {
      prompt:
        "Which pretend password is safer?",

      choices: [
        {
          value:
            "abcdef123",

          note:
            "Uses simple letter and number sequences."
        },

        {
          value:
            "MintRocketCactus7!",

          note:
            "Longer and harder to predict."
        }
      ],

      correctIndex:
        1,

      explanation:
        "Sequences such as abcdef and 123 are easy to guess because attackers test them often."
    },


    {
      prompt:
        "Which pretend password protects personal information better?",

      choices: [
        {
          value:
            "Emma2014",

          note:
            "Looks like a real name and a birth year."
        },

        {
          value:
            "Sunbeam-Penguin-Race",

          note:
            "Uses unrelated words instead of personal details."
        }
      ],

      correctIndex:
        1,

      explanation:
        "Real names, birthdays, and birth years can often be discovered or guessed. A longer phrase without personal information is safer."
    },


    {
      prompt:
        "Which pretend password is safer?",

      choices: [
        {
          value:
            "qwerty!!",

          note:
            "Uses a common keyboard pattern."
        },

        {
          value:
            "MarblePlanetNoodle5",

          note:
            "Uses several unrelated ideas and is much longer."
        }
      ],

      correctIndex:
        1,

      explanation:
        "Symbols do not make a common keyboard pattern safe. Length and unpredictability matter."
    }
  ];


  /* =====================================================
     PASSWORD ANALYZER REFERENCE DATA

     Training 1, Part 2
  ===================================================== */

  const commonPasswordWords = [
    "password",
    "passcode",
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
    "princess",
    "sunshine",
    "master",
    "school",
    "student",
    "computer"
  ];


  const weakSequences = [
    "1234",
    "12345",
    "123456",
    "1234567",
    "12345678",
    "0000",
    "1111",
    "2222",
    "abcd",
    "abcde",
    "abcdef",
    "qwerty",
    "asdf",
    "zxcv"
  ];


  /* =====================================================
     UNIQUE PASSWORD HABITS

     Training 2
  ===================================================== */

  const uniquePasswordHabits = [
    {
      text:
        "A student creates a different long password for their school account, game account, and email account.",

      category:
        "unique",

      explanation:
        "Using a different password for each account helps prevent one stolen password from opening every account."
    },


    {
      text:
        "A student uses BlueTiger47! for their game account, email account, and school account.",

      category:
        "reused",

      explanation:
        "This password is reused. If one account is compromised, the same password could be tried on the others."
    },


    {
      text:
        "A student uses Basketball1 because basketball is their favorite sport.",

      category:
        "predictable",

      explanation:
        "A favorite sport plus a simple number can be easy to guess, especially if the interest is visible online."
    },


    {
      text:
        "A family uses a trusted password manager to create and store a different password for every account.",

      category:
        "unique",

      explanation:
        "A password manager can help families keep track of long, unique passwords without reusing them."
    },


    {
      text:
        "A student changes one password from Puppy123 to Puppy124 and uses it for a second account.",

      category:
        "reused",

      explanation:
        "Changing only one number creates nearly the same password. It is still a reuse pattern."
    },


    {
      text:
        "A student uses their first name followed by their birth year.",

      category:
        "predictable",

      explanation:
        "Names and birth years are personal details that may be easy to discover or guess."
    },


    {
      text:
        "A student creates River-Moon-Cactus-27 for one account and Lantern-Panda-Cloud-84 for another.",

      category:
        "unique",

      explanation:
        "The passwords are long, different from each other, and do not rely on obvious personal details."
    },


    {
      text:
        "A student uses School2026! for every school-related website.",

      category:
        "reused",

      explanation:
        "Even when several websites are school-related, each important account should have its own password."
    }
  ];


  /* =====================================================
     CODE KEEPER ITEMS

     Training 3
  ===================================================== */

  const codeKeeperItems = [
    {
      icon:
        "🔑",

      text:
        "A password for an online game account",

      answer:
        "secret",

      explanation:
        "Passwords belong in the Secret Vault. They should not be shared with friends or strangers."
    },


    {
      icon:
        "🔢",

      text:
        "A six-digit verification code sent during login",

      answer:
        "secret",

      explanation:
        "Verification codes can unlock accounts and must remain private."
    },


    {
      icon:
        "🎨",

      text:
        "A favorite color",

      answer:
        "share",

      explanation:
        "A favorite color is generally safe self-expression, as long as it is not being used as a password or security answer."
    },


    {
      icon:
        "📌",

      text:
        "The PIN used to unlock a tablet",

      answer:
        "secret",

      explanation:
        "A device PIN protects access and should stay private."
    },


    {
      icon:
        "🐼",

      text:
        "A favorite animal",

      answer:
        "share",

      explanation:
        "A favorite animal is generally okay to share unless it is being used as a secret security answer."
    },


    {
      icon:
        "🧾",

      text:
        "A list of backup recovery codes",

      answer:
        "secret",

      explanation:
        "Recovery codes can be used to enter an account and must be protected."
    },


    {
      icon:
        "🎮",

      text:
        "The name of a favorite video game",

      answer:
        "share",

      explanation:
        "A favorite game is usually safe to share, but it should not be used by itself as a password."
    },


    {
      icon:
        "📧",

      text:
        "A password-reset link received by email",

      answer:
        "secret",

      explanation:
        "Password-reset links can give someone control of an account and should not be forwarded."
    },


    {
      icon:
        "🎵",

      text:
        "A favorite type of music",

      answer:
        "share",

      explanation:
        "A general music preference is typically safe to share."
    },


    {
      icon:
        "🛡️",

      text:
        "A secret answer used to recover an account",

      answer:
        "secret",

      explanation:
        "Security answers can help unlock accounts and should be treated like passwords."
    }
  ];


  /* =====================================================
     ACCOUNT RESCUE STEPS

     Training 4

     The order is designed for a child working with a
     trusted adult.
  ===================================================== */

  const accountRescueSteps = [
    {
      id:
        "stop",

      order:
        1,

      label:
        "Stop responding to the suspicious person or message.",

      explanation:
        "Stopping contact prevents the person from collecting more information."
    },


    {
      id:
        "tell",

      order:
        2,

      label:
        "Tell a trusted adult what happened.",

      explanation:
        "A trusted adult can help check the account and guide the next steps."
    },


    {
      id:
        "official",

      order:
        3,

      label:
        "Open the official app or website directly.",

      explanation:
        "Do not use a link from the suspicious message. Go to the official source."
    },


    {
      id:
        "change",

      order:
        4,

      label:
        "Change the password to a new, unique password.",

      explanation:
        "A new password can block someone who learned or guessed the old one."
    },


    {
      id:
        "sessions",

      order:
        5,

      label:
        "Sign out unfamiliar devices or other active sessions.",

      explanation:
        "Signing out other sessions can remove unauthorized access."
    },


    {
      id:
        "mfa",

      order:
        6,

      label:
        "Turn on multifactor authentication when available.",

      explanation:
        "Multifactor authentication adds another protection step after the password."
    }
  ];


  /* =====================================================
     VAULT-DOOR CHALLENGES

     Mixed practice after all four training rooms.
  ===================================================== */

  const vaultChallenges = [
    {
      title:
        "Vault Door 1: Stronger Password",

      text:
        "Which pretend password is the safest choice?",

      icon:
        "🔐",

      answers: [
        "Riley2015",
        "password77",
        "Cactus-Moon-Rocket-48",
        "qwerty123!"
      ],

      correctIndex:
        2,

      explanation:
        "Cactus-Moon-Rocket-48 is longer, less predictable, and does not appear to contain personal information."
    },


    {
      title:
        "Vault Door 2: Password Reuse",

      text:
        "A student uses the same password for email and gaming. What is the safest improvement?",

      icon:
        "🔁",

      answers: [
        "Add one extra number to the gaming password",
        "Create a completely different password for each account",
        "Use the same password but write it on a sticky note",
        "Share the password with a friend for backup"
      ],

      correctIndex:
        1,

      explanation:
        "Each important account should have a completely different password."
    },


    {
      title:
        "Vault Door 3: Verification Code",

      text:
        "Someone messages, “Send me the code that just appeared on your phone.” What should you do?",

      icon:
        "🔢",

      answers: [
        "Send the code quickly",
        "Post the code in a group chat",
        "Keep the code private and tell a trusted adult",
        "Ask the person why they need it, then send it"
      ],

      correctIndex:
        2,

      explanation:
        "Verification codes are secret. A legitimate helper should not ask you to send one through a message."
    },


    {
      title:
        "Vault Door 4: Suspicious Login",

      text:
        "An account shows a login from an unfamiliar device. What should happen first?",

      icon:
        "🚨",

      answers: [
        "Ignore it",
        "Tell a trusted adult and open the official app or site",
        "Reply to the unfamiliar device",
        "Post the warning online"
      ],

      correctIndex:
        1,

      explanation:
        "A child should involve a trusted adult and check the account through the official app or website."
    },


    {
      title:
        "Vault Door 5: Recovery Codes",

      text:
        "Where should backup recovery codes be kept?",

      icon:
        "🧾",

      answers: [
        "In a public social-media post",
        "In a shared group chat",
        "In a secure place managed with a trusted adult",
        "Inside the account username"
      ],

      correctIndex:
        2,

      explanation:
        "Recovery codes can unlock an account and should be stored securely with trusted-adult guidance."
    }
  ];


  /* =====================================================
     FINAL TEST QUESTIONS

     20 questions:
     - 5 password-strength questions
     - 5 password-reuse questions
     - 5 secret-code questions
     - 5 account-rescue questions
  ===================================================== */

  const finalTestQuestions = [
    /* -------------------------------------------------
       PASSWORD STRENGTH — 5
    ------------------------------------------------- */

    {
      category:
        "strength",

      icon:
        "🧪",

      question:
        "Which pretend password is generally safer?",

      choices: [
        "cat123",
        "BlueRiverTacoPlanet42",
        "password1",
        "qwerty!"
      ],

      correctIndex:
        1,

      explanation:
        "The longer, less predictable combination is safer than short common words or keyboard patterns."
    },


    {
      category:
        "strength",

      icon:
        "📅",

      question:
        "Why is using a real name and birth year in a password risky?",

      choices: [
        "It is too long",
        "The information may be easy to discover or guess",
        "It contains letters",
        "Websites do not allow names"
      ],

      correctIndex:
        1,

      explanation:
        "Names and birth years may be visible in profiles, posts, or records and can make a password easier to guess."
    },


    {
      category:
        "strength",

      icon:
        "⌨️",

      question:
        "Is qwerty! automatically strong because it contains a symbol?",

      choices: [
        "Yes, every symbol makes a password strong",
        "No, qwerty is still a common keyboard pattern",
        "Yes, because it is easy to remember",
        "Yes, because it has more than five characters"
      ],

      correctIndex:
        1,

      explanation:
        "A symbol does not fix a common and predictable keyboard pattern."
    },


    {
      category:
        "strength",

      icon:
        "🧠",

      question:
        "What is one useful feature of a strong passphrase?",

      choices: [
        "It uses several unrelated words",
        "It contains a real home address",
        "It is the same as the username",
        "It is only four characters long"
      ],

      correctIndex:
        0,

      explanation:
        "Several unrelated words can create a longer and less predictable passphrase."
    },


    {
      category:
        "strength",

      icon:
        "🚨",

      question:
        "What should a student type into the Password Safety Lab?",

      choices: [
        "A real email password",
        "A real school password",
        "A pretend password created only for practice",
        "A parent’s password"
      ],

      correctIndex:
        2,

      explanation:
        "Students should never enter a real password into a practice activity."
    },


    /* -------------------------------------------------
       PASSWORD REUSE — 5
    ------------------------------------------------- */

    {
      category:
        "reuse",

      icon:
        "🔁",

      question:
        "Why is reusing one password across several accounts risky?",

      choices: [
        "It makes the password too long",
        "One stolen password could open several accounts",
        "It prevents the account from loading",
        "It changes the username"
      ],

      correctIndex:
        1,

      explanation:
        "If one website is compromised, attackers may try the stolen password on other accounts."
    },


    {
      category:
        "reuse",

      icon:
        "🎮",

      question:
        "A student uses Rocket77 for gaming and Rocket78 for email. What is the problem?",

      choices: [
        "The passwords are completely unrelated",
        "The passwords follow nearly the same pattern",
        "The passwords are too long",
        "There is no problem"
      ],

      correctIndex:
        1,

      explanation:
        "Changing only one number creates nearly the same password and is not a strong unique-password habit."
    },


    {
      category:
        "reuse",

      icon:
        "🗝️",

      question:
        "What is the safest password plan for three important accounts?",

      choices: [
        "Use one password for all three",
        "Use three different passwords",
        "Use the username as the password",
        "Use the word password for all three"
      ],

      correctIndex:
        1,

      explanation:
        "Each important account should use a different password."
    },


    {
      category:
        "reuse",

      icon:
        "🧰",

      question:
        "How can a trusted adult help manage many unique passwords?",

      choices: [
        "Post them online",
        "Use a trusted password manager",
        "Send them in group chats",
        "Use one easy password everywhere"
      ],

      correctIndex:
        1,

      explanation:
        "A trusted password manager can help families securely create and store unique passwords."
    },


    {
      category:
        "reuse",

      icon:
        "📄",

      question:
        "Where should passwords not be stored?",

      choices: [
        "In a trusted password manager",
        "In a secure place managed with an adult",
        "On a public sticky note beside the computer",
        "In an approved secure system"
      ],

      correctIndex:
        2,

      explanation:
        "A visible sticky note can expose passwords to anyone nearby."
    },


    /* -------------------------------------------------
       SECRET CODES — 5
    ------------------------------------------------- */

    {
      category:
        "codes",

      icon:
        "🔢",

      question:
        "Who should receive a verification code sent to your device?",

      choices: [
        "A stranger claiming to be support",
        "A friend in a game",
        "No one through a message",
        "Anyone who asks politely"
      ],

      correctIndex:
        2,

      explanation:
        "Verification codes should not be sent to other people through messages."
    },


    {
      category:
        "codes",

      icon:
        "📌",

      question:
        "How should a device PIN be treated?",

      choices: [
        "Like public information",
        "Like secret account information",
        "Like a favorite color",
        "Like a game score"
      ],

      correctIndex:
        1,

      explanation:
        "A device PIN protects access and should remain private."
    },


    {
      category:
        "codes",

      icon:
        "🧾",

      question:
        "What can backup recovery codes do?",

      choices: [
        "Decorate a profile",
        "Help unlock an account",
        "Change a favorite color",
        "Increase a game score"
      ],

      correctIndex:
        1,

      explanation:
        "Recovery codes can provide account access and must be stored securely."
    },


    {
      category:
        "codes",

      icon:
        "📨",

      question:
        "A message says, “I work for the game company. Send your password so I can fix the account.” What should you do?",

      choices: [
        "Send the password",
        "Send only half the password",
        "Do not send it and tell a trusted adult",
        "Post the password publicly"
      ],

      correctIndex:
        2,

      explanation:
        "Legitimate support workers should not ask a child to send a password through a message."
    },


    {
      category:
        "codes",

      icon:
        "🔗",

      question:
        "How should a password-reset link be treated?",

      choices: [
        "Share it with friends",
        "Post it online",
        "Keep it private and use it only through the official account process",
        "Forward it to strangers"
      ],

      correctIndex:
        2,

      explanation:
        "Password-reset links can provide control of an account and should remain private."
    },


    /* -------------------------------------------------
       ACCOUNT RESCUE — 5
    ------------------------------------------------- */

    {
      category:
        "rescue",

      icon:
        "🛑",

      question:
        "What should a child do first after receiving a suspicious request for a login code?",

      choices: [
        "Send the code",
        "Stop responding",
        "Delete the whole account immediately",
        "Post the request online"
      ],

      correctIndex:
        1,

      explanation:
        "Stopping the conversation prevents the person from gathering more information."
    },


    {
      category:
        "rescue",

      icon:
        "🤝",

      question:
        "Who should help a child respond to a compromised account?",

      choices: [
        "An unknown online player",
        "A trusted adult",
        "The suspicious account",
        "A random follower"
      ],

      correctIndex:
        1,

      explanation:
        "A trusted adult can help verify the problem and guide recovery."
    },


    {
      category:
        "rescue",

      icon:
        "🌐",

      question:
        "How should you reach an account after receiving a suspicious link?",

      choices: [
        "Use the suspicious link",
        "Open the official app or type the official website address",
        "Ask the stranger for another link",
        "Forward the link to friends"
      ],

      correctIndex:
        1,

      explanation:
        "Going directly to the official app or website avoids using a potentially fake link."
    },


    {
      category:
        "rescue",

      icon:
        "📱",

      question:
        "Why should unfamiliar active sessions be signed out?",

      choices: [
        "To remove devices that may have unauthorized access",
        "To change the profile picture",
        "To increase storage space",
        "To make the password shorter"
      ],

      correctIndex:
        0,

      explanation:
        "Signing out unfamiliar sessions can remove someone who is already inside the account."
    },


    {
      category:
        "rescue",

      icon:
        "🛡️",

      question:
        "What does multifactor authentication add?",

      choices: [
        "A second protection step",
        "A public password",
        "A shorter username",
        "A social-media post"
      ],

      correctIndex:
        0,

      explanation:
        "Multifactor authentication requires another verification step in addition to the password."
    }
  ];


  /* =====================================================
     PUBLIC DATA OBJECT
  ===================================================== */

  mission.data = {
    comparisonChallenges,

    commonPasswordWords,

    /*
      Keep the older name too so either analyzer version
      can read the same list.
    */

    bannedWords:
      commonPasswordWords,

    weakSequences,

    uniquePasswordHabits,

    codeKeeperItems,

    accountRescueSteps,

    vaultChallenges,

    finalTestQuestions
  };


  console.log(
    "Password Safe Keeper data loaded:",
    {
      comparisonChallenges:
        comparisonChallenges.length,

      uniquePasswordHabits:
        uniquePasswordHabits.length,

      codeKeeperItems:
        codeKeeperItems.length,

      accountRescueSteps:
        accountRescueSteps.length,

      vaultChallenges:
        vaultChallenges.length,

      finalTestQuestions:
        finalTestQuestions.length
    }
  );
})();
