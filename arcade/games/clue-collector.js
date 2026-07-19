"use strict";

/* =========================================================
   SAFETII NET — CYBER ARCADE
   CLUE COLLECTOR: SOCIAL MEDIA EDITION
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

  const heatNames = {
    mild: "Mild",
    spicy: "Spicy",
    hot: "Hot"
  };

  /*
    Each heat level has its own completely different
    arcade-only question bank.

    These scenarios should not be copied into the mission.
  */

  const profilesByHeat = {
    mild: [
      {
        id: "mild-instagram-ava",
        platform: "instagram",
        platformLabel: "Instagram-style",
        heading: "Ava shared this photo on Instagram.",
        name: "Ava",
        avatar: "💃",
        username: "@AvaDanceStars",
        location: "Brighton Dance Center",
        mediaTitle: "Dance rehearsal",
        mediaEmoji: "💃",
        mediaClues: [
          {
            id: "studio-sign",
            text: "Brighton Dance Center",
            risky: true,
            title: "Dance studio name",
            explanation:
              "The studio name reveals a place Ava visits regularly."
          },
          {
            id: "dance-shoes",
            text: "🩰 Dance shoes",
            risky: false,
            title: "Dance shoes",
            explanation:
              "Dance shoes show an interest or activity but do not identify Ava’s location by themselves."
          },
          {
            id: "rehearsal-board",
            text: "REHEARSAL: THU 6:00",
            risky: true,
            title: "Rehearsal schedule",
            explanation:
              "A repeating day and time tells people when Ava may be at the studio."
          }
        ],
        captionParts: [
          {
            id: "dance-interest",
            text: "I love learning new dances!",
            risky: false,
            title: "Favorite activity",
            explanation:
              "Liking dance is broad self-expression and is usually safe to share."
          },
          {
            id: "weekly-schedule",
            text: "I’m here every Thursday at 6:00.",
            risky: true,
            title: "Weekly schedule",
            explanation:
              "This reveals a predictable routine and when Ava may be found."
          },
          {
            id: "pickup-place",
            text: "Mom picks me up at the side entrance.",
            risky: true,
            title: "Pickup location",
            explanation:
              "A specific entrance gives strangers a precise meeting and pickup location."
          }
        ],
        extraClues: [
          {
            id: "instagram-username",
            text: "@AvaDanceStars",
            risky: false,
            title: "General username",
            explanation:
              "This username shows Ava likes dance, but it does not include a school, address, age, or full name."
          },
          {
            id: "instagram-location",
            text: "📍 Brighton Dance Center",
            risky: true,
            title: "Location tag",
            explanation:
              "The location tag identifies exactly where the photo was taken."
          }
        ]
      },

      {
        id: "mild-tiktok-noah",
        platform: "tiktok",
        platformLabel: "TikTok-style",
        heading: "Noah uploaded this video to TikTok.",
        name: "Noah",
        avatar: "🛹",
        username: "@NoahSkates",
        location: "",
        mediaTitle: "After-school skate video",
        mediaEmoji: "🛹",
        mediaClues: [
          {
            id: "park-sign",
            text: "Riverside Skate Park",
            risky: true,
            title: "Park sign",
            explanation:
              "The visible sign identifies the exact park where Noah spends time."
          },
          {
            id: "skateboard",
            text: "🛹 Skateboard",
            risky: false,
            title: "Skateboard",
            explanation:
              "Showing a skateboard reveals an interest, not Noah’s private information."
          },
          {
            id: "bus-sign",
            text: "Bus 42 stops here",
            risky: true,
            title: "Bus information",
            explanation:
              "A bus number and stop can help narrow down Noah’s route and neighborhood."
          }
        ],
        captionParts: [
          {
            id: "skating-love",
            text: "Skating is the best!",
            risky: false,
            title: "Skating interest",
            explanation:
              "A favorite activity is generally safe self-expression."
          },
          {
            id: "after-school-time",
            text: "I come here right after school at 3:45.",
            risky: true,
            title: "After-school routine",
            explanation:
              "The post reveals when Noah regularly arrives at the park."
          },
          {
            id: "alone-detail",
            text: "Usually nobody comes with me.",
            risky: true,
            title: "Being alone",
            explanation:
              "Announcing that Noah is usually alone can create a safety risk."
          }
        ],
        extraClues: [
          {
            id: "tiktok-username",
            text: "@NoahSkates",
            risky: false,
            title: "Interest-based username",
            explanation:
              "This username shows an interest but does not directly reveal Noah’s school, address, or age."
          }
        ]
      },

      {
        id: "mild-youtube-lena",
        platform: "youtube",
        platformLabel: "YouTube-style",
        heading: "Lena uploaded a video to YouTube.",
        name: "Lena",
        avatar: "🎨",
        username: "Lena Creates",
        location: "",
        mediaTitle: "My School Morning Routine",
        mediaEmoji: "🎥",
        mediaClues: [
          {
            id: "school-shirt",
            text: "PARKVIEW MIDDLE",
            risky: true,
            title: "School name on clothing",
            explanation:
              "A school name on a shirt can reveal where Lena attends school."
          },
          {
            id: "art-poster",
            text: "🎨 Art poster",
            risky: false,
            title: "Art poster",
            explanation:
              "A general hobby poster does not identify or locate Lena."
          },
          {
            id: "alarm-clock",
            text: "Bus arrives 7:12",
            risky: true,
            title: "Bus arrival time",
            explanation:
              "A bus arrival time reveals part of Lena’s daily routine."
          }
        ],
        captionParts: [
          {
            id: "favorite-breakfast",
            text: "My favorite breakfast is waffles.",
            risky: false,
            title: "Favorite breakfast",
            explanation:
              "A favorite food is a broad preference and usually safe to share."
          },
          {
            id: "school-name-description",
            text: "Then I head to Parkview Middle.",
            risky: true,
            title: "School name",
            explanation:
              "Naming the school reveals where Lena can regularly be found."
          },
          {
            id: "leave-home-time",
            text: "I leave home at 7:05 every weekday.",
            risky: true,
            title: "Daily departure time",
            explanation:
              "A predictable departure time reveals Lena’s routine."
          }
        ],
        extraClues: [
          {
            id: "youtube-title",
            text: "My School Morning Routine",
            risky: true,
            title: "Routine-focused video title",
            explanation:
              "A routine video can expose repeated times, places, routes, and habits."
          },
          {
            id: "youtube-channel",
            text: "Lena Creates",
            risky: false,
            title: "Creative channel name",
            explanation:
              "This channel name does not include Lena’s school, birthday, address, or full legal name."
          }
        ]
      },

      {
        id: "mild-snapchat-eli",
        platform: "snapchat",
        platformLabel: "Snapchat-style",
        heading: "Eli added this to a Snapchat story.",
        name: "Eli",
        avatar: "✈️",
        username: "Eli",
        location: "Live location on",
        mediaTitle: "Vacation countdown",
        mediaEmoji: "🧳",
        mediaClues: [
          {
            id: "house-number",
            text: "1842",
            risky: true,
            title: "House number",
            explanation:
              "A house number can help identify the exact home."
          },
          {
            id: "suitcase",
            text: "🧳 Suitcase",
            risky: false,
            title: "Suitcase",
            explanation:
              "A suitcase by itself does not identify Eli or reveal where the home is."
          },
          {
            id: "street-sign",
            text: "River Street",
            risky: true,
            title: "Street name",
            explanation:
              "A street name combined with a house number can reveal an exact address."
          }
        ],
        captionParts: [
          {
            id: "vacation-excitement",
            text: "I’m so excited for vacation!",
            risky: false,
            title: "Vacation excitement",
            explanation:
              "Being excited about a vacation is not private information by itself."
          },
          {
            id: "departure-time",
            text: "We leave tonight at 8:00.",
            risky: true,
            title: "Departure time",
            explanation:
              "This tells viewers exactly when the family plans to leave home."
          },
          {
            id: "trip-length",
            text: "Gone for two whole weeks!",
            risky: true,
            title: "Length of absence",
            explanation:
              "This announces how long the home may be empty."
          }
        ],
        extraClues: [
          {
            id: "snap-location",
            text: "📍 Live location on",
            risky: true,
            title: "Live location",
            explanation:
              "Live location can show where Eli is in real time."
          }
        ]
      },

      {
        id: "mild-discord-zuri",
        platform: "discord",
        platformLabel: "Discord-style",
        heading: "Zuri posted this in a public gaming server.",
        name: "Zuri",
        avatar: "🎮",
        username: "PixelZuri",
        location: "",
        mediaTitle: "Public server chat",
        mediaEmoji: "💬",
        mediaClues: [
          {
            id: "game-interest",
            text: "Favorite game: Galaxy Builders",
            risky: false,
            title: "Favorite game",
            explanation:
              "A favorite game is general self-expression."
          },
          {
            id: "age-profile",
            text: "Age: 11",
            risky: true,
            title: "Exact age",
            explanation:
              "Sharing an exact age in a public server tells strangers that Zuri is a child."
          },
          {
            id: "server-badge",
            text: "Public Server",
            risky: false,
            title: "Public server label",
            explanation:
              "The label is not private information, but it reminds players that strangers may see the conversation."
          }
        ],
        captionParts: [
          {
            id: "school-chat",
            text: "I go to Greenfield Academy.",
            risky: true,
            title: "School name",
            explanation:
              "Naming a school reveals a place Zuri visits regularly."
          },
          {
            id: "home-alone",
            text: "I’m home alone after 4:00.",
            risky: true,
            title: "Home-alone schedule",
            explanation:
              "This tells strangers when Zuri may be alone."
          },
          {
            id: "game-request",
            text: "Who wants to play Galaxy Builders?",
            risky: false,
            title: "Game invitation",
            explanation:
              "Inviting people to play a game is not automatically private, although Zuri should still follow server safety rules."
          }
        ],
        extraClues: [
          {
            id: "discord-username",
            text: "PixelZuri",
            risky: false,
            title: "Gaming username",
            explanation:
              "This username does not reveal a school, address, age, phone number, or schedule."
          }
        ]
      }
    ],

    spicy: [
      {
        id: "spicy-instagram-cam",
        platform: "instagram",
        platformLabel: "Instagram-style",
        heading: "Cam shared this robotics-team photo on Instagram.",
        name: "Cam",
        avatar: "🤖",
        username: "@CamBuildsBots",
        location: "",
        mediaTitle: "Robotics competition",
        mediaEmoji: "🤖",
        mediaClues: [
          {
            id: "team-banner",
            text: "NORTH HILL ROBOTICS",
            risky: true,
            title: "Team and school banner",
            explanation:
              "The banner can identify Cam’s school or organization."
          },
          {
            id: "competition-date",
            text: "APRIL 12",
            risky: true,
            title: "Event date",
            explanation:
              "A specific date becomes risky when combined with the event and location."
          },
          {
            id: "robot",
            text: "🤖 Competition robot",
            risky: false,
            title: "Robot project",
            explanation:
              "Showing a robot project is generally safe self-expression."
          }
        ],
        captionParts: [
          {
            id: "team-pride",
            text: "Proud of our robot!",
            risky: false,
            title: "Team pride",
            explanation:
              "Celebrating a project does not directly identify or locate Cam."
          },
          {
            id: "event-location",
            text: "Finals are at the downtown convention center.",
            risky: true,
            title: "Event location",
            explanation:
              "The location combined with the date can show where Cam will be."
          },
          {
            id: "arrival-time",
            text: "We arrive at 8:15 Saturday morning.",
            risky: true,
            title: "Arrival time",
            explanation:
              "An exact arrival time reveals when Cam and the team will be at that location."
          }
        ],
        extraClues: [
          {
            id: "robotics-username",
            text: "@CamBuildsBots",
            risky: false,
            title: "Interest-based username",
            explanation:
              "The username describes an interest without exposing Cam’s school, age, or address."
          }
        ]
      },

      {
        id: "spicy-tiktok-kiara",
        platform: "tiktok",
        platformLabel: "TikTok-style",
        heading: "Kiara posted a bedroom makeover video.",
        name: "Kiara",
        avatar: "✨",
        username: "@KikiRoomGlow",
        location: "",
        mediaTitle: "Bedroom makeover reveal",
        mediaEmoji: "✨",
        mediaClues: [
          {
            id: "calendar",
            text: "Mom works late Tue/Thu",
            risky: true,
            title: "Family calendar",
            explanation:
              "A family calendar can reveal when adults may be away from home."
          },
          {
            id: "school-badge",
            text: "EAST RIDGE EAGLES",
            risky: true,
            title: "School badge",
            explanation:
              "The badge can identify Kiara’s school."
          },
          {
            id: "room-color",
            text: "Purple room theme",
            risky: false,
            title: "Room color",
            explanation:
              "A room color is a broad preference and does not identify Kiara."
          },
          {
            id: "window-landmark",
            text: "Oak Tower outside window",
            risky: true,
            title: "Neighborhood landmark",
            explanation:
              "A recognizable landmark visible from a window can help narrow down where Kiara lives."
          }
        ],
        captionParts: [
          {
            id: "decor-love",
            text: "Purple is my favorite color.",
            risky: false,
            title: "Favorite color",
            explanation:
              "A favorite color is safe self-expression."
          },
          {
            id: "room-location",
            text: "My room faces Oak Tower.",
            risky: true,
            title: "View from home",
            explanation:
              "Describing the view from a bedroom can help identify the home’s location."
          }
        ],
        extraClues: [
          {
            id: "tiktok-room-username",
            text: "@KikiRoomGlow",
            risky: false,
            title: "Creative username",
            explanation:
              "The username does not expose a school, address, age, or schedule."
          }
        ]
      },

      {
        id: "spicy-youtube-malik",
        platform: "youtube",
        platformLabel: "YouTube-style",
        heading: "Malik uploaded a neighborhood bike-route video.",
        name: "Malik",
        avatar: "🚲",
        username: "Malik Moves",
        location: "",
        mediaTitle: "My Fastest Route Home",
        mediaEmoji: "🚲",
        mediaClues: [
          {
            id: "street-corner",
            text: "Pine Ave & 8th Street",
            risky: true,
            title: "Street intersection",
            explanation:
              "A street intersection can identify part of Malik’s route and neighborhood."
          },
          {
            id: "bike",
            text: "🚲 Blue bicycle",
            risky: false,
            title: "Bicycle",
            explanation:
              "A bicycle color is usually harmless by itself."
          },
          {
            id: "school-exit",
            text: "West Gate — Student Exit",
            risky: true,
            title: "School exit",
            explanation:
              "The school exit reveals where Malik begins the route."
          }
        ],
        captionParts: [
          {
            id: "route-time",
            text: "I take this route every day at 3:20.",
            risky: true,
            title: "Daily route time",
            explanation:
              "This reveals when Malik regularly travels through the route."
          },
          {
            id: "bike-love",
            text: "Riding my bike is my favorite exercise.",
            risky: false,
            title: "Favorite exercise",
            explanation:
              "A favorite exercise is broad self-expression."
          },
          {
            id: "home-ending",
            text: "The video ends right outside my house.",
            risky: true,
            title: "Home location shown",
            explanation:
              "Ending the route at home can reveal where Malik lives."
          }
        ],
        extraClues: [
          {
            id: "youtube-route-title",
            text: "My Fastest Route Home",
            risky: true,
            title: "Route-to-home title",
            explanation:
              "A route-to-home video can reveal a daily path and final home location."
          }
        ]
      },

      {
        id: "spicy-snapchat-rosa",
        platform: "snapchat",
        platformLabel: "Snapchat-style",
        heading: "Rosa shared a live story from a concert.",
        name: "Rosa",
        avatar: "🎤",
        username: "Rosa",
        location: "Live location: Arena District",
        mediaTitle: "Concert story",
        mediaEmoji: "🎤",
        mediaClues: [
          {
            id: "ticket-seat",
            text: "Section 112 • Row C • Seat 8",
            risky: true,
            title: "Exact seat location",
            explanation:
              "An exact seat number reveals precisely where Rosa is sitting."
          },
          {
            id: "band-shirt",
            text: "Favorite band shirt",
            risky: false,
            title: "Band shirt",
            explanation:
              "A favorite band is a broad preference."
          },
          {
            id: "parking-ticket",
            text: "Garage B • Level 3",
            risky: true,
            title: "Parking location",
            explanation:
              "The parking location reveals where Rosa may return after the event."
          }
        ],
        captionParts: [
          {
            id: "concert-fun",
            text: "Best concert ever!",
            risky: false,
            title: "Concert excitement",
            explanation:
              "Enjoying a concert is not private information."
          },
          {
            id: "pickup-message",
            text: "Dad won’t pick me up until 11:30.",
            risky: true,
            title: "Pickup time",
            explanation:
              "This reveals when Rosa expects to leave and may be waiting."
          }
        ],
        extraClues: [
          {
            id: "concert-live-location",
            text: "📍 Live location: Arena District",
            risky: true,
            title: "Live location",
            explanation:
              "The live location shows Rosa’s current area in real time."
          }
        ]
      },

      {
        id: "spicy-discord-ben",
        platform: "discord",
        platformLabel: "Discord-style",
        heading: "Ben shared this in a public coding server.",
        name: "Ben",
        avatar: "💻",
        username: "CodeKidBen",
        location: "",
        mediaTitle: "Public coding chat",
        mediaEmoji: "💻",
        mediaClues: [
          {
            id: "project-type",
            text: "Building a space game",
            risky: false,
            title: "Coding project",
            explanation:
              "Talking about a game project is generally safe."
          },
          {
            id: "email-visible",
            text: "ben.rivera2014@email.test",
            risky: true,
            title: "Personal email",
            explanation:
              "A personal email may reveal Ben’s name and birth year and allows strangers to contact him."
          },
          {
            id: "screen-school",
            text: "Lincoln Prep student portal",
            risky: true,
            title: "School portal",
            explanation:
              "A school portal visible on screen can identify Ben’s school."
          }
        ],
        captionParts: [
          {
            id: "coding-interest",
            text: "I love making games.",
            risky: false,
            title: "Coding interest",
            explanation:
              "A general coding interest is safe self-expression."
          },
          {
            id: "direct-contact",
            text: "Message my personal email if I’m offline.",
            risky: true,
            title: "Direct contact invitation",
            explanation:
              "Inviting strangers to contact a personal email moves the conversation outside the moderated server."
          },
          {
            id: "weekend-routine",
            text: "I code alone every Saturday night.",
            risky: true,
            title: "Repeated routine",
            explanation:
              "This reveals a predictable schedule and that Ben may be alone."
          }
        ],
        extraClues: [
          {
            id: "discord-code-username",
            text: "CodeKidBen",
            risky: true,
            title: "Age-signaling username",
            explanation:
              "Including “Kid” tells strangers that Ben may be a child."
          }
        ]
      }
    ],

    hot: [
      {
        id: "hot-instagram-nia",
        platform: "instagram",
        platformLabel: "Instagram-style",
        heading: "Nia posted several clues from a weekend tournament.",
        name: "Nia",
        avatar: "🏐",
        username: "@NiaNumber14",
        location: "",
        mediaTitle: "Tournament weekend",
        mediaEmoji: "🏐",
        mediaClues: [
          {
            id: "jersey-number",
            text: "Jersey #14",
            risky: true,
            title: "Jersey number",
            explanation:
              "A jersey number may seem harmless, but combined with the team and event it can identify Nia."
          },
          {
            id: "team-banner-hot",
            text: "LAKESIDE LIGHTNING",
            risky: true,
            title: "Team name",
            explanation:
              "The team name combined with a jersey number can identify a specific player."
          },
          {
            id: "volleyball",
            text: "🏐 Volleyball",
            risky: false,
            title: "Sport",
            explanation:
              "The sport itself is a broad interest."
          },
          {
            id: "hotel-key",
            text: "Hotel Room 614",
            risky: true,
            title: "Hotel room number",
            explanation:
              "A hotel room number reveals a temporary private location."
          }
        ],
        captionParts: [
          {
            id: "tournament-love",
            text: "Tournament weekends are my favorite!",
            risky: false,
            title: "Tournament interest",
            explanation:
              "Enjoying tournaments is general self-expression."
          },
          {
            id: "hotel-stay",
            text: "Our whole team is staying at the Harbor Hotel.",
            risky: true,
            title: "Hotel name",
            explanation:
              "The hotel name combined with a room number reveals where Nia is staying."
          },
          {
            id: "breakfast-time",
            text: "Team breakfast is at 7:00 tomorrow.",
            risky: true,
            title: "Team schedule",
            explanation:
              "The schedule reveals when the team will gather in a specific place."
          }
        ],
        extraClues: [
          {
            id: "nia-number-username",
            text: "@NiaNumber14",
            risky: true,
            title: "Name and jersey-number username",
            explanation:
              "The username connects Nia’s name with the number visible on her uniform."
          }
        ]
      },

      {
        id: "hot-tiktok-dev",
        platform: "tiktok",
        platformLabel: "TikTok-style",
        heading: "Dev posted a quick walk-through of the family’s new home.",
        name: "Dev",
        avatar: "🏠",
        username: "@DevNewRoom",
        location: "",
        mediaTitle: "New house tour",
        mediaEmoji: "🏠",
        mediaClues: [
          {
            id: "mail-package",
            text: "Package: D. Carter • 72 Brook Lane",
            risky: true,
            title: "Shipping label",
            explanation:
              "The shipping label exposes a name and complete home address."
          },
          {
            id: "pet-photo",
            text: "🐕 Family dog",
            risky: false,
            title: "Pet",
            explanation:
              "Showing a pet is generally safe unless its tag reveals contact or address information."
          },
          {
            id: "alarm-panel",
            text: "Alarm disarmed",
            risky: true,
            title: "Home-security status",
            explanation:
              "Showing that an alarm is disarmed can create a home-security risk."
          },
          {
            id: "family-calendar-hot",
            text: "Parents away July 8–12",
            risky: true,
            title: "Family travel calendar",
            explanation:
              "The calendar reveals when adults may be away from the home."
          }
        ],
        captionParts: [
          {
            id: "room-excitement",
            text: "I finally have my own room!",
            risky: false,
            title: "New-room excitement",
            explanation:
              "Being excited about a bedroom is not private information."
          },
          {
            id: "door-code",
            text: "The garage code is still 4412 for now.",
            risky: true,
            title: "Garage entry code",
            explanation:
              "An entry code can provide direct access to the home."
          }
        ],
        extraClues: [
          {
            id: "house-tour-title",
            text: "New house tour",
            risky: true,
            title: "Detailed home tour",
            explanation:
              "A detailed home tour may reveal entrances, windows, security devices, and identifying views."
          }
        ]
      },

      {
        id: "hot-youtube-sam",
        platform: "youtube",
        platformLabel: "YouTube-style",
        heading: "Sam uploaded a livestream replay from a gaming setup.",
        name: "Sam",
        avatar: "🎧",
        username: "SamPlaysLive",
        location: "",
        mediaTitle: "LIVE Homework Then Gaming",
        mediaEmoji: "🎧",
        mediaClues: [
          {
            id: "login-note",
            text: "School login: sam.w / BlueTiger9",
            risky: true,
            title: "Login information",
            explanation:
              "The note appears to expose a username and password."
          },
          {
            id: "headphones",
            text: "🎧 Headphones",
            risky: false,
            title: "Headphones",
            explanation:
              "Headphones do not identify or locate Sam."
          },
          {
            id: "window-bus",
            text: "Bus 19 visible outside",
            risky: true,
            title: "Bus route",
            explanation:
              "A visible bus number can help narrow down Sam’s school or neighborhood."
          },
          {
            id: "address-mail",
            text: "Mail: 506 Cedar Court",
            risky: true,
            title: "Address on mail",
            explanation:
              "The visible mail reveals a home address."
          }
        ],
        captionParts: [
          {
            id: "gaming-interest-hot",
            text: "Gaming after homework is the best.",
            risky: false,
            title: "Gaming interest",
            explanation:
              "A favorite hobby is safe self-expression."
          },
          {
            id: "livestream-alone",
            text: "I stream alone until my parents return at 10.",
            risky: true,
            title: "Home-alone schedule",
            explanation:
              "This reveals when Sam is alone and when adults are expected home."
          }
        ],
        extraClues: [
          {
            id: "youtube-live-title",
            text: "LIVE Homework Then Gaming",
            risky: true,
            title: "Live broadcast",
            explanation:
              "Livestreaming can reveal information in real time before the creator notices it."
          }
        ]
      },

      {
        id: "hot-snapchat-tori",
        platform: "snapchat",
        platformLabel: "Snapchat-style",
        heading: "Tori shared several real-time clues during a shopping trip.",
        name: "Tori",
        avatar: "🛍️",
        username: "Tori",
        location: "Live map visible",
        mediaTitle: "Shopping story",
        mediaEmoji: "🛍️",
        mediaClues: [
          {
            id: "receipt-card",
            text: "Card ending 8821",
            risky: true,
            title: "Payment-card details",
            explanation:
              "Even partial payment details should not be displayed publicly."
          },
          {
            id: "shopping-bag",
            text: "🛍️ Shopping bag",
            risky: false,
            title: "Shopping bag",
            explanation:
              "A shopping bag by itself does not reveal private information."
          },
          {
            id: "receipt-store",
            text: "Ridge Mall • 6:41 PM",
            risky: true,
            title: "Current store and time",
            explanation:
              "A receipt can reveal Tori’s current location and when she was there."
          },
          {
            id: "car-plate",
            text: "License plate: KID-204",
            risky: true,
            title: "Vehicle license plate",
            explanation:
              "A visible license plate can identify a family vehicle."
          }
        ],
        captionParts: [
          {
            id: "shopping-fun",
            text: "Found the perfect shoes!",
            risky: false,
            title: "Shopping preference",
            explanation:
              "Liking a pair of shoes is harmless self-expression."
          },
          {
            id: "waiting-alone",
            text: "Waiting alone by Entrance C.",
            risky: true,
            title: "Exact waiting location",
            explanation:
              "This reveals that Tori is alone at a specific entrance."
          }
        ],
        extraClues: [
          {
            id: "snap-map-hot",
            text: "📍 Live map visible",
            risky: true,
            title: "Live map",
            explanation:
              "A live map can reveal Tori’s exact location in real time."
          }
        ]
      },

      {
        id: "hot-discord-omar",
        platform: "discord",
        platformLabel: "Discord-style",
        heading: "Omar shared a screenshot while asking strangers for technical help.",
        name: "Omar",
        avatar: "🧑‍💻",
        username: "OmarTech2013",
        location: "",
        mediaTitle: "Public tech-support chat",
        mediaEmoji: "🧑‍💻",
        mediaClues: [
          {
            id: "wifi-password",
            text: "Wi-Fi password: OmarHome55",
            risky: true,
            title: "Wi-Fi password",
            explanation:
              "A Wi-Fi password should remain secret."
          },
          {
            id: "computer-type",
            text: "Gaming laptop",
            risky: false,
            title: "Computer type",
            explanation:
              "The type of computer is not private information by itself."
          },
          {
            id: "network-name",
            text: "Network: CarterFamily_923Maple",
            risky: true,
            title: "Identifying network name",
            explanation:
              "The network name appears to expose a family name and possible street information."
          },
          {
            id: "school-tab",
            text: "Roosevelt Academy Portal",
            risky: true,
            title: "School portal tab",
            explanation:
              "The visible browser tab identifies Omar’s school."
          }
        ],
        captionParts: [
          {
            id: "tech-interest-hot",
            text: "I’m learning how networks work.",
            risky: false,
            title: "Technology interest",
            explanation:
              "A technology interest is safe self-expression."
          },
          {
            id: "remote-help",
            text: "Can someone remote into my computer and fix it?",
            risky: true,
            title: "Remote-access invitation",
            explanation:
              "Allowing an unknown person to remotely control a computer can expose files, accounts, and private information."
          }
        ],
        extraClues: [
          {
            id: "omar-birth-username",
            text: "OmarTech2013",
            risky: true,
            title: "Possible birth-year username",
            explanation:
              "The number may reveal Omar’s birth year and approximate age."
          }
        ]
      }
    ]
  };

  let selectedHeat = "mild";
  let activeProfiles = [];
  let currentProfileIndex = 0;
  let selectedClues = new Set();
  let answersChecked = false;
  let solvedProfiles = 0;

  function byId(id) {
    return document.getElementById(id);
  }

  function setText(id, value) {
    const element = byId(id);

    if (element) {
      element.textContent = String(value);
    }
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function showScreen(screenId) {
    [
      "introScreen",
      "playScreen",
      "resultScreen"
    ].forEach((id) => {
      byId(id)?.classList.add("hidden");
    });

    byId(screenId)?.classList.remove("hidden");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  function updateGlobalPoints() {
    setText(
      "globalPoints",
      arcade.getGlobalPoints()
    );
  }

  function closeHint() {
    byId("clueHintPanel")
      ?.classList.add("hidden");

    byId("openClueHint")
      ?.setAttribute(
        "aria-expanded",
        "false"
      );
  }

  function closeExplanation() {
    byId("clueExplanationPopup")
      ?.classList.add("hidden");
  }

  function hideMemeReaction() {
    const reaction =
      byId("memeReaction");

    reaction?.classList.add("hidden");

    reaction?.classList.remove(
      "show-reaction",
      "correct-reaction",
      "wrong-reaction"
    );
  }

  function getCurrentProfile() {
    return activeProfiles[
      currentProfileIndex
    ];
  }

  function getAllProfileClues(profile) {
    return [
      ...(profile.extraClues || []),
      ...(profile.mediaClues || []),
      ...(profile.captionParts || [])
    ];
  }

  function getClue(profile, clueId) {
    return getAllProfileClues(
      profile
    ).find(
      (clue) =>
        clue.id === clueId
    );
  }

  /* =====================================================
     HEAT SELECTION
  ===================================================== */

  document
    .querySelectorAll(".heat-choice")
    .forEach((button) => {
      button.addEventListener(
        "click",
        () => {
          selectedHeat =
            button.dataset.heat ||
            "mild";

          document
            .querySelectorAll(
              ".heat-choice"
            )
            .forEach(
              (heatButton) => {
                heatButton.classList.toggle(
                  "selected",
                  heatButton === button
                );
              }
            );
        }
      );
    });

  /* =====================================================
     HINT PANEL
  ===================================================== */

  byId("openClueHint")
    ?.addEventListener(
      "click",
      () => {
        const panel =
          byId("clueHintPanel");

        const isOpening =
          panel?.classList.contains(
            "hidden"
          );

        panel?.classList.toggle(
          "hidden"
        );

        byId("openClueHint")
          ?.setAttribute(
            "aria-expanded",
            isOpening
              ? "true"
              : "false"
          );
      }
    );

  byId("closeClueHint")
    ?.addEventListener(
      "click",
      closeHint
    );

  /* =====================================================
     START GAME
  ===================================================== */

  function startGame() {
    activeProfiles =
      profilesByHeat[
        selectedHeat
      ] || profilesByHeat.mild;

    currentProfileIndex = 0;
    solvedProfiles = 0;
    selectedClues = new Set();
    answersChecked = false;

    arcade.startRound({
      gameId:
        `clue-collector-${selectedHeat}`,

      gameName:
        `Clue Collector ${heatNames[selectedHeat]}`,

      heatLevel:
        selectedHeat,

      questionCount:
        activeProfiles.length
    });

    setText(
      "profileTotal",
      activeProfiles.length
    );

    setText(
      "currentHeat",
      heatNames[selectedHeat]
    );

    setText(
      "questionPointValue",
      arcade.HEAT_LEVELS[
        selectedHeat
      ].pointsPerCorrect
    );

    showScreen("playScreen");
    loadProfile();
  }

  byId("startGame")
    ?.addEventListener(
      "click",
      startGame
    );

  /* =====================================================
     DYNAMIC POST RENDERING
  ===================================================== */

  function renderHotspot(clue, className = "") {
    return `
      <button
        class="dynamic-clue-hotspot ${className}"
        type="button"
        data-clue-id="${escapeHtml(clue.id)}"
      >
        ${escapeHtml(clue.text)}
      </button>
    `;
  }

  function renderExtraClues(profile) {
    return (profile.extraClues || [])
      .map(
        (clue) =>
          renderHotspot(
            clue,
            "account-clue-hotspot"
          )
      )
      .join("");
  }

  function renderMediaClues(profile) {
    return (profile.mediaClues || [])
      .map(
        (clue) =>
          renderHotspot(
            clue,
            "media-clue-hotspot"
          )
      )
      .join("");
  }

  function renderCaptionClues(profile) {
    return (profile.captionParts || [])
      .map(
        (clue) =>
          renderHotspot(
            clue,
            "caption-clue-hotspot"
          )
      )
      .join(" ");
  }

  function renderInstagram(profile) {
    return `
      <article class="dynamic-post-card instagram-dynamic-card">
        <header class="dynamic-account-header">
          <div class="dynamic-avatar">
            ${escapeHtml(profile.avatar)}
          </div>

          <div class="dynamic-account-copy">
            ${renderExtraClues(profile)}
          </div>

          <span class="dynamic-menu">•••</span>
        </header>

        <div class="dynamic-media instagram-media">
          <div class="dynamic-media-emoji">
            ${escapeHtml(profile.mediaEmoji)}
          </div>

          <p class="dynamic-media-title">
            ${escapeHtml(profile.mediaTitle)}
          </p>

          <div class="dynamic-media-clues">
            ${renderMediaClues(profile)}
          </div>
        </div>

        <div class="instagram-action-row">
          <span>♡</span>
          <span>💬</span>
          <span>➤</span>
          <span class="action-spacer">▢</span>
        </div>

        <div class="dynamic-caption-area">
          <strong>
            ${escapeHtml(profile.username)}
          </strong>

          <div class="dynamic-caption-clues">
            ${renderCaptionClues(profile)}
          </div>

          <small>
            View all comments
          </small>
        </div>
      </article>
    `;
  }

  function renderTikTok(profile) {
    return `
      <article class="dynamic-post-card tiktok-dynamic-card">
        <div class="tiktok-video-stage">
          <div class="tiktok-top-label">
            Following &nbsp; | &nbsp; For You
          </div>

          <div class="dynamic-media-emoji tiktok-main-emoji">
            ${escapeHtml(profile.mediaEmoji)}
          </div>

          <p class="dynamic-media-title">
            ${escapeHtml(profile.mediaTitle)}
          </p>

          <div class="dynamic-media-clues">
            ${renderMediaClues(profile)}
          </div>

          <div class="tiktok-side-actions">
            <span>♥</span>
            <span>💬</span>
            <span>↗</span>
          </div>

          <div class="tiktok-bottom-copy">
            <div class="dynamic-account-copy">
              ${renderExtraClues(profile)}
            </div>

            <div class="dynamic-caption-clues">
              ${renderCaptionClues(profile)}
            </div>

            <small>
              ♫ Original sound
            </small>
          </div>
        </div>
      </article>
    `;
  }

  function renderYouTube(profile) {
    return `
      <article class="dynamic-post-card youtube-dynamic-card">
        <div class="youtube-video-stage">
          <div class="youtube-play-button">
            ▶
          </div>

          <div class="dynamic-media-emoji">
            ${escapeHtml(profile.mediaEmoji)}
          </div>

          <div class="dynamic-media-clues">
            ${renderMediaClues(profile)}
          </div>

          <div class="youtube-video-bar">
            0:42 / 6:18
          </div>
        </div>

        <div class="youtube-information">
          <div class="youtube-title-row">
            ${renderExtraClues(profile)}
          </div>

          <div class="youtube-channel-row">
            <div class="dynamic-avatar">
              ${escapeHtml(profile.avatar)}
            </div>

            <div>
              <strong>
                ${escapeHtml(profile.username)}
              </strong>

              <small>
                4.2K subscribers
              </small>
            </div>

            <button
              class="youtube-subscribe-button"
              type="button"
              disabled
            >
              Subscribe
            </button>
          </div>

          <div class="youtube-description-box">
            <strong>
              Video description
            </strong>

            <div class="dynamic-caption-clues">
              ${renderCaptionClues(profile)}
            </div>
          </div>
        </div>
      </article>
    `;
  }

  function renderSnapchat(profile) {
    return `
      <article class="dynamic-post-card snapchat-dynamic-card">
        <div class="snapchat-story-stage">
          <div class="snapchat-story-header">
            <div class="dynamic-avatar">
              ${escapeHtml(profile.avatar)}
            </div>

            <div>
              <strong>
                ${escapeHtml(profile.name)}
              </strong>

              <small>
                1 minute ago
              </small>
            </div>

            <span>•••</span>
          </div>

          <div class="dynamic-media-emoji snapchat-main-emoji">
            ${escapeHtml(profile.mediaEmoji)}
          </div>

          <p class="dynamic-media-title">
            ${escapeHtml(profile.mediaTitle)}
          </p>

          <div class="dynamic-account-copy snapchat-location-copy">
            ${renderExtraClues(profile)}
          </div>

          <div class="dynamic-media-clues">
            ${renderMediaClues(profile)}
          </div>

          <div class="snapchat-caption-box">
            ${renderCaptionClues(profile)}
          </div>

          <div class="snapchat-reply-bar">
            Send a chat
          </div>
        </div>
      </article>
    `;
  }

  function renderDiscord(profile) {
    return `
      <article class="dynamic-post-card discord-dynamic-card">
        <aside class="discord-server-bar">
          <span>SN</span>
          <span>🎮</span>
          <span>💻</span>
          <span>+</span>
        </aside>

        <section class="discord-channel-area">
          <header class="discord-channel-header">
            # public-chat
          </header>

          <div class="discord-message">
            <div class="dynamic-avatar">
              ${escapeHtml(profile.avatar)}
            </div>

            <div class="discord-message-content">
              <div class="discord-user-line">
                <div class="dynamic-account-copy">
                  ${renderExtraClues(profile)}
                </div>

                <small>
                  Today at 4:18 PM
                </small>
              </div>

              <div class="dynamic-caption-clues">
                ${renderCaptionClues(profile)}
              </div>

              <div class="discord-shared-screen">
                <div class="dynamic-media-emoji">
                  ${escapeHtml(profile.mediaEmoji)}
                </div>

                <strong>
                  ${escapeHtml(profile.mediaTitle)}
                </strong>

                <div class="dynamic-media-clues">
                  ${renderMediaClues(profile)}
                </div>
              </div>
            </div>
          </div>

          <div class="discord-message-box">
            Message #public-chat
          </div>
        </section>
      </article>
    `;
  }

  function renderProfile(profile) {
    const renderers = {
      instagram: renderInstagram,
      tiktok: renderTikTok,
      youtube: renderYouTube,
      snapchat: renderSnapchat,
      discord: renderDiscord
    };

    const renderer =
      renderers[profile.platform] ||
      renderInstagram;

    const stage =
      byId("dynamicSocialStage");

    if (stage) {
      stage.innerHTML =
        renderer(profile);
    }
  }

  /* =====================================================
     LOAD PROFILE
  ===================================================== */

  function loadProfile() {
    const profile =
      getCurrentProfile();

    if (!profile) {
      finishGame();
      return;
    }

    selectedClues = new Set();
    answersChecked = false;

    closeHint();
    closeExplanation();
    hideMemeReaction();

    setText(
      "profileNumber",
      currentProfileIndex + 1
    );

    setText(
      "platformHeading",
      profile.heading
    );

    setText(
      "platformRoundBadge",
      profile.platformLabel
    );

    setText(
      "selectedClueCount",
      0
    );

    const progress =
      (
        currentProfileIndex /
        activeProfiles.length
      ) * 100;

    const progressFill =
      byId("questionProgressFill");

    if (progressFill) {
      progressFill.style.width =
        `${progress}%`;
    }

    renderProfile(profile);

    byId("checkAnswers")
      ?.classList.remove("hidden");

    byId("clearSelections")
      ?.classList.remove("hidden");

    byId("clueReviewLegend")
      ?.classList.add("hidden");

    byId("clueFeedbackPanel")
      ?.classList.add("hidden");

    byId("nextProfile")
      ?.classList.add("hidden");

    updateLiveStats();
  }

  /* =====================================================
     SELECT CLUES
  ===================================================== */

  function toggleClue(hotspot) {
    const clueId =
      hotspot.dataset.clueId;

    if (!clueId) {
      return;
    }

    if (answersChecked) {
      showExplanation(clueId);
      return;
    }

    if (selectedClues.has(clueId)) {
      selectedClues.delete(clueId);

      hotspot.classList.remove(
        "selected-clue"
      );
    } else {
      selectedClues.add(clueId);

      hotspot.classList.add(
        "selected-clue"
      );
    }

    setText(
      "selectedClueCount",
      selectedClues.size
    );
  }

  byId("dynamicSocialStage")
    ?.addEventListener(
      "click",
      (event) => {
        const hotspot =
          event.target.closest(
            "[data-clue-id]"
          );

        if (!hotspot) {
          return;
        }

        toggleClue(hotspot);
      }
    );

  function clearSelections() {
    if (answersChecked) {
      return;
    }

    selectedClues.clear();

    byId("dynamicSocialStage")
      ?.querySelectorAll(
        "[data-clue-id]"
      )
      .forEach((hotspot) => {
        hotspot.classList.remove(
          "selected-clue"
        );
      });

    setText(
      "selectedClueCount",
      0
    );
  }

  byId("clearSelections")
    ?.addEventListener(
      "click",
      clearSelections
    );

  /* =====================================================
     CHECK ANSWERS
  ===================================================== */

  function checkAnswers() {
    if (answersChecked) {
      return;
    }

    const profile =
      getCurrentProfile();

    if (!profile) {
      return;
    }

    const allClues =
      getAllProfileClues(profile);

    if (selectedClues.size === 0) {
      setText(
        "clueFeedbackTitle",
        "Select at least one clue"
      );

      setText(
        "clueFeedbackText",
        "Study the post and click the details you think reveal too much before checking your answers."
      );

      setText(
        "pointsEarnedThisRound",
        0
      );

      byId("clueFeedbackPanel")
        ?.classList.remove("hidden");

      return;
    }

    answersChecked = true;

    const riskyClues =
      allClues.filter(
        (clue) =>
          clue.risky
      );

    const selectedRiskyCount =
      riskyClues.filter(
        (clue) =>
          selectedClues.has(clue.id)
      ).length;

    const incorrectSelections =
      allClues.filter(
        (clue) =>
          !clue.risky &&
          selectedClues.has(clue.id)
      ).length;

    const missedRiskyCount =
      riskyClues.length -
      selectedRiskyCount;

    const perfect =
      missedRiskyCount === 0 &&
      incorrectSelections === 0;

    const scoreResult =
      arcade.answerQuestion({
        questionId: profile.id,
        correct: perfect
      });

    if (perfect) {
      solvedProfiles += 1;
    }

    byId("dynamicSocialStage")
      ?.querySelectorAll(
        "[data-clue-id]"
      )
      .forEach((hotspot) => {
        const clue =
          getClue(
            profile,
            hotspot.dataset.clueId
          );

        if (!clue) {
          return;
        }

        const selected =
          selectedClues.has(clue.id);

        hotspot.classList.remove(
          "selected-clue"
        );

        if (selected && clue.risky) {
          hotspot.classList.add(
            "correct-clue",
            "review-ready"
          );
        }

        if (selected && !clue.risky) {
          hotspot.classList.add(
            "incorrect-clue",
            "review-ready"
          );
        }

        if (!selected && clue.risky) {
          hotspot.classList.add(
            "missed-clue",
            "review-ready"
          );
        }

        if (!selected && !clue.risky) {
          hotspot.classList.add(
            "safe-unselected-clue"
          );
        }
      });

    setText(
      "pointsEarnedThisRound",
      scoreResult.pointsEarned
    );

    if (perfect) {
      setText(
        "clueFeedbackTitle",
        "Perfect investigation!"
      );

      setText(
        "clueFeedbackText",
        "You found every risky detail and avoided selecting harmless information. Click any green clue to review its explanation."
      );
    } else {
      setText(
        "clueFeedbackTitle",
        "Investigation reviewed"
      );

      setText(
        "clueFeedbackText",
        `You found ${selectedRiskyCount} of ${riskyClues.length} risky clues. Green means correct, red means harmless, and orange reveals a risky clue you missed. Click any marked clue for an explanation.`
      );
    }

    byId("clueReviewLegend")
      ?.classList.remove("hidden");

    byId("clueFeedbackPanel")
      ?.classList.remove("hidden");

    byId("checkAnswers")
      ?.classList.add("hidden");

    byId("clearSelections")
      ?.classList.add("hidden");

    const nextButton =
      byId("nextProfile");

    if (nextButton) {
      nextButton.textContent =
        currentProfileIndex ===
        activeProfiles.length - 1
          ? "See Results"
          : "Next Profile";

      nextButton.classList.remove(
        "hidden"
      );
    }

    showMemeReaction({
      perfect,
      selectedRiskyCount,
      riskyCount:
        riskyClues.length,
      points:
        scoreResult.pointsEarned
    });

    updateLiveStats();
  }

  byId("checkAnswers")
    ?.addEventListener(
      "click",
      checkAnswers
    );

  /* =====================================================
     MEME REACTION
  ===================================================== */

  function showMemeReaction({
    perfect,
    selectedRiskyCount,
    riskyCount,
    points
  }) {
    const reaction =
      byId("memeReaction");

    const image =
      byId("memeReactionImage");

    if (!reaction || !image) {
      return;
    }

    reaction.classList.remove(
      "hidden",
      "show-reaction",
      "correct-reaction",
      "wrong-reaction"
    );

    void reaction.offsetWidth;

    reaction.classList.add(
      "show-reaction",
      perfect
        ? "correct-reaction"
        : "wrong-reaction"
    );

    if (perfect) {
      image.src =
        "../../assets/mascot/congrats.png";

      image.alt =
        "Meme celebrates a perfect investigation";

      setText(
        "memeReactionTitle",
        "Every clue collected!"
      );

      setText(
        "memeReactionMessage",
        `Excellent work! You earned ${points} points.`
      );
    } else {
      image.src =
        "../../assets/mascot/wrong.png";

      image.alt =
        "Meme encourages the player to review the clues";

      setText(
        "memeReactionTitle",
        "Keep investigating!"
      );

      setText(
        "memeReactionMessage",
        `You found ${selectedRiskyCount} of ${riskyCount} risky clues. Click the marked clues to review them.`
      );
    }
  }

  /* =====================================================
     CLUE EXPLANATIONS
  ===================================================== */

  function showExplanation(clueId) {
    if (!answersChecked) {
      return;
    }

    const profile =
      getCurrentProfile();

    const clue =
      getClue(
        profile,
        clueId
      );

    if (!clue) {
      return;
    }

    setText(
      "clueExplanationTitle",
      clue.title
    );

    setText(
      "clueExplanationText",
      clue.explanation
    );

    setText(
      "explanationClassification",
      clue.risky
        ? "Risky detail"
        : "Usually safe to share"
    );

    const icon =
      byId("explanationAlertIcon");

    const classification =
      byId(
        "explanationClassification"
      );

    if (icon) {
      icon.textContent =
        clue.risky
          ? "!"
          : "✓";

      icon.classList.toggle(
        "safe-explanation-icon",
        !clue.risky
      );
    }

    classification?.classList.toggle(
      "safe-classification",
      !clue.risky
    );

    byId("clueExplanationPopup")
      ?.classList.remove("hidden");
  }

  byId("closeClueExplanation")
    ?.addEventListener(
      "click",
      closeExplanation
    );

  /* =====================================================
     NEXT PROFILE
  ===================================================== */

  function nextProfile() {
    if (!answersChecked) {
      return;
    }

    currentProfileIndex += 1;

    if (
      currentProfileIndex >=
      activeProfiles.length
    ) {
      finishGame();
      return;
    }

    loadProfile();
  }

  byId("nextProfile")
    ?.addEventListener(
      "click",
      nextProfile
    );

  /* =====================================================
     LIVE STATS
  ===================================================== */

  function updateLiveStats() {
    const round =
      arcade.getCurrentRound();

    setText(
      "currentScore",
      round.score || 0
    );

    setText(
      "profilesSolved",
      solvedProfiles
    );

    updateGlobalPoints();
  }

  /* =====================================================
     RESULTS
  ===================================================== */

  function starsToText(starCount) {
    const stars =
      Math.max(
        0,
        Math.min(
          3,
          Number(starCount) || 0
        )
      );

    return (
      "★".repeat(stars) +
      "☆".repeat(3 - stars)
    );
  }

  function finishGame() {
    closeExplanation();
    hideMemeReaction();

    const progressFill =
      byId("questionProgressFill");

    if (progressFill) {
      progressFill.style.width =
        "100%";
    }

    const result =
      arcade.finishRound();

    setText(
      "finalScore",
      result.score
    );

    setText(
      "maximumScore",
      result.maximumScore
    );

    setText(
      "finalAccuracy",
      `${result.accuracy}%`
    );

    setText(
      "finalCorrect",
      `${solvedProfiles}/${activeProfiles.length}`
    );

    setText(
      "bestScore",
      result.newBest
    );

    setText(
      "globalPointsEarned",
      `+${result.globalPointsEarned}`
    );

    setText(
      "finalStars",
      starsToText(result.stars)
    );

    let message =
      "Review the marked clues and try another investigation.";

    if (result.accuracy === 100) {
      message =
        "Perfect investigation! You solved every social media profile without selecting harmless details.";
    } else if (result.accuracy >= 75) {
      message =
        "Excellent detective work! Only a few tricky clues escaped your investigation.";
    } else if (result.accuracy >= 50) {
      message =
        "Good effort. Remember to inspect usernames, backgrounds, schedules, locations, and comments.";
    }

    setText(
      "resultMessage",
      message
    );

    updateGlobalPoints();
    showScreen("resultScreen");
  }

  byId("playAgain")
    ?.addEventListener(
      "click",
      () => {
        closeExplanation();
        hideMemeReaction();
        showScreen("introScreen");
      }
    );

  updateGlobalPoints();

  console.log(
    "Clue Collector multi-platform arcade game loaded."
  );
})();
