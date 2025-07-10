export const Personalities = [
  {
    name: "Select Mode",
    value: "",
  },

  {
    name: "Real VOID 😁",
    value: "void",
  },
  {
    name: "VOID(indian mode)",
    value: "indian",
  },

  {
    name: "VOID(roast mode)",
    value: "roast",
  },
  ,
  // {
  //     name: "VOID(lazy mode)",
  //     value: "lazy"
  // }
  {
    name: "VOID(dumb mode)",
    value: "dumb",
  },
];

export const providers = {
  openrouter: "openrouter",
  pollinations: "pollinations",
};

export const botModels = [
    {
    name: "VOID⚡",
    value: "openai-fast",
    active: true,
    provider: providers.pollinations,
  },
  {
    name: "VOID(Best)😁",
    value: "mistral",
    active: false,
    provider: providers.pollinations,
  },
  
  {
    name: "VOID (Reasoning Pro) 🧠",
    value: "deepseek-reasoning",
    active: true,
    provider: providers.pollinations,
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
    active: true,
    provider: providers.pollinations,
  },
  {
    name: "VOID(Evil Mode)😈",
    value: "evil",
    active: true,
    provider: providers.pollinations,
  },
  {
    name: "Unity Unrestricted Agent ⚡",
    value: "unity",
    active: false,
    provider: providers.pollinations,
  },
];

export const VoidModelKey = "model";
