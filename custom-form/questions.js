window.FORM_SCHEMA = {
  "title": "Meet iam._.steve",
  "description": "This form will be submitted to me. I don't ask for any email, phone number, address, or bank-related information. Please answer the questions honestly. Your answers are encrypted in your browser before submission.",
  "gender": {
    "id": "gender",
    "q": "Gender?",
    "type": "radio",
    "required": true,
    "options": [
      "Female",
      "Male",
      "Other"
    ]
  },
  "female": {
    "title": "Wanna Be Friends ✨",
    "description": "A little more about you, and about us.",
    "questions": [
      {
        "id": "discord_username",
        "q": "Discord Username? (Not Display Name)",
        "type": "text",
        "required": true
      },
      {
        "id": "server_found",
        "q": "Which Discord server did you find me on?",
        "type": "text",
        "required": true
      },
      {
        "id": "discord_frequency",
        "q": "How Frequently Do You Use Discord?",
        "type": "radio",
        "required": true,
        "options": [
          "Less Than 1 Hour 😌",
          "2-3 hours 😎",
          "4-6 hours 🥶",
          "7-9 hours 😱",
          "10+ hours 😵‍💫"
        ]
      },
      {
        "id": "age",
        "q": "Age? (very important)",
        "type": "text",
        "required": true
      },
      {
        "id": "real_name",
        "q": "Real Name? (If your are comfortable)",
        "type": "text",
        "required": false
      },
      {
        "id": "nickname",
        "q": "What should I call You ? (Your nickname)",
        "type": "text",
        "required": true
      },
      {
        "id": "device",
        "q": "What device do you use?",
        "type": "radio",
        "required": true,
        "options": [
          "Phone/Tablet",
          "Desktop/Pc",
          "Calculator"
        ]
      },
      {
        "id": "country_state",
        "q": "What country and state are you from?",
        "type": "text",
        "required": true
      },
      {
        "id": "wanna_friends",
        "q": "Wanna be friends?",
        "type": "radio",
        "required": true,
        "options": [
          "Yesssss (you are the best 😍).",
          "No. 😢"
        ]
      },
      {
        "id": "like_love",
        "q": "Do You Like/Love Me?",
        "type": "radio",
        "required": true,
        "options": [
          "Yes. (You are lowk tuff and chill guy)🫴🏻🌹🤍",
          "No. 🫩",
          "Maybe. 👀"
        ]
      },
      {
        "id": "emotional_support",
        "q": "Can you give me emotional support. Please?",
        "type": "radio",
        "required": true,
        "options": [
          "Yess, Don't worry about it. I am here.",
          "No."
        ]
      },
      {
        "id": "reply_ignore",
        "q": "Am I important to you, If I am Your Friend? Will you reply my message instead of ignoring?",
        "type": "radio",
        "required": true,
        "options": [
          "Hell Yeahhhh, why would I even ignore you?",
          "No you are boring."
        ]
      },
      {
        "id": "fear_losing_friends",
        "q": "I'm scared of losing friends. Are you? Sometimes, the people who mean the most to us become strangers, and honestly, that thought hurts more than I can explain.",
        "type": "radio",
        "required": true,
        "options": [
          "Yeah, I can relate.",
          "Yeah, but I can't relate",
          "No."
        ]
      },
      {
        "id": "ghosting",
        "q": "Will you ever ghost me? I genuinely hate ghosting. I know how it feels when someone close leaves without a word, making you feel like you never mattered. Please, just be honest.",
        "type": "radio",
        "required": true,
        "options": [
          "No (then what would be the meaning of friendship?).",
          "Yes."
        ]
      },
      {
        "id": "long_paragraphs",
        "q": "I'm an introverted overthinker who tends to over-explain things in long paragraphs. Is that okay with you?",
        "type": "radio",
        "required": true,
        "options": [
          "Hmm Yeah, I can handle you.",
          "No."
        ]
      },
      {
        "id": "overthink",
        "q": "Do I look like someone who overthinks everything?",
        "type": "radio",
        "required": true,
        "options": [
          "Yes, So much. Your paragraph says everything !",
          "No"
        ]
      },
      {
        "id": "nickname_permission",
        "q": "Would you let me give you a silly nickname?",
        "type": "radio",
        "required": true,
        "options": [
          "Yes",
          "No"
        ]
      },
      {
        "id": "good_person",
        "q": "Do you think I am a good person? If yes or no, please explain so I can learn from my mistakes....(Optional but I would be glad if you fill this section).",
        "type": "textarea",
        "required": false
      },
      {
        "id": "type_of_man",
        "q": "What Type Of Man Am I?",
        "type": "checkbox",
        "required": true,
        "options": [
          "Flirty",
          "Funny",
          "Lowkey Tuff",
          "Immature",
          "Dumb",
          "Introverted",
          "Sweet & Caring",
          "Overthinker",
          "Chat Yapper",
          "Baby Boy",
          "Lowkey Clingy",
          "Walking Green Flag",
          "A Little Red Flag",
          "Rizzless",
          "Secretly Soft-Hearted",
          "Emotional",
          "A Bit of Everything 💀"
        ]
      },
      {
        "id": "flirt_innocent",
        "q": "Do I seem like a flirt or an innocent guy?",
        "type": "radio",
        "required": true,
        "options": [
          "Flirty Man",
          "Innocent, kuchu puchu."
        ]
      },
      {
        "id": "rizz",
        "q": "Rate my rizz from 1 to 10.",
        "type": "radio",
        "required": true,
        "options": [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10"
        ]
      },
      {
        "id": "professional_help",
        "q": "Do I look like I need professional help? 💀",
        "type": "radio",
        "required": true,
        "options": [
          "Yes and it's me who will help.",
          "No."
        ]
      },
      {
        "id": "introduction",
        "q": "Introduce Yourself in 20 to 1000 words (I will read every single word, even if it's Nobel. Don't Worry, Just don't fake it....🙂)",
        "type": "textarea",
        "required": true,
        "minWords": 20,
        "maxWords": 1000
      },
      {
        "id": "attention",
        "q": "What caught your attention about me?",
        "type": "textarea",
        "required": true
      },
      {
        "id": "friendship_matters",
        "q": "What matters most to you in a friendship?",
        "type": "textarea",
        "required": true
      },
      {
        "id": "understood",
        "q": "What's something you wish more people understood about you?",
        "type": "textarea",
        "required": true
      },
      {
        "id": "misunderstood",
        "q": "What's something about you that people usually misunderstand?",
        "type": "textarea",
        "required": true
      },
      {
        "id": "improve_day",
        "q": "What's one small thing that can instantly improve your day?",
        "type": "textarea",
        "required": true
      },
      {
        "id": "close_friends",
        "q": "Do I seem like someone you'd become close friends with?",
        "type": "radio",
        "required": true,
        "options": [
          "Yes",
          "No"
        ]
      },
      {
        "id": "nickname_for_steve",
        "q": "What nickname would you give me?",
        "type": "text",
        "required": true
      },
      {
        "id": "smile_notification",
        "q": "Would you smile if you saw a notification from me?",
        "type": "radio",
        "required": true,
        "options": [
          "Yes",
          "No"
        ]
      },
      {
        "id": "why_filled",
        "q": "I hope we can contact each other again very soon. Since you have made it this far, I have one more question: Why did you fill out this form?...(Optional but I would be glad if you fill this section).",
        "type": "textarea",
        "required": false
      },
      {
        "id": "last_message",
        "q": "If this were the last message you could leave me, what would you say? Leave me a message I'll remember.",
        "type": "textarea",
        "required": true
      },
      {
        "id": "who_contacts_first",
        "q": "Who will contact first?",
        "type": "radio",
        "required": true,
        "options": [
          "Steve.",
          "Me.",
          "Both of Us cause Friendship is not One Sided Thing."
        ]
      },
      {
        "id": "made_smile",
        "q": "Did this form make you smile even once?",
        "type": "radio",
        "required": true,
        "options": [
          "Yes",
          "No"
        ]
      }
    ],
    "footer": "Funny Reminder\n\nDon't call me bro 😤\n\nOkay? Okayyyyy??????"
  },
  "male": {
    "title": "What's up Man",
    "description": "A few quick questions to get to know you.",
    "questions": [
      {
        "id": "discord_username_male",
        "q": "Discord Username? (Not Display Name)",
        "type": "text",
        "required": true
      },
      {
        "id": "server_found_male",
        "q": "Which Discord server did you find me on?",
        "type": "text",
        "required": true
      },
      {
        "id": "real_name_male",
        "q": "Real Name? (If your are comfortable)",
        "type": "text",
        "required": false
      },
      {
        "id": "nickname_male",
        "q": "What should I call You ? (Your nickname)",
        "type": "text",
        "required": true
      },
      {
        "id": "introduction_male",
        "q": "Introduce Yourself in 20 to 1000 words (I will read every single word, even if it's Nobel. Don't Worry, Just don't fake it....🙂)",
        "type": "textarea",
        "required": true,
        "minWords": 20,
        "maxWords": 1000
      },
      {
        "id": "attention_male",
        "q": "What caught your attention about me?",
        "type": "textarea",
        "required": true
      },
      {
        "id": "last_message_male",
        "q": "If this were the last message you could leave me, what would you say? Leave me a message I'll remember.",
        "type": "textarea",
        "required": true
      }
    ],
    "footer": "Thanks for filling this out. Your answers are encrypted before they leave your browser."
  }
};
