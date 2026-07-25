"use strict";

/* =========================================================
   SAFETII NET — PASSWORD SAFE KEEPER
   Mission 2 Data

   Curriculum-aligned skills:

   1. Password Safety Lab
   2. Password Cracker Challenge
   3. Two-Factor Security Gate
   4. Account Defense Simulator
   5. Password Vault Practice
   6. Final Test
========================================================= */

(() => {
  const mission =
    window.PasswordMission =
      window.PasswordMission || {};


  /* =====================================================
     TRAINING 1 — PASSWORD SAFETY LAB
     PASSWORD COMPARISONS
  ===================================================== */

  const comparisonChallenges = [
    {
      prompt:
        "Which pretend password would be more difficult for an attacker to guess?",

      choices: [
        {
          value:
            "soccer123",

          note:
            "Short, common, and based on a popular interest."
        },

        {
          value:
            "PurpleRiverTaco88!",

          note:
            "Longer and made from unrelated ideas."
        }
      ],

      correctIndex:
        1,

      explanation:
        "PurpleRiverTaco88! is longer and less predictable. Attackers often try common words followed by simple numbers."
    },


    {
      prompt:
        "Which pretend password better resists a dictionary attack?",

      choices: [
        {
          value:
            "password1",

          note:
            "Uses one of the most commonly guessed password words."
        },

        {
          value:
            "CloudTigerLantern42",

          note:
            "Uses several unrelated words in a longer combination."
        }
      ],

      correctIndex:
        1,

      explanation:
        "A dictionary attack tries common words and common passwords. Adding one number to the word password does not make it secure."
    },


    {
      prompt:
        "Which pretend password better resists a pattern attack?",

      choices: [
        {
          value:
            "abcdef123",

          note:
            "Uses easy letter and number sequences."
        },

        {
          value:
            "MintRocketCactus7!",

          note:
            "Uses unrelated words and avoids simple sequences."
        }
      ],

      correctIndex:
        1,

      explanation:
        "Attackers often test sequences such as abcdef and 123456 early in an attack."
    },


    {
      prompt:
        "Which pretend password reveals fewer personal clues?",

      choices: [
        {
          value:
            "Emma2014",

          note:
            "Looks like a real name combined with a year."
        },

        {
          value:
            "Sunbeam-Penguin-Race",

          note:
            "Uses unrelated words instead of personal information."
        }
      ],

      correctIndex:
        1,

      explanation:
        "Names and birth years may be found in profiles, posts, school records, or conversations."
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
            "Longer and much less predictable."
        }
      ],

      correctIndex:
        1,

      explanation:
        "Adding symbols does not make a common keyboard pattern secure. Length and unpredictability matter."
    }
  ];


  /* =====================================================
     PASSWORD ANALYZER REFERENCE DATA
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
     TRAINING 2 — PASSWORD CRACKER CHALLENGE

     Students learn how password attacks work:

     - Dictionary attack
     - Personal-clue attack
     - Pattern attack
     - Brute-force attack
     - Password reuse attack
  ===================================================== */

  const passwordAttackChallenges = [
    {
      icon:
        "📖",

      attackName:
        "Dictionary Attack",

      password:
        "Sunshine1",

      attackDescription:
        "The attacker checks a long list of common words and common password combinations.",

      weaknesses: [
        "Uses a common word",
        "Adds only one simple number",
        "Matches a common password pattern"
      ],

      resistance:
        "low",

      crackTime:
        "Very quickly",

      explanation:
        "Dictionary attacks test common words such as sunshine, password, welcome, and dragon. A single number does not add much protection."
    },


    {
      icon:
        "🔎",

      attackName:
        "Personal-Clue Attack",

      password:
        "Jordan2015",

      attackDescription:
        "The attacker uses information discovered from profiles, posts, school activities, and conversations.",

      weaknesses: [
        "May contain a real name",
        "Looks like a birth year",
        "Uses information that could be researched"
      ],

      resistance:
        "low",

      crackTime:
        "Quickly after finding personal clues",

      explanation:
        "Names, birthdays, pets, teams, and schools can become password clues when they are shared online."
    },


    {
      icon:
        "⌨️",

      attackName:
        "Pattern Attack",

      password:
        "qwerty123!",

      attackDescription:
        "The attacker checks common keyboard paths, number sequences, and repeated characters.",

      weaknesses: [
        "Uses a keyboard pattern",
        "Uses a number sequence",
        "A symbol was added to a predictable base"
      ],

      resistance:
        "low",

      crackTime:
        "Very quickly",

      explanation:
        "Symbols do not repair a password built from common keyboard and number patterns."
    },


    {
      icon:
        "🤖",

      attackName:
        "Brute-Force Attack",

      password:
        "T7!pQ2",

      attackDescription:
        "A computer rapidly tries many possible combinations until it finds the correct one.",

      weaknesses: [
        "Uses several character types",
        "But the password is still short",
        "Short passwords require fewer combinations"
      ],

      resistance:
        "medium",

      crackTime:
        "Slower than a common word, but still vulnerable",

      explanation:
        "A short password can still be vulnerable even when it contains capitals, numbers, and symbols. More length creates many more possible combinations."
    },


    {
      icon:
        "🧱",

      attackName:
        "Long-Passphrase Test",

      password:
        "Cactus-Moon-Rocket-Lantern-84",

      attackDescription:
        "The attacker tries dictionary words, personal clues, patterns, and many combinations.",

      weaknesses: [],

      strengths: [
        "Long",
        "Uses several unrelated words",
        "Does not reveal obvious personal information",
        "Avoids common sequences"
      ],

      resistance:
        "high",

      crackTime:
        "Much more difficult",

      explanation:
        "Long passphrases made from unrelated words create far more possible combinations than short predictable passwords."
    },


    {
      icon:
        "🔁",

      attackName:
        "Credential Reuse Attack",

      password:
        "BlueTiger47!",

      attackDescription:
        "A password stolen from one website is tested on email, gaming, school, and other accounts.",

      weaknesses: [
        "The same password is used on several accounts",
        "One breach could expose every reused account"
      ],

      resistance:
        "low",

      crackTime:
        "Immediate if the password was already stolen",

      explanation:
        "Even a fairly strong password becomes dangerous when it is reused. Every important account should have a different password."
    },


    {
      icon:
        "🧩",

      attackName:
        "Obvious Substitution Attack",

      password:
        "P@ssw0rd!",

      attackDescription:
        "The attacker tests common letter replacements such as @ for a and 0 for o.",

      weaknesses: [
        "Built from the word password",
        "Uses predictable substitutions",
        "Matches a widely known pattern"
      ],

      resistance:
        "low",

      crackTime:
        "Very quickly",

      explanation:
        "Attackers already know common substitutions. Replacing a few letters in a common word does not create a strong password."
    },


    {
      icon:
        "🗝️",

      attackName:
        "Unique Password Defense",

      password:
        "Different password for every account",

      attackDescription:
        "An attacker steals one password and tries it on several other services.",

      weaknesses: [],

      strengths: [
        "Only one account is affected",
        "Other accounts use different passwords",
        "The stolen password cannot unlock everything"
      ],

      resistance:
        "high",

      crackTime:
        "The stolen password fails on other accounts",

      explanation:
        "Unique passwords limit the damage caused by a breach."
    }
  ];


  /* =====================================================
     TRAINING 3 — TWO-FACTOR SECURITY GATE

     Factor categories:

     KNOW:
     Password, passphrase, PIN

     HAVE:
     Trusted device, authenticator code,
     physical security key

     ARE:
     Fingerprint, face scan
  ===================================================== */

  const twoFactorScenarios = [
    {
      accountIcon:
        "🎮",

      accountName:
        "Gaming Account",

      scenario:
        "The account already uses a password. Choose a different second factor.",

      firstFactor:
        "Password",

      choices: [
        {
          icon:
            "📱",

          label:
            "Changing code from an authenticator app",

          factorType:
            "have",

          correct:
            true,

          explanation:
            "The password is something the user knows. The trusted-device code is something the user has."
        },

        {
          icon:
            "🔑",

          label:
            "Type the same password a second time",

          factorType:
            "know",

          correct:
            false,

          explanation:
            "Typing the same password twice does not create two different authentication factors."
        },

        {
          icon:
            "👤",

          label:
            "Enter the account username again",

          factorType:
            "identity",

          correct:
            false,

          explanation:
            "A username identifies the account, but it is not a second security factor."
        }
      ]
    },


    {
      accountIcon:
        "📧",

      accountName:
        "Email Account",

      scenario:
        "The account uses a passphrase. What could add a second protection layer?",

      firstFactor:
        "Passphrase",

      choices: [
        {
          icon:
            "🫆",

          label:
            "Fingerprint approval",

          factorType:
            "are",

          correct:
            true,

          explanation:
            "The passphrase is something the user knows. A fingerprint is something the user is."
        },

        {
          icon:
            "📝",

          label:
            "A second security question",

          factorType:
            "know",

          correct:
            false,

          explanation:
            "A security answer is still something the user knows, so it does not create a different factor category."
        },

        {
          icon:
            "📅",

          label:
            "Enter a birth year",

          factorType:
            "know",

          correct:
            false,

          explanation:
            "A birth year may be easy to discover and is not a strong second factor."
        }
      ]
    },


    {
      accountIcon:
        "🎓",

      accountName:
        "School Account",

      scenario:
        "The student signs in with a password. Choose the strongest additional factor.",

      firstFactor:
        "Password",

      choices: [
        {
          icon:
            "🔐",

          label:
            "Physical security key",

          factorType:
            "have",

          correct:
            true,

          explanation:
            "The key is a physical object the approved user possesses."
        },

        {
          icon:
            "🔁",

          label:
            "Enter the password again",

          factorType:
            "know",

          correct:
            false,

          explanation:
            "Repeating one factor does not create two-factor authentication."
        },

        {
          icon:
            "🎨",

          label:
            "Answer with a favorite color",

          factorType:
            "know",

          correct:
            false,

          explanation:
            "A favorite color is another knowledge-based answer and may be easy to guess."
        }
      ]
    },


    {
      accountIcon:
        "📱",

      accountName:
        "Tablet Account",

      scenario:
        "The tablet already requires a PIN. What could be used as the second factor?",

      firstFactor:
        "Device PIN",

      choices: [
        {
          icon:
            "🙂",

          label:
            "Approved face scan",

          factorType:
            "are",

          correct:
            true,

          explanation:
            "The PIN is something the user knows. A face scan is something the user is."
        },

        {
          icon:
            "🔢",

          label:
            "A second PIN",

          factorType:
            "know",

          correct:
            false,

          explanation:
            "Two PINs are still two examples of the same factor type."
        },

        {
          icon:
            "👥",

          label:
            "Tell a friend the PIN",

          factorType:
            "unsafe",

          correct:
            false,

          explanation:
            "Sharing the PIN weakens security instead of adding protection."
        }
      ]
    },


    {
      accountIcon:
        "🛒",

      accountName:
        "Shopping Account",

      scenario:
        "A login screen asks for a password and then sends a changing code to the trusted account owner’s device.",

      firstFactor:
        "Password",

      choices: [
        {
          icon:
            "✅",

          label:
            "Use the changing code on the official login screen",

          factorType:
            "have",

          correct:
            true,

          explanation:
            "The changing code adds possession of the trusted device as a second factor."
        },

        {
          icon:
            "💬",

          label:
            "Send the code to someone who messages asking for it",

          factorType:
            "unsafe",

          correct:
            false,

          explanation:
            "Verification codes should never be sent to another person through a message."
        },

        {
          icon:
            "📢",

          label:
            "Post the code online",

          factorType:
            "unsafe",

          correct:
            false,

          explanation:
            "A verification code can help unlock an account and must stay private."
        }
      ]
    },


    {
      accountIcon:
        "🎥",

      accountName:
        "Video Account",

      scenario:
        "The account uses a password. Which choice is not true two-factor authentication?",

      firstFactor:
        "Password",

      choices: [
        {
          icon:
            "🔁",

          label:
            "Password plus the same password typed again",

          factorType:
            "know",

          correct:
            true,

          explanation:
            "This is not true two-factor authentication because both steps use the same proof."
        },

        {
          icon:
            "📱",

          label:
            "Password plus authenticator approval",

          factorType:
            "have",

          correct:
            false,

          explanation:
            "This does use two different factors: knowledge and possession."
        },

        {
          icon:
            "🫆",

          label:
            "Password plus fingerprint",

          factorType:
            "are",

          correct:
            false,

          explanation:
            "This uses knowledge plus a biometric factor."
        }
      ],

      reverseQuestion:
        true
    },


    {
      accountIcon:
        "☁️",

      accountName:
        "Cloud Storage Account",

      scenario:
        "A stranger claims to be technical support and asks for the verification code.",

      firstFactor:
        "Password",

      choices: [
        {
          icon:
            "🛑",

          label:
            "Do not send the code and tell a trusted adult",

          factorType:
            "safe-response",

          correct:
            true,

          explanation:
            "Verification codes are secret. A legitimate helper should not ask for one through a message."
        },

        {
          icon:
            "📨",

          label:
            "Send the code because the person said they are support",

          factorType:
            "unsafe",

          correct:
            false,

          explanation:
            "Attackers often impersonate support workers to steal changing login codes."
        },

        {
          icon:
            "➗",

          label:
            "Send only half of the code",

          factorType:
            "unsafe",

          correct:
            false,

          explanation:
            "No part of a verification code should be shared."
        }
      ]
    },


    {
      accountIcon:
        "🏆",

      accountName:
        "Competition Account",

      scenario:
        "Choose the login setup that provides two different protection factors.",

      firstFactor:
        "Choose the full setup",

      choices: [
        {
          icon:
            "🧠📱",

          label:
            "Passphrase plus trusted-device approval",

          factorType:
            "know-have",

          correct:
            true,

          explanation:
            "The passphrase is something the user knows, while device approval is something the user has."
        },

        {
          icon:
            "🧠🧠",

          label:
            "Password plus security answer",

          factorType:
            "know-know",

          correct:
            false,

          explanation:
            "Both are knowledge factors."
        },

        {
          icon:
            "👤🔑",

          label:
            "Username plus password",

          factorType:
            "identifier-know",

          correct:
            false,

          explanation:
            "A username identifies the account. It is not a second authentication factor."
        }
      ]
    }
  ];


  /* =====================================================
     TRAINING 4 — ACCOUNT DEFENSE SIMULATOR
  ===================================================== */

  const accountDefenseScenarios = [
    {
      icon:
        "💬",

      title:
        "Suspicious Code Request",

      alert:
        "Someone messages, “Send me the six-digit code that just appeared on your device.”",

      choices: [
        "Send the code",
        "Stop responding and tell a trusted adult",
        "Post the code in a group chat",
        "Ask why they need it and then send it"
      ],

      correctIndex:
        1,

      explanation:
        "Verification codes are secret. Stop responding and involve a trusted adult."
    },


    {
      icon:
        "📱",

      title:
        "Unknown Device Login",

      alert:
        "The account shows a login from a device the user does not recognize.",

      choices: [
        "Ignore the alert",
        "Use the official app with a trusted adult and review active sessions",
        "Message the unknown device",
        "Post the alert online"
      ],

      correctIndex:
        1,

      explanation:
        "The account should be checked through the official service. Unknown sessions may need to be signed out."
    },


    {
      icon:
        "🔁",

      title:
        "Reused Password Exposed",

      alert:
        "A password used on several accounts appears in a data breach.",

      choices: [
        "Change only the breached account",
        "Change every account that reused the password",
        "Keep using the password because it was strong",
        "Add one number to the same password everywhere"
      ],

      correctIndex:
        1,

      explanation:
        "Every account using the exposed password needs a new and completely different password."
    },


    {
      icon:
        "🔗",

      title:
        "Unexpected Reset Link",

      alert:
        "An email says the account must be reset immediately using a link.",

      choices: [
        "Click the link immediately",
        "Open the official app or website directly with a trusted adult",
        "Forward the link to friends",
        "Reply with the current password"
      ],

      correctIndex:
        1,

      explanation:
        "Do not trust an unexpected link. Go directly to the official account service."
    },


    {
      icon:
        "🚨",

      title:
        "Repeated Failed Logins",

      alert:
        "The account reports many failed login attempts.",

      choices: [
        "Do nothing",
        "Review security with a trusted adult and strengthen the account",
        "Post the password so friends can test it",
        "Turn off account alerts"
      ],

      correctIndex:
        1,

      explanation:
        "Repeated attempts may mean someone is guessing the password. Review the account, change weak passwords, and enable additional protection."
    },


    {
      icon:
        "🛡️",

      title:
        "Account Recovered",

      alert:
        "The password has been changed and unknown sessions have been removed. What should happen next?",

      choices: [
        "Turn on multifactor authentication",
        "Reuse the old password later",
        "Share the new password with friends",
        "Disable security alerts"
      ],

      correctIndex:
        0,

      explanation:
        "Multifactor authentication adds another protection layer after the password."
    }
  ];


  /* =====================================================
     PASSWORD VAULT PRACTICE
  ===================================================== */

  const vaultChallenges = [
    {
      title:
        "Vault Door 1: Resist the Attack",

      text:
        "Which pretend password would best resist common words, personal clues, and simple patterns?",

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
        "Cactus-Moon-Rocket-48 is long, unpredictable, and does not contain obvious personal information."
    },


    {
      title:
        "Vault Door 2: Stop Password Reuse",

      text:
        "A password stolen from a game account is also used for email. What is the safest response?",

      icon:
        "🔁",

      answers: [
        "Add one number to the email password",
        "Create a completely different password for each account",
        "Keep using the password because it is long",
        "Share it with a friend for backup"
      ],

      correctIndex:
        1,

      explanation:
        "Every important account should have its own password."
    },


    {
      title:
        "Vault Door 3: Build Two Factors",

      text:
        "Which login uses two different authentication factors?",

      icon:
        "🛡️",

      answers: [
        "Password plus the same password again",
        "Password plus a trusted-device authenticator code",
        "Username plus password",
        "Password plus a security question"
      ],

      correctIndex:
        1,

      explanation:
        "A password is something the user knows. A trusted-device code is something the user has."
    },


    {
      title:
        "Vault Door 4: Protect the Code",

      text:
        "Someone messages asking for the changing login code. What should the student do?",

      icon:
        "🔢",

      answers: [
        "Send the code",
        "Send only part of the code",
        "Keep the code private and tell a trusted adult",
        "Post it in a group chat"
      ],

      correctIndex:
        2,

      explanation:
        "Changing login codes are secret and should never be sent through messages."
    },


    {
      title:
        "Vault Door 5: Defend the Account",

      text:
        "An account shows an unfamiliar login. What is the safest action?",

      icon:
        "🚨",

      answers: [
        "Ignore it",
        "Use the official service with a trusted adult and review security",
        "Reply to the unfamiliar device",
        "Post the alert publicly"
      ],

      correctIndex:
        1,

      explanation:
        "The account should be checked through the official app or website, and unknown sessions should be removed."
    }
  ];


  /* =====================================================
     FINAL TEST — 20 QUESTIONS
  ===================================================== */

  const finalTestQuestions = [
    /* PASSWORD STRENGTH */

    {
      category:
        "strength",

      icon:
        "🧪",

      question:
        "Which pretend password would generally be more difficult to guess?",

      choices: [
        "cat123",
        "BlueRiverTacoPlanet42",
        "password1",
        "qwerty!"
      ],

      correctIndex:
        1,

      explanation:
        "Long, unrelated word combinations are usually harder to guess than common words and sequences."
    },


    {
      category:
        "strength",

      icon:
        "📅",

      question:
        "Why is a real name combined with a birth year risky in a password?",

      choices: [
        "It is too long",
        "The information may be researched or guessed",
        "It contains letters",
        "Websites do not allow years"
      ],

      correctIndex:
        1,

      explanation:
        "Personal information may be discovered through profiles, posts, and conversations."
    },


    {
      category:
        "strength",

      icon:
        "⌨️",

      question:
        "Is qwerty! automatically strong because it contains a symbol?",

      choices: [
        "Yes",
        "No, qwerty is still a common keyboard pattern",
        "Yes, because it is easy to remember",
        "Yes, because it contains six letters"
      ],

      correctIndex:
        1,

      explanation:
        "A symbol does not fix a common keyboard pattern."
    },


    {
      category:
        "strength",

      icon:
        "🧠",

      question:
        "What is one useful feature of a strong passphrase?",

      choices: [
        "Several unrelated words",
        "A home address",
        "The account username",
        "Only four characters"
      ],

      correctIndex:
        0,

      explanation:
        "Several unrelated words can create a long and less predictable passphrase."
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
        "A pretend password made only for practice",
        "A parent’s password"
      ],

      correctIndex:
        2,

      explanation:
        "Real passwords should never be entered into a training activity."
    },


    /* PASSWORD ATTACKS */

    {
      category:
        "attacks",

      icon:
        "📖",

      question:
        "What does a dictionary attack try?",

      choices: [
        "Common words and common password combinations",
        "Only fingerprints",
        "Only usernames",
        "Only account pictures"
      ],

      correctIndex:
        0,

      explanation:
        "Dictionary attacks test lists of words and commonly used passwords."
    },


    {
      category:
        "attacks",

      icon:
        "🤖",

      question:
        "What happens during a brute-force attack?",

      choices: [
        "A computer tries many possible combinations",
        "A trusted adult resets the account",
        "A user writes a password down",
        "A website changes its logo"
      ],

      correctIndex:
        0,

      explanation:
        "Brute-force attacks systematically try many possible passwords."
    },


    {
      category:
        "attacks",

      icon:
        "🔎",

      question:
        "Which information could help an attacker perform a personal-clue attack?",

      choices: [
        "A real name, birthday, pet, or favorite team",
        "A random unrelated phrase",
        "A physical security key",
        "A changing authenticator code"
      ],

      correctIndex:
        0,

      explanation:
        "Public personal details can provide clues for guessing passwords."
    },


    {
      category:
        "attacks",

      icon:
        "🔁",

      question:
        "Why is password reuse dangerous?",

      choices: [
        "One stolen password could open several accounts",
        "It makes usernames longer",
        "It prevents the internet from working",
        "It changes the device screen"
      ],

      correctIndex:
        0,

      explanation:
        "Attackers may test a stolen password on other services."
    },


    {
      category:
        "attacks",

      icon:
        "🧩",

      question:
        "Why is P@ssw0rd! still weak?",

      choices: [
        "Attackers know common substitutions",
        "It contains a symbol",
        "It contains uppercase letters",
        "It is impossible to type"
      ],

      correctIndex:
        0,

      explanation:
        "Replacing a few letters in a common word follows a predictable pattern."
    },


    /* TWO-FACTOR AUTHENTICATION */

    {
      category:
        "two-factor",

      icon:
        "🛡️",

      question:
        "Which login uses two different factors?",

      choices: [
        "Password plus trusted-device approval",
        "Password entered twice",
        "Username plus password",
        "Password plus a security answer"
      ],

      correctIndex:
        0,

      explanation:
        "A password is knowledge. Trusted-device approval is possession."
    },


    {
      category:
        "two-factor",

      icon:
        "🧠",

      question:
        "A password belongs to which authentication category?",

      choices: [
        "Something you know",
        "Something you have",
        "Something you are",
        "Something you post"
      ],

      correctIndex:
        0,

      explanation:
        "Passwords, passphrases, and PINs are things the user knows."
    },


    {
      category:
        "two-factor",

      icon:
        "📱",

      question:
        "An authenticator app on a trusted device is usually what type of factor?",

      choices: [
        "Something you have",
        "Something you know",
        "Something you post",
        "Something public"
      ],

      correctIndex:
        0,

      explanation:
        "The trusted device is something the user possesses."
    },


    {
      category:
        "two-factor",

      icon:
        "🫆",

      question:
        "A fingerprint is which type of factor?",

      choices: [
        "Something you are",
        "Something you know",
        "Something you type twice",
        "Something public"
      ],

      correctIndex:
        0,

      explanation:
        "Biometric checks are based on something the user is."
    },


    {
      category:
        "two-factor",

      icon:
        "🔢",

      question:
        "What should happen when someone messages asking for a verification code?",

      choices: [
        "Keep it private and tell a trusted adult",
        "Send it immediately",
        "Post it online",
        "Send half of it"
      ],

      correctIndex:
        0,

      explanation:
        "Verification codes can unlock accounts and must remain private."
    },


    /* ACCOUNT DEFENSE */

    {
      category:
        "defense",

      icon:
        "🛑",

      question:
        "What should a child do first after receiving a suspicious request for a login code?",

      choices: [
        "Stop responding",
        "Send the code",
        "Post the request publicly",
        "Disable all security alerts"
      ],

      correctIndex:
        0,

      explanation:
        "Stopping contact prevents the suspicious person from collecting more information."
    },


    {
      category:
        "defense",

      icon:
        "🤝",

      question:
        "Who should help a child respond to a possibly compromised account?",

      choices: [
        "A trusted adult",
        "An unknown online player",
        "The suspicious account",
        "A random follower"
      ],

      correctIndex:
        0,

      explanation:
        "A trusted adult can help verify the problem and guide account recovery."
    },


    {
      category:
        "defense",

      icon:
        "🌐",

      question:
        "How should an account be checked after receiving a suspicious link?",

      choices: [
        "Open the official app or website directly",
        "Use the suspicious link",
        "Ask the sender for another link",
        "Forward the link to friends"
      ],

      correctIndex:
        0,

      explanation:
        "Going directly to the official service avoids a potentially fake link."
    },


    {
      category:
        "defense",

      icon:
        "📱",

      question:
        "Why should unfamiliar active sessions be signed out?",

      choices: [
        "To remove devices that may have unauthorized access",
        "To make the username shorter",
        "To increase game points",
        "To change the profile picture"
      ],

      correctIndex:
        0,

      explanation:
        "An unfamiliar session may represent someone already inside the account."
    },


    {
      category:
        "defense",

      icon:
        "🔁",

      question:
        "A reused password is exposed in a breach. What should happen?",

      choices: [
        "Replace it everywhere it was reused",
        "Keep using it",
        "Add the same number to every copy",
        "Share it with friends"
      ],

      correctIndex:
        0,

      explanation:
        "Every account using the exposed password needs a new and unique password."
    }
  ];


  /* =====================================================
     PUBLIC MISSION DATA
  ===================================================== */

  mission.data = {
    comparisonChallenges,

    commonPasswordWords,

    bannedWords:
      commonPasswordWords,

    weakSequences,

    passwordAttackChallenges,

    twoFactorScenarios,

    accountDefenseScenarios,

    vaultChallenges,

    finalTestQuestions
  };


  console.log(
    "Password Safe Keeper curriculum data loaded:",
    {
      comparisonChallenges:
        comparisonChallenges.length,

      passwordAttackChallenges:
        passwordAttackChallenges.length,

      twoFactorScenarios:
        twoFactorScenarios.length,

      accountDefenseScenarios:
        accountDefenseScenarios.length,

      vaultChallenges:
        vaultChallenges.length,

      finalTestQuestions:
        finalTestQuestions.length
    }
  );
})();
