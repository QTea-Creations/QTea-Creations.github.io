
"use strict";

(() => {
  const game = window.IdentityGame =
    window.IdentityGame || {};

  game.data = {
    lessons: {
      house: {
        title: "🏠 Home Address",
        text:
          "A home address is private because it tells people exactly where someone lives."
      },

      school: {
        title: "🏫 School Name",
        text:
          "A school name should stay private because it can reveal where a child can be found."
      },

      phone: {
        title: "📱 Phone Number",
        text:
          "A phone number is private. Strangers should not be able to contact you directly."
      },

      backpack: {
        title: "🎒 Safe Online Names",
        text:
          "Use an online name that does not reveal your real name, birthday, school, address, phone number, or location."
      },

      pizza: {
        title: "🍕 Favorite Food",
        text:
          "Favorite foods are usually safe to share because they do not reveal where you live or who you are."
      },

      controller: {
        title: "🎮 Gaming Username",
        text:
          "A gaming username is safer when it does not include your real name, birthday, school, address, or location."
      }
    },

    usernameWords: {
      colors: [
        "Purple",
        "Cyan",
        "Golden",
        "Silver",
        "Coral",
        "Emerald",
        "Indigo",
        "Sunny",
        "Cosmic",
        "Neon"
      ],

      traits: [
        "Brave",
        "Clever",
        "Curious",
        "Swift",
        "Kind",
        "Mighty",
        "Bright",
        "Calm",
        "Epic",
        "Lucky",
        "Super"
      ],

      animals: [
        "Dolphin",
        "Fox",
        "Owl",
        "Panda",
        "Turtle",
        "Dragon",
        "Tiger",
        "Penguin",
        "Koala",
        "Falcon"
      ],

      powers: [
        "Shield",
        "Rocket",
        "Spark",
        "Star",
        "Pixel",
        "Nova",
        "Comet",
        "Tech",
        "Signal",
        "Quest"
      ]
    },

    unsafeUsernames: [
      {
        username: "SarahLee2014",
        reason:
          "It may reveal a real first name, last name, and birth year."
      },

      {
        username: "SarahAtSunflower",
        reason:
          "It may reveal a real name and school."
      },

      {
        username: "PetalPointSarah",
        reason:
          "It may reveal a real name and location."
      },

      {
        username: "Sarah5550199",
        reason:
          "It may reveal a real name and phone number."
      },

      {
        username: "SarahLivesOnOak",
        reason:
          "It may reveal a real name and street information."
      }
    ],

    practiceQuestions: [
      {
        text: "Favorite color",
        answer: "safe",
        explanation:
          "Favorite colors are usually safe to share."
      },

      {
        text: "Home address",
        answer: "private",
        explanation:
          "Your home address should stay private."
      },

      {
        text: "Password",
        answer: "private",
        explanation:
          "Passwords should never be shared."
      },

      {
        text: "Favorite animal",
        answer: "safe",
        explanation:
          "Favorite animals are usually safe to share."
      },

      {
        text: "School name",
        answer: "private",
        explanation:
          "A school name can reveal where someone can find you."
      },

      {
        text: "A made-up online nickname",
        answer: "safe",
        explanation:
          "A made-up nickname is safe when it does not reveal personal details."
      },

      {
        text: "Phone number",
        answer: "private",
        explanation:
          "Phone numbers should stay private."
      },

      {
        text: "Favorite game",
        answer: "safe",
        explanation:
          "Favorite games are usually safe to share."
      },

      {
        text: "Birthday and birth year",
        answer: "private",
        explanation:
          "Birthdays can help someone identify you or guess a password."
      },

      {
        text: "Favorite pizza topping",
        answer: "safe",
        explanation:
          "Favorite foods are usually safe to share."
      }
    ],

    testQuestions: [
      {
        text: "Your home address",
        answer: "private",
        explanation:
          "Your home address reveals where you live."
      },

      {
        text: "Your favorite ice cream flavor",
        answer: "safe",
        explanation:
          "Favorite foods are usually safe to share."
      },

      {
        text: "Your full first and last name",
        answer: "private",
        explanation:
          "A full name can identify you."
      },

      {
        text: "A made-up online name",
        answer: "safe",
        explanation:
          "A made-up name is safer when it does not reveal personal details."
      },

      {
        text: "Your password",
        answer: "private",
        explanation:
          "Passwords should always stay private."
      },

      {
        text: "Your favorite game",
        answer: "safe",
        explanation:
          "Favorite games are usually safe to share."
      },

      {
        text: "Your parent or guardian's phone number",
        answer: "private",
        explanation:
          "Family contact information is private."
      },

      {
        text: "Your school name",
        answer: "private",
        explanation:
          "A school name can reveal where you can be found."
      },

      {
        text: "Your favorite superhero",
        answer: "safe",
        explanation:
          "That usually does not reveal personal information."
      },

      {
        text: "A photo showing your school uniform and school name",
        answer: "private",
        explanation:
          "Pictures can reveal private clues."
      },

      {
        text: "Your favorite color",
        answer: "safe",
        explanation:
          "Favorite colors are usually safe."
      },

      {
        text: "The street where you live",
        answer: "private",
        explanation:
          "Your street is part of your location."
      },

      {
        text: "A hobby you enjoy",
        answer: "safe",
        explanation:
          "Hobbies are usually safe to share."
      },

      {
        text: "Your birthday and birth year",
        answer: "private",
        explanation:
          "Birthdays can be used to identify you."
      },

      {
        text: "Your gaming password",
        answer: "private",
        explanation:
          "Gaming passwords should never be shared."
      },

      {
        text: "Your favorite animal",
        answer: "safe",
        explanation:
          "Favorite animals are usually safe."
      },

      {
        text: "Your exact current location",
        answer: "private",
        explanation:
          "Your current location should stay private."
      },

      {
        text: "A username containing your school and birth year",
        answer: "private",
        explanation:
          "That username reveals personal information."
      },

      {
        text: "A username like PurpleRocketFox",
        answer: "safe",
        explanation:
          "That username does not reveal personal details."
      },

      {
        text: "Your home Wi-Fi password",
        answer: "private",
        explanation:
          "Wi-Fi passwords should stay private."
      }
    ],

    identityProfiles: [
      {
        avatar: "👧",
        name: "Sarah Lee",
        birthday: "April 8, 2014",
        school: "Sunflower Spark Academy",
        location: "Petal Point",
        cardColor: "#ff70bd",
        unsafeUsername: "SarahLee2014",
        interestMission:
  "Sarah loves pink, butterflies, tacos, drawing, and painting.",

        interests: [
          { word: "Pink", emoji: "🩷" },
          { word: "Butterfly", emoji: "🦋" },
          { word: "Taco", emoji: "🌮" },
          { word: "Artist", emoji: "🎨" },
          { word: "Spark", emoji: "✨" }
        ],

        privateBlocks: [
          { word: "Sarah", reason: "real first name" },
          { word: "Lee", reason: "real last name" },
          { word: "April", reason: "birth month" },
          { word: "8", reason: "birthday number" },
          { word: "2014", reason: "birth year" },
          { word: "Sunflower", reason: "school clue" },
          { word: "PetalPoint", reason: "location clue" }
        ]
      },

      {
        avatar: "👦",
        name: "Mateo Cruz",
        birthday: "June 17, 2013",
        school: "Bluebell Comet Middle School",
        location: "Cloudberry Cove",
        cardColor: "#2eb8e6",
        unsafeUsername: "MateoBluebell13",
        interestMission:
  "Mateo loves blue, dolphins, pizza, soccer, and rockets.",

        interests: [
          { word: "Blue", emoji: "💙" },
          { word: "Dolphin", emoji: "🐬" },
          { word: "Pizza", emoji: "🍕" },
          { word: "Soccer", emoji: "⚽" },
          { word: "Rocket", emoji: "🚀" }
        ],

        privateBlocks: [
          { word: "Mateo", reason: "real first name" },
          { word: "Cruz", reason: "real last name" },
          { word: "June", reason: "birth month" },
          { word: "17", reason: "birthday number" },
          { word: "2013", reason: "birth year" },
          { word: "Bluebell", reason: "school clue" },
          { word: "Cloudberry", reason: "location clue" }
        ]
      },

      {
        avatar: "👧🏽",
        name: "Nia Brooks",
        birthday: "February 22, 2015",
        school: "Daisy Moon Elementary",
        location: "Starpetal Bay",
        cardColor: "#8d63f7",
        unsafeUsername: "NiaBrooks22",
        interestMission:
  "Nia loves purple, pandas, berries, dancing, and stars.",

        interests: [
          { word: "Purple", emoji: "💜" },
          { word: "Panda", emoji: "🐼" },
          { word: "Berry", emoji: "🍓" },
          { word: "Dance", emoji: "💃" },
          { word: "Nova", emoji: "🌟" }
        ],

        privateBlocks: [
          { word: "Nia", reason: "real first name" },
          { word: "Brooks", reason: "real last name" },
          { word: "February", reason: "birth month" },
          { word: "22", reason: "birthday number" },
          { word: "2015", reason: "birth year" },
          { word: "DaisyMoon", reason: "school clue" },
          { word: "Starpetal", reason: "location clue" }
        ]
      },

      {
        avatar: "👦🏻",
        name: "Oliver Chen",
        birthday: "September 4, 2012",
        school: "Marigold Quest Academy",
        location: "Rainbow Fern",
        cardColor: "#36b978",
        unsafeUsername: "OliverChen2012",
        interestMission:
  "Oliver loves green, turtles, noodles, building, and pixel games.",

        interests: [
          { word: "Green", emoji: "💚" },
          { word: "Turtle", emoji: "🐢" },
          { word: "Noodle", emoji: "🍜" },
          { word: "Builder", emoji: "🧱" },
          { word: "Pixel", emoji: "🟦" }
        ],

        privateBlocks: [
          { word: "Oliver", reason: "real first name" },
          { word: "Chen", reason: "real last name" },
          { word: "September", reason: "birth month" },
          { word: "4", reason: "birthday number" },
          { word: "2012", reason: "birth year" },
          { word: "Marigold", reason: "school clue" },
          { word: "RainbowFern", reason: "location clue" }
        ]
      },

      {
        avatar: "👧🏾",
        name: "Amara Jones",
        birthday: "December 11, 2014",
        school: "Lavender Lantern School",
        location: "Moonpetal Harbor",
        cardColor: "#e5a928",
        unsafeUsername: "AmaraLavender11",
        interestMission:
  "Amara loves gold, owls, popcorn, reading, and comets.",

        interests: [
          { word: "Golden", emoji: "💛" },
          { word: "Owl", emoji: "🦉" },
          { word: "Popcorn", emoji: "🍿" },
          { word: "Reader", emoji: "📚" },
          { word: "Comet", emoji: "☄️" }
        ],

        privateBlocks: [
          { word: "Amara", reason: "real first name" },
          { word: "Jones", reason: "real last name" },
          { word: "December", reason: "birth month" },
          { word: "11", reason: "birthday number" },
          { word: "2014", reason: "birth year" },
          { word: "Lavender", reason: "school clue" },
          { word: "Moonpetal", reason: "location clue" }
        ]
      }
    ]
  };
})();
