
export const personalities = {
  void: 'void',
  uncensored: 'uncensored',
  imageAnalyser: 'imageAnalyser'
}

// export const Personalities = [
//   {
//     name: "Select Mode",
//     value: "",
//   },

//   {
//     name: "Real VOID 😁",
//     value: "void",
//   },
//   {
//     name: "VOID(indian mode)",
//     value: "indian",
//   },

//   {
//     name: "VOID(roast mode)",
//     value: "roast",
//   },
//   ,
//   // {
//   //     name: "VOID(lazy mode)",
//   //     value: "lazy"
//   // }
//   {
//     name: "VOID(dumb mode)",
//     value: "dumb",
//   },
// ];

export const providers = {
  openrouter: "openrouter",
  pollinations: "pollinations",
};

export const botModels = [
  {
    name: "VOID⚡",
    value: "gemini",
    active: true,
    provider: providers.pollinations,
    personality: personalities.void
  },
  {
    name: "VOID(Code)🧑‍💻",
    value: "mistral",
    active: false,
    provider: providers.pollinations,
    personality: personalities.void

  },

  {
    name: "VOID (Reasoning Pro) 🧠",
    value: "deepseek-reasoning",
    active: false,
    provider: providers.pollinations,
    personality: personalities.void

  },
  {
    name: "VOID (Code Genius) 🔧",
    value: "qwen-coder",
    active: false,
    provider: providers.pollinations,
  },


  {
    name: "VOID (Image Analysis) 🌄️",
    value: "bidara",
    active: false,
    provider: providers.pollinations,
    personality: personalities.imageAnalyser
  },
  {
    name: "VOID(Evil Mode)😈",
    value: "evil",
    active: false,
    provider: providers.pollinations,
    personality: personalities.uncensored
  },
  {
    name: "VOID(Evil Mode)😈",
    value: "cognitivecomputations/dolphin-mistral-24b-venice-edition:free",
    active: true,
    provider: providers.openrouter,
  },
];

export const VoidModelKey = "model";
